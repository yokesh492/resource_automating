"use client";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TagHandler from "../components/tagComponent";
import CategoryComponent from "../components/categoryComponent";
import axios from "axios";
import fetchData from "./utills/fetchData";

function AssetForm(props) {
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

  const isValid = asset && description && teams && types && category && tags.length > 0;
  
  const dataFetcher = async (props) => {
    try {
      const {error,id}= await fetchData();

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

    try {
      const response = await axios.post(`http://91.108.104.64:8001/create_resources/?userid=${userId}`, {
        asset_name: asset,
        description: description,
        link: link,
        category: category,
        tags: tags,
        team:teams,
        type:types,
        date:null
      });
      // console.log(response);
      setLoading(false);
      if(response.status === 200){
        console.log('Asset added successfully');
      }
      else{
        console.log('Asset not added');
      }
    } catch (error) {
      console.error('Axios error:', error);
      setError(error);
    } 

    router.push("../");
  };

  return (
    <div className="m-auto text-center bg-white p-8 rounded shadow-lg w-96">
      <h3 className="text-bold text-xl font-bold p-3">Add Asset</h3>
      <p className="text-start pb-3 text-xs">
        The information you put here will be added to the table
      </p>
      {error && <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>}
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
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Teams</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teams}
                label="Type"
                onChange={(e) => setTeams(e.target.value)}
              >
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
            </FormControl>
        <p className="py-2"></p>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={types}
                label="Type"
                onChange={(e) => setTypes(e.target.value)}
              >
                <MenuItem value="Tools">Tools</MenuItem>
                <MenuItem value="Inspiration">Inspiration</MenuItem>
                <MenuItem value="Games">Games</MenuItem>
                <MenuItem value="Tutorial">Tutorial</MenuItem>
                <MenuItem value="Blog">Blog</MenuItem>
              </Select>
            </FormControl>
        <p className="py-2"></p>
            

        <CategoryComponent category={category} setCategory={setCategory}/>
        <p className="py-2"></p>
        <TagHandler tags={tags} setTags={setTags} />
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

export default AssetForm;
