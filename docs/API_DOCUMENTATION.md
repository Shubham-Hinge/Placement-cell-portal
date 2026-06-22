# 📘 API Documentation

# Placement Cell Portal

Version: **v1.0.0**

Author: **Shubham Hinge**

---

# Table of Contents

1. Introduction
2. Base URL
3. Authentication
4. Authentication APIs
5. Student APIs
6. Company APIs
7. Mentor APIs
8. Admin APIs
9. Job APIs
10. Application APIs
11. Response Format
12. HTTP Status Codes
13. Authentication Flow
14. API Summary

---

# Introduction

The Placement Cell Portal provides a RESTful API architecture developed using **Next.js API Routes**.

The APIs enable communication between the frontend application and backend services while securely managing authentication, user data, jobs, applications, resume analysis, analytics, and placement activities.

All protected endpoints are secured using **JWT Authentication** and **Role-Based Access Control (RBAC)**.

---

# API Features

* RESTful API Design
* JWT Authentication
* Role-Based Authorization
* MongoDB Atlas Integration
* Google Gemini AI Integration
* Cloudinary File Upload
* Secure API Responses
* JSON Request/Response Format
* Protected Routes
* Error Handling

---

# Base URL

## Local Development

```text
http://localhost:3000/api
```

## Production

```text
https://your-vercel-domain.vercel.app/api
```

---

# Authentication

The Placement Cell Portal uses **JWT (JSON Web Token)** based authentication.

After successful login:

* JWT Token is generated.
* Token is stored as an HTTP-only cookie.
* Protected routes validate the token.
* User role determines dashboard access.

Supported roles:

* Student
* Company
* Mentor
* Admin

---

# Authentication Flow

```text
User Login
     │
     ▼
Validate Credentials
     │
     ▼
Generate JWT
     │
     ▼
Store HTTP-Only Cookie
     │
     ▼
Access Protected Routes
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Description

Registers a new user in the system.

---

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

---

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

### Error Response

```json
{
  "success": false,
  "message": "User already exists."
}
```

---

## Login

### Endpoint

```http
POST /api/auth/login
```

### Description

Authenticates a registered user and generates a JWT token.

---

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "role": "student"
}
```

---

### Error Response

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Logout

### Endpoint

```http
POST /api/auth/logout
```

### Description

Clears the authentication cookie and logs out the current user.

---

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Get Current User

### Endpoint

```http
GET /api/auth/me
```

### Description

Returns the authenticated user's information.

---

### Success Response

```json
{
  "success": true,
  "user": {
    "id": "685c...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

## Forgot Password

### Endpoint

```http
POST /api/auth/forgot-password
```

### Description

Sends a password reset link to the registered email address.

---

### Request Body

```json
{
  "email": "john@example.com"
}
```

---

### Success Response

```json
{
  "success": true,
  "message": "Password reset email sent."
}
```

---

## Reset Password

### Endpoint

```http
POST /api/auth/reset-password
```

### Description

Updates the user's password using the reset token.

---

### Request Body

```json
{
  "token": "reset-token",
  "password": "newPassword123"
}
```

---

### Success Response

```json
{
  "success": true,
  "message": "Password updated successfully."
}
```

---

## Email Verification

### Endpoint

```http
GET /api/auth/verify/[token]
```

### Description

Verifies a newly registered user's email address.

---

### Success Response

```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

---

# Authentication Module Summary

| Endpoint                    | Method | Description               |
| --------------------------- | ------ | ------------------------- |
| `/api/auth/register`        | POST   | Register a new user       |
| `/api/auth/login`           | POST   | User login                |
| `/api/auth/logout`          | POST   | User logout               |
| `/api/auth/me`              | GET    | Get current user          |
| `/api/auth/forgot-password` | POST   | Send reset password email |
| `/api/auth/reset-password`  | POST   | Reset password            |
| `/api/auth/verify/[token]`  | GET    | Verify email address      |

---

---

# 👨‍🎓 Student APIs

The Student APIs allow students to manage their profile, upload resumes, receive AI-powered resume analysis, browse jobs, and track applications.

---

## Get Student Profile

### Endpoint

```http
GET /api/student/profile
```

### Description

Returns the complete student profile.

### Success Response

```json
{
  "success": true,
  "profile": {
    "fullName": "John Doe",
    "college": "ABC College",
    "course": "M.Sc Computer Science",
    "cgpa": 8.7,
    "skills": [
      "React",
      "Node.js"
    ]
  }
}
```

---

## Update Student Profile

### Endpoint

```http
PUT /api/student/profile
```

### Description

Updates the student's profile information.

### Request Body

```json
{
  "fullName": "John Doe",
  "phone": "9876543210",
  "college": "ABC College",
  "course": "M.Sc Computer Science",
  "cgpa": 8.7,
  "skills": [
    "React",
    "Next.js",
    "MongoDB"
  ]
}
```

---

## Upload Resume

### Endpoint

```http
POST /api/student/upload-resume
```

### Description

Uploads the student's resume to Cloudinary.

### Request

```text
multipart/form-data

resume.pdf
```

### Success Response

```json
{
  "success": true,
  "resumeUrl": "https://res.cloudinary.com/..."
}
```

---

## AI Resume Analysis

### Endpoint

```http
POST /api/student/analyze-resume
```

### Description

Analyzes the uploaded resume using Google Gemini AI.

### AI Response

```json
{
  "success": true,
  "analysis": {
    "atsScore": 86,
    "summary": "...",
    "strengths": [],
    "weaknesses": [],
    "missingSkills": [],
    "suggestions": [],
    "keywordsFound": []
  }
}
```

---

## Student Dashboard

### Endpoint

```http
GET /api/student/dashboard
```

### Description

Returns dashboard statistics.

### Response

```json
{
  "success": true,
  "dashboard": {
    "resumeScore": 86,
    "applications": 12,
    "selected": 2,
    "recommendedJobs": 15
  }
}
```

---

## Recommended Jobs

### Endpoint

```http
GET /api/student/recommendations
```

### Description

Returns AI-recommended jobs based on the student's skills.

---

## Student Settings

### Endpoint

```http
PUT /api/student/settings
```

### Description

Updates:

* Password
* Theme
* Notification Preferences

---

# Student API Summary

| Endpoint                       | Method | Description        |
| ------------------------------ | ------ | ------------------ |
| `/api/student/profile`         | GET    | Fetch profile      |
| `/api/student/profile`         | PUT    | Update profile     |
| `/api/student/upload-resume`   | POST   | Upload resume      |
| `/api/student/analyze-resume`  | POST   | AI resume analysis |
| `/api/student/dashboard`       | GET    | Dashboard data     |
| `/api/student/recommendations` | GET    | Recommended jobs   |
| `/api/student/settings`        | PUT    | Update settings    |

---

# 🏢 Company APIs

The Company APIs allow recruiters to manage jobs, applications, analytics, and company information.

---

## Company Profile

### Endpoint

```http
GET /api/company/profile
```

### Description

Returns company profile information.

---

## Update Company Profile

### Endpoint

```http
PUT /api/company/profile
```

### Description

Updates company information.

---

## Create Job

### Endpoint

```http
POST /api/company/jobs
```

### Description

Creates a new job posting.

### Request Body

```json
{
  "title": "Frontend Developer",
  "description": "React Developer",
  "location": "Pune",
  "salary": "8 LPA",
  "skills": [
    "React",
    "TypeScript"
  ],
  "jobType": "Full Time"
}
```

---

## Get Company Jobs

### Endpoint

```http
GET /api/company/jobs
```

### Description

Returns all jobs created by the logged-in company.

---

## Update Job

### Endpoint

```http
PUT /api/company/jobs/:id
```

### Description

Updates job details.

---

## Delete Job

### Endpoint

```http
DELETE /api/company/jobs/:id
```

### Description

Deletes an existing job.

---

## Company Applications

### Endpoint

```http
GET /api/company/applications
```

### Description

Returns all applications received for company jobs.

---

## Update Application Status

### Endpoint

```http
PATCH /api/company/applications
```

### Description

Updates application status.

Supported values:

* Applied
* Shortlisted
* Rejected
* Selected

---

## Company Analytics

### Endpoint

```http
GET /api/company/analytics
```

### Description

Returns recruitment statistics.

Example Response

```json
{
  "success": true,
  "analytics": {
    "jobs": 12,
    "applications": 145,
    "selected": 18
  }
}
```

---

## Company Settings

### Endpoint

```http
PUT /api/company/settings
```

### Description

Updates:

* Company Password
* Theme
* Notification Preferences

---

# Company API Summary

| Endpoint                    | Method | Description        |
| --------------------------- | ------ | ------------------ |
| `/api/company/profile`      | GET    | Fetch profile      |
| `/api/company/profile`      | PUT    | Update profile     |
| `/api/company/jobs`         | POST   | Create job         |
| `/api/company/jobs`         | GET    | Company jobs       |
| `/api/company/jobs/:id`     | PUT    | Update job         |
| `/api/company/jobs/:id`     | DELETE | Delete job         |
| `/api/company/applications` | GET    | View applications  |
| `/api/company/applications` | PATCH  | Update application |
| `/api/company/analytics`    | GET    | Analytics          |
| `/api/company/settings`     | PUT    | Settings           |

---
---

# 👨‍🏫 Mentor APIs

The Mentor APIs enable mentors to monitor assigned students, analyze placement readiness, and track academic performance.

---

## Mentor Dashboard

### Endpoint

```http
GET /api/mentor/dashboard
```

### Description

Returns mentor dashboard statistics.

### Success Response

```json
{
  "success": true,
  "dashboard": {
    "assignedStudents": 24,
    "applications": 51,
    "selected": 8,
    "averageResumeScore": 82
  }
}
```

---

## Assigned Students

### Endpoint

```http
GET /api/mentor/students
```

### Description

Returns all students assigned to the logged-in mentor.

### Success Response

```json
{
  "success": true,
  "students": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "cgpa": 8.9,
      "resumeScore": 87
    }
  ]
}
```

---

## Mentor Analytics

### Endpoint

```http
GET /api/mentor/analytics
```

### Description

Returns mentor analytics.

### Analytics Included

* Total Assigned Students
* Profile Completion
* Resume Upload Status
* Average Resume Score
* Average CGPA
* Applications
* Selected Students
* Rejected Students
* Skill Distribution
* Top Performing Students
* Students Needing Attention

---

## Mentor Settings

### Endpoint

```http
PUT /api/mentor/settings
```

### Description

Updates:

* Password
* Theme
* Notification Preferences

---

# Mentor API Summary

| Endpoint                | Method | Description       |
| ----------------------- | ------ | ----------------- |
| `/api/mentor/dashboard` | GET    | Dashboard         |
| `/api/mentor/students`  | GET    | Assigned students |
| `/api/mentor/analytics` | GET    | Analytics         |
| `/api/mentor/settings`  | PUT    | Settings          |

---

# ⚙️ Admin APIs

The Admin APIs provide complete control over the Placement Cell Portal.

---

## Admin Dashboard

### Endpoint

```http
GET /api/admin/dashboard
```

### Description

Returns dashboard overview.

---

## Admin Statistics

### Endpoint

```http
GET /api/admin/stats
```

### Description

Returns system statistics.

Example Response

```json
{
  "success": true,
  "stats": {
    "students": 210,
    "companies": 45,
    "mentors": 18,
    "jobs": 132,
    "applications": 640
  }
}
```

---

## Admin Analytics

### Endpoint

```http
GET /api/admin/analytics
```

### Description

Returns platform analytics.

Analytics include:

* Total Users
* Total Students
* Companies
* Mentors
* Jobs
* Applications
* Placement Rate
* Top Skills
* Placement Trends

---

## Manage Users

### Endpoint

```http
GET /api/admin/users
```

Returns all registered users.

---

### Endpoint

```http
PATCH /api/admin/users
```

Updates user information.

---

### Endpoint

```http
DELETE /api/admin/users
```

Deletes a user.

---

## Assign Mentor

### Endpoint

```http
GET /api/admin/assign-mentor
```

Returns:

* Students
* Mentors

---

### Endpoint

```http
POST /api/admin/assign-mentor
```

Assigns a mentor to a student.

### Request Body

```json
{
  "studentId": "685c...",
  "mentorId": "685d..."
}
```

---

## Reports

### Endpoint

```http
GET /api/admin/reports
```

Returns downloadable reports.

---

## Admin Settings

### Endpoint

```http
PUT /api/admin/settings
```

Updates:

* Password
* Theme
* Notifications

---

# Admin API Summary

| Endpoint                   | Method | Description        |
| -------------------------- | ------ | ------------------ |
| `/api/admin/dashboard`     | GET    | Dashboard          |
| `/api/admin/stats`         | GET    | Statistics         |
| `/api/admin/analytics`     | GET    | Analytics          |
| `/api/admin/users`         | GET    | Users              |
| `/api/admin/users`         | PATCH  | Update user        |
| `/api/admin/users`         | DELETE | Delete user        |
| `/api/admin/assign-mentor` | GET    | Students & Mentors |
| `/api/admin/assign-mentor` | POST   | Assign mentor      |
| `/api/admin/reports`       | GET    | Reports            |
| `/api/admin/settings`      | PUT    | Settings           |

---

# 💼 Job APIs

The Job APIs manage job listings and job discovery.

---

## Get All Jobs

### Endpoint

```http
GET /api/jobs
```

### Description

Returns all active jobs.

---

## Job Details

### Endpoint

```http
GET /api/jobs/:id
```

Returns a single job.

---

## Search Jobs

### Endpoint

```http
GET /api/jobs?search=React
```

Searches jobs by title or keyword.

---

## Filter Jobs

### Endpoint

```http
GET /api/jobs?skill=Node.js
```

Filters jobs using:

* Skills
* Location
* Job Type

---

## Recommended Jobs

### Endpoint

```http
GET /api/jobs/recommended
```

Returns AI-recommended jobs for students.

---

# Job API Summary

| Endpoint                | Method | Description      |
| ----------------------- | ------ | ---------------- |
| `/api/jobs`             | GET    | All jobs         |
| `/api/jobs/:id`         | GET    | Job details      |
| `/api/jobs?search=`     | GET    | Search jobs      |
| `/api/jobs?skill=`      | GET    | Filter jobs      |
| `/api/jobs/recommended` | GET    | Recommended jobs |

---

---

# 📄 Application APIs

The Application APIs allow students to apply for jobs and companies to manage the recruitment process.

---

## Apply for Job

### Endpoint

```http
POST /api/applications
```

### Description

Allows a student to apply for a job.

### Request Body

```json
{
  "jobId": "685c4f0d34e8d1f91f3f1234",
  "studentId": "685c4f0d34e8d1f91f3f5678",
  "
```
