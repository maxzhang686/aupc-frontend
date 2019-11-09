import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  const removeProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <MainLayout
      title="Manage Product"
      description={`Manage all products!`}
      className="container"
    >
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {products.map((product, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                display="flex"
              >
                <strong>{product.name}</strong>
                <div>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <span className="badge badge-warning badge-pill mr-3">
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => removeProduct(product._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageProducts;
