"use strict";var e=require("@csstools/css-tokenizer");const t=/license|copyright/i,r=/sourceMappingURL/i,s=/\s|\/\*/,o=/^layer$/i;function minify(t,r){if(!r)return r;if(t.has(r))return t.get(r);const o=r.trim();if(""===o)return t.set(r,""),"";if(!s.test(o))return t.set(r,o),o;const n=e.tokenize({css:o});let i,a=!1;for(let t=0;t<n.length;t++)i=n[t],e.isTokenWhiteSpaceOrComment(i)?(i[1]=a?"":" ",a=!0):a=!1;let c="";for(let e=0;e<n.length;e++)c+=n[e][1];return t.set(r,c),c}function removeEmptyNodes(e){if("rule"===e.type){if(0===e.nodes?.length){const t=e.parent;return!!t&&(e.remove(),removeEmptyNodes(t),!0)}}else if("atrule"===e.type&&0===e.nodes?.length&&!o.test(e.name)){const t=e.parent;return!!t&&(e.remove(),removeEmptyNodes(t),!0)}return!1}function setSemicolon(e){if(e.raws.semicolon){const t=e.last;"decl"===t?.type&&t.variable||(e.raws.semicolon=!1)}}const creator=()=>{const e=new Map;return{postcssPlugin:"postcss-minify",OnceExit(s){s.raws.before="",s.raws.after="\n",s.walk((s=>{switch(s.type){case"atrule":if(removeEmptyNodes(s))return;return s.raws.after="",s.raws.afterName=" ",s.raws.before="",s.raws.between="",s.raws.params=void 0,setSemicolon(s),void(s.params=minify(e,s.params));case"rule":if(removeEmptyNodes(s))return;return s.raws.after="",s.raws.before="",s.raws.between="",s.raws.selector=void 0,setSemicolon(s),void(s.selector=minify(e,s.selector));case"decl":return s.prop.startsWith("--")?void(s.raws.before=""):(s.raws.before="",s.raws.between=":",s.raws.important=s.important?"!important":"",s.raws.value=void 0,void(s.value=minify(e,s.value)));case"comment":return s.text.startsWith("!")||t.test(s.text)||r.test(s.text)?void(s.raws.before=""):void s.remove()}}))}}};creator.postcss=!0,module.exports=creator;
