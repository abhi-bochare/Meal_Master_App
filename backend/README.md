# 🍽️ Meal Master - Backend  
Node.js · Express.js · MongoDB · Render

---

## 📖 Description  
This is the backend REST API for the Meal Master application. It powers the user authentication, meal planning, recipe management, and nutrition tracking features. Built using Node.js, Express, and MongoDB (via Mongoose), it supports secure JWT-based authentication and robust route protection.

---

## 🌐 Live Links  
🔗 **API**: [https://meal-master-backend-4433.onrender.com](https://meal-master-backend-4433.onrender.com/api)  

---

## ⚙️ Tech Stack  
- **Node.js** + **Express.js**  
- **MongoDB Atlas** + Mongoose ODM  
- **JWT Authentication**  
- **Nodemailer** (for password reset)  
- **CORS**
- **Render** (for deployment)

---

## 📁 Folder Structure  
#├── config/ # DB & third-party config
#├── middleware/ # Auth, error handling, etc.
#├── models/ # Mongoose schemas
#├── routes/ # API route handlers
#├── node_modules/
#├── .env # Environment variables
#├── .gitignore
#├── package.json
#├── seedData.js # Initial data seeding
#└── server.js # Main entry point


---

## 🚀 Getting Started  

### 🧰 Prerequisites  
- Node.js v16+  
- MongoDB Atlas (or local MongoDB)

---

### 🛠 Installation  
```bash
git clone https://github.com/abhi-bochare/Meal_Master_Backend.git
cd meal-master-backend
npm install
```
---
### 🔐 Environment Variables
Create a .env file in the root:
<img width="486" height="163" alt="{F4B6052B-4A86-43B7-BB37-4A3F67CACF2E}" src="https://github.com/user-attachments/assets/c02bc730-146c-4d6e-9406-6a89106e051f" />

---
### 📦 Available Scripts
```
npm run dev     # Development mode with nodemon
npm start       # Production mode
```
---
## 🔐 Authentication & Roles
JWT-based login & signup
Protected routes using middleware

---
## 📚 API Endpoints Overview
Method	Endpoint	Description	Access
POST	/api/auth/register	Register new user	Public
POST	/api/auth/login	Login user	Public
POST	/api/auth/reset	Send password reset email	Public
POST	/api/meal-plan	Add meal to meal plan	Authenticated
GET	/api/meal-plan	Get user's meal plan	Authenticated
DELETE	/api/meal-plan/:id	Delete meal entry	Authenticated
GET	/api/recipes	Get all recipes	Public
POST	/api/recipes	Create recipe	Admin only

---
## 🧱 Database Models (Summary)
### User
name, email, password, role, resetToken

### Recipe
name, description, nutrition (calories, protein, etc.), prepTime, cookTime, image

### MealPlan
user, day, mealType, recipe, servings

---
## 🧪 Testing
Use Postman with the API

Include Bearer Token for protected routes

---
## 🧹 Best Practices Followed
✅ MVC Project Structure
✅ Modular Routes & Controllers
✅ Input Validation
✅ Secure Password Hashing
✅ JWT Token Auth
✅ Environment-based Config
✅ Proper HTTP Status Codes
✅ RESTful API Design

---
## 🛡️ Security Notes
Passwords are hashed using bcrypt

Tokens are signed with JWT_SECRET

All secrets stored in .env (never push to Git)

CORS properly configured for frontend deployment

Secure headers via middleware

---
## 🤝 Contributors
Abhishek Bochare

---
