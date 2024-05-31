'use client';
import { useState } from "react";
import AssetForm from "./form";
import LinkForm from "./LinkForm";

export default function Page() {
  const [data,setData] = useState();

  return (
    <div className="flex bg-slate-100 w-full justify-center items-center min-h-screen">
      {
        data ? <AssetForm  data={data}/> :  <LinkForm  setData={setData}/>
      }
      
    </div>
  );
}
