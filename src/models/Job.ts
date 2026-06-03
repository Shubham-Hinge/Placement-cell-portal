import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const JobSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    skills: [
      {
        type: String,
      },
    ],

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Internship",
        "Part Time",
        "Remote",
      ],
      default: "Full Time",
    },

    lastDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job =
  models.Job ||
  model("Job", JobSchema);

export default Job;