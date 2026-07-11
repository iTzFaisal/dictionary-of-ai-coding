## ADDED Requirements

### Requirement: Search dictionary content
The static site SHALL provide client-side full-text search over each entry's title, frontmatter description, and rendered body content. Search SHALL not require an application server or third-party search service at runtime.

#### Scenario: Find a matching term
- **WHEN** a reader enters text that matches an entry title, summary, or body text
- **THEN** the site displays matching entries with a title, contextual summary, and link to the term page

#### Scenario: Search returns no matches
- **WHEN** a reader enters text that matches no entry
- **THEN** the site clearly indicates that no matching terms were found

### Requirement: Make search available from reference pages
The site SHALL expose the search control on the index and term pages, including narrow viewports.

#### Scenario: Search from a term page
- **WHEN** a reader opens search while viewing a term page and submits a query
- **THEN** the reader can view and open matching dictionary entries

#### Scenario: Search on a narrow viewport
- **WHEN** a reader uses the site on a narrow viewport
- **THEN** the search control remains operable without relying on desktop navigation
