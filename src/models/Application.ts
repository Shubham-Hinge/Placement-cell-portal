import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const ApplicationSchema =
  new Schema(
    {
      jobId: {
        type:
          Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },

      studentId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      resumeUrl: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Applied",
          "Shortlisted",
          "Rejected",
          "Selected",
        ],
        default: "Applied",
      },
        interviewDate: {
  type: Date,
},

interviewTime: {
  type: String,
  default: "",
},

meetingLink: {
  type: String,
  default: "",
},
offerLetterUrl: {
  type: String,
  default: "",
},
    },
    {
      timestamps: true,
    }
  );

const Application =
  models.Application ||
  model(
    "Application",
    ApplicationSchema
  );

export default Application;