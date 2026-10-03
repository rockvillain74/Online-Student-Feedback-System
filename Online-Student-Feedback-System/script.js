/* ============================================================
   Online Student Feedback System — Shared JavaScript
   Technologies: Plain/Vanilla JavaScript (ES6+)
   Storage: Browser localStorage
   ============================================================ */

// ─── Constants ───────────────────────────────────────────────
const STORAGE_KEY = "studentFeedbackData";

// ─── Sample / Seed Data ──────────────────────────────────────
// Pre-loaded fictional data so the dashboard is never empty.
const SAMPLE_FEEDBACK = [
  {
    id: 1,
    course: "Data Structures",
    department: "Computer Science",
    semester: "Fall 2025",
    faculty: "Dr. Ananya Sharma",
    rating: 5,
    comment: "Excellent teaching methodology with lots of practical examples.",
    date: "2025-09-15",
  },
  {
    id: 2,
    course: "Calculus II",
    department: "Mathematics",
    semester: "Fall 2025",
    faculty: "Prof. Ravi Kumar",
    rating: 4,
    comment: "Clear explanations but assignments could be more challenging.",
    date: "2025-09-18",
  },
  {
    id: 3,
    course: "Digital Electronics",
    department: "Electronics",
    semester: "Spring 2025",
    faculty: "Dr. Meena Patil",
    rating: 3,
    comment: "Good lab sessions. Theory classes need more real-world examples.",
    date: "2025-08-22",
  },
  {
    id: 4,
    course: "Database Management",
    department: "Computer Science",
    semester: "Fall 2025",
    faculty: "Prof. Suresh Iyer",
    rating: 5,
    comment: "Very well-structured course. Loved the SQL project work!",
    date: "2025-09-25",
  },
  {
    id: 5,
    course: "Mechanics",
    department: "Physics",
    semester: "Spring 2025",
    faculty: "Dr. Kavita Rao",
    rating: 4,
    comment: "Engaging lectures and helpful doubt-solving sessions.",
    date: "2025-07-10",
  },
  {
    id: 6,
    course: "Operating Systems",
    department: "Computer Science",
    semester: "Fall 2025",
    faculty: "Dr. Ananya Sharma",
    rating: 4,
    comment: "Great course, but the schedule was a bit tight.",
    date: "2025-10-01",
  },
  {
    id: 7,
    course: "Linear Algebra",
    department: "Mathematics",
    semester: "Spring 2025",
    faculty: "Prof. Ravi Kumar",
    rating: 2,
    comment: "Pace was too fast; need more revision sessions.",
    date: "2025-06-15",
  },
  {
    id: 8,
    course: "Microprocessors",
    department: "Electronics",
    semester: "Fall 2025",
    faculty: "Dr. Meena Patil",
    rating: 4,
    comment: "Practical-oriented approach. Enjoyed the mini projects.",
    date: "2025-09-28",
  },
];

// ─── localStorage Helpers ────────────────────────────────────

/** Load feedback array from localStorage (seeds data on first visit). */
function loadFeedback() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // First visit — seed with sample data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_FEEDBACK));
    return [...SAMPLE_FEEDBACK];
  }
  return JSON.parse(data);
}

/** Save feedback array to localStorage. */
function saveFeedback(feedbackArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackArray));
}

/** Add a single feedback entry and persist. */
function addFeedback(entry) {
  const all = loadFeedback();
  entry.id = all.length ? Math.max(...all.map((f) => f.id)) + 1 : 1;
  entry.date = new Date().toISOString().slice(0, 10);
  all.push(entry);
  saveFeedback(all);
  return entry;
}

// ─── Navigation ──────────────────────────────────────────────

/** Toggle mobile nav menu. */
function toggleNav() {
  const links = document.getElementById("navLinks");
  if (links) links.classList.toggle("open");
}

/** Highlight the active nav link based on current page. */
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page) {
      a.classList.add("active");
    }
  });
}

// ─── Feedback Form Logic ─────────────────────────────────────

function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect values
    const course = document.getElementById("course").value.trim();
    const department = document.getElementById("department").value;
    const semester = document.getElementById("semester").value;
    const faculty = document.getElementById("faculty").value.trim();
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value.trim();

    // Validate
    let valid = true;

    valid = validateField("course", course) && valid;
    valid = validateField("department", department) && valid;
    valid = validateField("semester", semester) && valid;
    valid = validateField("faculty", faculty) && valid;

    // Rating validation
    const ratingGroup = document.getElementById("ratingGroup");
    if (!ratingInput) {
      ratingGroup.classList.add("has-error");
      valid = false;
    } else {
      ratingGroup.classList.remove("has-error");
    }

    valid = validateField("comment", comment) && valid;

    if (!valid) return;

    // Save
    const entry = {
      course,
      department,
      semester,
      faculty,
      rating: parseInt(ratingInput.value),
      comment,
    };
    addFeedback(entry);

    // Show confirmation modal
    const modal = document.getElementById("confirmModal");
    if (modal) modal.classList.add("show");

    // Reset form
    form.reset();
  });
}

function validateField(id, value) {
  const group = document.getElementById(id)?.closest(".form-group");
  if (!group) return true;
  if (!value) {
    group.classList.add("has-error");
    return false;
  }
  group.classList.remove("has-error");
  return true;
}

function closeModal() {
  const modal = document.getElementById("confirmModal");
  if (modal) modal.classList.remove("show");
}

// ─── Dashboard Logic ─────────────────────────────────────────

function initDashboard() {
  if (!document.getElementById("dashboardSection")) return;

  const allFeedback = loadFeedback();
  populateFilterDropdowns(allFeedback);
  renderDashboard(allFeedback);

  // Filter events
  document.getElementById("filterCourse")?.addEventListener("change", applyFilters);
  document.getElementById("filterDept")?.addEventListener("change", applyFilters);
  document.getElementById("clearFilters")?.addEventListener("click", () => {
    document.getElementById("filterCourse").value = "";
    document.getElementById("filterDept").value = "";
    applyFilters();
  });
}

function populateFilterDropdowns(data) {
  const courses = [...new Set(data.map((f) => f.course))].sort();
  const depts = [...new Set(data.map((f) => f.department))].sort();

  const courseSelect = document.getElementById("filterCourse");
  const deptSelect = document.getElementById("filterDept");

  courses.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    courseSelect.appendChild(opt);
  });

  depts.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    deptSelect.appendChild(opt);
  });
}

function applyFilters() {
  const course = document.getElementById("filterCourse").value;
  const dept = document.getElementById("filterDept").value;
  let data = loadFeedback();

  if (course) data = data.filter((f) => f.course === course);
  if (dept) data = data.filter((f) => f.department === dept);

  renderDashboard(data);
}

function renderDashboard(data) {
  // Stats
  const totalEl = document.getElementById("statTotal");
  const avgEl = document.getElementById("statAvg");
  const coursesEl = document.getElementById("statCourses");
  const deptsEl = document.getElementById("statDepts");

  const total = data.length;
  const avg = total ? (data.reduce((s, f) => s + f.rating, 0) / total).toFixed(1) : "0.0";
  const courses = new Set(data.map((f) => f.course)).size;
  const depts = new Set(data.map((f) => f.department)).size;

  if (totalEl) totalEl.textContent = total;
  if (avgEl) avgEl.textContent = avg;
  if (coursesEl) coursesEl.textContent = courses;
  if (deptsEl) deptsEl.textContent = depts;

  // Bar chart — average rating per department
  renderBarChart(data);

  // Recent comments table
  renderCommentsTable(data);
}

function renderBarChart(data) {
  const container = document.getElementById("barChart");
  if (!container) return;

  // Group by department
  const deptMap = {};
  data.forEach((f) => {
    if (!deptMap[f.department]) deptMap[f.department] = [];
    deptMap[f.department].push(f.rating);
  });

  const entries = Object.entries(deptMap).map(([dept, ratings]) => ({
    label: dept,
    avg: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
  }));

  if (!entries.length) {
    container.innerHTML = '<p class="text-center" style="padding:40px;color:var(--text-light);">No data to display.</p>';
    return;
  }

  const maxVal = 5; // rating scale
  container.innerHTML = entries
    .map(
      (e) => `
    <div class="bar-wrapper">
      <div class="bar" style="height:${(e.avg / maxVal) * 100}%">
        <span class="bar-value">${e.avg}</span>
      </div>
      <span class="bar-label">${e.label}</span>
    </div>`
    )
    .join("");
}

function renderCommentsTable(data) {
  const tbody = document.getElementById("commentsBody");
  if (!tbody) return;

  // Sort by date descending, take latest 10
  const sorted = [...data].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);

  if (!sorted.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-light);">No feedback found.</td></tr>';
    return;
  }

  tbody.innerHTML = sorted
    .map((f) => {
      let badgeClass = f.rating >= 4 ? "high" : f.rating >= 3 ? "mid" : "low";
      return `<tr>
        <td>${f.course}</td>
        <td>${f.faculty}</td>
        <td><span class="rating-badge ${badgeClass}">${f.rating}/5</span></td>
        <td>${f.comment}</td>
        <td>${f.date}</td>
      </tr>`;
    })
    .join("");
}

// ─── Initialise on Page Load ─────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initFeedbackForm();
  initDashboard();
});
