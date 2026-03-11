# Shadipto — Personal Portfolio Website

A fully functional, responsive personal portfolio website built with semantic HTML5, vanilla CSS3, and JavaScript. Designed with a dark editorial/tech-noir aesthetic.

## Project Structure

```
portfolio/
├── index.html              # Main HTML (single-page)
├── README.md               # This file
│
├── css/
│   ├── themes.css          # Dark / Light mode CSS variables
│   ├── animations.css      # Keyframes, transitions, motion design
│   └── main.css            # Layout, components, responsive styles
│
└── js/
    ├── projects.js         # Project data array + dynamic card rendering + skills
    ├── form.js             # Contact form validation & submission handling
    ├── animations.js       # Typing animation, scroll reveals, counter animation
    └── main.js             # Theme toggle, nav, cursor, scroll-to-top, misc
```

## Features

### Required (from spec)
- ✅ **3+ sections** — Home, About, Projects, Skills, Contact
- ✅ **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ✅ **Responsive** — Mobile, tablet, desktop with CSS media queries (no frameworks)
- ✅ **CSS animations** — Hover effects, reveal animations, typing cursor, orb drift
- ✅ **Form validation** — All fields validated with dynamic error messages (DOM manipulation)
- ✅ **Dark / Light mode toggle** — Preference saved to `localStorage`
- ✅ **Dynamic content** — Project cards and skill chips generated from JS arrays via `createElement` / `innerHTML`
- ✅ **Filterable project gallery** — Filter by All / Web / Embedded / ML categories
- ✅ **Scroll-to-top button** — Appears after 400px scroll

### Extras
- 🎯 **Custom cursor** — Smooth lerp-animated follower cursor with hover enlarge state
- ✨ **Typing animation** — Hero section cycles through phrases
- 🎬 **Scroll reveal animations** — Elements fade in on scroll via Intersection Observer
- 📊 **Animated stat counters** — Numbers count up when scrolled into view
- 🌐 **Background grid + orbs** — Atmospheric hero section design
- 📱 **Mobile hamburger menu** — Fullscreen overlay with smooth transitions
- ♿ **Accessibility** — ARIA labels, roles, live regions, keyboard navigation
- 🎨 **Noise texture overlay** — Subtle grain for depth
- 🖋️ **Custom fonts** — Syne (display), DM Sans (body), JetBrains Mono (code/labels)

## Running Locally (XAMPP)

1. Copy the `portfolio/` folder to `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (Mac)
2. Start Apache in the XAMPP Control Panel
3. Open `http://localhost/portfolio/` in your browser

> **No server-side code, database, or build step required.**  
> The project is pure HTML + CSS + JS — just open the file.

## Customization

### Update Projects
Edit the `PROJECTS` array in `js/projects.js` — each entry has:
- `title`, `description`, `category`, `emoji`, `bgGradient`, `tags`, `year`, `featured`, `links`

### Update Skills
Edit the `SKILLS` array in `js/projects.js`.

### Change Theme Colors
All color variables live in `css/themes.css` under `[data-theme="dark"]` and `[data-theme="light"]`.

### Personal Info
Search and replace `Shadipto` and `shadipto@email.com` in `index.html`.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
