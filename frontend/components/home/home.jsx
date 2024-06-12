"use client";
// import {  Button} from "@mui/material";
import { useEffect, useState } from "react";
// import axios from "axios";
// import TagHandler from "../../components/shared/tagComponent";
// import CategoryComponent from "../../components/shared/categoryComponent";
import UserName from "../../components/shared/username";
import { allData } from "../../data/data";
// import Link from "next/link";
// import getfilterData from "../../utils/serverActions/getFilterData";
import DisplayData from "./displayData";
// import SortData from "./SortData";
// import TypeComponent from "../shared/typeComponent";
import dataFetcher from "../../utils/serverActions/getAllData";
// import Logout from "./Logout";
import HomeTeamHandler from "./HomeTeamHandler";
// import EditModal from "../editAsset/EditModal";
import { useCardModal, useData, useFilterModal, useLinkModal } from "../../store/store";

import VizdaleLogo from "../shared/vizdaleLogo";
import { Button, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TuneIcon from '@mui/icons-material/Tune';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Filter from "./Filter";
import LinkForm from "../link/LinkForm";
import AddAssetForm from "../asset/addAssetForm";
import CardHandler from "./CardHandler";



// // import filterCategoryFetcher from "../../utils/helper/filterCategory";
// // import filterTagsFetcher from "../../utils/helper/filterTags";
// // import filterTeamFetcher from "../../utils/helper/filterTeams";
// // import handleTypeChange from "../../utils/helper/filterType";

const Home = () => {
  const {data,setData} = useData();
  const { handleOpen:handleFilterOpen}=useFilterModal();
  const {handleOpen:handleLinkOpen} = useLinkModal();  

  const [name, setName] = useState("Siva");

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
    // setData(allData);
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
                <Chip variant="contained" label={''} icon={<NotificationsNoneIcon/>} className="m-3 rounded-md"></Chip>
                {/* <Chip variant="contained" label={<UserName name={name}/>} className="m-3 rounded-md text-base "></Chip> */}
                <Chip variant="contained" icon={<PermIdentityIcon />} label={name} className="m-3 rounded-md text-base "></Chip>
            </div>
        </div>
      </div>
      <div className="flex flex-row m-6">
        <div>
        <HomeTeamHandler  />
        </div>
        <div className="ml-auto justify-around">
            <Chip variant="contained" label={'Filter'} onClick={()=>handleFilterOpen()}  icon={<TuneIcon />}  className="px-3 py-5 text-base rounded-md flex-row-reverse"></Chip>
            <Button variant="contained" className="m-3" onClick={()=>handleLinkOpen()}><AddIcon className="mr-3" /> Add a Resource</Button>
        </div>
      </div>
      <DisplayData data={data} />
    </main>
  )
}

export default Home;
// export default function Home() {
//   const [open, setOpen] = useState(false);
//   // const [data, setData] = useState(allData);
//   const [name, setName] = useState("");
//   const [types, setTypes] = useState("");
//   const [teams, setTeams] = useState("All");
//   const [tags, setTags] = useState([]);
//   const [category, setCategory] = useState("");
//   const [selectedData, setSelectedData] = useState({});
//   const [sort, setSort] = useState("");

//   const {data,setData} = useData();

//   const handleOpen = (props) => {
//     setSelectedData(props);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     const getData = () => {
//       dataFetcher()
//         .then((res) => {
//           const { data, error, userInfo } = res;
//           if (error === undefined || error !== null) {
//             // console.log("User not logged in");
//             console.log({ dataFetcherError: error });
//           } else {
//             setData(data);
//             setName(userInfo?.username);
//             // setUserId(userInfo?.userid);
//           }
//         })
//         .catch((error) => console.log(error));
//     };
//     getData();
//   }, []);

//   const filterTeamFetcher = async (event) => {
//     const val = event.target.value ;
//     setTeams(val);
//     const  data = await getfilterData({ tags, types, team: val, category });
//     if (data) {
//       console.log(data, "data in team change")
//       setData(data);
//     } else {
//       console.log('Error in team change');
//     }
//   };

//   const filterCategoryFetcher = async (val) => {
//     setCategory((prevValue) => (prevValue === val ? "" : val));
//     const  data = await getfilterData({
//       tags,
//       types,
//       team: teams,
//       category: val,
//     });
//     if (data) {
//       setData(data);
//     } else {
//       console.log('Error in category change');
//     }
//   };

//   const filterTagsFetcher = async (val) => {
//     setTags(val);
//     const data = await getfilterData({
//       tags: val,
//       types,
//       team: teams,
//       category,
//     });
//     if (data) {
//       setData(data);
//     } else {
//       console.log('Error in tag change');
//     }
//   };

//   const handleTypeChange = async (val) => {
//     setTypes(val);
//     const data = await getfilterData({ tags, types: val, team: teams, category });
//     if (data) {
//       setData(data);
//     } else {
//       console.log('Error in type change');
//     }
//   };

//   const handleSortChange = async (event) => {
//     // console.log(event.target.value, "in sort");

//     setSort((prevValue) =>
//       prevValue == event.target.value ? "" : event.target.value
//     );

//     const queryString = event.target.value
//       ? `sort=${encodeURIComponent(event.target.value)}`
//       : null;

//     // console.log(queryString);

//     try {
//       if (queryString === null) {
//         const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/`;
//         // console.log("Fetching data from:", url);
//         const response = await axios.get(url);
//         if (response.status === 200) {
//           const data = await response.data;
//           // console.log("Received data:", data);
//           setData(data);
//         } else {
//           // console.error("Error fetching data:", response.statusText);
//         }
//       } else {
//         const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/sort/?${queryString}`;
//         // console.log("Fetching data from:", url);
//         const response = await axios.get(url);
//         // console.log(response)
//         if (response.status === 200) {
//           const data = await response.data;
//           // console.log("Received data:", data);
//           setData(data);
//         } else {
//           // console.error("Error fetching data:", response.statusText);
//         }
//       }
//     } catch (error) {
//       // console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <main className="min-h-screen">
//       <div className="flex flex-row bg-purple-700 p-3">
//         <h3 className="font-bold text-2xl  text-white bg-none">
//           Vizdale Resources
//         </h3>
//         <div className="ml-auto gap-5 flex flex-row">
//           <h4 className="text-2xl text-white">
//             <UserName name={name || "  "} />
//           </h4>
//           <div>
//             <Logout />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row p-5 w-full">
//         <h1 className="font-bold text-3xl float-left">
//           <HomeTeamHandler filterTeamFetcher={filterTeamFetcher} teams={teams} />
//         </h1>
//         <EditModal open={open} handleClose={handleClose} selectedData={selectedData} setData={setData} />
//         <Link href="/asset" className="ml-auto">
//           <Button variant="contained" className="m-3">
//             Add asset
//           </Button>
//         </Link>
//       </div>
//       <div className="border"></div>
//       <div className="flex flex-row">
//         <div className="px-5">
//           <TypeComponent
//             types={types}
//             handleTypeChange={handleTypeChange}
//             style={{ m: 1, minWidth: 90 }}
//           />

//           <CategoryComponent
//             category={category}
//             setCategory={filterCategoryFetcher}
//             style={{ m: 1, minWidth: 90 }}
//           />
//           <TagHandler
//             tags={tags}
//             setTags={filterTagsFetcher}
//             style={{ m: 1, minWidth: 90 }}
//           />
//         </div>
//         <SortData sort={sort} handleSortChange={handleSortChange} />
//       </div>
//       <hr />
//       <DisplayData data={data} handleOpen={handleOpen} />
//     </main>
//   );
// }



