import React from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { usetypeStateHandler } from "../../store/store";

const Types = () => {
  const { typeData: types, setType } = usetypeStateHandler();
  return (
    <FormControl component="fieldset" variant="standard">
      <div className="grid grid-cols-3">
        {Object.keys(types).map((type, ind) => (
          <FormControlLabel
            key={ind}
            control={
              <Checkbox
                checked={types[type]}
                onClick={() => setType(type)}
                name={type}
              />
            }
            label={<p className="text-base">{type.replace("_", " ")}</p>}
          />
        ))}
      </div>
    </FormControl>
  );
};

export default Types;
