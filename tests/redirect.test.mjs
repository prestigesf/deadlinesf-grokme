import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("index.html is preserved (nothing deleted)", () => {
  assert.ok(fs.existsSync("index.html"));
  const html = fs.readFileSync("index.html", "utf8");
  assert.ok(html.length > 1000);
});

test("_redirects and netlify.toml configure a forced 301 redirect to https://deadlinesf.net", () => {
  const redirects = fs.readFileSync("_redirects", "utf8");
  assert.match(redirects, /^\/\*\s+https:\/\/deadlinesf\.net\/:splat\s+301!\s*$/m);

  const toml = fs.readFileSync("netlify.toml", "utf8");
  assert.match(toml, /\[\[redirects\]\]/);
  assert.match(toml, /from\s*=\s*"\/\*"/);
  assert.match(toml, /to\s*=\s*"https:\/\/deadlinesf\.net\/:splat"/);
  assert.match(toml, /status\s*=\s*301/);
  assert.match(toml, /force\s*=\s*true/);
});
