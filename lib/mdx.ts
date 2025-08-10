import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { z } from 'zod';

// Schema for frontmatter validation
const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

// Get all MDX files from content directory (including nested ones)
export function getMdxFiles() {
  const contentDir = path.join(process.cwd(), 'content');
  
  function getAllFiles(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...getAllFiles(fullPath));
      } else if (item.isFile() && item.name.endsWith('.mdx')) {
        // Get relative path from content directory
        const relativePath = path.relative(contentDir, fullPath);
        files.push(relativePath);
      }
    }
    
    return files;
  }
  
  return getAllFiles(contentDir);
}

// Parse MDX file and extract frontmatter
export function getMdxContent(filename: string) {
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  
  // Validate frontmatter
  const validatedData = FrontmatterSchema.parse(data);
  
  return {
    frontmatter: validatedData,
    content,
    slug: filename.replace('.mdx', ''),
  };
}

// Get all MDX content with metadata
export function getAllMdxContent() {
  const files = getMdxFiles();
  return files.map(filename => getMdxContent(filename));
}

// Compile MDX content for rendering
export async function compileMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true }
  });
  
  return content;
}
