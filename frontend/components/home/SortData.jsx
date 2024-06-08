import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SortData = (props) => {
  return (
    <div className="ml-auto pr-4">
          <FormControl sx={{ m: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.sort}
              label="Type"
              onChange={props.handleSortChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="asc">A to Z</MenuItem>
              <MenuItem value="desc">Z to A</MenuItem>
            </Select>
          </FormControl>
        </div>
  )
}

export default SortData