### Requirement: Publish a static reference site
The system SHALL build and publish the dictionary as a static GitHub Pages project site at the repository's GitHub Pages URL. The deployed site SHALL resolve all application routes and assets beneath the repository base path.

#### Scenario: Open the deployed index
- **WHEN** a reader opens the GitHub Pages project URL
- **THEN** the reader sees the dictionary reference site's index without a server-side application dependency

#### Scenario: Open a term through its direct URL
- **WHEN** a reader opens a published term URL directly
- **THEN** the term page and its assets load correctly beneath the project base path

### Requirement: Render canonical dictionary content
The site SHALL render entries from `dictionary/*.md` and their ordering from `internal/Curriculum.md` without maintaining a second editable copy of entry content. It SHALL render each entry's title, frontmatter description, and Markdown body.

#### Scenario: Add or revise an entry
- **WHEN** a dictionary entry is added or its source content is changed and the site is rebuilt
- **THEN** the published site reflects that entry or revision

#### Scenario: Change curriculum order
- **WHEN** the order of a term changes in `internal/Curriculum.md` and the site is rebuilt
- **THEN** the site's curriculum navigation and adjacent-term links reflect the new order

### Requirement: Provide curriculum navigation
The site SHALL provide an index organized by the curriculum's sections and terms. It SHALL expose the same navigation on term pages in a desktop sidebar and a mobile-accessible control.

#### Scenario: Browse a curriculum section
- **WHEN** a reader selects a section or term from the curriculum navigation
- **THEN** the reader can reach the selected term page

#### Scenario: Browse on a narrow viewport
- **WHEN** a reader visits the site on a narrow viewport
- **THEN** curriculum navigation remains accessible without requiring a permanent sidebar

### Requirement: Provide focused term pages
The site SHALL publish one stable page per dictionary term with the entry's content, links to its internally referenced terms, and previous/next links based on curriculum order. The interface SHALL use a restrained reference-manual presentation rather than promotional calls to action.

#### Scenario: Read a term
- **WHEN** a reader opens a term page
- **THEN** the page displays the term title, summary, body content, and links to related terms represented by internal entry links

#### Scenario: Move through the curriculum
- **WHEN** a reader selects the previous or next link on a non-terminal term page
- **THEN** the reader is taken to the immediately adjacent term in the curriculum

### Requirement: Deploy without disrupting existing publication paths
The GitHub Pages deployment SHALL run independently of the README freshness check and the existing AIHero webhook workflow. It SHALL not alter the `aicodingdictionary.com` domain or require a custom domain for the Pages site.

#### Scenario: Deploy after a main branch update
- **WHEN** a qualifying change is pushed to `main`
- **THEN** the Pages workflow builds and deploys the static site while the existing workflows remain configured

#### Scenario: Deploy after a github-pages branch update
- **WHEN** a qualifying change is pushed to `github-pages`
- **THEN** the Pages workflow builds and deploys the static site while the existing workflows remain configured
