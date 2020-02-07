import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "../page/cartHelper";

const CardProduct = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showCartUpdate = false,
  showRemoveProduct = false,
  // default value of function
  setRun = f => f,
  // default value of undefined
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addToCartButton = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn card__btn--add mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge card__stock badge-pill">In Stock</span>
    ) : (
      <span className="badge card__stock badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className="productdetailbox">
      <div className="col-12">
        <div className="row">
          {shouldRedirect(redirect)}
          <div className="col-md-6 text-center">
            <ShowImage item={product} url="product"></ShowImage>
          </div>
          <div className="col-md-6">
            <h3 className="text-center text-danger">{product.name}</h3>
            <h4 className="text-center">{product.description}</h4>
            <p className=" text-center black-10">${product.price}</p>
            <p className="text-center black-9">
              Category: {product.category && product.category.name}
            </p>
            <div className="text-center">{showStock(product.quantity)}</div>
          </div>
        </div>
        <br />
        <hr />
        <p className="lead mt-2">{product.fulldescription}</p>

        {addToCartButton(showAddToCartButton)}
      </div>
    </div>
  );
};

export default CardProduct;
