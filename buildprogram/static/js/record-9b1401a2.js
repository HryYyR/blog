import{_ as p,d as f,u as g,r as h,w as m,o as _,bs as b,E as u,c as d,e as v,f as t,n as o,F as x,h as y,l as i,m as k,q as C,t as n}from"./index-d3891d0c.js";import{a as w}from"./anime.es-826e4a6c.js";const D={class:"record_body"},j={class:"record_container"},z=f({__name:"record",setup(B){let s=g();const e=h({bgUrl:"http://hyyyh.top:3001/recordbg.jpg",recordData:[],themeColor:s.state.themeColor});return m(s.state,(r,l)=>{e.themeColor=r.themeColor}),_(async()=>{const r=await b();if(r.status==201)return u.error(r.data.msg);e.recordData=r.data.data,w({targets:[".record_body"],translateX:"10rem",duration:1e3})}),(r,l)=>(i(),d("div",null,[v(k,{bgColor:!0}),t("div",{class:"record",style:o({backgroundImage:`linear-gradient(${e.themeColor.start},${e.themeColor.end})`})},[t("div",D,[t("div",{class:"rope",style:o({borderColor:e.themeColor.id!=3?"rgba(0, 0, 0, 0.1)":"rgba(255,255,255,0.3)"})},null,4),t("div",j,[(i(!0),d(x,null,y(e.recordData,(c,a)=>(i(),d("div",{class:C(["record_item",a%2==0?"before":"after"]),key:a},[t("p",{class:"record_text",style:o({color:a%3==0&&e.themeColor.id!=3?"black":"white"})},n(c.container),5),t("p",{class:"record_time",style:o({color:e.themeColor.id!=3?"black":"rgba(255,255,255,0.5)"})},n(c.createtime),5)],2))),128))])])],4)]))}});var V=p(z,[["__scopeId","data-v-193682f8"]]);export{V as default};
