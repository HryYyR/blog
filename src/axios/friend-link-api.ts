import axios from 'axios'


// 申请友联
export function applyFriendLink(name: string, website: string, icon: string, email: string, container: string, userid?: string, username?: string) {
   return axios({
      method: 'post',
      url: `/api/applyFriendLink`,
      data: {
         name: name,
         website: website,
         icon: icon,
         email: email,
         container: container,
         userid: userid || '-1',
         username: username || '-1'
      }
   })
}


// 获取所有友联数据
export function getFriendLink() {
   return axios({
      method: 'post',
      url: '/api/getFriendLink',
   })
}