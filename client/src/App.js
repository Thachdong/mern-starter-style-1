import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./routesConfig";
import LoginContainer from "./containers/LoginContainer";
import Dashboard from "./components/Dashboard";
import RegisterContainer from "./containers/RegisterContainer";
import ActiveUser from "./components/ActiveUser";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";

const App = ({ loading, user }) => (
  <Router>
    <Switch>
      <Route
        path="/"
        user={user}
        isPrivate={true}
        exact
        component={Dashboard}
      />
      <Route path="/login" isPrivate={false} component={LoginContainer} />
      <Route path="/register" isPrivate={false} component={RegisterContainer} />
      <Route
        path="/user/activate/:userId/:token"
        isPrivate={false}
        component={ActiveUser}
      />
      <Route
        path="/user/reset-password-request"
        isPrivate={false}
        component={ResetPasswordRequest}
      />
      <Route
        path="/user/reset-password"
        isPrivate={false}
        component={ResetPassword}
      />
      <Route component={NotFound} />
    </Switch>
    {loading && (
      <div className="preloader flex-box">
        <div></div>
      </div>
    )}
  </Router>
);

const mapStateToProps = ({ user }) => ({
  loading: user.isLoading,
  user: user.email,
});

export default connect(mapStateToProps, null)(App);
