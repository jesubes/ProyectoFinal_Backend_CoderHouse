import messagesModel from "../models/messages.Schema.js";

export default class MessageManager {
  constructor() {
    console.log("Trabajando sobre mongoDB Atlas en messages");
  }

  getAll = async () => {
    const messages = await messagesModel.find.lean();
    return messages;
  };

  saveMessage = async (message) => {
    let result = await messagesModel.create(message);
    return result;
  };
}
