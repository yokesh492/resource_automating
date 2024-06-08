import axios from "axios";
import { setJWTCookies, setUserCookies } from "../cookies/setCookies";

const authenticate = async (formData) => {
    const data = {
        username: formData.get('name'),
        password:formData.get('password'),
      };
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/login`, data);
        const userInfo = response.data;

        if (response.status === 200 && !response.data.error) {
            await setUserCookies('userinfo',userInfo);
            await setJWTCookies('session',userInfo);
            return {response:'s',error:null}
        }
        else{
            return {response: null, error: response.data.error || 'Login failed'};
        }
    } catch (error) {
        console.error('Axios error: authenticatoin', error);
        return {response: null, error: error.response?.data?.detail || 'Login failed'};
    }
};

export default authenticate;