# Saving the architecture document as a file for download
with open("/mnt/data/architecture_document.md", "w") as file:
    file.write("""# Blog Platform Architecture Document

## 🏗️ **Overview:**
This architecture document outlines the structure, technologies, and flow of the **Blog Platform with RBAC (Role-Based Access Control)**.

---

## ✅ **Technology Stack:**

### **Frontend:**
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios

### **Backend:**
- **Framework:** Node.js + Express.js
- **Authentication:** JWT (JSON Web Token)
- **Password Security:** bcrypt.js
- **Database:** MongoDB Atlas (Cloud-hosted NoSQL Database)
- **ORM:** Mongoose

### **Security:**
- **JWT Token Handling.**
- **Password Hashing with bcrypt.js.**
- **CORS Management for Secure API Calls.**

---

## ✅ **System Design:**

### **1. Component Breakdown:**

#### **Frontend:**
- `Navbar.jsx` → Shared Navbar for Navigation.
- `Signup.jsx` → Handles user registration with verification.
- `Login.jsx` → User login handling.
- `AdminDashboard.jsx` → Admin management panel.
- `BlogList.jsx` → Display of all blog posts.
- `CreatePost.jsx` → Admin-only blog post creation.

#### **Backend:**
- **Controllers:** `authController.js`, `blogController.js`, `adminController.js`
- **Routes:** `authRoutes.js`, `blogRoutes.js`, `adminRoutes.js`
- **Middleware:** `authMiddleware.js`, `roleMiddleware.js`
- **Models:** `User.js`, `Blog.js`

---

### **2. Data Flow Diagram:**

```plaintext
[Frontend UI] → (POST /signup) → [Backend Auth Controller] → [MongoDB User Collection]
↓
[Frontend UI] ← (Token Returned) ← [JWT Token Generation]
↓
[User Login] → [Verify Token + Login Controller]
↓
[ProtectedRoute] → Restrict Access for Unauthorized Users
↓
[AdminPanel] → (Create/Delete Blogs) → Blog Collection


✅ Database Design:
User Schema:

User {
   _id: ObjectId,
   name: String,
   email: String,
   password: String (Hashed),
   role: String ('user' | 'admin'),
   isVerified: Boolean,
}


Blog Schema:
Blog {
   _id: ObjectId,
   title: String,
   content: String,
   author: String,
   createdAt: Date,
}

✅ API Flow (Example Endpoints):
Authentication Endpoints:
POST /api/auth/signup → Register a new user.
POST /api/auth/login → Login and return JWT Token.
GET /api/auth/verify/:token → Verify email via token.
Blog Management:
GET /api/posts → Fetch all posts.
POST /api/posts (Admin Only) → Create a new blog post.
Admin Management:
PATCH /api/admin/promote/:id (Admin Only) → Promote a user to admin.
✅ Security Considerations:
JWT Token Expiry Handling.
CORS Implemented.
Proper Error Handling in Backend.
✅ Conclusion:
This architecture ensures a secure and scalable blog platform where user roles are respected and properly managed.

🎯 Next Steps:
Implement Real-time Notifications.
Add Unit Tests with Jest.

🚀 Feel free to ask for any further enhancements! 😊
""")