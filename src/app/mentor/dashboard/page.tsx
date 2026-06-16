"use client";

import { useEffect, useState } from "react";
import MentorSidebar from "@/components/mentor/sidebar";

export default function MentorDashboard() {
  const [analytics, setAnalytics] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

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

    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
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
      } catch (error) {
        console.error(
          "Analytics Error:",
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <MentorSidebar />

        <main className="flex-1 p-10">
          Loading...
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <MentorSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        <div className="mb-10">
          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
              flex
              justify-between
              items-center
            "
          >
            <div>
              <p className="text-blue-600 font-medium mb-2">
                Mentor Portal
              </p>

              <h1 className="text-4xl font-bold">
                Mentor Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Guide students and track placement progress.
              </p>
            </div>

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              🎓
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-100 rounded-3xl p-6">
            <h2 className="font-semibold">
              Applications
            </h2>

            <p className="text-4xl font-bold mt-3">
              {
                analytics?.totalApplications ||
                0
              }
            </p>
          </div>

          <div className="bg-green-100 rounded-3xl p-6">
            <h2 className="font-semibold">
              Selected
            </h2>

            <p className="text-4xl font-bold mt-3">
              {
                analytics?.selectedStudents ||
                0
              }
            </p>
          </div>

          <div className="bg-yellow-100 rounded-3xl p-6">
            <h2 className="font-semibold">
              Placement Rate
            </h2>

            <p className="text-4xl font-bold mt-3">
              {
                analytics?.placementRate ||
                0
              }%
            </p>
          </div>

          <div className="bg-purple-100 rounded-3xl p-6">
            <h2 className="font-semibold">
              Companies
            </h2>

            <p className="text-4xl font-bold mt-3">
              {
                analytics?.totalCompanies ||
                0
              }
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
            "
          >
            <h2 className="text-xl font-bold mb-4">
              Placement Insights
            </h2>

            <p className="text-gray-500">
              Monitor student placement
              performance, interview
              success and hiring trends.
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
            "
          >
            <h2 className="text-xl font-bold mb-4">
              Mentor Activities
            </h2>

            <p className="text-gray-500">
              Track mentoring sessions,
              career guidance and
              student progress.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}