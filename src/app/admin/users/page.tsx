"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function AdminUsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const loadUsers =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/users"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setUsers(
            data.users
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleUser =
    async (
      id: string,
      status: boolean
    ) => {
      try {
        await fetch(
          "/api/admin/users",
          {
            method:
              "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId: id,
              isActive:
                !status,
            }),
          }
        );

        loadUsers();
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const deleteUser =
    async (
      id: string
    ) => {
      if (
        !confirm(
          "Delete this user?"
        )
      )
        return;

      try {
        await fetch(
          `/api/admin/users?userId=${id}`,
          {
            method:
              "DELETE",
          }
        );

        loadUsers();
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const activeUsers =
    users.filter(
      (u) =>
        u.isActive
    ).length;

  const disabledUsers =
    users.filter(
      (u) =>
        !u.isActive
    ).length;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage platform users, roles and account status.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <p className="text-gray-500">
              Total Users
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {users.length}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <p className="text-gray-500">
              Active Users
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {activeUsers}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <p className="text-gray-500">
              Disabled Users
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {disabledUsers}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-200
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {/* Users Table */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {loading ? (
            <div className="p-10 text-center">
              Loading Users...
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="p-4 text-left">
                      User
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map(
                    (
                      user
                    ) => (
                      <tr
                        key={
                          user._id
                        }
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4">

                          <div className="flex items-center gap-4">

                            <div
                              className="
                                w-12
                                h-12
                                rounded-full
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                                font-bold
                              "
                            >
                              {user.name?.charAt(
                                0
                              )}
                            </div>

                            <div>

                              <p className="font-semibold">
                                {
                                  user.name
                                }
                              </p>

                              <p className="text-sm text-gray-500">
                                {
                                  user.email
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="p-4">

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              text-sm
                            "
                          >
                            {
                              user.role
                            }
                          </span>

                        </td>

                        <td className="p-4">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              ${
                                user.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            {user.isActive
                              ? "Active"
                              : "Disabled"}
                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                toggleUser(
                                  user._id,
                                  user.isActive
                                )
                              }
                              className={`
                                px-4
                                py-2
                                rounded-xl
                                text-white
                                ${
                                  user.isActive
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-green-600 hover:bg-green-700"
                                }
                              `}
                            >
                              {user.isActive
                                ? "Disable"
                                : "Enable"}
                            </button>

                            <button
                              onClick={() =>
                                deleteUser(
                                  user._id
                                )
                              }
                              className="
                                px-4
                                py-2
                                rounded-xl
                                bg-red-600
                                hover:bg-red-700
                                text-white
                              "
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}