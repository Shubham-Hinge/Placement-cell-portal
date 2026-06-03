"use client";

import {
  useEffect,
  useState,
} from "react";

export default function CompanyApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState<any[]>([]);

  const updateStatus =
    async (
      applicationId: string,
      status: string
    ) => {
      try {
        const response =
          await fetch(
            `/api/applications/${applicationId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                status,
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          window.location.reload();
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  useEffect(() => {
    const load =
      async () => {
        const companyId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/company/applications?companyId=${companyId}`
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
      };

    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Applicants
      </h1>

      <div className="grid gap-5">
        {applications.map(
          (app) => (
            <div
              key={
                app._id
              }
              className="
                bg-white
                shadow
                rounded
                p-5
              "
            >
              <h2 className="font-bold">
                {
                  app.jobId
                    ?.title
                }
              </h2>

              <p>
                Student:{" "}
                {
                  app
                    .studentId
                    ?.name
                }
              </p>

              <p>
                Email:{" "}
                {
                  app
                    .studentId
                    ?.email
                }
              </p>

              <p>
                Status:{" "}
                {
                  app.status
                }
              </p>

              <a
                href={
                  app.resumeUrl
                }
                target="_blank"
                rel="noreferrer"
                className="
                  text-blue-600
                "
              >
                View Resume
              </a>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Shortlisted"
                    )
                  }
                  className="
                    bg-yellow-500
                    text-white
                    px-3
                    py-2
                    rounded
                  "
                >
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Selected"
                    )
                  }
                  className="
                    bg-green-600
                    text-white
                    px-3
                    py-2
                    rounded
                  "
                >
                  Select
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Rejected"
                    )
                  }
                  className="
                    bg-red-600
                    text-white
                    px-3
                    py-2
                    rounded
                  "
                >
                  Reject
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}