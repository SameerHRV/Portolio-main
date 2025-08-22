import type { Project, Skill } from "./types";
import { Github, Globe, Code, PenTool, Database, Server, Wind, Bot } from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    type: "web",
    description:
      "A full-featured e-commerce platform with a modern UI, product management, and a secure checkout process. Built with a focus on performance and user experience.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
    imageUrl: "https://picsum.photos/seed/ecommerce/1200/800",
    imageHint: "online store",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "Task Management App",
    type: "web",
    description:
      "A collaborative task management application that helps teams organize, track, and manage their work. Features include drag-and-drop boards, real-time updates, and user authentication.",
    technologies: ["React", "Firebase", "Tailwind CSS", "dnd-kit"],
    imageUrl: "https://picsum.photos/seed/tasks/1200/800",
    imageHint: "kanban board",
    liveUrl: "https://example.com/tasks",
    githubUrl: "https://github.com/example/tasks",
  },
  {
    id: 3,
    title: "Portfolio Website V1",
    type: "web",
    description:
      "My previous portfolio website, designed to showcase my skills and projects. It features a minimalist design with a focus on typography and smooth animations.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    imageUrl: "https://picsum.photos/seed/portfolio/1200/800",
    imageHint: "developer portfolio",
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/example/portfolio",
  },
];

export const about = {
  name: "Sameer Harapnahalli",
  role: "Full-Stack Web & React Native Developer",
  bio: "I'm a full-stack web and React Native developer who builds polished user interfaces and reliable, scalable backends. I care deeply about clean architecture, performance, and design details that delight users and impress clients. I enjoy turning ideas into high-quality web and mobile products.",
};

export const skills: Skill[] = [
  { name: "React", icon: Code },
  { name: "React Native", icon: Code },
  { name: "Next.js", icon: Code },
  { name: "Tailwind CSS", icon: Wind },
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Figma", icon: PenTool },
  { name: "GenAI", icon: Bot },
];

export const socialLinks = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};
