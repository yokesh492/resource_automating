"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import fetchUser from "../../utils/serverActions/userloginValidator";
import postAssetData from "../../utils/serverActions/postAssetData";
import AssetForm from "../shared/assetForm";
import ModalComponent from "../shared/ModalComponent";
import { useAssetModal, useExtractedData } from "../../store/store";

function AddAssetForm() {
  const router = useRouter();
  const {open,handleClose} = useAssetModal();
  const {extractedData,setextractedData} = useExtractedData();


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
  
  const dataFetcher = async () => {

    try {
      const {error,userInfo}= await fetchUser();

      if(error === undefined || error !== null){
        console.log('User not logged in');
      }
      else{
        setUserId(userInfo.userid);
      }

    } catch (error) {
      console.error('Axios error:', error);
      setError(error.message);
    }
  };

  useEffect(()=>{
    dataFetcher();
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
      router.push("/");
    }
  }

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <div className="p-5">
      <h3 className="text-xl font-bold p-3 text-center">Adding a Resource</h3>
      {error && <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>}
     <AssetForm asset={asset} setAsset={setAsset} description={description} setDescription={setDescription} category={category} setCategory={setCategory} teams={teams} setTeams={setTeams} tags={tags} setTags={setTags} types={types} setTypes={setTypes} loading={loading} submitHandler={submitHandler} />
      </div>
    </ModalComponent>
  );
}

export default AddAssetForm;
