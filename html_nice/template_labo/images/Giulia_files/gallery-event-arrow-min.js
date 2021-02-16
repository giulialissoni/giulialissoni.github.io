YUI.add("gallery-event-arrow", function (a) {
    a.Event.define("arrow", {_event: (a.UA.webkit || a.UA.ie) ? "keydown" : "keypress", _keys: {37: true, 38: true, 39: true, 40: true}, _directions: {"37": "w", "38": "n", "39": "e", "40": "s", "37,38": "nw", "38,37": "nw", "39,38": "ne", "38,39": "ne", "37,40": "sw", "40,37": "sw", "39,40": "se", "40,39": "se"}, _keydown: function (d) {
        if (this._keys[d.keyCode]) {
            var c = d.currentTarget, b = c.getData("-yui3-arrow-dir");
            if (!b) {
                b = [];
                c.setData("-yui3-arrow-dir", b);
            }
            if (b[b.length - 1] !== d.keyCode) {
                b.push(d.keyCode);
            }
        }
    }, _notify: function (h, f) {
        if (this._keys[h.keyCode]) {
            var d = h.currentTarget, b = d.getData("-yui3-arrow-dir"), j = this._directions, g = [h.keyCode], c;
            for (c = b.length - 1; c >= 0; --c) {
                if ((h.keyCode - b[c]) % 2) {
                    g.push(b[c]);
                    break;
                }
            }
            h.direction = j[g];
            f.fire(h);
        }
    }, _keyup: function (f) {
        if (this._keys[f.keyCode]) {
            var d = f.currentTarget, b = d.getData("-yui3-arrow-dir"), c;
            if (b) {
                for (c = b.length - 1; c >= 0; --c) {
                    if (b[c] === f.keyCode) {
                        b.splice(c, 1);
                        break;
                    }
                }
            }
        }
    }, on: function (e, c, d, b) {
        var f = (b) ? "delegate" : "on";
        c._handle = new a.EventHandle([e[f]("keydown", a.rbind(this._keydown, this), b), e[f](this._event, a.rbind(this._notify, this, d), b), e[f]("keyup", a.rbind(this._keyup, this), b)]);
    }, detach: function (d, b, c) {
        b._handle.detach();
    }, delegate: function () {
        this.on.apply(this, arguments);
    }, detachDelegate: function () {
        this.detach.apply(this, arguments);
    }});
}, "gallery-2011.01.18-21-05", {requires: ["event-synthetic"]});

