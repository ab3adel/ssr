import './leftside-bar.scss'
import {SidebarLg} from './sidebar-lg'
import {SidebarSm} from './sidebar-sm'

const LeftSideBar= (props:any)=>{
 
    return (
        <>
            {
                props.children
            }
        </>
    )
}
export default LeftSideBar;