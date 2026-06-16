"use client";

import CompanySidebar from "@/components/company/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react"; 

export default function CompanyDashboard() {
  const [name, setName] =
    useState("");

 useEffect(() => {
  const userRole =
    localStorage.getItem(
      "userRole"
    );

  if (
    !userRole ||
    userRole !== "company"
  ) {
    window.location.href =
      "/login";
    return;
  }

  setName(
    localStorage.getItem(
      "userName"
    ) || ""
  );
}, []);

 return (
  <div className="flex min-h-screen bg-gray-50">
  <CompanySidebar />

  <main className="flex-1 p-6 md:p-10">
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
            Company Dashboard
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {name}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage jobs, applicants, and hiring activities.
          </p>
        </div>

        <Link href="/company/profile">
          <div
            className="
              relative
              cursor-pointer
              group
            "
          >
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
                transition-all
                duration-300
                group-hover:scale-105
              "
            >
              {name?.charAt(0).toUpperCase()}
            </div>

            <span
              className="
                absolute
                -bottom-1
                -right-1
                h-4
                w-4
                rounded-full
                bg-green-500
                border-2
                border-white
              "
            />
          </div>
        </Link>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Quick Actions
      </h2>

      <p className="text-gray-500 mt-1">
        Manage recruitment activities efficiently.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Link
        href="/company/jobs/create"
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <div className="text-4xl mb-4">
          ➕
        </div>

        <h2 className="font-bold text-xl">
          Create Job
        </h2>

        <p className="mt-2 text-gray-600">
          Post a new job opportunity
        </p>
      </Link>

      <Link
        href="/company/jobs"
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <div className="text-4xl mb-4">
          💼
        </div>

        <h2 className="font-bold text-xl">
          Manage Jobs
        </h2>

        <p className="mt-2 text-gray-600">
          View, edit, and delete jobs
        </p>
      </Link>
<Link
  href="/company/profile"
  className="
    bg-white
    rounded-3xl
    p-6
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
  "
>
  <div className="text-4xl mb-4">
    🏢
  </div>

  <h2 className="font-bold text-xl">
    Company Profile
  </h2>

  <p className="mt-2 text-gray-600">
    Manage company information
  </p>
</Link>
      <Link
        href="/company/applications"
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <div className="text-4xl mb-4">
          👥
        </div>

        <h2 className="font-bold text-xl">
          Applicants
        </h2>

        <p className="mt-2 text-gray-600">
          Review and manage candidates
        </p>
      </Link>

      <Link
        href="/company/analytics"
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <div className="text-4xl mb-4">
          📊
        </div>

        <h2 className="font-bold text-xl">
          Analytics
        </h2>

        <p className="mt-2 text-gray-600">
          Track recruitment performance
        </p>
      </Link>
    </div> 
    </main>
</div>
);
}