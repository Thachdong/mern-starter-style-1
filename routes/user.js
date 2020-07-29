const router = require("express-promise-router")();
const userControllers = require("../controllers/user");
const passport = require("passport");

//1. Register
router.post("/register", userControllers.register);
//2. Update
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  userControllers.update
);
//3. Login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userControllers.login
);
//4. Get user
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userControllers.getOne
);
//5. Get all user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userControllers.getAll
);
//6. Reset password
router.post("/reset-password", userControllers.resetPassword);
//7. Logout
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userControllers.logout
);

module.exports = router;
