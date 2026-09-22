import type { Portfolio, Profile } from "./schema";
import { toProjectView, type ProjectInput } from "./project-view";
export interface PortfolioJSON {
  about: { text: string; skills: string[] };
  projects: ProjectInput[];
}
/** Frontend-only adapter: supply name, intro, and social metadata from your existing profile. */
export function fromPortfolioJSON(
  input: PortfolioJSON,
  profile: Profile,
): Portfolio {
  return {
    profile: {
      ...profile,
      about: input.about.text,
      skills: input.about.skills,
    },
    projects: input.projects.map((project, index) => {
      const view = toProjectView(project, index);
      return {
        ...view,
        order: index,
        category: ["AI / ML", "Full stack", "Open source"].includes(
          view.category,
        )
          ? (view.category as "AI / ML" | "Full stack" | "Open source")
          : "Full stack",
        visual: "orbit",
      };
    }),
    experience: [],
    education: [],
    technologies: input.about.skills.map((name, index) => ({
      id: "skill-" + index,
      order: index,
      name,
      category: "Toolkit",
      symbol: "+",
    })),
    achievements: [],
    socials: [],
  };
}
