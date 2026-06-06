"use client";

import Link from "next/link";

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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<any>(null);

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    const userRole =
      localStorage.getItem(
        "userRole"
      );

    if (
      !userRole ||
      userRole !== "admin"
    ) {
      window.location.href =
        "/login";
      return;
    }

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

  const downloadPDF =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/reports"
          );

        const data =
          await res.json();

        if (!data.success)
          return;

        const doc =
          new jsPDF();

        doc.setFontSize(18);

        doc.text(
          "Placement Report",
          14,
          20
        );

        autoTable(doc, {
          startY: 30,
          head: [
            [
              "Student",
              "Email",
              "Job",
              "Company",
              "Status",
            ],
          ],
          body:
            data.reportData.map(
              (
                row: any
              ) => [
                row.student,
                row.email,
                row.job,
                row.company,
                row.status,
              ]
            ),
        });

        doc.save(
          "placement-report.pdf"
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const downloadExcel =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/reports"
          );

        const data =
          await res.json();

        if (!data.success)
          return;

        const worksheet =
          XLSX.utils.json_to_sheet(
            data.reportData
          );

        const workbook =
          XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          "Placements"
        );

        XLSX.writeFile(
          workbook,
          "placement-report.xlsx"
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  return (
    <div className="p-10">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard 
        </h1>

        <div className="flex gap-3">
          <button
            onClick={
              downloadPDF
            }
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            PDF Report
          </button>

          <button
            onClick={
              downloadExcel
            }
            className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Excel Report
          </button>

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
      </div>

      <Link
        href="/admin/users"
        className="
          bg-white
          shadow
          rounded
          p-6
          block
          hover:shadow-lg
        "
      >
        <h2 className="font-bold text-xl">
          User Management
        </h2>

        <p>
          Manage Students,
          Companies &
          Mentors
        </p>
      </Link>

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