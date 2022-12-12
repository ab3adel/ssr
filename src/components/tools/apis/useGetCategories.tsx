
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import { getLocalStorage } from '../getLocalstorage'


export const useGetCategories=()=>{
    const [isCategoriesLoading,setLoading]=useState<boolean>(false)
    const [categoriesData,setData]=useState<any[]>()
    const [CategoriesError,setError]=useState<string>('')
    const [isGenericTagsLoading,setIsGenericTagsLoading]=useState<boolean>(false)
    const [genericTagsData,setGenericTagsData]=useState<any[]>()
    const [genericTagsError,setGenericTagsError]=useState<string>('')
    const getCategories=useCallback((is_category:number,category_id?:number)=>{
        setLoading(true)
        axios.get(apis.categories(is_category,category_id),
        )
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
    const getGenericTags=useCallback(()=>{
        setIsGenericTagsLoading(true)
        axios.get(apis.categories(0),
        )
        .then(res=>{
            setIsGenericTagsLoading(false)
            if (res.data){

           
                setGenericTagsData(res.data.payload)
            }
           else {
            setGenericTagsData([])
           }

        })
        .catch(err=>{
            setIsGenericTagsLoading(false)
            setGenericTagsError(err.message)
        })
    },[])

    return {getCategories
        ,categoriesData
        ,CategoriesError
        ,isCategoriesLoading
        ,getGenericTags
        ,genericTagsData
        ,isGenericTagsLoading
        ,genericTagsError
    }
}