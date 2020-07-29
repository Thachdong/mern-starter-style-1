const passport = require("passport");
const LocalStraregy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

passport.use(
  new LocalStraregy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      let user = await User.findOne({ email });
      if (!user) return done(new Error("Unregister email"), false);
      const isValidPassword = await user.verifyPassword(password, done);
      if (!isValidPassword) return done(new Error("Password wrong"), false);
      if (!user.isVerify) {
        return done(new Error("Email has not verified yet"), false);
      }
      user.loginAt = new Date().getTime();
      await user.save();
      return done(null, user);
    }
  )
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  new JwtStrategy(jwtOpts, async (payload, done) => {
    const user = await User.findById(payload._id);
    console.log("1");
    if (!user) {
      return done(new Error("User not found"), false);
    }
    console.log("out");
    if (payload.fromEmail) {
      console.log("in");
      return done(null, user);
    }
    if (user.loginAt !== payload.loginAt) {
      return done(new Error("Expire token"), false);
    }
    if (!user.isVerify) {
      return done(new Error("Email has not verified yet"), false);
    }
    return done(null, user);
  })
);
