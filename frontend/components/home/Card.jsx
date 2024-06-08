import React from 'react'

const style = 'text-gray-400 font-bold text-sm';

function Card(props) {
return (
    <div className='rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition duration-300' onClick={props.onClick}>
        <h2 className='font-bold sm:text-lg mb-1 p-2'>{props.asset_name}</h2>
        <div className='px-3 py-1.5'>
            <h5 className={style}>ASSET NAME</h5>
            <p className='text-sm'>{props.asset_name}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>OWNER</h5>
            <p className='inline text-sm  bg-pink-300 px-2 py-1 rounded-2xl'>{props.addedBy}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>CATEGORY</h5>
            <p className='inline text-sm  bg-pink-300 px-2 py-1 rounded-2xl'>{props.category}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>TYPE</h5>
            <p className='inline text-sm  bg-pink-300 px-2 py-1 rounded-2xl'>{props.type}</p>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>DESCRIPTION</h5>
            <p>{props.description}</p>
        </div>
        <div className='px-3 py-1.5' onCl>
            <h5 className={style}>LINK</h5>
            <div onClick={(e)=>e.stopPropagation()}>
            <a href={props.link} target='_blank' className='hover:text-blue-500 hover:underline'>{props.link}</a>
            </div>
        </div>
        <div className='px-3 py-1.5'>
            <h5 className={style}>TAGS</h5>
            <div className='flex flex-row gap-1 flex-wrap items-center'>
                {props.tags.map((tag, index) => {
                    return <p key={index} className='inline px-2 py-1  text-xs  rounded-2xl bg-green-200'>{tag}</p>
                })}
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