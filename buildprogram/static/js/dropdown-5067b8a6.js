import{B as _,by as P,d as A,N as z,J as K,H as Y,a as g,c as j,e as y,P as E,n as m,A as o,Q as I,w as b,b as N,bm as k,ak as O,S as h,U as v,j as $,aJ as J,V as T,Y as V,O as L,W as w,L as D,o as F,aq as R,bz as U,bA as q,a2 as i,D as x,b3 as f}from"./index-c3833d7e.js";const H=_({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:P,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),W={close:s=>s instanceof MouseEvent,click:s=>s instanceof MouseEvent},G={name:"ElTag"},Q=A({...G,props:H,emits:W,setup(s,{emit:l}){const p=s,a=z(),t=K("tag"),u=Y(()=>{const{type:e,hit:c,effect:r,closable:n,round:S}=p;return[t.b(),t.is("closable",n),t.m(e),t.m(a.value),t.m(r),t.is("hit",c),t.is("round",S)]}),C=e=>{l("close",e)},d=e=>{l("click",e)};return(e,c)=>e.disableTransitions?(g(),j("span",{key:0,class:m(o(u)),style:$({backgroundColor:e.color}),onClick:d},[y("span",{class:m(o(t).e("content"))},[E(e.$slots,"default")],2),e.closable?(g(),I(o(h),{key:0,class:m(o(t).e("close")),onClick:O(C,["stop"])},{default:b(()=>[N(o(k))]),_:1},8,["class","onClick"])):v("v-if",!0)],6)):(g(),I(J,{key:1,name:`${o(t).namespace.value}-zoom-in-center`,appear:""},{default:b(()=>[y("span",{class:m(o(u)),style:$({backgroundColor:e.color}),onClick:d},[y("span",{class:m(o(t).e("content"))},[E(e.$slots,"default")],2),e.closable?(g(),I(o(h),{key:0,class:m(o(t).e("close")),onClick:O(C,["stop"])},{default:b(()=>[N(o(k))]),_:1},8,["class","onClick"])):v("v-if",!0)],6)]),_:3},8,["name"]))}});var X=T(Q,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const pe=V(X),Z={inheritAttrs:!1};function ee(s,l,p,a,t,u){return E(s.$slots,"default")}var te=T(Z,[["render",ee],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);const oe={name:"ElCollectionItem",inheritAttrs:!1};function se(s,l,p,a,t,u){return E(s.$slots,"default")}var ne=T(oe,[["render",se],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);const le="data-el-collection-item",ae=s=>{const l=`El${s}Collection`,p=`${l}Item`,a=Symbol(l),t=Symbol(p),u={...te,name:l,setup(){const d=L(null),e=new Map;w(a,{itemMap:e,getItems:()=>{const r=o(d);if(!r)return[];const n=Array.from(r.querySelectorAll(`[${le}]`));return[...e.values()].sort((B,M)=>n.indexOf(B.ref)-n.indexOf(M.ref))},collectionRef:d})}},C={...ne,name:p,setup(d,{attrs:e}){const c=L(null),r=D(a,void 0);w(t,{collectionItemRef:c}),F(()=>{const n=o(c);n&&r.itemMap.set(n,{ref:n,...e})}),R(()=>{const n=o(c);r.itemMap.delete(n)})}};return{COLLECTION_INJECTION_KEY:a,COLLECTION_ITEM_INJECTION_KEY:t,ElCollection:u,ElCollectionItem:C}},ue=_({trigger:U.trigger,effect:{...q.effect,default:"light"},type:{type:i(String)},placement:{type:i(String),default:"bottom"},popperOptions:{type:i(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:i([Number,String]),default:0},maxHeight:{type:i([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:i(Object)}}),de=_({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:x}}),me=_({onKeydown:{type:i(Function)}}),ce=[f.down,f.pageDown,f.home],re=[f.up,f.pageUp,f.end],fe=[...ce,...re],{ElCollection:Ce,ElCollectionItem:ge,COLLECTION_INJECTION_KEY:Ee,COLLECTION_ITEM_INJECTION_KEY:_e}=ae("Dropdown");export{_e as C,Ce as E,fe as F,re as L,de as a,le as b,ae as c,ue as d,ge as e,me as f,Ee as g,pe as h,H as t};
