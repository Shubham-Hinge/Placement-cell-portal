"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import DashboardButton from "@/components/common/DashboardButton";

export default function StudentSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">

      <DashboardButton href="/student/dashboard" />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ⚙️ Settings
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your account, preferences and application settings.
        </p>
      </div>

      <div className="grid gap-6">

        {/* Account */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            👤 Account
          </h2>

          <div className="space-y-3">
  <Link
  href="/student/profile"
  className="block border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
>
  Edit Profile
</Link>
          <Link
  href="/forgot-password"
  className="block border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
>
  Change Password
</Link>

          <Link
  href="/forgot-password"
  className="block border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
>
  Change Password
</Link>

          </div>
        </div>

        {/* Resume */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            📄 Resume
          </h2>

          <div className="space-y-3">

            <Link
              href="/student/resume"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Manage Resume
            </Link>

            <button className="w-full text-left border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
              View Resume
            </button>

          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            🔔 Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between">
              <span>Job Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <span>Interview Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" />
            </label>

          </div>
        </div>

        {/* AI */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            🤖 AI Settings
          </h2>

          <div className="space-y-3">

            <Link
              href="/student/assistant"
              className="block border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Open Career Assistant
            </Link>

            <button className="w-full text-left border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
              Clear AI Chat History
            </button>

          </div>
        </div>

        {/* Appearance */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🎨 Appearance
  </h2>

  <div className="flex items-center justify-between border rounded-xl p-4 dark:border-gray-700">
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Theme
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Switch between Light and Dark mode.
      </p>
    </div>

    <ThemeToggle />
  </div>
</div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow p-6">

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