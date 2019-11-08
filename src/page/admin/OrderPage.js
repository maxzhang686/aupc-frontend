import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { listOrder } from "./apiAdmin";
import moment from "moment";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrder(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrderLength = () => {
    if (orders.length > 0) {
      return <h3 className="text-danger">Total Order : {orders.length}</h3>;
    } else {
      return <h3 className="text-danger">There is no order.</h3>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <MainLayout
      title="Order Page"
      description={`Australia PC Online Store`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrderLength()}
          {orders.map((order, orderIndex) => {
            return (
              <div
                className="mt-5"
                key={orderIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {order._id}</span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">{order.status}</li>
                  <li className="list-group-item">
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">
                    Ordered by: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on:{" "}
                    {moment(order.createdAt).format("Do MMMM  YYYY, h:mm:ss a")}
                  </li>

                  <li className="list-group-item">
                    Delivery address: {order.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {order.products.length}
                </h3>

                {order.products.map((product, productIndex) => (
                  <div
                    className="mb-4"
                    key={productIndex}
                    style={{
                      padding: "20px",
                      border: "1px solid indigo"
                    }}
                  >
                    {showInput("Product name", product.name)}
                    {showInput("Product price", product.price)}
                    {showInput("Product total", product.count)}
                    {showInput("Product Id", product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};
export default OrderPage;
