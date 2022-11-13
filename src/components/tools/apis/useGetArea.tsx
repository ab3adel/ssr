
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useGetArea=()=>{
    const [isAreaLoading,setLoading]=useState<boolean>(false)
    const [areaData,setData]=useState<any[]>()
    const [areaError,setError]=useState<string>('')
    const [isCountriesLoading,setCountriesLoading]=useState<boolean>(false)
    const [countriesData,setCountriesData]=useState<any[]>()
    const [countriesError,setCountriesError]=useState<string>('')
    const getCountries=useCallback(()=>{
        setCountriesLoading(true)
        axios.get(apis.countries)
        .then(res=>{
            
            setCountriesLoading(false)
            if (res.data){

                setCountriesLoading(false)
                setCountriesData(res.data.payload)
            }
           else {
            setCountriesData([])
           }

        })
        .catch(err=>{
            setCountriesLoading(false)
            setCountriesError(err.message)
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
    return {getCountries,getArea,areaData,countriesData
        ,countriesError,isCountriesLoading,areaError,isAreaLoading}
}