"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [stats, setStats] =
    useState({
      applied: 0,
      shortlisted: 0,
      selected: 0,
      rejected: 0,
    });

  useEffect(() => {
    const userRole =
      localStorage.getItem(
        "userRole"
      );

    const userId =
      localStorage.getItem(
        "userId"
      );

    if (
      !userRole ||
      userRole !== "student"
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

    setRole(userRole);

    const loadStats =
      async () => {
        try {
          const res =
            await fetch(
              `/api/applications/student/${userId}`
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setStats(
              data.stats
            );
          }
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadStats();
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

      <p className="mt-2 mb-8">
        Role: {role}
      </p>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-blue-100 rounded-xl p-6 shadow">
          <h2 className="font-bold">
            Applied
          </h2>

          <p className="text-3xl mt-2">
            {stats.applied}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-6 shadow">
          <h2 className="font-bold">
            Shortlisted
          </h2>

          <p className="text-3xl mt-2">
            {stats.shortlisted}
          </p>
        </div>

        <div className="bg-green-100 rounded-xl p-6 shadow">
          <h2 className="font-bold">
            Selected
          </h2>

          <p className="text-3xl mt-2">
            {stats.selected}
          </p>
        </div>

        <div className="bg-red-100 rounded-xl p-6 shadow">
          <h2 className="font-bold">
            Rejected
          </h2>

          <p className="text-3xl mt-2">
            {stats.rejected}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/student/profile"
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
            Profile
          </h2>

          <p className="mt-2">
            Complete and update
            your profile
          </p>
        </Link>

        <Link
          href="/student/profile"
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
            Resume
          </h2>

          <p className="mt-2">
            Upload and manage
            your resume
          </p>
        </Link>

        <Link
          href="/student/jobs"
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
            Jobs
          </h2>

          <p className="mt-2">
            Browse Available Jobs
          </p>
        </Link>

        <Link
          href="/student/applications"
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
            Applications
          </h2>

          <p>
            Track Job Applications
          </p>
        </Link>

      </div>
    </div>
  );
}