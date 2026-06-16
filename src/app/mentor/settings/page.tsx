"use client";

import MentorSidebar from "@/components/mentor/sidebar";

export default function MentorSettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <MentorSidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          <h1 className="text-3xl font-bold mb-4">
            Settings
          </h1>

          <p className="text-gray-500">
            Manage mentor account settings.
          </p>

        </div>
      </main>
    </div>
  );
}