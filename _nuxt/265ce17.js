(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{533:function(t,e,r){var content=r(547);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(18).default)("0dca5f8e",content,!0,{sourceMap:!1})},546:function(t,e,r){"use strict";r(533)},547:function(t,e,r){(e=r(17)(!1)).push([t.i,'.leaflet-cluster-anim .leaflet-marker-icon,.leaflet-cluster-anim .leaflet-marker-shadow{transition:transform .3s ease-out,opacity .3s ease-in}.leaflet-cluster-spider-leg{transition:stroke-dashoffset .3s ease-out,stroke-opacity .3s ease-in}.marker-cluster-small{background-color:rgba(181,226,140,.6)}.marker-cluster-small div{background-color:rgba(110,204,57,.6)}.marker-cluster-medium{background-color:rgba(241,211,87,.6)}.marker-cluster-medium div{background-color:rgba(240,194,12,.6)}.marker-cluster-large{background-color:rgba(253,156,115,.6)}.marker-cluster-large div{background-color:rgba(241,128,23,.6)}.leaflet-oldie .marker-cluster-small{background-color:#b5e28c}.leaflet-oldie .marker-cluster-small div{background-color:#6ecc39}.leaflet-oldie .marker-cluster-medium{background-color:#f1d357}.leaflet-oldie .marker-cluster-medium div{background-color:#f0c20c}.leaflet-oldie .marker-cluster-large{background-color:#fd9c73}.leaflet-oldie .marker-cluster-large div{background-color:#f18017}.marker-cluster{background-clip:padding-box;border-radius:20px}.marker-cluster div{width:30px;height:30px;margin-left:5px;margin-top:5px;text-align:center;border-radius:15px;font:12px "Helvetica Neue",Arial,Helvetica,sans-serif}.marker-cluster span{line-height:30px}',""]),t.exports=e},602:function(t,e,r){"use strict";r.r(e);r(47),r(308),r(52);var n=r(16),o=r(27),c=r(37),l=r(42),f=r(36),d=r(28),m=r(13),h=r(311),y=r(132),v=r.n(y),k=r(181);function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var x=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},j={};j=r(545);var R=function(t){Object(l.a)(r,t);var e=O(r);function r(){var t;return Object(o.a)(this,r),(t=e.apply(this,arguments)).tileProviders=[{name:"OpenStreetMap",visible:!0,attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"},{name:"OpenTopoMap",visible:!1,url:"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",attribution:'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}],t}return r}(k.Vue);x([Object(k.Prop)()],R.prototype,"markers",void 0),x([Object(k.Prop)({default:1})],R.prototype,"zoom",void 0),x([Object(k.Prop)({default:[]})],R.prototype,"center",void 0);var _=R=x([Object(k.Component)({components:{"l-marker-cluster":j}})],R),w=(r(546),r(103)),P=r(142),S=r.n(P),C=r(177),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("l-map",{staticStyle:{"z-index":"0"},attrs:{zoom:t.zoom,center:t.center}},[r("l-control-layers",{attrs:{position:"topright"}}),t._v(" "),t._l(t.tileProviders,(function(t){return r("l-tile-layer",{key:t.name,attrs:{name:t.name,visible:t.visible,url:t.url,attribution:t.attribution,"layer-type":"base"}})})),t._v(" "),r("l-marker-cluster",t._l(t.markers,(function(marker,e){return r("l-marker",{key:e,attrs:{"lat-lng":marker.latlng}},[r("l-popup",[r("nuxt-link",{attrs:{to:t.localePath(marker.path)}},[t._v(t._s(marker.content))]),t._v(" "),marker.image?[r("v-img",{staticClass:"ma-2",attrs:{"max-height":"150px","min-height":"90px",src:marker.image,contain:""}})]:t._e()],2)],1)})),1)],2)],1)}),[],!1,null,null,null),M=component.exports;function z(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}S()(component,{VImg:C.a});var D=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},V=function(t){Object(l.a)(f,t);var e,r=z(f);function f(){var t;return Object(o.a)(this,f),(t=r.apply(this,arguments)).map={},t.markers=[],t}return Object(c.a)(f,[{key:"asyncData",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(e){var r,n,o,label,c,marker;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=e.payload)){t.next=5;break}return t.abrupt("return",{item:r});case 5:return t.next=7,v.a.get("https://nakamura196.github.io/repo/data/spatial.json");case 7:for(label in n=t.sent,o=[],n.data)c=n.data[label],marker={latlng:[c.lat,c.long],content:label,path:{name:"entity-entity-id",params:{entity:"spatial",id:label}}},o.push(marker);return t.abrupt("return",{markers:o});case 11:case"end":return t.stop()}}),t)}))),function(t){return e.apply(this,arguments)})},{key:"head",value:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}}},{key:"title",get:function(){return this.$t("map")}},{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"})},{text:this.title}]}}]),f}(h.Vue),$=V=D([Object(h.Component)({components:{Mapc:M}})],V),T=r(522),A=r(511),B=r(218),E=r(57),H=Object(w.a)($,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-4",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[r("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),r("v-container",[r("h1",{staticClass:"my-5"},[t._v(t._s(t.$t("map")))]),t._v(" "),r("div",{staticClass:"my-2",staticStyle:{height:"80vh"},attrs:{id:"map-wrap"}},[r("mapc",{attrs:{markers:t.markers,zoom:2,center:[38,0]}})],1)])],1)}),[],!1,null,null,null);e.default=H.exports;S()(H,{VBreadcrumbs:T.a,VContainer:A.a,VIcon:B.a,VSheet:E.a})}}]);