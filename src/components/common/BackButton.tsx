"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        flex
        items-center
        gap-2
        bg-white
        border
        border-gray-200
        px-4
        py-2
        rounded-xl
        shadow-sm
        hover:shadow-md
        hover:bg-gray-50
        transition-all
        mb-6
      "
    >
      <span className="text-lg">
        ←
      </span>

      <span>
        Back
      </span>
    </button>
  );
}