"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function JobsPage() {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/jobs"
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

  const filteredJobs =
    jobs.filter(
      (job) =>
        job.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.companyName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all posted jobs.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <input
            type="text"
            placeholder="Search job title or company..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-200
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-10">
            Loading...
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="p-4 text-left">
                      Job
                    </th>

                    <th className="p-4 text-left">
                      Company
                    </th>

                    <th className="p-4 text-left">
                      Location
                    </th>

                    <th className="p-4 text-left">
                      Salary
                    </th>

                    <th className="p-4 text-left">
                      Type
                    </th>

                    <th className="p-4 text-left">
                      Last Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredJobs.map(
                    (
                      job
                    ) => (
                      <tr
                        key={
                          job._id
                        }
                        className="border-t"
                      >

                        <td className="p-4 font-semibold">
                          {job.title}
                        </td>

                        <td className="p-4">
                          {
                            job.companyName
                          }
                        </td>

                        <td className="p-4">
                          {
                            job.location
                          }
                        </td>

                        <td className="p-4">
                          {
                            job.salary
                          }
                        </td>

                        <td className="p-4">
                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              text-sm
                            "
                          >
                            {
                              job.jobType
                            }
                          </span>
                        </td>

                        <td className="p-4">
                          {new Date(
                            job.lastDate
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}