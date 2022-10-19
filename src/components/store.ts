import {atom} from 'recoil'


export const Posts=atom<any[]>({
    key:'Posts',
default:[]
})