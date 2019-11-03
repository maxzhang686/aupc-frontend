import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import { getCategories, getProductsByFilter } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "../components/fixedPrices";
import CheckboxPrice from "./CheckboxPrice";
import { compileFunction } from "vm";

const Products = () => {
  //set filter and fetch data later
  const [productPageFilters, setProductPageFilters] = useState({
    filters: { category: [], price: [] }
  });
  //state
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  //fetch all categories and set data to state
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilterResulte(skip, limit, productPageFilters.filters);
  }, []);

  //when click change the page filter
  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    //
    const newFilters = { ...productPageFilters };

    //
    productPageFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValue = handlePriceValue(filters);
      productPageFilters.filters[filterBy] = priceValue;
    }
    setProductPageFilters(newFilters);
    loadFilterResulte(productPageFilters.filters);
  };

  //get the price array data from the click price id
  const handlePriceValue = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
        //console.log(key);
      }
    }
    return array;
  };

  //load product data by search(check box)
  const loadFilterResulte = newFilter => {
    //console.log(newFilter);
    getProductsByFilter(skip, limit, newFilter).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data);
        // console.log(limit);
        // console.log(skip);
      }
    });
  };

  return (
    <MainLayout
      title="Products Page"
      description="JR-Australia PC Online Store"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={categoryfilters =>
                handleFilters(categoryfilters, "category")
              }
            ></Checkbox>
          </ul>

          <h4>Filter by Prices</h4>
          <div>
            <CheckboxPrice
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            ></CheckboxPrice>
          </div>
        </div>

        <div className="col-8">{JSON.stringify(filteredResults)}</div>
      </div>
    </MainLayout>
  );
};
export default Products;
