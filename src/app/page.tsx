"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Campus Placement Portal
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-8">
            Connect Students, Companies and
            Placement Officers through one
            centralized placement platform.
          </p>

          <div className="flex justify-center gap-4">

            <Link
              href="/register"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
            >
              Login
            </Link>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-3">
              Student Portal
            </h3>

            <p>
              Build profiles, upload resumes,
              apply for jobs and track
              applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-3">
              Company Portal
            </h3>

            <p>
              Post jobs, manage applications
              and recruit qualified students.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-3">
              Admin Portal
            </h3>

            <p>
              Manage placements, users,
              analytics and reports.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}