"use client";

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
    <div className="p-10">
<div className="flex items-center justify-between mb-10">
  <h1 className="text-3xl font-bold">
    Welcome {name}
  </h1>

  <button
    onClick={() => {
      localStorage.clear();
      window.location.href =
        "/login";
    }}
    className="
      flex
      items-center
      gap-2
      bg-red-500
      hover:bg-red-600
      text-white
      font-medium
      px-5
      py-2.5
      rounded-xl
      shadow-md
      hover:shadow-lg
      transition-all
      duration-300
    "
  >
    Logout
  </button>
</div>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/company/jobs/create"
          className="
            bg-white
            shadow
            rounded
            p-6
            block
            hover:shadow-lg
            transition
          "
        >
          <h2 className="font-bold text-xl">
            Create Job
          </h2>

          <p className="mt-2">
            Post a new job
          </p>
        </Link>

        <Link
          href="/company/jobs"
          className="
            bg-white
            shadow
            rounded
            p-6
            block
            hover:shadow-lg
            transition
          "
        >
          <h2 className="font-bold text-xl">
            Manage Jobs
          </h2>

          <p className="mt-2">
            View update & delete jobs
          </p>
        </Link>

        <Link
          href="/company/applications"
          className="
            bg-white
            shadow
            rounded
            p-6
            block
            hover:shadow-lg
            transition
          "
        >
          <h2 className="font-bold text-xl">
            Applicants
          </h2>

          <p className="mt-2">
            Manage Applications
          </p>
        </Link>

        <Link
          href="/company/analytics"
          className="
            bg-white
            shadow
            rounded
            p-6
            block
            hover:shadow-lg
            transition
          "
        >
          <h2 className="font-bold text-xl">
            Analytics
          </h2>

          <p className="mt-2">
            View Company Statistics
          </p>
        </Link>

      </div>

    </div>
  );
}