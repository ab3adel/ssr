
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useGetArea=()=>{
    const [isAreaLoading,setLoading]=useState<boolean>(false)
    const [areaData,setData]=useState<any[]>()
    const [areaError,setError]=useState<string>('')
    const getCountries=useCallback((id:number)=>{
        setLoading(true)
        axios.get(apis.countries)
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
    const getArea=useCallback((id=1)=>{
        setLoading(true)
        axios.get(apis.country_id(id))
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
    return {getCountries,getArea,areaData,areaError,isAreaLoading}
}