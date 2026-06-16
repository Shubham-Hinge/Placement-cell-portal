import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const CompanySchema =
  new Schema(
    {
      userId: {
        type: String,
        required: true,
        unique: true,
      },

      companyName: String,

      email: String,

      phone: String,

      website: String,

      industry: String,

      location: String,

      description: String,

      logo: String,
    },
    {
      timestamps: true,
    }
  );

export default models.Company ||
  model(
    "Company",
    CompanySchema
  );