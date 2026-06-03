"use client";

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
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Create Job
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            name="title"
            placeholder="Job Title"
            value={
              form.title
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
            rows={5}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={
              form.location
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="salary"
            placeholder="Salary"
            value={
              form.salary
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={
              form.skills
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
          />

          <select
            name="jobType"
            value={
              form.jobType
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
          >
            <option>
              Full Time
            </option>

            <option>
              Internship
            </option>

            <option>
              Part Time
            </option>

            <option>
              Remote
            </option>
          </select>

          <input
            type="date"
            name="lastDate"
            value={
              form.lastDate
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
            required
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Creating..."
              : "Create Job"}
          </button>

        </form>

      </div>

    </div>
  );
}