"use client";
import Image from "next/image";
import Card from "./components/Card";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TagHandler from "./components/tagComponent";
import CategoryComponent from "./components/categoryComponent";
import UserName from "./components/username";
// import {allData} from './data/data'
import dataFetcher from "./components/dataFetcher";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const routeHandler = () => router.push("./asset");
  const [data, setData] = useState([]);
  // const [data,setData] = useState(allData);
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dataFetcher().then((res)=>{
      const {data,error,userInfo} = res;
      if (error === undefined || error !== null) {
        console.log("User not logged in");
      } else {
        console.log(error);
        console.log("this is wes");
        setData(data);
        setName(userInfo?.username);
        setUserId(userInfo?.userid);
      }
    }).catch((error)=>console.log(error));


  }, []);

  const filterCategoryFetcher = async (val) => {
    setCategory((prevValue) => (prevValue === val ? "" : val));
    const queryString = `category=${encodeURIComponent(val)}`;
    try {
      const url = `http://localhost:8000/resources/category/?${queryString}`;
      console.log("Fetching data from:", url);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Received data:", data);
        setData(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterTagsFetcher = async (val) => {
    setTags(val);
    const queryString = val
      .map((tag) => `tags=${encodeURIComponent(tag)}`)
      .join("&");
    try {
      const url = `http://localhost:8000/resources/tags/?${queryString}`;
      console.log("Fetching data from:", url);

      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Received data:", data);
        setData(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTypeChange = async (event) => {
    console.log(event.target.value, "in tag");

    setTypes((prevValue) =>
      prevValue == event.target.value ? "" : event.target.value
    );

    const queryString = `types=${encodeURIComponent(event.target.value)}`;
    try {
      const url = `http://localhost:8000/resources/types/?${queryString}`;
      console.log("Fetching data from:", url);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Received data:", data);
        setData(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="min-h-screen">
      <div>
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
          <h1 className="font-bold text-3xl float-left">Resources</h1>
          <div className="ml-auto">
            <button className="p-2 m-auto mr-4 rounded-lg border shadow-lg bg-white text-center">
              ...
            </button>
            <button
              className="font-bold text-white bg-black m-auto p-2 text-center rounded-lg shadow-lg"
              onClick={routeHandler}
            >
              Add Asset
            </button>
          </div>
        </div>
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
          <div className="ml-auto">
            <button className="p-4 m-auto">Filter</button>
            <button className="p-4 m-auto">Sort</button>
            <button className="border border-red-400">
              {" "}
              <Image
                src={"/image.png"}
                className="w-full h-full"
                width={30}
                height={30}
                alt="Image"
              />{" "}
            </button>
          </div>
        </div>
        <hr />
        <div className="m-4 grid grid-cols-5 gap-4">
          {data.map((item, index) => {
            return <Card key={item.id} {...item} />;
          })}
        </div>
      </div>
    </main>
  );
}
