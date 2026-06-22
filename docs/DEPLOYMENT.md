# 🚀 Deployment Guide

# Placement Cell Portal

Version: **v1.0.0**

Author: **Shubham Hinge**

---

# Table of Contents

1. Introduction
2. Deployment Architecture
3. Prerequisites
4. Local Development Setup
5. Environment Variables
6. MongoDB Atlas Setup
7. Cloudinary Setup
8. Google Gemini AI Setup
9. Gmail SMTP Setup
10. GitHub Repository
11. Vercel Deployment
12. Post Deployment Checklist
13. Troubleshooting
14. Best Practices
15. Conclusion

---

# 1. Introduction

This document explains how to deploy the **Placement Cell Portal** from a local development environment to a production-ready cloud deployment.

The application is built using:

* Next.js 16
* React 19
* TypeScript
* MongoDB Atlas
* Google Gemini AI
* Cloudinary
* JWT Authentication
* Tailwind CSS

The recommended hosting platform is **Vercel**, which provides seamless deployment for Next.js applications.

---

# 2. Deployment Architecture

```text
                Developer
                    │
                    ▼
              GitHub Repository
                    │
                    ▼
             Vercel Deployment
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
 MongoDB Atlas  Cloudinary   Gemini AI
        │           │            │
        └───────────┼────────────┘
                    │
                    ▼
         Placement Cell Portal
```

---

# 3. Prerequisites

Before deployment, ensure the following tools and services are available.

## Software

* Node.js 22 or later
* npm
* Git
* Visual Studio Code

---

## Accounts Required

* GitHub
* Vercel
* MongoDB Atlas
* Cloudinary
* Google AI Studio (Gemini API)
* Gmail Account (App Password)

---

# 4. Local Development Setup

## Clone Repository

```bash
git clone https://github.com/<your-username>/placement-cell-portal.git

cd placement-cell-portal
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

If the build completes successfully without errors, the application is ready for deployment.

---

## Start Production Server

```bash
npm start
```

---

# Project Structure

```text
placement-cell-portal
│
├── src
├── public
├── docs
├── package.json
├── next.config.ts
├── tsconfig.json
└── .env.local
```

---

# 5. Environment Variables

Create a file named:

```text
.env.local
```

Add the following variables.

```env
# MongoDB
MONGODB_URI=

# Authentication
JWT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Gemini AI
GEMINI_API_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email
EMAIL_USER=
EMAIL_PASS=

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# Environment Variable Description

| Variable              | Purpose                   |
| --------------------- | ------------------------- |
| MONGODB_URI           | MongoDB Atlas Connection  |
| JWT_SECRET            | JWT Authentication Secret |
| NEXTAUTH_SECRET       | NextAuth Secret           |
| NEXTAUTH_URL          | Application URL           |
| GEMINI_API_KEY        | Google Gemini AI          |
| CLOUDINARY_CLOUD_NAME | Cloudinary Account        |
| CLOUDINARY_API_KEY    | Cloudinary API            |
| CLOUDINARY_API_SECRET | Cloudinary Secret         |
| EMAIL_USER            | Gmail Address             |
| EMAIL_PASS            | Gmail App Password        |
| NEXT_PUBLIC_APP_URL   | Frontend Base URL         |

---

# Local Setup Checklist

| Task                            | Status |
| ------------------------------- | :----: |
| Clone Repository                |    ✅   |
| Install Packages                |    ✅   |
| Configure Environment Variables |    ✅   |
| Start Development Server        |    ✅   |
| Production Build Successful     |    ✅   |

---
---

# 6. MongoDB Atlas Configuration

MongoDB Atlas is used as the cloud database for the Placement Cell Portal.

---

## Step 1: Create a MongoDB Atlas Account

Visit:

```text
https://www.mongodb.com/atlas
```

Create a free account and log in.

---

## Step 2: Create a Cluster

1. Click **Build a Database**
2. Select **M0 Free Cluster**
3. Choose your preferred cloud provider and region
4. Click **Create Cluster**

---

## Step 3: Create Database User

Navigate to:

```
Security → Database Access
```

Create a database user with:

* Username
* Password

Assign:

```
Read and Write to Any Database
```

---

## Step 4: Configure Network Access

Navigate to:

```
Security → Network Access
```

For development:

```
0.0.0.0/0
```

For production, whitelist only trusted IP addresses.

---

## Step 5: Obtain Connection String

Navigate to:

```
Clusters → Connect → Drivers
```

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/placement-portal
```

Add it to:

```env
MONGODB_URI=mongodb+srv://...
```

---

# 7. Cloudinary Configuration

Cloudinary is used to store student resumes securely.

---

## Step 1

Create an account:

```text
https://cloudinary.com
```

---

## Step 2

Open Dashboard.

Copy:

* Cloud Name
* API Key
* API Secret

---

## Step 3

Add to:

```env
CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## Features Used

* Resume Upload
* Resume Storage
* Resume Download
* Resume Preview

---

## Upload Flow

```text
Student Uploads Resume
          │
          ▼
Next.js API Route
          │
          ▼
Cloudinary
          │
          ▼
Secure URL Stored in MongoDB
```

---

# 8. Google Gemini AI Configuration

Gemini AI is used for intelligent resume analysis.

---

## Step 1

Visit:

```text
https://aistudio.google.com
```

---

## Step 2

Generate an API Key.

---

## Step 3

Store it securely.

```env
GEMINI_API_KEY=
```

---

## AI Features

* Resume Summary
* ATS Score
* Resume Strengths
* Resume Weaknesses
* Missing Skills
* Resume Suggestions
* Career AI Assistant

---

## AI Workflow

```text
Student Uploads Resume
          │
          ▼
Extract PDF Text
          │
          ▼
Google Gemini AI
          │
          ▼
ResumeAnalysis Collection
          │
          ▼
Student Dashboard
```

---

# 9. Gmail SMTP Configuration

Email services are used for account verification and password recovery.

---

## Features

* Email Verification
* Forgot Password
* Password Reset
* Notification Emails

---

## Create App Password

1. Enable Two-Factor Authentication.
2. Open Google Account → Security.
3. Generate an App Password.

---

## Environment Variables

```env
EMAIL_USER=your-email@gmail.com

EMAIL_PASS=your-app-password
```

---

# 10. GitHub Repository Setup

---

## Initialize Repository

```bash
git init
```

---

## Add Remote

```bash
git remote add origin https://github.com/<username>/placement-cell-portal.git
```

---

## Stage Files

```bash
git add .
```

---

## Commit

```bash
git commit -m "Initial project setup"
```

---

## Push

```bash
git push -u origin master
```

---

# Repository Best Practices

Include:

* README.md
* LICENSE
* .gitignore
* docs/
* Screenshots
* Clean Commit History

---

# 11. Vercel Deployment

Vercel is the recommended deployment platform.

---

## Step 1

Create an account:

```text
https://vercel.com
```

---

## Step 2

Import your GitHub repository.

---

## Step 3

Configure Environment Variables.

Copy every variable from:

```text
.env.local
```

to:

```
Vercel

Project Settings

Environment Variables
```

---

## Step 4

Deploy the project.

Vercel automatically:

* Installs packages
* Builds the project
* Deploys API Routes
* Generates a production URL

---

## Production Environment

Update:

```env
NEXTAUTH_URL=https://your-project.vercel.app

NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

---

# Deployment Summary

| Service       | Purpose         |
| ------------- | --------------- |
| GitHub        | Source Code     |
| Vercel        | Hosting         |
| MongoDB Atlas | Database        |
| Cloudinary    | Resume Storage  |
| Gemini AI     | Resume Analysis |
| Gmail SMTP    | Email Services  |

---

# Deployment Progress

```text
DEPLOYMENT.md

██████████████████████████░░░░░░░░░░░ 70%
```

---

The final part will complete:

* Post Deployment Checklist
* Troubleshooting Guide
* Security Best Practices
* Performance Recommendations
* Monitoring
* Backup Strategy
* Deployment Verification
* Conclusion
* References
* Document Information

This will complete the professional **`docs/DEPLOYMENT.md`**.
---

# 12. Post Deployment Checklist

After deployment, verify that all application features are functioning correctly.

---

## Application Verification

| Feature             | Status |
| ------------------- | :----: |
| Landing Page        |    ✅   |
| Login               |    ✅   |
| Registration        |    ✅   |
| Student Dashboard   |    ✅   |
| Company Dashboard   |    ✅   |
| Mentor Dashboard    |    ✅   |
| Admin Dashboard     |    ✅   |
| Resume Upload       |    ✅   |
| Resume Analysis     |    ✅   |
| Career AI Assistant |    ✅   |
| Job Management      |    ✅   |
| Job Applications    |    ✅   |
| Analytics           |    ✅   |
| Settings            |    ✅   |
| Dark / Light Theme  |    ✅   |

---

## Database Verification

Verify the following:

* MongoDB Atlas Connected
* Collections Created
* CRUD Operations Working
* Database Read/Write Successful

---

## Cloudinary Verification

Ensure:

* Resume Upload Successful
* Resume Preview Working
* Resume Download Working

---

## Gemini AI Verification

Confirm:

* Resume Text Extraction
* ATS Score Generation
* Resume Summary
* Missing Skills
* Suggestions
* Career AI Responses

---

## Email Verification

Check:

* Registration Email
* Password Reset Email
* Verification Link
* Forgot Password

---

# 13. Troubleshooting Guide

## MongoDB Connection Error

### Problem

```text
MongoServerSelectionError
```

### Solution

* Verify `MONGODB_URI`
* Check Atlas Network Access
* Confirm database user credentials

---

## Cloudinary Upload Failed

### Problem

```text
Upload Error
```

### Solution

* Verify Cloudinary credentials
* Check API key and secret
* Confirm upload preset (if used)

---

## Gemini AI Error

### Problem

```text
API Key Invalid
```

### Solution

* Verify `GEMINI_API_KEY`
* Ensure API key is active
* Check usage limits

---

## Build Failed

### Problem

```text
npm run build
```

fails.

### Solution

* Resolve TypeScript errors
* Resolve ESLint errors
* Check missing environment variables

---

## Vercel Deployment Failed

### Solution

* Review build logs
* Verify environment variables
* Ensure all dependencies are installed
* Confirm `NEXTAUTH_URL` is correct

---

# 14. Security Best Practices

The Placement Cell Portal follows industry-standard security practices.

## Authentication

* JWT Authentication
* HTTP-only Cookies
* Role-Based Access Control

---

## Password Security

* Store hashed passwords only
* Never store plain text passwords

---

## Environment Variables

Never commit:

```text
.env.local
```

Store secrets only in:

* Vercel Environment Variables
* Local `.env.local`

---

## Database Security

* MongoDB Atlas Authentication
* TLS Encryption
* Restricted Network Access

---

## File Security

* Store resumes in Cloudinary
* Avoid storing files directly in MongoDB

---

# 15. Performance Recommendations

To improve production performance:

* Optimize MongoDB queries
* Index frequently queried fields
* Compress uploaded files
* Lazy load components
* Optimize images
* Use server-side rendering where appropriate
* Enable caching where applicable

---

# 16. Backup Strategy

Recommended backup practices:

* Enable MongoDB Atlas automated backups
* Export important collections periodically
* Backup Cloudinary assets if required
* Version control the project using GitHub

---

# 17. Monitoring

Monitor the following services regularly:

| Service       | Purpose              |
| ------------- | -------------------- |
| Vercel        | Deployment Logs      |
| MongoDB Atlas | Database Performance |
| Cloudinary    | Storage Usage        |
| Gemini AI     | API Usage            |
| GitHub        | Version Control      |

---

# 18. Deployment Verification

The deployment is considered successful when:

* Application loads correctly
* All dashboards are accessible
* Authentication works
* Database operations succeed
* Resume upload works
* AI resume analysis works
* Emails are delivered
* Mobile responsiveness is verified
* No console or build errors are present

---

# Deployment Workflow Summary

```text
Developer
     │
     ▼
GitHub Repository
     │
     ▼
Vercel Build
     │
     ▼
Environment Variables
     │
     ▼
MongoDB Atlas
Cloudinary
Gemini AI
Gmail SMTP
     │
     ▼
Production Deployment
     │
     ▼
Testing & Verification
     │
     ▼
Placement Cell Portal Live
```

---

# Best Practices

* Keep dependencies updated.
* Test before every deployment.
* Use feature branches for development.
* Write meaningful commit messages.
* Monitor production logs regularly.
* Keep API keys secure.
* Review access permissions periodically.

---

# Conclusion

The Placement Cell Portal is deployed using a modern cloud-native architecture with **Vercel**, **MongoDB Atlas**, **Cloudinary**, and **Google Gemini AI**.

This deployment strategy provides:

* High availability
* Scalability
* Secure authentication
* Cloud-based file storage
* AI-powered resume analysis
* Simplified deployment workflow

The application is production-ready and can be maintained efficiently using GitHub, Vercel, and MongoDB Atlas.

---

# References

* Next.js Documentation
* Vercel Documentation
* MongoDB Atlas Documentation
* Mongoose Documentation
* Google AI Studio Documentation
* Cloudinary Documentation
* Tailwind CSS Documentation

---

# Document Information

| Property            | Value                   |
| ------------------- | ----------------------- |
| Document            | DEPLOYMENT.md           |
| Project             | Placement Cell Portal   |
| Version             | v1.0.0                  |
| Deployment Platform | Vercel                  |
| Database            | MongoDB Atlas           |
| Cloud Storage       | Cloudinary              |
| AI                  | Google Gemini 2.5 Flash |
| Author              | Shubham Hinge           |

---

# DEPLOYMENT.md Completed

```text
████████████████████████████████████████

DEPLOYMENT.md ✅ COMPLETE
```
