# 🍬 KATA Sweet Shop Management System

A full-stack web application developed as part of a **TDD (Test-Driven Development) Kata**.
This system manages a sweet shop’s inventory with **secure authentication**, **role-based access control**, and **complete CRUD operations** for sweets.

---

## 👤 Author
**Mohit Thakur**
GitHub Profile: 👉 [https://github.com/Mohitthakur123]

---
## ✨ Features

* **User Authentication**

  * Secure registration and login using JWT
  * Password hashing with bcrypt
* **Role-Based Access Control**

  * Admin users can add, edit, and delete sweets
  * Regular users can view and purchase sweets
* **Inventory Management**

  * Add, update, delete, search sweets
  * Purchase sweets with automatic stock updates
* **Modern Frontend UI**

  * Built using React and Material-UI
  * Clean pastel theme with glassmorphism design
  * Fully responsive and user-friendly
* **Robust Backend API**

  * RESTful API built with Node.js and Express
  * Prisma ORM for database interaction
* **Database Integration**

  * PostgreSQL for persistent data storage
* **Test-Driven Development**

  * Backend logic tested using Vitest
  * Focus on reliability and business logic correctness

---

## Screenshots
<img width="1890" height="969" alt="Screenshot 2025-12-14 130539" src="https://github.com/user-attachments/assets/b1085f6b-937b-4b19-a360-9542388316e4" />
<img width="1899" height="865" alt="Screenshot 2025-12-14 180431" src="https://github.com/user-attachments/assets/f8ba96d6-d735-4d65-b344-4f64faadbce1" />



## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Material-UI
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL

### Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt.js

### Testing

* Vitest

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

### Prerequisites

* Node.js (v18 or later)
* npm
* Git
* PostgreSQL (local or cloud instance)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mohitthakur123/Kata_sweet_shop.git
cd Kata_sweet_shop
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/sweetshop"
JWT_SECRET="your_super_secret_key"
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL='https://kata-sweet-shop-jj7v.onrender.com'
```

Start the frontend server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 🧪 Running Tests

To run backend tests and view coverage:

```bash
cd backend
npm test -- --coverage
```
<img width="1193" height="385" alt="Screenshot 2025-12-14 133721" src="https://github.com/user-attachments/assets/b153e10f-080b-4fe7-beff-e5fcb6b3ce2a" />

### Test Summary

* **Sweet Service Tests**

  * Create sweet
  * Update sweet
  * Delete sweet
  * Purchase sweet
  * search or filter sweets

* **Auth Service Tests**

  * User registration
  * Successful login
  * Failed login

### Code Coverage Summary

| File            | % Statements | % Branch   | % Functions | % Lines    |
| --------------- | ------------ | ---------- | ----------- | ---------- |
| **All files**   | **70.37%**   | **83.33%** | **62.5%**   | **70.37%** |
| authService.js  | 37.06%       | 100%       | 100%        | 37.06%     |
| sweetService.js | 79.41%       | 60%        | 100%        | 79.41%     |

---

## 🤖 My AI Usage

This project was developed with the assistance of **AI tools** as a **pair-programming and learning aid**, in line with responsible AI usage practices.

### How AI was used:

* UI improvements using Material-UI styling
* Refactoring JSX while keeping business logic unchanged
* Debugging authentication, routing, and API integration issues
* Assisting with test writing and understanding TDD workflows

### Reflection

> AI helped accelerate development by providing guidance and suggestions, but all architectural decisions, logic understanding, and final implementations were reviewed, validated, and executed by me.

---

## 📌 Conclusion

This project demonstrates:

* Full-stack development skills
* Secure authentication & authorization
* Test-Driven Development (TDD)
* Clean, consistent UI design
* Responsible use of AI tools

