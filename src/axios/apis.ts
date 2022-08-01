import axios from 'axios'
import {Base64} from 'js-base64'
axios.defaults.baseURL = 'http://localhost:3001'


export function getBlogData(pageNum:number,num:number){
   return axios({
      method:'get',
      url: `/api/getBlogData?pageNum=${pageNum}&num=${num}`,
    })
}

export function getAssignBlogData(id:number){
   return axios({
      method:'post',
      url: '/api/getAssignBlogData',
      data:{
         id:id
      }
    })
}



export function verifyToken(){
   const token = localStorage.getItem('token')!
   const baseToken = Base64.encode(`${token}:`)
   const encode = `Base64 ${baseToken}`
   return axios({
      method:'post',
      url: '/api/verifyToken',
      headers: {
         'Authorization': encode
     }
    })
}

export function publishComment(userId:number,blogId:number,container:string,userName:string,blogName:string){
   return axios({
      method:'post',
      url: '/api/publishComment',
      data:{
         userId:userId,
         blogId:blogId,
         container:container,
         userName:userName,
         blogName:blogName
      }
    })
}

export function laud(blogId:number,userId:number){
   return axios({
      method:'post',
      url: '/api/laud',
      data:{
         blogId:blogId,
         userId:userId
      }
    })
}

export function getLaudNum(blogid:number){
   return axios({
      method:'post',
      url: '/api/getLaudNum',
      data:{
         blogid:blogid
      }
    })
}

export function hasBeenLaud(blogid:number,userid:number){
   return axios({
      method:'post',
      url: '/api/hasBeenLaud',
      data:{
         blogid:blogid,
         userid:userid
      }
    })
}

export function getAssignComment(blogId:number){
   return axios({
      method:'post',
      url: '/api/getAssignComment',
      data:{
         blogId:blogId
      }
    })
}


export function login(user:string,pass:string){
   return axios({
      method:'post',
      url: '/login',
      data:{
         user:user,
         pass:pass
      }
    })
}

export function loginout(userId:number){
   return axios({
      method:'post',
      url: '/api/loginout',
      data:{
         userId:userId
      }
    })
}

export function getRecordData(){
   return axios({
      method:'post',
      url: '/admin/getRecordData',
    })
}


export function addRecord(container:string){
   return axios({
      method:'post',
      url: '/admin/addRecord',
      data:{
         container:container
      }
    })
}


export function File(img:string){
   return axios({
      method:'post',
      url: '/File',
      data:{
         img:img
      }
    })
}
