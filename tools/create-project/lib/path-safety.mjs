import fs from 'node:fs';
import path from 'node:path';

/**
 * Resolve and validate an output directory for user project export.
 * Rejects: same as source, inside source, ancestor of source, non-empty target (unless allowNonEmpty).
 */
export function assertSafeOutputPath(sourceRoot, outputPath, { allowNonEmpty = false } = {}) {
  const source = fs.realpathSync(path.resolve(sourceRoot));
  const outResolved = path.resolve(outputPath);

  let outReal = outResolved;
  if (fs.existsSync(outResolved)) {
    outReal = fs.realpathSync(outResolved);
  }

  if (outReal === source) {
    throw new Error(`Refusing to write into the source directory: ${outReal}`);
  }

  const relToSource = path.relative(source, outReal);
  if (relToSource === '' || (!relToSource.startsWith('..') && !path.isAbsolute(relToSource))) {
    throw new Error(`Refusing to write inside the source directory: ${outReal}`);
  }

  const relToOut = path.relative(outReal, source);
  if (relToOut === '' || (!relToOut.startsWith('..') && !path.isAbsolute(relToOut))) {
    throw new Error(`Refusing to write to a parent of the source directory: ${outReal}`);
  }

  if (fs.existsSync(outReal)) {
    const entries = fs.readdirSync(outReal).filter((name) => name !== '.git');
    if (entries.length > 0 && !allowNonEmpty) {
      throw new Error(
        `Output directory is not empty: ${outReal}. Use an empty folder, or --sync-lite for maintainer sync.`,
      );
    }
  }

  return { source, outReal, outResolved };
}

export function isIgnoredCopyName(name) {
  return (
    name === 'node_modules' ||
    name === 'dist' ||
    name === '.git' ||
    name === 'coverage' ||
    name === '.env' ||
    name === '.env.local' ||
    name === '.env.prod'
  );
}
