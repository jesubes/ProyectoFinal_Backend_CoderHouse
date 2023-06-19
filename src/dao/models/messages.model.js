import mongoose from "mongoose";

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {versionKey: false}
);

const messageModel = mongoose.model(messagesCollection, messageSchema);
export default messageModel;
