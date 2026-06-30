# 🛍️ Marketplace UMKM Lokal

REST API Marketplace Produk Lokal UMKM Desa menggunakan Express.js dan Supabase.

---

## 📌 Deskripsi

Marketplace UMKM Lokal merupakan aplikasi backend berbasis REST API yang bertujuan membantu pelaku UMKM dalam memasarkan produk secara digital.

Aplikasi menyediakan fitur autentikasi pengguna, pengelolaan kategori, produk, pemesanan, upload gambar produk, serta dokumentasi API menggunakan Swagger.

---

# 🚀 Fitur

- Authentication (Register & Login)
- JWT Authentication
- CRUD Produk
- CRUD Kategori
- CRUD Order
- Upload Gambar Produk
- Supabase Storage
- Swagger Documentation
- REST API

---

# 🛠️ Tech Stack

Backend

- Node.js
- Express.js

Database

- PostgreSQL (Supabase)

Authentication

- JWT
- Supabase Auth

Storage

- Supabase Storage

Documentation

- Swagger UI

---

# 📁 Struktur Project

backend/

├── config/

├── controllers/

├── middleware/

├── routes/

├── swagger/

├── app.js

├── server.js

└── package.json

---

# 📦 Install

Clone Repository

```bash
git clone https://github.com/firsarasen/marketplace-umkm-lokal.git
```

Masuk Folder

```bash
cd marketplace-umkm-lokal
```

Install Dependency

```bash
npm install
```

---

# ⚙️ Konfigurasi

Buat file .env

```env
SUPABASE_URL=

SUPABASE_KEY=

JWT_SECRET=

PORT=3000
```

---

# ▶ Menjalankan

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📚 Swagger

```
http://localhost:3000/api-docs
```

---

# 📌 Endpoint

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

---

## Products

GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

---

## Categories

GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

---

## Orders

GET /api/orders

POST /api/orders

PUT /api/orders/:id/status

DELETE /api/orders/:id

---

## Upload

POST /api/upload

---

# 👨‍💻 Author

Raden Mochammad R.F

---

# 📄 License

MIT License
