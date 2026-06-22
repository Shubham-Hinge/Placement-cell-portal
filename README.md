# 🎓 Placement Cell Portal

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge\&logo=google)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?style=for-the-badge\&logo=cloudinary)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-Educational-blue?style=for-the-badge)

</p>

---

# 📌 Project Overview

The **Placement Cell Portal** is a modern AI-powered campus recruitment platform designed to simplify and automate the placement process for educational institutions.

The application provides dedicated portals for **Students**, **Companies**, **Mentors**, and **Administrators**, allowing them to collaborate through a secure and scalable recruitment ecosystem.

The platform integrates **Google Gemini AI** for resume analysis, **Cloudinary** for cloud-based resume storage, **MongoDB Atlas** for data persistence, and **JWT Authentication** for secure role-based access.

---

# 🚀 Key Features

## 👨‍🎓 Student Module

* Student Registration & Login
* Profile Management
* Resume Upload
* AI Resume Analysis
* ATS Resume Score
* Career AI Assistant
* Recommended Jobs
* Apply for Jobs
* Application Tracking
* Mentor Information
* Student Analytics
* Student Settings

---

## 🏢 Company Module

* Company Registration
* Company Profile
* Create Job Posts
* Manage Jobs
* View Applicants
* Update Application Status
* Company Analytics
* Company Settings

---

## 👨‍🏫 Mentor Module

* Mentor Dashboard
* Assigned Students
* Resume Score Monitoring
* Student Analytics
* Performance Insights
* Mentor Settings

---

## ⚙️ Admin Module

* User Management
* Dashboard Analytics
* Mentor Assignment
* Reports
* Placement Statistics
* System Monitoring
* Admin Settings

---

## 🤖 AI Features

* Resume Analysis
* ATS Score Generation
* Resume Summary
* Skill Gap Detection
* Missing Skills
* Resume Suggestions
* Career AI Assistant

---

## 🌙 Additional Features

* Role-Based Authentication
* JWT Security
* Email Verification
* Forgot Password
* Dark / Light Theme
* Mobile Responsive Design
* Cloud Resume Storage
* Production Deployment
* REST APIs
* Modern UI/UX

---

# 🛠 Tech Stack

| Category        | Technology                       |
| --------------- | -------------------------------- |
| Frontend        | Next.js 16, React 19, TypeScript |
| Styling         | Tailwind CSS                     |
| Backend         | Next.js API Routes               |
| Database        | MongoDB Atlas + Mongoose         |
| Authentication  | JWT                              |
| AI              | Google Gemini 2.5 Flash          |
| Cloud Storage   | Cloudinary                       |
| Deployment      | Vercel                           |
| Version Control | Git & GitHub                     |

---

# 🏗 System Architecture

```text
Students
Companies
Mentors
Admin
        │
        ▼
Next.js Frontend (React + TypeScript)
        │
        ▼
Next.js API Routes
        │
 ┌──────────────┬───────────────┬───────────────┐
 │              │               │               │
 ▼              ▼               ▼               ▼
MongoDB     Gemini AI     Cloudinary      JWT Auth
 Atlas     Resume AI     Resume Storage    Security
        │
        ▼
Interactive Dashboards
```

---

# 📂 Project Modules

* Student Portal
* Company Portal
* Mentor Portal
* Admin Portal
* AI Resume Analyzer
* Career AI Assistant
* Job Management
* Application Management
* Analytics Dashboard
* Settings Module

---
---

# 📁 Project Structure

```text
placement-cell-portal/
│
├── docs/
     ├── screenshots/    
│
│── public/
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── company/
│   │   ├── mentor/
│   │   ├── student/
│   │   ├── login/
│   │   ├── register/
│   │   ├── api/
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   ├── lib/
│   │
│   ├── models/
│   │
│   ├── middleware.ts
│   │
│   └── utils/
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

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

The application will be available at:

```text
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

# 🔐 Environment Variables

Create a file named:

```text
.env.local
```

Add the following environment variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# 🚀 Deployment

The application is deployed using **Vercel**.

## Deployment Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure all environment variables.
4. Deploy the application.
5. Connect MongoDB Atlas.
6. Configure Cloudinary.
7. Configure Google Gemini API.
8. Verify production deployment.

---

# 🌐 External Services

## MongoDB Atlas

Used for:

* User Management
* Student Profiles
* Job Listings
* Applications
* Resume Analysis

---

## Google Gemini AI

Provides:

* Resume Analysis
* ATS Score
* Resume Summary
* Skill Recommendations
* Career Suggestions

---

## Cloudinary

Used for:

* Resume Upload
* Cloud Storage
* Secure File Access

---

## Gmail SMTP

Used for:

* Email Verification
* Forgot Password
* Password Reset Notifications

---

# 📸 Screenshots
 


| Module            | Screenshot                               |
| ----------------- | ---------------------------------------- |
| Landing Page      | `docs/screenshots/landing.png`           |
| Login             | `docs/screenshots/login.png`             |
| Register          | `docs/screenshots/register.png`          |
| Student Dashboard | `docs/screenshots/student-dashboard.png` |
| Company Dashboard | `docs/screenshots/company-dashboard.png` |
| Mentor Dashboard  | `docs/screenshots/mentor-dashboard.png`  |
| Admin Dashboard   | `docs/screenshots/admin-dashboard.png`   |
| Resume Analysis   | `docs/screenshots/resume-analysis.png`   |
| AI Assistant      | `docs/screenshots/ai-assistant.png`      |
| Analytics         | `docs/screenshots/analytics.png`         |

---

# 📊 Project Statistics

| Item                   |  Count |
| ---------------------- | -----: |
| User Roles             |      4 |
| Dashboards             |      4 |
| AI Modules             |      2 |
| Database Collections   |      5 |
| API Routes             |    35+ |
| Responsive Pages       |    30+ |
| Authentication Modules |      6 |
| Deployment Platform    | Vercel |

---
---

# 🗄 Database Overview

The Placement Cell Portal uses **MongoDB Atlas** as its primary database with **Mongoose ODM** for schema management.

## Database Collections

| Collection      | Purpose                          |
| --------------- | -------------------------------- |
| Users           | Authentication & Role Management |
| StudentProfiles | Student Information              |
| Jobs            | Job Postings                     |
| Applications    | Job Applications                 |
| ResumeAnalysis  | AI Resume Reports                |

---

# 🔄 System Workflow

```text
Student / Company / Mentor / Admin
                │
                ▼
      JWT Authentication
                │
                ▼
      Next.js Frontend
                │
                ▼
      Next.js API Routes
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 MongoDB    Gemini AI   Cloudinary
  Atlas     Resume AI   File Storage
      │
      ▼
Dashboard & Analytics
```

---

# 🔗 API Overview

The project follows a RESTful API architecture.

## Authentication APIs

* Register User
* Login User
* Logout
* Verify Email
* Forgot Password
* Reset Password

---

## Student APIs

* Student Profile
* Update Profile
* Upload Resume
* Resume Analysis
* Recommended Jobs
* Dashboard Data

---

## Company APIs

* Company Profile
* Create Job
* Manage Jobs
* View Applications
* Company Analytics

---

## Mentor APIs

* Assigned Students
* Mentor Dashboard
* Mentor Analytics

---

## Admin APIs

* User Management
* Dashboard Analytics
* Reports
* Mentor Assignment
* System Statistics

---

# 🔒 Security Features

The application implements several security best practices:

* JWT Authentication
* Role-Based Authorization
* Protected API Routes
* Password Hashing
* HTTP-Only Authentication Cookies
* Input Validation
* Secure Environment Variables
* MongoDB Access Control
* Cloudinary Secure Uploads

---

# 📈 Analytics Modules

## Student Dashboard

* Resume Score
* Applications
* Recommended Jobs

---

## Company Dashboard

* Total Jobs
* Total Applications
* Hiring Status

---

## Mentor Dashboard

* Assigned Students
* Resume Scores
* Placement Readiness
* Student Performance

---

## Admin Dashboard

* Total Users
* Students
* Companies
* Mentors
* Jobs
* Applications
* Placement Statistics

---

# 🤖 AI Features

Google Gemini AI powers several intelligent features:

* ATS Resume Scoring
* Resume Summary
* Resume Strengths
* Weakness Detection
* Missing Skills
* Resume Improvement Suggestions
* Career AI Assistant

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

Supported features include:

* Responsive Navigation
* Mobile Sidebar
* Dark / Light Theme
* Adaptive Dashboard Layouts

---

# 🚀 Performance Optimizations

* Server Components
* Client Components
* API Route Optimization
* Lazy Loading
* Optimized Images
* MongoDB Query Optimization
* Cloud Storage Integration

---

# 🎯 Learning Outcomes

During this project, the following concepts were applied:

* Full Stack Development
* Next.js App Router
* React & TypeScript
* MongoDB Database Design
* REST API Development
* JWT Authentication
* Cloudinary Integration
* AI Integration with Gemini
* Responsive UI Design
* Production Deployment
* Git & GitHub Workflow

---

# 🚧 Challenges Faced

* Multi-role authentication
* Resume parsing and analysis
* AI integration
* Cloud storage management
* Responsive dashboard design
* MongoDB schema relationships
* Secure deployment
* Performance optimization

---

# 🔮 Future Enhancements

* AI Interview Preparation
* Resume Builder
* Coding Assessment Platform
* Video Interview Support
* Push Notifications
* Alumni Portal
* Placement Prediction using Machine Learning
* Mobile Application (Android & iOS)
* Multi-College Support
* Advanced Reporting Dashboard

---
---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 🧪 Testing

The project has been manually tested for the following modules:

| Module              | Status |
| ------------------- | :----: |
| User Authentication |    ✅   |
| Student Module      |    ✅   |
| Company Module      |    ✅   |
| Mentor Module       |    ✅   |
| Admin Module        |    ✅   |
| Resume Upload       |    ✅   |
| AI Resume Analysis  |    ✅   |
| Job Management      |    ✅   |
| Job Applications    |    ✅   |
| Mentor Assignment   |    ✅   |
| Analytics Dashboard |    ✅   |
| Settings Module     |    ✅   |
| Dark / Light Theme  |    ✅   |
| Responsive Design   |    ✅   |

---

# 📈 Project Highlights

✔ Full Stack Next.js Application

✔ Role-Based Authentication

✔ AI-Powered Resume Analysis

✔ ATS Resume Scoring

✔ Google Gemini AI Integration

✔ Cloudinary Resume Storage

✔ MongoDB Atlas Database

✔ Responsive User Interface

✔ Student Dashboard

✔ Company Dashboard

✔ Mentor Dashboard

✔ Admin Dashboard

✔ Placement Analytics

✔ JWT Authentication

✔ Secure REST APIs

✔ Mobile Responsive Design

✔ Production Ready Architecture

---

# 📌 Roadmap

### Completed

* Authentication System
* Student Portal
* Company Portal
* Mentor Portal
* Admin Portal
* Resume Upload
* AI Resume Analyzer
* Career AI Assistant
* Job Management
* Application Tracking
* Analytics Dashboard
* Settings Module
* Responsive Design
* Deployment

### Planned

* AI Mock Interviews
* Resume Builder
* Online Coding Assessment
* Notification System
* Alumni Network
* Mobile Application
* Video Interview Platform
* Placement Prediction using Machine Learning

---

# 👨‍💻 Developer

## Shubham Hinge

**M.Sc. Computer Science**

**Full Stack Developer**

### Technical Skills

* Next.js
* React
* TypeScript
* Tailwind CSS
* MongoDB
* Mongoose
* JWT Authentication
* Google Gemini AI
* Cloudinary
* Git & GitHub
* REST APIs

---

# 📬 Contact

For feedback, suggestions, or collaboration:

* **Developer:** Shubham Hinge
* **Project:** Placement Cell Portal

 

* GitHub: https://github.com/Shubham-Hinge
* LinkedIn: https://www.linkedin.com/in/shubhamhinge
* Portfolio: https://portfolio.com
* Email: shubham.hinge1074@gmail.com

---

# 📄 License

This project is developed for **educational and portfolio purposes**.

You are free to learn from the implementation. Please provide appropriate credit before reusing substantial portions of the project.

---

# 🙏 Acknowledgements

Special thanks to:

* Next.js Team
* React Team
* MongoDB Atlas
* Tailwind CSS
* Google Gemini AI
* Cloudinary
* Vercel

for providing the technologies and services that made this project possible.

---

# ⭐ Support

If you found this project useful:

* ⭐ Star the repository
* 🍴 Fork the repository
* 📢 Share it with others
* 💡 Provide feedback

---

<div align="center">

# 🎓 Placement Cell Portal

### AI-Powered Campus Recruitment Platform

**Version:** **v1.0.0**

Developed with ❤️ by **Shubham Hinge**

**© 2026 Shubham Hinge. All Rights Reserved.**

</div>
