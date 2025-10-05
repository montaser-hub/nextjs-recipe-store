
# 🍕 Recipe Store  
**Next.js 15 + TypeScript + TailwindCSS**

> A modern recipe e-commerce demo app showcasing dynamic routing, API data fetching, reusable UI components, and upcoming features like authentication and shopping cart integration.

---

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-in%20progress-yellow)

---

## 📖 Overview

This project demonstrates:
- ⚙️ Integration of **server** & **client** components
- 🧭 **Dynamic routing** with nested layouts
- 🌐 **API fetching** using async server functions
- 🧩 **Reusable UI components** for clean structure
- 🔒 **TypeScript** typing for safer development

---

## 🗂️ Folder Structure

```

src/
├── app/
│   └── recipes/
│        ├── layout.tsx
│        ├── [category]/
│        │     ├── page.tsx
│        │     └── [recipeId]/page.tsx
│        ├── loading.tsx
│        ├── error.tsx
│        └── not-found.tsx
│
├── components/
│   ├── Breadcrumb.tsx
│   ├── NavBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductsGrid.tsx
│   ├── Sidebar.tsx
│   ├── TextExpander.tsx
│   └── UpdateProfileForm.tsx
│
├── services/
│   └── recipies.jsx
│
└── types/
└── Product.ts

````

---

## ✅ Implemented Features

### 🧭 Routing & Pages
- Dynamic nested routes:
  - `/recipes`
  - `/recipes/[category]`
  - `/recipes/[category]/[recipeId]`
- Folder-level **layouts** for category and recipe detail views  
- Built-in **Loading**, **Error**, and **NotFound** components

### 🎨 UI Components
- **Breadcrumb** → dynamic trail (Home → Recipes → Category → Recipe)  
- **NavBar** → sticky top navigation  
- **Sidebar** → category filtering (`useRouter`, `usePathname`)  
- **ProductCard** → image, rating, and price display  
- **ProductsGrid** → responsive list rendering  
- **TextExpander** → toggle long text  
- **UpdateProfileForm** → editable user data form  

### 🌐 API Integration
- Data from [Forkify API](https://forkify-api.herokuapp.com/api/v2/recipes)
- `recipes(category)` → category listing  
- `recipe(id)` → detail view  
- Supports **Incremental Static Regeneration (ISR)** (`revalidate: 60`)

### 🧱 TypeScript Models
- `Product` and `Ingredient` interfaces for structured typing

---

## 🧠 Implemented So Far

| Feature | Status |
|----------|---------|
| Server & Client Components | ✅ |
| Dynamic Routing | ✅ |
| API Fetching | ✅ |
| Loading/Error States | ✅ |
| Responsive TailwindCSS UI | ✅ |
| Type Safety | ✅ |
| Breadcrumb + Sidebar | ✅ |

---

## 🧩 To-Do / Upcoming Features

### 🔐 Authentication (NextAuth.js)
- [ ] Add Google & Facebook OAuth  
- [ ] Login / Register / Signout pages  
- [ ] Restrict access to private routes  
- [ ] Add session-based middleware

### 🛒 Shopping Cart
- [ ] Client-side cart display  
- [ ] Quantity control & item removal  
- [ ] Server total calculation  
- [ ] Integrate with **Redux Toolkit** or **React Query**

### 📦 Product Detail
- [ ] Add "Add to Cart" logic  
- [ ] Quantity selector  
- [ ] Fetch product data with **React Query**

### 🧾 Product Listing Enhancements
- [ ] Sorting & filtering (server-side)
- [ ] Improved “See more / See less” UX  
- [ ] Wishlist & order history (server components)

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth (planned) | NextAuth.js |
| State | Redux Toolkit / TanStack Query (planned) |
| Data Source | Forkify API |

---

## 🛠️ Setup & Development

### 1️⃣ Clone & Install
```bash
git clone https://github.com/<your-username>/nextjs-recipe-store.git
cd store
npm install
````

### 2️⃣ Run the App

```bash
npm run dev
```

Then open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Run production build     |
| `npm run lint`  | Lint code for issues     |

---

## 🧾 License

MIT © 2025 — **Recipe Store Demo**

---

## 👨‍💻 Author

**Developed by Montaser Ismail**
Part of **Next.js Lab 3 — ITI_BNS Program**

📎 *The attached* **Lab3.png** *includes the remaining requirements (Authentication, Cart, Product Detail, etc.)*

```

---
