import { MetadataRoute } from 'next';
import { getAllMdxContent } from '@/lib/mdx';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.guidetogear.com';
  const allContent = getAllMdxContent();

  const contentUrls = allContent.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: item.frontmatter.date ? new Date(item.frontmatter.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...contentUrls,
  ];
}
