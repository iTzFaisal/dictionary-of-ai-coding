import assert from "node:assert/strict";
import test from "node:test";
import { loadDictionary, parseCurriculum, termSlug } from "../src/lib/dictionary.ts";

test("parses curriculum sections", () => {
  assert.deepEqual(parseCurriculum("## Section 1 — Start\n\n- AI\n"), [{ heading: "Section 1 — Start", terms: ["AI"] }]);
});

test("creates stable URL slugs", () => {
  assert.equal(termSlug("Next-token prediction"), "next-token-prediction");
  assert.equal(termSlug("AGENTS.md"), "agents-md");
});

test("loads every curriculum entry and resolves internal links", () => {
  const dictionary = loadDictionary();
  assert.equal(dictionary.entries.length, dictionary.sections.flatMap((section) => section.terms).length);
  const toolCall = dictionary.entriesByTerm.get("Tool call")!;
  assert.match(toolCall.html, /href="\.\.\/model\//);
  assert.deepEqual(toolCall.relatedTerms.slice(0, 2), ["Model", "Tool"]);
});
