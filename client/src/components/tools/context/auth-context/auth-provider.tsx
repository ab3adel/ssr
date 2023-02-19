import authContext from "./auth-context";
import {useState} from 'react'

const AuthContextProvider=(props:any)=> {
    const [token,setToken]=useState({token:'',full_name:'',role:-1,refresh_token:'',profile_picture:''})

    return (
        <authContext.Provider value={{token,setToken}}>
            {props.children}
        </authContext.Provider>
    )
}
export default AuthContextProvider;