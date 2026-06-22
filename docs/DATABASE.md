# 🗄 Database Documentation

# Placement Cell Portal

**Version:** v1.0.0

**Author:** Shubham Hinge

---

# Table of Contents

1. Introduction
2. Database Technology
3. Database Architecture
4. Collections Overview
5. User Collection
6. StudentProfile Collection
7. Job Collection
8. Application Collection
9. ResumeAnalysis Collection
10. Entity Relationship Diagram
11. Collection Relationships
12. Database Indexes
13. Data Flow
14. Database Security
15. Advantages
16. Conclusion

---

# 1. Introduction

The Placement Cell Portal uses **MongoDB Atlas**, a cloud-based NoSQL database, to store and manage application data. MongoDB provides high scalability, flexibility, and excellent performance for modern full-stack applications.

The application uses **Mongoose ODM (Object Document Mapper)** to define schemas, validate data, and simplify interactions with the MongoDB database.

The database stores all information related to:

* User Authentication
* Student Profiles
* Company Job Postings
* Job Applications
* AI Resume Analysis
* Mentor Assignments
* Placement Analytics

---

# 2. Database Technology

| Component     | Technology              |
| ------------- | ----------------------- |
| Database      | MongoDB Atlas           |
| ODM           | Mongoose                |
| Database Type | NoSQL Document Database |
| Data Format   | BSON (Binary JSON)      |
| Hosting       | MongoDB Atlas Cloud     |

---

# Why MongoDB?

The following reasons influenced the selection of MongoDB for this project:

* Flexible document-based schema
* Easy scalability
* High read/write performance
* Native JSON-like document storage
* Seamless integration with Next.js
* Excellent support for Mongoose
* Cloud-hosted with MongoDB Atlas
* Suitable for rapidly evolving applications

---

# 3. Database Architecture

```text
                       Placement Cell Portal

Students      Companies      Mentors      Admin
      │             │            │           │
      └─────────────┼────────────┼───────────┘
                    │
                    ▼
            Next.js API Routes
                    │
                    ▼
             Mongoose ODM
                    │
                    ▼
             MongoDB Atlas
                    │
   ┌────────────┬─────────────┬──────────────┐
   ▼            ▼             ▼              ▼
 Users   StudentProfiles     Jobs     Applications
                    │
                    ▼
             ResumeAnalysis
```

---

# 4. Collections Overview

The Placement Cell Portal contains five primary collections.

| Collection      | Description                                               |
| --------------- | --------------------------------------------------------- |
| Users           | Stores authentication and user role information           |
| StudentProfiles | Stores complete student academic and personal information |
| Jobs            | Stores all job postings created by companies              |
| Applications    | Stores job applications submitted by students             |
| ResumeAnalysis  | Stores AI-generated resume analysis reports               |

---

# 5. User Collection

## Collection Name

```text
users
```

---

## Purpose

The **Users** collection manages authentication and authorization for all users in the system.

Each document represents one registered user.

Supported roles include:

* Student
* Company
* Mentor
* Admin

---

## Schema

| Field                | Type     | Description               |
| -------------------- | -------- | ------------------------- |
| _id                  | ObjectId | Primary Key               |
| name                 | String   | User Full Name            |
| email                | String   | Unique Email Address      |
| password             | String   | Hashed Password           |
| role                 | String   | User Role                 |
| emailVerified        | Boolean  | Email Verification Status |
| profileImage         | String   | Profile Image URL         |
| resetPasswordToken   | String   | Password Reset Token      |
| resetPasswordExpires | Date     | Token Expiry              |
| isActive             | Boolean  | User Status               |
| lastLogin            | Date     | Last Login Timestamp      |
| createdAt            | Date     | Created Timestamp         |
| updatedAt            | Date     | Updated Timestamp         |

---

## Sample Document

```json
{
  "_id": "685c4f...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "emailVerified": true,
  "isActive": true,
  "createdAt": "2026-06-20T10:00:00Z"
}
```

---

# 6. StudentProfile Collection

## Collection Name

```text
studentprofiles
```

---

## Purpose

The StudentProfile collection stores detailed academic, professional, and placement-related information for each student.

It extends the basic authentication information stored in the Users collection.

---

## Schema

| Field            | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| _id              | ObjectId | Primary Key               |
| userId           | ObjectId | Reference to User         |
| mentorId         | ObjectId | Assigned Mentor           |
| fullName         | String   | Student Name              |
| phone            | String   | Contact Number            |
| college          | String   | College Name              |
| course           | String   | Course                    |
| specialization   | String   | Branch/Specialization     |
| graduationYear   | Number   | Graduation Year           |
| cgpa             | Number   | Academic Score            |
| skills           | Array    | Technical Skills          |
| github           | String   | GitHub Profile            |
| linkedin         | String   | LinkedIn Profile          |
| portfolio        | String   | Portfolio Website         |
| resumeUrl        | String   | Resume File URL           |
| profileImage     | String   | Profile Image             |
| profileCompleted | Boolean  | Profile Completion Status |
| createdAt        | Date     | Created Timestamp         |
| updatedAt        | Date     | Updated Timestamp         |

---

## Sample Document

```json
{
  "userId": "685c4f...",
  "mentorId": "685d3a...",
  "fullName": "John Doe",
  "college": "ABC College",
  "course": "M.Sc Computer Science",
  "cgpa": 8.75,
  "skills": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "resumeUrl": "https://res.cloudinary.com/...",
  "profileCompleted": true
}
```

---

# Collection Relationships (Current)

```text
User
 │
 └──────────────► StudentProfile
                       │
                       ▼
                  Assigned Mentor
```

---

# Summary

At this stage, the database contains two core collections:

* **Users** – Authentication and authorization
* **StudentProfiles** – Academic and professional information

These collections form the foundation of the Placement Cell Portal and are referenced by the remaining collections (Jobs, Applications, and ResumeAnalysis) 

---

---

# 7. Job Collection

## Collection Name

```text
jobs
```

---

## Purpose

The **Jobs** collection stores all job postings created by registered companies.

Each job contains complete recruitment information including eligibility, required skills, salary, location, and application deadline.

---

## Schema

| Field       | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| _id         | ObjectId | Primary Key                                 |
| companyId   | ObjectId | Reference to Company User                   |
| companyName | String   | Company Name                                |
| title       | String   | Job Title                                   |
| description | String   | Job Description                             |
| location    | String   | Job Location                                |
| salary      | String   | Salary Package                              |
| skills      | Array    | Required Skills                             |
| jobType     | String   | Full Time / Internship / Remote / Part Time |
| lastDate    | Date     | Application Deadline                        |
| isActive    | Boolean  | Job Status                                  |
| createdAt   | Date     | Created Timestamp                           |
| updatedAt   | Date     | Updated Timestamp                           |

---

## Sample Document

```json
{
  "companyId": "685ab123...",
  "companyName": "Infosys",
  "title": "Frontend Developer",
  "description": "React Developer with Next.js knowledge",
  "location": "Pune",
  "salary": "8 LPA",
  "skills": [
    "React",
    "Next.js",
    "TypeScript"
  ],
  "jobType": "Full Time",
  "lastDate": "2026-07-30",
  "isActive": true
}
```

---

# Job Workflow

```text
Company Login
      │
      ▼
Create Job
      │
      ▼
Store in Jobs Collection
      │
      ▼
Visible to Students
```

---

# 8. Application Collection

## Collection Name

```text
applications
```

---

## Purpose

The **Applications** collection stores every job application submitted by students.

It tracks the complete recruitment lifecycle from application submission to final selection.

---

## Schema

| Field          | Type     | Description                                 |
| -------------- | -------- | ------------------------------------------- |
| _id            | ObjectId | Primary Key                                 |
| jobId          | ObjectId | Reference to Job                            |
| studentId      | ObjectId | Reference to Student                        |
| resumeUrl      | String   | Resume URL                                  |
| status         | String   | Applied / Shortlisted / Rejected / Selected |
| interviewDate  | Date     | Interview Date                              |
| interviewTime  | String   | Interview Time                              |
| meetingLink    | String   | Interview Link                              |
| offerLetterUrl | String   | Offer Letter                                |
| createdAt      | Date     | Created Timestamp                           |
| updatedAt      | Date     | Updated Timestamp                           |

---

## Sample Document

```json
{
  "jobId": "685ab123...",
  "studentId": "685cd456...",
  "resumeUrl": "https://res.cloudinary.com/...",
  "status": "Applied",
  "interviewDate": "2026-07-15",
  "interviewTime": "10:30 AM",
  "meetingLink": "https://meet.google.com/xyz"
}
```

---

# Application Status Flow

```text
Applied
   │
   ▼
Shortlisted
   │
   ├────────────► Rejected
   │
   ▼
Interview
   │
   ▼
Selected
```

---

# 9. ResumeAnalysis Collection

## Collection Name

```text
resumeanalyses
```

---

## Purpose

The **ResumeAnalysis** collection stores AI-generated resume evaluations.

It prevents unnecessary re-analysis by storing previously generated reports.

---

## Schema

| Field         | Type     | Description             |
| ------------- | -------- | ----------------------- |
| _id           | ObjectId | Primary Key             |
| userId        | ObjectId | Reference to Student    |
| resumeUrl     | String   | Resume URL              |
| atsScore      | Number   | ATS Compatibility Score |
| summary       | String   | AI Resume Summary       |
| strengths     | Array    | Resume Strengths        |
| weaknesses    | Array    | Resume Weaknesses       |
| missingSkills | Array    | Missing Skills          |
| suggestions   | Array    | Improvement Suggestions |
| keywordsFound | Array    | Keywords Detected       |
| analyzedAt    | Date     | Analysis Timestamp      |
| createdAt     | Date     | Created Timestamp       |
| updatedAt     | Date     | Updated Timestamp       |

---

## Sample Document

```json
{
  "userId": "685cd456...",
  "resumeUrl": "https://res.cloudinary.com/...",
  "atsScore": 87,
  "summary": "Strong frontend profile with React experience.",
  "strengths": [
    "Good project experience",
    "Strong technical skills"
  ],
  "weaknesses": [
    "Limited internship experience"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "suggestions": [
    "Add measurable achievements",
    "Include certifications"
  ]
}
```

---

# Resume Analysis Workflow

```text
Student Uploads Resume
          │
          ▼
Cloudinary Storage
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

# 10. Entity Relationship Diagram (ER Diagram)

```text
                           +----------------------+
                           |        User          |
                           +----------------------+
                           | _id                 |
                           | name                |
                           | email               |
                           | role                |
                           +----------+----------+
                                      |
             +------------------------+-------------------------+
             |                        |                         |
             |                        |                         |
             ▼                        ▼                         ▼
      StudentProfile               Company                  Mentor
             │
             │ mentorId
             ▼
          User (Mentor)

             │
             │ userId
             ▼
     ResumeAnalysis

             │
             │
             ▼
        Application
         ▲         ▲
         │         │
         │         │
      Student     Job
                   ▲
                   │
                   │
              Company(User)
```

---

# Database Collection Summary

| Collection      | Purpose                          |
| --------------- | -------------------------------- |
| Users           | Authentication & Role Management |
| StudentProfiles | Student Information              |
| Jobs            | Job Postings                     |
| Applications    | Placement Process                |
| ResumeAnalysis  | AI Resume Reports                |

---

# Progress

```text
DATABASE.md

██████████████████████████████░░░░░░ 75%
```

---

The final part will include:

* Collection Relationships
* Database Indexes
* Data Flow
* Security Features
* Advantages of MongoDB
* Best Practices
* Database Statistics
* Conclusion
* Final Summary

 ---

# 11. Collection Relationships

The Placement Cell Portal database uses references (`ObjectId`) to establish relationships between collections while maintaining a flexible NoSQL design.

---

## User → StudentProfile

### Relationship

**One-to-One**

Each student has one profile.

```text
User
 │
 └────────► StudentProfile
```

---

## User → Job

### Relationship

**One-to-Many**

A company can create multiple jobs.

```text
Company(User)
      │
      ├────────► Job 1
      ├────────► Job 2
      ├────────► Job 3
      └────────► Job n
```

---

## Student → Application

### Relationship

**One-to-Many**

A student can apply for multiple jobs.

```text
Student
   │
   ├────────► Application 1
   ├────────► Application 2
   ├────────► Application 3
   └────────► Application n
```

---

## Job → Application

### Relationship

**One-to-Many**

Each job can receive multiple applications.

```text
Job
 │
 ├────────► Student A
 ├────────► Student B
 ├────────► Student C
 └────────► Student n
```

---

## Student → ResumeAnalysis

### Relationship

**One-to-One**

Each student has one AI resume analysis report for the latest uploaded resume.

```text
Student
   │
   ▼
ResumeAnalysis
```

---

## Mentor → StudentProfile

### Relationship

**One-to-Many**

One mentor can guide many students.

```text
Mentor
   │
   ├────────► Student 1
   ├────────► Student 2
   ├────────► Student 3
   └────────► Student n
```

---

# 12. Database Indexes

Indexes improve query performance and ensure data integrity.

## Users Collection

| Field | Index  |
| ----- | ------ |
| email | Unique |
| role  | Normal |

---

## StudentProfiles Collection

| Field    | Index  |
| -------- | ------ |
| userId   | Unique |
| mentorId | Normal |

---

## Jobs Collection

| Field     | Index    |
| --------- | -------- |
| companyId | Normal   |
| isActive  | Normal   |
| skills    | Multikey |

---

## Applications Collection

| Field     | Index  |
| --------- | ------ |
| studentId | Normal |
| jobId     | Normal |
| status    | Normal |

---

## ResumeAnalysis Collection

| Field  | Index  |
| ------ | ------ |
| userId | Unique |

---

# 13. Database Data Flow

## Student Workflow

```text
Student Registration
        │
        ▼
Users Collection
        │
        ▼
StudentProfile
        │
        ▼
Resume Upload
        │
        ▼
Cloudinary
        │
        ▼
Gemini AI
        │
        ▼
ResumeAnalysis
        │
        ▼
Apply Job
        │
        ▼
Applications
```

---

## Company Workflow

```text
Company Login
      │
      ▼
Create Job
      │
      ▼
Jobs Collection
      │
      ▼
Students Apply
      │
      ▼
Applications
      │
      ▼
Update Status
```

---

## Mentor Workflow

```text
Mentor Login
      │
      ▼
Assigned Students
      │
      ▼
Student Profiles
      │
      ▼
Resume Scores
      │
      ▼
Mentor Analytics
```

---

## Admin Workflow

```text
Admin Login
      │
      ▼
Users
Jobs
Applications
Profiles
Resume Reports
      │
      ▼
Analytics Dashboard
```

---

# 14. Database Security

The database is secured using several best practices.

## Authentication

* JWT Authentication
* HTTP-only Cookies
* Protected API Routes

---

## Data Validation

Mongoose validates:

* Required fields
* Data types
* Enum values
* Unique constraints
* Default values

---

## MongoDB Atlas Security

* Cloud-hosted database
* Authenticated database users
* IP access control
* Encrypted connections (TLS)

---

## Environment Variables

Sensitive values are stored in:

```text
.env.local
```

Examples:

* MongoDB URI
* JWT Secret
* Gemini API Key
* Cloudinary Credentials
* Email Credentials

---

# 15. Advantages of MongoDB

The Placement Cell Portal benefits from MongoDB because it provides:

* Flexible schema design
* High scalability
* Fast document queries
* Easy JSON document storage
* Excellent integration with Mongoose
* Cloud deployment with MongoDB Atlas
* Support for nested documents and arrays
* Efficient indexing
* Easy horizontal scaling

---

# 16. Database Best Practices

The project follows these database design principles:

* Normalize where appropriate using references.
* Use ObjectId relationships instead of duplicated data.
* Validate data through Mongoose schemas.
* Keep authentication separate from profile data.
* Use timestamps for auditing.
* Prevent duplicate users with unique email indexes.
* Store files in Cloudinary instead of MongoDB.
* Store AI reports separately for better scalability.

---

# Database Statistics

| Item          |         Count |
| ------------- | ------------: |
| Collections   |             5 |
| User Roles    |             4 |
| Relationships |             6 |
| Primary Keys  |      ObjectId |
| Database      | MongoDB Atlas |
| ODM           |      Mongoose |

---

# Conclusion

The Placement Cell Portal database is designed using a scalable document-oriented architecture powered by MongoDB Atlas and Mongoose.

The schema separates authentication, profiles, jobs, applications, and AI-generated resume reports into dedicated collections, ensuring modularity, maintainability, and efficient querying.

By leveraging ObjectId references, validation through Mongoose, and cloud-hosted infrastructure, the database supports secure authentication, role-based access control, resume analysis, job management, mentor assignment, and placement analytics while remaining flexible for future enhancements.

---

# References

* MongoDB Atlas Documentation
* Mongoose Documentation
* Next.js Documentation
* Google Gemini API Documentation
* Cloudinary Documentation

---

# Document Information

| Property | Value                 |
| -------- | --------------------- |
| Document | DATABASE.md           |
| Project  | Placement Cell Portal |
| Version  | v1.0.0                |
| Database | MongoDB Atlas         |
| ODM      | Mongoose              |
| Author   | Shubham Hinge         |

---

# DATABASE.md Completed

```text
████████████████████████████████████████

DATABASE.md  ✅ COMPLETE
```

