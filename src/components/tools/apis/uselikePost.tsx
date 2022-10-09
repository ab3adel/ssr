
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useLikePost=()=>{
    const [isLikeLoading,setLoading]=useState<boolean>(false)
    const [likeData,setData]=useState<any[]>()
    const [likeError,setError]=useState<string>('')
    const setLike=useCallback((id:number)=>{
        setLoading(true)
        axios.get(apis.likePost(id))
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
        axios.get(apis.unLikePost(id))
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