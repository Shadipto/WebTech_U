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
