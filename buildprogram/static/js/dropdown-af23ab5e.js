import{K as _,bA as P,d as A,U as K,Q as z,O as Y,c as g,e as j,h as y,X as E,n as m,J as o,m as I,u as T,f as N,aY as h,ao as O,Z as k,j as $,$ as v,aN as V,a0 as S,a3 as J,V as B,a1 as L,S as F,o as R,au as D,bB as U,bC as x,a8 as i,M as q,b9 as f}from"./index-0a11e484.js";const G=_({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:P,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),H={close:s=>s instanceof MouseEvent,click:s=>s instanceof MouseEvent},Q={name:"ElTag"},W=A({...Q,props:G,emits:H,setup(s,{emit:a}){const p=s,l=K(),t=z("tag"),u=Y(()=>{const{type:e,hit:c,effect:r,closable:n,round:b}=p;return[t.b(),t.is("closable",n),t.m(e),t.m(l.value),t.m(r),t.is("hit",c),t.is("round",b)]}),C=e=>{a("close",e)},d=e=>{a("click",e)};return(e,c)=>e.disableTransitions?(g(),j("span",{key:0,class:m(o(u)),style:v({backgroundColor:e.color}),onClick:d},[y("span",{class:m(o(t).e("content"))},[E(e.$slots,"default")],2),e.closable?(g(),I(o(k),{key:0,class:m(o(t).e("close")),onClick:O(C,["stop"])},{default:T(()=>[N(o(h))]),_:1},8,["class","onClick"])):$("v-if",!0)],6)):(g(),I(V,{key:1,name:`${o(t).namespace.value}-zoom-in-center`,appear:""},{default:T(()=>[y("span",{class:m(o(u)),style:v({backgroundColor:e.color}),onClick:d},[y("span",{class:m(o(t).e("content"))},[E(e.$slots,"default")],2),e.closable?(g(),I(o(k),{key:0,class:m(o(t).e("close")),onClick:O(C,["stop"])},{default:T(()=>[N(o(h))]),_:1},8,["class","onClick"])):$("v-if",!0)],6)]),_:3},8,["name"]))}});var X=S(W,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const pe=J(X),Z={inheritAttrs:!1};function ee(s,a,p,l,t,u){return E(s.$slots,"default")}var te=S(Z,[["render",ee],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);const oe={name:"ElCollectionItem",inheritAttrs:!1};function se(s,a,p,l,t,u){return E(s.$slots,"default")}var ne=S(oe,[["render",se],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);const ae="data-el-collection-item",le=s=>{const a=`El${s}Collection`,p=`${a}Item`,l=Symbol(a),t=Symbol(p),u={...te,name:a,setup(){const d=B(null),e=new Map;L(l,{itemMap:e,getItems:()=>{const r=o(d);if(!r)return[];const n=Array.from(r.querySelectorAll(`[${ae}]`));return[...e.values()].sort((w,M)=>n.indexOf(w.ref)-n.indexOf(M.ref))},collectionRef:d})}},C={...ne,name:p,setup(d,{attrs:e}){const c=B(null),r=F(l,void 0);L(t,{collectionItemRef:c}),R(()=>{const n=o(c);n&&r.itemMap.set(n,{ref:n,...e})}),D(()=>{const n=o(c);r.itemMap.delete(n)})}};return{COLLECTION_INJECTION_KEY:l,COLLECTION_ITEM_INJECTION_KEY:t,ElCollection:u,ElCollectionItem:C}},ue=_({trigger:U.trigger,effect:{...x.effect,default:"light"},type:{type:i(String)},placement:{type:i(String),default:"bottom"},popperOptions:{type:i(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:i([Number,String]),default:0},maxHeight:{type:i([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:i(Object)}}),de=_({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:q}}),me=_({onKeydown:{type:i(Function)}}),ce=[f.down,f.pageDown,f.home],re=[f.up,f.pageUp,f.end],fe=[...ce,...re],{ElCollection:Ce,ElCollectionItem:ge,COLLECTION_INJECTION_KEY:Ee,COLLECTION_ITEM_INJECTION_KEY:_e}=le("Dropdown");export{_e as C,Ce as E,fe as F,re as L,de as a,ae as b,le as c,ue as d,ge as e,me as f,Ee as g,pe as h,G as t};