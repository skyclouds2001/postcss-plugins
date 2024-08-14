import e from"@csstools/postcss-progressive-custom-properties";import{tokenize as r,isTokenIdent as t,isTokenComma as o,TokenType as s}from"@csstools/css-tokenizer";import{hasFallback as n,hasSupportsAtRuleAncestor as a}from"@csstools/utilities";import{isFunctionNode as i,isWhitespaceNode as c,isCommentNode as l,walk as u,isTokenNode as p,replaceComponentValues as f,parseCommaSeparatedListOfComponentValues as v,FunctionNode as g,TokenNode as m,WhitespaceNode as d,stringify as h}from"@csstools/css-parser-algorithms";const k="--csstools-color-scheme--dark",D="initial";function toggleNameGenerator(e){return`--csstools-light-dark-toggle--${e}`}const L=/dark/i,C=/light/i;function colorSchemes(e){const o=r({css:e});let s=!1,n=!1;return o.forEach((e=>{t(e)&&(C.test(e[4].value)?s=!0:L.test(e[4].value)&&(n=!0))})),[s,n]}const P=/^light-dark$/i;function isComma(e){return p(e)&&o(e.value)}function parseLightDark(e){if(!i(e)||!P.test(e.getName()))return!1;const r=e.value.filter((e=>!c(e)&&!l(e)));if(3!==r.length)return!1;let t=r[0];const o=r[1];let s=r[2];if(!t||!o||!s)return!1;if(!isComma(o))return!1;if(isComma(t)||isComma(s))return!1;if(i(t)){const e=[t];u(e,(({node:e,parent:r},t)=>{recurseLightDark(e,r,t,!0)})),[t]=e}if(i(s)){const e=[s];u(e,(({node:e,parent:r},t)=>{recurseLightDark(e,r,t,!1)})),[s]=e}return[t,s]}function recurseLightDark(e,r,t,o){if("number"!=typeof t)return;const s=parseLightDark(e);if(!s)return;let n=s[o?0:1];if(i(n)){const e=[n];u(e,(({node:e,parent:r},t)=>{recurseLightDark(e,r,t,o)})),[n]=e}r.value[t]=n}function transformLightDark(e,t){const o=new Map,n=f(v(r({css:e})),(e=>{const r=parseLightDark(e);if(!r)return;const[n,a]=r,i=t();return o.set(i,`var(${k}) ${n.toString()}`),new g([s.Function,"var(",-1,-1,{value:"var"}],[s.CloseParen,")",-1,-1,void 0],[new m([s.Ident,i,-1,-1,{value:i}]),new m([s.Comma,",",-1,-1,void 0]),new d([[s.Whitespace," ",-1,-1,void 0]]),a])}));return{value:h(n),toggles:o}}const b=/^color-scheme$/i,w=/\blight-dark\(/i,basePlugin=e=>({postcssPlugin:"postcss-light-dark-function",prepare(){let r=0;const currentToggleNameGenerator=()=>toggleNameGenerator(r++),t=new Map;return{postcssPlugin:"postcss-light-dark-function",Declaration(r,{atRule:o,rule:s}){const i=r.parent;if(i){if(b.test(r.prop)){if(i.some((e=>"decl"===e.type&&e.prop===k)))return;const[e,t]=colorSchemes(r.value);if(e&&t){r.cloneBefore({prop:k,value:" "});const e=i.clone();e.removeAll(),e.append(r.clone({prop:k,value:D}));const t=o({name:"media",params:"(prefers-color-scheme: dark)",source:i.source});return t.append(e),void i.after(t)}return t?void r.cloneBefore({prop:k,value:D}):e?void r.cloneBefore({prop:k,value:" "}):void 0}if(w.test(r.value)){if(n(r))return;if(a(r,w))return;const o=transformLightDark(r.value,currentToggleNameGenerator);if(o.value===r.value)return;for(const[e,t]of o.toggles)r.cloneBefore({prop:e,value:t});if(r.cloneBefore({value:o.value}),r.variable&&r.parent){const e=t.get(r.parent)??s({selector:"& *",source:r.source});for(const[t,s]of o.toggles)e.append(r.clone({prop:t,value:s}));e.append(r.clone({value:o.value})),t.has(r.parent)||(r.parent.append(e),t.set(r.parent,e))}e?.preserve||r.remove()}}}}}});basePlugin.postcss=!0;const postcssPlugin=r=>{const t=Object.assign({enableProgressiveCustomProperties:!0,preserve:!0},r);return t.enableProgressiveCustomProperties&&t.preserve?{postcssPlugin:"postcss-light-dark-function",plugins:[e(),basePlugin(t)]}:basePlugin(t)};postcssPlugin.postcss=!0;export{postcssPlugin as default};
