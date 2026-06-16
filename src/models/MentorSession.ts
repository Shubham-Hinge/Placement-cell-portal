import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const MentorSessionSchema =
  new Schema(
    {
      mentorId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      studentName: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      sessionDate: {
        type: Date,
        required: true,
      },

      sessionTime: {
        type: String,
        required: true,
      },

      meetingLink: {
        type: String,
        default: "",
      },

      notes: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Scheduled",
          "Completed",
          "Cancelled",
        ],
        default: "Scheduled",
      },
    },
    {
      timestamps: true,
    }
  );

export default
  models.MentorSession ||
  model(
    "MentorSession",
    MentorSessionSchema
  );