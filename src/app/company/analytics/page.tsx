"use client";

import DashboardButton from "@/components/common/DashboardButton";
import CompanySidebar from "@/components/company/sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  useEffect,
  useState,
} from "react";

export default function AnalyticsPage() {
  const [
    analytics,
    setAnalytics,
  ] = useState<any>(
    null
  );
const statusData = [
  {
    name: "Selected",
    value: analytics?.selected || 0,
  },
  {
    name: "Shortlisted",
    value: analytics?.shortlisted || 0,
  },
  {
    name: "Rejected",
    value: analytics?.rejected || 0,
  },
];

const funnelData = [
  {
    stage: "Applications",
    count:
      analytics?.totalApplications || 0,
  },
  {
    stage: "Shortlisted",
    count:
      analytics?.shortlisted || 0,
  },
  {
    stage: "Selected",
    count:
      analytics?.selected || 0,
  },
];

const COLORS = [
  "#10B981",
  "#F59E0B",
  "#EF4444",
];
  useEffect(() => {
    const load =
      async () => {
        try {
          const companyId =
            localStorage.getItem(
              "userId"
            );

          const res =
            await fetch(
              `/api/company/analytics?companyId=${companyId}`
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
            error
          );
        }
      };

    load();
  }, []);

  if (!analytics) {
    return (
      
      <div className="flex min-h-screen bg-gray-50">
        <CompanySidebar />

        <main className="flex-1 p-6 md:p-10">
         
          <div className="bg-white rounded-3xl shadow-sm p-8">
            Loading Analytics...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar />

      <main className="flex-1 p-6 md:p-10">
     <DashboardButton href="/company/dashboard" />
        {/* Header */}
        <div className="mb-10">
          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              px-8
              py-6
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                Company Analytics
              </p>

              <h1 className="text-4xl font-bold text-gray-900">
                Recruitment Insights
              </h1>

              <p className="text-gray-500 mt-2">
                Monitor hiring performance,
                applications, and recruitment activity.
              </p>
            </div>

            <div
              className="
                h-16
                w-16
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                shadow-lg
              "
            >
              📊
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Total Jobs
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              {analytics.totalJobs}
            </h2>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Active Jobs
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {analytics.activeJobs}
            </h2>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Applications
            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-3">
              {analytics.totalApplications}
            </h2>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Shortlisted
            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-3">
              {analytics.shortlisted}
            </h2>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Selected
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-3">
              {analytics.selected}
            </h2>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <p className="text-gray-500">
              Rejected
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">
              {analytics.rejected}
            </h2>
          </div>
<div className="grid lg:grid-cols-2 gap-6 mt-10">

  {/* Hiring Funnel */}
  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h2 className="text-xl font-bold mb-6">
      Recruitment Funnel
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={funnelData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="count"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Status Distribution */}
  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h2 className="text-xl font-bold mb-6">
      Application Status
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {statusData.map(
            (_, index) => (
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
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>
        </div>
      </main>
    </div>
  );
}