import { getAllPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { GrainShowcase } from '@/components/home/GrainShowcase'
import { EnterpriseSection } from '@/components/home/EnterpriseSection'
import { ConformanceLevels } from '@/components/home/ConformanceLevels'
import { BlogPreview } from '@/components/home/BlogPreview'
import { HomeCTA } from '@/components/home/HomeCTA'

export const metadata = buildMetadata()

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)
  return (
    <>
      <Hero />
      <HowItWorks />
      <GrainShowcase />
      <EnterpriseSection />
      <ConformanceLevels />
      <BlogPreview posts={posts} />
      <HomeCTA />
    </>
  )
}
