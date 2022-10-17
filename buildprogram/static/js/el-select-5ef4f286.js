import{aX as e,aY as t,aZ as l,a_ as o,a$ as n,b0 as a,b1 as r,b2 as s,b3 as i,b4 as u,b5 as c,b6 as p,b7 as d,b8 as v,b9 as f,ba as b,T as h,P as m,aU as g,w as y,bb as S,G as C,a6 as O,d as x,R as w,r as j,bc as _,aw as L,aj as I,a0 as T,am as k,an as P,k as z,c as A,Y as E,f as M,t as V,m as B,aq as D,W,o as q,ai as F,n as K,ad as R,aR as H,aS as $,V as N,ak as Q,bd as U,as as G,be as Y,at as Z,aa as X,bf as J,bg as ee,bh as te,bi as le,$ as oe,bj as ne,ap as ae,bk as re,a1 as se,bl as ie,bm as ue,e as ce,x as pe,q as de,F as ve,h as fe,i as be,aP as he,bn as me,bo as ge,aO as ye,Z as Se,a3 as Ce,a4 as Oe}from"./index-227f788f.js";import{i as xe,E as we}from"./el-input-b1854884.js";import{E as je}from"./el-tag-79b255ca.js";import{E as _e,t as Le}from"./index-1c529f81.js";import{u as Ie}from"./index-f6cae80c.js";import{d as Te,C as ke}from"./el-scrollbar-c908191f.js";var Pe=e(t,"WeakMap");function ze(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}var Ae=Object.prototype;function Ee(e){return o(e)&&"[object Arguments]"==n(e)}var Me=Object.prototype,Ve=Me.hasOwnProperty,Be=Me.propertyIsEnumerable,De=Ee(function(){return arguments}())?Ee:function(e){return o(e)&&Ve.call(e,"callee")&&!Be.call(e,"callee")};var We="object"==typeof exports&&exports&&!exports.nodeType&&exports,qe=We&&"object"==typeof module&&module&&!module.nodeType&&module,Fe=qe&&qe.exports===We?t.Buffer:void 0,Ke=(Fe?Fe.isBuffer:void 0)||function(){return!1},Re={};Re["[object Float32Array]"]=Re["[object Float64Array]"]=Re["[object Int8Array]"]=Re["[object Int16Array]"]=Re["[object Int32Array]"]=Re["[object Uint8Array]"]=Re["[object Uint8ClampedArray]"]=Re["[object Uint16Array]"]=Re["[object Uint32Array]"]=!0,Re["[object Arguments]"]=Re["[object Array]"]=Re["[object ArrayBuffer]"]=Re["[object Boolean]"]=Re["[object DataView]"]=Re["[object Date]"]=Re["[object Error]"]=Re["[object Function]"]=Re["[object Map]"]=Re["[object Number]"]=Re["[object Object]"]=Re["[object RegExp]"]=Re["[object Set]"]=Re["[object String]"]=Re["[object WeakMap]"]=!1;var He,$e="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ne=$e&&"object"==typeof module&&module&&!module.nodeType&&module,Qe=Ne&&Ne.exports===$e&&a.process,Ue=function(){try{var e=Ne&&Ne.require&&Ne.require("util").types;return e||Qe&&Qe.binding&&Qe.binding("util")}catch(t){}}(),Ge=Ue&&Ue.isTypedArray,Ye=Ge?(He=Ge,function(e){return He(e)}):function(e){return o(e)&&ze(e.length)&&!!Re[n(e)]},Ze=Object.prototype.hasOwnProperty;function Xe(e,t){var l=r(e),o=!l&&De(e),n=!l&&!o&&Ke(e),a=!l&&!o&&!n&&Ye(e),i=l||o||n||a,u=i?function(e,t){for(var l=-1,o=Array(e);++l<e;)o[l]=t(l);return o}(e.length,String):[],c=u.length;for(var p in e)!t&&!Ze.call(e,p)||i&&("length"==p||n&&("offset"==p||"parent"==p)||a&&("buffer"==p||"byteLength"==p||"byteOffset"==p)||s(p,c))||u.push(p);return u}var Je=function(e,t){return function(l){return e(t(l))}}(Object.keys,Object),et=Je,tt=Object.prototype.hasOwnProperty;function lt(e){if(l=(t=e)&&t.constructor,t!==("function"==typeof l&&l.prototype||Ae))return et(e);var t,l,o=[];for(var n in Object(e))tt.call(e,n)&&"constructor"!=n&&o.push(n);return o}function ot(e){return null!=(t=e)&&ze(t.length)&&!l(t)?Xe(e):lt(e);var t}function nt(e){var t=this.__data__=new i(e);this.size=t.size}nt.prototype.clear=function(){this.__data__=new i,this.size=0},nt.prototype.delete=function(e){var t=this.__data__,l=t.delete(e);return this.size=t.size,l},nt.prototype.get=function(e){return this.__data__.get(e)},nt.prototype.has=function(e){return this.__data__.has(e)},nt.prototype.set=function(e,t){var l=this.__data__;if(l instanceof i){var o=l.__data__;if(!u||o.length<199)return o.push([e,t]),this.size=++l.size,this;l=this.__data__=new c(o)}return l.set(e,t),this.size=l.size,this};var at=Object.prototype.propertyIsEnumerable,rt=Object.getOwnPropertySymbols,st=rt?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var l=-1,o=null==e?0:e.length,n=0,a=[];++l<o;){var r=e[l];t(r,l,e)&&(a[n++]=r)}return a}(rt(e),(function(t){return at.call(e,t)})))}:function(){return[]};function it(e){return function(e,t,l){var o=t(e);return r(e)?o:function(e,t){for(var l=-1,o=t.length,n=e.length;++l<o;)e[n+l]=t[l];return e}(o,l(e))}(e,ot,st)}var ut=e(t,"DataView"),ct=e(t,"Promise"),pt=e(t,"Set"),dt=p(ut),vt=p(u),ft=p(ct),bt=p(pt),ht=p(Pe),mt=n;(ut&&"[object DataView]"!=mt(new ut(new ArrayBuffer(1)))||u&&"[object Map]"!=mt(new u)||ct&&"[object Promise]"!=mt(ct.resolve())||pt&&"[object Set]"!=mt(new pt)||Pe&&"[object WeakMap]"!=mt(new Pe))&&(mt=function(e){var t=n(e),l="[object Object]"==t?e.constructor:void 0,o=l?p(l):"";if(o)switch(o){case dt:return"[object DataView]";case vt:return"[object Map]";case ft:return"[object Promise]";case bt:return"[object Set]";case ht:return"[object WeakMap]"}return t});var gt=mt,yt=t.Uint8Array;function St(e){var t=-1,l=null==e?0:e.length;for(this.__data__=new c;++t<l;)this.add(e[t])}function Ct(e,t){for(var l=-1,o=null==e?0:e.length;++l<o;)if(t(e[l],l,e))return!0;return!1}St.prototype.add=St.prototype.push=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this},St.prototype.has=function(e){return this.__data__.has(e)};function Ot(e,t,l,o,n,a){var r=1&l,s=e.length,i=t.length;if(s!=i&&!(r&&i>s))return!1;var u=a.get(e),c=a.get(t);if(u&&c)return u==t&&c==e;var p=-1,d=!0,v=2&l?new St:void 0;for(a.set(e,t),a.set(t,e);++p<s;){var f=e[p],b=t[p];if(o)var h=r?o(b,f,p,t,e,a):o(f,b,p,e,t,a);if(void 0!==h){if(h)continue;d=!1;break}if(v){if(!Ct(t,(function(e,t){if(r=t,!v.has(r)&&(f===e||n(f,e,l,o,a)))return v.push(t);var r}))){d=!1;break}}else if(f!==b&&!n(f,b,l,o,a)){d=!1;break}}return a.delete(e),a.delete(t),d}function xt(e){var t=-1,l=Array(e.size);return e.forEach((function(e,o){l[++t]=[o,e]})),l}function wt(e){var t=-1,l=Array(e.size);return e.forEach((function(e){l[++t]=e})),l}var jt=d?d.prototype:void 0,_t=jt?jt.valueOf:void 0;var Lt=Object.prototype.hasOwnProperty;var It="[object Object]",Tt=Object.prototype.hasOwnProperty;function kt(e,t,l,o,n,a){var s=r(e),i=r(t),u=s?"[object Array]":gt(e),c=i?"[object Array]":gt(t),p=(u="[object Arguments]"==u?It:u)==It,d=(c="[object Arguments]"==c?It:c)==It,f=u==c;if(f&&Ke(e)){if(!Ke(t))return!1;s=!0,p=!1}if(f&&!p)return a||(a=new nt),s||Ye(e)?Ot(e,t,l,o,n,a):function(e,t,l,o,n,a,r){switch(l){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!a(new yt(e),new yt(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return v(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var s=xt;case"[object Set]":var i=1&o;if(s||(s=wt),e.size!=t.size&&!i)return!1;var u=r.get(e);if(u)return u==t;o|=2,r.set(e,t);var c=Ot(s(e),s(t),o,n,a,r);return r.delete(e),c;case"[object Symbol]":if(_t)return _t.call(e)==_t.call(t)}return!1}(e,t,u,l,o,n,a);if(!(1&l)){var b=p&&Tt.call(e,"__wrapped__"),h=d&&Tt.call(t,"__wrapped__");if(b||h){var m=b?e.value():e,g=h?t.value():t;return a||(a=new nt),n(m,g,l,o,a)}}return!!f&&(a||(a=new nt),function(e,t,l,o,n,a){var r=1&l,s=it(e),i=s.length;if(i!=it(t).length&&!r)return!1;for(var u=i;u--;){var c=s[u];if(!(r?c in t:Lt.call(t,c)))return!1}var p=a.get(e),d=a.get(t);if(p&&d)return p==t&&d==e;var v=!0;a.set(e,t),a.set(t,e);for(var f=r;++u<i;){var b=e[c=s[u]],h=t[c];if(o)var m=r?o(h,b,c,t,e,a):o(b,h,c,e,t,a);if(!(void 0===m?b===h||n(b,h,l,o,a):m)){v=!1;break}f||(f="constructor"==c)}if(v&&!f){var g=e.constructor,y=t.constructor;g==y||!("constructor"in e)||!("constructor"in t)||"function"==typeof g&&g instanceof g&&"function"==typeof y&&y instanceof y||(v=!1)}return a.delete(e),a.delete(t),v}(e,t,l,o,n,a))}function Pt(e,t,l,n,a){return e===t||(null==e||null==t||!o(e)&&!o(t)?e!=e&&t!=t:kt(e,t,l,n,Pt,a))}function zt(e,t){return Pt(e,t)}var At=T(x({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},setup(e){const t=w("select"),l=j({index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}),{currentLabel:o,itemSelected:n,isDisabled:a,select:r,hoverItem:s}=function(e,t){const l=h("ElSelect"),o=h("ElSelectGroup",{disabled:!1}),n=m((()=>"[object object]"===Object.prototype.toString.call(e.value).toLowerCase())),a=m((()=>l.props.multiple?p(l.props.modelValue,e.value):d(e.value,l.props.modelValue))),r=m((()=>{if(l.props.multiple){const e=l.props.modelValue||[];return!a.value&&e.length>=l.props.multipleLimit&&l.props.multipleLimit>0}return!1})),s=m((()=>e.label||(n.value?"":e.value))),i=m((()=>e.value||e.label||"")),u=m((()=>e.disabled||t.groupDisabled||r.value)),c=O(),p=(e=[],t)=>{if(n.value){const o=l.props.valueKey;return e&&e.some((e=>g(e,o)===g(t,o)))}return e&&e.includes(t)},d=(e,t)=>{if(n.value){const{valueKey:o}=l.props;return g(e,o)===g(t,o)}return e===t};y((()=>s.value),(()=>{e.created||l.props.remote||l.setSelected()})),y((()=>e.value),((t,o)=>{const{remote:n,valueKey:a}=l.props;if(!e.created&&!n){if(a&&"object"==typeof t&&"object"==typeof o&&t[a]===o[a])return;l.setSelected()}})),y((()=>o.disabled),(()=>{t.groupDisabled=o.disabled}),{immediate:!0});const{queryChange:v}=S(l);return y(v,(o=>{const{query:n}=C(o),a=new RegExp(((e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"))(n),"i");t.visible=a.test(s.value)||e.created,t.visible||l.filteredOptionsCount--})),{select:l,currentLabel:s,currentValue:i,itemSelected:a,isDisabled:u,hoverItem:()=>{e.disabled||o.disabled||(l.hoverIndex=l.optionsArray.indexOf(c.proxy))}}}(e,l),{visible:i,hover:u}=_(l),c=O().proxy,p=c.value;return r.onOptionCreate(c),L((()=>{const{selected:e}=r,t=(r.props.multiple?e:[e]).some((e=>e.value===c.value));r.cachedOptions.get(p)!==c||t||I((()=>{r.cachedOptions.delete(p)})),r.onOptionDestroy(p,c)})),{ns:t,currentLabel:o,itemSelected:n,isDisabled:a,select:r,hoverItem:s,visible:i,hover:u,selectOptionClick:function(){!0!==e.disabled&&!0!==l.groupDisabled&&r.handleOptionSelect(c,!0)},states:l}}}),[["render",function(e,t,l,o,n,a){return k((z(),A("li",{class:B([e.ns.be("dropdown","item"),e.ns.is("disabled",e.isDisabled),{selected:e.itemSelected,hover:e.hover}]),onMouseenter:t[0]||(t[0]=(...t)=>e.hoverItem&&e.hoverItem(...t)),onClick:t[1]||(t[1]=D(((...t)=>e.selectOptionClick&&e.selectOptionClick(...t)),["stop"]))},[E(e.$slots,"default",{},(()=>[M("span",null,V(e.currentLabel),1)]))],34)),[[P,e.visible]])}],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);const Et=x({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=h("ElSelect"),t=w("select"),l=m((()=>e.props.popperClass)),o=m((()=>e.props.multiple)),n=m((()=>e.props.fitInputWidth)),a=W("");function r(){var t;a.value=`${null==(t=e.selectWrapper)?void 0:t.offsetWidth}px`}return q((()=>{r(),F(e.selectWrapper,r)})),{ns:t,minWidth:a,popperClass:l,isMultiple:o,isFitInputWidth:n}}});const Mt=(e,t,l)=>{const{t:o}=Ie(),n=w("select"),a=W(null),r=W(null),s=W(null),i=W(null),u=W(null),c=W(null),p=W(-1),d=R({query:""}),v=R(""),b=h(H,{}),S=h($,{}),C=m((()=>!e.filterable||e.multiple||!t.visible)),O=m((()=>e.disabled||b.disabled)),x=m((()=>{const l=e.multiple?Array.isArray(e.modelValue)&&e.modelValue.length>0:void 0!==e.modelValue&&null!==e.modelValue&&""!==e.modelValue;return e.clearable&&!O.value&&t.inputHovering&&l})),j=m((()=>e.remote&&e.filterable?"":e.suffixIcon)),_=m((()=>n.is("reverse",j.value&&t.visible))),L=m((()=>e.remote?300:0)),T=m((()=>e.loading?e.loadingText||o("el.select.loading"):(!e.remote||""!==t.query||0!==t.options.size)&&(e.filterable&&t.query&&t.options.size>0&&0===t.filteredOptionsCount?e.noMatchText||o("el.select.noMatch"):0===t.options.size?e.noDataText||o("el.select.noData"):null))),k=m((()=>Array.from(t.options.values()))),P=m((()=>Array.from(t.cachedOptions.values()))),z=m((()=>{const l=k.value.filter((e=>!e.created)).some((e=>e.currentLabel===t.query));return e.filterable&&e.allowCreate&&""!==t.query&&!l})),A=N(),E=m((()=>["small"].includes(A.value)?"small":"default")),M=m({get:()=>t.visible&&!1!==T.value,set(e){t.visible=e}});y([()=>O.value,()=>A.value,()=>b.size],(()=>{I((()=>{V()}))})),y((()=>e.placeholder),(e=>{t.cachedPlaceHolder=t.currentPlaceholder=e})),y((()=>e.modelValue),((l,o)=>{var n;e.multiple&&(V(),l&&l.length>0||r.value&&""!==t.query?t.currentPlaceholder="":t.currentPlaceholder=t.cachedPlaceHolder,e.filterable&&!e.reserveKeyword&&(t.query="",B(t.query))),F(),e.filterable&&!e.multiple&&(t.inputLength=20),!zt(l,o)&&e.validateEvent&&(null==(n=S.validate)||n.call(S,"change").catch((e=>Q())))}),{flush:"post",deep:!0}),y((()=>t.visible),(o=>{var n,a,i;o?(null==(a=null==(n=s.value)?void 0:n.updatePopper)||a.call(n),e.filterable&&(t.filteredOptionsCount=t.optionsCount,t.query=e.remote?"":t.selectedLabel,e.multiple?null==(i=r.value)||i.focus():t.selectedLabel&&(t.currentPlaceholder=`${t.selectedLabel}`,t.selectedLabel=""),B(t.query),e.multiple||e.remote||(d.value.query="",U(d),U(v)))):(r.value&&r.value.blur(),t.query="",t.previousQuery=null,t.selectedLabel="",t.inputLength=20,t.menuVisibleOnFocus=!1,le(),I((()=>{r.value&&""===r.value.value&&0===t.selected.length&&(t.currentPlaceholder=t.cachedPlaceHolder)})),e.multiple||(t.selected&&(e.filterable&&e.allowCreate&&t.createdSelected&&t.createdLabel?t.selectedLabel=t.createdLabel:t.selectedLabel=t.selected.currentLabel,e.filterable&&(t.query=t.selectedLabel)),e.filterable&&(t.currentPlaceholder=t.cachedPlaceHolder))),l.emit("visible-change",o)})),y((()=>t.options.entries()),(()=>{var l,o,n;if(!G)return;null==(o=null==(l=s.value)?void 0:l.updatePopper)||o.call(l),e.multiple&&V();const a=(null==(n=u.value)?void 0:n.querySelectorAll("input"))||[];Array.from(a).includes(document.activeElement)||F(),e.defaultFirstOption&&(e.filterable||e.remote)&&t.filteredOptionsCount&&q()}),{flush:"post"}),y((()=>t.hoverIndex),(e=>{"number"==typeof e&&e>-1&&(p.value=k.value[e]||{}),k.value.forEach((e=>{e.hover=p.value===e}))}));const V=()=>{e.collapseTags&&!e.filterable||I((()=>{var e,l;if(!a.value)return;const o=a.value.$el.querySelector("input"),n=i.value,r=(u=A.value||b.size,f[u||"default"]);var u;o.style.height=(0===t.selected.length?r:Math.max(n?n.clientHeight+(n.clientHeight>r?6:0):0,r))-2+"px",t.tagInMultiLine=Number.parseFloat(o.style.height)>=r,t.visible&&!1!==T.value&&(null==(l=null==(e=s.value)?void 0:e.updatePopper)||l.call(e))}))},B=l=>{t.previousQuery===l||t.isOnComposition||(null!==t.previousQuery||"function"!=typeof e.filterMethod&&"function"!=typeof e.remoteMethod?(t.previousQuery=l,I((()=>{var e,l;t.visible&&(null==(l=null==(e=s.value)?void 0:e.updatePopper)||l.call(e))})),t.hoverIndex=-1,e.multiple&&e.filterable&&I((()=>{const l=15*r.value.value.length+20;t.inputLength=e.collapseTags?Math.min(50,l):l,D(),V()})),e.remote&&"function"==typeof e.remoteMethod?(t.hoverIndex=-1,e.remoteMethod(l)):"function"==typeof e.filterMethod?(e.filterMethod(l),U(v)):(t.filteredOptionsCount=t.optionsCount,d.value.query=l,U(d),U(v)),e.defaultFirstOption&&(e.filterable||e.remote)&&t.filteredOptionsCount&&q()):t.previousQuery=l)},D=()=>{""!==t.currentPlaceholder&&(t.currentPlaceholder=r.value.value?"":t.cachedPlaceHolder)},q=()=>{const e=k.value.filter((e=>e.visible&&!e.disabled&&!e.states.groupDisabled)),l=e.find((e=>e.created)),o=e[0];t.hoverIndex=ue(k.value,l||o)},F=()=>{var l;if(!e.multiple){const o=K(e.modelValue);return(null==(l=o.props)?void 0:l.created)?(t.createdLabel=o.props.value,t.createdSelected=!0):t.createdSelected=!1,t.selectedLabel=o.currentLabel,t.selected=o,void(e.filterable&&(t.query=t.selectedLabel))}t.selectedLabel="";const o=[];Array.isArray(e.modelValue)&&e.modelValue.forEach((e=>{o.push(K(e))})),t.selected=o,I((()=>{V()}))},K=l=>{let o;const n="object"===Y(l).toLowerCase(),a="null"===Y(l).toLowerCase(),r="undefined"===Y(l).toLowerCase();for(let i=t.cachedOptions.size-1;i>=0;i--){const t=P.value[i];if(n?g(t.value,e.valueKey)===g(l,e.valueKey):t.value===l){o={value:l,currentLabel:t.currentLabel,isDisabled:t.isDisabled};break}}if(o)return o;const s={value:l,currentLabel:n?l.label:a||r?"":l};return e.multiple&&(s.hitState=!1),s},le=()=>{setTimeout((()=>{const l=e.valueKey;e.multiple?t.selected.length>0?t.hoverIndex=Math.min.apply(null,t.selected.map((e=>k.value.findIndex((t=>g(t,l)===g(e,l)))))):t.hoverIndex=-1:t.hoverIndex=k.value.findIndex((e=>fe(e)===fe(t.selected)))}),300)},oe=()=>{var e;t.inputWidth=null==(e=a.value)?void 0:e.$el.getBoundingClientRect().width},ne=Te((()=>{e.filterable&&t.query!==t.selectedLabel&&(t.query=t.selectedLabel,B(t.query))}),L.value),ae=Te((e=>{B(e.target.value)}),L.value),re=t=>{zt(e.modelValue,t)||l.emit(te,t)},se=o=>{o.stopPropagation();const n=e.multiple?[]:"";if("string"!=typeof n)for(const e of t.selected)e.isDisabled&&n.push(e.value);l.emit(X,n),re(n),t.visible=!1,l.emit("clear")},ie=(o,n)=>{var a;if(e.multiple){const n=(e.modelValue||[]).slice(),s=ue(n,o.value);s>-1?n.splice(s,1):(e.multipleLimit<=0||n.length<e.multipleLimit)&&n.push(o.value),l.emit(X,n),re(n),o.created&&(t.query="",B(""),t.inputLength=20),e.filterable&&(null==(a=r.value)||a.focus())}else l.emit(X,o.value),re(o.value),t.visible=!1;t.isSilentBlur=n,ce(),t.visible||I((()=>{pe(o)}))},ue=(t=[],l)=>{if(!Z(l))return t.indexOf(l);const o=e.valueKey;let n=-1;return t.some(((e,t)=>g(e,o)===g(l,o)&&(n=t,!0))),n},ce=()=>{t.softFocus=!0;const e=r.value||a.value;e&&(null==e||e.focus())},pe=e=>{var t,l,o,a,r;const i=Array.isArray(e)?e[0]:e;let u=null;if(null==i?void 0:i.value){const e=k.value.filter((e=>e.value===i.value));e.length>0&&(u=e[0].$el)}if(s.value&&u){const e=null==(a=null==(o=null==(l=null==(t=s.value)?void 0:t.popperRef)?void 0:l.contentRef)?void 0:o.querySelector)?void 0:a.call(o,`.${n.be("dropdown","wrap")}`);e&&J(e,u)}null==(r=c.value)||r.handleScroll()},de=e=>{if(!Array.isArray(t.selected))return;const l=t.selected[t.selected.length-1];return l?!0===e||!1===e?(l.hitState=e,e):(l.hitState=!l.hitState,l.hitState):void 0},ve=()=>{var l;e.automaticDropdown||O.value||(t.menuVisibleOnFocus?t.menuVisibleOnFocus=!1:t.visible=!t.visible,t.visible&&(null==(l=r.value||a.value)||l.focus()))},fe=t=>Z(t.value)?g(t.value,e.valueKey):t.value,be=m((()=>k.value.filter((e=>e.visible)).every((e=>e.disabled)))),he=e=>{if(t.visible){if(0!==t.options.size&&0!==t.filteredOptionsCount&&!t.isOnComposition&&!be.value){"next"===e?(t.hoverIndex++,t.hoverIndex===t.options.size&&(t.hoverIndex=0)):"prev"===e&&(t.hoverIndex--,t.hoverIndex<0&&(t.hoverIndex=t.options.size-1));const l=k.value[t.hoverIndex];!0!==l.disabled&&!0!==l.states.groupDisabled&&l.visible||he(e),I((()=>pe(p.value)))}}else t.visible=!0};return{optionsArray:k,selectSize:A,handleResize:()=>{var t,l;oe(),null==(l=null==(t=s.value)?void 0:t.updatePopper)||l.call(t),e.multiple&&!e.filterable&&V()},debouncedOnInputChange:ne,debouncedQueryChange:ae,deletePrevTag:o=>{if(o.target.value.length<=0&&!de()){const t=e.modelValue.slice();t.pop(),l.emit(X,t),re(t)}1===o.target.value.length&&0===e.modelValue.length&&(t.currentPlaceholder=t.cachedPlaceHolder)},deleteTag:(o,n)=>{const a=t.selected.indexOf(n);if(a>-1&&!O.value){const t=e.modelValue.slice();t.splice(a,1),l.emit(X,t),re(t),l.emit("remove-tag",n.value)}o.stopPropagation()},deleteSelected:se,handleOptionSelect:ie,scrollToOption:pe,readonly:C,resetInputHeight:V,showClose:x,iconComponent:j,iconReverse:_,showNewOption:z,collapseTagSize:E,setSelected:F,managePlaceholder:D,selectDisabled:O,emptyText:T,toggleLastOptionHitState:de,resetInputState:e=>{e.code!==ee.backspace&&de(!1),t.inputLength=15*r.value.value.length+20,V()},handleComposition:e=>{const l=e.target.value;if("compositionend"===e.type)t.isOnComposition=!1,I((()=>B(l)));else{const e=l[l.length-1]||"";t.isOnComposition=!xe(e)}},onOptionCreate:e=>{t.optionsCount++,t.filteredOptionsCount++,t.options.set(e.value,e),t.cachedOptions.set(e.value,e)},onOptionDestroy:(e,l)=>{t.options.get(e)===l&&(t.optionsCount--,t.filteredOptionsCount--,t.options.delete(e))},handleMenuEnter:()=>{I((()=>pe(t.selected)))},handleFocus:o=>{t.softFocus?t.softFocus=!1:((e.automaticDropdown||e.filterable)&&(e.filterable&&!t.visible&&(t.menuVisibleOnFocus=!0),t.visible=!0),l.emit("focus",o))},blur:()=>{var e;t.visible=!1,null==(e=a.value)||e.blur()},handleBlur:e=>{I((()=>{t.isSilentBlur?t.isSilentBlur=!1:l.emit("blur",e)})),t.softFocus=!1},handleClearClick:e=>{se(e)},handleClose:()=>{t.visible=!1},handleKeydownEscape:e=>{t.visible&&(e.preventDefault(),e.stopPropagation(),t.visible=!1)},toggleMenu:ve,selectOption:()=>{t.visible?k.value[t.hoverIndex]&&ie(k.value[t.hoverIndex],void 0):ve()},getValueKey:fe,navigateOptions:he,dropMenuVisible:M,queryChange:d,groupQueryChange:v,reference:a,input:r,tooltipRef:s,tags:i,selectWrapper:u,scrollbar:c}},Vt=x({name:"ElSelect",componentName:"ElSelect",components:{ElInput:we,ElSelectMenu:T(Et,[["render",function(e,t,l,o,n,a){return z(),A("div",{class:B([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:K({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[E(e.$slots,"default")],6)}],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]),ElOption:At,ElTag:_e,ElScrollbar:je,ElTooltip:le,ElIcon:oe},directives:{ClickOutside:ke},props:{name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:{type:String,validator:e=>["",...b].includes(e)},effect:{type:String,default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:{type:Boolean,default:!1},teleported:ne.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:[String,Object],default:ae},fitInputWidth:{type:Boolean,default:!1},suffixIcon:{type:[String,Object],default:re},tagType:{...Le.type,default:"info"},validateEvent:{type:Boolean,default:!0}},emits:[X,te,"remove-tag","clear","visible-change","focus","blur"],setup(e,t){const l=w("select"),o=w("input"),{t:n}=Ie(),a=function(e){const{t:t}=Ie();return j({options:new Map,cachedOptions:new Map,createdLabel:null,createdSelected:!1,selected:e.multiple?[]:{},inputLength:20,inputWidth:0,optionsCount:0,filteredOptionsCount:0,visible:!1,softFocus:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,cachedPlaceHolder:"",currentPlaceholder:t("el.select.placeholder"),menuVisibleOnFocus:!1,isOnComposition:!1,isSilentBlur:!1,prefixWidth:11,tagInMultiLine:!1})}(e),{optionsArray:r,selectSize:s,readonly:i,handleResize:u,collapseTagSize:c,debouncedOnInputChange:p,debouncedQueryChange:d,deletePrevTag:v,deleteTag:f,deleteSelected:b,handleOptionSelect:h,scrollToOption:g,setSelected:y,resetInputHeight:S,managePlaceholder:O,showClose:x,selectDisabled:L,iconComponent:T,iconReverse:k,showNewOption:P,emptyText:z,toggleLastOptionHitState:A,resetInputState:E,handleComposition:M,onOptionCreate:V,onOptionDestroy:B,handleMenuEnter:D,handleFocus:W,blur:K,handleBlur:R,handleClearClick:H,handleClose:$,handleKeydownEscape:N,toggleMenu:Q,selectOption:U,getValueKey:G,navigateOptions:Y,dropMenuVisible:Z,reference:J,input:ee,tooltipRef:te,tags:le,selectWrapper:oe,scrollbar:ne,queryChange:ae,groupQueryChange:re}=Mt(e,a,t),{focus:ie}=(ue=J,{focus:()=>{var e,t;null==(t=null==(e=ue.value)?void 0:e.focus)||t.call(e)}});var ue;const{inputWidth:ce,selected:pe,inputLength:de,filteredOptionsCount:ve,visible:fe,softFocus:be,selectedLabel:he,hoverIndex:me,query:ge,inputHovering:ye,currentPlaceholder:Se,menuVisibleOnFocus:Ce,isOnComposition:Oe,isSilentBlur:xe,options:we,cachedOptions:je,optionsCount:_e,prefixWidth:Le,tagInMultiLine:Te}=_(a),ke=m((()=>{const t=[l.b()],o=C(s);return o&&t.push(l.m(o)),e.disabled&&t.push(l.m("disabled")),t})),Pe=m((()=>({maxWidth:C(ce)-32+"px",width:"100%"})));se("ElSelect",j({props:e,options:we,optionsArray:r,cachedOptions:je,optionsCount:_e,filteredOptionsCount:ve,hoverIndex:me,handleOptionSelect:h,onOptionCreate:V,onOptionDestroy:B,selectWrapper:oe,selected:pe,setSelected:y,queryChange:ae,groupQueryChange:re})),q((()=>{a.cachedPlaceHolder=Se.value=e.placeholder||n("el.select.placeholder"),e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(Se.value=""),F(oe,u),e.remote&&e.multiple&&S(),I((()=>{const e=J.value&&J.value.$el;if(e&&(ce.value=e.getBoundingClientRect().width,t.slots.prefix)){const t=e.querySelector(`.${o.e("prefix")}`);Le.value=Math.max(t.getBoundingClientRect().width+5,30)}})),y()})),e.multiple&&!Array.isArray(e.modelValue)&&t.emit(X,[]),!e.multiple&&Array.isArray(e.modelValue)&&t.emit(X,"");const ze=m((()=>{var e,t;return null==(t=null==(e=te.value)?void 0:e.popperRef)?void 0:t.contentRef}));return{tagInMultiLine:Te,prefixWidth:Le,selectSize:s,readonly:i,handleResize:u,collapseTagSize:c,debouncedOnInputChange:p,debouncedQueryChange:d,deletePrevTag:v,deleteTag:f,deleteSelected:b,handleOptionSelect:h,scrollToOption:g,inputWidth:ce,selected:pe,inputLength:de,filteredOptionsCount:ve,visible:fe,softFocus:be,selectedLabel:he,hoverIndex:me,query:ge,inputHovering:ye,currentPlaceholder:Se,menuVisibleOnFocus:Ce,isOnComposition:Oe,isSilentBlur:xe,options:we,resetInputHeight:S,managePlaceholder:O,showClose:x,selectDisabled:L,iconComponent:T,iconReverse:k,showNewOption:P,emptyText:z,toggleLastOptionHitState:A,resetInputState:E,handleComposition:M,handleMenuEnter:D,handleFocus:W,blur:K,handleBlur:R,handleClearClick:H,handleClose:$,handleKeydownEscape:N,toggleMenu:Q,selectOption:U,getValueKey:G,navigateOptions:Y,dropMenuVisible:Z,focus:ie,reference:J,input:ee,tooltipRef:te,popperPaneRef:ze,tags:le,selectWrapper:oe,scrollbar:ne,wrapperKls:ke,selectTagsStyle:Pe,nsSelect:l}}}),Bt={class:"select-trigger"},Dt=["disabled","autocomplete"],Wt={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}};var qt=T(Vt,[["render",function(e,t,l,o,n,a){const r=ie("el-tag"),s=ie("el-tooltip"),i=ie("el-icon"),u=ie("el-input"),c=ie("el-option"),p=ie("el-scrollbar"),d=ie("el-select-menu"),v=ue("click-outside");return k((z(),A("div",{ref:"selectWrapper",class:B(e.wrapperKls),onClick:t[23]||(t[23]=D(((...t)=>e.toggleMenu&&e.toggleMenu(...t)),["stop"]))},[ce(s,{ref:"tooltipRef",visible:e.dropMenuVisible,"onUpdate:visible":t[22]||(t[22]=t=>e.dropMenuVisible=t),placement:"bottom-start",teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"fallback-placements":["bottom-start","top-start","right","left"],effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onShow:e.handleMenuEnter},{default:pe((()=>[M("div",Bt,[e.multiple?(z(),A("div",{key:0,ref:"tags",class:B(e.nsSelect.e("tags")),style:K(e.selectTagsStyle)},[e.collapseTags&&e.selected.length?(z(),A("span",{key:0,class:B([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[ce(r,{closable:!e.selectDisabled&&!e.selected[0].isDisabled,size:e.collapseTagSize,hit:e.selected[0].hitState,type:e.tagType,"disable-transitions":"",onClose:t[0]||(t[0]=t=>e.deleteTag(t,e.selected[0]))},{default:pe((()=>[M("span",{class:B(e.nsSelect.e("tags-text")),style:K({maxWidth:e.inputWidth-123+"px"})},V(e.selected[0].currentLabel),7)])),_:1},8,["closable","size","hit","type"]),e.selected.length>1?(z(),de(r,{key:0,closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":""},{default:pe((()=>[e.collapseTagsTooltip?(z(),de(s,{key:0,disabled:e.dropMenuVisible,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:!1},{default:pe((()=>[M("span",{class:B(e.nsSelect.e("tags-text"))},"+ "+V(e.selected.length-1),3)])),content:pe((()=>[M("div",{class:B(e.nsSelect.e("collapse-tags"))},[(z(!0),A(ve,null,fe(e.selected.slice(1),((t,l)=>(z(),A("div",{key:l,class:B(e.nsSelect.e("collapse-tag"))},[(z(),de(r,{key:e.getValueKey(t),class:"in-tooltip",closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",style:{margin:"2px"},onClose:l=>e.deleteTag(l,t)},{default:pe((()=>[M("span",{class:B(e.nsSelect.e("tags-text")),style:K({maxWidth:e.inputWidth-75+"px"})},V(t.currentLabel),7)])),_:2},1032,["closable","size","hit","type","onClose"]))],2)))),128))],2)])),_:1},8,["disabled","effect"])):(z(),A("span",{key:1,class:B(e.nsSelect.e("tags-text"))},"+ "+V(e.selected.length-1),3))])),_:1},8,["size","type"])):be("v-if",!0)],2)):be("v-if",!0),be(" <div> "),e.collapseTags?be("v-if",!0):(z(),de(he,{key:1,onAfterLeave:e.resetInputHeight},{default:pe((()=>[M("span",{class:B([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(z(!0),A(ve,null,fe(e.selected,(t=>(z(),de(r,{key:e.getValueKey(t),closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",onClose:l=>e.deleteTag(l,t)},{default:pe((()=>[M("span",{class:B(e.nsSelect.e("tags-text")),style:K({maxWidth:e.inputWidth-75+"px"})},V(t.currentLabel),7)])),_:2},1032,["closable","size","hit","type","onClose"])))),128))],2)])),_:1},8,["onAfterLeave"])),be(" </div> "),e.filterable?k((z(),A("input",{key:2,ref:"input","onUpdate:modelValue":t[1]||(t[1]=t=>e.query=t),type:"text",class:B([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:K({marginLeft:e.prefixWidth&&!e.selected.length||e.tagInMultiLine?`${e.prefixWidth}px`:"",flexGrow:1,width:e.inputLength/(e.inputWidth-32)+"%",maxWidth:e.inputWidth-42+"px"}),onFocus:t[2]||(t[2]=(...t)=>e.handleFocus&&e.handleFocus(...t)),onBlur:t[3]||(t[3]=(...t)=>e.handleBlur&&e.handleBlur(...t)),onKeyup:t[4]||(t[4]=(...t)=>e.managePlaceholder&&e.managePlaceholder(...t)),onKeydown:[t[5]||(t[5]=(...t)=>e.resetInputState&&e.resetInputState(...t)),t[6]||(t[6]=me(D((t=>e.navigateOptions("next")),["prevent"]),["down"])),t[7]||(t[7]=me(D((t=>e.navigateOptions("prev")),["prevent"]),["up"])),t[8]||(t[8]=me(((...t)=>e.handleKeydownEscape&&e.handleKeydownEscape(...t)),["esc"])),t[9]||(t[9]=me(D(((...t)=>e.selectOption&&e.selectOption(...t)),["stop","prevent"]),["enter"])),t[10]||(t[10]=me(((...t)=>e.deletePrevTag&&e.deletePrevTag(...t)),["delete"])),t[11]||(t[11]=me((t=>e.visible=!1),["tab"]))],onCompositionstart:t[12]||(t[12]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionupdate:t[13]||(t[13]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionend:t[14]||(t[14]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onInput:t[15]||(t[15]=(...t)=>e.debouncedQueryChange&&e.debouncedQueryChange(...t))},null,46,Dt)),[[ge,e.query]]):be("v-if",!0)],6)):be("v-if",!0),ce(u,{id:e.id,ref:"reference",modelValue:e.selectedLabel,"onUpdate:modelValue":t[16]||(t[16]=t=>e.selectedLabel=t),type:"text",placeholder:e.currentPlaceholder,name:e.name,autocomplete:e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1,class:B([e.nsSelect.is("focus",e.visible)]),tabindex:e.multiple&&e.filterable?-1:void 0,onFocus:e.handleFocus,onBlur:e.handleBlur,onInput:e.debouncedOnInputChange,onPaste:e.debouncedOnInputChange,onCompositionstart:e.handleComposition,onCompositionupdate:e.handleComposition,onCompositionend:e.handleComposition,onKeydown:[t[17]||(t[17]=me(D((t=>e.navigateOptions("next")),["stop","prevent"]),["down"])),t[18]||(t[18]=me(D((t=>e.navigateOptions("prev")),["stop","prevent"]),["up"])),me(D(e.selectOption,["stop","prevent"]),["enter"]),me(e.handleKeydownEscape,["esc"]),t[19]||(t[19]=me((t=>e.visible=!1),["tab"]))],onMouseenter:t[20]||(t[20]=t=>e.inputHovering=!0),onMouseleave:t[21]||(t[21]=t=>e.inputHovering=!1)},ye({suffix:pe((()=>[e.iconComponent&&!e.showClose?(z(),de(i,{key:0,class:B([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:pe((()=>[(z(),de(Se(e.iconComponent)))])),_:1},8,["class"])):be("v-if",!0),e.showClose&&e.clearIcon?(z(),de(i,{key:1,class:B([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:pe((()=>[(z(),de(Se(e.clearIcon)))])),_:1},8,["class","onClick"])):be("v-if",!0)])),_:2},[e.$slots.prefix?{name:"prefix",fn:pe((()=>[M("div",Wt,[E(e.$slots,"prefix")])]))}:void 0]),1032,["id","modelValue","placeholder","name","autocomplete","size","disabled","readonly","class","tabindex","onFocus","onBlur","onInput","onPaste","onCompositionstart","onCompositionupdate","onCompositionend","onKeydown"])])])),content:pe((()=>[ce(d,null,{default:pe((()=>[k(ce(p,{ref:"scrollbar",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:B([e.nsSelect.is("empty",!e.allowCreate&&Boolean(e.query)&&0===e.filteredOptionsCount)])},{default:pe((()=>[e.showNewOption?(z(),de(c,{key:0,value:e.query,created:!0},null,8,["value"])):be("v-if",!0),E(e.$slots,"default")])),_:3},8,["wrap-class","view-class","class"]),[[P,e.options.size>0&&!e.loading]]),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&0===e.options.size)?(z(),A(ve,{key:0},[e.$slots.empty?E(e.$slots,"empty",{key:0}):(z(),A("p",{key:1,class:B(e.nsSelect.be("dropdown","empty"))},V(e.emptyText),3))],64)):be("v-if",!0)])),_:3})])),_:3},8,["visible","teleported","popper-class","effect","transition","persistent","onShow"])],2)),[[v,e.handleClose,e.popperPaneRef]])}],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);var Ft=T(x({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},setup(e){const t=w("select"),l=W(!0),o=O(),n=W([]);se("ElSelectGroup",j({..._(e)}));const a=h("ElSelect");q((()=>{n.value=r(o.subTree)}));const r=e=>{const t=[];return Array.isArray(e.children)&&e.children.forEach((e=>{var l;e.type&&"ElOption"===e.type.name&&e.component&&e.component.proxy?t.push(e.component.proxy):(null==(l=e.children)?void 0:l.length)&&t.push(...r(e))})),t},{groupQueryChange:s}=S(a);return y(s,(()=>{l.value=n.value.some((e=>!0===e.visible))})),{visible:l,ns:t}}}),[["render",function(e,t,l,o,n,a){return k((z(),A("ul",{class:B(e.ns.be("group","wrap"))},[M("li",{class:B(e.ns.be("group","title"))},V(e.label),3),M("li",null,[M("ul",{class:B(e.ns.b("group"))},[E(e.$slots,"default")],2)])],2)),[[P,e.visible]])}],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);const Kt=Ce(qt,{Option:At,OptionGroup:Ft}),Rt=Oe(At);Oe(Ft);export{Rt as E,Kt as a,zt as i};
