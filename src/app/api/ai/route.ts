import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { model } from "@/lib/gemini";

import StudentProfile from "@/models/StudentProfile";
import Job from "@/models/Job";
import Chat from "@/models/Chat";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const {
      message,
      userId,
    } = await req.json();

    if (userId) {
      await Chat.create({
        userId,
        role: "user",
        message,
      });
    }

    let profileContext = "";

    if (userId) {
      const profile =
        await StudentProfile.findOne({
          userId,
        });

      if (profile) {
        const jobs =
          await Job.find({
            isActive: true,
          });

        const skills =
          profile.skills || [];

        const matchedJobs =
          jobs.filter((job) =>
            job.skills.some(
              (skill: string) =>
                skills.includes(skill)
            )
          );

        profileContext = `
Student Information

Name: ${profile.fullName}

College: ${profile.college}

Course: ${profile.course}

CGPA: ${profile.cgpa}

Skills:
${skills.join(", ")}

Resume Uploaded:
${profile.resumeUrl ? "Yes" : "No"}

GitHub:
${profile.github || "Not Added"}

LinkedIn:
${profile.linkedin || "Not Added"}

Matched Jobs:
${matchedJobs.length}
`;
      }
    }

   const prompt = `
You are an AI Career Assistant for a Placement Cell Portal.

Rules:
- Answer in Markdown format.
- Use headings where appropriate.
- Use bullet points.
- Use numbered lists when explaining steps.
- Highlight important words in **bold**.
- Use code blocks only if programming examples are needed.
- Keep answers professional and concise.
- Base your answers on the student's profile.
- Never invent profile information.

${profileContext}

Student Question:

${message}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const reply =
      result.response.text();

    if (userId) {
      await Chat.create({
        userId,
        role: "assistant",
        message: reply,
      });
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "AI request failed",
      },
      {
        status: 500,
      }
    );
  }
}