import { useFilters, useData } from "../../store/store";

const filterCategoryFetcher = async (val) => {
    const { tags, types, team, category, setCategory } = useFilters();
    const { setData } = useData();

    setCategory((prevValue) => (prevValue === val ? "" : val));

    const data = await getfilterData({
        tags,
        types,
        team: team,
        category: val,
    });

    if (data) {
        setData(data);
    }
    else {
        console.log('Error in category change');
    }
}

export default filterCategoryFetcher;

