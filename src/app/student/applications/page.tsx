"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const studentId =
            localStorage.getItem(
              "userId"
            );

          const response =
            await fetch(
              `/api/applications/student/${studentId}`
            );

          const data =
            await response.json();

          if (
            data.success
          ) {
            setApplications(
              data.applications
            );
          }
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchApplications();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        Loading Applications...
      </div>
    </div>
  );
}
  

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      <div className="flex items-center justify-between mb-8">
  <div>
    <div className="flex items-center gap-3 mb-3">
      <Link
        href="/student/dashboard"
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          border-gray-200
          bg-white
          hover:bg-gray-50
          shadow-sm
          transition-all
        "
      >
        ← Dashboard
      </Link>
    </div>

    <h1 className="text-4xl font-bold text-gray-900">
      My Applications
    </h1>

    <p className="text-gray-500 mt-2">
      Track application status, interviews,
      and offer letters.
    </p>
  </div>
</div>

      {applications.length === 0 ? (
        <div
  className="
    bg-white
    rounded-3xl
    p-10
    text-center
    shadow-sm
  "
>
  <h2 className="text-2xl font-semibold">
    No Applications Found
  </h2>

  <p className="text-gray-500 mt-3">
    Start applying for jobs to track them here.
  </p>

  <Link
    href="/student/jobs"
    className="
      inline-block
      mt-5
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-3
      rounded-xl
    "
  >
    Browse Jobs
  </Link>
</div>
      ) : (
        <div className="grid gap-5">

          {applications.map(
            (
              application
            ) => (
              <div
                key={
                  application._id
                }
                className="
  bg-white
  rounded-3xl
  p-6
  shadow-sm
  hover:shadow-xl
  transition-all
"
              >

                <h2 className="font-bold text-xl">
                  {
                    application
                      .jobId
                      ?.title
                  }
                </h2>

                <p>
                  Company:
                  {" "}
                  {
                    application
                      .jobId
                      ?.companyName
                  }
                </p>

                <p>
  Status:
  {" "}
 <span
  className={`
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
    ${
      application.status === "Selected"
        ? "bg-green-100 text-green-700"
        : application.status === "Rejected"
        ? "bg-red-100 text-red-700"
        : application.status === "Shortlisted"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700"
    }
  `}
>
  {application.status}
</span>
</p>

<p>
  Applied:
  {" "}
  {new Date(
    application.createdAt
  ).toLocaleDateString()}
</p>

{application.interviewDate && (
  <div className="mt-4 border-t pt-4">

    <h3 className="font-bold text-blue-600">
      Interview Scheduled
    </h3>

    <p>
      Date:
      {" "}
      {new Date(
        application.interviewDate
      ).toLocaleDateString()}
    </p>

    <p>
      Time:
      {" "}
      {application.interviewTime}
    </p>

    <a
      href={
        application.meetingLink
      }
      target="_blank"
      rel="noreferrer"
      className="
        text-blue-600
        underline
      "
    >
      Join Interview
    </a>

  </div>
)}
  
{application.offerLetterUrl && (
  <div className="mt-4">

    <a
      href={
        application.offerLetterUrl
      }
      target="_blank"
      rel="noreferrer"
      className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded
        inline-block
      "
    >
      Download Offer Letter
    </a>

  </div>
)}
              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}