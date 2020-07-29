import React, { useState } from "react";
import axios from "axios";

const ResetPasswordRequest = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();
    if (!email) return false;
    try {
      const result = await axios.post("/user/reset-password", { email });
      setStatus({ status: "success", message: result.data.message });
      console.log(result.data.message);
    } catch (error) {
      setStatus({ status: "error", message: error.response.data.message });
    }
  };
  return (
    <div className="login flex-box">
      <form className="flex-box" onSubmit={resetPassword}>
        <h3>Reset password request</h3>
        {status.status === "error" && <p className="error">{status.message}</p>}
        {status.status === "success" && (
          <p className="success">{status.message}</p>
        )}
        <div className="form-control flex-box">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default ResetPasswordRequest;
