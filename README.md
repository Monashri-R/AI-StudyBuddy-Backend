# AI StudyBuddy — Backend

Backend starter/implementation for the **AI StudyBuddy** capstone project shown in SkillWallet.

## Technology
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- Role-Based Access Control (RBAC)
- Google Gemini API integration
- REST APIs

## Features
- User registration and login
- JWT-protected routes
- Student/Admin roles
- Study material CRUD
- AI summary generation from supplied study text
- AI study-plan generation
- Health-check endpoint
- Basic API rate limiting

## Project structure
```text
AI-StudyBuddy-Backend/
├── config/
│   └── db.js
├── controllers/
│   ├── aiController.js
│   ├── authController.js
│   └── materialController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── StudyMaterial.js
│   └── User.js
├── routes/
│   ├── aiRoutes.js
│   ├── authRoutes.js
│   └── materialRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Run locally

### 1. Install Node.js
Use Node.js 16+.

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and add your MongoDB Atlas URI, JWT secret and Gemini API key.

### 4. Start the server
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Server:
`http://localhost:5000`

Health check:
`GET http://localhost:5000/api/health`

## Main API endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` — JWT required

### Study materials
- `GET /api/materials`
- `GET /api/materials/:id`
- `POST /api/materials` — JWT required
- `PUT /api/materials/:id` — JWT required
- `DELETE /api/materials/:id` — JWT + admin required

### Gemini AI
- `POST /api/ai/summary` — JWT required
- `POST /api/ai/study-plan` — JWT required

## Example registration body
```json
{
  "name": "Monashri",
  "email": "student@example.com",
  "password": "Password123"
}
```

## Example AI summary body
```json
{
  "text": "Paste study material here..."
}
```

## Important
This repository is a working backend starter for the capstone. Before claiming the project is fully completed, run the API locally, connect MongoDB Atlas, test the endpoints, and complete the project stories/tasks required by your SkillWallet team.

Never upload your real `.env` file or API keys to GitHub.
