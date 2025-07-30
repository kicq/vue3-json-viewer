import { defineComponent as C, ref as w, onMounted as H, h as j, computed as O, createElementBlock as N, openBlock as A, normalizeClass as k, toDisplayString as V, watch as J, inject as F, provide as I, nextTick as fe, resolveComponent as de, createCommentVNode as Z, createElementVNode as q, renderSlot as pe, createTextVNode as ve, createVNode as ye } from "vue";
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
    const y = w(!0), c = w(!1), v = w(null), s = w(null);
    H(() => {
      v.value && s.value && v.value.offsetHeight > s.value.offsetHeight && (c.value = !0);
    });
    const u = () => {
      y.value = !y.value;
    };
    return () => {
      const o = e.jsonValue, t = me.test(o);
      let n;
      !y.value && c.value ? n = j("span", {
        class: { "jv-ellipsis": !0 },
        onClick: u
      }, "...") : t ? n = j("span", { class: { "jv-item": !0, "jv-string": !0 }, ref: v }, [
        j("span", null, '"'),
        // Opening quote
        j("a", { href: o, target: "_blank", class: "jv-link" }, o),
        j("span", null, '"')
        // Closing quote
      ]) : n = j("span", {
        class: { "jv-item": !0, "jv-string": !0 },
        ref: v
        // Assign ref for height calculation
      }, `"${o}"`);
      const r = [];
      return c.value && r.push(j("span", {
        class: {
          "jv-toggle": !0,
          // CSS class for the toggle button
          open: y.value
          // Class to indicate open/closed state
        },
        onClick: u
      })), r.push(j("span", { class: { "jv-holder-node": !0 }, ref: s })), r.push(n), j("span", {}, r);
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
    const y = e, c = O(() => y.jsonValue === null ? "null" : "undefined");
    return (v, s) => (A(), N("span", he, V(c.value), 1));
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
    const y = e, c = O(() => Number.isInteger(y.jsonValue));
    return (v, s) => (A(), N("span", {
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
    return (y, c) => (A(), N("span", je, V(e.jsonValue.toString()), 1));
  }
}), _e = C({
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
  setup(e, { emit: y }) {
    const c = w({});
    let v = null;
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
      if (v)
        try {
          v.dispatchEvent(new Event("resized"));
        } catch {
          const r = document.createEvent("Event");
          r.initEvent("resized", !0, !1), v.dispatchEvent(r);
        }
    }, t = () => {
      y("update:expand", !e.expand), o();
    };
    return () => {
      const n = [];
      if (n.push(j("span", { class: ["jv-item", "jv-object"] }, "{")), e.expand) {
        for (const r in u.value)
          if (u.value.hasOwnProperty(r)) {
            const f = u.value[r];
            n.push(j(K, {
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
      return !e.expand && Object.keys(c.value).length > 0 && n.push(j("span", {
        // style: { display: props.expand ? 'none' : undefined }, // Redundant
        class: "jv-ellipsis",
        onClick: t,
        title: `click to reveal object content (keys: ${Object.keys(u.value).join(", ")})`
      }, "...")), n.push(j("span", { class: ["jv-item", "jv-object"] }, "}")), j("span", { ref: (r) => {
        v = r;
      } }, n);
    };
  }
}), Ee = C({
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
  setup(e, { emit: y }) {
    const c = w([]);
    let v = null;
    const s = (o, t = 0) => {
      t === 0 && (c.value = []), setTimeout(() => {
        o && o.length > t && (c.value.push(o[t]), s(o, t + 1));
      }, 0);
    };
    J(() => e.jsonValue, (o) => {
      s(o);
    }, { immediate: !0, deep: !0 });
    const u = () => {
      if (y("update:expand", !e.expand), v)
        try {
          v.dispatchEvent(new Event("resized"));
        } catch {
          const t = document.createEvent("Event");
          t.initEvent("resized", !0, !1), v.dispatchEvent(t);
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
      }, "[")), e.expand && c.value.forEach((t, n) => {
        o.push(j(K, {
          // Cast JsonBox to Component
          key: n,
          // style: { display: props.expand ? undefined : 'none' }, // This style is redundant if items are not rendered
          sort: e.sort,
          depth: e.depth + 1,
          value: t,
          previewMode: e.previewMode
        }));
      }), !e.expand && c.value.length > 0 && o.push(j("span", {
        class: "jv-ellipsis",
        onClick: u,
        title: `click to reveal ${c.value.length} hidden items`
      }, "...")), o.push(j("span", {
        class: ["jv-item", "jv-array"]
      }, "]")), j("span", { ref: (t) => {
        v = t;
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
    return (y, c) => (A(), N("span", {
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
    const y = e, c = F("timeformat", (s) => s.toLocaleString()), v = O(() => c(y.jsonValue));
    return (s, u) => (A(), N("span", ke, ' "' + V(v.value) + '" ', 1));
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
    return (y, c) => (A(), N("span", Se, V(e.jsonValue.toString()), 1));
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
  setup(e, y) {
    const c = F("expandDepth", 1 / 0), v = F("keyClick", () => {
    }), s = w(!0);
    let u = null;
    H(() => {
      s.value = e.previewMode || e.depth < c;
    });
    const o = () => {
      console.log("Toggle called for:", e.keyName, "Current expand state:", s.value), s.value = !s.value;
      const t = s.value ? "expand" : "collapse";
      if (y.emit(t, {
        keyName: e.keyName,
        value: e.value,
        depth: e.depth
      }), u)
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
      e.value === null || e.value === void 0 ? n = ge : Array.isArray(e.value) ? n = Ee : e.value instanceof Date ? n = Ce : e.value instanceof RegExp ? n = Ne : typeof e.value == "object" ? n = _e : typeof e.value == "number" ? n = be : typeof e.value == "string" ? n = G : typeof e.value == "boolean" ? n = xe : typeof e.value == "function" ? n = Te : n = G;
      const r = e.value && (Array.isArray(e.value) || typeof e.value == "object" && !(e.value instanceof Date) && // Exclude Date
      !(e.value instanceof RegExp));
      return !e.previewMode && r && !(e.value instanceof RegExp) && t.push(
        j("span", {
          class: {
            "jv-toggle": !0,
            open: !!s.value
            // Double negation to ensure boolean
          },
          onClick: o
        })
      ), e.keyName && t.push(
        j("span", {
          class: "jv-key",
          // 'jv-key' is a string, not an object
          onClick: () => {
            v && v(e.keyName);
          }
        }, `${e.keyName}:`)
        // Text content as children
      ), t.push(
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
          expand: s.value,
          // Pass current expand state
          previewMode: e.previewMode,
          // Listen for 'update:expand' events from child components (e.g., JsonArray, JsonObject)
          // This allows children to request a change in their own expansion state.
          "onUpdate:expand": (f) => {
            s.value = f;
          }
        })
      ), j(
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
  return X || (X = 1, function(e, y) {
    (function(v, s) {
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
                var n = t(279), r = /* @__PURE__ */ t.n(n), f = t(370), _ = /* @__PURE__ */ t.n(f), x = t(817), E = /* @__PURE__ */ t.n(x);
                function g(p) {
                  try {
                    return document.execCommand(p);
                  } catch {
                    return !1;
                  }
                }
                var h = function(i) {
                  var a = E()(i);
                  return g("cut"), a;
                }, b = h;
                function S(p) {
                  var i = document.documentElement.getAttribute("dir") === "rtl", a = document.createElement("textarea");
                  a.style.fontSize = "12pt", a.style.border = "0", a.style.padding = "0", a.style.margin = "0", a.style.position = "absolute", a.style[i ? "right" : "left"] = "-9999px";
                  var l = window.pageYOffset || document.documentElement.scrollTop;
                  return a.style.top = "".concat(l, "px"), a.setAttribute("readonly", ""), a.value = p, a;
                }
                var U = function(i, a) {
                  var l = S(i);
                  a.container.appendChild(l);
                  var d = E()(l);
                  return g("copy"), l.remove(), d;
                }, W = function(i) {
                  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    container: document.body
                  }, l = "";
                  return typeof i == "string" ? l = U(i, a) : i instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(i == null ? void 0 : i.type) ? l = U(i.value, a) : (l = E()(i), g("copy")), l;
                }, D = W;
                function $(p) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? $ = function(a) {
                    return typeof a;
                  } : $ = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, $(p);
                }
                var ee = function() {
                  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = i.action, l = a === void 0 ? "copy" : a, d = i.container, m = i.target, T = i.text;
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
                  if (T)
                    return D(T, {
                      container: d
                    });
                  if (m)
                    return l === "cut" ? b(m) : D(m, {
                      container: d
                    });
                }, te = ee;
                function M(p) {
                  "@babel/helpers - typeof";
                  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? M = function(a) {
                    return typeof a;
                  } : M = function(a) {
                    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                  }, M(p);
                }
                function ne(p, i) {
                  if (!(p instanceof i))
                    throw new TypeError("Cannot call a class as a function");
                }
                function Y(p, i) {
                  for (var a = 0; a < i.length; a++) {
                    var l = i[a];
                    l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(p, l.key, l);
                  }
                }
                function oe(p, i, a) {
                  return i && Y(p.prototype, i), a && Y(p, a), p;
                }
                function re(p, i) {
                  if (typeof i != "function" && i !== null)
                    throw new TypeError("Super expression must either be null or a function");
                  p.prototype = Object.create(i && i.prototype, { constructor: { value: p, writable: !0, configurable: !0 } }), i && P(p, i);
                }
                function P(p, i) {
                  return P = Object.setPrototypeOf || function(l, d) {
                    return l.__proto__ = d, l;
                  }, P(p, i);
                }
                function ae(p) {
                  var i = se();
                  return function() {
                    var l = R(p), d;
                    if (i) {
                      var m = R(this).constructor;
                      d = Reflect.construct(l, arguments, m);
                    } else
                      d = l.apply(this, arguments);
                    return ie(this, d);
                  };
                }
                function ie(p, i) {
                  return i && (M(i) === "object" || typeof i == "function") ? i : ue(p);
                }
                function ue(p) {
                  if (p === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return p;
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
                function R(p) {
                  return R = Object.setPrototypeOf ? Object.getPrototypeOf : function(a) {
                    return a.__proto__ || Object.getPrototypeOf(a);
                  }, R(p);
                }
                function z(p, i) {
                  var a = "data-clipboard-".concat(p);
                  if (i.hasAttribute(a))
                    return i.getAttribute(a);
                }
                var le = /* @__PURE__ */ function(p) {
                  re(a, p);
                  var i = ae(a);
                  function a(l, d) {
                    var m;
                    return ne(this, a), m = i.call(this), m.resolveOptions(d), m.listenClick(l), m;
                  }
                  return oe(a, [{
                    key: "resolveOptions",
                    value: function() {
                      var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      this.action = typeof d.action == "function" ? d.action : this.defaultAction, this.target = typeof d.target == "function" ? d.target : this.defaultTarget, this.text = typeof d.text == "function" ? d.text : this.defaultText, this.container = M(d.container) === "object" ? d.container : document.body;
                    }
                    /**
                     * Adds a click event listener to the passed trigger.
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     */
                  }, {
                    key: "listenClick",
                    value: function(d) {
                      var m = this;
                      this.listener = _()(d, "click", function(T) {
                        return m.onClick(T);
                      });
                    }
                    /**
                     * Defines a new `ClipboardAction` on each click event.
                     * @param {Event} e
                     */
                  }, {
                    key: "onClick",
                    value: function(d) {
                      var m = d.delegateTarget || d.currentTarget, T = this.action(m) || "copy", B = te({
                        action: T,
                        container: this.container,
                        target: this.target(m),
                        text: this.text(m)
                      });
                      this.emit(B ? "success" : "error", {
                        action: T,
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
                    value: function(d) {
                      return z("action", d);
                    }
                    /**
                     * Default `target` lookup function.
                     * @param {Element} trigger
                     */
                  }, {
                    key: "defaultTarget",
                    value: function(d) {
                      var m = z("target", d);
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
                    value: function(d) {
                      return z("text", d);
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
                    value: function(d) {
                      var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                        container: document.body
                      };
                      return D(d, m);
                    }
                    /**
                     * Allow fire programmatically a cut action
                     * @param {String|HTMLElement} target
                     * @returns Text cutted.
                     */
                  }, {
                    key: "cut",
                    value: function(d) {
                      return b(d);
                    }
                    /**
                     * Returns the support of the given action, or all actions if no action is
                     * given.
                     * @param {String} [action]
                     */
                  }, {
                    key: "isSupported",
                    value: function() {
                      var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"], m = typeof d == "string" ? [d] : d, T = !!document.queryCommandSupported;
                      return m.forEach(function(B) {
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
                function r(x, E, g, h, b) {
                  var S = _.apply(this, arguments);
                  return x.addEventListener(g, S, b), {
                    destroy: function() {
                      x.removeEventListener(g, S, b);
                    }
                  };
                }
                function f(x, E, g, h, b) {
                  return typeof x.addEventListener == "function" ? r.apply(null, arguments) : typeof g == "function" ? r.bind(null, document).apply(null, arguments) : (typeof x == "string" && (x = document.querySelectorAll(x)), Array.prototype.map.call(x, function(S) {
                    return r(S, E, g, h, b);
                  }));
                }
                function _(x, E, g, h) {
                  return function(b) {
                    b.delegateTarget = n(b.target, E), b.delegateTarget && h.call(x, b);
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
                function f(g, h, b) {
                  if (!g && !h && !b)
                    throw new Error("Missing required arguments");
                  if (!n.string(h))
                    throw new TypeError("Second argument must be a String");
                  if (!n.fn(b))
                    throw new TypeError("Third argument must be a Function");
                  if (n.node(g))
                    return _(g, h, b);
                  if (n.nodeList(g))
                    return x(g, h, b);
                  if (n.string(g))
                    return E(g, h, b);
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
                function _(g, h, b) {
                  return g.addEventListener(h, b), {
                    destroy: function() {
                      g.removeEventListener(h, b);
                    }
                  };
                }
                function x(g, h, b) {
                  return Array.prototype.forEach.call(g, function(S) {
                    S.addEventListener(h, b);
                  }), {
                    destroy: function() {
                      Array.prototype.forEach.call(g, function(S) {
                        S.removeEventListener(h, b);
                      });
                    }
                  };
                }
                function E(g, h, b) {
                  return r(document.body, g, h, b);
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
                    var f = window.getSelection(), _ = document.createRange();
                    _.selectNodeContents(t), f.removeAllRanges(), f.addRange(_), n = f.toString();
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
                    function _() {
                      f.off(t, _), n.apply(r, arguments);
                    }
                    return _._ = n, this.on(t, _, r);
                  },
                  emit: function(t) {
                    var n = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[t] || []).slice(), f = 0, _ = r.length;
                    for (f; f < _; f++)
                      r[f].fn.apply(r[f].ctx, n);
                    return this;
                  },
                  off: function(t, n) {
                    var r = this.e || (this.e = {}), f = r[t], _ = [];
                    if (f && n)
                      for (var x = 0, E = f.length; x < E; x++)
                        f[x].fn !== n && f[x].fn._ !== n && _.push(f[x]);
                    return _.length ? r[t] = _ : delete r[t], this;
                  }
                }, u.exports = o, u.exports.TinyEmitter = o;
              }
            )
            /******/
          }, v = {};
          function s(u) {
            if (v[u])
              return v[u].exports;
            var o = v[u] = {
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
const $e = /* @__PURE__ */ Ae(Me), Re = function(e, y) {
  let c = Date.now(), v;
  return (...s) => {
    Date.now() - c < y && v && clearTimeout(v), v = setTimeout(() => {
      e(...s);
    }, y), c = Date.now();
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
  setup(e, { emit: y }) {
    const c = w(!1), v = w(!1), s = w(e.expanded), u = w(null), o = w(null);
    I("expandDepth", e.expandDepth), I("timeformat", e.timeformat), I("keyClick", (h) => {
      y("onKeyClick", h);
    });
    const t = O(() => "jv-container jv-" + e.theme + (e.boxed ? " boxed" : "")), n = O(() => {
      if (typeof e.copyable == "boolean" && !e.copyable)
        return { copyText: "copy", copiedText: "copied!", timeout: 2e3, align: "right" };
      const h = e.copyable;
      return {
        copyText: h.copyText || "copy",
        copiedText: h.copiedText || "copied!",
        timeout: h.timeout || 2e3,
        align: h.align || "right"
      };
    }), r = O(() => {
      if (!e.parse || typeof e.value != "string")
        return e.value;
      try {
        return JSON.parse(e.value);
      } catch {
        return e.value;
      }
    }), f = () => {
      x();
    }, x = Re(() => {
      fe(() => {
        o.value && (o.value.$el.clientHeight >= 250 ? v.value = !0 : v.value = !1);
      });
    }, 200), E = (h) => {
      c.value || (c.value = !0, setTimeout(() => {
        c.value = !1;
      }, n.value.timeout), y("copied", h));
    }, g = () => {
      s.value = !s.value;
    };
    return J(() => e.value, () => {
      f();
    }), H(() => {
      e.boxed && o.value && (f(), o.value.$el.addEventListener("resized", f, !0)), e.copyable && u.value && new $e(u.value, {
        text: () => JSON.stringify(r.value, null, 2)
        // Use parseValue for copying
      }).on("success", E);
    }), {
      clip: u,
      jsonBox: o,
      copied: c,
      expandableCode: v,
      expandCode: s,
      jvClass: t,
      copyText: n,
      parseValue: r,
      toggleExpandCode: g
      // Methods are already bound or don't need explicit exposure if not used in template
      // onResized, // only called internally
      // debResized, // only called internally
      // onCopied, // only called internally
    };
  }
}), Le = (e, y) => {
  const c = e.__vccOpts || e;
  for (const [v, s] of y)
    c[v] = s;
  return c;
};
function De(e, y, c, v, s, u) {
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
        onCollapse: y[0] || (y[0] = (t) => e.$emit("collapse", t))
      }, null, 8, ["value", "sort", "preview-mode", "onExpand"])
    ], 2),
    e.expandableCode && e.boxed ? (A(), N("div", {
      key: 1,
      class: "jv-more",
      onClick: y[1] || (y[1] = (...t) => e.toggleExpandCode && e.toggleExpandCode(...t))
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
