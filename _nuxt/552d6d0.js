(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{519:function(t,e,r){var content=r(539);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(18).default)("697f26b8",content,!0,{sourceMap:!1})},538:function(t,e,r){"use strict";r(519)},539:function(t,e,r){(e=r(17)(!1)).push([t.i,"mark{background-color:#ffc168}",""]),t.exports=e},590:function(t,e,r){"use strict";r.r(e);var l=r(512),n=r(301),o=(r(536),r(181)),c={data:function(){return{searchClient:l(o.a.appId,o.a.apiKey),routing:{stateMapping:Object(n.a)()},sort:"",perPage:"",sortItems:[{value:"dev_MAIN",label:this.$t("relevance")},{value:"dev_MAIN_temporal_asc",label:this.$t("temporal")+" "+this.$t("asc")}]}},head:function(){return{title:this.$t("search")}},methods:{getSortItems:function(t){for(var e=[],i=0;i<t.length;i++){var r=t[i];e.push({text:r.label,value:r.value})}return e},getSortValue:function(t){this.sort=t},getPageValue:function(t){for(var i=0;i<t.length;i++){var e=t[i];if(e.isRefined){this.perPage=e.value;break}}}}},v=(r(538),r(103)),_=r(142),m=r.n(_),d=r(219),h=r(92),f=r(514),y=r(506),C=r(515),$=r(584),x=r(57),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("ais-instant-search",{attrs:{routing:t.routing,"search-client":t.searchClient,"index-name":"dev_MAIN"}},[r("v-container",{staticClass:"my-5"},[r("v-row",[r("v-col",{attrs:{col:"12",sm:"8","order-sm":"12"}},[r("client-only",[r("ais-powered-by",{staticClass:"my-2"})],1),t._v(" "),r("ais-search-box",{attrs:{placeholder:t.$t("add_a_search_term")}}),t._v(" "),r("v-sheet",{staticClass:"pa-4 pt-10 my-4",attrs:{color:"grey lighten-3"}},[r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:6}},[r("ais-stats",{scopedSlots:t._u([{key:"default",fn:function(e){var l=e.nbHits;return r("p",{staticClass:"my-0"},[t._v("\n                    "+t._s(t.$t("search_result"))+": "+t._s(l.toLocaleString())+"\n                    "+t._s(t.$t("hits"))+"\n                  ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:3}},[r("ais-hits-per-page",{attrs:{items:[{text:"24",value:24,default:!0},{text:"60",value:60},{text:"120",value:120},{text:"512",value:512}]},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.items,n=e.refine;return r("v-select",{attrs:{dense:"",items:l,label:t.$t("items_per_page")},on:{change:function(e){return n(t.perPage)}},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}},[t._v("\n                    "+t._s(t.getPageValue(l))+"\n                  ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:3}},[r("ais-sort-by",{attrs:{items:[{value:"dev_MAIN",label:this.$t("relevance")},{value:"dev_MAIN_temporal_asc",label:this.$t("temporal")+" "+this.$t("asc")}]},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.items,n=e.currentRefinement,o=e.refine;return r("v-select",{attrs:{dense:"",items:t.getSortItems(l),label:t.$t("sort_by")},on:{change:function(e){return o(t.sort)}},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}},[t._v("\n                    "+t._s(t.getSortValue(n))+"\n                  ")])}}])})],1)],1)],1),t._v(" "),r("ais-pagination",{staticClass:"my-4",attrs:{padding:2}}),t._v(" "),r("ais-hits",{scopedSlots:t._u([{key:"default",fn:function(e){var l=e.items;return r("v-row",{},t._l(l,(function(e){return r("v-col",{key:e.objectID,attrs:{cols:"12"}},[r("v-card",{attrs:{flat:"",outlined:""}},[r("div",{staticClass:"pa-4"},[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("h3",[t._v(t._s(e.label))])]),t._v(" "),r("div",{staticClass:"my-2"},[r("small",[r("span",{staticClass:"mr-4"},[r("b",[t._v("ID:")]),t._v("\n                          "+t._s(e.objectID)+"\n                        ")]),t._v(" "),e.agential&&e.agential.length>0?r("span",{staticClass:"mr-4"},[r("b",[t._v(t._s(t.$t("agential"))+":")]),t._v("\n                          "+t._s(e.agential.join(", "))+"\n                        ")]):t._e(),t._v(" "),e.spatial&&e.spatial.length>0?r("span",{staticClass:"mr-4"},[r("b",[t._v(t._s(t.$t("spatial"))+":")]),t._v("\n                          "+t._s(e.spatial.join(", "))+"\n                        ")]):t._e(),t._v(" "),r("span",[r("b",[t._v(t._s(t.$t("temporal"))+":")]),t._v("\n                          "+t._s(e.temporal))])])]),t._v(" "),r("hr",{staticClass:"my-4"}),t._v(" "),r("p",{domProps:{innerHTML:t._s(t.$utils.xml2html(e._highlightResult.xml.value))}})],1)])],1)})),1)}}])}),t._v(" "),r("ais-pagination",{staticClass:"my-4",attrs:{padding:2}})],1),t._v(" "),r("v-col",{attrs:{col:"12",sm:"4","order-sm":"1"}},[r("v-row",[r("v-col",{attrs:{col:"12",sm:"6"}},[r("h2",[t._v(t._s(t.$t("filter")))])]),t._v(" "),r("v-col",{staticClass:"text-right",attrs:{col:"12",sm:"6"}},[r("ais-clear-refinements",[r("span",{attrs:{slot:"resetLabel"},slot:"resetLabel"},[t._v(t._s(t.$t("reset")))])])],1)],1),t._v(" "),t._l(["agential","spatial","year","yearAndMonth","temporal"],(function(e,l){return r("v-card",{key:l,staticClass:"mt-4",attrs:{flat:"",outlined:""}},[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("\n              "+t._s(t.$t(e))+"\n            ")]),t._v(" "),r("v-card-text",[r("ais-refinement-list",{staticClass:"mt-4",attrs:{"show-more":"",operator:"and","show-more-limit":100,limit:20,attribute:e,"sort-by":["isRefined",["temporal","year","yearAndMonth"].includes(e)?"name:asc":""]}})],1)],1)}))],2)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VCard:d.a,VCardText:h.b,VCardTitle:h.c,VCol:f.a,VContainer:y.a,VRow:C.a,VSelect:$.a,VSheet:x.a})}}]);