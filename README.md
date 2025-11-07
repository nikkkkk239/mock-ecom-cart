# 🛒 Mock E-Commerce Cart — Full Stack Assignment (Vibe Commerce)

A full-stack **shopping cart web application** built as part of the **Vibe Commerce Internship Screening Task**.  
Implements core e-commerce flows including product listing, cart management, quantity updates, and checkout with a mock receipt.

---

## 🎯 Project Goal
To demonstrate full-stack capabilities including:
- REST API development
- Database integration
- Frontend state handling & UI
- Cart logic and checkout flow

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TailwindCSS, Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| API Style | REST |

---

## ✨ Features

### ✅ Frontend
- Product listing with **Add to Cart**
- Dedicated **Cart page**
  - Increase / decrease quantity
  - Remove item
  - Dynamic total calculation
- Checkout flow with:
  - Receipt modal
  - Order timestamp
  - Dummy user + company details
- Fully responsive UI using **TailwindCSS**

### ✅ Backend
- REST APIs to manage products and cart
- Cart stored in **MongoDB** (persists until checkout)
- Cart clears both from UI & database after checkout

---

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/products` | Fetch mock product list |
| `GET` | `/api/cart` | Fetch cart + total |
| `POST` | `/api/cart` | Add product to cart |
| `PATCH` | `/api/cart/qty` | Update product quantity |
| `DELETE` | `/api/cart/:id` | Remove single item |
| `DELETE` | `/api/cart/clear` | Clear full cart after checkout |
| `POST` | `/api/checkout` | Mock receipt response |

---

## 📂 Project Structure
Mock-Ecom-Cart/
│
├── backend/ → Express Server + API Routes
├── frontend/ → React App (UI)
└── README.md → Project Documentation

## ⚙️ Setup & Run the Project

### 1️⃣ Clone the repository
```sh
git clone <YOUR_GITHUB_REPO_URL>
cd Mock-Ecom-Cart

### 2️⃣ Run the backend
cd backend
npm install
npm start
Backend runs on: http://localhost:3000

### 3️⃣ Run the frontend
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173


💡 Extra Improvements Added
✔ Quantity increase/decrease buttons
✔ Auto cart refresh after actions
✔ Invoice-style receipt modal
✔ Persistent DB storage until checkout
