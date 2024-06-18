import React, { Suspense } from "react";
import Home from "../../components/home/home";
import { getCookies } from "../../utils/cookies/getCookies";
import { redirect } from "next/navigation";
import Provider from "../../components/Providers/provider";

const page = async () => {
  // const res = await getCookies('userinfo');
  // if(!res){
  //   redirect("/login")
  // }

  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
      <Home />
      </Suspense>
    </Provider>
  );
};

export default page;
