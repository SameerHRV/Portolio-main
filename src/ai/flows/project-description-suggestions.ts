// The AI flow suggests alternative phrasings and rewrites for project descriptions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectDescriptionSuggestionsInputSchema = z.object({
  description: z.string().describe('The project description to improve.'),
});
export type ProjectDescriptionSuggestionsInput =
  z.infer<typeof ProjectDescriptionSuggestionsInputSchema>;

const ProjectDescriptionSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested alternative descriptions.'),
});
export type ProjectDescriptionSuggestionsOutput =
  z.infer<typeof ProjectDescriptionSuggestionsOutputSchema>;

export async function getProjectDescriptionSuggestions(
  input: ProjectDescriptionSuggestionsInput
): Promise<ProjectDescriptionSuggestionsOutput> {
  return projectDescriptionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectDescriptionSuggestionsPrompt',
  input: {schema: ProjectDescriptionSuggestionsInputSchema},
  output: {schema: ProjectDescriptionSuggestionsOutputSchema},
  prompt: `You are a helpful assistant that rewrites project descriptions to be more engaging and professional.  Provide three alternative descriptions for the following project description:\n\n{{description}}`,
});

const projectDescriptionSuggestionsFlow = ai.defineFlow(
  {
    name: 'projectDescriptionSuggestionsFlow',
    inputSchema: ProjectDescriptionSuggestionsInputSchema,
    outputSchema: ProjectDescriptionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
