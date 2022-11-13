
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import {iGetProfile} from '../interface'
import {getLocalStorage} from '../getLocalstorage'
export const useGetProfile=()=>{
    const [isGetProfileLoading,setLoading]=useState<boolean>(false)
    const [getProfileData,setData]=useState<any[] | any>()
    const [getProfileError,setError]=useState<string>('')
    const getProfile=useCallback((
      params:Partial<iGetProfile>
    )=>{
        
        setLoading(true)
        axios.get(apis.profile(
             params
            ),
            {
                headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
              }
          
            )
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
    return {getProfile,getProfileData,getProfileError,isGetProfileLoading }
}