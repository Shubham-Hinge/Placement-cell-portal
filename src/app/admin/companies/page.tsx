"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";

export default function CompaniesPage() {
  const [companies, setCompanies] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/companies"
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setCompanies(
            data.companies
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const filteredCompanies =
    companies.filter(
      (company) =>
        company.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        company.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Companies
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered companies.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <p className="text-gray-500">
              Total Companies
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {companies.length}
            </h2>

          </div>

          <div className="bg-green-100 rounded-3xl p-6">

            <p className="text-gray-600">
              Active Companies
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {companies.length}
            </h2>

          </div>

          <div className="bg-blue-100 rounded-3xl p-6">

            <p className="text-gray-600">
              Company Accounts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {companies.length}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">

          <input
            type="text"
            placeholder="Search company..."
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

        {/* Table */}

        {loading ? (
          <div className="bg-white rounded-3xl p-10 text-center">
            Loading Companies...
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="p-4 text-left">
                      Company
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-left">
                      Joined
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCompanies.length >
                  0 ? (
                    filteredCompanies.map(
                      (
                        company
                      ) => (
                        <tr
                          key={
                            company._id
                          }
                          className="
                            border-t
                            hover:bg-gray-50
                          "
                        >

                          <td className="p-4">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  w-12
                                  h-12
                                  rounded-xl
                                  bg-indigo-600
                                  text-white
                                  flex
                                  items-center
                                  justify-center
                                  font-bold
                                "
                              >
                                {company.name?.charAt(
                                  0
                                )}
                              </div>

                              <div>

                                <p className="font-semibold">
                                  {
                                    company.name
                                  }
                                </p>

                                <p className="text-sm text-gray-500">
                                  Company Account
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="p-4">

                            <a
                              href={`mailto:${company.email}`}
                              className="
                                text-blue-600
                                hover:underline
                              "
                            >
                              {
                                company.email
                              }
                            </a>

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
                                company.role
                              }
                            </span>

                          </td>

                          <td className="p-4">

                            {company.createdAt
                              ? new Date(
                                  company.createdAt
                                ).toLocaleDateString()
                              : "-"}

                          </td>

                        </tr>
                      )
                    )
                  ) : (
                    <tr>

                      <td
                        colSpan={4}
                        className="
                          p-10
                          text-center
                          text-gray-500
                        "
                      >
                        No companies found.
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}