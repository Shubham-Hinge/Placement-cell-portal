"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function StudentsPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/students"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setStudents(
            data.students
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

  const filteredStudents =
    students.filter(
      (student) =>
        student.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.college
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
            Students
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all student profiles.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <input
            type="text"
            placeholder="Search by name or college..."
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
              focus:outline-none
            "
          />

        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            Loading...
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="text-left p-4">
                      Student
                    </th>

                    <th className="text-left p-4">
                      College
                    </th>

                    <th className="text-left p-4">
                      Course
                    </th>

                    <th className="text-left p-4">
                      CGPA
                    </th>

                    <th className="text-left p-4">
                      Resume
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredStudents.map(
                    (
                      student
                    ) => (
                      <tr
                        key={
                          student._id
                        }
                        className="border-t"
                      >

                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            {student.profileImage ? (
                              <img
                                src={
                                  student.profileImage
                                }
                                alt=""
                                className="
                                  w-12
                                  h-12
                                  rounded-full
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  w-12
                                  h-12
                                  rounded-full
                                  bg-blue-600
                                  text-white
                                  flex
                                  items-center
                                  justify-center
                                  font-bold
                                "
                              >
                                {student.fullName?.charAt(
                                  0
                                )}
                              </div>
                            )}

                            <div>
                              <p className="font-semibold">
                                {
                                  student.fullName
                                }
                              </p>

                              <p className="text-sm text-gray-500">
                                {
                                  student.phone
                                }
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="p-4">
                          {
                            student.college
                          }
                        </td>

                        <td className="p-4">
                          {
                            student.course
                          }
                        </td>

                        <td className="p-4">
                          {
                            student.cgpa
                          }
                        </td>

                        <td className="p-4">

                          {student.resumeUrl ? (
                            <a
                              href={
                                student.resumeUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="
                                text-blue-600
                                hover:underline
                              "
                            >
                              View Resume
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