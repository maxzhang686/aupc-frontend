import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { readProduct, relatedProductRead } from "./apiCore";
import Card from "../components/Card";

const ProductDetail = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const localSingleProduct = productId => {
    readProduct(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //after get the data and id, fetch related products
        relatedProductRead(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    localSingleProduct(productId);
  }, [props]);

  return (
    <MainLayout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} ShowViewProductButton={false}></Card>
          )}
        </div>
      </div>
      <hr></hr>
      <h2 className="mb-4">Related products</h2>
      <div className="row">
        {relatedProduct.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card key={i} product={product}></Card>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
export default ProductDetail;
