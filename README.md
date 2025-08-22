# Blog Management System – Assessment Submission

## 🚀 Tech Stack
- **Frontend:** Next.js (React.js, TailwindCSS)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT-based authentication
- **Other Tools:** REST APIs, bcrypt for password hashing, Postman for API testing

---

## ✨ Features Implemented
- **User Authentication**
  - Sign up with email & password
  - Login with JWT-based session

- **Blog Management**
  - Create, edit, and delete blog posts
  - Assign categories (Personal, Tech, Travel, Food)
  - Draft & publish options

- **User Profile Management**

- **Database Integration**
  - PostgreSQL with relationships between `users` and `blog_posts`

- **Responsive UI**
  - Built with Next.js + TailwindCSS

---

## 🗄️ Database Setup
1. Install PostgreSQL (v17 recommended).
2. Create a new database:
### Import schema
```bash
psql -U postgres -d blog_management -f schema.sql

## Update .env file in both frontend and backend projects with your own credentials:

# Example
PORT=5000
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=blog_management
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_secret_here

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

   ```sql
   CREATE DATABASE blog_management;
