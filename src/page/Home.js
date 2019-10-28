import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { getProducts } from "./apiCore";
import Card from "../components/Card";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        return setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        return setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <MainLayout
      title="Home page"
      description="JR-Australia PC Online Store"
      className="container-fluid"
    >
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {" "}
        {productsBySell.map((product, i) => (
          <Card key={i} product={product}></Card>
        ))}
      </div>

      <hr />
      <h2 className="mb-4">New Arrival</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product}></Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
