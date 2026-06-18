import {
  Schema,
  model,
  models,
} from "mongoose";

const ChatSchema =
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      role: {
        type: String,
        enum: [
          "user",
          "assistant",
        ],
        required: true,
      },

      message: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  models.Chat ||
  model(
    "Chat",
    ChatSchema
  );