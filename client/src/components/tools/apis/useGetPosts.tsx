
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'
import {iGetPosts} from '../interface'
import {getLocalStorage} from '../getLocalstorage'
export const useGetPosts=()=>{
    const [isGetPostsLoading,setLoading]=useState<boolean>(false)
    const [getPostsData,setData]=useState<any[] | any>()
    const [getPostsError,setError]=useState<string>('')
    const getPosts=useCallback((
      params:iGetPosts
    )=>{
       
        setLoading(true)
        axios.get(apis.getPosts(
             params
            ),
            {
                headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
              }
          
            )
        .then(res=>{
            
            setLoading(false)
            if (res.data){
               
        
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
    const getNewsFeeds=useCallback((
        page:number
      )=>{
         
          setLoading(true)
          axios.get(apis.newsfeed(
               page
              ),
              {
                  headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
                }
            
              )
          .then(res=>{
              setLoading(false)
             
              if (res.data){
  
          
                  setData(res.data.payload)
              }
              
  
          })
          .catch(err=>{
              setLoading(false)
              setError(err.message)
          })
      },[])

    return {getPosts,getPostsData,getPostsError,isGetPostsLoading ,getNewsFeeds}
}