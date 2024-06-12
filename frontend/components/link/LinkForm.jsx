"use client";
import React, { useState } from "react";
import AddIcons from '@mui/icons-material/Add';
import { Button, CircularProgress, TextField } from "@mui/material";

import postLink from "../../utils/serverActions/postLink";
import formatLink from "../../utils/helper/formatLink";
import ModalComponent from "../shared/ModalComponent";
import { useAssetModal, useExtractedData, useLinkModal } from "../../store/store";

function LinkForm() {
  const {open,handleClose} = useLinkModal();
  const {setExtractedData} = useExtractedData();
  const {handleOpen:handleAssetOpen} = useAssetModal();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendLinkData = async (e) => {
    e.preventDefault();
    setLoading(true);

    let link = e.target.link.value;
    console.log(link);


    link = formatLink(link);   

    if (!link) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    const { response, error } = await postLink(link);
    console.log(response)
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

return(
  <ModalComponent open={open} handleClose={handleClose}>
    <div className="p-6">
    <h3 className="font-bold text-xl text-center">Adding a Resource</h3>
    {error && (
      <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>
      )}
     <form
        className="flex flex-row mt-10 flex-grow space-x-4 items-center justify-center"
        onSubmit={sendLinkData}
        >
        <TextField
          type="url"
          id="link"
          variant="outlined"
          label="URL"
          placeholder="Enter the URL here"
      
        />
        {!loading && (
          <Button
          type="submit"
          variant="contained"
          color="primary"
          className="px-10 py-2"
            >
            <AddIcons /> ADD
          </Button>
        )}
        {loading && (
          <Button className="px-10 py-2" disabled>
            <CircularProgress />
          </Button>
        )}
      </form>
      </div>
  </ModalComponent>
);
}

export default LinkForm;
