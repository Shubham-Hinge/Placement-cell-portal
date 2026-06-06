"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminUsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const loadUsers =
    async () => {
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
    };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleUser =
    async (
      id: string,
      status: boolean
    ) => {
      await fetch(
        "/api/admin/users",
        {
          method: "PATCH",
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
    };

  const deleteUser =
    async (
      id: string
    ) => {
      if (
        !confirm(
          "Delete User?"
        )
      )
        return;

      await fetch(
        `/api/admin/users?userId=${id}`,
        {
          method:
            "DELETE",
        }
      );

      loadUsers();
    };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        User Management
      </h1>

      <div className="grid gap-4">

        {users.map(
          (user) => (
            <div
              key={
                user._id
              }
              className="
                bg-white
                shadow
                rounded
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2 className="font-bold">
                  {
                    user.name
                  }
                </h2>

                <p>
                  {
                    user.email
                  }
                </p>

                <p>
                  Role:
                  {" "}
                  {
                    user.role
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  {user.isActive
                    ? "Active"
                    : "Disabled"}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    toggleUser(
                      user._id,
                      user.isActive
                    )
                  }
                  className="
                    bg-yellow-500
                    text-white
                    px-4
                    py-2
                    rounded
                  "
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
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Delete
                </button>

              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}