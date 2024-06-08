"use client";
import React, { useEffect } from "react";

import Home from "../../components/home/home";
import fetchUserId from "../../utils/serverActions/userloginValidator";

const page = () => {
  
  useEffect(() => {
    fetchUserId().then((res) => {
      console.log(res);
    });
  }, []);

  return <Home />;
};

export default page;
