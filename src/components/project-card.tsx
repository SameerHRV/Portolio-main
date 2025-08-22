"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/types";
import { ExternalLink, Eye, Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { SuggestionDialog } from "./suggestion-dialog";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [description, setDescription] = React.useState(project.description);

  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 card-hover">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            data-ai-hint={project.imageHint}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-4">
              <Button asChild size="sm" variant="secondary" className="rounded-full">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button asChild size="sm" variant="secondary" className="rounded-full">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6">
        <CardTitle className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <p className="flex-1 text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        <div className="mb-4">
          <SuggestionDialog originalText={description} suggestionType="project" onSuggestionSelect={setDescription} />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 pt-0">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Globe className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            Preview
            <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            GitHub
            <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
