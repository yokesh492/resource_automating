import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";

const style = 'bg-gray-100 p-2 rounded-md';

const HomeTeamHandler = (props) => {
  return (
      <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={'All'}
          onChange={props.FilterTeamFetcher}
          className="text-lg rounded-lg"
        >
          <MenuItem  className={style} value="All">
            <CollectionsIcon className="mr-4" color="disabled" />
            All
          </MenuItem>
          <MenuItem className={style} value={"Design"}>Design</MenuItem>
          <MenuItem className={style} value={"Development"}>Development</MenuItem>
          <MenuItem className={style} value={"Business"}>Business</MenuItem>
        </Select>
      </FormControl>
  );
};

export default HomeTeamHandler;
