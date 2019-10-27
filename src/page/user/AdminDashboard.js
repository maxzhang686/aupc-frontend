import React from "react";
import TitleLayout from "../../components/TitleLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

//get the data from
const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminLink = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Admin Link</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="nav-link"
              style={{ padding: 0 }}
              to="/create/category"
            >
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link"
              style={{ padding: 0 }}
              to="/creat/product"
            >
              Creat Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Admin Information</h4>
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

  return (
    <TitleLayout
      title="Admin Dashboard"
      description={`Hi ${name}! Welcome to AUPC Online Store`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{adminLink()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </TitleLayout>
  );
};
export default AdminDashboard;
