import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCatagory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = event => {
    event.preventDefault();
    setError();
    setSuccess(false);

    //make reques to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>

          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          ></input>
        </div>

        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <MainLayout
      title="Add a New Category"
      description={`Hi ${user.name}, Let's create a new category!`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </MainLayout>
  );
};
export default AddCatagory;
