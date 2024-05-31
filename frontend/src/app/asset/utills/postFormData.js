"use server";
import axios from "axios";

export default async function postFormData(props) {
  try {
    const response = await axios.post("http://localhost:8000/scrape", {
      link: props.link,
    });
    console.log(response);

    if (response.status === 200 && response.data) {
      return { response: response.data, error: null };
    }
    else{
        return {response: null, error: 'Invalid Link'};
    }
  } catch (error) {
    console.error("Axios error:", error);
    return { response: null, error: error.response?.data?.detail || "Failed to scrape" };
  }
}
