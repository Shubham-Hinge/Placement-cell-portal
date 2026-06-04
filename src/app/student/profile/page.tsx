"use client";

import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <div className="mb-6 flex items-center gap-4">

  {form.profileImage && (
    <img
      src={form.profileImage}
      alt="Profile"
      className="
        w-24
        h-24
        rounded-full
        object-cover
      "
    />
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

       <div className="grid md:grid-cols-2 gap-5">

  <input
    name="fullName"
    value={form.fullName}
    placeholder="Full Name"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="phone"
    value={form.phone}
    placeholder="Phone"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="college"
    value={form.college}
    placeholder="College"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="course"
    value={form.course}
    placeholder="Course"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="specialization"
    value={form.specialization}
    placeholder="Specialization"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="graduationYear"
    value={form.graduationYear}
    placeholder="Graduation Year"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="cgpa"
    value={form.cgpa}
    placeholder="CGPA"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="github"
    value={form.github}
    placeholder="GitHub URL"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="linkedin"
    value={form.linkedin}
    placeholder="LinkedIn URL"
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="portfolio"
    value={form.portfolio}
    placeholder="Portfolio URL"
    onChange={handleChange}
    className="border p-3 rounded"
  />

</div>

<div className="mt-5">
  <input
    name="skills"
    value={form.skills}
    placeholder="Skills (comma separated)"
    onChange={handleChange}
    className="border p-3 rounded w-full"
  />
</div>
<div className="mb-6">

  {form.profileImage && (
    <img
      src={
        form.profileImage
      }
      alt="Profile"
      className="
        w-32
        h-32
        rounded-full
        object-cover
        mb-4
      "
    />
  )}

  <input
    type="file"
    accept="image/*"
    onChange={async (
      e
    ) => {
      const file =
        e.target.files?.[0];

      if (!file)
        return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "userId",
        localStorage.getItem(
          "userId"
        ) || ""
      );

      const res =
        await fetch(
          "/api/student/profile-image",
          {
            method:
              "POST",
            body:
              formData,
          }
        );

      const data =
        await res.json();

      if (
        data.success
      ) {
        setForm(
          (
            prev
          ) => ({
            ...prev,
            profileImage:
              data.imageUrl,
          })
        );
      }
    }}
  />

</div>
        <div className="mt-5">
          <label className="block mb-2 font-medium">
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={
              handleResumeUpload
            }
            className="border p-3 rounded w-full"
          />

          {uploading && (
            <p className="mt-2">
              Uploading...
            </p>
          )}

          {form.resumeUrl && (
            <a
              href={
                form.resumeUrl
              }
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 mt-2 block"
            >
              View Uploaded Resume
            </a>
          )}
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