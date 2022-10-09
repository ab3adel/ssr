import {createContext} from 'react'
import {iToken} from '../../interface'
interface iAuth {token:iToken,setToken:Function}
const authContext = createContext <iAuth>({token:{token:'',refresh_token:'',role:-1,full_name:'',profile_picture:''},setToken:()=>{}})
export default authContext;