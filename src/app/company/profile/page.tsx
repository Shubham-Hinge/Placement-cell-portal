"use client";

import CompanySidebar from "@/components/company/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CompanyProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      companyName: "",
      email: "",
      phone: "",
      website: "",
      industry: "",
      location: "",
      description: "",
      logo: "",
    });

  useEffect(() => {
    const loadProfile =
      async () => {
        try {
          const userId =
            localStorage.getItem(
              "userId"
            );

          if (!userId) return;

          const response =
            await fetch(
              `/api/company/profile?userId=${userId}`
            );

          const data =
            await response.json();

          if (
            data.success &&
            data.profile
          ) {
            setForm(
              data.profile
            );
          }
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            "/api/company/profile",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                ...form,
                userId,
              }),
            }
          );

        const data =
          await response.json();

        alert(
          data.message ||
            "Profile Saved"
        );
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
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/company/dashboard"
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              border
              border-gray-200
              bg-white
              hover:bg-gray-50
              shadow-sm
            "
          >
            ← Dashboard
          </Link>

          <h1 className="text-3xl font-bold">
            Company Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="flex items-center gap-5 mb-8">
            <div
              className="
                h-24
                w-24
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                flex
                items-center
                justify-center
                text-4xl
                font-bold
              "
            >
              {form.companyName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {form.companyName || "Company"}
              </h2>

              <p className="text-gray-500">
                Recruiter Account
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="companyName"
              value={form.companyName}
              placeholder="Company Name"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="email"
              value={form.email}
              placeholder="Company Email"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="phone"
              value={form.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="website"
              value={form.website}
              placeholder="Website"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="industry"
              value={form.industry}
              placeholder="Industry"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="location"
              value={form.location}
              placeholder="Location"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            placeholder="Company Description"
            onChange={handleChange}
            rows={5}
            className="
              border
              p-3
              rounded-xl
              w-full
              mt-5
            "
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
            "
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>
        </div>
      </div>
 </main>   </div>
  );
}