(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{475:function(t,e,n){var content=n(476);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("dc0628f2",content,!0,{sourceMap:!1})},476:function(t,e,n){(e=n(16)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=e},480:function(t,e,n){var content=n(510);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("1dee1762",content,!0,{sourceMap:!1})},509:function(t,e,n){"use strict";n(480)},510:function(t,e,n){(e=n(16)(!1)).push([t.i,"date{background-color:#bbdefb}time{background-color:#fff9c4}forename,persName,surface{background-color:#ffccbc}placeName{background-color:#c8e6c9}",""]),t.exports=e},511:function(t,e,n){"use strict";n(13);var o=n(4),r=(n(475),n(99)),c=n(32),l=n(160),h=n(109),d=n(161),v=n(210),m=n(41),f=n(2),_=n(10),y=n(8);e.a=Object(y.a)(c.a,l.a,h.a,d.a,v.a,m.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(f.f)(this.maxWidth),minWidth:Object(f.f)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(f.o)(this,"activator",!0)&&Object(_.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=r.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===f.r.esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},530:function(t,e,n){"use strict";n.r(e);n(25),n(75),n(31),n(66),n(58),n(59);var o=n(15),r=n(473),c=n(179),l={asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,l,h,d,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.payload,o=t.app,!n){e.next=5;break}return e.abrupt("return",{item:n});case 5:return l=o.context.params.id,h=r(c.a.appId,c.a.apiKey),d=h.initIndex("dev_MAIN"),e.next=10,d.getObject(l);case 10:return v=e.sent,e.abrupt("return",{item:v});case 12:case"end":return e.stop()}}),e)})))()},data:function(){return{baseUrl:"https://nakamura196.github.io/repo"}},head:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}},computed:{title:function(){return this.item.label},url:function(){return this.baseUrl+this.$route.path},xml2html:function(){return this.item.xml.replace("<head","<p><b").replace("</head>","</b></p>").split("<lb/>").join("<br/>")},jsonUrl:function(){return"https://".concat(c.a.appId,"-dsn.algolia.net/1/indexes/dev_MAIN/").concat(this.item.objectID,"?X-Algolia-API-Key=").concat(c.a.apiKey,"&X-Algolia-Application-Id=").concat(c.a.appId)}},methods:{getQuery:function(label,t){var e={"dev_MAIN[sortBy]":"dev_MAIN_temporal_asc"};return e["dev_MAIN[refinementList][".concat(label,"][0]")]=t,e},getValues:function(data){return data?Array.isArray(data)?data:[data]:[]},dwnJson:function(){var t=this.item.objectID+".xml",data=this.item.xml,link=document.createElement("a");link.href="data:text/xml;charset=utf-8,"+encodeURIComponent(data),link.download=t,link.click()}}},h=(n(509),n(102)),d=n(141),v=n.n(d),m=n(231),f=n(217),_=n(472),y=n(215),x=n(175),C=n(54),w=n(511),component=Object(h.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{staticClass:"py-10"},[n("p",{staticClass:"mb-5 text-center"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[t.item.prev?n("v-btn",t._g({staticClass:"ma-1",attrs:{to:t.localePath({name:"item-id",params:{id:t.item.prev}})}},o),[n("v-icon",[t._v("mdi-chevron-left")])],1):t._e()]}}])},[t._v(" "),n("span",[t._v(t._s(t.$t("previous")))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[t.item.next?n("v-btn",t._g({staticClass:"ma-1",attrs:{to:t.localePath({name:"item-id",params:{id:t.item.next}})}},o),[n("v-icon",[t._v("mdi-chevron-right")])],1):t._e()]}}])},[t._v(" "),n("span",[t._v(t._s(t.$t("next")))])])],1),t._v(" "),n("v-card",{staticClass:"my-10",attrs:{flat:"",outlined:""}},[n("div",{staticClass:"pa-4"},[n("span",{domProps:{innerHTML:t._s(t.xml2html)}}),t._v(" "),n("v-sheet",{staticClass:"pa-3 mt-10",attrs:{color:"grey lighten-3"}},[n("b",{staticClass:"mr-2"},[t._v(t._s(t.$t("legend"))+":")]),t._v(" "),n("persName",{staticClass:"mr-2"},[t._v(t._s(t.$t("agential")))]),t._v(" "),n("placeName",{staticClass:"mr-2"},[t._v(t._s(t.$t("spatial")))]),t._v(" "),n("date",{staticClass:"mr-2"},[t._v(t._s(t.$t("date")))]),t._v(" "),n("time",[t._v(t._s(t.$t("temporal")))])],1)],1)]),t._v(" "),n("dl",{staticClass:"row mb-5"},[n("dt",{staticClass:"col-sm-3 text-muted pb-0"},[n("b",[t._v("URL")])]),t._v(" "),n("dd",{staticClass:"col-sm-9",staticStyle:{"overflow-wrap":"break-word"}},[n("a",{attrs:{href:t.url}},[t._v(t._s(t.url))])])]),t._v(" "),t._l(["agential","spatial","temporal"],(function(e,o){return[t.item[e].length>0?n("dl",{key:o,staticClass:"row mb-5"},[n("dt",{staticClass:"col-sm-3 text-muted pb-0"},[n("b",[t._v(t._s(t.$t(e)))])]),t._v(" "),n("dd",{staticClass:"col-sm-9"},[t._l(t.getValues(t.item[e]),(function(o,r){return[n("span",{key:r,staticClass:"mr-4"},[n("nuxt-link",{attrs:{to:t.localePath({name:"entity-entity-id",params:{entity:e,id:o}})}},[t._v("\n                "+t._s(o)+"\n              ")]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(r){var c=r.on;return[n("v-btn",t._g({attrs:{icon:"",to:t.localePath({name:"search",query:t.getQuery(e,o)})}},c),[n("v-icon",[t._v("mdi-magnify")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v(t._s(t.$t("search")))])])],1)]}))],2)]):t._e()]})),t._v(" "),n("dl",{staticClass:"row mb-5"},[n("dt",{staticClass:"col-sm-3 text-muted"},[n("b",[t._v(t._s(t.$t("license")))])]),t._v(" "),n("dd",{staticClass:"col-sm-9"},["ja"==t.$i18n.locale?[n("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}},[n("img",{staticStyle:{"border-width":"0"},attrs:{alt:"クリエイティブ・コモンズ・ライセンス",src:"https://i.creativecommons.org/l/by/4.0/88x31.png"}})]),n("br"),t._v("この作品は"),n("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}},[t._v("クリエイティブ・コモンズ 表示 4.0 国際 ライセンス")]),t._v("の下に提供されています。\n        ")]:[n("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}},[n("img",{staticStyle:{"border-width":"0"},attrs:{alt:"Creative Commons License",src:"https://i.creativecommons.org/l/by/4.0/88x31.png"}})]),n("br"),t._v("This work is licensed under a\n          "),n("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}},[t._v("Creative Commons Attribution 4.0 International License")]),t._v(".\n        ")]],2)]),t._v(" "),n("div",{staticClass:"text-center"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-btn",t._g({staticClass:"mr-4",attrs:{icon:""}},o),[n("a",[n("v-img",{attrs:{contain:"",width:"30px",src:t.baseUrl+"/img/icons/tei.png"},on:{click:function(e){return t.dwnJson()}}})],1)])]}}])},[t._v(" "),n("span",[t._v(t._s(t.$t("TEI")))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-btn",t._g({staticClass:"mr-4",attrs:{icon:""}},o),[n("a",{attrs:{href:t.jsonUrl,target:"_blank"}},[n("v-img",{attrs:{contain:"",width:"30px",src:t.baseUrl+"/img/icons/json-logo.svg"}})],1)])]}}])},[t._v(" "),n("span",[t._v(t._s(t.$t("JSON")))])])],1)],2)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VBtn:m.a,VCard:f.a,VContainer:_.a,VIcon:y.a,VImg:x.a,VSheet:C.a,VTooltip:w.a})}}]);