import { projects } from '@/lib/data';
import { ProjectCard } from './project-card';
import { Sparkles, FolderOpen } from 'lucide-react';

export function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto">
        <div className="mb-16 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 mb-6">
            <FolderOpen className="h-4 w-4" />
            Featured Work
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="gradient-text">My Projects</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            A curated collection of my latest work, showcasing innovative solutions and creative designs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-slide-up" 
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>More projects coming soon...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
