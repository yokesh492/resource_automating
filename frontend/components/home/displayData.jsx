import React from 'react'

const DisplayData = (props) => {

    if (props.data.length === 0) {
        return (
          <div className=" flex justify-center items-center p-10 text-2xl font-bold">
            <p>No data available</p>
          </div>
        );
      }
  return (
    <div className="m-4 grid lg:grid-cols-5 lg:gap-4 md:grid-cols-4 md:gap-4 grid-cols-3 gap-3">
        {props.data.map((item) => {
          return (
            <Card key={item.id} onClick={(e) => props.handleOpen(item)} {...item} />
          );
        })}
      </div>
  )
}

export default DisplayData