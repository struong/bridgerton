# bridgerton

## 0.3.0

### Minor Changes

- [`31efa71`](https://github.com/struong/bridgerton/commit/31efa71eae8504e9262c3c7c46a5bc4de9eedfef) Thanks [@struong](https://github.com/struong)! - Add `configure` subcommand group for persistent CLI settings:

  - `configure api-key` — save API key to `~/.config/bridgerton/config.json`
  - `configure format` — set default output format (toon, json, yaml, md, jsonl)
  - `configure show` — display current config with masked key and source

- [`31efa71`](https://github.com/struong/bridgerton/commit/31efa71eae8504e9262c3c7c46a5bc4de9eedfef) Thanks [@struong](https://github.com/struong)! - Interactive onboarding on first run — prompts for API key when none is configured and no arguments are passed.

### Patch Changes

- [`f7a7442`](https://github.com/struong/bridgerton/commit/f7a744258cdb8c59233600a590eb1469f781ceae) Thanks [@struong](https://github.com/struong)! - Remove dead code from client.ts (unused `promptForKey`/`ensureApiKey`), replace sloppy `as any` cast with proper Format type, and use Node shebang for cross-runtime support.

## 0.2.0

### Minor Changes

- Add API parity for customers, wallets, liquidation, virtual accounts, and prefunded accounts.

  **New domains:**

  - `prefunded-accounts` — list, get, history

  **New commands:**

  - `customers update`, `delete`, `tos-link`, `kyc-link`, `tos-acceptance-link`, `transfers`
  - `wallets list-all`, `total-balances`, `history`
  - `liquidation update`, `all-drains`
  - `virtual-accounts list-all`, `update`, `deactivate`, `reactivate`, `activity`, `all-activity`
  - `external-accounts` — create, get, list, delete
