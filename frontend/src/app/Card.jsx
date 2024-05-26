import React from 'react'

const style = 'text-gray-400 font-bold text-sm';

function Card(props) {
  return (
    <div className='rounded-xl p-4 shadow-md'>
        <h2 className='font-bold text-lg mb-1 p-2'>{props.asset_name}</h2>
        <div className='px-3 py-1.5'>
            <h5 className={style}>ASSET NAME</h5>
            <p className='text-sm'>{props.asset_name}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>CATEGORY</h5>
            <p className='inline bg-pink-300 px-2 py-1 rounded-2xl'>{props.category}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>DESCRIPTION</h5>
            <p>{props.description}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>LINK</h5>
            <p>{props.link}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>tags</h5>
            <div className='flex flex-row gap-3 items-center'>
                {props.tags.map((tag, index) => {
                    return <p key={index} className='inline px-2 py-1 rounded-2xl bg-yellow-200'>{tag}</p>
                }
                )}
            </div>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>DATE</h5>
            <p>{props.date}</p>
        </div>

    </div>
  )
}

export default Card