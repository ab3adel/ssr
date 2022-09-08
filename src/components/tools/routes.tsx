import {RouteObject} from 'react-router-dom'
import Layout from '../layout'
import AuthenticationPage from '../auth'
import HomePage from '../homePage'
import NewsFeed  from '../news-feed'





export const Rotues: RouteObject []  = [
 
    {path:'/',element:<Layout/>,children:[
        {index:true,element:<HomePage />},
        {path:'/news',element:<NewsFeed />}
        
    ]},
    {path:'/auth',element:<AuthenticationPage/>}
]