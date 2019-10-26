import React from "react";
import TitleLayout from "../components/TitleLayout";
import { API } from "../config";
const Home = () => {
  return (
    <TitleLayout title="Home page" description="Aupc Online Store">
      {API}
    </TitleLayout>
  );
};

export default Home;
