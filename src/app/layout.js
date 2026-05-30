import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
export const metadata = {
  title: "Hein's Blog — Notes on Code & Systems",
  description:
    "Notes on code, systems, and the craft of building software. By Hein Min Thant.",
  authors: [{ name: "Hein Min Thant" }],
  openGraph: {
    title: "Hein's Blog",
    description: "Notes on code, systems, and the craft of building software.",
    type: "website",
    url: "https://blogheinminthant.com",
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {/* Background Effects */}
        <div className="bg-grid" aria-hidden="true"></div>
        <div className="bg-glow bg-glow--1" aria-hidden="true"></div>
        <div className="bg-glow bg-glow--2" aria-hidden="true"></div>
        {/* Navigation */}
        <nav className="nav-wrapper" id="site-nav">
          <div className="nav-inner">
            <Link href="/" className="nav-logo" id="nav-home">
              hein<span>.</span>blog
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link" id="nav-articles">
                Articles
              </Link>
              <a
                href="https://heinminthant.com"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-portfolio"
              >
                Portfolio
              </a>
              <a
                href="https://github.com/heinminthantt"
                className="nav-link-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                id="nav-github"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
        {/* Page Content */}
        <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
          {children}
        </div>
        {/* Footer */}
        <footer className="site-footer" id="site-footer">
          © 2026 <span>Hein Min Thant</span> — All rights reserved.
        </footer>
      </body>
    </html>
  );
}