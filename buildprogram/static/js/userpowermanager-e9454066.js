import{d as a,r as e,o as r,cC as t,E as l,c as s,e as d,x as o,k as p,F as n,h as b,q as i}from"./index-60b8dadd.js";import{E as m,a as u}from"./el-table-column-881ed70a.js";import"./el-tag-d253314c.js";import"./el-scrollbar-933e14bd.js";const c=a({__name:"userpowermanager",setup(a){const c=e({gradedata:[],tabledata:[{prop:"id",label:"id"},{prop:"name",label:"昵称"},{prop:"grade",label:"权限等级"},{prop:"createtime",label:"创建时间"}]});return r((async()=>{const a=await t();if(200==a.status)return c.gradedata=a.data.data;l.error("获取数据失败！",a.data.msg)})),(a,e)=>{const r=m,t=u;return p(),s("div",null,[d(t,{data:c.gradedata,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:o((()=>[(p(!0),s(n,null,b(c.tabledata,((a,e)=>(p(),i(r,{prop:a.prop,label:a.label,key:e},null,8,["prop","label"])))),128))])),_:1},8,["data"])])}}});export{c as default};
