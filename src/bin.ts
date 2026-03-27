#!/usr/bin/env node
import { getApiKey, writeConfig } from './core/client.js'

const args = process.argv.slice(2)
const hasArgs = args.length > 0

if (!hasArgs && !getApiKey()) {
  const { createInterface } = await import('node:readline/promises')

  console.error(`
  Welcome to bridgerton — Bridge.xyz CLI

  To get started, you need a Bridge API key.
  Get one at https://dashboard.bridge.xyz/app/keys
`)

  if (process.stdin.isTTY) {
    const rl = createInterface({ input: process.stdin, output: process.stderr })
    const key = (await rl.question('  Enter your API key: ')).trim()
    rl.close()

    if (!key) {
      console.error('\n  No key provided. You can set one later:\n\n    bridgerton set-key <your-api-key>\n')
      process.exit(1)
    }

    writeConfig({ api_key: key })
    const env = key.startsWith('sk-test') ? 'sandbox' : 'production'
    console.error(`\n  ✓ Saved to ~/.config/bridgerton/config.json (${env})`)
    console.error('\n  You\'re all set! Run bridgerton --help to see available commands.\n')
  } else {
    console.error('  Run:  bridgerton set-key <your-api-key>')
    console.error('  Or:   export BRIDGE_API_KEY=sk-live-...\n')
    process.exit(1)
  }
} else {
  const { default: cli } = await import('./cli.js')
  cli.serve()
}
