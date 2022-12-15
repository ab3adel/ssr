import {atom} from 'recoil'


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
