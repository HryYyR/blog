import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'


export function getAdminBlogData(pageNum:number,num:number){
   return axios({
      method:'post',
      url: '/admin/getBlogData',
      data:{
         pageNum:pageNum,
         num:num
      }
    })
}

export function getAdminLabelData(){
   return axios({
      method:'post',
      url: '/admin/getLabelData',
    })
}

export function getAdminSortData(){
   return axios({
      method:'post',
      url: '/admin/getSortData',
    })
}

export function addblog(title:String,container:String,labellist:any,sortID:number,Img:string){
   return axios({
      method:'post',
      url: '/admin/addblog',
      data:{
         title:title,
         container:container,
         labellist:labellist,
         sortID:sortID,
         Img:Img
      }
    })
}

export function deleteBlog(id:number){
   return axios({
      method:'post',
      url: '/admin/deleteblog',
      data:{
         id:id
      }
    })
}