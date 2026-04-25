# ShriChakra Mandiram

Next.js site for ShriChakra Mandiram.

## Development

```bash
npm install
npm run dev
```

The GitHub Pages build uses the `/ShriChakra-Mandiram` base path. For local production-style testing, open:

```txt
http://127.0.0.1:3000/ShriChakra-Mandiram
```

## Build

```bash
npm run build
```

By default, the app exports static files to `out/` for GitHub Pages.

## Future Backend

The app is structured so a Node.js backend or PostgreSQL-backed API can be added later. When moving away from GitHub Pages to a Node hosting target, set:

```bash
GITHUB_PAGES=false
```

That disables the static export and repository base path in `next.config.mjs`.

