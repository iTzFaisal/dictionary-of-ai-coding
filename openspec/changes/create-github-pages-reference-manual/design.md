## Context

The repository holds 69 dictionary entries as Markdown files in `dictionary/`, with short descriptions in frontmatter. `internal/Curriculum.md` is the canonical ordered grouping of those entries. `internal/generate-readme.ts` combines the same sources into the generated repository README, whose links are rewritten to heading anchors. The repository also has an AIHero push webhook and an existing public domain; neither is part of this change.

The new site is a separate GitHub Pages project site at `https://itzfaisal.github.io/dictionary-of-ai-coding/`. It is a quiet reference manual, optimized for lookup and structured browsing rather than conversion or an editorial learning experience.

## Goals / Non-Goals

**Goals:**
- Preserve the existing Markdown entries and curriculum as the only editable content source.
- Publish a static, fast, directly linkable reference manual on GitHub Pages.
- Make full-text lookup and curriculum browsing equally prominent.
- Support readable desktop and mobile layouts with minimal visual decoration.
- Preserve existing README and webhook publication behavior.

**Non-Goals:**
- Replacing or redirecting `aicodingdictionary.com`.
- Adding accounts, progress tracking, comments, analytics, a CMS, or server-side APIs.
- Introducing a second entry authoring format or duplicating Markdown content.
- Making the site a marketing or newsletter destination.

## Decisions

### Build a separate Astro static-site application

Use Astro with static output for the site application. Astro is suited to content-driven static pages, produces deployable HTML, and supports the GitHub Pages project base path. The configuration will set the Pages `site` URL and `/dictionary-of-ai-coding` base path so generated assets and links work in both production and local development.

The site will read `dictionary/` and `internal/Curriculum.md` directly at build time through a small shared content-loading layer. That layer will parse the existing frontmatter, map each curriculum term to its source file, derive a URL-safe slug from the filename, and validate that curriculum references resolve. This keeps the site and README generator independent consumers of the same source, rather than making either consume the other's output.

Alternatives considered:
- Render the generated `README.md`: rejected because the README flattens content and rewrites links for one page rather than providing term routes and search metadata.
- Copy Markdown into an Astro content directory: rejected because duplicated content would drift.
- Use a client-rendered single-page application: rejected because static term HTML and direct links are more appropriate for a reference manual.

### Use curriculum order as the navigation model

The home page will render curriculum sections and terms from `Curriculum.md`. Term pages will use the same flattened sequence to derive their previous and next links. A desktop sidebar will expose the curriculum continuously; a compact mobile navigation control will expose the same information at narrow widths.

Internal Markdown links between entry files will be rewritten to published term URLs during rendering. Those links also supply the related-term list on an entry page, so relationships are editorially explicit rather than inferred from search keywords.

### Use Pagefind for static full-text search

Run Pagefind after Astro generates the site. It creates a static index from the generated term pages and a browser-side search bundle. Search therefore covers rendered entry text without a remote index, credentials, or runtime service.

The search UI will be available from all reference pages and display titles, excerpts, and direct term links. Pagefind's static output will be included in the Pages artifact.

Alternatives considered:
- A hand-authored JSON index: rejected because indexing and snippet selection would become custom maintenance code.
- Hosted search: rejected because it adds operational dependencies that conflict with GitHub Pages hosting.
- Title-only filtering: rejected because it does not support looking up concepts by wording found within entries.

### Deploy Pages through GitHub Actions

Add a dedicated workflow that installs dependencies, builds the static site, uploads the generated artifact, and deploys it using GitHub Pages Actions. It will run on pushes to `github-pages` and support manual dispatch while the site is being tested. The existing README freshness and webhook workflows remain separate.

Pages must be configured in the GitHub repository to use GitHub Actions as its deployment source. The implementation will document this one-time repository setting.

### Keep the visual system sparse

The interface will prioritize text density, legible typography, strong contrast, visible focus states, and system dark-mode support. It will avoid hero sections, cards used as decoration, newsletter prompts, large illustrations, and motion that does not clarify interaction. Search, curriculum navigation, term content, and adjacent-term navigation are the visual hierarchy.

## Risks / Trade-offs

- [Markdown link paths contain spaces and URL encoding] → Normalize source references through one content loader and test linked terms with representative filenames.
- [Curriculum and directory contents can diverge] → Make the site build fail with a clear message when a curriculum term has no matching entry or an entry cannot be parsed.
- [Pagefind only indexes generated content] → Run indexing after the site build and verify that index assets are included in the deployment artifact.
- [Project Pages is served under a subpath] → Configure and test the Astro `base` value, including direct term URLs and search asset requests.
- [GitHub Pages requires repository configuration] → Document the required Pages source setting and retain an explicit deployment workflow.
- [A restrained layout can hide navigation on mobile] → Test keyboard access and narrow viewport behavior for both navigation and search.

## Migration Plan

1. Add the static-site application, canonical-content loader, and visual reference layout.
2. Add static search generation and verify the built output locally.
3. Add the independent Pages workflow and configure the repository's Pages source to GitHub Actions.
4. Deploy from `github-pages`, then verify the index, a direct term URL, internal links, mobile navigation, and search at the project Pages URL.
5. Roll back by disabling the Pages workflow or Pages deployment source; the current README and AIHero publication paths continue to operate unchanged.

## Open Questions

- None for the initial reference-manual scope. A custom domain, analytics, and richer relationship metadata can be evaluated after the static site is in use.
