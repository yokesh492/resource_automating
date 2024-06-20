"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

import fetchUser from "../../utils/serverActions/userloginValidator";
import postAssetData from "../../utils/serverActions/postAssetData";
import ModalComponent from "../shared/ModalComponent";
import { useAssetModal, useExtractedData, useNotification } from "../../store/store";
import TeamComponent from "../shared/teamComponent";
import TypeComponent from "../shared/typeComponent";
import CategoryComponent from "../shared/categoryComponent";
import TagHandler from "../shared/tagComponent";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F9F9F9',
  borderColor:'#F9F9F9',
  boxShadow: 24,
  maxHeight: 770,
  borderRadius:16,
  width: '35%',
  overflowY: 'auto',
  padding: '24px',
};


function AddAssetForm() {
  const { open, handleClose } = useAssetModal();
  const { extractedData } = useExtractedData();
  const {setNotification} = useNotification();

  const [asset, setAsset] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [teams, setTeams] = useState("");
  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName,setUserName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const isValid =
    asset && description && teams && types && category && tags.length > 0;

  const dataFetcher = async () => {
    try {
      const { error, userInfo } = await fetchUser();

      if (error === undefined || error !== null) {
        console.log("User not logged in");
      } else {
        setUserId(userInfo.userid);
        setUserName(userInfo.username);
        setAsset(extractedData.asset_name);
        setDescription(extractedData.description);
        setLink(extractedData.link);
      }
    } catch (error) {
      setLoading(false);
      console.error("Axios error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    dataFetcher();
  }, [extractedData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { response, error } = await postAssetData({
      asset,
      description,
      link,
      category,
      tags,
      teams,
      types,
      url: `${process.env.NEXT_PUBLIC_PRODUCTION}/create_resources/?userid=${userId}`,
    });
    setLoading(false);
    if (error) {
      console.log(error);
      setError(error);
    }
    if (response) {
      setNotification({id:link,addedBy:userName,asset_name:asset})
      handleClose();
      router.refresh();      
    }
  };

  return (
    <ModalComponent open={open} handleClose={handleClose} style={style}>
      <div className="w-full">
        <h3 className="text-xl font-bold p-3 text-center">Adding a Resource</h3>
        {error && (
          <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>
        )}
        <form onSubmit={submitHandler}>
          <FormControl fullWidth>
            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              type="text"
              className="mb-4"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <TextField
              label="Title"
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
            <TeamComponent placeholder={  'Choose a Team'} teams={teams} setTeams={setTeams} />

            <p className="py-2"></p>
            <TypeComponent placeholder={'Choose a type'} types={types} handleTypeChange={setTypes} />
            <p className="py-2"></p>

            <CategoryComponent placeholder={'Choose a category'} category={category} setCategory={setCategory} />
            <p className="py-2"></p>
            <TagHandler placeholder={'Choose a tag'} tags={tags} setTags={setTags} />
            <Button
            variant="contained"
            fullWidth
            disabled={loading || !isValid}
            className="py-4 font-bold bg-buttonBlue hover:bg-buttonHover"
            type="submit"
          >
            <AddIcon className="mr-3" /> Add a Resource
          </Button>
          </FormControl>
        </form>{" "}
      </div>
    </ModalComponent>
  );
}

export default AddAssetForm;
