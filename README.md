# Nuflow Info

Trade show landing page, reached by QR code. Visitors pick a sector and can view or download the sector booklet, technical data sheets and case studies (PDF and video).

- Live URL (GitHub Pages): https://nuflow-australasia.github.io/info/
- Push to `main` and the live page updates within a minute or two. The QR code points at the live URL, so it never needs reprinting.

## Files

| Path | What it is |
|------|------------|
| `index.html` | The page |
| `assets/js/resources-data.js` | **The document list.** Booklets, data sheets, case studies and videos, with the sectors each one appears in |
| `assets/js/resources.js` | Builds the booklet menu, mobile menu, sector document lists, resource library and video player from the list |
| `assets/css/resources.css` | Styles for those parts |
| `assets/img/` | Island, cloud, sector and logo images |
| `assets/js/gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js` | Animation and smooth-scroll libraries |

## Adding or changing a document

1. In Google Drive, open the **original** PDF (not a shortcut; shortcuts do not open for the public) and make sure sharing is "Anyone with the link can view".
2. Copy the file ID from the share link: the part between `/file/d/` and `/view`.
3. Add an entry to the right list in `assets/js/resources-data.js`, for example:
   ```js
   { system: 'Sumoline', title: 'Culvert relining, Example Council', id: 'PASTE_ID_HERE', mb: 3.2, sectors: ['infrastructure'] },
   ```
4. In `index.html`, bump the `?v=` number on the `resources-data.js` link so phones load the new list, then commit and push.

Videos use the YouTube video ID (the part after `watch?v=`).
