import{d as a,r as e,o as l,cC as r,E as s,c as t,e as p,f as o,x as b,F as d,i,q as n}from"./index-26b86a81.js";import{E as u,a as m}from"./el-table-column-d7fbae54.js";import"./el-tag-ca330286.js";import"./el-scrollbar-17681325.js";const c=a({__name:"userinfomanager",setup(a){const c=e({userdata:[],tabledata:[{prop:"id",label:"id"},{prop:"name",label:"昵称"},{prop:"username",label:"用户名"},{prop:"userip",label:"ip地址"},{prop:"userpass",label:"用户密码"},{prop:"email",label:"用户邮箱"},{prop:"loginnumber",label:"登录次数"},{prop:"createtime",label:"创建时间"},{prop:"lastlogintime",label:"最后登陆时间"},{prop:"userstatus",label:"登陆状态"},{prop:"grade",label:"用户权限等级"}]});return l((async()=>{const a=await r();if(200==a.status)return c.userdata=a.data.data;s.error("获取数据失败！",a.data.msg)})),(a,e)=>{const l=u,r=m;return t(),p("div",null,[o(r,{data:c.userdata,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:b((()=>[(t(!0),p(d,null,i(c.tabledata,((a,e)=>(t(),n(l,{prop:a.prop,label:a.label,key:e},null,8,["prop","label"])))),128))])),_:1},8,["data"])])}}});export{c as default};