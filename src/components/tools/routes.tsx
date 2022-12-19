import { RouteObject, Navigate } from 'react-router-dom'
import Layout from '../layout'
import AuthenticationPage from '../auth'
import HomePage from '../homePage'
import NewsFeed from '../news-feed'
import PostDetails from '../post-details'
import SearchPage from '../search-page'
import Profile from '../profile/myprofile'
import AddPost from '../add-post'
import Chat from '../chat'
import PublicProfile from '../profile/public-profile'
import FilteredPosts from '../filtered-posts'



export const Rotues = (id: number): RouteObject[] => ([


    {
        path: '/', element: <Layout />, children: [
            { index: true, element: <HomePage /> },
            {path:'/filteredposts/:page',element:<FilteredPosts />},
            {path:'/updatepost/:page/:post_id',element:<AddPost />},
            { path: '/postdetails/:page/:post_id', element: <PostDetails /> },
            { path: '/publicprofile/:page/:user_id', element: <PublicProfile /> },

            { path: '/news', element: <NewsFeed /> },
           
            { path: '/addpost', element: id === 2 ? <Navigate to="/" /> : <AddPost /> },
            { path: '/messages', element: <Chat /> },
            { path: '/profile', element: <Profile /> },
 
            { path: '/search', element: <SearchPage /> },


        

        ]
    },
    { path: '/auth', element: <AuthenticationPage /> },
    {path:'/*',element:<HomePage />}
  
])