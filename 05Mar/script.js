document.addEventListener("DOMContentLoaded", () => {
  // ── Element refs ──────────────────────────────────────
  const form = document.getElementById("student-form");
  const nameInput = document.getElementById("student-name");
  const rollInput = document.getElementById("student-roll");
  const gradeInput = document.getElementById("student-grade");
  const list = document.getElementById("student-list");
  const errorMsg = document.getElementById("error-msg");
  const countEl = document.getElementById("count");
  const presentEl = document.getElementById("present-count");
  const absentEl = document.getElementById("absent-count");
  const totalFooter = document.getElementById("total-footer");
  const searchInput = document.getElementById("search-input");
  const sortBtn = document.getElementById("sort-btn");
  const highlightBtn = document.getElementById("highlight-btn");
  const clearBtn = document.getElementById("clear-btn");
  const addBtn = document.getElementById("add-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const toggleIcon = themeToggle.querySelector(".toggle-icon");
  const toggleLabel = themeToggle.querySelector(".toggle-label");

  // Modal
  const modalOverlay = document.getElementById("modal-overlay");
  const editRoll = document.getElementById("edit-roll");
  const editName = document.getElementById("edit-name");
  const editGrade = document.getElementById("edit-grade");
  const modalSave = document.getElementById("modal-save");
  const modalCancel = document.getElementById("modal-cancel");

  let students = [];
  let editingId = null;

  // ─────────────────────────────────────────────────────
  // Dark / Light Mode Toggle
  // ─────────────────────────────────────────────────────
  const html = document.documentElement;

  // Restore saved preference
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      toggleIcon.textContent = "🌙";
      toggleLabel.textContent = "Dark Mode";
    } else {
      toggleIcon.textContent = "☀️";
      toggleLabel.textContent = "Light Mode";
    }
  }

  // ─────────────────────────────────────────────────────
  // Disable Add button when name is empty
  // ─────────────────────────────────────────────────────
  nameInput.addEventListener("input", () => {
    addBtn.disabled = nameInput.value.trim() === "";
  });

  // ── Helpers ──────────────────────────────────────────
  function getInitials(name) {
    return name
      .trim()
      .split(" ")
      .map((w) => w[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("");
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    setTimeout(() => {
      errorMsg.textContent = "";
    }, 3000);
  }

  function updateStats() {
    const total = students.length;
    const present = students.filter((s) => s.present).length;
    const absent = total - present;
    countEl.textContent = total;
    presentEl.textContent = present;
    absentEl.textContent = absent;
    totalFooter.textContent = `Total students: ${total}`;
  }

  function toggleEmpty() {
    const existing = document.getElementById("empty-state");
    if (students.length === 0) {
      if (!existing) {
        const li = document.createElement("li");
        li.className = "empty-state";
        li.id = "empty-state";
        li.innerHTML = `<span class="empty-icon">🎓</span><p>No students yet. Add one above!</p>`;
        list.appendChild(li);
      }
    } else {
      if (existing) existing.remove();
    }
  }

  // ─────────────────────────────────────────────────────
  // Create student list item
  // ─────────────────────────────────────────────────────
  function createItem(student) {
    const li = document.createElement("li");
    li.className = "student-item" + (student.present ? " is-present" : "");
    li.dataset.id = student.id;

    const rollDisplay = student.roll
      ? `<span class="student-roll">${student.roll}</span> – `
      : "";

    li.innerHTML = `
      <div class="student-avatar">${getInitials(student.name)}</div>
      <div class="student-info">
        <div class="student-name">${rollDisplay}${student.name}</div>
        <div class="student-meta">${student.grade ? "Grade: " + student.grade : "No grade set"}</div>
      </div>
      ${student.grade ? `<span class="student-grade">${student.grade}</span>` : ""}
      <div class="item-actions">
        <button class="present-btn ${student.present ? "marked" : ""}" title="Toggle attendance">
          ${student.present ? "✅ Present" : "Present?"}
        </button>
        <button class="edit-btn" title="Edit student">✏️</button>
        <button class="remove-btn" title="Remove student">✕</button>
      </div>
    `;

    // Present/Absent toggle
    li.querySelector(".present-btn").addEventListener("click", () => {
      const s = students.find((s) => s.id === student.id);
      if (!s) return;
      s.present = !s.present;
      li.classList.toggle("is-present", s.present);
      const btn = li.querySelector(".present-btn");
      btn.textContent = s.present ? "✅ Present" : "Present?";
      btn.classList.toggle("marked", s.present);
      li.querySelector(".student-avatar").style.background = s.present
        ? "linear-gradient(135deg,#0077B6,#00B4D8)"
        : "linear-gradient(135deg,#03045E,#0077B6)";
      updateStats();
    });

    // Edit
    li.querySelector(".edit-btn").addEventListener("click", () =>
      openEditModal(student.id),
    );

    // Delete with confirm
    li.querySelector(".remove-btn").addEventListener("click", () => {
      if (!confirm(`Are you sure you want to delete "${student.name}"?`))
        return;
      li.style.transition = "opacity .2s, transform .2s";
      li.style.opacity = "0";
      li.style.transform = "translateX(20px)";
      setTimeout(() => {
        students = students.filter((s) => s.id !== student.id);
        li.remove();
        updateStats();
        toggleEmpty();
      }, 200);
    });

    return li;
  }

  // ─────────────────────────────────────────────────────
  // Form Submit
  // ─────────────────────────────────────────────────────
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const grade = gradeInput.value.trim();

    if (!name) {
      showError("⚠️ Please enter a student name.");
      nameInput.focus();
      return;
    }

    const student = { id: Date.now(), roll, name, grade, present: false };
    students.push(student);
    list.appendChild(createItem(student));

    nameInput.value = "";
    rollInput.value = "";
    gradeInput.value = "";
    nameInput.focus();
    addBtn.disabled = true;

    updateStats();
    toggleEmpty();
  });

  // ─────────────────────────────────────────────────────
  // Edit Modal
  // ─────────────────────────────────────────────────────
  function openEditModal(id) {
    const s = students.find((s) => s.id === id);
    if (!s) return;
    editingId = id;
    editRoll.value = s.roll;
    editName.value = s.name;
    editGrade.value = s.grade;
    modalOverlay.classList.add("open");
    editName.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    editingId = null;
  }

  modalCancel.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalSave.addEventListener("click", () => {
    const name = editName.value.trim();
    const roll = editRoll.value.trim();
    const grade = editGrade.value.trim();
    if (!name) {
      editName.focus();
      return;
    }

    const s = students.find((s) => s.id === editingId);
    if (!s) return;
    s.name = name;
    s.roll = roll;
    s.grade = grade;

    const li = list.querySelector(`[data-id="${editingId}"]`);
    if (li) list.replaceChild(createItem(s), li);
    closeModal();
    updateStats();
  });

  // ─────────────────────────────────────────────────────
  // Search / Filter
  // ─────────────────────────────────────────────────────
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    list.querySelectorAll(".student-item").forEach((li) => {
      const name = (
        li.querySelector(".student-name")?.textContent || ""
      ).toLowerCase();
      li.classList.toggle("hidden", query !== "" && !name.includes(query));
    });
  });

  // ─────────────────────────────────────────────────────
  // Sort A–Z
  // ─────────────────────────────────────────────────────
  sortBtn.addEventListener("click", () => {
    students.sort((a, b) => a.name.localeCompare(b.name));
    const items = Array.from(list.querySelectorAll(".student-item"));
    items.sort(
      (a, b) =>
        students.findIndex((s) => s.id === +a.dataset.id) -
        students.findIndex((s) => s.id === +b.dataset.id),
    );
    items.forEach((li) => list.appendChild(li));
  });

  // ─────────────────────────────────────────────────────
  // Highlight Top Student
  // ─────────────────────────────────────────────────────
  highlightBtn.addEventListener("click", () => {
    const items = list.querySelectorAll(".student-item");
    if (!items.length) return;
    items.forEach((li) => li.classList.remove("top-highlight"));
    items[0].classList.add("top-highlight");
  });

  // ─────────────────────────────────────────────────────
  // Clear All
  // ─────────────────────────────────────────────────────
  clearBtn.addEventListener("click", () => {
    if (!students.length) return;
    if (!confirm(`Remove all ${students.length} student(s)?`)) return;
    students = [];
    list.innerHTML = "";
    toggleEmpty();
    updateStats();
  });

  // ── Init ─────────────────────────────────────────────
  nameInput.focus();
  updateStats();
});
