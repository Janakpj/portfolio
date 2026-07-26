# Janarthanan K — Portfolio Website

A premium, recruiter-focused, single-page portfolio for Janarthanan K (Biotechnology → Bioinformatics / Data Science / Healthcare Analytics), built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Tech

- HTML5 (semantic, SEO-tagged, Schema.org `Person` markup)
- CSS3 (custom properties, Flexbox, Grid — no Bootstrap/Tailwind)
- Vanilla JavaScript ES6+ (no jQuery/React)
- [Font Awesome 6](https://fontawesome.com/) via CDN for icons
- Google Fonts: **Space Grotesk** (headings) + **Inter** (body)

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.jpg          ← add your headshot here
│   ├── favicon.png          ← add a favicon here
│   ├── projects/            ← optional project imagery
│   ├── publications/        ← optional publication imagery
│   ├── patents/             ← optional patent imagery
│   └── logos/                ← optional employer/institution logos
├── icons/                    ← optional custom icon assets
├── assets/
│   └── resume/
│       └── Janarthanan_Resume.pdf   ← add your resume PDF here
└── README.md
```

## Required assets (currently referenced but not included)

The site is fully functional without these — broken image links degrade gracefully — but for a complete experience, add:

| Path | Purpose | Suggested size |
|---|---|---|
| `images/profile.jpg` | Hero portrait | ~880×1040px (5:6 ratio), JPG |
| `images/favicon.png` | Browser tab icon | 512×512px, PNG |
| `assets/resume/Janarthanan_Resume.pdf` | "View Resume" / navbar download button | — |

Optional (not currently wired into the markup, reserved for future use):
`images/projects/`, `images/publications/`, `images/patents/`, `images/logos/`, `icons/`.

## Running locally

No build step required. Any static file server works:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

## Design system

| Token | Value |
|---|---|
| Background | `#0B1220` |
| Surface | `#111827` |
| Primary accent | `#3B82F6` |
| Secondary accent | `#14B8A6` |
| Text | `#F8FAFC` |
| Muted text | `#94A3B8` |
| Heading font | Space Grotesk |
| Body font | Inter |

All tokens live as CSS custom properties at the top of `css/style.css` for easy theming.

## Features

- Sticky, blurred navbar with mobile hamburger menu
- Scroll progress indicator
- Scroll-reveal animations (`IntersectionObserver`, respects `prefers-reduced-motion`)
- Animated statistic counters
- Ambient, low-opacity animated DNA double-helix motif in the hero background
- Back-to-top button
- Fully keyboard-navigable, with visible focus states, skip link, and ARIA labeling
- SEO: meta description/keywords, Open Graph, Twitter Card, canonical URL, `Person` JSON-LD schema
- Responsive from desktop down to small mobile, no horizontal scroll at any breakpoint

## Updating content

All text content lives directly in `index.html`, organized into clearly commented sections (Hero, Stats, About, Skills, Experience, Education, Projects, Publications, Patents, Certifications, Tech Stack, Contact, Footer) — update in place, no templating engine involved.
