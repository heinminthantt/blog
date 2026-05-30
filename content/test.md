---
title: "Mastering Git Internals: What Happens When You Commit"
date: "2026-05-30"
summary: "An exploration into how Git handles files under the hood, breaking down blobs, trees, and commits."
tags: ["git", "internals", "devtools"]
---
# Mastering Git Internals
Today I decided to look past the basic `git add` and `git commit` surface commands to understand how Git actually tracks our code changes under the hood. 
Git isn't just a simple file tracker—it's a content-addressable filesystem.

---
## The Three Core Objects
When you commit a file, Git generates compressed snapshots and saves them inside the hidden `.git/objects` directory using SHA-1 hashes. There are three essential object types:
1. **Blobs:** Stored compressed binary data representing raw file contents. A blob doesn't store file names or directory structures—just the file data.
2. **Trees:** The equivalent of folders. A tree object lists file names, permissions, and links them to their corresponding file blobs or other nested trees.
3. **Commits:** A tiny text file containing a link to the top-level tree snapshot, author credentials, timestamps, and a pointer to the parent commit hash.

မြန်မာလိုရောအဆင်ပြေလား

## Simulating Object Generation
I ran some low-level Git plumbing commands in my terminal to see exactly how Git hashes content. 
```bash
# Hash a piece of text and write it directly into the Git object store
echo "Hello, Git Internals!" | git hash-object -w --stdin