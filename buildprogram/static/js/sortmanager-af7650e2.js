import{_ as a,d as t,r as s,o as e,a as l,c as r,e as o,x as d,k as p,F as i,h as n,q as b}from"./index-0769d9a3.js";import{E as c,a as h}from"./el-table-column-536898bf.js";import"./el-tag-0c7a2423.js";import"./el-scrollbar-2e6fa9ac.js";const m={class:"container"};var w=a(t({__name:"sortmanager",setup(a){const t=s({tableData:[{prop:"id",label:"ID",width:""},{prop:"name",label:"名称",width:""},{prop:"num",label:"数量",width:""},{prop:"addtime",label:"添加时间",width:""},{prop:"adduser",label:"添加用户",width:""}],sortData:[]});return e((async()=>{const a=await l();t.sortData=a.data})),(a,s)=>{const e=c,l=h;return p(),r("div",m,[o(l,{data:t.sortData,style:{width:"95%"},height:"100%",stripe:"",border:""},{default:d((()=>[(p(!0),r(i,null,n(t.tableData,((a,t)=>(p(),b(e,{prop:a.prop,label:a.label,width:a.width?a.width:"",sortable:"",key:t},null,8,["prop","label","width"])))),128))])),_:1},8,["data"])])}}}),[["__scopeId","data-v-7f74aa00"]]);export{w as default};