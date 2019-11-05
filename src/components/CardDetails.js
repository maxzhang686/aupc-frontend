import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product, ShowViewProductButton = true }) => {
  const ShowViewButton = ShowViewProductButton => {
    return (
      ShowViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showAddToCart = () => {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2">Add to cart</button>
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="name card-header ">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product"></ShowImage>
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>

        {showStock(product.quantity)}
        <br />

        {ShowViewButton(ShowViewProductButton)}
        {showAddToCart()}
      </div>
    </div>
  );
};

export default Card;
