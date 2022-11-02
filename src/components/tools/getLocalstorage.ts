
export const getLocalStorage=()=>{

    let item =localStorage.getItem('token')
    return item? JSON.parse(item): null
}