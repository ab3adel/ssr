
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import notificationContext from '../context/notification/notification-context'

export const useGetPropertyType=()=>{
    const [propertyTypeLoading,setIsLoading]=useState(false)
    const [propertyTypesData,setData]=useState<any[]>([])
    const [propertyTypesError,setError]=useState('')
    const {notify,setNotify}=useContext(notificationContext)
    const getPropertyType=useCallback(()=>{
        setIsLoading(true)
        axios.get(apis.propertyType)
             .then(res=>{
                if (res.data) {
                    setIsLoading(false)
                    setData(res.data.payload)
                }
             })
             .catch(err=>{
                setIsLoading(false)
                setError(err.message)
             })
    },[])
    return {getPropertyType,propertyTypeLoading,propertyTypesData,propertyTypesError}

}