import { useFilters, useData } from "../../store/store";

const filterTeamFetcher = async () => {
    const { tags, types, category, team } = useFilters();
    const { setData } = useData();
    const data = await getfilterData({ tags, types, team: val, category });
    if (data) {
        setData(data);
    } else {
        console.log('Error in team change');
    }
}

export default filterTeamFetcher;