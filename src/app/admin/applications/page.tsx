"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function ApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/applications"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setApplications(
            data.applications
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredApplications =
    applications.filter(
      (app) =>
        app.studentId?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        app.jobId?.title
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
            Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor all applications.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <input
            type="text"
            placeholder="Search student or job..."
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
                      Student
                    </th>

                    <th className="p-4 text-left">
                      Job
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Resume
                    </th>

                    <th className="p-4 text-left">
                      Interview
                    </th>

                    <th className="p-4 text-left">
                      Offer Letter
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredApplications.map(
                    (app) => (
                      <tr
                        key={app._id}
                        className="border-t"
                      >

                        <td className="p-4">

                          <div>
                            <p className="font-semibold">
                              {
                                app
                                  .studentId
                                  ?.name
                              }
                            </p>

                            <p className="text-sm text-gray-500">
                              {
                                app
                                  .studentId
                                  ?.email
                              }
                            </p>
                          </div>

                        </td>

                        <td className="p-4">
                          {
                            app.jobId
                              ?.title
                          }
                        </td>

                        <td className="p-4">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              ${
                                app.status ===
                                "Selected"
                                  ? "bg-green-100 text-green-700"
                                  : app.status ===
                                    "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : app.status ===
                                    "Shortlisted"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                            `}
                          >
                            {
                              app.status
                            }
                          </span>

                        </td>

                        <td className="p-4">

                          <a
                            href={
                              app.resumeUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Resume
                          </a>

                        </td>

                        <td className="p-4">

                          {app.interviewDate ? (
                            <div>
                              <p>
                                {new Date(
                                  app.interviewDate
                                ).toLocaleDateString()}
                              </p>

                              <p className="text-sm text-gray-500">
                                {
                                  app.interviewTime
                                }
                              </p>
                            </div>
                          ) : (
                            "-"
                          )}

                        </td>

                        <td className="p-4">

                          {app.offerLetterUrl ? (
                            <a
                              href={
                                app.offerLetterUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-green-600 hover:underline"
                            >
                              View
                            </a>
                          ) : (
                            "-"
                          )}

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