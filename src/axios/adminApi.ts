import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'

// 获取所有数据
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

// 获取所有标签数据
export function getAdminLabelData(){
   return axios({
      method:'post',
      url: '/admin/getLabelData',
    })
}

// 获取所有分类数据
export function getAdminSortData(){
   return axios({
      method:'post',
      url: '/admin/getSortData',
    })
}

// 获取所有评论数据
export function getAdminCommentData(){
   return axios({
      method:'post',
      url: '/admin/getCommentData',
    })
}

// 获取所有点赞数据
export function getAdminLuadData(){
   return axios({
      method:'post',
      url: '/admin/getLaudData',
    })
}

// 获取所有用户数据
export function getAdminUserData(){
   return axios({
      method:'post',
      url: '/admin/getUserData',
    })
}

// 获取所有权限数据
export function getAdminGradeData(){
   return axios({
      method:'post',
      url: '/admin/getGradeData',
    })
}

// 添加博客
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

// 删除博客
export function deleteBlog(id:number){
   return axios({
      method:'post',
      url: '/admin/deleteblog',
      data:{
         id:id
      }
    })
}