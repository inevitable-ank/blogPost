# Blog Platform with Role-Based Access Control (RBAC)

This project is a full-stack **Blog Platform** with **Role-Based Access Control (RBAC)** implemented using **Node.js, Express, MongoDB, and React**. It ensures secure handling of **user roles** such as **admin** and **user**, with proper access control.

---

## 📦 **Project Structure:**

```plaintext
- frontend (React + Tailwind CSS)
   - components
       - Shared
       - Blog
       - Admin
   - context
   - pages
   - services
   - App.js

- backend (Node.js + Express + MongoDB)
   - controllers
   - middleware
   - models
   - routes
   - server.js
```

---

## ✅ **Key Features:**

- **Authentication:** Secure login/signup using **JWT**.
- **Role-Based Access:**
   - **Admin:** Can create, update, delete blog posts and promote users to admin.
   - **User:** Can only view blog posts.
- **Database:** MongoDB for storing users, posts, and roles.
- **Security:**
   - Password hashing using **bcrypt**.
   - JWT expiration and validation.
- **UI:** Modern UI with **React + Tailwind CSS**.
- **Email Verification:** Verification using **Nodemailer**.

---

## 🚀 **Technologies Used:**
- **Frontend:** React, Axios, Tailwind CSS.
- **Backend:** Node.js, Express.js, MongoDB Atlas, JWT, Bcrypt.

---

## ✅ **Prerequisites:**

Ensure you have **Node.js**, **npm**, and **MongoDB Atlas** properly configured.

---

## 📥 **Installation:**

### **1. Clone the Repository:**
```bash
git clone <repo-url>
cd Blog-Platform-RBAC
```

### **2. Backend Setup:**
```bash
cd backend
npm install
```

### **3. Frontend Setup:**
```bash
cd frontend
npm install
```

---

## ✅ **Environment Variables (`.env`):**

Create a `.env` file in both the **frontend** and **backend** directories with the following content:

### **Frontend (`frontend/.env`):**
```plaintext
REACT_APP_API_URL=http://localhost:5000
```

### **Backend (`backend/.env`):**
```plaintext
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogdb
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password
```

---

## 🚀 **Running the Application:**

### **1. Start the Backend Server:**
```bash
cd backend
npm start
```

### **2. Start the Frontend Server:**
```bash
cd frontend
npm start
```

### **App will be available at:**
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

---

## ✅ **Testing:**

- **Signup as a User.**
- **Check your Email** for verification.
- **Login** after verifying your email.
- **Admin Dashboard:** `/admin` (Admin Only)
- **Manage Users:** Promote a user to **Admin**.
- **Create Blog Post:** Only admins can create and delete posts.

---

## 📦 **API Endpoints:**

### **Auth Routes:**
- `POST /api/auth/signup` → Register a user.
- `POST /api/auth/login` → Log in a user.
- `GET /api/auth/verify/:token` → Email verification.

### **Blog Routes:**
- `GET /api/posts` → Fetch all posts.
- `POST /api/posts` (Admin Only) → Create a post.
- `DELETE /api/posts/:id` (Admin Only) → Delete a post.

### **Admin Routes:**
- `PATCH /api/admin/promote/:id` (Admin Only) → Promote a user to admin.
- `GET /api/admin` (Admin Only) → Fetch all users.

---

## ✅ **Security Measures Implemented:**
- **JWT Token Expiration.**
- **Bcrypt Password Hashing.**
- **Token Verification for Secure Routes.**
- **CORS Protection.**

---

## ✅ **Planned Enhancements:**
- ✅ **Real-time Notifications.**
- ✅ **Password Reset Flow.**
- ✅ **Unit Testing with Jest.**

---

## 📩 **Contributing:**
- Fork the repository.
- Create a new branch (`feature-branch`).
- Commit your changes.
- Open a pull request.

---

## 📜 **License:**
This project is licensed under the MIT License.

---

## ✅ **Contact:**
- 📧 **Email:** your-email@gmail.com
- 🌐 **GitHub:** [Your GitHub Profile](https://github.com/yourprofile)

---

### 🚀 **Happy Coding! Let me know if you need further improvements! 😊**
