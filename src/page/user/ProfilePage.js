import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { readProfile, updateProfile, updateLocalUser } from "./apiUser";

const Profile = props => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    error: false,
    success: false
  });
  //const [redirect, setRedirect] = useState(false);

  const { name, email, password, address, error, success } = userData;
  const { token } = isAuthenticated();

  const init = userId => {
    //console.log(userId);
    readProfile(userId, token).then(data => {
      if (data.error) {
        setUserData({ ...userData, error: true });
      } else {
        setUserData({
          ...userData,
          name: data.name,
          email: data.email,
          address: data.address
        });
      }
    });
  };

  const handleChang = name => event => {
    setUserData({ ...userData, error: false, [name]: event.target.value });
  };
  const clickSubmit = e => {
    e.preventDefault();
    updateProfile(props.match.params.userId, token, {
      name,
      email,
      password,
      address
    }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateLocalUser(data, () => {
          setUserData({
            ...userData,
            name: data.name,
            email: data.email,
            address: data.address,
            success: true
          });
        });
      }
    });
  };

  const shouldRedirect = success => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const profileUpdate = (name, email, password, address) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChang("name")}
            className="form-control"
            value={name}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">E-mail</label>
          <input
            type="text"
            onChange={handleChang("email")}
            className="form-control"
            value={email}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="text"
            onChange={handleChang("password")}
            className="form-control"
            value={password}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Address</label>
          <textarea
            onChange={handleChang("address")}
            className="form-control"
            value={address}
          ></textarea>
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          {" "}
          Submit
        </button>
      </form>
    );
  };

  return (
    <MainLayout
      title="Profile Update"
      description={`Hi ${name}! Please update your detail!`}
      className="container"
    >
      <div>
        {profileUpdate(name, email, password, address)}
        {shouldRedirect(success)}
      </div>
    </MainLayout>
  );
};
export default Profile;
