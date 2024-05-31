'use server';
import { cookies } from "next/headers";
import axios from 'axios';


const dataFetcher = async () => {
  const userInfo = cookies().get('userinfo')?.value;
  console.log(userInfo.userid)
  if(userInfo === undefined ){
      console.log('User not logged in');
      return redirect('/login');
  }

    // const userInfo = cookies().get('userinfo')?.value;
    console.log(userInfo)
    if(userInfo === undefined ){
        console.log('User not logged in');
      return {data:null,error:'User not logged in',userInfo:null}
    }
    try {
      const response = await axios.get(`http://localhost:8000/resources`);//${userInfo.userid}
      const data = response.data;
      return {data:data,error: null,userInfo:userInfo}

    } catch (error) {
      console.error('Axios error:', error);
      return {data:null,error:error,userInfo:null}
    }
  };

  export default dataFetcher;