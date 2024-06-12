"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";

import fetchUser from "../../utils/serverActions/userloginValidator";
import postAssetData from "../../utils/serverActions/postAssetData";
import ModalComponent from "../shared/ModalComponent";
import { useAssetModal, useExtractedData } from "../../store/store";
import TeamComponent from "../shared/teamComponent";
import TypeComponent from "../shared/typeComponent";
import CategoryComponent from "../shared/categoryComponent";
import TagHandler from "../shared/tagComponent";

function AddAssetForm() {
  const { open, handleClose } = useAssetModal();
  const { extractedData } = useExtractedData();
  const [asset, setAsset] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [teams, setTeams] = useState("");
  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const isValid =
    asset && description && teams && types && category && tags.length > 0;

  const dataFetcher = async () => {
    try {
      const { error, userInfo } = await fetchUser();

      if (error === undefined || error !== null) {
        console.log("User not logged in");
      } else {
        setUserId(userInfo.userid);
        setAsset(extractedData.asset_name);
        setDescription(extractedData.description);
        setLink(extractedData.link);
      }
    } catch (error) {
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
      handleClose();
    }
  };

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <div className="p-5 mx-6">
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
            <TeamComponent teams={teams} setTeams={setTeams} />

            <p className="py-2"></p>
            <TypeComponent types={types} handleTypeChange={setTypes} />
            <p className="py-2"></p>

            <CategoryComponent category={category} setCategory={setCategory} />
            <p className="py-2"></p>
            <TagHandler tags={tags} setTags={setTags} />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading || !isValid}
            >
              {loading ? <CircularProgress /> : "Submit"}
            </Button>
          </FormControl>
        </form>{" "}
      </div>
    </ModalComponent>
  );
}

export default AddAssetForm;
