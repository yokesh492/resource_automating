
export const filterNotiData = (data, link) => {
    let filterData = data.filter((item)=>{
        return item.link === link;
    })
    return filterData;
}

