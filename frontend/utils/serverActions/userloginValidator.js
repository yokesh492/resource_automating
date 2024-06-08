import { redirect } from "next/navigation";
import { getCookies } from "../cookies/getCookies";


const fetchUserId = async () => {
  const userInfo = getCookies('userinfo');
  console.log(userInfo,'userinfio');
  if(userInfo){
      console.log('User not logged in');
      return redirect('/login');
  }
  return {error:null,id: userInfo.userid};
   
}
export default fetchUserId;
