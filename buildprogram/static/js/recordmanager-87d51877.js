import{_ as a,d as t,r,o as e,bi as s,E as o,G as n,c as i,e as d,h as c,f as l,x as p,cE as u,z as m}from"./index-26b86a81.js";import{E as b,a as f}from"./el-table-column-d7fbae54.js";import"./el-tag-ca330286.js";import"./el-scrollbar-17681325.js";import{E as C}from"./el-button-bf5e0c7c.js";const _={class:"record"},g={class:"recordEdit"},h=m("添加记录");var j=a(t({__name:"recordmanager",setup(a){const t=r({recordData:[],inputContainer:""});e((async()=>{const a=await s();if(201==a.status)return o.error("获取记录失败！");t.recordData=a.data.data}));const m=async()=>{if(t.inputContainer.length<5)return o.error("非法输入！");const a=await u(t.inputContainer);if(201==a.status)return o.error(a.data.msg);o.success(a.data.msg),t.recordData=a.data.data,t.inputContainer=""};return(a,r)=>{const e=C,s=n,o=b,u=f;return i(),d("div",_,[c("div",g,[l(e,{type:"primary",onClick:m},{default:p((()=>[h])),_:1}),l(s,{modelValue:t.inputContainer,"onUpdate:modelValue":r[0]||(r[0]=a=>t.inputContainer=a),clearable:""},null,8,["modelValue"])]),l(u,{data:t.recordData,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:p((()=>[l(o,{prop:"id",label:"id",width:"80"}),l(o,{prop:"container",label:"container",width:"380"}),l(o,{prop:"createtime",label:"createtime"})])),_:1},8,["data"])])}}}),[["__scopeId","data-v-106607b3"]]);export{j as default};