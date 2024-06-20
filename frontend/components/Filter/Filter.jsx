"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";

import { useData, useFilterModal } from "../../store/store";
import { usetypeStateHandler } from "../../store/store";
import { usecategoryStateHandler } from "../../store/store";
import { usetagsStateHandler } from "../../store/store";

import ModalComponent from "../shared/ModalComponent";
import getfilterData from "../../utils/serverActions/getFilterData";
import Types from "./Types";
import Category from "./Category";
import Tags from "./Tags";
import FilterTeamHandler from "./FilterDropDownHandler";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F9F9F9',
  borderColor: '#F9F9F9',
  boxShadow: 24,
  maxHeight: 770,
  borderRadius: '16px 16px 0px 0px',
  width: '46%',
  padding: '24px', // Added more horizontal padding
  overflow: 'hidden', // Hide overflow to manage it inside
};

const Filter = () => {
  const { open, handleClose } = useFilterModal();
  const { setData } = useData();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("Business");
  const { tagsData } = usetagsStateHandler();
  const { typeData } = usetypeStateHandler();
  const { state } = usecategoryStateHandler();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(tagsData, typeData, state, team, 'from filter');
    const data = await getfilterData(tagsData, typeData, state, team);
    setLoading(false);
    if (data) {
      setData(data);
      handleClose();
    } else {
      setError("Error fetching data");
    }
  };

  return (
    <ModalComponent open={open} handleClose={handleClose} style={style}>
      <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }} className="custom-scrollbar w-full">
        <div className="px-3 w-full">
          <h3 className="font-bold text-2xl">FILTERS</h3>
          <hr className="mt-2" />
          <p className="mt-6" />
          <FilterTeamHandler team={team} teamHandler={setTeam} width={'610px'} />

          <h4 className="font-bold mt-6 pt-3 text-xl">Type</h4>
          <hr className="mt-2" />
          <div>
            <Types />
          </div>
          <h4 className="font-bold mt-6 text-xl">Category</h4>
          <hr className="mt-2" />
          <div>
            <Category />
          </div>

          <h4 className="font-bold mt-6 text-xl">Tags</h4>
          <hr className="mt-2" />
          <div>
            <Tags />
          </div>
        </div>
      </div>
      <div className="z-10 bg-white" style={{ position: 'sticky', bottom: 0, left: 0, right: 0}}>
        {error && <div className="text-red-500 py-2 text-base text-center font-bold">{error}</div>}
        <div className="my-4 text-center">
          <Button variant="contained" className="px-20 py-2 bg-buttonBlue hover:bg-buttonHover" onClick={submitHandler} disabled={loading}>
            Filter Results
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default Filter;
