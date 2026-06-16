"use client";

import {
  useEffect,
  useState,
} from "react";

import MentorSidebar from "@/components/mentor/sidebar";

export default function MentorProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      designation: "",
      company: "",
      experience: "",
      expertise: "",
      bio: "",
      linkedin: "",
      profileImage: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/mentor/profile?userId=${userId}`
          );

        const data =
          await res.json();

        if (
          data.success &&
          data.profile
        ) {
          setForm({
            fullName:
              data.profile
                ?.fullName ||
              "",

            email:
              data.profile
                ?.email ||
              "",

            phone:
              data.profile
                ?.phone ||
              "",

            designation:
              data.profile
                ?.designation ||
              "",

            company:
              data.profile
                ?.company ||
              "",

            experience:
              data.profile
                ?.experience ||
              "",

            expertise:
              data.profile?.expertise?.join(
                ", "
              ) || "",

            bio:
              data.profile
                ?.bio ||
              "",

            linkedin:
              data.profile
                ?.linkedin ||
              "",

            profileImage:
              data.profile
                ?.profileImage ||
              "",
          });
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveProfile =
    async () => {
      try {
        setLoading(true);

        const userId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            "/api/mentor/profile",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                ...form,
                userId,

                expertise:
                  form.expertise
                    .split(",")
                    .map((s) =>
                      s.trim()
                    ),
              }),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Profile Saved"
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
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <MentorSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Mentor Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your mentor profile.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="fullName"
              value={
                form.fullName
              }
              onChange={
                handleChange
              }
              placeholder="Full Name"
              className="border p-3 rounded-xl"
            />

            <input
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              placeholder="Email"
              className="border p-3 rounded-xl"
            />

            <input
              name="phone"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
              placeholder="Phone"
              className="border p-3 rounded-xl"
            />

            <input
              name="designation"
              value={
                form.designation
              }
              onChange={
                handleChange
              }
              placeholder="Designation"
              className="border p-3 rounded-xl"
            />

            <input
              name="company"
              value={
                form.company
              }
              onChange={
                handleChange
              }
              placeholder="Company"
              className="border p-3 rounded-xl"
            />

            <input
              name="experience"
              value={
                form.experience
              }
              onChange={
                handleChange
              }
              placeholder="Experience"
              className="border p-3 rounded-xl"
            />

          </div>

          <div className="mt-5">

            <input
              name="expertise"
              value={
                form.expertise
              }
              onChange={
                handleChange
              }
              placeholder="Expertise (comma separated)"
              className="border p-3 rounded-xl w-full"
            />

          </div>

          <div className="mt-5">

            <input
              name="linkedin"
              value={
                form.linkedin
              }
              onChange={
                handleChange
              }
              placeholder="LinkedIn URL"
              className="border p-3 rounded-xl w-full"
            />

          </div>

          <div className="mt-5">

            <textarea
              name="bio"
              value={form.bio}
              onChange={
                handleChange
              }
              rows={5}
              placeholder="Bio"
              className="border p-3 rounded-xl w-full"
            />

          </div>

          <div className="mt-8">

            <button
              onClick={
                saveProfile
              }
              disabled={
                loading
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}