// 'use client'
// import { Box, Chip, Menu, MenuItem, Select } from "@mui/material";
// import React, { useState } from "react";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";

// const style='text-sm font-bold bg-dropDown px-4 py-4'

// const UserDropdown = (props) => {
//     const [open, setOpen] = useState(null);

//     const handleClick = (event) => {
//         setOpen(event.currentTarget);
//     };

//     const handleClose = () => {
//         setOpen(null);
//     }

//   return (
//     <Box>
//         <Chip
//           variant="contained"
//           icon={<PermIdentityIcon color="black" />}
//           label={props.name}
//           onClick={handleClick}
//           size="medium"
//           className="m-3 rounded-md text-base focus:outline-none"
//         ></Chip>
//          <Menu
//         anchorEl={open}
//         open={!!open}
//         onClose={handleClose}
        
//         MenuListProps={{
        
//             paper: {
//               style: {
//                 backgroundColor: 'transparent',
//                 boxShadow: 'none',
//                 borderRadius: '8px',
//               },
         
//           }
//         }}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//           <MenuItem className={style} onClick={props.handleResource} value={"myResource"}>
//            My Resources
//           </MenuItem>
//           <MenuItem className={style} onClick={props.logout} value={"Logout"}>
//             Logout
//           </MenuItem>
//         </Menu>
//     </Box>
//   );
// };

// export default UserDropdown;
'use client'
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const style = 'text-sm font-bold bg-dropDown px-4 py-2';

const UserDropdown = (props) => {
  const [open, setOpen] = useState(null);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  }

  return (
    <Box>
      <Chip
        variant="contained"
        icon={<PermIdentityIcon color="black" />}
        label={props.name}
        onClick={handleClick}
        size="medium"
        className="m-3 rounded-md text-base focus:outline-none"
      />
      <Menu
        anchorEl={open}
        open={!!open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#EDEDED',
            boxShadow: 'none',
            borderRadius: '8px',
            marginTop: 0, 
            paddingTop: 0, 
            paddingBottom: 0, 
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={props.handleResource}
          value={"myResource"}
          sx={{ padding: '8px 16px' }} // Adjust padding as needed
        >
          My Resources
        </MenuItem>
        <MenuItem
          onClick={props.logout}
          value={"Logout"}
          sx={{ padding: '8px 16px' }} // Adjust padding as needed
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserDropdown;
