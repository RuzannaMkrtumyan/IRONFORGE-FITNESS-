# IRONFORGE FITNESS — Premium Gym Landing Page

A portfolio-ready, single-page landing site for a fictional premium fitness club. Built with vanilla **HTML5**, **CSS3**, and **JavaScript** — no frameworks, no build tools, no backend.

![Status](https://img.shields.io/badge/status-portfolio%20ready-FF5A1F)
![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-FF5A1F)

## 🎨 Design

- **Aesthetic:** dark luxury, athletic, bold
- **Palette:** near-black `#090909`, charcoal `#141414`, vibrant orange `#FF5A1F`
- **Typography:** Oswald (condensed display) + Inter (body)
- **Photography:** curated Unsplash imagery

## 🚀 Run Locally

This is a static site — no build step required.

```bash
# 1. Clone or download the project
# 2. Open index.html in any modern browser
#    — or serve with any static server:
npx serve .
#    — or with Python:
python3 -m http.server 8000
```

Then visit `http://localhost:8000` (or the URL your server prints).

## ✨ Features

### Sections
- Fixed responsive navigation with mobile hamburger menu
- Cinematic hero with animated background, CTAs, and trust indicators
- Animated statistics counter (IntersectionObserver)
- 4 training program cards with hover zoom
- Split-layout "About" section with benefits
- 3 trainer profile cards with social icons
- 3-tier pricing with highlighted "Pro" plan
- Testimonials with star ratings
- High-impact CTA banner
- FAQ accordion (native `<details>` + custom styling)
- Contact section with validated form
- Footer with dynamic copyright year

### Interactions
- Smooth scroll + active nav link highlighting
- Scroll-reveal animations via IntersectionObserver
- Animated stat counters with easeOutCubic
- Modal system for membership sign-up & free session claim
- Form validation (required fields, email format) with inline errors
- Escape-key and backdrop-click modal dismissal
- Focus trapping inside modals for accessibility
- Back-to-top button
- `prefers-reduced-motion` support

### Quality
- Semantic HTML5 with proper heading hierarchy
- Descriptive alt text on all images
- ARIA labels on icon-only buttons and modals
- Visible keyboard focus states
- Mobile-first responsive layout (desktop → tablet → mobile)
- Lazy loading on below-the-fold images
- No console errors, no external dependencies beyond Google Fonts

## 📁 Project Structure

```
ironforge-fitness/
├── index.html     # Semantic structure
├── style.css      # All styles, mobile-first
├── script.js      # Vanilla JS interactions
└── README.md      # You are here
```

## 🧪 Browser Support

Tested on latest versions of Chrome, Firefox, Safari, and Edge. Works on iOS Safari and Android Chrome.

## ⚠️ Disclaimer

This is a **demonstration project** for a web development portfolio. All business information, pricing, statistics, trainer profiles, and testimonials are **fictional** and created for design purposes only. IRONFORGE FITNESS is not a real business.

## 📄 License

MIT — free to use, modify, and showcase in your portfolio.
