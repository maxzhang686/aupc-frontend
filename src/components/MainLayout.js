import React from "react";
import Menu from "./Menu";
import "../bootstrap.css";
import "../main.css";

const MainLayout = ({
  title = "Tile",
  description = "Description",
  className,
  children,
  titlecss,
  descriptioncss
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2 className={`${titlecss} p2`}>{title}</h2>
      <p className={`${descriptioncss} p2 lead`}>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default MainLayout;
