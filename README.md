# Task Tracker Web Application (MERN Stack)

A full-stack Task Management application built using MongoDB, Express, React, and Node.js. This application features full CRUD capabilities, inline status toggling, frontend form validation, a robust memoized data lifecycle, and real-time custom toast notifications.

## 🚀 Features
- **Full CRUD Functionality:** Create, read, update, and delete tasks seamlessly.
- **Dynamic Status Switching:** Click on any task badge to cycle through *Pending*, *In Progress*, and *Completed*.
- **Custom Toast Notifications:** Animated success/error banners for user interactions without disruptive alert dialogs.
- **Strict Lint Compliance:** Architecture optimized using `useCallback` hooks to guarantee 0 linting warnings or cascading re-renders.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)

---

## 📦 Project Directory Structure
```text
taskTracker/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers & logic
│   ├── models/          # Mongoose Schemas (Task Schema)
│   ├── routes/          # API endpoint routes
│   └── server.js        # Entry point
└── frontend/
    └── src/
        ├── api/         # Centralized Axios configs
        ├── components/  # TaskForm, TaskList, TaskItem, Toast UI
        └── App.jsx      # Central State Machine