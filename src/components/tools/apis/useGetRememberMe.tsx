
import {useCallback, useContext,useEffect,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import notificationContext from '../context/notification/notification-context'
import { getLocalStorage } from '../getLocalstorage'

export const useGetRememberMe=()=>{
    const [isGetRememberMeLoading,setIsLoading]=useState(false)
    const [rememberMeData,setData]=useState<any>({})
    const [rememberMeError,setError]=useState('')
    let getRememberMe=async (token:string)=>{
        setIsLoading(true)
        let formdata= new FormData()
        formdata.append('remember_me_token',token)
    let response= await axios.post(apis.rememberMe,formdata)
          .then(res=>{
            setIsLoading(false)
            if (res.data) {
                setData(res.data.payload)
                return res.data.payload
            }
            else {
             setData(null)
             return null
            }
          })
        
             .catch(err=>{
                setIsLoading(false)
                setError(err.message)
             })
             return response
    }

    return {getRememberMe,isGetRememberMeLoading,rememberMeData,rememberMeError}

}