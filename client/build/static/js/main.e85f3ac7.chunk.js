(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{112:function(e,t,n){"use strict";n.r(t);var a=n(7),c=n(0),r=n(23),o=n(34),s=n(21),i=(n(257),n(1));t.default=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],u=t[1],l=Object(c.useState)(""),j=Object(a.a)(l,2),f=j[0],d=j[1],b=n&&f;return Object(i.jsx)(r.a,{title:"Join",content:Object(i.jsx)(o.a,null,Object(i.jsx)(o.a.Group,{controlId:"formBasicPassword"},Object(i.jsx)(o.a.Label,null,"Username"),Object(i.jsx)(o.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return u(e.target.value)}}),Object(i.jsx)(o.a.Label,null,"Room"),Object(i.jsx)(o.a.Control,{type:"text",placeholder:"Room",onChange:function(e){return d(e.target.value)}}))),control:Object(i.jsx)(s.a,{primary:!0,disabled:b,width:"90%",to:"/chat?name=".concat(n,"&room=").concat(f)},"Join In")})}},122:function(e,t,n){"use strict";n.r(t);var a=n(15),c=(n(0),n(14)),r=n(289),o=n(290),s=n(21),i=n(29),u=n(1);var l=Object(a.a)("div",{target:"e1n90z1m0"})({name:"ai9sjr",styles:"display:flex;background:radial-gradient(\n    circle,\n    rgba(238, 238, 238, 1) 0%,\n    rgba(255, 255, 255, 1) 100%\n  );flex-direction:column;justify-content:center;align-items:center;height:100vh"});t.default=function(){return Object(u.jsx)(l,null,Object(u.jsx)(i.c,null,"Fresh Talk"),Object(u.jsx)("div",{className:"chat-home__controls"},c.a.getCurrentUser()?Object(u.jsx)(s.a,{primary:!0,width:"120px",to:"/join",icon:Object(u.jsx)(r.a,{size:"24"})},"Join"):Object(u.jsx)(s.a,{primary:!0,width:"120px",to:"/login",icon:Object(u.jsx)(o.a,{size:"24"})},"Login")))}},123:function(e,t,n){"use strict";n.r(t);var a=n(84),c=n(46),r=n(7),o=n(0),s=n.n(o),i=n(8),u=n(126),l=n.n(u),j=n(127),f=n.n(j),d=n(54),b=n(55),m=n(56),p=n(82),O=n.n(p),h=n(131),g=n(61),x=n(62),v=n(30),y=n.n(v);function _(e,t){for(var n=e.split(","),a=n[0].match(/:(.*?);/)[1],c=atob(n[1]),r=c.length,o=new Uint8Array(r);r--;)o[r]=c.charCodeAt(r);return new File([o],t.name,{type:a})}var k,C=function(){function e(t,n){Object(g.a)(this,e),this.socket=n,this.file=t,this.name=t.name}return Object(x.a)(e,[{key:"send",value:function(){var e=y.a.createStream();y.a.createBlobReadStream(this.file).pipe(e),y()(this.socket).emit("sendFile",e,{name:this.file.name,type:this.file.type,size:this.file.size})}},{key:"upload",value:function(){var e=y.a.createStream();y()(this.socket).emit("uploadFile",e,{name:this.file.name,type:this.file.type,size:this.file.size}),y.a.createBlobReadStream(this.file).pipe(e)}}],[{key:"process",value:function(t,n){var a=this,c={name:t.name,quality:.6,type:t.type};return w(t,c).then((function(e){var t=e.readerDataUrl,n=e.config;e.callback;switch(a.base64=t,n.type){case"image/jpeg":case"video/mp4":return new Promise((function(e){e(_(t,n))}));default:alert("the type is not supprted")}})).then((function(t){return a.data=t,new e(a.data,n)}))}}]),e}(),w=function(){var e=Object(h.a)(O.a.mark((function e(t,n,a){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=function(e,t,n){return new Promise((function(a,c){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){var e=this.result;a({readerDataUrl:e,config:t,callback:n})},r.onerror=function(){return c("\u52a0\u8f7d\u5931\u8d25")},r.onloadend=function(){console.log("\u52a0\u8f09\u5df2\u7d93\u7d50\u675f")}}))},e.next=3,c(t,n,a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),N=C,S=n(1);t.default=function(){var e=Object(i.g)().search,t=Object(o.useState)(""),n=Object(r.a)(t,2),u=n[0],j=n[1],p=Object(o.useState)(""),O=Object(r.a)(p,2),h=O[0],g=O[1],x=Object(o.useState)(null),v=Object(r.a)(x,2),y=v[0],_=v[1],C=Object(o.useState)([]),w=Object(r.a)(C,2),F=w[0],z=w[1],E=Object(o.useState)(0),M=Object(r.a)(E,2),P=M[0],I=M[1],U="localhost:5000";U="https://dailytalk.herokuapp.com",console.log("process.env.NODE_ENV","production"),Object(o.useEffect)((function(){var t=l.a.parse(e),n=t.name,a=t.room;return k=f()(U,{path:"/socket.io",transports:["websocket"],secure:!0}),j(n),g(a),k.emit("join",{name:n,room:a},(function(e){e&&alert(e)})),function(){k.emit("disconnect"),k.off()}}),[U,e]),Object(o.useEffect)((function(){var e=function(e,t){return e.id===t};k.on("message",(function(e){return z((function(t){return[].concat(Object(c.a)(t),[e])}))})),k.on("percent",(function(t,n){var a=n.id,r=n.user,o=n.type;z((function(n){var s=n.findIndex((function(t){return e(t,a)}));return s<0?function(e){var t=e.messages,n=e.id,a=e.upload,r=void 0===a?"":a,o=e.user,s=e.type,i=e.percent;return[].concat(Object(c.a)(t),[{id:n,upload:r,user:o,type:s,percent:i}])}({messages:n,id:a,percent:t,user:r,type:o}):(n[s].percent=t,Object(c.a)(n))}))})),k.on("file",(function(t){var n=t.user,r=t.upload,o=t.type,s=t.id;r&&z((function(t){return function(e,t,n){return t[e]=Object(a.a)(Object(a.a)({},t[e]),n),Object(c.a)(t)}(t.findIndex((function(t){return e(t,s)})),t,{id:s,user:n,upload:r,type:o})}))}))}),[]),Object(o.useEffect)((function(){k.on("roomData",(function(e){var t=e.users;I(t.length)}))}),[P]);return Object(S.jsx)(s.a.Fragment,null,Object(S.jsx)(b.a,{room:h,counts:P}),Object(S.jsx)(m.a,{messages:F,name:u}),Object(S.jsx)(d.a,{message:y,setMessage:_,sendMessage:function(e){e.preventDefault(),console.log(y),y&&k.emit("sendMessage",y,(function(){return _("")}))},sendFile:function(e){N.process(e,k).then((function(e){e.send()}))},uploadFile:function(e){N.process(e,k).then((function(e){return e.upload()}))}}))}},14:function(e,t,n){"use strict";var a=n(61),c=n(62),r=n(83),o=n.n(r),s="/api/auth/";s="https://dailytalk.herokuapp.com/api/auth/";var i=function(){function e(){Object(a.a)(this,e)}return Object(c.a)(e,[{key:"login",value:function(e,t){return o.a.post(s+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data})).catch((function(e){console.log("login err",e)}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"signup",value:function(e,t,n){return o.a.post(s+"signup",{username:e,email:t,password:n})}},{key:"getCurrentUser",value:function(){return console.log(JSON.parse(localStorage.getItem("user"))),JSON.parse(localStorage.getItem("user"))}}]),e}();t.a=new i},177:function(e,t){},180:function(e,t,n){},181:function(e,t,n){},21:function(e,t,n){"use strict";var a=n(15),c=(n(0),n(20)),r=n(1);var o={name:"ojolip",styles:"padding:16px;background:#007bff;border-radius:5px;margin:8px;color:#ffffff;display:inline-block"},s=function(){return o},i=Object(a.a)(c.b,{target:"e9946jg0"})("&:focus,&:hover,&:visited,&:link,&:active{text-decoration:none;color:#2A3346,display:flex;justify-content:center;",(function(e){return e.primary&&s}),";&>svg{margin:0 8px;}}"),u=function(e){var t=e.to,n=e.icon,a=e.width,c=e.children,o=e.disabled,s=e.primary;return Object(r.jsx)(i,{width:a,to:t,disabled:o,primary:s&&s.toString()},n,c)};u.defaultProps={icon:null},t.a=u},23:function(e,t,n){"use strict";var a=n(15),c=(n(0),n(29)),r=n(1);var o=Object(a.a)("div",{target:"ebsbl961"})({name:"o0zptl",styles:"width:300px;margin:0;position:absolute;top:45%;left:50%;transform:translate(-50%, -50%)"}),s=Object(a.a)("div",{target:"ebsbl960"})({name:"1khfev6",styles:"margin:12px 0px"}),i=function(e){var t=e.title,n=e.content,a=e.control,i=e.notification;return Object(r.jsx)(o,{className:"chat__box"},Object(r.jsx)("div",null,i.content),Object(r.jsx)(c.c,null,t),n,Object(r.jsx)(s,null,a))};i.defaultProps={notification:{content:"",type:null}},t.a=i},233:function(e,t,n){},234:function(e,t,n){},24:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s}));var a=n(7),c=n(0),r=n(1),o=Object(c.createContext)(),s=function(e){var t=e.children,n=Object(c.useState)({}),s=Object(a.a)(n,2),i=s[0],u=s[1];return Object(r.jsx)(o.Provider,{value:[i,u]},t)}},241:function(e,t){},243:function(e,t){},257:function(e,t,n){},259:function(e,t,n){},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={main:"#3cb67f",BtnBgColor:"#2F80EB",BorderDecoColor:"#ECECEE",MainFontColor:"#2A3346",ChatFontColor:"#808187",ChatRoomBfColor:"#F2F3F7",bgGradient:"radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%)"}},276:function(e,t,n){},277:function(e,t,n){},278:function(e,t,n){},279:function(e,t,n){},280:function(e,t,n){},281:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(124),r=n.n(c),o=n(20),s=n(8),i=n(1),u=n(125),l=n.n(u),j=n(24),f=n(29),d=(n(280),n(26)),b=Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,122))})),m=Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,112))})),p=Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,123))})),O=function(){return Object(i.jsx)(o.a,null,Object(i.jsx)(j.b,null,Object(i.jsx)(i.Global,{styles:Object(i.css)(l.a," html,body{padding:0;margin:0;background:",d.a.bgGradient,";color:",d.a.ChatFontColor,";min-height:100%;overscroll-behavior-y:contain;}","")}),Object(i.jsx)(f.b,null,Object(i.jsx)(f.a,null)),Object(i.jsx)(a.Suspense,{fallback:function(){return Object(i.jsx)("div",null,"Loading...")}},Object(i.jsx)(s.d,null,Object(i.jsx)(s.b,{path:"/",exact:!0,component:b}),Object(i.jsx)(s.b,{path:"/join",component:m}),Object(i.jsx)(s.b,{path:"/chat",component:p}),Object(i.jsx)(s.a,{from:"*",to:"/"})))))};r.a.render(Object(i.jsx)(O,null),document.querySelector("#root"))},29:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return j})),n.d(t,"c",(function(){return b}));n(123),n(112),n(54),n(55),n(57),n(56);var a=n(0),c=(n(259),n(1)),r=n(7),o=n(8),s=(n(34),n(294),n(23),n(24)),i=n(14),u=(n(276),n(122),n(277),function(e){var t=e.children,n=Object(a.useContext)(s.a),o=Object(r.a)(n,1)[0];return Object(c.jsx)("section",{className:"chat__head"},Object(c.jsx)("div",{className:"chat__notification chat__notification".concat("Error"===o.status?"--active":"")},o.content),Object(c.jsx)("div",{className:"chat__head-burgur"},t))}),l=(n(60),n(63),n(292)),j=(n(278),Object(o.h)((function(e){var t=e.history;return i.a.getCurrentUser()&&Object(c.jsx)(l.a,{size:"30",color:"#fff",onClick:function(){i.a.logout(),t.push("/")}},"Sign out")}))),f=(n(44),n(21),n(293),n(279),n(15));var d=Object(f.a)("h1",{target:"e19mlojp0"})({name:"8rnz4n",styles:"font-weight:200;letter-spacing:12px"}),b=function(e){var t=e.children;return Object(c.jsx)(d,null,t)}},44:function(e,t,n){"use strict";n(0),n(180);var a=n(1);t.a=function(e){var t=e.onHandleClick,n=e.className,c=e.name,r=e.disabled,o=e.icon,s="icon-".concat(c);return Object(a.jsx)("span",{className:"chat__icon ".concat(n," ").concat(r?"disabled":"")},Object(a.jsx)("label",{className:"chat__label",htmlFor:s},o&&o),Object(a.jsx)("input",{className:"hidden-input",type:"file",name:s,id:s,accept:"image/*,video/*,audio/*",onChange:function(e){var n=Array.from(e.target.files),a=new FormData;a.append(0,n[0]),t(a.get(0))}}))}},54:function(e,t,n){"use strict";n(0);var a=n(282),c=n(283),r=n(284),o=n(44),s=(n(181),n(1));t.a=function(e){var t=e.message,n=void 0===t?"":t,i=e.setMessage,u=e.sendMessage,l=e.sendFile,j=e.uploadFile;return Object(s.jsx)("form",{className:"chat__form"},Object(s.jsx)("textarea",{className:"chat__message",placeholder:"write some message...",value:n,onChange:function(e){return i(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?i(e.target.value):null}}),Object(s.jsx)("div",{className:"chat__controls"},Object(s.jsx)(o.a,{disabled:n,className:"chat__flex",type:"file",onHandleClick:l,icon:Object(s.jsx)(a.a,null),name:"files"}),Object(s.jsx)(o.a,{disabled:n,className:"chat__flex",type:"file",onHandleClick:j,icon:Object(s.jsx)(c.a,null),name:"upload"}),Object(s.jsx)(r.a,{className:"chat__flex",size:"32",onClick:n?function(e){u(e)}:null,color:n?"darkslategray":"#e3e3e3"})))}},55:function(e,t,n){"use strict";var a=n(15),c=n(0),r=n.n(c),o=n(285),s=n(286),i=n(21),u=n(26),l=n(1),j=Object(a.a)("div",{target:"e6qepj40"})("display:flex;align-items:center;padding:0 50px 0 12px;& .chat__room{width:100px;flex:5;color:",u.a.MainFontColor,";}& .chat__count{width:100px;flex:1;color:",u.a.MainFontColor,";}& .chat__back{width:100px;flex:1;}"),f=function(e){var t=e.room,n=e.counts;return Object(l.jsx)(j,null,Object(l.jsx)("div",{className:"chat__room"},Object(l.jsx)("h3",null,t)),Object(l.jsx)("div",{className:"chat__count"},n," ",Object(l.jsx)(o.a,{color:u.a.MainFontColor,size:24})),Object(l.jsx)("div",{className:"chat__back"},Object(l.jsx)(i.a,{to:"/",icon:Object(l.jsx)(s.a,{color:u.a.MainFontColor,size:24})})))};t.a=r.a.memo(f)},56:function(e,t,n){"use strict";var a=n(60),c=n(63),r=n(0),o=n.n(r),s=n(128),i=n.n(s),u=n(57),l=(n(234),n(1)),j=function(e){var t=e.messages,n=e.name,r=Object(c.a)(e,["messages","name"]);return Object(l.jsx)(i.a,{className:"chat__messages"},t.map((function(e){return Object(l.jsx)(u.a,Object(a.a)({key:"name-".concat(e.id),message:e,name:n},r))})))};t.a=o.a.memo(j)},57:function(e,t,n){"use strict";var a=n(0),c=n.n(a),r=n(291),o=n(287),s=n(288),i=n(129),u=n.n(i),l=n(130),j=n.n(l),f=(n(233),n(1));t.a=function(e){var t=e.message,n=e.name,a=e.avatarSrc,i=t.user,l=t.content,d=t.upload,b=t.type,m=t.address,p=t.percent,O=t.date,h=!1,g=n.trim().toLowerCase();g===i&&(h=!0);var x=h?"user":"friend",v="user"===x?g:i;return Object(f.jsx)("div",{className:"chat-message chat-message--".concat(x)},"friend"===x&&Object(f.jsx)("h4",null,a?Object(f.jsx)(o.a,{src:a,roundedCircle:!0}):Object(f.jsx)(s.a,{size:24}),Object(f.jsx)("span",null,v)),Object(f.jsx)("div",{className:"chat-message__body"},function(e){if(e>0&&e<100)return Object(f.jsx)(c.a.Fragment,null,"loading...",Object(f.jsx)(r.a,{now:e,animated:!0}))}(p),Object(f.jsx)("span",{className:"chat-message__date"},j()(O).format("LTS")),function(e){var t=e.address,n=e.type,a=e.upload;if(t)return Object(f.jsx)("div",{dangerouslySetInnerHTML:{__html:t}});if(n&&a)switch(n){case"video/mp4":return Object(f.jsx)("video",{width:"100%",controls:!0},Object(f.jsx)("source",{src:"data:image/png;base64, ".concat(a),type:"video/mp4"}),Object(f.jsx)("source",{src:"data:image/png;base64, ".concat(a),type:"video/ogg"}),"Your browser does not support the video tag.");case"image/*":default:return Object(f.jsx)("img",{className:"img-thumbnail img-fluid",src:"data:image/png;base64, ".concat(a)})}}({address:m,percent:p,type:b,upload:d}),l&&Object(f.jsx)("p",{className:"chat-message__body--text"},u.a.emojify(l))))}}},[[281,1,2]]]);
//# sourceMappingURL=main.e85f3ac7.chunk.js.map