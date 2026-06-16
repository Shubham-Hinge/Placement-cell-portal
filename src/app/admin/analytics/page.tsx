"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const statusData = [
    {
      name: "Selected",
      value:
        analytics?.selectedStudents || 0,
    },
    {
      name: "Shortlisted",
      value:
        analytics?.shortlisted || 0,
    },
    {
      name: "Rejected",
      value:
        analytics?.rejected || 0,
    },
  ];

  const overviewData = [
    {
      name: "Students",
      value:
        analytics?.totalStudents || 0,
    },
    {
      name: "Companies",
      value:
        analytics?.totalCompanies || 0,
    },
    {
      name: "Jobs",
      value:
        analytics?.totalJobs || 0,
    },
    {
      name: "Applications",
      value:
        analytics?.totalApplications || 0,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-10">
          Loading Analytics...
        </main>
      </div>
    );
  }

  return (
    
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Platform performance and placement insights.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-100 rounded-3xl p-6">
            <h3>Total Users</h3>

            <p className="text-4xl font-bold mt-2">
              {analytics?.totalUsers || 0}
            </p>
          </div>

          <div className="bg-green-100 rounded-3xl p-6">
            <h3>Students</h3>

            <p className="text-4xl font-bold mt-2">
              {analytics?.totalStudents || 0}
            </p>
          </div>

          <div className="bg-purple-100 rounded-3xl p-6">
            <h3>Companies</h3>

            <p className="text-4xl font-bold mt-2">
              {analytics?.totalCompanies || 0}
            </p>
          </div>

          <div className="bg-orange-100 rounded-3xl p-6">
            <h3>Jobs</h3>

            <p className="text-4xl font-bold mt-2">
              {analytics?.totalJobs || 0}
            </p>
          </div>

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-xl font-bold mb-6">
              Platform Overview
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={overviewData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-xl font-bold mb-6">
              Application Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>

                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {statusData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </main>

    </div>
  );
}