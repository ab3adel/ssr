import {getLocalStorage} from '../getLocalstorage'
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useDeletePost=()=>{
    const [isDeletePostLoading,setLoading]=useState<boolean>(false)
    const [deletePostData,setData]=useState<any[]>()
    const [deletePostError,setError]=useState<string>('')
    const deletePost=useCallback((id:number)=>{
        setLoading(true)
        axios.delete(apis.deletePost(id),{
            headers:{'Authorization':`Bearer ${getLocalStorage()?getLocalStorage().token:''}`}
        })
        .then(res=>{
            setLoading(false)
            console.log(res)
            if (res.data){

                setLoading(false)
                setData(res.data.message)
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