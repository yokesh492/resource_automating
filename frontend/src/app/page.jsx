"use client";
import Card from "./components/Card";
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
import TagHandler from "./components/tagComponent";
import CategoryComponent from "./components/categoryComponent";
import UserName from "./components/username";
import { allData } from "./data/data";
import dataFetcher from "./components/utils/dataFetcher";
import { useRouter } from "next/navigation";
import EditForm from "./components/EditForm";
import { getSession } from "./utils/getSession";
import Link from "next/link";

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
  const [teams, setTeams] = useState("");
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
    getSession();
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
            setUserId(userInfo?.userid);
          }
        })
        .catch((error) => console.log(error));
      }
    getData()
  }, []);

  const filterTeamFetcher = async (event) => {
    console.log("Workssss")
    setTeams((prevValue) =>
      prevValue === event.target.value ? "" : event.target.value
    );

    const queryString = [
      tags.length
        ? tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
      types ? `types=${encodeURIComponent(types)}` : null,
      event.target.value
        ? `teams=${encodeURIComponent(event.target.value)}`
        : null,
      category ? `category=${encodeURIComponent(category)}` : null,
      // sort ? `sort=${encodeURIComponent(sort)}` : null
    ]
      .filter(Boolean)
      .join("&");

    console.log(queryString);

    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/filter/?${queryString}`;
      // console.log("Fetching data from:", url);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.data;
        console.log("Received data:", data);
        setData(data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const filterCategoryFetcher = async (val) => {
    setCategory((prevValue) => (prevValue === val ? "" : val));

    const queryString = [
      tags.length
        ? tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
      types ? `types=${encodeURIComponent(types)}` : null,
      teams ? `teams=${encodeURIComponent(teams)}` : null,
      val ? `category=${encodeURIComponent(val)}` : null,
      // sort ? `sort=${encodeURIComponent(sort)}` : null
    ]
      .filter(Boolean)
      .join("&");

    // console.log(queryString);

    try {
      const url = `http://91.108.104.64:8001/resources/filter/?${queryString}`;
      // console.log("Fetching data from:", url);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.data;
        // console.log("Received data:", data);
        setData(data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const filterTagsFetcher = async (val) => {
    setTags(val);
    const queryString = [
      val.length
        ? val.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
      types ? `types=${encodeURIComponent(types)}` : null,
      teams ? `teams=${encodeURIComponent(teams)}` : null,
      category ? `category=${encodeURIComponent(category)}` : null,
      // sort ? `sort=${encodeURIComponent(sort)}` : null
    ]
      .filter(Boolean)
      .join("&");

    // console.log(queryString);

    try {
      const url = `http://91.108.104.64:8001/resources/filter/?${queryString}`;
      // console.log("Fetching data from:", url);

      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.data;
        // console.log("Received data:", data);
        setData(data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const handleTypeChange = async (event) => {
    // console.log(event.target.value, "in tag");

    setTypes((prevValue) =>
      prevValue == event.target.value ? "" : event.target.value
    );

    const queryString = [
      tags.length
        ? tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
      event.target.value
        ? `types=${encodeURIComponent(event.target.value)}`
        : null,
      teams ? `teams=${encodeURIComponent(teams)}` : null,
      category ? `category=${encodeURIComponent(category)}` : null,
      // sort ? `sort=${encodeURIComponent(sort)}` : null
    ]
      .filter(Boolean)
      .join("&");

    // console.log(queryString);

    try {
      const url = `http://91.108.104.64:8001/resources/filter/?${queryString}`;
      // console.log("Fetching data from:", url);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.data;
        // console.log("Received data:", data);
        setData(data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
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
        const url = `http://91.108.104.64:8001/resources/`;
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
        const url = `http://91.108.104.64:8001/resources/sort/?${queryString}`;
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
        <div className="ml-auto">
          <h4 className="text-2xl text-white">
            <UserName name={name || "  "} />
          </h4>
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
                defaultValue="All"
                className="p-2"
              >
                <option value="All" defaultValue={"resources"}>
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
            <EditForm {...selectedData} handleClose= {handleClose} setData = {setData} />
          </Box>
        </Modal>
            <Link href="/asset" className="flex justify-end items-center h-20  w-full">
              <Button variant="contained" className="h-20">Add asset</Button>
            </Link>
      </div>
      <div className="border"></div>
      <div className="flex flex-row">
        <div className="px-5">
          <FormControl sx={{ m: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={types}
              label="Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="Inspiration">Inspiration</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Blog">Blog</MenuItem>
            </Select>
          </FormControl>

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
        <div className="ml-auto pr-4">
          <FormControl sx={{ m: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Type"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="asc">A to Z</MenuItem>
              <MenuItem value="desc">Z to A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <hr />
      {data.length === 0 && (
        <div className=" flex justify-center items-center p-10 text-2xl font-bold">
          <p>No data available</p>
        </div>
      )}
      <div className="m-4 grid lg:grid-cols-5 lg:gap-4 md:grid-cols-4 md:gap-4 grid-cols-3 gap-3">
        {data.map((item) => {
          return (
            <Card key={item.id} onClick={(e) => handleOpen(item)} {...item} />
          );
        })}
      </div>
    </main>
  );
}
