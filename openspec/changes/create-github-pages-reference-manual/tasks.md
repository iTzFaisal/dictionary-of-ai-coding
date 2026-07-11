## 1. Site Foundation

- [x] 1.1 Create an Astro static-site application configured for the repository's GitHub Pages URL and `/dictionary-of-ai-coding` base path.
- [x] 1.2 Add build, development, typecheck, and static-search scripts and install the required Astro, Markdown, and Pagefind dependencies.
- [x] 1.3 Implement a build-time content loader that parses dictionary frontmatter and Markdown, parses the curriculum, validates referenced entries, creates term slugs, and exposes curriculum order.
- [x] 1.4 Implement Markdown rendering that rewrites internal dictionary links to published term routes and collects explicit related terms.

## 2. Reference Manual Interface

- [x] 2.1 Create the shared page layout with restrained typography, system dark-mode support, accessible focus states, and responsive desktop/mobile behavior.
- [x] 2.2 Build the curriculum navigation for the index, desktop term sidebar, and mobile navigation control from the canonical curriculum data.
- [x] 2.3 Build the index page with search entry point and curriculum-organized term links.
- [x] 2.4 Generate one term page per dictionary entry with its title, description, rendered body, related terms, and previous/next curriculum links.
- [x] 2.5 Verify generated term URLs, root-relative assets, and internal term links work beneath the configured GitHub Pages base path.

## 3. Static Search

- [x] 3.1 Mark generated term content for Pagefind and run Pagefind after the Astro build to produce static index assets.
- [x] 3.2 Implement the client-side search control and result list with direct term links, contextual summaries, loading feedback, and an empty-results state.
- [x] 3.3 Make search usable from index and term pages at desktop and narrow viewport widths.

## 4. Deployment And Verification

- [x] 4.1 Add a dedicated GitHub Actions workflow that builds the site, uploads the Pages artifact, and deploys it on pushes to `main` and manual dispatch.
- [x] 4.2 Document the GitHub repository setting that selects GitHub Actions as the Pages deployment source and confirm no custom domain is configured for this site.
- [x] 4.3 Add automated checks for curriculum parsing, term slug/link resolution, and static site generation.
- [ ] 4.4 Run type checks and production builds, then manually verify the deployed index, a direct term URL, search, internal links, and mobile navigation.
