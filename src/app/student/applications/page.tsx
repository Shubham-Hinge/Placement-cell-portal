"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const studentId =
            localStorage.getItem(
              "userId"
            );

          const response =
            await fetch(
              `/api/applications/student/${studentId}`
            );

          const data =
            await response.json();

          if (
            data.success
          ) {
            setApplications(
              data.applications
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

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div>
          No Applications Found
        </div>
      ) : (
        <div className="grid gap-5">

          {applications.map(
            (
              application
            ) => (
              <div
                key={
                  application._id
                }
                className="
                  bg-white
                  shadow
                  rounded
                  p-5
                "
              >

                <h2 className="font-bold text-xl">
                  {
                    application
                      .jobId
                      ?.title
                  }
                </h2>

                <p>
                  Company:
                  {" "}
                  {
                    application
                      .jobId
                      ?.companyName
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  <span className="font-bold">
                    {
                      application.status
                    }
                  </span>
                </p>

                <p>
                  Applied:
                  {" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}