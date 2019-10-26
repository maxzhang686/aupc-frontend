import React from "react";
import TitleLayout from "../components/TitleLayout";
import { API } from "../config";

const Signup = () => {
  return (
    <TitleLayout title="SignUp page" description="Aupc Online Store">
      .{API}
      {process.env.REACT_APP_API_URL}
    </TitleLayout>
  );
};

export default Signup;
