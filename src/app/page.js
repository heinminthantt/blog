// src/app/page.js
import { getSortedPostsData } from "@/lib/posts";
import Feed from "./Feed"; // Pulling in our filtering view pipeline

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Hero Section - KEEPS YOUR EXACT DESIGN ALIVE */}
      <header
        style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem 0" }}
        className="animate-fade-in-up"
      >
        <div className="badge" id="status-badge" style={{ marginBottom: "1.5rem" }}>
          <span className="badge-dot"></span>
          Writing & learning
        </div>

        <h1 className="hero-heading" id="hero-title">
          Notes on <span>code</span>,<br />
          systems & craft.
        </h1>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 520, marginTop: "1rem", marginBottom: "2rem" }}>
          Documenting my software engineering journey — from low-level internals
          to the tools and systems I build every day.
        </p>

        <div className="divider"></div>
      </header>

      {/* Interactive Articles Listing Section */}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>

        {/* Total Metric Label */}
        <div
          className="animate-fade-in-up animate-delay-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Latest Articles
          </h2>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}>
            {allPosts.length} {allPosts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {/* This component injects search, sort, and pagination perfectly */}
        <Feed initialPosts={allPosts} />

      </main>
    </div>
  );
}