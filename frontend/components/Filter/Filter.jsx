"use client";
import { Button } from "@mui/material";
import React from "react";

import { useFilterModal } from "../../store/store";
import ModalComponent from "../shared/ModalComponent";
import getfilterData from "../../utils/serverActions/getFilterData";
import Types from "./Types";
import Category from "./Category";
import Tags from "./Tags";

const Filter = () => {
  const { open, handleClose } = useFilterModal();

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <div className=" mt-4 px-1.5">
        <h3 className="font-bold text-xl">FILTERS</h3>
        <hr className="mt-2" />
        <h4 className="font-semibold pt-3 text-lg">Type</h4>
        <hr className="mt-2" />
        <div>
          <Types />
        </div>
        <h4 className="font-semibold text-lg">Category</h4>
        <hr className="mt-2" />
        <div>
          <Category />
        </div>

        <h4 className="font-semibold  text-lg">Tags</h4>
        <hr className="mt-2" />
        <div>
          <Tags />
        </div>
        <div className="mt-4 text-center">
          <Button variant="contained" color="primary" onClick={getfilterData}>
            Filter Results{" "}
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default Filter;
