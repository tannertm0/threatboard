"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  className?: string;
}

export function ProjectCarousel({ projects, className }: ProjectCarouselProps) {
  return (
    <Carousel 
      className={className}
      slideClassName="p-4 pb-10"
      interval={7000}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Carousel>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-60 overflow-hidden rounded-t-lg bg-muted">
        {/* Only render Image if imageUrl exists and is a string */}
        {typeof project.imageUrl === 'string' && project.imageUrl.length > 0 && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            onError={(e) => {
              // If image fails to load, replace with a solid color background
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        {/* Always show fallback - it will be covered by image if one exists and loads properly */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30">
          <span className="text-4xl font-medium text-primary/50">{project.title.substring(0, 1)}</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2">
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
            <Button variant="outline" size="sm">
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
          </Link>
        )}
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex ml-auto">
            <Button variant="default" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
} 