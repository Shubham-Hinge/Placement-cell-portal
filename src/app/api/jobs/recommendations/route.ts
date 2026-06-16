import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Job from "@/models/Job";
import StudentProfile from "@/models/StudentProfile";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const userId =
      searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
        },
        { status: 400 }
      );
    }

    const profile =
      await StudentProfile.findOne({
        userId,
      });

    if (!profile) {
      return NextResponse.json({
        success: true,
        recommendations: [],
      });
    }

    const studentSkills =
      profile.skills.map(
        (skill: string) =>
          skill.toLowerCase()
      );

    const jobs =
      await Job.find({
        isActive: true,
      });

    const recommendations =
      jobs
        .map((job) => {
          const requiredSkills =
            job.skills.map(
              (skill: string) =>
                skill.toLowerCase()
            );

          const matched =
            requiredSkills.filter(
              (skill: string) =>
                studentSkills.includes(
                  skill
                )
            );

          const score =
            requiredSkills.length > 0
              ? Math.round(
                  (matched.length /
                    requiredSkills.length) *
                    100
                )
              : 0;
const missingSkills =
  requiredSkills.filter(
    (skill: string) =>
      !studentSkills.includes(
        skill
      )
  );

return {
  _id: job._id,
  title: job.title,
  companyName: job.companyName,
  location: job.location,

  score,

  matchedSkills:
    matched,

  missingSkills,
};
           
        })
        .sort(
          (a, b) =>
            b.score - a.score
        )
        .slice(0, 5);

    return NextResponse.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load recommendations",
      },
      { status: 500 }
    );
  }
}