// src/lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Keeps your Burmese files hidden from the homepage stream
  const englishFileNames = fileNames.filter(fileName => !fileName.startsWith('mm-'));

  const allPostsData = englishFileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      summary: data.summary || '',
      tags: data.tags || [], // 👈 CRITICAL: This safe fallback array prevents search crashes!
      ...data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}