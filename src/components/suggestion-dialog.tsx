'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { getProjectDescriptionSuggestions } from '@/ai/flows/project-description-suggestions';
import { getAboutMeSuggestions } from '@/ai/flows/about-me-section-suggestions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface SuggestionDialogProps {
  originalText: string;
  suggestionType: 'project' | 'about';
  onSuggestionSelect: (suggestion: string) => void;
}

export function SuggestionDialog({ originalText, suggestionType, onSuggestionSelect }: SuggestionDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    if (suggestions.length > 0) return; // Don't refetch if we already have them

    setIsLoading(true);
    setError(null);
    try {
      let result;
      if (suggestionType === 'project') {
        result = await getProjectDescriptionSuggestions({ description: originalText });
      } else {
        result = await getAboutMeSuggestions({ aboutMeText: originalText });
      }
      setSuggestions(result.suggestions);
    } catch (e) {
      console.error('Failed to get suggestions:', e);
      setError('Could not fetch suggestions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste the new text.',
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleFetchSuggestions}>
          <Sparkles className="mr-2 h-4 w-4" />
          Improve with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Suggestions</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <ul className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="p-4 border rounded-lg bg-secondary/50 relative group">
                  <p className="text-sm text-muted-foreground">{suggestion}</p>
                  <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => handleCopy(suggestion, index)}
                        aria-label="Copy suggestion"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => handleSelectSuggestion(suggestion)}
                        aria-label="Use this suggestion"
                      >
                         <Check className="h-4 w-4 text-primary" />
                      </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
