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
      title="Welcome Aupc Online"
      description="Australia PC Online Store"
      className="container-fluid"
      // titlecss="p2"
      // descriptioncss="p2"
    >
      <h2 className="mb-4 homepage-subtitle">Best Sellers</h2>
      <div className="sell-box">
        {productsBySell.map((product, i) => (
          <div key={i} className="">
            <Card key={i} product={product}></Card>
          </div>
        ))}
      </div>

      <hr />
      <h2 className="mb-4 homepage-subtitle">New Arrival</h2>
      <div className="sell-box">
        {productsByArrival.map((product, i) => (
          <div
            key={i}
            className=""
          >
            <Card key={i} product={product}></Card>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
