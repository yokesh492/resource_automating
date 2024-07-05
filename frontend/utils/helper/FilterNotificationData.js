
export const filterNotiData = (data, id) => {
    let filterData = data.filter((item)=>{
        return item.id === id;
    })
    return filterData;
}

