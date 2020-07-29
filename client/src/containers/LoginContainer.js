import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/Login";
import { loginSchema } from "../validators";
import { loginAction } from "../redux/actions/userActions";

const LoginContainer = ({ loginAction, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    user.email && history.push("/");
  });

  const errorHandler = (errPath) => {
    errPath === "email" &&
      setError({ path: errPath, message: "Invalid email" });
    errPath === "password" &&
      setError({
        path: errPath,
        message:
          "Password must be 6 - 30 length, not contain special characters",
      });
  };

  const login = async (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    const validUser = loginSchema.validate(userInfo);
    if (validUser.error) {
      const errPath = validUser.error.details[0].path[0];
      errorHandler(errPath);
      return true;
    }
    setError(false);
    const user = await loginAction(userInfo);
    if (!user.success) {
      setError({ path: "server", message: user.err });
    } else {
      history.push("/");
    }
  };
  return (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      error={error}
      setPassword={setPassword}
      login={login}
    />
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  loginAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
