'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

function Form() {
    const router = useRouter();
   
    const submitHandler = (e) => {
        e.preventDefault();
        const link = e.target.link.value;
        console.log(link);
        router.push('../asset');
    }

return (

        <form className='flex flex-col items-center justify-center' onSubmit={submitHandler}>
            <label htmlFor="link" className='font-bold text-xl'>Enter the Link here</label>
            <input type="text" id='link' className='border border-gray-400 rounded px-2 py-1 mt-2' />
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Submit</button>
        </form>
)
}

export default Form;