## Why

The dictionary is currently readable as a generated README and through a separate external site, but it has no standalone project website optimized for looking up terms or moving through the curriculum. A GitHub Pages reference manual makes the repository's content available as a searchable, durable static site without changing the existing external domain or publication workflow.

## What Changes

- Add a static GitHub Pages site at the repository's project Pages URL.
- Generate a quiet reference-manual interface from the existing `dictionary/*.md` entries and `internal/Curriculum.md` ordering.
- Provide an index page with curriculum navigation and full-text search across entries.
- Provide a stable page for every dictionary term, including its source content, curriculum position, related links, and previous/next navigation.
- Build a static search index with no runtime backend.
- Deploy the built site through GitHub Actions while retaining the README generation and existing webhook workflows.

## Capabilities

### New Capabilities
- `dictionary-reference-site`: Publish the dictionary as a static, curriculum-navigable reference manual on GitHub Pages.
- `dictionary-search`: Let readers search the dictionary's term titles, summaries, and entry content in the static site.

### Modified Capabilities

- None.

## Impact

- Adds a static-site application, its build configuration, and site styles/components.
- Adds a GitHub Pages deployment workflow and static search build dependency.
- Reads existing `dictionary/` Markdown and `internal/Curriculum.md` as the site's source of truth.
- Does not change `README.md` generation, the existing AIHero webhook, or the `aicodingdictionary.com` domain.
