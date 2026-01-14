# Part 3: Prompt Preparation

## Chosen PR
beetbox/beets – PR #3509

---

## 3.1.1 Repository Context 
Beets is a command-line music library manager designed for users who want precise control over audio metadata and file organization. Its primary users are music collectors, archivists, and developers who maintain large digital libraries. The tool automates tagging, renaming, and organizing music files while remaining highly configurable through plugins and YAML-based settings. Beets emphasizes reliability during batch operations, allowing users to process thousands of files with minimal manual intervention. The repository addresses challenges related to inconsistent metadata, missing files, and varying directory structures.

---

## 3.1.2 Pull Request Description
This pull request improves how Beets handles missing or invalid album artwork during imports. Previously, artwork processing assumed valid image files, which could cause runtime errors. The PR introduces safer handling by validating file existence and catching I/O exceptions. The new behavior allows imports to continue while issuing warnings instead of failing entirely. This change is necessary because real-world music collections are often incomplete or inconsistently tagged.

---

## 3.1.3 Acceptance Criteria
✓ When album art is missing, the import should continue without crashing  
✓ The system should log a clear warning for missing artwork  
✓ Valid artwork should still be processed normally  
✓ No exceptions should propagate to the CLI layer  
✓ Existing behavior remains unchanged when artwork is present  

---

## 3.1.4 Edge Cases
- Corrupted image files
- Permission-denied errors on artwork paths
- Large batch imports with mixed valid/invalid artwork

---

## 3.1.5 Initial Prompt (≈400 words)
[Prompt text instructing a model to implement safe artwork handling, referencing acceptance criteria, edge cases, tests, and repository context.]
