# 🚀 Node.js Scalable & High-Performance API

A professional-grade backend architecture built with **Node.js (ES Modules)**, **Prisma**, and **PostgreSQL**. This project demonstrates enterprise-level engineering patterns, focusing on memory efficiency, high-performance data streaming, and multi-level caching strategies.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Runtime** | Node.js v22.x+ |
| **Framework** | Express.js 5.x |
| **ORM** | Prisma 7.x |
| **Storage** | PostgreSQL (Dockerized) |
| **Caching** | Redis (Dockerized) |
| **Streaming** | Node.js Streams & `fast-csv` |
| **Testing** | Jest & Supertest |
| **Validation** | Zod |

---

## ✨ Key Technical Features

### 1. Memory-Efficient Data Management
Utilizes **Cursor-based Pagination** and **Node.js Streams** for large dataset exports. This approach prevents memory overflows by processing data in chunks rather than buffering entire tables into RAM—essential for horizontal scalability.

### 2. High-Performance Caching (Redis)
Implements the **Cache-Aside Pattern** for user profiles. By caching frequently accessed records in Redis with optimized TTLs, database overhead is reduced by up to 80% for read-heavy operations.

### 3. Modern Architecture (ESM)
Leverages native **ES Modules** (ESM) to utilize cutting-edge features like **Top-Level Await**, enabling cleaner asynchronous initializations (e.g., database/Redis connection at startup).

---

## ⚙️ Setup & Installation

### Prerequisites
- [Docker & Docker Compose](https://www.docker.com/get-started)
- [Node.js v22+](https://nodejs.org/)

### 1. Installation
```bash
git clone <your-repo-url>
cd node-high-performance-api
npm install
```

### 2. Environment Configuration
Create a `.env` and `.env.test` file in the root directory:

**Development (.env):**
```env
DATABASE_URL="postgresql://postgres:password@127.0.0.1:6432/user_db?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-ultra-secure-secret-key"
PORT=3000
```

### 3. Infrastructure Deployment
Spin up the database and Redis instances using Docker:
```bash
docker-compose up -d
```

### 4. Database Setup & Seeding
```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init

# Seed the database with 1,000 mock users
npx prisma db seed
```

---

## 🧪 Testing & Execution

### Running the App
```bash
# Start in production mode
npm start

# Start in development mode (watcher)
npm run dev
```

### Running Tests
```bash
# Run integration & unit tests
npm test
```

---

## 🗺️ Roadmap
- [ ] Implement Redis-based Rate Limiting (API Security)
- [ ] Integration with SonarQube for Static Code Analysis
- [ ] CI/CD pipelines with GitHub Actions
- [ ] Migration to Vitest for faster unit testing

---

**Developed by Janitha Silva - Senior Full Stack Engineer** 💻