import { redirect } from "next/navigation";
import { getCookies } from "../cookies/getCookies";


const fetchUser = async () => {
  const userInfo = await getCookies('userinfo');
  console.log(userInfo,'userinfio');
  if(!userInfo){
      console.log('User not logged in');
      return redirect('/login');
  }
  return {error:null,userInfo:userInfo};
   
}
export default fetchUser;
