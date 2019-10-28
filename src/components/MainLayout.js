import React from "react";
import "../main.css";
import Menu from "./Menu";

const MainLayout = ({
  title = "Tile",
  description = "Description",
  className,
  children
}) => (
  <div>
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default MainLayout;
