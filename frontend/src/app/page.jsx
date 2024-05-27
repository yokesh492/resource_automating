'use client';
import Image from "next/image";
import Card from "./card";
import { useRouter } from "next/navigation";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Form from "./form";
import axios from 'axios';
// import {data} from './data';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data,setData] = useState([]);
  
  const dataFetcher = async () => {
    try {
      const response = await axios.get('https://localhost.com/data');
      const data = response.data;
      
      setData(data);

    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  useEffect(()=>{
    dataFetcher();
  },[])

  return (
    <main className="min-h-screen">
      <div>
      <div className="flex flex-row bg-purple-700 p-3">
        <h3 className="font-bold text-2xl  text-white bg-none">Vizdale Resources</h3>
        <div className="ml-auto">
          <h4 className="text-2xl text-white">User Name</h4>
        </div>
      </div>
        <div className="flex flex-row p-5 w-full">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Form />
        </Box>
      </Modal>
          <h1 className="font-bold text-3xl float-left">Resources</h1>  
          <div className="ml-auto">
            <button className="p-2 m-auto mr-4 rounded-lg border shadow-lg bg-white text-center">
              ...
            </button>
            <button className="font-bold text-white bg-black m-auto p-2 text-center rounded-lg shadow-lg" onClick={handleOpen}>
              Add Asset
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="px-5">
            <select
              name="Category"
              id="cat"
              className="p-2 rounded-lg shadow-md text-gray-600 font-semibold mr-4"
            >
              <option value="Category">Category</option>
              <option value="Event">Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
            </select>
            <select
              name="Tags"
              id="tag"
              className="p-2 rounded-lg shadow-md text-gray-600 font-semibold"
            >
              <option value="Category">Tag</option>
              <option value="Event">Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
            </select>
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
