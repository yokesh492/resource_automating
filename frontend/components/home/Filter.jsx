'use client'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import React from 'react'
import { useFilterModal } from '../../store/store';
import ModalComponent from '../shared/ModalComponent';

const Filter = () => {
  const { open, handleClose } = useFilterModal();
  return (

    <ModalComponent open={open} handleClose={handleClose}>
      <div className=' mt-4'>
      <h3 className='font-bold text-lg'>FILTERS</h3>
      <hr />
      <h4 className='font-semibold text-lg'>Type</h4>
      <hr />
      </div>
      {/* <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl> */}
    </ModalComponent>
    
   
  )
}

export default Filter