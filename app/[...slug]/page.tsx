import { notFound } from 'next/navigation';
import { getMdxContent, getAllMdxContent, compileMdx } from '@/lib/mdx';

// Generate static params for all MDX files (including nested ones)
export async function generateStaticParams() {
  const allContent = getAllMdxContent();
  return allContent.map((item) => ({
    slug: item.slug.split('/'),
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const { frontmatter } = getMdxContent(`${slugPath}.mdx`);
    
    const url = `https://www.guidetogear.com/${slugPath}`;
    
    return {
      title: frontmatter.title,
      description: frontmatter.description || `Expert guide and review for ${frontmatter.title.toLowerCase()}. Find the best gear recommendations and buying advice.`,
      keywords: frontmatter.tags?.join(', ') || 'gear, equipment, reviews, guides',
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description || `Expert guide and review for ${frontmatter.title.toLowerCase()}. Find the best gear recommendations and buying advice.`,
        url,
        type: 'article',
        publishedTime: frontmatter.date,
        tags: frontmatter.tags,
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.description || `Expert guide and review for ${frontmatter.title.toLowerCase()}. Find the best gear recommendations and buying advice.`,
        images: ['/og-image.jpg'],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: 'Page Not Found | Guide to Gear',
      description: 'The page you are looking for could not be found.',
    };
  }
}

export default async function MdxPage({ params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const { frontmatter, content } = getMdxContent(`${slugPath}.mdx`);
    const mdxContent = await compileMdx(content);

    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": frontmatter.title,
      "description": frontmatter.description,
      "author": {
        "@type": "Organization",
        "name": "Guide to Gear"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Guide to Gear",
        "url": "https://www.guidetogear.com"
      },
      "datePublished": frontmatter.date,
      "dateModified": frontmatter.date,
      "url": `https://www.guidetogear.com/${slugPath}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.guidetogear.com/${slugPath}`
      },
      "keywords": frontmatter.tags?.join(', '),
      "articleSection": frontmatter.tags?.[0] || "Gear Reviews"
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
            {frontmatter.description && (
              <p className="text-xl text-gray-600">{frontmatter.description}</p>
            )}
            {frontmatter.date && (
              <time className="text-sm text-gray-500">{frontmatter.date}</time>
            )}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none">
            {mdxContent}
          </div>
        </article>
      </>
    );
  } catch {
    notFound();
  }
}
