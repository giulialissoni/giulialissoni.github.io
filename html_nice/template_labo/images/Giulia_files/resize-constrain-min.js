YUI.add("dd-ddm",function(a,b){a.mix(a.DD.DDM,{_pg:null,_debugShim:!1,_activateTargets:function(){},_deactivateTargets:function(){},_startDrag:function(){this.activeDrag&&this.activeDrag.get("useShim")&&(this._shimming=!0,this._pg_activate(),this._activateTargets())},_endDrag:function(){this._pg_deactivate(),this._deactivateTargets()},_pg_deactivate:function(){this._pg.setStyle("display","none")},_pg_activate:function(){this._pg||this._createPG();var a=this.activeDrag.get("activeHandle"),b="auto";a&&(b=a.getStyle("cursor")),"auto"===b&&(b=this.get("dragCursor")),this._pg_size(),this._pg.setStyles({top:0,left:0,display:"block",opacity:this._debugShim?".5":"0",cursor:b})},_pg_size:function(){if(this.activeDrag){var b=a.one("body"),c=b.get("docHeight"),d=b.get("docWidth");this._pg.setStyles({height:c+"px",width:d+"px"})}},_createPG:function(){var b,c=a.Node.create("<div></div>"),d=a.one("body");c.setStyles({top:"0",left:"0",position:"absolute",zIndex:"9999",overflow:"hidden",backgroundColor:"red",display:"none",height:"5px",width:"5px"}),c.set("id",a.stamp(c)),c.addClass(a.DD.DDM.CSS_PREFIX+"-shim"),d.prepend(c),this._pg=c,this._pg.on("mousemove",a.throttle(a.bind(this._move,this),this.get("throttleTime"))),this._pg.on("mouseup",a.bind(this._end,this)),b=a.one("win"),a.on("window:resize",a.bind(this._pg_size,this)),b.on("scroll",a.bind(this._pg_size,this))}},!0)},"3.14.1",{requires:["dd-ddm-base","event-resize"]});
YUI.add("dd-ddm-drop",function(a,b){a.mix(a.DD.DDM,{_noShim:!1,_activeShims:[],_hasActiveShim:function(){return!!this._noShim||this._activeShims.length},_addActiveShim:function(a){this._activeShims.push(a)},_removeActiveShim:function(b){var c=[];a.Array.each(this._activeShims,function(a){a._yuid!==b._yuid&&c.push(a)}),this._activeShims=c},syncActiveShims:function(b){a.later(0,this,function(b){var c=b?this.targets:this._lookup();a.Array.each(c,function(a){a.sizeShim.call(a)},this)},b)},mode:0,POINT:0,INTERSECT:1,STRICT:2,useHash:!0,activeDrop:null,validDrops:[],otherDrops:{},targets:[],_addValid:function(a){return this.validDrops.push(a),this},_removeValid:function(b){var c=[];return a.Array.each(this.validDrops,function(a){a!==b&&c.push(a)}),this.validDrops=c,this},isOverTarget:function(a){if(this.activeDrag&&a){var b,c,d=this.activeDrag.mouseXY,e=this.activeDrag.get("dragMode"),f=a.shim;if(d&&this.activeDrag){if(c=this.activeDrag.region,e===this.STRICT)return this.activeDrag.get("dragNode").inRegion(a.region,!0,c);if(a&&a.shim)return e===this.INTERSECT&&this._noShim?(b=c||this.activeDrag.get("node"),a.get("node").intersect(b,a.region).inRegion):(this._noShim&&(f=a.get("node")),f.intersect({top:d[1],bottom:d[1],left:d[0],right:d[0]},a.region).inRegion)}}return!1},clearCache:function(){this.validDrops=[],this.otherDrops={},this._activeShims=[]},_activateTargets:function(){this._noShim=!0,this.clearCache(),a.Array.each(this.targets,function(a){a._activateShim([]),!0===a.get("noShim")&&(this._noShim=!1)},this),this._handleTargetOver()},getBestMatch:function(b,c){var d,e=null,f=0;return a.Array.each(b,function(a){var b=this.activeDrag.get("dragNode").intersect(a.get("node"));a.region.area=b.area,b.inRegion&&b.area>f&&(f=b.area,e=a)},this),c?(d=[],a.Array.each(b,function(a){a!==e&&d.push(a)},this),[e,d]):e},_deactivateTargets:function(){var b,c=[],d=this.activeDrag,e=this.activeDrop;d&&e&&this.otherDrops[e]?(d.get("dragMode")?(b=this.getBestMatch(this.otherDrops,!0),e=b[0],c=b[1]):(c=this.otherDrops,delete c[e]),d.get("node").removeClass(this.CSS_PREFIX+"-drag-over"),e&&(e.fire("drop:hit",{drag:d,drop:e,others:c}),d.fire("drag:drophit",{drag:d,drop:e,others:c}))):d&&d.get("dragging")&&(d.get("node").removeClass(this.CSS_PREFIX+"-drag-over"),d.fire("drag:dropmiss",{pageX:d.lastXY[0],pageY:d.lastXY[1]})),this.activeDrop=null,a.Array.each(this.targets,function(a){a._deactivateShim([])},this)},_dropMove:function(){this._hasActiveShim()?this._handleTargetOver():a.Array.each(this.otherDrops,function(a){a._handleOut.apply(a,[])})},_lookup:function(){if(!this.useHash||this._noShim)return this.validDrops;var b=[];return a.Array.each(this.validDrops,function(a){a.shim&&a.shim.inViewportRegion(!1,a.region)&&b.push(a)}),b},_handleTargetOver:function(){var b=this._lookup();a.Array.each(b,function(a){a._handleTargetOver.call(a)},this)},_regTarget:function(a){this.targets.push(a)},_unregTarget:function(b){var c,d=[];a.Array.each(this.targets,function(a){a!==b&&d.push(a)},this),this.targets=d,c=[],a.Array.each(this.validDrops,function(a){a!==b&&c.push(a)}),this.validDrops=c},getDrop:function(b){var c=!1,d=a.one(b);return d instanceof a.Node&&a.Array.each(this.targets,function(a){d.compareTo(a.get("node"))&&(c=a)}),c}},!0)},"3.14.1",{requires:["dd-ddm"]});
YUI.add("dd-drop",function(a,b){var c="node",d=a.DD.DDM,e=function(){this._lazyAddAttrs=!1,e.superclass.constructor.apply(this,arguments),a.on("domready",a.bind(function(){a.later(100,this,this._createShim)},this)),d._regTarget(this)};e.NAME="drop",e.ATTRS={node:{setter:function(b){var c=a.one(b);return c||a.error("DD.Drop: Invalid Node Given: "+b),c}},groups:{value:["default"],getter:function(){return this._groups?a.Object.keys(this._groups):(this._groups={},[])},setter:function(b){return this._groups=a.Array.hash(b),b}},padding:{value:"0",setter:function(a){return d.cssSizestoObject(a)}},lock:{value:!1,setter:function(a){return a?this.get(c).addClass(d.CSS_PREFIX+"-drop-locked"):this.get(c).removeClass(d.CSS_PREFIX+"-drop-locked"),a}},bubbles:{setter:function(a){return this.addTarget(a),a}},useShim:{value:!0,setter:function(b){return a.DD.DDM._noShim=!b,b}}},a.extend(e,a.Base,{_bubbleTargets:a.DD.DDM,addToGroup:function(a){return this._groups[a]=!0,this},removeFromGroup:function(a){return delete this._groups[a],this},_createEvents:function(){var b=["drop:over","drop:enter","drop:exit","drop:hit"];a.Array.each(b,function(a){this.publish(a,{type:a,emitFacade:!0,preventable:!1,bubbles:!0,queuable:!1,prefix:"drop"})},this)},_valid:null,_groups:null,shim:null,region:null,overTarget:null,inGroup:function(b){this._valid=!1;var c=!1;return a.Array.each(b,function(a){this._groups[a]&&(c=!0,this._valid=!0)},this),c},initializer:function(){a.later(100,this,this._createEvents);var b,e=this.get(c);e.get("id")||(b=a.stamp(e),e.set("id",b)),e.addClass(d.CSS_PREFIX+"-drop"),this.set("groups",this.get("groups"))},destructor:function(){d._unregTarget(this),this.shim&&this.shim!==this.get(c)&&(this.shim.detachAll(),this.shim.remove(),this.shim=null),this.get(c).removeClass(d.CSS_PREFIX+"-drop"),this.detachAll()},_deactivateShim:function(){if(!this.shim)return!1;this.get(c).removeClass(d.CSS_PREFIX+"-drop-active-valid"),this.get(c).removeClass(d.CSS_PREFIX+"-drop-active-invalid"),this.get(c).removeClass(d.CSS_PREFIX+"-drop-over"),this.get("useShim")&&this.shim.setStyles({top:"-999px",left:"-999px",zIndex:"1"}),this.overTarget=!1},_activateShim:function(){if(!d.activeDrag)return!1;if(this.get(c)===d.activeDrag.get(c))return!1;if(this.get("lock"))return!1;var a=this.get(c);this.inGroup(d.activeDrag.get("groups"))?(a.removeClass(d.CSS_PREFIX+"-drop-active-invalid"),a.addClass(d.CSS_PREFIX+"-drop-active-valid"),d._addValid(this),this.overTarget=!1,this.get("useShim")||(this.shim=this.get(c)),this.sizeShim()):(d._removeValid(this),a.removeClass(d.CSS_PREFIX+"-drop-active-valid"),a.addClass(d.CSS_PREFIX+"-drop-active-invalid"))},sizeShim:function(){if(!d.activeDrag)return!1;if(this.get(c)===d.activeDrag.get(c))return!1;if(this.get("lock"))return!1;if(!this.shim)return a.later(100,this,this.sizeShim),!1;var b,e,f,g=this.get(c),h=g.get("offsetHeight"),i=g.get("offsetWidth"),j=g.getXY(),k=this.get("padding");i=i+k.left+k.right,h=h+k.top+k.bottom,j[0]=j[0]-k.left,j[1]=j[1]-k.top,d.activeDrag.get("dragMode")===d.INTERSECT&&(b=d.activeDrag,e=b.get(c).get("offsetHeight"),f=b.get(c).get("offsetWidth"),h+=e,i+=f,j[0]=j[0]-(f-b.deltaXY[0]),j[1]=j[1]-(e-b.deltaXY[1])),this.get("useShim")&&this.shim.setStyles({height:h+"px",width:i+"px",top:j[1]+"px",left:j[0]+"px"}),this.region={0:j[0],1:j[1],area:0,top:j[1],right:j[0]+i,bottom:j[1]+h,left:j[0]}},_createShim:function(){if(!d._pg)return void a.later(10,this,this._createShim);if(!this.shim){var b=this.get("node");this.get("useShim")&&(b=a.Node.create('<div id="'+this.get(c).get("id")+'_shim"></div>'),b.setStyles({height:this.get(c).get("offsetHeight")+"px",width:this.get(c).get("offsetWidth")+"px",backgroundColor:"yellow",opacity:".5",zIndex:"1",overflow:"hidden",top:"-900px",left:"-900px",position:"absolute"}),d._pg.appendChild(b),b.on("mouseover",a.bind(this._handleOverEvent,this)),b.on("mouseout",a.bind(this._handleOutEvent,this))),this.shim=b}},_handleTargetOver:function(){d.isOverTarget(this)?(this.get(c).addClass(d.CSS_PREFIX+"-drop-over"),d.activeDrop=this,d.otherDrops[this]=this,this.overTarget?(d.activeDrag.fire("drag:over",{drop:this,drag:d.activeDrag}),this.fire("drop:over",{drop:this,drag:d.activeDrag})):d.activeDrag.get("dragging")&&(this.overTarget=!0,this.fire("drop:enter",{drop:this,drag:d.activeDrag}),d.activeDrag.fire("drag:enter",{drop:this,drag:d.activeDrag}),d.activeDrag.get(c).addClass(d.CSS_PREFIX+"-drag-over"))):this._handleOut()},_handleOverEvent:function(){this.shim.setStyle("zIndex","999"),d._addActiveShim(this)},_handleOutEvent:function(){this.shim.setStyle("zIndex","1"),d._removeActiveShim(this)},_handleOut:function(a){d.isOverTarget(this)&&!a||this.overTarget&&(this.overTarget=!1,a||d._removeActiveShim(this),d.activeDrag&&(this.get(c).removeClass(d.CSS_PREFIX+"-drop-over"),d.activeDrag.get(c).removeClass(d.CSS_PREFIX+"-drag-over"),this.fire("drop:exit",{drop:this,drag:d.activeDrag}),d.activeDrag.fire("drag:exit",{drop:this,drag:d.activeDrag}),delete d.otherDrops[this]))}}),a.DD.Drop=e},"3.14.1",{requires:["dd-drag","dd-ddm-drop"]});
YUI.add("dd-drop-plugin",function(a,b){var c=function(a){a.node=a.host,c.superclass.constructor.apply(this,arguments)};c.NAME="dd-drop-plugin",c.NS="drop",a.extend(c,a.DD.Drop),a.namespace("Plugin"),a.Plugin.Drop=c},"3.14.1",{requires:["dd-drop"]});
YUI.add("dd-delegate",function(a,b){var c=function(){c.superclass.constructor.apply(this,arguments)},d="container",e=a.Node.create("<div>Temp Node</div>");a.extend(c,a.Base,{_bubbleTargets:a.DD.DDM,dd:null,_shimState:null,_handles:null,_onNodeChange:function(a){this.set("dragNode",a.newVal)},_afterDragEnd:function(){a.DD.DDM._noShim=this._shimState,this.set("lastNode",this.dd.get("node")),this.get("lastNode").removeClass(a.DD.DDM.CSS_PREFIX+"-dragging"),this.dd._unprep(),this.dd.set("node",e)},_delMouseDown:function(b){var c=b.currentTarget,d=this.dd,e=c,f=this.get("dragConfig");c.test(this.get("nodes"))&&!c.test(this.get("invalid"))&&(this._shimState=a.DD.DDM._noShim,a.DD.DDM._noShim=!0,this.set("currentNode",c),d.set("node",c),f&&f.dragNode?e=f.dragNode:d.proxy&&(e=a.DD.DDM._proxy),d.set("dragNode",e),d._prep(),d.fire("drag:mouseDown",{ev:b}))},_onMouseEnter:function(){this._shimState=a.DD.DDM._noShim,a.DD.DDM._noShim=!0},_onMouseLeave:function(){a.DD.DDM._noShim=this._shimState},initializer:function(){this._handles=[];var b=this.get("dragConfig")||{},c=this.get(d);b.node=e.cloneNode(!0),b.bubbleTargets=this,this.get("handles")&&(b.handles=this.get("handles")),this.dd=new a.DD.Drag(b),this.dd.after("drag:end",a.bind(this._afterDragEnd,this)),this.dd.on("dragNodeChange",a.bind(this._onNodeChange,this)),this.dd.after("drag:mouseup",function(){this._unprep()}),this._handles.push(a.delegate(a.DD.Drag.START_EVENT,a.bind(this._delMouseDown,this),c,this.get("nodes"))),this._handles.push(a.on("mouseenter",a.bind(this._onMouseEnter,this),c)),this._handles.push(a.on("mouseleave",a.bind(this._onMouseLeave,this),c)),a.later(50,this,this.syncTargets),a.DD.DDM.regDelegate(this)},syncTargets:function(){if(a.Plugin.Drop&&!this.get("destroyed")){var b,c,e;return this.get("target")&&(b=a.one(this.get(d)).all(this.get("nodes")),c=this.dd.get("groups"),e=this.get("dragConfig"),e&&e.groups&&(c=e.groups),b.each(function(a){this.createDrop(a,c)},this)),this}},createDrop:function(b,c){var d={useShim:!1,bubbleTargets:this};return b.drop||b.plug(a.Plugin.Drop,d),b.drop.set("groups",c),b},destructor:function(){if(this.dd&&this.dd.destroy(),a.Plugin.Drop){a.one(this.get(d)).all(this.get("nodes")).unplug(a.Plugin.Drop)}a.Array.each(this._handles,function(a){a.detach()})}},{NAME:"delegate",ATTRS:{container:{value:"body"},nodes:{value:".dd-draggable"},invalid:{value:"input, select, button, a, textarea"},lastNode:{value:e},currentNode:{value:e},dragNode:{value:e},over:{value:!1},target:{value:!1},dragConfig:{value:null},handles:{value:null}}}),a.mix(a.DD.DDM,{_delegates:[],regDelegate:function(a){this._delegates.push(a)},getDelegate:function(b){var c=null;return b=a.one(b),a.Array.each(this._delegates,function(a){b.test(a.get(d))&&(c=a)},this),c}}),a.namespace("DD"),a.DD.Delegate=c},"3.14.1",{requires:["dd-drag","dd-drop-plugin","event-mouseenter"]});
YUI.add("resize-base",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}var d=a.Lang,e=d.isArray,f=d.isBoolean,g=d.isNumber,h=d.isString,i=a.Array,j=d.trim,k=i.indexOf,l="resize",m="wrapper",n=function(){return Array.prototype.slice.call(arguments).join(" ")},o=function(a){return Math.round(parseFloat(a))||0},p=function(a,b){return a.getComputedStyle(b)},q=function(a){return"handle"+a.toUpperCase()},r=function(b){return b instanceof a.Node},s=a.cached(function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),t=a.cached(function(){var a=[],b=i(arguments,0,!0);return i.each(b,function(b,c){c>0&&(b=s(b)),a.push(b)}),a.join("")}),u=a.ClassNameManager.getClassName,v=u(l),w=u(l,"handle"),x=u(l,"handle","active"),y=u(l,"handle","inner"),z=u(l,"handle","inner","{handle}"),A=u(l,"handle","{handle}"),B=u(l,"hidden","handles"),C=u(l,"handles",m),D=u(l,m);a.mix(c,{NAME:l,ATTRS:{activeHandle:{value:null,validator:function(b){return a.Lang.isString(b)||a.Lang.isNull(b)}},activeHandleNode:{value:null,validator:r},autoHide:{value:!1,validator:f},defMinHeight:{value:15,validator:g},defMinWidth:{value:15,validator:g},handles:{setter:"_setHandles",value:"all"},handlesWrapper:{readOnly:!0,setter:a.one,valueFn:"_valueHandlesWrapper"},node:{setter:a.one},resizing:{value:!1,validator:f},wrap:{setter:"_setWrap",value:!1,validator:f},wrapTypes:{readOnly:!0,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:!0,valueFn:"_valueWrapper",writeOnce:!0}},RULES:{b:function(a,b,c){var d=a.info,e=a.originalInfo;d.offsetHeight=e.offsetHeight+c},l:function(a,b){var c=a.info,d=a.originalInfo;c.left=d.left+b,c.offsetWidth=d.offsetWidth-b},r:function(a,b){var c=a.info,d=a.originalInfo;c.offsetWidth=d.offsetWidth+b},t:function(a,b,c){var d=a.info,e=a.originalInfo;d.top=e.top+c,d.offsetHeight=e.offsetHeight-c},tr:function(){this.t.apply(this,arguments),this.r.apply(this,arguments)},bl:function(){this.b.apply(this,arguments),this.l.apply(this,arguments)},br:function(){this.b.apply(this,arguments),this.r.apply(this,arguments)},tl:function(){this.t.apply(this,arguments),this.l.apply(this,arguments)}},capitalize:t}),a.Resize=a.extend(c,a.Base,{ALL_HANDLES:["t","tr","r","br","b","bl","l","tl"],REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,HANDLES_WRAP_TEMPLATE:'<div class="'+C+'"></div>',WRAP_TEMPLATE:'<div class="'+D+'"></div>',HANDLE_TEMPLATE:'<div class="'+n(w,A)+'"><div class="'+n(y,z)+'">&nbsp;</div></div>',totalHSurrounding:0,totalVSurrounding:0,nodeSurrounding:null,wrapperSurrounding:null,changeHeightHandles:!1,changeLeftHandles:!1,changeTopHandles:!1,changeWidthHandles:!1,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){this._eventHandles=[],this.renderer()},renderUI:function(){this._renderHandles()},bindUI:function(){var a=this;a._createEvents(),a._bindDD(),a._bindHandle()},syncUI:function(){var a=this;this.get("node").addClass(v),a._setHideHandlesUI(a.get("autoHide"))},destructor:function(){var b=this,c=b.get("node"),d=b.get(m),e=d.get("parentNode");a.each(b._eventHandles,function(a){a.detach()}),b._eventHandles.length=0,b.eachHandle(function(a){b.delegate.dd.destroy(),a.remove(!0)}),b.delegate.destroy(),b.get("wrap")&&(b._copyStyles(d,c),e&&e.insertBefore(c,d),d.remove(!0)),c.removeClass(v),c.removeClass(B)},renderer:function(){this.renderUI(),this.bindUI(),this.syncUI()},eachHandle:function(b){var c=this;a.each(c.get("handles"),function(a,d){var e=c.get(q(a));b.apply(c,[e,a,d])})},_bindDD:function(){var b=this;b.delegate=new a.DD.Delegate({bubbleTargets:b,container:b.get("handlesWrapper"),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:!0,move:!1},nodes:"."+w,target:!1}),b._eventHandles.push(b.on("drag:drag",b._handleResizeEvent),b.on("drag:dropmiss",b._handleMouseUpEvent),b.on("drag:end",b._handleResizeEndEvent),b.on("drag:start",b._handleResizeStartEvent))},_bindHandle:function(){var b=this,c=b.get(m);b._eventHandles.push(c.on("mouseenter",a.bind(b._onWrapperMouseEnter,b)),c.on("mouseleave",a.bind(b._onWrapperMouseLeave,b)),c.delegate("mouseenter",a.bind(b._onHandleMouseEnter,b),"."+w),c.delegate("mouseleave",a.bind(b._onHandleMouseLeave,b),"."+w))},_createEvents:function(){var a=this,b=function(b,c){a.publish(b,{defaultFn:c,queuable:!1,emitFacade:!0,bubbles:!0,prefix:l})};b("resize:start",this._defResizeStartFn),b("resize:resize",this._defResizeFn),b("resize:align",this._defResizeAlignFn),b("resize:end",this._defResizeEndFn),b("resize:mouseUp",this._defMouseUpFn)},_renderHandles:function(){var a=this,b=a.get(m),c=a.get("handlesWrapper");a.eachHandle(function(a){c.append(a)}),b.append(c)},_buildHandle:function(b){var c=this;return a.Node.create(a.Lang.sub(c.HANDLE_TEMPLATE,{handle:b}))},_calcResize:function(){var b=this,c=b.handle,d=b.info,e=b.originalInfo,f=d.actXY[0]-e.actXY[0],g=d.actXY[1]-e.actXY[1];c&&a.Resize.RULES[c]&&a.Resize.RULES[c](b,f,g)},_checkSize:function(a,b){var c=this,d=c.info,e=c.originalInfo,f="offsetHeight"===a?"top":"left";d[a]=b,("left"===f&&c.changeLeftHandles||"top"===f&&c.changeTopHandles)&&(d[f]=e[f]+e[a]-b)},_copyStyles:function(b,c){var d,e=b.getStyle("position").toLowerCase(),f=this._getBoxSurroundingInfo(b);"static"===e&&(e="relative"),d={position:e,left:p(b,"left"),top:p(b,"top")},a.mix(d,f.margin),a.mix(d,f.border),c.setStyles(d),b.setStyles({border:0,margin:0}),c.sizeTo(b.get("offsetWidth")+f.totalHBorder,b.get("offsetHeight")+f.totalVBorder)},_extractHandleName:a.cached(function(a){var b=a.get("className"),c=b.match(new RegExp(u(l,"handle","(\\w{1,2})\\b")));return c?c[1]:null}),_getInfo:function(a,b){var c=[0,0],d=b.dragEvent.target,e=a.getXY(),f=e[0],g=e[1],h=a.get("offsetHeight"),i=a.get("offsetWidth");return b&&(c=d.actXY.length?d.actXY:d.lastXY),{actXY:c,bottom:g+h,left:f,offsetHeight:h,offsetWidth:i,right:f+i,top:g}},_getBoxSurroundingInfo:function(b){var c={padding:{},margin:{},border:{}};return r(b)&&a.each(["top","right","bottom","left"],function(a){var d=t("padding",a),e=t("margin",a),f=t("border",a,"width"),g=t("border",a,"color"),h=t("border",a,"style");c.border[g]=p(b,g),c.border[h]=p(b,h),c.border[f]=p(b,f),c.margin[e]=p(b,e),c.padding[d]=p(b,d)}),c.totalHBorder=o(c.border.borderLeftWidth)+o(c.border.borderRightWidth),c.totalHPadding=o(c.padding.paddingLeft)+o(c.padding.paddingRight),c.totalVBorder=o(c.border.borderBottomWidth)+o(c.border.borderTopWidth),c.totalVPadding=o(c.padding.paddingBottom)+o(c.padding.paddingTop),c},_syncUI:function(){var b=this,c=b.info,d=b.wrapperSurrounding,e=b.get(m),f=b.get("node");e.sizeTo(c.offsetWidth,c.offsetHeight),(b.changeLeftHandles||b.changeTopHandles)&&e.setXY([c.left,c.top]),e.compareTo(f)||f.sizeTo(c.offsetWidth-d.totalHBorder,c.offsetHeight-d.totalVBorder),a.UA.webkit&&f.setStyle(l,"none")},_updateChangeHandleInfo:function(a){var b=this;b.changeHeightHandles=b.REGEX_CHANGE_HEIGHT.test(a),b.changeLeftHandles=b.REGEX_CHANGE_LEFT.test(a),b.changeTopHandles=b.REGEX_CHANGE_TOP.test(a),b.changeWidthHandles=b.REGEX_CHANGE_WIDTH.test(a)},_updateInfo:function(a){var b=this;b.info=b._getInfo(b.get(m),a)},_updateSurroundingInfo:function(){var a=this,b=a.get("node"),c=a.get(m),d=a._getBoxSurroundingInfo(b),e=a._getBoxSurroundingInfo(c);a.nodeSurrounding=d,a.wrapperSurrounding=e,a.totalVSurrounding=d.totalVPadding+e.totalVBorder,a.totalHSurrounding=d.totalHPadding+e.totalHBorder},_setActiveHandlesUI:function(a){var b=this,c=b.get("activeHandleNode");c&&(a?(b.eachHandle(function(a){a.removeClass(x)}),c.addClass(x)):c.removeClass(x))},_setHandles:function(b){var c=this,d=[];return e(b)?d=b:h(b)&&("all"===b.toLowerCase()?d=c.ALL_HANDLES:a.each(b.split(","),function(a){var b=j(a);k(c.ALL_HANDLES,b)>-1&&d.push(b)})),d},_setHideHandlesUI:function(a){var b=this,c=b.get(m);b.get("resizing")||(a?c.addClass(B):c.removeClass(B))},_setWrap:function(a){var b=this,c=b.get("node"),d=c.get("nodeName");return b.get("wrapTypes").test(d)&&(a=!0),a},_defMouseUpFn:function(){this.set("resizing",!1)},_defResizeFn:function(a){this._resize(a)},_resize:function(a){var b=this;b._handleResizeAlignEvent(a.dragEvent),b._syncUI()},_defResizeAlignFn:function(a){this._resizeAlign(a)},_resizeAlign:function(a){var b,c,d,e=this;e.lastInfo=e.info,e._updateInfo(a),b=e.info,e._calcResize(),e.con||(c=e.get("defMinHeight")+e.totalVSurrounding,d=e.get("defMinWidth")+e.totalHSurrounding,b.offsetHeight<=c&&e._checkSize("offsetHeight",c),b.offsetWidth<=d&&e._checkSize("offsetWidth",d))},_defResizeEndFn:function(a){this._resizeEnd(a)},_resizeEnd:function(a){var b=this;a.dragEvent.target.actXY=[],b._syncUI(),b._setActiveHandlesUI(!1),b.set("activeHandle",null),b.set("activeHandleNode",null),b.handle=null},_defResizeStartFn:function(a){this._resizeStart(a)},_resizeStart:function(a){var b=this,c=b.get(m);b.handle=b.get("activeHandle"),b.set("resizing",!0),b._updateSurroundingInfo(),b.originalInfo=b._getInfo(c,a),b._updateInfo(a)},_handleMouseUpEvent:function(a){this.fire("resize:mouseUp",{dragEvent:a,info:this.info})},_handleResizeEvent:function(a){this.fire("resize:resize",{dragEvent:a,info:this.info})},_handleResizeAlignEvent:function(a){this.fire("resize:align",{dragEvent:a,info:this.info})},_handleResizeEndEvent:function(a){this.fire("resize:end",{dragEvent:a,info:this.info})},_handleResizeStartEvent:function(a){this.get("activeHandle")||this._setHandleFromNode(a.target.get("node")),this.fire("resize:start",{dragEvent:a,info:this.info})},_onWrapperMouseEnter:function(){var a=this;a.get("autoHide")&&a._setHideHandlesUI(!1)},_onWrapperMouseLeave:function(){var a=this;a.get("autoHide")&&a._setHideHandlesUI(!0)},_setHandleFromNode:function(a){var b=this,c=b._extractHandleName(a);b.get("resizing")||(b.set("activeHandle",c),b.set("activeHandleNode",a),b._setActiveHandlesUI(!0),b._updateChangeHandleInfo(c))},_onHandleMouseEnter:function(a){this._setHandleFromNode(a.currentTarget)},_onHandleMouseLeave:function(){var a=this;a.get("resizing")||a._setActiveHandlesUI(!1)},_valueHandlesWrapper:function(){return a.Node.create(this.HANDLES_WRAP_TEMPLATE)},_valueWrapper:function(){var b=this,c=b.get("node"),d=c.get("parentNode"),e=c;return b.get("wrap")&&(e=a.Node.create(b.WRAP_TEMPLATE),d&&d.insertBefore(e,c),e.append(c),b._copyStyles(c,e),c.setStyles({position:"static",left:0,top:0})),e}}),a.each(a.Resize.prototype.ALL_HANDLES,function(b){a.Resize.ATTRS[q(b)]={setter:function(){return this._buildHandle(b)},value:null,writeOnce:!0}})},"3.14.1",{requires:["base","widget","event","oop","dd-drag","dd-delegate","dd-drop"],skinnable:!0});
YUI.add("resize-proxy",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}var d=a.ClassNameManager.getClassName,e=d("resize","proxy");a.mix(c,{NAME:"resize-proxy",NS:"proxy",ATTRS:{proxyNode:{setter:a.one,valueFn:function(){return a.Node.create(this.PROXY_TEMPLATE)}}}}),a.extend(c,a.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+e+'"></div>',initializer:function(){var a=this;a.afterHostEvent("resize:start",a._afterResizeStart),a.beforeHostMethod("_resize",a._beforeHostResize),a.afterHostMethod("_resizeEnd",a._afterHostResizeEnd)},destructor:function(){this.get("proxyNode").remove(!0)},_afterHostResizeEnd:function(a){var b=this;a.dragEvent.target.actXY=[],b._syncProxyUI(),b.get("proxyNode").hide()},_afterResizeStart:function(){this._renderProxy()},_beforeHostResize:function(b){var c=this;return this.get("host")._handleResizeAlignEvent(b.dragEvent),c._syncProxyUI(),new a.Do.Prevent},_renderProxy:function(){var a=this,b=this.get("host"),c=a.get("proxyNode");c.inDoc()||b.get("wrapper").get("parentNode").append(c.hide())},_syncProxyUI:function(){var a=this,b=this.get("host"),c=b.info,d=b.get("activeHandleNode"),e=a.get("proxyNode"),f=d.getStyle("cursor");e.show().setStyle("cursor",f),b.delegate.dd.set("dragCursor",f),e.sizeTo(c.offsetWidth,c.offsetHeight),e.setXY([c.left,c.top])}}),a.namespace("Plugin"),a.Plugin.ResizeProxy=c},"3.14.1",{requires:["plugin","resize-base"]});
YUI.add("resize-constrain",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}var d=a.Lang,e=d.isBoolean,f=d.isNumber,g=d.isString,h=a.Resize.capitalize,i=function(b){return b instanceof a.Node},j=function(a){return parseFloat(a)||0},k="host";a.mix(c,{NAME:"resizeConstrained",NS:"con",ATTRS:{constrain:{setter:function(b){return b&&(i(b)||g(b)||b.nodeType)&&(b=a.one(b)),b}},minHeight:{value:15,validator:f},minWidth:{value:15,validator:f},maxHeight:{value:1/0,validator:f},maxWidth:{value:1/0,validator:f},preserveRatio:{value:!1,validator:e},tickX:{value:!1},tickY:{value:!1}}}),a.extend(c,a.Plugin.Base,{constrainSurrounding:null,initializer:function(){var b=this,c=b.get(k);c.delegate.dd.plug(a.Plugin.DDConstrained,{tickX:b.get("tickX"),tickY:b.get("tickY")}),c.after("resize:align",a.bind(b._handleResizeAlignEvent,b)),c.on("resize:start",a.bind(b._handleResizeStartEvent,b))},_checkConstrain:function(a,b,c){var d,e,f,g,i=this,l=i.get(k),m=l.info,n=i.constrainSurrounding.border,o=i._getConstrainRegion();o&&(d=m[a]+m[c],e=o[b]-j(n[h("border",b,"width")]),d>=e&&(m[c]-=d-e),f=m[a],g=o[a]+j(n[h("border",a,"width")]),f<=g&&(m[a]+=g-f,m[c]-=g-f))},_checkHeight:function(){var a=this,b=a.get(k),c=b.info,d=a.get("maxHeight")+b.totalVSurrounding,e=a.get("minHeight")+b.totalVSurrounding;a._checkConstrain("top","bottom","offsetHeight"),c.offsetHeight>d&&b._checkSize("offsetHeight",d),c.offsetHeight<e&&b._checkSize("offsetHeight",e)},_checkRatio:function(){var b,c,d,e,g,h,i=this,l=i.get(k),m=l.info,n=l.originalInfo,o=n.offsetWidth,p=n.offsetHeight,q=n.top,r=n.left,s=n.bottom,t=n.right,u=function(){return m.offsetWidth/o},v=function(){return m.offsetHeight/p},w=l.changeHeightHandles;i.get("constrain")&&l.changeHeightHandles&&l.changeWidthHandles&&(d=i._getConstrainRegion(),c=i.constrainSurrounding.border,b=d.bottom-j(c.borderBottomWidth)-s,e=r-(d.left+j(c.borderLeftWidth)),g=d.right-j(c.borderRightWidth)-t,h=q-(d.top+j(c.borderTopWidth)),w=l.changeLeftHandles&&l.changeTopHandles?h<e:l.changeLeftHandles?b<e:l.changeTopHandles?h<g:b<g),w?(m.offsetWidth=o*v(),i._checkWidth(),m.offsetHeight=p*u()):(m.offsetHeight=p*u(),i._checkHeight(),m.offsetWidth=o*v()),l.changeTopHandles&&(m.top=q+(p-m.offsetHeight)),l.changeLeftHandles&&(m.left=r+(o-m.offsetWidth)),a.each(m,function(a,b){f(a)&&(m[b]=Math.round(a))})},_checkRegion:function(){var b=this,c=b.get(k),d=b._getConstrainRegion();return a.DOM.inRegion(null,d,!0,c.info)},_checkWidth:function(){var a=this,b=a.get(k),c=b.info,d=a.get("maxWidth")+b.totalHSurrounding,e=a.get("minWidth")+b.totalHSurrounding;a._checkConstrain("left","right","offsetWidth"),c.offsetWidth<e&&b._checkSize("offsetWidth",e),c.offsetWidth>d&&b._checkSize("offsetWidth",d)},_getConstrainRegion:function(){var a=this,b=a.get(k),c=b.get("node"),d=a.get("constrain"),e=null;return d&&(e="view"===d?c.get("viewportRegion"):i(d)?d.get("region"):d),e},_handleResizeAlignEvent:function(){var a=this,b=a.get(k);a._checkHeight(),a._checkWidth(),a.get("preserveRatio")&&a._checkRatio(),a.get("constrain")&&!a._checkRegion()&&(b.info=b.lastInfo)},_handleResizeStartEvent:function(){var a=this,b=a.get("constrain"),c=a.get(k);a.constrainSurrounding=c._getBoxSurroundingInfo(b)}}),a.namespace("Plugin"),a.Plugin.ResizeConstrained=c},"3.14.1",{requires:["plugin","resize-base"]});
