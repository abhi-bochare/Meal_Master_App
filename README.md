# Meal Master App 🍽️

## Introduction
**Meal Master** is a full-stack application designed to help users plan, track, and analyze their daily meals. With real-time nutrition data, user authentication, and a recipe planner, it streamlines the entire meal management experience. Built using **React.js** for the frontend and **Node.js + Express + MongoDB** for the backend, it provides secure and efficient meal tracking functionality for health-conscious users.

---
## Project Type
**Fullstack**

---
## Deployed App
- **Frontend**: https://meal-masterr.netlify.app/
- **Backend**: https://meal-master-backend-4433.onrender.com/
- **Database**: MongoDB Atlas

---
## Directory Structure
Meal_Master_App/
├── backend/ # Express + MongoDB backend API
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── config.js
│ ├── server.js
│ └── .env
├── frontend/ # React + Redux frontend
│ ├── src/
│ ├── public/
│ ├── index.html
│ └── vite.config.js
├── README.md # This file

---
## 🎥 Video Walkthrough of the Project
🔗 [Project Demo (1-3 mins)](https://your-video-link.com)

---
## ✨ Features

- User authentication (Email/Password + Google OAuth)
- Meal Planner with nutritional breakdown
- Real-time dashboard analytics
- Recipe search and integration
- Add/Track/Edit/Delete meals
- Responsive UI with mobile-friendly navigation
- Password reset and protected routes

---
## 💡 Design Decisions & Assumptions

- Used JWT token based authentication.
- CORS issues handled via middleware with allowed origins
- Assumed that each meal has a related recipe and serving count
- Lightweight UI libraries for performance on low-end devices
- Meal type classification based on time of day

---
## 🚀 Installation & Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas account
- Firebase project setup (for Auth)

### Clone the Repository
```bash
git clone https://github.com/your-username/Meal_Master_App.git
cd Meal_Master_App
```
### Backend Setup
```bash
cd backend
npm install
node server.js
```
### create .env file
```
PORT=3000
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/mealmaster" #(Your MongoDB link)
JWT_SECRET=yourJWTSecret
```

### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### create .env file
```
VITE_API_BASE_URL="https://meal-master-backend-4433.onrender.com/api"  #(Your Backend URL).
```

---
## 📘 Usage
Navigate to the homepage: Meal Master App

Register/login to access personalized dashboard

Edit profile on profile icon and select preferences

Add meals in Meal Plan from available recipes

View calorie and macro breakdown

View Nutritional Info on Nurtition 

Use dashboard stats to monitor progress

---
## 🔐 Credentials

| Role  | Email                      | Password |
| ----- | -------------------------- | -------- |
| User  | omkar@gmail.com            | 123456   |

---
## 🛠️ Technology Stack
### ⚙️ Frontend  
- **React.js** with Vite  
- **Tailwind CSS** for styling  
- **React Router v6**   
- **Axios** for HTTP requests  
- **Netlify** for deployment

### ⚙Backend 
- **Node.js** + **Express.js**  
- **MongoDB Atlas** + Mongoose ODM  
- **JWT Authentication**  
- **Nodemailer** (for password reset)  
- **CORS**
- **Render** (for deployment)

---
## 📬 Contact
For bugs or feature requests, open an issue or contact the author.

---
## 🤝 Contributors
Abhishek Bochare

---

