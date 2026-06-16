"use client";

import DashboardButton from "@/components/common/DashboardButton";
import CompanySidebar from "@/components/company/sidebar";
import {
  useEffect,
  useState,
} from "react";

export default function CompanyApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState<any[]>([]);

  const [
    interviewDate,
    setInterviewDate,
  ] = useState("");

  const [
    interviewTime,
    setInterviewTime,
  ] = useState("");

  const [
    meetingLink,
    setMeetingLink,
  ] = useState("");

  const updateStatus =
    async (
      applicationId: string,
      status: string
    ) => {
      try {
        const response =
          await fetch(
            `/api/applications/${applicationId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                status,
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          window.location.reload();
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const scheduleInterview =
    async (
      applicationId: string
    ) => {
      const response =
        await fetch(
          `/api/applications/${applicationId}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status:
                "Shortlisted",
              interviewDate,
              interviewTime,
              meetingLink,
            }),
          }
        );

      const data =
        await response.json();

      if (
        data.success
      ) {
        alert(
          "Interview Scheduled"
        );

        window.location.reload();
      }
    };

  useEffect(() => {
    const load =
      async () => {
        const companyId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/company/applications?companyId=${companyId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setApplications(
            data.applications
          );
        }
      };

    load();
  }, []);

 return (
  <div className="flex min-h-screen bg-gray-50">
    <CompanySidebar />

    <main className="flex-1 p-6 md:p-10">
    <DashboardButton
    href="/company/dashboard"
  />
      {/* Header */}
      <div className="mb-10">
        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            px-8
            py-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">
              Recruitment Management
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              Applicants
            </h1>

            <p className="text-gray-500 mt-2">
              Review candidates, schedule interviews,
              and manage hiring decisions.
            </p>
          </div>

          <div
            className="
              h-16
              w-16
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              shadow-lg
            "
          >
            👥
          </div>
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
      No Applications Yet
    </h2>

    <p className="text-gray-500 mt-3">
      Applications will appear here when students apply.
    </p>
  </div>
) : (
  <div className="grid gap-6">
    {applications.map((app) => (
      <div
        key={app._id}
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          transition-all
          border
          border-gray-100
        "
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {app.studentId?.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {app.studentId?.email}
            </p>

            <p className="text-gray-700 mt-3">
              Applied For:
              {" "}
              <span className="font-semibold">
                {app.jobId?.title}
              </span>
            </p>

            <p className="text-gray-500 mt-1">
              Applied:
              {" "}
              {new Date(
                app.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                ${
                  app.status === "Selected"
                    ? "bg-green-100 text-green-700"
                    : app.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : app.status === "Shortlisted"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >
              {app.status}
            </span>

            <a
              href={`/company/applications/${app._id}`}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
                transition-all
              "
            >
              View Details
            </a>

          </div>
        </div>
      </div>
    ))}
  </div>
)}
      </main>
  </div>
);
}