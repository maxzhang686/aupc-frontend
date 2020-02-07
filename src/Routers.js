import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./page/user/Signin";
import Signup from "./page/user/Signup";
import Home from "./page/Home";
//import Menu from "./components/Menu";
import NewMenu from "./components/NewMenu";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./page/user/UserDashboard";
import Profile from "./page/user/ProfilePage";
import AdminDashboard from "./page/user/AdminDashboard";
import AddCatagory from "./page/admin/AddCategory";
import AddProduct from "./page/admin/AddProduct";
import Products from "./page/ProductsPage";
import ProductDetail from "./page/ProductDetail";
import Cart from "./page/CartPgae";
import OrderPage from "./page/admin/OrderPage";
import ManageProducts from "./page/admin/ManageProductsPage";
import UpdateProduct from "./page/admin/UpdateProduct";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.css";
import "./main.scss"
//import "./main.css";

const Routers = () => {
  return (
    <BrowserRouter>
      <NewMenu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={ProductDetail} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user/profile/:userId" exact component={Profile} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCatagory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={OrderPage} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Routers;
