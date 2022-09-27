import {RouteObject} from 'react-router-dom'
import Layout from '../layout'
import AuthenticationPage from '../auth'
import HomePage from '../homePage'
import NewsFeed  from '../news-feed'
import PostDetails from '../post-details'




export const Rotues: RouteObject []  = [
 
    {path:'/',element:<Layout/>,children:[
        {index:true,element:<HomePage />},
        {path:'/news',element:<NewsFeed />},
        {path:'/postdetails/:id',element:<PostDetails/>}
        
    ]},
    {path:'/auth',element:<AuthenticationPage/>}
]