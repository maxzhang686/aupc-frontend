import React, { useState, Fragment } from "react";

const CheckboxPrice = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((price, _id) => (
    <div key={_id}>
      <input
        onChange={handleChange}
        value={`${price._id}`}
        type="radio"
        className="mr-2 ml-4"
        name={price}
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));

  // <Fragment>
  //   {JSON.stringify(prices)}
  //   <input type="radio" className="mr-2 ml-4"></input>
  //   <label className="form-check-label">Name</label>
  // </Fragment>
};

export default CheckboxPrice;
