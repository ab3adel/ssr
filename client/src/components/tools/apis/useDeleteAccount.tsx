import {getLocalStorage} from '../getLocalstorage'
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useDeleteAccount=()=>{
    const [isDeleteAccountLoading,setLoading]=useState<boolean>(false)
    const [deleteAccountData,setData]=useState<any[]>()
    const [deleteAccountError,setError]=useState<string>('')
    const deleteAccount=useCallback(()=>{
        setLoading(true)
        axios.delete(apis.deleteAccount(getLocalStorage().id),{
            headers:{'Authorization':`Bearer ${getLocalStorage()?getLocalStorage().token:''}`}
        })
        .then(res=>{
            setLoading(false)
           
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
   
    return {deleteAccount,deleteAccountData,deleteAccountError,isDeleteAccountLoading}
}