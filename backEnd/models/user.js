const mongooose = require("mongoose");

const userSchema = new mongooose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "ADMIN", "SUPERADMIN"], // Restricts that role can only be customer, admin or superadmin.
    },
  },
  { timestamps: true }
);

const User = mongooose.model("User", userSchema);

module.exports = User;
