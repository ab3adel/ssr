import {atom} from 'recoil'
interface iNewsFeeds {posts:any[],postsIds:number[]}

export const Posts=atom<any[]>({
    key:'Posts',
default:[]
})
export const PostsIDs=atom <any[]>({
    key:'PostsIDs',
    default:[]
})
export const FilteredPostsParams=atom<any>({
    key:'FilteredPosts',
    default:[]
})

export const newsFeedsPosts = atom<iNewsFeeds> ({
    key:'NewsFeedsPosts',
   default:
    {posts:[],postsIds:[]}
   
    
    
})
