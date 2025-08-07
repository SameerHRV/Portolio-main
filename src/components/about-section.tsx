'use client';

import * as React from 'react';
import Image from 'next/image';
import { about, skills } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { SuggestionDialog } from './suggestion-dialog';

export function AboutSection() {
  const [bio, setBio] = React.useState(about.bio);

  return (
    <section id="about">
      <div className="container mx-auto">
        <div className="mb-12 text-center animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground">My journey, skills, and what I love to do.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="flex justify-center lg:col-span-1 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/400x400.png"
                alt="A professional photo of me"
                data-ai-hint="professional portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2 animate-in fade-in slide-in-from-right-12 duration-1000">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{about.name}</h3>
                <p className="text-muted-foreground">{bio}</p>
                <SuggestionDialog
                  originalText={bio}
                  suggestionType="about"
                  onSuggestionSelect={setBio}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">My Tech Stack</h3>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 rounded-lg bg-secondary p-3 transition-all hover:bg-primary/10 hover:shadow-md">
                      <skill.icon className="h-6 w-6 text-primary" />
                      <span className="font-medium text-primary/90">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
