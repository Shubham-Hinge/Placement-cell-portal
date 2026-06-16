"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
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
      profileImage: "",
    });
useEffect(() => {
  const loadProfile = async () => {
    try {
      const userId =
        localStorage.getItem(
          "userId"
        );

      if (!userId) return;

      const res = await fetch(
        `/api/student/profile?userId=${userId}`
      );

      const data =
        await res.json();

      if (
        data.success &&
        data.profile
      ) {
        setForm({
  fullName:
    data.profile?.fullName ||
    "",
  phone:
    data.profile?.phone ||
    "",
  college:
    data.profile?.college ||
    "",
  course:
    data.profile?.course ||
    "",
  specialization:
    data.profile
      ?.specialization ||
    "",
  graduationYear:
    data.profile
      ?.graduationYear
      ?.toString() || "",
  cgpa:
    data.profile?.cgpa
      ?.toString() || "",
  github:
    data.profile?.github ||
    "",
  linkedin:
    data.profile?.linkedin ||
    "",
  portfolio:
    data.profile
      ?.portfolio || "",
  skills:
    data.profile?.skills?.join(
      ", "
    ) || "",
  resumeUrl:
    data.profile
      ?.resumeUrl || "",
  profileImage:
    data.profile
      ?.profileImage || "",
});
      }
    } catch (error) {
      console.error(
        "Load Profile Error:",
        error
      );
    }
  };

  loadProfile();
}, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleResumeUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      try {
        const file =
          e.target.files?.[0];

        if (!file) return;

        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            "/api/student/upload-resume",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (!data.success) {
          alert(
            data.message
          );
          return;
        }

        setForm((prev) => ({
          ...prev,
          resumeUrl:
            data.url,
        }));

        alert(
          "Resume Uploaded Successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Resume Upload Failed"
        );
      } finally {
        setUploading(false);
      }
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
  <div className="min-h-screen bg-gray-50 p-6 md:p-10">

    {/* Dashboard Button */}
    <div className="max-w-6xl mx-auto">
      <Link
        href="/student/dashboard"
        className="
          inline-flex
          items-center
          gap-2
          bg-white
          border
          border-gray-200
          px-4
          py-2.5
          rounded-xl
          shadow-sm
          hover:bg-gray-50
          hover:shadow-md
          transition-all
          mb-6
          font-medium
        "
      >
        🏠 Dashboard
      </Link>
    </div>

    {/* Header */}
    <div className="max-w-6xl mx-auto mb-8">
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
            Student Management
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Student Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage personal information, academic details,
            skills, resume and professional links.
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
          👤
        </div>
      </div>
    </div>

    {/* Profile Card */}
    <div
      className="
        max-w-6xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-gray-100
        p-8
      "
    >

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        {form.profileImage ? (
          <img
            src={form.profileImage}
            alt="Profile"
            className="
              w-24
              h-24
              rounded-full
              object-cover
              border-4
              border-blue-100
            "
          />
        ) : (
          <div
            className="
              w-24
              h-24
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
            {form.fullName?.charAt(0) || "S"}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold">
            {form.fullName || "Student"}
          </h2>

          <p className="text-gray-500">
            Student Profile
          </p>
        </div>

      </div>

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="fullName"
          value={form.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="college"
          value={form.college}
          placeholder="College Name"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="course"
          value={form.course}
          placeholder="Course"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="specialization"
          value={form.specialization}
          placeholder="Specialization"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="graduationYear"
          value={form.graduationYear}
          placeholder="Graduation Year"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="cgpa"
          value={form.cgpa}
          placeholder="CGPA"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="github"
          value={form.github}
          placeholder="GitHub URL"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="linkedin"
          value={form.linkedin}
          placeholder="LinkedIn URL"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

        <input
          name="portfolio"
          value={form.portfolio}
          placeholder="Portfolio URL"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />

      </div>

      <div className="mt-5">
        <input
          name="skills"
          value={form.skills}
          placeholder="Skills (comma separated)"
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-xl w-full"
        />
      </div>

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>
          <label className="block mb-3 font-medium">
            Profile Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="border border-gray-200 p-3 rounded-xl w-full"
          />
        </div>

        <div>
          <label className="block mb-3 font-medium">
            Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="border border-gray-200 p-3 rounded-xl w-full"
          />

          {uploading && (
            <p className="mt-2 text-blue-600">
              Uploading...
            </p>
          )}

          {form.resumeUrl && (
            <a
              href={form.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-block
                mt-3
                text-blue-600
                font-medium
              "
            >
              View Uploaded Resume
            </a>
          )}
        </div>

      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
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
          "
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