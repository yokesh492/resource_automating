"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import fetchUserId from "../../utils/serverActions/userloginValidator";
import postAssetData from "../../utils/serverActions/postAssetData";
import AssetForm from "../shared/assetForm";

function AddAssetForm(props) {
  const router = useRouter();

  const [asset, setAsset] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [teams, setTeams] = useState("");
  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId,setUserId ]= useState('');
  const [error,setError] = useState('');
  
  const dataFetcher = async (props) => {
    try {
      const {error,id}= await fetchUserId();

      if(error === undefined || error !== null){
        console.log('User not logged in');
      }
      else{
        setUserId(id);
        setAsset(props.data.asset_name);
        setDescription(props.data.description);
        setLink(props.data.link);
      }

    } catch (error) {
      console.error('Axios error:', error);
      setError(error);
    }
  };

  useEffect(()=>{
    dataFetcher(props);
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { response, error } = await postAssetData({asset, description, link, category, tags, teams, types, url: `${process.env.NEXT_PUBLIC_PRODUCTION}/create_resources/?userid=${userId}`});
    setLoading(false);
    if (error) {
      console.log(error);
      setError(error);
    }
    if (response) {
      props.setData(response);
      router.push("/");
    }
  }

  return (
    <div className="mx-auto text-center bg-white p-8 rounded shadow-lg w-96">
      <h3 className="text-bold text-xl font-bold p-3">Add Asset</h3>
      <p className="text-start pb-3 text-xs">
        The information you put here will be added to the table
      </p>
      {error && <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>}
     <AssetForm asset={asset} setAsset={setAsset} description={description} setDescription={setDescription} category={category} setCategory={setCategory} teams={teams} setTeams={setTeams} tags={tags} setTags={setTags} types={types} setTypes={setTypes} loading={loading} submitHandler={submitHandler} />
    </div>
  );
}

export default AddAssetForm;
