"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardButton from "@/components/common/DashboardButton";

export default function StudentResumePage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [resumeUrl, setResumeUrl] =
    useState("");

  const [analyzing, setAnalyzing] =
    useState(false);

  const [analysis, setAnalysis] =
    useState<any>(null);

  const loadResumeData = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      if (!userId) return;

      const res = await fetch(
        `/api/student/resume?userId=${userId}`
      );

      const data =
        await res.json();

      if (data.success) {
        if (data.resumeUrl) {
          setResumeUrl(
            data.resumeUrl
          );
        }

        if (data.analysis) {
          setAnalysis(
            data.analysis
          );
        }
      }
    } catch (error) {
      console.error(
        "Load Resume Error:",
        error
      );
    }
  };

  useEffect(() => {
    loadResumeData();
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "userId",
        localStorage.getItem(
          "userId"
        ) || ""
      );

      const res = await fetch(
        "/api/student/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const text =
        await res.text();

      let data;

      try {
        data =
          JSON.parse(text);
      } catch {
        console.error(
          "API Response:",
          text
        );

        alert(
          "Server error. Check terminal."
        );

        return;
      }

      if (data.success) {
        setResumeUrl(
          data.resumeUrl
        );

        // Clear previous analysis
        // because a new resume
        // has been uploaded.
        setAnalysis(null);

        // Reload latest data
        await loadResumeData();

        alert(
          "Resume uploaded successfully."
        );
      } else {
        alert(
          data.message
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const analyzeResume = async () => {
    try {
      setAnalyzing(true);

      const userId =
        localStorage.getItem(
          "userId"
        );

      const res = await fetch(
        "/api/student/analyze-resume",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const text =
        await res.text();

      console.log(
        "API Response:",
        text
      );

      let data;

      try {
        data =
          JSON.parse(text);
      } catch {
        console.error(
          "Server Response:",
          text
        );

        alert(
          "Internal Server Error. Check the terminal."
        );

        return;
      }

      if (data.success) {
        setAnalysis(
          data.analysis
        );

        // Reload latest
        // saved analysis
        await loadResumeData();
      } else {
        alert(
          data.message
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Resume analysis failed."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <DashboardButton
        href="/student/dashboard"
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Resume Management
        </h1>

        <p className="mt-2 text-gray-500">
          Upload, manage, and improve your
          resume.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (
              e.target.files &&
              e.target.files.length > 0
            ) {
              setFile(
                e.target.files[0]
              );
            }
          }}
          className="
            block
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
          "
        />

        <div className="flex gap-4 mt-4 flex-wrap">
          <button
            onClick={uploadResume}
            disabled={
              !file || uploading
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

          <button
            onClick={
              analyzeResume
            }
            disabled={
              analyzing ||
              !resumeUrl
            }
            className="
              bg-green-600
              hover:bg-green-700
              disabled:bg-gray-400
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
            "
          >
            {analyzing
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>
        </div>

        {resumeUrl && (
          <div className="mt-6">
            <p className="text-green-600 font-medium">
              Resume uploaded
              successfully!
            </p>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </div>
        )}
      </div>

      {/* Resume Score */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Resume Score
        </h2>

        <div className="text-6xl font-bold text-indigo-600">
          {analysis
            ? analysis.atsScore
            : "--"}
        </div>

        <p className="mt-2 text-gray-500">
          ATS Resume Score
        </p>
      </div>

      {/* AI Resume Analysis */}
      {analysis && (
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            AI Resume Analysis
          </h2>

          <div className="mb-6">
            <h3 className="font-bold">
              Summary
            </h3>

            <p className="mt-2 text-gray-600">
              {analysis.summary}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-green-600">
              Strengths
            </h3>

            <ul className="list-disc ml-6 mt-2">
              {(analysis.strengths ?? []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-red-600">
              Weaknesses
            </h3>

            <ul className="list-disc ml-6 mt-2">
              {(analysis.weaknesses ?? []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-orange-600">
              Missing Skills
            </h3>

            <ul className="list-disc ml-6 mt-2">
              {(analysis.missingSkills ?? []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-purple-600">
              Keywords Found
            </h3>

            <div className="flex flex-wrap gap-2 mt-3">
              {(analysis.keywordsFound ?? []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    className="
                      bg-indigo-100
                      text-indigo-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-blue-600">
              Suggestions
            </h3>

            <ul className="list-disc ml-6 mt-2">
              {(analysis.suggestions ?? []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Resume Tips */}
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-4">
          Resume Tips
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>
            ✓ Keep your resume to 1–2 pages.
          </li>

          <li>
            ✓ Add relevant technical
            skills.
          </li>

          <li>
            ✓ Highlight projects and
            internships.
          </li>

          <li>
            ✓ Use measurable
            achievements.
          </li>

          <li>
            ✓ Keep formatting clean and
            ATS-friendly.
          </li>
        </ul>
      </div>
    </div>
  );
}