import React from "react";
import { Link } from "react-router-dom";

const Login = ({ email, setEmail, password, error, setPassword, login }) => (
  <div className="login flex-box">
    <form onSubmit={login} className="flex-box">
      <h3>Welcome to ThachDong chat app</h3>
      {error.path === "server" && <p className="error">{error.message}</p>}
      <div className="form-control flex-box">
        <label htmlFor="email">
          Email:
          {error.path === "email" && (
            <span className="error"> ({error.message})</span>
          )}
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control flex-box">
        <label htmlFor="password">
          Password:
          {error.path === "password" && (
            <span className="error"> ({error.message})</span>
          )}
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-control">
        <button type="submit">Login</button>
      </div>
      <p>
        You not have account yet? <Link to="/register">Create one</Link>
      </p>
      <p>
        Forgot password?{" "}
        <Link to="/user/reset-password-request">Reset password</Link>
      </p>
    </form>
  </div>
);

export default Login;
