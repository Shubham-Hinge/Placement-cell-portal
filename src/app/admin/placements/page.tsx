"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function PlacementsPage() {
  const [placements, setPlacements] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPlacements();
  }, []);

  const loadPlacements =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/placements"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setPlacements(
            data.placements
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Placements
          </h1>

          <p className="text-gray-500 mt-2">
            Track selected students and placements.
          </p>
        </div>

        {loading ? (
          <div className="bg-white p-10 rounded-3xl">
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
                      Company
                    </th>

                    <th className="p-4 text-left">
                      Job
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Offer Letter
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {placements.map(
                    (placement) => (
                      <tr
                        key={
                          placement._id
                        }
                        className="border-t"
                      >

                        <td className="p-4">
                          {
                            placement
                              .studentId
                              ?.name
                          }
                        </td>

                        <td className="p-4">
                          {
                            placement
                              .jobId
                              ?.companyName
                          }
                        </td>

                        <td className="p-4">
                          {
                            placement
                              .jobId
                              ?.title
                          }
                        </td>

                        <td className="p-4">

                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            Selected
                          </span>

                        </td>

                        <td className="p-4">

                          {placement.offerLetterUrl ? (
                            <a
                              href={
                                placement.offerLetterUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
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