"use client";

import { useEffect, useState } from "react";

export default function MentorDashboard() {
  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    const role =
      localStorage.getItem(
        "userRole"
      );

    if (
      role !== "mentor"
    ) {
      window.location.href =
        "/login";
      return;
    }

    const load =
      async () => {
        const res =
          await fetch(
            "/api/admin/analytics"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setAnalytics(
            data.analytics
          );
        }
      };

    load();
  }, []);

  if (!analytics) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Mentor Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href =
              "/login";
          }}
          className="
            bg-red-500
            text-white
            px-5
            py-2
            rounded-xl
          "
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-100 p-6 rounded">
          <h2>Total Applications</h2>
          <p className="text-3xl">
            {
              analytics.totalApplications
            }
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded">
          <h2>Selected</h2>
          <p className="text-3xl">
            {
              analytics.selectedStudents
            }
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded">
          <h2>Placement Rate</h2>
          <p className="text-3xl">
            {
              analytics.placementRate
            }%
          </p>
        </div>

      </div>

    </div>
  );
}