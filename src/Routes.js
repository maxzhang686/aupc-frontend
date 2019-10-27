import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./page/user/Signin";
import Signup from "./page/user/Signup";
import Home from "./page/Home";
import Menu from "./components/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./page/user/UserDashboard";
import AdminDashboard from "./page/user/AdminDashboard";
import AddCatagory from "./page/admin/AddCategory";
const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCatagory} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
