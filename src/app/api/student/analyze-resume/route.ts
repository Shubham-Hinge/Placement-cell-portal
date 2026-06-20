 
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import { extractPDFText } from "@/lib/pdf";
import { model } from "@/lib/gemini";

import StudentProfile from "@/models/StudentProfile";
import ResumeAnalysis from "@/models/ResumeAnalysis";

const AnalysisSchema = z.object({
  atsScore: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  missingSkills: z.array(z.string()),
  suggestions: z.array(z.string()),
  keywordsFound: z.array(z.string()),
});

async function analyzeResume(text: string) {
  const prompt = `
You are an expert ATS Resume Analyzer.

Return ONLY valid JSON.

{
  "atsScore":0,
  "summary":"",
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestions":[],
  "keywordsFound":[]
}

Rules:
- ATS score must be between 0 and 100.
- Return valid JSON only.
- No markdown.
- No explanation.

Resume:
${text}
`;

  let lastError: unknown;

  for (let i = 0; i < 2; i++) {
    try {
      const result = await model.generateContent(prompt);

      const raw = result.response
        .text()
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(raw);
      return AnalysisSchema.parse(parsed);
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    const profile = await StudentProfile.findOne({ userId });

    if (!profile?.resumeUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume not found. Please upload your resume first.",
        },
        { status: 404 }
      );
    }

    const cached = await ResumeAnalysis.findOne({ userId });

    if (cached && cached.resumeUrl === profile.resumeUrl) {
      return NextResponse.json({
        success: true,
        cached: true,
        analysis: cached,
      });
    }

    const response = await axios.get(profile.resumeUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
    });

  const contentType = String(
  response.headers["content-type"] ?? ""
).toLowerCase();

if (!contentType.includes("application/pdf")) {
  return NextResponse.json(
    {
      success: false,
      message: "Uploaded file is not a valid PDF.",
    },
    {
      status: 400,
    }
  );
}

    const buffer = Buffer.from(response.data);

    if (buffer.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Downloaded PDF is empty.",
        },
        { status: 400 }
      );
    }

    if (buffer.subarray(0, 5).toString() != "%PDF-") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid PDF file.",
        },
        { status: 400 }
      );
    }

    let resumeText = await extractPDFText(buffer);

    resumeText = resumeText
      .replace(/\u0000/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (resumeText.length < 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume contains little readable text.",
        },
        { status: 400 }
      );
    }

    if (resumeText.length > 8000) {
      resumeText = resumeText.substring(0, 8000);
    }

    const analysis = await analyzeResume(resumeText);

    const saved = await ResumeAnalysis.findOneAndUpdate(
      { userId },
      {
        userId,
        resumeUrl: profile.resumeUrl,
        ...analysis,
        analyzedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      cached: false,
      analysis: saved,
    });
  } catch (error: any) {
    console.error("Resume Analysis Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Resume analysis failed.",
      },
      {
        status: 500,
      }
    );
  }
}
