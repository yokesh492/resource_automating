"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";

import { useData, useFilterModal } from "../../store/store";
import {  usetypeStateHandler } from "../../store/store";
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
  borderColor:'#F9F9F9',
  boxShadow: 24,
  maxHeight: 770,
  borderRadius:'16px 16px 0px 0px',
  width: '45%',
  overflowY: 'auto',
  padding: '24px',
};

const Filter = () => {
  const { open, handleClose } = useFilterModal();
  const {setData} = useData();
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [team, setTeam] = useState("Business");
  const {tagsData} = usetagsStateHandler();
   const {typeData} = usetypeStateHandler();
    const {state} = usecategoryStateHandler();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(tagsData,typeData,state,team,'from filter')
    const data = await getfilterData(tagsData,typeData,state,team);
    setLoading(false);
    if(data){
      setData(data);
      handleClose();
    }
    else{
      setError("Error fetching data");
    }
  }


  return (
    <ModalComponent open={open} handleClose={handleClose} style={style}>

      <div className=" mt-4 w-full">
        <h3 className="font-bold text-2xl">FILTERS</h3>
        <hr className="mt-2" />
        <p className="mt-6" />
        <FilterTeamHandler team={team} teamHandler={setTeam} width={'650px'} />
        
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

        <h4 className="font-bold mt-6  text-xl">Tags</h4>
        <hr className="mt-2" />
        <div>
          <Tags />
        </div>
        {error && <div className="text-red-500 py-2 text-base text-center font-bold">{error}</div>}
        <div className="mt-4 text-center">
          <Button variant="contained" color="primary" onClick={submitHandler} disabled={loading}>
            Filter Results{" "}
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default Filter;
