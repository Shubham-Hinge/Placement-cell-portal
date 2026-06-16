"use client";

import DashboardButton from "@/components/common/DashboardButton";
import CompanySidebar from "@/components/company/sidebar";
import { useState } from "react";

export default function CreateJobPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      location: "",
      salary: "",
      skills: "",
      jobType: "Full Time",
      lastDate: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
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

        const companyId =
          localStorage.getItem(
            "userId"
          );

        const companyName =
          localStorage.getItem(
            "userName"
          );

        const response =
          await fetch(
            "/api/jobs",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                companyId,
                companyName,
                title:
                  form.title,
                description:
                  form.description,
                location:
                  form.location,
                salary:
                  form.salary,
                skills:
                  form.skills
                    .split(",")
                    .map((s) =>
                      s.trim()
                    ),
                jobType:
                  form.jobType,
                lastDate:
                  form.lastDate,
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          alert(
            "Job Created Successfully"
          );

          setForm({
            title: "",
            description:
              "",
            location: "",
            salary: "",
            skills: "",
            jobType:
              "Full Time",
            lastDate:
              "",
          });
        } else {
          alert(
            data.message
          );
        }
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Failed to create job"
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
              Recruitment Management
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              Create New Job
            </h1>

            <p className="text-gray-500 mt-2">
              Publish a new job opportunity and start receiving applications.
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
            ➕
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        className="
          max-w-5xl
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          p-8
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
              placeholder="Frontend Developer"
              className="
                border
                border-gray-200
                p-3
                rounded-xl
                w-full
              "
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Job Description
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
              required
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
                placeholder="Pune, Maharashtra"
                className="
                  border
                  border-gray-200
                  p-3
                  rounded-xl
                  w-full
                "
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Salary Package
              </label>

              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="₹6 LPA"
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
              placeholder="React, Next.js, TypeScript, MongoDB"
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
                required
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
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Creating Job..."
                : "Create Job"}
            </button>
          </div>

        </form>
      </div>

    </main>
  </div>
);
}