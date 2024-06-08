"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TagHandler from "../../components/shared/tagComponent";
import CategoryComponent from "../../components/shared/categoryComponent";
import UserName from "../../components/shared/username";
import { allData } from "../../data/data";
import dataFetcher from "./components/utils/dataFetcher";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logout from "../../utils/serverActions/logout";
import EditAssetForm from "../../components/editAsset/EditAssetForm";
import getfilterData from "../../utils/serverActions/getFilterData";
import DisplayData from "./displayData";
import SortData from "./SortData";
import TypeComponent from "../shared/typeComponent";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [data, setData] = useState(allData);
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [teams, setTeams] = useState("All");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [sort, setSort] = useState("");

  const handleOpen = (props) => {
    setSelectedData(props);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getData = () => {
      dataFetcher()
        .then((res) => {
          const { data, error, userInfo } = res;
          if (error === undefined || error !== null) {
            // console.log("User not logged in");
            console.log({ dataFetcherError: error });
          } else {
            setData(data);
            setName(userInfo?.username);
            // setUserId(userInfo?.userid);
          }
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  const filterTeamFetcher = async (event) => {
    console.log("Workssss");
    setTeams((prevValue) =>
      prevValue === event.target.value ? "" : event.target.value
    );
    const {data,error} = getfilterData({tags,types,team:event.target.value,category});
    if(error === undefined || error !== null){
      setData(data);
    }
    else{
      console.log(error);
    }

  };

  const filterCategoryFetcher = async (val) => {
    setCategory((prevValue) => (prevValue === val ? "" : val));
    const {data,error} = getfilterData({tags,types,team:teams,category:val});
    if(error === undefined || error !== null){
      setData(data);
    }
    else{
      console.log(error);
    }
  };

  const filterTagsFetcher = async (val) => {
    setTags(val);
    const {data,error} = getfilterData({tags:val,types,team:teams,category});
    if(error === undefined || error !== null){
      setData(data);
    }
    else{
      console.log(error);
    }

  };

  const handleTypeChange = async (event) => {
    setTypes((prevValue) =>
      prevValue == event.target.value ? "" : event.target.value
    );
    const {data,error} = getfilterData({tags,types:event.target.value,team:teams,category});
    if(error === undefined || error !== null){
      setData(data);
    }
    else{
      console.log(error);
    }

  };

  const handleSortChange = async (event) => {
    // console.log(event.target.value, "in sort");

    setSort((prevValue) =>
      prevValue == event.target.value ? "" : event.target.value
    );

    const queryString = event.target.value
      ? `sort=${encodeURIComponent(event.target.value)}`
      : null;

    // console.log(queryString);

    try {
      if (queryString === null) {
        const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/`;
        // console.log("Fetching data from:", url);
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = await response.data;
          // console.log("Received data:", data);
          setData(data);
        } else {
          // console.error("Error fetching data:", response.statusText);
        }
      } else {
        const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/sort/?${queryString}`;
        // console.log("Fetching data from:", url);
        const response = await axios.get(url);
        // console.log(response)
        if (response.status === 200) {
          const data = await response.data;
          // console.log("Received data:", data);
          setData(data);
        } else {
          // console.error("Error fetching data:", response.statusText);
        }
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-row bg-purple-700 p-3">
        <h3 className="font-bold text-2xl  text-white bg-none">
          Vizdale Resources
        </h3>
        <div className="ml-auto gap-5 flex flex-row">
          <h4 className="text-2xl text-white">
            <UserName name={name || "  "} />
          </h4>
          <div>
              <Button className="text-black bg-white hover:bg-black hover:text-white" onClick={() => logout()}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row p-5 w-full">
        <h1 className="font-bold text-3xl float-left">
          <div className="flex justify-between w-full ">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <NativeSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teams}
                label="Team"
                onChange={filterTeamFetcher}
                className="p-2"
              >
                <option value="All">
                  All Resources
                </option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Business">Business</option>
              </NativeSelect>
            </FormControl>
          </div>
        </h1>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditAssetForm
              {...selectedData}
              handleClose={handleClose}
              setData={setData}
            />
          </Box>
        </Modal>
        <Link
          href="/asset"
          className="ml-auto"
        >
          <Button variant="contained" className="m-3">
            Add asset
          </Button>
        </Link>
      </div>
      <div className="border"></div>
      <div className="flex flex-row">
        <div className="px-5">
        <TypeComponent types={types} handleTypeChange={handleTypeChange} />

          <CategoryComponent
            category={category}
            setCategory={filterCategoryFetcher}
            style={{ m: 1, minWidth: 90 }}
          />
          <TagHandler
            tags={tags}
            setTags={filterTagsFetcher}
            style={{ m: 1, minWidth: 90 }}
          />
        </div>
        <SortData sort={sort} handleSortChange={handleSortChange} />
      </div>
      <hr />
      <DisplayData data={data} handleOpen={handleOpen} />
    </main>
  );
}
