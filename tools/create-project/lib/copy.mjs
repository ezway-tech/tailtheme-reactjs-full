import fs from 'node:fs';
import path from 'node:path';
import { isIgnoredCopyName } from './path-safety.mjs';

function matchGlob(relPosix, pattern) {
  const pat = pattern.replace(/\\/g, '/');
  if (pat.includes('**')) {
    const [pre, post] = pat.split('**/');
    if (post === '*' || post === '') {
      return relPosix === pre.slice(0, -1) || relPosix.startsWith(pre);
    }
    const prefix = pre;
    const suffix = post.startsWith('*.') ? post.slice(1) : null;
    if (!relPosix.startsWith(prefix) && prefix !== '') return false;
    if (suffix) return relPosix.endsWith(suffix) || path.posix.basename(relPosix).endsWith(suffix);
    // **/* under prefix
    if (post === '*') return relPosix.startsWith(prefix);
    // **/__tests__/** style
    const mid = post.replace(/\/\*\*$/, '').replace(/\*\*$/, '');
    return relPosix.includes(`/${mid}/`) || relPosix.includes(`${mid}/`) || relPosix.endsWith(mid);
  }
  if (pat.endsWith('/*')) {
    const dir = pat.slice(0, -2);
    return relPosix.startsWith(dir + '/') || relPosix === dir;
  }
  return relPosix === pat || relPosix.startsWith(pat + '/');
}

export function shouldExclude(relPosix, excludePatterns) {
  return excludePatterns.some((p) => {
    const pat = p.replace(/\\/g, '/');
    if (pat.startsWith('**/')) {
      const rest = pat.slice(3);
      if (rest.startsWith('*.')) {
        return path.posix.basename(relPosix).endsWith(rest.slice(1));
      }
      if (rest.endsWith('/**')) {
        const mid = rest.slice(0, -3);
        return relPosix.includes(`/${mid}/`) || relPosix.startsWith(`${mid}/`);
      }
      return path.posix.basename(relPosix) === rest || relPosix.endsWith(`/${rest}`);
    }
    return matchGlob(relPosix, pat);
  });
}

function walkFiles(absDir, baseRel = '') {
  const out = [];
  if (!fs.existsSync(absDir)) return out;
  for (const name of fs.readdirSync(absDir)) {
    if (isIgnoredCopyName(name)) continue;
    const abs = path.join(absDir, name);
    const rel = baseRel ? `${baseRel}/${name}` : name;
    const st = fs.lstatSync(abs);
    if (st.isSymbolicLink()) {
      // Do not follow symlinks out of tree — skip
      continue;
    }
    if (st.isDirectory()) {
      out.push(...walkFiles(abs, rel.replace(/\\/g, '/')));
    } else if (st.isFile()) {
      out.push(rel.replace(/\\/g, '/'));
    }
  }
  return out;
}

/**
 * Expand include patterns (file or glob ending with /**\/*) into relative posix paths.
 */
export function expandIncludes(sourceRoot, includePatterns, excludePatterns) {
  const selected = new Set();
  for (const pattern of includePatterns) {
    const pat = pattern.replace(/\\/g, '/');
    if (pat.endsWith('/**/*')) {
      const dir = pat.slice(0, -5);
      const abs = path.join(sourceRoot, dir);
      for (const rel of walkFiles(abs, dir)) {
        if (!shouldExclude(rel, excludePatterns)) selected.add(rel);
      }
    } else if (pat.includes('*')) {
      const dir = path.posix.dirname(pat);
      const abs = path.join(sourceRoot, dir === '.' ? '' : dir);
      const base = dir === '.' ? '' : dir;
      for (const rel of walkFiles(abs, base)) {
        if (matchGlob(rel, pat) && !shouldExclude(rel, excludePatterns)) selected.add(rel);
      }
    } else {
      const abs = path.join(sourceRoot, pat);
      if (!fs.existsSync(abs)) {
        throw new Error(`Missing required source file for export: ${pat}`);
      }
      const st = fs.lstatSync(abs);
      if (st.isDirectory()) {
        for (const rel of walkFiles(abs, pat)) {
          if (!shouldExclude(rel, excludePatterns)) selected.add(rel);
        }
      } else if (!shouldExclude(pat, excludePatterns)) {
        selected.add(pat);
      }
    }
  }
  return [...selected].sort();
}

export function copyFiles(sourceRoot, destRoot, relativeFiles, { dryRun = false } = {}) {
  const planned = [];
  for (const rel of relativeFiles) {
    const from = path.join(sourceRoot, rel);
    const to = path.join(destRoot, rel);
    planned.push({ from, to, rel });
    if (dryRun) continue;
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  return planned;
}
