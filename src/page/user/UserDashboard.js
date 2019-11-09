import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { readPurchaseHistory } from "./apiUser";

//get the data from
const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role, address }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    readPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

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
              to={`/user/profile/${_id}`}
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
          <li className="list-group-item">Address: {address}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, hi) => {
              return (
                <div key={hi}>
                  <hr />
                  <h6>Order Id: {h._id}</h6>
                  {h.products.map((p, pi) => {
                    return (
                      <div key={pi}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>
                          Purchased date:{" "}
                          {moment(p.createdAt).format(
                            "Do MMMM  YYYY, h:mm:ss a"
                          )}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
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
          {purchaseHistory(history)}
        </div>
      </div>
    </MainLayout>
  );
};
export default Dashboard;
