import{d as v,r as w,a as u,c as l,b as a,w as d,e as n,t as _,l as F,m as p,q as D,_ as E,o as B,s as k,u as A,F as y,f as C,p as V,h as I,E as s,v as S,i as $,k as j,x as L,y as R}from"./index-a75bb342.js";import{E as x}from"./el-button-32f32e63.js";import{E as T}from"./el-input-517e1a0e.js";import{a as z}from"./anime.es-826e4a6c.js";import{E as N}from"./el-overlay-284536b1.js";import"./index-5f72763e.js";import"./index-238b0621.js";const M={class:"dialog-footer"},U=p("\u53D6\u6D88"),q=p("\u786E\u5B9A"),Y=v({__name:"tologindialog",props:{isshow:{type:Boolean,default:!1},info:{type:String,default:'"\u4F60\u5F53\u524D\u5C1A\u672A\u767B\u5F55\u65E0\u6CD5\u70B9\u8D5E\uFF0C\u662F\u5426\u524D\u5F80\u767B\u5F55\u9875\u9762\uFF1F"'}},emits:["back"],setup(c,{emit:t}){const f=w({toLoginDialogText:"",isToLoginVisible:!1}),h=()=>{f.isToLoginVisible=!1,D.push({path:"/login"})};return(g,i)=>{const e=x,r=N;return u(),l("div",null,[a(r,{modelValue:c.isshow,"onUpdate:modelValue":i[1]||(i[1]=m=>F(isshow)?isshow.value=m:null),title:"\u767B\u9646\u63D0\u793A",width:"20%",top:"20rem","show-close":!1,"lock-scroll":!1},{footer:d(()=>[n("span",M,[a(e,{onClick:i[0]||(i[0]=m=>t("back"))},{default:d(()=>[U]),_:1}),a(e,{type:"success",onClick:h},{default:d(()=>[q]),_:1})])]),default:d(()=>[n("span",null,_(c.info),1)]),_:1},8,["modelValue"])])}}});const b=c=>(V("data-v-c0f9d6a2"),c=c(),I(),c),G={class:"interaction_container"},H={class:"interaction_body"},J={class:"interaction_body_container"},K=b(()=>n("h1",null,"\u7559\u8A00\u677F",-1)),O={class:"interaction__inputbody"},P={class:"interaction__btnbody"},Q=b(()=>n("span",null,"(\u5EFA\u8BAE\u767B\u9646\u540E\u8BC4\u8BBA\u54E6\uFF01)",-1)),W=p("\u63D0\u4EA4\u7559\u8A00"),X={class:"interaction_comment"},Z=["index"],tt=b(()=>n("div",{class:"interaction_comment_img"},[n("img",{src:"http://hyyyh.top:3001/icon/github.png",alt:""})],-1)),nt={class:"interaction_comment_container"},et={class:"interaction_comment_top"},it={class:"interaction_name"},ot={class:"interaction_time"},at={class:"interaction_comment_mid"},ct={class:"interaction_comment_bottom"},rt=["onClick"],st=["src"],dt=v({__name:"interaction",setup(c){const t=w({textarea:"",commentData:[],isshowtologindialog:!1,userid:localStorage.getItem("id"),username:localStorage.getItem("name"),userhasbeenlaudData:[]});B(async()=>{if(z({targets:[".interaction_body_container"],translateY:"-50vh",opacity:1,duration:2e3}),t.commentData=await(await k()).data.data,t.userid){const i=await A(parseInt(t.userid));t.userhasbeenlaudData=i.data.data.map(e=>e.interactionid),t.commentData.map(e=>{t.userhasbeenlaudData.includes(e.id)?e.islaud=!0:e.islaud=!1})}});const f=async()=>{if(!t.userid||!t.username)return s.error("\u672A\u767B\u5F55");if(t.textarea==""||t.textarea.length<5)return s.error("\u60A8\u8F93\u5165\u7684\u5B57\u6570\u4E0D\u591F\u54E6\uFF01");const i=await S(t.userid,t.username,t.textarea,"1");i.status==200?(t.commentData=i.data.data,t.commentData.map(e=>{t.userhasbeenlaudData.includes(e.id)?e.islaud=!0:e.islaud=!1}),s.success("\u7559\u8A00\u6210\u529F\uFF01")):s.error("\u7559\u8A00\u5931\u8D25\uFF01")},h=async i=>{if(t.userid){const e=await L(i.id,parseInt(t.userid));if(console.log(e),e.status==201){s.error("\u4F60\u5DF2\u7ECF\u70B9\u8D5E\u8FC7\u4E86\uFF01");return}const r=await R(i.id,parseInt(t.userid));r.status==200&&(s.success(r.data.msg),i.laudnum++,i.islaud=!0),console.log(r)}else return t.isshowtologindialog=!0},g=()=>{t.isshowtologindialog=!1};return(i,e)=>{const r=T,m=x;return u(),l(y,null,[n("div",G,[a($,{bgColor:!0}),n("div",H,[n("div",J,[K,n("div",O,[a(r,{modelValue:t.textarea,"onUpdate:modelValue":e[0]||(e[0]=o=>t.textarea=o),rows:2,type:"textarea",placeholder:"\u7559\u4E0B\u4F60\u7684\u5EFA\u8BAE\u5427\uFF01",autosize:{minRows:5,maxRows:6}},null,8,["modelValue"]),n("div",P,[Q,a(m,{type:"primary",class:"submitbtn",onClick:f},{default:d(()=>[W]),_:1})])]),n("div",X,[(u(!0),l(y,null,C(t.commentData,(o,_t)=>(u(),l("div",{class:"interaction_comment_item",index:o.id},[tt,n("div",nt,[n("div",et,[n("span",it,_(o.username),1),n("span",ot,_(o.createtime),1)]),n("div",at,_(o.container),1),n("div",ct,[n("div",{onClick:mt=>h(o)},[n("img",{src:o.islaud?"http://hyyyh.top:3001/icon/laud_0.png":"http://hyyyh.top:3001/icon/laud.png",alt:""},null,8,st),p(_(o.laudnum),1)],8,rt)])])],8,Z))),256))])]),a(j)])]),a(Y,{isshow:t.isshowtologindialog,onBack:g},null,8,["isshow"])],64)}}});var yt=E(dt,[["__scopeId","data-v-c0f9d6a2"]]);export{yt as default};
