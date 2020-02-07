import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import { getCategories, getProductsByFilter } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "../components/fixedPrices";
import CheckboxPrice from "./CheckboxPrice";

const Products = () => {
  //set filter and fetch data later
  //productPageFilters is the select category data
  const [productPageFilters, setProductPageFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  //filteredResults is the product data by select
  const [filteredResults, setFilteredResults] = useState([]);

  //fetch all categories and set data to state and show in the checkbox
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

  //when click, change the page filter, set up what category user chick to filters ( like search function)
  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    const newFilters = { ...productPageFilters };

    productPageFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValue = handlePriceValue(filters);
      productPageFilters.filters[filterBy] = priceValue;
    }
    setProductPageFilters(newFilters);
    loadFilterResulte(productPageFilters.filters);

    //console.log(productPageFilters);
  };

  //get the price array data by select price id
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

  //load product data by search(check box),
  const loadFilterResulte = newFilter => {
    // console.log(newFilter);
    getProductsByFilter(skip, limit, newFilter).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        //console.log(filteredResults);
        // console.log(skip);
        // console.log(size);
        // console.log(limit);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getProductsByFilter(toSkip, limit, productPageFilters.filters).then(
      data => {
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults([...filteredResults, ...data.data]);
          setSize(data.size);
          setSkip(toSkip);
        }
      }
    );
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  return (
    <MainLayout
      title="Products Page"
      description="Australia PC Online Store"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-sm-8">
              <h4 className="checkbox__title">Filter by Categories</h4>
              <div className="checkbox__filter">
                <ul>
                  <Checkbox
                    categories={categories}
                    handleFilters={categoryfilters =>
                      handleFilters(categoryfilters, "category")
                    }
                  ></Checkbox>
                </ul>{" "}
              </div>
            </div>

            <div className="col-12 col-sm-4">
              <h4 className="checkbox__title" >By Prices</h4>
              <div className="checkbox__filter--price"> 
                <CheckboxPrice
                  prices={prices}
                  handleFilters={filters => handleFilters(filters, "price")}
                ></CheckboxPrice>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="homepage-subtitle">Products</div>

          <div className="sell-box">
            {filteredResults.map((product, i) => (
              <div key={i} className="">
                <Card key={i} product={product}></Card>
              </div>
            ))}
          </div>

          <hr />
          <div className="loadmore__button">
            {loadMoreButton()}
          </div>

        </div>
      </div>
    </MainLayout>
  );
};
export default Products;
