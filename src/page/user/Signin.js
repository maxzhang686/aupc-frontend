import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import TitleLayout from "../../components/TitleLayout";
import { signin, authenticate, isAuthenticated } from "../../auth";

const Signin = () => {
  //state
  const [values, setValues] = useState({
    email: "max@gmail.com",
    password: "max666666",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  //grab the data
  const { email, password, error, loading, redirectToReferrer } = values;
  //identity is user or admin
  const { user } = isAuthenticated();

  //change the state values
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //click event and send data to backend with a function
  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    //sent the data to back end reset the form,... or send the err to state
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          onChange={handleChange("email")}
          type="text"
          className="form-control"
          value={email}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        ></input>
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  //after login go to other page
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashborad" />;
      }
      return <Redirect to="/user/dashborad" />;
    }
  };

  return (
    <TitleLayout
      title="SignIn page"
      description="Australia PC Online Store"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </TitleLayout>
  );
};

export default Signin;
