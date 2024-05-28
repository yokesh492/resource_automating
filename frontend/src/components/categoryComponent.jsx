import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'

const CategoryComponent = (props) => {
  return (
    <FormControl sx={props.style}>
    <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
    <Select native defaultValue="" id="grouped-native-select" label="Grouping">
      <option aria-label="None" value="" />
      <optgroup label="Design Fundamentals">
        <option value={1}>Heirarchy</option>
        <option value={2}>Color</option>
        <option value={3}>Typography</option>
        <option value={4}>Layout</option>
        <option value={5}>Visuals</option>
        <option value={6}>Storytelling</option>
        <option value={7}>Motion and Animation</option>
        <option value={8}>Psychology</option>
        <option value={9}>Usability</option>
      </optgroup>
      <optgroup label="Graphic Design">
      </optgroup>
      <optgroup label="Branding">
        <option value={10}>Brand Strategy</option>
        <option value={11}>Creative Direction</option>
        <option value={12}>Logo Design</option>
        <option value={13}>Identity Design</option>
        <option value={14}>Brand Deliverable</option>
      </optgroup>
      <optgroup label="Web Design">
        <option value={15}>Discovery</option>
        <option value={16}>Research</option>
        <option value={17}>Content & IA</option>
        <option value={18}>Art Direction</option>
        <option value={19}>Wireframing</option>
        <option value={20}>Visual Design</option>
        <option value={21}>Development</option>
      </optgroup>
      <optgroup label="Web App Design">
        <option value={22}>Web App Design</option>

      </optgroup>


    </Select>
  </FormControl>
  )
}

export default CategoryComponent