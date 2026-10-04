# API Testing Quick Guide

Base URL:
`http://localhost:5000`

## 1. Health
GET `/api/health`

## 2. Register
POST `/api/auth/register`

```json
{
  "name": "Monashri",
  "email": "student@example.com",
  "password": "Password123"
}
```

Copy the returned JWT token.

## 3. Login
POST `/api/auth/login`

```json
{
  "email": "student@example.com",
  "password": "Password123"
}
```

## 4. Create material
POST `/api/materials`

Header:
`Authorization: Bearer YOUR_TOKEN`

Body:
```json
{
  "title": "Node.js Basics",
  "subject": "Backend Development",
  "content": "Node.js is a JavaScript runtime..."
}
```

## 5. AI summary
POST `/api/ai/summary`

Header:
`Authorization: Bearer YOUR_TOKEN`

Body:
```json
{
  "text": "Node.js is a runtime environment..."
}
```

## 6. AI study plan
POST `/api/ai/study-plan`

Header:
`Authorization: Bearer YOUR_TOKEN`

Body:
```json
{
  "subject": "Node.js",
  "days": 7,
  "goal": "Understand backend fundamentals"
}
```
