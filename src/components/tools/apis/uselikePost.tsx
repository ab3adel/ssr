
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import authContext from '../context/auth-context/auth-context'

export const useLikePost=()=>{
    const [isLikeLoading,setLoading]=useState<boolean>(false)
    const [likeData,setData]=useState<any[]>()
    const [likeError,setError]=useState<string>('')
    const {token} =useContext(authContext)
    const setLike=useCallback((id:number)=>{
        setLoading(true)
        axios.get(apis.likePost(id),{headers:{"Authorization":`Bearer ${token.token}`}})
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
    const setUnLike=useCallback((id:number)=>{
        setLoading(true)
        axios.get(apis.unLikePost(id),{headers:{"Authorization":`Bearer ${token.token}`}})
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
    return {likeData,likeError,isLikeLoading,setLike,setUnLike}
}