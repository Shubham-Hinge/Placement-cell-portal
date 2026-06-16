"use client";

import AdminSidebar from "@/components/admin/sidebar";
import Link from "next/link";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
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

    const [adminName, setAdminName] =
  useState("");

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [topSkills, setTopSkills] =
    useState<any[]>([]);
  const [trends, setTrends] =
  useState<any[]>([]);

  useEffect(() => {
    setAdminName(
  localStorage.getItem(
    "userName"
  ) || "Admin"
);
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
          const trendsRes =
  await fetch(
    "/api/admin/placement-trends"
  );

const trendsData =
  await trendsRes.json();

if (
  trendsData.success
) {
  setTrends(
    trendsData.trends
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

          const skillsRes =
            await fetch(
              "/api/admin/top-skills"
            );

          const skillsData =
            await skillsRes.json();

          if (
            skillsData.success
          ) {
            setTopSkills(
              skillsData.skills
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

  const statusData = [
    {
      name: "Applied",
      value:
        stats.applications -
        stats.selected,
    },
    {
      name: "Selected",
      value: stats.selected,
    },
  ];
 const COLORS = [
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#f59e0b", // Orange
  "#ef4444", // Red
];
  const skillsChartData =
    topSkills.map(
      (skill) => ({
        name: skill._id,
        count: skill.count,
      })
    );

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
 <div className="flex min-h-screen bg-gray-50">
  <AdminSidebar />

  <main className="flex-1 p-6 md:p-10">

    {/* Header */}
    <div className="mb-10">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600 mb-2">
            Administration Portal
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage users, companies, placements and analytics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/profile">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg cursor-pointer">
              {adminName?.charAt(0)?.toUpperCase()}
            </div>
          </Link>

        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Link
        href="/admin/users"
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all"
      >
        <h2 className="font-bold text-xl">
          User Management
        </h2>

        <p className="text-gray-500 mt-2">
          Manage students, companies and mentors.
        </p>
      </Link>

      <button
        onClick={downloadPDF}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-xl transition-all"
      >
        <h2 className="font-bold text-xl">
          PDF Reports
        </h2>

        <p className="text-gray-500 mt-2">
          Download placement reports.
        </p>
      </button>

      <button
        onClick={downloadExcel}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-xl transition-all"
      >
        <h2 className="font-bold text-xl">
          Excel Reports
        </h2>

        <p className="text-gray-500 mt-2">
          Export placement data.
        </p>
      </button>
    </div>

    {/* KPI Cards */}
    <div className="grid md:grid-cols-5 gap-6 mb-8">
      <div className="bg-blue-100 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold">Users</h2>
        <p className="text-4xl mt-3 font-bold">{stats.users}</p>
      </div>

      <div className="bg-green-100 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold">Students</h2>
        <p className="text-4xl mt-3 font-bold">{stats.students}</p>
      </div>

      <div className="bg-yellow-100 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold">Companies</h2>
        <p className="text-4xl mt-3 font-bold">{stats.companies}</p>
      </div>

      <div className="bg-purple-100 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold">Jobs</h2>
        <p className="text-4xl mt-3 font-bold">{stats.jobs}</p>
      </div>

      <div className="bg-red-100 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold">Applications</h2>
        <p className="text-4xl mt-3 font-bold">{stats.applications}</p>
      </div>
    </div>

    {/* Analytics Summary */}
    {analytics && (
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold">Placement Rate</h2>
          <p className="text-4xl mt-3 font-bold text-green-600">
            {analytics.placementRate}%
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold">Total Applications</h2>
          <p className="text-4xl mt-3 font-bold text-blue-600">
            {analytics.totalApplications}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold">Selected Students</h2>
          <p className="text-4xl mt-3 font-bold text-purple-600">
            {analytics.selectedStudents}
          </p>
        </div>
      </div>
    )}

    {/* Charts */}
    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">
          Placement Analytics
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {analytics && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">
            Application Status
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((_: any, index: number) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {topSkills.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">
            Top Student Skills
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={skillsChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {trends.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">
            Placement Trends
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
    </main>
  </div>
);
  }