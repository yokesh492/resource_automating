'use server';
import axios from "axios";
import { cookies } from 'next/headers'

export const authenticate = async () => {
    try {
        const response = await axios.post('https://localhost.com/data', {
          email,
          password,
        });

        if(response.status ===200){
            cookies.set('session',response.token,{
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3, 
                path: '/',
            })
            return {response,error:null}
        }
  
        else if(response.status !== 200) {
          return {response: null, error: 'Invalid credentials'};
        }
        else{
            return {response: null, error: 'Server error'};
        }
        
      } catch (error) { 
          console.error('Axios error:', error);
          return {response: null, error: error};
      }
    };
