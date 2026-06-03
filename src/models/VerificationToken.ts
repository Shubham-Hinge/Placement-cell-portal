import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const VerificationTokenSchema =
  new Schema(
    {
      email: {
        type: String,
        required: true,
      },

      token: {
        type: String,
        required: true,
      },

      expiresAt: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  models.VerificationToken ||
  model(
    "VerificationToken",
    VerificationTokenSchema
  );