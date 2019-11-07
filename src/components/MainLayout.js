import React from "react";
import Menu from "./Menu";
import "../bootstrap.css";
import "../main.css";

const MainLayout = ({
  title = "Tile",
  description = "Description",
  className,
  children,
  titlecss
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2 className={`${titlecss}`}>{title}</h2>
      <p className={`${titlecss} lead`}>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default MainLayout;
