import { Box, Modal } from '@mui/material'
import React from 'react'
import EditAssetForm from './EditAssetForm'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  

const EditModal = (props) => {
  return (
    <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditAssetForm
              {...props.selectedData}
              handleClose={props.handleClose}
              setData={props.setData}
            />
          </Box>
        </Modal>
  )
}

export default EditModal