import{_ as s,d as u,r as i,o as p,cd as c,a as t,c as o,b as _,w as b,F as h,f as m,Q as w}from"./index-c3833d7e.js";import{E as g,a as f}from"./el-table-column-0fc07e82.js";import"./el-tag-38c31dd9.js";import"./index-1366251d.js";import"./index-87bb3d2b.js";const v={class:"container"},D=u({__name:"laudmanager",setup(x){const e=i({tableData:[{prop:"id",label:"ID",width:"80"},{prop:"blogid",label:"\u535A\u5BA2id",width:"80"},{prop:"userid",label:"\u7528\u6237id",width:"80"},{prop:"userip",label:"\u7528\u6237IP\u5730\u5740",width:""},{prop:"createtime",label:"\u521B\u5EFA\u65F6\u95F4",width:""}],LuadData:[]});return p(async()=>{const r=await c();e.LuadData=r.data}),(r,y)=>{const l=g,d=f;return t(),o("div",v,[_(d,{data:e.LuadData,style:{width:"95%"},height:"100%",stripe:"",border:""},{default:b(()=>[(t(!0),o(h,null,m(e.tableData,(a,n)=>(t(),w(l,{prop:a.prop,label:a.label,width:a.width?a.width:"",sortable:"",key:n},null,8,["prop","label","width"]))),128))]),_:1},8,["data"])])}}});var A=s(D,[["__scopeId","data-v-004995ec"]]);export{A as default};
