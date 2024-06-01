'use server';
import axios from "axios";

const deleteHandler = async (id) => {
    const res = await axios.delete(`http://localhost:8000/resources/?id=${id}`);
    if (res.status === 200) {
        console.log('Asset deleted successfully');
        return {response:'Success',error:null}
    }
    else {
        console.log('Asset not deleted');
        return {response:null,error:'Error occurred'}

    }
}
export default deleteHandler;