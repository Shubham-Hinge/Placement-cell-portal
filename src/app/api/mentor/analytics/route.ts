import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import StudentProfile from "@/models/StudentProfile";
import ResumeAnalysis from "@/models/ResumeAnalysis";
import Application from "@/models/Application";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const mentorId =
      req.nextUrl.searchParams.get("mentorId");

    if (!mentorId) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const students =
      await StudentProfile.find({
        mentorId,
      }).lean();

    const studentIds =
      students.map((student) => student.userId);

    const applications =
      await Application.find({
        studentId: {
          $in: studentIds,
        },
      }).lean();

    const analyses =
      await ResumeAnalysis.find({
        userId: {
          $in: studentIds,
        },
      }).lean();

    const users =
      await User.find({
        _id: {
          $in: studentIds,
        },
      })
        .select("name email")
        .lean();

    const totalStudents =
      students.length;

    const profileCompleted =
      students.filter(
        (student) =>
          student.profileCompleted
      ).length;

    const resumeUploaded =
      students.filter(
        (student) =>
          student.resumeUrl
      ).length;

    const applicationsCount =
      applications.length;

    const shortlisted =
      applications.filter(
        (application) =>
          application.status ===
          "Shortlisted"
      ).length;

    const selected =
      applications.filter(
        (application) =>
          application.status ===
          "Selected"
      ).length;

    const rejected =
      applications.filter(
        (application) =>
          application.status ===
          "Rejected"
      ).length;

    const applied =
      applications.filter(
        (application) =>
          application.status ===
          "Applied"
      ).length;

    const averageCGPA =
      students.length === 0
        ? 0
        : (
            students.reduce(
              (sum, student) =>
                sum +
                (student.cgpa || 0),
              0
            ) / students.length
          ).toFixed(2);

    const averageResumeScore =
      analyses.length === 0
        ? 0
        : (
            analyses.reduce(
              (sum, analysis) =>
                sum +
                analysis.atsScore,
              0
            ) / analyses.length
          ).toFixed(0);

    const topSkills: Record<
      string,
      number
    > = {};

   students.forEach((student: any) => {
  if (
    Array.isArray(student.skills)
  ) {
    student.skills.forEach(
      (skill: string) => {
        topSkills[skill] =
          (topSkills[skill] || 0) + 1;
      }
    );
  }
});
    const skillDistribution =
      Object.entries(topSkills)
        .sort(
          (a, b) => b[1] - a[1]
        )
        .slice(0, 10)
        .map(
          ([skill, count]) => ({
            skill,
            count,
          })
        );

    const topStudents =
      users.map((user) => {
        const profile =
          students.find(
            (student) =>
              student.userId.toString() ===
              user._id.toString()
          );

        const analysis =
          analyses.find(
            (resume) =>
              resume.userId.toString() ===
              user._id.toString()
          );

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          cgpa:
            profile?.cgpa || 0,
          resumeScore:
            analysis?.atsScore || 0,
        };
      })
        .sort(
          (a, b) =>
            b.resumeScore -
            a.resumeScore
        )
        .slice(0, 5);

    const attentionStudents =
      users
        .map((user) => {
          const profile =
            students.find(
              (student) =>
                student.userId.toString() ===
                user._id.toString()
            );

          const analysis =
            analyses.find(
              (resume) =>
                resume.userId.toString() ===
                user._id.toString()
            );

          return {
            id: user._id,
            name: user.name,
            profileCompleted:
              profile?.profileCompleted,
            resumeUploaded:
              !!profile?.resumeUrl,
            resumeScore:
              analysis?.atsScore || 0,
          };
        })
        .filter(
          (student) =>
            !student.profileCompleted ||
            !student.resumeUploaded ||
            student.resumeScore <
              60
        );

    return NextResponse.json({
      success: true,

      analytics: {
        totalStudents,

        profileCompleted,

        resumeUploaded,

        averageResumeScore,

        averageCGPA,

        totalApplications:
          applicationsCount,

        applied,

        shortlisted,

        selected,

        rejected,

        topStudents,

        attentionStudents,

        skillDistribution,
      },
    });
  } catch (error) {
    console.error(
      "MENTOR ANALYTICS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load mentor analytics.",
      },
      {
        status: 500,
      }
    );
  }
}