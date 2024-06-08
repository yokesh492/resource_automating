import { useFilters, useData } from "../../store/store";

const filterTagsFetcher = async (val) => {
    const { type, team, category, setTags } = useFilters();
    const { setData } = useData();
    setTags(val);
    const data = await getfilterData({ tags: val, types: type, team, category });
    if (data) {
        setData(data);
    } else {
        console.log('Error in tags change');
    }
}

export default filterTagsFetcher;