"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "@/components/admin/sidebar";

export default function AssignMentorPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [mentors, setMentors] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/assign-mentor"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setStudents(
            data.students
          );

          setMentors(
            data.mentors
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

  const assignMentor =
    async (
      studentId: string,
      mentorId: string
    ) => {
      if (!mentorId) return;

      try {
        const res =
          await fetch(
            "/api/admin/assign-mentor",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                studentId,
                mentorId,
              }),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Mentor Assigned Successfully"
          );

          loadData();
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-10">
          Loading...
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Assign Mentors
          </h1>

          <p className="text-gray-500 mt-2">
            Assign mentors to registered students.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-100 rounded-3xl p-6">

            <p className="text-gray-600">
              Students
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {students.length}
            </h2>

          </div>

          <div className="bg-green-100 rounded-3xl p-6">

            <p className="text-gray-600">
              Mentors
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {mentors.length}
            </h2>

          </div>

          <div className="bg-purple-100 rounded-3xl p-6">

            <p className="text-gray-600">
              Assigned
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {
                students.filter(
                  (
                    student
                  ) =>
                    student.mentorName
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Table */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Current Mentor
                  </th>

                  <th className="p-4 text-left">
                    Assign Mentor
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.length >
                0 ? (
                  students.map(
                    (
                      student
                    ) => (
                      <tr
                        key={
                          student._id
                        }
                        className="
                          border-t
                          hover:bg-gray-50
                        "
                      >

                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10
                                h-10
                                rounded-full
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                                font-bold
                              "
                            >
                              {student.name?.charAt(
                                0
                              )}
                            </div>

                            <div>

                              <p className="font-semibold">
                                {
                                  student.name
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="p-4">
                          {
                            student.email
                          }
                        </td>

                        <td className="p-4">

                          {student.mentorName ? (
                            <span
                              className="
                                px-3
                                py-1
                                rounded-full
                                bg-green-100
                                text-green-700
                                text-sm
                              "
                            >
                              {
                                student.mentorName
                              }
                            </span>
                          ) : (
                            <span
                              className="
                                px-3
                                py-1
                                rounded-full
                                bg-red-100
                                text-red-700
                                text-sm
                              "
                            >
                              Not Assigned
                            </span>
                          )}

                        </td>

                        <td className="p-4">

                          <select
                            className="
                              border
                              border-gray-200
                              rounded-xl
                              px-3
                              py-2
                              min-w-[180px]
                            "
                            defaultValue=""
                            onChange={(
                              e
                            ) =>
                              assignMentor(
                                student._id,
                                e.target
                                  .value
                              )
                            }
                          >

                            <option value="">
                              Select Mentor
                            </option>

                            {mentors.map(
                              (
                                mentor
                              ) => (
                                <option
                                  key={
                                    mentor._id
                                  }
                                  value={
                                    mentor._id
                                  }
                                >
                                  {
                                    mentor.name
                                  }
                                </option>
                              )
                            )}

                          </select>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>

                    <td
                      colSpan={4}
                      className="
                        text-center
                        p-10
                        text-gray-500
                      "
                    >
                      No students found.
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}