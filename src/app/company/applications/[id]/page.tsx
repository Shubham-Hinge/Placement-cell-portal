"use client";

import DashboardButton from "@/components/common/DashboardButton";
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import CompanySidebar from "@/components/company/sidebar";

export default function ApplicantDetailsPage() {
  const params =
    useParams();

  const router =
    useRouter();

  const [
    application,
    setApplication,
  ] = useState<any>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    interviewDate,
    setInterviewDate,
  ] = useState("");

  const [
    interviewTime,
    setInterviewTime,
  ] = useState("");

  const [
    meetingLink,
    setMeetingLink,
  ] = useState("");

  useEffect(() => {
    const load =
      async () => {
        try {
          const res =
            await fetch(
              `/api/company/applications/${params.id}`
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setApplication(
              data.application
            );

            setInterviewDate(
              data.application
                ?.interviewDate
                ? new Date(
                    data.application.interviewDate
                  )
                    .toISOString()
                    .split("T")[0]
                : ""
            );

            setInterviewTime(
              data.application
                ?.interviewTime ||
                ""
            );

            setMeetingLink(
              data.application
                ?.meetingLink ||
                ""
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

    load();
  }, [params.id]);

  const updateStatus =
    async (
      status: string
    ) => {
      try {
        const res =
          await fetch(
            `/api/applications/${application._id}`,
            {
              method:
                "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  status,
                }
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            `Candidate ${status}`
          );

          window.location.reload();
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const scheduleInterview =
    async () => {
      try {
        const res =
          await fetch(
            `/api/applications/${application._id}`,
            {
              method:
                "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  status:
                    "Shortlisted",
                  interviewDate,
                  interviewTime,
                  meetingLink,
                }
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Interview Scheduled"
          );

          window.location.reload();
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <CompanySidebar />

        <main className="flex-1 p-10">
          Loading...
        </main>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <CompanySidebar />

        <main className="flex-1 p-10">
          Application Not Found
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar />

      <main className="flex-1 p-6 md:p-10">
        <DashboardButton
    href="/company/dashboard"
  />

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h1 className="text-3xl font-bold mb-8">
            Applicant Details
          </h1>

          <div className="space-y-3">

            <p>
              <strong>
                Name:
              </strong>{" "}
              {
                application
                  .studentId
                  ?.name
              }
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {
                application
                  .studentId
                  ?.email
              }
            </p>

            <p>
              <strong>
                Applied For:
              </strong>{" "}
              {
                application
                  .jobId
                  ?.title
              }
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {
                application.status
              }
            </p>

          </div>

          <div className="mt-8">

            <a
              href={
                application.resumeUrl
              }
              target="_blank"
              rel="noreferrer"
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              View Resume
            </a>

          </div>

          <div className="mt-10 border-t pt-8">

            <h2 className="text-xl font-bold mb-4">
              Schedule Interview
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="date"
                value={
                  interviewDate
                }
                onChange={(e) =>
                  setInterviewDate(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-xl
                "
              />

              <input
                type="time"
                value={
                  interviewTime
                }
                onChange={(e) =>
                  setInterviewTime(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-xl
                "
              />

              <input
                placeholder="Meeting Link"
                value={
                  meetingLink
                }
                onChange={(e) =>
                  setMeetingLink(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-xl
                "
              />

            </div>

            <button
              onClick={
                scheduleInterview
              }
              className="
                mt-4
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              Schedule Interview
            </button>

          </div>

          <div className="mt-10 border-t pt-8">

            <h2 className="text-xl font-bold mb-4">
              Actions
            </h2>

              
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  updateStatus(
                    "Shortlisted"
                  )
                }
                className="
                  bg-yellow-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Shortlist
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    "Selected"
                  )
                }
                className="
                  bg-green-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Select
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    "Rejected"
                  )
                }
                className="
                  bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Reject
              </button>

            </div>
{/* Offer Letter */}
<div className="mt-10 border-t pt-8">

  <h2 className="text-xl font-bold mb-4">
    Offer Letter
  </h2>

  {application.offerLetterUrl && (
    <a
      href={application.offerLetterUrl}
      target="_blank"
      rel="noreferrer"
      className="
        inline-block
        mb-4
        bg-green-600
        hover:bg-green-700
        text-white
        px-5
        py-3
        rounded-xl
        transition-all
      "
    >
      View Uploaded Offer Letter
    </a>
  )}

  <input
    type="file"
    accept=".pdf"
    onChange={async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "applicationId",
          application._id
        );

        const res =
          await fetch(
            "/api/company/upload-offer-letter",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await res.json();

        if (data.success) {
          alert(
            "Offer Letter Uploaded Successfully"
          );

          window.location.reload();
        } else {
          alert(
            data.message
          );
        }
      } catch (error) {
        console.error(error);

        alert(
          "Offer Letter Upload Failed"
        );
      }
    }}
    className="
      w-full
      border
      border-gray-200
      p-3
      rounded-xl
      bg-white
    "
  />

  <p className="text-sm text-gray-500 mt-2">
    Upload PDF offer letter for the selected candidate.
  </p>

</div>
          </div>

        </div>

      </main>
    </div>
  );
}