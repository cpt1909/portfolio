import type { Project } from "./schema";
export interface ProjectInput {
  id?: string;
  title: string;
  description: string;
  imageURL?: string;
  liveLink?: string;
  githubLink?: string;
  techStack: string[];
  category?: string;
}
export interface ProjectView {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  live: string;
  github: string;
  stack: string[];
  category: string;
}
function safeUrl(value?: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
// Accepts the existing database shape and the proposed JSON shape.
export function toProjectView(
  project: Project | ProjectInput,
  index: number,
): ProjectView {
  const external = "techStack" in project;
  return {
    id: project.id || "project-" + index,
    title: project.title,
    description: project.description,
    category: project.category || "Full stack",
    stack: external ? project.techStack : project.stack,
    imageURL: safeUrl("imageURL" in project ? project.imageURL : undefined),
    live: safeUrl(external ? project.liveLink : project.live),
    github: safeUrl(external ? project.githubLink : project.github),
  };
}
