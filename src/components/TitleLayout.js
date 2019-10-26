import React from "react";

const TitleLayout = ({
  title = "Tile",
  description = "description",
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

export default TitleLayout;
