import axios from "axios";

const postAssetData = async (props) => {
    const asset = props.asset;
    const description = props.description;
    const link = props.link;
    const category = props.category;
    const tags = props.tags;
    const teams = props.teams;
    const types = props.types;
    const url = props.url;
    console.log(asset,description,link,category,tags,teams,types,url)
    try{
        const response = await axios.post(url, {
          asset_name: asset,
          description: description,
          link: link,
          category: category,
          tags: tags,
          team:teams,
          type:types,
          date:null
        });
        return {response:response.data,error:null}; 
    }
    catch(error){
        return {response:null,error:error.message};
    }
}
export default postAssetData;