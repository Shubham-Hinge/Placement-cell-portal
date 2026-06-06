# Campus Placement Portal

## Project Overview

Campus Placement Portal is a Full Stack Web Application developed to automate and simplify the campus recruitment process. The platform connects Students, Companies, Mentors, and Administrators through a centralized system where job postings, applications, interviews, selections, analytics, and reports can be managed efficiently.

The project is built using Next.js, TypeScript, MongoDB, Mongoose, Tailwind CSS, JWT Authentication, and Nodemailer.

---

# Objectives

* Digitize the placement process.
* Provide a centralized recruitment platform.
* Enable students to apply for jobs online.
* Allow companies to manage applicants efficiently.
* Help administrators monitor placement activities.
* Provide mentors with placement insights.
* Generate placement analytics and reports.

---

# Technology Stack

## Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes
* Node.js

## Database

* MongoDB
* Mongoose ODM

## Authentication & Security

* JWT Authentication
* bcryptjs Password Hashing
* Email Verification
* Password Reset System

## Reporting

* jsPDF
* jspdf-autotable
* xlsx

## Data Visualization

* Recharts

## Email Services

* Nodemailer
* Gmail SMTP

---

# User Roles

## Student

Students can:

* Register and Login
* Verify Email
* Complete Profile
* Upload Resume
* View Available Jobs
* Apply for Jobs
* Track Applications
* View Application Status
* Receive Interview Information
* Join Online Interviews
* Monitor Placement Progress

---

## Company

Companies can:

* Register and Login
* Create Job Postings
* Edit Job Details
* Delete Job Posts
* View Applicants
* Review Applications
* Shortlist Candidates
* Schedule Interviews
* Send Meeting Links
* Select Candidates
* Reject Candidates
* View Company Analytics

---

## Mentor

Mentors can:

* Login to Mentor Dashboard
* Monitor Placement Activities
* View Student Progress
* Analyze Placement Statistics
* Guide Students Through Placement Process

---

## Admin

Administrators can:

* Manage Users
* Manage Students
* Manage Companies
* Manage Mentors
* Monitor Placements
* View Analytics Dashboard
* Export PDF Reports
* Export Excel Reports
* Track Overall System Activity

---

# Core Features

## Authentication Module

### Registration

* Student Registration
* Company Registration
* Mentor Registration
* Admin Registration

### Login

* JWT Authentication
* Role-Based Redirection

### Email Verification

* Secure Account Activation
* Verification Token Management

### Password Reset

* Forgot Password
* Reset Password Link
* Secure Password Update

---

# Student Module

## Student Dashboard

Displays:

* Applied Jobs Count
* Shortlisted Jobs Count
* Selected Jobs Count
* Rejected Jobs Count

## Profile Management

Students can manage:

* Full Name
* Phone Number
* College Name
* Course
* Specialization
* Graduation Year
* CGPA
* GitHub Profile
* LinkedIn Profile
* Profile Photo

## Resume Management

Students can:

* Upload Resume
* View Resume
* Update Resume

## Job Portal

Students can:

* Browse Jobs
* View Job Details
* Apply for Jobs

## Application Tracking

Students can:

* View Applied Jobs
* Check Status Updates
* Track Interview Schedule
* Access Meeting Links

---

# Company Module

## Company Dashboard

Provides quick access to:

* Create Job
* Manage Jobs
* Applicants
* Analytics

## Job Management

Companies can:

* Create Jobs
* Update Jobs
* Delete Jobs
* View Job Listings

## Applicant Management

Companies can:

* View Applicants
* View Resume
* Shortlist Candidates
* Reject Candidates
* Select Candidates

## Interview Scheduling

Companies can:

* Set Interview Date
* Set Interview Time
* Add Meeting Link
* Notify Students

## Email Notifications

Automatic Emails:

* Shortlisted Email
* Selected Email
* Rejected Email
* Interview Schedule Email

---

# Mentor Module

## Mentor Dashboard

Displays:

* Total Applications
* Selected Students
* Placement Rate

Mentors can analyze placement progress and student performance.

---

# Admin Module

## Admin Dashboard

Displays:

* Total Users
* Students
* Companies
* Mentors
* Jobs
* Applications
* Selected Students
* Placement Rate

## User Management

Admin can:

* Manage Students
* Manage Companies
* Manage Mentors
* Monitor System Users

## Analytics

Admin can view:

* Placement Analytics
* Student Statistics
* Company Statistics
* Application Statistics

## Reports

### PDF Report Export

Includes:

* Student Name
* Email
* Job
* Company
* Status

### Excel Report Export

Download placement data in spreadsheet format.

---

# Database Collections

## Users Collection

Stores:

* Name
* Email
* Password
* Role
* Email Verification Status
* Profile Image
* Last Login

---

## Jobs Collection

Stores:

* Company Information
* Job Title
* Description
* Skills
* Salary
* Location
* Job Type
* Last Date

---

## Applications Collection

Stores:

* Student Information
* Job Information
* Resume URL
* Application Status
* Interview Date
* Interview Time
* Meeting Link

---

## Verification Tokens Collection

Stores:

* Verification Token
* Email Address
* Expiry Time

---

# Project Workflow

1. User Registration
2. Email Verification
3. Login
4. Student Profile Completion
5. Resume Upload
6. Company Creates Job
7. Student Applies
8. Company Reviews Applications
9. Company Shortlists Candidate
10. Interview Scheduling
11. Candidate Selection
12. Placement Analytics Generation
13. Report Export

---

# Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
cd placement-portal
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Open Application

```text
http://localhost:3000
```

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
│   ├── login
│   ├── register
│   └── api
│
├── components
│
├── lib
│
├── models
│
├── public
│
└── types
```

---

# Future Enhancements

* AI Resume Screening
* AI Skill Matching
* Video Interview Integration
* Real-Time Notifications
* In-App Messaging
* Mobile Application
* Placement Prediction System
* Advanced Mentor Features
* AI Career Guidance

---

# Testing Summary

### Authentication Module

Completed

### Student Module

Completed

### Company Module

Completed

### Admin Module

Completed

### Reporting Module

Completed

### Analytics Module

Completed

### Mentor Module

Completed

---

# Project Completion Status

| Module         | Status |
| -------------- | ------ |
| Authentication | 100%   |
| Student Portal | 100%   |
| Company Portal | 100%   |
| Admin Portal   | 100%   |
| Mentor Portal  | 100%   |
| Analytics      | 100%   |
| Reporting      | 100%   |

### Overall Project Completion

**100% Complete**

---

# Developer

**Shubham Hinge**
M.Sc. Computer Science

Campus Placement Portal – Full Stack Placement Management System
