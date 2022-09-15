import{L as W,d as A,T as Z,R as F,ax as Q,W as s,P,av as ee,bB as R,a3 as Y,c as E,m as $,u as I,w as le,v as re,h as M,n as H,K as d,a0 as O,aO as oe,a1 as j,ar as ae,e as q,f as X,F as te,a9 as se,a8 as _,aw as D,J as K,aj as ce,ak as U,a2 as ie,r as ne,o as ge,am as ve,Y as ue,Z as de,j as he,as as fe,a4 as me}from"./index-a554956c.js";const G=Symbol("scrollbarContextKey"),x=4,pe={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},be=({move:h,size:c,bar:f})=>({[f.size]:c,transform:`translate${f.axis}(${h}%)`}),ye=W({vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean}),we=A({__name:"thumb",props:ye,setup(h){const c=h,f="Thumb",r=Z(G),i=F("scrollbar");r||Q(f,"can not inject scrollbar context");const n=s(),a=s(),m=s({}),o=s(!1);let y=!1,w=!1,k=ae?document.onselectstart:null;const l=P(()=>pe[c.vertical?"vertical":"horizontal"]),T=P(()=>be({size:c.size,move:c.move,bar:l.value})),z=P(()=>n.value[l.value.offset]**2/r.wrapElement[l.value.scrollSize]/c.ratio/a.value[l.value.offset]),L=t=>{var g;if(t.stopPropagation(),t.ctrlKey||[1,2].includes(t.button))return;(g=window.getSelection())==null||g.removeAllRanges(),N(t);const v=t.currentTarget;!v||(m.value[l.value.axis]=v[l.value.offset]-(t[l.value.client]-v.getBoundingClientRect()[l.value.direction]))},B=t=>{if(!a.value||!n.value||!r.wrapElement)return;const g=Math.abs(t.target.getBoundingClientRect()[l.value.direction]-t[l.value.client]),v=a.value[l.value.offset]/2,b=(g-v)*100*z.value/n.value[l.value.offset];r.wrapElement[l.value.scroll]=b*r.wrapElement[l.value.scrollSize]/100},N=t=>{t.stopImmediatePropagation(),y=!0,document.addEventListener("mousemove",C),document.addEventListener("mouseup",S),k=document.onselectstart,document.onselectstart=()=>!1},C=t=>{if(!n.value||!a.value||y===!1)return;const g=m.value[l.value.axis];if(!g)return;const v=(n.value.getBoundingClientRect()[l.value.direction]-t[l.value.client])*-1,b=a.value[l.value.offset]-g,J=(v-b)*100*z.value/n.value[l.value.offset];r.wrapElement[l.value.scroll]=J*r.wrapElement[l.value.scrollSize]/100},S=()=>{y=!1,m.value[l.value.axis]=0,document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",S),u(),w&&(o.value=!1)},p=()=>{w=!1,o.value=!!c.size},e=()=>{w=!0,o.value=y};ee(()=>{u(),document.removeEventListener("mouseup",S)});const u=()=>{document.onselectstart!==k&&(document.onselectstart=k)};return R(Y(r,"scrollbarElement"),"mousemove",p),R(Y(r,"scrollbarElement"),"mouseleave",e),(t,g)=>(E(),$(oe,{name:d(i).b("fade"),persisted:""},{default:I(()=>[le(M("div",{ref_key:"instance",ref:n,class:H([d(i).e("bar"),d(i).is(d(l).key)]),onMousedown:B},[M("div",{ref_key:"thumb",ref:a,class:H(d(i).e("thumb")),style:O(d(T)),onMousedown:L},null,38)],34),[[re,t.always||o.value]])]),_:1},8,["name"]))}});var V=j(we,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);const ke=W({always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}}),xe=A({__name:"bar",props:ke,setup(h,{expose:c}){const f=h,r=s(0),i=s(0);return c({handleScroll:a=>{if(a){const m=a.offsetHeight-x,o=a.offsetWidth-x;i.value=a.scrollTop*100/m*f.ratioY,r.value=a.scrollLeft*100/o*f.ratioX}}}),(a,m)=>(E(),q(te,null,[X(V,{move:r.value,ratio:a.ratioX,size:a.width,always:a.always},null,8,["move","ratio","size","always"]),X(V,{move:i.value,ratio:a.ratioY,size:a.height,vertical:"",always:a.always},null,8,["move","ratio","size","always"])],64))}});var ze=j(xe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);const Se=W({height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:Boolean,wrapStyle:{type:se([String,Object,Array]),default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20}}),_e={scroll:({scrollTop:h,scrollLeft:c})=>[h,c].every(_)},Ee={name:"ElScrollbar"},He=A({...Ee,props:Se,emits:_e,setup(h,{expose:c,emit:f}){const r=h,i=F("scrollbar");let n,a;const m=s(),o=s(),y=s(),w=s("0"),k=s("0"),l=s(),T=s(1),z=s(1),L=P(()=>{const e={};return r.height&&(e.height=D(r.height)),r.maxHeight&&(e.maxHeight=D(r.maxHeight)),[r.wrapStyle,e]}),B=()=>{var e;o.value&&((e=l.value)==null||e.handleScroll(o.value),f("scroll",{scrollTop:o.value.scrollTop,scrollLeft:o.value.scrollLeft}))};function N(e,u){fe(e)?o.value.scrollTo(e):_(e)&&_(u)&&o.value.scrollTo(e,u)}const C=e=>{!_(e)||(o.value.scrollTop=e)},S=e=>{!_(e)||(o.value.scrollLeft=e)},p=()=>{if(!o.value)return;const e=o.value.offsetHeight-x,u=o.value.offsetWidth-x,t=e**2/o.value.scrollHeight,g=u**2/o.value.scrollWidth,v=Math.max(t,r.minSize),b=Math.max(g,r.minSize);T.value=t/(e-t)/(v/(e-v)),z.value=g/(u-g)/(b/(u-b)),k.value=v+x<e?`${v}px`:"",w.value=b+x<u?`${b}px`:""};return K(()=>r.noresize,e=>{e?(n==null||n(),a==null||a()):({stop:n}=ce(y,p),a=R("resize",p))},{immediate:!0}),K(()=>[r.maxHeight,r.height],()=>{r.native||U(()=>{var e;p(),o.value&&((e=l.value)==null||e.handleScroll(o.value))})}),ie(G,ne({scrollbarElement:m,wrapElement:o})),ge(()=>{r.native||U(()=>p())}),ve(()=>p()),c({wrap$:o,update:p,scrollTo:N,setScrollTop:C,setScrollLeft:S,handleScroll:B}),(e,u)=>(E(),q("div",{ref_key:"scrollbar$",ref:m,class:H(d(i).b())},[M("div",{ref_key:"wrap$",ref:o,class:H([e.wrapClass,d(i).e("wrap"),{[d(i).em("wrap","hidden-default")]:!e.native}]),style:O(d(L)),onScroll:B},[(E(),$(de(e.tag),{ref_key:"resize$",ref:y,class:H([d(i).e("view"),e.viewClass]),style:O(e.viewStyle)},{default:I(()=>[ue(e.$slots,"default")]),_:3},8,["class","style"]))],38),e.native?he("v-if",!0):(E(),$(ze,{key:0,ref_key:"barRef",ref:l,height:k.value,width:w.value,always:e.always,"ratio-x":z.value,"ratio-y":T.value},null,8,["height","width","always","ratio-x","ratio-y"]))],2))}});var Te=j(He,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);const Ce=me(Te);export{Ce as E};