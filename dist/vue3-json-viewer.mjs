import { defineComponent as S, ref as T, onMounted as H, h as j, computed as O, createElementBlock as N, openBlock as A, normalizeClass as k, toDisplayString as V, watch as J, inject as D, provide as L, nextTick as fe, resolveComponent as de, createCommentVNode as Z, createElementVNode as F, renderSlot as pe, createTextVNode as ve, createVNode as ye } from "vue";
const me = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, G = S({
  name: "JsonString",
  props: {
    /** The string value to display. */
    jsonValue: {
      type: String,
      required: !0
    }
  },
  /**
   * Setup function for the JsonString component.
   * @param props - The component's props.
   */
  setup(e) {
    const h = T(!0), l = T(!1), p = T(null), v = T(null);
    H(() => {
      p.value && v.value && p.value.offsetHeight > v.value.offsetHeight && (l.value = !0);
    });
    const u = () => {
      h.value = !h.value;
    };
    return () => {
      const o = e.jsonValue, t = me.test(o);
      let r;
      !h.value && l.value ? r = j("span", {
        class: { "jv-ellipsis": !0 },
        onClick: u
      }, "...") : t ? r = j("span", { class: { "jv-item": !0, "jv-string": !0 }, ref: p }, [
        j("span", null, '"'),
        // Opening quote
        j("a", { href: o, target: "_blank", class: "jv-link" }, o),
        j("span", null, '"')
        // Closing quote
      ]) : r = j("span", {
        class: { "jv-item": !0, "jv-string": !0 },
        ref: p
        // Assign ref for height calculation
      }, `"${o}"`);
      const n = [];
      return l.value && n.push(j("span", {
        class: {
          "jv-toggle": !0,
          // CSS class for the toggle button
          open: h.value
          // Class to indicate open/closed state
        },
        onClick: u
      })), n.push(j("span", { class: { "jv-holder-node": !0 }, ref: v })), n.push(r), j("span", {}, n);
    };
  }
}), he = {
  class: /* @__PURE__ */ k(["jv-item", "jv-undefined"])
}, ge = /* @__PURE__ */ S({
  __name: "json-undefined",
  props: {
    /**
     * The value to display. Expected to be `null` or `undefined`.
     * The `type` is set to `null` and `PropType` is used to allow `undefined` as well,
     * with a default of `undefined`.
     */
    jsonValue: {
      type: null,
      default: void 0
    }
  },
  setup(e) {
    const h = e, l = O(() => h.jsonValue === null ? "null" : "undefined");
    return (p, v) => (A(), N("span", he, V(l.value), 1));
  }
}), be = /* @__PURE__ */ S({
  __name: "json-number",
  props: {
    /** The number value to display. */
    jsonValue: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const h = e, l = O(() => Number.isInteger(h.jsonValue));
    return (p, v) => (A(), N("span", {
      class: k(["jv-item", "jv-number", l.value ? "jv-number-integer" : "jv-number-float"])
    }, V(e.jsonValue.toString()), 3));
  }
}), je = {
  class: /* @__PURE__ */ k(["jv-item", "jv-boolean"])
}, xe = /* @__PURE__ */ S({
  __name: "json-boolean",
  props: {
    /** The boolean value to display. */
    jsonValue: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (h, l) => (A(), N("span", je, V(e.jsonValue.toString()), 1));
  }
}), _e = S({
  name: "JsonObject",
  props: {
    /** The object value to render. */
    jsonValue: {
      type: Object,
      required: !0
    },
    /** The key name of this object if it's a property of another object. */
    keyName: {
      type: String,
      default: ""
    },
    /** Current nesting depth of this object. */
    depth: {
      type: Number,
      default: 0
    },
    /** Whether this object should be rendered in an expanded state. */
    expand: Boolean,
    /** Whether to sort the keys of this object alphabetically. */
    sort: Boolean,
    /** Whether preview mode is enabled. */
    previewMode: Boolean
  },
  emits: ["update:expand"],
  /**
   * Setup function for the JsonObject component.
   * @param props - The component's props.
   * @param context - The setup context, including `emit`.
   */
  setup(e, { emit: h }) {
    const l = T({});
    let p = null;
    const v = (r) => {
      setTimeout(() => {
        l.value = r;
      }, 0);
    };
    J(() => e.jsonValue, (r) => {
      v(r);
    }, { immediate: !0, deep: !0 });
    const u = O(() => {
      if (!e.sort)
        return l.value;
      const r = Object.keys(l.value).sort(), n = {};
      return r.forEach((c) => {
        n[c] = l.value[c];
      }), n;
    }), o = () => {
      if (p)
        try {
          p.dispatchEvent(new Event("resized"));
        } catch {
          const n = document.createEvent("Event");
          n.initEvent("resized", !0, !1), p.dispatchEvent(n);
        }
    }, t = () => {
      h("update:expand", !e.expand), o();
    };
    return () => {
      const r = [];
      if (r.push(j("span", { class: ["jv-item", "jv-object"] }, "{")), e.expand) {
        for (const n in u.value)
          if (u.value.hasOwnProperty(n)) {
            const c = u.value[n];
            r.push(j(K, {
              key: n,
              // style: { display: !props.expand ? 'none' : undefined }, // Redundant
              sort: e.sort,
              keyName: n,
              depth: e.depth + 1,
              value: c,
              previewMode: e.previewMode
            }));
          }
      }
      return !e.expand && Object.keys(l.value).length > 0 && r.push(j("span", {
        // style: { display: props.expand ? 'none' : undefined }, // Redundant
        class: "jv-ellipsis",
        onClick: t,
        title: `click to reveal object content (keys: ${Object.keys(u.value).join(", ")})`
      }, "...")), r.push(j("span", { class: ["jv-item", "jv-object"] }, "}")), j("span", { ref: (n) => {
        p = n;
      } }, r);
    };
  }
}), Ee = S({
  name: "JsonArray",
  props: {
    /** The array value to render. */
    jsonValue: {
      type: Array,
      required: !0
    },
    /** The key name of this array if it's a property of an object. */
    keyName: {
      type: String,
      default: ""
    },
    /** Current nesting depth of this array. */
    depth: {
      type: Number,
      default: 0
    },
    /** Whether to sort array items (Note: arrays are typically not sorted by key). */
    sort: Boolean,
    // This prop might be less relevant for arrays vs objects
    /** Whether this array should be rendered in an expanded state. */
    expand: Boolean,
    /** Whether preview mode is enabled (potentially showing a condensed view). */
    previewMode: Boolean
  },
  emits: ["update:expand"],
  /**
   * Setup function for the JsonArray component.
   * @param props - The component's props.
   * @param context - The setup context, including `emit`.
   */
  setup(e, { emit: h }) {
    const l = T([]);
    let p = null;
    const v = (o, t = 0) => {
      t === 0 && (l.value = []), setTimeout(() => {
        o && o.length > t && (l.value.push(o[t]), v(o, t + 1));
      }, 0);
    };
    J(() => e.jsonValue, (o) => {
      v(o);
    }, { immediate: !0, deep: !0 });
    const u = () => {
      if (h("update:expand", !e.expand), p)
        try {
          p.dispatchEvent(new Event("resized"));
        } catch {
          const t = document.createEvent("Event");
          t.initEvent("resized", !0, !1), p.dispatchEvent(t);
        }
    };
    return () => {
      const o = [];
      return !e.previewMode && !e.keyName && o.push(j("span", {
        class: {
          "jv-toggle": !0,
          open: !!e.expand
        },
        onClick: u
      })), o.push(j("span", {
        class: ["jv-item", "jv-array"]
      }, "[")), e.expand && l.value.forEach((t, r) => {
        o.push(j(K, {
          // Cast JsonBox to Component
          key: r,
          // style: { display: props.expand ? undefined : 'none' }, // This style is redundant if items are not rendered
          sort: e.sort,
          depth: e.depth + 1,
          value: t,
          previewMode: e.previewMode
        }));
      }), !e.expand && l.value.length > 0 && o.push(j("span", {
        class: "jv-ellipsis",
        onClick: u,
        title: `click to reveal ${l.value.length} hidden items`
      }, "...")), o.push(j("span", {
        class: ["jv-item", "jv-array"]
      }, "]")), j("span", { ref: (t) => {
        p = t;
      } }, o);
    };
  }
}), Te = ["title"], we = /* @__PURE__ */ S({
  __name: "json-function",
  props: {
    /** The Function object to represent. */
    jsonValue: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return (h, l) => (A(), N("span", {
      class: k(["jv-item", "jv-function"]),
      title: e.jsonValue.toString()
    }, " <function> ", 8, Te));
  }
}), ke = {
  class: /* @__PURE__ */ k(["jv-item", "jv-string"])
}, Se = /* @__PURE__ */ S({
  __name: "json-date",
  props: {
    /** The Date object to display. */
    jsonValue: {
      type: Date,
      required: !0
    }
  },
  setup(e) {
    const h = e, l = D("timeformat", (v) => v.toLocaleString()), p = O(() => l(h.jsonValue));
    return (v, u) => (A(), N("span", ke, ' "' + V(p.value) + '" ', 1));
  }
}), Ce = {
  class: /* @__PURE__ */ k(["jv-item", "jv-regexp"])
}, Ne = /* @__PURE__ */ S({
  __name: "json-regexp",
  props: {
    /** The RegExp object to display. */
    jsonValue: {
      type: RegExp,
      required: !0
    }
  },
  setup(e) {
    return (h, l) => (A(), N("span", Ce, V(e.jsonValue.toString()), 1));
  }
}), K = S({
  name: "JsonBox",
  props: {
    /** The JSON value to render. Can be any valid JSON type. */
    value: {
      type: [Object, Array, String, Number, Boolean, Function, Date],
      default: null
    },
    /** The key name for this value, if it's part of an object. */
    keyName: {
      type: String,
      default: ""
    },
    /** Whether to sort object keys alphabetically. Passed down from JsonViewer. */
    sort: Boolean,
    /** Current nesting depth of this component. */
    depth: {
      type: Number,
      default: 0
    },
    /** Whether preview mode is enabled. Passed down from JsonViewer. */
    previewMode: Boolean
  },
  /**
   * Setup function for the JsonBox component.
   * @param props - The component's props.
   */
  setup(e, h) {
    const l = D("onToggle", () => {
    }), p = D("expandDepth", 1 / 0), v = D("keyClick", () => {
    }), u = T(!0);
    let o = null;
    H(() => {
      u.value = e.previewMode || e.depth < p;
    });
    const t = () => {
      if (console.log("Toggle called for:", e.keyName, "Current expand state:", u.value), u.value = !u.value, l({
        keyName: e.keyName,
        value: e.value,
        depth: e.depth,
        expanded: u.value
      }), o)
        try {
          o.dispatchEvent(new Event("resized"));
        } catch {
          const n = document.createEvent("Event");
          n.initEvent("resized", !0, !1), o.dispatchEvent(n);
        }
    };
    return () => {
      const r = [];
      let n;
      e.value === null || e.value === void 0 ? n = ge : Array.isArray(e.value) ? n = Ee : e.value instanceof Date ? n = Se : e.value instanceof RegExp ? n = Ne : typeof e.value == "object" ? n = _e : typeof e.value == "number" ? n = be : typeof e.value == "string" ? n = G : typeof e.value == "boolean" ? n = xe : typeof e.value == "function" ? n = we : n = G;
      const c = e.value && (Array.isArray(e.value) || typeof e.value == "object" && !(e.value instanceof Date) && // Exclude Date
      !(e.value instanceof RegExp));
      return !e.previewMode && c && !(e.value instanceof RegExp) && r.push(
        j("span", {
          class: {
            "jv-toggle": !0,
            open: !!u.value
            // Double negation to ensure boolean
          },
          onClick: t
        })
      ), e.keyName && r.push(
        j("span", {
          class: "jv-key",
          // 'jv-key' is a string, not an object
          onClick: () => {
            v && v(e.keyName);
          }
        }, `${e.keyName}:`)
        // Text content as children
      ), r.push(
        j(n, {
          class: "jv-push",
          // 'jv-push' is a string
          jsonValue: e.value,
          keyName: e.keyName,
          // Pass keyName for context if needed by child
          sort: e.sort,
          // Pass sort for objects/arrays
          depth: e.depth,
          // Pass current depth
          expand: u.value,
          // Pass current expand state
          previewMode: e.previewMode,
          // Listen for 'update:expand' events from child components (e.g., JsonArray, JsonObject)
          // This allows children to request a change in their own expansion state.
          "onUpdate:expand": (x) => {
            u.value = x;
          }
        })
      ), j(
        "div",
        {
          class: {
            "jv-node": !0,
            "jv-key-node": !!e.keyName && !c,
            // Apply if keyName exists and not a complex type
            toggle: !e.previewMode && c
            // Apply if not preview and is complex for styling indent
          },
          ref: (x) => {
            o = x;
          }
        },
        r
      );
    };
  }
});
function Ae(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var P = { exports: {} };
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
var Oe = P.exports, X;
function Ve() {
  return X || (X = 1, function(e, h) {
    (function(p, v) {
      e.exports = v();
    })(Oe, function() {
      return (
        /******/
        function() {
          var l = {
            /***/
            686: (
              /***/
              function(u, o, t) {
                t.d(o, {
                  default: function() {
                    return (
                      /* binding */
                      ce
                    );
                  }
                });
                var r = t(279), n = /* @__PURE__ */ t.n(r), c = t(370), x = /* @__PURE__ */ t.n(c), _ = t(817), E = /* @__PURE__ */ t.n(_);
                function g(d) {
                  try {
                    return document.execCommand(d);
                  } catch {
                    return !1;
                  }
                }
                var y = function(i) {
                  var a = E()(i);
                  return g("cut"), a;
                }, b = y;
                function C(d) {
                  var i = document.documentElement.getAttribute("dir") === "rtl", a = document.createElement("textarea");
                  a.style.fontSize = "12pt", a.style.border = "0", a.style.padding = "0", a.style.margin = "0", a.style.position = "absolute", a.style[i ? "right" : "left"] = "-9999px";
                  var s = window.pageYOffset || document.documentElement.scrollTop;
                  return a.style.top = "".concat(s, "px"), a.setAttribute("readonly", ""), a.value = d, a;
                }
                var U = function(i, a) {
                  var s = C(i);
                  a.container.appendChild(s);
                  var f = E()(s);
                  return g("copy"), s.remove(), f;
                }, W = function(i) {
                  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    container: document.body
                  }, s = "";
                  return typeof i == "string" ? s = U(i, a) : i instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(i == null ? void 0 : i.type) ? s = U(i.value, a) : (s = E()(i), g("copy")), s;
                }, z = W;
                function $(d) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? $ = function(a) {
                    return typeof a;
                  } : $ = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, $(d);
                }
                var ee = function() {
                  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = i.action, s = a === void 0 ? "copy" : a, f = i.container, m = i.target, w = i.text;
                  if (s !== "copy" && s !== "cut")
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  if (m !== void 0)
                    if (m && $(m) === "object" && m.nodeType === 1) {
                      if (s === "copy" && m.hasAttribute("disabled"))
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      if (s === "cut" && (m.hasAttribute("readonly") || m.hasAttribute("disabled")))
                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                    } else
                      throw new Error('Invalid "target" value, use a valid Element');
                  if (w)
                    return z(w, {
                      container: f
                    });
                  if (m)
                    return s === "cut" ? b(m) : z(m, {
                      container: f
                    });
                }, te = ee;
                function M(d) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? M = function(a) {
                    return typeof a;
                  } : M = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, M(d);
                }
                function ne(d, i) {
                  if (!(d instanceof i))
                    throw new TypeError("Cannot call a class as a function");
                }
                function Y(d, i) {
                  for (var a = 0; a < i.length; a++) {
                    var s = i[a];
                    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(d, s.key, s);
                  }
                }
                function oe(d, i, a) {
                  return i && Y(d.prototype, i), a && Y(d, a), d;
                }
                function re(d, i) {
                  if (typeof i != "function" && i !== null)
                    throw new TypeError("Super expression must either be null or a function");
                  d.prototype = Object.create(i && i.prototype, { constructor: { value: d, writable: !0, configurable: !0 } }), i && I(d, i);
                }
                function I(d, i) {
                  return I = Object.setPrototypeOf || function(s, f) {
                    return s.__proto__ = f, s;
                  }, I(d, i);
                }
                function ae(d) {
                  var i = se();
                  return function() {
                    var s = R(d), f;
                    if (i) {
                      var m = R(this).constructor;
                      f = Reflect.construct(s, arguments, m);
                    } else
                      f = s.apply(this, arguments);
                    return ie(this, f);
                  };
                }
                function ie(d, i) {
                  return i && (M(i) === "object" || typeof i == "function") ? i : ue(d);
                }
                function ue(d) {
                  if (d === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return d;
                }
                function se() {
                  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                  if (typeof Proxy == "function") return !0;
                  try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                    })), !0;
                  } catch {
                    return !1;
                  }
                }
                function R(d) {
                  return R = Object.setPrototypeOf ? Object.getPrototypeOf : function(a) {
                    return a.__proto__ || Object.getPrototypeOf(a);
                  }, R(d);
                }
                function q(d, i) {
                  var a = "data-clipboard-".concat(d);
                  if (i.hasAttribute(a))
                    return i.getAttribute(a);
                }
                var le = /* @__PURE__ */ function(d) {
                  re(a, d);
                  var i = ae(a);
                  function a(s, f) {
                    var m;
                    return ne(this, a), m = i.call(this), m.resolveOptions(f), m.listenClick(s), m;
                  }
                  return oe(a, [{
                    key: "resolveOptions",
                    value: function() {
                      var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      this.action = typeof f.action == "function" ? f.action : this.defaultAction, this.target = typeof f.target == "function" ? f.target : this.defaultTarget, this.text = typeof f.text == "function" ? f.text : this.defaultText, this.container = M(f.container) === "object" ? f.container : document.body;
                    }
                    /**
                     * Adds a click event listener to the passed trigger.
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     */
                  }, {
                    key: "listenClick",
                    value: function(f) {
                      var m = this;
                      this.listener = x()(f, "click", function(w) {
                        return m.onClick(w);
                      });
                    }
                    /**
                     * Defines a new `ClipboardAction` on each click event.
                     * @param {Event} e
                     */
                  }, {
                    key: "onClick",
                    value: function(f) {
                      var m = f.delegateTarget || f.currentTarget, w = this.action(m) || "copy", B = te({
                        action: w,
                        container: this.container,
                        target: this.target(m),
                        text: this.text(m)
                      });
                      this.emit(B ? "success" : "error", {
                        action: w,
                        text: B,
                        trigger: m,
                        clearSelection: function() {
                          m && m.focus(), window.getSelection().removeAllRanges();
                        }
                      });
                    }
                    /**
                     * Default `action` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultAction",
                    value: function(f) {
                      return q("action", f);
                    }
                    /**
                     * Default `target` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultTarget",
                    value: function(f) {
                      var m = q("target", f);
                      if (m)
                        return document.querySelector(m);
                    }
                    /**
                     * Allow fire programmatically a copy action
                     * @param {String|HTMLElement} target
                     * @param {Object} options
                     * @returns Text copied.
                     */
                  }, {
                    key: "defaultText",
                    /**
                     * Default `text` lookup function.
                     * @param {Element} trigger
                     */
                    value: function(f) {
                      return q("text", f);
                    }
                    /**
                     * Destroy lifecycle.
                     */
                  }, {
                    key: "destroy",
                    value: function() {
                      this.listener.destroy();
                    }
                  }], [{
                    key: "copy",
                    value: function(f) {
                      var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                        container: document.body
                      };
                      return z(f, m);
                    }
                    /**
                     * Allow fire programmatically a cut action
                     * @param {String|HTMLElement} target
                     * @returns Text cutted.
                     */
                  }, {
                    key: "cut",
                    value: function(f) {
                      return b(f);
                    }
                    /**
                     * Returns the support of the given action, or all actions if no action is
                     * given.
                     * @param {String} [action]
                     */
                  }, {
                    key: "isSupported",
                    value: function() {
                      var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"], m = typeof f == "string" ? [f] : f, w = !!document.queryCommandSupported;
                      return m.forEach(function(B) {
                        w = w && !!document.queryCommandSupported(B);
                      }), w;
                    }
                  }]), a;
                }(n()), ce = le;
              }
            ),
            /***/
            828: (
              /***/
              function(u) {
                var o = 9;
                if (typeof Element < "u" && !Element.prototype.matches) {
                  var t = Element.prototype;
                  t.matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                }
                function r(n, c) {
                  for (; n && n.nodeType !== o; ) {
                    if (typeof n.matches == "function" && n.matches(c))
                      return n;
                    n = n.parentNode;
                  }
                }
                u.exports = r;
              }
            ),
            /***/
            438: (
              /***/
              function(u, o, t) {
                var r = t(828);
                function n(_, E, g, y, b) {
                  var C = x.apply(this, arguments);
                  return _.addEventListener(g, C, b), {
                    destroy: function() {
                      _.removeEventListener(g, C, b);
                    }
                  };
                }
                function c(_, E, g, y, b) {
                  return typeof _.addEventListener == "function" ? n.apply(null, arguments) : typeof g == "function" ? n.bind(null, document).apply(null, arguments) : (typeof _ == "string" && (_ = document.querySelectorAll(_)), Array.prototype.map.call(_, function(C) {
                    return n(C, E, g, y, b);
                  }));
                }
                function x(_, E, g, y) {
                  return function(b) {
                    b.delegateTarget = r(b.target, E), b.delegateTarget && y.call(_, b);
                  };
                }
                u.exports = c;
              }
            ),
            /***/
            879: (
              /***/
              function(u, o) {
                o.node = function(t) {
                  return t !== void 0 && t instanceof HTMLElement && t.nodeType === 1;
                }, o.nodeList = function(t) {
                  var r = Object.prototype.toString.call(t);
                  return t !== void 0 && (r === "[object NodeList]" || r === "[object HTMLCollection]") && "length" in t && (t.length === 0 || o.node(t[0]));
                }, o.string = function(t) {
                  return typeof t == "string" || t instanceof String;
                }, o.fn = function(t) {
                  var r = Object.prototype.toString.call(t);
                  return r === "[object Function]";
                };
              }
            ),
            /***/
            370: (
              /***/
              function(u, o, t) {
                var r = t(879), n = t(438);
                function c(g, y, b) {
                  if (!g && !y && !b)
                    throw new Error("Missing required arguments");
                  if (!r.string(y))
                    throw new TypeError("Second argument must be a String");
                  if (!r.fn(b))
                    throw new TypeError("Third argument must be a Function");
                  if (r.node(g))
                    return x(g, y, b);
                  if (r.nodeList(g))
                    return _(g, y, b);
                  if (r.string(g))
                    return E(g, y, b);
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
                function x(g, y, b) {
                  return g.addEventListener(y, b), {
                    destroy: function() {
                      g.removeEventListener(y, b);
                    }
                  };
                }
                function _(g, y, b) {
                  return Array.prototype.forEach.call(g, function(C) {
                    C.addEventListener(y, b);
                  }), {
                    destroy: function() {
                      Array.prototype.forEach.call(g, function(C) {
                        C.removeEventListener(y, b);
                      });
                    }
                  };
                }
                function E(g, y, b) {
                  return n(document.body, g, y, b);
                }
                u.exports = c;
              }
            ),
            /***/
            817: (
              /***/
              function(u) {
                function o(t) {
                  var r;
                  if (t.nodeName === "SELECT")
                    t.focus(), r = t.value;
                  else if (t.nodeName === "INPUT" || t.nodeName === "TEXTAREA") {
                    var n = t.hasAttribute("readonly");
                    n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), r = t.value;
                  } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var c = window.getSelection(), x = document.createRange();
                    x.selectNodeContents(t), c.removeAllRanges(), c.addRange(x), r = c.toString();
                  }
                  return r;
                }
                u.exports = o;
              }
            ),
            /***/
            279: (
              /***/
              function(u) {
                function o() {
                }
                o.prototype = {
                  on: function(t, r, n) {
                    var c = this.e || (this.e = {});
                    return (c[t] || (c[t] = [])).push({
                      fn: r,
                      ctx: n
                    }), this;
                  },
                  once: function(t, r, n) {
                    var c = this;
                    function x() {
                      c.off(t, x), r.apply(n, arguments);
                    }
                    return x._ = r, this.on(t, x, n);
                  },
                  emit: function(t) {
                    var r = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), c = 0, x = n.length;
                    for (c; c < x; c++)
                      n[c].fn.apply(n[c].ctx, r);
                    return this;
                  },
                  off: function(t, r) {
                    var n = this.e || (this.e = {}), c = n[t], x = [];
                    if (c && r)
                      for (var _ = 0, E = c.length; _ < E; _++)
                        c[_].fn !== r && c[_].fn._ !== r && x.push(c[_]);
                    return x.length ? n[t] = x : delete n[t], this;
                  }
                }, u.exports = o, u.exports.TinyEmitter = o;
              }
            )
            /******/
          }, p = {};
          function v(u) {
            if (p[u])
              return p[u].exports;
            var o = p[u] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            return l[u](o, o.exports, v), o.exports;
          }
          return function() {
            v.n = function(u) {
              var o = u && u.__esModule ? (
                /******/
                function() {
                  return u.default;
                }
              ) : (
                /******/
                function() {
                  return u;
                }
              );
              return v.d(o, { a: o }), o;
            };
          }(), function() {
            v.d = function(u, o) {
              for (var t in o)
                v.o(o, t) && !v.o(u, t) && Object.defineProperty(u, t, { enumerable: !0, get: o[t] });
            };
          }(), function() {
            v.o = function(u, o) {
              return Object.prototype.hasOwnProperty.call(u, o);
            };
          }(), v(686);
        }().default
      );
    });
  }(P)), P.exports;
}
var Me = Ve();
const $e = /* @__PURE__ */ Ae(Me), Re = function(e, h) {
  let l = Date.now(), p;
  return (...v) => {
    Date.now() - l < h && p && clearTimeout(p), p = setTimeout(() => {
      e(...v);
    }, h), l = Date.now();
  };
}, Be = S({
  name: "JsonViewer",
  components: {
    JsonBox: K
  },
  props: {
    value: {
      type: [Object, Array, String, Number, Boolean, Function],
      required: !0
    },
    expanded: {
      type: Boolean,
      default: !1
    },
    expandDepth: {
      type: Number,
      default: 1
    },
    copyable: {
      type: [Boolean, Object],
      default: !1
    },
    sort: {
      type: Boolean,
      default: !1
    },
    boxed: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "light"
    },
    timeformat: {
      type: Function,
      default: (e) => e.toLocaleString()
    },
    previewMode: {
      type: Boolean,
      default: !1
    },
    parse: {
      type: Boolean,
      default: !1
    }
  },
  /**
   * Emits an event when a key is clicked in the JSON viewer.
   * @param keyName - The name of the key that was clicked.
   */
  emits: {
    onKeyClick: (e) => !0,
    /**
     * Emits an event when the JSON has been copied to the clipboard.
     * @param copyEvent - The event object from ClipboardJS.
     */
    copied: (e) => !0,
    /**
     * Emits an event when the expansion state of the viewer changes.
     * @param newState - The new expansion state.
     */
    onToggle: (e) => !0
  },
  /**
   * Setup function for the JsonViewer component.
   * @param props - The component's props.
   * @param context - The setup context, including `emit`.
   */
  setup(e, { emit: h }) {
    const l = T(!1), p = T(!1), v = T(e.expanded), u = T(null), o = T(null);
    L("expandDepth", e.expandDepth), L("timeformat", e.timeformat), L("keyClick", (y) => {
      h("onKeyClick", y);
    }), L("onToggle", (y) => {
      h("onToggle", y);
    });
    const t = O(() => "jv-container jv-" + e.theme + (e.boxed ? " boxed" : "")), r = O(() => {
      if (typeof e.copyable == "boolean" && !e.copyable)
        return { copyText: "copy", copiedText: "copied!", timeout: 2e3, align: "right" };
      const y = e.copyable;
      return {
        copyText: y.copyText || "copy",
        copiedText: y.copiedText || "copied!",
        timeout: y.timeout || 2e3,
        align: y.align || "right"
      };
    }), n = O(() => {
      if (!e.parse || typeof e.value != "string")
        return e.value;
      try {
        return JSON.parse(e.value);
      } catch {
        return e.value;
      }
    }), c = () => {
      _();
    }, _ = Re(() => {
      fe(() => {
        o.value && (o.value.$el.clientHeight >= 250 ? p.value = !0 : p.value = !1);
      });
    }, 200), E = (y) => {
      l.value || (l.value = !0, setTimeout(() => {
        l.value = !1;
      }, r.value.timeout), h("copied", y));
    }, g = () => {
      v.value = !v.value;
    };
    return J(() => e.value, () => {
      c();
    }), H(() => {
      e.boxed && o.value && (c(), o.value.$el.addEventListener("resized", c, !0)), e.copyable && u.value && new $e(u.value, {
        text: () => JSON.stringify(n.value, null, 2)
        // Use parseValue for copying
      }).on("success", E);
    }), {
      clip: u,
      jsonBox: o,
      copied: l,
      expandableCode: p,
      expandCode: v,
      jvClass: t,
      copyText: r,
      parseValue: n,
      toggleExpandCode: g
      // Methods are already bound or don't need explicit exposure if not used in template
      // onResized, // only called internally
      // debResized, // only called internally
      // onCopied, // only called internally
    };
  }
}), Le = (e, h) => {
  const l = e.__vccOpts || e;
  for (const [p, v] of h)
    l[p] = v;
  return l;
};
function De(e, h, l, p, v, u) {
  const o = de("json-box");
  return A(), N("div", {
    class: k(e.jvClass)
  }, [
    e.copyable ? (A(), N("div", {
      key: 0,
      class: k(`jv-tooltip ${e.copyText.align || "right"}`)
    }, [
      F("span", {
        ref: "clip",
        class: k(["jv-button", { copied: e.copied }])
      }, [
        pe(e.$slots, "copy", { copied: e.copied }, () => [
          ve(V(e.copied ? e.copyText.copiedText : e.copyText.copyText), 1)
        ])
      ], 2)
    ], 2)) : Z("", !0),
    F("div", {
      class: k(["jv-code", { open: e.expandCode, boxed: e.boxed }])
    }, [
      ye(o, {
        ref: "jsonBox",
        value: e.parseValue,
        sort: e.sort,
        "preview-mode": e.previewMode
      }, null, 8, ["value", "sort", "preview-mode"])
    ], 2),
    e.expandableCode && e.boxed ? (A(), N("div", {
      key: 1,
      class: "jv-more",
      onClick: h[0] || (h[0] = (...t) => e.toggleExpandCode && e.toggleExpandCode(...t))
    }, [
      F("span", {
        class: k(["jv-toggle", { open: !!e.expandCode }])
      }, null, 2)
    ])) : Z("", !0)
  ], 2);
}
const Q = /* @__PURE__ */ Le(Be, [["render", De]]), Pe = (e) => {
  e.component(Q.name, Q);
}, qe = {
  install: Pe
};
export {
  Q as JsonViewer,
  qe as default
};
