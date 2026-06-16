"use client";

import DashboardButton from "@/components/common/DashboardButton";
import CompanySidebar from "@/components/company/sidebar";
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditJobPage() {
  const { id } =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      location: "",
      salary: "",
      skills: "",
      jobType: "",
      lastDate: "",
    });

  useEffect(() => {
    const loadJob =
      async () => {
        const res =
          await fetch(
            `/api/jobs/${id}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          const job =
            data.job;

          setForm({
            title:
              job.title,
            description:
              job.description,
            location:
              job.location,
            salary:
              job.salary,
            skills:
              job.skills.join(
                ", "
              ),
            jobType:
              job.jobType,
            lastDate:
              new Date(
                job.lastDate
              )
                .toISOString()
                .split("T")[0],
          });
        }
      };

    loadJob();
  }, [id]);

  const handleChange = (
    e: any
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await fetch(
            `/api/jobs/${id}`,
            {
              method:
                "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  ...form,
                  skills:
                    form.skills
                      .split(",")
                      .map(
                        (
                          s
                        ) =>
                          s.trim()
                      ),
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
            "Job Updated Successfully"
          );

          router.push(
            "/company/jobs"
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
  <div className="flex min-h-screen bg-gray-50">
    <CompanySidebar />

    <main className="flex-1 p-6 md:p-10">
    <DashboardButton
    href="/company/dashboard"
  />
      {/* Header */}
      <div className="mb-10">
        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            px-8
            py-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">
              Job Management
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              Edit Job
            </h1>

            <p className="text-gray-500 mt-2">
              Update job details, requirements,
              and application settings.
            </p>
          </div>

          <div
            className="
              h-16
              w-16
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              shadow-lg
            "
          >
            💼
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          p-8
          max-w-5xl
        "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Job Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="
                border
                border-gray-200
                p-3
                rounded-xl
                w-full
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="
                border
                border-gray-200
                p-3
                rounded-xl
                w-full
              "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="
                  border
                  border-gray-200
                  p-3
                  rounded-xl
                  w-full
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Salary
              </label>

              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="
                  border
                  border-gray-200
                  p-3
                  rounded-xl
                  w-full
                "
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Required Skills
            </label>

            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, Next.js, MongoDB"
              className="
                border
                border-gray-200
                p-3
                rounded-xl
                w-full
              "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Job Type
              </label>

              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="
                  border
                  border-gray-200
                  p-3
                  rounded-xl
                  w-full
                "
              >
                <option value="Full Time">
                  Full Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Remote">
                  Remote
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Application Deadline
              </label>

              <input
                type="date"
                name="lastDate"
                value={form.lastDate}
                onChange={handleChange}
                className="
                  border
                  border-gray-200
                  p-3
                  rounded-xl
                  w-full
                "
              />
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-3
                rounded-xl
                font-medium
                transition-all
                disabled:opacity-50
              "
            >
              {loading
                ? "Updating..."
                : "Update Job"}
            </button>
          </div>

        </form>
      </div>

    </main>
  </div>
);
}