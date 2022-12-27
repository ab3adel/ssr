
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useGetPage=()=>{
    const [isGetPageLoading,setLoading]=useState<boolean>(false)
    const [pageData,setData]=useState<any[]>()
    const [pageError,setError]=useState<string>('')
    const getPage=useCallback((title:string)=>{
        setLoading(true)
        axios.get(apis.page(title))
        .then(res=>{
            setLoading(false)
            if (res.data){

                setLoading(false)
                setData(res.data.payload)
            }
           

        })
        .catch(err=>{
            setLoading(false)
            setError(err.message)
        })
    },[])
    return {getPage,pageData,pageError,isGetPageLoading}
}