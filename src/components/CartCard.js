import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "../page/cartHelper";

const CartCard = ({
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
  const [count, setCount] = useState(product.count);

  const viewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn card__btn--view mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

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
          className="btn btn-outline-warning mt-2 mb-2"
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

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const cartUpdateButton = showCartUpdate => {
    return (
      showCartUpdate && (
        <div>
          <div className="input-group mb-3 mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const removeProductButton = showRemoveProduct => {
    return (
      showRemoveProduct && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          RemoveProduct
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="name card-header card-header__title">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}

        <ShowImage item={product} url="product"></ShowImage>
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>

        {showStock(product.quantity)}
        <br />

        {cartUpdateButton(showCartUpdate)}

        {viewButton(showViewProductButton)}

        {addToCartButton(showAddToCartButton)}

        {removeProductButton(showRemoveProduct)}
      </div>
    </div>
  );
};

export default CartCard;
