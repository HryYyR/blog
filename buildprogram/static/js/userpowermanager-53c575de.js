import{d as u,r as p,o as d,ct as c,E as m,c as l,e as i,z as _,l as t,F as b,h as g,s as E}from"./index-d3891d0c.js";import{E as F,a as f}from"./el-table-column-dc002a63.js";import"./el-tag-b6851469.js";import"./el-scrollbar-5bc0e8c5.js";import"./index-c5d2c0da.js";import"./index-1b0c62bb.js";const C=u({__name:"userpowermanager",setup(B){const e=p({gradedata:[],tabledata:[{prop:"id",label:"id"},{prop:"name",label:"\u6635\u79F0"},{prop:"grade",label:"\u6743\u9650\u7B49\u7EA7"},{prop:"createtime",label:"\u521B\u5EFA\u65F6\u95F4"}]});return d(async()=>{const a=await c();if(a.status==200)return e.gradedata=a.data.data;m.error("\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01",a.data.msg)}),(a,h)=>{const o=F,s=f;return t(),l("div",null,[i(s,{data:e.gradedata,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:_(()=>[(t(!0),l(b,null,g(e.tabledata,(r,n)=>(t(),E(o,{prop:r.prop,label:r.label,key:n},null,8,["prop","label"]))),128))]),_:1},8,["data"])])}}});export{C as default};
