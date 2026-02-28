import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const BASE_URL = 'https://memorygrain.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : new Date('2026-02-19')

  const blogPosts = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: `${BASE_URL}/`, lastModified: latestPostDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/spec/`, lastModified: new Date('2026-02-28'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: latestPostDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/about/`, lastModified: new Date('2026-02-28'), changeFrequency: 'monthly', priority: 0.7 },
    ...blogPosts,
  ]
}
