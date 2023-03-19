import mongoose from "mongoose";

const messageCollection = "messages";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: String,
});

const messagesModel = mongoose.model(messageCollection, messagesSchema);
export default messagesModel;
