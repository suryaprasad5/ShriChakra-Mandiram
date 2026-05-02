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

## Google Sheet Admin Flow

The hidden admin page at `/admin` is designed to follow the same lightweight pattern as the Turnkey website:

- Public pages can read from a Google Sheet published to web as CSV.
- Admin actions can write through a Google Apps Script web app using GET requests.
- Google Drive image links are converted to thumbnail URLs such as `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000`.
- No Google API key is required for this setup.

Put the temple Apps Script URL and optional CSV URLs in:

```txt
public/temple-content-config.js
```

After build/export, that file is also available at:

```txt
temple-content-config.js
```

Suggested Google Sheet tabs and columns:

```txt
Events: id, title, date, location, summary, invitation_url, invitation_image, gallery_folder_url, gallery_folder_id, status, featured
GallerySections: id, event_title, section_name, description, drive_folder_url, drive_folder_id, status, sort_order
Sevas: id, name, description, price, active, sort_order
```

Expected Apps Script actions:

```txt
read
saveEvent
saveGallerySection
saveSeva
```

An Apps Script starter is included at `scripts/apps-script.gs`. Paste it into the Google Sheet's Apps Script editor, replace `SHEET_ID`, deploy it as a web app, and put the Web App URL into `public/temple-content-config.js`.

For Drive images and folders, set sharing to "Anyone with the link can view" before pasting links into the admin page. A static site cannot list a Google Drive folder by itself; the included Apps Script uses `DriveApp` to expand a folder into image thumbnail URLs without a browser-side API key.

## Future Backend

The app is structured so a Node.js backend or PostgreSQL-backed API can be added later. When moving away from GitHub Pages to a Node hosting target, set:

```bash
GITHUB_PAGES=false
```

That disables the static export and repository base path in `next.config.mjs`.

