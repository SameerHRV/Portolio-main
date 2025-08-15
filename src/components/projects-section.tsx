"use client";

import * as React from "react";
import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { FolderOpen } from "lucide-react";

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<"web" | "mobile">("web");
  const filtered = projects.filter((p) => p.type === filter);

  return (
    <section
      id="projects"
      data-scroll
      data-scroll-class="is-inview"
      className="relative py-12 sm:py-16 lg:py-20 reveal-up"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-accent font-medium text-primary border border-primary/20 mb-4">
            <FolderOpen className="h-4 w-4" />
            Featured Projects
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">My Projects</h2>
          <p className="mt-2 font-body text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work across web and mobile.
          </p>
        </div>

        {/* Filter toggle */}
        <div className="mb-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Project type filter"
            className="inline-flex items-center gap-1 rounded-full bg-muted p-1"
          >
            <button
              role="tab"
              aria-selected={filter === "web"}
              onClick={() => setFilter("web")}
              className={`px-4 py-2 text-sm font-accent font-medium rounded-full transition-colors ${
                filter === "web" ? "bg-background shadow border" : "hover:bg-background/60"
              }`}
            >
              Web Applications
            </button>
            <button
              role="tab"
              aria-selected={filter === "mobile"}
              onClick={() => setFilter("mobile")}
              className={`px-4 py-2 text-sm font-accent font-medium rounded-full transition-colors ${
                filter === "mobile" ? "bg-background shadow border" : "hover:bg-background/60"
              }`}
            >
              Mobile Applications
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="font-body">No {filter === "web" ? "web" : "mobile"} projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
