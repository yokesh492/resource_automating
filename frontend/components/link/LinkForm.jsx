"use client";
import React, { useState } from "react";
import AddIcons from "@mui/icons-material/Add";
import { Button, CircularProgress, TextField } from "@mui/material";

import postLink from "../../utils/serverActions/postLink";
import formatLink from "../../utils/helper/formatLink";
import ModalComponent from "../shared/ModalComponent";
import {
  useAssetModal,
  useExtractedData,
  useLinkModal,
} from "../../store/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#F9F9F9",
  borderColor: "#F9F9F9",
  boxShadow: 24,
  maxHeight: 770,
  borderRadius: 16,
  width: "35%",
  overflowY: "auto",
  padding: "24px",
};

function LinkForm() {
  const { open, handleClose } = useLinkModal();
  const { setExtractedData } = useExtractedData();
  const { handleOpen: handleAssetOpen } = useAssetModal();
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const isValid = url;

  const sendLinkData = async (e) => {
    e.preventDefault();
    setLoading(true);

    let link = e.target.link.value;
    console.log(link);

    link = formatLink(link);
    console.log(link);
    if (!link) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    const { response, error } = await postLink(link);
    console.log(response,error);
    setLoading(false);

    if (error) {
      console.log(error);
      setError(error);
    }
    if (response) {
      setExtractedData(response);
      handleClose();
      handleAssetOpen();
    }
  };

  return (
    <ModalComponent open={open} handleClose={handleClose} style={style}>
      <div>
        <h3 className="font-bold text-xl pl-16 text-center">
          Adding a Resource
        </h3>
        {error && (
          <p className="text-red-500 text-lg text-center font-bold items-center">
            {error}
          </p>
        )}
        <form className="flex flex-row mt-10 mx-5" onSubmit={sendLinkData}>
          <TextField
            type="url"
            id="link"
            variant="outlined"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the URL here"
            className="w-3/4 mr-5"
          />
          {!loading && (
            <Button
              type="submit"
              variant="contained"
              className="w-1/4 px-16 my-2 text-white font-bold bg-buttonBlue hover:bg-buttonHover"
              disabled={!isValid}
            >
               <AddIcons className="mr-3" /> Add 
            </Button>
          )}
          {loading && (
            <Button className="w-1/4 px-16 my-2 ml-5" disabled>
              <CircularProgress />
            </Button>
          )}
        </form>
      </div>
    </ModalComponent>
  );
}

export default LinkForm;
