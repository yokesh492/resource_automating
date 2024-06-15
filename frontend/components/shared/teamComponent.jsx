import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const TeamComponent = (props) => {
  return (
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Teams</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.teams}
      label="Type"
      placeholder={props.placeholder}
      onChange={(e) => props.setTeams(e.target.value)}
    >
      <MenuItem value="Design">Design</MenuItem>
      <MenuItem value="Technology">Technology</MenuItem>
      <MenuItem value="Business">Business</MenuItem>
    </Select>
  </FormControl>
  )
}

export default TeamComponent