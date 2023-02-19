import {createContext} from 'react'
interface iProps{notify:{show:boolean,message:string,type:boolean},setNotify:any}
const notificationContext= createContext<iProps>({notify:{show:false,message:'',type:true}
                                       ,setNotify:()=>{}})

export default notificationContext;