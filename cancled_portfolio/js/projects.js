/* =========================================================
   PROJECTS.JS — Project data & dynamic card rendering
   ========================================================= */

'use strict';

const PROJECTS = [
  {
    id: 1,
    title: "Student List Manager",
    description: "A full-featured student management web app with real-time search, attendance toggling, dark/light mode with localStorage persistence, and a custom color palette. Clean DOM manipulation without any framework.",
    category: "web",
    categoryLabel: "Web App",
    emoji: "🎓",
    bgGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    tags: ["HTML", "CSS", "JavaScript", "DOM", "localStorage"],
    year: "2024",
    featured: true,
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 2,
    title: "STM32 GPIO Controller",
    description: "Embedded C program for STM32 microcontrollers using HAL library. Implements GPIO pin control with interrupt-driven button input and LED state machine logic. Includes flowchart documentation.",
    category: "embedded",
    categoryLabel: "Embedded",
    emoji: "⚙️",
    bgGradient: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    tags: ["C", "STM32", "HAL", "GPIO", "CubeMX"],
    year: "2024",
    featured: false,
    links: {
      demo: null,
      github: "#"
    }
  },
  {
    id: 3,
    title: "Arduino LED Blink Patterns",
    description: "Arduino project demonstrating advanced LED blink sequences using for loops, delay timing, and clean code structure. Includes multiple patterns: Morse code, pulse effect, and binary counter display.",
    category: "embedded",
    categoryLabel: "Embedded",
    emoji: "💡",
    bgGradient: "linear-gradient(135deg, #2d1b00, #3d2800, #5c3d00)",
    tags: ["C++", "Arduino", "Hardware", "GPIO", "IDE"],
    year: "2024",
    featured: false,
    links: {
      demo: null,
      github: "#"
    }
  },
  {
    id: 4,
    title: "Linear Regression Engine",
    description: "Pure Python implementation of Linear Regression from scratch — featuring Normal Equation (w = (XᵀX)⁻¹XᵀY), gradient descent optimizer, cost function visualization, and comparison with scikit-learn baselines.",
    category: "ml",
    categoryLabel: "ML / AI",
    emoji: "📊",
    bgGradient: "linear-gradient(135deg, #0d001a, #1a0033, #2d0060)",
    tags: ["Python", "NumPy", "Matplotlib", "ML", "Math"],
    year: "2025",
    featured: true,
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "This very portfolio — hand-crafted with semantic HTML5, vanilla CSS (animations, variables, media queries), and JavaScript. No frameworks used. Features custom cursor, typing animation, filterable projects, and full dark/light mode.",
    category: "web",
    categoryLabel: "Web App",
    emoji: "🌐",
    bgGradient: "linear-gradient(135deg, #003333, #004d4d, #006666)",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "XAMPP"],
    year: "2025",
    featured: false,
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 6,
    title: "Gradient Descent Visualizer",
    description: "Interactive web-based tool to visualize gradient descent convergence on 2D and 3D loss surfaces. Users can adjust learning rate, step through iterations, and watch the algorithm find the minimum in real time.",
    category: "ml",
    categoryLabel: "ML / AI",
    emoji: "🔬",
    bgGradient: "linear-gradient(135deg, #001a33, #002b4d, #003d6b)",
    tags: ["Python", "JavaScript", "Canvas API", "ML", "Visualization"],
    year: "2025",
    featured: false,
    links: {
      demo: "#",
      github: "#"
    }
  }
];

/**
 * Creates the HTML string for a single project card.
 * @param {Object} project - Project data object.
 * @returns {string} HTML string for the card.
 */
function createProjectCard(project) {
  const demoLink = project.links.demo
    ? `<a href="${project.links.demo}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ${project.title}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Live Demo
      </a>`
    : '';

  const githubLink = project.links.github
    ? `<a href="${project.links.github}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository of ${project.title}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub
      </a>`
    : '';

  const tagsHTML = project.tags
    .map(tag => `<span class="project-tag">${tag}</span>`)
    .join('');

  return `
    <article 
      class="project-card reveal-up${project.featured ? ' featured' : ''}" 
      data-category="${project.category}"
      role="listitem"
    >
      <div class="project-image">
        <div 
          class="project-image-placeholder" 
          style="background: ${project.bgGradient};"
          aria-hidden="true"
        >
          <span style="font-size: 3.5rem;">${project.emoji}</span>
        </div>
        <div class="project-image-overlay" aria-hidden="true"></div>
      </div>

      <div class="project-body">
        <div class="project-meta">
          <span class="project-category">${project.categoryLabel}</span>
          <span class="project-year">${project.year}</span>
        </div>

        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>

        <div class="project-tags" aria-label="Technologies used">
          ${tagsHTML}
        </div>
      </div>

      <div class="project-footer">
        ${demoLink}
        ${githubLink}
      </div>
    </article>
  `;
}

/**
 * Renders project cards into the DOM.
 * @param {string} filter - Category filter ('all', 'web', 'embedded', 'ml').
 */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  // Build and inject HTML
  grid.innerHTML = filtered.map(createProjectCard).join('');

  // Trigger reveal animations with stagger
  const cards = grid.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
    // Small timeout so the element is in DOM before class is added
    setTimeout(() => card.classList.add('revealed'), 20);
  });
}

/**
 * Initialises the project filter buttons.
 */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Re-render
      renderProjects(filter);
    });
  });
}

// ── SKILLS DATA ──────────────────────────────────────────
const SKILLS = [
  { name: "HTML5",      icon: "🌐", color: "#e34f26" },
  { name: "CSS3",       icon: "🎨", color: "#264de4" },
  { name: "JavaScript", icon: "⚡", color: "#f7df1e" },
  { name: "Python",     icon: "🐍", color: "#3572A5" },
  { name: "C / C++",    icon: "⚙️", color: "#A8B9CC" },
  { name: "Arduino",    icon: "🔌", color: "#00979D" },
  { name: "STM32",      icon: "🔬", color: "#0088CC" },
  { name: "NumPy",      icon: "📐", color: "#4DABCF" },
  { name: "Git",        icon: "🌿", color: "#F05032" },
  { name: "XAMPP",      icon: "🛡️", color: "#FB7A24" },
  { name: "MySQL",      icon: "🗄️", color: "#4479A1" },
  { name: "Linux",      icon: "🐧", color: "#FCC624" },
];

/**
 * Renders skill chips into the skills grid.
 */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = SKILLS.map((skill, i) => `
    <div 
      class="skill-item reveal-up" 
      style="transition-delay: ${i * 0.04}s;"
      title="${skill.name}"
    >
      <span class="skill-icon" aria-hidden="true">${skill.icon}</span>
      <span class="skill-name">${skill.name}</span>
    </div>
  `).join('');
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initProjectFilters();
  renderSkills();
});
