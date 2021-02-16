YUI.add("yui-throttle",function(a,b){a.throttle=function(b,c){if(-1===(c=c||(a.config.throttleTime||150)))return function(){b.apply(this,arguments)};var d=a.Lang.now();return function(){var e=a.Lang.now();e-d>c&&(d=e,b.apply(this,arguments))}}},"3.14.1",{requires:["yui-base"]});
YUI.add("dd-ddm-base",function(a,b){var c=function(){c.superclass.constructor.apply(this,arguments)};c.NAME="ddm",c.ATTRS={dragCursor:{value:"move"},clickPixelThresh:{value:3},clickTimeThresh:{value:1e3},throttleTime:{value:-1},dragMode:{value:"point",setter:function(a){return this._setDragMode(a),a}}},a.extend(c,a.Base,{_createPG:function(){},_active:null,_setDragMode:function(b){switch(null===b&&(b=a.DD.DDM.get("dragMode")),b){case 1:case"intersect":return 1;case 2:case"strict":return 2;case 0:case"point":return 0}return 0},CSS_PREFIX:a.ClassNameManager.getClassName("dd"),_activateTargets:function(){},_drags:[],activeDrag:!1,_regDrag:function(a){return!this.getDrag(a.get("node"))&&(this._active||this._setupListeners(),this._drags.push(a),!0)},_unregDrag:function(b){var c=[];a.Array.each(this._drags,function(a){a!==b&&(c[c.length]=a)}),this._drags=c},_setupListeners:function(){this._createPG(),this._active=!0;var b=a.one(a.config.doc);b.on("mousemove",a.throttle(a.bind(this._docMove,this),this.get("throttleTime"))),b.on("mouseup",a.bind(this._end,this))},_start:function(){this.fire("ddm:start"),this._startDrag()},_startDrag:function(){},_endDrag:function(){},_dropMove:function(){},_end:function(){this.activeDrag&&(this._shimming=!1,this._endDrag(),this.fire("ddm:end"),this.activeDrag.end.call(this.activeDrag),this.activeDrag=null)},stopDrag:function(){return this.activeDrag&&this._end(),this},_shimming:!1,_docMove:function(a){this._shimming||this._move(a)},_move:function(a){this.activeDrag&&(this.activeDrag._move.call(this.activeDrag,a),this._dropMove())},cssSizestoObject:function(a){var b=a.split(" ");switch(b.length){case 1:b[1]=b[2]=b[3]=b[0];break;case 2:b[2]=b[0],b[3]=b[1];break;case 3:b[3]=b[1]}return{top:parseInt(b[0],10),right:parseInt(b[1],10),bottom:parseInt(b[2],10),left:parseInt(b[3],10)}},getDrag:function(b){var c=!1,d=a.one(b);return d instanceof a.Node&&a.Array.each(this._drags,function(a){d.compareTo(a.get("node"))&&(c=a)}),c},swapPosition:function(b,c){b=a.DD.DDM.getNode(b),c=a.DD.DDM.getNode(c);var d=b.getXY(),e=c.getXY();return b.setXY(e),c.setXY(d),b},getNode:function(b){return b instanceof a.Node?b:b=b&&b.get?a.Widget&&b instanceof a.Widget?b.get("boundingBox"):b.get("node"):a.one(b)},swapNode:function(b,c){b=a.DD.DDM.getNode(b),c=a.DD.DDM.getNode(c);var d=c.get("parentNode"),e=c.get("nextSibling");return e===b?d.insertBefore(b,c):c===b.get("nextSibling")?d.insertBefore(c,b):(b.get("parentNode").replaceChild(c,b),d.insertBefore(b,e)),b}}),a.namespace("DD"),a.DD.DDM=new c},"3.14.1",{requires:["node","base","yui-throttle","classnamemanager"]});
YUI.add("dd-drag",function(a,b){var c=a.DD.DDM,d="node",e=function(b){this._lazyAddAttrs=!1,e.superclass.constructor.apply(this,arguments),c._regDrag(this)||a.error("Failed to register node, already in use: "+b.node)};e.NAME="drag",e.START_EVENT="mousedown",e.ATTRS={node:{setter:function(b){if(this._canDrag(b))return b;var c=a.one(b);return c||a.error("DD.Drag: Invalid Node Given: "+b),c}},dragNode:{setter:function(b){if(this._canDrag(b))return b;var c=a.one(b);return c||a.error("DD.Drag: Invalid dragNode Given: "+b),c}},offsetNode:{value:!0},startCentered:{value:!1},clickPixelThresh:{value:c.get("clickPixelThresh")},clickTimeThresh:{value:c.get("clickTimeThresh")},lock:{value:!1,setter:function(a){return a?this.get(d).addClass(c.CSS_PREFIX+"-locked"):this.get(d).removeClass(c.CSS_PREFIX+"-locked"),a}},data:{value:!1},move:{value:!0},useShim:{value:!0},activeHandle:{value:!1},primaryButtonOnly:{value:!0},dragging:{value:!1},parent:{value:!1},target:{value:!1,setter:function(a){return this._handleTarget(a),a}},dragMode:{value:null,setter:function(a){return c._setDragMode(a)}},groups:{value:["default"],getter:function(){return this._groups?a.Object.keys(this._groups):(this._groups={},[])},setter:function(b){return this._groups=a.Array.hash(b),b}},handles:{value:null,setter:function(b){return b?(this._handles={},a.Array.each(b,function(b){var c=b;(b instanceof a.Node||b instanceof a.NodeList)&&(c=b._yuid),this._handles[c]=b},this)):this._handles=null,b}},bubbles:{setter:function(a){return this.addTarget(a),a}},haltDown:{value:!0}},a.extend(e,a.Base,{_canDrag:function(a){return!!(a&&a.setXY&&a.getXY&&a.test&&a.contains)},_bubbleTargets:a.DD.DDM,addToGroup:function(a){return this._groups[a]=!0,c._activateTargets(),this},removeFromGroup:function(a){return delete this._groups[a],c._activateTargets(),this},target:null,_handleTarget:function(b){a.DD.Drop&&(!1===b?this.target&&(c._unregTarget(this.target),this.target=null):(a.Lang.isObject(b)||(b={}),b.bubbleTargets=b.bubbleTargets||this.getTargets(),b.node=this.get(d),b.groups=b.groups||this.get("groups"),this.target=new a.DD.Drop(b)))},_groups:null,_createEvents:function(){this.publish("drag:mouseDown",{defaultFn:this._defMouseDownFn,queuable:!1,emitFacade:!0,bubbles:!0,prefix:"drag"}),this.publish("drag:align",{defaultFn:this._defAlignFn,queuable:!1,emitFacade:!0,bubbles:!0,prefix:"drag"}),this.publish("drag:drag",{defaultFn:this._defDragFn,queuable:!1,emitFacade:!0,bubbles:!0,prefix:"drag"}),this.publish("drag:end",{defaultFn:this._defEndFn,preventedFn:this._prevEndFn,queuable:!1,emitFacade:!0,bubbles:!0,prefix:"drag"});var b=["drag:afterMouseDown","drag:removeHandle","drag:addHandle","drag:removeInvalid","drag:addInvalid","drag:start","drag:drophit","drag:dropmiss","drag:over","drag:enter","drag:exit"];a.Array.each(b,function(a){this.publish(a,{type:a,emitFacade:!0,bubbles:!0,preventable:!1,queuable:!1,prefix:"drag"})},this)},_ev_md:null,_startTime:null,_endTime:null,_handles:null,_invalids:null,_invalidsDefault:{textarea:!0,input:!0,a:!0,button:!0,select:!0},_dragThreshMet:null,_fromTimeout:null,_clickTimeout:null,deltaXY:null,startXY:null,nodeXY:null,lastXY:null,actXY:null,realXY:null,mouseXY:null,region:null,_handleMouseUp:function(){this.fire("drag:mouseup"),this._fixIEMouseUp(),c.activeDrag&&c._end()},_fixDragStart:function(a){this.validClick(a)&&a.preventDefault()},_ieSelectFix:function(){return!1},_ieSelectBack:null,_fixIEMouseDown:function(){a.UA.ie&&(this._ieSelectBack=a.config.doc.body.onselectstart,a.config.doc.body.onselectstart=this._ieSelectFix)},_fixIEMouseUp:function(){a.UA.ie&&(a.config.doc.body.onselectstart=this._ieSelectBack)},_handleMouseDownEvent:function(a){this.fire("drag:mouseDown",{ev:a})},_defMouseDownFn:function(b){var d=b.ev;if(this._dragThreshMet=!1,this._ev_md=d,this.get("primaryButtonOnly")&&d.button>1)return!1;this.validClick(d)&&(this._fixIEMouseDown(d),0!==e.START_EVENT.indexOf("gesture")&&(this.get("haltDown")?d.halt():d.preventDefault()),this._setStartPosition([d.pageX,d.pageY]),c.activeDrag=this,this._clickTimeout=a.later(this.get("clickTimeThresh"),this,this._timeoutCheck)),this.fire("drag:afterMouseDown",{ev:d})},validClick:function(b){var c=!1,e=!1,f=b.target,g=null,h=null,i=null,j=!1;return this._handles?a.Object.each(this._handles,function(b,d){b instanceof a.Node||b instanceof a.NodeList?c||(i=b,i instanceof a.Node&&(i=new a.NodeList(b._node)),i.each(function(a){a.contains(f)&&(c=!0)})):a.Lang.isString(d)&&f.test(d+", "+d+" *")&&!g&&(g=d,c=!0)}):(e=this.get(d),(e.contains(f)||e.compareTo(f))&&(c=!0)),c&&this._invalids&&a.Object.each(this._invalids,function(b,d){a.Lang.isString(d)&&f.test(d+", "+d+" *")&&(c=!1)}),c&&(g?(h=b.currentTarget.all(g),j=!1,h.each(function(a){!a.contains(f)&&!a.compareTo(f)||j||(j=!0,this.set("activeHandle",a))},this)):this.set("activeHandle",this.get(d))),c},_setStartPosition:function(a){this.startXY=a,this.nodeXY=this.lastXY=this.realXY=this.get(d).getXY(),this.get("offsetNode")?this.deltaXY=[this.startXY[0]-this.nodeXY[0],this.startXY[1]-this.nodeXY[1]]:this.deltaXY=[0,0]},_timeoutCheck:function(){this.get("lock")||this._dragThreshMet||!this._ev_md||(this._fromTimeout=this._dragThreshMet=!0,this.start(),this._alignNode([this._ev_md.pageX,this._ev_md.pageY],!0))},removeHandle:function(b){var c=b;return(b instanceof a.Node||b instanceof a.NodeList)&&(c=b._yuid),this._handles[c]&&(delete this._handles[c],this.fire("drag:removeHandle",{handle:b})),this},addHandle:function(b){this._handles||(this._handles={});var c=b;return(b instanceof a.Node||b instanceof a.NodeList)&&(c=b._yuid),this._handles[c]=b,this.fire("drag:addHandle",{handle:b}),this},removeInvalid:function(a){return this._invalids[a]&&(this._invalids[a]=null,delete this._invalids[a],this.fire("drag:removeInvalid",{handle:a})),this},addInvalid:function(b){return a.Lang.isString(b)&&(this._invalids[b]=!0,this.fire("drag:addInvalid",{handle:b})),this},initializer:function(){if(this.get(d).dd=this,!this.get(d).get("id")){var b=a.stamp(this.get(d));this.get(d).set("id",b)}this.actXY=[],this._invalids=a.clone(this._invalidsDefault,!0),this._createEvents(),this.get("dragNode")||this.set("dragNode",this.get(d)),this.on("initializedChange",a.bind(this._prep,this)),this.set("groups",this.get("groups"))},_prep:function(){this._dragThreshMet=!1;var b=this.get(d);b.addClass(c.CSS_PREFIX+"-draggable"),b.on(e.START_EVENT,a.bind(this._handleMouseDownEvent,this)),b.on("mouseup",a.bind(this._handleMouseUp,this)),b.on("dragstart",a.bind(this._fixDragStart,this))},_unprep:function(){var a=this.get(d);a.removeClass(c.CSS_PREFIX+"-draggable"),a.detachAll("mouseup"),a.detachAll("dragstart"),a.detachAll(e.START_EVENT),this.mouseXY=[],this.deltaXY=[0,0],this.startXY=[],this.nodeXY=[],this.lastXY=[],this.actXY=[],this.realXY=[]},start:function(){if(!this.get("lock")&&!this.get("dragging")){var a,b,e,f=this.get(d);this._startTime=(new Date).getTime(),c._start(),f.addClass(c.CSS_PREFIX+"-dragging"),this.fire("drag:start",{pageX:this.nodeXY[0],pageY:this.nodeXY[1],startTime:this._startTime}),f=this.get("dragNode"),e=this.nodeXY,a=f.get("offsetWidth"),b=f.get("offsetHeight"),this.get("startCentered")&&this._setStartPosition([e[0]+a/2,e[1]+b/2]),this.region={0:e[0],1:e[1],area:0,top:e[1],right:e[0]+a,bottom:e[1]+b,left:e[0]},this.set("dragging",!0)}return this},end:function(){return this._endTime=(new Date).getTime(),this._clickTimeout&&this._clickTimeout.cancel(),this._dragThreshMet=this._fromTimeout=!1,!this.get("lock")&&this.get("dragging")&&this.fire("drag:end",{pageX:this.lastXY[0],pageY:this.lastXY[1],startTime:this._startTime,endTime:this._endTime}),this.get(d).removeClass(c.CSS_PREFIX+"-dragging"),this.set("dragging",!1),this.deltaXY=[0,0],this},_defEndFn:function(){this._fixIEMouseUp(),this._ev_md=null},_prevEndFn:function(){this._fixIEMouseUp(),this.get("dragNode").setXY(this.nodeXY),this._ev_md=null,this.region=null},_align:function(a){this.fire("drag:align",{pageX:a[0],pageY:a[1]})},_defAlignFn:function(a){this.actXY=[a.pageX-this.deltaXY[0],a.pageY-this.deltaXY[1]]},_alignNode:function(a,b){this._align(a),b||this._moveNode()},_moveNode:function(a){var b=[],c=[],d=this.nodeXY,e=this.actXY;b[0]=e[0]-this.lastXY[0],b[1]=e[1]-this.lastXY[1],c[0]=e[0]-this.nodeXY[0],c[1]=e[1]-this.nodeXY[1],this.region={0:e[0],1:e[1],area:0,top:e[1],right:e[0]+this.get("dragNode").get("offsetWidth"),bottom:e[1]+this.get("dragNode").get("offsetHeight"),left:e[0]},this.fire("drag:drag",{pageX:e[0],pageY:e[1],scroll:a,info:{start:d,xy:e,delta:b,offset:c}}),this.lastXY=e},_defDragFn:function(b){if(this.get("move")){if(b.scroll&&b.scroll.node){var c=b.scroll.node.getDOMNode();c===a.config.win?c.scrollTo(b.scroll.left,b.scroll.top):(b.scroll.node.set("scrollTop",b.scroll.top),b.scroll.node.set("scrollLeft",b.scroll.left))}this.get("dragNode").setXY([b.pageX,b.pageY]),this.realXY=[b.pageX,b.pageY]}},_move:function(a){if(this.get("lock"))return!1;if(this.mouseXY=[a.pageX,a.pageY],this._dragThreshMet)this._clickTimeout&&this._clickTimeout.cancel(),this._alignNode([a.pageX,a.pageY]);else{var b=Math.abs(this.startXY[0]-a.pageX),c=Math.abs(this.startXY[1]-a.pageY);(b>this.get("clickPixelThresh")||c>this.get("clickPixelThresh"))&&(this._dragThreshMet=!0,this.start(),a&&a.preventDefault&&a.preventDefault(),this._alignNode([a.pageX,a.pageY]))}},stopDrag:function(){return this.get("dragging")&&c._end(),this},destructor:function(){this._unprep(),this.target&&this.target.destroy(),c._unregDrag(this)}}),a.namespace("DD"),a.DD.Drag=e},"3.14.1",{requires:["dd-ddm-base"]});
YUI.add("dd-constrain",function(a,b){var c="host",d=a.DD.DDM,e=null,f=function(){this._lazyAddAttrs=!1,f.superclass.constructor.apply(this,arguments)};f.NAME="ddConstrained",f.NS="con",f.ATTRS={host:{},stickX:{value:!1},stickY:{value:!1},tickX:{value:!1},tickY:{value:!1},tickXArray:{value:!1},tickYArray:{value:!1},gutter:{value:"0",setter:function(b){return a.DD.DDM.cssSizestoObject(b)}},constrain:{value:"view",setter:function(b){var c=a.one(b);return c&&(b=c),b}},constrain2region:{setter:function(a){return this.set("constrain",a)}},constrain2node:{setter:function(b){return this.set("constrain",a.one(b))}},constrain2view:{setter:function(){return this.set("constrain","view")}},cacheRegion:{value:!0}},e={_lastTickXFired:null,_lastTickYFired:null,initializer:function(){this._createEvents(),this._eventHandles=[this.get(c).on("drag:end",a.bind(this._handleEnd,this)),this.get(c).on("drag:start",a.bind(this._handleStart,this)),this.get(c).after("drag:align",a.bind(this.align,this)),this.get(c).after("drag:drag",a.bind(this.drag,this))]},destructor:function(){a.Array.each(this._eventHandles,function(a){a.detach()}),this._eventHandles.length=0},_createEvents:function(){var b=["drag:tickAlignX","drag:tickAlignY"];a.Array.each(b,function(a){this.publish(a,{type:a,emitFacade:!0,bubbles:!0,queuable:!1,prefix:"drag"})},this)},_handleEnd:function(){this._lastTickYFired=null,this._lastTickXFired=null},_handleStart:function(){this.resetCache()},_regionCache:null,_cacheRegion:function(){this._regionCache=this.get("constrain").get("region")},resetCache:function(){this._regionCache=null},_getConstraint:function(){var b,d=this.get("constrain"),e=this.get("gutter");return d&&(d instanceof a.Node?(this._regionCache||(this._eventHandles.push(a.on("resize",a.bind(this._cacheRegion,this),a.config.win)),this._cacheRegion()),b=a.clone(this._regionCache),this.get("cacheRegion")||this.resetCache()):a.Lang.isObject(d)&&(b=a.clone(d))),d&&b||(d="view"),"view"===d&&(b=this.get(c).get("dragNode").get("viewportRegion")),a.Object.each(e,function(a,c){"right"===c||"bottom"===c?b[c]-=a:b[c]+=a}),b},getRegion:function(a){var b={},d=null,e=null,f=this.get(c);return b=this._getConstraint(),a&&(d=f.get("dragNode").get("offsetHeight"),e=f.get("dragNode").get("offsetWidth"),b.right=b.right-e,b.bottom=b.bottom-d),b},_checkRegion:function(a){var b=a,d=this.getRegion(),e=this.get(c),f=e.get("dragNode").get("offsetHeight"),g=e.get("dragNode").get("offsetWidth");return b[1]>d.bottom-f&&(a[1]=d.bottom-f),d.top>b[1]&&(a[1]=d.top),b[0]>d.right-g&&(a[0]=d.right-g),d.left>b[0]&&(a[0]=d.left),a},inRegion:function(a){a=a||this.get(c).get("dragNode").getXY();var b=this._checkRegion([a[0],a[1]]),d=!1;return a[0]===b[0]&&a[1]===b[1]&&(d=!0),d},align:function(){var a=this.get(c),b=[a.actXY[0],a.actXY[1]],d=this.getRegion(!0);this.get("stickX")&&(b[1]=a.startXY[1]-a.deltaXY[1]),this.get("stickY")&&(b[0]=a.startXY[0]-a.deltaXY[0]),d&&(b=this._checkRegion(b)),b=this._checkTicks(b,d),a.actXY=b},drag:function(){var b=this.get(c),d=this.get("tickX"),e=this.get("tickY"),f=[b.actXY[0],b.actXY[1]];(a.Lang.isNumber(d)||this.get("tickXArray"))&&this._lastTickXFired!==f[0]&&(this._tickAlignX(),this._lastTickXFired=f[0]),(a.Lang.isNumber(e)||this.get("tickYArray"))&&this._lastTickYFired!==f[1]&&(this._tickAlignY(),this._lastTickYFired=f[1])},_checkTicks:function(a,b){var e=this.get(c),f=e.startXY[0]-e.deltaXY[0],g=e.startXY[1]-e.deltaXY[1],h=this.get("tickX"),i=this.get("tickY");return h&&!this.get("tickXArray")&&(a[0]=d._calcTicks(a[0],f,h,b.left,b.right)),i&&!this.get("tickYArray")&&(a[1]=d._calcTicks(a[1],g,i,b.top,b.bottom)),this.get("tickXArray")&&(a[0]=d._calcTickArray(a[0],this.get("tickXArray"),b.left,b.right)),this.get("tickYArray")&&(a[1]=d._calcTickArray(a[1],this.get("tickYArray"),b.top,b.bottom)),a},_tickAlignX:function(){this.fire("drag:tickAlignX")},_tickAlignY:function(){this.fire("drag:tickAlignY")}},a.namespace("Plugin"),a.extend(f,a.Base,e),a.Plugin.DDConstrained=f,a.mix(d,{_calcTicks:function(a,b,c,d,e){var f=(a-b)/c,g=Math.floor(f),h=Math.ceil(f);return 0===g&&0===h||f>=g&&f<=h&&(a=b+c*g,d&&e&&(a<d&&(a=b+c*(g+1)),a>e&&(a=b+c*(g-1)))),a},_calcTickArray:function(a,b,c,d){var e,f,g,h=0,i=b.length,j=0;if(!b||0===b.length)return a;if(b[0]>=a)return b[0];for(h=0;h<i;h++)if(j=h+1,b[j]&&b[j]>=a)return e=a-b[h],f=b[j]-a,g=f>e?b[h]:b[j],c&&d&&g>d&&(g=b[h]?b[h]:b[i-1]),g;return b[b.length-1]}})},"3.14.1",{requires:["dd-drag"]});
