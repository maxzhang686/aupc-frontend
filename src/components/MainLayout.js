import React from "react";
import Menu from "./Menu";
import "../bootstrap.css";
import "../main.css";

const MainLayout = ({
  title = "Tile",
  description = "Description",
  className,
  children
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default MainLayout;
