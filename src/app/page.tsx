"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🎓 Placement Portal
            </h1>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/jobs"
                className="hover:text-blue-600 transition-colors"
              >
                Jobs
              </Link>

              <Link
                href="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hover:text-blue-600 transition-colors"
              >
                Register
              </Link>

              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700" />

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center text-white">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg mb-8">
            <span className="text-sm">
              🚀 Smart Campus Recruitment Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            Campus
            <span className="block text-blue-200">
              Placement Portal
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
            Connect students, recruiters, and placement officers
            through a modern recruitment ecosystem designed for
            seamless campus hiring.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              href="/register"
              className="
                px-8 py-4
                bg-white
                text-blue-700
                rounded-xl
                font-semibold
                shadow-xl
                hover:scale-105
                transition-all
              "
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="
                px-8 py-4
                rounded-xl
                border
                border-white/30
                bg-white/10
                backdrop-blur-lg
                font-semibold
                hover:bg-white/20
                transition-all
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Features
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Everything You Need
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            A complete placement management solution for
            students, recruiters, and administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Student */}
          <div
            className="
              group
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl mb-6">
              🎓
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Student Portal
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Create professional profiles, upload resumes,
              apply for opportunities, and track application
              progress in real time.
            </p>
          </div>

          {/* Company */}
          <div
            className="
              group
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl mb-6">
              🏢
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Company Portal
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Publish job openings, manage applicants,
              schedule interviews, and recruit top talent
              efficiently.
            </p>
          </div>

          {/* Admin */}
          <div
            className="
              group
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl mb-6">
              ⚙️
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Admin Portal
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitor placement activities, manage users,
              analyze recruitment data, and generate reports.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
