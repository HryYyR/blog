import{_ as p,d as _,r as m,o as f,g,E as r,a as E,c as b,e as v,b as a,w as d,ce as B,m as C}from"./index-8009cad9.js";import{E as D,a as h}from"./el-table-column-ce1b8dec.js";import"./el-tag-2ce6a889.js";import{E as y}from"./el-input-8f45020a.js";import{E as F}from"./el-button-ce02580b.js";import"./index-9320d674.js";import"./index-6716a8ec.js";const w={class:"record"},x={class:"recordEdit"},V=C("\u6DFB\u52A0\u8BB0\u5F55"),k=_({__name:"recordmanager",setup(N){const t=m({recordData:[],inputContainer:""});f(async()=>{const e=await g();if(e.status==201)return r.error("\u83B7\u53D6\u8BB0\u5F55\u5931\u8D25\uFF01");t.recordData=e.data.data});const s=async()=>{if(t.inputContainer.length<5)return r.error("\u975E\u6CD5\u8F93\u5165\uFF01");const e=await B(t.inputContainer);if(e.status==201)return r.error(e.data.msg);r.success(e.data.msg),t.recordData=e.data.data};return(e,n)=>{const c=F,i=y,o=D,u=h;return E(),b("div",w,[v("div",x,[a(c,{type:"primary",onClick:s},{default:d(()=>[V]),_:1}),a(i,{modelValue:t.inputContainer,"onUpdate:modelValue":n[0]||(n[0]=l=>t.inputContainer=l),clearable:""},null,8,["modelValue"])]),a(u,{data:t.recordData,style:{width:"100%"},sortable:"",border:"",stripe:""},{default:d(()=>[a(o,{prop:"id",label:"id",width:"80"}),a(o,{prop:"container",label:"container",width:"380"}),a(o,{prop:"createtime",label:"createtime"})]),_:1},8,["data"])])}}});var q=p(k,[["__scopeId","data-v-40635802"]]);export{q as default};
