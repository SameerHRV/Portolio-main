import type { Project, Skill } from './types';
import { Github, Globe, Code, PenTool, Database, Server, Wind, Bot } from 'lucide-react';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a modern UI, product management, and a secure checkout process. Built with a focus on performance and user experience.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'online store',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application that helps teams organize, track, and manage their work. Features include drag-and-drop boards, real-time updates, and user authentication.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'dnd-kit'],
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'kanban board',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Portfolio Website V1',
    description: 'My previous portfolio website, designed to showcase my skills and projects. It features a minimalist design with a focus on typography and smooth animations.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'developer portfolio',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const about = {
  name: 'Alex Doe',
  role: 'Full-Stack Developer',
  bio: "I'm a passionate full-stack developer with a love for creating beautiful, functional, and user-centered digital experiences. With a background in design and a strong command of modern web technologies, I bridge the gap between aesthetics and performance. I'm always eager to learn new things and take on challenging projects that push my skills to the next level."
};


export const skills: Skill[] = [
  { name: 'React', icon: Code },
  { name: 'Next.js', icon: Code },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'TypeScript', icon: Code },
  { name: 'Node.js', icon: Server },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Figma', icon: PenTool },
  { name: 'GenAI', icon: Bot },
];

export const socialLinks = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
};
