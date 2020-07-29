import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ActiveUser = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const activeHandle = async (e) => {
    e.preventDefault();
    const path = history.location.pathname.split("/");
    const pathLength = path.length;
    const token = path[pathLength - 1];
    try {
      setIsLoading(true);
      await axios.patch(
        `/user`,
        { isVerify: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLoading(false);
      history.push("/login");
    } catch (error) {
      setIsLoading(false);
      setError({ message: error.response.data.message });
    }
  };
  return (
    <div className="login flex-box">
      {isLoading && (
        <div className="preloader">
          <div></div>
        </div>
      )}
      <form className="flex-box" onSubmit={activeHandle}>
        <h3>
          For activating your account, please click the active button below
        </h3>
        <button type="submit">Active</button>
        {error && (
          <p className="error" style={{ textAlign: "center" }}>
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ActiveUser;
