"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentJobsPage() {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [skill, setSkill] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const loadJobs =
    async () => {
      try {
        setLoading(true);

        const res =
          await fetch(
            `/api/jobs?search=${search}&skill=${skill}&sort=${sort}`
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

  useEffect(() => {
    loadJobs();
  }, [
    search,
    skill,
    sort,
  ]);

  const applyJob =
    async (
      jobId: string
    ) => {
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
                jobId,
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
    };

  return (
   <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
  <div>
    <div className="flex items-center gap-3 mb-3">
      <Link
        href="/student/dashboard"
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          border-gray-200
          bg-white
          hover:bg-gray-50
          shadow-sm
          transition-all
        "
      >
        ← Dashboard
      </Link>
    </div>

    <h1 className="text-4xl font-bold text-gray-900">
      Available Jobs
    </h1>

    <p className="text-gray-500 mt-2">
      Discover and apply for jobs that match your skills.
    </p>
  </div>
</div>

     <div
  className="
    bg-white
    rounded-3xl
    shadow-sm
    p-6
    grid
    md:grid-cols-3
    gap-4
    mb-8
  "
>
        <input
          type="text"
          placeholder="Search Jobs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            border
            rounded-lg
            p-3
            w-full
          "
        />

        <select
          value={skill}
          onChange={(e) =>
            setSkill(
              e.target.value
            )
          }
          className="
            border
            rounded-lg
            p-3
          "
        >
          <option value="">
            All Skills
          </option>

          <option value="React">
            React
          </option>

          <option value="Java">
            Java
          </option>

          <option value="Python">
            Python
          </option>

          <option value="MongoDB">
            MongoDB
          </option>

          <option value="Node">
            Node.js
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="
            border
            rounded-lg
            p-3
          "
        >
          <option value="latest">
            Latest
          </option>

          <option value="salary">
            Highest Salary
          </option>
        </select>
      </div>

      {loading ? (
        <div>
          Loading Jobs...
        </div>
      ) : jobs.length ===
        0 ? (
        <div
          className="
            bg-white
            rounded-xl
            p-10
            text-center
            shadow
          "
        >
          No Jobs Found
        </div>
      ) : (
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
                  rounded-xl
                  p-6
                  hover:shadow-lg
                  transition
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {
                        job.title
                      }
                    </h2>

                    <p className="mt-1">
                      {
                        job.companyName
                      }
                    </p>
                  </div>

                  <span
                    className="
                      bg-green-100
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "
                  >
                    {
                      job.jobType
                    }
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p>
                    📍{" "}
                    {
                      job.location
                    }
                  </p>

                  <p>
                    💰{" "}
                    {
                      job.salary
                    }
                  </p>

                  <p>
                    ⏳ Apply Before:
                    {" "}
                    {new Date(
                      job.lastDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills?.map(
                    (
                      skill: string
                    ) => (
                      <span
                        key={
                          skill
                        }
                        className="
                          bg-blue-100
                          px-3
                          py-1
                          rounded-full
                          text-sm
                        "
                      >
                        {
                          skill
                        }
                      </span>
                    )
                  )}
                </div>

                <p className="mt-4 text-gray-600">
                  {
                    job.description
                  }
                </p>

                <button
                  onClick={() =>
                    applyJob(
                      job._id
                    )
                  }
                  className="
                    mt-6
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                  "
                >
                  Apply Now
                </button>
              </div>
            )
          )}
        </div>
      )}
      
    </div>

);
}