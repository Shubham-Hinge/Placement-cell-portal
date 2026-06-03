"use client";

import { useEffect, useState } from "react";

export default function StudentJobsPage() {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchJobs =
      async () => {
        try {
          const res =
            await fetch(
              "/api/jobs"
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setJobs(
              data.jobs
            );
          }
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="grid gap-6">

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
                p-6
              "
            >
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              <p>
                Company:
                {" "}
                {
                  job.companyName
                }
              </p>

              <p>
                Location:
                {" "}
                {
                  job.location
                }
              </p>

              <p>
                Salary:
                {" "}
                {
                  job.salary
                }
              </p>

              <p className="mt-3">
                {
                  job.description
                }
              </p>

              <button
  onClick={async () => {
    try {
      const studentId =
        localStorage.getItem(
          "userId"
        );

      const response =
        await fetch(
          "/api/applications",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              jobId:
                job._id,
              studentId,
            }),
          }
        );

      const data =
        await response.json();

      alert(
        data.message ||
          "Applied Successfully"
      );
    } catch (error) {
      console.error(
        error
      );
    }
  }}
  className="
    mt-4
    bg-blue-600
    text-white
    px-4
    py-2
    rounded
  "
>
  Apply
</button>

            </div>
          )
        )}

      </div>

    </div>
  );
}