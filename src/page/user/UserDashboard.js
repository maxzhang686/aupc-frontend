import React from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

//get the data from
const Dashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLink = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Link</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" style={{ padding: 0 }} to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link"
              style={{ padding: 0 }}
              to="/profilr/update"
            >
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const orderHistory = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Order history</h4>
        <ul className="list-group">
          <li className="list-group-item">history1</li>
        </ul>
      </div>
    );
  };

  return (
    <MainLayout
      title="UserDashboard"
      description={`Hi ${name}! Welcome to AUPC Online Store`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLink()}</div>
        <div className="col-9">
          {userInfo()}
          {orderHistory()}
        </div>
      </div>
    </MainLayout>
  );
};
export default Dashboard;
