import s from"@csstools/postcss-progressive-custom-properties";import{color as e,SyntaxFlag as r,serializeRGB as o,colorDataFitsRGB_Gamut as t,serializeP3 as a}from"@csstools/css-color-parser";import{hasFallback as l,hasSupportsAtRuleAncestor as i}from"@csstools/utilities";import{replaceComponentValues as c,parseCommaSeparatedListOfComponentValues as n,isFunctionNode as u,stringify as p}from"@csstools/css-parser-algorithms";import{tokenize as b}from"@csstools/css-tokenizer";const g=/\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)\(/i,h=/\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)\(\s*from/i,m=/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)$/i,y=/from/i,basePlugin=s=>({postcssPlugin:"postcss-relative-color-syntax",Declaration(f){const v=f.value;if(!g.test(v)||!y.test(v))return;if(l(f))return;if(i(f,h))return;const x=b({css:v}),F=c(n(x),(s=>{if(!u(s)||!m.test(s.getName()))return;const t=e(s);return t&&!t.syntaxFlags.has(r.Experimental)&&!t.syntaxFlags.has(r.HasNoneKeywords)&&t.syntaxFlags.has(r.RelativeColorSyntax)?o(t):void 0})),P=p(F);if(P===v)return;let d=P;s?.subFeatures.displayP3&&(d=p(c(n(x),(s=>{if(!u(s)||!m.test(s.getName()))return;const l=e(s);return l&&!l.syntaxFlags.has(r.Experimental)&&!l.syntaxFlags.has(r.HasNoneKeywords)&&l.syntaxFlags.has(r.RelativeColorSyntax)?t(l)?o(l):a(l):void 0})))),f.cloneBefore({value:P}),s?.subFeatures.displayP3&&d!==P&&f.cloneBefore({value:d}),s?.preserve||f.remove()}});basePlugin.postcss=!0;const postcssPlugin=e=>{const r=Object.assign({enableProgressiveCustomProperties:!0,preserve:!1,subFeatures:{displayP3:!0}},e);return r.subFeatures=Object.assign({displayP3:!0},r.subFeatures),r.enableProgressiveCustomProperties&&(r.preserve||r.subFeatures.displayP3)?{postcssPlugin:"postcss-relative-color-syntax",plugins:[s(),basePlugin(r)]}:basePlugin(r)};postcssPlugin.postcss=!0;export{postcssPlugin as default};
