import React from "react";
import Home from "../../components/home/home";
import { getCookies } from "../../utils/cookies/getCookies";
import { redirect } from "next/navigation";

const page = async() => {
    const res = await getCookies('userinfo');
    if(!res){
      redirect("/login")
    }
 
  return <Home />;
};

export default page;
