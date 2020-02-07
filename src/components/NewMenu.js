import React, { Fragment } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "../page/cartHelper";
import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fc85ae" };
  } else {
    return { color: "#ffffff" };
  }
};

const NewMenu = ({ history }) => (
  <div className="">
    <Fragment>
      <div className="navbar-box">
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar-maxwidth">
          <Navbar.Brand href="/" id="navbar-brand" >AUPC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink
                className="nav-link"
                style={isActive(history, "/")}
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="nav-link"
                style={isActive(history, "/products")}
                to="/products"
              >
                Products
              </NavLink>

              <NavLink
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                Cart{" "}
                <sup>
                  <small className="cart-badge">{itemTotal()}</small>
                </sup>
              </NavLink>

              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <NavLink
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Dashboard
                </NavLink>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Fragment>
                  <NavLink
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                  >
                    UserDetail
                  </NavLink>

                  <NavLink
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                  >
                    AdminDashboard
                  </NavLink>
                </Fragment>
              )}
            </Nav>
            <Nav>
              {!isAuthenticated() && (
                <Fragment>
                  <NavLink
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Signin
                  </NavLink>

                  <NavLink
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer", color: "#ffffff" }}
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                    >
                      Signout
                    </span>
                  </li>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Fragment>
  </div>
);

export default withRouter(NewMenu);
