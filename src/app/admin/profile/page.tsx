"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProfilePage() {
  const [admin, setAdmin] =
    useState({
      name: "",
      email: "",
      role: "Admin",
      profileImage: "",
    });

  useEffect(() => {
    setAdmin({
      name:
        localStorage.getItem(
          "userName"
        ) || "Admin",

      email:
        localStorage.getItem(
          "userEmail"
        ) || "",

      role: "Administrator",

      profileImage:
        localStorage.getItem(
          "profileImage"
        ) || "",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* Dashboard Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          href="/admin/dashboard"
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
            transition-all
          "
        >
          🏠 Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
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
              Administration Portal
            </p>

            <h1 className="text-4xl font-bold">
              Admin Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage administrator account
              information.
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
            "
          >
            {admin.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto">

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            p-8
          "
        >
          <div className="flex items-center gap-6 mb-8">

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
              {admin.name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {admin.name}
              </h2>

              <p className="text-gray-500">
                {admin.role}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                value={admin.name}
                readOnly
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                value={admin.email}
                readOnly
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Role
              </label>

              <input
                value={admin.role}
                readOnly
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Account Status
              </label>

              <input
                value="Active"
                readOnly
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
              />
            </div>

          </div>

          <div className="mt-8 flex gap-4">

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
              "
            >
              Change Password
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href =
                  "/login";
              }}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
              "
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}