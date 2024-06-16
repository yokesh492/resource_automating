import axios from "axios";
import fetchUser from "./userloginValidator";

const dataFetcher = async (url) => {
  const res = await fetchUser();
  const userInfo = res.userInfo;

  try {
    const response = await axios.get(url); //${userInfo.userid}
    const data = response.data;

    if (data) {
      console.log(data);
      return { data: data, error: null, userInfo: userInfo };
    }
    else {
      return { data: null, error: response.error, userInfo: null };
    }
  } catch (error) {
    console.error("Axios error:", error);
    return { data: null, error: error, userInfo: null };
  }
};

export default dataFetcher;
