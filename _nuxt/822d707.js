(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{505:function(t,e,r){"use strict";r.r(e);r(59);var n=r(15),l=r(472),c=r(213),o={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,d,m,_;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.payload,n=t.app,!r){e.next=5;break}return e.abrupt("return",{item:r});case 5:return o=n.context.params.id,d=l(c.a.appId,c.a.apiKey),m=d.initIndex("dev_MAIN"),e.next=10,m.getObject(o);case 10:return _=e.sent,e.abrupt("return",{item:_});case 12:case"end":return e.stop()}}),e)})))()},data:function(){return{baseUrl:"https://nakamura196.github.io/repo"}},head:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}},computed:{title:function(){return this.item.label},url:function(){return this.baseUrl+"/item/"+this.item.objectID}},methods:{getQuery:function(label,t){var e={"dev_MAIN[sortBy]":"dev_MAIN_temporal_asc"};return e["dev_MAIN[refinementList][".concat(label,"][0]")]=t,e},getValues:function(data){return data?Array.isArray(data)?data:[data]:[]}}},d=r(102),m=r(141),_=r.n(m),v=r(470),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",{staticClass:"py-10"},[r("dl",{staticClass:"row mb-5"},[r("dt",{staticClass:"col-sm-3 text-muted pb-0"},[r("b",[t._v(t._s(t.$t("label")))])]),t._v(" "),r("dd",{staticClass:"col-sm-9"},[t._v("\n        "+t._s(t.item.label)+"\n      ")])]),t._v(" "),r("dl",{staticClass:"row mb-5"},[r("dt",{staticClass:"col-sm-3 text-muted pb-0"},[r("b",[t._v("URL")])]),t._v(" "),r("dd",{staticClass:"col-sm-9",staticStyle:{"overflow-wrap":"break-word"}},[r("a",{attrs:{href:t.url}},[t._v(t._s(t.url))])])]),t._v(" "),t._l(["agential","spatial","temporal"],(function(e,n){return[t.item[e].length>0?r("dl",{key:n,staticClass:"row mb-5"},[r("dt",{staticClass:"col-sm-3 text-muted pb-0"},[r("b",[t._v(t._s(t.$t(e)))])]),t._v(" "),r("dd",{staticClass:"col-sm-9"},[t._l(t.getValues(t.item[e]),(function(n,l){return[r("nuxt-link",{key:l,staticClass:"mr-4",attrs:{to:t.localePath({name:"search",query:t.getQuery(e,n)})}},[t._v("\n              "+t._s(n)+"\n            ")])]}))],2)]):t._e()]})),t._v(" "),r("dl",{staticClass:"row mb-5"},[r("dt",{staticClass:"col-sm-3 text-muted pb-0"},[r("b",[t._v(t._s(t.$t("text")))])]),t._v(" "),r("dd",{staticClass:"col-sm-9"},[t._v("\n        "+t._s(t.item.description)+"\n      ")])])],2)],1)}),[],!1,null,null,null);e.default=component.exports;_()(component,{VContainer:v.a})}}]);