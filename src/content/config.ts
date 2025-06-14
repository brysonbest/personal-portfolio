import { defineCollection, z } from 'astro:content'

export const collections = {
  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      projectDate: z.coerce.date(),
      author: z.string(),
      tags: z.array(z.string()),
      githubUrl: z.string(),
      liveUrl: z.string(),
      heroImage: z.string(),
    }),
  }),
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string(),
      heroImage: z.string().optional(),
      author: z.string().optional(),
      hidden: z.boolean().optional(),
    }),
  }),
}
