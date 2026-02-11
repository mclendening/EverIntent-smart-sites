import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Zap } from 'lucide-react';

export interface MotionConfig {
  transitionSmooth: string;
  transitionBounce: string;
  transitionSpring: string;
}

interface Props {
  motion: MotionConfig;
  onChange: (config: MotionConfig) => void;
}

export function MotionEditor({ motion, onChange }: Props) {
  return (
    <AccordionItem value="motion-config">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 shrink-0" />
          Motion & Transitions
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        <p className="text-xs text-muted-foreground">
          CSS transition values applied to interactive elements. Use standard CSS transition syntax.
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Smooth Transition</Label>
            <Input
              value={motion.transitionSmooth}
              onChange={(e) => onChange({ ...motion, transitionSmooth: e.target.value })}
              className="font-mono text-xs"
              placeholder="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            />
            <p className="text-xs text-muted-foreground">Default easing for most elements</p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Bounce Transition</Label>
            <Input
              value={motion.transitionBounce}
              onChange={(e) => onChange({ ...motion, transitionBounce: e.target.value })}
              className="font-mono text-xs"
              placeholder="all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            />
            <p className="text-xs text-muted-foreground">Playful bounce effect</p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Spring Transition</Label>
            <Input
              value={motion.transitionSpring}
              onChange={(e) => onChange({ ...motion, transitionSpring: e.target.value })}
              className="font-mono text-xs"
              placeholder="all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            />
            <p className="text-xs text-muted-foreground">Snappy spring-like feel</p>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2 mt-4">
          <Label className="text-xs font-medium">Preview</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Smooth', transition: motion.transitionSmooth },
              { label: 'Bounce', transition: motion.transitionBounce },
              { label: 'Spring', transition: motion.transitionSpring },
            ].map(({ label, transition }) => (
              <div
                key={label}
                className="rounded-lg border p-3 text-center text-xs font-medium bg-card cursor-pointer hover:bg-accent hover:text-accent-foreground hover:scale-105"
                style={{ transition }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
