/*! @license DOMPurify 3.1.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.2/LICENSE */const{entries:mt,setPrototypeOf:it,isFrozen:zt,getPrototypeOf:Gt,getOwnPropertyDescriptor:Wt}=Object;let{freeze:h,seal:y,create:pt}=Object,{apply:Ne,construct:De}=typeof Reflect<"u"&&Reflect;h||(h=function(o){return o});y||(y=function(o){return o});Ne||(Ne=function(o,c,s){return o.apply(c,s)});De||(De=function(o,c){return new o(...c)});const ne=L(Array.prototype.forEach),at=L(Array.prototype.pop),V=L(Array.prototype.push),ae=L(String.prototype.toLowerCase),Se=L(String.prototype.toString),rt=L(String.prototype.match),$=L(String.prototype.replace),Bt=L(String.prototype.indexOf),Yt=L(String.prototype.trim),N=L(Object.prototype.hasOwnProperty),R=L(RegExp.prototype.test),q=Xt(TypeError);function L(l){return function(o){for(var c=arguments.length,s=new Array(c>1?c-1:0),d=1;d<c;d++)s[d-1]=arguments[d];return Ne(l,o,s)}}function Xt(l){return function(){for(var o=arguments.length,c=new Array(o),s=0;s<o;s++)c[s]=arguments[s];return De(l,c)}}function r(l,o){let c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ae;it&&it(l,null);let s=o.length;for(;s--;){let d=o[s];if(typeof d=="string"){const b=c(d);b!==d&&(zt(o)||(o[s]=b),d=b)}l[d]=!0}return l}function jt(l){for(let o=0;o<l.length;o++)N(l,o)||(l[o]=null);return l}function w(l){const o=pt(null);for(const[c,s]of mt(l))N(l,c)&&(Array.isArray(s)?o[c]=jt(s):s&&typeof s=="object"&&s.constructor===Object?o[c]=w(s):o[c]=s);return o}function oe(l,o){for(;l!==null;){const s=Wt(l,o);if(s){if(s.get)return L(s.get);if(typeof s.value=="function")return L(s.value)}l=Gt(l)}function c(){return null}return c}const st=h(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Re=h(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Le=h(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vt=h(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ye=h(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$t=h(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),lt=h(["#text"]),ct=h(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Oe=h(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ft=h(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ie=h(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qt=y(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Kt=y(/<%[\w\W]*|[\w\W]*%>/gm),Zt=y(/\${[\w\W]*}/gm),Jt=y(/^data-[\-\w.\u00B7-\uFFFF]/),Qt=y(/^aria-[\-\w]+$/),dt=y(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),en=y(/^(?:\w+script|data):/i),tn=y(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_t=y(/^html$/i),nn=y(/^[a-z][.\w]*(-[.\w]+)+$/i);var ut=Object.freeze({__proto__:null,MUSTACHE_EXPR:qt,ERB_EXPR:Kt,TMPLIT_EXPR:Zt,DATA_ATTR:Jt,ARIA_ATTR:Qt,IS_ALLOWED_URI:dt,IS_SCRIPT_OR_DATA:en,ATTR_WHITESPACE:tn,DOCTYPE_NAME:_t,CUSTOM_ELEMENT:nn});const on=function(){return typeof window>"u"?null:window},an=function(o,c){if(typeof o!="object"||typeof o.createPolicy!="function")return null;let s=null;const d="data-tt-policy-suffix";c&&c.hasAttribute(d)&&(s=c.getAttribute(d));const b="dompurify"+(s?"#"+s:"");try{return o.createPolicy(b,{createHTML(x){return x},createScriptURL(x){return x}})}catch{return console.warn("TrustedTypes policy "+b+" could not be created."),null}};function Tt(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:on();const o=i=>Tt(i);if(o.version="3.1.2",o.removed=[],!l||!l.document||l.document.nodeType!==9)return o.isSupported=!1,o;let{document:c}=l;const s=c,d=s.currentScript,{DocumentFragment:b,HTMLTemplateElement:x,Node:re,Element:be,NodeFilter:z,NamedNodeMap:Et=l.NamedNodeMap||l.MozNamedAttrMap,HTMLFormElement:ht,DOMParser:gt,trustedTypes:K}=l,Z=be.prototype,At=oe(Z,"cloneNode"),St=oe(Z,"nextSibling"),Rt=oe(Z,"childNodes"),G=oe(Z,"parentNode");if(typeof x=="function"){const i=c.createElement("template");i.content&&i.content.ownerDocument&&(c=i.content.ownerDocument)}let E,W="";const{implementation:se,createNodeIterator:Lt,createDocumentFragment:yt,getElementsByTagName:Ot}=c,{importNode:Nt}=s;let D={};o.isSupported=typeof mt=="function"&&typeof G=="function"&&se&&se.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:fe,DATA_ATTR:Dt,ARIA_ATTR:bt,IS_SCRIPT_OR_DATA:Ct,ATTR_WHITESPACE:Ce,CUSTOM_ELEMENT:It}=ut;let{IS_ALLOWED_URI:Ie}=ut,u=null;const Me=r({},[...st,...Re,...Le,...ye,...lt]);let m=null;const we=r({},[...ct,...Oe,...ft,...ie]);let f=Object.seal(pt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),B=null,ue=null,xe=!0,me=!0,Pe=!1,ve=!0,P=!1,ke=!0,M=!1,pe=!1,de=!1,v=!1,J=!1,Q=!1,Ue=!0,Fe=!1;const Mt="user-content-";let _e=!0,Y=!1,k={},U=null;const He=r({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ze=null;const Ge=r({},["audio","video","img","source","image","track"]);let Te=null;const We=r({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ee="http://www.w3.org/1998/Math/MathML",te="http://www.w3.org/2000/svg",C="http://www.w3.org/1999/xhtml";let F=C,Ee=!1,he=null;const wt=r({},[ee,te,C],Se);let X=null;const xt=["application/xhtml+xml","text/html"],Pt="text/html";let p=null,H=null;const Be=255,vt=c.createElement("form"),Ye=function(e){return e instanceof RegExp||e instanceof Function},ge=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(H&&H===e)){if((!e||typeof e!="object")&&(e={}),e=w(e),X=xt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Pt:e.PARSER_MEDIA_TYPE,p=X==="application/xhtml+xml"?Se:ae,u=N(e,"ALLOWED_TAGS")?r({},e.ALLOWED_TAGS,p):Me,m=N(e,"ALLOWED_ATTR")?r({},e.ALLOWED_ATTR,p):we,he=N(e,"ALLOWED_NAMESPACES")?r({},e.ALLOWED_NAMESPACES,Se):wt,Te=N(e,"ADD_URI_SAFE_ATTR")?r(w(We),e.ADD_URI_SAFE_ATTR,p):We,ze=N(e,"ADD_DATA_URI_TAGS")?r(w(Ge),e.ADD_DATA_URI_TAGS,p):Ge,U=N(e,"FORBID_CONTENTS")?r({},e.FORBID_CONTENTS,p):He,B=N(e,"FORBID_TAGS")?r({},e.FORBID_TAGS,p):{},ue=N(e,"FORBID_ATTR")?r({},e.FORBID_ATTR,p):{},k=N(e,"USE_PROFILES")?e.USE_PROFILES:!1,xe=e.ALLOW_ARIA_ATTR!==!1,me=e.ALLOW_DATA_ATTR!==!1,Pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,P=e.SAFE_FOR_TEMPLATES||!1,ke=e.SAFE_FOR_XML!==!1,M=e.WHOLE_DOCUMENT||!1,v=e.RETURN_DOM||!1,J=e.RETURN_DOM_FRAGMENT||!1,Q=e.RETURN_TRUSTED_TYPE||!1,de=e.FORCE_BODY||!1,Ue=e.SANITIZE_DOM!==!1,Fe=e.SANITIZE_NAMED_PROPS||!1,_e=e.KEEP_CONTENT!==!1,Y=e.IN_PLACE||!1,Ie=e.ALLOWED_URI_REGEXP||dt,F=e.NAMESPACE||C,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Ye(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Ye(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),P&&(me=!1),J&&(v=!0),k&&(u=r({},lt),m=[],k.html===!0&&(r(u,st),r(m,ct)),k.svg===!0&&(r(u,Re),r(m,Oe),r(m,ie)),k.svgFilters===!0&&(r(u,Le),r(m,Oe),r(m,ie)),k.mathMl===!0&&(r(u,ye),r(m,ft),r(m,ie))),e.ADD_TAGS&&(u===Me&&(u=w(u)),r(u,e.ADD_TAGS,p)),e.ADD_ATTR&&(m===we&&(m=w(m)),r(m,e.ADD_ATTR,p)),e.ADD_URI_SAFE_ATTR&&r(Te,e.ADD_URI_SAFE_ATTR,p),e.FORBID_CONTENTS&&(U===He&&(U=w(U)),r(U,e.FORBID_CONTENTS,p)),_e&&(u["#text"]=!0),M&&r(u,["html","head","body"]),u.table&&(r(u,["tbody"]),delete B.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw q('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw q('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=e.TRUSTED_TYPES_POLICY,W=E.createHTML("")}else E===void 0&&(E=an(K,d)),E!==null&&typeof W=="string"&&(W=E.createHTML(""));h&&h(e),H=e}},Xe=r({},["mi","mo","mn","ms","mtext"]),je=r({},["foreignobject","annotation-xml"]),kt=r({},["title","style","font","a","script"]),Ve=r({},[...Re,...Le,...Vt]),$e=r({},[...ye,...$t]),Ut=function(e){let t=G(e);(!t||!t.tagName)&&(t={namespaceURI:F,tagName:"template"});const n=ae(e.tagName),a=ae(t.tagName);return he[e.namespaceURI]?e.namespaceURI===te?t.namespaceURI===C?n==="svg":t.namespaceURI===ee?n==="svg"&&(a==="annotation-xml"||Xe[a]):!!Ve[n]:e.namespaceURI===ee?t.namespaceURI===C?n==="math":t.namespaceURI===te?n==="math"&&je[a]:!!$e[n]:e.namespaceURI===C?t.namespaceURI===te&&!je[a]||t.namespaceURI===ee&&!Xe[a]?!1:!$e[n]&&(kt[n]||!Ve[n]):!!(X==="application/xhtml+xml"&&he[e.namespaceURI]):!1},O=function(e){V(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Ae=function(e,t){try{V(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch{V(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(v||J)try{O(t)}catch{}else try{t.setAttribute(e,"")}catch{}},qe=function(e){let t=null,n=null;if(de)e="<remove></remove>"+e;else{const T=rt(e,/^[\r\n\t ]+/);n=T&&T[0]}X==="application/xhtml+xml"&&F===C&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const a=E?E.createHTML(e):e;if(F===C)try{t=new gt().parseFromString(a,X)}catch{}if(!t||!t.documentElement){t=se.createDocument(F,"template",null);try{t.documentElement.innerHTML=Ee?W:a}catch{}}const _=t.body||t.documentElement;return e&&n&&_.insertBefore(c.createTextNode(n),_.childNodes[0]||null),F===C?Ot.call(t,M?"html":"body")[0]:M?t.documentElement:_},Ke=function(e){return Lt.call(e.ownerDocument||e,e,z.SHOW_ELEMENT|z.SHOW_COMMENT|z.SHOW_TEXT|z.SHOW_PROCESSING_INSTRUCTION|z.SHOW_CDATA_SECTION,null)},Ft=function(e){return e instanceof ht&&(typeof e.__depth<"u"&&typeof e.__depth!="number"||typeof e.__removalCount<"u"&&typeof e.__removalCount!="number"||typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Et)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},Ze=function(e){return typeof re=="function"&&e instanceof re},I=function(e,t,n){D[e]&&ne(D[e],a=>{a.call(o,t,n,H)})},Je=function(e){let t=null;if(I("beforeSanitizeElements",e,null),Ft(e))return O(e),!0;const n=p(e.nodeName);if(I("uponSanitizeElement",e,{tagName:n,allowedTags:u}),e.hasChildNodes()&&!Ze(e.firstElementChild)&&R(/<[/\w]/g,e.innerHTML)&&R(/<[/\w]/g,e.textContent)||e.nodeType===7||ke&&e.nodeType===8&&R(/<[/\w]/g,e.data))return O(e),!0;if(!u[n]||B[n]){if(!B[n]&&et(n)&&(f.tagNameCheck instanceof RegExp&&R(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n)))return!1;if(_e&&!U[n]){const a=G(e)||e.parentNode,_=Rt(e)||e.childNodes;if(_&&a){const T=_.length;for(let g=T-1;g>=0;--g){const A=At(_[g],!0);A.__removalCount=(e.__removalCount||0)+1,a.insertBefore(A,St(e))}}}return O(e),!0}return e instanceof be&&!Ut(e)||(n==="noscript"||n==="noembed"||n==="noframes")&&R(/<\/no(script|embed|frames)/i,e.innerHTML)?(O(e),!0):(P&&e.nodeType===3&&(t=e.textContent,ne([le,ce,fe],a=>{t=$(t,a," ")}),e.textContent!==t&&(V(o.removed,{element:e.cloneNode()}),e.textContent=t)),I("afterSanitizeElements",e,null),!1)},Qe=function(e,t,n){if(Ue&&(t==="id"||t==="name")&&(n in c||n in vt))return!1;if(!(me&&!ue[t]&&R(Dt,t))){if(!(xe&&R(bt,t))){if(!m[t]||ue[t]){if(!(et(e)&&(f.tagNameCheck instanceof RegExp&&R(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&R(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&R(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n))))return!1}else if(!Te[t]){if(!R(Ie,$(n,Ce,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Bt(n,"data:")===0&&ze[e])){if(!(Pe&&!R(Ct,$(n,Ce,"")))){if(n)return!1}}}}}}return!0},et=function(e){return e!=="annotation-xml"&&rt(e,It)},tt=function(e){I("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m};let a=t.length;for(;a--;){const _=t[a],{name:T,namespaceURI:g,value:A}=_,j=p(T);let S=T==="value"?A:Yt(A);if(n.attrName=j,n.attrValue=S,n.keepAttr=!0,n.forceKeepAttr=void 0,I("uponSanitizeAttribute",e,n),S=n.attrValue,n.forceKeepAttr||(Ae(T,e),!n.keepAttr))continue;if(!ve&&R(/\/>/i,S)){Ae(T,e);continue}P&&ne([le,ce,fe],ot=>{S=$(S,ot," ")});const nt=p(e.nodeName);if(Qe(nt,j,S)){if(Fe&&(j==="id"||j==="name")&&(Ae(T,e),S=Mt+S),E&&typeof K=="object"&&typeof K.getAttributeType=="function"&&!g)switch(K.getAttributeType(nt,j)){case"TrustedHTML":{S=E.createHTML(S);break}case"TrustedScriptURL":{S=E.createScriptURL(S);break}}try{g?e.setAttributeNS(g,T,S):e.setAttribute(T,S),at(o.removed)}catch{}}}I("afterSanitizeAttributes",e,null)},Ht=function i(e){let t=null;const n=Ke(e);for(I("beforeSanitizeShadowDOM",e,null);t=n.nextNode();){if(I("uponSanitizeShadowNode",t,null),Je(t))continue;const a=G(t);t.nodeType===1&&(a&&a.__depth?t.__depth=(t.__removalCount||0)+a.__depth+1:t.__depth=1),t.__depth>=Be&&O(t),t.content instanceof b&&(t.content.__depth=t.__depth,i(t.content)),tt(t)}I("afterSanitizeShadowDOM",e,null)};return o.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,n=null,a=null,_=null;if(Ee=!i,Ee&&(i="<!-->"),typeof i!="string"&&!Ze(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw q("dirty is not a string, aborting")}else throw q("toString is not a function");if(!o.isSupported)return i;if(pe||ge(e),o.removed=[],typeof i=="string"&&(Y=!1),Y){if(i.nodeName){const A=p(i.nodeName);if(!u[A]||B[A])throw q("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof re)t=qe("<!---->"),n=t.ownerDocument.importNode(i,!0),n.nodeType===1&&n.nodeName==="BODY"||n.nodeName==="HTML"?t=n:t.appendChild(n);else{if(!v&&!P&&!M&&i.indexOf("<")===-1)return E&&Q?E.createHTML(i):i;if(t=qe(i),!t)return v?null:Q?W:""}t&&de&&O(t.firstChild);const T=Ke(Y?i:t);for(;a=T.nextNode();){if(Je(a))continue;const A=G(a);a.nodeType===1&&(A&&A.__depth?a.__depth=(a.__removalCount||0)+A.__depth+1:a.__depth=1),a.__depth>=Be&&O(a),a.content instanceof b&&(a.content.__depth=a.__depth,Ht(a.content)),tt(a)}if(Y)return i;if(v){if(J)for(_=yt.call(t.ownerDocument);t.firstChild;)_.appendChild(t.firstChild);else _=t;return(m.shadowroot||m.shadowrootmode)&&(_=Nt.call(s,_,!0)),_}let g=M?t.outerHTML:t.innerHTML;return M&&u["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&R(_t,t.ownerDocument.doctype.name)&&(g="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+g),P&&ne([le,ce,fe],A=>{g=$(g,A," ")}),E&&Q?E.createHTML(g):g},o.setConfig=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ge(i),pe=!0},o.clearConfig=function(){H=null,pe=!1},o.isValidAttribute=function(i,e,t){H||ge({});const n=p(i),a=p(e);return Qe(n,a,t)},o.addHook=function(i,e){typeof e=="function"&&(D[i]=D[i]||[],V(D[i],e))},o.removeHook=function(i){if(D[i])return at(D[i])},o.removeHooks=function(i){D[i]&&(D[i]=[])},o.removeAllHooks=function(){D={}},o}var rn=Tt();export{rn as p};