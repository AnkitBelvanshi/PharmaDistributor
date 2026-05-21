# Lifecare Supportive Solutions — Pharma Distributor

Full-stack pharmaceutical distribution web application built with React 18, Express.js, and PostgreSQL.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (access + refresh tokens, httpOnly cookie) |
| Forms | React Hook Form + Zod |
| Email | Nodemailer |
| Uploads | Multer |
| reCAPTCHA | react-google-recaptcha (v2) |
| Social Sharing | react-share |

---

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or Docker)
- npm 10+

---

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd pharma-distributor

# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Configure environment

**server/.env**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

DATABASE_URL="postgresql://postgres:password@localhost:5432/pharma_distributor?schema=public"

JWT_SECRET=change_this_to_a_long_random_string
JWT_REFRESH_SECRET=change_this_to_another_long_random_string
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

RECAPTCHA_SECRET_KEY=your_google_recaptcha_v2_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@yourcompany.com
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RECAPTCHA_SITE_KEY=your_google_recaptcha_v2_site_key
```

### 3. Database setup

```bash
cd server

# Push schema to PostgreSQL
npm run db:push

# Seed 12 medicines
npm run db:seed
```

### 4. Run in development

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## Docker (optional)

```bash
# Spin up PostgreSQL + server + client
docker-compose up -d

# Run migrations inside container
docker exec pharma_server npx prisma db push
docker exec pharma_server npm run db:seed
```

---

## API Reference

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | — | Register admin |
| POST | /api/auth/login | — | Login, returns JWT |
| POST | /api/auth/logout | Bearer | Logout |
| POST | /api/auth/refresh | Cookie | Refresh access token |
| GET | /api/auth/me | Bearer | Current user |
| PUT | /api/auth/profile | Bearer | Update profile |
| DELETE | /api/auth/account | Bearer | Delete account |

### Medicines (public)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/medicines | List with pagination |
| GET | /api/medicines/featured | Featured 6 medicines |
| GET | /api/medicines/search?q= | Search by name |
| GET | /api/medicines/:id | Single medicine |

### Medicines (admin)
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/admin/medicines | Create (multipart) |
| PUT | /api/admin/medicines/:id | Update (multipart) |
| DELETE | /api/admin/medicines/:id | Delete + remove image |

### Queries
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/contact | — | Submit contact form |
| GET | /api/admin/queries | Bearer | List queries |
| DELETE | /api/admin/queries/:id | Bearer | Delete query |

### Admin
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/admin/stats | Bearer | Dashboard stats |

---

## Project Structure

```
pharma-distributor/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # Axios instance & API services
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth context
│       ├── hooks/          # Custom hooks
│       ├── layouts/        # Page layouts
│       └── pages/          # Public & admin pages
└── server/                 # Express.js backend
    ├── prisma/             # Schema + seed
    └── src/
        ├── config/         # Environment config
        ├── controllers/    # Route handlers
        ├── middleware/     # Auth, upload, validate
        ├── routes/         # Express routers
        ├── services/       # Business logic
        └── utils/          # JWT, reCAPTCHA helpers
```

---

## Default Admin

After registering your first admin account at `/register`, you can log in at `/login`.

No default credentials are seeded — the first user you register becomes the admin.
