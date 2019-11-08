import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { getCart } from "./cartHelper";
import Card from "../components/Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

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
            showRemoveProduct={true}
            setRun={setRun}
            run={run}
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
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </MainLayout>
  );
};
export default Cart;
