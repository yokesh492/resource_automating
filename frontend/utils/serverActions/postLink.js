import axios from "axios";

export default async function postLink(props) {
  try {
    console.log(props,'this is props')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/scrape`, {
      link: props,
    });
    console.log(response,'this is resp');
    
    if (response.status === 200 && !response.data.error) {
      return { response: response.data, error: null };
    }
    else{
        return {response: null, error: response.data.error || 'Invalid link'};
    }
  } catch (error) {
    console.error("Axios error:", error.message);
    return { response: null, error: error.response?.data?.detail || "Failed to scrape" };
  }
}
