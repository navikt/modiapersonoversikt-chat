(this["webpackJsonpmodiapersonoversikt-chat"]=this["webpackJsonpmodiapersonoversikt-chat"]||[]).push([[0],{134:function(e,t){},137:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(25),o=n.n(i),s=n(27),c=(n(64),n(50)),l=(n(68),n(43),n(51)),u=n.n(l).a.importer("internarbeidsflatefs");var d=function(){return r.createElement(u,{appname:"Modiapersonoversikt chat"})},m=(n(69),n(7)),f=n(23),v=n(14);var h,p=n(10),g=n(13);function b(e,t){var n=t-e;return e+Math.round(Math.random()*n)}!function(e){e[e.INIT=0]="INIT",e[e.OPEN=1]="OPEN",e[e.CLOSE=2]="CLOSE",e[e.REFRESH=3]="REFRESH"}(h||(h={}));var E=function(){function e(t,n){Object(p.a)(this,e),this.status=void 0,this.wsUrl=void 0,this.listeners=void 0,this.connection=void 0,this.resettimer=void 0,this.retrytimer=void 0,this.retryCounter=0,this.wsUrl=t,this.listeners=n,this.status=h.INIT}return Object(g.a)(e,[{key:"open",value:function(){this.status!==h.CLOSE?(e.print("Opening WS",this.wsUrl),this.connection=new WebSocket(this.wsUrl),this.connection.addEventListener("open",this.onWSOpen.bind(this)),this.connection.addEventListener("message",this.onWSMessage.bind(this)),this.connection.addEventListener("error",this.onWSError.bind(this)),this.connection.addEventListener("close",this.onWSClose.bind(this))):e.print("Stopping creation of WS, since it is closed")}},{key:"close",value:function(){e.print("Closing WS",this.wsUrl),this.clearResetTimer(),this.clearRetryTimer(),this.status=h.CLOSE,this.connection&&this.connection.close()}},{key:"getStatus",value:function(){return this.status}},{key:"onWSOpen",value:function(t){var n=this;e.print("open",t),this.clearResetTimer(),this.clearRetryTimer();var r=27e5+b(5e3,15e3);e.print("Creating resettimer",r),this.resettimer=window.setTimeout((function(){n.status=h.REFRESH,n.connection&&n.connection.close()}),r),this.status=h.OPEN,this.listeners.onOpen&&this.listeners.onOpen(t)}},{key:"onWSMessage",value:function(t){e.print("message",t),this.listeners.onMessage&&this.listeners.onMessage(t)}},{key:"onWSError",value:function(t){e.print("error",t),this.listeners.onError&&this.listeners.onError(t)}},{key:"onWSClose",value:function(t){if(e.print("close",t),this.status!==h.REFRESH){if(this.status!==h.CLOSE){var n=30===(r=this.retryCounter++)?Number.MAX_SAFE_INTEGER:1e3*Math.min(Math.pow(2,r),180)+b(5e3,15e3);e.print("Creating retrytimer",n),this.retrytimer=window.setTimeout(this.open.bind(this),n)}var r;this.listeners.onClose&&this.listeners.onClose(t)}else this.open()}},{key:"clearResetTimer",value:function(){this.resettimer&&window.clearTimeout(this.resettimer),this.resettimer=null}},{key:"clearRetryTimer",value:function(){this.retrytimer&&window.clearTimeout(this.retrytimer),this.retrytimer=null,this.retryCounter=0}}],[{key:"print",value:function(){if("true"===Object({NODE_ENV:"production",PUBLIC_URL:"/modiapersonoversikt-chat",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MOCK_ENABLED:"true",REACT_APP_HODE_URL:"https://navikt.github.io/internarbeidsflatedecorator",REACT_APP_USE_HASH_ROUTER:"true"}).REACT_APP_MOCK){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];(e=console).log.apply(e,["WS:"].concat(n))}}}]),e}(),O=new(function(){function e(){Object(p.a)(this,e),this.state={}}return Object(g.a)(e,[{key:"register",value:function(e,t){if(this.state[e])this.state[e].listeners.push(t);else{var n=new E(e,this.createListener(e));n.open(),this.state[e]={ws:n,listeners:[t]}}}},{key:"unregister",value:function(e,t){if(this.state[e]){var n=this.state[e],r=n.listeners.filter((function(e){return e!==t}));n.listeners=r,0===r.length&&(n.ws.close(),delete this.state[e])}}},{key:"broadcast",value:function(e,t,n){if(this.state[t]){var r=this.state[t];"onMessage"===e?r.listeners.forEach((function(e){return e.onMessage&&e.onMessage(n)})):"onClose"===e?r.listeners.forEach((function(e){return e.onClose&&e.onClose(n)})):r.listeners.forEach((function(t){return t[e]&&t[e](n)}))}}},{key:"createListener",value:function(e){var t=this;return{onOpen:function(n){return t.broadcast("onOpen",e,n)},onMessage:function(n){return t.broadcast("onMessage",e,n)},onClose:function(n){return t.broadcast("onClose",e,n)},onError:function(n){return t.broadcast("onError",e,n)}}}}]),e}());function k(){var e,t=Object(r.useState)([]),n=Object(v.a)(t,2),a=n[0],i=n[1],o=Object(r.useState)(!1),s=Object(v.a)(o,2),c=s[0],l=s[1];e=function(){fetch("/modiapersonoversikt-chat/api/control").then((function(e){return e.json()})).then((function(e){i(e)}))},Object(r.useEffect)(e,[]);var u,d,h=Object(r.useMemo)((function(){return{onMessage:function(e){var t=JSON.parse(e.data);i((function(e){if("REQUEST"===t.type)return[].concat(Object(f.a)(e),[{id:t.id,time:new Date,temagruppe:t.temagruppe,fnr:t.fnr,ident:void 0}]);if("APPROVED"===t.type){var n=e.findIndex((function(e){return e.id===t.id})),r=Object(f.a)(e);return r[n].ident=t.ident,r}if("CLOSE"===t.type){var a=e.findIndex((function(e){return e.id===t.id})),i=Object(f.a)(e);return i.splice(a,1),i}return e}))},onOpen:function(e){l(!0)},onClose:function(e){l(!1)},onError:function(e){l(!1)}}}),[i]);u="wss://app-q0.adeo.no/modiapersonoversikt-chat/api/control-ws",d=h,Object(r.useEffect)((function(){if(u)return O.register(u,d),function(){return O.unregister(u,d)}}),[u,d]);var p=Object(r.useMemo)((function(){return{ARBD:a.filter((function(e){return e.temagruppe===m.a.Arbeid})),FMLI:a.filter((function(e){return e.temagruppe===m.a.Familie})),HJLPM:a.filter((function(e){return e.temagruppe===m.a.Hjelpemiddel})),OVRG:a.filter((function(e){return e.temagruppe===m.a.Ovrig})),PENS:a.filter((function(e){return e.temagruppe===m.a.Pensjon}))}}),[a]);return Object(r.useMemo)((function(){return{connection:c,requests:p}}),[c,p])}var j=n(20),S=n(1),y=n.n(S),w=n(2);n(86);var _,C=function(e){var t,n={gridTemplateColumns:e.columns.map((function(e){var t;return null!==(t=e.width)&&void 0!==t?t:"1fr"})).join(" ")},a=e.columns.map((function(e){return r.createElement(w.Element,{tag:"div",className:"grid-list__header-item"},e.header)})),i=e.data.map((function(t,a){var i=e.columns.map((function(e){return{header:e.header,formatted:e.format(t),reactElement:e.react?e.react(t):e.format(t)}})),o=i.map((function(e,t){var n=e.reactElement;return r.createElement(w.Normaltekst,{key:t,tag:"div",className:"grid-liste__row-item"},n)})),s=i.filter((function(e){return e.formatted})).map((function(e){return"".concat(e.header,": ").concat(e.formatted)})).join(" ");return r.createElement("div",{key:a,className:"grid-list__row",style:n,"aria-label":s},o)}));return r.createElement("section",{className:(t=e.className,y()("grid-list",t))},r.createElement("header",{className:"grid-list__header",style:n},a),i)},N=n(11),A=n(29);function R(e){return e.type===_.PERSON}!function(e){e[e.DASHBOARD=0]="DASHBOARD",e[e.PERSON=1]="PERSON"}(_||(_={}));var M={tabs:{DASHBOARD:{id:"DASHBOARD",type:_.DASHBOARD,hasChanges:!1}},active:"DASHBOARD"},P=Object(A.b)({name:"tabs",initialState:M,reducers:{openTab:function(e,t){var n=t.payload;e.tabs[n.id]=n},closeTab:function(e,t){var n=t.payload;delete e.tabs[n]},switchTab:function(e,t){e.active=t.payload},markChanged:function(e,t){e.tabs[t.payload.id]&&(e.tabs[t.payload.id].hasChanges=t.payload.hasChange)}}}),T=P.actions,H=T.openTab,I=(T.closeTab,T.switchTab),D=(T.markChanged,P.reducer),L=function(){return V((function(e){return e.tabs}))},U=Object(N.c)({tabs:D}),F=Object(A.a)({reducer:U}),B=function(){return Object(s.b)()},V=function(e,t){return Object(s.c)(e,t)};var W=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return function(n){var a;return(null!==(a=n.visibleIf)&&void 0!==a?a:t)?r.createElement(e,n):null}};function K(e,t){return function(){fetch("/modiapersonoversikt-chat/api/plukk/".concat(t)).then((function(e){return e.json()})).then((function(t){var n={id:t.fnr,type:_.PERSON,fnr:t.fnr,hasChanges:!1};e(H(n)),e(I(t.fnr))}))}}var z=W((function(e){var t=B(),n=e.temagruppe.value?e.dashboard.requests[e.temagruppe.value]:[];return r.createElement(C,{columns:[{header:"Tidspunkt",format:function(e){return new Date(e.time).toLocaleTimeString("nb")}},{header:"F\xf8dselsnummer",format:function(e){return e.fnr}},{header:"Saksbehandler",format:function(e){var t;return null!==(t=e.ident)&&void 0!==t?t:"-"}},{header:"Plukk samtale",format:function(e){},react:function(e){return r.createElement(j.Flatknapp,{mini:!0,onClick:K(t,e.id)},"Plukk")},width:"7rem"}],data:n})}));n(87),n(88);var x=function(e){var t=Object.entries(e.requests).map((function(t){var n=Object(v.a)(t,2),a=n[0],i=n[1],o=a;return r.createElement("div",{className:"temagruppevalg__radiovalg",key:o},r.createElement("input",{type:"radio",name:"temagruppevalg",value:o,id:"temagruppevalg-".concat(o),checked:e.active.value===o,onChange:function(){return e.active.setValue(o)}}),r.createElement("label",{htmlFor:"temagruppevalg-".concat(a)},r.createElement(w.Normaltekst,{tag:"span"},"".concat(Object(m.c)(o)," (").concat(i.length," i k\xf8)"))))}));return r.createElement("div",{className:"temagruppevalg"},r.createElement("div",{className:"temagruppevalg__radiovalg"},r.createElement("input",{type:"radio",name:"temagruppevalg",value:"N/A",id:"temagruppevalg-N/A",checked:void 0===e.active.value,onChange:function(){return e.active.setValue(void 0)}}),r.createElement("label",{htmlFor:"temagruppevalg-N/A"},r.createElement(w.Normaltekst,{tag:"span"},"Ikke p\xe5koblet"))),t)},q=n(52),J=n.n(q);function G(){return(G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Q(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var Z=a.a.createElement("path",{d:"M14 50.7C15 52.3 17.9 81 26.5 81S39 51.8 39 50.3c-13.2-7.6-25 .4-25 .4z",fill:"#e7e5e2"}),X=a.a.createElement("path",{d:"M38.7 50.2c6 2.9 15.3 10.9 15.3 18.3V93H0V68.5c0-7.1 8.5-14.8 14.5-18-.3.2-.5.3-.5.3 1 1.7 3.8 9.2 12.4 9.2C35 60 39 51.9 39 50.4c-.1-.1-.2-.2-.3-.2z",fill:"#5c4378"}),Y=a.a.createElement("path",{d:"M46.7 76H31.2c-.7 0-1.3-.6-1.2-1.3v-8.5c0-.7.6-1.3 1.3-1.3h15.5c.7 0 1.3.6 1.3 1.3v8.5c-.1.7-.7 1.3-1.4 1.3",fill:"#d2242a"}),$=a.a.createElement("path",{d:"M42.9 71c0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8c2.1 0 3.8 1.7 3.8 3.8m-8.7 1.7h-.7l.8-1.9h.7l-.8 1.9zm9.3 0H43l.8-1.9h.5l-.8 1.9zm1.2 0h-.2l.8-1.9h.2l-.8 1.9z",fill:"#fff"}),ee=a.a.createElement("path",{d:"M36.2 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.6s-.1 0-.1.1l-.2.6v.1h.2l.1 1.2c0-.1 0 0 0 0",fill:"#c52d35"}),te=a.a.createElement("path",{d:"M37.5 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.9s-.1 0-.1.1l-.2.6-.1.1h.5c.1 0 .2.1.2.2v1c-.1-.1-.1 0 0 0m2.6-1.9h-.6s-.1 0-.1.1v1.8s0 .1.1.1h.6s.1 0 .1-.1l.2-.6V72h-.2l-.1-1.2",fill:"#c52d35"}),ne=a.a.createElement("path",{d:"M37.7 72.7h.4s.1 0 .1-.1l.2-.6v-.1h-.2c0 .1-.5.8-.5.8zm3.9-1.9h.7s.1 0 0 .1l-.7 1.8H41l.6-1.9",fill:"#c52d35"}),re=a.a.createElement("path",{d:"M40.8 70.8h-1c-.1 0 .3.1.3.1l.7 1.7s0 .1.1.1h.6l-.7-1.9m-1.3.6v.4s-.1-.4-.3-.4c-.3 0-.3.2-.3.3 0 .1.1.3.2.3h.5l-.3.7H39c-.2 0-.9-.3-.9-.9 0-.6.5-1 .9-1 .2-.1.5.2.5.6 0-.1 0-.1 0 0z",fill:"#c52d35"}),ae=a.a.createElement("path",{d:"M39.9 66.7h-1.6c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h1.6c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2",fill:"#5a1f57"}),ie=a.a.createElement("path",{d:"M38.7 66.5h.9V64h-.9v2.5z",fill:"#c2b5cf"}),oe=a.a.createElement("path",{d:"M47.2 35.3C44.7 45.6 36.6 53.1 27 53.1S9.3 45.6 6.8 35.3c-.2.1-.5.1-.8.1-1.1 0-2-.8-2-1.7v-7c0-1 .9-1.7 2-1.7h.2C7.7 13.1 16.4 4 27 4c10.6 0 19.3 9.1 20.8 21h.2c1.1 0 2 .8 2 1.7v7c0 1-.9 1.7-2 1.7-.3 0-.5 0-.8-.1z",fill:"#e7e5e2"}),se=a.a.createElement("path",{d:"M19 27.6c-1.4.1-1.9-2-1.4-3.4.1-.3.6-1.5 1.4-1.5.8 0 1.2.7 1.3.8.6 1.4.3 4-1.3 4.1m16.2 0c1.4.1 1.9-2 1.4-3.4-.1-.3-.6-1.5-1.4-1.5-.8 0-1.2.7-1.3.8-.6 1.4-.3 4 1.3 4.1",fill:"#635e59"}),ce=a.a.createElement("path",{d:"M26.8 34.6c-.4 0-.7-.1-1-.2-.3-.1-.4-.4-.3-.7.1-.3.4-.4.7-.3.5.2 1.5.1 2.2-.4.7-.4 1.1-1 1.2-1.5.1-.4-.1-.9-.4-1.3-.2-.2-.8-.2-1.6-.1-.3 0-.5-.1-.6-.4 0-.3.1-.5.4-.6 1.2-.2 2.1 0 2.6.6.5.7.8 1.4.6 2.1-.1.8-.7 1.6-1.7 2.2-.6.3-1.4.6-2.1.6z",fill:"#d1bfa3"}),le=a.a.createElement("path",{d:"M27.1 42.1h-.3c-5.3-.2-7.3-4.1-7.4-4.3-.1-.3 0-.6.2-.7.2-.1.6 0 .7.2.1.1 1.9 3.6 6.6 3.8 4.7.2 6.4-3.7 6.4-3.7.1-.3.4-.4.7-.3.3.1.4.4.3.7-.1 0-2.1 4.3-7.2 4.3z",fill:"#593a32"}),ue=a.a.createElement("path",{d:"M6.6 30.7c.1-.1.1-.2.1-.3v-2c-.1-5.6 1.8-8.1 3.4-10.1 0 0-1 4.3-.3 3.4 3.8-5 21.4-1.6 25-8.1.5 3.6-4.1 4.6-4.1 4.6 3.7.7 6.9-.8 7.7-2.5.3 1.4-.6 2.4-1.9 3.4 4.5-.9 4.6-4 4.6-4 .6 4.1 5.3 2.5 5.3 9.3v6c0 .3.2.6.5.6h.5c.3 0 .5-.3.5-.6V26c.3-15.6-8.5-26-20.6-26C15.9 0 5 10.4 5 24.1v6.3c0 .4.2.6.5.6h.6c.2 0 .3-.1.5-.3",fill:"#f6b873"}),de=a.a.createElement("path",{d:"M25.9 43.4c-4.4 0-8-1.4-8-3.2s3.6-3.2 8-3.2 8 1.4 8 3.2c0 1.8-3.6 3.2-8 3.2m.8-9.4c-2.9 0-4.7.7-8.8 2.1-12.7 4.6-11.6-14-11.6-14C3.4 46 18.6 52 26.5 52c8.1 0 24.1-8.1 21-30 0 0 .4 17.1-12.9 13.8-3.7-.9-5-1.8-7.9-1.8z",fill:"#f6b873"}),me=function(e){var t=e.svgRef,n=e.title,r=Q(e,["svgRef","title"]);return a.a.createElement("svg",G({viewBox:"0 0 54 93",ref:t},r),n?a.a.createElement("title",null,n):null,Z,X,Y,$,ee,te,ne,re,ae,ie,oe,se,ce,le,ue,de)},fe=a.a.forwardRef((function(e,t){return a.a.createElement(me,G({svgRef:t},e))}));n.p;var ve=W((function(){return r.createElement(J.a,{fargetema:"info",svg:r.createElement(fe,null)},r.createElement(w.Systemtittel,null,"Velg en temagruppe for \xe5 se brukere som venter p\xe5 svar"))}));var he=function(){var e=function(e){var t=Object(r.useState)(e),n=Object(v.a)(t,2),a=n[0],i=n[1];return Object(r.useMemo)((function(){return{value:a,setValue:i}}),[a])}(void 0),t=k();return r.createElement("div",{className:"dashboard"},r.createElement("div",{className:"dashboard__temagrupper"},r.createElement(x,{active:e,requests:t.requests})),r.createElement("div",{className:"dashboard__valgtemagruppe"},e.value&&r.createElement(w.Innholdstittel,{className:"blokk-xs"},e.value?Object(m.c)(e.value):"Ikke p\xe5koblet")),r.createElement("div",{className:"dashboard__liste"},r.createElement(ve,{visibleIf:void 0===e.value}),r.createElement(z,{temagruppe:e,dashboard:t,visibleIf:void 0!==e.value})))},pe=(n(92),n(33)),ge=n(53),be=n.n(ge),Ee=n(54),Oe=n.n(Ee),ke=n(12);var je=function(e){var t=Object(pe.a)("/modiapersonoversikt-chat/api/chat/".concat(e.fnr)),n=Object(r.useState)(""),i=Object(v.a)(n,2),o=i[0],s=i[1];if(Object(pe.c)(t))return a.a.createElement(be.a,null);if(Object(pe.b)(t))return a.a.createElement("p",null,"Beklager, kunne ikke laste inn chat.");var c=t.data.map((function(e,t){return a.a.createElement(Oe.a,{key:t,pilHoyre:"nav"===e.from},e.content)}));return a.a.createElement("div",{className:"persontab__chatwindow"},a.a.createElement("div",{className:"persontab__chatcontent"},c),a.a.createElement("form",null,a.a.createElement(ke.Textarea,{label:"Enter for \xe5 sende",maxLength:0,value:o,onChange:function(e){s(e.target.value)},onKeyUp:function(n){13!==n.keyCode||n.shiftKey||function(e,t){return fetch("/modiapersonoversikt-chat/api/chat/".concat(e,"/send"),{method:"POST",body:t})}(e.fnr,o).then((function(){s(""),t.rerun()}))}})))};var Se=function(e){return r.createElement("div",{className:"persontab"},r.createElement("iframe",{className:"persontab__persondata",title:e.fnr,src:"https://navikt.github.io/modiapersonoversikt/#/person/".concat(e.fnr,"?chatvisning")}),r.createElement("div",{className:"persontab__chat"},r.createElement(je,{fnr:e.fnr})))};function ye(e){var t=e.tab,n=e.activeTabId,a=t.id!==n,i=void 0,o=void 0;R(t)?(o="tabviewer__persontab",i=r.createElement(Se,{fnr:t.fnr})):(o="tabviewer__dashboard",i=r.createElement(he,null));var s=["tabviewer__tab",o,a?"tabviewer__tab--inactive":""].filter((function(e){return e.length>0})).join(" ");return r.createElement("div",{key:t.id,className:s,"aria-hidden":a},i)}var we=function(){var e=L(),t=Object.values(e.tabs).map((function(t){return r.createElement(ye,{key:t.id,tab:t,activeTabId:e.active})}));return r.createElement("div",{className:"tabviewer"},t)};var _e=function(){var e=B(),t=L(),n=Object.values(t.tabs),a=t.active,i=n.map((function(e,t){return{label:R(e)?e.fnr:"Dashboard",aktiv:e.id===a}}));return r.createElement(r.Fragment,null,r.createElement(d,null),r.createElement(c.TabsPure,{tabs:i,onChange:function(t,r){e(I(n[r].id))}}),r.createElement(we,null))};n(138),o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s.a,{store:F},a.a.createElement(_e,null))),document.getElementById("root"))},138:function(e,t,n){"use strict";n.r(t),n.d(t,"starters",(function(){return v})),n.d(t,"followups",(function(){return h})),n.d(t,"ekstra",(function(){return p})),n.d(t,"chatContent",(function(){return g}));var r=n(30),a=n(22),i=[{enhetId:"0219",navn:"NAV B\xe6rum"},{enhetId:"4100",navn:"NKS"},{enhetId:"0118",navn:"NAV Aremark"},{enhetId:"0604",navn:"NAV Kongsberg"},{enhetId:"0602",navn:"NAV Drammer"}];var o=n(6),s=n.n(o),c=n(7),l=n(4);function u(e,t,n){var r=function(e,t){var n=t-e;return e+Math.round(Math.random()*n)}(e,t);setTimeout((function(){n(),u(e,t,n)}),r)}var d=new Array(30).fill(0).map((function(){return{type:"REQUEST",time:(new Date).toISOString(),temagruppe:s.a.random.arrayElement(c.b),id:Object(l.guid)(),fnr:s.a.personIdentifikator.f\u00f8dselsnummer()}}));function m(e,t){var n=JSON.stringify(t);e.send(n)}console.log("=========================="),console.log("======== MED MOCK ========"),console.log("==========================");var f=r.b.configure({middleware:r.a.combine(r.a.loggingMiddleware())});!function(e){window.WebSocket=a.b,new a.a("wss://veilederflatehendelser-q0.adeo.no/modiaeventdistribution/ws/Z999999").start();var t={ident:"Z999999",navn:"Fornavn Ettersen",fornavn:"Fornavn",etternavn:"Ettersen",enheter:i};e.get("/modiacontextholder/api/decorator",(function(e,n,r){return n(r.json(t))})),e.get("https://app.adeo.no/modiacontextholder/api/decorator",(function(e,n,r){return n(r.json(t))}))}(f),function(e){window.WebSocket=a.b;var t=new a.a("wss://app-q0.adeo.no/modiapersonoversikt-chat/api/control-ws");window.controlServer=t,t.on("connection",(function(e){e.send(d[0])})),u(1e3,1e4,(function(){var e={type:"REQUEST",time:(new Date).toISOString(),temagruppe:s.a.random.arrayElement(c.b),id:Object(l.guid)(),fnr:s.a.personIdentifikator.f\u00f8dselsnummer()};if(d.push(e),m(t,e),d.length>50){var n=s.a.random.integer(d.length-1,0),r=d.splice(n,1)[0];m(t,{type:"CLOSE",time:(new Date).toISOString(),id:r.id})}})),e.get("/modiapersonoversikt-chat/api/control",(function(e,t,n){return t(n.json(d))})),e.get("/modiapersonoversikt-chat/api/plukk/:id",(function(e,t,n){var r=e.pathParams.id,a=d.find((function(e){return e.id===r}));return a?(g[a.fnr]=[{from:"user",content:s.a.random.arrayElement(v)},{from:"user",content:s.a.random.arrayElement(h)}],t(n.json({fnr:a.fnr}))):t(n.status(404))}))}(f),s.a.random.arrayElement([]);var v=["Hei,\njeg har ett lite sp\xf8rsm\xe5l.","God dagen. Kunne jeg stilt ett lite sp\xf8rsm\xe5l?","Skjera!! Kan dere ta kontakt med meg."],h=["Det jeg lurer p\xe5 er ang\xe5ende AAP","Hvordan er egentlig greia med dagpenger n\xe5 om dagen","Corona er skummelt og jeg lurer p\xe5 hva jeg skal gj\xf8re."],p=["Fint og flott. Er det det samme med andre ytelser ogs\xe5?","Hvordan blir dette om jeg ogs\xe5 er selvstendig n\xe6ringsdrivende? P\xe5virker det noe?","Jeg forst\xe5r. Stor fare for at jeg blir permittert i l\xf8pet av h\xf8sten. Vil det endre noe?"],g={};f.get("/modiapersonoversikt-chat/api/plukk",(function(e,t,n){var r=s.a.personIdentifikator.f\u00f8dselsnummer();return g[r]=[{from:"user",content:s.a.random.arrayElement(v)},{from:"user",content:s.a.random.arrayElement(h)}],t(n.json({fnr:r,id:Object(l.guid)()}))})),f.get("/modiapersonoversikt-chat/api/chat/:fnr",(function(e,t,n){return t(n.json(g[e.pathParams.fnr]))})),f.post("/modiapersonoversikt-chat/api/chat/:fnr/send",(function(e,t,n){var r=g[e.pathParams.fnr]||[];return r.push({from:"nav",content:e.body}),r.push({from:"user",content:s.a.random.arrayElement(p)}),g[e.pathParams.fnr]=r,t(n.json(r))}))},55:function(e,t,n){e.exports=n(137)},64:function(e,t,n){},69:function(e,t,n){},7:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return c}));var r,a,i=n(8);!function(e){e.Arbeid="ARBD",e.Familie="FMLI",e.Hjelpemiddel="HJLPM",e.Bil="BIL",e.OrtopediskHjelpemiddel="ORT_HJE",e.Ovrig="OVRG",e.Pensjon="PENS",e.PleiepengerSyktBarn="PLEIEPENGERSY",e.Uforetrygd="UFRT",e.Utland="UTLAND",e.AndreSosiale="ANSOS",e.OkonomiskSosial="OKSOS"}(a||(a={}));var o=(r={},Object(i.a)(r,a.Arbeid,"Arbeid"),Object(i.a)(r,a.Familie,"Familie"),Object(i.a)(r,a.Hjelpemiddel,"Hjelpemidler"),Object(i.a)(r,a.Bil,"Hjelpemidler bil"),Object(i.a)(r,a.OrtopediskHjelpemiddel,"Ortopediske hjelpemidler"),Object(i.a)(r,a.Pensjon,"Pensjon"),Object(i.a)(r,a.PleiepengerSyktBarn,"Pleiepenger sykt barn"),Object(i.a)(r,a.Uforetrygd,"Uf\xf8retrygd"),Object(i.a)(r,a.Utland,"Utland"),Object(i.a)(r,a.OkonomiskSosial,"\xd8konomisk sosialhjelp"),Object(i.a)(r,a.AndreSosiale,"Andre sosiale tjenester"),Object(i.a)(r,a.Ovrig,"\xd8vrige henvendelser"),r),s=[a.Arbeid,a.Familie,a.Hjelpemiddel,a.Pensjon,a.Ovrig];function c(e){var t;return null!==(t=o[e])&&void 0!==t?t:"Ukjent temagruppe"}},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){},92:function(e,t,n){}},[[55,1,2]]]);
//# sourceMappingURL=main.cce777f3.chunk.js.map