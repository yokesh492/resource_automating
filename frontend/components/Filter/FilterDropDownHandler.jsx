import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const style='text-lg bg-dropDown px-4 py-4'


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#EDEDED',
    fontSize: 16,
    color:'#000000',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
    },
  },
}));


const FilterTeamHandler = (props) => {
  return (
    <Box>
      <FormControl >
        <Select
          style={{backgroundColor:'#EDEDED',width:props.width,borderRadius:'8px',padding:'1px 8px'}}
          value={props.team}
          onChange={(e)=>props.teamHandler(e.target.value)}
          input={<BootstrapInput />}
          MenuProps={{
            slotProps:{
              paper: {
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: '8px',
                  
                },
              }
            },
            MenuListProps: {
              className: 'bg-white rounded-lg px-0 my-0 w-52',
            },
          }}
        >
          <MenuItem className={style} value={"Design"}><CollectionsIcon className="mr-2" color="disabled"/> Design</MenuItem>
          <MenuItem className={style} value={"Development"}> <CollectionsIcon className="mr-2" color="disabled"/> Development</MenuItem>
          <MenuItem className={style} value={"Business"}><CollectionsIcon className="mr-2" color="disabled"/> Business</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterTeamHandler;
