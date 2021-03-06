YUI.add("gallery-imagecropper", function (b) {
    var f = b.Lang, j = f.isNumber, g = b.Array, d = b.ClassNameManager.getClassName, i = "imagecropper", c = "resize", h = "mask", a = "knob", e = {cropMask: d(i, h), resizeKnob: d(i, c, a), resizeMask: d(i, c, h)}, k = b.Base.create("imagecropper", b.Widget, [], {CONTENT_TEMPLATE: "<img/>", _toggleKeys: function (l) {
        if (l.newVal) {
            this._bindArrows();
        } else {
            this._unbindArrows();
        }
    }, _moveResizeKnob: function (t) {
        t.preventDefault();
        var C = this.get("resizeKnob"), u = this.get("contentBox"), z = C.get("offsetWidth"), D = C.get("offsetHeight"), s = t.shiftKey ? this.get("shiftKeyTick") : this.get("keyTick"), B = t.direction, v = B.indexOf("w") > -1 ? -s : B.indexOf("e") > -1 ? s : 0, n = B.indexOf("n") > -1 ? -s : B.indexOf("s") > -1 ? s : 0, A = C.getX() + v, w = C.getY() + n, r = u.getX(), q = u.getY(), m = r + u.get("offsetWidth") - z, l = q + u.get("offsetHeight") - D, p;
        if (A < r) {
            A = r;
        } else {
            if (A > m) {
                A = m;
            }
        }
        if (w < q) {
            w = q;
        } else {
            if (w > l) {
                w = l;
            }
        }
        C.setXY([A, w]);
        p = {width: z, height: D, left: C.get("offsetLeft"), top: C.get("offsetTop"), sourceEvent: t.type};
        p[t.type + "Event"] = t;
        this.fire("crop:start", p);
        this.fire("crop:crop", p);
        this.fire("crop:end", p);
        this._syncResizeMask();
    }, _defCropMaskValueFn: function () {
        return b.Node.create(k.CROP_MASK_TEMPLATE);
    }, _defResizeKnobValueFn: function () {
        return b.Node.create(k.RESIZE_KNOB_TEMPLATE);
    }, _defResizeMaskValueFn: function () {
        return b.Node.create(k.RESIZE_MASK_TEMPLATE);
    }, _renderCropMask: function (l) {
        var m = this.get("cropMask");
        if (!m.inDoc()) {
            l.append(m);
        }
    }, _renderResizeKnob: function (l) {
        var m = this.get("resizeKnob");
        if (!m.inDoc()) {
            l.append(m);
        }
        m.setStyle("backgroundImage", "url(" + this.get("source") + ")");
    }, _renderResizeMask: function () {
        var l = this.get("resizeMask");
        if (!l.inDoc()) {
            this.get("resizeKnob").append(l);
        }
    }, _handleSrcChange: function (l) {
        this.get("contentBox").set("src", l.newVal);
        this.get("cropResizeMask").setStyle("backgroundImage", "url(" + l.newVal + ")");
    }, _syncResizeKnob: function () {
        var l = this.get("initialXY");
        this.get("resizeKnob").setStyles({left: l[0], top: l[1], width: this.get("initWidth"), height: this.get("initHeight")});
    }, _syncResizeMask: function () {
        var l = this.get("resizeKnob");
        l.setStyle("backgroundPosition", (-l.get("offsetLeft")) + "px " + (-l.get("offsetTop")) + "px");
    }, _syncResizeAttr: function (l) {
        if (this._resize) {
            this._resize.con.set(l.attrName, l.newVal);
        }
    }, _icEventProxy: function (p, o, n) {
        var m = o + ":" + n, l = this.get("resizeKnob");
        p.on(m, function (q) {
            var r = {width: l.get("offsetWidth"), height: l.get("offsetHeight"), left: l.get("offsetLeft"), top: l.get("offsetTop")};
            r[o + "Event"] = q;
            this.fire(m, r);
            r.sourceEvent = m;
            this.fire("crop:" + (n == o ? "crop" : n), r);
        }, this);
    }, _bindArrows: function () {
        this._arrowHandler = this.get("resizeKnob").on("arrow", this._moveResizeKnob, this);
    }, _unbindArrows: function () {
        if (this._arrowHandler) {
            this._arrowHandler.detach();
        }
    }, _bindResize: function (m, l) {
        var n = this._resize = new b.Resize({node: m});
        n.on("resize:resize", this._syncResizeMask, this);
        n.plug(b.Plugin.ResizeConstrained, {constrain: l, minHeight: this.get("minHeight"), minWidth: this.get("minWidth"), preserveRatio: this.get("preserveRatio")});
        g.each(k.RESIZE_EVENTS, b.bind(this._icEventProxy, this, n, "resize"));
    }, _bindDrag: function (m, l) {
        var n = this._drag = new b.DD.Drag({node: m, handles: [this.get("resizeMask")]});
        n.on("drag:drag", this._syncResizeMask, this);
        n.plug(b.Plugin.DDConstrained, {constrain2node: l});
        g.each(k.DRAG_EVENTS, b.bind(this._icEventProxy, this, n, "drag"));
    }, initializer: function () {
        this.set("initialXY", this.get("initialXY") || [10, 10]);
        this.set("initWidth", this.get("initWidth"));
        this.set("initHeight", this.get("initHeight"));
        this.after("sourceChange", this._handleSrcChange);
        this.after("useKeysChange", this._toggleKeys);
        this._icHandlers = [];
        g.each(k.RESIZE_ATTRS, function (l) {
            this.after(l + "Change", this._syncResizeAttr);
        }, this);
    }, renderUI: function () {
        var l = this.get("boundingBox");
        this._renderCropMask(l);
        this._renderResizeKnob(l);
        this._renderResizeMask();
    }, bindUI: function () {
        var m = this.get("contentBox"), l = this.get("resizeKnob");
        this._icHandlers.push(l.on("focus", this._attachKeyBehavior, this), l.on("blur", this._detachKeyBehavior, this), l.on("mousedown", l.focus, l));
        this._bindArrows();
        this._bindResize(l, m);
        this._bindDrag(l, m);
    }, syncUI: function () {
        this.get("contentBox").set("src", this.get("source"));
        this._syncResizeKnob();
        this._syncResizeMask();
    }, getCropCoords: function () {
        var m = this.get("resizeKnob"), l, n;
        if (m.inDoc()) {
            l = {left: m.get("offsetLeft"), top: m.get("offsetTop"), width: m.get("offsetWidth"), height: m.get("offsetHeight")};
        } else {
            n = this.get("initialXY");
            l = {left: n[0], top: n[1], width: this.get("initWidth"), height: this.get("initHeight")};
        }
        l.image = this.get("source");
        return l;
    }, reset: function () {
        this.get("resizeKnob").setXY(this.get("initialXY")).setStyles({width: this.get("initWidth"), height: this.get("initHeight")});
        this._syncResizeMask();
        return this;
    }, destructor: function () {
        if (this._resize) {
            this._resize.destroy();
        }
        if (this._drag) {
            this._drag.destroy();
        }
        g.each(this._icHandlers, function (l) {
            l.detach();
        });
        this._unbindArrows();
        this._drag = this._resize = null;
    }}, {CROP_MASK_TEMPLATE: '<div class="' + e.cropMask + '"></div>', RESIZE_KNOB_TEMPLATE: '<div class="' + e.resizeKnob + '" tabindex="0"></div>', RESIZE_MASK_TEMPLATE: '<div class="' + e.resizeMask + '"></div>', RESIZE_EVENTS: ["start", "resize", "end"], RESIZE_ATTRS: ["minWidth", "minHeight", "preserveRatio"], DRAG_EVENTS: ["start", "drag", "end"], HTML_PARSER: {source: function (l) {
        return l.get("src");
    }, cropMask: "." + e.cropMask, resizeKnob: "." + e.resizeKnob, resizeMask: "." + e.resizeMask}, ATTRS: {source: {value: ""}, resizeMask: {setter: function (l) {
        l = b.one(l);
        if (l) {
            l.addClass(e.resizeMask);
        }
        return l;
    }, valueFn: "_defResizeMaskValueFn"}, resizeKnob: {setter: function (l) {
        l = b.one(l);
        if (l) {
            l.addClass(e.resizeKnob);
        }
        return l;
    }, valueFn: "_defResizeKnobValueFn"}, cropMask: {setter: function (l) {
        l = b.one(l);
        if (l) {
            l.addClass(e.cropMask);
        }
        return l;
    }, valueFn: "_defCropMaskValueFn"}, initialXY: {validator: f.isArray}, keyTick: {value: 1, validator: j}, shiftKeyTick: {value: 10, validator: j}, useKeys: {value: true, validator: f.isBoolean}, status: {readOnly: true, getter: function () {
        var l = this._resize ? this._resize.get("resizing") : false, m = this._drag ? this._drag.get("dragging") : false;
        return l || m;
    }}, minHeight: {value: 50, validator: j}, minWidth: {value: 50, validator: j}, preserveRatio: {value: false, validator: f.isBoolean}, initHeight: {value: 0, validator: j, setter: function (m) {
        var l = this.get("minHeight");
        return m < l ? l : m;
    }}, initWidth: {value: 0, validator: j, setter: function (m) {
        var l = this.get("minWidth");
        return m < l ? l : m;
    }}}});
    b.ImageCropper = k;
}, "gallery-2011.08.31-20-57", {skinnable: true, requires: ["widget", "resize", "gallery-event-arrow", "dd-constrain"]});

