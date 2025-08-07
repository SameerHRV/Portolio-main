import type { LucideIcon } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
}
