"use client";

import Carousel from "@/components/ui/carousel";
import { isoModels } from "@/components/IsoModel";
import { completedProjects } from "@/lib/content/work";

export function WorkCarousel() {
  const slides = completedProjects.map((project) => {
    const Model = isoModels[project.model];
    return {
      title: project.title,
      category: project.category,
      description: project.description,
      icon: <Model />,
      image: project.image,
    };
  });

  return <Carousel slides={slides} />;
}
