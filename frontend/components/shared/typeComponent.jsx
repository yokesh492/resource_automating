import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const TypeComponent = (props) => {
  return (
    <FormControl style={props.style} className='py-2'>
    <InputLabel id="demo-simple-select-label">Type</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.types}
      label="Type"
      onChange={(e)=>props.handleTypeChange(e.target.value)}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="Tools">Tools</MenuItem>
      <MenuItem value="Inspiration">Inspiration</MenuItem>
      <MenuItem value="Games">Games</MenuItem>
      <MenuItem value="Tutorial">Tutorial</MenuItem>
      <MenuItem value="Blog">Blog</MenuItem>
    </Select>
  </FormControl>
  )
}

export default TypeComponent