'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchData = async () => {
    const userInfo = cookies().get('userinfo')?.value;
    if(userInfo === undefined ){
        console.log('User not logged in');
        return redirect('/login');
    }

    try {
        const response = await axios.get('http://localhost:8000/scrape');
        const data = response.data;

        return {data:data,error: null,id:userInfo.userid}
        
      } catch (error) {
        console.error('Axios error:', error);
        return {data:null,error:error,id:null}
      }
}
export default fetchData;
