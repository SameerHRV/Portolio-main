'use server';

/**
 * @fileOverview Provides AI-powered suggestions for improving the About Me section text.
 *
 * - getAboutMeSuggestions - A function that generates suggestions for the About Me section.
 * - AboutMeSuggestionsInput - The input type for the getAboutMeSuggestions function.
 * - AboutMeSuggestionsOutput - The return type for the getAboutMeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AboutMeSuggestionsInputSchema = z.object({
  aboutMeText: z
    .string()
    .describe('The current text of the About Me section.'),
});
export type AboutMeSuggestionsInput = z.infer<typeof AboutMeSuggestionsInputSchema>;

const AboutMeSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of AI-powered suggestions for improving the About Me section text.'),
});
export type AboutMeSuggestionsOutput = z.infer<typeof AboutMeSuggestionsOutputSchema>;

export async function getAboutMeSuggestions(
  input: AboutMeSuggestionsInput
): Promise<AboutMeSuggestionsOutput> {
  return aboutMeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aboutMeSuggestionsPrompt',
  input: {schema: AboutMeSuggestionsInputSchema},
  output: {schema: AboutMeSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping users improve their About Me section for their portfolio.

  Provide 3 alternative phrasings and re-writes for the following About Me text:

  {{aboutMeText}}

  Format each suggestion as a separate string in a JSON array.
  `,
});

const aboutMeSuggestionsFlow = ai.defineFlow(
  {
    name: 'aboutMeSuggestionsFlow',
    inputSchema: AboutMeSuggestionsInputSchema,
    outputSchema: AboutMeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
