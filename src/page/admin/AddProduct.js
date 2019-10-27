import React, { useState, useEffect } from "react";
import TitleLayout from "../../components/TitleLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  //????
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-outline-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
            required
          />
        </div>

        <div className="form-group">
          <label className="">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
            required
          />
        </div>

        <div className="form-group">
          <label className="">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option value="5da6a91201abb6138933afd7">CPU</option>
            <option value="5da6a91201abb6138933afd7">CPU1</option>
          </select>
        </div>

        <div className="form-group">
          <label className="">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
            required
          />
        </div>

        <div className="form-group">
          <label className="">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option value="0">NO</option>
            <option value="1">YES</option>
          </select>
        </div>
        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
  };

  return (
    <TitleLayout
      title="Add a New Category"
      description={`Hi ${user.name}, Let's create a new product!`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </TitleLayout>
  );
};
export default AddProduct;
