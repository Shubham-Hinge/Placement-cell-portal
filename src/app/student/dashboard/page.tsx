"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(
      localStorage.getItem("userName") || ""
    );

    setRole(
      localStorage.getItem("role") || ""
    );
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {name}
      </h1>

      <p className="mt-2 mb-8">
        Role: {role}
      </p>

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