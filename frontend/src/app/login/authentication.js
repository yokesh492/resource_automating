'use server';
import axios from "axios";
import { cookies } from 'next/headers'

export const authenticate = async () => {
    try {
        const response = await axios.post('http://localhost:8000/login', {
          name,
          password,
        });

      if (response.data.access_token) {
            cookies.set('session',response.token,{
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3, 
                path: '/',
            })
            return {response,error:null}
        }
        else{
            return {response: null, error: 'Invalid Credentials'};
        }
        
      } catch (error) { 
          console.error('Axios error:', error);
          return {response: null, error: error.response?.data?.detail || 'Login failed'};
      }
    };
