"use client";

import Link from "next/link";

export default function DashboardButton({
  href,
}: {
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        items-center
        gap-2
        bg-white
        border
        border-gray-200
        px-4
        py-2.5
        rounded-xl
        shadow-sm
        hover:bg-gray-50
        hover:shadow-md
        transition-all
        mb-6
        font-medium
      "
    >
      🏠 Dashboard
    </Link>
  );
}