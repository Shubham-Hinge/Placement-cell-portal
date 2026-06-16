import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const MentorProfileSchema =
  new Schema(
    {
      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      fullName: String,

      email: String,

      phone: String,

      designation: String,

      company: String,

      experience: String,

      expertise: [String],

      bio: String,

      linkedin: String,

      profileImage: String,
    },
    {
      timestamps: true,
    }
  );

export default
  models.MentorProfile ||
  model(
    "MentorProfile",
    MentorProfileSchema
  );