// src/lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
const postsDirectory = path.join(process.cwd(), 'content');
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  // It drops any filename that starts with 'mm-' for the homepage list
  const englishFileNames = fileNames.filter(fileName => !fileName.startsWith('mm-'));
  // Swap fileNames.map to englishFileNames.map
  const allPostsData = englishFileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      ...data,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}