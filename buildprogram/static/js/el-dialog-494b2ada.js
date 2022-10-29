import{a8 as e,o as s,a9 as a,aa as o,ab as t,d as l,ac as n,ad as r,ae as d,V as i,af as c,Q as u,k as f,c as m,f as p,a0 as v,m as g,H as b,t as h,e as y,x as k,q as C,a1 as R,a2 as E,i as $,n as w,ag as L,a3 as M,ah as _,ai as x,aj as A,T as I,U as F,S as q,Z as T,ak as X,a4 as Y,al as B,am as j,an as z,ao as S,ap as D,aq as H,ar as U,as as K,a6 as O}from"./index-505c0bb4.js";const Q=(...s)=>a=>{s.forEach((s=>{e(s)?s(a):s.value=a}))},V=Symbol("dialogInjectionKey"),W=(e,l,n)=>{let r={offsetX:0,offsetY:0};const d=s=>{const a=s.clientX,o=s.clientY,{offsetX:l,offsetY:n}=r,d=e.value.getBoundingClientRect(),i=d.left,c=d.top,u=d.width,f=d.height,m=document.documentElement.clientWidth,p=document.documentElement.clientHeight,v=-i+l,g=-c+n,b=m-i-u+l,h=p-c-f+n,y=s=>{const d=Math.min(Math.max(l+s.clientX-a,v),b),i=Math.min(Math.max(n+s.clientY-o,g),h);r={offsetX:d,offsetY:i},e.value.style.transform=`translate(${t(d)}, ${t(i)})`},k=()=>{document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",k)};document.addEventListener("mousemove",y),document.addEventListener("mouseup",k)},i=()=>{l.value&&e.value&&l.value.removeEventListener("mousedown",d)};s((()=>{a((()=>{n.value?l.value&&e.value&&l.value.addEventListener("mousedown",d):i()}))})),o((()=>{i()}))},Z=["aria-label"],G=["id"];var J=M(l({name:"ElDialogContent",props:n,emits:r,setup(e){const s=e,{t:a}=d(),{Close:o}=_,{dialogRef:t,headerRef:l,bodyId:n,ns:r,style:M}=i(V),{focusTrapRef:x}=i(c),A=Q(x,t),I=u((()=>s.draggable));return W(t,l,I),(e,s)=>(f(),m("div",{ref:b(A),class:g([b(r).b(),b(r).is("fullscreen",e.fullscreen),b(r).is("draggable",b(I)),{[b(r).m("center")]:e.center},e.customClass]),style:w(b(M)),tabindex:"-1",onClick:s[1]||(s[1]=L((()=>{}),["stop"]))},[p("header",{ref_key:"headerRef",ref:l,class:g(b(r).e("header"))},[v(e.$slots,"header",{},(()=>[p("span",{role:"heading",class:g(b(r).e("title"))},h(e.title),3)])),e.showClose?(f(),m("button",{key:0,"aria-label":b(a)("el.dialog.close"),class:g(b(r).e("headerbtn")),type:"button",onClick:s[0]||(s[0]=s=>e.$emit("close"))},[y(b(E),{class:g(b(r).e("close"))},{default:k((()=>[(f(),C(R(e.closeIcon||b(o))))])),_:1},8,["class"])],10,Z)):$("v-if",!0)],2),p("div",{id:b(n),class:g(b(r).e("body"))},[v(e.$slots,"default")],10,G),e.$slots.footer?(f(),m("footer",{key:0,class:g(b(r).e("footer"))},[v(e.$slots,"footer")],2)):$("v-if",!0)],6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const N=["aria-label","aria-labelledby","aria-describedby"];const P=O(M(l({name:"ElDialog",props:x,emits:A,setup(e,{expose:s}){const a=e,o=I();F({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},u((()=>!!o.title)));const t=q("dialog"),l=T(),n=T(),r=T(),{visible:d,titleId:i,bodyId:c,style:m,rendered:h,zIndex:R,afterEnter:E,afterLeave:w,beforeLeave:L,handleClose:M,onModalClick:_,onOpenAutoFocus:x,onCloseAutoFocus:A,onCloseRequested:O}=X(a,l);Y(V,{dialogRef:l,headerRef:n,bodyId:c,ns:t,rendered:h,style:m});const Q=B(_),W=u((()=>a.draggable&&!a.fullscreen));return s({visible:d,dialogContentRef:r}),(e,s)=>(f(),C(K,{to:"body",disabled:!e.appendToBody},[y(U,{name:"dialog-fade",onAfterEnter:b(E),onAfterLeave:b(w),onBeforeLeave:b(L),persisted:""},{default:k((()=>[j(y(b(S),{"custom-mask-event":"",mask:e.modal,"overlay-class":e.modalClass,"z-index":b(R)},{default:k((()=>[p("div",{role:"dialog","aria-modal":"true","aria-label":e.title||void 0,"aria-labelledby":e.title?void 0:b(i),"aria-describedby":b(c),class:g(`${b(t).namespace.value}-overlay-dialog`),onClick:s[0]||(s[0]=(...e)=>b(Q).onClick&&b(Q).onClick(...e)),onMousedown:s[1]||(s[1]=(...e)=>b(Q).onMousedown&&b(Q).onMousedown(...e)),onMouseup:s[2]||(s[2]=(...e)=>b(Q).onMouseup&&b(Q).onMouseup(...e))},[y(b(D),{loop:"",trapped:b(d),"focus-start-el":"container",onFocusAfterTrapped:b(x),onFocusAfterReleased:b(A),onReleaseRequested:b(O)},{default:k((()=>[b(h)?(f(),C(J,{key:0,ref_key:"dialogContentRef",ref:r,"custom-class":e.customClass,center:e.center,"close-icon":e.closeIcon,draggable:b(W),fullscreen:e.fullscreen,"show-close":e.showClose,title:e.title,onClose:b(M)},H({header:k((()=>[e.$slots.title?v(e.$slots,"title",{key:1}):v(e.$slots,"header",{key:0,close:b(M),titleId:b(i),titleClass:b(t).e("title")})])),default:k((()=>[v(e.$slots,"default")])),_:2},[e.$slots.footer?{name:"footer",fn:k((()=>[v(e.$slots,"footer")]))}:void 0]),1032,["custom-class","center","close-icon","draggable","fullscreen","show-close","title","onClose"])):$("v-if",!0)])),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onReleaseRequested"])],42,N)])),_:3},8,["mask","overlay-class","z-index"]),[[z,b(d)]])])),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]));export{P as E,Q as c};