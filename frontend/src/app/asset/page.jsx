'use client';
import { useEffect, useState } from "react";
import AddAssetForm from "../../../components/asset/addAssetForm";
import LinkForm from "../../../components/link/LinkForm";
import { getCookies } from "../../../utils/cookies/getCookies";

export default function Page() {
  

  const [data,setData] = useState();
  console.log({data})

  const checkLogin = async()=>{
    const res = await getCookies('userinfo');
    if(!res){
      redirect("/login")
    }  
  }

  useEffect(()=>{
   checkLogin();
  },[])
  
  return (
    <div className="flex bg-slate-100 w-full justify-center items-center min-h-screen">
      {
        data ? <AddAssetForm  data={data}/> :  <LinkForm  setData={setData}/>
      }
      
    </div>
  );
}