import { useCallback, RefObject } from 'react';

interface ExportOptions {
  scale?: number;
  backgroundColor?: string;
}

/**
 * Hook to export logo elements as SVG or PNG
 */
export function useLogoExport(containerRef: RefObject<HTMLElement>) {
  /**
   * Converts a DOM element with inline styles to a self-contained SVG string
   */
  const toSvgString = useCallback((): string | null => {
    if (!containerRef.current) return null;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create SVG namespace
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('width', rect.width.toString());
    svg.setAttribute('height', rect.height.toString());
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    
    // Create foreignObject to embed HTML content
    const foreignObject = document.createElementNS(svgNS, 'foreignObject');
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    
    // Clone the container with computed styles
    const clone = container.cloneNode(true) as HTMLElement;
    
    // Apply computed styles inline to the clone and all children
    const applyComputedStyles = (source: Element, target: Element) => {
      if (source instanceof HTMLElement && target instanceof HTMLElement) {
        const computed = window.getComputedStyle(source);
        // Apply essential text and layout styles
        const essentialProps = [
          'font-family', 'font-size', 'font-weight', 'color', 'line-height',
          'margin', 'padding', 'display', 'position', 'top', 'left', 'right', 'bottom',
          'background', 'background-color', 'background-image', 'background-clip',
          '-webkit-background-clip', '-webkit-text-fill-color',
          'white-space', 'text-align'
        ];
        essentialProps.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value) {
            target.style.setProperty(prop, value);
          }
        });
        
        // Force transparent background on the root clone
        if (source === container) {
          target.style.setProperty('background', 'transparent');
          target.style.setProperty('background-color', 'transparent');
        }
      }
      
      // Process children
      Array.from(source.children).forEach((child, index) => {
        if (target.children[index]) {
          applyComputedStyles(child, target.children[index]);
        }
      });
    };
    
    applyComputedStyles(container, clone);
    
    // Set xmlns for HTML namespace in foreignObject
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    
    foreignObject.appendChild(clone);
    svg.appendChild(foreignObject);
    
    // Serialize to string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  }, [containerRef]);

  /**
   * Export as SVG file
   */
  const exportAsSvg = useCallback((filename = 'logo.svg') => {
    const svgString = toSvgString();
    if (!svgString) return;
    
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [toSvgString]);

  /**
   * Export as PNG file using canvas
   */
  const exportAsPng = useCallback(async (
    filename = 'logo.png',
    options: ExportOptions = {}
  ) => {
    if (!containerRef.current) return;
    
    const { scale = 2, backgroundColor = 'transparent' } = options;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    // Set background if not transparent
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Create an SVG with foreignObject
    const svgString = toSvgString();
    if (!svgString) return;
    
    // Create a new SVG with background
    const wrappedSvg = svgString.replace(
      '<foreignObject',
      `<rect width="100%" height="100%" fill="${backgroundColor}"/><foreignObject`
    );
    
    // Create an image from the SVG
    const img = new Image();
    const svgBlob = new Blob([wrappedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    return new Promise<void>((resolve, reject) => {
      img.onload = () => {
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create PNG blob'));
            return;
          }
          
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
          resolve();
        }, 'image/png');
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load SVG as image'));
      };
      
      img.src = url;
    });
  }, [containerRef, toSvgString]);

  /**
   * Export using foreignObject SVG approach (handles complex CSS including gradients)
   * This method clones the entire DOM with all computed styles for accurate rendering
   */
  const exportAsPngNative = useCallback(async (
    filename = 'logo.png',
    options: ExportOptions = {}
  ) => {
    if (!containerRef.current) return;
    
    const { scale = 2 } = options;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    // Clone the container and apply all computed styles inline
    const clone = container.cloneNode(true) as HTMLElement;
    
    const applyAllStyles = (source: Element, target: Element) => {
      if (source instanceof HTMLElement && target instanceof HTMLElement) {
        const computed = window.getComputedStyle(source);
        // Copy ALL computed styles
        for (let i = 0; i < computed.length; i++) {
          const prop = computed[i];
          target.style.setProperty(prop, computed.getPropertyValue(prop));
        }
      }
      
      // Handle SVG elements - copy attributes and inline styles
      if (source instanceof SVGElement && target instanceof SVGElement) {
        for (let i = 0; i < source.attributes.length; i++) {
          const attr = source.attributes[i];
          target.setAttribute(attr.name, attr.value);
        }
        
        // For SVG gradient stops, get computed stop-color
        if (source.tagName === 'stop') {
          const computed = window.getComputedStyle(source);
          const stopColor = computed.getPropertyValue('stop-color');
          if (stopColor) {
            target.setAttribute('stop-color', stopColor);
          }
        }
      }
      
      Array.from(source.children).forEach((child, index) => {
        if (target.children[index]) {
          applyAllStyles(child, target.children[index]);
        }
      });
    };
    
    applyAllStyles(container, clone);
    
    // Force transparent background on clone
    clone.style.background = 'transparent';
    clone.style.backgroundColor = 'transparent';
    
    // Create SVG with foreignObject containing the scaled clone
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('width', (rect.width * scale).toString());
    svg.setAttribute('height', (rect.height * scale).toString());
    
    // Add a group with scale transform
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', `scale(${scale})`);
    
    const foreignObject = document.createElementNS(svgNS, 'foreignObject');
    foreignObject.setAttribute('width', rect.width.toString());
    foreignObject.setAttribute('height', rect.height.toString());
    
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    foreignObject.appendChild(clone);
    g.appendChild(foreignObject);
    svg.appendChild(g);
    
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create PNG'));
            return;
          }
          
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
          resolve();
        }, 'image/png');
      };
      
      img.onerror = (e) => {
        console.error('Failed to load SVG for PNG export:', e);
        reject(new Error('Failed to render PNG'));
      };
      
      img.src = svgDataUrl;
    });
  }, [containerRef]);

  return {
    exportAsSvg,
    exportAsPng,
    exportAsPngNative,
    toSvgString,
  };
}
