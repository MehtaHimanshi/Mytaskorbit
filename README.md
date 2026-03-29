# TaskOrbit – Modern Kanban Project Management App
 **Live Demo:** https://mytaskorbit.vercel.app/
---
## 📌 About The Project
TaskOrbit is a modern, full-stack **Kanban-style project management application** inspired by tools like Trello. It allows users to create boards, manage tasks, and track progress visually in an intuitive and interactive way.

This project focuses on **real-time-like state syncing, clean UI/UX, and scalable architecture** using modern web technologies.

> Built as a full-stack assignment + personal project with focus on real-world production issues like deployment, API sync, and database consistency.

---

## ✨ Features

* 📋 Create multiple boards (e.g., Hiring, Marketing, Bug Tracking)
* 🧩 Add lists inside boards (To Do, In Progress, Done)
* 📝 Create and manage cards (tasks)
* 🎯 Drag-and-drop like structured workflow (position-based)
* 💾 Persistent storage using MySQL (Railway)
* 🌐 Full-stack deployment (Frontend: Vercel, Backend: Railway)
* ⚡ API-based state management (no localStorage dependency)
* 🔄 Auto-sync with database
* 🎨 Beautiful gradient UI design

---

## 🧠 My Key Ideas / Learnings

* Designed a **centralized AppState architecture** (like Redux pattern)
* Implemented **full state snapshot syncing** instead of partial APIs
* Solved real-world bugs:

  *  Local storage vs DB mismatch
  *  State overwrite on reload
  *  Multiple API calls issue
* Learned deployment challenges:
  * Vercel (frontend)
  * Railway (backend + MySQL)
* Handled **production-level debugging (CORS, API URLs, domain issues)**

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MySQL (Railway)

### Deployment

* Vercel (Frontend)
* Railway (Backend + DB)

---

## 📂 Project Structure

```
taskorbit/
├── src/              # Frontend source code
├── server/           # Backend (Express API)
├── public/           # Static assets
├── .env              # Environment variables
```

---


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/MehtaHimanshi/Mytaskorbit.git
cd Mytaskorbit
```

### 2. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd server
npm install
```

---

### 3. Run locally

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| GET    | /api/state  | Fetch full app state |
| PUT    | /api/state  | Save full app state  |
| GET    | /api/health | Check server status  |

---

## ⚠️ Known Issues

* Initial deployment may face API connection issues if backend URL is incorrect
* Requires correct environment setup for syncing

---

## 🚀 Future Improvements

* 👥 Multi-user collaboration (auth system)
* 🔄 Real-time sync (WebSockets)
* 📎 Attachments & file uploads
* 📅 Due dates & reminders
* 📊 Analytics dashboard

---

## 🙌 Acknowledgements

Inspired by:

* Trello
* Modern Kanban workflows

---

## 👩‍💻 Author

**Himanshi Mehta**

* GitHub: https://github.com/MehtaHimanshi

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
