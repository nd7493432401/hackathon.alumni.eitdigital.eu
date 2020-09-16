! function(t, e, i) {
    function n(t) {
        return t.replace(/\s*$/, "")
    }

    function s(t, e) {
        if (t.innerText) t.innerText = e;
        else if (t.nodeValue) t.nodeValue = e;
        else {
            if (!t.textContent) return !1;
            t.textContent = e
        }
    }

    function o(t, e, i, n) {
        var o, h = t.parent();
        t.remove();
        var r = i ? i.length : 0;
        if (h.contents().length > r) return o = h.contents().eq(-1 - r), a(o, e, i, n);
        var l = h.prev();
        return o = l.contents().eq(-1), !!o.length && (s(o[0], o.text() + n.ellipsis), h.remove(), i.length && l.append(i), !0)
    }

    function h(t, e, i, h) {
        for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length; c <= u;) r = c + (u - c >> 1), l = h.ellipsis + n(p.substr(r - 1, p.length)), s(a, l), e.height() > h.maxHeight ? c = r + 1 : (u = r - 1, d = d.length > l.length ? d : l);
        return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h)
    }

    function r(t, e, i, h) {
        for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length; c <= u;) r = c + (u - c >> 1), l = n(p.substr(0, r + 1)) + h.ellipsis, s(a, l), e.height() > h.maxHeight ? u = r - 1 : (c = r + 1, d = d.length > l.length ? d : l);
        return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h)
    }

    function l(t, e, i, h) {
        for (var r, l, a = t[0], p = t.text(), d = "", c = 0, u = p.length, g = u >> 1; c <= g;) r = c + (g - c >> 1), l = n(p.substr(0, r)) + h.ellipsis + p.substr(u - r, u - r), s(a, l), e.height() > h.maxHeight ? g = r - 1 : (c = r + 1, d = d.length > l.length ? d : l);
        return d.length > 0 ? (s(a, d), !0) : o(t, e, i, h)
    }

    function a(t, e, i, n) {
        return "end" === n.position ? r(t, e, i, n) : "start" === n.position ? h(t, e, i, n) : l(t, e, i, n)
    }

    function p(t, i, n, s) {
        var o, h, r = t[0],
            l = t.contents(),
            p = l.length,
            d = p - 1,
            u = !1;
        for (t.empty(); d >= 0 && !u; d--) o = l.eq(d), h = o[0], 8 !== h.nodeType && (r.insertBefore(h, r.firstChild), n.length && (e.inArray(r.tagName.toLowerCase(), g) >= 0 ? t.after(n) : t.append(n)), i.height() > s.maxHeight && (u = 3 === h.nodeType ? a(o, i, n, s) : c(o, i, n, s)), !u && n.length && n.remove());
        return u
    }

    function d(t, i, n, s) {
        var o, h, r = t[0],
            l = t.contents(),
            p = 0,
            d = l.length,
            u = !1;
        for (t.empty(); p < d && !u; p++) o = l.eq(p), h = o[0], 8 !== h.nodeType && (r.appendChild(h), n.length && (e.inArray(r.tagName.toLowerCase(), g) >= 0 ? t.after(n) : t.append(n)), i.height() > s.maxHeight && (u = 3 === h.nodeType ? a(o, i, n, s) : c(o, i, n, s)), !u && n.length && n.remove());
        return u
    }

    function c(t, e, i, n) {
        return "end" === n.position ? d(t, e, i, n) : "start" === n.position ? p(t, e, i, n) : d(t, e, i, n)
    }

    function u(t, i) {
        this.element = t, this.$element = e(t), this._name = "truncate", this._defaults = {
            lines: 1,
            ellipsis: "…",
            showMore: "",
            showLess: "",
            position: "end",
            lineHeight: "auto"
        }, this.config(i), this.original = this.cached = t.innerHTML, this.isTruncated = !1, this.isCollapsed = !0, this.update()
    }
    var g = ["table", "thead", "tbody", "tfoot", "tr", "col", "colgroup", "object", "embed", "param", "ol", "ul", "dl", "blockquote", "select", "optgroup", "option", "textarea", "script", "style"];
    u.prototype = {
        config: function(t) {
            if (this.options = e.extend({}, this._defaults, t), "auto" === this.options.lineHeight) {
                var n = this.$element.css("line-height"),
                    s = 18;
                "normal" !== n && (s = parseInt(n, 10)), this.options.lineHeight = s
            }
            this.options.maxHeight === i && (this.options.maxHeight = parseInt(this.options.lines, 10) * parseInt(this.options.lineHeight, 10)), "start" !== this.options.position && "middle" !== this.options.position && "end" !== this.options.position && (this.options.position = "end"), this.$clipNode = e(e.parseHTML(this.options.showMore), this.$element), this.original && this.update()
        },
        update: function(t) {
            var e = !this.isCollapsed;
            "undefined" != typeof t ? this.original = this.element.innerHTML = t : this.isCollapsed && this.element.innerHTML === this.cached && (this.element.innerHTML = this.original);
            var i = this.$element.wrapInner("<div/>").children();
            i.css({
                border: "none",
                margin: 0,
                padding: 0,
                width: "auto",
                height: "auto",
                "word-wrap": "break-word"
            }), this.isTruncated = !1, i.height() > this.options.maxHeight ? (this.isTruncated = c(i, i, this.$clipNode, this.options), this.isExplicitlyCollapsed && (this.isCollapsed = !0, e = !1)) : this.isCollapsed = !1, i.replaceWith(i.contents()), this.cached = this.element.innerHTML, e && (this.element.innerHTML = this.original)
        },
        expand: function() {
            var t = !0;
            this.isExplicitlyCollapsed && (this.isExplicitlyCollapsed = !1, t = !1), this.isCollapsed && (this.isCollapsed = !1, this.element.innerHTML = this.isTruncated ? this.original + (t ? this.options.showLess : "") : this.original)
        },
        collapse: function(t) {
            this.isExplicitlyCollapsed = !0, this.isCollapsed || (this.isCollapsed = !0, t = t || !1, t ? this.update() : this.element.innerHTML = this.cached)
        }
    }, e.fn.truncate = function(t) {
        var i = e.makeArray(arguments).slice(1);
        return this.each(function() {
            var n = e.data(this, "jquery-truncate");
            n ? "function" == typeof n[t] && n[t].apply(n, i) : e.data(this, "jquery-truncate", new u(this, t))
        })
    }, t.Truncate = u
}(this, jQuery),
function($) {
    // $("#edit-mail").attr("placeholder", "Your personal email");
    $(window).scroll(function() {
        $(document).scrollTop() > 98 ? $(".nav-top").addClass("shrink") : $(".nav-top").removeClass("shrink")
    }), $(document).ready(function() {
        $("#master-suboption").addClass("hide-suboption");
        $("#phd-suboption").addClass("hide-suboption");
        $("#employee-suboption").addClass("hide-suboption");

        $("#phd-option").on("click", function() {
            $("#master-suboption-anchor").css("z-index", "-1000");
            $("#phd-suboption").removeClass("hide-suboption");
            $("#master-suboption").addClass("hide-suboption");
            $("#employee-suboption").addClass("hide-suboption");
            $("#phd-suboption").css("visibility", "visible");
            $("#phd-suboption").css("padding-top", "40px");
            $("#phd-suboption-anchor").css("z-index", "9999");
            $('html, body').animate({
                scrollTop: $('#phd-suboption-anchor').offset().top
            }, 'slow');
        }), $("#master-option").on("click", function() {
                $("#phd-suboption-anchor").css("z-index", "-1000");
                $("#master-suboption").removeClass("hide-suboption");

                $("#phd-suboption").addClass("hide-suboption");
                $("#employee-suboption").addClass("hide-suboption");
                $("#employee-suboption-anchor").css("z-index", "-1000");
                
                $("#master-suboption").css("visibility", "visible");
                $("#master-suboption").css("padding-top", "40px");
                $("#master-suboption-anchor").css("z-index", "9999");
                $('html, body').animate({
                    scrollTop: $('#master-suboption-anchor').offset().top
                }, 'slow');
        }), $("#employee-option").on("click", function() {
                $("#employee-suboption").removeClass("hide-suboption");

                $("#phd-suboption-anchor").css("z-index", "-1000");
                $("#master-suboption-anchor").css("z-index", "-1000");

                $("#phd-suboption").addClass("hide-suboption");
                $("#master-suboption").addClass("hide-suboption");

                $("#employee-suboption").css("visibility", "visible");
                $("#employee-suboption").css("padding-top", "40px");
                $("#employee-suboption-anchor").css("z-index", "9999");
                $('html, body').animate({
                    scrollTop: $('#employee-suboption-anchor').offset().top
                }, 'slow');
        }), $(".accordion").find(".accordion-toggle").click(function() {
            $(this).next().slideToggle("600"), $(".accordion-content").not($(this).next()).slideUp("600")
        }), $(".accordion-toggle").on("click", function() {
            $(this).toggleClass("active").siblings().removeClass("active")
        }), $(".home-latest-discussions a").truncate({
            lines: 2
        })
    });
    var Sidebar = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Sidebar.DEFAULTS, options), this.transitioning = null, this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
    };
    Sidebar.DEFAULTS = {
        toggle: !0
    }, Sidebar.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("sidebar-open")) {
            var startEvent = $.Event("show.bs.sidebar");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                this.$element.addClass("sidebar-open"), this.transitioning = 1;
                var complete = function() {
                    this.$element, this.transitioning = 0, this.$element.trigger("shown.bs.sidebar")
                };
                return $.support.transition ? void this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400) : complete.call(this)
            }
        }
    }, Sidebar.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("sidebar-open")) {
            var startEvent = $.Event("hide.bs.sidebar");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                this.$element.removeClass("sidebar-open"), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.sidebar")
                };
                return $.support.transition ? void this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400) : complete.call(this)
            }
        }
    }, Sidebar.prototype.toggle = function() {
        this[this.$element.hasClass("sidebar-open") ? "hide" : "show"]()
    };
    var old = $.fn.sidebar;
    $.fn.sidebar = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("bs.sidebar"),
                options = $.extend({}, Sidebar.DEFAULTS, $this.data(), "object" == typeof options && option);
            !data && options.toggle && "show" == option && (option = !option), data || $this.data("bs.sidebar", data = new Sidebar(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.sidebar.Constructor = Sidebar, $.fn.sidebar.noConflict = function() {
        return $.fn.sidebar = old, this
    }, $(document).on("click.bs.sidebar.data-api", '[data-toggle="sidebar"]', function(e) {
        var href, $this = $(this),
            target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
            $target = $(target),
            data = $target.data("bs.sidebar"),
            option = data ? "toggle" : $this.data();
        $target.sidebar(option)
    }), $("html").on("click.bs.sidebar.autohide", function(event) {
        var $this = $(event.target),
            isButtonOrSidebar = $this.is('.sidebar, [data-toggle="sidebar"]') || $this.parents('.sidebar, [data-toggle="sidebar"]').length;
        if (!isButtonOrSidebar) {
            var $target = $(".sidebar");
            $target.each(function(i, trgt) {
                var $trgt = $(trgt);
                $trgt.data("bs.sidebar") && $trgt.hasClass("sidebar-open") && $trgt.sidebar("hide")
            })
        }
    })
}(jQuery);