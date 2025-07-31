import { defineComponent as S, ref as T, onMounted as H, h as x, computed as O, createElementBlock as N, openBlock as A, normalizeClass as k, toDisplayString as V, watch as J, inject as D, provide as L, nextTick as fe, resolveComponent as de, createCommentVNode as Z, createElementVNode as F, renderSlot as pe, createTextVNode as ve, createVNode as ye } from "vue";
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
    const h = T(!0), c = T(!1), p = T(null), v = T(null);
    H(() => {
      p.value && v.value && p.value.offsetHeight > v.value.offsetHeight && (c.value = !0);
    });
    const u = () => {
      h.value = !h.value;
    };
    return () => {
      const n = e.jsonValue, t = me.test(n);
      let r;
      !h.value && c.value ? r = x("span", {
        class: { "jv-ellipsis": !0 },
        onClick: u
      }, "...") : t ? r = x("span", { class: { "jv-item": !0, "jv-string": !0 }, ref: p }, [
        x("span", null, '"'),
        // Opening quote
        x("a", { href: n, target: "_blank", class: "jv-link" }, n),
        x("span", null, '"')
        // Closing quote
      ]) : r = x("span", {
        class: { "jv-item": !0, "jv-string": !0 },
        ref: p
        // Assign ref for height calculation
      }, `"${n}"`);
      const o = [];
      return c.value && o.push(x("span", {
        class: {
          "jv-toggle": !0,
          // CSS class for the toggle button
          open: h.value
          // Class to indicate open/closed state
        },
        onClick: u
      })), o.push(x("span", { class: { "jv-holder-node": !0 }, ref: v })), o.push(r), x("span", {}, o);
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
    const h = e, c = O(() => h.jsonValue === null ? "null" : "undefined");
    return (p, v) => (A(), N("span", he, V(c.value), 1));
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
    const h = e, c = O(() => Number.isInteger(h.jsonValue));
    return (p, v) => (A(), N("span", {
      class: k(["jv-item", "jv-number", c.value ? "jv-number-integer" : "jv-number-float"])
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
    return (h, c) => (A(), N("span", je, V(e.jsonValue.toString()), 1));
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
    const c = T({});
    let p = null;
    const v = (r) => {
      setTimeout(() => {
        c.value = r;
      }, 0);
    };
    J(() => e.jsonValue, (r) => {
      v(r);
    }, { immediate: !0, deep: !0 });
    const u = O(() => {
      if (!e.sort)
        return c.value;
      const r = Object.keys(c.value).sort(), o = {};
      return r.forEach((s) => {
        o[s] = c.value[s];
      }), o;
    }), n = () => {
      if (p)
        try {
          p.dispatchEvent(new Event("resized"));
        } catch {
          const o = document.createEvent("Event");
          o.initEvent("resized", !0, !1), p.dispatchEvent(o);
        }
    }, t = () => {
      h("update:expand", !e.expand), n();
    };
    return () => {
      const r = [];
      if (r.push(x("span", { class: ["jv-item", "jv-object"] }, "{")), e.expand) {
        for (const o in u.value)
          if (u.value.hasOwnProperty(o)) {
            const s = u.value[o];
            r.push(x(K, {
              key: o,
              // style: { display: !props.expand ? 'none' : undefined }, // Redundant
              sort: e.sort,
              keyName: o,
              depth: e.depth + 1,
              value: s,
              previewMode: e.previewMode
            }));
          }
      }
      return !e.expand && Object.keys(c.value).length > 0 && r.push(x("span", {
        // style: { display: props.expand ? 'none' : undefined }, // Redundant
        class: "jv-ellipsis",
        onClick: t,
        title: `click to reveal object content (keys: ${Object.keys(u.value).join(", ")})`
      }, "...")), r.push(x("span", { class: ["jv-item", "jv-object"] }, "}")), x("span", { ref: (o) => {
        p = o;
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
    const c = T([]);
    let p = null;
    const v = (n, t = 0) => {
      t === 0 && (c.value = []), setTimeout(() => {
        n && n.length > t && (c.value.push(n[t]), v(n, t + 1));
      }, 0);
    };
    J(() => e.jsonValue, (n) => {
      v(n);
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
      const n = [];
      return !e.previewMode && !e.keyName && n.push(x("span", {
        class: {
          "jv-toggle": !0,
          open: !!e.expand
        },
        onClick: u
      })), n.push(x("span", {
        class: ["jv-item", "jv-array"]
      }, "[")), e.expand && c.value.forEach((t, r) => {
        n.push(x(K, {
          // Cast JsonBox to Component
          key: r,
          // style: { display: props.expand ? undefined : 'none' }, // This style is redundant if items are not rendered
          sort: e.sort,
          depth: e.depth + 1,
          value: t,
          previewMode: e.previewMode
        }));
      }), !e.expand && c.value.length > 0 && n.push(x("span", {
        class: "jv-ellipsis",
        onClick: u,
        title: `click to reveal ${c.value.length} hidden items`
      }, "...")), n.push(x("span", {
        class: ["jv-item", "jv-array"]
      }, "]")), x("span", { ref: (t) => {
        p = t;
      } }, n);
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
    return (h, c) => (A(), N("span", {
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
    const h = e, c = D("timeformat", (v) => v.toLocaleString()), p = O(() => c(h.jsonValue));
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
    return (h, c) => (A(), N("span", Ce, V(e.jsonValue.toString()), 1));
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
    previewMode: Boolean,
    path: {
      type: Array,
      default: () => []
    }
  },
  /**
   * Setup function for the JsonBox component.
   * @param props - The component's props.
   */
  setup(e, h) {
    const c = D("onToggle", () => {
    }), p = D("expandDepth", 1 / 0), v = D("keyClick", () => {
    }), u = T(!0);
    let n = null;
    const t = [...e.path];
    e.keyName && t.push(e.keyName), H(() => {
      u.value = e.previewMode || e.depth < p;
    });
    const r = () => {
      if (u.value = !u.value, c({
        keyName: e.keyName,
        value: e.value,
        depth: e.depth,
        expanded: u.value,
        path: t
      }), n)
        try {
          n.dispatchEvent(new Event("resized"));
        } catch {
          const s = document.createEvent("Event");
          s.initEvent("resized", !0, !1), n.dispatchEvent(s);
        }
    };
    return () => {
      const o = [];
      let s;
      e.value === null || e.value === void 0 ? s = ge : Array.isArray(e.value) ? s = Ee : e.value instanceof Date ? s = Se : e.value instanceof RegExp ? s = Ne : typeof e.value == "object" ? s = _e : typeof e.value == "number" ? s = be : typeof e.value == "string" ? s = G : typeof e.value == "boolean" ? s = xe : typeof e.value == "function" ? s = we : s = G;
      const _ = e.value && (Array.isArray(e.value) || typeof e.value == "object" && !(e.value instanceof Date) && // Exclude Date
      !(e.value instanceof RegExp));
      return !e.previewMode && _ && !(e.value instanceof RegExp) && o.push(
        x("span", {
          class: {
            "jv-toggle": !0,
            open: !!u.value
            // Double negation to ensure boolean
          },
          onClick: r
        })
      ), e.keyName && o.push(
        x("span", {
          class: "jv-key",
          // 'jv-key' is a string, not an object
          onClick: () => {
            v && v(e.keyName);
          }
        }, `${e.keyName}:`)
        // Text content as children
      ), o.push(
        x(s, {
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
          path: t,
          // Listen for 'update:expand' events from child components (e.g., JsonArray, JsonObject)
          // This allows children to request a change in their own expansion state.
          "onUpdate:expand": (b) => {
            u.value = b;
          }
        })
      ), x(
        "div",
        {
          class: {
            "jv-node": !0,
            "jv-key-node": !!e.keyName && !_,
            // Apply if keyName exists and not a complex type
            toggle: !e.previewMode && _
            // Apply if not preview and is complex for styling indent
          },
          ref: (b) => {
            n = b;
          }
        },
        o
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
          var c = {
            /***/
            686: (
              /***/
              function(u, n, t) {
                t.d(n, {
                  default: function() {
                    return (
                      /* binding */
                      ce
                    );
                  }
                });
                var r = t(279), o = /* @__PURE__ */ t.n(r), s = t(370), _ = /* @__PURE__ */ t.n(s), b = t(817), E = /* @__PURE__ */ t.n(b);
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
                }, j = y;
                function C(d) {
                  var i = document.documentElement.getAttribute("dir") === "rtl", a = document.createElement("textarea");
                  a.style.fontSize = "12pt", a.style.border = "0", a.style.padding = "0", a.style.margin = "0", a.style.position = "absolute", a.style[i ? "right" : "left"] = "-9999px";
                  var l = window.pageYOffset || document.documentElement.scrollTop;
                  return a.style.top = "".concat(l, "px"), a.setAttribute("readonly", ""), a.value = d, a;
                }
                var U = function(i, a) {
                  var l = C(i);
                  a.container.appendChild(l);
                  var f = E()(l);
                  return g("copy"), l.remove(), f;
                }, W = function(i) {
                  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    container: document.body
                  }, l = "";
                  return typeof i == "string" ? l = U(i, a) : i instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(i == null ? void 0 : i.type) ? l = U(i.value, a) : (l = E()(i), g("copy")), l;
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
                  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = i.action, l = a === void 0 ? "copy" : a, f = i.container, m = i.target, w = i.text;
                  if (l !== "copy" && l !== "cut")
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  if (m !== void 0)
                    if (m && $(m) === "object" && m.nodeType === 1) {
                      if (l === "copy" && m.hasAttribute("disabled"))
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      if (l === "cut" && (m.hasAttribute("readonly") || m.hasAttribute("disabled")))
                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                    } else
                      throw new Error('Invalid "target" value, use a valid Element');
                  if (w)
                    return z(w, {
                      container: f
                    });
                  if (m)
                    return l === "cut" ? j(m) : z(m, {
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
                    var l = i[a];
                    l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(d, l.key, l);
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
                  return I = Object.setPrototypeOf || function(l, f) {
                    return l.__proto__ = f, l;
                  }, I(d, i);
                }
                function ae(d) {
                  var i = se();
                  return function() {
                    var l = R(d), f;
                    if (i) {
                      var m = R(this).constructor;
                      f = Reflect.construct(l, arguments, m);
                    } else
                      f = l.apply(this, arguments);
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
                  function a(l, f) {
                    var m;
                    return ne(this, a), m = i.call(this), m.resolveOptions(f), m.listenClick(l), m;
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
                      this.listener = _()(f, "click", function(w) {
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
                      return j(f);
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
                }(o()), ce = le;
              }
            ),
            /***/
            828: (
              /***/
              function(u) {
                var n = 9;
                if (typeof Element < "u" && !Element.prototype.matches) {
                  var t = Element.prototype;
                  t.matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                }
                function r(o, s) {
                  for (; o && o.nodeType !== n; ) {
                    if (typeof o.matches == "function" && o.matches(s))
                      return o;
                    o = o.parentNode;
                  }
                }
                u.exports = r;
              }
            ),
            /***/
            438: (
              /***/
              function(u, n, t) {
                var r = t(828);
                function o(b, E, g, y, j) {
                  var C = _.apply(this, arguments);
                  return b.addEventListener(g, C, j), {
                    destroy: function() {
                      b.removeEventListener(g, C, j);
                    }
                  };
                }
                function s(b, E, g, y, j) {
                  return typeof b.addEventListener == "function" ? o.apply(null, arguments) : typeof g == "function" ? o.bind(null, document).apply(null, arguments) : (typeof b == "string" && (b = document.querySelectorAll(b)), Array.prototype.map.call(b, function(C) {
                    return o(C, E, g, y, j);
                  }));
                }
                function _(b, E, g, y) {
                  return function(j) {
                    j.delegateTarget = r(j.target, E), j.delegateTarget && y.call(b, j);
                  };
                }
                u.exports = s;
              }
            ),
            /***/
            879: (
              /***/
              function(u, n) {
                n.node = function(t) {
                  return t !== void 0 && t instanceof HTMLElement && t.nodeType === 1;
                }, n.nodeList = function(t) {
                  var r = Object.prototype.toString.call(t);
                  return t !== void 0 && (r === "[object NodeList]" || r === "[object HTMLCollection]") && "length" in t && (t.length === 0 || n.node(t[0]));
                }, n.string = function(t) {
                  return typeof t == "string" || t instanceof String;
                }, n.fn = function(t) {
                  var r = Object.prototype.toString.call(t);
                  return r === "[object Function]";
                };
              }
            ),
            /***/
            370: (
              /***/
              function(u, n, t) {
                var r = t(879), o = t(438);
                function s(g, y, j) {
                  if (!g && !y && !j)
                    throw new Error("Missing required arguments");
                  if (!r.string(y))
                    throw new TypeError("Second argument must be a String");
                  if (!r.fn(j))
                    throw new TypeError("Third argument must be a Function");
                  if (r.node(g))
                    return _(g, y, j);
                  if (r.nodeList(g))
                    return b(g, y, j);
                  if (r.string(g))
                    return E(g, y, j);
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
                function _(g, y, j) {
                  return g.addEventListener(y, j), {
                    destroy: function() {
                      g.removeEventListener(y, j);
                    }
                  };
                }
                function b(g, y, j) {
                  return Array.prototype.forEach.call(g, function(C) {
                    C.addEventListener(y, j);
                  }), {
                    destroy: function() {
                      Array.prototype.forEach.call(g, function(C) {
                        C.removeEventListener(y, j);
                      });
                    }
                  };
                }
                function E(g, y, j) {
                  return o(document.body, g, y, j);
                }
                u.exports = s;
              }
            ),
            /***/
            817: (
              /***/
              function(u) {
                function n(t) {
                  var r;
                  if (t.nodeName === "SELECT")
                    t.focus(), r = t.value;
                  else if (t.nodeName === "INPUT" || t.nodeName === "TEXTAREA") {
                    var o = t.hasAttribute("readonly");
                    o || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), o || t.removeAttribute("readonly"), r = t.value;
                  } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var s = window.getSelection(), _ = document.createRange();
                    _.selectNodeContents(t), s.removeAllRanges(), s.addRange(_), r = s.toString();
                  }
                  return r;
                }
                u.exports = n;
              }
            ),
            /***/
            279: (
              /***/
              function(u) {
                function n() {
                }
                n.prototype = {
                  on: function(t, r, o) {
                    var s = this.e || (this.e = {});
                    return (s[t] || (s[t] = [])).push({
                      fn: r,
                      ctx: o
                    }), this;
                  },
                  once: function(t, r, o) {
                    var s = this;
                    function _() {
                      s.off(t, _), r.apply(o, arguments);
                    }
                    return _._ = r, this.on(t, _, o);
                  },
                  emit: function(t) {
                    var r = [].slice.call(arguments, 1), o = ((this.e || (this.e = {}))[t] || []).slice(), s = 0, _ = o.length;
                    for (s; s < _; s++)
                      o[s].fn.apply(o[s].ctx, r);
                    return this;
                  },
                  off: function(t, r) {
                    var o = this.e || (this.e = {}), s = o[t], _ = [];
                    if (s && r)
                      for (var b = 0, E = s.length; b < E; b++)
                        s[b].fn !== r && s[b].fn._ !== r && _.push(s[b]);
                    return _.length ? o[t] = _ : delete o[t], this;
                  }
                }, u.exports = n, u.exports.TinyEmitter = n;
              }
            )
            /******/
          }, p = {};
          function v(u) {
            if (p[u])
              return p[u].exports;
            var n = p[u] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            return c[u](n, n.exports, v), n.exports;
          }
          return function() {
            v.n = function(u) {
              var n = u && u.__esModule ? (
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
              return v.d(n, { a: n }), n;
            };
          }(), function() {
            v.d = function(u, n) {
              for (var t in n)
                v.o(n, t) && !v.o(u, t) && Object.defineProperty(u, t, { enumerable: !0, get: n[t] });
            };
          }(), function() {
            v.o = function(u, n) {
              return Object.prototype.hasOwnProperty.call(u, n);
            };
          }(), v(686);
        }().default
      );
    });
  }(P)), P.exports;
}
var Me = Ve();
const $e = /* @__PURE__ */ Ae(Me), Re = function(e, h) {
  let c = Date.now(), p;
  return (...v) => {
    Date.now() - c < h && p && clearTimeout(p), p = setTimeout(() => {
      e(...v);
    }, h), c = Date.now();
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
    const c = T(!1), p = T(!1), v = T(e.expanded), u = T(null), n = T(null);
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
    }), o = O(() => {
      if (!e.parse || typeof e.value != "string")
        return e.value;
      try {
        return JSON.parse(e.value);
      } catch {
        return e.value;
      }
    }), s = () => {
      b();
    }, b = Re(() => {
      fe(() => {
        n.value && (n.value.$el.clientHeight >= 250 ? p.value = !0 : p.value = !1);
      });
    }, 200), E = (y) => {
      c.value || (c.value = !0, setTimeout(() => {
        c.value = !1;
      }, r.value.timeout), h("copied", y));
    }, g = () => {
      v.value = !v.value;
    };
    return J(() => e.value, () => {
      s();
    }), H(() => {
      e.boxed && n.value && (s(), n.value.$el.addEventListener("resized", s, !0)), e.copyable && u.value && new $e(u.value, {
        text: () => JSON.stringify(o.value, null, 2)
        // Use parseValue for copying
      }).on("success", E);
    }), {
      clip: u,
      jsonBox: n,
      copied: c,
      expandableCode: p,
      expandCode: v,
      jvClass: t,
      copyText: r,
      parseValue: o,
      toggleExpandCode: g
      // Methods are already bound or don't need explicit exposure if not used in template
      // onResized, // only called internally
      // debResized, // only called internally
      // onCopied, // only called internally
    };
  }
}), Le = (e, h) => {
  const c = e.__vccOpts || e;
  for (const [p, v] of h)
    c[p] = v;
  return c;
};
function De(e, h, c, p, v, u) {
  const n = de("json-box");
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
      ye(n, {
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
