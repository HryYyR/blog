import{_ as s,d as c,r as d,o as p,cc as i,a as t,c as r,b as m,w as _,F as b,f as h,Q as w}from"./index-a75bb342.js";import{E as B,a as g}from"./el-table-column-d65ea889.js";import"./el-tag-f46fcbe0.js";import"./index-5f72763e.js";import"./index-238b0621.js";const f={class:"container"},v=c({__name:"commentmanager",setup(A){const e=d({tableData:[{prop:"id",label:"ID",width:"80"},{prop:"blogusername",label:"\u535A\u5BA2\u540D\u79F0",width:""},{prop:"bloguserid",label:"\u535A\u5BA2\u7528\u6237id",width:"80"},{prop:"blogname",label:"\u8BC4\u8BBA\u7528\u6237\u6635\u79F0",width:""},{prop:"blogid",label:"\u8BC4\u8BBA\u7528\u6237id",width:"80"},{prop:"container",label:"\u5185\u5BB9",width:"700"},{prop:"createtime",label:"\u521B\u5EFA\u65F6\u95F4",width:""}],commentData:[]});return p(async()=>{const o=await i();e.commentData=o.data}),(o,D)=>{const l=B,n=g;return t(),r("div",f,[m(n,{data:e.commentData,style:{width:"95%"},height:"100%",stripe:"",border:""},{default:_(()=>[(t(!0),r(b,null,h(e.tableData,(a,u)=>(t(),w(l,{prop:a.prop,label:a.label,width:a.width?a.width:"",sortable:"",key:u},null,8,["prop","label","width"]))),128))]),_:1},8,["data"])])}}});var k=s(v,[["__scopeId","data-v-11fe3029"]]);export{k as default};