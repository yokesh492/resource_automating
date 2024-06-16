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

    console.log('Consoleing things',{
        asset_name: asset,
        description: description,
        link: link,
        category: category,
        tags: tags,
        team:teams,
        type:types,
        date:null
      },url)

    try{
        const response = await axios.post(url, {
          asset_name: asset,
          description: description,
          link: link,
          category: category,
          tags: tags,
          team:teams,
          type:types,
          // date:null
        });

        return {response:response.data,error:null}; 
    }
    catch(error)
 
    {
        console.log({error})
        return {response:null,error:error.message};
    }
}
export default postAssetData;