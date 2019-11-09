import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { readProduct, relatedProductRead } from "./apiCore";
import CardProduct from "../components/CardProduct";
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
        {product && product.description && (
          <CardProduct
            product={product}
            showViewProductButton={false}
          ></CardProduct>
        )}
      </div>

      <hr></hr>

      <h2 className="mb-4 text-center">Related products</h2>
      <div className="row justify-content-md-center">
        {relatedProduct.map((product, i) => (
          <div key={i} className="mb-3 mr-2 ml-2">
            <Card key={i} product={product}></Card>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
export default ProductDetail;
