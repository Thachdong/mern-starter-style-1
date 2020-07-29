const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: "UserName is required",
    },
    email: {
      type: String,
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    loginAt: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { timestamps: true }
);

//Hasing passowrd before saving on to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

//Method
UserSchema.methods = {
  verifyPassword: async function (plainPassword, next) {
    try {
      return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
