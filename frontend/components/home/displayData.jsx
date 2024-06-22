import React from 'react'
import Card from './Card'

const DisplayData = (props) => {
  
    if (!props.data || props.data.length === 0) {
        return (
          <div className=" flex justify-center items-center p-10 text-2xl font-bold">
            <p>No data available</p>
          </div>
        );
      }
  return (
    <div className="m-8 grid lg:grid-cols-4 lg:gap-6 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-3 grid-rows-1 gap-3">
        {props.data?.map((item,ind) => {
          return (
            <Card key={ind} {...item} />
          );
        })}
      </div>
  )
}

export default DisplayData