import { RouteObject, Navigate } from 'react-router-dom'
import Layout from '../layout'
import AuthenticationPage from '../auth'
import HomePage from '../homePage'
import NewsFeed from '../news-feed'
import PostDetails from '../post-details'

import Profile from '../profile/myprofile'
import AddPost from '../add-post'
import Chat from '../chat'
import PublicProfile from '../profile/public-profile'




export const Rotues =(id:number) :RouteObject []  =>( [
 

    {
        path: '/', element: <Layout />, children: [
            { index: true, element: <HomePage /> },
            { path: '/news', element: <NewsFeed /> },
            { path: '/postdetails/:id', element: <PostDetails /> },
            { path: '/addpost', element: id === 2 ? <Navigate to="/" /> : <AddPost /> },
            { path: '/messages', element: <Chat /> },
            {path:'/profile',element:<Profile/>},
            {path:'/publicprofile/:id',element:<PublicProfile/>}

        ]
    },
    { path: '/auth', element: <AuthenticationPage /> }
])