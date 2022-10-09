
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useDeletePost=()=>{
    const [isDeletePostLoading,setLoading]=useState<boolean>(false)
    const [deletePostData,setData]=useState<any[]>()
    const [deletePostError,setError]=useState<string>('')
    const deletePost=useCallback((id:number)=>{
        setLoading(true)
        axios.get(apis.deletePost(id))
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
   
    return {deletePost,deletePostData,deletePostError,isDeletePostLoading}
}