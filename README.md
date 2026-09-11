# Shree Gajanan Industries — Website Designs

Official web showcase for **Shree Gajanan Industries**, Nizamabad (Est. 1969) — premier non-Basmati rice millers specializing in Sona Masoori, Wada Kolam, and Jeera Sambha.

## Design Versions Included

- **UI 01 ([index.html](index.html)):** Clean, organic editorial layout with interactive variety spotlights, trade inquiry forms, and multilingual switcher.
- **UI 02 ([ui-2.html](ui-2.html)):** Rich heritage invitation theme with royal maroon, temple motifs, and gold embroidery card styling.
- **UI 03 ([ui-3.html](ui-3.html)):** Modern GSAP-powered landing page featuring Deckard-inspired inline-badge typography and physics-based falling/rotating rice bag cards gallery.

## Local Setup

Run any static server or use Python:
```bash
python3 -m http.server 8080
```
Visit `http://localhost:8080` in your browser.

## Technologies Used
- HTML5 / Vanilla CSS3
- GSAP 3 & ScrollTrigger (UI 03)
- Responsive Design & Touch Controls
- SVG Grain Overlays & Typography Design
# Gajanan Industries website

## Content Studio and enquiries

Run the local Content Studio with:

```sh
node admin-server.mjs
```

Open `http://localhost:4173/admin.html`. It provides a single control room for:

- Editing live headings, copy, form labels, links and images directly in the page preview.
- Uploading replacement images as normal deployable site files.
- Switching between the website, Blogs, Culture, Careers and Women at Work pages to edit their content.
- Viewing, tracking and resolving every website form enquiry.
- Publishing the saved content manifest and uploaded media through the connected GitHub deployment branch.

The public website reads `admin-content.json` on load, so changes saved and published from the studio are reflected on the deployed website after that deployment branch finishes building. Do not open `admin.html` directly from the filesystem: it must be served through `admin-server.mjs` for saving, uploads, publishing and the enquiry inbox.

To email each public enquiry automatically to `info@gajanan.net`, configure a Resend API key and verified sender before starting the server:

```sh
export RESEND_API_KEY=re_your_resend_api_key
export MAIL_FROM='Gajanan Industries <enquiries@gajanan.net>'
export ENQUIRY_EMAIL=info@gajanan.net
export ADMIN_ACCESS_CODE='use-a-long-random-secret-code'
node admin-server.mjs
```

`ADMIN_ACCESS_CODE` is the single private code for the admin portal. It stays in the server environment only—it is not embedded in the website or committed to Git.

The public enquiry form posts to `/api/inquiries`; submissions are stored in the SQLite database `gajanan-admin.db` and forwarded using the configured email relay. In production, set `ADMIN_DB_PATH` to persistent storage. A static-only host cannot process enquiry submissions: deploy `admin-server.mjs` to a Node host with persistent disk, or replace the SQLite layer with a managed database before scaling.
