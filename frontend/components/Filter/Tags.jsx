import React from 'react'
import { Chip } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { usetagsStateHandler } from '../../store/store'

const Tags = () => {
    const { tagsData:tags, setTags } = usetagsStateHandler();
  return (
    <div className="flex flex-row flex-wrap gap-3 pt-5">
    {Object.keys(tags).map((tag, ind) => (
          <Chip
            key={ind}
            icon={tags[tag] ? <CancelOutlinedIcon color="primary" /> : ''}
            color={tags[tag] ? 'primary' : 'default'}
            onClick={() => setTags(tag)}
            variant={tags[tag] ? 'filled' : 'outlined'}
            label={tag}
            className={`cursor-pointer ${tags[tag] ? 'font-bold pr-3 flex-row-reverse justify-between' : ''}`}
          />
    ))}
  </div>
  )
}

export default Tags