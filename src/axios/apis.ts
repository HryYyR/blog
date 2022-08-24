import axios from 'axios'
import { Base64 } from 'js-base64'
axios.defaults.baseURL = 'http://localhost:3001'

// 获取所有博客
export function getBlogData(pageNum: number, num: number) {
   return axios({
      method: 'get',
      url: `/api/getBlogData?pageNum=${pageNum}&num=${num}`,
   })
}

// 获取指定博客
export function getAssignBlogData(id: number) {
   return axios({
      method: 'post',
      url: '/api/getAssignBlogData',
      data: {
         id: id
      }
   })
}

// 获取指定标签分类的博客
export function getAssignSortLabelData(sortid: number, labelid: number) {
   return axios({
      method: 'post',
      url: '/getAssignSortLabelData',
      data: {
         sortid: sortid,
         labelid: labelid
      }
   })
}

// 检查token
export function verifyToken() {
   const token = localStorage.getItem('token')!
   const baseToken = Base64.encode(`${token}:`)
   const encode = `Base64 ${baseToken}`
   return axios({
      method: 'post',
      url: '/api/verifyToken',
      headers: {
         'Authorization': encode
      }
   })
}

// 发布评论
export function publishComment(userId: number, blogId: number, container: string, userName: string, blogName: string) {
   return axios({
      method: 'post',
      url: '/api/publishComment',
      data: {
         userId: userId,
         blogId: blogId,
         container: container,
         userName: userName,
         blogName: blogName
      }
   })
}
// 获取指定博客的评论
export function getAssignComment(blogId: number) {
   return axios({
      method: 'post',
      url: '/api/getAssignComment',
      data: {
         blogId: blogId
      }
   })
}

// 点赞
export function laud(blogId: number, userId: number) {
   return axios({
      method: 'post',
      url: '/api/laud',
      data: {
         blogId: blogId,
         userId: userId
      }
   })
}

// 获取指定博客点赞数
export function getLaudNum(blogid: number) {
   return axios({
      method: 'post',
      url: '/api/getLaudNum',
      data: {
         blogid: blogid
      }
   })
}

// 检查指定博客是否已经点赞
export function hasBeenLaud(blogid: number, userid: number) {
   return axios({
      method: 'post',
      url: '/api/hasBeenLaud',
      data: {
         blogid: blogid,
         userid: userid
      }
   })
}



// 登录
export function login(user: string, pass: string) {
   return axios({
      method: 'post',
      url: '/login',
      data: {
         user: user,
         pass: pass
      }
   })
}

// 登录
export function rigister(user: string, pass: string,email:string) {
   return axios({
      method: 'post',
      url: '/rigister',
      data: {
         user: user,
         pass: pass,
         email:email
      }
   })
}

// 退出登录
export function loginout(userId: number) {
   return axios({
      method: 'post',
      url: '/api/loginout',
      data: {
         userId: userId
      }
   })
}

// 获取所有记录数据
export function getRecordData() {
   return axios({
      method: 'post',
      url: '/admin/getRecordData',
   })
}

// 添加记录
export function addRecord(container: string) {
   return axios({
      method: 'post',
      url: '/admin/addRecord',
      data: {
         container: container
      }
   })
}

// 上传图片
export function File(img: string) {
   return axios({
      method: 'post',
      url: '/File',
      data: {
         img: img
      }
   })
}


// 添加留言
export function addinteraction(userid: string, username: string, container: string, islogin: String) {
   return axios({
      method: 'post',
      url: '/api/addinteraction',
      data: {
         userid: userid,
         username: username,
         container: container,
         islogin: islogin
      }
   })
}


// 获取所有留言
export function getallinteraction() {
   return axios({
      method: 'post',
      url: '/api/getallinteraction',
   })
}

// 点赞留言
export function luadinteraction(interactionid: number, userid: number) {
   return axios({
      method: 'post',
      url: '/api/luadinteraction',
      data: {
         interactionid: interactionid,
         userid: userid
      }
   })
}

// 点赞留言
export function interactionhasBeenLaud(interactionid: number, userid: number) {
   return axios({
      method: 'post',
      url: '/api/interactionhasBeenLaud',
      data: {
         userid: userid,
         interactionid: interactionid

      }
   })
}


// 获取指定用户 已点赞的评论 的id数组
export function getassigninteractionlaud( userid: number) {
   return axios({
      method: 'post',
      url: '/api/getassigninteractionlaud',
      data: {
         userid: userid,
      }
   })
}