import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ModalComponent from '../shared/ModalComponent'
import { useCardModal } from '../../store/store'

const style = 'text-gray-600 text-sm';
const style2 ='my-4 py-1 px-2 text-xs bg-stone-300 rounded-full inline';


const CardHandler = () => {
  const {open,handleClose,data} = useCardModal();

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <div>

      <h2 className='font-bold text-xl mb-1 p-2'>{data.asset_name}</h2>
    
    <div className='px-3 py-1.5'>
        <p className={style}> {data.description}</p>
    </div>
    <div className='px-3 py-1.5'>
        <h5 className={style}>Type</h5>
        <p className={style2}>{data.type}</p>
    </div>
    <div className='px-3 py-1.5'>
        <h5 className={style}>Category</h5>
        <p className={style2}>{data.category}</p>
    </div>
    <div className='px-3 py-1.5'>
        <h5 className={style}>Tags</h5>
        <div className='flex flex-row gap-1 flex-wrap items-center my-2'>
            {data.tags.map((tag, index) => {
              return <p key={index} className='py-1 px-2 text-xs bg-stone-300 rounded-full inline'>{tag}</p>
              })}
        </div>
    </div>
    <div className='px-3 py-1.5'>
        <h5 className={style}>Link</h5>
        <div onClick={(e)=>e.stopPropagation()}>
        <a  href={data.link} target='_blank' className='text-sm my-2 text-blue-500 hover:underline'>{data.link}</a>
        </div>
    </div>
    <div className='px-3 py-1.5'>
        <h5 className={style}>Author</h5>
        <p className='text-sm my-2'><span className='pr-2'><AccountCircleIcon color='disabled'/></span>{data.addedBy}</p>
    </div>
            </div>
    </ModalComponent>
  )
}

export default CardHandler