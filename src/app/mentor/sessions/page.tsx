"use client";

import {
  useEffect,
  useState,
} from "react";

import MentorSidebar from "@/components/mentor/sidebar";

export default function MentorSessionsPage() {
  const [sessions, setSessions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      studentName: "",
      title: "",
      sessionDate: "",
      sessionTime: "",
      meetingLink: "",
    });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions =
    async () => {
      try {
        const mentorId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/mentor/sessions?mentorId=${mentorId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setSessions(
            data.sessions
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  const createSession =
    async () => {
      try {
        setLoading(true);

        const mentorId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            "/api/mentor/sessions",
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                mentorId,
                ...form,
              }),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Session Created"
          );

          setForm({
            studentName:
              "",
            title: "",
            sessionDate:
              "",
            sessionTime:
              "",
            meetingLink:
              "",
          });

          loadSessions();
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
            Mentoring Sessions
          </h1>

          <p className="text-gray-500 mt-2">
            Schedule and manage mentoring meetings.
          </p>

        </div>

        {/* Create Session */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

          <h2 className="text-xl font-bold mb-5">
            Create Session
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Student Name"
              value={
                form.studentName
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  studentName:
                    e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              placeholder="Session Title"
              value={
                form.title
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              value={
                form.sessionDate
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  sessionDate:
                    e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="time"
              value={
                form.sessionTime
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  sessionTime:
                    e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

          </div>

          <input
            placeholder="Meeting Link"
            value={
              form.meetingLink
            }
            onChange={(e) =>
              setForm({
                ...form,
                meetingLink:
                  e.target.value,
              })
            }
            className="border p-3 rounded-xl w-full mt-4"
          />

          <button
            onClick={
              createSession
            }
            disabled={
              loading
            }
            className="
              mt-5
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            {loading
              ? "Creating..."
              : "Create Session"}
          </button>

        </div>

        {/* Session List */}

        <div className="grid gap-4">

          {sessions.map(
            (session) => (
              <div
                key={
                  session._id
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
                <h2 className="font-bold text-lg">
                  {
                    session.title
                  }
                </h2>

                <p className="text-gray-500 mt-1">
                  Student:
                  {" "}
                  {
                    session.studentName
                  }
                </p>

                <p>
                  Date:
                  {" "}
                  {new Date(
                    session.sessionDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  Time:
                  {" "}
                  {
                    session.sessionTime
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  {
                    session.status
                  }
                </p>

                {session.meetingLink && (
                  <a
                    href={
                      session.meetingLink
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-blue-600
                      block
                      mt-2
                    "
                  >
                    Join Meeting
                  </a>
                )}
              </div>
            )
          )}

        </div>

      </main>

    </div>
  );
}