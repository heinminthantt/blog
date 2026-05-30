// src/app/page.js
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Hero Section */}
      <header
        style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem 0" }}
        className="animate-fade-in-up"
      >
        {/* Status Badge */}
        <div className="badge" id="status-badge" style={{ marginBottom: "1.5rem" }}>
          <span className="badge-dot"></span>
          Writing & learning
        </div>

        {/* Heading */}
        <h1 className="hero-heading" id="hero-title">
          Notes on <span>code</span>,<br />
          systems & craft.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: 520,
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Documenting my software engineering journey — from low-level internals
          to the tools and systems I build every day.
        </p>

        {/* Divider */}
        <div className="divider"></div>
      </header>

      {/* Articles Feed */}
      <main
        style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}
      >
        {/* Section Label */}
        <div
          className="animate-fade-in-up animate-delay-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Latest Articles
          </h2>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            {allPosts.length} {allPosts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {/* Article Cards */}
        {allPosts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {allPosts.map(({ slug, title, date, summary, tags }, index) => (
              <Link
                href={`/article/${slug}`}
                key={slug}
                className={`article-card animate-fade-in-up animate-delay-${Math.min(index + 2, 4)}`}
                id={`article-${slug}`}
              >
                {/* Date */}
                <span className="article-card-date">{date}</span>

                {/* Title */}
                <h3 className="article-card-title">{title}</h3>

                {/* Summary */}
                {summary && (
                  <p className="article-card-summary">{summary}</p>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read CTA */}
                <div className="article-card-read">
                  Read article
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-in-up animate-delay-2">
            <svg
              width="64"
              height="64"
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              No articles yet
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              New posts will appear here as markdown files are added to the
              content directory.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}