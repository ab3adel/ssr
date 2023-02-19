import {useState,useCallback,useRef} from 'react'




export const useHide=()=> {
    const ref= useRef<any>()
    const [hide,setHide]=useState(false)
    const handleShow=(e:React.MouseEvent)=>{

        if (ref.current === e.target) {
            setHide(!hide)
        }
    }
    return {ref,handleShow,hide}
}