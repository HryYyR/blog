import{_ as s,d as p,r as _,o as i,aP as u,a as t,c as o,b as c,w as b,F as m,f as h,Q as w}from"./index-a75bb342.js";import{E as D,a as f}from"./el-table-column-d65ea889.js";import"./el-tag-f46fcbe0.js";import"./index-5f72763e.js";import"./index-238b0621.js";const g={class:"container"},v=p({__name:"labelmanager",setup(F){const e=_({tableData:[{prop:"id",label:"ID",width:""},{prop:"name",label:"\u540D\u79F0",width:""},{prop:"num",label:"\u6570\u91CF",width:""},{prop:"addtime",label:"\u6DFB\u52A0\u65F6\u95F4",width:""},{prop:"adduser",label:"\u6DFB\u52A0\u7528\u6237",width:""}],labelData:[]});return i(async()=>{const l=await u();e.labelData=l.data}),(l,x)=>{const r=D,n=f;return t(),o("div",g,[c(n,{data:e.labelData,style:{width:"95%"},height:"100%",stripe:"",border:""},{default:b(()=>[(t(!0),o(m,null,h(e.tableData,(a,d)=>(t(),w(r,{prop:a.prop,label:a.label,width:a.width?a.width:"",sortable:"",key:d},null,8,["prop","label","width"]))),128))]),_:1},8,["data"])])}}});var A=s(v,[["__scopeId","data-v-72d17a48"]]);export{A as default};