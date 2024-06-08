'use client';
import { useState } from "react";
import AddAssetForm from "../../../components/asset/addAssetForm";
import LinkForm from "../../../components/link/LinkForm";

export default function Page() {
  const [data,setData] = useState();
  console.log({data})
  
  return (
    <div className="flex bg-slate-100 w-full justify-center items-center min-h-screen">
      {
        data ? <AddAssetForm  data={data}/> :  <LinkForm  setData={setData}/>
      }
      
    </div>
  );
}
