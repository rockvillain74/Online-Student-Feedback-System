# Online Student Feedback System — Project Report

---

## 1. Abstract

The **Online Student Feedback System** is a web-based application designed to collect, store, and visualise student feedback for college courses and faculty. Built entirely with HTML, CSS, and plain JavaScript, the system operates in the browser without any server-side infrastructure. Students can fill out a structured feedback form — selecting a course, department, semester, and faculty member, assigning a star rating, and writing comments. The submitted data is persisted using the browser's `localStorage` API and displayed on an interactive dashboard featuring summary statistics, a bar chart of department-wise average ratings, and a filterable table of recent comments.

This is a **front-end academic demonstration** and does not include real user accounts, authentication, or a secure back-end server.

---

## 2. Objectives

1. To build a simple, user-friendly interface for students to submit course/faculty feedback anonymously.
2. To demonstrate core front-end web development concepts — HTML forms, CSS layouts, DOM manipulation, and client-side storage.
3. To present aggregated feedback data through an interactive, filterable dashboard.
4. To create a reusable project template suitable for college coursework and lab assignments.
5. To practice responsive web design that works across desktops, tablets, and mobile devices.

---

## 3. Features

### 3.1 Home Page (`index.html`)
- Introduces the system with a visually appealing hero banner.
- Highlights key features in a card-based grid layout.
- Provides prominent call-to-action buttons for submitting feedback and viewing the dashboard.

### 3.2 Feedback Form (`feedback.html`)
- **Fields:** Course Name, Department (dropdown), Semester (dropdown), Faculty Name, Overall Rating (interactive 5-star widget), Written Comments (textarea).
- **Validation:** All fields are required. Real-time error messages appear below each invalid field on submission.
- **Confirmation:** A modal pop-up confirms successful submission and offers a link to the dashboard.

### 3.3 Dashboard (`dashboard.html`)
- **Summary Statistics:** Total responses, average rating, number of courses, and number of departments — displayed in stat cards.
- **Bar Chart:** A CSS-rendered bar chart showing average rating per department.
- **Recent Comments Table:** The latest 10 feedback entries with course, faculty, rating badge, comment, and date.
- **Filters:** Dropdown filters for course and department that dynamically update all dashboard components.

### 3.4 About Page (`about.html`)
- Explains the project's purpose, objectives, features, and technologies.
- Lists limitations and proposed future improvements.
- Includes a disclaimer that this is an academic demo without real accounts or a server.

### 3.5 Cross-Cutting Features
- **Navigation:** Sticky top navbar with links to all four pages and a hamburger menu for mobile.
- **localStorage Persistence:** Feedback survives browser refresh; sample data is auto-seeded on first visit.
- **Responsive Design:** CSS Grid, Flexbox, and media queries ensure usability on all screen sizes.

---

## 4. Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic page structure and form elements |
| **CSS3** | Styling, layout (Grid & Flexbox), animations, custom properties |
| **JavaScript (ES6+)** | DOM manipulation, form validation, localStorage CRUD, dynamic rendering |
| **localStorage API** | Client-side data persistence |
| **CSS Media Queries** | Responsive design breakpoints |

No external libraries, frameworks, or build tools are used.

---

## 5. System Architecture

```
┌──────────────────────────────────────────────────┐
│                    Browser                       │
│                                                  │
│  ┌────────┐  ┌──────────┐  ┌──────────┐  ┌────┐│
│  │  Home  │  │ Feedback │  │Dashboard │  │About││
│  │  Page  │  │   Form   │  │  Page    │  │Page ││
│  └────────┘  └────┬─────┘  └────┬─────┘  └────┘│
│                   │             │                │
│              ┌────▼─────────────▼────┐           │
│              │   script.js (shared)  │           │
│              │  - Form validation    │           │
│              │  - localStorage CRUD  │           │
│              │  - Dashboard render   │           │
│              │  - Filter logic       │           │
│              └──────────┬───────────┘           │
│                         │                        │
│              ┌──────────▼───────────┐           │
│              │    localStorage      │           │
│              │  (JSON data store)   │           │
│              └──────────────────────┘           │
└──────────────────────────────────────────────────┘
```

---

## 6. Limitations

1. **No Server / Database:** Data is stored only in the current browser's `localStorage`. Clearing browser data erases all feedback.
2. **No Authentication:** There are no user accounts, login, or role-based access (student vs. admin).
3. **Single-Device Only:** Feedback cannot be shared or aggregated across devices or users.
4. **Basic Visualisation:** Charts are built with pure CSS, lacking the interactivity of dedicated libraries like Chart.js or D3.js.
5. **No Data Export:** There is no option to export feedback as CSV, PDF, or Excel.
6. **No Input Sanitisation for XSS:** Since this is a local-only demo, advanced security measures are not implemented.

---

## 7. Future Improvements

1. **Back-End Integration:** Add a server using Node.js (Express) or Python (Flask/Django) with a real database (MySQL, PostgreSQL, or MongoDB).
2. **User Authentication:** Implement login/registration for students and an admin panel for faculty to view department-specific feedback.
3. **Advanced Charting:** Use Chart.js, D3.js, or ApexCharts for interactive, animated data visualisations.
4. **Data Export:** Allow administrators to export feedback reports in CSV or PDF format.
5. **Sentiment Analysis:** Apply natural language processing to written comments to detect positive, neutral, or negative sentiment.
6. **Email Notifications:** Send confirmation emails to students after submission.
7. **Cloud Deployment:** Host the application on Heroku, Vercel, Netlify, or a college server.
8. **Accessibility (a11y):** Enhance keyboard navigation and screen-reader support to meet WCAG 2.1 guidelines.

---

## 8. Conclusion

The Online Student Feedback System successfully demonstrates how a functional, visually appealing web application can be built using only HTML, CSS, and plain JavaScript — without relying on external frameworks or a back-end server. It fulfils its objective of providing a simple platform for anonymous student feedback while showcasing front-end development skills appropriate for a college-level web development course.

---

*This report accompanies the project submission for academic evaluation purposes.*
