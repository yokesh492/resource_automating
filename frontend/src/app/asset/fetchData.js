'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";


const fetchData = async () => {
  const userInfo = JSON.parse(cookies().get('userinfo')?.value);
  if(userInfo === undefined ){
      console.log('User not logged in');
      return redirect('/login');
  }

   const data = JSON.parse()
}
export default fetchData;
