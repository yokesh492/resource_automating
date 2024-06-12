import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { usecategoryStateHandler } from '../../store/store'
const Category = () => {
    const { state: category, setCategory } = usecategoryStateHandler();
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            {Object.keys(category).map((type) => (
              <Box key={type}>
                <h4 className="font-bold text-base py-2">{type.replace("_", " ")}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(category[type]).map((item, ind) => (
                    <FormControlLabel
                      key={ind}
                      control={
                        <Checkbox
                          checked={category[type][item]}
                          onChange={() => setCategory(type, item)}
                          name={item}
                          size="small"
                        />
                      }
                      label={<p className='text-sm'>{item.replace("_", " ")}</p>}
                    />
                  ))}
                </div>
              </Box>
            ))}
          </FormControl>
  )
}

export default Category