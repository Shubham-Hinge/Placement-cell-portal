"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "🏠",
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: "👤",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: "👥",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: "📊",
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: "🏢",
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: "🎓",
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: "💼",
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: "📄",
    },
    {
  name: "Assign Mentors",
  href: "/admin/assign-mentor",
  icon: "🧑‍🏫",
},
    {
      name: "Placements",
      href: "/admin/placements",
      icon: "🎯",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: "📑",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-white
          shadow-lg
          rounded-xl
          px-3
          py-2
        "
      >
        ☰
      </button>

      {/* Overlay */}

      {open && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          md:static
          top-0
          left-0
          h-screen
          w-72
          bg-white
          border-r
          border-gray-200
          shadow-lg
          z-50
          flex
          flex-col
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}

        <div className="p-6 border-b border-gray-200">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xl
                  font-bold
                  shadow-md
                "
              >
                A
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Admin Portal
                </h2>

                <p className="text-xs text-gray-500">
                  Placement Management
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="
                md:hidden
                text-xl
              "
            >
              ✕
            </button>

          </div>

        </div>

        {/* Admin Card */}

        <div className="p-4">

          <div
            className="
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              p-4
              text-white
            "
          >
            <p className="text-sm opacity-80">
              Logged in as
            </p>

            <h3 className="font-bold text-lg">
              Administrator
            </h3>

            <p className="text-xs opacity-80 mt-1">
              System Control Panel
            </p>
          </div>

        </div>

        {/* Scrollable Menu */}

        <div className="flex-1 overflow-y-auto px-4 pb-6">

          <nav className="space-y-2">

            {menuItems.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      pathname.startsWith(
                        item.href
                      )
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span className="font-medium">
                    {item.name}
                  </span>
                </Link>
              )
            )}

          </nav>

        </div>

        {/* Footer */}

        <div className="border-t border-gray-200 p-4">

          <button
            onClick={() => {
              localStorage.clear();

              window.location.href =
                "/login";
            }}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              py-3
              rounded-xl
              font-medium
              transition-all
            "
          >
            Logout
          </button>

          <div className="mt-4 text-center">

            <p className="text-xs text-gray-400">
              Placement Portal
            </p>

            <p className="text-xs text-gray-400">
              Version 1.0.0
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}