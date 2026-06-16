"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function SettingsPage() {
  const [admin, setAdmin] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [passwords, setPasswords] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/admin/profile?userId=${userId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setAdmin(
            data.admin
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(
          false
        );
      }
    };

  const changePassword =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/change-password",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                userId:
                  localStorage.getItem(
                    "userId"
                  ),
                ...passwords,
              }),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Password Updated"
          );

          setPasswords({
            currentPassword:
              "",
            newPassword:
              "",
          });
        } else {
          alert(
            data.message
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  const logout =
    () => {
      localStorage.clear();

      window.location.href =
        "/login";
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and system preferences.
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

          <div className="flex items-center gap-5">

            <div className="
              w-16
              h-16
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
            ">
              {admin?.name?.charAt(
                0
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {admin?.name}
              </h2>

              <p className="text-gray-500">
                {admin?.email}
              </p>

              <span className="
                inline-block
                mt-2
                px-3
                py-1
                bg-blue-100
                text-blue-700
                rounded-full
                text-sm
              ">
                Administrator
              </span>
            </div>

          </div>

        </div>

        {/* Change Password */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Change Password
          </h2>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwords.currentPassword
              }
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwords.newPassword
              }
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
              "
            />

            <button
              onClick={
                changePassword
              }
              className="
                px-6
                py-3
                rounded-xl
                bg-blue-600
                text-white
              "
            >
              Update Password
            </button>

          </div>

        </div>

        {/* System Info */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

          <h2 className="text-xl font-bold mb-4">
            System Information
          </h2>

          <div className="space-y-2 text-gray-600">

            <p>
              Version:
              <span className="font-semibold ml-2">
                1.0.0
              </span>
            </p>

            <p>
              Environment:
              <span className="font-semibold ml-2">
                Production
              </span>
            </p>

            <p>
              Module:
              <span className="font-semibold ml-2">
                Placement Portal
              </span>
            </p>

          </div>

        </div>

        {/* Logout */}

        <div>

          <button
            onClick={
              logout
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
            "
          >
            Logout
          </button>

        </div>

      </main>
    </div>
  );
}