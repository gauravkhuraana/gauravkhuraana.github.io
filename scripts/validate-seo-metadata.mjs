#!/usr/bin/env node

import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import matter from 'gray-matter';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDirectories = ['docs', 'blog'];

async function findContentFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return findContentFiles(entryPath);
    }

    return /\.mdx?$/.test(entry.name) ? [entryPath] : [];
  }));

  return files.flat();
}

function validateMetadata(metadata) {
  const errors = [];

  for (const field of ['title', 'description', 'image']) {
    if (typeof metadata[field] !== 'string' || metadata[field].trim() === '') {
      errors.push(`missing or empty ${field}`);
    }
  }

  if (!Array.isArray(metadata.keywords) || metadata.keywords.length === 0) {
    errors.push('missing or empty keywords');
  }

  return errors;
}

const contentFiles = (await Promise.all(
  contentDirectories.map((directory) => findContentFiles(path.join(rootDirectory, directory))),
)).flat().sort();

const failures = [];

for (const file of contentFiles) {
  const source = await readFile(file, 'utf8');
  const {data} = matter(source);
  const errors = validateMetadata(data);

  if (errors.length > 0) {
    failures.push({
      file: path.relative(rootDirectory, file).replaceAll(path.sep, '/'),
      errors,
    });
  }
}

if (failures.length > 0) {
  console.error(`SEO metadata validation failed for ${failures.length} file(s):`);
  for (const failure of failures) {
    console.error(`- ${failure.file}: ${failure.errors.join(', ')}`);
  }
  process.exitCode = 1;
} else {
  console.log(`SEO metadata is valid for ${contentFiles.length} content file(s).`);
}