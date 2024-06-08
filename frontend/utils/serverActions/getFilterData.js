import axios from "axios";

const getfilterData = async (props) => {
    const { tags, types, team, category } = props;

    const queryString = [
      tags.length
        ? tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join("&")
        : null,
      types ? `types=${encodeURIComponent(types)}` : null,
      team
        ? `teams=${encodeURIComponent(team)}`
        : null,
      category ? `category=${encodeURIComponent(category)}` : null,
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

  export default getfilterData