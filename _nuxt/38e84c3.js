(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{513:function(t,e,n){"use strict";n.r(e);n(304),n(305),n(77),n(91),n(13),n(31),n(66),n(226),n(58),n(50),n(59);var r=n(15),l=n(472),o=n(182);function c(t,e){return t=Number(t),(Array(e).join("0")+t).slice(-e)}var v={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,v,d,m,h,y,_,f,k,w,i,x,V,E;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.payload,r=t.app,!n){e.next=5;break}return e.abrupt("return",{item:n});case 5:return v="1914-01-02",d="custom-daily",r.context.params.year&&(m=r.context.params,v=m.year+"-"+c(m.month,2)+"-"+c(m.day,2),"year"!==m.type&&(d=m.type)),h=v.split("-"),y=l(o.a.appId,o.a.apiKey),_=y.initIndex("dev_MAIN"),f=h[0]+"-"+h[1],e.next=14,_.search(f,{hitsPerPage:200});case 14:for(k=e.sent,w=[],i=0;i<k.hits.length;i++)x=k.hits[i],V=new Date("".concat(x.temporal,"T00:00:00")),E={name:x.label,start:V,end:V,color:"primary",id:x.objectID,description:x.description},w.push(E);return e.abrupt("return",{value:v,type:d,events:w,title:f});case 18:case"end":return e.stop()}}),e)})))()},data:function(){return{baseUrl:"https://nakamura196.github.io/repo",initFlag:!0,mainFlag:!0,typeToLabel:{month:"Month",week:"Week",day:"Day","custom-daily":"Year"},selectedEvent:{},selectedElement:null,selectedOpen:!1}},head:function(){var title=this.$t("calendar")+" "+this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}},computed:{url:function(){return this.baseUrl+this.$route.path}},methods:{prev:function(){this.$refs.calendar.prev()},next:function(){this.$refs.calendar.next()},showEvent:function(t){var e=this,n=t.nativeEvent,r=t.event,l=function(){e.selectedEvent=r,e.selectedElement=n.target,setTimeout((function(){return e.selectedOpen=!0}),10)};this.selectedOpen?(this.selectedOpen=!1,setTimeout(l,10)):l(),n.stopPropagation()},updateRange:function(){var t=this.type;if("custom-daily"===this.type&&(t="year"),!this.initFlag)if(this.mainFlag=!1,"year"===t)this.$router.push(this.localePath({name:"calendar"}));else{var e=this.value.split("-");this.$router.replace(this.localePath({name:"calendar-type-year-month-day",params:{type:t,year:e[0],month:Number(e[1]),day:Number(e[2])}}))}this.initFlag=!1}}},d=n(102),m=n(141),h=n.n(m),y=n(230),_=n(512),f=n(216),k=n(92),w=n(473),x=n(214),V=n(217),E=n(130),O=n(95),T=n(452),C=n(474),F=n(54),I=n(468),$=n(56),P=n(229),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{directives:[{name:"show",rawName:"v-show",value:t.mainFlag,expression:"mainFlag"}],staticClass:"fill-height"},[n("v-col",[n("v-sheet",{attrs:{height:"64"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.prev}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-left")])],1),t._v(" "),n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.next}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-right")])],1),t._v(" "),n("v-toolbar-title",{staticClass:"ml-4"},[t._v("\n            "+t._s(t.title)+"\n          ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-menu",{attrs:{bottom:"",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,l=e.attrs;return[n("v-btn",t._g(t._b({attrs:{outlined:"",color:"grey darken-2"}},"v-btn",l,!1),r),[n("span",[t._v(t._s(t.typeToLabel[t.type]))]),t._v(" "),n("v-icon",{attrs:{right:""}},[t._v("mdi-menu-down")])],1)]}}])},[t._v(" "),n("v-list",[n("v-list-item",{on:{click:function(e){t.type="day"}}},[n("v-list-item-title",[t._v("Day")])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="week"}}},[n("v-list-item-title",[t._v("Week")])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="month"}}},[n("v-list-item-title",[t._v("Month")])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="custom-daily"}}},[n("v-list-item-title",[t._v("Year")])],1)],1)],1)],1)],1),t._v(" "),n("v-sheet",{attrs:{height:"600"}},[n("v-calendar",{ref:"calendar",attrs:{color:"primary",events:t.events,type:t.type},on:{"click:event":t.showEvent,change:t.updateRange},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),n("v-menu",{attrs:{"close-on-content-click":!1,activator:t.selectedElement,"offset-x":""},model:{value:t.selectedOpen,callback:function(e){t.selectedOpen=e},expression:"selectedOpen"}},[n("v-card",{attrs:{color:"grey lighten-4","min-width":"350px",flat:""}},[n("v-toolbar",{attrs:{color:t.selectedEvent.color,dark:""}},[n("v-toolbar-title",[t._v(t._s(t.selectedEvent.name))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-toolbar-title",[t._v(t._s(t.selectedEvent.id))])],1),t._v(" "),n("v-card-text",[n("span",[t._v(t._s(t.selectedEvent.description))])]),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"secondary",to:t.localePath({name:"item-id",params:{id:t.selectedEvent.id}})}},[t._v("\n                詳細\n              ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(e){t.selectedOpen=!1}}},[t._v("\n                Cancel\n              ")])],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VBtn:y.a,VCalendar:_.a,VCard:f.a,VCardActions:k.a,VCardText:k.b,VCol:w.a,VIcon:x.a,VList:V.a,VListItem:E.a,VListItemTitle:O.b,VMenu:T.a,VRow:C.a,VSheet:F.a,VSpacer:I.a,VToolbar:$.a,VToolbarTitle:P.a})}}]);