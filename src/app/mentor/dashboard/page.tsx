"use client";

import { useEffect, useState } from "react";
import MentorSidebar from "@/components/mentor/sidebar";

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className={`
        ${color}
        dark:bg-gray-900
        rounded-3xl
        shadow-sm
        border
        border-gray-100
        dark:border-gray-800
        p-6
      `}
    >
      <p className="text-gray-600 dark:text-gray-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}

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

    if (role !== "mentor") {
      window.location.href =
        "/login";
      return;
    }

    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
        const mentorId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/mentor/analytics?mentorId=${mentorId}`
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
          "Mentor Analytics Error:",
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
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <MentorSidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold">
            Loading Mentor Dashboard...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">

      <MentorSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        {/* Header */}

        <div className="mb-10">

          <div
            className="
              bg-white
              dark:bg-gray-900
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              dark:border-gray-800
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

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Mentor Dashboard
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Track your assigned students and placement progress.
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
                text-3xl
              "
            >
              🎓
            </div>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Assigned Students"
            value={
              analytics?.totalStudents || 0
            }
            color="bg-blue-100"
          />

          <StatCard
            title="Profiles Completed"
            value={
              analytics?.profileCompleted || 0
            }
            color="bg-green-100"
          />

          <StatCard
            title="Resume Uploaded"
            value={
              analytics?.resumeUploaded || 0
            }
            color="bg-yellow-100"
          />

          <StatCard
            title="Applications"
            value={
              analytics?.totalApplications || 0
            }
            color="bg-purple-100"
          />

          <StatCard
            title="Shortlisted"
            value={
              analytics?.shortlisted || 0
            }
            color="bg-indigo-100"
          />

          <StatCard
            title="Selected"
            value={
              analytics?.selected || 0
            }
            color="bg-emerald-100"
          />

          <StatCard
            title="Average ATS"
            value={`${analytics?.averageResumeScore || 0}%`}
            color="bg-orange-100"
          />

          <StatCard
            title="Average CGPA"
            value={
              analytics?.averageCGPA || 0
            }
            color="bg-pink-100"
          />

        </div>
                {/* Bottom Analytics */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Skill Distribution */}

          <div
            className="
              bg-white
              dark:bg-gray-900
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              dark:border-gray-800
              p-8
            "
          >

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              🚀 Top Skills Distribution
            </h2>

            {analytics?.skillDistribution?.length > 0 ? (

              <div className="space-y-5">

                {analytics.skillDistribution.map(
                  (skill: any) => (

                    <div key={skill.skill}>

                      <div className="flex justify-between mb-2">

                        <span className="font-medium dark:text-white">
                          {skill.skill}
                        </span>

                        <span className="text-gray-500">
                          {skill.count}
                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className="h-3 rounded-full bg-blue-600"
                          style={{
                            width: `${Math.min(
                              skill.count * 15,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="text-center py-10 text-gray-500">

                No skills available.

              </div>

            )}

          </div>

          {/* Application Status */}

          <div
            className="
              bg-white
              dark:bg-gray-900
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              dark:border-gray-800
              p-8
            "
          >

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              📊 Application Status
            </h2>

            <div className="space-y-5">

              <StatusBar
                label="Applied"
                value={analytics?.applied || 0}
                color="bg-blue-600"
              />

              <StatusBar
                label="Shortlisted"
                value={analytics?.shortlisted || 0}
                color="bg-yellow-500"
              />

              <StatusBar
                label="Selected"
                value={analytics?.selected || 0}
                color="bg-green-600"
              />

              <StatusBar
                label="Rejected"
                value={analytics?.rejected || 0}
                color="bg-red-600"
              />

            </div>

          </div>

        </div>

        {/* Mentor Insights */}

        <div
          className="
            mt-8
            bg-white
            dark:bg-gray-900
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            dark:border-gray-800
            p-8
          "
        >

          <h2 className="text-2xl font-bold mb-8 dark:text-white">

            📈 Mentor Insights

          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <InsightCard
              title="Assigned Students"
              value={analytics?.totalStudents || 0}
            />

            <InsightCard
              title="Applications"
              value={analytics?.totalApplications || 0}
            />

            <InsightCard
              title="Average ATS"
              value={`${analytics?.averageResumeScore || 0}%`}
            />

            <InsightCard
              title="Average CGPA"
              value={analytics?.averageCGPA || 0}
            />

          </div>

        </div>

      </main>

    </div>

  );

}

/* ------------------------- */
/* Helper Components */
/* ------------------------- */

function StatusBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {

  return (

    <div>

      <div className="flex justify-between mb-2">

        <span className="font-medium dark:text-white">
          {label}
        </span>

        <span>{value}</span>

      </div>

      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

        <div
          className={`h-3 rounded-full ${color}`}
          style={{
            width: `${Math.min(
              value * 15,
              100
            )}%`,
          }}
        />

      </div>

    </div>

  );

}

function InsightCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-gray-50
        dark:bg-gray-800
        p-6
      "
    >

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3 dark:text-white">
        {value}
      </h2>

    </div>

  );

}