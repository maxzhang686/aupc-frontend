import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { getCart } from "../components/cartHelper";
import Card from "../components/Card";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItemList = items => {
    return (
      <div>
        <h2>Your cart have {`${items.length}`} products</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            showCartUpdate={true}
          ></Card>
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/products">Continue shopping</Link>
    </h2>
  );

  return (
    <MainLayout
      title="My Cart"
      description="Australia PC Online Store"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItemList(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h3>Check out</h3>
        </div>
      </div>
    </MainLayout>
  );
};
export default Cart;
