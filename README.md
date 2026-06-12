# Campus Placement Portal

## Project Overview

Campus Placement Portal is a Full Stack Web Application designed to automate and simplify the campus recruitment process. The platform acts as a centralized system connecting Students, Companies, Mentors, and Administrators for managing placements, job postings, applications, analytics, and reports.

The system eliminates manual placement management by providing role-based dashboards, secure authentication, cloud database integration, responsive design, analytics, reporting, and job management capabilities.

Built using Next.js, TypeScript, MongoDB Atlas, Tailwind CSS, JWT Authentication, and deployed on Vercel, the platform provides a modern and scalable recruitment management solution.

---

# Live Demo

Frontend URL:

```text
https://placement-cell-portal-xi.vercel.app
```

GitHub Repository:

```text
https://github.com/Shubham-Hinge/Placement-cell-portal
```

---

# Objectives

* Digitize the campus placement process.
* Provide a centralized recruitment platform.
* Enable students to discover and apply for jobs.
* Allow companies to manage recruitment efficiently.
* Provide mentors with placement monitoring capabilities.
* Enable administrators to monitor placement activities.
* Generate placement analytics and reports.
* Improve transparency and efficiency throughout recruitment.

---

# Technology Stack

## Frontend

* Next.js 15
* React.js
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes
* Node.js

## Database

* MongoDB Atlas
* Mongoose ODM

## Authentication & Security

* JWT Authentication
* bcryptjs Password Hashing
* Protected Routes
* Role-Based Access Control

## Reporting

* jsPDF
* jspdf-autotable
* xlsx

## Data Visualization

* Recharts

## Deployment

* Vercel
* MongoDB Atlas

---

# System Architecture

```text
Frontend (Next.js)
        │
        ▼
API Routes (Next.js)
        │
        ▼
MongoDB Atlas
        │
        ▼
Role-Based Dashboards
```

---

# User Roles

## Student

Students can:

* Register Account
* Login Securely
* Manage Profile
* Upload Resume
* Browse Available Jobs
* Apply for Jobs
* Track Applications
* View Placement Updates
* Monitor Career Progress

---

## Company

Companies can:

* Register Company Account
* Login Securely
* Create Job Postings
* Manage Existing Jobs
* View Applicants
* Review Applications
* Monitor Recruitment Activities
* Access Company Dashboard
* View Placement Analytics

---

## Mentor

Mentors can:

* Access Mentor Dashboard
* Monitor Student Progress
* View Placement Statistics
* Analyze Placement Activities
* Guide Students Through Recruitment Process

---

## Admin

Administrators can:

* Manage Users
* Manage Students
* Manage Companies
* Manage Mentors
* Manage Placement Activities
* View System Analytics
* Generate Reports
* Monitor Overall Platform Activity

---

# Core Features

## Authentication Module

### Registration

Supports:

* Student Registration
* Company Registration
* Mentor Registration
* Admin Registration

### Login

Features:

* JWT Authentication
* Secure Login System
* Role-Based Dashboard Redirection

### Security

Includes:

* Password Hashing
* Protected Routes
* Secure API Access
* Role Validation

---

# Landing Page

The Landing Page provides:

* Project Introduction
* Platform Features
* Login Navigation
* Registration Navigation
* Public Job Listings
* Dark Mode / Light Mode Toggle
* Mobile Responsive Design

---

# Dark Mode & Light Mode

Implemented Features:

* Theme Toggle
* Persistent Theme Selection
* Mobile Compatibility
* Dashboard Compatibility
* Improved Accessibility

---

# Student Module

## Student Dashboard

Provides:

* Placement Overview
* Application Tracking
* Profile Access
* Job Discovery

### Student Features

* View Jobs
* Apply for Jobs
* Manage Profile
* Upload Resume
* Monitor Applications

---

# Company Module

## Company Dashboard

Provides quick access to:

* Create Job
* Manage Jobs
* View Applicants
* Analytics

### Job Management

Companies can:

* Create Jobs
* View Jobs
* Update Jobs
* Delete Jobs

### Recruitment Management

Companies can:

* Review Applications
* Manage Recruitment Workflow
* Monitor Job Performance

---

# Public Job Portal

## Features

* Publicly Accessible Job Listings
* Dynamic Job Retrieval from MongoDB
* Responsive Interface
* Real-Time Job Availability

### Apply Workflow

```text
Visitor
   │
   ▼
View Jobs
   │
   ▼
Apply
   │
   ▼
Login Required Modal
   │
   ├── Login
   └── Register
```

### Student Workflow

```text
Student Login
      │
      ▼
View Jobs
      │
      ▼
Apply
      │
      ▼
Application Processing
```

---

# Mentor Module

## Mentor Dashboard

Displays:

* Placement Statistics
* Student Progress
* Recruitment Insights

Mentors can monitor placement activities and provide guidance to students.

---

# Admin Module

## Admin Dashboard

Displays:

* Total Users
* Total Students
* Total Companies
* Total Mentors
* Total Jobs
* Placement Analytics
* Reports

### Administrative Functions

* User Management
* Placement Monitoring
* Analytics Review
* Report Generation

---

# Analytics Module

Provides:

* Placement Statistics
* Job Statistics
* Student Analytics
* Company Analytics
* Recruitment Insights

Visualization implemented using Recharts.

---

# Reporting Module

## PDF Reports

Export:

* Placement Data
* User Data
* Job Data
* Analytics Information

## Excel Reports

Export:

* Placement Records
* Recruitment Statistics
* Student Information

---

# Database Design

## Users Collection

Stores:

* Name
* Email
* Password
* Role
* Profile Information

---

## Jobs Collection

Stores:

* Company ID
* Company Name
* Job Title
* Description
* Skills
* Salary
* Location
* Job Type
* Last Date
* Active Status

---

## Applications Collection

Stores:

* Student Information
* Job Information
* Application Status
* Application Date

---

# API Endpoints

## Authentication APIs

```text
POST /api/auth/register
POST /api/auth/login
```

## Job APIs

```text
GET /api/jobs
POST /api/jobs
```

## Dashboard APIs

```text
GET /api/admin/*
GET /api/company/*
GET /api/student/*
GET /api/mentor/*
```

---

# Project Workflow

## Recruitment Workflow

```text
User Registration
        │
        ▼
Login
        │
        ▼
Role Verification
        │
        ▼
Dashboard Access
        │
        ▼
Company Creates Job
        │
        ▼
Job Stored in MongoDB
        │
        ▼
Public Jobs Page Updated
        │
        ▼
Student Views Job
        │
        ▼
Student Applies
        │
        ▼
Application Processing
        │
        ▼
Placement Monitoring
        │
        ▼
Analytics & Reports
```

---

# Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NEXTAUTH_SECRET=your_nextauth_secret

NEXTAUTH_URL=http://localhost:3000

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password
```

For Production:

```env
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

---

# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
cd campus-placement-portal
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Application URL:

```text
http://localhost:3000
```

---

# Production Build

## Build

```bash
npm run build
```

## Start

```bash
npm start
```

---

# Deployment

## Frontend Hosting

* Vercel

## Database Hosting

* MongoDB Atlas

## Deployment Process

1. Push code to GitHub.
2. Connect repository to Vercel.
3. Configure environment variables.
4. Deploy automatically.
5. Monitor production logs.

---

# Project Structure

```text
src
│
├── app
│   ├── admin
│   ├── company
│   ├── student
│   ├── mentor
│   ├── jobs
│   ├── login
│   ├── register
│   ├── api
│   └── page.tsx
│
├── components
│   ├── ThemeToggle.tsx
│
├── lib
│
├── models
│   ├── User.ts
│   ├── Job.ts
│   └── Application.ts
│
├── public
│
└── types
```

---

# Security Features

Implemented:

* JWT Authentication
* Password Hashing
* Protected Routes
* Role Validation
* Environment Variable Security
* MongoDB Atlas Security
* Input Validation

---

# Testing Summary

## Authentication Testing

* Registration
* Login
* Logout
* Role Redirection

## Job Management Testing

* Create Job
* Fetch Jobs
* Public Job Listing

## Dashboard Testing

* Student Dashboard
* Company Dashboard
* Mentor Dashboard
* Admin Dashboard

## UI Testing

* Responsive Design
* Mobile Compatibility
* Dark Mode
* Light Mode

## Deployment Testing

* Vercel Deployment
* MongoDB Connectivity
* Environment Variables

---

# Future Enhancements

* AI Resume Screening
* AI Skill Matching
* Real-Time Notifications
* Interview Scheduling
* Video Interview Integration
* In-App Messaging
* Mobile Application
* Placement Prediction System
* Career Guidance Module

---

# Project Status

| Module            | Status      |
| ----------------- | ----------- |
| Authentication    | ✅ Completed |
| Student Portal    | ✅ Completed |
| Company Portal    | ✅ Completed |
| Mentor Portal     | ✅ Completed |
| Admin Portal      | ✅ Completed |
| Public Job Portal | ✅ Completed |
| Job Management    | ✅ Completed |
| Analytics         | ✅ Completed |
| Reporting         | ✅ Completed |
| Dark/Light Mode   | ✅ Completed |
| Deployment        | ✅ Completed |

## Overall Completion

**Project Status: 100% Completed**

---

# Developer

**Shubham Hinge**
M.Sc. Computer Science

**Campus Placement Portal**
Full Stack Placement Management System
