import{d as k,r as A,c as d,e as l,f as r,u as p,h as e,t as _,x as V,y,z as $,_ as j,o as S,A as D,B as z,F as v,i as B,p as L,k as R,E as a,C as E,l as N,j as T,D as U,G as M,H as G}from"./index-ba4d140d.js";import{E as C}from"./el-button-e55f48a9.js";import{E as H}from"./el-input-ad6a3b8d.js";import{a as Y}from"./anime.es-826e4a6c.js";import{E as q}from"./el-overlay-f969222e.js";import"./index-60b00dcd.js";import"./index-e5f1f05a.js";const J={class:"dialog-footer"},K=y("\u53D6\u6D88"),O=y("\u786E\u5B9A"),P=k({__name:"tologindialog",props:{isshow:{type:Boolean,default:!1},info:{type:String,default:'"\u4F60\u5F53\u524D\u5C1A\u672A\u767B\u5F55\u65E0\u6CD5\u70B9\u8D5E\uFF0C\u662F\u5426\u524D\u5F80\u767B\u5F55\u9875\u9762\uFF1F"'}},emits:["back"],setup(c,{emit:t}){const g=A({toLoginDialogText:"",isToLoginVisible:!1}),b=()=>{g.isToLoginVisible=!1,$.push({path:"/login"})};return(h,m)=>{const f=C,o=q;return d(),l("div",null,[r(o,{modelValue:c.isshow,"onUpdate:modelValue":m[1]||(m[1]=n=>V(isshow)?isshow.value=n:null),title:"\u767B\u9646\u63D0\u793A",width:"20%",top:"20rem","show-close":!1,"lock-scroll":!1},{footer:p(()=>[e("span",J,[r(f,{onClick:m[0]||(m[0]=n=>t("back"))},{default:p(()=>[K]),_:1}),r(f,{type:"success",onClick:b},{default:p(()=>[O]),_:1})])]),default:p(()=>[e("span",null,_(c.info),1)]),_:1},8,["modelValue"])])}}});const x=c=>(L("data-v-528cdef3"),c=c(),R(),c),Q={class:"interaction_container"},W={class:"interaction_body"},X={class:"interaction_body_container"},Z=x(()=>e("h1",null,"\u7559\u8A00\u677F",-1)),tt={class:"interaction__inputbody"},et={class:"interaction__btnbody"},nt=x(()=>e("span",null,"(\u5EFA\u8BAE\u767B\u9646\u540E\u8BC4\u8BBA\u54E6\uFF01)",-1)),ot=y("\u63D0\u4EA4\u7559\u8A00"),it={class:"interaction_comment"},at=["index"],rt=x(()=>e("div",{class:"interaction_comment_img"},[e("img",{src:"http://hyyyh.top:3001/icon/github.png",alt:""})],-1)),ct={class:"interaction_comment_container"},st={class:"interaction_comment_top"},dt={class:"interaction_name"},lt={class:"interaction_time"},_t=["onClick"],mt={class:"interaction_comment_bottom"},ut=["onClick"],pt=["src"],yt={class:"reply"},ft=["onClick"],gt={style:{color:"skyblue"}},bt={key:0,class:"replydialog"},ht=y("\u8BC4\u8BBA"),vt=k({__name:"interaction",setup(c){const t=A({textarea:"",commentData:[],isshowtologindialog:!1,userid:localStorage.getItem("id"),username:localStorage.getItem("name"),userhasbeenlaudData:[],replycontent:"",newopenreplydialogIndex:-1});S(async()=>{if(Y({targets:[".interaction_body_container"],translateY:"-50vh",opacity:1,duration:1e3}),t.commentData=await(await D()).data.data,t.commentData.map(o=>{o.isopenreply=!1}),t.userid){const o=await z(parseInt(t.userid));t.userhasbeenlaudData=o.data.data.map(n=>n.interactionid),t.commentData.map(n=>{t.userhasbeenlaudData.includes(n.id)?n.islaud=!0:n.islaud=!1})}});const g=async()=>{if(!t.userid||!t.username)return a.error("\u672A\u767B\u5F55");if(t.textarea==""||t.textarea.length<5)return a.error("\u60A8\u8F93\u5165\u7684\u5B57\u6570\u4E0D\u591F\u54E6\uFF01");const o=await E(t.userid,t.username,t.textarea,"1",0,-1);o.status==200?(t.commentData=o.data.data,t.commentData.map(n=>{t.userhasbeenlaudData.includes(n.id)?n.islaud=!0:n.islaud=!1}),a.success("\u7559\u8A00\u6210\u529F\uFF01")):a.error("\u7559\u8A00\u5931\u8D25\uFF01")},b=async o=>{if(t.userid){const n=await M(o.id,parseInt(t.userid));if(console.log(n),n.status==201){a.error("\u4F60\u5DF2\u7ECF\u70B9\u8D5E\u8FC7\u4E86\uFF01");return}const u=await G(o.id,parseInt(t.userid));u.status==200&&(a.success(u.data.msg),o.laudnum++,o.islaud=!0),console.log(u)}else return t.isshowtologindialog=!0},h=(o,n)=>{if(n==t.newopenreplydialogIndex){t.newopenreplydialogIndex=-1,o.isopenreply=!1;return}t.newopenreplydialogIndex!=-1&&(t.commentData[t.newopenreplydialogIndex].isopenreply=!1),o.isopenreply=!0,t.newopenreplydialogIndex=n},m=async()=>{if(!t.userid||!t.username)return a.error("\u672A\u767B\u5F55");if(t.replycontent=="")return a.error("\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\uFF01");if((await E(t.userid,t.username,t.replycontent,"1",1,t.commentData[t.newopenreplydialogIndex].id)).status==201){a.error("\u8BC4\u8BBA\u5931\u8D25\uFF01\uFF01");return}t.commentData=await(await D()).data.data,t.commentData[t.newopenreplydialogIndex].isopenreply=!1,t.newopenreplydialogIndex=-1,t.replycontent="",a.success("\u8BC4\u8BBA\u6210\u529F\uFF01")},f=()=>{t.isshowtologindialog=!1};return(o,n)=>{const u=H,w=C;return d(),l(v,null,[e("div",Q,[r(N,{bgColor:!0}),e("div",W,[e("div",X,[Z,e("div",tt,[r(u,{modelValue:t.textarea,"onUpdate:modelValue":n[0]||(n[0]=i=>t.textarea=i),rows:2,type:"textarea",placeholder:"\u7559\u4E0B\u4F60\u7684\u5EFA\u8BAE\u5427\uFF01",autosize:{minRows:5,maxRows:6}},null,8,["modelValue"]),e("div",et,[nt,r(w,{type:"primary",class:"submitbtn",onClick:g},{default:p(()=>[ot]),_:1})])]),e("div",it,[(d(!0),l(v,null,B(t.commentData,(i,F)=>(d(),l("div",{class:"interaction_comment_item",index:i.id},[rt,e("div",ct,[e("div",st,[e("span",dt,_(i.username),1),e("span",lt,_(i.createtime),1)]),e("div",{class:"interaction_comment_mid",onClick:s=>h(i,F)},_(i.container),9,_t),e("div",mt,[e("div",{onClick:s=>b(i)},[e("img",{src:i.islaud?"http://hyyyh.top:3001/icon/laud_0.png":"http://hyyyh.top:3001/icon/laud.png",alt:""},null,8,pt),y(_(i.laudnum),1)],8,ut),e("div",yt,[e("span",{onClick:s=>h(i,F)},"\u56DE\u590D",8,ft)])]),(d(!0),l(v,null,B(i.childen,(s,I)=>(d(),l("div",{key:I,class:"replycontainer"},[e("span",null,[e("span",gt,_(s.username),1),y(":"+_(s.container),1)])]))),128)),i.isopenreply?(d(),l("div",bt,[r(u,{class:"replytextarea",type:"textarea",modelValue:t.replycontent,"onUpdate:modelValue":n[1]||(n[1]=s=>t.replycontent=s)},null,8,["modelValue"]),r(w,{class:"replybtn",type:"primary",onClick:m},{default:p(()=>[ht]),_:1})])):T("",!0)])],8,at))),256))])]),r(U)])]),r(P,{isshow:t.isshowtologindialog,onBack:f},null,8,["isshow"])],64)}}});var At=j(vt,[["__scopeId","data-v-528cdef3"]]);export{At as default};
