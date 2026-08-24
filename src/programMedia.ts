export type ProgramMedia =
  | { kind: "video"; base: string }
  | { kind: "image"; src: string };

const programMedia: Record<string, ProgramMedia> = {
  "adults/ballroom-latin": { kind: "video", base: "proam-story" },
  "adults/womens-tango": { kind: "video", base: "tango-on-bars" },
  "adults/georgian-dance": { kind: "video", base: "georgian-dance" },
  "adults/ballet": { kind: "image", src: "/media/adult-ballet-hero-v1.png" },
  "adults/pro-am": { kind: "video", base: "proam-story" },
  "kids/ballroom-latin": { kind: "video", base: "kids-coaching" },
  "kids/ballet": { kind: "video", base: "kids-coaching" },
  "kids/georgian-dance": { kind: "video", base: "georgian-dance" },
};

export function getProgramMedia(audience: "adults" | "kids", slug: string): ProgramMedia | null {
  return programMedia[`${audience}/${slug}`] ?? null;
}
