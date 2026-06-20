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
        border
        border-gray-100
        dark:border-gray-800
        shadow-sm
        p-6
      `}
    >
      <p className="text-gray-600 dark:text-gray-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 dark:text-white">
        {value}
      </h2>
    </div>
  );
}

export default function MentorAnalyticsPage() {

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
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">

        <MentorSidebar />

        <main className="flex-1 flex items-center justify-center">

          <div className="text-xl font-semibold">

            Loading Analytics...

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

                Mentor Analytics

              </p>

              <h1 className="text-4xl font-bold dark:text-white">

                Student Performance Analytics

              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">

                Analyze assigned students, resumes, applications and placement readiness.

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
              📊
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
                {/* Main Analytics */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Top Performing Students */}

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

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  🏆 Top Performing Students
                </h2>

                <p className="text-gray-500 mt-1">
                  Students with the highest ATS scores.
                </p>

              </div>

            </div>

            {analytics?.topStudents?.length > 0 ? (

              <div className="space-y-4">

                {analytics.topStudents.map(
                  (student: any, index: number) => (

                    <div
                      key={student.id}
                      className="
                        flex
                        justify-between
                        items-center
                        border-b
                        dark:border-gray-800
                        pb-4
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                          "
                        >
                          {index + 1}
                        </div>

                        <div>

                          <h3 className="font-semibold dark:text-white">
                            {student.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-blue-600">
                          ATS {student.resumeScore}
                        </p>

                        <p className="text-sm text-gray-500">
                          CGPA {student.cgpa}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="text-center py-10 text-gray-500">

                No students found.

              </div>

            )}

          </div>

          {/* Students Needing Attention */}

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

            <div className="mb-6">

              <h2 className="text-2xl font-bold dark:text-white">
                ⚠ Students Needing Attention
              </h2>

              <p className="text-gray-500 mt-1">
                Students requiring mentor guidance.
              </p>

            </div>

            {analytics?.attentionStudents?.length > 0 ? (

              <div className="space-y-4">

                {analytics.attentionStudents.map(
                  (student: any) => (

                    <div
                      key={student.id}
                      className="
                        rounded-2xl
                        border
                        dark:border-gray-800
                        p-5
                      "
                    >

                      <h3 className="font-semibold text-lg dark:text-white">
                        {student.name}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-4">

                        {!student.profileCompleted && (

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-red-100
                              text-red-600
                              text-xs
                              font-medium
                            "
                          >
                            Profile Incomplete
                          </span>

                        )}

                        {!student.resumeUploaded && (

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-orange-100
                              text-orange-700
                              text-xs
                              font-medium
                            "
                          >
                            Resume Missing
                          </span>

                        )}

                        {student.resumeScore < 60 && (

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-yellow-100
                              text-yellow-700
                              text-xs
                              font-medium
                            "
                          >
                            ATS Below 60
                          </span>

                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div
                className="
                  rounded-2xl
                  bg-green-100
                  dark:bg-green-900/30
                  p-8
                  text-center
                "
              >

                <div className="text-5xl mb-3">
                  🎉
                </div>

                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
                  Excellent!
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  All assigned students are progressing well.
                </p>

              </div>

            )}

          </div>

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