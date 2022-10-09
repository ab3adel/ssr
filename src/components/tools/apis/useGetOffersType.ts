
import {useCallback, useContext,useState} from 'react'
import axios from './axios'
import {apis} from './apis'


export const useGetOffersType=()=>{
    const [isOffersTypeLoading,setLoading]=useState<boolean>(false)
    const [offersTypeData,setData]=useState<any[]>()
    const [offersTypeError,setError]=useState<string>('')
    const getOffers=useCallback((is_price_type:number,type_id=3)=>{
        setLoading(true)
        axios.get(apis.offersType(is_price_type,type_id))
        .then(res=>{
            setLoading(false)
            if (res.data){

                setLoading(false)
                setData(res.data.payload)
            }
            else {
              
                if (is_price_type){
                    setData([])
                }
            }

        })
        .catch(err=>{
            setLoading(false)
            setError(err.message)
        })
    },[])
    return {getOffers,offersTypeData,offersTypeError,isOffersTypeLoading}
}