'use client';
import React from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";

import CategoryComponent from "./categoryComponent";
import TagHandler from "./tagComponent";
import TypeComponent from "./typeComponent";
import TeamComponent from "./teamComponent";

const AssetForm = (props) => {
  console.log(props);
  const {
    asset,
    setAsset,
    description,
    setDescription,
    category,
    setCategory,
    teams,
    setTeams,
    tags,
    setTags,
    types,
    setTypes,
    loading,
    submitHandler,
    link,
    setLink
  } = props;

  const isValid =
    asset && description && teams && types && category && tags.length > 0;
  return (
    <form onSubmit={submitHandler} >
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
          className=""
          fullWidth
          type="submit"
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </FormControl>
    </form>
  );
};

export default AssetForm;
