'use server';
import { cookies } from "next/headers";
import axios from 'axios';
import { redirect } from "next/navigation";


const dataFetcher = async () => {
  const userInfo = JSON.parse(cookies().get('userinfo')?.value);
  if(userInfo === undefined ){
      console.log('User not logged in');
      return redirect('/login');
  }
    console.log(userInfo)
    if(userInfo === undefined ){
      console.log('User not loggin');
      return {data:null,error:'User not logged in',userInfo:null}
    }
    try {
      const response = await axios.get(`http://91.108.104.64:8001/resources`); //${userInfo.userid}
      const data = response.data;
      
      if(data){
        console.log(data);
        return {data:data,error: null,userInfo:userInfo}
      }
      //made a change here to check for error
      else{
        return {data:null,error:response.error,userInfo:null}
      }

    } catch (error) {
      console.error('Axios error:', error);
      return {data:null,error:error,userInfo:null}
    }
  };

  export default dataFetcher;