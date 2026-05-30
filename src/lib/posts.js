// src/lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
const postsDirectory = path.join(process.cwd(), 'content');
export function getSortedPostsData() {
  // 1. Read all files inside the /content directory
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from the file name to use as the URL slug
    const slug = fileName.replace(/\.md$/, '');
    // Read the markdown file contents as a text string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Parse the metadata header using gray-matter
    const { data } = matter(fileContents);
    // Return the combined slug and metadata properties
    return {
      slug,
      ...data,
    };
  });
  // 2. Sort the list so your newest notes appear at the top
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}