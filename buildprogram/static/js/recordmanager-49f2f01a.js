import{_ as a,d as t,r,o as e,bi as s,E as o,G as n,c as i,f as d,e as l,x as c,cC as p,k as u,z as m}from"./index-0769d9a3.js";import{E as b,a as f}from"./el-table-column-536898bf.js";import"./el-tag-0c7a2423.js";import"./el-scrollbar-2e6fa9ac.js";import{E as C}from"./el-button-467e1438.js";const _={class:"record"},g={class:"recordEdit"},j=m("添加记录");var w=a(t({__name:"recordmanager",setup(a){const t=r({recordData:[],inputContainer:""});e((async()=>{const a=await s();if(201==a.status)return o.error("获取记录失败！");t.recordData=a.data.data}));const m=async()=>{if(t.inputContainer.length<5)return o.error("非法输入！");const a=await p(t.inputContainer);if(201==a.status)return o.error(a.data.msg);o.success(a.data.msg),t.recordData=a.data.data,t.inputContainer=""};return(a,r)=>{const e=C,s=n,o=b,p=f;return u(),i("div",_,[d("div",g,[l(e,{type:"primary",onClick:m},{default:c((()=>[j])),_:1}),l(s,{modelValue:t.inputContainer,"onUpdate:modelValue":r[0]||(r[0]=a=>t.inputContainer=a),clearable:""},null,8,["modelValue"])]),l(p,{data:t.recordData,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:c((()=>[l(o,{prop:"id",label:"id",width:"80"}),l(o,{prop:"container",label:"container",width:"380"}),l(o,{prop:"createtime",label:"createtime"})])),_:1},8,["data"])])}}}),[["__scopeId","data-v-106607b3"]]);export{w as default};
