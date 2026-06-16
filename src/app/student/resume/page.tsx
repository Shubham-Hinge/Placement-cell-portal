"use client";

import Link from "next/link";
import DashboardButton from "@/components/common/DashboardButton";
export default function StudentResumePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <DashboardButton
    href="/student/dashboard"
  />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Resume Management
        </h1>

        <p className="text-gray-500 mt-2">
          Upload, manage, and improve your resume.
        </p>
      </div>

      {/* Resume Upload Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="
            block
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
          "
        />

        <button
          className="
            mt-4
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
          "
        >
          Upload Resume
        </button>
      </div>

      {/* Resume Score */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Resume Score
        </h2>

        <div className="text-6xl font-bold text-indigo-600">
          --
        </div>

        <p className="text-gray-500 mt-2">
          Resume score will appear after analysis.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-4">
          Resume Tips
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>✓ Keep your resume to 1–2 pages.</li>
          <li>✓ Add relevant technical skills.</li>
          <li>✓ Highlight projects and internships.</li>
          <li>✓ Use measurable achievements.</li>
          <li>✓ Keep formatting clean and ATS-friendly.</li>
        </ul>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/student/dashboard"
          className="
            inline-flex
            bg-gray-200
            hover:bg-gray-300
            px-5
            py-3
            rounded-xl
            font-medium
          "
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}