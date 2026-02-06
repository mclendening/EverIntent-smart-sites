/**
 * @fileoverview Animated Transcript Proof Card
 * @module components/ai-employee/TranscriptCard
 * 
 * Displays real business outcomes with expanding transcript preview.
 */

import { useState } from 'react';
import { FileText, ChevronDown, CheckCircle2 } from 'lucide-react';

interface TranscriptCardProps {
  title: string;
  preview: string;
  result: string;
  timestamp?: string;
  revenue?: string;
  expanded?: boolean;
  fullTranscript?: string[];
}

export function TranscriptCard({
  title,
  preview,
  result,
  timestamp = 'Last night',
  revenue,
  expanded: defaultExpanded = false,
  fullTranscript,
}: TranscriptCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div 
      className={`
        group rounded-2xl border bg-card/50 overflow-hidden transition-all duration-500
        ${isExpanded ? 'border-accent/50 shadow-lg shadow-accent/10' : 'border-border/30 hover:border-accent/30'}
      `}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{timestamp}</span>
              {revenue && (
                <span className="text-xs text-accent font-medium ml-2">{revenue}</span>
              )}
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
        
        {/* Preview Quote */}
        <div className="bg-muted/50 rounded-xl p-4 mb-4">
          <p className="text-sm text-muted-foreground italic">"{preview}"</p>
        </div>

        {/* Result */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-sm text-accent font-medium">{result}</p>
        </div>
      </div>

      {/* Expandable Transcript */}
      {fullTranscript && fullTranscript.length > 0 && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 border-t border-border/30 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <span>{isExpanded ? 'Hide transcript' : 'View full transcript'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          <div className={`
            grid transition-all duration-500 ease-out
            ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
          `}>
            <div className="overflow-hidden">
              <div className="px-6 pb-6 space-y-3">
                {fullTranscript.map((message, index) => {
                  const isAI = message.startsWith('AI:');
                  return (
                    <div 
                      key={index}
                      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`
                        max-w-[80%] px-4 py-2 rounded-2xl text-sm
                        ${isAI 
                          ? 'bg-muted text-foreground rounded-bl-md' 
                          : 'bg-accent text-accent-foreground rounded-br-md'
                        }
                      `}>
                        {message.replace(/^(AI|Customer): /, '')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
