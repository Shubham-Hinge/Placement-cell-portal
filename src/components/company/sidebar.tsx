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
          border-r
          shadow-sm
          z-50
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Company Portal
          </h2>
        </div>

        <nav className="p-4 space-y-2">
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
                transition-all
                ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
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
            "
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}