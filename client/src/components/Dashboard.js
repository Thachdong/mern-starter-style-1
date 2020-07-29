import React from "react";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions/userActions";

const Dashboard = ({ logoutAction }) => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="container">
          <h4>Friends</h4>
          <h4>New Feeds</h4>
          <h4>Profile</h4>
        </div>
      </div>
      <div className="container">
        <div className="dashboard">
          <div className="dashboard__friends">Friends</div>
          <div className="dashboard__newfeeds">New Feeds</div>
          <div className="dashboard__profile">
            <div className="profile-box flex-box">
              <img src="https://via.placeholder.com/75" alt="Avatar" />
              <h4>Thach Dong</h4>
            </div>
            <div className="profile-box flex-box">
              <span>Email:</span>
              <span>thachdong270293@gmail.com</span>
            </div>
            <div className="profile-box flex-box">
              <span>Dept: </span>
              <span>IT software</span>
            </div>
            <div className="profile-box flex-box">
              <span>Position: </span>
              <span>Front-end Dev</span>
            </div>
            <div className="profile-box flex-box">
              <span>Seniority: </span>
              <span>132 days</span>
            </div>
            <div className="cta-box flex-box">
              <p>Profile</p>
              <p onClick={logoutAction}>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logoutAction,
};

export default connect(null, mapDispatchToProps)(Dashboard);
