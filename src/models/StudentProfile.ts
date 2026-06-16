import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const StudentProfileSchema =
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      // NEW
      mentorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      fullName: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      college: {
        type: String,
        default: "",
      },

      course: {
        type: String,
        default: "",
      },

      specialization: {
        type: String,
        default: "",
      },

      graduationYear: {
        type: Number,
      },

      cgpa: {
        type: Number,
      },

      skills: [
        {
          type: String,
        },
      ],

      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      portfolio: {
        type: String,
        default: "",
      },

      resumeUrl: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        default: "",
      },

      profileCompleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const StudentProfile =
  models.StudentProfile ||
  model(
    "StudentProfile",
    StudentProfileSchema
  );

export default StudentProfile;