"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ResumeUploader() {
  const [uploading, setUploading] =
    useState(false);

  const [resumeUrl, setResumeUrl] =
    useState("");

  const onDrop = async (
    acceptedFiles: File[]
  ) => {
    const file = acceptedFiles[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "userId",
      localStorage.getItem("userId") || ""
    );

    try {
      const res =
        await fetch(
          "/api/student/upload-resume",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await res.json();

      if (data.success) {
        setResumeUrl(
          data.resumeUrl
        );

        alert(
          "Resume uploaded successfully."
        );
      } else {
        alert(
          data.message
        );
      }
    } catch {
      alert(
        "Upload failed."
      );
    }

    setUploading(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [
        ".pdf",
      ],
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-10
          text-center
          cursor-pointer
          transition

          ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300"
          }
        `}
      >
        <input
          {...getInputProps()}
        />

        <h2 className="text-2xl font-bold">
          Upload Resume
        </h2>

        <p className="mt-4 text-gray-500">
          Drag & Drop PDF here
        </p>

        <p className="text-gray-400 mt-2">
          or click to browse
        </p>

        {uploading && (
          <p className="mt-6 text-blue-600">
            Uploading...
          </p>
        )}

        {resumeUrl && (
          <div className="mt-6">
            <a
              href={resumeUrl}
              target="_blank"
              className="text-green-600 underline"
            >
              View Uploaded Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}