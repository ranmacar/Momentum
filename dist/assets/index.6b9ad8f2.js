const I=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const g of a.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function l(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(o){if(o.ep)return;o.ep=!0;const a=l(o);fetch(o.href,a)}};I();var A=[];let q=0;function K(t){var e=function(...o){return o.length?l(o[0]):c()};e.index=q++,e.value=t,e.subs=[],e.sub=(o,a)=>{~e.subs.indexOf(o)||e.subs.push(o),a&&o(e.value)},e.unsub=o=>{j(e.subs,o)};function l(o,a){if(!(o===e.value&&(t===null||typeof e.value!="object"||a&&a(o,e.value)))){var g=e.value;e.value=o;for(let x=e.subs.length-1;x>-1;x--)e.subs[x](e.value,g)}}function c(){var o=A[A.length-1];return o&&e.sub(o),e.value}return e}K.circular=new Set;K.computed=t=>{var e=K();return e.computed=()=>{if(A.indexOf(e.computed)>-1){K.circular.add(e);debugger;return}let l;A.push(e.computed);try{l=t(e.value)}catch(c){console.log(c,e),l=null}finally{A.pop(),e(l)}},e.computed.self=e,e.computed(),e};K.from=t=>{var e=K();return t(e),e};function j(t,e){var l=t.indexOf(e);l>-1&&t.splice(l,1)}const H=t=>t&&(!!t.length||!!Object.keys(t).length||t instanceof Function),N=document.createElement.bind(document),R=document.createTextNode.bind(document),Y=document.createElementNS.bind(document,"http://www.w3.org/2000/svg"),W=document.createElementNS.bind(document,"http://www.w3.org/1998/Math/MathML"),Q={html:N,svg:Y,math:W},U=t=>{const[e,l]=t.match(/^(\w+:)?(\w+)/)?.slice?.(1)||[null,"div"],c=[...t.matchAll(/[\.#]\w+/g)].reduce((o,[a])=>a.startsWith(".")?{...o,class:o.class?o.class+" "+a.slice(1):a.slice(1)}:{...o,id:a.slice(1)},{});return[e?.slice?.(0,-1)||"html",l,c]},k=(t,e)=>{if(!!H(t)){if(t instanceof HTMLElement)return t;if(typeof t=="string"||typeof t=="number")return R(t);if(Array.isArray(t)){let l=t.shift();if(l instanceof Function&&(l=l(e)),typeof l=="string"){const[c,o,a]=U(l);l=k([Q[c](o),a]),l.parent=e}return t.reduce((c,o)=>{try{const a=k(o,c);a&&c!==a&&c.appendChild(a)}catch(a){console.log(a,c,child)}finally{return c}},l)}if(t instanceof Function){const l=t(e);return l?k(l,e):void 0}if(typeof t=="object")return Object.entries(t).reduce((l,[c,o])=>{try{o instanceof Function&&(o=o(l)),l.setAttribute(c,o)}catch(a){console.log(a,l,c,o)}finally{return l}},e||node("div"))}};var $=(t="on:",e=!0,l=console.error)=>{const c={};function o(n,d){for(n.caller=n.target;n.caller;){if(n.caller[t+d]?.map?.(i=>{try{return i(n)}catch(y){l(y,d,n,n.caller)}}).some(i=>!!i))return;n.caller=n.caller.parentNode}}function a(n){c[n]||(document.addEventListener(n,d=>o(d,n)),c[n]=!0)}function g(n,d,i,y){var m=n.createSVGPoint();m.x=d,m.y=i;var L=m.matrixTransform((y||n).getScreenCTM().inverse());return[L.x,1-L.y]}function x(n){for(;n&&n.nodeName!=="svg";)n=n.parent;return n}const D=(n,d,i)=>{const y=m=>n(i?Object.assign(m,{svgCoords:g(i,m.clientX,m.clientY,m.caller)}):m,v(m.caller),...d);return y.__name=n.name,y};function r(n,d,...i){n==="focus"&&(n="focusin"),n==="blur"&&(n="focusout");const y=t+n;return a(n),m=>(m[y]=[...m[y]||[],D(d,i,x(m))],{[y]:m[y].map(L=>L.__name||"anonymous").join(" | ")})}function s(n,d){const i=t+n;return y=>{if(y[i]=y[i]?.filter?.(m=>!!d&&d!==m),!y[i].length)delete y[i],y.removeAttribute(i);else return{[i]:y[i].map(m=>m.name).join(" | ")}}}function u(n,d,...i){(d||document.body).dispatchEvent(new CustomEvent(n,{bubbles:!0,detail:i}))}function v(n){let d=n.state||null,i=n;for(;!d&&i;)i=i.parent,d=i?.state||null;return n.state=n.state||Object.create(d),n.state}return e?{on:new Proxy(c,{get(n,d){return(i,...y)=>r(d,i,...y)}}),off:new Proxy(c,{get(n,d){return i=>s(d,i)}}),dispatch:new Proxy(c,{get(n,d){return(...i)=>u(d,...i)}}),state:v}:{on:r,off:s,dispatch:u,state:v}};const w=(...t)=>(...e)=>Array.from(e).map(l=>l&&Object.assign(l.style,...t)).false,J=`
Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Prnt Insert Delete
Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal 1.5Backspace
1.5Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight 1.3Enter
2CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Backslash 0.8Enter
1.1ShiftLeft 1.1IntlBackslash KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash 2ShiftRight
1.2ControlLeft Fn MetaLeft AltLeft 5Space AltRight ControlRight ArrowLeft ArrowUp -ArrowDown ArrowRight
`,G=`
Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 0.6Prnt
Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal 1.4Delete
1.4Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash 
1.7CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote 1.7Enter
2.2ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash 2.2ShiftRight
Fn ControlLeft OptionLeft 1.2CommandLeft 5Space 1.2CommandRight OptionRight none -ArrowLeft ArrowUp -ArrowDown none -ArrowRight
`;var X={yoga530:J,air_m2:G};const O=t=>!!t,{on:C,state:T,dispatch:V}=$(),E=t=>e=>{K.computed(l=>t(e,l))},F={display:"flex",flexDirection:"row",minWidth:0},P={display:"flex",flexDirection:"column",minHeight:0};var Z=(t,e,l,c)=>{const o=K(localStorage.getItem("keys__layout")||X.yoga530),a=K.computed(()=>o().split(`
`).filter(O).map(r=>r.trim().split(" ").map(s=>{const[u,v]=s.match(/^-?(\d+\.?\d*)?([^-:]+)/)?.slice(1)||[1,s];return{key:v==="none"?"":v,span:u||1,merge:s.startsWith("-")}}).reduce((s,u)=>u.merge?s.slice(0,-1).concat([s.slice(-1).flat().concat(u)]):s.concat([[u]]),[]))),g=K.computed(()=>a().flat(2).map(r=>r.key).filter(O)),x=r=>Object.assign({fontWeight:700,fontSize:"1.2rem",margin:"3px",flex:"1 1",justifyContent:"center",alignItems:"center",borderRadius:"5px",transition:"all 0.3s"},F,r.key?{background:"#eeeeee",boxShadow:"2px 2px 5px 3px gray",border:"2px solid gray"}:{}),D=["div.modes",w(F,{flex:"0 0 2rem",width:"100%"}),...t.map(r=>["div#_"+r.name,w({background:"#eeeeee",minWidth:"6rem",flex:1,textAlign:"center",border:"1px solid gray",margin:"4px"}),r.name]),E((r,s)=>(w({borderColor:"gray",background:"#eeeeee"})(r.querySelector("#_"+s)),w({borderColor:"black",background:"#ffdddd"})(r.querySelector("#_"+e().name)),e().name))];return k(["div.keyboard",r=>{T(r).input=K("placeholder")},["input",{value:r=>T(r).input()},C.input((r,s)=>{s.input(r.target.value)})],["div",E(r=>{r.innerHTML=T(r).input()})],C.test0((...r)=>console.log(r,r[0].detail),"custom?"),w(P),["div.clock",r=>{const s=()=>r.innerHTML=new Date;setInterval(s,1e3),s()}],D,["div.rows",C.click(r=>V.test0(r.caller,"test?!")),w(P,{aspectRatio:2.7}),...a().map(r=>["div.row",w(F,{minHeight:0,flex:"1 0"}),...r.map(s=>Array.isArray(s)?["div",w(P,{flex:`${s[0].span} ${s[0].span}`}),...s.map(u=>["div",w(F,{flex:"1 1",minHeight:0}),["div#"+u.key,w(x(u)),u.display||u.key]])]:["div",w(F,{flex:`${s.span} ${s.span}`}),["div#"+s.key,w(x(s)),s.key]])])],E(r=>g().map(s=>{const u=e(),v=t[u.fallback],d=(u[s]||v?.[s])?.display||u?.default?.(s,u)?.display||v?.default?.(s,u)?.display;r.querySelector("#"+s).innerHTML=d?Array.isArray(d)?k(d).innerHTML:d:""})),E((r,s=[])=>(s.map(u=>w({boxShadow:"2px 2px 5px 3px gray",background:"#eeeeee",transform:"scale(1)"})(r.querySelector("#"+u))),l().map(u=>(k([r.querySelector("#"+u.code),w({boxShadow:"1px 1px 3px 1px gray",background:"#ddffdd",transform:"scale(0.9)"})]),u.code)))),c&&["div#history",E(r=>{r.replaceChildren(...c().map(s=>k(["div",[s.TYPE,s.code,s.duration||""].join(" ")])))})]])},z=({tap:t=200,bindings:e=[],stack:l=[0],display:c=!0,history:o=!0}={})=>{const a=K([]),g=K([]),x=p=>new Proxy(p,{get(f,b){if(f[b])return f[b];const h=f.default?.(b,f);if(h)return h;const S=D[f.fallback];return S&&S?.[b]?S[b]:S?.default?.(b,f)||{}}}),D=(JSON.parse(localStorage.getItem("keys__modes"))||[{name:"debug",default(p,f){return{display:["div",p],default:!0,tap:b=>console.log("tap",p,f.name),double:b=>console.log("double",p,f.name),held:(b,h,S)=>console.log("held",p,f.name,h,!!S)}}},...e]).map(x),r=p=>f=>f.code===p,s=K([...l]),u=p=>s(p?s().filter(f=>p!==f):s().slice(1)),v=(p,f)=>{const b=D[p[0]];if(b.toggle){const h=Object.entries(b.toggle);for(const[S,M]of h){const B=f.find(r(S));B&&(p.unshift(M),B.toggle=M)}}return D[p[0]]},n=K.computed(p=>v(s(),a())),d=p=>{const f=a().find(r(p.code)),b=n()?.[p.code];if(b?.default||p.preventDefault(),f){const h=p.timeStamp-f.timeStamp;b?.held?.(f,h,!0)}else p.mappings=b,a([...a(),p]),o&&(p.TYPE="held",g([p,...g()]))};let i=!1;const y=p=>{p.deferred=setTimeout(m,t),i=p},m=()=>{!i||!i.deferred||(clearTimeout(i.deferred),i.mappings.tap(i),o&&(i.TYPE="tap",g([...g()])),i=!1)},L=p=>{const f=a(),b=f.findIndex(r(p.code)),[h]=f.splice(b,1);if(!h)return;h.toggle!==void 0&&u(h.toggle),a(f);const S=p.timeStamp-h.timeStamp;S<t?h.mappings.double?i?i.code===h.code&&h.timeStamp-i.timeStamp<t?(i.mappings?.double?.(i),o&&(i.TYPE="double",g([...g().slice(1)])),i=!1):(m(),y(h)):y(h):(m(),h.mappings?.tap?.(h),o&&(h.TYPE="tap",g([...g()]))):(h.mappings?.held?.(h,S),o&&(p.TYPE="released",p.duration=S,g([p,...g()])))},_=()=>{a([]),s([...l]),i=!1};if(document.onkeydown=d,document.onkeyup=L,window.onblur=_,c)return Z(D,n,a,o&&g)};const ee={name:"standard",default(t,e){const l=t.match(/Key(\w)/)?.[1]?.toLowerCase?.();if(l)return{display:l,default:!0,tap:()=>console.log(l)};const c=t.match(/Digit(\d)/)?.[1];if(c!==void 0)return{display:c,default:!0,tap:()=>console.log(c)};if(t.match(/F(\d+)/)?.[1])return{display:t,default:!0,tap:()=>console.log(t)};const[a,g]=t.match(/(Alt|Shift|Control|Meta|Command|Option)(Left|Right)/)?.slice?.(1)||[];if(a)return{display:a,tap:()=>console.log(a,g)};const x={Escape:{display:"Esc",tap:()=>console.log("Escape")},Fn:{display:"Fn"},Prnt:{display:"Prnt",tap:()=>console.log("Prnt")},Insert:{display:"Ins",tap:()=>console.log("Insert")},Delete:{display:"Del",tap:()=>console.log("Delete")},Backspace:{display:"\u21D0",tap:()=>console.log("Prnt")},Tab:{display:"Tab",tap:()=>console.log("Tab")},CapsLock:{display:"Caps",tap:()=>console.log("Caps")},Enter:{display:"Enter",tap:()=>console.log("Enter")},Space:{display:"",tap:()=>console.log("Space")},BracketLeft:{display:"[",tap:()=>console.log("[")},BracketRight:{display:"]",tap:()=>console.log("]")},Quote:{display:"'",tap:()=>console.log("'")},Backquote:{display:"`",tap:()=>console.log("`")},Minus:{display:"-",tap:()=>console.log("-")},Equal:{display:"=",tap:()=>console.log("=")},Slash:{display:"/",tap:()=>console.log("/")},Backslash:{display:"\\",tap:()=>console.log("\\")},IntlBackslash:{display:"<",tap:()=>console.log("<")},Comma:{display:",",tap:()=>console.log(",")},Period:{display:".",tap:()=>console.log(".")},Semicolon:{display:";",tap:()=>console.log(";")},ArrowLeft:{display:"\u{1F850}",tap:()=>console.log("\u{1F850}")},ArrowUp:{display:"\u{1F851}",tap:()=>console.log("\u{1F851}")},ArrowDown:{display:"\u{1F853}",tap:()=>console.log("\u{1F853}")},ArrowRight:{display:"\u{1F852}",tap:()=>console.log("\u{1F852}")}}[t];if(x)return{...x,default:!0}},toggle:{Escape:0,ShiftLeft:2,ShiftRight:2}},te={name:"shifted",fallback:1,default(t,e){const l=t.match(/Key(\w)/)?.[1];if(l)return{display:l,default:!0,tap:()=>console.log(l)};const c={Digit1:{display:"!",tap:()=>console.log("!")},Digit2:{display:"@",tap:()=>console.log("@")},Digit3:{display:"#",tap:()=>console.log("#")},Digit4:{display:"$",tap:()=>console.log("$")},Digit5:{display:"%",tap:()=>console.log("%")},Digit6:{display:"^",tap:()=>console.log("^")},Digit7:{display:"&",tap:()=>console.log("&")},Digit8:{display:"*",tap:()=>console.log("*")},Digit9:{display:"(",tap:()=>console.log("(")},Digit0:{display:")",tap:()=>console.log(")")},BracketLeft:{display:"{",tap:()=>console.log("{")},BracketRight:{display:"}",tap:()=>console.log("}")},Quote:{display:'"',tap:()=>console.log('"')},Backquote:{display:"~",tap:()=>console.log("~")},Minus:{display:"_",tap:()=>console.log("_")},Equal:{display:"+",tap:()=>console.log("+")},Slash:{display:"?",tap:()=>console.log("?")},Backslash:{display:"|",tap:()=>console.log("|")},IntlBackslash:{display:">",tap:()=>console.log(">")},Comma:{display:"<",tap:()=>console.log("<")},Period:{display:">",tap:()=>console.log(">")},Semicolon:{display:":",tap:()=>console.log(":")},ArrowLeft:{display:"\u{1F850}",tap:()=>console.log("\u{1F850}")},ArrowUp:{display:"\u{1F851}",tap:()=>console.log("\u{1F851}")},ArrowDown:{display:"\u{1F853}",tap:()=>console.log("\u{1F853}")},ArrowRight:{display:"\u{1F852}",tap:()=>console.log("\u{1F852}")}}[t];if(c)return{...c,default:!0}},toggle:{Escape:0}};var oe=()=>{document.body.append(z({bindings:[ee,te],stack:[1,0],history:!0}))};oe();