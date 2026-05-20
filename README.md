# � Smart Leads Dashboard

A production-ready full-stack web application for managing sales leads with real-time search, filtering, CSV export, and role-based access control. Built with modern cloud-native technologies and deployed on scalable infrastructure.

**Live Demo:**
- **Frontend:** https://smartleadsdashboard-smoky.vercel.app
- **Backend API:** https://smart-leads-dashboard-ccfi.onrender.com
- **GitHub:** [tiwaritanay01/smart_leads_dashboard](https://github.com/tiwaritanay01/smart_leads_dashboard)

---

## ✨ Features

- ✅ **Secure Authentication** – JWT-based registration & login with bcrypt password hashing
- ✅ **Role-Based Access Control** – Admin (full CRUD) and Sales (create, read, update)
- ✅ **Lead Management** – Complete CRUD operations with real-time validation (Zod)
- ✅ **Advanced Filtering** – Filter by status, source, and free-text search (debounced)
- ✅ **Server-Side Pagination** – Efficient data loading with configurable page size
- ✅ **CSV Export** – One-click export of filtered leads to CSV format
- ✅ **Dark Mode** – System-preference aware with persistent user preference
- ✅ **Type-Safe** – TypeScript strict mode on both frontend and backend
- ✅ **Production Deployment** – Containerized with CI/CD pipelines and cloud hosting

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│          Vercel (Frontend - Static Hosting)          │
│  React 19 + TypeScript + Vite + Tailwind CSS 3       │
│  - Authentication pages (login/register)             │
│  - Dashboard with lead management                    │
│  - Protected routes with JWT verification            │
└────────────────────┬─────────────────────────────────┘
                     │ HTTPS/REST API
                     ▼
┌──────────────────────────────────────────────────────┐
│       Render (Backend - Docker Container)            │
│  Node.js 20 + Express + TypeScript                   │
│  - Authentication endpoints (register/login)         │
│  - Lead CRUD endpoints with validation               │
│  - CSV export & filtering                            │
│  - JWT middleware & CORS configuration               │
└────────────────────┬─────────────────────────────────┘
                     │ Mongoose ODM
                     ▼
┌──────────────────────────────────────────────────────┐
│       MongoDB Atlas (Cloud Database)                 │
│  - Users collection (hashed passwords)               │
│  - Leads collection (role-based access)              │
│  - Automatic backups & scaling                       │
└──────────────────────────────────────────────────────┘
```

**Authentication Flow:**
1. User registers/logs in on frontend
2. Frontend sends credentials to backend `/api/auth/register` or `/api/auth/login`
3. Backend validates, hashes password (bcrypt), generates JWT token
4. Frontend stores JWT in localStorage and includes in `Authorization: Bearer <token>` header
5. Backend middleware validates JWT on protected routes
6. Dashboard only accessible with valid token; automatic logout on token expiration

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript 6.0
- **Build Tool:** Vite 8 (lightning-fast dev server)
- **Styling:** Tailwind CSS 3.4 + PostCSS
- **Routing:** React Router 7
- **HTTP Client:** Axios with request/response interceptors
- **Form Management:** React Hook Form + Zod validation
- **State Management:** React Context (Auth, Theme)

### Backend
- **Runtime:** Node.js 20 (Alpine Linux for production)
- **Framework:** Express 5
- **Language:** TypeScript 6 (strict mode)
- **Database:** Mongoose 9.6 (MongoDB ODM)
- **Authentication:** JWT (jsonwebtoken 9) + bcrypt 6
- **Validation:** Zod 4.4 (client & server)
- **Security:** Helmet, CORS with origin whitelisting
- **Logging:** Morgan request logging
- **File Processing:** csv-writer for export

### Deployment
- **Frontend:** Vercel (automatic deployments on push)
- **Backend:** Render (Docker container with auto-redeployment)
- **Database:** MongoDB Atlas (managed cloud database)
- **CI/CD:** GitHub Actions (unified deploy workflow)
- **Container Registry:** GitHub Container Registry (GHCR)

---

## 📋 Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| npm | 10+ |
| Docker Desktop | 24+ _(optional, for containerized setup)_ |
| MongoDB Atlas | Free tier account _(for production)_ |

---

## 🚀 Quick Start

### Clone Repository

```bash
git clone https://github.com/tiwaritanay01/smart_leads_dashboard.git
cd smart_leads_dashboard
```

### Option 1: Docker (Recommended for Local Dev)

```bash
# Create backend environment file
cp backend/.env.example backend/.env

# Edit backend/.env with your MongoDB URI and JWT secret
# Then start all services
docker-compose up --build

# Access:
# Frontend: http://localhost
# Backend:  http://localhost:5000
# Health:   http://localhost:5000/health
```

Stop with: `docker-compose down`

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
# Runs on http://localhost:5000
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`.env` or `.env.production`)

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# JWT Authentication
JWT_SECRET=your_super_secret_key_with_at_least_32_characters
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development  # or 'production'

# CORS
FRONTEND_ORIGIN=http://localhost:5173  # or https://your-domain.com for production
```

### Frontend (`.env` or `.env.production`)

```env
VITE_API_BASE_URL=http://localhost:5000/api  # or your deployed backend URL
```

---

## 📡 API Endpoints

**Base URL:** `/api`  
**Authentication:** Most endpoints require `Authorization: Bearer <token>` header

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login, returns JWT token |
| GET | `/auth/me` | ✅ | Get current user profile |

### Leads Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/leads` | ✅ | Any | Get leads (paginated, filterable) |
| POST | `/leads` | ✅ | Admin, Sales | Create new lead |
| GET | `/leads/:id` | ✅ | Any | Get single lead |
| PUT | `/leads/:id` | ✅ | Any | Update lead |
| DELETE | `/leads/:id` | ✅ | Admin | Delete lead |
| GET | `/leads/export/csv` | ✅ | Any | Export leads as CSV |

**Query Parameters for `GET /leads`:**

```
?status=New,Contacted    # Filter by status
&source=Website,Instagram # Filter by source
&search=john             # Search name/email
&page=1                  # Page number (1-indexed)
&limit=10                # Results per page
```

For complete API documentation, see [`API_DOCS.md`](./API_DOCS.md)

---

## 🔑 Role-Based Access Control (RBAC)

| Feature | Admin | Sales |
|---------|-------|-------|
| Create Lead | ✅ | ✅ |
| View Leads | ✅ | ✅ |
| Update Lead | ✅ | ✅ |
| Delete Lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

- Sales users cannot delete leads (UI hidden + API enforces 403)
- All users can view and filter leads they have access to

---

## 🌐 Production Deployment

### Frontend → Vercel

1. **Create Project:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import GitHub repository

2. **Configure:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables:**
   - Add `VITE_API_BASE_URL` = `https://your-backend-url/api`

4. **Deploy:**
   - Click "Deploy"
   - Vercel auto-deploys on push to `main` branch

### Backend → Render

1. **Create Web Service:**
   - Go to [render.com/dashboard](https://render.com/dashboard)
   - Click "New" → "Web Service"
   - Connect GitHub repository

2. **Configure:**
   - Name: `smart-leads-backend`
   - Environment: `Docker`
   - Root Directory: `/backend` (if applicable)
   - Dockerfile Path: `backend/Dockerfile`
   - Region: Select nearest region

3. **Environment Variables (in Render dashboard):**
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_generated_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   PORT=5000
   FRONTEND_ORIGIN=https://your-frontend.vercel.app
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render auto-deploys on push to `main` branch

### Database → MongoDB Atlas

1. **Create Cluster:**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Click "Create" → Select M0 (free tier)
   - Choose region and create cluster

2. **Create User:**
   - Database Access → "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"

3. **Allowlist IP:**
   - Network Access → "Add IP Address"
   - For development: Add `0.0.0.0/0` (allow all)
   - For production: Add your Render service IP only

4. **Get Connection String:**
   - Cluster → "Connect" → "Drivers"
   - Copy connection string
   - Replace `<username>`, `<password>` with your database user credentials
   - Use as `MONGO_URI` in backend env vars

### CI/CD Pipeline (GitHub Actions)

Automated deployment on push to `main` branch:

1. **Frontend:** Vercel deployment
2. **Backend:** Docker image build → push to GHCR → Render webhook trigger
3. **Database:** Connection credentials managed via MongoDB Atlas

See `.github/workflows/deploy-prod.yml` for workflow configuration.

---

## 📂 Project Structure

```
smart_leads_dashboard/
│
├── frontend/                          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── auth/                 # Auth-specific components
│   │   │   ├── leads/                # Lead management components
│   │   │   ├── layout/               # App shell, navigation
│   │   │   └── ui/                   # Generic UI components (Button, Modal, Input, etc)
│   │   ├── pages/                    # Page components (Login, Register, Dashboard, LeadDetail)
│   │   ├── hooks/                    # Custom React hooks (useLeads, useCreateLead, etc)
│   │   ├── context/                  # React Context (Auth, Theme)
│   │   ├── api/                      # API client setup with Axios
│   │   ├── types/                    # TypeScript interfaces and types
│   │   ├── utils/                    # Utilities (storage, formatting, error handling)
│   │   ├── App.tsx                   # Root component
│   │   └── main.tsx                  # Vite entry point
│   ├── public/                       # Static assets
│   ├── vite.config.ts                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── Dockerfile                    # Multi-stage production build
│   └── package.json
│
├── backend/                           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/                   # Database, environment configuration
│   │   ├── controllers/              # Route handlers (thin, delegate to services)
│   │   ├── routes/                   # Express route definitions
│   │   ├── services/                 # Business logic layer
│   │   ├── models/                   # Mongoose schemas and TypeScript interfaces
│   │   ├── middlewares/              # Express middlewares (auth, validation, error handling)
│   │   ├── validators/               # Zod validation schemas
│   │   ├── types/                    # TypeScript interfaces and enums
│   │   ├── utils/                    # Utilities (JWT, password hashing, CSV export, error handling)
│   │   ├── app.ts                    # Express app initialization
│   │   └── server.ts                 # Server entry point
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── Dockerfile                    # Multi-stage Docker build
│   ├── .env.example                  # Environment variables template
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy-prod.yml           # GitHub Actions CI/CD pipeline
│
├── docker-compose.yml                # Local development stack
├── docker-compose.prod.yml           # Production-like testing stack
│
├── DEPLOYMENT.md                     # Detailed deployment guide
├── MANUAL_TEST_CHECKLIST.md         # Pre-deployment testing checklist
├── API_DOCS.md                      # Complete API documentation
├── PLAN.md                          # Project roadmap and status
└── README.md                        # This file
```

---

## 🔐 Authentication & Security

### JWT Flow

1. **Registration:**
   - User submits email, password, role
   - Backend validates input (Zod)
   - Password hashed with bcrypt (10 salt rounds)
   - User stored in MongoDB
   - JWT token generated and returned

2. **Login:**
   - User submits email, password
   - Backend validates credentials
   - Password compared with bcrypt hash
   - JWT token generated with user ID and role
   - Token stored in frontend localStorage

3. **Protected Requests:**
   - Frontend includes `Authorization: Bearer <token>` header
   - Backend middleware validates JWT signature
   - Request continues if valid, returns 401 if invalid

4. **Token Expiry:**
   - Default: 7 days
   - Configurable via `JWT_EXPIRES_IN` env var
   - Frontend auto-logout on token expiration

### Security Best Practices

- ✅ **Password Hashing:** bcrypt with 10 salt rounds (not stored in plain text)
- ✅ **JWT Secret:** Long random string (32+ characters) stored in env vars
- ✅ **CORS:** Restricted to authorized frontend origins
- ✅ **Helmet:** HTTP headers security
- ✅ **Validation:** Client-side (Zod) + server-side (Zod) prevents injection attacks
- ✅ **Environment Variables:** Secrets never committed to repository

---

## 🎯 Future Enhancements

1. **Advanced Analytics** – Dashboard metrics and lead conversion funnels
2. **Email Notifications** – Alerts on lead status changes and assignments
3. **Lead Assignment** – Assign leads to team members with tracking
4. **Activity Audit Trail** – Log all changes for compliance and tracking
5. **Bulk Operations** – Import/export multiple leads, bulk actions
6. **Custom Fields** – Admin-configurable lead attributes
7. **Webhooks Integration** – Connect with external CRM systems (Salesforce, HubSpot)
8. **Two-Factor Authentication** – Additional security layer for user accounts
9. **Real-Time Collaboration** – WebSocket support for live lead updates
10. **Mobile App** – React Native application for iOS/Android

---

## 💡 Challenges & Learnings

### Technical Challenges Overcome

- **CORS in Production:** Securing cross-origin requests between Vercel frontend and Render backend
  - **Solution:** Environment-driven CORS configuration with `FRONTEND_ORIGIN` variable

- **MongoDB Connection Reliability:** Managing database credentials securely across environments
  - **Solution:** MongoDB Atlas with IP allowlisting and GitHub Secrets for production

- **JWT Token Management:** Balancing security and user experience with token expiry
  - **Solution:** Configurable 7-day expiry with refresh token pattern for future enhancement

- **CSV Export Performance:** Streaming large datasets without server blocking
  - **Solution:** Mongoose query streaming with csv-writer

- **Form Validation Consistency:** Duplicate validation logic between frontend and backend
  - **Solution:** Shared Zod schemas validated on both client and server

### Key Learnings

1. **Layered Architecture** – Separation of concerns between controllers, services, and utilities improves maintainability
2. **Environment-Driven Configuration** – Using env vars for all environments prevents hardcoding and security issues
3. **Docker Best Practices** – Multi-stage builds significantly reduce container size and startup time
4. **TypeScript Benefits** – Type safety caught bugs early; strict mode enforced code quality
5. **Responsive Design** – Tailwind CSS utility-first approach enables rapid, mobile-friendly development
6. **CI/CD Automation** – GitHub Actions reduced manual deployments and improved reliability
7. **Zod Validation** – Runtime schema validation prevents data inconsistencies at API boundaries

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License – See LICENSE file for details.

---

## 👤 Author

**Tanay Tiwari**
- **GitHub:** [@tiwaritanay01](https://github.com/tiwaritanay01)
- **Email:** [contact@example.com](mailto:contact@example.com)

---

**Status:** ✅ **Production Ready**  
**Last Updated:** May 2026  
**Live URLs:**
- Frontend: https://smartleadsdashboard-smoky.vercel.app
- Backend: https://smart-leads-dashboard-ccfi.onrender.com
Access the live site for reviewing from here : https://smartleadsdashboard-smoky.vercel.app

