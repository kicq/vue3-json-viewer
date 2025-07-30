import { defineComponent as C, ref as w, onMounted as H, h as b, computed as O, createElementBlock as N, openBlock as A, normalizeClass as k, toDisplayString as V, watch as J, inject as F, provide as I, nextTick as fe, resolveComponent as de, createCommentVNode as Z, createElementVNode as q, renderSlot as pe, createTextVNode as ve, createVNode as ye } from "vue";
const me = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, G = C({
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
    const m = w(!0), c = w(!1), y = w(null), s = w(null);
    H(() => {
      y.value && s.value && y.value.offsetHeight > s.value.offsetHeight && (c.value = !0);
    });
    const u = () => {
      m.value = !m.value;
    };
    return () => {
      const o = e.jsonValue, t = me.test(o);
      let n;
      !m.value && c.value ? n = b("span", {
        class: { "jv-ellipsis": !0 },
        onClick: u
      }, "...") : t ? n = b("span", { class: { "jv-item": !0, "jv-string": !0 }, ref: y }, [
        b("span", null, '"'),
        // Opening quote
        b("a", { href: o, target: "_blank", class: "jv-link" }, o),
        b("span", null, '"')
        // Closing quote
      ]) : n = b("span", {
        class: { "jv-item": !0, "jv-string": !0 },
        ref: y
        // Assign ref for height calculation
      }, `"${o}"`);
      const r = [];
      return c.value && r.push(b("span", {
        class: {
          "jv-toggle": !0,
          // CSS class for the toggle button
          open: m.value
          // Class to indicate open/closed state
        },
        onClick: u
      })), r.push(b("span", { class: { "jv-holder-node": !0 }, ref: s })), r.push(n), b("span", {}, r);
    };
  }
}), he = {
  class: /* @__PURE__ */ k(["jv-item", "jv-undefined"])
}, ge = /* @__PURE__ */ C({
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
    const m = e, c = O(() => m.jsonValue === null ? "null" : "undefined");
    return (y, s) => (A(), N("span", he, V(c.value), 1));
  }
}), be = /* @__PURE__ */ C({
  __name: "json-number",
  props: {
    /** The number value to display. */
    jsonValue: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const m = e, c = O(() => Number.isInteger(m.jsonValue));
    return (y, s) => (A(), N("span", {
      class: k(["jv-item", "jv-number", c.value ? "jv-number-integer" : "jv-number-float"])
    }, V(e.jsonValue.toString()), 3));
  }
}), je = {
  class: /* @__PURE__ */ k(["jv-item", "jv-boolean"])
}, xe = /* @__PURE__ */ C({
  __name: "json-boolean",
  props: {
    /** The boolean value to display. */
    jsonValue: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (m, c) => (A(), N("span", je, V(e.jsonValue.toString()), 1));
  }
}), Ee = C({
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
  setup(e, { emit: m }) {
    const c = w({});
    let y = null;
    const s = (n) => {
      setTimeout(() => {
        c.value = n;
      }, 0);
    };
    J(() => e.jsonValue, (n) => {
      s(n);
    }, { immediate: !0, deep: !0 });
    const u = O(() => {
      if (!e.sort)
        return c.value;
      const n = Object.keys(c.value).sort(), r = {};
      return n.forEach((f) => {
        r[f] = c.value[f];
      }), r;
    }), o = () => {
      if (y)
        try {
          y.dispatchEvent(new Event("resized"));
        } catch {
          const r = document.createEvent("Event");
          r.initEvent("resized", !0, !1), y.dispatchEvent(r);
        }
    }, t = () => {
      m("update:expand", !e.expand), o();
    };
    return () => {
      const n = [];
      if (n.push(b("span", { class: ["jv-item", "jv-object"] }, "{")), e.expand) {
        for (const r in u.value)
          if (u.value.hasOwnProperty(r)) {
            const f = u.value[r];
            n.push(b(K, {
              key: r,
              // style: { display: !props.expand ? 'none' : undefined }, // Redundant
              sort: e.sort,
              keyName: r,
              depth: e.depth + 1,
              value: f,
              previewMode: e.previewMode
            }));
          }
      }
      return !e.expand && Object.keys(c.value).length > 0 && n.push(b("span", {
        // style: { display: props.expand ? 'none' : undefined }, // Redundant
        class: "jv-ellipsis",
        onClick: t,
        title: `click to reveal object content (keys: ${Object.keys(u.value).join(", ")})`
      }, "...")), n.push(b("span", { class: ["jv-item", "jv-object"] }, "}")), b("span", { ref: (r) => {
        y = r;
      } }, n);
    };
  }
}), _e = C({
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
  setup(e, { emit: m }) {
    const c = w([]);
    let y = null;
    const s = (o, t = 0) => {
      t === 0 && (c.value = []), setTimeout(() => {
        o && o.length > t && (c.value.push(o[t]), s(o, t + 1));
      }, 0);
    };
    J(() => e.jsonValue, (o) => {
      s(o);
    }, { immediate: !0, deep: !0 });
    const u = () => {
      if (m("update:expand", !e.expand), y)
        try {
          y.dispatchEvent(new Event("resized"));
        } catch {
          const t = document.createEvent("Event");
          t.initEvent("resized", !0, !1), y.dispatchEvent(t);
        }
    };
    return () => {
      const o = [];
      return !e.previewMode && !e.keyName && o.push(b("span", {
        class: {
          "jv-toggle": !0,
          open: !!e.expand
        },
        onClick: u
      })), o.push(b("span", {
        class: ["jv-item", "jv-array"]
      }, "[")), e.expand && c.value.forEach((t, n) => {
        o.push(b(K, {
          // Cast JsonBox to Component
          key: n,
          // style: { display: props.expand ? undefined : 'none' }, // This style is redundant if items are not rendered
          sort: e.sort,
          depth: e.depth + 1,
          value: t,
          previewMode: e.previewMode
        }));
      }), !e.expand && c.value.length > 0 && o.push(b("span", {
        class: "jv-ellipsis",
        onClick: u,
        title: `click to reveal ${c.value.length} hidden items`
      }, "...")), o.push(b("span", {
        class: ["jv-item", "jv-array"]
      }, "]")), b("span", { ref: (t) => {
        y = t;
      } }, o);
    };
  }
}), we = ["title"], Te = /* @__PURE__ */ C({
  __name: "json-function",
  props: {
    /** The Function object to represent. */
    jsonValue: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return (m, c) => (A(), N("span", {
      class: k(["jv-item", "jv-function"]),
      title: e.jsonValue.toString()
    }, " <function> ", 8, we));
  }
}), ke = {
  class: /* @__PURE__ */ k(["jv-item", "jv-string"])
}, Ce = /* @__PURE__ */ C({
  __name: "json-date",
  props: {
    /** The Date object to display. */
    jsonValue: {
      type: Date,
      required: !0
    }
  },
  setup(e) {
    const m = e, c = F("timeformat", (s) => s.toLocaleString()), y = O(() => c(m.jsonValue));
    return (s, u) => (A(), N("span", ke, ' "' + V(y.value) + '" ', 1));
  }
}), Se = {
  class: /* @__PURE__ */ k(["jv-item", "jv-regexp"])
}, Ne = /* @__PURE__ */ C({
  __name: "json-regexp",
  props: {
    /** The RegExp object to display. */
    jsonValue: {
      type: RegExp,
      required: !0
    }
  },
  setup(e) {
    return (m, c) => (A(), N("span", Se, V(e.jsonValue.toString()), 1));
  }
}), K = C({
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
  emits: [
    /** Event emitted when the component is expanded. */
    "expand",
    /** Event emitted when the component is collapsed. */
    "collapse"
  ],
  /**
   * Setup function for the JsonBox component.
   * @param props - The component's props.
   */
  setup(e, m) {
    const c = F("expandDepth", 1 / 0), y = F("keyClick", () => {
    }), s = w(!0);
    let u = null;
    H(() => {
      s.value = e.previewMode || e.depth < c;
    });
    const o = () => {
      console.log("Toggle called for:", e.keyName, "Current expand state:", s.value), s.value = !s.value;
      const t = s.value ? "expand" : "collapse";
      if (console.log("Emitting", t), m.emit(t, {
        keyName: e.keyName,
        value: e.value,
        depth: e.depth
      }), console.log("Emitting2", t), u)
        try {
          u.dispatchEvent(new Event("resized"));
        } catch {
          const r = document.createEvent("Event");
          r.initEvent("resized", !0, !1), u.dispatchEvent(r);
        }
    };
    return () => {
      const t = [];
      let n;
      e.value === null || e.value === void 0 ? n = ge : Array.isArray(e.value) ? n = _e : e.value instanceof Date ? n = Ce : e.value instanceof RegExp ? n = Ne : typeof e.value == "object" ? n = Ee : typeof e.value == "number" ? n = be : typeof e.value == "string" ? n = G : typeof e.value == "boolean" ? n = xe : typeof e.value == "function" ? n = Te : n = G;
      const r = e.value && (Array.isArray(e.value) || typeof e.value == "object" && !(e.value instanceof Date) && // Exclude Date
      !(e.value instanceof RegExp));
      return !e.previewMode && r && !(e.value instanceof RegExp) && t.push(
        b("span", {
          class: {
            "jv-toggle": !0,
            open: !!s.value
            // Double negation to ensure boolean
          },
          onClick: o
        })
      ), e.keyName && t.push(
        b("span", {
          class: "jv-key",
          // 'jv-key' is a string, not an object
          onClick: () => {
            y && y(e.keyName);
          }
        }, `${e.keyName}:`)
        // Text content as children
      ), t.push(
        b(n, {
          class: "jv-push",
          // 'jv-push' is a string
          jsonValue: e.value,
          keyName: e.keyName,
          // Pass keyName for context if needed by child
          sort: e.sort,
          // Pass sort for objects/arrays
          depth: e.depth,
          // Pass current depth
          expand: s.value,
          // Pass current expand state
          previewMode: e.previewMode,
          // Listen for 'update:expand' events from child components (e.g., JsonArray, JsonObject)
          // This allows children to request a change in their own expansion state.
          "onUpdate:expand": (f) => {
            s.value = f;
          }
        })
      ), b(
        "div",
        {
          class: {
            "jv-node": !0,
            "jv-key-node": !!e.keyName && !r,
            // Apply if keyName exists and not a complex type
            toggle: !e.previewMode && r
            // Apply if not preview and is complex for styling indent
          },
          ref: (f) => {
            u = f;
          }
        },
        t
      );
    };
  }
});
function Ae(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var L = { exports: {} };
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
var Oe = L.exports, X;
function Ve() {
  return X || (X = 1, function(e, m) {
    (function(y, s) {
      e.exports = s();
    })(Oe, function() {
      return (
        /******/
        function() {
          var c = {
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
                var n = t(279), r = /* @__PURE__ */ t.n(n), f = t(370), j = /* @__PURE__ */ t.n(f), E = t(817), _ = /* @__PURE__ */ t.n(E);
                function g(v) {
                  try {
                    return document.execCommand(v);
                  } catch {
                    return !1;
                  }
                }
                var x = function(i) {
                  var a = _()(i);
                  return g("cut"), a;
                }, d = x;
                function S(v) {
                  var i = document.documentElement.getAttribute("dir") === "rtl", a = document.createElement("textarea");
                  a.style.fontSize = "12pt", a.style.border = "0", a.style.padding = "0", a.style.margin = "0", a.style.position = "absolute", a.style[i ? "right" : "left"] = "-9999px";
                  var l = window.pageYOffset || document.documentElement.scrollTop;
                  return a.style.top = "".concat(l, "px"), a.setAttribute("readonly", ""), a.value = v, a;
                }
                var U = function(i, a) {
                  var l = S(i);
                  a.container.appendChild(l);
                  var p = _()(l);
                  return g("copy"), l.remove(), p;
                }, W = function(i) {
                  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    container: document.body
                  }, l = "";
                  return typeof i == "string" ? l = U(i, a) : i instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(i == null ? void 0 : i.type) ? l = U(i.value, a) : (l = _()(i), g("copy")), l;
                }, D = W;
                function $(v) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? $ = function(a) {
                    return typeof a;
                  } : $ = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, $(v);
                }
                var ee = function() {
                  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = i.action, l = a === void 0 ? "copy" : a, p = i.container, h = i.target, T = i.text;
                  if (l !== "copy" && l !== "cut")
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  if (h !== void 0)
                    if (h && $(h) === "object" && h.nodeType === 1) {
                      if (l === "copy" && h.hasAttribute("disabled"))
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      if (l === "cut" && (h.hasAttribute("readonly") || h.hasAttribute("disabled")))
                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                    } else
                      throw new Error('Invalid "target" value, use a valid Element');
                  if (T)
                    return D(T, {
                      container: p
                    });
                  if (h)
                    return l === "cut" ? d(h) : D(h, {
                      container: p
                    });
                }, te = ee;
                function M(v) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? M = function(a) {
                    return typeof a;
                  } : M = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, M(v);
                }
                function ne(v, i) {
                  if (!(v instanceof i))
                    throw new TypeError("Cannot call a class as a function");
                }
                function Y(v, i) {
                  for (var a = 0; a < i.length; a++) {
                    var l = i[a];
                    l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(v, l.key, l);
                  }
                }
                function oe(v, i, a) {
                  return i && Y(v.prototype, i), a && Y(v, a), v;
                }
                function re(v, i) {
                  if (typeof i != "function" && i !== null)
                    throw new TypeError("Super expression must either be null or a function");
                  v.prototype = Object.create(i && i.prototype, { constructor: { value: v, writable: !0, configurable: !0 } }), i && P(v, i);
                }
                function P(v, i) {
                  return P = Object.setPrototypeOf || function(l, p) {
                    return l.__proto__ = p, l;
                  }, P(v, i);
                }
                function ae(v) {
                  var i = se();
                  return function() {
                    var l = R(v), p;
                    if (i) {
                      var h = R(this).constructor;
                      p = Reflect.construct(l, arguments, h);
                    } else
                      p = l.apply(this, arguments);
                    return ie(this, p);
                  };
                }
                function ie(v, i) {
                  return i && (M(i) === "object" || typeof i == "function") ? i : ue(v);
                }
                function ue(v) {
                  if (v === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return v;
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
                function R(v) {
                  return R = Object.setPrototypeOf ? Object.getPrototypeOf : function(a) {
                    return a.__proto__ || Object.getPrototypeOf(a);
                  }, R(v);
                }
                function z(v, i) {
                  var a = "data-clipboard-".concat(v);
                  if (i.hasAttribute(a))
                    return i.getAttribute(a);
                }
                var le = /* @__PURE__ */ function(v) {
                  re(a, v);
                  var i = ae(a);
                  function a(l, p) {
                    var h;
                    return ne(this, a), h = i.call(this), h.resolveOptions(p), h.listenClick(l), h;
                  }
                  return oe(a, [{
                    key: "resolveOptions",
                    value: function() {
                      var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      this.action = typeof p.action == "function" ? p.action : this.defaultAction, this.target = typeof p.target == "function" ? p.target : this.defaultTarget, this.text = typeof p.text == "function" ? p.text : this.defaultText, this.container = M(p.container) === "object" ? p.container : document.body;
                    }
                    /**
                     * Adds a click event listener to the passed trigger.
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     */
                  }, {
                    key: "listenClick",
                    value: function(p) {
                      var h = this;
                      this.listener = j()(p, "click", function(T) {
                        return h.onClick(T);
                      });
                    }
                    /**
                     * Defines a new `ClipboardAction` on each click event.
                     * @param {Event} e
                     */
                  }, {
                    key: "onClick",
                    value: function(p) {
                      var h = p.delegateTarget || p.currentTarget, T = this.action(h) || "copy", B = te({
                        action: T,
                        container: this.container,
                        target: this.target(h),
                        text: this.text(h)
                      });
                      this.emit(B ? "success" : "error", {
                        action: T,
                        text: B,
                        trigger: h,
                        clearSelection: function() {
                          h && h.focus(), window.getSelection().removeAllRanges();
                        }
                      });
                    }
                    /**
                     * Default `action` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultAction",
                    value: function(p) {
                      return z("action", p);
                    }
                    /**
                     * Default `target` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultTarget",
                    value: function(p) {
                      var h = z("target", p);
                      if (h)
                        return document.querySelector(h);
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
                    value: function(p) {
                      return z("text", p);
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
                    value: function(p) {
                      var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                        container: document.body
                      };
                      return D(p, h);
                    }
                    /**
                     * Allow fire programmatically a cut action
                     * @param {String|HTMLElement} target
                     * @returns Text cutted.
                     */
                  }, {
                    key: "cut",
                    value: function(p) {
                      return d(p);
                    }
                    /**
                     * Returns the support of the given action, or all actions if no action is
                     * given.
                     * @param {String} [action]
                     */
                  }, {
                    key: "isSupported",
                    value: function() {
                      var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"], h = typeof p == "string" ? [p] : p, T = !!document.queryCommandSupported;
                      return h.forEach(function(B) {
                        T = T && !!document.queryCommandSupported(B);
                      }), T;
                    }
                  }]), a;
                }(r()), ce = le;
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
                function n(r, f) {
                  for (; r && r.nodeType !== o; ) {
                    if (typeof r.matches == "function" && r.matches(f))
                      return r;
                    r = r.parentNode;
                  }
                }
                u.exports = n;
              }
            ),
            /***/
            438: (
              /***/
              function(u, o, t) {
                var n = t(828);
                function r(E, _, g, x, d) {
                  var S = j.apply(this, arguments);
                  return E.addEventListener(g, S, d), {
                    destroy: function() {
                      E.removeEventListener(g, S, d);
                    }
                  };
                }
                function f(E, _, g, x, d) {
                  return typeof E.addEventListener == "function" ? r.apply(null, arguments) : typeof g == "function" ? r.bind(null, document).apply(null, arguments) : (typeof E == "string" && (E = document.querySelectorAll(E)), Array.prototype.map.call(E, function(S) {
                    return r(S, _, g, x, d);
                  }));
                }
                function j(E, _, g, x) {
                  return function(d) {
                    d.delegateTarget = n(d.target, _), d.delegateTarget && x.call(E, d);
                  };
                }
                u.exports = f;
              }
            ),
            /***/
            879: (
              /***/
              function(u, o) {
                o.node = function(t) {
                  return t !== void 0 && t instanceof HTMLElement && t.nodeType === 1;
                }, o.nodeList = function(t) {
                  var n = Object.prototype.toString.call(t);
                  return t !== void 0 && (n === "[object NodeList]" || n === "[object HTMLCollection]") && "length" in t && (t.length === 0 || o.node(t[0]));
                }, o.string = function(t) {
                  return typeof t == "string" || t instanceof String;
                }, o.fn = function(t) {
                  var n = Object.prototype.toString.call(t);
                  return n === "[object Function]";
                };
              }
            ),
            /***/
            370: (
              /***/
              function(u, o, t) {
                var n = t(879), r = t(438);
                function f(g, x, d) {
                  if (!g && !x && !d)
                    throw new Error("Missing required arguments");
                  if (!n.string(x))
                    throw new TypeError("Second argument must be a String");
                  if (!n.fn(d))
                    throw new TypeError("Third argument must be a Function");
                  if (n.node(g))
                    return j(g, x, d);
                  if (n.nodeList(g))
                    return E(g, x, d);
                  if (n.string(g))
                    return _(g, x, d);
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
                function j(g, x, d) {
                  return g.addEventListener(x, d), {
                    destroy: function() {
                      g.removeEventListener(x, d);
                    }
                  };
                }
                function E(g, x, d) {
                  return Array.prototype.forEach.call(g, function(S) {
                    S.addEventListener(x, d);
                  }), {
                    destroy: function() {
                      Array.prototype.forEach.call(g, function(S) {
                        S.removeEventListener(x, d);
                      });
                    }
                  };
                }
                function _(g, x, d) {
                  return r(document.body, g, x, d);
                }
                u.exports = f;
              }
            ),
            /***/
            817: (
              /***/
              function(u) {
                function o(t) {
                  var n;
                  if (t.nodeName === "SELECT")
                    t.focus(), n = t.value;
                  else if (t.nodeName === "INPUT" || t.nodeName === "TEXTAREA") {
                    var r = t.hasAttribute("readonly");
                    r || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), r || t.removeAttribute("readonly"), n = t.value;
                  } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var f = window.getSelection(), j = document.createRange();
                    j.selectNodeContents(t), f.removeAllRanges(), f.addRange(j), n = f.toString();
                  }
                  return n;
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
                  on: function(t, n, r) {
                    var f = this.e || (this.e = {});
                    return (f[t] || (f[t] = [])).push({
                      fn: n,
                      ctx: r
                    }), this;
                  },
                  once: function(t, n, r) {
                    var f = this;
                    function j() {
                      f.off(t, j), n.apply(r, arguments);
                    }
                    return j._ = n, this.on(t, j, r);
                  },
                  emit: function(t) {
                    var n = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[t] || []).slice(), f = 0, j = r.length;
                    for (f; f < j; f++)
                      r[f].fn.apply(r[f].ctx, n);
                    return this;
                  },
                  off: function(t, n) {
                    var r = this.e || (this.e = {}), f = r[t], j = [];
                    if (f && n)
                      for (var E = 0, _ = f.length; E < _; E++)
                        f[E].fn !== n && f[E].fn._ !== n && j.push(f[E]);
                    return j.length ? r[t] = j : delete r[t], this;
                  }
                }, u.exports = o, u.exports.TinyEmitter = o;
              }
            )
            /******/
          }, y = {};
          function s(u) {
            if (y[u])
              return y[u].exports;
            var o = y[u] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            return c[u](o, o.exports, s), o.exports;
          }
          return function() {
            s.n = function(u) {
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
              return s.d(o, { a: o }), o;
            };
          }(), function() {
            s.d = function(u, o) {
              for (var t in o)
                s.o(o, t) && !s.o(u, t) && Object.defineProperty(u, t, { enumerable: !0, get: o[t] });
            };
          }(), function() {
            s.o = function(u, o) {
              return Object.prototype.hasOwnProperty.call(u, o);
            };
          }(), s(686);
        }().default
      );
    });
  }(L)), L.exports;
}
var Me = Ve();
const $e = /* @__PURE__ */ Ae(Me), Re = function(e, m) {
  let c = Date.now(), y;
  return (...s) => {
    Date.now() - c < m && y && clearTimeout(y), y = setTimeout(() => {
      e(...s);
    }, m), c = Date.now();
  };
}, Be = C({
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
  emits: ["onKeyClick", "copied", "expand", "collapse"],
  /**
   * Setup function for the JsonViewer component.
   * @param props - The component's props.
   * @param context - The setup context, including `emit`.
   */
  setup(e, { emit: m }) {
    const c = w(!1), y = w(!1), s = w(e.expanded), u = w(null), o = w(null);
    I("expandDepth", e.expandDepth), I("timeformat", e.timeformat), I("keyClick", (d) => {
      m("onKeyClick", d);
    });
    const t = (d) => {
      console.log("onExpand", d), m("expand", d);
    }, n = O(() => "jv-container jv-" + e.theme + (e.boxed ? " boxed" : "")), r = O(() => {
      if (typeof e.copyable == "boolean" && !e.copyable)
        return { copyText: "copy", copiedText: "copied!", timeout: 2e3, align: "right" };
      const d = e.copyable;
      return {
        copyText: d.copyText || "copy",
        copiedText: d.copiedText || "copied!",
        timeout: d.timeout || 2e3,
        align: d.align || "right"
      };
    }), f = O(() => {
      if (!e.parse || typeof e.value != "string")
        return e.value;
      try {
        return JSON.parse(e.value);
      } catch {
        return e.value;
      }
    }), j = () => {
      _();
    }, _ = Re(() => {
      fe(() => {
        o.value && (o.value.$el.clientHeight >= 250 ? y.value = !0 : y.value = !1);
      });
    }, 200), g = (d) => {
      c.value || (c.value = !0, setTimeout(() => {
        c.value = !1;
      }, r.value.timeout), m("copied", d));
    }, x = () => {
      s.value = !s.value;
    };
    return J(() => e.value, () => {
      j();
    }), H(() => {
      e.boxed && o.value && (j(), o.value.$el.addEventListener("resized", j, !0)), e.copyable && u.value && new $e(u.value, {
        text: () => JSON.stringify(f.value, null, 2)
        // Use parseValue for copying
      }).on("success", g);
    }), {
      clip: u,
      jsonBox: o,
      copied: c,
      expandableCode: y,
      expandCode: s,
      jvClass: n,
      copyText: r,
      parseValue: f,
      toggleExpandCode: x,
      onExpand: t
      // Methods are already bound or don't need explicit exposure if not used in template
      // onResized, // only called internally
      // debResized, // only called internally
      // onCopied, // only called internally
    };
  }
}), Le = (e, m) => {
  const c = e.__vccOpts || e;
  for (const [y, s] of m)
    c[y] = s;
  return c;
};
function De(e, m, c, y, s, u) {
  const o = de("json-box");
  return A(), N("div", {
    class: k(e.jvClass)
  }, [
    e.copyable ? (A(), N("div", {
      key: 0,
      class: k(`jv-tooltip ${e.copyText.align || "right"}`)
    }, [
      q("span", {
        ref: "clip",
        class: k(["jv-button", { copied: e.copied }])
      }, [
        pe(e.$slots, "copy", { copied: e.copied }, () => [
          ve(V(e.copied ? e.copyText.copiedText : e.copyText.copyText), 1)
        ])
      ], 2)
    ], 2)) : Z("", !0),
    q("div", {
      class: k(["jv-code", { open: e.expandCode, boxed: e.boxed }])
    }, [
      ye(o, {
        ref: "jsonBox",
        value: e.parseValue,
        sort: e.sort,
        "preview-mode": e.previewMode,
        onExpand: e.onExpand,
        onCollapse: m[0] || (m[0] = (t) => e.$emit("collapse", t))
      }, null, 8, ["value", "sort", "preview-mode", "onExpand"])
    ], 2),
    e.expandableCode && e.boxed ? (A(), N("div", {
      key: 1,
      class: "jv-more",
      onClick: m[1] || (m[1] = (...t) => e.toggleExpandCode && e.toggleExpandCode(...t))
    }, [
      q("span", {
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
