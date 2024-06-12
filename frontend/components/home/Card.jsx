import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCardModal } from '../../store/store';

const style = 'text-gray-600 text-sm';
const style2 ='my-4 py-1 px-2 text-xs bg-stone-300 rounded-full inline';


function Card(props) {
    const {handleOpen} = useCardModal();
return (
    <div className='rounded-xl bg-white p-4 shadow-md hover:cursor-pointer' onClick={()=>handleOpen(props)}>
        <h2 className='font-bold sm:text-lg mb-1 p-2'>{props.asset_name}</h2>
    
        <div className='px-3 py-1.5'>
            <p className={style}>{props.description.length > 100 ? `${props.description.slice(0, 100)}...` : props.description}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>Type</h5>
            <p className={style2}>{props.type}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>Category</h5>
            <p className={style2}>{props.category}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>Tags</h5>
            <div className='flex flex-row gap-1 flex-wrap items-center my-2'>
                {props.tags.map((tag, index) => {
                    return <p key={index} className='py-1 px-2 text-xs bg-stone-300 rounded-full inline'>{tag}</p>
                })}
            </div>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>Link</h5>
            <div onClick={(e)=>e.stopPropagation()}>
            <a  href={props.link} target='_blank' className='text-sm my-2 hover:text-blue-500 hover:underline'>{props.link}</a>
            </div>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>Author</h5>
            <p className='text-sm my-2'><span className='pr-2'><AccountCircleIcon color='disabled'/></span>{props.addedBy}</p>
        </div>
    </div>
)
}

export default Card