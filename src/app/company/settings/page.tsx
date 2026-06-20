"use client";

import Link from "next/link";
import DashboardButton from "@/components/common/DashboardButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function CompanySettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">
      <DashboardButton href="/company/dashboard" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ⚙️ Company Settings
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your company account, recruitment preferences and portal
          settings.
        </p>
      </div>

      <div className="grid gap-6">

        {/* Account */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            🏢 Company Account
          </h2>

          <div className="space-y-3">
            <Link
              href="/company/profile"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Edit Company Profile
            </Link>

            <Link
              href="/forgot-password"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Change Password
            </Link>

            <Link
              href="/company/profile"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Update Company Email
            </Link>
          </div>
        </div>

        {/* Recruitment */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            💼 Recruitment
          </h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between">
              <span>Accept Applications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <span>Interview Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

          </div>
        </div>

        {/* Jobs */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-5">
            📢 Job Management
          </h2>

          <div className="space-y-3">
            <Link
              href="/company/jobs"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Manage Posted Jobs
            </Link>

            <Link
              href="/company/jobs/create"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Create New Job
            </Link>
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

            <div className="border rounded-xl p-4 dark:border-gray-700">
              <h3 className="font-semibold">
                Authentication
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                JWT Authentication Enabled
              </p>
            </div>

            <div className="border rounded-xl p-4 dark:border-gray-700">
              <h3 className="font-semibold">
                Data Protection
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Company information is securely stored.
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
              <strong>Version:</strong> 1.0.0
            </p>

            <p>
              <strong>Role:</strong> Company
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