(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{149:function(e,t){},152:function(e,t,n){},153:function(e,t,n){},156:function(e,t,n){},208:function(e,t,n){},209:function(e,t,n){},216:function(e,t){},218:function(e,t){},232:function(e,t,n){},233:function(e,t,n){},235:function(e,t,n){},252:function(e,t,n){},253:function(e,t,n){},254:function(e,t,n){},255:function(e,t,n){},256:function(e,t,n){},257:function(e,t,n){},258:function(e,t,n){},259:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(98),o=n.n(s),r=n(9),i=n(8),l=n(7),u=n(1),j=Object(c.createContext)(),d=function(e){var t=e.children,n=Object(c.useState)({}),a=Object(l.a)(n,2),s=a[0],o=a[1];return Object(u.jsx)(j.Provider,{value:[s,o],children:t})},b=n(17),f=n(31),h=n(99),O=n.n(h),m=n(100),p=n.n(m),x=n(260),g=n(261),v=n(262),y=(n(152),function(e){var t=e.onHandleClick,n=e.className,c=e.name,a=e.disabled,s=e.icon,o="icon-".concat(c);return Object(u.jsxs)("span",{className:"chat__icon ".concat(n," ").concat(a?"disabled":""),children:[Object(u.jsx)("label",{className:"chat__label",htmlFor:o,children:s&&s}),Object(u.jsx)("input",{className:"hidden-input",type:"file",name:o,id:o,accept:"image/*,video/*,audio/*",onChange:function(e){var n=Array.from(e.target.files),c=new FormData;c.append(0,n[0]),t(c.get(0))}})]})}),_=(n(153),function(e){var t=e.message,n=void 0===t?"":t,c=e.setMessage,a=e.sendMessage,s=e.sendFile,o=e.uploadFile;return console.log("\u4fe1\u606f",n),Object(u.jsxs)("form",{className:"chat__form",children:[Object(u.jsx)("textarea",{className:"chat__message",placeholder:"write some message...",value:n,onChange:function(e){return c(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?c(e.target.value):null}}),Object(u.jsxs)("div",{className:"chat__controls",children:[Object(u.jsx)(y,{disabled:n,className:"chat__flex",type:"file",onHandleClick:s,icon:Object(u.jsx)(x.a,{}),name:"files"}),Object(u.jsx)(y,{disabled:n,className:"chat__flex",type:"file",onHandleClick:o,icon:Object(u.jsx)(g.a,{}),name:"upload"}),Object(u.jsx)(v.a,{className:"chat__flex",size:"32",onClick:n?function(e){a(e)}:null,color:n?"darkslategray":"#e3e3e3"})]})]})}),S=n(263),C=n(264),k=(n(156),function(e){var t=e.room,n=e.counts;return Object(u.jsxs)("div",{className:"chat__infoBar",children:[Object(u.jsx)("div",{className:"chat__room",children:Object(u.jsx)("h3",{children:t})}),Object(u.jsxs)("div",{className:"chat__count",children:[n," ",Object(u.jsx)(S.a,{color:"#ffffff",size:24})]}),Object(u.jsx)("div",{className:"chat__back",children:Object(u.jsx)(r.b,{to:"/",children:Object(u.jsx)(C.a,{color:"white",size:24})})})]})}),w=a.a.memo(k),N=n(43),U=n(102),L=n.n(U),F=n(271),E=n(265),D=n(266),I=n(103),P=n.n(I),T=n(104),R=n.n(T),z=(n(208),function(e){var t=e.message,n=e.name,c=e.avatarSrc,a=t.user,s=t.content,o=t.upload,r=t.type,i=t.address,l=t.percent,j=t.date,d=!1,b=n.trim().toLowerCase();b===a&&(d=!0);var f=d?"user":"friend",h="user"===f?b:a;return Object(u.jsxs)("div",{className:"chat-message chat-message--".concat(f),children:["friend"===f&&Object(u.jsxs)("h4",{children:[c?Object(u.jsx)(E.a,{src:c,roundedCircle:!0}):Object(u.jsx)(D.a,{size:24}),Object(u.jsx)("span",{children:h})]}),Object(u.jsxs)("div",{className:"chat-message__body",children:[function(e){if(e>0&&e<100)return Object(u.jsxs)(u.Fragment,{children:["loading...",Object(u.jsx)(F.a,{now:e,animated:!0})]})}(l),Object(u.jsx)("span",{className:"chat-message__date",children:R()(j).format("LTS")}),function(e){var t=e.address,n=e.type,c=e.upload;if(t)return Object(u.jsx)("div",{dangerouslySetInnerHTML:{__html:t}});if(n&&c)switch(n){case"video/mp4":return Object(u.jsxs)("video",{width:"100%",controls:!0,children:[Object(u.jsx)("source",{src:"data:image/png;base64, ".concat(c),type:"video/mp4"}),Object(u.jsx)("source",{src:"data:image/png;base64, ".concat(c),type:"video/ogg"}),"Your browser does not support the video tag."]});case"image/*":default:return Object(u.jsx)("img",{className:"img-thumbnail img-fluid",src:"data:image/png;base64, ".concat(c)})}}({address:i,percent:l,type:r,upload:o}),s&&Object(u.jsx)("p",{className:"chat-message__body--text",children:P.a.emojify(s)})]})]})}),B=(n(209),function(e){var t=e.messages,n=e.name,c=Object(N.a)(e,["messages","name"]);return Object(u.jsx)(L.a,{className:"chat__messages",children:t.map((function(e){return Object(u.jsx)(z,Object(b.a)({message:e,name:n},c),"name-".concat(e.id))}))})}),H=a.a.memo(B),J=n(60),A=n.n(J),G=n(105),M=n(41),K=n(42),W=n(21),q=n.n(W);function V(e,t){for(var n=e.split(","),c=n[0].match(/:(.*?);/)[1],a=atob(n[1]),s=a.length,o=new Uint8Array(s);s--;)o[s]=a.charCodeAt(s);return new File([o],t.name,{type:c})}var Y,Q=function(){function e(t,n){Object(M.a)(this,e),console.log("\u6a94\u6848",t),this.socket=n,this.file=t,this.name=t.name}return Object(K.a)(e,[{key:"send",value:function(){console.log("\u9001\u51fa",this,this.file.size);var e=q.a.createStream();q.a.createBlobReadStream(this.file).pipe(e),q()(this.socket).emit("sendFile",e,{name:this.file.name,type:this.file.type,size:this.file.size}),console.log("this.file",this.file)}},{key:"upload",value:function(){var e=q.a.createStream();q()(this.socket).emit("uploadFile",e,{name:this.file.name,type:this.file.type,size:this.file.size}),q.a.createBlobReadStream(this.file).pipe(e)}}],[{key:"process",value:function(t,n){var c=this,a={name:t.name,quality:.6,type:t.type};return X(t,a).then((function(e){var t=e.readerDataUrl,n=e.config;e.callback;switch(c.base64=t,console.log("\u8f49\u63db\u6210convertToDataUrl"),n.type){case"image/jpeg":case"video/mp4":return new Promise((function(e){e(V(t,n))}));default:alert("the type is not supprted")}})).then((function(t){return c.data=t,console.log("\u8cc7\u6599",t),new e(c.data,n)}))}}]),e}(),X=function(){var e=Object(G.a)(A.a.mark((function e(t,n,c){var a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=function(e,t,n){return new Promise((function(c,a){var s=new FileReader;s.readAsDataURL(e),s.onload=function(){var e=this.result;console.log("\u52a0\u8f09\u958b\u59cb"),c({readerDataUrl:e,config:t,callback:n})},s.onerror=function(){return a("\u52a0\u8f7d\u5931\u8d25")},s.onloadend=function(){console.log("\u52a0\u8f09\u5df2\u7d93\u7d50\u675f")}}))},e.next=3,a(t,n,c);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,c){return e.apply(this,arguments)}}(),Z=Q,$=function(){var e=Object(i.g)().search,t=Object(c.useState)(""),n=Object(l.a)(t,2),a=n[0],s=n[1],o=Object(c.useState)(""),r=Object(l.a)(o,2),j=r[0],d=r[1],h=Object(c.useState)(null),m=Object(l.a)(h,2),x=m[0],g=m[1],v=Object(c.useState)([]),y=Object(l.a)(v,2),S=y[0],C=y[1],k=Object(c.useState)(0),N=Object(l.a)(k,2),U=N[0],L=N[1],F="localhost:5000";F="https://dailytalk.herokuapp.com",console.log(F),Object(c.useEffect)((function(){var t=O.a.parse(e),n=t.name,c=t.room;return Y=p()(F,{path:"/socket.io",transports:["websocket"],secure:!0}),s(n),d(c),Y.emit("join",{name:n,room:c},(function(e){e&&alert(e)})),function(){Y.emit("disconnect"),Y.off()}}),[F,e]),Object(c.useEffect)((function(){var e=function(e,t){return e.id===t};Y.on("message",(function(e){return C((function(t){return[].concat(Object(f.a)(t),[e])}))})),Y.on("percent",(function(t,n){var c=n.id,a=n.user,s=n.type;C((function(n){var o=n.findIndex((function(t){return e(t,c)}));return o<0?function(e){var t=e.messages,n=e.id,c=e.upload,a=void 0===c?"":c,s=e.user,o=e.type,r=e.percent;return[].concat(Object(f.a)(t),[{id:n,upload:a,user:s,type:o,percent:r}])}({messages:n,id:c,percent:t,user:a,type:s}):(n[o].percent=t,Object(f.a)(n))}))})),Y.on("file",(function(t){var n=t.user,c=t.upload,a=t.type,s=t.id;c&&C((function(t){return function(e,t,n){return t[e]=Object(b.a)(Object(b.a)({},t[e]),n),Object(f.a)(t)}(t.findIndex((function(t){return e(t,s)})),t,{id:s,user:n,upload:c,type:a})}))}))}),[]),Object(c.useEffect)((function(){Y.on("roomData",(function(e){var t=e.users;L(t.length)}))}),[U]);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(w,{room:j,counts:U}),Object(u.jsx)(H,{messages:S,name:a}),Object(u.jsx)(_,{message:x,setMessage:g,sendMessage:function(e){e.preventDefault(),x&&Y.emit("sendMessage",x,(function(){return g("")}))},sendFile:function(e){Z.process(e,Y).then((function(e){e.send()}))},uploadFile:function(e){Z.process(e,Y).then((function(e){return e.upload()}))}})]})},ee=(n(232),function(e){var t=e.title,n=e.content,c=e.control;return Object(u.jsxs)("div",{className:"chat__box",children:[Object(u.jsx)("h1",{children:t}),n,Object(u.jsx)("div",{children:c})]})}),te=n(269),ne=n(270),ce=(n(233),function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),o=Object(l.a)(s,2),i=o[0],j=o[1],d=Object(c.useState)(),b=Object(l.a)(d,2),f=b[0],h=b[1];return Object(u.jsx)(ee,{title:"Join",content:Object(u.jsxs)(te.a,{children:[Object(u.jsx)("input",{type:"file",onChange:function(e){h(URL.createObjectURL(e.target.files[0]))}}),Object(u.jsx)("img",{width:"50px",src:f}),Object(u.jsxs)(te.a.Group,{controlId:"formBasicPassword",children:[Object(u.jsx)(te.a.Label,{children:"Username"}),Object(u.jsx)(te.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return a(e.target.value)}}),Object(u.jsx)(te.a.Label,{children:"Room"}),Object(u.jsx)(te.a.Control,{type:"text",placeholder:"Room",onChange:function(e){return j(e.target.value)}})]})]}),control:Object(u.jsx)(r.b,{onClick:function(e){return n&&i?null:e.preventDefault()},to:"/chat?name=".concat(n,"&room=").concat(i),children:Object(u.jsx)(ne.a,{block:!0,type:"submit",children:"Join In"})})})}),ae=(n(235),n(61)),se=n.n(ae),oe="/api/auth/";oe="https://dailytalk.herokuapp.com/api/auth/",console.log(oe);var re=new(function(){function e(){Object(M.a)(this,e)}return Object(K.a)(e,[{key:"login",value:function(e,t){return se.a.post(oe+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),console.log("lresponse.data",e.data),e.data})).catch((function(e){console.log("login err",e)}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"signup",value:function(e,t,n){return se.a.post(oe+"signup",{username:e,email:t,password:n})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}}]),e}()),ie=(n(252),function(){var e=Object(c.useContext)(j),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(!1),o=Object(l.a)(s,2),r=o[0],d=o[1],b=Object(c.useState)(""),f=Object(l.a)(b,2),h=f[0],O=f[1],m=Object(c.useState)(""),p=Object(l.a)(m,2),x=p[0],g=p[1];if(!0===r)return Object(u.jsx)(i.a,{to:"join"});return console.log(n),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(ee,{title:"Login",content:Object(u.jsxs)(te.a,{children:[Object(u.jsxs)(te.a.Group,{controlId:"formBasicName",children:[Object(u.jsx)(te.a.Label,{children:"Username"}),Object(u.jsx)(te.a.Control,{type:"text",placeholder:"Username",onChange:function(e){O(e.target.value)}})]}),Object(u.jsxs)(te.a.Group,{controlId:"formBasicPassword",children:[Object(u.jsx)(te.a.Label,{children:"Password"}),Object(u.jsx)(te.a.Control,{type:"password",placeholder:"Password",onChange:function(e){g(e.target.value)}})]})]}),control:Object(u.jsx)(ne.a,{onClick:function(e){e.preventDefault(),re.login(h,x).then((function(){d(!0)})).catch((function(e){a({status:e.name,content:e.message}),setTimeout((function(){a({status:null,content:null})}),3e3)}))},variant:"primary",type:"submit",children:"Submit"})})})}),le=(n(253),function(){var e=Object(c.useContext)(j),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),o=Object(l.a)(s,2),r=o[0],d=o[1],b=Object(c.useState)(""),f=Object(l.a)(b,2),h=f[0],O=f[1],m=Object(c.useState)(""),p=Object(l.a)(m,2),x=p[0],g=p[1],v=Object(c.useState)(!1),y=Object(l.a)(v,2),_=y[0],S=y[1];return _?Object(u.jsx)(i.a,{to:"login"}):(console.log("process",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}),n),Object(u.jsx)(ee,{title:"Sign Up",content:Object(u.jsxs)(te.a,{children:[Object(u.jsxs)(te.a.Group,{controlId:"formBasicName",children:[Object(u.jsx)(te.a.Label,{children:"Username"}),Object(u.jsx)(te.a.Control,{type:"text",placeholder:"Normal text",onChange:function(e){d(e.target.value)},value:r})]}),Object(u.jsxs)(te.a.Group,{controlId:"formBasicEmail",children:[Object(u.jsx)(te.a.Label,{children:"Email address"}),Object(u.jsx)(te.a.Control,{type:"email",placeholder:"Enter email",onChange:function(e){O(e.target.value)},value:h})]}),Object(u.jsxs)(te.a.Group,{controlId:"formBasicPassword",children:[Object(u.jsx)(te.a.Label,{children:"Password"}),Object(u.jsx)(te.a.Control,{type:"password",placeholder:"Password",onChange:function(e){g(e.target.value)},value:x})]})]}),control:Object(u.jsx)(ne.a,{onClick:function(e){e.preventDefault(),re.signup(r,h,x,["user"]).then((function(){S(!0)})).catch((function(e){a({status:e.name,content:e.message}),setTimeout((function(){a({status:null,content:null})}),3e3)}))},variant:"primary",type:"submit",children:"Sign Up"})}))}),ue=(n(254),function(){return Object(u.jsxs)("div",{className:"chat-home",children:[Object(u.jsx)("h1",{children:"Fresh Talk"}),Object(u.jsxs)("div",{className:"chat-home__controls",children:[Object(u.jsx)(r.b,{to:"/signup",children:"Sign up"}),re.getCurrentUser()?Object(u.jsx)(r.b,{to:"/join",children:"Join"}):Object(u.jsx)(r.b,{to:"/login",children:"Login"})]})]})}),je=(n(255),function(e){var t=e.children,n=Object(c.useContext)(j),a=Object(l.a)(n,1)[0];return console.log("\u63d0\u793a",a),Object(u.jsxs)("section",{className:"chat__head",children:[Object(u.jsx)("div",{className:"chat__notification chat__notification".concat("Error"===a.status?"--active":""),children:a.content}),Object(u.jsx)("div",{className:"chat__head-burgur",children:t})]})}),de=function(e){var t=e.component,n=e.location,c=Object(N.a)(e,["component","location"]);return Object(u.jsx)(i.b,Object(b.a)(Object(b.a)({},c),{},{render:function(e){return re.getCurrentUser()?Object(u.jsx)(t,Object(b.a)({},e)):Object(u.jsx)(i.a,{to:{pathname:"/login",state:{from:n}}})}}))},be=n(267),fe=(n(256),Object(i.h)((function(e){var t=e.history;return re.getCurrentUser()&&Object(u.jsx)(be.a,{size:"30",color:"#fff",onClick:function(){re.logout(),t.push("/")},children:"Sign out"})}))),he=(n(268),n(257),n(258),function(){return Object(u.jsx)(r.a,{children:Object(u.jsxs)(d,{children:[Object(u.jsx)(je,{children:Object(u.jsx)(fe,{})}),Object(u.jsxs)(i.d,{children:[Object(u.jsx)(i.b,{path:"/",exact:!0,component:ue}),Object(u.jsx)(i.b,{path:"/Signup",component:le}),Object(u.jsx)(i.b,{path:"/login",component:ie}),Object(u.jsx)(de,{path:"/join",component:ce}),Object(u.jsx)(de,{path:"/chat",component:$}),Object(u.jsx)(i.a,{from:"*",to:"/"})]})]})})});o.a.render(Object(u.jsx)(he,{}),document.querySelector("#root"))}},[[259,1,2]]]);
//# sourceMappingURL=main.2dbacf43.chunk.js.map