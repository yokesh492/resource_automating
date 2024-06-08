import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

const CategoryComponent = (props) => {
  return (
    <FormControl sx={props.style}>
      <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
      <Select
        native
        defaultValue=""
        id="grouped-native-select"
        label="Grouping"
        value={props.category}
        onChange={(e) => props.setCategory(e.target.value)}
      >
        <option aria-label="None" value="" ></option>
        <optgroup label="Design Fundamentals">
          <option value="Heirarchy">Heirarchy</option>
          <option value="Color">Color</option>
          <option value="Typography">Typography</option>
          <option value="Layout">Layout</option>
          <option value="Visuals">Visuals</option>
          <option value="Storytelling">Storytelling</option>
          <option value="Motion and Animation">Motion and Animation</option>
          <option value="Psychology">Psychology</option>
          <option value="Usability">Usability</option>
        </optgroup>
        <optgroup label="Graphic Design"></optgroup>
        <optgroup label="Branding">
          <option value="Brand Strategy">Brand Strategy</option>
          <option value="Creative Direction">Creative Direction</option>
          <option value="Logo Design">Logo Design</option>
          <option value="Identity Design">Identity Design</option>
          <option value="Brand Deliverable">Brand Deliverable</option>
        </optgroup>
        <optgroup label="Web Design">
          <option value="Discovery">Discovery</option>
          <option value="Research">Research</option>
          <option value="Content & IA">Content & IA</option>
          <option value="Art Direction">Art Direction</option>
          <option value="Wireframing">Wireframing</option>
          <option value="Visual Design">Visual Design</option>
          <option value="Development">Development</option>
        </optgroup>
        <optgroup label="Web App Design">
          <option value="Web App Design">Web App Design</option>
        </optgroup>
      </Select>
    </FormControl>
  );
};

export default CategoryComponent;
