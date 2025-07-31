# 🍽️ Meal Master App

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=000)](#-technology-stack)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=fff)](#-technology-stack)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=fff)](#-technology-stack)
[![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=fff)](#-technology-stack)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=fff)](#-technology-stack)
[![Netlify](https://img.shields.io/badge/Deploy-Frontend%20on%20Netlify-00C7B7?logo=netlify&logoColor=fff)](#-deployed-app)
[![Render](https://img.shields.io/badge/Deploy-Backend%20on%20Render-2F2F2F?logo=render&logoColor=fff)](#-deployed-app)

**Meal Master** is a full-stack web application that helps users **plan, track, and analyze** their daily meals. With real-time nutrition data, recipe planning, and secure authentication, it streamlines the entire meal management experience.

---

## 🔗 Deployed App

- **Frontend**: https://meal-masterr.netlify.app/  
- **Backend**: https://meal-master-backend-4433.onrender.com/  
- **Database**: MongoDB Atlas

---

## Introduction

**Meal Master** provides:
- A **Meal Planner** with nutritional breakdown
- **Real-time dashboard analytics**
- **Recipe search and integration**
- Secure **user authentication** and **protected routes**

Built with **React.js (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🗂Project Type
**Fullstack**

---

## 📁 Directory Structure

```bash
Meal_Master_App/
├── backend/                  # Express + MongoDB backend API
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config.js
│   ├── server.js
│   └── .env
├── frontend/                 # React + (Redux optional) frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
├── README.md                 # This file
```

---

## 🎥 Video Walkthrough of the Project

🔗 **Project Demo (4–6 mins)**: https://youtu.be/81snoS5ESns

---

## ✨ Features

- 🔐 **Authentication** (Email/Password + Google OAuth)
- 🧭 **Meal Planner** with per-meal nutritional breakdown
- 📊 **Real-time dashboard analytics** (calories & macros)
- 🍳 **Recipe search** and quick add to plan
- ➕ **Add / Edit / Delete / Track** meals
- 📱 **Responsive UI** with mobile-friendly navigation
- 🔁 **Password reset** and **protected routes**

---

## 💡 Design Decisions & Assumptions

- 🔑 **JWT-based authentication** for API access
- 🌐 CORS handled via middleware with allowed origins
- 🍽️ Each meal is linked to a **recipe** and **serving count**
- ⚡ Lightweight UI libs for performance on low-end devices
- ⏰ Meal type classification inferred from **time of day**

---

## 🚀 Installation & Getting Started

### Prerequisites
- **Node.js v16+**
- **MongoDB Atlas** account (or local MongoDB)
- **OAuth credentials** for Google Sign-In *(optional; only if enabling Google OAuth)*

### Clone the Repository
```bash
git clone https://github.com/abhi-bochare/Meal_Master_App.git
cd Meal_Master_App
```

### Backend Setup
```bash
cd backend
npm install
```

Create a **`.env`** file in `backend/`:
```dotenv
PORT=3000
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/mealmaster"  # Your MongoDB URI
JWT_SECRET="yourJWTSecret"

# Optional (only if you implement password reset via email)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="no-reply@example.com"
SMTP_PASS="strongpassword"

# Optional (only if enabling Google OAuth)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OAUTH_REDIRECT_URL="https://meal-masterr.netlify.app/auth/callback"
```

Start the backend:
```bash
node server.js
# or with nodemon
# npx nodemon server.js
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

Create a **`.env`** file in `frontend/`:
```dotenv
VITE_API_BASE_URL="https://meal-master-backend-4433.onrender.com/api"  # Your Backend URL
# Optional (if using Google OAuth)
VITE_GOOGLE_CLIENT_ID="your-google-client-id"
```

Run the frontend:
```bash
npm run dev
```

---

## 📘 Usage

1. Visit the homepage **Meal Master App** (deployed link above)  
2. **Register/Login** to access your personalized dashboard  
3. Open **Profile** to set dietary preferences and targets  
4. Use **Meal Plan** to add meals from available recipes  
5. View **calorie and macro breakdown** in the Dashboard  
6. Check **Nutrition** section for detailed per-meal info  
7. Manage meals (**add/edit/delete**) as needed  

---

## 🔐 Credentials

| Role | Email               | Password |
|------|---------------------|----------|
| User | omkar@gmail.com     | 123456   |

> Use the demo account above to explore the app quickly.

---

## 🛠️ Technology Stack

### ⚙️ Frontend
- **React.js** (Vite)
- **Tailwind CSS**
- **React Router v6**
- **Axios**
- **Netlify** (deployment)

### 🧩 Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JWT Authentication**
- **Nodemailer** *(for password reset)*
- **CORS**
- **Render** (deployment)

---

## 🔎 API & Routes Overview

> **Base URL**: `https://meal-master-backend-4433.onrender.com/api`

**Auth**
- `POST /auth/register` – Create account  
- `POST /auth/login` – Login, returns JWT  
- `POST /auth/forgot-password` – Send reset email *(optional)*  
- `POST /auth/google` – Google OAuth flow *(optional)*

**Meals**
- `GET /meals` – List meals for current user  
- `POST /meals` – Create a meal  
- `PATCH /meals/:id` – Update a meal  
- `DELETE /meals/:id` – Remove a meal

**Recipes**
- `GET /recipes/search?q=` – Search recipes  
- `GET /recipes/:id` – Recipe details

**Analytics**
- `GET /analytics/summary` – Calories/macros summary (daily/weekly)

> All protected routes require `Authorization: Bearer <JWT>`.

---

## 🔧 Environment Variables Reference

**Backend (`backend/.env`)**
- `PORT` – Server port (default: 3000)  
- `MONGO_URI` – MongoDB connection string  
- `JWT_SECRET` – Secret for JWT signing  
- `SMTP_*` – SMTP settings for Nodemailer *(optional)*  
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OAUTH_REDIRECT_URL` *(optional)*

**Frontend (`frontend/.env`)**
- `VITE_API_BASE_URL` – Backend API base URL  
- `VITE_GOOGLE_CLIENT_ID` – Google OAuth client ID *(optional)*

---

## 👨‍🎓 Author

**Abhishek Bochare**  
📧 **abhishekbochare2003@gmail.com**  
🔗 **GitHub**: https://github.com/abhi-bochare

---

## 🙌 Support & Contribution

Contributions, issues, and feature requests are welcome!  
If you like this project, please ⭐️ the repo and share it with fellow developers.

> _Built with ❤️ using React, Node.js, Express, and MongoDB._
