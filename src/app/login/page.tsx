"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
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

      localStorage.setItem(
        "userId",
        data.user.id
      );

      localStorage.setItem(
        "userName",
        data.user.name
      );

      localStorage.setItem(
        "userRole",
        data.user.role
      );

      console.log(
        "LOGIN SUCCESS",
        data
      );

      setTimeout(() => {
        if (
          data.user.role ===
          "student"
        ) {
          window.location.href =
            "/student/dashboard";
        } else if (
          data.user.role ===
          "company"
        ) {
          window.location.href =
            "/company/dashboard";
        } else if (
          data.user.role ===
          "mentor"
        ) {
          window.location.href =
            "/mentor/dashboard";
        } else if (
          data.user.role ===
          "admin"
        ) {
          window.location.href =
            "/admin/dashboard";
        }
      }, 500);
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      alert(
        "Login failed"
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
          bg-white
          dark:bg-gray-900
          shadow-lg
          rounded-xl
          p-8
          w-full
          max-w-md
          border
          border-gray-200
          dark:border-gray-700
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
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-gray-400
              p-3
              rounded
            "
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-gray-400
              p-3
              rounded
            "
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <div className="text-right">
            <a
              href="/forgot-password"
              className="
                text-blue-600
                dark:text-blue-400
                hover:underline
              "
            >
              Forgot Password?
            </a>
          </div>

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
              transition
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}