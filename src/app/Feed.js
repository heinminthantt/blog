// src/app/Feed.js
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function Feed({ initialPosts }) {
    // 1. Interactive Control States
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Limits how many cards show per page

    // 2. Real-Time Processing Pipeline (Search & Sort)
    const processedPosts = useMemo(() => {
        let result = [...initialPosts];

        // Live keyword filter matching title, summary, or tags
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.summary?.toLowerCase().includes(query) ||
                post.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Dynamic timestamp sorting adjustment
        result.sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });

        return result;
    }, [searchQuery, sortOrder, initialPosts]);

    // 3. Pagination Slicing
    const totalPages = Math.ceil(processedPosts.length / postsPerPage) || 1;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = processedPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            {/* Dashboard Control Bar (Styled minimally to match your setup) */}
            <div className="animate-fade-in-up animate-delay-1" style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "2rem",
                alignItems: "center"
            }}>
                <input
                    type="text"
                    placeholder="Search articles or tags..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset pagination on new search
                    }}
                    style={{
                        flex: 2,
                        padding: "0.5rem 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        fontSize: "0.95rem",
                        outline: "none"
                    }}
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={{
                        padding: "0.4rem 0.6rem",
                        background: "transparent",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                        outline: "none",
                        cursor: "pointer"
                    }}
                >
                    <option value="newest" style={{ color: "#000" }}>Newest First</option>
                    <option value="oldest" style={{ color: "#000" }}>Oldest First</option>
                </select>
            </div>

            {/* Articles Feed Map - Using your exact card design schema */}
            {currentPosts.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {currentPosts.map(({ slug, title, date, summary, tags }, index) => (
                        <Link
                            href={`/article/${slug}`}
                            key={slug}
                            className={`article-card animate-fade-in-up animate-delay-${Math.min(index + 2, 4)}`}
                            id={`article-${slug}`}
                        >
                            <span className="article-card-date">{date}</span>
                            <h3 className="article-card-title">{title}</h3>
                            {summary && <p className="article-card-summary">{summary}</p>}

                            {tags && tags.length > 0 && (
                                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="tag-pill"
                                            onClick={(e) => {
                                                e.preventDefault(); // Stay on homepage stream frame
                                                setSearchQuery(tag); // Clicking tags auto-searches them
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="article-card-read">
                                Read article
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 3l5 5-5 5" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="empty-state" style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>No matching entries found.</p>
                </div>
            )}

            {/* Pagination Command Links - Matches your layout buttons */}
            {totalPages > 1 && (
                <div style={{
                    marginTop: "3rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="back-btn"
                        style={{ opacity: currentPage === 1 ? 0.3 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer", border: "none", background: "transparent" }}
                    >
                        ← Newer posts
                    </button>

                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}>
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="back-btn"
                        style={{ opacity: currentPage === totalPages ? 0.3 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer", border: "none", background: "transparent" }}
                    >
                        Older posts →
                    </button>
                </div>
            )}
        </>
    );
}