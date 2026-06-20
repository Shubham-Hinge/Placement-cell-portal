"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CompanySidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/company/dashboard",
      icon: "🏠",
    },
    {
      name: "Profile",
      href: "/company/profile",
      icon: "🏢",
    },
    {
      name: "Create Job",
      href: "/company/jobs/create",
      icon: "➕",
    },
    {
      name: "Manage Jobs",
      href: "/company/jobs",
      icon: "💼",
    },
    {
      name: "Applications",
      href: "/company/applications",
      icon: "👥",
    },
    {
      name: "Analytics",
      href: "/company/analytics",
      icon: "📊",
    },
    {
      name: "Settings",
      href: "/company/settings",
      icon: "⚙️",
    },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-white
          dark:bg-gray-900
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
          onClick={() => setOpen(false)}
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
          w-64
          bg-white
          dark:bg-gray-900
          border-r
          dark:border-gray-800
          shadow-sm
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
        {/* Logo */}
        <div className="p-6 border-b dark:border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Company Portal
          </h2>
        </div>

        {/* Scrollable Navigation */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-4
            pb-24
            scrollbar-thin
            scrollbar-thumb-gray-300
            dark:scrollbar-thumb-gray-700
          "
        >
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  font-medium
                  transition-all
                  duration-200
                  ${
                    pathname === item.href
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Fixed Logout */}
        <div className="border-t dark:border-gray-800 p-4 flex-shrink-0 bg-white dark:bg-gray-900">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
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
        </div>
      </aside>
    </>
  );
}