import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img ">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3 "
      // style={{ maxHeight: "100%", maxWidth: "100%" }}
      style={{
        maxHeight: "211px",
        maxWidth: "231px",
        minHeight: "211px",
        minWidth: "231px"
      }}
    />
  </div>
);

export default ShowImage;
