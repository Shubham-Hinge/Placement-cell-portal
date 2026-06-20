   "use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {

  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div
                className="
                  h-11
                  w-11
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                "
              >
                🎓
              </div>

              <div>
                <h1 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">
                  Placement Portal
                </h1>

                <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
                  Smart Campus Recruitment Platform
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="
                md:hidden
                h-11
                w-11
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                shadow-sm
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          <aside
            className="
              fixed
              top-0
              right-0
              w-72
              h-screen
              bg-white
              dark:bg-slate-900
              shadow-2xl
              z-50
              p-6
              md:hidden
            "
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">
                Menu
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <nav className="space-y-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🏠 Home
              </Link>

              <Link
                href="/jobs"
                onClick={() => setOpen(false)}
                className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                💼 Jobs
              </Link>

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🔐 Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                📝 Register
              </Link>

              <div className="border-t dark:border-slate-700 mt-6 pt-6 flex items-center justify-between">
                <span className="font-medium">
                  Theme
                </span>

                <ThemeToggle />
              </div>
            </nav>
          </aside>
        </>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700" />

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 text-center text-white">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg mb-8">
            🚀 Smart Campus Recruitment Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
            Campus
            <span className="block text-blue-200">
              Placement Portal
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed">
            Connect students, recruiters and placement officers
            through a modern recruitment ecosystem designed for
            seamless campus hiring.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
            <Link
              href="/register"
              className="
                px-8
                py-4
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
                px-8
                py-4
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
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
  <div className="max-w-7xl mx-auto px-6 py-8">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

      {/* Branding */}

      <div>
        <h3 className="text-xl font-bold">
          🎓 Placement Portal
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Smart Campus Recruitment Platform
        </p>
      </div>

      {/* Developer */}

      <div className="text-center">

        <h4 className="font-semibold text-lg">
          Developed by
        </h4>

        <p className="mt-2 text-xl font-bold text-blue-600">
          Shubham Hinge
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Full Stack Developer
        </p>

      </div>

      {/* Version */}

      <div className="text-center md:text-right">

        <p className="font-semibold">
          Placement Portal
          <span className="text-blue-600">
            {" "}v1.0.0
          </span>
        </p>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          © 2026 Shubham Hinge. All Rights Reserved.
        </p>

      </div>

    </div>

  </div>
</footer>
    </main>
  );
}
