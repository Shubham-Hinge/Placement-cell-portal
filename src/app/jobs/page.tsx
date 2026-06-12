"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Job {
  _id: string;
  companyName: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
  jobType: string;
  lastDate: string;
}

export default function JobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res =
        await fetch("/api/jobs");

      const data =
        await res.json();

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 const handleApply = () => {
  const userRole =
    localStorage.getItem(
      "userRole"
    );

  if (!userRole) {
    setShowModal(true);
    return;
  }

  if (userRole !== "student") {
    alert(
      "Only students can apply for jobs."
    );
    return;
  }

  // Future application API call
  alert(
    "Application submitted successfully."
  );
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">

      <div className="max-w-6xl mx-auto">

        <h1
          className="
            text-4xl
            font-bold
            mb-8
            text-center
            text-gray-900
            dark:text-white
          "
        >
          Available Jobs
        </h1>

        {jobs.length === 0 ? (
          <div
            className="
              text-center
              text-gray-500
              dark:text-gray-400
            "
          >
            No Jobs Available
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="
                  bg-white
                  dark:bg-gray-900
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                "
              >
                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {job.title}
                </h2>

                <p
                  className="
                    mt-2
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Company:
                  {" "}
                  {job.companyName}
                </p>

                <p
                  className="
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Location:
                  {" "}
                  {job.location}
                </p>

                <p
                  className="
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Salary:
                  {" "}
                  {job.salary}
                </p>

                <p
                  className="
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Type:
                  {" "}
                  {job.jobType}
                </p>

                <p
                  className="
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Skills:
                  {" "}
                  {job.skills.join(", ")}
                </p>

                <button
                  onClick={handleApply}
                  className="
                    mt-4
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-2
                    rounded-lg
                  "
                >
                  Apply
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

      {showModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-white
              dark:bg-gray-900
              rounded-xl
              p-6
              max-w-md
              w-full
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-4
                dark:text-white
              "
            >
              Login Required
            </h2>

            <p
              className="
                mb-6
                text-gray-600
                dark:text-gray-300
              "
            >
              Please login or register
              to apply for jobs.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  router.push(
                    "/login"
                  )
                }
                className="
                  flex-1
                  bg-blue-600
                  text-white
                  py-2
                  rounded
                "
              >
                Login
              </button>

              <button
                onClick={() =>
                  router.push(
                    "/register"
                  )
                }
                className="
                  flex-1
                  border
                  py-2
                  rounded
                  dark:text-white
                "
              >
                Register
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}