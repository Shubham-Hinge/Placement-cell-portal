"use client";

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
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Manage Jobs
      </h1>

      <div className="grid gap-5">

        {jobs.map(
          (job) => (
            <div
              key={
                job._id
              }
              className="
                bg-white
                shadow
                rounded
                p-5
              "
            >
              <h2 className="text-xl font-bold">
                {
                  job.title
                }
              </h2>

              <p>
                {
                  job.location
                }
              </p>

              <p>
                {
                  job.salary
                }
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    deleteJob(
                      job._id
                    )
                  }
                  className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Delete
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}