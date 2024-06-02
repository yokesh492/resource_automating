"use server";
import axios from "axios";

export const Signup = async (formData) => {
    const data = {
        username: formData.get('name'),
        email: formData.get('email'),
        password:formData.get('password'),
      };
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/signup`, data);
        const userInfo = response.data;

      if (response.status === 200 && !response.data.error) {
            return {response:'success',error:null}
        }
        else{
            return {response: null, error: response.data.error || 'Signup failed'};
        }
        
      } catch (error) { 
          console.error('Axios error: authenticatoin', error);
          return {response: null, error: error.response?.data?.detail || 'Signup failed'};
      }
    };
    
      