(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77e678ab"],{"3fae":function(e,a,t){"use strict";t.r(a);var o=function(){var e=this,a=this,t=a.$createElement,o=a._self._c||t;return o("div",[a.popup?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-content"},[o("img",{staticClass:"img",attrs:{src:a.clipResult}}),o("div",{staticClass:"flex"},[o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.filename,expression:"filename"}],attrs:{type:"text"},domProps:{value:a.filename},on:{input:function(e){e.target.composing||(a.filename=e.target.value)}}}),o("span",[a._v(".png")])])]),o("div",{staticClass:"flex-center"},[o("button",{staticClass:"btn g"},[o("a",{attrs:{href:a.link,download:a.filename}},[a._v("download")])]),o("button",{staticClass:"btn r",on:{click:function(){e.popup=!1}}},[a._v("close")])])])]):a._e(),o("div",{staticClass:"content"},[o("h2",[a._v("clipper-basic")]),a._m(0),o("h4",[a._v("demo")]),o("clipper-basic",{ref:"clipper",staticClass:"basic-sample",style:a.basicStyle,attrs:{src:a.imgUrl,outline:a.outline||0,border:a.border,rotate:a.rotate,ratio:a.ratio,scale:a.scale,corner:a.corner,grid:a.grid,bgColor:a.bgColor,shadow:a.shadow,mode:a.mode,preview:"my-preview"},on:{load:a.imgLoad}},[o("div",{attrs:{slot:"placeholder"},slot:"placeholder"},[a._v("No image uploaded")])]),o("div",{staticClass:"flex-center"},[o("div",{staticClass:"settings"},[o("h4",[a._v("settings")]),o("div",{staticClass:"flex"},[o("button",{staticClass:"btn",on:{click:a.clip}},[a._v("clip image")]),o("button",{staticClass:"btn"},[o("clipper-upload",{model:{value:a.imgUrl,callback:function(e){a.imgUrl=e},expression:"imgUrl"}},[a._v("upload image")])],1)]),o("div",{staticClass:"flex"},[o("div",[o("span",{staticClass:"label"},[a._v("outline")]),o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.outline,expression:"outline",modifiers:{number:!0}}],attrs:{type:"number",min:"1"},domProps:{value:a.outline},on:{input:function(e){e.target.composing||(a.outline=a._n(e.target.value))},blur:function(e){a.$forceUpdate()}}})]),o("div",[o("span",{staticClass:"label"},[a._v("border")]),o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.border,expression:"border",modifiers:{number:!0}}],attrs:{type:"number",min:"1"},domProps:{value:a.border},on:{input:function(e){e.target.composing||(a.border=a._n(e.target.value))},blur:function(e){a.$forceUpdate()}}})])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"label"},[a._v("layout: ")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.corner,expression:"corner"}],attrs:{type:"checkbox",name:"corner"},domProps:{checked:Array.isArray(a.corner)?a._i(a.corner,null)>-1:a.corner},on:{change:function(e){var t=a.corner,o=e.target,i=!!o.checked;if(Array.isArray(t)){var s=null,r=a._i(t,s);o.checked?r<0&&(a.corner=t.concat([s])):r>-1&&(a.corner=t.slice(0,r).concat(t.slice(r+1)))}else a.corner=i}}}),a._v("corner")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.grid,expression:"grid"}],attrs:{type:"checkbox",name:"grid"},domProps:{checked:Array.isArray(a.grid)?a._i(a.grid,null)>-1:a.grid},on:{change:function(e){var t=a.grid,o=e.target,i=!!o.checked;if(Array.isArray(t)){var s=null,r=a._i(t,s);o.checked?r<0&&(a.grid=t.concat([s])):r>-1&&(a.grid=t.slice(0,r).concat(t.slice(r+1)))}else a.grid=i}}}),a._v("grid")])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"label"},[a._v("ratio: ")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:0,checked:a._q(a.ratio,a._n(0))},on:{change:function(e){a.ratio=a._n(0)}}}),a._v("no ratio")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:1,checked:a._q(a.ratio,a._n(1))},on:{change:function(e){a.ratio=a._n(1)}}}),a._v("1:1")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:4/3,checked:a._q(a.ratio,a._n(4/3))},on:{change:function(e){a.ratio=a._n(4/3)}}}),a._v("4:3")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:16/9,checked:a._q(a.ratio,a._n(16/9))},on:{change:function(e){a.ratio=a._n(16/9)}}}),a._v("16:9")])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"label"},[a._v("mode: ")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.mode,expression:"mode"}],attrs:{type:"radio",name:"mode",value:"normal"},domProps:{checked:a._q(a.mode,"normal")},on:{change:function(e){a.mode="normal"}}}),a._v("normal")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.mode,expression:"mode"}],attrs:{type:"radio",name:"mode",value:"switch"},domProps:{checked:a._q(a.mode,"switch")},on:{change:function(e){a.mode="switch"}}}),a._v("switch")])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"label"},[a._v("bgColor: ")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#000000"},domProps:{checked:a._q(a.bgColor,"#000000")},on:{change:function(e){a.bgColor="#000000"}}}),o("span",{staticClass:"color-tick",staticStyle:{"background-color":"#000000"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#d8adad"},domProps:{checked:a._q(a.bgColor,"#d8adad")},on:{change:function(e){a.bgColor="#d8adad"}}}),o("span",{staticClass:"color-tick",staticStyle:{"background-color":"#d8adad"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#a1cfea"},domProps:{checked:a._q(a.bgColor,"#a1cfea")},on:{change:function(e){a.bgColor="#a1cfea"}}}),o("span",{staticClass:"color-tick",staticStyle:{"background-color":"#a1cfea"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#bc1229"},domProps:{checked:a._q(a.bgColor,"#bc1229")},on:{change:function(e){a.bgColor="#bc1229"}}}),o("span",{staticClass:"color-tick",staticStyle:{"background-color":"#bc1229"}})])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"label"},[a._v("shadow: ")]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(0,0,0,0.4)"},domProps:{checked:a._q(a.shadow,"rgba(0,0,0,0.4)")},on:{change:function(e){a.shadow="rgba(0,0,0,0.4)"}}}),o("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(0,0,0,0.4)"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(0,0,0,0.8)"},domProps:{checked:a._q(a.shadow,"rgba(0,0,0,0.8)")},on:{change:function(e){a.shadow="rgba(0,0,0,0.8)"}}}),o("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(0,0,0,0.8)"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(255,255,255,0.2)"},domProps:{checked:a._q(a.shadow,"rgba(255,255,255,0.2)")},on:{change:function(e){a.shadow="rgba(255,255,255,0.2)"}}}),o("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(255,255,255,0.2)"}})]),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgb(27, 170, 232,0.5)"},domProps:{checked:a._q(a.shadow,"rgb(27, 170, 232,0.5)")},on:{change:function(e){a.shadow="rgb(27, 170, 232,0.5)"}}}),o("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgb(27, 170, 232,0.5)"}})])]),o("div",{staticClass:"flex"},[o("span",{staticClass:"w80 label"},[a._v("rotate: ")]),o("clipper-range",{staticClass:"range",attrs:{min:0,max:360},model:{value:a.rotate,callback:function(e){a.rotate=e},expression:"rotate"}})],1),o("div",{staticClass:"flex"},[o("span",{staticClass:"w80 label"},[a._v("scale: ")]),o("clipper-range",{staticClass:"range",attrs:{min:.2,max:4},model:{value:a.scale,callback:function(e){a.scale=e},expression:"scale"}})],1)]),o("div",{staticClass:"previews"},[o("h4",[a._v("preview")]),o("div",{staticClass:"img-grid"},[o("clipper-preview",{staticClass:"preview preview-lg",attrs:{name:"my-preview"}}),o("clipper-preview",{staticClass:"preview preview-md",attrs:{name:"my-preview"}}),o("clipper-preview",{staticClass:"preview preview-sm",attrs:{name:"my-preview"}})],1)])])],1)])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"area"},[t("ul",[t("li",[e._v("Zoom and drag clipping area to clip the image.")]),t("li",[e._v("It is recommended to use it to clip image without ratio.")]),t("li",[e._v("Supported rotate, scale and ratio but they are not default features.")])])])}],s=(t("cadf"),t("551c"),t("097d"),t("ab2a")),r={extends:{mixins:[s["a"]]},data:function(){return{imgUrl:"dawn.jpg",popup:!1,ratio:0,rotate:0,scale:1,outline:10,border:1,mode:"normal",bgColor:"#000000",shadow:"rgba(0,0,0,0.4)",corner:!0,grid:!0,clipResult:null,link:null,filename:"clip",maxWidth:850}},methods:{clip:function(){this.popup=!0,this.clipToURL()},imgLoad:function(){var e=this.$refs.clipper.imgRatio;this.maxWidth=e<1?500*e:700}},computed:{basicStyle:function(){return{maxWidth:this.maxWidth+"px"}}}},n=r,l=(t("5963"),t("2877")),c=Object(l["a"])(n,o,i,!1,null,"6d9b1b6e",null);c.options.__file="Basic.vue";a["default"]=c.exports},5963:function(e,a,t){"use strict";var o=t("c015"),i=t.n(o);i.a},ab2a:function(e,a,t){"use strict";a["a"]={methods:{clipToURL:function(){var e=this,a=this.$refs.clipper.clip();a.toBlob?a.toBlob(function(a){e.clipResult&&URL.revokeObjectURL(e.clipResult),e.clipResult=URL.createObjectURL(a),e.link=e.clipResult},"image/png",1):(this.clipResult=a.toDataURL("image/png",1),this.link=this.clipResult)}}}},c015:function(e,a,t){}}]);
//# sourceMappingURL=chunk-77e678ab.6a598383.js.map