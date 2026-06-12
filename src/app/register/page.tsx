"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        alert(
          data.message
        );
        return;
      }

      alert(
        "Registration successful. Please login."
      );

      router.push(
        "/login"
      );
    } catch (error) {
      console.error(
        error
      );

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        dark:bg-gray-950
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-gray-900
          border
          border-gray-200
          dark:border-gray-700
          rounded-xl
          shadow-lg
          p-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
            text-gray-900
            dark:text-white
          "
        >
          Register
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-gray-400
            "
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-gray-400
            "
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-gray-400
            "
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          <select
            name="role"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
            "
            value={
              formData.role
            }
            onChange={
              handleChange
            }
          >
            <option value="student">
              Student
            </option>

            <option value="company">
              Company
            </option>

            <option value="mentor">
              Mentor
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            type="submit"
            disabled={
              loading
            }
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              p-3
              rounded
            "
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}