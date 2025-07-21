# 🥗 Meal Master - Frontend  
React.js · Vite · Tailwind CSS · Netlify

---

## 📖 Description  
This is the frontend of the **Meal Master** application. It provides an interactive UI for managing meal plans, tracking nutrition, browsing recipes, and handling user authentication via JWT. Built using **React.js** with **Vite**, it uses **Context API** for global state management and communicates with the backend via RESTful APIs.

---

## 🌐 Live Links  
🔗 **Frontend**: https://meal-masterr.netlify.app/
🔗 **Backend API**: https://meal-master-backend-4433.onrender.com/api

---

## ⚙️ Tech Stack  
- **React.js** with Vite  
- **Tailwind CSS** for styling  
- **React Router v6**   
- **Axios** for HTTP requests  
- **Netlify** for deployment

---

## 📁 Folder Structure  
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, icons, etc.
│ ├── components/ # UI and functional components
│ ├── contexts/ # AuthProvider, App context
│ ├── utils/ # Axios config, helpers
│ ├── App.jsx # Main App component
│ ├── main.jsx # App entry point
│ ├── App.css, index.css # Global styles
├── .env # Environment variables
├── vite.config.js # Vite configuration
├── index.html # HTML template
├── package.json
└── README.md


---

## 🚀 Getting Started  

### 🧰 Prerequisites  
- Node.js v16+  
- Internet connection (for API communication)

---

### 🛠 Installation  
```bash
git clone https://github.com/abhi-bochare/Meal_Master_Frontend
cd meal-master-app-frontend
npm install
```

## 🔐 Environment Variables
Create a .env file in the project root:

env
```
VITE_API_BASE_URL= "https://meal-master-backend-4433.onrender.com/api" # (Your backend URL)
```
This variable is used by Axios to make API calls.

## 📦 Available Scripts
```bash
npm run dev       # Start local development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```
---
### 🧠 Features
✅ User Authentication (Login, Signup, Google OAuth, Forgot Password)
✅ Role-based UI & routing (if extended to admin)
✅ Add, view, and delete meals per date
✅ Track calories, protein, carbs, and fat
✅ Responsive dashboard with real-time stats
✅ Recipe browsing (static or dynamic)
✅ Secure API interaction using JWT

---
### 🧭 Routing Overview
Path	Description
/	Landing Page
/login	Login Page
/register	Signup Page
/dashboard	Meal summary & stats
/meal-planner	Daily meal tracking
/recipes	Browse recipes
/profile	User profile

---
### 💡 Best Practices
Modern React with hooks

Responsive design 

Centralized context and axios base URL

Clean component structure

Secure .env handling (no secrets exposed)

---
### 🛡️ Security
All protected routes use JWT tokens

Tokens stored in memory (or optionally in localStorage/sessionStorage)

CORS enabled and API base URL is env-controlled

---

### 📬 Contact
For bugs or feature requests, open an issue or contact the author.

---
### 🤝 Contributors
Abhishek Bochare
---
