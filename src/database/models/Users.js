const { Schema, model } = require("mongoose");

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

module.exports = model("User", UserSchema);
