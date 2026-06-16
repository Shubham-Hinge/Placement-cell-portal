"use client";

import {
  useEffect,
  useState,
} from "react";

import MentorSidebar from "@/components/mentor/sidebar";

export default function MentorStudentsPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents =
    async () => {
      try {
        const mentorId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/mentor/students?mentorId=${mentorId}`
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <MentorSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Assigned Students
          </h1>

          <p className="text-gray-500 mt-2">
            View and track students assigned to you.
          </p>

        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-10">
            Loading...
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-3xl p-10">
            No students assigned.
          </div>
        ) : (
          <div className="grid gap-5">

            {students.map(
              (
                student
              ) => (
                <div
                  key={
                    student._id
                  }
                  className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    border
                    border-gray-100
                    p-6
                  "
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">
                        {
                          student.fullName
                        }
                      </h2>

                      <p className="text-gray-500">
                        {
                          student.college
                        }
                      </p>

                    </div>

                    <div
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        h-fit
                      "
                    >
                      CGPA:
                      {" "}
                      {
                        student.cgpa
                      }
                    </div>

                  </div>

                  <div className="mt-4 space-y-2">

                    <p>
                      <strong>
                        Course:
                      </strong>
                      {" "}
                      {
                        student.course
                      }
                    </p>

                    <p>
                      <strong>
                        Skills:
                      </strong>
                      {" "}
                      {student.skills?.join(
                        ", "
                      )}
                    </p>

                  </div>

                  <div className="flex gap-4 mt-5">

                    {student.linkedin && (
                      <a
                        href={
                          student.linkedin
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          text-blue-600
                          hover:underline
                        "
                      >
                        LinkedIn
                      </a>
                    )}

                    {student.resumeUrl && (
                      <a
                        href={
                          student.resumeUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          text-green-600
                          hover:underline
                        "
                      >
                        Resume
                      </a>
                    )}

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </main>

    </div>
  );
}