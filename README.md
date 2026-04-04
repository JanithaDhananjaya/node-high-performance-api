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
| **Message Queue** | BullMQ & Redis |
| **Testing** | Jest & Supertest |
| **Validation** | Zod |
| **Security** | Helmet.js |
| **Quality** | SonarQube |

---

## ✨ Key Technical Features

### 1. Memory-Efficient Data Management
Utilizes **Cursor-based Pagination** and **Node.js Streams** for large dataset exports. This approach prevents memory overflows by processing data in chunks rather than buffering entire tables into RAM—essential for horizontal scalability.

### 2. High-Performance Caching & Queuing (Redis)
Implements the **Cache-Aside Pattern** for user profiles and utilizes **BullMQ** for robust background job processing (e.g., asynchronous email delivery). This offloads heavy tasks from the main thread, ensuring the API remains responsive.

### 3. Real-time Background Job Monitoring (BullBoard)
Integrated **BullBoard** dashboard to visualize and manage background task queues in real-time. Accessible via `/admin/queues`, it provides insights into job statuses (wait, active, completed, failed).

### 4. Advanced Relational Data Modeling
Utilizes **Prisma's** relational power to manage complex data structures:
- **Many-to-Many Relationships**: Seamlessly links `Posts` and `Categories` for flexible content tagging.
- **One-to-Many Relationships**: Links `Users` to their respective `Posts` with automated referential integrity.

### 5. Secure JWT Authentication
Implements a robust authentication system using **JSON Web Tokens (JWT)** and **bcryptjs** for password hashing. All sensitive endpoints are protected via a custom `authMiddleware`, ensuring state-of-the-art security for user data.

### 6. Enterprise-Grade Security & Monitoring
- **Helmet.js**: Implements various HTTP headers to protect against common web vulnerabilities.
- **SonarQube Integration**: Automated static code analysis to ensure high code quality, security standards, and maintainability.
- **Global Error Handling**: A centralized, predictable error response system using custom `AppError` utilities.

### 7. Modern Architecture (ESM)
Leverages native **ES Modules** (ESM) to utilize cutting-edge features like **Top-Level Await**, enabling cleaner asynchronous initializations.

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

### 3. Static Code Analysis (SonarQube)
Ensure your code meets quality standards:
```bash
# Start SonarQube scan
npm run sonar
```
```

---

## 🗺️ Roadmap
- [ ] Implement Redis-based Rate Limiting (API Security)
- [ ] CI/CD pipelines with GitHub Actions
- [ ] Migration to Vitest for faster unit testing
- [ ] Support for file uploads via AWS S3 / Cloudinary

---

**Developed by Janitha Silva - Senior Full Stack Engineer** 💻