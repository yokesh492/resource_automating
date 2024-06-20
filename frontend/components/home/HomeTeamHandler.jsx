import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";

const style='text-lg bg-dropDown px-4 py-4';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


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


const HomeTeamHandler = (props) => {
  return (
    <Box>
      <FormControl>
        <Select
          style={{backgroundColor:'#EDEDED',width:props.width,borderRadius:'8px',padding:'1px 8px',outline:'none',border:'none',boxShadow:'none'}}
          className="custom-select" 
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
            }
          }}
        >
          <MenuItem className={style} value="All"><CollectionsIcon className="mr-4" color="disabled" />All</MenuItem>
          <MenuItem className={style} value={"Design"}>Design</MenuItem>
          <MenuItem className={style} value={"Development"}>Development</MenuItem>
          <MenuItem className={style} value={"Business"}>Business</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default HomeTeamHandler;
