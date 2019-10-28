import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { signup } from "../../auth";

const Signup = () => {
  //state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  //grab the data
  const { name, email, password, error, success } = values;

  //change the state values
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //click event and send data to backend with a function
  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    //sent the data to back end reset the form,... or send the err to state
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        ></input>
      </div>

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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      The new account is created. Please <Link to="/signin">Sign in</Link>.
    </div>
  );

  return (
    <MainLayout
      title="SignUp page"
      description="Australia PC Online Store"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </MainLayout>
  );
};

export default Signup;
