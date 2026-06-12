"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen
        bg-white
        text-black
        dark:bg-gray-950
        dark:text-white
      "
    >
      <header
        className="
          border-b
          bg-white
          dark:bg-gray-900
          dark:border-gray-700
          sticky
          top-0
          z-50
        "
      >
        <div className="max-w-7xl mx-auto px-4">

          <div className="h-16 flex items-center justify-between">

            <h1
              className="
                text-lg
                md:text-xl
                font-bold
                text-blue-700
              "
            >
              🎓 Placement Portal
            </h1>

            <nav className="flex items-center gap-4">

              <Link href="/">
                Home
              </Link>

              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>

              <ThemeToggle />

            </nav>

          </div>

        </div>
      </header>

      <section
        className="
          bg-blue-700
          text-white
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            py-20
            text-center
          "
        >
          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              mb-6
            "
          >
            Campus Placement Portal
          </h1>

          <p
            className="
              text-lg
              md:text-xl
              max-w-2xl
              mx-auto
              mb-8
            "
          >
            Connect Students,
            Companies and
            Placement Officers
            through one centralized
            placement platform.
          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >
            <Link
              href="/register"
              className="
                bg-white
                text-blue-700
                px-6
                py-3
                rounded-lg
                font-semibold
              "
            >
              Register
            </Link>

            <Link
              href="/login"
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
              "
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section
        className="
          max-w-7xl
          mx-auto
          py-20
          px-4
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-12
          "
        >
          Platform Features
        </h2>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >
          <div
            className="
              bg-white
              dark:bg-gray-900
              p-6
              rounded-xl
              shadow-lg
              border
              dark:border-gray-700
            "
          >
            <h3 className="font-bold text-xl mb-3">
              Student Portal
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Build profiles,
              upload resumes,
              apply for jobs and
              track applications.
            </p>
          </div>

          <div
            className="
              bg-white
              dark:bg-gray-900
              p-6
              rounded-xl
              shadow-lg
              border
              dark:border-gray-700
            "
          >
            <h3 className="font-bold text-xl mb-3">
              Company Portal
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Post jobs, manage
              applications and
              recruit qualified
              students.
            </p>
          </div>

          <div
            className="
              bg-white
              dark:bg-gray-900
              p-6
              rounded-xl
              shadow-lg
              border
              dark:border-gray-700
            "
          >
            <h3 className="font-bold text-xl mb-3">
              Admin Portal
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Manage placements,
              users, analytics
              and reports.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}