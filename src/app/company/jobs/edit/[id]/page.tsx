"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditJobPage() {
  const { id } =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      location: "",
      salary: "",
      skills: "",
      jobType: "",
      lastDate: "",
    });

  useEffect(() => {
    const loadJob =
      async () => {
        const res =
          await fetch(
            `/api/jobs/${id}`
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          const job =
            data.job;

          setForm({
            title:
              job.title,
            description:
              job.description,
            location:
              job.location,
            salary:
              job.salary,
            skills:
              job.skills.join(
                ", "
              ),
            jobType:
              job.jobType,
            lastDate:
              new Date(
                job.lastDate
              )
                .toISOString()
                .split("T")[0],
          });
        }
      };

    loadJob();
  }, [id]);

  const handleChange = (
    e: any
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await fetch(
            `/api/jobs/${id}`,
            {
              method:
                "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  ...form,
                  skills:
                    form.skills
                      .split(",")
                      .map(
                        (
                          s
                        ) =>
                          s.trim()
                      ),
                }
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Job Updated Successfully"
          );

          router.push(
            "/company/jobs"
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

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Edit Job
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          name="title"
          value={
            form.title
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          value={
            form.description
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
          rows={5}
        />

        <input
          name="location"
          value={
            form.location
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <input
          name="salary"
          value={
            form.salary
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <input
          name="skills"
          value={
            form.skills
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <select
          name="jobType"
          value={
            form.jobType
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        >
          <option>
            Full Time
          </option>

          <option>
            Internship
          </option>

          <option>
            Part Time
          </option>

          <option>
            Remote
          </option>
        </select>

        <input
          type="date"
          name="lastDate"
          value={
            form.lastDate
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <button
          type="submit"
          disabled={
            loading
          }
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Updating..."
            : "Update Job"}
        </button>
      </form>
    </div>
  );
}