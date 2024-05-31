"use client";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TagHandler from "../components/tagComponent";
import CategoryComponent from "../components/categoryComponent";
import axios from "axios";
import fetchData from "./fetchData";

function form() {
  const router = useRouter();

  const [asset, setAsset] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId,setUserId ]= useState('');

  const isValid = asset && description && link && category && tags.length > 0;
  
  const dataFetcher = async () => {
    try {
      const {data,error,userInfo}=fetchData();
      if(error === undefined || error !== null){
        console.log('User not logged in');
        return;
      }
      else{
        setUserId(userInfo.id);
        setAsset(data.asset_name);
        setDescription(data.description);
        setLink(data.link);
      }

    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  useEffect(()=>{
    dataFetcher();
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8000/scrape/${userId}`, {
        asset_name: asset,
        description: description,
        link: link,
        category: category,
        tags: tags,
      });
      console.log(response);
      setLoading(false);
      router.push('../asset');
    } catch (error) {
      console.error('Axios error:', error);
    } 

    router.push("../");
  };

  return (
    <div className="m-auto text-center bg-white p-8 rounded shadow-lg w-96">
      <h3 className="text-bold text-xl font-bold p-3">Add Asset</h3>
      <p className="text-start pb-3 text-xs">
        The information you put here will be added to the table
      </p>
      <form  onSubmit={submitHandler}>
        <FormControl fullWidth>
        <TextField
          label="Asset Name"
          variant="outlined"
          fullWidth
          type="text"
          className="mb-4"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          type="text"
          className="mb-4"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <CategoryComponent category={category} setCategory={setCategory}/>
        <p className="py-2"></p>
        <TagHandler tags={tags} setTags={setTags} />

        <TextField
          label="Link"
          variant="outlined"
          fullWidth
          type="text"
          className="mb-4"
          multiline
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          variant="contained"
          className=""
          fullWidth
          type="submit"
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
        </ FormControl>
      </form>
    </div>
  );
}

export default form;
