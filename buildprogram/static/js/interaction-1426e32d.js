import{d as A,r as k,c as _,e as m,f as c,u as p,h as n,t as s,x as $,y as b,z as j,_ as S,o as z,A as F,B as L,F as v,i as D,p as R,k as N,E as r,C as B,D as E,l as T,j as U,G as M,H as P,I as G}from"./index-a554956c.js";import{E as C}from"./el-button-90a5eefa.js";import{E as H}from"./el-input-11bdd916.js";import{a as Y}from"./anime.es-826e4a6c.js";import{E as q}from"./el-overlay-9b48c7d2.js";import"./index-14eb07b0.js";import"./index-ea4c4c3f.js";const J={class:"dialog-footer"},K=b("\u53D6\u6D88"),O=b("\u786E\u5B9A"),Q=A({__name:"tologindialog",props:{isshow:{type:Boolean,default:!1},info:{type:String,default:'"\u4F60\u5F53\u524D\u5C1A\u672A\u767B\u5F55\u65E0\u6CD5\u70B9\u8D5E\uFF0C\u662F\u5426\u524D\u5F80\u767B\u5F55\u9875\u9762\uFF1F"'}},emits:["back"],setup(l,{emit:t}){const g=k({toLoginDialogText:"",isToLoginVisible:!1}),h=()=>{g.isToLoginVisible=!1,j.push({path:"/login"})};return(f,u)=>{const y=C,o=q;return _(),m("div",null,[c(o,{modelValue:l.isshow,"onUpdate:modelValue":u[1]||(u[1]=e=>$(isshow)?isshow.value=e:null),title:"\u767B\u9646\u63D0\u793A",width:"20%",top:"20rem","show-close":!1,"lock-scroll":!1},{footer:p(()=>[n("span",J,[c(y,{onClick:u[0]||(u[0]=e=>t("back"))},{default:p(()=>[K]),_:1}),c(y,{type:"success",onClick:h},{default:p(()=>[O]),_:1})])]),default:p(()=>[n("span",null,s(l.info),1)]),_:1},8,["modelValue"])])}}});const I=l=>(R("data-v-15bb1978"),l=l(),N(),l),W={class:"interaction_container"},X={class:"interaction_body"},Z={class:"interaction_body_container"},tt=I(()=>n("h1",null,"\u7559\u8A00\u677F",-1)),nt={class:"interaction__inputbody"},et={class:"interaction__btnbody"},ot=I(()=>n("span",null,"(\u5EFA\u8BAE\u767B\u9646\u540E\u8BC4\u8BBA\u54E6\uFF01)",-1)),it=b("\u63D0\u4EA4\u7559\u8A00"),at={class:"interaction_comment"},rt=["index"],ct={class:"interaction_comment_img"},st=["src"],lt={class:"interaction_comment_container"},dt={class:"interaction_comment_top"},_t={class:"interaction_name"},mt={class:"interaction_time"},ut={class:"interaction_time"},pt=["onClick"],bt={class:"interaction_comment_bottom"},yt=["onClick"],gt=["src"],ht={class:"reply"},ft=["onClick"],vt={style:{color:"skyblue"}},xt={key:0,class:"replydialog"},wt=b("\u8BC4\u8BBA"),Ft=A({__name:"interaction",setup(l){const t=k({textarea:"",commentData:[],isshowtologindialog:!1,userid:localStorage.getItem("id"),username:localStorage.getItem("name"),userhasbeenlaudData:[],replycontent:"",newopenreplydialogIndex:-1});z(async()=>{if(Y({targets:[".interaction_body_container"],translateY:"-50vh",opacity:1,duration:1e3}),t.commentData=await(await F()).data.data,t.commentData.map(o=>{o.isopenreply=!1}),t.userid){const o=await L(parseInt(t.userid));t.userhasbeenlaudData=o.data.data.map(e=>e.interactionid),t.commentData.map(e=>{t.userhasbeenlaudData.includes(e.id)?e.islaud=!0:e.islaud=!1})}});const g=async()=>{if(!t.userid||!t.username)return r.error("\u672A\u767B\u5F55");if(t.textarea==""||t.textarea.length<5)return r.error("\u60A8\u8F93\u5165\u7684\u5B57\u6570\u4E0D\u591F\u54E6\uFF01");let{ip:o}=await B();const e=await E(t.userid,t.username,t.textarea,"1",0,-1,o);e.status==200?(t.commentData=e.data.data,t.commentData.map(a=>{t.userhasbeenlaudData.includes(a.id)?a.islaud=!0:a.islaud=!1}),r.success("\u7559\u8A00\u6210\u529F\uFF01"),t.textarea=""):r.error("\u7559\u8A00\u5931\u8D25\uFF01")},h=async o=>{if(t.userid){const e=await P(o.id,parseInt(t.userid));if(console.log(e),e.status==201){r.error("\u4F60\u5DF2\u7ECF\u70B9\u8D5E\u8FC7\u4E86\uFF01");return}const a=await G(o.id,parseInt(t.userid));a.status==200&&(r.success(a.data.msg),o.laudnum++,o.islaud=!0),console.log(a)}else return t.isshowtologindialog=!0},f=(o,e)=>{if(e==t.newopenreplydialogIndex){t.newopenreplydialogIndex=-1,o.isopenreply=!1;return}t.newopenreplydialogIndex!=-1&&(t.commentData[t.newopenreplydialogIndex].isopenreply=!1),o.isopenreply=!0,t.newopenreplydialogIndex=e},u=async()=>{if(!t.userid||!t.username)return r.error("\u672A\u767B\u5F55");if(t.replycontent=="")return r.error("\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\uFF01");let{ip:o}=await B();if((await E(t.userid,t.username,t.replycontent,"1",1,t.commentData[t.newopenreplydialogIndex].id,o)).status==201){r.error("\u8BC4\u8BBA\u5931\u8D25\uFF01\uFF01");return}t.commentData=await(await F()).data.data,t.commentData[t.newopenreplydialogIndex].isopenreply=!1,t.newopenreplydialogIndex=-1,t.replycontent="",r.success("\u8BC4\u8BBA\u6210\u529F\uFF01")},y=()=>{t.isshowtologindialog=!1};return(o,e)=>{const a=H,x=C;return _(),m(v,null,[n("div",W,[c(T,{bgColor:!0}),n("div",X,[n("div",Z,[tt,n("div",nt,[c(a,{modelValue:t.textarea,"onUpdate:modelValue":e[0]||(e[0]=i=>t.textarea=i),rows:2,type:"textarea",placeholder:"\u7559\u4E0B\u4F60\u7684\u5EFA\u8BAE\u5427\uFF01",autosize:{minRows:5,maxRows:6}},null,8,["modelValue"]),n("div",et,[ot,c(x,{type:"primary",class:"submitbtn",onClick:g},{default:p(()=>[it]),_:1})])]),n("div",at,[(_(!0),m(v,null,D(t.commentData,(i,w)=>(_(),m("div",{class:"interaction_comment_item",index:i.id},[n("div",ct,[n("img",{src:i.avatar||"http://hyyyh.top:3001/icon/github.png",alt:""},null,8,st)]),n("div",lt,[n("div",dt,[n("span",_t,s(i.username),1),n("span",mt,s(i.createtime),1),n("span",ut,"IP:"+s(i.userip),1)]),n("div",{class:"interaction_comment_mid",onClick:d=>f(i,w)},s(i.container),9,pt),n("div",bt,[n("div",{onClick:d=>h(i)},[n("img",{src:i.islaud?"http://hyyyh.top:3001/icon/laud_0.png":"http://hyyyh.top:3001/icon/laud.png",alt:""},null,8,gt),b(s(i.laudnum),1)],8,yt),n("div",ht,[n("span",{onClick:d=>f(i,w)},"\u56DE\u590D",8,ft)])]),(_(!0),m(v,null,D(i.childen,(d,V)=>(_(),m("div",{key:V,class:"replycontainer"},[n("span",null,[n("span",vt,s(d.username),1),b(":"+s(d.container),1)])]))),128)),i.isopenreply?(_(),m("div",xt,[c(a,{class:"replytextarea",type:"textarea",modelValue:t.replycontent,"onUpdate:modelValue":e[1]||(e[1]=d=>t.replycontent=d)},null,8,["modelValue"]),c(x,{class:"replybtn",type:"primary",onClick:u},{default:p(()=>[wt]),_:1})])):U("",!0)])],8,rt))),256))])]),c(M)])]),c(Q,{isshow:t.isshowtologindialog,onBack:y},null,8,["isshow"])],64)}}});var Vt=S(Ft,[["__scopeId","data-v-15bb1978"]]);export{Vt as default};