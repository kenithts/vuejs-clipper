(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cfe4f6ca"],{"3bdd":function(t,e,x){"use strict";x.r(e);var s=function(){var t=this,e=t.$createElement,x=t._self._c||e;return x("div",{staticClass:"list-content content"},[x("div",{staticClass:"area"},[x("h2",[t._v("Transparent Background")]),x("p",[t._v("To get a image with transparent background,")]),x("p",[t._v("upload a png which has transparent background,")]),x("p",[t._v('set clipper component\'s "bgColor" to transparent color.')]),x("clipper-fixed",{ref:"clipper",staticClass:"sample",attrs:{src:t.src,bgColor:"rgba(0,0,0,0)"}}),x("button",{on:{click:t.clipToURL}},[t._v("clip to see the result.")]),x("p",[t._v("clip result will be put above here, you can see this is a transparent image.")]),x("div",{staticClass:"imgCon"},[t._m(0),x("img",{staticClass:"imgResult",attrs:{src:t.clipResult}})])],1)])},i=[function(){var t=this,e=t.$createElement,x=t._self._c||e;return x("div",{staticClass:"text"},[x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")]),x("p",[t._v("text,text,text,text,text,text,text,text,text,")])])}],a=x("ab2a"),n={extends:{mixins:[a["a"]]},data:function(){return{src:"icon/smile.png",clipResult:""}},methods:{}},c=n,p=(x("d94b"),x("2877")),l=Object(p["a"])(c,s,i,!1,null,"51b14ee1",null);l.options.__file="Ex-transparent-bg.vue";e["default"]=l.exports},ab2a:function(t,e,x){"use strict";e["a"]={methods:{clipToURL:function(){var t=this,e=this.$refs.clipper.clip();e.toBlob?e.toBlob(function(e){t.clipResult&&URL.revokeObjectURL(t.clipResult),t.clipResult=URL.createObjectURL(e),t.link=t.clipResult},"image/png",1):(this.clipResult=e.toDataURL("image/png",1),this.link=this.clipResult)}}}},d94b:function(t,e,x){"use strict";var s=x("e116"),i=x.n(s);i.a},e116:function(t,e,x){}}]);
//# sourceMappingURL=chunk-cfe4f6ca.4038a297.js.map