import {useData, useFilters} from '../../store/store';

const handleTypeChange = async (val) => {
    const {tags,team,category,setType} = useFilters();
    const {setData} = useData();
    setType(val);
    
    const data = await getfilterData({ tags, types: val, team: team, category });
    if (data) {
      setData(data);
    } else {
      console.log('Error in type change');
    }
};

export default handleTypeChange;