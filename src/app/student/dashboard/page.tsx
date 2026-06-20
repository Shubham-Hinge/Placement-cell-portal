"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "@/components/student/sidebar";

export default function StudentDashboard() {
  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [stats, setStats] =
    useState({
      applied: 0,
      shortlisted: 0,
      selected: 0,
      rejected: 0,
    });

  const [
    recommendations,
    setRecommendations,
  ] = useState<any[]>([]);
  const [resumeScore,
setResumeScore] =
useState(0);

  useEffect(() => {
    const userRole =
      localStorage.getItem(
        "userRole"
      );

    const userId =
      localStorage.getItem(
        "userId"
      );

    if (
      !userRole ||
      userRole !== "student"
    ) {
      window.location.href =
        "/login";
      return;
    }

    setName(
      localStorage.getItem(
        "userName"
      ) || ""
    );

    setRole(userRole);

    const loadData =
      async () => {
        try {
          const res =
            await fetch(
              `/api/applications/student/${userId}`
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
          const resumeRes =
  await fetch(
    `/api/student/resume-score?userId=${userId}`
  );

const resumeData =
  await resumeRes.json();

if (
  resumeData.success
) {
  setResumeScore(
    resumeData.score
  );
}
          const recommendationRes =
            await fetch(
              `/api/jobs/recommendations?userId=${userId}`
            );

          const recommendationData =
            await recommendationRes.json();

          if (
            recommendationData.success
          ) {
            setRecommendations(
              recommendationData.recommendations
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

 return (
  <div className="flex min-h-screen bg-gray-50">
  <Sidebar />

  <main className="flex-1 p-6 md:p-10 md:ml-0">
    {/* Header */}
    
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
        Student Dashboard
      </p>

      <h1 className="text-4xl font-bold text-gray-900">
        Welcome back, {name}
      </h1>

      <p className="text-gray-500 mt-2">
        Manage applications, track progress,
        and discover new opportunities.
      </p>
    </div>

    <Link href="/student/profile">
      <div
        className="
          relative
          cursor-pointer
          group
        "
      >
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
            transition-all
            duration-300
            group-hover:scale-105
          "
        >
          {name?.charAt(0).toUpperCase()}
        </div>

        <span
          className="
            absolute
            -bottom-1
            -right-1
            h-4
            w-4
            rounded-full
            bg-green-500
            border-2
            border-white
          "
        />
      </div>
    </Link>
  </div>
</div>

    {/* Resume Score */}
    <div className="mb-10">
      <div
        className="
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          text-white
          rounded-3xl
          p-8
          shadow-xl
        "
      >
        <h2 className="text-xl font-semibold">
          Resume Score
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <div>
            <p className="text-6xl font-bold">
              {resumeScore}
            </p>

            <p className="opacity-90">
              out of 100
            </p>
          </div>

          <Link
            href="/student/profile"
            className="
              mt-4 md:mt-0
              bg-white
              text-indigo-600
              px-5
              py-3
              rounded-xl
              font-semibold
            "
          >
            Improve Profile
          </Link>
        </div>
      </div>
    </div>

    {/* Statistics */}
    <h2 className="text-2xl font-bold mb-6">
      Application Statistics
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
        <h3 className="text-gray-500">
          Applied
        </h3>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {stats.applied}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
        <h3 className="text-gray-500">
          Shortlisted
        </h3>

        <p className="text-4xl font-bold text-yellow-600 mt-3">
          {stats.shortlisted}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
        <h3 className="text-gray-500">
          Selected
        </h3>

        <p className="text-4xl font-bold text-green-600 mt-3">
          {stats.selected}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
        <h3 className="text-gray-500">
          Rejected
        </h3>

        <p className="text-4xl font-bold text-red-600 mt-3">
          {stats.rejected}
        </p>
      </div>
    </div>

    {/* Recommended Jobs */}
    <div className="bg-white rounded-3xl p-8 shadow-sm mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Recommended Jobs
        </h2>

        <Link
          href="/student/jobs"
          className="text-blue-600 font-semibold"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((job) => (
          <div
            key={job._id}
            className="
              border
              border-gray-100
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">
                  {job.title}
                </h3>

                <p className="text-gray-600">
                  {job.companyName}
                </p>

                <p className="text-gray-500">
                  {job.location}
                </p>
              </div>

              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {job.score}% Match
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${job.score}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <strong>
                Matched Skills:
              </strong>

              <p className="text-green-600 mt-1">
                {job.matchedSkills?.length > 0
                  ? job.matchedSkills.join(", ")
                  : "None"}
              </p>
            </div>

            <div className="mt-3">
              <strong>
                Missing Skills:
              </strong>

              <p className="text-red-500 mt-1">
                {job.missingSkills?.length > 0
                  ? job.missingSkills.join(", ")
                  : "None"}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                href="/student/jobs"
                className="
                  bg-gray-100
                  hover:bg-gray-200
                  px-4
                  py-2
                  rounded-lg
                "
              >
                View Jobs
              </Link>

              <button
                onClick={() =>
                  (window.location.href =
                    "/student/jobs")
                }
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
         {/* Career Assistant */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
    <h2 className="text-2xl font-bold mb-6"> Career Assistant
    </h2>
        <Link
  href="/student/assistant"
   className="
    bg-white
    rounded-3xl
    border
    border-gray-100
    p-6
    hover:shadow-lg
    transition-all
  "
>
  <h2 className="font-bold text-xl">
    🤖 AI Career Assistant
  </h2>

    <p className="text-gray-500 mt-2">
    Resume Review, Career Guidance,
    Interview Questions and Placement Tips
  </p>
</Link>

      <Link
  href="/student/mentor"
  className="
    bg-white
    rounded-3xl
    border
    border-gray-100
    p-6
    hover:shadow-lg
    transition-all
  "
>
  <h2 className="font-bold text-xl">
    My Mentor
  </h2>

  <p className="text-gray-500 mt-2">
    View assigned mentor details.
  </p>
</Link>
      
</div>

    {/* Quick Actions */}
    <h2 className="text-2xl font-bold mb-6">
      Quick Actions
    </h2>  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link
        href="/student/profile"
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <h2 className="font-bold text-xl">
          Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Complete and update your profile
        </p>
      </Link>

      <Link
        href="/student/resume"
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <h2 className="font-bold text-xl">
          Resume
        </h2>

        <p className="mt-2 text-gray-600">
          Upload and manage your resume
        </p>
      </Link>

      <Link
        href="/student/jobs"
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <h2 className="font-bold text-xl">
          Jobs
        </h2>

        <p className="mt-2 text-gray-600">
          Browse Available Jobs
        </p>
      </Link>

      <Link
        href="/student/applications"
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
        "
      >
        <h2 className="font-bold text-xl">
          Applications
        </h2>

        <p className="mt-2 text-gray-600">
          Track Job Applications
        </p>
      </Link>
      </div>
</main>
</div>  
);
}