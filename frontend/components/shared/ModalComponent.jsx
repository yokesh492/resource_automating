import {  Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';



const ModalComponent = (props) => {
  return (
    <Modal
  open={props.open}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    <div style={props.style} className={'bg-white py-3 custom-scrollbar'}>
        <p className='float-right hover:cursor-pointer' onClick={()=>props.handleClose()}><CloseIcon /></p>
        {props.children}
    </div>
</Modal>
  )
}

export default ModalComponent