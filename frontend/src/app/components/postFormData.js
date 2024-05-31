"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function postFormData() {
  try {
    const response = await axios.post("http://localhost:8000/scrape", {
      link: link,
    });
    console.log(response);
    if (response.status === 200 && response.data) {
      cookies().set("data", JSON.stringify(response.data), {
        path: "/",
        httpOnly: true,
        maxAge: 15,
      });

      return { response: "succuss", error: null };
    }
    else{
        return {response: null, error: 'Invalid Link'};
    }
  } catch (error) {
    console.error("Axios error:", error);
    return { response: null, error: error.response?.data?.detail || "Failed to scrape" };
  }
}
