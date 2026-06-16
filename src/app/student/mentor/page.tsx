"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

export default function StudentMentorPage() {
  const [mentor, setMentor] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMentor();
  }, []);

  const loadMentor =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/student/mentor?userId=${userId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setMentor(
            data.mentor
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        <Link
          href="/student/dashboard"
          className="
            inline-flex
            items-center
            gap-2
            mb-6
            px-4
            py-2
            bg-white
            rounded-xl
            border
            border-gray-200
            shadow-sm
          "
        >
          ← Dashboard
        </Link>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            p-8
          "
        >

          <h1 className="text-4xl font-bold">
            My Mentor
          </h1>

          <p className="text-gray-500 mt-2">
            View your assigned mentor.
          </p>

        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-10 mt-6">
            Loading...
          </div>
        ) : !mentor ? (
          <div className="bg-white rounded-3xl p-10 mt-6">

            <h2 className="text-xl font-semibold">
              No Mentor Assigned
            </h2>

            <p className="text-gray-500 mt-2">
              An administrator has not assigned
              a mentor yet.
            </p>

          </div>
        ) : (
          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
              mt-6
            "
          >

            <div className="flex items-center gap-5 mb-6">

              <div
                className="
                  h-20
                  w-20
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                "
              >
                {mentor.fullName?.charAt(
                  0
                )}
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {
                    mentor.fullName
                  }
                </h2>

                <p className="text-gray-500">
                  {
                    mentor.designation
                  }
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <h3 className="font-semibold mb-2">
                  Company
                </h3>

                <p>
                  {
                    mentor.company
                  }
                </p>

              </div>

              <div>

                <h3 className="font-semibold mb-2">
                  Experience
                </h3>

                <p>
                  {
                    mentor.experience
                  }
                </p>

              </div>

              <div>

                <h3 className="font-semibold mb-2">
                  Expertise
                </h3>

                <p>
                  {mentor.expertise?.join(
                    ", "
                  )}
                </p>

              </div>

              <div>

                <h3 className="font-semibold mb-2">
                  LinkedIn
                </h3>

                {mentor.linkedin ? (
                  <a
                    href={
                      mentor.linkedin
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-blue-600
                      hover:underline
                    "
                  >
                    View Profile
                  </a>
                ) : (
                  "-"
                )}

              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-semibold mb-2">
                Bio
              </h3>

              <p className="text-gray-600">
                {mentor.bio}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}