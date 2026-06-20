"use client";

import Link from "next/link";
import DashboardButton from "@/components/common/DashboardButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function MentorSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">
      <DashboardButton href="/mentor/dashboard" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ⚙️ Mentor Settings
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your mentor account, preferences and portal settings.
        </p>
      </div>

      <div className="grid gap-6">

        {/* Account */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            👤 Mentor Account
          </h2>

          <div className="space-y-3">

            <Link
              href="/mentor/profile"
              className="block border dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Edit Profile
            </Link>

            <Link
              href="/forgot-password"
              className="block border dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Change Password
            </Link>

            <Link
              href="/mentor/profile"
              className="block border dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Update Email
            </Link>

          </div>
        </div>

        {/* Student Management */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            🎓 Student Management
          </h2>

          <div className="space-y-3">

            <Link
              href="/mentor/students"
              className="block border dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Assigned Students
            </Link>

            <Link
              href="/mentor/feedback"
              className="block border dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Student Feedback
            </Link>

          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            🔔 Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex justify-between items-center">
              <span>Student Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between items-center">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between items-center">
              <span>Feedback Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>

          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            🎨 Appearance
          </h2>

          <div className="flex items-center justify-between border dark:border-gray-700 rounded-xl p-4">

            <div>
              <h3 className="font-semibold dark:text-white">
                Theme
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between Light and Dark mode.
              </p>
            </div>

            <ThemeToggle />

          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            🔒 Security
          </h2>

          <div className="space-y-3">

            <div className="border dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold">
                Authentication
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                JWT Authentication Enabled
              </p>
            </div>

            <div className="border dark:border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold">
                Account Status
              </h3>

              <p className="text-sm text-green-600 mt-1">
                Active Mentor
              </p>
            </div>

          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            ℹ️ About
          </h2>

          <div className="space-y-2 text-gray-600 dark:text-gray-300">

            <p>
              <strong>Portal:</strong> Placement Cell Portal
            </p>

            <p>
              <strong>Role:</strong> Mentor
            </p>

            <p>
              <strong>Version:</strong> 1.0.0
            </p>

          </div>
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}