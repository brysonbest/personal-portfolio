import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

export const collections = {
  projects: defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.{md,mdx}' }),
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
    loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
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
