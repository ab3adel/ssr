
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import notificationContext from '../context/notification/notification-context'

export const useGetRememberMe=()=>{
    const [isGetRememberMeLoading,setIsLoading]=useState(false)
    const [rememberMeData,setData]=useState<any>({})
    const [rememberMeError,setError]=useState('')
    
    const getRememberMe=useCallback((token:string)=>{
        setIsLoading(true)
        let formdata= new FormData()
        formdata.append('remember_me_token',token)
        axios.post(apis.rememberMe,
          formdata)
          .then(res=>{
            setIsLoading(false)
            if (res.data) {
                setData(res.data.payload)
           
            }
            else {
             setData({})
            }
          })
        
             .catch(err=>{
                setIsLoading(false)
                setError(err.message)
             })
    },[])
    return {getRememberMe,isGetRememberMeLoading,rememberMeData,rememberMeError}

}