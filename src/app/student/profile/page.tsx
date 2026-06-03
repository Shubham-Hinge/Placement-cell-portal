"use client";

import { useState } from "react";

export default function StudentProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      fullName: "",
      phone: "",
      college: "",
      course: "",
      specialization: "",
      graduationYear: "",
      cgpa: "",
      github: "",
      linkedin: "",
      portfolio: "",
      skills: "",
      resumeUrl: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const userId =
          localStorage.getItem(
            "userId"
          );

        const response =
          await fetch(
            "/api/student/profile",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                ...form,
                userId,
                skills:
                  form.skills
                    .split(",")
                    .map((s) =>
                      s.trim()
                    ),
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          alert(
            "Profile Saved Successfully"
          );
        } else {
          alert(
            data.message
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
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Student Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="college"
            placeholder="College"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="course"
            placeholder="Course"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="graduationYear"
            placeholder="Graduation Year"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="cgpa"
            placeholder="CGPA"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="github"
            placeholder="GitHub URL"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

          <input
            name="portfolio"
            placeholder="Portfolio URL"
            onChange={
              handleChange
            }
            className="border p-3 rounded"
          />

        </div>

        <div className="mt-5">

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={
              handleChange
            }
            className="border p-3 rounded w-full"
          />

        </div>

        <div className="mt-8">

          <button
            onClick={
              handleSubmit
            }
            disabled={
              loading
            }
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>

      </div>

    </div>
  );
}