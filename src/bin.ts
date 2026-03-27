#!/usr/bin/env node
import { readFileSync } from 'node:fs'

// Load .env if present (bun does this automatically, node does not)
try {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const [k, ...v] = line.split('=')
    if (k && !k.startsWith('#')) process.env[k.trim()] ??= v.join('=').trim()
  }
} catch {}

const { default: cli } = await import('./cli.js')
cli.serve()
