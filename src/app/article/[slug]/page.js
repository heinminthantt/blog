// src/app/article/[slug]/page.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import ReadingProgress from "./ReadingProgress";
// Tell Next.js exactly what slugs exist at build time
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}
// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postsDirectory = path.join(process.cwd(), "content");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return {
    title: `${data.title} — Hein's Blog`,
    description: data.summary || `An article by Hein Min Thant`,
  };
}
// The Article Page Component
export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const postsDirectory = path.join(process.cwd(), "content");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const isBurmese = slug.startsWith('mm-');
  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />
      <div
        style={{
          minHeight: "calc(100vh - 120px)",
          padding: "2.5rem 1.5rem 4rem",
        }}
      >
        <article
          style={{ maxWidth: 720, margin: "0 auto" }}
          className="animate-fade-in-up"
        >
          {/* Back Button */}
          <Link href="/" className="back-btn" id="back-to-home">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13l-5-5 5-5" />
            </svg>
            All articles
          </Link>
          {/* Article Header */}
          <header
            style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
            className="animate-fade-in-up animate-delay-1"
          >
            <h1 className="article-header-title" id="article-title">
              {data.title}
            </h1>
            <div className="article-header-meta">
              {/* Date Badge */}
              <div className="badge" style={{ margin: 0 }}>
                <span className="badge-dot"></span>
                {data.date}
              </div>
              {/* Tags */}
              {data.tags &&
                data.tags.length > 0 &&
                data.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
            </div>
            {/* Summary */}
            {data.summary && (
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  marginTop: "1.25rem",
                  maxWidth: 560,
                }}
              >
                {data.summary}
              </p>
            )}
            {data.translation && (
              <Link
                href={`/article/${data.translation.replace(/\.md$/, "")}`}
                className="tag-pill mt-5 hover:underline"
              >
                {isBurmese ? "Read in English" : "မြန်မာဘာသာဖြင့် ဖတ်ရန်"}
              </Link>
            )}
          </header>
          {/* Divider */}
          <div
            className="divider animate-fade-in-up animate-delay-2"
            style={{ marginBottom: "2.5rem" }}
          ></div>
          {/* The Markdown Body Content */}
          <div className="prose-custom animate-fade-in-up animate-delay-3">
            <MDXRemote source={content} />
          </div>
          {/* Article Footer */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="animate-fade-in-up animate-delay-4"
          >
            <Link href="/" className="back-btn" id="bottom-back">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13l-5-5 5-5" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}