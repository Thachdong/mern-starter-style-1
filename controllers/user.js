const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { sendEmail } = require("../helpers");

const register = async (req, res, next) => {
  //Input
  const { userName, email, password } = req.body;
  const isExistUser = await User.findOne({ email });
  //1. Check user is exist?
  if (isExistUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already exist",
      data: null,
    });
  }
  //2. Create user
  const user = new User({ userName, email, password });
  await user.save();
  //3. Sending email
  const token = jwt.sign(
    { _id: user._id, fromEmail: true },
    process.env.JWT_SECRET
  );
  const url = `${process.env.CLIENT_URL}/user/activate/${user._id}/${token}`;
  const mailOptions = {
    from: process.env.CLIENT_EMAIL,
    to: user.email,
    subject: "Verify email",
    html: `<p>To verify email for ${process.env.CLIENT_URL}, please click to link below: <a href=${url}>${url}</a></p>`,
  };
  sendEmail(mailOptions);
  //Output
  return res.status(200).json({
    success: true,
    message: "Register success",
    data: null,
  });
};

const update = async (req, res, next) => {
  //Jwt authorization
  //Update user
  let updateInfo = req.body;
  const user = req.user;
  if (updateInfo.hasOwnProperty("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updateInfo.password, salt);
    updateInfo.password = hashedPassword;
  }
  await User.findOneAndUpdate({ _id: user._id }, updateInfo);

  //Output
  res.status(203).json({
    success: true,
    message: "User update successfully",
    data: null,
  });
};

const login = async (req, res, next) => {
  const user = req.user;
  //Sign token
  const token = jwt.sign(
    { _id: user._id, loginAt: user.loginAt },
    process.env.JWT_SECRET
  );
  //Output
  return res.status(200).json({
    success: true,
    message: "Login success",
    data: { ...user._doc, password: null, token },
  });
};

const getOne = async (req, res, next) => {
  //Jwt authorization
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "User found",
    data: { ...user._doc, password: null },
  });
};

const getAll = async (req, res, next) => {
  const user = req.user;
  const users = await User.find({});
  const plainUsers = users.map((user) => ({ ...user._doc, password: null }));
  res.status(200).json({
    success: true,
    message: "Get users success",
    data: plainUsers,
  });
};

const resetPassword = async (req, res, next) => {
  //Input
  const { email } = req.body;
  //1. Check email is exist?
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Unregister email",
      data: null,
    });
  }
  //2. Sign token
  const token = jwt.sign(
    { _id: user._id, fromEmail: true },
    process.env.JWT_SECRET
  );
  //3. Sending an email
  const url = `${process.env.CLIENT_URL}/user/reset-password/${user._id}/${token}`;
  const mailOptions = {
    from: process.env.CLIENT_EMAIL,
    to: user.email,
    subject: "Reset password",
    html: `<p>To reset password for ${process.env.CLIENT_URL}, please click to link below: <a href=${url}>${url}</a></p>`,
  };
  sendEmail(mailOptions);
  //Output
  return res.status(200).json({
    success: true,
    message: "We have send you an email for resetpassword",
    data: null,
  });
};

const logout = async (req, res, next) => {
  const user = req.user;
  await User.findByIdAndUpdate(user._id, { loginAt: 0 });
  res.status(200).json({
    success: true,
    message: "Logout success",
    data: null,
  });
};

module.exports = {
  register,
  update,
  login,
  getOne,
  resetPassword,
  logout,
  getAll,
};
