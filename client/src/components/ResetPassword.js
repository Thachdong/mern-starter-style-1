import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { passwordSchema } from "../validators";

const ResetPassword = () => {
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const history = useHistory();
  const path = history.location.pathname.split("/");
  let token = path[path.length - 1];
  const resetPassword = async (e) => {
    e.preventDefault();
    const validPassword = passwordSchema.validate({ password, repeatPassword });
    if (password !== repeatPassword) {
      setStatus({
        status: "error",
        message: "Repeat password not match",
      });
      return true;
    }
    if (validPassword.error) {
      setStatus({
        status: "error",
        message: "Password must be alphanum, 6 - 30 length",
      });
      return true;
    }
    try {
      const result = await axios.patch(
        "/user",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus({ status: "success", message: result.data.message });
      console.log(result.data.message);
      history.push("/login");
    } catch (error) {
      setStatus({ status: "error", message: error.response.data.message });
    }
  };
  return (
    <div className="login flex-box">
      <form className="flex-box" onSubmit={resetPassword}>
        <h3>Reset password</h3>
        {status.status === "error" && <p className="error">{status.message}</p>}
        {status.status === "success" && (
          <p className="success">{status.message}</p>
        )}
        <div className="form-control flex-box">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control flex-box">
          <label htmlFor="repeatPassword">Repeat New Password</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            placeholder="Enter repeat password"
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
