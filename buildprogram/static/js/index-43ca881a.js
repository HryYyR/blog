import{T as e,aR as a,aS as n,W as t,P as d,o as l,w as o,aK as u,a2 as s,aT as v}from"./index-227f788f.js";const i=()=>({form:e(a,void 0),formItem:e(n,void 0)}),I=(e,{formItemContext:a,disableIdGeneration:n,disableIdManagement:i})=>{n||(n=t(!1)),i||(i=t(!1));const I=t();let r;const m=d((()=>{var n;return!!(!e.label&&a&&a.inputIds&&(null==(n=a.inputIds)?void 0:n.length)<=1)}));return l((()=>{r=o([s(e,"id"),n],(([e,n])=>{const t=null!=e?e:n?void 0:u().value;t!==I.value&&((null==a?void 0:a.removeInputId)&&(I.value&&a.removeInputId(I.value),(null==i?void 0:i.value)||n||!t||a.addInputId(t)),I.value=t)}),{immediate:!0})})),v((()=>{r&&r(),(null==a?void 0:a.removeInputId)&&I.value&&a.removeInputId(I.value)})),{isLabeledByFormItem:m,inputId:I}};export{I as a,i as u};
