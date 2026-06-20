import {
  Schema,
  model,
  models,
} from "mongoose";

const ResumeAnalysisSchema =
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      // Used to avoid re-analyzing the same resume
      resumeUrl: {
        type: String,
        default: "",
      },

      atsScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      summary: {
        type: String,
        default: "",
      },

      strengths: [
        {
          type: String,
        },
      ],

      weaknesses: [
        {
          type: String,
        },
      ],

      missingSkills: [
        {
          type: String,
        },
      ],

      suggestions: [
        {
          type: String,
        },
      ],

      keywordsFound: [
        {
          type: String,
        },
      ],

      analyzedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const ResumeAnalysis =
  models.ResumeAnalysis ||
  model(
    "ResumeAnalysis",
    ResumeAnalysisSchema
  );

export default ResumeAnalysis;