"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Chip, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TuneIcon from "@mui/icons-material/Tune";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from '@mui/icons-material/Search';

import DisplayData from "./displayData";
import HomeTeamHandler from "./HomeTeamHandler";
import VizdaleLogo from "../shared/vizdaleLogo";
import Filter from "../Filter/Filter";
import LinkForm from "../link/LinkForm";
import AddAssetForm from "../asset/addAssetForm";
import CardHandler from "./CardHandler";
import logout from "../../utils/serverActions/logout";

import { useData, useFilterModal, useLinkModal, useNotificationModal } from "../../store/store";

import dataFetcher from "../../utils/serverActions/getAllData";
import postHomeTeamHandler from "../../utils/serverActions/postHomeTeamHandler";
import UserDropdown from "./userDropdown";
import NotificationModal from "../Notifications/Notification";
import { useSession, signOut } from "next-auth/react";

const Home = () => {
  const { data, setData } = useData();
  const { handleOpen: handleFilterOpen } = useFilterModal();
  const { handleOpen: handleLinkOpen } = useLinkModal();
  const {handleOpen:handleNotificationOpen} = useNotificationModal();

  const [teams, setTeams] = useState("All");
  const [name, setName] = useState("");
  const [userid, setUserId] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const {data:session} = useSession();
  
  const myData = searchParams.get("data") || null;
  
  // console.log(myData);
  const getData = (url) => {
    console.log(url, "url");
    dataFetcher(url)
      .then((res) => {
        const { data, error, userInfo } = res;
        if (error === undefined || error !== null) {
          console.log({ dataFetcherError: error });
        } else {
          setData(data);
          setName(userInfo?.username);
          setUserId(userInfo?.userid);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (myData === "myresource") {
      getData(
        `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/myresource/?userid=${userid}`
      );
    } else {
      getData(`${process.env.NEXT_PUBLIC_PRODUCTION}/resources`);
    }
  }, [myData,userid]);

  const teamHandler = async (team) => {
    setTeams(team);
    const res = await postHomeTeamHandler(team);
    console.log(res)
    if (res) {
      setData(res);
    } else {
      console.log("Error in teamHandler");
    }
  };
  const logoutHandler = async () => {
    console.log('logging out')
    if(session && session.user){
      console.log('user is loggedin', session.user.name)
      await signOut({redirect:false});
      console.log('logged out 1')
    }
    console.log('logged out 2')
    await logout();
    console.log('logged out 3')
    router.push("/login");

  }

  return (
    
    <main className="pb-6 min-h-screen" style={{ background: "#F9F9F9" }}>
      <Filter />
      <LinkForm />
      <AddAssetForm />
      <CardHandler />
      <NotificationModal />

      <div className="flex flex-row p-4 px-16">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <VizdaleLogo />
        </div>
        <div className="ml-auto ">
          <div className="flex flex-row w-full">
            <div className="bg-dropDown rounded-lg flex flex-row items-center" style={{width:'400px'}} >
                  <input type="text" className="bg-dropDown border-none flex-grow border-dropDown pl-2 rounded-lg h-full focus:outline-none"  placeholder={'Search'}/>
                  <SearchIcon className="float-right mr-2" />
              
            </div>
            {/* <Chip
              variant="contained"
              label={<NotificationsNoneIcon />}
              size="medium"
              style={{padding:"0rem -2rem"}}
              className="m-3 rounded-md"
            ></Chip> */}
            <Badge badgeContent={2} color="primary" className="my-3 mr-1 ml-4">
            <p className="bg-dropDown hover:cursor-pointer rounded-md px-2" onClick={handleNotificationOpen}><NotificationsNoneIcon/></p>
            </Badge>
            {/* <Chip variant="contained" label={<UserName name={name}/>} className="m-3 rounded-md text-base "></Chip> */}
            {/* <Chip
              variant="contained"
              icon={<PermIdentityIcon />}
              label={name}
              size="medium"
              className="m-3 rounded-md text-base "
            ></Chip> */}
            <UserDropdown
              name={name}
              handleResource={() => router.push("/?data=myresource")}
              logout={logoutHandler}
              width={"230px"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-16 my-0">
        <div>
          <HomeTeamHandler
            team={teams}
            teamHandler={teamHandler}
            width={"230px"}
          />
        </div>
        <div className="ml-auto justify-around">
          <Chip
            variant="contained"
            label={"Filter"}
            onClick={() => handleFilterOpen()}
            icon={<TuneIcon color="black" />}
            className="px-3 py-7 mr-4 text-base text-black rounded-md flex-row-reverse"
          ></Chip>
          <Button
            variant="contained"
            className="m-3 py-4 font-bold bg-buttonBlue hover:bg-buttonHover"
            onClick={() => handleLinkOpen()}
          >
            <AddIcon className="mr-3" /> Add a Resource
          </Button>
        </div>
      </div>
      <div className="mx-8">
        <DisplayData data={data} />
      </div>
    </main>
  );
};

export default Home;
