"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MentorSidebar() {
  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/mentor/dashboard",
      icon: "🏠",
    },
    {
      name: "Profile",
      href: "/mentor/profile",
      icon: "👤",
    },
    {
      name: "Students",
      href: "/mentor/students",
      icon: "🎓",
    },
    {
      name: "Sessions",
      href: "/mentor/sessions",
      icon: "📅",
    },
    {
      name: "Analytics",
      href: "/mentor/analytics",
      icon: "📊",
    },
    {
      name: "Settings",
      href: "/mentor/settings",
      icon: "⚙️",
    },
  ];

  return (
    <>
      {/* Mobile Menu */}

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
          border-gray-100
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
        {/* Header */}

        <div className="p-6 border-b">

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-12
                w-12
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                flex
                items-center
                justify-center
                text-xl
              "
            >
              🎓
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Mentor Portal
              </h2>

              <p className="text-sm text-gray-500">
                Career Guidance
              </p>
            </div>
          </div>

        </div>

        {/* Menu */}

        <div
          className="
            overflow-y-auto
            h-[calc(100vh-170px)]
            p-4
            space-y-2
          "
        >
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

                  ${
                    pathname ===
                    item.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                <span>
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>
              </Link>
            )
          )}
        </div>

        {/* Logout */}

        <div className="absolute bottom-0 w-full p-4 border-t bg-white">

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
            "
          >
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}