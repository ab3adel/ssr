
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import { getLocalStorage } from '../getLocalstorage'


export const useGetFollowingFollowers=()=>{
    const [isFollowingLoading,setFollowingLoading]=useState<boolean>(false)
    const [isFollowersLoading,setFollowersLoading]=useState<boolean>(false)
    const [followingData,setFollowingData]=useState<any[]>()
    const [followersData,setFollowersData]=useState<any[]>()
    const [followingError,setFollowingError]=useState<string>('')
    const [followersError,setFollowersError]=useState<string>('')
    const getFollowers=useCallback(()=>{
        setFollowersLoading(true)
        axios.get(apis.followers,{
            headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
          })
        .then(res=>{
            setFollowersLoading(false)
            if (res.data){

               
                setFollowersData(res.data.payload)
            }
           else {
            setFollowersData([])
           }

        })
        .catch(err=>{
            setFollowersLoading(false)
            setFollowersError(err.message)
        })
    },[])
    const getFollowings=useCallback(()=>{
        setFollowingLoading(true)
        axios.get(apis.followings,{
            headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
          })
        .then(res=>{
            setFollowingLoading(false)
            if (res.data){

               
                setFollowingData(res.data.payload)
            }
           else {
            setFollowingData([])
           }

        })
        .catch(err=>{
            setFollowingLoading(false)
            setFollowingError(err.message)
        })
    },[])
    return {getFollowers,getFollowings,followersData,followingData
        ,isFollowersLoading,isFollowingLoading,followersError,followingError}
}