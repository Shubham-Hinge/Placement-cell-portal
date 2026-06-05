"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AnalyticsPage() {
  const [
    analytics,
    setAnalytics,
  ] = useState<any>(
    null
  );

  useEffect(() => {
    const load =
      async () => {
        const companyId =
          localStorage.getItem(
            "userId"
          );

        const res =
          await fetch(
            `/api/company/analytics?companyId=${companyId}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          setAnalytics(
            data.analytics
          );
        }
      };

    load();
  }, []);

  if (!analytics) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Company Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded p-6">
          <h2>Total Jobs</h2>
          <p className="text-3xl">
            {
              analytics.totalJobs
            }
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Active Jobs</h2>
          <p className="text-3xl">
            {
              analytics.activeJobs
            }
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Applications</h2>
          <p className="text-3xl">
            {
              analytics.totalApplications
            }
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Shortlisted</h2>
          <p className="text-3xl">
            {
              analytics.shortlisted
            }
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Selected</h2>
          <p className="text-3xl">
            {
              analytics.selected
            }
          </p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Rejected</h2>
          <p className="text-3xl">
            {
              analytics.rejected
            }
          </p>
        </div>

      </div>

    </div>
  );
}