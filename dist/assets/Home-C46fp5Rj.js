import{r as l,k as h,l as I,a3 as p,v as y,a4 as j,j as t,G as d,T as u,a5 as E,a6 as b,o as x,a7 as A,a8 as S,a9 as D,aa as C,ab as _,ac as w,ad as k,ae as W,af as N,ag as L}from"./index-DcevCD6o.js";const O=()=>(navigator.saysWho=(()=>{const{userAgent:s}=navigator;let o=s.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],e;if(/trident/i.test(o[1]))return e=/\brv[ :]+(\d+)/g.exec(s)||[],`IE ${e[1]||""}`;if(o[1]==="Chrome"){if(e=s.match(/\b(OPR|Edge)\/(\d+)/),e!==null)return e.slice(1).join(" ").replace("OPR","Opera");if(e=s.match(/\b(Edg)\/(\d+)/),e!==null)return e.slice(1).join(" ").replace("Edg","Edge (Chromium)")}return o=o[2]?[o[1],o[2]]:[navigator.appName,navigator.appVersion,"-?"],e=s.match(/version\/(\d+)/i),e!==null&&o.splice(1,1,e[1]),o.join(" ")})(),navigator.saysWho),F=()=>{const[s,o]=l.useState(!1),e=new URLSearchParams(window.location.search).get("event"),f=new URLSearchParams(window.location.search).get("company"),a=h(),g=I(),r=p({queryKey:["listOfEvents"],queryFn:()=>x.post("/event/event-list",{_id:e}),refetchOnMount:!1}),c=p({queryKey:["companyInfoEvent"],queryFn:()=>x.post("/company/search-company",{_id:f}),refetchOnMount:!1});l.useEffect(()=>{const i=new AbortController;return r.refetch(),c.refetch(),()=>{i.abort()}},[r.isLoading,c.isLoading]);const m=l.useCallback(()=>c.data?y(c.data.data.company):null,[c.data,f,e]);m();const n=l.useCallback(()=>r.data?y(r.data.data.list):null,[r.data,f,e]);n();const v=()=>{var i;if(n()&&m())if((i=n())!=null&&i.active)a(A(m())),a(S(n())),a(D(n().eventInfoDetail)),a(C(n().staff)),a(_(n().eventInfoDetail.eventName)),a(w(n().company)),a(k(n().deviceSetup)),a(W(n().contactInfo)),a(N(n().subscription)),setTimeout(()=>{a(L()),g("/initial-form")},2e3);else return o(!0)};if(l.useEffect(()=>{const i=new AbortController;return v(),a(j(O())),()=>{i.abort()}},[r.isLoading,r.data]),r.data)return t.jsxs(d,{container:!0,children:[s&&t.jsx(d,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"2rem auto",container:!0,children:t.jsx(d,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",item:!0,xs:10,margin:"1rem 0",children:t.jsxs(u,{color:"red",textAlign:"center",fontFamily:"Inter",fontSize:"14px",fontStyle:"normal",fontWeight:500,lineHeight:"20px",style:{textWrap:"balance",textDecoration:"underline"},children:[n().eventInfoDetail.eventName," is already ended or does not exist."]})})}),t.jsx(d,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"2rem auto",style:{position:"absolute",top:"25%",bottom:"25%"},container:!0,children:t.jsxs(d,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",item:!0,xs:10,margin:"2rem 0",children:[" ",t.jsxs(u,{color:"var(--gray-900, #101828)",textAlign:"center",fontFamily:"Inter",fontSize:"20px",fontStyle:"normal",fontWeight:600,lineHeight:"30px",style:{textWrap:"balance"},children:["Welcome to"," "]}),t.jsx("br",{}),t.jsxs("div",{style:{display:"flex"},children:[t.jsx("div",{className:"animate__animated animate__backInLeft animate__delay-0.8s",children:t.jsx("img",{src:E,alt:"logo",style:{width:"50px"}})}),t.jsx("div",{className:"animate__animated animate__backInRight animate__delay-0.8s",children:t.jsx("img",{src:b,alt:"name",style:{width:"100px"}})})]}),t.jsx("br",{}),t.jsx(u,{color:"var(--gray-900, #101828)",textAlign:"center",fontFamily:"Inter",fontSize:"14px",fontStyle:"normal",fontWeight:500,lineHeight:"20px",style:{textWrap:"balance"},children:"Safeguard your devices"})]})})]})};export{F as default};