# 📝 Task Manager SPA (Vanilla JavaScript)

A fully functional single-page task management app built using **vanilla JavaScript**, with local persistence, dynamic routing, drag-and-drop reordering.

---

## 🚀 Features

- ✅ **Create / Read / Update / Delete (CRUD)** tasks
- 🧭 **SPA-style routing** using History API (no page reloads)
- 🔍 **Search and filter** by title, description, or priority
- 🖱 **Drag-and-drop** to reorder tasks
- 💾 **Data persistence** with `localStorage`
- 📱 Fully **responsive layout**

---

## 📂 Project Structure

```
/
├── index.html
├── styles.css
├── app.js
├── README.md
├── utils/
│   ├── api.js
│   └── router.js
└── views/
    ├── taskList.js
    ├── taskForm.js
    ├── taskDetail.js
    └── notFound.js
```

---

## 🧪 How to Run Locally

1. **Clone** the project
2. Open a terminal in the project folder

### Option A: Using Python (built-in)
```bash
python -m http.server 8080
```
Then open: [http://localhost:8080](http://localhost:8080)

### Option B: Using Node.js (install once)
```bash
npm install -g serve
npx serve -s .
```
Then open: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Browser Requirements

- Must be run on `localhost` or a secure (HTTPS) origin — won’t work via `file:///`

---

## 🧠 Notes

- Routing works via `history.pushState()` — refreshing on `/add` or `/edit/:id` requires a dev server

---

## ✨ Credits

Built with ❤️ using just JavaScript, HTML, and CSS — no frameworks required.
"# test-1" 
