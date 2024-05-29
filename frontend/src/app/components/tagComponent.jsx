import { useTheme } from "@mui/material/styles";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react'
import {allTags} from '../data/tags'


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

const handleTagChange = (event,setTags) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };



const TagHandler = (props) => {

    const theme = useTheme();
  return (
    <FormControl className="mb-4" sx={props.style} >
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={props.tags}
            onChange={(event)=>handleTagChange(event,props.setTags)}
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
                style={getStyles(props.tags, allTags, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  )
}

export default TagHandler