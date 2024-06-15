import axios from "axios";

const postHomeTeamHandler = async (homeTeam) => {
    try {
        let response;
        if(homeTeam === "All") {
            response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTION}/resources`);
        }else{
            response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTION}/resources/teams/?teams=${homeTeam}`);
        }

        if (response.status === 200 && response.data.error === undefined) {
            return response.data;
        }
        else {
            console.error(response.data.error);
            return null;
        }
    } catch (error) {
        console.error("Axios error:", error);
        return null;
    }
    }

export default postHomeTeamHandler;