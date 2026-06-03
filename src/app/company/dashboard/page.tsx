"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompanyDashboard() {
  const [name, setName] =
    useState("");

  useEffect(() => {
    setName(
      localStorage.getItem(
        "userName"
      ) || ""
    );
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Welcome {name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

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

        <div
          className="
            bg-white
            shadow
            rounded
            p-6
          "
        >
          <h2 className="font-bold text-xl">
            Analytics
          </h2>

          <p className="mt-2">
            Coming Soon
          </p>
        </div>

      </div>

    </div>
  );
}