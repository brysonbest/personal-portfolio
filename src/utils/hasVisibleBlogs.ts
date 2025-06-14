// This utility will return true if there are any visible (not hidden) blog posts.
import { getCollection } from 'astro:content'

export async function hasVisibleBlogs() {
  const posts = await getCollection('blog')
  return posts.some((p) => !p.data.hidden)
}
