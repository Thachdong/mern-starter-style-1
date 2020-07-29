import React from "react";
import { Route, Redirect } from "react-router-dom";

export default (props) => {
  if (props.isPrivate) {
    return props.user ? <Route {...props} /> : <Redirect to="/login" />;
  }
  return <Route {...props} />;
};
