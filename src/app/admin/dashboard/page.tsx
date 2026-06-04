"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<any>(null);

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const res =
            await fetch(
              "/api/admin/stats"
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
          console.error(
            "Error loading dashboard data:",
            error
          );
        }
      };

    loadData();
  }, []);

  if (!stats) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const chartData = [
    {
      name: "Students",
      value:
        stats.students,
    },
    {
      name: "Companies",
      value:
        stats.companies,
    },
    {
      name: "Jobs",
      value:
        stats.jobs,
    },
    {
      name:
        "Applications",
      value:
        stats.applications,
    },
    {
      name:
        "Selected",
      value:
        stats.selected,
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {analytics && (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-100 rounded p-6">
            <h2 className="font-bold">
              Placement Rate
            </h2>

            <p className="text-3xl mt-2">
              {
                analytics.placementRate
              }
              %
            </p>
          </div>

          <div className="bg-blue-100 rounded p-6">
            <h2 className="font-bold">
              Applications
            </h2>

            <p className="text-3xl mt-2">
              {
                analytics.totalApplications
              }
            </p>
          </div>

          <div className="bg-yellow-100 rounded p-6">
            <h2 className="font-bold">
              Selected
            </h2>

            <p className="text-3xl mt-2">
              {
                analytics.selectedStudents
              }
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Total Users
          </h2>

          <p className="text-3xl mt-2">
            {stats.users}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Students
          </h2>

          <p className="text-3xl mt-2">
            {stats.students}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Companies
          </h2>

          <p className="text-3xl mt-2">
            {stats.companies}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Jobs
          </h2>

          <p className="text-3xl mt-2">
            {stats.jobs}
          </p>
        </div>

        <div className="bg-white rounded shadow p-6 mt-10">
          <h2 className="text-xl font-bold mb-6">
            Placement Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={
                chartData
              }
            >
              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Applications
          </h2>

          <p className="text-3xl mt-2">
            {stats.applications}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-bold">
            Selected Students
          </h2>

          <p className="text-3xl mt-2">
            {stats.selected}
          </p>
        </div>
      </div>
    </div>
  );
}