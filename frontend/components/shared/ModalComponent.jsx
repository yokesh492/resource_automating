import {  Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = (props) => {
  return (
    <Modal
  open={props.open}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    <div style={style} className='bg-white p-3'>
        <p className='float-right' onClick={()=>props.handleClose()}><CloseIcon /></p>
      <div className='flex flex-row flex-grow'>
        {props.children}
      </div>
    </div>
</Modal>
  )
}

export default ModalComponent