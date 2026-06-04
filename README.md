This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Placement Cell Portal

A Full Stack Placement Cell Portal built using Next.js, TypeScript, MongoDB, JWT Authentication, Cloudinary, and Nodemailer.

## Features

### Authentication Module

* User Registration
* Secure Login
* JWT Authentication
* Role-Based Access Control
* Email Verification
* Forgot Password
* Reset Password

### Student Module

* Student Dashboard
* Profile Management
* Profile Image Upload
* Resume Upload
* Resume Viewing
* Browse Available Jobs
* Apply for Jobs
* View Application Status

### Company Module

* Company Dashboard
* Create Job Posts
* Manage Posted Jobs
* View Applicants
* View Student Resumes
* Shortlist Candidates
* Reject Candidates
* Select Candidates

### Application Management

* Job Applications
* Application Tracking
* Status Updates
* Email Notifications

### Admin Module

* Admin Dashboard
* Total Users Statistics
* Total Students
* Total Companies
* Total Jobs
* Total Applications
* Total Selected Students

### Analytics

* Placement Analytics
* Placement Rate
* Application Statistics
* Selection Statistics

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* MongoDB
* Mongoose

### Authentication

* JWT
* bcryptjs

### Email Services

* Nodemailer
* Gmail SMTP

### File Storage

* Cloudinary

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── jobs/
│   │   ├── applications/
│   │   ├── company/
│   │   └── student/
│   │
│   ├── login/
│   ├── register/
│   ├── admin/
│   ├── company/
│   └── student/
│
├── models/
│   ├── User.ts
│   ├── Job.ts
│   ├── Application.ts
│   └── StudentProfile.ts
│
├── lib/
│   ├── auth.ts
│   ├── mongodb.ts
│   ├── cloudinary.ts
│   └── mail.ts
```

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/placement-cell-portal

JWT_SECRET=your_jwt_secret

NEXTAUTH_SECRET=your_nextauth_secret

NEXTAUTH_URL=http://localhost:3000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

NEXT_PUBLIC_APP_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

```bash
git clone https://github.com/Shubham-Hinge/Placement-cell-portal.git

cd Placement-cell-portal

npm install

npm run dev
```

## User Roles

### Student

* Manage Profile
* Upload Resume
* Upload Profile Image
* Apply for Jobs
* Track Applications

### Company

* Post Jobs
* Manage Jobs
* Review Applications
* Select Candidates

### Admin

* Monitor Portal Activity
* View Statistics
* Track Placements
* Analyze Performance

## Notifications

Students receive email notifications when:

* Shortlisted
* Selected
* Rejected

## Analytics

Admin can monitor:

* Total Users
* Total Students
* Total Companies
* Total Jobs
* Total Applications
* Placement Rate
* Selected Students

## Future Enhancements

* Interview Scheduling
* Company Reviews
* Placement Reports Export
* Advanced Analytics
* Chat System
* Mobile Application

## Author

Shubham Hinge

MSc Computer Science

Placement Cell Portal Project
