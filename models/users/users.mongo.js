const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      requires: true,
    },
    email: {
      type: String,
      requires: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 24,
      required: true,
    },
    apiKey: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = new model("User", UserSchema);
