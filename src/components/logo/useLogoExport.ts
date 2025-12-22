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
    
    // Use html2canvas-like approach with canvas
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
   * Export using native canvas drawing (more reliable for complex logos)
   */
  const exportAsPngNative = useCallback(async (
    filename = 'logo.png',
    options: ExportOptions = {}
  ) => {
    if (!containerRef.current) return;
    
    const { scale = 2, backgroundColor = '#09090b' } = options;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);
    
    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Find text elements and draw them
    const textElements = container.querySelectorAll('span, p');
    textElements.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      
      const elRect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const x = elRect.left - rect.left;
      const y = elRect.top - rect.top + parseFloat(style.fontSize) * 0.85; // Baseline adjustment
      
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      
      // Handle gradient text
      const backgroundImage = style.backgroundImage;
      if (backgroundImage && backgroundImage.includes('gradient')) {
        // Extract gradient colors (simplified)
        const matches = backgroundImage.match(/#[a-fA-F0-9]{6}|rgb[a]?\([^)]+\)/g);
        if (matches && matches.length >= 2) {
          const gradient = ctx.createLinearGradient(x, y - parseFloat(style.fontSize), x + elRect.width, y);
          gradient.addColorStop(0, matches[0]);
          gradient.addColorStop(1, matches[1]);
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = style.color;
        }
      } else {
        ctx.fillStyle = style.color;
      }
      
      ctx.fillText(el.textContent || '', x, y);
    });
    
    // Find and draw SVG elements (streak)
    const svgElements = container.querySelectorAll('svg');
    svgElements.forEach((svg) => {
      const svgRect = svg.getBoundingClientRect();
      const x = svgRect.left - rect.left;
      const y = svgRect.top - rect.top;
      
      // Draw the SVG to canvas
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x, y, svgRect.width, svgRect.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
    
    // Wait a bit for SVG images to load, then export
    await new Promise(resolve => setTimeout(resolve, 100));
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }, 'image/png');
  }, [containerRef]);

  return {
    exportAsSvg,
    exportAsPng,
    exportAsPngNative,
    toSvgString,
  };
}
