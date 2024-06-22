'use client';
import axios from "axios";
import filterSelectedValues from "../helper/formatFilter";


const getfilterData = async (tagsData, typeData, state, team) => {
   
  console.log(tagsData,typeData,state,team,'from getfilterdaga');

    const { tags, types, category } = filterSelectedValues(tagsData, typeData, state);
  console.log(tags,types,category,team,'afteter getfilterdaga');

    const queryString = [
      tags.length
        ? tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
        types.length
        ? types.map((type) => `types=${encodeURIComponent(type)}`).join("&")
        : null,
      team
        ? `teams=${encodeURIComponent(team)}`
        : null,
        category.length
        ? category.map((cat) => `category=${encodeURIComponent(cat)}`).join("&")
        : null,
    ].filter(Boolean)
      .join("&");

    console.log(queryString);

    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTION}/resources/filter/?${queryString}`;

      const response = await axios.get(url);

      if (response.status === 200 && !response.data.error) {
        const data = await response.data;
        console.log("Received data:", data);

        return data
      } else {
        console.error("Error fetching data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
        return null;
    }
  };

  export default getfilterData;