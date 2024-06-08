import { FormControl, NativeSelect } from '@mui/material'
import React from 'react'

const HomeTeamHandler = (props) => {
  return (
    <div className="flex justify-between w-full ">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <NativeSelect
                id="demo-simple-select"
                value={props.teams}
                label="Team"
                onChange={props.filterTeamFetcher}
                className="p-2"
              >
                <option value="All">All Resources</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Business">Business</option>
              </NativeSelect>
            </FormControl>
          </div>
  )
}

export default HomeTeamHandler