"use client";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const allTags = ["UI", "UX", "Design", "Coding"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function form() {
  const router = useRouter();
  const theme = useTheme();

  const [asset, setAsset] = useState("sefsfe");
  const [description, setDescription] = useState("sscdssd");
  const [link, setLink] = useState("sdsdd");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const isValid = asset && description && link && category && tags.length > 0;

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
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

        <FormControl className="mb-4">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleCategoryChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="mb-4"   >
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={tags}
            onChange={handleTagChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {allTags.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(tags, allTags, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
