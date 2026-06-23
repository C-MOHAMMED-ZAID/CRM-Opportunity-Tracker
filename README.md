# CRM Opportunity Tracker

## Overview
A full-stack CRM Opportunity Tracker built using the MERN stack. Users can register, log in, create opportunities, manage sales pipelines, and securely update or delete their own records.

## Features

- JWT Authentication
- Password Hashing using bcrypt
- User Registration & Login
- Create Opportunities
- Update Opportunities
- Delete Opportunities
- Opportunity Filters
- Ownership-Based Authorization
- MongoDB Atlas Integration
- Responsive UI

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

## Folder Structure

backend/
frontend/

## Backend Setup

cd backend

npm install

npm run dev

## Frontend Setup

cd frontend

npm install

npm run dev

## Environment Variables

Backend .env

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/opportunities

POST /api/opportunities

PUT /api/opportunities/:id

DELETE /api/opportunities/:id

## Security

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Backend Ownership Validation
- Environment Variables for Secrets

## Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas
