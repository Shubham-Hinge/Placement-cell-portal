"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function ReportsPage() {
  const [stats, setStats] =
    useState<any>(null);

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const statsRes =
          await fetch(
            "/api/admin/stats"
          );

        const statsData =
          await statsRes.json();

        if (
          statsData.success
        ) {
          setStats(
            statsData.stats
          );
        }

        const analyticsRes =
          await fetch(
            "/api/admin/analytics"
          );

        const analyticsData =
          await analyticsRes.json();

        if (
          analyticsData.success
        ) {
          setAnalytics(
            analyticsData.analytics
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  const downloadPDF =
    () => {
      window.print();
    };

  const downloadExcel =
    () => {
      alert(
        "Excel Export Coming Soon"
      );
    };

  if (
    !stats ||
    !analytics
  ) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="text-gray-500 mt-2">
            Generate placement reports and exports.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3>Total Users</h3>

            <p className="text-3xl font-bold mt-3">
              {stats.users}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3>Students</h3>

            <p className="text-3xl font-bold mt-3">
              {stats.students}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3>Companies</h3>

            <p className="text-3xl font-bold mt-3">
              {stats.companies}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3>Applications</h3>

            <p className="text-3xl font-bold mt-3">
              {stats.applications}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Placement Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">
                Placement Rate
              </p>

              <p className="text-3xl font-bold text-green-600">
                {
                  analytics.placementRate
                }
                %
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Selected Students
              </p>

              <p className="text-3xl font-bold text-blue-600">
                {
                  analytics.selectedStudents
                }
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Total Applications
              </p>

              <p className="text-3xl font-bold text-purple-600">
                {
                  analytics.totalApplications
                }
              </p>
            </div>

          </div>

        </div>

        <div className="flex gap-4">

          <button
            onClick={
              downloadPDF
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-red-600
              text-white
            "
          >
            Download PDF
          </button>

          <button
            onClick={
              downloadExcel
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-green-600
              text-white
            "
          >
            Export Excel
          </button>

        </div>

      </main>
    </div>
  );
}