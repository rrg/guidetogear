import Link from 'next/link';
import { getAllMdxContent } from '@/lib/mdx';

export default function Home() {
  const allContent = getAllMdxContent();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Guide to Gear</h1>
        <p className="text-2xl text-gray-700 mb-4">
          Your Ultimate Resource for Equipment & Tools
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Comprehensive guides, reviews, and recommendations for gear, equipment, and tools. 
          Find the best products for your needs with expert advice and detailed comparisons.
        </p>
      </header>
      
      <section className="grid gap-6">
        <h2 className="text-3xl font-semibold text-gray-900">Latest Gear Guides & Reviews</h2>
        {allContent.length === 0 ? (
          <p className="text-gray-500">No content found. Add MDX files to the /content directory.</p>
        ) : (
          <div className="grid gap-4">
            {allContent.map((item) => (
              <article key={item.slug} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <Link href={`/${item.slug}`} className="block">
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {item.frontmatter.title}
                  </h3>
                  {item.frontmatter.description && (
                    <p className="text-gray-600 mb-3">{item.frontmatter.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {item.frontmatter.date && (
                      <time>{item.frontmatter.date}</time>
                    )}
                    {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
                      <div className="flex gap-2">
                        {item.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
