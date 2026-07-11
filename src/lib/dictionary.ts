import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import MarkdownIt from "markdown-it";

const ROOT = process.cwd();
const DICTIONARY_DIR = join(ROOT, "dictionary");
const CURRICULUM_PATH = join(ROOT, "internal", "Curriculum.md");
const SECTION_RE = /^## Section \d+ — .+$/;

export type Section = { heading: string; terms: string[] };
export type DictionaryEntry = {
  term: string;
  slug: string;
  description: string;
  body: string;
  html: string;
  relatedTerms: string[];
};
export type Dictionary = {
  sections: Section[];
  entries: DictionaryEntry[];
  entriesByTerm: Map<string, DictionaryEntry>;
};

export function termSlug(term: string): string {
  return term
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseCurriculum(text: string): Section[] {
  const sections: Section[] = [];
  let current: Section | undefined;

  text.split("\n").forEach((raw, index) => {
    const line = raw.trimEnd();
    if (!line) return;
    if (line.startsWith("## ")) {
      if (!SECTION_RE.test(line)) {
        throw new Error(`Curriculum.md:${index + 1}: invalid section heading: ${line}`);
      }
      current = { heading: line.slice(3), terms: [] };
      sections.push(current);
      return;
    }
    if (line.startsWith("- ") && current) {
      const term = line.slice(2);
      if (!term || term.trim() !== term || /[*_`\[]/.test(term)) {
        throw new Error(`Curriculum.md:${index + 1}: invalid term: ${line}`);
      }
      current.terms.push(term);
      return;
    }
    throw new Error(`Curriculum.md:${index + 1}: expected a section or term: ${line}`);
  });
  return sections;
}

function renderEntry(body: string, byFilename: Map<string, DictionaryEntry>) {
  const relatedTerms: string[] = [];
  const rewritten = body.replace(/\]\(\.\/([^)]+)\)/g, (match, target: string) => {
    const [filename, fragment] = target.split("#", 2);
    const entry = byFilename.get(decodeURIComponent(filename));
    if (!entry) return match;
    if (!relatedTerms.includes(entry.term)) relatedTerms.push(entry.term);
    return `](../${entry.slug}/${fragment ? `#${fragment}` : ""})`;
  });
  return { html: new MarkdownIt({ html: false, linkify: true }).render(rewritten), relatedTerms };
}

function parseEntry(source: string, term: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`dictionary/${term}.md must begin with frontmatter`);
  const descriptionLine = match[1].split("\n").find((line) => line.startsWith("description: "));
  if (!descriptionLine) throw new Error(`dictionary/${term}.md must have a description`);
  const description = descriptionLine.slice("description: ".length).trim();
  if (!description) throw new Error(`dictionary/${term}.md must have a non-empty description`);
  return { description, body: match[2] };
}

export function loadDictionary(): Dictionary {
  const sections = parseCurriculum(readFileSync(CURRICULUM_PATH, "utf8"));
  const curriculumTerms = sections.flatMap((section) => section.terms);
  const seen = new Set<string>();
  for (const term of curriculumTerms) {
    if (seen.has(term)) throw new Error(`Curriculum.md contains duplicate term "${term}"`);
    seen.add(term);
  }

  const filenames = readdirSync(DICTIONARY_DIR).filter((name) => name.endsWith(".md"));
  const availableTerms = new Set(filenames.map((name) => name.slice(0, -3)));
  const missing = curriculumTerms.filter((term) => !availableTerms.has(term));
  const orphaned = [...availableTerms].filter((term) => !seen.has(term)).sort();
  if (missing.length || orphaned.length) {
    throw new Error(`Dictionary and curriculum differ: missing ${missing.join(", ") || "none"}; orphaned ${orphaned.join(", ") || "none"}`);
  }

  const entries = curriculumTerms.map((term) => {
    const parsed = parseEntry(readFileSync(join(DICTIONARY_DIR, `${term}.md`), "utf8"), term);
    return { term, slug: termSlug(term), description: parsed.description, body: parsed.body, html: "", relatedTerms: [] };
  });
  const byFilename = new Map(entries.map((entry) => [`${entry.term}.md`, entry]));
  for (const entry of entries) Object.assign(entry, renderEntry(entry.body, byFilename));
  return { sections, entries, entriesByTerm: new Map(entries.map((entry) => [entry.term, entry])) };
}
