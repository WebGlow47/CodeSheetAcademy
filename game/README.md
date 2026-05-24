# CodeSheet Academy

A static HTML, CSS, and JavaScript learning website for HTML/CSS beginners and growing developers.

## Files

- `index.html` - main website
- `style.css` - visual design and responsive layout
- `script.js` - theme toggle, mobile menu, search, quiz, progress tracker, playground, and reveal animations
- `HTML_CSS_Cheat_Sheet.docx` - downloadable cheat sheet
- `404.html` - not-found page for static hosting
- `robots.txt` - crawler rules
- `site.webmanifest` and `favicon.svg` - app metadata and icon

## Publish

Upload the folder to a static host such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

Before publishing:

1. Open `index.html` locally and test all links.
2. Test on mobile width.
3. Test search, quiz, copy buttons, progress tracker, playground, and download button.
4. Replace social/canonical URLs in `index.html` if you have a real domain.
5. The support section is configured with the Lebanon number `+961 71 133 856`; change it in `index.html` if needed.
6. To show real visitor numbers, create a backend counter endpoint and paste its URL into `VISITOR_COUNTER_ENDPOINT` in `script.js`.

## Visitor Counter

The site does not fake visitor numbers. A static website needs a backend, database, analytics service, or serverless function to count real visitors across devices.

The JavaScript expects your endpoint to accept a `POST` request and return JSON:

```json
{ "count": 123 }
```
