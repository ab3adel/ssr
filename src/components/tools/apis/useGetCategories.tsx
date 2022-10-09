
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useGetCategories=()=>{
    const [isCategoriesLoading,setLoading]=useState<boolean>(false)
    const [categoriesData,setData]=useState<any[]>()
    const [CategoriesError,setError]=useState<string>('')
    const getCategories=useCallback((is_category:number,category_id=5)=>{
        setLoading(true)
        axios.get(apis.categories(is_category,category_id))
        .then(res=>{
            setLoading(false)
            if (res.data){

                setLoading(false)
                setData(res.data.payload)
            }
           else {
            setData([])
           }

        })
        .catch(err=>{
            setLoading(false)
            setError(err.message)
        })
    },[])
    return {getCategories,categoriesData,CategoriesError,isCategoriesLoading}
}