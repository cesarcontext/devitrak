import{r as N,Y as J,_ as q,v as p,h as ee,m as te,l as ne,i as oe,ax as re,w as se,o as ie,p as le,aO as ae}from"./index-CfIzPxVU.js";import{S as ce}from"./index-Bm9gYaKe.js";import{u as ue}from"./index-B0laTGyl.js";var he={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},de=function(r,c){return N.createElement(J,q({},r,{ref:c,icon:he}))},fe=N.forwardRef(de),ge=Object.defineProperty,L=Object.getOwnPropertySymbols,D=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,z=(a,r,c)=>r in a?ge(a,r,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[r]=c,B=(a,r)=>{for(var c in r||(r={}))D.call(r,c)&&z(a,c,r[c]);if(L)for(var c of L(r))x.call(r,c)&&z(a,c,r[c]);return a},U=(a,r)=>{var c={};for(var l in a)D.call(a,l)&&r.indexOf(l)<0&&(c[l]=a[l]);if(a!=null&&L)for(var l of L(a))r.indexOf(l)<0&&x.call(a,l)&&(c[l]=a[l]);return c};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var y;(a=>{const r=class{constructor(e,t,n,o){if(this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let s=[];for(let i=0;i<this.size;i++)s.push(!1);for(let i=0;i<this.size;i++)this.modules.push(s.slice()),this.isFunction.push(s.slice());this.drawFunctionPatterns();const u=this.addEccAndInterleave(n);if(this.drawCodewords(u),o==-1){let i=1e9;for(let m=0;m<8;m++){this.applyMask(m),this.drawFormatBits(m);const d=this.getPenaltyScore();d<i&&(o=m,i=d),this.applyMask(m)}}h(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(e,t){const n=a.QrSegment.makeSegments(e);return r.encodeSegments(n,t)}static encodeBinary(e,t){const n=a.QrSegment.makeBytes(e);return r.encodeSegments([n],t)}static encodeSegments(e,t,n=1,o=40,s=-1,u=!0){if(!(r.MIN_VERSION<=n&&n<=o&&o<=r.MAX_VERSION)||s<-1||s>7)throw new RangeError("Invalid value");let i,m;for(i=n;;i++){const g=r.getNumDataCodewords(i,t)*8,w=C.getTotalBits(e,i);if(w<=g){m=w;break}if(i>=o)throw new RangeError("Data too long")}for(const g of[r.Ecc.MEDIUM,r.Ecc.QUARTILE,r.Ecc.HIGH])u&&m<=r.getNumDataCodewords(i,g)*8&&(t=g);let d=[];for(const g of e){l(g.mode.modeBits,4,d),l(g.numChars,g.mode.numCharCountBits(i),d);for(const w of g.getData())d.push(w)}h(d.length==m);const A=r.getNumDataCodewords(i,t)*8;h(d.length<=A),l(0,Math.min(4,A-d.length),d),l(0,(8-d.length%8)%8,d),h(d.length%8==0);for(let g=236;d.length<A;g^=253)l(g,8,d);let M=[];for(;M.length*8<d.length;)M.push(0);return d.forEach((g,w)=>M[w>>>3]|=g<<7-(w&7)),new r(i,t,M,s)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let n=0;n<this.size;n++)this.setFunctionModule(6,n,n%2==0),this.setFunctionModule(n,6,n%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let n=0;n<t;n++)for(let o=0;o<t;o++)n==0&&o==0||n==0&&o==t-1||n==t-1&&o==0||this.drawAlignmentPattern(e[n],e[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let n=t;for(let s=0;s<10;s++)n=n<<1^(n>>>9)*1335;const o=(t<<10|n)^21522;h(o>>>15==0);for(let s=0;s<=5;s++)this.setFunctionModule(8,s,E(o,s));this.setFunctionModule(8,7,E(o,6)),this.setFunctionModule(8,8,E(o,7)),this.setFunctionModule(7,8,E(o,8));for(let s=9;s<15;s++)this.setFunctionModule(14-s,8,E(o,s));for(let s=0;s<8;s++)this.setFunctionModule(this.size-1-s,8,E(o,s));for(let s=8;s<15;s++)this.setFunctionModule(8,this.size-15+s,E(o,s));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let n=0;n<12;n++)e=e<<1^(e>>>11)*7973;const t=this.version<<12|e;h(t>>>18==0);for(let n=0;n<18;n++){const o=E(t,n),s=this.size-11+n%3,u=Math.floor(n/3);this.setFunctionModule(s,u,o),this.setFunctionModule(u,s,o)}}drawFinderPattern(e,t){for(let n=-4;n<=4;n++)for(let o=-4;o<=4;o++){const s=Math.max(Math.abs(o),Math.abs(n)),u=e+o,i=t+n;0<=u&&u<this.size&&0<=i&&i<this.size&&this.setFunctionModule(u,i,s!=2&&s!=4)}}drawAlignmentPattern(e,t){for(let n=-2;n<=2;n++)for(let o=-2;o<=2;o++)this.setFunctionModule(e+o,t+n,Math.max(Math.abs(o),Math.abs(n))!=1)}setFunctionModule(e,t,n){this.modules[t][e]=n,this.isFunction[t][e]=!0}addEccAndInterleave(e){const t=this.version,n=this.errorCorrectionLevel;if(e.length!=r.getNumDataCodewords(t,n))throw new RangeError("Invalid argument");const o=r.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][t],s=r.ECC_CODEWORDS_PER_BLOCK[n.ordinal][t],u=Math.floor(r.getNumRawDataModules(t)/8),i=o-u%o,m=Math.floor(u/o);let d=[];const A=r.reedSolomonComputeDivisor(s);for(let g=0,w=0;g<o;g++){let R=e.slice(w,w+m-s+(g<i?0:1));w+=R.length;const P=r.reedSolomonComputeRemainder(R,A);g<i&&R.push(0),d.push(R.concat(P))}let M=[];for(let g=0;g<d[0].length;g++)d.forEach((w,R)=>{(g!=m-s||R>=i)&&M.push(w[g])});return h(M.length==u),M}drawCodewords(e){if(e.length!=Math.floor(r.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let t=0;for(let n=this.size-1;n>=1;n-=2){n==6&&(n=5);for(let o=0;o<this.size;o++)for(let s=0;s<2;s++){const u=n-s,m=(n+1&2)==0?this.size-1-o:o;!this.isFunction[m][u]&&t<e.length*8&&(this.modules[m][u]=E(e[t>>>3],7-(t&7)),t++)}}h(t==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let n=0;n<this.size;n++){let o;switch(e){case 0:o=(n+t)%2==0;break;case 1:o=t%2==0;break;case 2:o=n%3==0;break;case 3:o=(n+t)%3==0;break;case 4:o=(Math.floor(n/3)+Math.floor(t/2))%2==0;break;case 5:o=n*t%2+n*t%3==0;break;case 6:o=(n*t%2+n*t%3)%2==0;break;case 7:o=((n+t)%2+n*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][n]&&o&&(this.modules[t][n]=!this.modules[t][n])}}getPenaltyScore(){let e=0;for(let s=0;s<this.size;s++){let u=!1,i=0,m=[0,0,0,0,0,0,0];for(let d=0;d<this.size;d++)this.modules[s][d]==u?(i++,i==5?e+=r.PENALTY_N1:i>5&&e++):(this.finderPenaltyAddHistory(i,m),u||(e+=this.finderPenaltyCountPatterns(m)*r.PENALTY_N3),u=this.modules[s][d],i=1);e+=this.finderPenaltyTerminateAndCount(u,i,m)*r.PENALTY_N3}for(let s=0;s<this.size;s++){let u=!1,i=0,m=[0,0,0,0,0,0,0];for(let d=0;d<this.size;d++)this.modules[d][s]==u?(i++,i==5?e+=r.PENALTY_N1:i>5&&e++):(this.finderPenaltyAddHistory(i,m),u||(e+=this.finderPenaltyCountPatterns(m)*r.PENALTY_N3),u=this.modules[d][s],i=1);e+=this.finderPenaltyTerminateAndCount(u,i,m)*r.PENALTY_N3}for(let s=0;s<this.size-1;s++)for(let u=0;u<this.size-1;u++){const i=this.modules[s][u];i==this.modules[s][u+1]&&i==this.modules[s+1][u]&&i==this.modules[s+1][u+1]&&(e+=r.PENALTY_N2)}let t=0;for(const s of this.modules)t=s.reduce((u,i)=>u+(i?1:0),t);const n=this.size*this.size,o=Math.ceil(Math.abs(t*20-n*10)/n)-1;return h(0<=o&&o<=9),e+=o*r.PENALTY_N4,h(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let n=[6];for(let o=this.size-7;n.length<e;o-=t)n.splice(1,0,o);return n}}static getNumRawDataModules(e){if(e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version number out of range");let t=(16*e+128)*e+64;if(e>=2){const n=Math.floor(e/7)+2;t-=(25*n-10)*n-55,e>=7&&(t-=36)}return h(208<=t&&t<=29648),t}static getNumDataCodewords(e,t){return Math.floor(r.getNumRawDataModules(e)/8)-r.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*r.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let t=[];for(let o=0;o<e-1;o++)t.push(0);t.push(1);let n=1;for(let o=0;o<e;o++){for(let s=0;s<t.length;s++)t[s]=r.reedSolomonMultiply(t[s],n),s+1<t.length&&(t[s]^=t[s+1]);n=r.reedSolomonMultiply(n,2)}return t}static reedSolomonComputeRemainder(e,t){let n=t.map(o=>0);for(const o of e){const s=o^n.shift();n.push(0),t.forEach((u,i)=>n[i]^=r.reedSolomonMultiply(u,s))}return n}static reedSolomonMultiply(e,t){if(e>>>8||t>>>8)throw new RangeError("Byte out of range");let n=0;for(let o=7;o>=0;o--)n=n<<1^(n>>>7)*285,n^=(t>>>o&1)*e;return h(n>>>8==0),n}finderPenaltyCountPatterns(e){const t=e[1];h(t<=this.size*3);const n=t>0&&e[2]==t&&e[3]==t*3&&e[4]==t&&e[5]==t;return(n&&e[0]>=t*4&&e[6]>=t?1:0)+(n&&e[6]>=t*4&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,n){return e&&(this.finderPenaltyAddHistory(t,n),t=0),t+=this.size,this.finderPenaltyAddHistory(t,n),this.finderPenaltyCountPatterns(n)}finderPenaltyAddHistory(e,t){t[0]==0&&(e+=this.size),t.pop(),t.unshift(e)}};let c=r;c.MIN_VERSION=1,c.MAX_VERSION=40,c.PENALTY_N1=3,c.PENALTY_N2=3,c.PENALTY_N3=40,c.PENALTY_N4=10,c.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],c.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],a.QrCode=c;function l(e,t,n){if(t<0||t>31||e>>>t)throw new RangeError("Value out of range");for(let o=t-1;o>=0;o--)n.push(e>>>o&1)}function E(e,t){return(e>>>t&1)!=0}function h(e){if(!e)throw new Error("Assertion error")}const f=class{constructor(e,t,n){if(this.mode=e,this.numChars=t,this.bitData=n,t<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}static makeBytes(e){let t=[];for(const n of e)l(n,8,t);return new f(f.Mode.BYTE,e.length,t)}static makeNumeric(e){if(!f.isNumeric(e))throw new RangeError("String contains non-numeric characters");let t=[];for(let n=0;n<e.length;){const o=Math.min(e.length-n,3);l(parseInt(e.substr(n,o),10),o*3+1,t),n+=o}return new f(f.Mode.NUMERIC,e.length,t)}static makeAlphanumeric(e){if(!f.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let t=[],n;for(n=0;n+2<=e.length;n+=2){let o=f.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n))*45;o+=f.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n+1)),l(o,11,t)}return n<e.length&&l(f.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n)),6,t),new f(f.Mode.ALPHANUMERIC,e.length,t)}static makeSegments(e){return e==""?[]:f.isNumeric(e)?[f.makeNumeric(e)]:f.isAlphanumeric(e)?[f.makeAlphanumeric(e)]:[f.makeBytes(f.toUtf8ByteArray(e))]}static makeEci(e){let t=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)l(e,8,t);else if(e<16384)l(2,2,t),l(e,14,t);else if(e<1e6)l(6,3,t),l(e,21,t);else throw new RangeError("ECI assignment value out of range");return new f(f.Mode.ECI,0,t)}static isNumeric(e){return f.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return f.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let n=0;for(const o of e){const s=o.mode.numCharCountBits(t);if(o.numChars>=1<<s)return 1/0;n+=4+s+o.bitData.length}return n}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let n=0;n<e.length;n++)e.charAt(n)!="%"?t.push(e.charCodeAt(n)):(t.push(parseInt(e.substr(n+1,2),16)),n+=2);return t}};let C=f;C.NUMERIC_REGEX=/^[0-9]*$/,C.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,C.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",a.QrSegment=C})(y||(y={}));(a=>{(r=>{const c=class{constructor(E,h){this.ordinal=E,this.formatBits=h}};let l=c;l.LOW=new c(0,1),l.MEDIUM=new c(1,0),l.QUARTILE=new c(2,3),l.HIGH=new c(3,2),r.Ecc=l})(a.QrCode||(a.QrCode={}))})(y||(y={}));(a=>{(r=>{const c=class{constructor(E,h){this.modeBits=E,this.numBitsCharCount=h}numCharCountBits(E){return this.numBitsCharCount[Math.floor((E+7)/17)]}};let l=c;l.NUMERIC=new c(1,[10,12,14]),l.ALPHANUMERIC=new c(2,[9,11,13]),l.BYTE=new c(4,[8,16,16]),l.KANJI=new c(8,[8,10,12]),l.ECI=new c(7,[0,0,0]),r.Mode=l})(a.QrSegment||(a.QrSegment={}))})(y||(y={}));var I=y;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Q={L:I.QrCode.Ecc.LOW,M:I.QrCode.Ecc.MEDIUM,Q:I.QrCode.Ecc.QUARTILE,H:I.QrCode.Ecc.HIGH},$=128,k="L",H="#FFFFFF",Y="#000000",j=!1,F=4,me=.1;function G(a,r=0){const c=[];return a.forEach(function(l,E){let h=null;l.forEach(function(f,C){if(!f&&h!==null){c.push(`M${h+r} ${E+r}h${C-h}v1H${h+r}z`),h=null;return}if(C===l.length-1){if(!f)return;h===null?c.push(`M${C+r},${E+r} h1v1H${C+r}z`):c.push(`M${h+r},${E+r} h${C+1-h}v1H${h+r}z`);return}f&&h===null&&(h=C)})}),c.join("")}function X(a,r){return a.slice().map((c,l)=>l<r.y||l>=r.y+r.h?c:c.map((E,h)=>h<r.x||h>=r.x+r.w?E:!1))}function W(a,r,c,l){if(l==null)return null;const E=c?F:0,h=a.length+E*2,f=Math.floor(r*me),C=h/r,e=(l.width||f)*C,t=(l.height||f)*C,n=l.x==null?a.length/2-e/2:l.x*C,o=l.y==null?a.length/2-t/2:l.y*C;let s=null;if(l.excavate){let u=Math.floor(n),i=Math.floor(o),m=Math.ceil(e+n-u),d=Math.ceil(t+o-i);s={x:u,y:i,w:m,h:d}}return{x:n,y:o,h:t,w:e,excavation:s}}var Ee=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}();function Ce(a){const r=a,{value:c,size:l=$,level:E=k,bgColor:h=H,fgColor:f=Y,includeMargin:C=j,style:e,imageSettings:t}=r,n=U(r,["value","size","level","bgColor","fgColor","includeMargin","style","imageSettings"]),o=t==null?void 0:t.src,s=N.useRef(null),u=N.useRef(null),[i,m]=N.useState(!1);N.useEffect(()=>{if(s.current!=null){const M=s.current,g=M.getContext("2d");if(!g)return;let w=I.QrCode.encodeText(c,Q[E]).getModules();const R=C?F:0,P=w.length+R*2,_=W(w,l,C,t),S=u.current,b=_!=null&&S!==null&&S.complete&&S.naturalHeight!==0&&S.naturalWidth!==0;b&&_.excavation!=null&&(w=X(w,_.excavation));const v=window.devicePixelRatio||1;M.height=M.width=l*v;const O=l/P*v;g.scale(O,O),g.fillStyle=h,g.fillRect(0,0,P,P),g.fillStyle=f,Ee?g.fill(new Path2D(G(w,R))):w.forEach(function(T,V){T.forEach(function(K,Z){K&&g.fillRect(Z+R,V+R,1,1)})}),b&&g.drawImage(S,_.x+R,_.y+R,_.w,_.h)}}),N.useEffect(()=>{m(!1)},[o]);const d=B({height:l,width:l},e);let A=null;return o!=null&&(A=p.createElement("img",{src:o,key:o,style:{display:"none"},onLoad:()=>{m(!0)},ref:u})),p.createElement(p.Fragment,null,p.createElement("canvas",B({style:d,height:l,width:l,ref:s},n)),A)}function we(a){const r=a,{value:c,size:l=$,level:E=k,bgColor:h=H,fgColor:f=Y,includeMargin:C=j,imageSettings:e}=r,t=U(r,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]);let n=I.QrCode.encodeText(c,Q[E]).getModules();const o=C?F:0,s=n.length+o*2,u=W(n,l,C,e);let i=null;e!=null&&u!=null&&(u.excavation!=null&&(n=X(n,u.excavation)),i=p.createElement("image",{xlinkHref:e.src,height:u.h,width:u.w,x:u.x+o,y:u.y+o,preserveAspectRatio:"none"}));const m=G(n,o);return p.createElement("svg",B({height:l,width:l,viewBox:`0 0 ${s} ${s}`},t),p.createElement("path",{fill:h,d:`M0,0 h${s}v${s}H0z`,shapeRendering:"crispEdges"}),p.createElement("path",{fill:f,d:m,shapeRendering:"crispEdges"}),i)}const pe=a=>{const{componentCls:r,lineWidth:c,lineType:l,colorSplit:E}=a;return{[r]:Object.assign(Object.assign({},ne(a)),{display:"flex",justifyContent:"center",alignItems:"center",padding:a.paddingSM,backgroundColor:a.colorWhite,borderRadius:a.borderRadiusLG,border:`${oe(c)} ${l} ${E}`,position:"relative",overflow:"hidden",[`& > ${r}-mask`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",color:a.colorText,lineHeight:a.lineHeight,background:a.QRCodeMaskBackgroundColor,textAlign:"center",[`& > ${r}-expired, & > ${r}-scanned`]:{color:a.QRCodeTextColor}},"> canvas":{alignSelf:"stretch",flex:"auto",minWidth:0},"&-icon":{marginBlockEnd:a.marginXS,fontSize:a.controlHeight}}),[`${r}-borderless`]:{borderColor:"transparent",padding:0,borderRadius:0}}},Me=a=>({QRCodeMaskBackgroundColor:new re(a.colorBgContainer).setAlpha(.96).toRgbString()}),Re=ee("QRCode",a=>{const r=te(a,{QRCodeTextColor:a.colorText});return pe(r)},Me),Ne=a=>{var r,c;const[,l]=se(),{value:E,type:h="canvas",icon:f="",size:C=160,iconSize:e=40,color:t=l.colorText,errorLevel:n="M",status:o="active",bordered:s=!0,onRefresh:u,style:i,className:m,rootClassName:d,prefixCls:A,bgColor:M="transparent"}=a,{getPrefixCls:g}=N.useContext(ie),w=g("qrcode",A),[R,P,_]=Re(w),S={src:f,x:void 0,y:void 0,height:e,width:e,excavate:!0},b={value:E,size:C,level:n,bgColor:M,fgColor:t,style:{width:i==null?void 0:i.width,height:i==null?void 0:i.height},imageSettings:f?S:void 0},[v]=ue("QRCode");if(!E)return null;const O=le(w,m,d,P,_,{[`${w}-borderless`]:!s}),T=Object.assign(Object.assign({backgroundColor:M},i),{width:(r=i==null?void 0:i.width)!==null&&r!==void 0?r:C,height:(c=i==null?void 0:i.height)!==null&&c!==void 0?c:C});return R(p.createElement("div",{className:O,style:T},o!=="active"&&p.createElement("div",{className:`${w}-mask`},o==="loading"&&p.createElement(ce,null),o==="expired"&&p.createElement(p.Fragment,null,p.createElement("p",{className:`${w}-expired`},v==null?void 0:v.expired),u&&p.createElement(ae,{type:"link",icon:p.createElement(fe,null),onClick:u},v==null?void 0:v.refresh)),o==="scanned"&&p.createElement("p",{className:`${w}-scanned`},v==null?void 0:v.scanned)),h==="canvas"?p.createElement(Ce,Object.assign({},b)):p.createElement(we,Object.assign({},b))))};export{Ne as Q};