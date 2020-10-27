import { Schema, model, Document } from "mongoose"

interface IUser extends Document {
  user: {
    name: string,
    coins: number
  },
  IDuser: string
}

const UserSchema = new Schema({
  user: {
    name: String,
    coins: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  IDuser: {
    type: String,
    required: true
  },
});

export default model<IUser>("User", UserSchema);
