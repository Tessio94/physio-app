# Insignia – Physiotherapy Booking App

Insignia is a full-stack physiotherapy booking web application that allows users to book appointments with therapists, while providing admins with powerful management and analytics tools.

---

## Project Overview

After clicking **“Rezerviraj termin”**, users can choose a service or a service with a therapist to book an appointment.  
To book an appointment, users must **register or log in**.

An **admin panel** is available at `/admin`.

- **Admin login format:**  
  `therapistName@insignia.hr` (e.g. `ana@insignia.hr`)
- **Admin password (for all admins):**  
  `password123`

---

## Features

### User Features
- Choose from **6 therapists**, each offering **3 different services**
- Book appointments **up to two weeks in advance**
- Authentication required to book
- Authentication options:
  - Email & password
  - Google OAuth
  - Facebook OAuth
- Modern, responsive UI
- UI skeleton loaders
- Toast notifications using **Sonner**

### Admin Features
- Full **admin dashboard**
- CRUD functionality for:
  - Appointments
  - Therapists
  - Services
- Data analytics dashboard
- Efficient clinic resource management

### System Features
- Cron job that simulates occupied appointments
- Role-based access control
- Fully containerized and deployed with **Docker**
- **NGINX** used as a reverse proxy on a VPS

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui
- React Router DOM

### Backend
- Node.js
- Express
- PostgreSQL
- Cron jobs

### DevOps
- Docker
- NGINX
- VPS deployment
