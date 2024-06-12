"use client";

import { useEffect, useState } from "react";
import DisplayData from "./displayData";
import dataFetcher from "../../utils/serverActions/getAllData";
import HomeTeamHandler from "./HomeTeamHandler";
import {
  useData,
  useFilterModal,
  useLinkModal,
} from "../../store/store";

import VizdaleLogo from "../shared/vizdaleLogo";
import { Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TuneIcon from "@mui/icons-material/Tune";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import Filter from "../Filter/Filter";
import LinkForm from "../link/LinkForm";
import AddAssetForm from "../asset/addAssetForm";
import CardHandler from "./CardHandler";

const Home = () => {
  const { data, setData } = useData();
  const { handleOpen: handleFilterOpen } = useFilterModal();
  const { handleOpen: handleLinkOpen } = useLinkModal();

  const [name, setName] = useState("");

  useEffect(() => {
    const getData = () => {
      dataFetcher()
        .then((res) => {
          const { data, error, userInfo } = res;
          if (error === undefined || error !== null) {
            console.log({ dataFetcherError: error });
          } else {
            setData(data);
            setName(userInfo?.username);
          }
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);
  return (
    <main className="bg-slate-100 pb-6 min-h-screen">
      <Filter />
      <LinkForm />
      <AddAssetForm />
      <CardHandler />
      <div className="flex flex-row m-3">
        <div>
          <VizdaleLogo />
        </div>
        <div className="ml-auto">
          <div>
            <Chip
              variant="contained"
              label={""}
              icon={<NotificationsNoneIcon />}
              className="m-3 rounded-md"
            ></Chip>
            {/* <Chip variant="contained" label={<UserName name={name}/>} className="m-3 rounded-md text-base "></Chip> */}
            <Chip
              variant="contained"
              icon={<PermIdentityIcon />}
              label={name}
              className="m-3 rounded-md text-base "
            ></Chip>
          </div>
        </div>
      </div>
      <div className="flex flex-row m-6">
        <div>
          <HomeTeamHandler />
        </div>
        <div className="ml-auto justify-around">
          <Chip
            variant="contained"
            label={"Filter"}
            onClick={() => handleFilterOpen()}
            icon={<TuneIcon />}
            className="px-3 py-5 text-base rounded-md flex-row-reverse"
          ></Chip>
          <Button
            variant="contained"
            className="m-3"
            onClick={() => handleLinkOpen()}
          >
            <AddIcon className="mr-3" /> Add a Resource
          </Button>
        </div>
      </div>
      <DisplayData data={data} />
    </main>
  );
};

export default Home;
