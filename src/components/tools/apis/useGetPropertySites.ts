
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import notificationContext from '../context/notification/notification-context'

export const useGetPropertySites=()=>{
    const [isPropertySitesLoading,setIsLoading]=useState(false)
    const [propertySitesData,setData]=useState<any[]>([])
    const [propertySitesError,setError]=useState('')
    const {notify,setNotify}=useContext(notificationContext)
    const getPropertySites=useCallback(()=>{
        setIsLoading(true)
        axios.get(apis.propertySites)
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
    return {getPropertySites,isPropertySitesLoading,propertySitesData,propertySitesError}

}