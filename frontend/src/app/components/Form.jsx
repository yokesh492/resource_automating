'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import postFormData from './postFormData';

function Form(props) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
   
    const sendLinkData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const link = e.target.link.value;
        console.log(link);

        const {response,error} = await postFormData(link);
        if(response === 'succuss'){
            router.push('/asset');
        }
        else{
            console.log(error)
        }
      }
    
return (

        <form className='flex flex-col items-center justify-center' onSubmit={sendLinkData}>
            <label htmlFor="link" className='font-bold text-xl'>Enter the Link here</label>
            <input type="text" id='link' className='border border-gray-400 rounded px-2 py-1 mt-2' />
{  !loading &&          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Submit</button>}        
{  loading &&          <button  className='bg-gray-300 py-2 px-4 rounded mt-4' disabled><CircularProgress /></button>}     
   </form>
)
}

export default Form;