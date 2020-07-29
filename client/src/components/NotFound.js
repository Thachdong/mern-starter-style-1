import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="page-not-found flex-box">
    Oooooop! Look like you run into unexist path
    <p>
      <Link to="/">Back To Home</Link>
    </p>
  </div>
);

export default NotFound;
