
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import notificationContext from '../context/notification/notification-context'

export const useGetRoles=()=>{
    const [isGetRolesLoading,setIsLoading]=useState(false)
    const [rolesData,setData]=useState<any[]>([])
    const [rolesError,setError]=useState('')
    const {notify,setNotify}=useContext(notificationContext)
    const getRoles=useCallback(()=>{
        setIsLoading(true)
        axios.get(apis.roles)
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
    return {getRoles,isGetRolesLoading,rolesData,rolesError}

}