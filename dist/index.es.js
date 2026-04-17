import { Teleport as e, Transition as t, computed as n, createApp as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, h as d, normalizeClass as f, normalizeStyle as p, onBeforeUnmount as m, openBlock as h, reactive as g, ref as _, renderSlot as v, toDisplayString as y, useSlots as b, watch as x, withCtx as S, withModifiers as C } from "vue";
//#region src/components/Button/Button.vue?vue&type=script&setup=true&lang.ts
var w = ["disabled"], T = {
	key: 0,
	class: "btn__spinner",
	"aria-hidden": "true"
}, E = { class: "btn__content" }, D = /* @__PURE__ */ u({
	__name: "Button",
	props: {
		type: { default: "default" },
		size: { default: "medium" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		icon: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let r = e, i = t, c = n(() => r.disabled || r.loading), l = n(() => [
			"btn",
			`btn--type-${r.type}`,
			`btn--size-${r.size}`,
			{
				"btn--loading": r.loading,
				"btn--disabled": c.value
			}
		]);
		function u(e) {
			c.value || i("click", e);
		}
		return (t, n) => (h(), o("button", {
			class: f(l.value),
			disabled: c.value,
			type: "button",
			onClick: u
		}, [e.loading ? (h(), o("span", T)) : e.icon ? (h(), o("i", {
			key: 1,
			class: f(["btn__icon", e.icon]),
			"aria-hidden": "true"
		}, null, 2)) : a("", !0), s("span", E, [v(t.$slots, "default", {}, void 0, !0)])], 10, w));
	}
}), O = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, k = /* @__PURE__ */ O(D, [["__scopeId", "data-v-2e824de7"]]), A = ["aria-disabled"], j = [
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"maxlength"
], M = ["disabled"], N = {
	class: "input__counter",
	"aria-hidden": "true"
}, P = /* @__PURE__ */ O(/* @__PURE__ */ u({
	__name: "Input",
	props: {
		modelValue: { default: "" },
		size: { default: "medium" },
		placeholder: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		clearable: {
			type: Boolean,
			default: !1
		},
		maxlength: { default: 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, i = t, c = n({
			get: () => r.modelValue,
			set: (e) => i("update:modelValue", e)
		}), l = n(() => r.disabled), u = n(() => r.maxlength > 0 ? r.maxlength : void 0), d = n(() => {
			let e = c.value?.length ?? 0;
			return r.maxlength > 0 ? `${e}/${r.maxlength}` : `${e}`;
		}), p = n(() => !r.clearable || l.value || r.readonly ? !1 : (c.value?.length ?? 0) > 0), m = n(() => [
			"input",
			`input--size-${r.size}`,
			{
				"input--disabled": l.value,
				"input--readonly": r.readonly,
				"input--has-clear": p.value
			}
		]);
		function g(e) {
			c.value = e.target.value;
		}
		function _() {
			l.value || r.readonly || (c.value = "");
		}
		return (t, n) => (h(), o("div", {
			class: f(m.value),
			"aria-disabled": l.value
		}, [
			s("input", {
				class: f(["input__field", { "input__field--readonly": e.readonly }]),
				type: "text",
				value: c.value,
				placeholder: e.placeholder,
				disabled: l.value,
				readonly: e.readonly,
				maxlength: u.value,
				onInput: g
			}, null, 42, j),
			p.value ? (h(), o("button", {
				key: 0,
				class: "input__clear",
				type: "button",
				disabled: l.value || e.readonly,
				"aria-label": "Clear",
				onClick: _
			}, [...n[0] ||= [s("span", {
				class: "input__clear-icon",
				"aria-hidden": "true"
			}, "×", -1)]], 8, M)) : a("", !0),
			s("div", N, y(d.value), 1)
		], 10, A));
	}
}), [["__scopeId", "data-v-16944c57"]]), F = {
	key: 0,
	class: "modal"
}, I = {
	key: 0,
	class: "modal__header"
}, L = { class: "modal__headerInner" }, R = { class: "modal__title" }, z = { class: "modal__body" }, B = {
	key: 1,
	class: "modal__footer"
}, V = /* @__PURE__ */ O(/* @__PURE__ */ u({
	__name: "Modal",
	props: {
		visible: {
			type: Boolean,
			default: !1
		},
		title: { default: "" },
		width: { default: "520px" },
		showClose: {
			type: Boolean,
			default: !0
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["update:visible", "close"],
	setup(r, { emit: c }) {
		let u = r, d = c, f = n({
			get: () => u.visible,
			set: (e) => d("update:visible", e)
		}), g = b(), _ = n(() => !!g.header), w = n(() => !!g.footer);
		function T() {
			u.visible && (d("update:visible", !1), d("close"));
		}
		function E() {
			u.closeOnClickOverlay && T();
		}
		let D = 0, O = "", k = "";
		function A() {
			if (typeof document > "u") return;
			let e = document.body, t = document.documentElement;
			O = e.style.overflow, k = e.style.paddingRight;
			let n = window.innerWidth - t.clientWidth;
			n > 0 && (e.style.paddingRight = `${n}px`), e.style.overflow = "hidden";
		}
		function j() {
			if (typeof document > "u") return;
			let e = document.body;
			e.style.overflow = O, e.style.paddingRight = k;
		}
		return x(() => u.visible, (e) => {
			e ? (D += 1, D === 1 && A()) : (D = Math.max(0, D - 1), D === 0 && j());
		}, { immediate: !0 }), m(() => {
			u.visible && (D = Math.max(0, D - 1), D === 0 && j());
		}), (n, c) => (h(), i(e, { to: "body" }, [l(t, { name: "fade" }, {
			default: S(() => [f.value ? (h(), o("div", F, [s("div", {
				class: "modal__overlay",
				onClick: E
			}), s("div", {
				class: "modal__panel",
				style: p({ width: r.width }),
				role: "dialog",
				"aria-modal": "true",
				onClick: c[0] ||= C(() => {}, ["stop"])
			}, [
				r.title || _.value ? (h(), o("div", I, [v(n.$slots, "header", {}, () => [s("div", L, [s("div", R, y(r.title), 1), r.showClose ? (h(), o("button", {
					key: 0,
					class: "modal__close",
					type: "button",
					"aria-label": "Close",
					onClick: T
				}, " × ")) : a("", !0)])], !0)])) : a("", !0),
				s("div", z, [v(n.$slots, "default", {}, void 0, !0)]),
				w.value ? (h(), o("div", B, [v(n.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 4)])) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3764740c"]]), H = ["data-toast-position"], U = {
	key: 0,
	class: "toast__icon",
	"aria-hidden": "true"
}, W = { class: "toast__content" }, G = 8, K = /* @__PURE__ */ O(/* @__PURE__ */ u({
	__name: "Toast",
	props: {
		type: {},
		duration: { default: 3e3 },
		position: { default: "top" },
		visible: {
			type: Boolean,
			default: !0
		},
		message: { default: "" },
		closable: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["update:visible", "close"],
	setup(r, { emit: u }) {
		let d = r, g = u, b = _(d.visible);
		x(() => d.visible, (e) => {
			b.value = e;
		});
		let C = _(null), w = _(0), T = n(() => [
			"toast",
			`toast--type-${d.type}`,
			`toast--position-${d.position}`
		]);
		function E() {
			return d.position === "top" ? {
				top: "16px",
				bottom: "auto",
				transform: `translateX(-50%) translateY(${w.value}px)`
			} : d.position === "bottom" ? {
				top: "auto",
				bottom: "16px",
				transform: `translateX(-50%) translateY(${-w.value}px)`
			} : {
				top: "50%",
				bottom: "auto",
				transform: `translate(-50%, -50%) translateY(${w.value}px)`
			};
		}
		let D = n(() => E()), O;
		function k() {
			A();
			let e = d.duration;
			!e || e <= 0 || (O = window.setTimeout(() => j(), e));
		}
		function A() {
			O && window.clearTimeout(O), O = void 0;
		}
		function j() {
			b.value && (b.value = !1, g("update:visible", !1), g("close"), M());
		}
		function M() {
			typeof window > "u" || window.dispatchEvent(new CustomEvent("vue-ui-lib:toast-update", { detail: { position: d.position } }));
		}
		function N() {
			let e = C.value;
			if (!e) return;
			let t = d.position, n = Array.from(document.body.querySelectorAll(`.toast[data-toast-position="${t}"]`)).filter((e) => e.offsetHeight > 0), r = n.indexOf(e);
			if (r <= 0) {
				w.value = 0;
				return;
			}
			let i = 0;
			for (let e = 0; e < r; e++) i += n[e].offsetHeight + G;
			w.value = i;
		}
		x(b, (e) => {
			e ? k() : A();
		}, { immediate: !0 });
		function P(e) {
			let t = e.detail;
			t?.position && t.position !== d.position || requestAnimationFrame(() => N());
		}
		return typeof window < "u" && window.addEventListener("vue-ui-lib:toast-update", P), x(b, (e) => {
			e && requestAnimationFrame(() => N());
		}), m(() => {
			A(), typeof window < "u" && window.removeEventListener("vue-ui-lib:toast-update", P);
		}), (n, u) => (h(), i(e, { to: "body" }, [l(t, {
			name: "toast-fade",
			onAfterLeave: M
		}, {
			default: S(() => [b.value ? (h(), o("div", {
				key: 0,
				ref_key: "toastEl",
				ref: C,
				class: f([T.value, "toast"]),
				"data-toast-position": r.position,
				style: p(D.value)
			}, [
				(h(), o("span", U)),
				s("div", W, [v(n.$slots, "default", {}, () => [c(y(r.message), 1)], !0)]),
				r.closable ? (h(), o("button", {
					key: 1,
					class: "toast__close",
					type: "button",
					"aria-label": "Close",
					onClick: j
				}, " × ")) : a("", !0)
			], 14, H)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-4a32e7e0"]]), q = {
	duration: 3e3,
	position: "top",
	closable: !0
};
function J(e) {
	q = {
		...q,
		...e
	};
}
function Y(e) {
	if (typeof document > "u") return () => {};
	let t = document.createElement("div");
	document.body.appendChild(t);
	let n = g({ visible: !0 }), i = !1, a, o = null, s = () => {
		i || (i = !0, a && window.clearTimeout(a), a = window.setTimeout(() => {
			o?.unmount(), t.remove();
		}, 220));
	};
	return o = r({ render: () => d(K, {
		type: e.type,
		message: e.message,
		duration: e.duration ?? q.duration,
		position: e.position ?? q.position,
		closable: e.closable ?? q.closable,
		visible: n.visible,
		"onUpdate:visible": (e) => {
			n.visible = e, e || s();
		},
		onClose: () => s()
	}) }), o.mount(t), () => {
		n.visible && (n.visible = !1, s());
	};
}
var X = ((e) => Y({
	type: "info",
	message: e
}));
X.success = (e) => Y({
	type: "success",
	message: e
}), X.error = (e) => Y({
	type: "error",
	message: e
}), X.loading = (e) => Y({
	type: "info",
	message: e,
	duration: 0
}), X.setDefaults = J;
var Z = K, Q = [
	k,
	P,
	V,
	Z
], $ = (e) => {
	Q.forEach((t) => {
		let n = t.name;
		n && e.component(n, t);
	});
}, ee = { install: $ };
//#endregion
export { k as Button, P as Input, V as Modal, Z as Toast, ee as default, $ as install, J as setToastGlobalOptions, X as show };
