"use client";

import DashboardButton from "@/components/common/DashboardButton";
import CompanySidebar from "@/components/company/sidebar";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

export default function CompanyJobsPage() {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const loadJobs =
    async () => {
      try {
        const companyId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            "/api/jobs"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          const filtered =
            data.jobs.filter(
              (job: any) =>
                job.companyId ===
                companyId
            );

          setJobs(
            filtered
          );
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  useEffect(() => {
    loadJobs();
  }, []);

  const deleteJob =
    async (
      jobId: string
    ) => {
      if (
        !confirm(
          "Delete this job?"
        )
      )
        return;

      const res =
        await fetch(
          `/api/jobs/${jobId}`,
          {
            method:
              "DELETE",
          }
        );

      const data =
        await res.json();

      if (
        data.success
      ) {
        loadJobs();
      }
    };
return (
  <div className="flex min-h-screen bg-gray-50">
    <CompanySidebar />

    <main className="flex-1 p-6 md:p-10">
  <DashboardButton
    href="/company/dashboard"
  />
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
              Job Management
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              Manage Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              View, update, and manage all your active job postings.
            </p>
          </div>

          <Link
            href="/company/jobs/create"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
              transition-all
            "
          >
            + Create Job
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div
          className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-sm
          "
        >
          <h2 className="text-2xl font-semibold">
            No Jobs Posted Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first job posting to start receiving applications.
          </p>

          <Link
            href="/company/jobs/create"
            className="
              inline-block
              mt-6
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Create Job
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all
                border
                border-gray-100
              "
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </h2>

                    <span
                      className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                      "
                    >
                      {job.jobType}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 text-gray-600">

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💰 {job.salary}
                    </p>

                    <p>
                      ⏳ {new Date(
                        job.lastDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">

                      {job.skills.map(
                        (
                          skill: string
                        ) => (
                          <span
                            key={skill}
                            className="
                              bg-blue-100
                              text-blue-700
                              px-3
                              py-1
                              rounded-full
                              text-sm
                            "
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>
                  )}
                </div>

                <div className="flex gap-3">

                  <Link
                    href={`/company/jobs/edit/${job._id}`}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-5
                      py-3
                      rounded-xl
                      transition-all
                    "
                  >
                    Edit Job
                  </Link>

                  <button
                    onClick={() =>
                      deleteJob(
                        job._id
                      )
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-5
                      py-3
                      rounded-xl
                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </main>
  </div>
);
}