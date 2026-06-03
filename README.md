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

A full-stack Placement Cell Portal built using Next.js, TypeScript, MongoDB, JWT Authentication, Cloudinary, and Nodemailer.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control
* Email Verification
* Forgot Password
* Reset Password

### Student Module

* Student Dashboard
* Student Profile Management
* Resume Upload
* Resume Viewing
* Browse Available Jobs
* Apply for Jobs
* Track Application Status

### Company Module

* Company Dashboard
* Create Job Posts
* View Applicants
* View Student Resumes
* Manage Applications
* Shortlist Candidates
* Reject Candidates
* Select Candidates

### Job Management

* Create Jobs
* View Jobs
* Active Job Listings
* Job Applications

### Application Management

* Apply for Jobs
* Track Status
* Shortlisted
* Rejected
* Selected

## Tech Stack

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

### Email Service

* Nodemailer
* Gmail SMTP

### File Storage

* Cloudinary

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

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── login/
│   ├── register/
│   ├── student/
│   ├── company/
│   └── admin/
│
├── models/
│   ├── User.ts
│   ├── StudentProfile.ts
│   ├── Job.ts
│   ├── Application.ts
│
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   ├── cloudinary.ts
│   └── mail.ts
```

## Current Status

Completed:

* Authentication System
* Email Verification
* Password Reset
* Student Profile Module
* Resume Upload System
* Job Management Module
* Application Management Module
* Company Applicant Management

In Progress:

* Admin Dashboard
* Analytics
* Placement Reports

## Author

Shubham Hinge

MSc Computer Science
Placement Cell Portal Project
