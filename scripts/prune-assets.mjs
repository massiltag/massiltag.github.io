// Deletes built assets that no page uses. Astro emits the assets of every imported component,
// so without this the disabled build would still publish the portrait and the full site's script.
// usage: node scripts/prune-assets.mjs [outDir]   (defaults to docs)
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const outDir = process.argv[2] ?? 'docs';
const assetsDir = join(outDir, '_astro');
const TEXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.webmanifest']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

let assets;
try {
  assets = readdirSync(assetsDir);
} catch {
  process.exit(0);
}

const pages = walk(outDir).filter((f) => f.endsWith('.html'));
const kept = new Set();
const queue = [...pages];
while (queue.length) {
  const content = readFileSync(queue.pop(), 'utf8');
  for (const name of assets) {
    if (kept.has(name) || !content.includes(name)) continue;
    kept.add(name);
    if (TEXT.has(extname(name))) queue.push(join(assetsDir, name));
  }
}

const removed = assets.filter((name) => !kept.has(name));
for (const name of removed) rmSync(join(assetsDir, name));
console.log(`prune-assets: kept ${kept.size}, removed ${removed.length}${removed.length ? ` (${removed.join(', ')})` : ''} in ${relative('.', assetsDir)}`);
