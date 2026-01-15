#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const DOCS_DIR = join(process.cwd(), 'docs');

async function main() {
  const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true }).catch(async (err) => {
    if (err.code === 'ENOENT') {
      console.error('[lint-docs] docs directory missing');
      process.exitCode = 1;
      return [];
    }
    throw err;
  });

  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
  let failures = 0;

  for (const file of files) {
    const filePath = join(DOCS_DIR, file.name);
    const raw = await fs.readFile(filePath, 'utf-8');
    const lines = raw.split('\n');

    // Rule 1: no trailing whitespace
    lines.forEach((line, index) => {
      if (/\s+$/.test(line)) {
        console.error(`[lint-docs] ${file.name}:${index + 1} trailing whitespace`);
        failures += 1;
      }
    });

    // Rule 2: no TODO placeholders left behind
    if (/TODO/i.test(raw)) {
      console.error(`[lint-docs] ${file.name} contains TODO; replace before committing`);
      failures += 1;
    }
  }

  if (failures > 0) {
    console.error(`[lint-docs] failed with ${failures} issue${failures === 1 ? '' : 's'}`);
    process.exit(1);
  } else {
    console.log('[lint-docs] all documentation checks passed');
  }
}

main().catch((error) => {
  console.error('[lint-docs] unexpected error', error);
  process.exit(1);
});
