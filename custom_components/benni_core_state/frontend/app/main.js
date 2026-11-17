//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function m() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function h(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/constants.js
var g = 1 << 24, _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, C = 1 << 25, w = 65536, T = 1 << 19, E = 1 << 20, ee = 1 << 25, D = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("legacy props"), oe = Symbol(""), se = Symbol("attributes"), ce = Symbol("class"), le = Symbol("style"), ue = Symbol("text"), de = Symbol("form reset"), fe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), pe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function me(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function he() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ge(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function _e(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ve() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ye(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function xe(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Se() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ce() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function we() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Te() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Ee = {}, O = Symbol("uninitialized"), De = "http://www.w3.org/1999/xhtml", Oe = "http://www.w3.org/2000/svg", ke = "@attach";
function Ae() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function je(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Me() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ne() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Pe(e) {
	k = e;
}
var A;
function Fe(e) {
	if (e === null) throw je(), Ee;
	return A = e;
}
function Ie() {
	return Fe(/* @__PURE__ */ vn(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ vn(A) !== null) throw je(), Ee;
		A = e;
	}
}
function M(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ vn(n);
		A = n;
	}
}
function Le(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ vn(n);
		e && n.remove(), n = i;
	}
}
function Re(e) {
	if (!e || e.nodeType !== 8) throw je(), Ee;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function ze(e) {
	return e === this.v;
}
function Be(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ve(e) {
	return !Be(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var He = null;
function Ue(e) {
	He = e;
}
function We(e) {
	return Je("getContext").get(e);
}
function Ge(e, t) {
	return Je("setContext").set(e, t), t;
}
function Ke(e) {
	return Je("hasContext").has(e);
}
function N(e, t = !1, n) {
	He = {
		p: He,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function P(e) {
	var t = He, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) kn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, He = t.p, e ?? {};
}
function qe() {
	return !0;
}
function Je(e) {
	return He === null && me(e), He.c ??= new Map(Ye(He) || void 0);
}
function Ye(e) {
	let t = e.p;
	for (; t !== null;) {
		let e = t.c;
		if (e !== null) return e;
		t = t.p;
	}
	return null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Xe = [];
function Ze() {
	var e = Xe;
	Xe = [], p(e);
}
function Qe(e) {
	if (Xe.length === 0 && !Rt) {
		var t = Xe;
		queueMicrotask(() => {
			t === Xe && Ze();
		});
	}
	Xe.push(e);
}
function $e() {
	for (; Xe.length > 0;) Ze();
}
function et(e) {
	var t = W;
	if (t === null) return U.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	tt(e, t);
}
function tt(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var nt = ~(v | y | _);
function rt(e, t) {
	e.f = e.f & nt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? rt(e, _) : rt(e, y);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= D, at(t.deps));
}
function ot(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), at(e.deps), rt(e, _);
}
//#endregion
//#region node_modules/svelte/src/store/shared/index.js
var st = [];
function ct(e, t = f) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (Be(e, t) && (e = t, n)) {
			let t = !st.length;
			for (let t of r) t[1](), st.push(t, e);
			if (t) {
				for (let e = 0; e < st.length; e += 2) st[e][0](st[e + 1]);
				st.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = f) {
		let c = [o, s];
		return r.add(c), r.size === 1 && (n = t(i, a) || f), o(e), () => {
			r.delete(c), r.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set: i,
		update: a,
		subscribe: o
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var lt = !1;
function ut(e) {
	var t = lt;
	try {
		return lt = !1, [e(), lt];
	} finally {
		lt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function dt(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Qe(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ft(e) {
	k && /* @__PURE__ */ _n(e) !== null && yn(e);
}
var pt = !1;
function mt() {
	pt || (pt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[de]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ht(e) {
	var t = U, n = W;
	tr(null), nr(null);
	try {
		return e();
	} finally {
		tr(t), nr(n);
	}
}
function gt(e, t, n, r = n) {
	e.addEventListener(t, () => ht(n));
	let i = e[de];
	e[de] = i ? () => {
		i(), r(!0);
	} : () => r(!0), mt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function _t(e) {
	let t = 0, n = tn(0), r;
	return () => {
		En() && (G(n), Fn(() => (t === 0 && (r = Cr(() => e(() => on(n)))), t += 1, () => {
			Qe(() => {
				--t, t === 0 && (r?.(), r = void 0, on(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var vt = w | T;
function yt(e, t, n, r) {
	new bt(e, t, n, r);
}
var bt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = _t(() => (this.#m = tn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = In(() => {
			if (k) {
				let e = this.#t;
				Ie();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, vt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = Rn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Qe(r), t && (this.#s = Rn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Ne();
				return;
			}
			t = !0, n && Te(), this.#s !== null && Gn(this.#s, () => {
				this.#s = null;
			}), this.#S(() => {
				this.#b();
			});
		};
		return {
			reset: r,
			invoke_onerror: () => {
				try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					tt(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Rn(() => e(this.#e)), Qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = gn();
			e.append(t), this.#a = this.#S(() => Rn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Gn(this.#o, () => {
				this.#o = null;
			}), this.#x(I));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Rn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Yn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Rn(() => t(this.#e));
			} else this.#x(I);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ot(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = W, n = U, r = He;
		nr(this.#i), tr(this.#i), Ue(this.#i.ctx);
		try {
			return Wt.ensure(), e();
		} catch (e) {
			return et(e), null;
		} finally {
			nr(t), tr(n), Ue(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Gn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Qe(() => {
			this.#d = !1, this.#m && rn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Hn(this.#a), null), this.#o &&= (Hn(this.#o), null), this.#s &&= (Hn(this.#s), null), k && (Fe(this.#t), M(), Fe(Le()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Rn(() => {
						var r = W;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return tt(e, this.#i.parent), null;
				}
			}));
		};
		Qe(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				tt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => tt(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function xt(e, t, n, r) {
	let i = qe() ? Tt : Ot;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = St(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				tt(e, s);
			}
			Ct();
		}
	}
	var d = wt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Dt(e))).then(u).catch((e) => tt(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), Ct();
	}) : f();
}
function St() {
	var e = W, t = U, n = He, r = I;
	return function(i = !0) {
		nr(e), tr(t), Ue(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Ct(e = !0) {
	nr(null), tr(null), Ue(null), e && I?.deactivate();
}
function wt() {
	var e = W, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Tt(e) {
	var t = 2 | v;
	return W !== null && (W.f |= T), {
		ctx: He,
		deps: null,
		effects: null,
		equals: ze,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: W,
		ac: null
	};
}
var Et = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Dt(e, t, n) {
	let r = W;
	r === null && he();
	var i = void 0, a = tn(O), o = !U, s = /* @__PURE__ */ new Set();
	return Pn(() => {
		var t = W, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== fe && n.reject(e);
			}).finally(Ct);
		} catch (e) {
			n.reject(e), Ct();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = wt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Et);
			else for (let e of s.values()) e.reject(Et);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Et && (c.activate(), t ? (a.f |= re, rn(a, t)) : (a.f & 8388608 && (a.f ^= re), rn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Dn(() => {
		for (let e of s) e.reject(Et);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function F(e) {
	let t = /* @__PURE__ */ Tt(e);
	return ir(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Ot(e) {
	let t = /* @__PURE__ */ Tt(e);
	return t.equals = Ve, t;
}
function kt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Hn(t[n]);
	}
}
function At(e) {
	var t, n = W, r = e.parent;
	if (!Qn && r !== null && e.v !== O && r.f & 24576) return Ae(), e.v;
	nr(r);
	try {
		e.f &= ~D, kt(e), t = gr(e);
	} finally {
		nr(n);
	}
	return t;
}
function jt(e) {
	var t = At(e);
	if (!e.equals(t) && (e.wv = pr(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Ft?.capture(e, t, !0)), e.deps === null))) {
		rt(e, _);
		return;
	}
	Qn || (It === null ? it(e) : (En() || I?.is_fork) && It.set(e, t));
}
function Mt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ht(() => {
		t.ac.abort(fe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), vr(t, 0), Bn(t));
}
function Nt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && yr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Pt = null, I = null, Ft = null, It = null, Lt = null, Rt = !1, zt = !1, Bt = null, Vt = null, Ht = 0, Ut = 1, Wt = class e {
	id = Ut++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Pt === null ? Pt = this : (Pt.#n = this, this.#t = Pt), Pt = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) rt(r, v), t(r);
			for (r of n.m) rt(r, y), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ht++ > 1e3 && (this.#x(), Kt());
		for (let e of this.#u) this.#d.delete(e), rt(e, v), this.schedule(e);
		for (let e of this.#d) rt(e, y), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Bt = [], r = [], i = Vt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Zt(e), this.#h() || this.discard(), t;
		}
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Bt = null, Vt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Xt(e, t);
			i.length > 0 && I.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Ft = this, Jt(r), Jt(n), Ft = null, this.#s?.resolve();
		var s = I;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= _;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= _ : i & 4 ? t.push(r) : mr(r) && (i & 16 && this.#d.add(r), yr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#y(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), rt(i, v), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), I = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), It?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, It = null;
	}
	flush() {
		try {
			zt = !0, I = this, this.#g();
		} finally {
			Ht = 0, Lt = null, Bt = null, Vt = null, zt = !1, I = null, It = null, $t.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Et);
		this.#x(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, Qe(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= m()).promise;
	}
	static ensure() {
		if (I === null) {
			let t = I = new e();
			!zt && !Rt && Qe(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		It = null;
	}
	schedule(e) {
		if (Lt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Bt !== null && t === W && (U === null || !(U.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= _;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Pt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Gt(e) {
	var t = Rt;
	Rt = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if ($e(), I === null) return n;
			I.flush();
		}
	} finally {
		Rt = t;
	}
}
function Kt() {
	try {
		be();
	} catch (e) {
		tt(e, Lt);
	}
}
var qt = null;
function Jt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && mr(r) && (qt = /* @__PURE__ */ new Set(), yr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Wn(r), qt?.size > 0)) {
				$t.clear();
				for (let e of qt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) qt.has(n) && (qt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || yr(n);
					}
				}
				qt.clear();
			}
		}
		qt = null;
	}
}
function Yt(e) {
	I.schedule(e);
}
function Xt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, _);
		for (var n = e.first; n !== null;) Xt(n, t), n = n.next;
	}
}
function Zt(e) {
	rt(e, _);
	for (var t = e.first; t !== null;) Zt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Qt = /* @__PURE__ */ new Set(), $t = /* @__PURE__ */ new Map(), en = !1;
function tn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: ze,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = tn(e, t);
	return ir(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function nn(e, t = !1, n = !0) {
	let r = tn(e);
	return t || (r.equals = Ve), r;
}
function R(e, t, n = !1) {
	return U !== null && (!er || U.f & 131072) && qe() && U.f & 4325394 && (rr === null || !rr.has(e)) && we(), rn(e, n ? cn(t) : t, Vt);
}
function rn(e, t, n = null) {
	if (!e.equals(t)) {
		$t.set(e, Qn ? t : e.v);
		var r = Wt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && At(t), It === null && it(t);
		}
		e.wv = pr(), sn(e, v, n), qe() && W !== null && W.f & 1024 && !(W.f & 96) && (sr === null ? cr([e]) : sr.push(e)), !r.is_fork && Qt.size > 0 && !en && an();
	}
	return t;
}
function an() {
	en = !1;
	for (let e of Qt) {
		e.f & 1024 && rt(e, y);
		let t;
		try {
			t = mr(e);
		} catch {
			t = !0;
		}
		t && yr(e);
	}
	Qt.clear();
}
function on(e) {
	R(e, e.v + 1);
}
function sn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = qe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & v) === 0;
			if (l && rt(s, t), c & 131072) Qt.add(s);
			else if (c & 2) {
				var u = s;
				It?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= D), sn(u, y, n));
			} else if (l) {
				var d = s;
				c & 16 && qt !== null && qt.add(d), n === null ? Yt(d) : n.push(d);
			}
		}
	}
}
function cn(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = dr, f = (e) => {
		if (dr === d) return e();
		var t = U, n = dr;
		tr(null), fr(d);
		var r = e();
		return tr(t), fr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Se();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ L(n.value, u);
				return r.set(t, e), e;
			}) : R(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ L(O, u));
					r.set(t, e), on(o);
				}
			} else R(n, O), on(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(cn(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === O ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = G(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== O) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? cn(e[t]) : O, u)), r.set(t, n)), G(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(O, u)), r.set(d + "", p)) : R(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, cn(n)), r.set(t, c));
			else {
				l = c.v !== O;
				var m = f(() => cn(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				on(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [n, i] of r) i.v !== O && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ce();
		}
	});
}
function ln(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
	} catch {}
	return e;
}
function un(e, t) {
	return Object.is(ln(e), ln(t));
}
var dn, fn, pn, mn;
function hn() {
	if (dn === void 0) {
		dn = window, fn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		pn = a(t, "firstChild").get, mn = a(t, "nextSibling").get, u(e) && (e[ce] = void 0, e[se] = null, e[le] = void 0, e.__e = void 0), u(n) && (n[ue] = void 0);
	}
}
function gn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _n(e) {
	return pn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function vn(e) {
	return mn.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ _n(e);
	var n = /* @__PURE__ */ _n(A);
	if (n === null) n = A.appendChild(gn());
	else if (t && n.nodeType !== 3) {
		var r = gn();
		return n?.before(r), Fe(r), r;
	}
	return t && Sn(n), Fe(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ _n(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ vn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = gn();
			return A?.before(r), Fe(r), r;
		}
		Sn(A);
	}
	return A;
}
function V(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ vn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = gn();
			return r === null ? i?.after(a) : r.before(a), Fe(a), a;
		}
		Sn(r);
	}
	return Fe(r), r;
}
function yn(e) {
	e.textContent = "";
}
function bn() {
	return !1;
}
function xn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Sn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function Cn(e) {
	W === null && (U === null && ye(e), ve()), Qn && _e(e);
}
function wn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Tn(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: He,
		deps: null,
		nodes: null,
		f: e | v | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) Bt === null ? Wt.ensure().schedule(r) : Bt.push(r);
	else if (t !== null) {
		try {
			yr(r);
		} catch (e) {
			throw Hn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= w));
	}
	if (i !== null && (i.parent = n, n !== null && wn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function En() {
	return U !== null && !er;
}
function Dn(e) {
	let t = Tn(8, null);
	return rt(t, _), t.teardown = e, t;
}
function On(e) {
	Cn("$effect");
	var t = W.f;
	if (!U && t & 32 && He !== null && !He.i) {
		var n = He;
		(n.e ??= []).push(e);
	} else return kn(e);
}
function kn(e) {
	return Tn(4 | E, e);
}
function An(e) {
	return Cn("$effect.pre"), Tn(8 | E, e);
}
function jn(e) {
	Wt.ensure();
	let t = Tn(64 | T, e);
	return () => {
		Hn(t);
	};
}
function Mn(e) {
	Wt.ensure();
	let t = Tn(64 | T, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Gn(t, () => {
			Hn(t), n(void 0);
		}) : (Hn(t), n(void 0));
	});
}
function Nn(e) {
	return Tn(4, e);
}
function Pn(e) {
	return Tn(ne | T, e);
}
function Fn(e, t = 0) {
	return Tn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	xt(r, t, n, (t) => {
		Tn(8, () => {
			e(...t.map(G));
		});
	});
}
function In(e, t = 0) {
	return Tn(16 | t, e);
}
function Ln(e, t = 0) {
	return Tn(g | t, e);
}
function Rn(e) {
	return Tn(32 | T, e);
}
function zn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Qn, n = U;
		$n(!0), tr(null);
		try {
			t.call(null);
		} finally {
			$n(e), tr(n);
		}
	}
}
function Bn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ht(() => {
			e.abort(fe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Hn(n, t), n = r;
	}
}
function Vn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Hn(t), t = n;
	}
}
function Hn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Un(e.nodes.start, e.nodes.end), n = !0), e.f |= C, Bn(e, t && !n), vr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	zn(e), e.f ^= C, e.f |= x;
	var i = e.parent;
	i !== null && i.first !== null && Wn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Un(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ vn(e);
		e.remove(), e = n;
	}
}
function Wn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Gn(e, t, n = !0) {
	var r = [];
	Kn(e, r, !0);
	var i = () => {
		n && Hn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Kn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= b;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Kn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function qn(e) {
	Jn(e, !0);
}
function Jn(e, t) {
	if (e.f & 8192) {
		e.f ^= b, e.f & 1024 || (rt(e, v), Wt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Jn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Yn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ vn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Xn = null, Zn = !1, Qn = !1;
function $n(e) {
	Qn = e;
}
var U = null, er = !1;
function tr(e) {
	U = e;
}
var W = null;
function nr(e) {
	W = e;
}
var rr = null;
function ir(e) {
	U !== null && (rr ??= /* @__PURE__ */ new Set()).add(e);
}
var ar = null, or = 0, sr = null;
function cr(e) {
	sr = e;
}
var lr = 1, ur = 0, dr = ur;
function fr(e) {
	dr = e;
}
function pr() {
	return ++lr;
}
function mr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~D), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (mr(a) && jt(a), a.wv > e.wv) return !0;
		}
		t & 512 && It === null && rt(e, _);
	}
	return !1;
}
function hr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(rr !== null && rr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? hr(a, t, !1) : t === a && (n ? rt(a, v) : a.f & 1024 && rt(a, y), Yt(a));
	}
}
function gr(e) {
	var t = ar, n = or, r = sr, i = U, a = rr, o = He, s = er, c = dr, l = e.f;
	ar = null, or = 0, sr = null, U = l & 96 ? null : e, rr = null, Ue(e.ctx), er = !1, dr = ++ur, e.ac !== null && (ht(() => {
		e.ac.abort(fe);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= S;
		var f = e.deps, p = I?.is_fork;
		if (ar !== null) {
			var m;
			if (p || vr(e, or), f !== null && or > 0) for (f.length = or + ar.length, m = 0; m < ar.length; m++) f[or + m] = ar[m];
			else e.deps = f = ar;
			if (En() && e.f & 512) for (m = or; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && or < f.length && (vr(e, or), f.length = or);
		if (qe() && sr !== null && !er && f !== null && !(e.f & 6146)) for (m = 0; m < sr.length; m++) hr(sr[m], e);
		if (i !== null && i !== e) {
			if (ur++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ur;
			if (t !== null) for (let e of t) e.rv = ur;
			sr !== null && (r === null ? r = sr : r.push(...sr));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return et(e);
	} finally {
		e.f ^= te, ar = t, or = n, sr = r, U = i, rr = a, Ue(o), er = s, dr = c;
	}
}
function _r(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (ar === null || !n.call(ar, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~D), s.v !== O && it(s), s.ac !== null && ht(() => {
			s.ac.abort(fe), s.ac = null, rt(s, v);
		}), Mt(s), vr(s, 0);
	}
}
function vr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) _r(e, n[r]);
}
function yr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, _);
		var n = W, r = Zn;
		W = e, Zn = !(t & 96);
		try {
			t & 16777232 ? Vn(e) : Bn(e), zn(e);
			var i = gr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = lr;
		} finally {
			Zn = r, W = n;
		}
	}
}
async function br() {
	await Promise.resolve(), Gt();
}
function G(e) {
	var t = !!(e.f & 2);
	if (Xn?.add(e), U !== null && !er && !(W !== null && W.f & 16384) && (rr === null || !rr.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < ur && (e.rv = ur, ar === null && r !== null && r[or] === e ? or++ : ar === null ? ar = [e] : ar.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Qn && $t.has(e)) return $t.get(e);
	if (t) {
		var a = e;
		if (Qn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Sr(a)) && (o = At(a)), $t.set(a, o), o;
		}
		var s = !(a.f & 512) && !er && U !== null && (Zn || !!(U.f & 512)), c = (a.f & S) === 0;
		mr(a) && (s && (a.f |= 512), jt(a)), s && !c && (Nt(a), xr(a));
	}
	if (It?.has(e)) return It.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function xr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Nt(t), xr(t));
}
function Sr(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if ($t.has(t) || t.f & 2 && Sr(t)) return !0;
	return !1;
}
function Cr(e) {
	var t = er;
	try {
		return er = !0, e();
	} finally {
		er = t;
	}
}
//#endregion
//#region node_modules/svelte/src/attachments/index.js
function wr() {
	return Symbol(ke);
}
//#endregion
//#region node_modules/svelte/src/utils.js
function Tr(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var Er = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function Dr(e) {
	return Er.includes(e);
}
var Or = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), kr = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function Ar(e) {
	return e = e.toLowerCase(), kr[e] ?? e;
}
[...Or];
var jr = ["touchstart", "touchmove"];
function Mr(e) {
	return jr.includes(e);
}
var Nr = [
	"textarea",
	"script",
	"style",
	"title"
];
function Pr(e) {
	return Nr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Fr = Symbol("events"), Ir = /* @__PURE__ */ new Set(), Lr = /* @__PURE__ */ new Set();
function Rr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Wr.call(t, e), !e.cancelBubble) return ht(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function zr(e, t, n, r = {}) {
	var i = Rr(t, e, n, r);
	return () => {
		e.removeEventListener(t, i, r);
	};
}
function Br(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Rr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Dn(() => {
		t.removeEventListener(e, o, a);
	});
}
function Vr(e, t, n) {
	(t[Fr] ??= {})[e] = n;
}
function Hr(e) {
	for (var t = 0; t < e.length; t++) Ir.add(e[t]);
	for (var n of Lr) n(e);
}
var Ur = null;
function Wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Ur = e;
	var s = 0, c = Ur === e && e[Fr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Fr] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		i(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = U, f = W;
		tr(null), nr(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Fr]?.[r];
					h != null && (!o.disabled || e.target === o) && h.call(o, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				s++, o = s < a.length ? a[s] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[Fr] = t, delete e.currentTarget, tr(d), nr(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Gr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Kr(e) {
	return Gr?.createHTML(e) ?? e;
}
function qr(e) {
	var t = xn("template");
	return t.innerHTML = Kr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Jr(e, t) {
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (k) return Jr(A, null), A;
		i === void 0 && (i = qr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ _n(i)));
		var t = r || fn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ _n(t), s = t.lastChild;
			Jr(o, s);
		} else Jr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Yr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (k) return Jr(A, null), A;
		if (!o) {
			var e = /* @__PURE__ */ _n(qr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ _n(e);) o.appendChild(/* @__PURE__ */ _n(e));
			else o = /* @__PURE__ */ _n(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ _n(t), r = t.lastChild;
			Jr(n, r);
		} else Jr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Xr(e, t) {
	return /* @__PURE__ */ Yr(e, t, "svg");
}
function Zr(e = "") {
	if (!k) {
		var t = gn(e + "");
		return Jr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? Sn(n) : (n.before(n = gn()), Fe(n)), Jr(n, n), n;
}
function Qr() {
	if (k) return Jr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = gn();
	return e.append(t, n), Jr(t, n), e;
}
function q(e, t) {
	if (k) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Ie();
		return;
	}
	e !== null && e.before(t);
}
function $r() {
	if (k && A && A.nodeType === 8 && A.textContent?.startsWith("$")) {
		let e = A.textContent.substring(1);
		return Ie(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ue] ??= e.nodeValue) && (e[ue] = n, e.nodeValue = `${n}`);
}
function ei(e, t) {
	return ni(e, t);
}
var ti = /* @__PURE__ */ new Map();
function ni(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	hn();
	var l = void 0, u = Mn(() => {
		var s = n ?? t.appendChild(gn());
		yt(s, { pending: () => {} }, (t) => {
			N({});
			var n = He;
			if (o && (n.c = o), a && (i.$$events = a), k && Jr(t, null), l = e(t, i) || {}, k && (W.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw je(), Ee;
			P();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Mr(r);
					for (let e of [t, document]) {
						var a = ti.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), ti.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(Ir)), Lr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = ti.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Wr), r.delete(e), r.size === 0 && ti.delete(n)) : r.set(e, i);
			}
			Lr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return ri.set(l, u), l;
}
var ri = /* @__PURE__ */ new WeakMap();
function ii(e, t) {
	let n = ri.get(e);
	return n ? (ri.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
var ai = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) qn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (qn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Hn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Yn(r, t), t.append(gn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Hn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Gn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Hn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = bn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = gn();
				i.append(a), this.#n.set(e, {
					effect: Rn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Rn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	k && (r = A, Ie());
	var i = new ai(e), a = n ? w : 0;
	function o(e, t) {
		if (k) {
			var n = Re(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Le();
				Fe(a), i.anchor = a, Pe(!1), i.ensure(e, t), Pe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	In(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function oi(e, t) {
	return t;
}
function si(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Gn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					ci(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			yn(d), d.append(u), e.items.clear();
		}
		ci(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function ci(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, Yn(a, document.createDocumentFragment())) : Hn(t[i], n);
	}
}
var li;
function ui(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? Fe(/* @__PURE__ */ _n(u)) : u.appendChild(gn());
	}
	k && Ie();
	var d = null, f = /* @__PURE__ */ Ot(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, fi(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, mi(d, null, c)) : qn(d) : Gn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: In(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			k && Re(c) === "[!" != (e === 0) && (c = Le(), Fe(c), Pe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = bn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Pe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && rn(S.v, b), S.i && rn(S.i, y), v && u.unskip_effect(S.e)) : (S = pi(l, h ? c : li ??= gn(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Rn(() => s(c)) : (d = Rn(() => s(li ??= gn())), d.f |= ee)), e > r.size && ge("", "", ""), k && e > 0 && Fe(Le()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Pe(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function di(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function fi(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = di(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (qn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ee, _ === l) mi(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), hi(e, d, _), hi(e, _, y), mi(_, y, n), d = _, p = [], m = [], l = di(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) mi(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					hi(e, S.prev, C.next), hi(e, d, S), hi(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), mi(_, l, n), hi(e, _.prev, _.next), hi(e, _, d === null ? e.effect.first : d.next), hi(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = di(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = di(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ci(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = di(l.next);
		var T = w.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			si(e, w, E);
		}
	}
	o && Qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function pi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? tn(n) : /* @__PURE__ */ nn(n, !1, !1) : null, l = o & 2 ? tn(i) : null;
	return {
		v: c,
		i: l,
		e: Rn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function mi(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ vn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function hi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function gi(e, t, ...n) {
	var r = new ai(e);
	In(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function _i(e, t, n) {
	var r;
	k && (r = A, Ie());
	var i = new ai(e);
	In(() => {
		var e = t() ?? null;
		if (k && Re(r) === "[" != (e !== null)) {
			var a = Le();
			Fe(a), i.anchor = a, Pe(!1), i.ensure(e, e && ((t) => n(t, e))), Pe(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
function vi(e, t, n, r, i, a) {
	let o = k;
	k && Ie();
	var s = null;
	k && A.nodeType === 1 && (s = A, Ie());
	var c = k ? A : e, l = new ai(c, !1);
	In(() => {
		let e = t() || null;
		var a = i ? i() : n || e === "svg" ? Oe : void 0;
		if (e === null) {
			l.ensure(null, null);
			return;
		}
		return l.ensure(e, (t) => {
			if (e) {
				if (s = k ? s : xn(e, a), Jr(s, s), r) {
					var n = null;
					k && Pr(e) && s.append(n = document.createComment(""));
					var i = k ? /* @__PURE__ */ _n(s) : s.appendChild(gn());
					k && (i === null ? Pe(!1) : Fe(i)), r(s, i), n?.remove();
				}
				W.nodes.end = s, t.before(s);
			}
			k && Fe(t);
		}), () => {};
	}, w), Dn(() => {}), o && (Pe(!0), Fe(c));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attachments.js
function yi(e, t) {
	var n = void 0, r;
	Ln(() => {
		n !== (n = t()) && (r &&= (Hn(r), null), n && (r = Rn(() => {
			Nn(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function bi(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = bi(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function xi() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = bi(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
function Si(e) {
	return typeof e == "object" ? xi(e) : e ?? "";
}
var Ci = [..." 	\n\r\f\xA0\v﻿"];
function wi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Ci.includes(r[o - 1])) && (s === r.length || Ci.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Ti(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Ei(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Di(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Ei)), i && c.push(...Object.keys(i).map(Ei));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Ei(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Ti(r)), i && (n += Ti(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Oi(e, t, n, r, i, a) {
	var o = e[ce];
	if (k || o !== n || o === void 0) {
		var s = wi(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ce] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function ki(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ai(e, t, n, r) {
	var i = e[le];
	if (k || i !== t) {
		var a = Di(t, r);
		(!k || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[le] = t;
	} else r && (Array.isArray(r) ? (ki(e, n?.[0], r[0]), ki(e, n?.[1], r[1], "important")) : ki(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ji(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Me();
		for (var i of t.options) i.selected = n.includes(Pi(i));
		return;
	}
	for (i of t.options) if (un(Pi(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Mi(e) {
	var t = new MutationObserver(() => {
		"__value" in e && ji(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Dn(() => {
		t.disconnect();
	});
}
function Ni(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	gt(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Pi);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Pi(o);
		}
		n(a), e.__value = a, I !== null && r.add(I);
	}), Nn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = I;
			if (r.has(o)) return;
		}
		if (ji(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Pi(s), n(a));
		}
		e.__value = a, i = !1;
	}), Mi(e);
}
function Pi(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Fi = Symbol("class"), Ii = Symbol("style"), Li = Symbol("is custom element"), Ri = Symbol("is html"), zi = pe ? "link" : "LINK", Bi = pe ? "input" : "INPUT", Vi = pe ? "option" : "OPTION", Hi = pe ? "select" : "SELECT";
function Ui(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Gi(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Gi(e, "checked", null), e.checked = r;
				}
			}
		};
		e[de] = n, Qe(n), mt();
	}
}
function Wi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Gi(e, t, n, r) {
	var i = Ji(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === zi) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Xi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ki(e, t, n, r, i = !1, a = !1) {
	if (k && i && e.nodeName === Bi) {
		var o = e;
		(o.type === "checkbox" ? "defaultChecked" : "defaultValue") in n || Ui(o);
	}
	var s = Ji(e), c = s[Li], l = !s[Ri];
	let u = k && c;
	u && Pe(!1);
	var d = t || {}, f = e.nodeName === Vi;
	for (var p in t) p in n || (n[p] = null);
	n.class ? n.class = Si(n.class) : (r || n[Fi]) && (n.class = null), n[Ii] && (n.style ??= null);
	var m = Xi(e);
	if (e.nodeName === Bi && "type" in n && ("value" in n || "__value" in n)) {
		var h = n.type;
		(h !== d.type || h === void 0 && e.hasAttribute("type")) && (d.type = h, Gi(e, "type", h, a));
	}
	for (let i in n) {
		let o = n[i];
		if (f && i === "value" && o == null) {
			e.value = e.__value = "", d[i] = o;
			continue;
		}
		if (i === "class") {
			Oi(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", o, r, t?.[Fi], n[Fi]), d[i] = o, d[Fi] = n[Fi];
			continue;
		}
		if (i === "style") {
			Ai(e, o, t?.[Ii], n[Ii]), d[i] = o, d[Ii] = n[Ii];
			continue;
		}
		var g = d[i];
		if (!(o === g && !(o === void 0 && e.hasAttribute(i)))) {
			d[i] = o;
			var _ = i[0] + i[1];
			if (_ !== "$$") {
				if (_ === "on") {
					let t = {}, n = "$$" + i, r = i.slice(2);
					var v = Dr(r);
					if (Tr(r) && (r = r.slice(0, -7), t.capture = !0), !v && g) {
						if (o != null) continue;
						e.removeEventListener(r, d[n], t), d[n] = null;
					}
					if (v) Vr(r, e, o), Hr([r]);
					else if (o != null) {
						function a(e) {
							d[i].call(this, e);
						}
						d[n] = Rr(r, e, a, t);
					}
				} else if (i === "style") Gi(e, i, o);
				else if (i === "autofocus") dt(e, !!o);
				else if (!c && (i === "__value" || i === "value" && o != null)) e.value = e.__value = o;
				else if (i === "selected" && f) Wi(e, o);
				else {
					var y = i;
					l || (y = Ar(y));
					var b = y === "defaultValue" || y === "defaultChecked";
					if (o == null && !c && !b) {
						if (s[i] = null, y === "value" || y === "checked") {
							let n = e, r = t === void 0;
							if (y === "value") {
								let e = n.defaultValue;
								n.removeAttribute(y), n.defaultValue = e, n.value = n.__value = r ? e : null;
							} else {
								let e = n.defaultChecked;
								n.removeAttribute(y), n.defaultChecked = e, n.checked = r ? e : !1;
							}
						} else e.removeAttribute(i);
					} else b || m.includes(y) && (c || typeof o != "string") ? (e[y] = o, y in s && (s[y] = O)) : typeof o != "function" && Gi(e, y, o, a);
				}
			}
		}
	}
	return u && Pe(!0), d;
}
function qi(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	xt(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Hi, l = !1;
		if (Ln(() => {
			var u = t(...n.map(G)), d = Ki(e, r, u, a, o, s);
			l && c && "value" in u && ji(e, u.value);
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || Hn(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var f = u[t];
				t.description === "@attach" && (!r || f !== r[t]) && (i[t] && Hn(i[t]), i[t] = Rn(() => yi(e, () => f))), d[t] = f;
			}
			r = d;
		}), c) {
			var u = e;
			Nn(() => {
				ji(u, r.value, !0), Mi(u);
			});
		}
		l = !0;
	});
}
function Ji(e) {
	return e[se] ??= {
		[Li]: e.nodeName.includes("-"),
		[Ri]: e.namespaceURI === De
	};
}
var Yi = /* @__PURE__ */ new Map();
function Xi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Yi.get(t);
	if (n) return n;
	Yi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Zi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	gt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = $i(e) ? ea(a) : a, n(a), I !== null && r.add(I), await br(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || Cr(t) == null && e.value) && (n($i(e) ? ea(e.value) : e.value), I !== null && r.add(I)), Fn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		$i(e) && n === ea(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Qi(e, t, n = t) {
	gt(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (k && e.defaultChecked !== e.checked || Cr(t) == null) && n(e.checked), Fn(() => {
		e.checked = !!t();
	});
}
function $i(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ea(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
var ta = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	has(e, t) {
		return !e.exclude.has(t) && t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	}
};
/*#__NO_SIDE_EFFECTS__*/
function X(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, ta);
}
var na = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (d(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			d(i) && (i = i());
			let o = a(i, t);
			if (o && o.set) return o.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (d(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = a(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === ie || t === ae) return !1;
		for (let n of e.props) if (d(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (d(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function Z(...e) {
	return new Proxy({ props: e }, na);
}
function Q(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ Tt(r), G(u)) : (l && (l = !1, c = s ? Cr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || ae in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ut(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && xe(t), f(m)));
	var g = i ? () => {
		var n = e[t];
		return n === void 0 ? d() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? Tt : Ot)(() => (v = !1, g()));
	o && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && o ? cn(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Qn && v || b.f & 16384 ? y.v : G(y);
	});
}
function ra(e) {
	He === null && me("onMount"), On(() => {
		let t = Cr(e);
		if (typeof t == "function") return t;
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/@lucide/svelte/dist/defaultAttributes.js
var ia = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, aa = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, oa = Symbol("lucide-context"), sa = () => We(oa), ca = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"name",
	"color",
	"size",
	"strokeWidth",
	"absoluteStrokeWidth",
	"iconNode",
	"children"
]), la = /* @__PURE__ */ Xr("<svg><!><!></svg>");
function ua(e, t) {
	N(t, !0);
	let n = sa() ?? {}, r = Q(t, "color", 19, () => n.color ?? "currentColor"), i = Q(t, "size", 19, () => n.size ?? 24), a = Q(t, "strokeWidth", 19, () => n.strokeWidth ?? 2), o = Q(t, "absoluteStrokeWidth", 19, () => n.absoluteStrokeWidth ?? !1), s = Q(t, "iconNode", 19, () => []), c = /* @__PURE__ */ X(t, ca), l = /* @__PURE__ */ F(() => o() ? Number(a()) * 24 / Number(i()) : a());
	var u = la();
	qi(u, (e) => ({
		...ia,
		...e,
		...c,
		width: i(),
		height: i(),
		stroke: r(),
		"stroke-width": G(l),
		class: [
			"lucide-icon lucide",
			n.class,
			t.name && `lucide-${t.name}`,
			t.class
		]
	}), [() => !t.children && !aa(c) && { "aria-hidden": "true" }]);
	var d = z(u);
	ui(d, 17, s, oi, (e, t) => {
		var n = /* @__PURE__ */ F(() => h(G(t), 2));
		let r = () => G(n)[0], i = () => G(n)[1];
		var a = Qr();
		vi(B(a), r, !0, (e, t) => {
			qi(e, () => ({ ...i() }));
		}), q(e, a);
	}), gi(V(d), () => t.children ?? f), j(u), q(e, u), P();
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/activity.svelte
var da = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function fa(e, t) {
	let n = /* @__PURE__ */ X(t, da), r = [["path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" }]];
	ua(e, Z({ name: "activity" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/bug.svelte
var pa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ma(e, t) {
	let n = /* @__PURE__ */ X(t, pa), r = [
		["path", { d: "M12 20v-9" }],
		["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" }],
		["path", { d: "M14.12 3.88 16 2" }],
		["path", { d: "M21 21a4 4 0 0 0-3.81-4" }],
		["path", { d: "M21 5a4 4 0 0 1-3.55 3.97" }],
		["path", { d: "M22 13h-4" }],
		["path", { d: "M3 21a4 4 0 0 1 3.81-4" }],
		["path", { d: "M3 5a4 4 0 0 0 3.55 3.97" }],
		["path", { d: "M6 13H2" }],
		["path", { d: "m8 2 1.88 1.88" }],
		["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" }]
	];
	ua(e, Z({ name: "bug" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/calendar-clock.svelte
var ha = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ga(e, t) {
	let n = /* @__PURE__ */ X(t, ha), r = [
		["path", { d: "M16 14v2.2l1.6 1" }],
		["path", { d: "M16 2v3" }],
		["path", { d: "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338" }],
		["path", { d: "M3 9h5.859" }],
		["path", { d: "M8 2v3" }],
		["circle", {
			cx: "16",
			cy: "16",
			r: "6"
		}]
	];
	ua(e, Z({ name: "calendar-clock" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/calendar-cog.svelte
var _a = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function va(e, t) {
	let n = /* @__PURE__ */ X(t, _a), r = [
		["path", { d: "m15.228 16.852-.923-.383" }],
		["path", { d: "m15.228 19.148-.923.383" }],
		["path", { d: "M16 2v3" }],
		["path", { d: "m16.47 14.305.382.923" }],
		["path", { d: "m16.852 20.772-.383.924" }],
		["path", { d: "m19.148 15.228.383-.923" }],
		["path", { d: "m19.53 21.696-.382-.924" }],
		["path", { d: "m20.773 16.852.924-.383" }],
		["path", { d: "m20.773 19.148.924.383" }],
		["path", { d: "M21 10.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h5.5" }],
		["path", { d: "M3 9h18" }],
		["path", { d: "M8 2v3" }],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3"
		}]
	];
	ua(e, Z({ name: "calendar-cog" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/calendar-days.svelte
var ya = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ba(e, t) {
	let n = /* @__PURE__ */ X(t, ya), r = [
		["path", { d: "M8 2v3" }],
		["path", { d: "M16 2v3" }],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2"
		}],
		["path", { d: "M3 9h18" }],
		["path", { d: "M8 13h.01" }],
		["path", { d: "M12 13h.01" }],
		["path", { d: "M16 13h.01" }],
		["path", { d: "M8 17h.01" }],
		["path", { d: "M12 17h.01" }],
		["path", { d: "M16 17h.01" }]
	];
	ua(e, Z({ name: "calendar-days" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/circle-alert.svelte
var xa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Sa(e, t) {
	let n = /* @__PURE__ */ X(t, xa), r = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16"
		}]
	];
	ua(e, Z({ name: "circle-alert" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/circle-check.svelte
var Ca = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function wa(e, t) {
	let n = /* @__PURE__ */ X(t, Ca), r = [["circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}], ["path", { d: "m9 12 2 2 4-4" }]];
	ua(e, Z({ name: "circle-check" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/clock-3.svelte
var Ta = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ea(e, t) {
	let n = /* @__PURE__ */ X(t, Ta), r = [["circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}], ["path", { d: "M12 6v6h4" }]];
	ua(e, Z({ name: "clock-3" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/git-compare-arrows.svelte
var Da = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Oa(e, t) {
	let n = /* @__PURE__ */ X(t, Da), r = [
		["circle", {
			cx: "5",
			cy: "6",
			r: "3"
		}],
		["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }],
		["path", { d: "m15 9-3-3 3-3" }],
		["circle", {
			cx: "19",
			cy: "18",
			r: "3"
		}],
		["path", { d: "M12 18H7a2 2 0 0 1-2-2V9" }],
		["path", { d: "m9 15 3 3-3 3" }]
	];
	ua(e, Z({ name: "git-compare-arrows" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/heart-pulse.svelte
var ka = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Aa(e, t) {
	let n = /* @__PURE__ */ X(t, ka), r = [["path", { d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" }], ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" }]];
	ua(e, Z({ name: "heart-pulse" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/house.svelte
var ja = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ma(e, t) {
	let n = /* @__PURE__ */ X(t, ja), r = [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]];
	ua(e, Z({ name: "house" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/list-checks.svelte
var Na = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Pa(e, t) {
	let n = /* @__PURE__ */ X(t, Na), r = [
		["path", { d: "M13 5h8" }],
		["path", { d: "M13 12h8" }],
		["path", { d: "M13 19h8" }],
		["path", { d: "m3 17 2 2 4-4" }],
		["path", { d: "m3 7 2 2 4-4" }]
	];
	ua(e, Z({ name: "list-checks" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/moon.svelte
var Fa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ia(e, t) {
	let n = /* @__PURE__ */ X(t, Fa), r = [["path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]];
	ua(e, Z({ name: "moon" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/rotate-ccw.svelte
var La = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ra(e, t) {
	let n = /* @__PURE__ */ X(t, La), r = [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }], ["path", { d: "M3 3v5h5" }]];
	ua(e, Z({ name: "rotate-ccw" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/save.svelte
var za = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ba(e, t) {
	let n = /* @__PURE__ */ X(t, za), r = [
		["path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }],
		["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
		["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
	];
	ua(e, Z({ name: "save" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/settings-2.svelte
var Va = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ha(e, t) {
	let n = /* @__PURE__ */ X(t, Va), r = [
		["path", { d: "M14 17H5" }],
		["path", { d: "M19 7h-9" }],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3"
		}],
		["circle", {
			cx: "7",
			cy: "7",
			r: "3"
		}]
	];
	ua(e, Z({ name: "settings-2" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/shield-check.svelte
var Ua = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Wa(e, t) {
	let n = /* @__PURE__ */ X(t, Ua), r = [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { d: "m9 12 2 2 4-4" }]];
	ua(e, Z({ name: "shield-check" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/sun.svelte
var Ga = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ka(e, t) {
	let n = /* @__PURE__ */ X(t, Ga), r = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "4"
		}],
		["path", { d: "M12 2v2" }],
		["path", { d: "M12 20v2" }],
		["path", { d: "m4.93 4.93 1.41 1.41" }],
		["path", { d: "m17.66 17.66 1.41 1.41" }],
		["path", { d: "M2 12h2" }],
		["path", { d: "M20 12h2" }],
		["path", { d: "m6.34 17.66-1.41 1.41" }],
		["path", { d: "m19.07 4.93-1.41 1.41" }]
	];
	ua(e, Z({ name: "sun" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/sunrise.svelte
var qa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ja(e, t) {
	let n = /* @__PURE__ */ X(t, qa), r = [
		["path", { d: "M12 2v8" }],
		["path", { d: "m4.93 10.93 1.41 1.41" }],
		["path", { d: "M2 18h2" }],
		["path", { d: "M20 18h2" }],
		["path", { d: "m19.07 10.93-1.41 1.41" }],
		["path", { d: "M22 22H2" }],
		["path", { d: "m8 6 4-4 4 4" }],
		["path", { d: "M16 18a4 4 0 0 0-8 0" }]
	];
	ua(e, Z({ name: "sunrise" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/trash-2.svelte
var Ya = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Xa(e, t) {
	let n = /* @__PURE__ */ X(t, Ya), r = [
		["path", { d: "M10 11v6" }],
		["path", { d: "M14 11v6" }],
		["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
		["path", { d: "M3 6h18" }],
		["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
	];
	ua(e, Z({ name: "trash-2" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/undo-2.svelte
var Za = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Qa(e, t) {
	let n = /* @__PURE__ */ X(t, Za), r = [["path", { d: "M9 14 4 9l5-5" }], ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" }]];
	ua(e, Z({ name: "undo-2" }, () => n, { get iconNode() {
		return r;
	} }));
}
//#endregion
//#region src/lib/adapters.ts
var $a = class {
	async subscribe(e) {
		return () => void 0;
	}
}, eo = class extends $a {
	hass;
	kind = "ha-panel";
	constructor(e) {
		super(), this.hass = e;
	}
	get connection() {
		if (!this.hass.connection?.sendMessagePromise) throw Error("HA-Verbindung für Core State ist nicht verfügbar.");
		return this.hass.connection;
	}
	snapshot() {
		return this.connection.sendMessagePromise({ type: "benni_core_state/ux_snapshot" });
	}
	projection(e) {
		return this.connection.sendMessagePromise({
			type: "benni_core_state/ux_projection",
			days: e
		});
	}
	dayPhasePreview(e, t = null) {
		let n = {
			type: "benni_core_state/ux_day_phase_preview",
			date: e
		};
		return t && (n.anchors = t), this.connection.sendMessagePromise(n);
	}
	command(e, t, n = {}) {
		return this.connection.sendMessagePromise({
			type: "benni_core_state/ux_command",
			request_id: e,
			command: t,
			payload: n
		});
	}
	async subscribe(e) {
		return this.connection.subscribeMessage ? await this.connection.subscribeMessage((t) => {
			let n = t.event ?? t, r = n.snapshot ?? n;
			r?.contract === "benni_core_state.snapshot" && e(r);
		}, { type: "benni_core_state/ux_subscribe" }) ?? (() => void 0) : () => void 0;
	}
}, to = class extends $a {
	baseUrl;
	kind = "standalone";
	constructor(e = "") {
		super(), this.baseUrl = e;
	}
	async request(e, t) {
		let n = await fetch(`${this.baseUrl}${e}`, {
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				...t?.headers ?? {}
			},
			...t
		});
		if (!n.ok) throw Error(`Core-State-Anfrage fehlgeschlagen (${n.status}).`);
		return n.json();
	}
	snapshot() {
		return this.request("/api/benni_core_state/snapshot");
	}
	projection(e) {
		return this.request(`/api/benni_core_state/projection?days=${e}`);
	}
	dayPhasePreview(e, t = null) {
		return this.request("/api/benni_core_state/day_phase_preview", {
			method: "POST",
			body: JSON.stringify(t ? {
				date: e,
				anchors: t
			} : { date: e })
		});
	}
	command(e, t, n = {}) {
		return this.request("/api/benni_core_state/commands", {
			method: "POST",
			body: JSON.stringify({
				request_id: e,
				command: t,
				payload: n
			})
		});
	}
};
function no(e) {
	return e?.connection ? new eo(e) : new to();
}
//#endregion
//#region src/lib/contracts.ts
var ro = {
	loading: "Lädt",
	ready: "Aktuell",
	empty: "Leer",
	stale: "Veraltet",
	degraded: "Eingeschränkt",
	unavailable: "Nicht verfügbar",
	reconnecting: "Verbindet neu",
	offline: "Offline",
	error: "Fehler",
	blocked: "Blockiert"
}, io = "Unbekannt", ao = "Keine aktuellen Daten", oo = "Nicht konfiguriert", so = {
	awake: "Wach",
	provisional_sleep: "Vorläufiger Schlafschutz",
	sleep: "Schlaf",
	waking: "Wachphase"
}, co = {
	scheduled: "Geplant",
	awake: "Wach",
	provisional_sleep: "Vorläufiger Schlafschutz",
	sleep: "Schlaf",
	waking: "Wachphase",
	skipped: "Kein Weckvorgang",
	inactive: "Nicht aktiv"
}, lo = {
	zuhause: "Zu Hause",
	home: "Zu Hause",
	bei_eltern: "Bei den Eltern",
	abwesend: "Abwesend",
	away: "Abwesend",
	arriving: "Kommt nach Hause",
	leaving: "Verlässt das Haus",
	uncertain: "Unklar",
	stale: "Nicht aktuell"
}, uo = {
	idle: "Ruhephase",
	sleep: "Schlaf",
	waking: "Wachphase",
	free_time: "Freizeit",
	work_home: "Arbeit zu Hause",
	work_away: "Arbeit außer Haus",
	private_time: "Private Zeit",
	household: "Haushalt",
	gaming: "Gaming",
	entertainment: "Unterhaltung",
	music: "Musik",
	pc_active: "PC-Nutzung"
}, fo = {
	early_night: "Frühe Nacht",
	late_night: "Späte Nacht",
	early_morning: "Früher Morgen",
	forenoon: "Vormittag",
	midday: "Mittag",
	afternoon: "Nachmittag",
	late_afternoon: "Später Nachmittag",
	evening: "Abend",
	late_evening: "Später Abend"
}, po = {
	werktag: "Regulärer Werktag",
	wochenende: "Wochenende",
	frei: "Freier Tag"
}, mo = {
	weekday: "Werktag",
	weekend: "Wochenende"
}, ho = {
	state_ready: "Core State liefert den aktuellen Status",
	provisional_sleep_protection: "Schutzstatus vor bestätigtem Schlaf",
	rule_wake: "Automatische Profilregel",
	holiday_to_weekend_profile: "Feiertag oder Urlaub nutzt das Wochenendprofil",
	calendar_wake_marker: "Kalender-Markierung für einen Weckvorgang",
	calendar_skip_marker: "Kalender markiert diesen Tag ohne Weckvorgang",
	waking_timeout: "Wachphase endet nach dem 30-Minuten-Schutzfenster",
	regular_wake_interaction: "Reguläre Wachinteraktion erkannt",
	no_wake: "Für diesen Tag ist kein Weckvorgang vorgesehen",
	no_current_data: ao
}, go = {
	core_state: "Core State",
	"internal:logic.compute_day_phase_starts": "Core State · Tagesrhythmus",
	"internal:wake_planning": "Core State · Wake Planning",
	"configured source": "Konfigurierte Quelle",
	legacy_comparison: "Temporärer Legacy-Vergleich"
}, _o = {
	profile_weekday: "Automatische Werktagsregel",
	profile_weekend: "Automatische Wochenendregel",
	"rule:profile_weekday": "Automatische Werktagsregel",
	"rule:profile_weekend": "Automatische Wochenendregel"
}, vo = {
	adapter_unavailable: "Core State ist für Änderungen nicht erreichbar.",
	profile_invalid: "Das Profil enthält ungültige Werte.",
	profile_not_found: "Das ausgewählte Profil ist nicht verfügbar.",
	profile_field_not_allowed: "Dieses Profilfeld darf nicht geändert werden.",
	wake_time_invalid: "Die Weckzeit ist ungültig.",
	wake_window_invalid: "Das Weckfenster muss zwischen 0 und 120 Minuten liegen.",
	minimum_sleep_invalid: "Die gewünschte Mindestschlafdauer muss eine positive Minutenzahl sein.",
	provisional_lead_invalid: "Der Schutzvorlauf muss eine positive Minutenzahl sein.",
	command_not_authorized: "Core State hat die Änderung nicht autorisiert.",
	"day_phase_config_invalid:time_invalid": "Mindestens eine Ankerzeit hat kein gültiges Format (HH:MM).",
	"day_phase_config_invalid:order_invalid": "Die Phasen müssen in der Reihenfolge Morgen, Tag, Abend, Nacht mit Mindestabstand beginnen.",
	"day_phase_config_invalid:night_overlaps_morning": "Die Nacht beginnt zu kurz vor dem nächsten Morgen.",
	"day_phase_config_invalid:cross_day_overlap": "Bei einem Profilwechsel um Mitternacht würde die Nacht in den Morgen laufen.",
	"day_phase_config_invalid:rollback_unavailable": "Es gibt keinen vorherigen Stand.",
	"day_phase_config_invalid:model_invalid": "Unbekanntes Berechnungsmodell.",
	day_phase_anchors_invalid: "Die Ankerzeiten konnten nicht gelesen werden."
}, yo = {
	morning: "Morgen",
	day: "Tag",
	evening: "Abend",
	night: "Nacht"
};
function bo(e) {
	return xo(e, yo);
}
function xo(e, t, n = ao) {
	return !e || !e.trim() ? n : t[e] ?? io;
}
function So(e) {
	return xo(e, ro, ao);
}
function Co(e) {
	return xo(e, so);
}
function wo(e) {
	return xo(e, co);
}
function To(e) {
	return xo(e, lo);
}
function Eo(e) {
	return xo(e, uo);
}
function Do(e) {
	return xo(e, fo);
}
function Oo(e, t = {}) {
	return t.vacation ? "Urlaub · Wochenendprofil" : t.holiday ? "Feiertag · Wochenendprofil" : xo(e, po);
}
function ko(e) {
	return xo(e, mo, oo);
}
function Ao(e) {
	return So(e);
}
function jo(e) {
	return !e || !e.trim() ? ao : go[e] ? go[e] : e.startsWith("internal:") ? "Core State" : e.startsWith("legacy") ? "Temporärer Legacy-Vergleich" : io;
}
function Mo(e) {
	return !e || !e.trim() ? "Keine aktuelle Entscheidung" : _o[e] ?? io;
}
function No(e, t) {
	return t && _o[t] ? _o[t] : e && e.trim() && !e.includes("_") ? e : Mo(t);
}
function Po(e) {
	return !e || !e.trim() ? ao : ho[e] ?? io;
}
function Fo(e) {
	return !e || !e.trim() ? "Die Änderung konnte nicht gespeichert werden." : vo[e] ?? "Core State konnte die Änderung nicht speichern.";
}
function Io(e) {
	if (!e) return ao;
	let t = new Date(e);
	return Number.isNaN(t.valueOf()) ? e.slice(0, 5) || io : new Intl.DateTimeFormat("de-DE", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Berlin"
	}).format(t);
}
function Lo(e) {
	let t = /* @__PURE__ */ new Date(`${e}T12:00:00+02:00`);
	return Number.isNaN(t.valueOf()) ? io : new Intl.DateTimeFormat("de-DE", {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
		timeZone: "Europe/Berlin"
	}).format(t);
}
function Ro(e) {
	if (!e) return ao;
	let t = new Date(e);
	return Number.isNaN(t.valueOf()) ? io : new Intl.DateTimeFormat("de-DE", {
		dateStyle: "short",
		timeStyle: "short",
		timeZone: "Europe/Berlin"
	}).format(t);
}
function zo(e) {
	return e ? /^\d{2}:\d{2}$/.test(e) ? e : Io(e) : oo;
}
function Bo(e) {
	if (e == null) return oo;
	if (!Number.isFinite(e)) return io;
	if (e < 60) return `${e} Min.`;
	let t = Math.floor(e / 60), n = e % 60;
	return n ? `${t} Std. ${n} Min.` : `${t} Std.`;
}
//#endregion
//#region src/lib/store.ts
var Vo = class {
	state = {
		snapshot: null,
		projection: null,
		status: "loading",
		error: null,
		pendingCommand: null,
		commandResult: null
	};
	adapter = null;
	adapterKind = null;
	listeners = /* @__PURE__ */ new Set();
	removeSubscription = null;
	pollTimer = null;
	subscribe(e) {
		return this.listeners.add(e), e(this.state), () => this.listeners.delete(e);
	}
	emit() {
		for (let e of this.listeners) e(this.state);
	}
	patch(e) {
		this.state = {
			...this.state,
			...e
		}, this.emit();
	}
	setAdapter(e) {
		this.adapterKind !== e.kind && (this.removeSubscription?.(), this.removeSubscription = null, this.pollTimer && clearInterval(this.pollTimer), this.adapter = e, this.adapterKind = e.kind, this.connect(e));
	}
	async connect(e) {
		try {
			this.removeSubscription = await e.subscribe((e) => {
				this.patch({
					snapshot: e,
					status: e.status,
					error: null
				});
			}), this.pollTimer = setInterval(() => void this.refresh(), 3e4), await this.refresh();
		} catch (e) {
			this.patch({
				status: "reconnecting",
				error: this.message(e)
			});
		}
	}
	async refresh() {
		if (!this.adapter) return;
		let e = this.state.snapshot !== null;
		this.patch({
			status: e ? "reconnecting" : "loading",
			error: null
		});
		try {
			let e = await this.adapter.snapshot();
			this.patch({
				snapshot: e,
				status: e.status,
				error: null
			});
		} catch (t) {
			this.patch({
				status: e ? "offline" : "error",
				error: this.message(t)
			});
		}
	}
	async loadProjection() {
		if (this.adapter) try {
			let e = await this.adapter.projection(14);
			this.patch({
				projection: e,
				error: null
			});
		} catch (e) {
			this.patch({ error: this.message(e) });
		}
	}
	async dayPhasePreview(e, t = null) {
		return this.adapter ? this.adapter.dayPhasePreview(e, t) : null;
	}
	async command(e, t = {}) {
		if (!this.adapter) {
			let t = {
				contract: "benni_core_state.command_ack",
				version: "1.0.0",
				request_id: "",
				command: e,
				status: "error",
				error: "adapter_unavailable"
			};
			return this.patch({
				commandResult: t,
				error: t.error
			}), t;
		}
		let n = `${e}:${crypto.randomUUID()}`;
		this.patch({
			pendingCommand: e,
			commandResult: null,
			error: null
		});
		try {
			let r = await this.adapter.command(n, e, t);
			return r.status === "success" ? await this.refresh() : this.patch({ error: r.error ?? "Command fehlgeschlagen." }), this.patch({ commandResult: r }), r;
		} catch (t) {
			let r = {
				contract: "benni_core_state.command_ack",
				version: "1.0.0",
				request_id: n,
				command: e,
				status: "error",
				error: this.message(t)
			};
			return this.patch({
				error: r.error,
				commandResult: r
			}), r;
		} finally {
			this.patch({ pendingCommand: null });
		}
	}
	dispose() {
		this.removeSubscription?.(), this.pollTimer && clearInterval(this.pollTimer), this.listeners.clear();
	}
	message(e) {
		return e instanceof Error ? e.message : "Unbekannter Core-State-Fehler.";
	}
}, Ho = /* @__PURE__ */ K("<span class=\"chip orange\">Urlaub</span>"), Uo = /* @__PURE__ */ K("<span class=\"chip orange\">Feiertag</span>"), Wo = /* @__PURE__ */ K("<span class=\"chip purple\">Wochenende</span>"), Go = /* @__PURE__ */ K("<strong class=\"calendar-wake purple\"><!> </strong>"), Ko = /* @__PURE__ */ K("<strong class=\"calendar-wake orange\"><!> Kein Weckvorgang</strong>"), qo = /* @__PURE__ */ K("<strong class=\"calendar-wake\"><!> Nicht aktiv</strong>"), Jo = /* @__PURE__ */ K("<article><div class=\"calendar-day-header\"><span class=\"calendar-date\"> </span> <!></div> <div class=\"day-context-list\"><span class=\"chip cyan\"> </span> <span class=\"chip\"> </span></div> <!> <p class=\"helper\"> <!> <!></p> <p class=\"helper\"> </p> <span class=\"data-status\"><!> </span></article>"), Yo = /* @__PURE__ */ K("<section class=\"table-card\" aria-labelledby=\"projection-heading\"><div class=\"section-header\"><div><p class=\"section-kicker\">Core-State-Projektion</p> <h3 id=\"projection-heading\">Profil, Tageskontext und automatische Auswahl</h3></div> <span class=\"helper\"> </span></div> <div class=\"calendar-grid\"></div></section>"), Xo = /* @__PURE__ */ K("<div class=\"empty-state\"><!> <h3>Keine Projektion verfügbar</h3> <p>Core State liefert die 14-Tage-Projektion erst, wenn die Datenquelle aktuell erreichbar ist.</p> <span class=\"data-status\"> </span></div>"), Zo = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Kalender</p> <h2>Die nächsten 14 Tage</h2> <p class=\"muted\">Kompakte Projektion aus Core State. Das Frontend entscheidet keine Regel und berechnet keinen Weckplan.</p></div> <span class=\"data-status\"> </span></div> <!>", 1);
function Qo(e, t) {
	N(t, !0);
	function n(e) {
		return [
			"calendar-day",
			e.status,
			e.profile.id === "weekend" ? "weekend" : "weekday",
			e.holiday ? "holiday" : "",
			e.vacation ? "vacation" : ""
		].filter(Boolean).join(" ");
	}
	var r = Zo(), i = B(r), a = V(z(i), 2), o = z(a);
	j(a), j(i);
	var s = V(i, 2), c = (e) => {
		var r = Yo(), i = z(r), a = V(z(i), 2), o = z(a);
		j(a), j(i);
		var s = V(i, 2);
		ui(s, 21, () => t.projection.days, (e) => e.date, (e, t) => {
			var r = Jo(), i = z(r), a = z(i), o = z(a, !0);
			j(a);
			var s = V(a, 2), c = (e) => {
				q(e, Ho());
			}, l = (e) => {
				q(e, Uo());
			}, u = (e) => {
				q(e, Wo());
			};
			Y(s, (e) => {
				G(t).vacation ? e(c) : G(t).holiday ? e(l, 1) : G(t).profile.id === "weekend" && e(u, 2);
			}), j(i);
			var d = V(i, 2), f = z(d), p = z(f);
			j(f);
			var m = V(f, 2), h = z(m);
			j(m), j(d);
			var g = V(d, 2), _ = (e) => {
				var n = Go(), r = z(n);
				Ea(r, { size: 18 });
				var i = V(r);
				j(n), H((e) => J(i, ` ${e ?? ""}`), [() => zo(G(t).wake.wake_time)]), q(e, n);
			}, v = (e) => {
				var t = Ko();
				Sa(z(t), { size: 18 }), M(), j(t), q(e, t);
			}, y = (e) => {
				var t = qo();
				Sa(z(t), { size: 18 }), M(), j(t), q(e, t);
			};
			Y(g, (e) => {
				G(t).wake.wake_time ? e(_) : G(t).wake.state === "skipped" ? e(v, 1) : e(y, -1);
			});
			var b = V(g, 2), x = z(b), S = V(x), C = (e) => {
				q(e, Zr("· Absoluter Floor angewendet"));
			};
			Y(S, (e) => {
				G(t).wake.floor_applied && e(C);
			});
			var w = V(S, 2), T = (e) => {
				q(e, Zr("· Kalenderkonflikt"));
			};
			Y(w, (e) => {
				G(t).wake.calendar_conflict && e(T);
			}), j(b);
			var E = V(b, 2), ee = z(E);
			j(E);
			var D = V(E, 2), te = z(D), ne = (e) => {
				wa(e, { size: 13 });
			};
			Y(te, (e) => {
				G(t).status === "ready" && e(ne);
			});
			var re = V(te);
			j(D), j(r), H((e, n, i, a, s, c, l) => {
				Oi(r, 1, e), J(o, n), J(p, `Profil: ${i ?? ""}`), J(h, `Tageskontext: ${a ?? ""}`), J(x, `${s ?? ""} `), J(ee, `Auswahl: ${c ?? ""}`), Gi(D, "data-status", G(t).status), J(re, ` ${l ?? ""}`);
			}, [
				() => Si(n(G(t))),
				() => Lo(G(t).date),
				() => ko(G(t).profile.id),
				() => Oo(G(t).day_context, {
					holiday: G(t).holiday,
					vacation: G(t).vacation
				}),
				() => Po(G(t).wake.reason),
				() => Mo(G(t).wake.matched_rule ?? G(t).wake.decided_by),
				() => Ao(G(t).status)
			]), q(e, r);
		}), j(s), j(r), H(() => J(o, `UX-Vertrag v${t.projection.version ?? ""} · ${t.projection.horizon_days ?? ""} Tage`)), q(e, r);
	}, l = (e) => {
		var n = Xo(), r = z(n);
		ba(r, { size: 30 });
		var i = V(r, 6), a = z(i);
		j(i), j(n), H((e) => {
			Gi(i, "data-status", t.status), J(a, `Datenlage: ${e ?? ""}`);
		}, [() => So(t.status)]), q(e, n);
	};
	Y(s, (e) => {
		t.projection?.days?.length ? e(c) : e(l, -1);
	}), H((e) => {
		Gi(a, "data-status", t.projection?.status ?? t.status), J(o, `Datenlage: ${e ?? ""}`);
	}, [() => Ao(t.projection?.status ?? t.status)]), q(e, r), P();
}
//#endregion
//#region src/views/DayPhasesView.svelte
var $o = /* @__PURE__ */ K("<div class=\"callout\" role=\"alert\">Die gespeicherte Tagesphasen-Konfiguration war ungültig. Core State nutzt sicher den bisherigen Algorithmus und\n        die Startwerte, bis eine gültige Konfiguration gespeichert wird.</div>"), es = /* @__PURE__ */ K("<div class=\"callout\" role=\"alert\">Das Akkordeon ist eingestellt, konnte aber nicht berechnet werden. Der bisherige Algorithmus bleibt als Rückfall aktiv.</div>"), ts = /* @__PURE__ */ K("<dt>Eingeschränkt</dt> <dd> </dd>", 1), ns = /* @__PURE__ */ K("<dl class=\"diagnostic-list\" style=\"margin-top: 12px;\"><dt>Hauptphase (Akkordeon)</dt> <dd> </dd> <dt>Tagesprofil des laufenden Zyklus</dt> <dd> </dd> <dt>Nächster Wechsel</dt> <dd> </dd> <!></dl>"), rs = /* @__PURE__ */ K("<button class=\"button secondary\" type=\"button\"><!> Zurück zum bisherigen Algorithmus</button>"), is = /* @__PURE__ */ K("<label class=\"inline-meta\"><input type=\"checkbox\"/> <span>Kompatibilitätsprüfung der Verbraucher ist abgeschlossen</span></label> <button class=\"button\" type=\"button\">Akkordeon für day_state aktivieren</button>", 1), as = /* @__PURE__ */ K("<th scope=\"col\"> </th>"), os = /* @__PURE__ */ K("<small class=\"anchor-error\"> </small>"), ss = /* @__PURE__ */ K("<td><input class=\"anchor-input\" type=\"time\" step=\"60\" required=\"\"/> <!></td>"), cs = /* @__PURE__ */ K("<tr><th scope=\"row\"><strong> </strong></th><!></tr>"), ls = /* @__PURE__ */ K("<div class=\"validation-error\" role=\"alert\"> </div>"), us = /* @__PURE__ */ K("<section class=\"table-card\" style=\"margin-top: 14px;\"><div class=\"section-header\"><div><p class=\"section-kicker\">Tagesprofil</p> <h3> </h3></div> <span class=\"helper\">Beginn der Hauptphase · Nacht nach Mitternacht (z. B. 00:30) gehört zum Vorabend</span></div> <div class=\"table-wrap\"><table class=\"rules-table anchor-table\"><thead><tr><th scope=\"col\">Stichtag</th><!></tr></thead><tbody></tbody></table></div> <!></section>"), ds = /* @__PURE__ */ K("<div class=\"callout info\" role=\"status\">Der gespeicherte Stand wurde zwischenzeitlich geändert. „Verwerfen“ lädt ihn neu.</div>"), fs = /* @__PURE__ */ K("<div class=\"inline-error\" role=\"alert\"> </div>"), ps = /* @__PURE__ */ K("<p class=\"muted\">Gilt an diesem Datum: <strong> </strong> </p>"), ms = /* @__PURE__ */ K("<small class=\"helper\"> </small>"), hs = /* @__PURE__ */ K("<td> <!></td>"), gs = /* @__PURE__ */ K("<tr><td><strong> </strong> <small class=\"helper\"> </small></td><td> </td><td> </td><td> </td></tr>"), _s = /* @__PURE__ */ K("<details style=\"margin-top: 12px;\"><summary> </summary> <div class=\"table-wrap\"><table class=\"rules-table\"><thead><tr><th scope=\"col\">Zustand</th><th scope=\"col\">Hauptphase</th><th scope=\"col\">Von</th><th scope=\"col\">Bis</th></tr></thead><tbody></tbody></table></div></details>"), vs = /* @__PURE__ */ K("<!> <div class=\"table-wrap\"><table class=\"rules-table\"><thead><tr><th scope=\"col\">Hauptphase</th><!></tr></thead><tbody></tbody></table></div> <!>", 1), ys = /* @__PURE__ */ K("<div class=\"skeleton\" aria-busy=\"true\"></div>"), bs = /* @__PURE__ */ K("<section class=\"form-card\" aria-labelledby=\"day-phase-model-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Berechnungsmodell für sensor.*_day_state</p> <h3 id=\"day-phase-model-heading\"> </h3></div> <span> </span></div> <!> <!> <!> <div class=\"action-row\" style=\"margin-top: 14px;\"><!> <span class=\"helper\">Der Vier-Phasen-Sensor rechnet immer mit; umgeschaltet wird nur der bestehende Neun-Phasen-Sensor.</span></div></section> <form aria-label=\"Ankerzeiten bearbeiten\"><!> <!> <!> <div class=\"action-row\" style=\"margin-top: 14px;\"><button class=\"button\" type=\"submit\"><!> Ankerzeiten speichern</button> <button class=\"button secondary\" type=\"button\">Verwerfen</button> <button class=\"button secondary\" type=\"button\">Startwerte ins Formular laden</button> <button class=\"button secondary\" type=\"button\"><!> Vorherigen Stand wiederherstellen</button> <span class=\"helper\">Gespeichert wird versioniert in Core State; ein Neustart stellt den Stand wieder her.</span></div></form> <section class=\"table-card\" style=\"margin-top: 14px;\" aria-labelledby=\"day-phase-preview-heading\"><div class=\"section-header\"><div><p class=\"section-kicker\"> </p> <h3 id=\"day-phase-preview-heading\">Berechnete Phasen für ein Datum</h3></div> <label class=\"field\" style=\"min-width: 180px;\"><span class=\"field-label\">Datum</span> <input type=\"date\"/></label></div> <!></section>", 1), xs = /* @__PURE__ */ K("<div class=\"empty-state\">Diese Core-State-Version liefert noch keine Tagesphasen-Konfiguration.</div>"), Ss = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Tagesphasen</p> <h2>Saisonales Akkordeon · 32 Ankerzeiten</h2> <p class=\"muted\">Vier Hauptphasen je Tagesprofil und Stichtag. Dazwischen wird linear über die Kalendertage interpoliert.\n      Die neun bisherigen Tageszustände werden daraus abgeleitet.</p></div> <!></div> <!>", 1);
function Cs(e, t) {
	N(t, !0);
	let n = /^([01]\d|2[0-3]):[0-5]\d$/;
	function r() {
		let e = /* @__PURE__ */ new Date();
		return (/* @__PURE__ */ new Date(e.getTime() - e.getTimezoneOffset() * 6e4)).toISOString().slice(0, 10);
	}
	function i(e) {
		return JSON.parse(JSON.stringify(e));
	}
	let a = /* @__PURE__ */ F(() => t.snapshot?.day_phase ?? null), o = /* @__PURE__ */ F(() => G(a) ? JSON.stringify(G(a).anchors) : null), s = /* @__PURE__ */ F(() => !!t.snapshot?.capabilities.edit_day_phases), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(null), u = /* @__PURE__ */ L(cn(r())), d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(cn([])), p = /* @__PURE__ */ L(null), m = /* @__PURE__ */ L(!1), h = /* @__PURE__ */ F(() => G(c) ? JSON.stringify(G(c)) : null), g = /* @__PURE__ */ F(() => G(h) !== null && G(o) !== null && G(h) !== G(o)), _ = /* @__PURE__ */ F(() => G(g) && G(l) !== null && G(o) !== G(l));
	On(() => {
		!G(a) || G(o) === null || (G(c) === null || !G(g) && G(o) !== G(l)) && (R(c, i(G(a).anchors), !0), R(l, G(o), !0));
	});
	function v() {
		if (!G(c) || !G(a)) return [];
		let e = [];
		for (let t of G(a).profiles) for (let r of G(a).seasons) for (let i of G(a).main_phases) {
			let a = G(c)[t.id][r.id][i.id];
			n.test(a ?? "") || e.push({
				path: `${t.id}.${r.id}.${i.id}`,
				code: "time_invalid",
				message: `${i.label}: Bitte eine Uhrzeit im Format HH:MM eingeben.`
			});
		}
		return e;
	}
	let y = null, b = 0;
	async function x(e, n) {
		let r = ++b;
		try {
			let i = await t.onPreview(e, n);
			if (r !== b || !i) return;
			R(f, i.errors ?? [], !0), R(p, null), i.valid && R(d, i, !0);
		} catch (e) {
			if (r !== b) return;
			R(p, e instanceof Error ? e.message : "Vorschau nicht verfügbar.", !0);
		}
	}
	On(() => {
		let e = G(h), t = G(u), n = G(g);
		if (e === null || !/^\d{4}-\d{2}-\d{2}$/.test(t)) return;
		let r = v();
		if (r.length) {
			R(f, r, !0);
			return;
		}
		return y && clearTimeout(y), y = setTimeout(() => {
			x(t, n ? JSON.parse(e) : null);
		}, 350), () => {
			y && clearTimeout(y);
		};
	});
	function S(e, t, n) {
		return G(f).find((r) => r.path === `${e}.${t}.${n}`);
	}
	function C(e) {
		return G(f).filter((t) => t.path.startsWith(`${e}.`));
	}
	async function w(e) {
		e.preventDefault(), !(!G(c) || G(f).length) && await t.onCommand("day_phase.config.update", { anchors: G(c) });
	}
	function T() {
		G(a) && (R(c, i(G(a).anchors), !0), R(l, G(o), !0));
	}
	function E() {
		G(a) && R(c, i(G(a).defaults), !0);
	}
	async function ee(e) {
		await t.onCommand("day_phase.model.set", { model: e }), R(m, !1);
	}
	function D(e) {
		return G(a)?.seasons.find((t) => t.id === e)?.label ?? "–";
	}
	var te = Ss(), ne = B(te);
	ga(V(z(ne), 2), {
		size: 24,
		color: "var(--cyan)"
	}), j(ne);
	var re = V(ne, 2), ie = (e) => {
		var n = bs(), r = B(n), i = z(r), o = z(i), l = V(z(o), 2), h = z(l, !0);
		j(l), j(o);
		var v = V(o, 2);
		let y;
		var b = z(v, !0);
		j(v), j(i);
		var x = V(i, 2), te = (e) => {
			q(e, $o());
		};
		Y(x, (e) => {
			G(a).load_error && e(te);
		});
		var ne = V(x, 2), re = (e) => {
			q(e, es());
		};
		Y(ne, (e) => {
			G(a).model === "accordion" && G(a).active_model !== "accordion" && e(re);
		});
		var ie = V(ne, 2), ae = (e) => {
			var t = ns(), n = V(z(t), 2), r = z(n);
			j(n);
			var i = V(n, 4), o = z(i);
			j(i);
			var s = V(i, 4), c = z(s);
			j(s);
			var l = V(s, 2), u = (e) => {
				var t = ts(), n = V(B(t), 2), r = z(n, !0);
				j(n), H((e) => J(r, e), [() => (G(a).current.degraded_reasons ?? []).join(", ")]), q(e, t);
			};
			Y(l, (e) => {
				G(a).current.degraded && e(u);
			}), j(t), H((e, t, n, i) => {
				J(r, `${e ?? ""} · ${t ?? ""}${G(a).current.guard_hold ? " · gehalten (kein Rücksprung)" : ""}`), J(o, `${G(a).current.day_profile_label ?? "–" ?? ""} (${G(a).current.cycle_date ?? "–" ?? ""})`), J(c, `${n ?? ""} um ${i ?? ""}`);
			}, [
				() => bo(G(a).current.main_phase),
				() => Do(G(a).current.sub_phase),
				() => Do(G(a).current.next_phase),
				() => Io(G(a).current.next_phase_at)
			]), q(e, t);
		};
		Y(ie, (e) => {
			G(a).current && e(ae);
		});
		var oe = V(ie, 2), se = z(oe), ce = (e) => {
			var n = rs();
			Qa(z(n), { size: 16 }), M(), j(n), H(() => n.disabled = t.pendingCommand !== null || !G(s)), Vr("click", n, () => ee("legacy")), q(e, n);
		}, le = (e) => {
			var n = is(), r = B(n), i = z(r);
			Ui(i), M(2), j(r);
			var a = V(r, 2);
			H(() => {
				i.disabled = !G(s), a.disabled = t.pendingCommand !== null || !G(s) || !G(m) || G(g);
			}), Qi(i, () => G(m), (e) => R(m, e)), Vr("click", a, () => ee("accordion")), q(e, n);
		};
		Y(se, (e) => {
			G(a).model === "accordion" ? e(ce) : e(le, -1);
		}), M(2), j(oe), j(r);
		var ue = V(r, 2), de = z(ue);
		ui(de, 17, () => G(a).profiles, (e) => e.id, (e, t) => {
			var n = us(), r = z(n), i = z(r), o = V(z(i), 2), l = z(o, !0);
			j(o), j(i), M(2), j(r);
			var u = V(r, 2), d = z(u), f = z(d), p = z(f);
			ui(V(z(p)), 17, () => G(a).main_phases, (e) => e.id, (e, t) => {
				var n = as(), r = z(n, !0);
				j(n), H(() => J(r, G(t).label)), q(e, n);
			}), j(p), j(f);
			var m = V(f);
			ui(m, 21, () => G(a).seasons, (e) => e.id, (e, n) => {
				var r = cs(), i = z(r), o = z(i), l = z(o, !0);
				j(o), j(i), ui(V(i), 17, () => G(a).main_phases, (e) => e.id, (e, r) => {
					let i = /* @__PURE__ */ F(() => S(G(t).id, G(n).id, G(r).id));
					var a = ss(), o = z(a);
					Ui(o);
					var l = V(o, 2), u = (e) => {
						var t = os(), n = z(t, !0);
						j(t), H(() => J(n, G(i).message)), q(e, t);
					};
					Y(l, (e) => {
						G(i) && e(u);
					}), j(a), H(() => {
						o.disabled = !G(s), Gi(o, "aria-label", `${G(t).label} · ${G(n).label} · Beginn ${G(r).label}`), Gi(o, "aria-invalid", G(i) ? "true" : void 0), Gi(o, "title", G(i)?.message);
					}), Zi(o, () => G(c)[G(t).id][G(n).id][G(r).id], (e) => G(c)[G(t).id][G(n).id][G(r).id] = e), q(e, a);
				}), j(r), H(() => J(l, G(n).label)), q(e, r);
			}), j(m), j(d), j(u), ui(V(u, 2), 17, () => C(G(t).id).filter((e) => e.path.split(".").length < 3), (e) => e.path + e.code, (e, t) => {
				var n = ls(), r = z(n, !0);
				j(n), H(() => J(r, G(t).message)), q(e, n);
			}), j(n), H(() => {
				Gi(n, "aria-labelledby", `anchors-${G(t).id}`), Gi(o, "id", `anchors-${G(t).id}`), J(l, G(t).label);
			}), q(e, n);
		});
		var fe = V(de, 2), pe = (e) => {
			var t = ls(), n = z(t);
			j(t), H(() => J(n, `${G(f).length === 1 ? "Eine Eingabe ist ungültig." : `${G(f).length} Eingaben sind ungültig.`}
        Gespeichert wird erst, wenn alle Ankerzeiten zusammenpassen.`)), q(e, t);
		};
		Y(fe, (e) => {
			G(f).length && e(pe);
		});
		var me = V(fe, 2), he = (e) => {
			q(e, ds());
		};
		Y(me, (e) => {
			G(_) && e(he);
		});
		var ge = V(me, 2), _e = z(ge);
		Ba(z(_e), { size: 16 }), M(), j(_e);
		var ve = V(_e, 2), ye = V(ve, 2), be = V(ye, 2);
		Ra(z(be), { size: 16 }), M(), j(be), M(2), j(ge), j(ue);
		var xe = V(ue, 2), Se = z(xe), Ce = z(Se), we = z(Ce), Te = z(we, !0);
		j(we), M(2), j(Ce);
		var Ee = V(Ce, 2), O = V(z(Ee), 2);
		Ui(O), j(Ee), j(Se);
		var De = V(Se, 2), Oe = (e) => {
			var t = fs(), n = z(t, !0);
			j(t), H(() => J(n, G(p))), q(e, t);
		}, ke = (e) => {
			var t = vs(), n = B(t), r = (e) => {
				var t = ps(), n = V(z(t)), r = z(n, !0);
				j(n);
				var i = V(n);
				j(t), H((e, t) => {
					J(r, G(d).applied.label), J(i, ` (${G(d).applied.reason_label ?? ""}).
          Lage: ${e ?? ""} → ${t ?? ""}, Tag ${G(d).season?.elapsed_days ?? ""} von ${G(d).season?.interval_days ?? ""}.`);
				}, [() => D(G(d).season?.from), () => D(G(d).season?.to)]), q(e, t);
			};
			Y(n, (e) => {
				G(d).applied && e(r);
			});
			var i = V(n, 2), o = z(i), s = z(o), c = z(s);
			ui(V(z(c)), 17, () => G(a).profiles, (e) => e.id, (e, t) => {
				var n = as(), r = z(n, !0);
				j(n), H(() => J(r, G(t).label)), q(e, n);
			}), j(c), j(s);
			var l = V(s);
			ui(l, 23, () => G(a).main_phases, (e) => e.id, (e, t, n) => {
				var r = cs(), i = z(r), o = z(i), s = z(o, !0);
				j(o), j(i), ui(V(i), 17, () => G(a).profiles, (e) => e.id, (e, t) => {
					let r = /* @__PURE__ */ F(() => G(d).profiles[G(t).id]?.main[G(n)]);
					var i = hs();
					let a;
					var o = z(i), s = V(o), c = (e) => {
						var t = ms(), n = z(t);
						j(t), H((e, t) => J(n, `· ${e ?? ""} h ${t ?? ""} min`), [() => Math.floor(G(r).duration_minutes / 60), () => Math.round(G(r).duration_minutes % 60)]), q(e, t);
					};
					Y(s, (e) => {
						G(r)?.duration_minutes !== void 0 && e(c);
					}), j(i), H(() => {
						a = Oi(i, 1, "", null, a, { "active-profile": G(d).applied?.profile === G(t).id }), J(o, `${G(r) ? `${G(r).start} – ${G(r).end}` : "–"} `);
					}), q(e, i);
				}), j(r), H(() => J(s, G(t).label)), q(e, r);
			}), j(l), j(o), j(i);
			var u = V(i, 2), f = (e) => {
				var t = _s(), n = z(t), r = z(n);
				j(n);
				var i = V(n, 2), a = z(i), o = V(z(a));
				ui(o, 21, () => G(d).applied.sub, (e) => e.id, (e, t) => {
					var n = gs(), r = z(n), i = z(r), a = z(i, !0);
					j(i);
					var o = V(i, 2), s = z(o, !0);
					j(o), j(r);
					var c = V(r), l = z(c, !0);
					j(c);
					var u = V(c), d = z(u, !0);
					j(u);
					var f = V(u), p = z(f, !0);
					j(f), j(n), H((e, n) => {
						J(a, e), J(s, G(t).id), J(l, n), J(d, G(t).start), J(p, G(t).end);
					}, [() => Do(G(t).id), () => bo(G(t).main)]), q(e, n);
				}), j(o), j(a), j(i), j(t), H(() => J(r, `Abgeleitete neun Tageszustände (${G(d).applied.label ?? ""})`)), q(e, t);
			};
			Y(u, (e) => {
				G(d).applied && e(f);
			}), q(e, t);
		}, Ae = (e) => {
			q(e, ys());
		};
		Y(De, (e) => {
			G(p) ? e(Oe) : G(d)?.profiles ? e(ke, 1) : e(Ae, -1);
		}), j(xe), H((e) => {
			J(h, G(a).active_model === "accordion" ? "Akkordeon aktiv" : "Bisheriger Algorithmus aktiv"), y = Oi(v, 1, "chip", null, y, {
				cyan: G(a).active_model === "accordion",
				orange: G(a).active_model !== "accordion"
			}), J(b, e), _e.disabled = t.pendingCommand !== null || !G(s) || !G(g) || G(f).length > 0, ve.disabled = !G(g), ye.disabled = !G(s), be.disabled = t.pendingCommand !== null || !G(s) || !G(a).rollback_available || G(g), J(Te, G(g) ? "Vorschau mit ungespeicherten Änderungen" : "Vorschau");
		}, [() => G(a).models.find((e) => e.id === G(a).active_model)?.label ?? G(a).active_model]), Br("submit", ue, w), Vr("click", ve, T), Vr("click", ye, E), Vr("click", be, () => t.onCommand("day_phase.config.rollback")), Zi(O, () => G(u), (e) => R(u, e)), q(e, n);
	}, ae = (e) => {
		q(e, xs());
	}, oe = (e) => {
		q(e, ys());
	};
	Y(re, (e) => {
		G(a) && G(c) ? e(ie) : t.snapshot && !t.snapshot.day_phase ? e(ae, 1) : e(oe, -1);
	}), q(e, te), P();
}
Hr(["click"]);
//#endregion
//#region src/views/DiagnosticsView.svelte
var ws = /* @__PURE__ */ K("<section class=\"card semantic-orange\" style=\"margin-top: 14px;\" aria-labelledby=\"legacy-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Temporär während Migration</p> <h3 id=\"legacy-heading\">Legacy-vs-Core-Vergleich</h3></div> <!></div> <p class=\"helper\">Diese Diagnose-Capability ist nur für Shadow-, Migrations- und Rollback-Nachweise sichtbar und kann nach dem Cutover vollständig verschwinden.</p> <details><summary>Technische Vergleichsdaten anzeigen</summary><pre class=\"diagnostic-pre\"> </pre></details></section>"), Ts = /* @__PURE__ */ K("<section class=\"grid two trace-grid\" aria-label=\"Decision Trace\"><article class=\"card trace-card semantic-cyan\"><div class=\"card-header\"><div><p class=\"section-kicker\">1 · Anwesenheit</p><h3> </h3></div><!></div> <p class=\"trace-summary\"> </p> <span class=\"quality-line\"> </span> <details><summary>Quelle und technische Codes</summary><dl class=\"diagnostic-list\"><dt>Wirksamer Code</dt><dd> </dd><dt>Quelle</dt><dd> </dd></dl></details></article> <article class=\"card trace-card semantic-purple\"><div class=\"card-header\"><div><p class=\"section-kicker\">2 · Bio</p><h3> </h3></div><!></div> <p class=\"trace-summary\"> </p> <span class=\"quality-line\"> </span> <details><summary>Quelle und technische Codes</summary><pre class=\"diagnostic-pre\"> </pre></details></article> <article class=\"card trace-card semantic-purple\"><div class=\"card-header\"><div><p class=\"section-kicker\">3 · Tagesphase und Tageskontext</p><h3> </h3></div><!></div> <p class=\"trace-summary\"> </p> <span class=\"quality-line\"> </span> <details><summary>Quelle und technische Codes</summary><pre class=\"diagnostic-pre\"> </pre></details></article> <article class=\"card trace-card semantic-cyan\"><div class=\"card-header\"><div><p class=\"section-kicker\">4 · Aktivität</p><h3> </h3></div><!></div> <p class=\"trace-summary\">Core State bewertet die aktuelle Aktivität aus den autorisierten Kandidaten.</p> <span class=\"quality-line\"> </span> <details><summary>Entscheidung und Kandidaten</summary><pre class=\"diagnostic-pre\"> </pre></details></article> <article class=\"card trace-card semantic-orange\"><div class=\"card-header\"><div><p class=\"section-kicker\">5 · Weckplanung</p><h3> </h3></div><!></div> <p class=\"trace-summary\"> </p> <span class=\"quality-line\"> </span> <details><summary>Weckfenster und technische Details</summary><pre class=\"diagnostic-pre\"> </pre></details></article></section> <section class=\"card\" style=\"margin-top: 14px;\" aria-labelledby=\"diag-overview-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Vertrag und Aktualität</p><h3 id=\"diag-overview-heading\">Gesamtstatus</h3></div><!></div> <dl class=\"diagnostic-list\"><dt>Datenstatus</dt><dd> </dd> <dt>Snapshot-Aktualität</dt><dd> </dd> <dt>Integration</dt><dd> </dd> <dt>UX-Vertrag</dt><dd> </dd> <dt>Timeline-Vertrag</dt><dd> </dd> <dt>Mapping-Vertrag</dt><dd> </dd> <dt>Berechtigung</dt><dd> </dd></dl></section> <!>", 1), Es = /* @__PURE__ */ K("<div class=\"empty-state\"><!> <h3>Diagnose wartet auf Snapshot</h3> <p>Der technische Trace wird erst mit einer belastbaren Core-State-Antwort gefüllt.</p></div>"), Ds = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Diagnose</p> <h2>Core-State-Entscheidungsspur</h2> <p class=\"muted\">Zuerst verständliche Status- und Qualitätsinformationen; technische Quellen und Codes sind progressiv aufklappbar.</p></div> <span class=\"data-status\"> </span></div> <!>", 1);
function Os(e, t) {
	N(t, !0);
	function n(e) {
		return e && typeof e == "object" ? e : {};
	}
	function r(e) {
		return typeof e == "string" ? e : null;
	}
	function i(e) {
		return JSON.stringify(e, null, 2);
	}
	var a = Ds(), o = B(a), s = V(z(o), 2), c = z(s);
	j(s), j(o);
	var l = V(o, 2), u = (e) => {
		let a = /* @__PURE__ */ F(() => t.snapshot.data.today), o = /* @__PURE__ */ F(() => t.snapshot.data.timeline), s = /* @__PURE__ */ F(() => t.snapshot.data.diagnostics), c = /* @__PURE__ */ F(() => n(G(s).wake)), l = /* @__PURE__ */ F(() => n(G(s).bio)), u = /* @__PURE__ */ F(() => n(G(s).activity));
		var d = Ts(), f = B(d), p = z(f), m = z(p), h = z(m), g = V(z(h)), _ = z(g, !0);
		j(g), j(h), Aa(V(h), {
			size: 19,
			color: "var(--cyan)"
		}), j(m);
		var v = V(m, 2), y = z(v);
		j(v);
		var b = V(v, 2), x = z(b);
		j(b);
		var S = V(b, 2), C = V(z(S)), w = V(z(C)), T = z(w, !0);
		j(w);
		var E = V(w, 2), ee = z(E, !0);
		j(E), j(C), j(S), j(p);
		var D = V(p, 2), te = z(D), ne = z(te), re = V(z(ne)), ie = z(re, !0);
		j(re), j(ne), Wa(V(ne), {
			size: 19,
			color: "var(--purple)"
		}), j(te);
		var ae = V(te, 2), oe = z(ae, !0);
		j(ae);
		var se = V(ae, 2), ce = z(se);
		j(se);
		var le = V(se, 2), ue = V(z(le)), de = z(ue, !0);
		j(ue), j(le), j(D);
		var fe = V(D, 2), pe = z(fe), me = z(pe), he = V(z(me)), ge = z(he, !0);
		j(he), j(me), Ja(V(me), {
			size: 19,
			color: "var(--purple)"
		}), j(pe);
		var _e = V(pe, 2), ve = z(_e);
		j(_e);
		var ye = V(_e, 2), be = z(ye);
		j(ye);
		var xe = V(ye, 2), Se = V(z(xe)), Ce = z(Se, !0);
		j(Se), j(xe), j(fe);
		var we = V(fe, 2), Te = z(we), Ee = z(Te), O = V(z(Ee)), De = z(O, !0);
		j(O), j(Ee), fa(V(Ee), {
			size: 19,
			color: "var(--cyan)"
		}), j(Te);
		var Oe = V(Te, 4), ke = z(Oe);
		j(Oe);
		var Ae = V(Oe, 2), je = V(z(Ae)), Me = z(je, !0);
		j(je), j(Ae), j(we);
		var Ne = V(we, 2), k = z(Ne), Pe = z(k), A = V(z(Pe)), Fe = z(A, !0);
		j(A), j(Pe), ga(V(Pe), {
			size: 19,
			color: "var(--orange)"
		}), j(k);
		var Ie = V(k, 2), M = z(Ie);
		j(Ie);
		var Le = V(Ie, 2), Re = z(Le);
		j(Le);
		var ze = V(Le, 2), Be = V(z(ze)), Ve = z(Be, !0);
		j(Be), j(ze), j(Ne), j(f);
		var He = V(f, 2), Ue = z(He);
		ma(V(z(Ue)), {
			size: 19,
			color: "var(--green)"
		}), j(Ue);
		var We = V(Ue, 2), Ge = V(z(We)), Ke = z(Ge, !0);
		j(Ge);
		var N = V(Ge, 3), P = z(N, !0);
		j(N);
		var qe = V(N, 3), Je = z(qe);
		j(qe);
		var Ye = V(qe, 3), Xe = z(Ye);
		j(Ye);
		var Ze = V(Ye, 3), Qe = z(Ze);
		j(Ze);
		var $e = V(Ze, 3), et = z($e, !0);
		j($e);
		var tt = V($e, 3), nt = z(tt, !0);
		j(tt), j(We), j(He);
		var rt = V(He, 2), it = (e) => {
			var t = ws(), n = z(t);
			Oa(V(z(n), 2), {
				size: 20,
				color: "var(--orange)"
			}), j(n);
			var r = V(n, 4), a = V(z(r)), o = z(a, !0);
			j(a), j(r), j(t), H((e) => J(o, e), [() => i(G(c))]), q(e, t);
		};
		Y(rt, (e) => {
			t.snapshot.capabilities.legacy_comparison && e(it);
		}), H((e, n, r, i, o, c, l, u, d, f, p, m, h, g, v, b, S, C, w, E, D, te, ne, re, ae, se, le) => {
			J(_, e), J(y, `Persönlicher Status: ${n ?? ""}.`), J(x, `Datenlage: ${r ?? ""} · Aktualisiert: ${i ?? ""}`), J(T, G(a).presence.effective || "Nicht konfiguriert"), J(ee, o), J(ie, c), J(oe, l), J(ce, `Datenlage: ${u ?? ""} · Aktualisiert: ${d ?? ""}`), J(de, f), J(ge, p), J(ve, `${m ?? ""}; nächster Phasenwechsel: ${h ?? ""}.`), J(be, `Datenlage: ${g ?? ""} · Backend-Projektion`), J(Ce, v), J(De, b), J(ke, `Datenlage: ${S ?? ""} · Aktualisiert: ${C ?? ""}`), J(Me, w), J(Fe, E), J(M, `${D ?? ""}. Entscheidung: ${te ?? ""}.`), J(Re, `Datenlage: ${ne ?? ""} · Quelle: ${re ?? ""}`), J(Ve, ae), J(Ke, se), J(P, le), J(Je, `Core State v${t.snapshot.integration_version ?? ""}`), J(Xe, `${t.snapshot.contract ?? ""} · v${t.snapshot.version ?? ""}`), J(Qe, `Core State · v${t.snapshot.data.timeline.version ?? ""}`), J(et, G(s).mapping_contract_version ? `Core State · v${G(s).mapping_contract_version}` : "Nicht konfiguriert"), J(nt, t.snapshot.permissions.command ? "Änderungen autorisiert" : "Nur Lesen");
		}, [
			() => To(G(a).presence.effective || G(a).presence.personal),
			() => To(G(a).presence.personal),
			() => Ao(G(a).data_status),
			() => Ro(t.snapshot.updated_at),
			() => jo("core_state"),
			() => Co(G(a).bio.state),
			() => G(a).bio.provisional ? "Schutzstatus; noch keine bestätigte Schlafzeit." : Po(r(G(l).reason) ?? G(a).reason) + ".",
			() => Ao(G(a).data_status),
			() => Ro(t.snapshot.updated_at),
			() => i({
				state: G(a).bio.state,
				provisional: G(a).bio.provisional,
				diagnostics: G(l)
			}),
			() => Do(G(o).active_phase),
			() => Oo(G(a).day_context.value, { holiday: G(a).day_context.holiday }),
			() => Ro(G(o).next_change),
			() => Ao(G(a).data_status),
			() => i({
				active_phase: G(o).active_phase,
				day_context: G(a).day_context,
				timeline_version: G(o).version
			}),
			() => Eo(G(a).activity.state),
			() => Ao(G(a).data_status),
			() => Ro(t.snapshot.updated_at),
			() => i(G(u)),
			() => wo(G(a).wake.wake_state),
			() => Po(G(a).wake.reason),
			() => Mo(G(a).wake.decided_by),
			() => Ao(G(a).data_status),
			() => jo(r(G(c).source) ?? "internal:wake_planning"),
			() => i({
				wake: G(a).wake,
				diagnostics: G(c)
			}),
			() => Ao(t.snapshot.status),
			() => Ro(t.snapshot.updated_at)
		]), q(e, d);
	}, d = (e) => {
		var t = Es();
		ma(z(t), { size: 30 }), M(4), j(t), q(e, t);
	};
	Y(l, (e) => {
		t.snapshot?.data ? e(u) : e(d, -1);
	}), H((e) => {
		Gi(s, "data-status", t.snapshot?.status ?? t.status), J(c, `Datenlage: ${e ?? ""}`);
	}, [() => Ao(t.snapshot?.status ?? t.status)]), q(e, a), P();
}
//#endregion
//#region src/views/ProfilesRulesView.svelte
var ks = /* @__PURE__ */ K("<button type=\"button\"><span class=\"section-kicker\"> </span> <h3> </h3> <dl class=\"profile-matrix-list\"><div><dt>E · Frühester möglicher Weckbeginn</dt><dd> </dd></div> <div><dt>L · Spätester Weckbeginn – harte Grenze</dt><dd> </dd></div> <div><dt>M · Gewünschte Mindestschlafdauer</dt><dd> </dd></div> <div><dt>A · Schutzvorlauf für vorsorglichen Schlaf</dt><dd> </dd></div></dl> <p class=\"helper\">Herkunft: persistente Core-State-Profilkonfiguration; E und L werden im Tagesstatus mit den aktuellen Backend-Grenzen ausgewiesen.</p></button>"), As = /* @__PURE__ */ K("<div class=\"validation-error\" role=\"alert\"> </div>"), js = /* @__PURE__ */ K("<div class=\"action-row\"><button class=\"button secondary\" type=\"button\">Bearbeiten</button> <button class=\"button secondary danger\" type=\"button\"><!> Entfernen</button></div>"), Ms = /* @__PURE__ */ K("<span class=\"helper\">Profilregel</span>"), Ns = /* @__PURE__ */ K("<tr><td><strong> </strong></td><td> </td><td> </td><td> </td><td><!></td></tr>"), Ps = /* @__PURE__ */ K("<section class=\"profile-matrix\" aria-labelledby=\"profile-matrix-heading\"><div class=\"section-header\"><div><p class=\"section-kicker\">Wirksame Profile</p> <h3 id=\"profile-matrix-heading\">Werktag und Wochenende</h3></div> <span class=\"chip purple\">Automatische Auswahl durch Core State</span></div> <div class=\"profile-grid\"></div></section> <section class=\"form-card\" style=\"margin-top: 14px;\" aria-labelledby=\"profile-edit-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Autorisierte Core-State-Änderung</p> <h3 id=\"profile-edit-heading\"> </h3></div> <span class=\"chip purple\">Keine manuelle Profilumschaltung</span></div> <!> <form class=\"form-grid\"><label class=\"field\"><span class=\"field-label\">Weckbeginn / Backend-Zielzeit (E/L-Fenster)</span> <input type=\"time\" required=\"\"/></label> <label class=\"field\"><span class=\"field-label\">Weckfenster zwischen E und L (Minuten)</span> <input type=\"number\" min=\"0\" max=\"120\" required=\"\"/></label> <label class=\"field\"><span class=\"field-label\">M · Gewünschte Mindestschlafdauer (Minuten)</span> <input type=\"number\" min=\"1\" max=\"1440\" placeholder=\"Nicht konfiguriert\"/> <small>Leer bleibt backendseitig nicht konfiguriert und wird nicht geraten.</small></label> <label class=\"field\"><span class=\"field-label\">A · Schutzvorlauf für vorsorglichen Schlaf (Minuten)</span> <input type=\"number\" min=\"1\" max=\"1440\" placeholder=\"Nicht konfiguriert\"/></label> <div class=\"field full action-row\"><button class=\"button\" type=\"submit\"><!> Profil speichern und synchronisieren</button> <span class=\"helper\">Warten, Erfolg, Fehler und anschließender Re-Sync kommen von Core State.</span></div></form></section> <section class=\"table-card\" style=\"margin-top: 14px;\" aria-labelledby=\"rules-heading\"><div class=\"section-header\"><div><p class=\"section-kicker\">Automatische Regelarten</p> <h3 id=\"rules-heading\">Regelgewinner und Gültigkeit</h3></div> <!></div> <div class=\"table-wrap\"><table class=\"rules-table\"><thead><tr><th>Regel</th><th>Priorität</th><th>Gültigkeit</th><th>Aktion</th><th></th></tr></thead><tbody></tbody></table></div></section> <section class=\"form-card\" style=\"margin-top: 14px;\" aria-labelledby=\"rule-edit-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Automatische Regel bearbeiten</p> <h3 id=\"rule-edit-heading\">Wochentage oder Datumsbereiche</h3></div> <span class=\"helper\">Nur Core-State-Regeln, kein manueller Skip-, Zeit- oder Profil-Override.</span></div> <form class=\"form-grid\"><label class=\"field\"><span class=\"field-label\">Technischer Regelcode</span><input required=\"\" placeholder=\"z. B. school_cycle\"/></label> <label class=\"field\"><span class=\"field-label\">Verständlicher Regelname</span><input placeholder=\"z. B. Schulwoche\"/></label> <label class=\"field\"><span class=\"field-label\">Aktion</span><select><option>Wecken</option><option>Kein Weckvorgang</option></select></label> <label class=\"field\"><span class=\"field-label\">Weckzeit</span><input type=\"time\"/></label> <label class=\"field\"><span class=\"field-label\">Priorität</span><input type=\"number\" min=\"0\" max=\"1000\"/></label> <label class=\"field\"><span class=\"field-label\">Wochentage</span><input placeholder=\"0,1,2\"/><small>Montag 0 bis Sonntag 6.</small></label> <label class=\"field\"><span class=\"field-label\">Gültig ab</span><input type=\"date\"/></label> <label class=\"field\"><span class=\"field-label\">Gültig bis</span><input type=\"date\"/></label> <div class=\"field full action-row\"><button class=\"button\" type=\"submit\"><!> Regel speichern</button></div></form></section>", 1), Fs = /* @__PURE__ */ K("<div class=\"skeleton\" aria-busy=\"true\"></div>"), Is = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Profile & Regeln</p> <h2>Schlaf- und Weckprofil-Matrix</h2> <p class=\"muted\">Genau zwei wirksame Profile. Feiertag und Urlaub wählen automatisch das Wochenendprofil; sie sind keine zusätzlichen Wertprofile.</p></div></div> <!>", 1);
function Ls(e, t) {
	N(t, !0);
	let n = ["weekday", "weekend"], r = [
		"Montag",
		"Dienstag",
		"Mittwoch",
		"Donnerstag",
		"Freitag",
		"Samstag",
		"Sonntag"
	], i = /* @__PURE__ */ L("weekday"), a = /* @__PURE__ */ L(null), o = /* @__PURE__ */ L("07:00"), s = /* @__PURE__ */ L(5), c = /* @__PURE__ */ L(""), l = /* @__PURE__ */ L(""), u = /* @__PURE__ */ L(null), d = /* @__PURE__ */ L(""), f = /* @__PURE__ */ L(""), p = /* @__PURE__ */ L("07:00"), m = /* @__PURE__ */ L(""), h = /* @__PURE__ */ L(100), g = /* @__PURE__ */ L("wake"), _ = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L("");
	function y(e) {
		R(i, e, !0);
		let n = t.snapshot?.config.profiles[e];
		n && (R(o, n.wake_time, !0), R(s, n.wake_window_minutes, !0), R(c, n.minimum_sleep_minutes === null ? "" : String(n.minimum_sleep_minutes), !0), R(l, n.provisional_lead_minutes === null ? "" : String(n.provisional_lead_minutes), !0), R(a, e, !0), R(u, null));
	}
	On(() => {
		t.snapshot?.config.profiles[G(i)] && G(a) !== G(i) && y(G(i));
	});
	function b(e, t) {
		let n = e.trim();
		if (!n) return null;
		let r = Number(n);
		if (!Number.isInteger(r) || r < 1 || r > 1440) throw Error(`${t} muss eine ganze Zahl zwischen 1 und 1440 Minuten sein.`);
		return r;
	}
	function x() {
		if (!/^\d{2}:\d{2}$/.test(G(o))) return "Die Weckzeit muss im Format HH:MM angegeben werden.";
		if (!Number.isInteger(Number(G(s))) || Number(G(s)) < 0 || Number(G(s)) > 120) return "Das Weckfenster muss eine ganze Zahl zwischen 0 und 120 Minuten sein.";
		try {
			b(G(c), "Die Mindestschlafdauer"), b(G(l), "Der Schutzvorlauf");
		} catch (e) {
			return e instanceof Error ? e.message : "Die Profilwerte sind ungültig.";
		}
		return null;
	}
	async function S(e) {
		e.preventDefault(), R(u, x(), !0), !G(u) && (await t.onCommand("wake.profile.update", {
			profile_id: G(i),
			values: {
				wake_time: G(o),
				wake_window_minutes: Number(G(s)),
				minimum_sleep_minutes: b(G(c), "Die Mindestschlafdauer"),
				provisional_lead_minutes: b(G(l), "Der Schutzvorlauf")
			}
		}), R(a, null));
	}
	function C(e) {
		R(d, e.id, !0), R(f, e.name, !0), R(p, e.wake_time ?? "07:00", !0), R(m, e.weekdays?.join(",") ?? "", !0), R(h, e.priority, !0), R(g, e.action, !0), R(_, e.date_from ?? "", !0), R(v, e.date_to ?? "", !0);
	}
	function w(e) {
		return e.weekdays?.length ? e.weekdays.map((e) => r[e] ?? "Unbekannter Wochentag").join(", ") : e.date_from || e.date_to ? "Datumsbereich" : "Automatische Core-State-Auswahl";
	}
	async function T(e) {
		e.preventDefault(), await t.onCommand("wake.rule.upsert", { rule: {
			id: G(d).trim(),
			name: G(f).trim() || G(d).trim(),
			priority: Number(G(h)),
			enabled: !0,
			weekdays: G(m).split(",").map((e) => Number(e.trim())).filter((e) => Number.isInteger(e) && e >= 0 && e <= 6),
			date_from: G(_) || null,
			date_to: G(v) || null,
			action: G(g),
			wake_time: G(g) === "wake" ? G(p) : null
		} });
	}
	var E = Is(), ee = V(B(E), 2), D = (e) => {
		var r = Ps(), a = B(r), b = V(z(a), 2);
		ui(b, 20, () => n, (e) => e, (e, n) => {
			let r = /* @__PURE__ */ F(() => t.snapshot.config.profiles[n]);
			var a = ks();
			let o;
			var s = z(a), c = z(s, !0);
			j(s);
			var l = V(s, 2), u = z(l, !0);
			j(l);
			var d = V(l, 2), f = z(d), p = V(z(f)), m = z(p, !0);
			j(p), j(f);
			var h = V(f, 2), g = V(z(h)), _ = z(g);
			j(g), j(h);
			var v = V(h, 2), b = V(z(v)), x = z(b, !0);
			j(b), j(v);
			var S = V(v, 2), C = V(z(S)), w = z(C, !0);
			j(C), j(S), j(d), M(2), j(a), H((e, t, n, s, l) => {
				o = Oi(a, 1, "profile-card", null, o, { active: G(i) === G(r).id }), Gi(a, "aria-pressed", G(i) === G(r).id), J(c, e), J(u, t), J(m, n), J(_, `Backend-Fenster ±${G(r).wake_window_minutes ?? ""} Min.`), J(x, s), J(w, l);
			}, [
				() => ko(G(r).id),
				() => ko(G(r).id),
				() => zo(G(r).wake_time),
				() => Bo(G(r).minimum_sleep_minutes),
				() => Bo(G(r).provisional_lead_minutes)
			]), Vr("click", a, () => y(G(r).id)), q(e, a);
		}), j(b), j(a);
		var x = V(a, 2), E = z(x), ee = z(E), D = V(z(ee), 2), te = z(D);
		j(D), j(ee), M(2), j(E);
		var ne = V(E, 2), re = (e) => {
			var t = As(), n = z(t, !0);
			j(t), H(() => J(n, G(u))), q(e, t);
		};
		Y(ne, (e) => {
			G(u) && e(re);
		});
		var ie = V(ne, 2), ae = z(ie), oe = V(z(ae), 2);
		Ui(oe), j(ae);
		var se = V(ae, 2), ce = V(z(se), 2);
		Ui(ce), j(se);
		var le = V(se, 2), ue = V(z(le), 2);
		Ui(ue), M(2), j(le);
		var de = V(le, 2), fe = V(z(de), 2);
		Ui(fe), j(de);
		var pe = V(de, 2), me = z(pe);
		Ba(z(me), { size: 16 }), M(), j(me), M(2), j(pe), j(ie), j(x);
		var he = V(x, 2), ge = z(he);
		Pa(V(z(ge), 2), {
			size: 19,
			color: "var(--cyan)"
		}), j(ge);
		var _e = V(ge, 2), ve = z(_e), ye = V(z(ve));
		ui(ye, 21, () => t.snapshot.config.effective_rules ?? t.snapshot.config.rules, (e) => e.id, (e, n) => {
			var r = Ns(), i = z(r), a = z(i), o = z(a, !0);
			j(a), j(i);
			var s = V(i), c = z(s, !0);
			j(s);
			var l = V(s), u = z(l, !0);
			j(l);
			var d = V(l), f = z(d, !0);
			j(d);
			var p = V(d), m = z(p), h = (e) => {
				var r = js(), i = z(r), a = V(i, 2);
				Xa(z(a), { size: 15 }), M(), j(a), j(r), H(() => {
					i.disabled = !t.snapshot.capabilities.edit_rules, a.disabled = t.pendingCommand !== null || !t.snapshot.capabilities.edit_rules;
				}), Vr("click", i, () => C(G(n))), Vr("click", a, () => t.onCommand("wake.rule.remove", { rule_id: G(n).id })), q(e, r);
			}, g = /* @__PURE__ */ F(() => !G(n).id.startsWith("profile_")), _ = (e) => {
				q(e, Ms());
			};
			Y(m, (e) => {
				G(g) ? e(h) : e(_, -1);
			}), j(p), j(r), H((e, t, r) => {
				J(o, e), J(c, G(n).priority), J(u, t), J(f, r);
			}, [
				() => No(G(n).name, G(n).id),
				() => w(G(n)),
				() => G(n).action === "skip" ? "Kein Weckvorgang" : `Wecken um ${zo(G(n).wake_time)}`
			]), q(e, r);
		}), j(ye), j(ve), j(_e), j(he);
		var be = V(he, 2), xe = V(z(be), 2), Se = z(xe), Ce = V(z(Se));
		Ui(Ce), j(Se);
		var we = V(Se, 2), Te = V(z(we));
		Ui(Te), j(we);
		var Ee = V(we, 2), O = V(z(Ee)), De = z(O);
		De.value = De.__value = "wake";
		var Oe = V(De);
		Oe.value = Oe.__value = "skip", j(O), j(Ee);
		var ke = V(Ee, 2), Ae = V(z(ke));
		Ui(Ae), j(ke);
		var je = V(ke, 2), Me = V(z(je));
		Ui(Me), j(je);
		var Ne = V(je, 2), k = V(z(Ne));
		Ui(k), M(), j(Ne);
		var Pe = V(Ne, 2), A = V(z(Pe));
		Ui(A), j(Pe);
		var Fe = V(Pe, 2), Ie = V(z(Fe));
		Ui(Ie), j(Fe);
		var Le = V(Fe, 2), Re = z(Le);
		Ba(z(Re), { size: 16 }), M(), j(Re), j(Le), j(xe), j(be), H((e) => {
			J(te, `${e ?? ""} bearbeiten`), Gi(oe, "aria-invalid", G(u) ? "true" : void 0), Gi(ce, "aria-invalid", G(u) ? "true" : void 0), Gi(ue, "aria-invalid", G(u) ? "true" : void 0), Gi(fe, "aria-invalid", G(u) ? "true" : void 0), me.disabled = t.pendingCommand !== null || !t.snapshot.capabilities.edit_profiles, Ae.disabled = G(g) === "skip", Re.disabled = t.pendingCommand !== null || !t.snapshot.capabilities.edit_rules;
		}, [() => ko(G(i))]), Br("submit", ie, S), Zi(oe, () => G(o), (e) => R(o, e)), Zi(ce, () => G(s), (e) => R(s, e)), Zi(ue, () => G(c), (e) => R(c, e)), Zi(fe, () => G(l), (e) => R(l, e)), Br("submit", xe, T), Zi(Ce, () => G(d), (e) => R(d, e)), Zi(Te, () => G(f), (e) => R(f, e)), Ni(O, () => G(g), (e) => R(g, e)), Zi(Ae, () => G(p), (e) => R(p, e)), Zi(Me, () => G(h), (e) => R(h, e)), Zi(k, () => G(m), (e) => R(m, e)), Zi(A, () => G(_), (e) => R(_, e)), Zi(Ie, () => G(v), (e) => R(v, e)), q(e, r);
	}, te = (e) => {
		q(e, Fs());
	};
	Y(ee, (e) => {
		t.snapshot?.config ? e(D) : e(te, -1);
	}), q(e, E), P();
}
Hr(["click"]);
//#endregion
//#region src/views/SettingsView.svelte
var Rs = /* @__PURE__ */ K("<section class=\"card\" style=\"margin-top: 14px;\" aria-labelledby=\"migration-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Migration</p> <h3 id=\"migration-heading\">Versionierte Übernahme</h3></div> <span class=\"chip orange\"> </span></div> <p class=\"helper\"> </p> <div class=\"action-row\"><button class=\"button secondary danger\" type=\"button\"><!> Core-State-Migration zurücksetzen</button></div></section>"), zs = /* @__PURE__ */ K("<section class=\"form-card\" aria-labelledby=\"settings-heading\"><div class=\"card-header\"><div><p class=\"section-kicker\">Konfiguration</p> <h3 id=\"settings-heading\">Kalender, Konflikte und Floor</h3></div> <span class=\"chip cyan\"> </span></div> <form class=\"form-grid\"><label class=\"field\"><span class=\"field-label\">Weck-Kalenderquelle</span> <input placeholder=\"calendar.core_state_wake\"/> <small>Nur externe Quelle lesen; Core State schreibt nicht in den Kalender.</small></label> <label class=\"field\"><span class=\"field-label\">Feiertags-/Urlaubsquelle</span> <input placeholder=\"calendar.core_state_holidays\"/> <small>Feiertag und Urlaub stufen Werktag automatisch auf Wochenende.</small></label> <label class=\"field full\"><span class=\"field-label\">Manuelle Feiertags-/Urlaubsintervalle</span> <textarea placeholder=\"2026-12-24..2026-12-31\"></textarea> <small>Ein Datum oder Intervall pro Zeile. Samstag bleibt Wochenende.</small></label> <label class=\"field\"><span class=\"field-label\">Weckfenster bei Kalenderkonflikt</span> <select><option>Warnen, Regelzeit beibehalten</option><option>Für frühen Termin früher wecken</option><option>Konflikt ignorieren</option></select></label> <label class=\"field\"><span class=\"field-label\">Routine-Dauer (Minuten)</span> <input type=\"number\" min=\"0\" max=\"1440\"/></label> <label class=\"field\"><span class=\"field-label\">Absoluter Weck-Floor</span> <input type=\"time\" required=\"\"/> <small>Unabhängig von Tagesphase, Tageskontext und Sonnenaufgang.</small></label> <label class=\"field full\"><span class=\"field-label\">Kalender-Markierungen</span> <input placeholder=\"no-wake schlaf aus\"/> <small>Belegte automatische Skip-Titel; keine manuelle Skip-Aktion.</small></label> <label class=\"field full\"><span class=\"field-label\">Weckmuster</span> <input/> <small>Backend validiert das Muster und redigiert Ereignistexte aus der Diagnose.</small></label> <div class=\"field full action-row\"><button class=\"button\" type=\"submit\"><!> Einstellungen speichern</button></div></form></section> <!>", 1), Bs = /* @__PURE__ */ K("<div class=\"skeleton\" aria-busy=\"true\"></div>"), Vs = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Einstellungen</p> <h2>Core-State-eigene Quellen und Grenzen</h2> <p class=\"muted\">Diese Werte werden persistiert, versioniert validiert und ausschließlich von Core State ausgewertet.</p></div> <!></div> <!>", 1);
function Hs(e, t) {
	N(t, !0);
	let n = /* @__PURE__ */ L(!1), r = /* @__PURE__ */ L(""), i = /* @__PURE__ */ L(""), a = /* @__PURE__ */ L(""), o = /* @__PURE__ */ L(""), s = /* @__PURE__ */ L(""), c = /* @__PURE__ */ L(60), l = /* @__PURE__ */ L("warn_only"), u = /* @__PURE__ */ L("06:00");
	function d() {
		let e = t.snapshot?.config;
		e && (R(r, e.calendar_entity ?? "", !0), R(i, e.holiday_calendar_entity ?? "", !0), R(a, e.manual_holiday_intervals.join("\n"), !0), R(o, e.calendar_skip_titles.join("\n"), !0), R(s, e.calendar_wake_pattern, !0), R(c, e.routine_duration_minutes, !0), R(l, e.calendar_conflict_behavior, !0), R(u, e.wake_floor, !0), R(n, !0));
	}
	On(() => {
		!G(n) && t.snapshot?.config && d();
	});
	async function f(e) {
		e.preventDefault(), await t.onCommand("wake.settings.update", { values: {
			calendar_entity: G(r).trim() || null,
			holiday_calendar_entity: G(i).trim() || null,
			manual_holiday_intervals: G(a).split("\n").map((e) => e.trim()).filter(Boolean),
			calendar_skip_titles: G(o).split("\n").map((e) => e.trim()).filter(Boolean),
			calendar_wake_pattern: G(s),
			routine_duration_minutes: Number(G(c)),
			calendar_conflict_behavior: G(l),
			wake_floor: G(u)
		} });
	}
	var p = Vs(), m = B(p);
	va(V(z(m), 2), {
		size: 24,
		color: "var(--cyan)"
	}), j(m);
	var h = V(m, 2), g = (e) => {
		var n = zs(), d = B(n), p = z(d), m = V(z(p), 2), h = z(m);
		j(m), j(p);
		var g = V(p, 2), _ = z(g), v = V(z(_), 2);
		Ui(v), M(2), j(_);
		var y = V(_, 2), b = V(z(y), 2);
		Ui(b), M(2), j(y);
		var x = V(y, 2), S = V(z(x), 2);
		ft(S), M(2), j(x);
		var C = V(x, 2), w = V(z(C), 2), T = z(w);
		T.value = T.__value = "warn_only";
		var E = V(T);
		E.value = E.__value = "wake_earlier";
		var ee = V(E);
		ee.value = ee.__value = "ignore", j(w), j(C);
		var D = V(C, 2), te = V(z(D), 2);
		Ui(te), j(D);
		var ne = V(D, 2), re = V(z(ne), 2);
		Ui(re), M(2), j(ne);
		var ie = V(ne, 2), ae = V(z(ie), 2);
		Ui(ae), M(2), j(ie);
		var oe = V(ie, 2), se = V(z(oe), 2);
		Ui(se), M(2), j(oe);
		var ce = V(oe, 2), le = z(ce);
		Ba(z(le), { size: 16 }), M(), j(le), j(ce), j(g), j(d);
		var ue = V(d, 2), de = (e) => {
			var n = Rs(), r = z(n), i = V(z(r), 2), a = z(i, !0);
			j(i), j(r);
			var o = V(r, 2), s = z(o);
			j(o);
			var c = V(o, 2), l = z(c);
			Ra(z(l), { size: 16 }), M(), j(l), j(c), j(n), H(() => {
				J(a, t.snapshot.config.migration.status === "completed" ? "Abgeschlossen" : t.snapshot.config.migration.status === "pending" ? "Ausstehend" : "Unbekannt"), J(s, `Quelle: ${t.snapshot.config.migration.source ? "Temporärer Migrationsvergleich" : "Core State"}. Die alte Quelle wird nicht verändert; Rollback stellt das vorherige Core-State-Dokument wieder her.`), l.disabled = t.pendingCommand !== null || !t.snapshot.capabilities.edit_settings;
			}), Vr("click", l, () => t.onCommand("wake.config.rollback")), q(e, n);
		};
		Y(ue, (e) => {
			t.snapshot.config.migration.rollback_available && e(de);
		}), H(() => {
			J(h, `Konfigurationsvertrag v${t.snapshot.config.contract_version ?? ""}`), le.disabled = t.pendingCommand !== null || !t.snapshot.capabilities.edit_settings;
		}), Br("submit", g, f), Zi(v, () => G(r), (e) => R(r, e)), Zi(b, () => G(i), (e) => R(i, e)), Zi(S, () => G(a), (e) => R(a, e)), Ni(w, () => G(l), (e) => R(l, e)), Zi(te, () => G(c), (e) => R(c, e)), Zi(re, () => G(u), (e) => R(u, e)), Zi(ae, () => G(o), (e) => R(o, e)), Zi(se, () => G(s), (e) => R(s, e)), q(e, n);
	}, _ = (e) => {
		q(e, Bs());
	};
	Y(h, (e) => {
		t.snapshot?.config ? e(g) : e(_, -1);
	}), q(e, p), P();
}
Hr(["click"]);
//#endregion
//#region src/lib/ui/Button.svelte
var Us = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"class",
	"children",
	"type"
]), Ws = /* @__PURE__ */ K("<button><!></button>");
function Gs(e, t) {
	let n = Q(t, "variant", 3, "default"), r = Q(t, "class", 3, ""), i = Q(t, "type", 3, "button"), a = /* @__PURE__ */ X(t, Us);
	var o = Ws();
	qi(o, () => ({
		...a,
		type: i(),
		class: `button inline-flex min-h-11 items-center justify-center gap-2 ${n() === "default" ? "" : n()} ${r()}`
	})), gi(z(o), () => t.children ?? f), j(o), q(e, o);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/is.js
function Ks(e) {
	return typeof e == "object" && !!e;
}
var qs = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function Js(e) {
	return e == null || qs.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => Js(e)) : typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var Ys = Symbol("box"), Xs = Symbol("is-writable");
function $(e, t) {
	let n = /* @__PURE__ */ F(e);
	return t ? {
		[Ys]: !0,
		[Xs]: !0,
		get current() {
			return G(n);
		},
		set current(e) {
			t(e);
		}
	} : {
		[Ys]: !0,
		get current() {
			return e();
		}
	};
}
function Zs(e) {
	return Ks(e) && Ys in e;
}
function Qs(e) {
	let t = /* @__PURE__ */ L(cn(e));
	return {
		[Ys]: !0,
		[Xs]: !0,
		get current() {
			return G(t);
		},
		set current(e) {
			R(t, e, !0);
		}
	};
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
function $s(...e) {
	return function(t) {
		for (let n of e) if (n) {
			if (t.defaultPrevented) return;
			typeof n == "function" ? n.call(this, t) : n.current?.call(this, t);
		}
	};
}
//#endregion
//#region node_modules/inline-style-parser/esm/index.mjs
var ec = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, tc = /\n/g, nc = /^\s*/, rc = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, ic = /^:\s*/, ac = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, oc = /^[;\s]*/, sc = /^\s+|\s+$/g, cc = "\n", lc = "/", uc = "*", dc = "", fc = "comment", pc = "declaration";
function mc(e, t) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	t ||= {};
	var n = 1, r = 1;
	function i(e) {
		var t = e.match(tc);
		t && (n += t.length);
		var i = e.lastIndexOf(cc);
		r = ~i ? e.length - i : r + e.length;
	}
	function a() {
		var e = {
			line: n,
			column: r
		};
		return function(t) {
			return t.position = new o(e), l(), t;
		};
	}
	function o(e) {
		this.start = e, this.end = {
			line: n,
			column: r
		}, this.source = t.source;
	}
	o.prototype.content = e;
	function s(i) {
		var a = /* @__PURE__ */ Error(t.source + ":" + n + ":" + r + ": " + i);
		if (a.reason = i, a.filename = t.source, a.line = n, a.column = r, a.source = e, !t.silent) throw a;
	}
	function c(t) {
		var n = t.exec(e);
		if (n) {
			var r = n[0];
			return i(r), e = e.slice(r.length), n;
		}
	}
	function l() {
		c(nc);
	}
	function u(e) {
		var t;
		for (e ||= []; t = d();) t !== !1 && e.push(t);
		return e;
	}
	function d() {
		var t = a();
		if (lc == e.charAt(0) && uc == e.charAt(1)) {
			for (var n = 2; dc != e.charAt(n) && (uc != e.charAt(n) || lc != e.charAt(n + 1));) ++n;
			if (n += 2, dc === e.charAt(n - 1)) return s("End of comment missing");
			var o = e.slice(2, n - 2);
			return r += 2, i(o), e = e.slice(n), r += 2, t({
				type: fc,
				comment: o
			});
		}
	}
	function f() {
		var e = a(), t = c(rc);
		if (t) {
			if (d(), !c(ic)) return s("property missing ':'");
			var n = c(ac), r = e({
				type: pc,
				property: hc(t[0].replace(ec, dc)),
				value: n ? hc(n[0].replace(ec, dc)) : dc
			});
			return c(oc), r;
		}
	}
	function p() {
		var e = [];
		u(e);
		for (var t; t = f();) t !== !1 && (e.push(t), u(e));
		return e;
	}
	return l(), p();
}
function hc(e) {
	return e ? e.replace(sc, dc) : dc;
}
//#endregion
//#region node_modules/style-to-object/esm/index.mjs
function gc(e, t) {
	let n = null;
	if (!e || typeof e != "string") return n;
	let r = mc(e), i = typeof t == "function";
	return r.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: r, value: a } = e;
		i ? t(r, a, e) : a && (n ||= {}, n[r] = a);
	}), n;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/strings.js
var _c = /\d/, vc = [
	"-",
	"_",
	"/",
	"."
];
function yc(e = "") {
	if (!_c.test(e)) return e !== e.toLowerCase();
}
function bc(e) {
	let t = [], n = "", r, i;
	for (let a of e) {
		let e = vc.includes(a);
		if (e === !0) {
			t.push(n), n = "", r = void 0;
			continue;
		}
		let o = yc(a);
		if (i === !1) {
			if (r === !1 && o === !0) {
				t.push(n), n = a, r = o;
				continue;
			}
			if (r === !0 && o === !1 && n.length > 1) {
				let e = n.at(-1);
				t.push(n.slice(0, Math.max(0, n.length - 1))), n = e + a, r = o;
				continue;
			}
		}
		n += a, r = o, i = e;
	}
	return t.push(n), t;
}
function xc(e) {
	return e ? bc(e).map((e) => Cc(e)).join("") : "";
}
function Sc(e) {
	return wc(xc(e || ""));
}
function Cc(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : "";
}
function wc(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : "";
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
function Tc(e) {
	if (!e) return {};
	let t = {};
	function n(e, n) {
		if (e.startsWith("-moz-") || e.startsWith("-webkit-") || e.startsWith("-ms-") || e.startsWith("-o-")) {
			t[xc(e)] = n;
			return;
		}
		if (e.startsWith("--")) {
			t[e] = n;
			return;
		}
		t[Sc(e)] = n;
	}
	return gc(e, n), t;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
function Ec(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function Dc(e, t) {
	let n = RegExp(e, "g");
	return (e) => {
		if (typeof e != "string") throw TypeError(`expected an argument of type string, but got ${typeof e}`);
		return e.match(n) ? e.replace(n, t) : e;
	};
}
var Oc = Dc(/[A-Z]/, (e) => `-${e.toLowerCase()}`);
function kc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError(`expected an argument of type object, but got ${typeof e}`);
	return Object.keys(e).map((t) => `${Oc(t)}: ${e[t]};`).join("\n");
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/style.js
function Ac(e = {}) {
	return kc(e).replace("\n", " ");
}
var jc = new Set(/* @__PURE__ */ "onabort.onanimationcancel.onanimationend.onanimationiteration.onanimationstart.onauxclick.onbeforeinput.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncompositionend.oncompositionstart.oncompositionupdate.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onfocusin.onfocusout.onformdata.ongotpointercapture.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onlostpointercapture.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onpaste.onpause.onplay.onplaying.onpointercancel.onpointerdown.onpointerenter.onpointerleave.onpointermove.onpointerout.onpointerover.onpointerup.onprogress.onratechange.onreset.onresize.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onselectionchange.onselectstart.onslotchange.onstalled.onsubmit.onsuspend.ontimeupdate.ontoggle.ontouchcancel.ontouchend.ontouchmove.ontouchstart.ontransitioncancel.ontransitionend.ontransitionrun.ontransitionstart.onvolumechange.onwaiting.onwebkitanimationend.onwebkitanimationiteration.onwebkitanimationstart.onwebkittransitionend.onwheel".split("."));
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/merge-props.js
function Mc(e) {
	return jc.has(e);
}
function Nc(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		if (r) {
			for (let e of Object.keys(r)) {
				let n = t[e], i = r[e], a = typeof n == "function", o = typeof i == "function";
				if (a && typeof o && Mc(e)) t[e] = $s(n, i);
				else if (a && o) t[e] = Ec(n, i);
				else if (e === "class") {
					let r = Js(n), a = Js(i);
					r && a ? t[e] = xi(n, i) : r ? t[e] = xi(n) : a && (t[e] = xi(i));
				} else if (e === "style") {
					let r = typeof n == "object", a = typeof i == "object", o = typeof n == "string", s = typeof i == "string";
					if (r && a) t[e] = {
						...n,
						...i
					};
					else if (r && s) {
						let r = Tc(i);
						t[e] = {
							...n,
							...r
						};
					} else if (o && a) t[e] = {
						...Tc(n),
						...i
					};
					else if (o && s) {
						let r = Tc(n), a = Tc(i);
						t[e] = {
							...r,
							...a
						};
					} else r ? t[e] = n : a ? t[e] = i : o ? t[e] = n : s && (t[e] = i);
				} else t[e] = i === void 0 ? n : i;
			}
			for (let e of Object.getOwnPropertySymbols(r)) {
				let n = t[e], i = r[e];
				t[e] = i === void 0 ? n : i;
			}
		}
	}
	return typeof t.style == "object" && (t.style = Ac(t.style).replaceAll("\n", " ")), t.hidden === !1 && (t.hidden = void 0, delete t.hidden), t.disabled === !1 && (t.disabled = void 0, delete t.disabled), t;
}
//#endregion
//#region node_modules/runed/dist/internal/configurable-globals.js
var Pc = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region node_modules/runed/dist/internal/utils/dom.js
function Fc(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
//#endregion
//#region node_modules/svelte/src/reactivity/map.js
var Ic = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ L(0);
	#n = /* @__PURE__ */ L(0);
	#r = dr || -1;
	constructor(e) {
		if (super(), e) {
			for (var [t, n] of e) super.set(t, n);
			this.#n.v = super.size;
		}
	}
	#i(e) {
		return dr === this.#r ? /* @__PURE__ */ L(e) : tn(e);
	}
	has(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else return G(this.#t), !1;
		}
		return G(n), !0;
	}
	forEach(e, t) {
		this.#a(), super.forEach(e, t);
	}
	get(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else {
				G(this.#t);
				return;
			}
		}
		return G(n), super.get(e);
	}
	set(e, t) {
		var n = this.#e, r = n.get(e), i = super.get(e), a = super.set(e, t), o = this.#t;
		if (r === void 0) r = this.#i(0), n.set(e, r), R(this.#n, super.size), on(o);
		else if (i !== t) {
			on(r);
			var s = o.reactions === null ? null : new Set(o.reactions);
			(s === null || !r.reactions?.every((e) => s.has(e))) && on(o);
		}
		return a;
	}
	delete(e) {
		var t = this.#e, n = t.get(e), r = super.delete(e);
		return n !== void 0 && (t.delete(e), R(n, -1)), r && (R(this.#n, super.size), on(this.#t)), r;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			R(this.#n, 0);
			for (var t of e.values()) R(t, -1);
			on(this.#t), e.clear();
		}
	}
	#a() {
		G(this.#t);
		var e = this.#e;
		if (this.#n.v !== e.size) {
			for (var t of super.keys()) if (!e.has(t)) {
				var n = this.#i(0);
				e.set(t, n);
			}
		}
		for ([, n] of this.#e) G(n);
	}
	keys() {
		return G(this.#t), super.keys();
	}
	values() {
		return this.#a(), super.values();
	}
	entries() {
		return this.#a(), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return G(this.#n), super.size;
	}
};
new class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = Pc, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = _t((e) => {
			let n = zr(t, "focusin", e), r = zr(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Fc(this.#e) : null;
	}
}();
//#endregion
//#region node_modules/runed/dist/internal/utils/is.js
function Lc(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/runed/dist/utilities/context/context.js
var Rc = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = Symbol(e);
	}
	get key() {
		return this.#t;
	}
	exists() {
		return Ke(this.#t);
	}
	get() {
		let e = We(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = We(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return Ge(this.#t, e);
	}
};
//#endregion
//#region node_modules/runed/dist/utilities/watch/watch.svelte.js
function zc(e, t) {
	switch (e) {
		case "post":
			On(t);
			break;
		case "pre": An(t);
	}
}
function Bc(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	zc(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = Cr(() => n(t, o));
		return o = t, r;
	});
}
function Vc(e, t, n) {
	Bc(e, "post", t, n);
}
function Hc(e, t, n) {
	Bc(e, "pre", t, n);
}
Vc.pre = Hc;
//#endregion
//#region node_modules/runed/dist/internal/utils/get.js
function Uc(e) {
	return Lc(e) ? e() : e;
}
//#endregion
//#region node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var Wc = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = /* @__PURE__ */ F(() => (G(this.#s)?.(), this.getSize().width));
	#o = /* @__PURE__ */ F(() => (G(this.#s)?.(), this.getSize().height));
	#s = /* @__PURE__ */ F(() => {
		let e = Uc(this.#r);
		if (e) return _t((t) => {
			if (!this.#i) return;
			let n = new this.#i.ResizeObserver((e) => {
				this.#t = !0;
				for (let t of e) {
					let e = this.#n.box === "content-box" ? t.contentBoxSize : t.borderBoxSize, n = Array.isArray(e) ? e : [e];
					this.#e.width = n.reduce((e, t) => Math.max(e, t.inlineSize), 0), this.#e.height = n.reduce((e, t) => Math.max(e, t.blockSize), 0);
				}
				t();
			});
			return n.observe(e), () => {
				this.#t = !1, n.disconnect();
			};
		});
	});
	constructor(e, t = { box: "border-box" }) {
		this.#i = t.window ?? Pc, this.#n = t, this.#r = e, this.#e = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		let e = Uc(this.#r);
		if (!e || !this.#i) return;
		let t = e.offsetWidth, n = e.offsetHeight;
		if (this.#n.box === "border-box") return {
			width: t,
			height: n
		};
		let r = this.#i.getComputedStyle(e), i = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), a = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), o = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), s = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
		return {
			width: t - i - o,
			height: n - a - s
		};
	}
	getSize() {
		return this.#t ? this.#e : this.calculateSize() ?? this.#e;
	}
	get current() {
		return G(this.#s)?.(), this.getSize();
	}
	get width() {
		return G(this.#a);
	}
	get height() {
		return G(this.#o);
	}
};
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function Gc(e) {
	On(() => () => {
		e();
	});
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Kc(e) {
	On(() => Cr(() => e()));
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function qc(e, t) {
	return setTimeout(t, e);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/after-tick.js
function Jc(e) {
	br().then(e);
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/dom.js
var Yc = 1, Xc = 9, Zc = 11;
function Qc(e) {
	return Ks(e) && e.nodeType === Yc && typeof e.nodeName == "string";
}
function $c(e) {
	return Ks(e) && e.nodeType === Xc;
}
function el(e) {
	return Ks(e) && e.constructor?.name === "VisualViewport";
}
function tl(e) {
	return Ks(e) && e.nodeType !== void 0;
}
function nl(e) {
	return tl(e) && e.nodeType === Zc && "host" in e;
}
function rl(e, t) {
	if (!e || !t || !Qc(e) || !Qc(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && nl(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function il(e) {
	return $c(e) ? e : el(e) ? e.document : e?.ownerDocument ?? document;
}
function al(e) {
	return nl(e) ? al(e.host) : $c(e) ? e.defaultView ?? window : Qc(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function ol(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var sl = class {
	element;
	#e = /* @__PURE__ */ F(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return G(this.#e);
	}
	set root(e) {
		R(this.#e, e);
	}
	constructor(e) {
		this.element = typeof e == "function" ? $(e) : e;
	}
	getDocument = () => il(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => ol(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, t) => this.getWindow().setTimeout(e, t);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
};
//#endregion
//#region node_modules/svelte-toolbelt/dist/utils/attach-ref.js
function cl(e, t) {
	return { [wr()]: (n) => Zs(e) ? (e.current = n, Cr(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e.current = null, t?.(null));
	}) : (e(n), Cr(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e(null), t?.(null));
	}) };
}
//#endregion
//#region node_modules/bits-ui/dist/internal/attrs.js
function ll(e) {
	return e ? "" : void 0;
}
function ul(e) {
	return e === "starting" ? { "data-starting-style": "" } : e === "ending" ? { "data-ending-style": "" } : {};
}
var dl = class {
	#e;
	#t;
	attrs;
	constructor(e) {
		this.#e = e.getVariant ? e.getVariant() : null, this.#t = this.#e ? `data-${this.#e}-` : `data-${e.component}-`, this.getAttr = this.getAttr.bind(this), this.selector = this.selector.bind(this), this.attrs = Object.fromEntries(e.parts.map((e) => [e, this.getAttr(e)]));
	}
	getAttr(e, t) {
		return t ? `data-${t}-${e}` : `${this.#t}${e}`;
	}
	selector(e, t) {
		return `[${this.getAttr(e, t)}]`;
	}
};
function fl(e) {
	let t = new dl(e);
	return {
		...t.attrs,
		selector: t.selector,
		getAttr: t.getAttr
	};
}
//#endregion
//#region node_modules/bits-ui/dist/internal/is.js
var pl = typeof document < "u", ml = hl();
function hl() {
	return pl && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function gl(e) {
	return e instanceof HTMLElement;
}
function _l(e) {
	return e instanceof Element;
}
function vl(e) {
	return e instanceof Element || e instanceof SVGElement;
}
function yl(e) {
	return e.matches(":focus-visible");
}
function bl(e) {
	return e !== null;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/animations-complete.js
var xl = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, Gc(() => this.#i());
	}
	#i() {
		this.#t !== null && (window.cancelAnimationFrame(this.#t), this.#t = null), this.#n?.disconnect(), this.#n = null, this.#r++;
	}
	run(e) {
		this.#i();
		let t = this.#e.ref.current;
		if (!t) return;
		if (typeof t.getAnimations != "function") {
			this.#a(e);
			return;
		}
		let n = this.#r, r = () => {
			n === this.#r && this.#a(e);
		}, i = () => {
			if (n !== this.#r) return;
			let e = t.getAnimations();
			if (e.length === 0) {
				r();
				return;
			}
			Promise.all(e.map((e) => e.finished)).then(() => {
				r();
			}).catch(() => {
				if (n === this.#r) {
					if (t.getAnimations().some((e) => e.pending || e.playState !== "finished")) {
						i();
						return;
					}
					r();
				}
			});
		}, a = () => {
			this.#t = window.requestAnimationFrame(() => {
				this.#t = null, i();
			});
		};
		if (!this.#e.afterTick.current) {
			a();
			return;
		}
		this.#t = window.requestAnimationFrame(() => {
			this.#t = null;
			let e = "data-starting-style";
			if (!t.hasAttribute(e)) {
				a();
				return;
			}
			this.#n = new MutationObserver(() => {
				n === this.#r && (t.hasAttribute(e) || (this.#n?.disconnect(), this.#n = null, a()));
			}), this.#n.observe(t, {
				attributes: !0,
				attributeFilter: [e]
			});
		});
	}
	#a(e) {
		let t = () => {
			e();
		};
		this.#e.afterTick ? Jc(t) : t();
	}
}, Sl = class {
	#e;
	#t;
	#n;
	#r = /* @__PURE__ */ L(!1);
	#i = /* @__PURE__ */ L(void 0);
	#a = !1;
	#o = null;
	constructor(e) {
		this.#e = e, R(this.#r, e.open.current, !0), this.#t = e.enabled ?? !0, this.#n = new xl({
			ref: this.#e.ref,
			afterTick: this.#e.open
		}), Gc(() => this.#s()), Vc(() => this.#e.open.current, (e) => {
			if (!this.#a) {
				this.#a = !0;
				return;
			}
			if (this.#s(), !e && this.#e.shouldSkipExitAnimation?.()) {
				R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.();
				return;
			}
			if (e && R(this.#r, !0), R(this.#i, e ? "starting" : "ending", !0), e && (this.#o = window.requestAnimationFrame(() => {
				this.#o = null, this.#e.open.current && R(this.#i, void 0);
			})), !this.#t) {
				e || R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.();
				return;
			}
			this.#n.run(() => {
				e === this.#e.open.current && (this.#e.open.current || R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.());
			});
		});
	}
	get shouldRender() {
		return G(this.#r);
	}
	get transitionStatus() {
		return G(this.#i);
	}
	#s() {
		this.#o !== null && (window.cancelAnimationFrame(this.#o), this.#o = null);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/noop.js
function Cl() {}
//#endregion
//#region node_modules/bits-ui/dist/internal/create-id.js
function wl(e, t) {
	return t === void 0 ? `bits-${e}` : `bits-${e}-${t}`;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/events.js
var Tl = class {
	eventName;
	options;
	constructor(e, t = {
		bubbles: !0,
		cancelable: !0
	}) {
		this.eventName = e, this.options = t;
	}
	createEvent(e) {
		return new CustomEvent(this.eventName, {
			...this.options,
			detail: e
		});
	}
	dispatch(e, t) {
		let n = this.createEvent(t);
		return e.dispatchEvent(n), n;
	}
	listen(e, t, n) {
		return zr(e, this.eventName, (e) => {
			t(e);
		}, n);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/internal/debounce.js
function El(e, t = 500) {
	let n = null, r = (...r) => {
		n !== null && clearTimeout(n), n = setTimeout(() => {
			e(...r);
		}, t);
	};
	return r.destroy = () => {
		n !== null && (clearTimeout(n), n = null);
	}, r;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/elements.js
function Dl(e, t) {
	return e === t || e.contains(t);
}
function Ol(e) {
	return e?.ownerDocument ?? document;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/dom.js
function kl(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
//#endregion
//#region node_modules/tabbable/dist/index.esm.js
var Al = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], jl = /* #__PURE__ */ Al.join(","), Ml = typeof Element > "u", Nl = Ml ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Pl = !Ml && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, Fl = function(e, t) {
	t === void 0 && (t = !0);
	var n = e?.getAttribute?.call(e, "inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : Fl(e.parentNode));
}, Il = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, Ll = function(e, t, n) {
	if (Fl(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(jl));
	return t && Nl.call(e, jl) && r.unshift(e), r = r.filter(n), r;
}, Rl = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!Fl(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = Rl(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				Nl.call(a, jl) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !Fl(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = Rl(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, zl = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Bl = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Il(e)) && !zl(e) ? 0 : e.tabIndex;
}, Vl = function(e, t) {
	var n = Bl(e);
	return n < 0 && t && !zl(e) ? 0 : n;
}, Hl = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, Ul = function(e) {
	return e.tagName === "INPUT";
}, Wl = function(e) {
	return Ul(e) && e.type === "hidden";
}, Gl = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Kl = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, ql = function(e) {
	if (!e.name) return !0;
	var t = e.form || Pl(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Kl(r, e.form);
	return !i || i === e;
}, Jl = function(e) {
	return Ul(e) && e.type === "radio";
}, Yl = function(e) {
	return Jl(e) && !ql(e);
}, Xl = function(e) {
	var t = e && Pl(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = Pl(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, Zl = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Ql = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = Nl.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (Nl.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = Pl(e);
				if (s && !s.shadowRoot && r(s) === !0) return Zl(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (Xl(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return Zl(e);
	return !1;
}, $l = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return Nl.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, eu = function(e, t) {
	return !(t.disabled || Wl(t) || Ql(t, e) || Gl(t) || $l(t));
}, tu = function(e, t) {
	return !(Yl(t) || Bl(t) < 0 || !eu(e, t));
}, nu = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, ru = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = Vl(a, i), s = i ? ru(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(Hl).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, iu = function(e, t) {
	return t ||= {}, ru(t.getShadowRoot ? Rl([e], t.includeContainer, {
		filter: tu.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: nu
	}) : Ll(e, t.includeContainer, tu.bind(null, t)));
}, au = function(e, t) {
	return t ||= {}, t.getShadowRoot ? Rl([e], t.includeContainer, {
		filter: eu.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : Ll(e, t.includeContainer, eu.bind(null, t));
}, ou = /* #__PURE__ */ Al.concat("iframe:not([inert]):not([inert] *)").join(","), su = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return Nl.call(e, ou) !== !1 && eu(t, e);
}, cu = "data-context-menu-trigger", lu = "data-context-menu-content";
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
new Rc("Menu.Root"), new Rc("Menu.Root | Menu.Sub"), new Rc("Menu.Content"), new Rc("Menu.Group | Menu.RadioGroup"), new Rc("Menu.RadioGroup"), new Rc("Menu.CheckboxGroup"), new Tl("bitsmenuopen", {
	bubbles: !1,
	cancelable: !0
}), fl({
	component: "menu",
	parts: [
		"trigger",
		"content",
		"sub-trigger",
		"item",
		"group",
		"group-heading",
		"checkbox-group",
		"checkbox-item",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"arrow"
	]
}), globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var uu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e;
	#t;
	#n = { pointerdown: !1 };
	#r = !1;
	#i = !1;
	#a = void 0;
	#o;
	#s = Cl;
	constructor(e) {
		this.opts = e, this.#t = e.interactOutsideBehavior, this.#e = e.onInteractOutside, this.#o = e.onFocusOutside, On(() => {
			this.#a = Ol(this.opts.ref.current);
		});
		let t = Cl, n = () => {
			this.#g(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), t();
		};
		Vc([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!(!this.opts.enabled.current || !this.opts.ref.current)) return qc(1, () => {
				this.opts.ref.current && (globalThis.bitsDismissableLayers.set(this, this.#t), t(), t = this.#l());
			}), n;
		}), Gc(() => {
			this.#g.destroy(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), this.#s(), t();
		});
	}
	#c = (e) => {
		e.defaultPrevented || this.opts.ref.current && Jc(() => {
			!this.opts.ref.current || this.#h(e.target) || e.target && !this.#i && this.#o.current?.(e);
		});
	};
	#l() {
		return Ec(zr(this.#a, "pointerdown", Ec(this.#f, this.#m), { capture: !0 }), zr(this.#a, "pointerdown", Ec(this.#p, this.#d)), zr(this.#a, "focusin", this.#c));
	}
	#u = (e) => {
		let t = e;
		t.defaultPrevented && (t = mu(e)), this.#e.current(e);
	};
	#d = El((e) => {
		if (!this.opts.ref.current) {
			this.#s();
			return;
		}
		let t = this.opts.isValidEvent.current(e, this.opts.ref.current) || pu(e, this.opts.ref.current);
		if (!this.#r || this.#_() || !t) {
			this.#s();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = mu(n)), this.#t.current !== "close" && this.#t.current !== "defer-otherwise-close") {
			this.#s();
			return;
		}
		e.pointerType === "touch" ? (this.#s(), this.#s = zr(this.#a, "click", this.#u, { once: !0 })) : this.#e.current(n);
	}, 10);
	#f = (e) => {
		this.#n[e.type] = !0;
	};
	#p = (e) => {
		this.#n[e.type] = !1;
	};
	#m = () => {
		this.opts.ref.current && (this.#r = fu(this.opts.ref.current));
	};
	#h = (e) => this.opts.ref.current ? Dl(this.opts.ref.current, e) : !1;
	#g = El(() => {
		for (let e in this.#n) this.#n[e] = !1;
		this.#r = !1;
	}, 20);
	#_() {
		return Object.values(this.#n).some(Boolean);
	}
	#v = () => {
		this.#i = !0;
	};
	#y = () => {
		this.#i = !1;
	};
	props = {
		onfocuscapture: this.#v,
		onblurcapture: this.#y
	};
};
function du(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function fu(e) {
	let t = [...globalThis.bitsDismissableLayers], n = du(t);
	if (n) return n[0].opts.ref.current === e;
	let [r] = t[0];
	return r.opts.ref.current === e;
}
function pu(e, t) {
	let n = e.target;
	if (!vl(n)) return !1;
	let r = !!n.closest(`[${cu}]`), i = !!t.closest(`[${lu}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : Ol(n).documentElement.contains(n) && !Dl(t, n) && kl(e, t);
}
function mu(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1;
	return new Proxy(r, { get: (r, a) => a === "currentTarget" ? t : a === "target" ? n : a === "preventDefault" ? () => {
		i = !0, typeof r.preventDefault == "function" && r.preventDefault();
	} : a === "defaultPrevented" ? i : a in r ? r[a] : e[a] });
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function hu(e, t) {
	N(t, !0);
	let n = Q(t, "interactOutsideBehavior", 3, "close"), r = Q(t, "onInteractOutside", 3, Cl), i = Q(t, "onFocusOutside", 3, Cl), a = Q(t, "isValidEvent", 3, () => !1), o = uu.create({
		id: $(() => t.id),
		interactOutsideBehavior: $(() => n()),
		onInteractOutside: $(() => r()),
		enabled: $(() => t.enabled),
		onFocusOutside: $(() => i()),
		isValidEvent: $(() => a()),
		ref: t.ref
	});
	var s = Qr();
	gi(B(s), () => t.children ?? f, () => ({ props: o.props })), q(e, s), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var gu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new sl(this.opts.ref);
		let t = Cl;
		Vc(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => zr(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !_u(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		(n === "close" || n === "defer-otherwise-close") && this.opts.onEscapeKeydown.current(t);
	};
};
function _u(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function vu(e, t) {
	N(t, !0);
	let n = Q(t, "escapeKeydownBehavior", 3, "close"), r = Q(t, "onEscapeKeydown", 3, Cl);
	gu.create({
		escapeKeydownBehavior: $(() => n()),
		onEscapeKeydown: $(() => r()),
		enabled: $(() => t.enabled),
		ref: t.ref
	});
	var i = Qr();
	gi(B(i), () => t.children ?? f), q(e, i), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var yu = class e {
	static instance;
	#e = Qs([]);
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		return this.instance ||= new e(), this.instance;
	}
	register(e) {
		let t = this.getActive();
		t && t !== e && t.pause();
		let n = document.activeElement;
		n && n !== document.body && this.#n.set(e, n), this.#e.current = this.#e.current.filter((t) => t !== e), this.#e.current.unshift(e);
	}
	unregister(e) {
		this.#e.current = this.#e.current.filter((t) => t !== e);
		let t = this.getActive();
		t && t.resume();
	}
	getActive() {
		return this.#e.current[0];
	}
	setFocusMemory(e, t) {
		this.#t.set(e, t);
	}
	getFocusMemory(e) {
		return this.#t.get(e);
	}
	isActiveScope(e) {
		return this.getActive() === e;
	}
	setPreFocusMemory(e, t) {
		this.#n.set(e, t);
	}
	getPreFocusMemory(e) {
		return this.#n.get(e);
	}
	clearPreFocusMemory(e) {
		this.#n.delete(e);
	}
}, bu = class e {
	#e = !1;
	#t = null;
	#n = yu.getInstance();
	#r = [];
	#i;
	constructor(e) {
		this.#i = e;
	}
	get paused() {
		return this.#e;
	}
	pause() {
		this.#e = !0;
	}
	resume() {
		this.#e = !1;
	}
	#a() {
		for (let e of this.#r) e();
		this.#r = [];
	}
	mount(e) {
		this.#t && this.unmount(), this.#t = e, this.#n.register(this), this.#c(), this.#o();
	}
	unmount() {
		this.#t &&= (this.#a(), this.#s(), this.#n.unregister(this), this.#n.clearPreFocusMemory(this), null);
	}
	#o() {
		if (!this.#t) return;
		let e = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		this.#i.onOpenAutoFocus.current(e), e.defaultPrevented || requestAnimationFrame(() => {
			if (!this.#t) return;
			let e = this.#u();
			e ? (e.focus(), this.#n.setFocusMemory(this, e)) : this.#t.focus();
		});
	}
	#s() {
		let e = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		if (this.#i.onCloseAutoFocus.current?.(e), !e.defaultPrevented) {
			let e = this.#n.getPreFocusMemory(this);
			if (e && document.contains(e)) try {
				e.focus();
			} catch {
				document.body.focus();
			}
		}
	}
	#c() {
		if (!this.#t || !this.#i.trap.current) return;
		let e = this.#t, t = e.ownerDocument;
		this.#r.push(zr(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = t.target;
			if (n) {
				if (e.contains(n)) this.#n.setFocusMemory(this, n);
				else {
					let n = this.#n.getFocusMemory(this);
					if (n && e.contains(n) && su(n)) t.preventDefault(), n.focus();
					else {
						let t = this.#u(), n = this.#d()[0];
						(t || n || e).focus();
					}
				}
			}
		}, { capture: !0 }), zr(e, "keydown", (e) => {
			if (!this.#i.loop || this.#e || e.key !== "Tab" || !this.#n.isActiveScope(this)) return;
			let n = this.#l();
			if (n.length === 0) return;
			let r = n[0], i = n[n.length - 1];
			!e.shiftKey && t.activeElement === i ? (e.preventDefault(), r.focus()) : e.shiftKey && t.activeElement === r && (e.preventDefault(), i.focus());
		}));
		let n = new MutationObserver(() => {
			let t = this.#n.getFocusMemory(this);
			if (t && !e.contains(t)) {
				let t = this.#u(), n = this.#d()[0], r = t || n;
				r ? (r.focus(), this.#n.setFocusMemory(this, r)) : e.focus();
			}
		});
		n.observe(e, {
			childList: !0,
			subtree: !0
		}), this.#r.push(() => n.disconnect());
	}
	#l() {
		return this.#t ? iu(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? au(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return Vc([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), Gc(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function xu(e, t) {
	N(t, !0);
	let n = Q(t, "enabled", 3, !1), r = Q(t, "trapFocus", 3, !1), i = Q(t, "loop", 3, !1), a = Q(t, "onCloseAutoFocus", 3, Cl), o = Q(t, "onOpenAutoFocus", 3, Cl), s = bu.use({
		enabled: $(() => n()),
		trap: $(() => r()),
		loop: i(),
		onCloseAutoFocus: $(() => a()),
		onOpenAutoFocus: $(() => o()),
		ref: t.ref
	});
	var c = Qr();
	gi(B(c), () => t.focusScope ?? f, () => ({ props: s.props })), q(e, c), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var Su = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var Cu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = Cl;
	#t = !1;
	#n = Su;
	#r = Su;
	constructor(e) {
		this.opts = e, this.domContext = new sl(e.ref);
		let t = Cl;
		Vc(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return Ec(zr(this.domContext.getDocument(), "pointerdown", this.#o), zr(this.domContext.getDocument(), "pointerup", $s(this.#s, this.#a)));
	}
	#a = (e) => {
		this.#r(e);
	};
	#o = (e) => {
		let t = this.opts.ref.current, n = e.target;
		!gl(t) || !gl(n) || !this.#t || !Du(this) || !rl(t, n) || (this.#n(e), !e.defaultPrevented && (this.#e = Tu(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = Cl;
	};
}, wu = (e) => e.style.userSelect || e.style.webkitUserSelect;
function Tu(e, t) {
	let n = wu(t), r = wu(e);
	return Eu(t, "none"), Eu(e, "text"), () => {
		Eu(t, n), Eu(e, r);
	};
}
function Eu(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function Du(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Ou(e, t) {
	N(t, !0);
	let n = Q(t, "preventOverflowTextSelection", 3, !0), r = Q(t, "onPointerDown", 3, Cl), i = Q(t, "onPointerUp", 3, Cl);
	Cu.create({
		id: $(() => t.id),
		onPointerDown: $(() => r()),
		onPointerUp: $(() => i()),
		enabled: $(() => t.enabled && n()),
		ref: t.ref
	});
	var a = Qr();
	gi(B(a), () => t.children ?? f), q(e, a), P();
}
//#endregion
//#region node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
function ku(e = "bits") {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
//#endregion
//#region node_modules/bits-ui/dist/internal/shared-state.svelte.js
var Au = class {
	#e;
	#t = 0;
	#n = /* @__PURE__ */ L();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), R(this.#n, void 0), this.#r = void 0);
	}
	get(...e) {
		return this.#t += 1, G(this.#n) === void 0 && (this.#r = jn(() => {
			R(this.#n, this.#e(...e), !0);
		})), On(() => () => {
			this.#i();
		}), G(this.#n);
	}
}, ju = new Ic(), Mu = /* @__PURE__ */ L(null), Nu = null, Pu = null, Fu = !1, Iu = $(() => {
	for (let e of ju.values()) if (e) return !0;
	return !1;
}), Lu = null, Ru = new Au(() => {
	function e() {
		document.body.setAttribute("style", G(Mu) ?? ""), document.body.style.removeProperty("--scrollbar-width"), ml && Nu?.(), R(Mu, null);
	}
	function t() {
		Pu !== null && (window.clearTimeout(Pu), Pu = null);
	}
	function n(e, n) {
		t(), Fu = !0, Lu = Date.now();
		let r = Lu, i = () => {
			Pu = null, Lu === r && (Bu(ju) ? Fu = !1 : (Fu = !1, n()));
		}, a = e === null ? 24 : e;
		Pu = window.setTimeout(i, a);
	}
	function r() {
		G(Mu) === null && ju.size === 0 && !Fu && R(Mu, document.body.getAttribute("style"), !0);
	}
	return Vc(() => Iu.current, () => {
		if (!Iu.current) return;
		r(), Fu = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), i = window.innerWidth - document.documentElement.clientWidth, a = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + i,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		i > 0 && !n && (document.body.style.paddingRight = `${a.padding}px`, document.body.style.marginRight = `${a.margin}px`, document.body.style.setProperty("--scrollbar-width", `${i}px`)), document.body.style.overflow = "hidden", ml && (Nu = zr(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), Jc(() => {
			document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
		});
	}), Gc(() => () => {
		Nu?.();
	}), {
		get lockMap() {
			return ju;
		},
		resetBodyStyle: e,
		scheduleCleanupIfNoNewLocks: n,
		cancelPendingCleanup: t,
		ensureInitialStyleCaptured: r
	};
}), zu = class {
	#e = ku();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null) {
		this.#t = e, this.#n = t, this.#r = Ru.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = $(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), Gc(() => {
			if (this.#r.lockMap.delete(this.#e), Bu(this.#r.lockMap)) return;
			let e = this.#n();
			this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle();
			});
		}));
	}
};
function Bu(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function Vu(e, t) {
	N(t, !0);
	let n = Q(t, "preventScroll", 3, !0), r = Q(t, "restoreScrollDelay", 3, null);
	n() && new zu(n(), () => r()), P();
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Hu = [
	"top",
	"right",
	"bottom",
	"left"
], Uu = Math.min, Wu = Math.max, Gu = Math.round, Ku = Math.floor, qu = (e) => ({
	x: e,
	y: e
}), Ju = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Yu(e, t, n) {
	return Wu(e, Uu(t, n));
}
function Xu(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Zu(e) {
	return e.split("-")[0];
}
function Qu(e) {
	return e.split("-")[1];
}
function $u(e) {
	return e === "x" ? "y" : "x";
}
function ed(e) {
	return e === "y" ? "height" : "width";
}
function td(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function nd(e) {
	return $u(td(e));
}
function rd(e, t, n) {
	n === void 0 && (n = !1);
	let r = Qu(e), i = nd(e), a = ed(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = fd(o)), [o, fd(o)];
}
function id(e) {
	let t = fd(e);
	return [
		ad(e),
		t,
		ad(t)
	];
}
function ad(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var od = ["left", "right"], sd = ["right", "left"], cd = ["top", "bottom"], ld = ["bottom", "top"];
function ud(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? sd : od : t ? od : sd;
		case "left":
		case "right": return t ? cd : ld;
		default: return [];
	}
}
function dd(e, t, n, r) {
	let i = Qu(e), a = ud(Zu(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ad)))), a;
}
function fd(e) {
	let t = Zu(e);
	return Ju[t] + e.slice(t.length);
}
function pd(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function md(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : pd(e);
}
function hd(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function gd(e, t, n) {
	let { reference: r, floating: i } = e, a = td(t), o = nd(t), s = ed(o), c = Zu(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Qu(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function _d(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Xu(t, e), p = md(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = hd(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = hd(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var vd = 50, yd = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: _d
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = gd(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < vd && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = gd(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, bd = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Xu(e, t) || {};
		if (l == null) return {};
		let d = md(u), f = {
			x: n,
			y: r
		}, p = nd(i), m = ed(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Uu(d[_], T), ee = Uu(d[v], T), D = C - h[m] - ee, te = C / 2 - h[m] / 2 + w, ne = Yu(E, te, D), re = !c.arrow && Qu(i) != null && te !== ne && a.reference[m] / 2 - (te < E ? E : ee) - h[m] / 2 < 0, ie = re ? te < E ? te - E : te - D : 0;
		return {
			[p]: f[p] + ie,
			data: {
				[p]: ne,
				centerOffset: te - ne - ie,
				...re && { alignmentOffset: ie }
			},
			reset: re
		};
	}
}), xd = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Xu(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Zu(r), _ = td(o), v = Zu(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [fd(o)] : id(o)), x = p !== "none";
			!d && x && b.push(...dd(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = rd(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === td(t) || T.every((e) => td(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = td(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Sd(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Cd(e) {
	return Hu.some((t) => e[t] >= 0);
}
var wd = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Xu(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Sd(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Cd(e)
					} };
				}
				case "escaped": {
					let e = Sd(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Cd(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Td = /*#__PURE__*/ new Set(["left", "top"]);
async function Ed(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Zu(n), s = Qu(n), c = td(n) === "y", l = Td.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Xu(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Dd = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ed(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Od = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Xu(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = td(i), p = $u(f), m = u[p], h = u[f], g = (e, t) => Yu(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, kd = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Xu(e, t), u = {
				x: n,
				y: r
			}, d = td(i), f = $u(d), p = u[f], m = u[d], h = Xu(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Td.has(Zu(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ad = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Xu(e, t), c = await i.detectOverflow(t, s), l = Zu(n), u = Qu(n), d = td(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Uu(p - c[m], g), y = Uu(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Wu(c.left, c.right) : S = p - 2 * Wu(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function jd() {
	return typeof window < "u";
}
function Md(e) {
	return Fd(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Nd(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Pd(e) {
	return ((Fd(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Fd(e) {
	return jd() ? e instanceof Node || e instanceof Nd(e).Node : !1;
}
function Id(e) {
	return jd() ? e instanceof Element || e instanceof Nd(e).Element : !1;
}
function Ld(e) {
	return jd() ? e instanceof HTMLElement || e instanceof Nd(e).HTMLElement : !1;
}
function Rd(e) {
	return !jd() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Nd(e).ShadowRoot;
}
function zd(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Xd(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Bd(e) {
	return /^(table|td|th)$/.test(Md(e));
}
function Vd(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Hd = /transform|translate|scale|rotate|perspective|filter/, Ud = /paint|layout|strict|content/, Wd = (e) => !!e && e !== "none", Gd;
function Kd(e) {
	let t = Id(e) ? Xd(e) : e;
	return Wd(t.transform) || Wd(t.translate) || Wd(t.scale) || Wd(t.rotate) || Wd(t.perspective) || !Jd() && (Wd(t.backdropFilter) || Wd(t.filter)) || Hd.test(t.willChange || "") || Ud.test(t.contain || "");
}
function qd(e) {
	let t = Qd(e);
	for (; Ld(t) && !Yd(t);) {
		if (Kd(t)) return t;
		if (Vd(t)) return null;
		t = Qd(t);
	}
	return null;
}
function Jd() {
	return Gd ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Gd;
}
function Yd(e) {
	return /^(html|body|#document)$/.test(Md(e));
}
function Xd(e) {
	return Nd(e).getComputedStyle(e);
}
function Zd(e) {
	return Id(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Qd(e) {
	if (Md(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Rd(e) && e.host || Pd(e);
	return Rd(t) ? t.host : t;
}
function $d(e) {
	let t = Qd(e);
	return Yd(t) ? (e.ownerDocument || e).body : Ld(t) && zd(t) ? t : $d(t);
}
function ef(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = $d(e), i = r === e.ownerDocument?.body, a = Nd(r);
	if (i) {
		let e = tf(a);
		return t.concat(a, a.visualViewport || [], zd(r) ? r : [], e && n ? ef(e) : []);
	}
	return t.concat(r, ef(r, [], n));
}
function tf(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function nf(e) {
	let t = Xd(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Ld(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Gu(n) !== a || Gu(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function rf(e) {
	return Id(e) ? e : e.contextElement;
}
function af(e) {
	let t = rf(e);
	if (!Ld(t)) return qu(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = nf(t), o = (a ? Gu(n.width) : n.width) / r, s = (a ? Gu(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var of = /*#__PURE__*/ qu(0);
function sf(e) {
	let t = Nd(e);
	return !Jd() || !t.visualViewport ? of : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function cf(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Nd(e);
}
function lf(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = rf(e), o = qu(1);
	t && (r ? Id(r) && (o = af(r)) : o = af(e));
	let s = cf(a, n, r) ? sf(a) : qu(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Nd(a), t = Id(r) ? Nd(r) : r, n = e, i = tf(n);
		for (; i && t !== n;) {
			let e = af(i), t = i.getBoundingClientRect(), r = Xd(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Nd(i), i = tf(n);
		}
	}
	return hd({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function uf(e, t) {
	let n = Zd(e).scrollLeft;
	return t ? t.left + n : lf(Pd(e)).left + n;
}
function df(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - uf(e, n),
		y: n.top + t.scrollTop
	};
}
function ff(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Pd(r), s = t ? Vd(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = qu(1), u = qu(0), d = Ld(r);
	if ((d || !a) && ((Md(r) !== "body" || zd(o)) && (c = Zd(r)), d)) {
		let e = lf(r);
		l = af(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? df(o, c) : qu(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function pf(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function mf(e) {
	let t = Zd(e), n = e.ownerDocument.body, r = Wu(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Wu(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + uf(e), o = -t.scrollTop;
	return Xd(n).direction === "rtl" && (a += Wu(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var hf = 25;
function gf(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Nd(e), a = Pd(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Jd() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (uf(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= hf && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function _f(e, t) {
	let n = lf(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = af(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function vf(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = gf(e, n, t);
	else if (t === "document") r = mf(Pd(e));
	else if (Id(t)) r = _f(t, n);
	else {
		let n = sf(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return hd(r);
}
function yf(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ef(e, [], !1).filter((e) => Id(e) && Md(e) !== "body"), i = null, a = Xd(e).position === "fixed", o = a ? Qd(e) : e;
	for (; Id(o) && !Yd(o);) {
		let e = Xd(o), t = Kd(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Qd(o);
	}
	return t.set(e, r), r;
}
function bf(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Vd(t) ? [] : yf(t, this._c) : [].concat(n), r], o = vf(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = vf(t, a[e], i);
		s = Wu(n.top, s), c = Uu(n.right, c), l = Uu(n.bottom, l), u = Wu(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function xf(e) {
	let { width: t, height: n } = nf(e);
	return {
		width: t,
		height: n
	};
}
function Sf(e, t, n) {
	let r = Ld(t), i = Pd(t), a = n === "fixed", o = lf(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = qu(0);
	if ((r || !a) && ((Md(t) !== "body" || zd(i)) && (s = Zd(t)), r)) {
		let e = lf(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = uf(i));
	let l = i && !r && !a ? df(i, s) : qu(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Cf(e) {
	return Xd(e).position === "static";
}
function wf(e, t) {
	if (!Ld(e) || Xd(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Pd(e) === n && (n = n.ownerDocument.body), n;
}
function Tf(e, t) {
	let n = Nd(e);
	if (Vd(e)) return n;
	if (!Ld(e)) {
		let t = Qd(e);
		for (; t && !Yd(t);) {
			if (Id(t) && !Cf(t)) return t;
			t = Qd(t);
		}
		return n;
	}
	let r = wf(e, t);
	for (; r && Bd(r) && Cf(r);) r = wf(r, t);
	return r && Yd(r) && Cf(r) && !Kd(r) ? n : r || qd(e) || n;
}
var Ef = async function(e) {
	let t = this.getOffsetParent || Tf, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Sf(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Df(e) {
	return Xd(e).direction === "rtl";
}
var Of = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ff,
	getDocumentElement: Pd,
	getClippingRect: bf,
	getOffsetParent: Tf,
	getElementRects: Ef,
	getClientRects: pf,
	getDimensions: xf,
	getScale: af,
	isElement: Id,
	isRTL: Df
};
function kf(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Af(e, t, n) {
	let r = null, i, a = Pd(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ku(d), h = Ku(a.clientWidth - (u + f)), g = Ku(a.clientHeight - (d + p)), _ = Ku(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Wu(0, Uu(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!kf(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Nd(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function jf(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = rf(e), u = i || a ? [...l ? ef(l) : [], ...t ? ef(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Af(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? lf(e) : null;
	c && g();
	function g() {
		let t = lf(e);
		h && !kf(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Mf = Dd, Nf = Od, Pf = xd, Ff = Ad, If = wd, Lf = bd, Rf = kd, zf = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Of,
		...i.platform,
		_c: r
	};
	return yd(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function Bf(e) {
	return typeof e == "function" ? e() : e;
}
function Vf(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Hf(e, t) {
	let n = Vf(e);
	return Math.round(t * n) / n;
}
function Uf(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
//#endregion
//#region node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Wf(e) {
	let t = e.whileElementsMounted, n = /* @__PURE__ */ F(() => Bf(e.open) ?? !0), r = /* @__PURE__ */ F(() => Bf(e.middleware)), i = /* @__PURE__ */ F(() => Bf(e.transform) ?? !0), a = /* @__PURE__ */ F(() => Bf(e.placement) ?? "bottom"), o = /* @__PURE__ */ F(() => Bf(e.strategy) ?? "absolute"), s = /* @__PURE__ */ F(() => Bf(e.sideOffset) ?? 0), c = /* @__PURE__ */ F(() => Bf(e.alignOffset) ?? 0), l = e.reference, u = /* @__PURE__ */ L(0), d = /* @__PURE__ */ L(0), f = Qs(null), p = /* @__PURE__ */ L(cn(G(o))), m = /* @__PURE__ */ L(cn(G(a))), h = /* @__PURE__ */ L(cn({})), g = /* @__PURE__ */ L(!1), _ = !1, v = 0, y = /* @__PURE__ */ F(() => {
		let e = f.current ? Hf(f.current, G(u)) : G(u), t = f.current ? Hf(f.current, G(d)) : G(d);
		return G(i) ? {
			position: G(p),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...f.current && Vf(f.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: G(p),
			left: `${e}px`,
			top: `${t}px`
		};
	}), b;
	function x() {
		if (l.current === null || f.current === null) return;
		let e = l.current, t = f.current, i = ++v;
		zf(e, t, {
			middleware: G(r),
			placement: G(a),
			strategy: G(o)
		}).then((r) => {
			if (i === v && l.current === e && f.current === t) {
				if (Gf(e)) {
					R(h, {
						...G(h),
						hide: {
							...G(h).hide,
							referenceHidden: !0
						}
					}, !0);
					return;
				}
				if (!G(n) && G(u) !== 0 && G(d) !== 0) {
					let e = Math.max(Math.abs(G(s)), Math.abs(G(c)), 15);
					if (r.x <= e && r.y <= e) return;
				}
				R(u, r.x, !0), R(d, r.y, !0), R(p, r.strategy, !0), R(m, r.placement, !0), R(h, r.middlewareData, !0), R(g, !0);
			}
		});
	}
	function S() {
		typeof b == "function" && (b(), b = void 0), v++;
	}
	function C() {
		if (S(), t === void 0) {
			x();
			return;
		}
		G(n) && l.current !== null && f.current !== null && (b = t(l.current, f.current, x));
	}
	function w() {
		!G(n) && f.current === null && R(g, !1);
	}
	function T() {
		return [
			G(r),
			G(a),
			G(o),
			G(s),
			G(c),
			G(n)
		];
	}
	return On(() => {
		t === void 0 && G(n) && x();
	}), On(C), On(() => {
		if (t !== void 0) {
			if (T(), !G(n)) {
				_ = !1;
				return;
			}
			if (!G(g)) {
				_ = !1;
				return;
			}
			if (!_) {
				_ = !0;
				return;
			}
			x();
		}
	}), On(w), On(() => S), {
		floating: f,
		reference: l,
		get strategy() {
			return G(p);
		},
		get placement() {
			return G(m);
		},
		get middlewareData() {
			return G(h);
		},
		get isPositioned() {
			return G(g);
		},
		get floatingStyles() {
			return G(y);
		},
		get update() {
			return x;
		}
	};
}
function Gf(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Kf = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, qf = new Rc("Floating.Root"), Jf = new Rc("Floating.Content"), Yf = new Rc("Floating.Root"), Xf = class e {
	static create(t = !1) {
		return t ? Yf.set(new e()) : qf.set(new e());
	}
	anchorNode = Qs(null);
	customAnchorNode = Qs(null);
	triggerNode = Qs(null);
	constructor() {
		On(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
}, Zf = class e {
	static create(t, n = !1) {
		return n ? Jf.set(new e(t, Yf.get())) : Jf.set(new e(t, qf.get()));
	}
	opts;
	root;
	contentRef = Qs(null);
	wrapperRef = Qs(null);
	arrowRef = Qs(null);
	contentAttachment = cl(this.contentRef);
	wrapperAttachment = cl(this.wrapperRef);
	arrowAttachment = cl(this.arrowRef);
	arrowId = Qs(ku());
	#e = /* @__PURE__ */ F(() => {
		if (typeof this.opts.style == "string") return Tc(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new Wc(() => this.arrowRef.current ?? void 0);
	#r = /* @__PURE__ */ F(() => this.#n?.width ?? 0);
	#i = /* @__PURE__ */ F(() => this.#n?.height ?? 0);
	#a = /* @__PURE__ */ F(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = /* @__PURE__ */ F(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
	#s = /* @__PURE__ */ F(() => G(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return G(this.#s);
	}
	set hasExplicitBoundaries(e) {
		R(this.#s, e);
	}
	#c = /* @__PURE__ */ F(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: G(this.#o).filter(bl),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return G(this.#c);
	}
	set detectOverflowOptions(e) {
		R(this.#c, e);
	}
	#l = /* @__PURE__ */ L(void 0);
	#u = /* @__PURE__ */ L(void 0);
	#d = /* @__PURE__ */ L(void 0);
	#f = /* @__PURE__ */ L(void 0);
	#p = /* @__PURE__ */ F(() => [
		Mf({
			mainAxis: this.opts.sideOffset.current + G(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Nf({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Rf() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Pf({ ...this.detectOverflowOptions }),
		Ff({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				R(this.#l, t, !0), R(this.#u, n, !0), R(this.#d, r, !0), R(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Lf({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Qf({
			arrowWidth: G(this.#r),
			arrowHeight: G(this.#i)
		}),
		this.opts.hideWhenDetached.current && If({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		})
	].filter(Boolean));
	get middleware() {
		return G(this.#p);
	}
	set middleware(e) {
		R(this.#p, e);
	}
	floating;
	#m = /* @__PURE__ */ F(() => ep(this.floating.placement));
	get placedSide() {
		return G(this.#m);
	}
	set placedSide(e) {
		R(this.#m, e);
	}
	#h = /* @__PURE__ */ F(() => tp(this.floating.placement));
	get placedAlign() {
		return G(this.#h);
	}
	set placedAlign(e) {
		R(this.#h, e);
	}
	#g = /* @__PURE__ */ F(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return G(this.#g);
	}
	set arrowX(e) {
		R(this.#g, e);
	}
	#_ = /* @__PURE__ */ F(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return G(this.#_);
	}
	set arrowY(e) {
		R(this.#_, e);
	}
	#v = /* @__PURE__ */ F(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return G(this.#v);
	}
	set cannotCenterArrow(e) {
		R(this.#v, e);
	}
	#y = /* @__PURE__ */ L();
	get contentZIndex() {
		return G(this.#y);
	}
	set contentZIndex(e) {
		R(this.#y, e, !0);
	}
	#b = /* @__PURE__ */ F(() => Kf[this.placedSide]);
	get arrowBaseSide() {
		return G(this.#b);
	}
	set arrowBaseSide(e) {
		R(this.#b, e);
	}
	#x = /* @__PURE__ */ F(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${G(this.#l)}px`,
			"--bits-floating-available-height": `${G(this.#u)}px`,
			"--bits-floating-anchor-width": `${G(this.#d)}px`,
			"--bits-floating-anchor-height": `${G(this.#f)}px`,
			...this.floating.middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...G(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return G(this.#x);
	}
	set wrapperProps(e) {
		R(this.#x, e);
	}
	#S = /* @__PURE__ */ F(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: Ac({ ...G(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return G(this.#S);
	}
	set props(e) {
		R(this.#S, e);
	}
	#C = /* @__PURE__ */ F(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return G(this.#C);
	}
	set arrowStyle(e) {
		R(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), Vc(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Wf({
			strategy: () => this.opts.strategy.current,
			placement: () => G(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => jf(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), On(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), Vc(() => this.contentRef.current, (e) => {
			if (!e || !this.opts.enabled.current) return;
			let t = al(e), n = t.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let n = t.getComputedStyle(e).zIndex;
				n !== this.contentZIndex && (this.contentZIndex = n);
			});
			return () => {
				t.cancelAnimationFrame(n);
			};
		}), On(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Qf(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = $f(n), u = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
			return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
				x: p,
				y: m
			} };
		}
	};
}
function $f(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function ep(e) {
	return $f(e)[0];
}
function tp(e) {
	return $f(e)[1];
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function np(e, t) {
	N(t, !0);
	let n = Q(t, "tooltip", 3, !1);
	Xf.create(n());
	var r = Qr();
	gi(B(r), () => t.children ?? f), q(e, r), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function rp(e, t) {
	N(t, !0);
	let n = Q(t, "side", 3, "bottom"), r = Q(t, "sideOffset", 3, 0), i = Q(t, "align", 3, "center"), a = Q(t, "alignOffset", 3, 0), o = Q(t, "arrowPadding", 3, 0), s = Q(t, "avoidCollisions", 3, !0), c = Q(t, "collisionBoundary", 19, () => []), l = Q(t, "collisionPadding", 3, 0), u = Q(t, "hideWhenDetached", 3, !1), d = Q(t, "onPlaced", 3, () => {}), p = Q(t, "sticky", 3, "partial"), m = Q(t, "updatePositionStrategy", 3, "optimized"), h = Q(t, "strategy", 3, "fixed"), g = Q(t, "dir", 3, "ltr"), _ = Q(t, "style", 19, () => ({})), v = Q(t, "wrapperId", 19, ku), y = Q(t, "customAnchor", 3, null), b = Q(t, "tooltip", 3, !1), x = Zf.create({
		side: $(() => n()),
		sideOffset: $(() => r()),
		align: $(() => i()),
		alignOffset: $(() => a()),
		id: $(() => t.id),
		arrowPadding: $(() => o()),
		avoidCollisions: $(() => s()),
		collisionBoundary: $(() => c()),
		collisionPadding: $(() => l()),
		hideWhenDetached: $(() => u()),
		onPlaced: $(() => d()),
		sticky: $(() => p()),
		updatePositionStrategy: $(() => m()),
		strategy: $(() => h()),
		dir: $(() => g()),
		style: $(() => _()),
		enabled: $(() => t.enabled),
		wrapperId: $(() => v()),
		customAnchor: $(() => y())
	}, b()), S = /* @__PURE__ */ F(() => Nc(x.wrapperProps, { style: { pointerEvents: "auto" } }));
	var C = Qr();
	gi(B(C), () => t.content ?? f, () => ({
		props: x.props,
		wrapperProps: G(S)
	})), q(e, C), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function ip(e, t) {
	N(t, !0), ra(() => {
		t.onPlaced?.();
	});
	var n = Qr();
	gi(B(n), () => t.content ?? f, () => ({
		props: {},
		wrapperProps: {}
	})), q(e, n), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var ap = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function op(e, t) {
	let n = Q(t, "isStatic", 3, !1), r = /* @__PURE__ */ X(t, ap);
	var i = Qr(), a = B(i), o = (e) => {
		ip(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, s = (e) => {
		rp(e, Z({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	Y(a, (e) => {
		n() ? e(o) : e(s, -1);
	}), q(e, i);
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var sp = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.ref.tooltip.contentPointerEvents".split(".")), cp = /* @__PURE__ */ K("<!> <!>", 1);
function lp(e, t) {
	N(t, !0);
	let n = Q(t, "interactOutsideBehavior", 3, "close"), r = Q(t, "trapFocus", 3, !0), i = Q(t, "isValidEvent", 3, () => !1), a = Q(t, "customAnchor", 3, null), o = Q(t, "isStatic", 3, !1), s = Q(t, "tooltip", 3, !1), c = Q(t, "contentPointerEvents", 3, "auto"), l = /* @__PURE__ */ X(t, sp), u = /* @__PURE__ */ F(() => t.preventScroll ?? !0), d = /* @__PURE__ */ F(() => t.strategy ?? (G(u) ? "fixed" : "absolute"));
	op(e, {
		get isStatic() {
			return o();
		},
		get id() {
			return t.id;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return G(d);
		},
		get dir() {
			return t.dir;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return a();
		},
		get enabled() {
			return t.enabled;
		},
		get tooltip() {
			return s();
		},
		content: (e, a) => {
			let o = () => (a?.()).props, s = () => (a?.()).wrapperProps;
			var d = cp(), p = B(d), m = (e) => {
				Vu(e, { get preventScroll() {
					return G(u);
				} });
			}, h = (e) => {
				Vu(e, { get preventScroll() {
					return G(u);
				} });
			};
			Y(p, (e) => {
				t.forceMount && t.enabled ? e(m) : t.forceMount || e(h, 1);
			}), xu(V(p, 2), {
				get onOpenAutoFocus() {
					return t.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return t.onCloseAutoFocus;
				},
				get loop() {
					return t.loop;
				},
				get enabled() {
					return t.enabled;
				},
				get trapFocus() {
					return r();
				},
				get forceMount() {
					return t.forceMount;
				},
				get ref() {
					return t.ref;
				},
				focusScope: (e, r) => {
					let a = () => (r?.()).props;
					vu(e, {
						get onEscapeKeydown() {
							return t.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return t.escapeKeydownBehavior;
						},
						get enabled() {
							return t.enabled;
						},
						get ref() {
							return t.ref;
						},
						children: (e, r) => {
							hu(e, {
								get id() {
									return t.id;
								},
								get onInteractOutside() {
									return t.onInteractOutside;
								},
								get onFocusOutside() {
									return t.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return n();
								},
								get isValidEvent() {
									return i();
								},
								get enabled() {
									return t.enabled;
								},
								get ref() {
									return t.ref;
								},
								children: (e, n) => {
									let r = () => (n?.()).props;
									Ou(e, {
										get id() {
											return t.id;
										},
										get preventOverflowTextSelection() {
											return t.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return t.onPointerDown;
										},
										get onPointerUp() {
											return t.onPointerUp;
										},
										get enabled() {
											return t.enabled;
										},
										get ref() {
											return t.ref;
										},
										children: (e, n) => {
											var i = Qr(), u = B(i);
											{
												let e = /* @__PURE__ */ F(() => ({
													props: Nc(l, o(), r(), a(), { style: { pointerEvents: c() } }),
													wrapperProps: s()
												}));
												gi(u, () => t.popper ?? f, () => G(e));
											}
											q(e, i);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}), q(e, d);
		},
		$$slots: { content: !0 }
	}), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var up = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function dp(e, t) {
	let n = Q(t, "interactOutsideBehavior", 3, "close"), r = Q(t, "trapFocus", 3, !0), i = Q(t, "isValidEvent", 3, () => !1), a = Q(t, "customAnchor", 3, null), o = Q(t, "isStatic", 3, !1), s = /* @__PURE__ */ X(t, up);
	var c = Qr(), l = B(c), u = (e) => {
		lp(e, Z({
			get popper() {
				return t.popper;
			},
			get onEscapeKeydown() {
				return t.onEscapeKeydown;
			},
			get escapeKeydownBehavior() {
				return t.escapeKeydownBehavior;
			},
			get preventOverflowTextSelection() {
				return t.preventOverflowTextSelection;
			},
			get id() {
				return t.id;
			},
			get onPointerDown() {
				return t.onPointerDown;
			},
			get onPointerUp() {
				return t.onPointerUp;
			},
			get side() {
				return t.side;
			},
			get sideOffset() {
				return t.sideOffset;
			},
			get align() {
				return t.align;
			},
			get alignOffset() {
				return t.alignOffset;
			},
			get arrowPadding() {
				return t.arrowPadding;
			},
			get avoidCollisions() {
				return t.avoidCollisions;
			},
			get collisionBoundary() {
				return t.collisionBoundary;
			},
			get collisionPadding() {
				return t.collisionPadding;
			},
			get sticky() {
				return t.sticky;
			},
			get hideWhenDetached() {
				return t.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return t.updatePositionStrategy;
			},
			get strategy() {
				return t.strategy;
			},
			get dir() {
				return t.dir;
			},
			get preventScroll() {
				return t.preventScroll;
			},
			get wrapperId() {
				return t.wrapperId;
			},
			get style() {
				return t.style;
			},
			get onPlaced() {
				return t.onPlaced;
			},
			get customAnchor() {
				return a();
			},
			get isStatic() {
				return o();
			},
			get enabled() {
				return t.open;
			},
			get onInteractOutside() {
				return t.onInteractOutside;
			},
			get onCloseAutoFocus() {
				return t.onCloseAutoFocus;
			},
			get onOpenAutoFocus() {
				return t.onOpenAutoFocus;
			},
			get interactOutsideBehavior() {
				return n();
			},
			get loop() {
				return t.loop;
			},
			get trapFocus() {
				return r();
			},
			get isValidEvent() {
				return i();
			},
			get onFocusOutside() {
				return t.onFocusOutside;
			},
			forceMount: !1,
			get ref() {
				return t.ref;
			}
		}, () => s));
	};
	Y(l, (e) => {
		t.shouldRender && e(u);
	}), q(e, c);
}
//#endregion
//#region node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var fp = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function pp(e, t) {
	let n = Q(t, "interactOutsideBehavior", 3, "close"), r = Q(t, "trapFocus", 3, !0), i = Q(t, "isValidEvent", 3, () => !1), a = Q(t, "customAnchor", 3, null), o = Q(t, "isStatic", 3, !1), s = /* @__PURE__ */ X(t, fp);
	lp(e, Z({
		get popper() {
			return t.popper;
		},
		get onEscapeKeydown() {
			return t.onEscapeKeydown;
		},
		get escapeKeydownBehavior() {
			return t.escapeKeydownBehavior;
		},
		get preventOverflowTextSelection() {
			return t.preventOverflowTextSelection;
		},
		get id() {
			return t.id;
		},
		get onPointerDown() {
			return t.onPointerDown;
		},
		get onPointerUp() {
			return t.onPointerUp;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return t.strategy;
		},
		get dir() {
			return t.dir;
		},
		get preventScroll() {
			return t.preventScroll;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return a();
		},
		get isStatic() {
			return o();
		},
		get enabled() {
			return t.enabled;
		},
		get onInteractOutside() {
			return t.onInteractOutside;
		},
		get onCloseAutoFocus() {
			return t.onCloseAutoFocus;
		},
		get onOpenAutoFocus() {
			return t.onOpenAutoFocus;
		},
		get interactOutsideBehavior() {
			return n();
		},
		get loop() {
			return t.loop;
		},
		get trapFocus() {
			return r();
		},
		get isValidEvent() {
			return i();
		},
		get onFocusOutside() {
			return t.onFocusOutside;
		}
	}, () => s, { forceMount: !0 }));
}
//#endregion
//#region node_modules/bits-ui/dist/internal/safe-polygon.svelte.js
function mp(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function hp(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function gp(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var _p = class {
	#e;
	#t;
	#n;
	#r = null;
	#i = null;
	#a = [];
	#o = null;
	#s = null;
	#c = null;
	#l() {
		this.#s !== null && (cancelAnimationFrame(this.#s), this.#s = null);
	}
	#u() {
		this.#l(), this.#s = requestAnimationFrame(() => {
			this.#s = null, !(!this.#r || !this.#i) && (this.#m(), this.#e.onPointerExit());
		});
	}
	#d() {
		this.#c !== null && (clearTimeout(this.#c), this.#c = null);
	}
	#f() {
		this.#n !== null && (this.#d(), this.#c = window.setTimeout(() => {
			this.#c = null, !(!this.#r || !this.#i) && (this.#m(), this.#e.onPointerExit());
		}, this.#n));
	}
	constructor(e) {
		this.#e = e, this.#t = e.buffer ?? 1;
		let t = e.transitIntentTimeout;
		this.#n = typeof t == "number" && t > 0 ? t : null, Vc([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			return this.#o && this.#o !== e && this.#m(), this.#o = e, [
				zr(il(e), "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				zr(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (_l(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					_l(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = _l(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				zr(e, "pointerenter", () => {
					this.#m();
				}),
				zr(t, "pointerenter", () => {
					this.#m();
				}),
				zr(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					_l(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
				})
			].reduce((e, t) => () => {
				e(), t();
			}, () => {});
		});
	}
	#p(e, t, n) {
		if (!this.#r || !this.#i) return;
		this.#l(), this.#f();
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
		if (this.#i === "content" && hp(e, i)) {
			this.#m();
			return;
		}
		if (this.#i === "trigger" && hp(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (hp(e, n)) return;
			let i = gp(r, n), a = this.#h(r, n, i);
			if (a && mp(e, a)) return;
		}
		let a = gp(r, i), o = this.#h(r, i, a);
		if (o && mp(e, o)) return;
		let s = this.#i === "content" ? i : r;
		mp(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
	}
	#m() {
		this.#r = null, this.#i = null, this.#a = [], this.#l(), this.#d();
	}
	#h(e, t, n) {
		let r = this.#t;
		switch (n) {
			case "top": return [
				[Math.min(e.left, t.left) - r, e.top],
				[Math.min(e.left, t.left) - r, t.bottom],
				[Math.max(e.right, t.right) + r, t.bottom],
				[Math.max(e.right, t.right) + r, e.top]
			];
			case "bottom": return [
				[Math.min(e.left, t.left) - r, e.bottom],
				[Math.min(e.left, t.left) - r, t.top],
				[Math.max(e.right, t.right) + r, t.top],
				[Math.max(e.right, t.right) + r, e.bottom]
			];
			case "left": return [
				[e.left, Math.min(e.top, t.top) - r],
				[t.right, Math.min(e.top, t.top) - r],
				[t.right, Math.max(e.bottom, t.bottom) + r],
				[e.left, Math.max(e.bottom, t.bottom) + r]
			];
			case "right": return [
				[e.right, Math.min(e.top, t.top) - r],
				[t.left, Math.min(e.top, t.top) - r],
				[t.left, Math.max(e.bottom, t.bottom) + r],
				[e.right, Math.max(e.bottom, t.bottom) + r]
			];
		}
	}
	#g(e, t, n, r) {
		let i = this.#t * 4, [a, o] = e;
		switch (r === "trigger" ? this.#_(n) : n) {
			case "top": return [
				[a - i, o + i],
				[a + i, o + i],
				[t.right + i, t.bottom],
				[t.right + i, t.top],
				[t.left - i, t.top],
				[t.left - i, t.bottom]
			];
			case "bottom": return [
				[a - i, o - i],
				[a + i, o - i],
				[t.right + i, t.top],
				[t.right + i, t.bottom],
				[t.left - i, t.bottom],
				[t.left - i, t.top]
			];
			case "left": return [
				[a + i, o - i],
				[a + i, o + i],
				[t.right, t.bottom + i],
				[t.left, t.bottom + i],
				[t.left, t.top - i],
				[t.right, t.top - i]
			];
			case "right": return [
				[a - i, o - i],
				[a - i, o + i],
				[t.left, t.bottom + i],
				[t.right, t.bottom + i],
				[t.right, t.top - i],
				[t.left, t.top - i]
			];
		}
	}
	#_(e) {
		switch (e) {
			case "top": return "bottom";
			case "bottom": return "top";
			case "left": return "right";
			case "right": return "left";
		}
	}
}, vp = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), Gc(this.stop);
	}
	#r() {
		this.#n !== null && (window.clearTimeout(this.#n), this.#n = null);
	}
	stop() {
		this.#r();
	}
	start(...e) {
		this.#r(), this.#n = window.setTimeout(() => {
			this.#n = null, this.#t(...e);
		}, this.#e);
	}
}, yp = fl({
	component: "tooltip",
	parts: ["content", "trigger"]
}), bp = new Rc("Tooltip.Provider"), xp = new Rc("Tooltip.Root"), Sp = class {
	#e = /* @__PURE__ */ L(cn(/* @__PURE__ */ new Map()));
	get triggers() {
		return G(this.#e);
	}
	set triggers(e) {
		R(this.#e, e, !0);
	}
	#t = /* @__PURE__ */ L(null);
	get activeTriggerId() {
		return G(this.#t);
	}
	set activeTriggerId(e) {
		R(this.#t, e, !0);
	}
	#n = /* @__PURE__ */ F(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return G(this.#n);
	}
	set activeTriggerNode(e) {
		R(this.#n, e);
	}
	#r = /* @__PURE__ */ F(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return G(this.#r);
	}
	set activePayload(e) {
		R(this.#r, e);
	}
	register = (e) => {
		let t = new Map(this.triggers);
		t.set(e.id, e), this.triggers = t, this.#i();
	};
	update = (e) => {
		let t = new Map(this.triggers);
		t.set(e.id, e), this.triggers = t, this.#i();
	};
	unregister = (e) => {
		if (!this.triggers.has(e)) return;
		let t = new Map(this.triggers);
		t.delete(e), this.triggers = t, this.activeTriggerId === e && (this.activeTriggerId = null);
	};
	setActiveTrigger = (e) => {
		if (e === null) {
			this.activeTriggerId = null;
			return;
		}
		if (!this.triggers.has(e)) {
			this.activeTriggerId = null;
			return;
		}
		this.activeTriggerId = e;
	};
	get = (e) => this.triggers.get(e);
	has = (e) => this.triggers.has(e);
	getFirstTriggerId = () => {
		let e = this.triggers.entries().next();
		return e.done ? null : e.value[0];
	};
	#i = () => {
		let e = this.activeTriggerId;
		e !== null && (this.triggers.has(e) || (this.activeTriggerId = null));
	};
}, Cp = class e {
	static create(t) {
		return bp.set(new e(t));
	}
	opts;
	#e = /* @__PURE__ */ L(!0);
	get isOpenDelayed() {
		return G(this.#e);
	}
	set isOpenDelayed(e) {
		R(this.#e, e, !0);
	}
	isPointerInTransit = Qs(!1);
	#t;
	#n = /* @__PURE__ */ L(null);
	constructor(e) {
		this.opts = e, this.#t = new vp(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Kc(() => zr(window, "scroll", (e) => {
			let t = G(this.#n);
			if (!t) return;
			let n = t.triggerNode;
			if (!n) return;
			let r = e.target;
			(r instanceof Element || r instanceof Document) && r.contains(n) && t.handleClose();
		}));
	}
	#r = () => {
		if (this.opts.skipDelayDuration.current === 0) {
			this.isOpenDelayed = !0;
			return;
		}
		this.#t.start();
	};
	#i = () => {
		this.#t.stop();
	};
	onOpen = (e) => {
		G(this.#n) && G(this.#n) !== e && G(this.#n).handleClose(), this.#i(), this.isOpenDelayed = !1, R(this.#n, e, !0);
	};
	onClose = (e) => {
		G(this.#n) === e && (R(this.#n, null), this.#r());
	};
	isTooltipOpen = (e) => G(this.#n) === e;
}, wp = class e {
	static create(t) {
		return xp.set(new e(t, bp.get()));
	}
	opts;
	provider;
	#e = /* @__PURE__ */ F(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return G(this.#e);
	}
	set delayDuration(e) {
		R(this.#e, e);
	}
	#t = /* @__PURE__ */ F(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return G(this.#t);
	}
	set disableHoverableContent(e) {
		R(this.#t, e);
	}
	#n = /* @__PURE__ */ F(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return G(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		R(this.#n, e);
	}
	#r = /* @__PURE__ */ F(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return G(this.#r);
	}
	set disabled(e) {
		R(this.#r, e);
	}
	#i = /* @__PURE__ */ F(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return G(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		R(this.#i, e);
	}
	registry;
	tether;
	#a = /* @__PURE__ */ L(null);
	get contentNode() {
		return G(this.#a);
	}
	set contentNode(e) {
		R(this.#a, e, !0);
	}
	contentPresence;
	#o = /* @__PURE__ */ L(!1);
	#s;
	#c = /* @__PURE__ */ F(() => this.opts.open.current ? G(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return G(this.#c);
	}
	set stateAttr(e) {
		R(this.#c, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new Sp(), this.#s = new vp(() => {
			R(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Kc(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new Sl({
			open: this.opts.open,
			ref: $(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), Vc(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#s = new vp(() => {
				R(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), Vc(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : this.provider.onClose(this);
		}, { lazy: !0 }), Vc(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), Vc(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#s.stop(), R(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
	};
	handleClose = () => {
		this.#s.stop(), this.opts.open.current = !1;
	};
	#l = () => {
		this.#s.stop();
		let e = !this.provider.isOpenDelayed, t = this.delayDuration ?? 0;
		e || t === 0 ? (R(this.#o, !1), this.opts.open.current = !0) : this.#s.start();
	};
	onTriggerEnter = (e) => {
		this.setActiveTrigger(e), this.#l();
	};
	onTriggerLeave = () => {
		this.disableHoverableContent ? this.handleClose() : this.#s.stop();
	};
	ensureActiveTrigger = () => {
		if (this.registry.activeTriggerId !== null && this.registry.has(this.registry.activeTriggerId)) return;
		if (this.opts.triggerId.current !== null && this.registry.has(this.opts.triggerId.current)) {
			this.registry.setActiveTrigger(this.opts.triggerId.current);
			return;
		}
		let e = this.registry.getFirstTriggerId();
		this.registry.setActiveTrigger(e);
	};
	setActiveTrigger = (e) => {
		this.registry.setActiveTrigger(e);
	};
	registerTrigger = (e) => {
		this.registry.register(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	updateTrigger = (e) => {
		this.registry.update(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	unregisterTrigger = (e) => {
		let t = this.registry.activeTriggerId === e;
		this.registry.unregister(e), t && this.opts.open.current && this.handleClose();
	};
	isActiveTrigger = (e) => this.registry.activeTriggerId === e;
	get triggerNode() {
		return this.registry.activeTriggerNode;
	}
	get activePayload() {
		return this.registry.activePayload;
	}
	get activeTriggerId() {
		return this.registry.activeTriggerId;
	}
}, Tp = class e {
	static create(t) {
		return t.tether.current ? new e(t, null, t.tether.current.state) : new e(t, xp.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = Qs(!1);
	#t = /* @__PURE__ */ L(!1);
	domContext;
	#n = null;
	#r = !1;
	#i = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new sl(e.ref), this.attachment = cl(this.opts.ref, (e) => this.#s(e)), Vc(() => this.opts.id.current, () => {
			this.#s(this.opts.ref.current);
		}), Vc(() => this.opts.payload.current, () => {
			this.#s(this.opts.ref.current);
		}), Vc(() => this.opts.disabled.current, () => {
			this.#s(this.opts.ref.current);
		}), Kc(() => (this.#r = !0, this.#s(this.opts.ref.current), () => {
			let e = this.#a(), t = this.#i;
			t && (this.tether ? this.tether.registry.unregister(t) : e?.unregisterTrigger(t)), this.#i = null, this.#r = !1;
		}));
	}
	#a = () => this.tether?.root ?? this.root;
	#o = () => {
		let e = this.#a();
		return this.opts.disabled.current || !!e?.disabled;
	};
	#s = (e) => {
		if (!this.#r) return;
		let t = this.opts.id.current, n = this.opts.payload.current, r = this.opts.disabled.current;
		if (this.#i && this.#i !== t) {
			let e = this.#a();
			this.tether ? this.tether.registry.unregister(this.#i) : e?.unregisterTrigger(this.#i);
		}
		let i = {
			id: t,
			node: e,
			payload: n,
			disabled: r
		}, a = this.#a();
		this.tether ? (this.tether.registry.has(t) ? this.tether.registry.update(i) : this.tether.registry.register(i), r && this.tether.registry.activeTriggerId === t && a?.opts.open.current && a.handleClose()) : a?.registry.has(t) ? a.updateTrigger(i) : a?.registerTrigger(i), this.#i = t;
	};
	#c = () => {
		this.#n !== null && (clearTimeout(this.#n), this.#n = null);
	};
	handlePointerUp = () => {
		this.#e.current = !1;
	};
	#l = () => {
		this.#o() || (this.#e.current = !1);
	};
	#u = () => {
		this.#o() || (this.#e.current = !0, this.domContext.getDocument().addEventListener("pointerup", () => {
			this.handlePointerUp();
		}, { once: !0 }));
	};
	#d = (e) => {
		let t = this.#a();
		if (t) {
			if (this.#o()) {
				t.opts.open.current && t.handleClose();
				return;
			}
			if (e.pointerType !== "touch") {
				if (t.provider.isPointerInTransit.current) {
					this.#c(), this.#n = window.setTimeout(() => {
						t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), R(this.#t, !0));
					}, 250);
					return;
				}
				t.onTriggerEnter(this.opts.id.current), R(this.#t, !0);
			}
		}
	};
	#f = (e) => {
		let t = this.#a();
		if (t) {
			if (this.#o()) {
				t.opts.open.current && t.handleClose();
				return;
			}
			e.pointerType !== "touch" && (G(this.#t) || (this.#c(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), R(this.#t, !0)));
		}
	};
	#p = (e) => {
		let t = this.#a();
		if (!t || this.#o()) return;
		if (this.#c(), !t.isActiveTrigger(this.opts.id.current)) {
			R(this.#t, !1);
			return;
		}
		let n = e.relatedTarget;
		if (_l(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					R(this.#t, !1);
					return;
				}
				t.handleClose(), R(this.#t, !1);
				return;
			}
		}
		t.onTriggerLeave(), R(this.#t, !1);
	};
	#m = (e) => {
		let t = this.#a();
		if (t && !this.#e.current) {
			if (this.#o()) {
				t.opts.open.current && t.handleClose();
				return;
			}
			t.ignoreNonKeyboardFocus && !yl(e.currentTarget) || (t.setActiveTrigger(this.opts.id.current), t.handleOpen());
		}
	};
	#h = () => {
		let e = this.#a();
		!e || this.#o() || e.handleClose();
	};
	#g = () => {
		let e = this.#a();
		!e || e.disableCloseOnTriggerClick || this.#o() || e.handleClose();
	};
	#_ = /* @__PURE__ */ F(() => {
		let e = this.#a(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#o();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": ll(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[yp.trigger]: "",
			tabindex: n ? void 0 : this.opts.tabindex.current,
			disabled: this.opts.disabled.current,
			onpointerup: this.#l,
			onpointerdown: this.#u,
			onpointerenter: this.#d,
			onpointermove: this.#f,
			onpointerleave: this.#p,
			onfocus: this.#m,
			onblur: this.#h,
			onclick: this.#g,
			...this.attachment
		};
	});
	get props() {
		return G(this.#_);
	}
	set props(e) {
		R(this.#_, e);
	}
}, Ep = class e {
	static create(t) {
		return new e(t, xp.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = cl(this.opts.ref, (e) => this.root.contentNode = e), new _p({
			triggerNode: () => this.root.triggerNode,
			contentNode: () => this.root.contentNode,
			enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent,
			transitIntentTimeout: 180,
			ignoredTargets: () => {
				if (this.root.provider.opts.skipDelayDuration.current === 0) return [];
				let e = [], t = this.root.triggerNode;
				for (let n of this.root.registry.triggers.values()) n.node && n.node !== t && e.push(n.node);
				return e;
			},
			onPointerExit: () => {
				this.root.provider.isTooltipOpen(this.root) && this.root.handleClose();
			}
		});
	}
	onInteractOutside = (e) => {
		if (_l(e.target) && this.root.triggerNode?.contains(e.target) && this.root.disableCloseOnTriggerClick) {
			e.preventDefault();
			return;
		}
		this.opts.onInteractOutside.current(e), !e.defaultPrevented && this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current?.(e), !e.defaultPrevented && this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#e = /* @__PURE__ */ F(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return G(this.#e);
	}
	set snippetProps(e) {
		R(this.#e, e);
	}
	#t = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": ll(this.root.disabled),
		...ul(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[yp.content]: "",
		...this.attachment
	}));
	get props() {
		return G(this.#t);
	}
	set props(e) {
		R(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
//#endregion
//#region node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function Dp(e, t) {
	N(t, !0);
	let n = Q(t, "open", 15, !1), r = Q(t, "triggerId", 15, null), i = Q(t, "onOpenChange", 3, Cl), a = Q(t, "onOpenChangeComplete", 3, Cl), o = wp.create({
		open: $(() => n(), (e) => {
			n(e), i()(e);
		}),
		triggerId: $(() => r(), (e) => {
			r(e);
		}),
		delayDuration: $(() => t.delayDuration),
		disableCloseOnTriggerClick: $(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: $(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: $(() => t.ignoreNonKeyboardFocus),
		disabled: $(() => t.disabled),
		onOpenChangeComplete: $(() => a()),
		tether: $(() => t.tether)
	});
	np(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = Qr();
			gi(B(r), () => t.children ?? f, () => ({
				open: o.opts.open.current,
				triggerId: o.activeTriggerId,
				payload: o.activePayload
			})), q(e, r);
		},
		$$slots: { default: !0 }
	}), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var Op = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"side",
	"sideOffset",
	"align",
	"avoidCollisions",
	"arrowPadding",
	"sticky",
	"strategy",
	"hideWhenDetached",
	"customAnchor",
	"collisionPadding",
	"onInteractOutside",
	"onEscapeKeydown",
	"forceMount",
	"style"
]), kp = /* @__PURE__ */ K("<div><div><!></div></div>");
function Ap(e, t) {
	let n = $r();
	N(t, !0);
	let r = Q(t, "id", 19, () => wl(n)), i = Q(t, "ref", 15, null), a = Q(t, "side", 3, "top"), o = Q(t, "sideOffset", 3, 0), s = Q(t, "align", 3, "center"), c = Q(t, "avoidCollisions", 3, !0), l = Q(t, "arrowPadding", 3, 0), u = Q(t, "sticky", 3, "partial"), d = Q(t, "hideWhenDetached", 3, !1), p = Q(t, "collisionPadding", 3, 0), m = Q(t, "onInteractOutside", 3, Cl), h = Q(t, "onEscapeKeydown", 3, Cl), g = Q(t, "forceMount", 3, !1), _ = /* @__PURE__ */ X(t, Op), v = Ep.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => m()),
		onEscapeKeydown: $(() => h())
	}), y = /* @__PURE__ */ F(() => ({
		side: a(),
		sideOffset: o(),
		align: s(),
		avoidCollisions: c(),
		arrowPadding: l(),
		sticky: u(),
		hideWhenDetached: d(),
		collisionPadding: p(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? v.root.triggerNode
	})), b = /* @__PURE__ */ F(() => Nc(_, G(y), v.props));
	var x = Qr(), S = B(x), C = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, i = () => (n?.()).wrapperProps, a = /* @__PURE__ */ F(() => Nc(i(), { style: { pointerEvents: v.root.disableHoverableContent ? "none" : void 0 } })), o = /* @__PURE__ */ F(() => Nc(r(), { style: Uf("tooltip") }, { style: t.style }));
				var s = Qr(), c = B(s), l = (e) => {
					var n = Qr(), r = B(n);
					{
						let e = /* @__PURE__ */ F(() => ({
							props: G(o),
							wrapperProps: G(a),
							...v.snippetProps
						}));
						gi(r, () => t.child, () => G(e));
					}
					q(e, n);
				}, u = (e) => {
					var n = kp();
					qi(n, () => ({ ...G(a) }));
					var r = z(n);
					qi(r, () => ({ ...G(o) })), gi(z(r), () => t.children ?? f), j(r), j(n), q(e, n);
				};
				Y(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), q(e, s);
			}, i = /* @__PURE__ */ F(() => v.root.disableHoverableContent ? "none" : "auto");
			pp(e, Z(() => G(b), () => v.popperProps, {
				get enabled() {
					return v.root.opts.open.current;
				},
				get id() {
					return r();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return v.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return v.shouldRender;
				},
				get contentPointerEvents() {
					return G(i);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	}, w = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, i = () => (n?.()).wrapperProps, a = /* @__PURE__ */ F(() => Nc(i(), { style: { pointerEvents: v.root.disableHoverableContent ? "none" : void 0 } })), o = /* @__PURE__ */ F(() => Nc(r(), { style: Uf("tooltip") }, { style: t.style }));
				var s = Qr(), c = B(s), l = (e) => {
					var n = Qr(), r = B(n);
					{
						let e = /* @__PURE__ */ F(() => ({
							props: G(o),
							wrapperProps: G(a),
							...v.snippetProps
						}));
						gi(r, () => t.child, () => G(e));
					}
					q(e, n);
				}, u = (e) => {
					var n = kp();
					qi(n, () => ({ ...G(a) }));
					var r = z(n);
					qi(r, () => ({ ...G(o) })), gi(z(r), () => t.children ?? f), j(r), j(n), q(e, n);
				};
				Y(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), q(e, s);
			}, i = /* @__PURE__ */ F(() => v.root.disableHoverableContent ? "none" : "auto");
			dp(e, Z(() => G(b), () => v.popperProps, {
				get open() {
					return v.root.opts.open.current;
				},
				get id() {
					return r();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return v.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return v.shouldRender;
				},
				get contentPointerEvents() {
					return G(i);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	};
	Y(S, (e) => {
		g() ? e(C) : g() || e(w, 1);
	}), q(e, x), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var jp = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"disabled",
	"payload",
	"tether",
	"type",
	"tabindex",
	"ref"
]), Mp = /* @__PURE__ */ K("<button><!></button>");
function Np(e, t) {
	let n = $r();
	N(t, !0);
	let r = Q(t, "id", 19, () => wl(n)), i = Q(t, "disabled", 3, !1), a = Q(t, "type", 3, "button"), o = Q(t, "tabindex", 3, 0), s = Q(t, "ref", 15, null), c = /* @__PURE__ */ X(t, jp), l = Tp.create({
		id: $(() => r()),
		disabled: $(() => i() ?? !1),
		tabindex: $(() => o() ?? 0),
		payload: $(() => t.payload),
		tether: $(() => t.tether),
		ref: $(() => s(), (e) => s(e))
	}), u = /* @__PURE__ */ F(() => Nc(c, l.props, { type: a() }));
	var d = Qr(), p = B(d), m = (e) => {
		var n = Qr();
		gi(B(n), () => t.child, () => ({ props: G(u) })), q(e, n);
	}, h = (e) => {
		var n = Mp();
		qi(n, () => ({ ...G(u) })), gi(z(n), () => t.children ?? f), j(n), q(e, n);
	};
	Y(p, (e) => {
		t.child ? e(m) : e(h, -1);
	}), q(e, d), P();
}
//#endregion
//#region node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Pp(e, t) {
	N(t, !0);
	let n = Q(t, "delayDuration", 3, 700), r = Q(t, "disableCloseOnTriggerClick", 3, !1), i = Q(t, "disableHoverableContent", 3, !1), a = Q(t, "disabled", 3, !1), o = Q(t, "ignoreNonKeyboardFocus", 3, !1), s = Q(t, "skipDelayDuration", 3, 300);
	Cp.create({
		delayDuration: $(() => n()),
		disableCloseOnTriggerClick: $(() => r()),
		disableHoverableContent: $(() => i()),
		disabled: $(() => a()),
		ignoreNonKeyboardFocus: $(() => o()),
		skipDelayDuration: $(() => s())
	});
	var c = Qr();
	gi(B(c), () => t.children ?? f), q(e, c), P();
}
//#endregion
//#region src/lib/ui/TimelinePhase.svelte
var Fp = /* @__PURE__ */ K("<span class=\"timeline-phase-label\"> </span> <span class=\"timeline-phase-time\"> </span>", 1), Ip = /* @__PURE__ */ K("<!> <!>", 1);
function Lp(e, t) {
	N(t, !0);
	let n = /* @__PURE__ */ F(() => Do(t.phase.id)), r = /* @__PURE__ */ F(() => `${G(n)}: ${Io(t.phase.start)}–${Io(t.phase.end)}`);
	var i = Qr();
	_i(B(i), () => Pp, (e, i) => {
		i(e, {
			children: (e, i) => {
				var a = Qr();
				_i(B(a), () => Dp, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = Ip(), o = B(a);
							{
								let e = /* @__PURE__ */ F(() => `timeline-phase ${t.phase.active ? "active" : ""}`), i = /* @__PURE__ */ F(() => `flex-grow: ${t.phase.width_pct};`);
								_i(o, () => Np, (a, o) => {
									o(a, {
										get class() {
											return G(e);
										},
										type: "button",
										get style() {
											return G(i);
										},
										get "aria-label"() {
											return G(r);
										},
										children: (e, r) => {
											var i = Fp(), a = B(i), o = z(a, !0);
											j(a);
											var s = V(a, 2), c = z(s, !0);
											j(s), H((e) => {
												J(o, G(n)), J(c, e);
											}, [() => Io(t.phase.start)]), q(e, i);
										},
										$$slots: { default: !0 }
									});
								});
							}
							_i(V(o, 2), () => Ap, (e, t) => {
								t(e, {
									class: "tooltip",
									side: "top",
									children: (e, t) => {
										M();
										var n = Zr();
										H(() => J(n, G(r))), q(e, n);
									},
									$$slots: { default: !0 }
								});
							}), q(e, a);
						},
						$$slots: { default: !0 }
					});
				}), q(e, a);
			},
			$$slots: { default: !0 }
		});
	}), q(e, i), P();
}
//#endregion
//#region src/views/TodayView.svelte
var Rp = /* @__PURE__ */ K("<!> Schlaf markieren", 1), zp = /* @__PURE__ */ K("<!> Wach markieren", 1), Bp = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Heute</p> <h2>Gemeinsamer Alltagsstatus</h2> <p class=\"muted\">Anwesenheit, Bio, Aktivität, Tagesrhythmus und Wake Planning aus der gemeinsamen Core-State-Wahrheit.</p></div> <span class=\"data-status\"> </span></div> <section aria-labelledby=\"today-status-heading\"><div><div class=\"hero-label\"><!> <span>Zentrale Statuswahrheit</span></div> <h2 id=\"today-status-heading\"> </h2> <p><!></p> <div class=\"hero-meta\"><span class=\"chip cyan\"> </span> <span class=\"chip purple\"> </span> <span class=\"chip\"> </span></div> <div class=\"action-row\"><!> <!></div></div> <div class=\"hero-side\"><span class=\"hero-side-label\">Nächster effektiver Weckbeginn</span> <strong class=\"hero-time\"> </strong> <span class=\"helper\"> </span> <div class=\"inline-meta\"><span class=\"chip purple\"> </span> <span class=\"chip orange\"> </span> <span class=\"chip\"> </span></div></div></section> <section class=\"grid three state-overview\" aria-label=\"Core-State-Werte des heutigen Tages\"><article class=\"metric-card semantic-cyan\"><span class=\"metric-label\">Anwesenheit</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article> <article class=\"metric-card semantic-purple\"><span class=\"metric-label\">Bio-Status</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article> <article class=\"metric-card semantic-cyan\"><span class=\"metric-label\">Aktivität</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\">Von Core State bewertet</p></article> <article class=\"metric-card semantic-purple\"><span class=\"metric-label\">Tagesphase</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article> <article class=\"metric-card semantic-orange\"><span class=\"metric-label\">Tageskontext</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article> <article class=\"metric-card semantic-green\"><span class=\"metric-label\">Datenqualität</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article></section> <section class=\"grid four metric-grid\" aria-label=\"Backend-Weckfenster und Schlafschutz\"><article class=\"metric-card\"><span class=\"metric-label\">E · Frühester möglicher Weckbeginn</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\">Backendseitig berechnet</p></article> <article class=\"metric-card\"><span class=\"metric-label\">L · Spätester Weckbeginn – harte Grenze</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\"> </p></article> <article class=\"metric-card\"><span class=\"metric-label\">M · Gewünschte Mindestschlafdauer</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\">Nur Core State entscheidet über die Einhaltung</p></article> <article class=\"metric-card\"><span class=\"metric-label\">A · Schutzvorlauf für vorsorglichen Schlaf</span> <div class=\"metric-value\"> </div> <p class=\"metric-note\">Schutzstatus bleibt fachlich getrennt</p></article></section> <section class=\"timeline-card\" aria-labelledby=\"timeline-heading\"><div class=\"section-header\"><div><p class=\"section-kicker\">Tagesrhythmus</p> <h3 id=\"timeline-heading\">Neun echte Tagesphasen</h3></div> <span class=\"helper\"> </span></div> <div class=\"timeline-track\" aria-label=\"Neunphasige Tagesrhythmus-Timeline\"><span class=\"timeline-marker\" aria-label=\"Jetzt\"></span> <!></div> <div class=\"progress-bar\"><span></span></div> <p class=\"helper\" style=\"margin-top: 8px;\"> </p></section>", 1), Vp = /* @__PURE__ */ K("<div class=\"view-heading\"><div><p class=\"section-kicker\">Heute</p> <h2>Core State wird geladen</h2> <p class=\"muted\">Die Ansicht zeigt erst nach dem versionierten Snapshot fachliche Werte.</p></div> <span class=\"data-status\"> </span></div> <div class=\"skeleton\" aria-busy=\"true\"></div>", 1);
function Hp(e, t) {
	N(t, !0);
	var n = Qr(), r = B(n), i = (e) => {
		let n = /* @__PURE__ */ F(() => t.snapshot.data.today), r = /* @__PURE__ */ F(() => t.snapshot.data.timeline), i = /* @__PURE__ */ F(() => ko(G(n).profile.id)), a = /* @__PURE__ */ F(() => Oo(G(n).day_context.value, { holiday: G(n).day_context.holiday })), o = /* @__PURE__ */ F(() => To(G(n).presence.effective || G(n).presence.personal));
		var s = Bp(), c = B(s), l = V(z(c), 2), u = z(l);
		j(l), j(c);
		var d = V(c, 2), f = z(d), p = z(f), m = z(p), h = (e) => {
			Ia(e, { size: 18 });
		}, g = (e) => {
			Ka(e, { size: 18 });
		}, _ = (e) => {
			Ja(e, { size: 18 });
		}, v = (e) => {
			fa(e, { size: 18 });
		};
		Y(m, (e) => {
			G(n).bio.state === "sleep" ? e(h) : G(n).bio.state === "awake" ? e(g, 1) : G(n).bio.state === "waking" ? e(_, 2) : e(v, -1);
		}), M(2), j(p);
		var y = V(p, 2), b = z(y, !0);
		j(y);
		var x = V(y, 2), S = z(x), C = (e) => {
			q(e, Zr("Vorläufiger Schlafschutz: Diese Zeit zählt noch nicht als bestätigter Schlaf."));
		}, w = (e) => {
			var t = Zr();
			H((e) => J(t, `${e ?? ""}.`), [() => Po(G(n).reason)]), q(e, t);
		};
		Y(S, (e) => {
			G(n).bio.provisional ? e(C) : e(w, -1);
		}), j(x);
		var T = V(x, 2), E = z(T), ee = z(E);
		j(E);
		var D = V(E, 2), te = z(D);
		j(D);
		var ne = V(D, 2), re = z(ne);
		j(ne), j(T);
		var ie = V(T, 2), ae = z(ie), oe = (e) => {
			{
				let n = /* @__PURE__ */ F(() => t.pendingCommand !== null);
				Gs(e, {
					get disabled() {
						return G(n);
					},
					onclick: () => t.onCommand("bio.mark_sleep"),
					children: (e, t) => {
						var n = Rp();
						Ia(B(n), { size: 16 }), M(), q(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		Y(ae, (e) => {
			t.snapshot.capabilities.mark_sleep && G(n).bio.state !== "sleep" && e(oe);
		});
		var se = V(ae, 2), ce = (e) => {
			{
				let n = /* @__PURE__ */ F(() => t.pendingCommand !== null);
				Gs(e, {
					variant: "secondary",
					get disabled() {
						return G(n);
					},
					onclick: () => t.onCommand("bio.mark_awake"),
					children: (e, t) => {
						var n = zp();
						Ka(B(n), { size: 16 }), M(), q(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		Y(se, (e) => {
			t.snapshot.capabilities.mark_awake && G(n).bio.state !== "awake" && e(ce);
		}), j(ie), j(f);
		var le = V(f, 2), ue = V(z(le), 2), de = z(ue, !0);
		j(ue);
		var fe = V(ue, 2), pe = z(fe);
		j(fe);
		var me = V(fe, 2), he = z(me), ge = z(he);
		j(he);
		var _e = V(he, 2), ve = z(_e);
		j(_e);
		var ye = V(_e, 2), be = z(ye);
		j(ye), j(me), j(le), j(d);
		var xe = V(d, 2), Se = z(xe), Ce = V(z(Se), 2), we = z(Ce, !0);
		j(Ce);
		var Te = V(Ce, 2), Ee = z(Te);
		j(Te), j(Se);
		var O = V(Se, 2), De = V(z(O), 2), Oe = z(De, !0);
		j(De);
		var ke = V(De, 2), Ae = z(ke, !0);
		j(ke), j(O);
		var je = V(O, 2), Me = V(z(je), 2), Ne = z(Me, !0);
		j(Me), M(2), j(je);
		var k = V(je, 2), Pe = V(z(k), 2), A = z(Pe, !0);
		j(Pe);
		var Fe = V(Pe, 2), Ie = z(Fe);
		j(Fe), j(k);
		var Le = V(k, 2), Re = V(z(Le), 2), ze = z(Re, !0);
		j(Re);
		var Be = V(Re, 2), Ve = z(Be);
		j(Be), j(Le);
		var He = V(Le, 2), Ue = V(z(He), 2), We = z(Ue, !0);
		j(Ue);
		var Ge = V(Ue, 2), Ke = z(Ge);
		j(Ge), j(He), j(xe);
		var N = V(xe, 2), P = z(N), qe = V(z(P), 2), Je = z(qe, !0);
		j(qe), M(2), j(P);
		var Ye = V(P, 2), Xe = V(z(Ye), 2), Ze = z(Xe, !0);
		j(Xe);
		var Qe = V(Xe, 2), $e = z(Qe, !0);
		j(Qe), j(Ye);
		var et = V(Ye, 2), tt = V(z(et), 2), nt = z(tt, !0);
		j(tt), M(2), j(et);
		var rt = V(et, 2), it = V(z(rt), 2), at = z(it, !0);
		j(it), M(2), j(rt), j(N);
		var ot = V(N, 2), st = z(ot), ct = V(z(st), 2), lt = z(ct);
		j(ct), j(st);
		var ut = V(st, 2), dt = z(ut);
		ui(V(dt, 2), 17, () => G(r).phases, (e) => e.id, (e, t) => {
			Lp(e, { get phase() {
				return G(t);
			} });
		}), j(ut);
		var ft = V(ut, 2), pt = z(ft);
		j(ft);
		var mt = V(ft, 2), ht = z(mt);
		j(mt), j(ot), H((e, t, s, c, f, p, m, h, g, _, v, y, x, S, C, w, T, E, D, ne, ie) => {
			Gi(l, "data-status", G(n).data_status), J(u, `Datenlage: ${e ?? ""}`), Oi(d, 1, `hero-card ${G(n).bio.state}`), J(b, t), J(ee, `Profil: ${G(i) ?? ""}`), J(te, `Tageskontext: ${G(a) ?? ""}`), J(re, `Anwesenheit: ${G(o) ?? ""}`), J(de, s), J(pe, `${c ?? ""}.`), J(ge, `Weckzustand: ${f ?? ""}`), J(ve, `Entscheidung: ${p ?? ""}`), J(be, `Datenlage: ${m ?? ""}`), J(we, G(o)), J(Ee, `Persönlich: ${h ?? ""}`), J(Oe, g), J(Ae, _), J(Ne, v), J(A, y), J(Ie, `Nächster Phasenwechsel: ${x ?? ""}`), J(ze, G(a)), J(Ve, `Wirksames Weckprofil: ${G(i) ?? ""}`), J(We, S), J(Ke, `Snapshot: ${C ?? ""}`), J(Je, w), J(Ze, T), J($e, G(n).wake.hard_l_applied ? "Harte Grenze angewendet" : "Keine Grenzverschiebung"), J(nt, E), J(at, D), J(lt, `Nächster Wechsel: ${ne ?? ""}`), Ai(dt, `left: ${G(r).now_marker_pct}%;`), Gi(ft, "aria-label", `Fortschritt ${G(r).active_phase_progress_pct}%`), Ai(pt, `width: ${G(r).active_phase_progress_pct}%;`), J(ht, `Aktive Phase: ${ie ?? ""} · ${G(r).active_phase_progress_pct ?? ""}% fortgeschritten`);
		}, [
			() => Ao(G(n).data_status),
			() => Co(G(n).bio.state),
			() => Ro(G(n).wake.next_effective_start),
			() => Po(G(n).wake.reason),
			() => wo(G(n).wake.wake_state),
			() => Mo(G(n).wake.decided_by),
			() => Ao(t.status),
			() => To(G(n).presence.personal),
			() => Co(G(n).bio.state),
			() => G(n).bio.provisional ? "Schutzstatus, nicht bestätigte Schlafzeit" : Po(G(n).bio.diagnostics.reason),
			() => Eo(G(n).activity.state),
			() => Do(G(r).active_phase),
			() => Ro(G(r).next_change),
			() => Ao(G(n).data_status),
			() => Ro(t.snapshot.updated_at),
			() => zo(G(n).wake.e),
			() => zo(G(n).wake.l),
			() => Bo(G(n).wake.m_minutes),
			() => Bo(G(n).wake.a_minutes),
			() => Ro(G(r).next_change),
			() => Do(G(r).active_phase)
		]), q(e, s);
	}, a = (e) => {
		var n = Vp(), r = B(n), i = V(z(r), 2), a = z(i);
		j(i), j(r), M(2), H((e) => {
			Gi(i, "data-status", t.status), J(a, `Datenlage: ${e ?? ""}`);
		}, [() => So(t.status)]), q(e, n);
	};
	Y(r, (e) => {
		t.snapshot?.data ? e(i) : e(a, -1);
	}), q(e, n), P();
}
//#endregion
//#region src/App.svelte
var Up = /* @__PURE__ */ K("<span class=\"version-chip\"> </span> <span class=\"contract-version\"> </span>", 1), Wp = /* @__PURE__ */ K("<button type=\"button\"><!> <!> <!> <!> <!> <!> <span> </span></button>"), Gp = /* @__PURE__ */ K("<div class=\"inline-error\" role=\"alert\"> </div>"), Kp = /* @__PURE__ */ K("<div><strong> </strong> <span> </span></div>"), qp = /* @__PURE__ */ K("<section class=\"core-state-module min-h-full\" aria-label=\"Core State\"><header class=\"module-header\"><div><p class=\"eyebrow\">Core State</p> <h1>Core State</h1> <p class=\"module-subtitle\">Aktueller Alltagsstatus und Wake Planning</p></div> <div class=\"module-status\" aria-live=\"polite\"><span class=\"status-dot\" aria-hidden=\"true\"></span> <span> </span> <!></div></header> <nav class=\"module-nav flex items-center gap-1\" aria-label=\"Core-State-Bereiche\"></nav> <!> <!> <main class=\"module-content\"><!></main></section>");
function Jp(e, t) {
	N(t, !0);
	let n = new Vo(), r = /* @__PURE__ */ L(cn(n.state)), i = /* @__PURE__ */ L("today"), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), s = [
		{
			id: "today",
			label: "Heute"
		},
		{
			id: "calendar",
			label: "Kalender"
		},
		{
			id: "profiles",
			label: "Profile & Regeln"
		},
		{
			id: "day_phases",
			label: "Tagesphasen"
		},
		{
			id: "diagnostics",
			label: "Diagnose"
		},
		{
			id: "settings",
			label: "Einstellungen"
		}
	];
	function c(e) {
		R(i, e, !0);
	}
	async function l(e, t = {}) {
		await n.command(e, t);
	}
	function u(e, t) {
		return n.dayPhasePreview(e, t);
	}
	On(() => {
		G(i) === "calendar" && G(a) && !G(o) && (R(o, !0), n.loadProjection());
	}), ra(() => {
		let e = n.subscribe((e) => {
			R(r, e, !0);
		}), t = $p.subscribe((e) => {
			R(a, !0), n.setAdapter(no(e));
		});
		return () => {
			e(), t(), n.dispose();
		};
	});
	var d = qp(), f = z(d), p = V(z(f), 2), m = V(z(p), 2), h = z(m);
	j(m);
	var g = V(m, 2), _ = (e) => {
		var t = Up(), n = B(t), i = z(n);
		j(n);
		var a = V(n, 2), o = z(a);
		j(a), H(() => {
			J(i, `Integration v${G(r).snapshot.integration_version ?? ""}`), J(o, `UX-Vertrag v${G(r).snapshot.version ?? ""}`);
		}), q(e, t);
	};
	Y(g, (e) => {
		G(r).snapshot && e(_);
	}), j(p), j(f);
	var v = V(f, 2);
	ui(v, 21, () => s, (e) => e.id, (e, t) => {
		var n = Wp();
		let r;
		var a = z(n), o = (e) => {
			Ma(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(a, (e) => {
			G(t).id === "today" && e(o);
		});
		var s = V(a, 2), l = (e) => {
			ba(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(s, (e) => {
			G(t).id === "calendar" && e(l);
		});
		var u = V(s, 2), d = (e) => {
			Pa(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(u, (e) => {
			G(t).id === "profiles" && e(d);
		});
		var f = V(u, 2), p = (e) => {
			ga(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(f, (e) => {
			G(t).id === "day_phases" && e(p);
		});
		var m = V(f, 2), h = (e) => {
			fa(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(m, (e) => {
			G(t).id === "diagnostics" && e(h);
		});
		var g = V(m, 2), _ = (e) => {
			Ha(e, {
				size: 17,
				strokeWidth: 1.8
			});
		};
		Y(g, (e) => {
			G(t).id === "settings" && e(_);
		});
		var v = V(g, 2), y = z(v, !0);
		j(v), j(n), H(() => {
			r = Oi(n, 1, "nav-item", null, r, { active: G(i) === G(t).id }), Gi(n, "aria-current", G(i) === G(t).id ? "page" : void 0), J(y, G(t).label);
		}), Vr("click", n, () => c(G(t).id)), q(e, n);
	}), j(v);
	var y = V(v, 2), b = (e) => {
		var t = Gp(), n = z(t, !0);
		j(t), H(() => J(n, G(r).error)), q(e, t);
	};
	Y(y, (e) => {
		G(r).error && e(b);
	});
	var x = V(y, 2), S = (e) => {
		var t = Kp();
		let n;
		var i = z(t), a = z(i, !0);
		j(i);
		var o = V(i, 2), s = z(o, !0);
		j(o), j(t), H((e) => {
			n = Oi(t, 1, "command-feedback", null, n, {
				"command-success": G(r).commandResult.status === "success",
				"command-pending": G(r).commandResult.status === "pending",
				"command-error": G(r).commandResult.status === "error"
			}), Gi(t, "role", G(r).commandResult.status === "error" ? "alert" : "status"), J(a, G(r).commandResult.status === "success" ? "Gespeichert" : G(r).commandResult.status === "pending" ? "Wird gespeichert" : "Nicht gespeichert"), J(s, e);
		}, [() => G(r).commandResult.status === "success" ? "Core State wurde neu synchronisiert." : G(r).commandResult.status === "pending" ? "Core State verarbeitet die Änderung." : Fo(G(r).commandResult.error)]), q(e, t);
	};
	Y(x, (e) => {
		G(r).commandResult && e(S);
	});
	var C = V(x, 2), w = z(C), T = (e) => {
		Hp(e, {
			get snapshot() {
				return G(r).snapshot;
			},
			get status() {
				return G(r).status;
			},
			get pendingCommand() {
				return G(r).pendingCommand;
			},
			onCommand: l
		});
	}, E = (e) => {
		Qo(e, {
			get projection() {
				return G(r).projection;
			},
			get status() {
				return G(r).status;
			}
		});
	}, ee = (e) => {
		Ls(e, {
			get snapshot() {
				return G(r).snapshot;
			},
			get pendingCommand() {
				return G(r).pendingCommand;
			},
			onCommand: l
		});
	}, D = (e) => {
		Cs(e, {
			get snapshot() {
				return G(r).snapshot;
			},
			get pendingCommand() {
				return G(r).pendingCommand;
			},
			onCommand: l,
			onPreview: u
		});
	}, te = (e) => {
		Os(e, {
			get snapshot() {
				return G(r).snapshot;
			},
			get status() {
				return G(r).status;
			}
		});
	}, ne = (e) => {
		Hs(e, {
			get snapshot() {
				return G(r).snapshot;
			},
			get pendingCommand() {
				return G(r).pendingCommand;
			},
			onCommand: l
		});
	};
	Y(w, (e) => {
		G(i) === "today" ? e(T) : G(i) === "calendar" ? e(E, 1) : G(i) === "profiles" ? e(ee, 2) : G(i) === "day_phases" ? e(D, 3) : G(i) === "diagnostics" ? e(te, 4) : e(ne, -1);
	}), j(C), j(d), H((e) => {
		Gi(p, "data-status", G(r).status), J(h, `Datenlage: ${e ?? ""}`);
	}, [() => So(G(r).status)]), q(e, d), P();
}
Hr(["click"]);
//#endregion
//#region src/styles.css?inline
var Yp = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}.collapse{visibility:collapse}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.static{position:static}.sticky{position:sticky}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-flex{display:inline-flex}.min-h-full{min-height:100%}.flex-grow{flex-grow:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.resize{resize:both}.items-center{align-items:center}.justify-center{justify-content:center}.border{border-style:var(--tw-border-style);border-width:1px}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}:host{color:#e7edf4;font-synthesis:none;text-rendering:optimizelegibility;--graphite-950:#11161d;--graphite-900:#171d25;--graphite-850:#1b222c;--graphite-800:#202934;--graphite-700:#2d3745;--graphite-600:#465363;--text:#e7edf4;--muted:#9aa8b8;--subtle:#718093;--cyan:#61d8e6;--cyan-muted:#2d7881;--purple:#b49bff;--orange:#f4b46d;--green:#7dd7ad;--red:#ff8b8b;--yellow:#f4d37b;--radius-sm:8px;--radius-md:12px;--shadow:0 12px 30px #0003;background:#11161d;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:block}.core-state-module,.core-state-module *,.core-state-module :before,.core-state-module :after{box-sizing:border-box}.core-state-module{width:min(2080px,100% - 64px);max-width:2080px;min-height:100%;color:var(--text);background:var(--graphite-950);font-synthesis:none;text-rendering:optimizelegibility;margin:0 auto;padding:28px 0 48px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.core-state-module button,.core-state-module input,.core-state-module select,.core-state-module textarea{font:inherit}.core-state-module button{cursor:pointer}.core-state-module button:focus-visible,.core-state-module input:focus-visible,.core-state-module select:focus-visible,.core-state-module textarea:focus-visible{outline:2px solid var(--cyan);outline-offset:2px}.module-header{border-bottom:1px solid var(--graphite-700);justify-content:space-between;align-items:flex-end;gap:24px;padding-bottom:22px;display:flex}.eyebrow,.section-kicker{color:var(--cyan);letter-spacing:.12em;text-transform:uppercase;margin:0 0 6px;font-size:.74rem;font-weight:700}.core-state-module h1,.core-state-module h2,.core-state-module h3,.core-state-module p{margin-top:0}.core-state-module h1{letter-spacing:-.035em;margin-bottom:0;font-size:clamp(1.55rem,3vw,2.3rem)}.module-subtitle{color:var(--muted);margin:8px 0 0;font-size:.95rem}.core-state-module h2{letter-spacing:-.025em;margin-bottom:8px;font-size:clamp(1.45rem,2.8vw,2rem)}.core-state-module h3{margin-bottom:6px;font-size:1rem}.module-status,.status-badge,.data-status{border:1px solid var(--graphite-600);min-height:32px;color:var(--muted);white-space:nowrap;border-radius:999px;align-items:center;gap:8px;padding:6px 10px;font-size:.78rem;display:inline-flex}.status-dot{background:var(--green);border-radius:50%;width:8px;height:8px;box-shadow:0 0 0 3px #7dd7ad21}[data-status=loading] .status-dot,[data-status=reconnecting] .status-dot{background:var(--cyan)}[data-status=degraded] .status-dot,[data-status=stale] .status-dot{background:var(--yellow)}[data-status=error] .status-dot,[data-status=offline] .status-dot,[data-status=unavailable] .status-dot,[data-status=blocked] .status-dot{background:var(--red)}.data-status[data-status=ready]{color:var(--green);border-color:#7dd7ad59}.data-status[data-status=degraded],.data-status[data-status=stale]{color:var(--orange);border-color:#f4b46d61}.data-status[data-status=error],.data-status[data-status=offline],.data-status[data-status=unavailable],.data-status[data-status=blocked]{color:var(--red);border-color:#ff8b8b6b}.contract-version{border-left:1px solid var(--graphite-600);color:var(--subtle);font-variant-numeric:tabular-nums;padding-left:8px}.version-chip{color:var(--text);font-variant-numeric:tabular-nums}.module-nav{scrollbar-width:thin;gap:4px;padding:14px 0 22px;display:flex;overflow-x:auto}.nav-item,.button{border-radius:var(--radius-sm);min-height:44px;color:var(--muted);background:0 0;border:1px solid #0000;justify-content:center;align-items:center;gap:8px;padding:0 14px;font-size:.9rem;transition:all .16s;display:inline-flex}.nav-item:hover,.nav-item.active{color:var(--text);background:var(--graphite-850);border-color:var(--graphite-600)}.nav-item.active{box-shadow:inset 0 -2px var(--cyan)}.button{border-color:var(--graphite-600);background:var(--graphite-800);color:var(--text);font-weight:650}.button:hover{border-color:var(--cyan-muted);background:var(--graphite-700)}.button.secondary{background:0 0}.button.danger{color:var(--red)}.button:disabled{cursor:wait;opacity:.5}.inline-error,.callout{border-radius:var(--radius-sm);color:#ffd0d0;background:#6f283238;border:1px solid #ff8b8b73;margin:0 0 18px;padding:12px 14px}.callout.info{color:#c4f3f7;background:#215b6333;border-color:#61d8e659}.command-feedback{border:1px solid var(--graphite-600);border-radius:var(--radius-sm);color:var(--muted);background:var(--graphite-900);flex-wrap:wrap;align-items:baseline;gap:8px;margin:0 0 18px;padding:11px 14px;display:flex}.command-feedback.command-success{color:#c9f4de;background:#27695033;border-color:#7dd7ad73}.command-feedback.command-pending{color:#c4f3f7;background:#215b6333;border-color:#61d8e666}.command-feedback.command-error{color:#ffd0d0;background:#6f283238;border-color:#ff8b8b73}.module-content{min-width:0}.view-heading{justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:18px;display:flex}.view-heading p,.muted,.helper{color:var(--muted)}.helper{margin-bottom:0;font-size:.82rem;line-height:1.5}.grid{gap:14px;display:grid}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}.grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}.card,.hero-card,.metric-card,.timeline-card,.table-card{border:1px solid var(--graphite-700);border-radius:var(--radius-md);background:var(--graphite-900);box-shadow:var(--shadow)}.hero-card{grid-template-columns:minmax(0,1.2fr) minmax(240px,.8fr);gap:24px;margin-bottom:14px;padding:24px;display:grid}.hero-card.provisional_sleep{border-color:#f4b46d7a}.hero-card.sleep{border-color:#b49bff7a}.hero-card.waking{border-color:#61d8e67a}.hero-card.awake{border-color:#7dd7ad7a}.hero-label{color:var(--cyan);align-items:center;gap:8px;margin-bottom:18px;font-size:.84rem;font-weight:700;display:inline-flex}.hero-card p{max-width:62ch;line-height:1.55}.hero-side{border-left:1px solid var(--graphite-700);flex-direction:column;justify-content:center;gap:12px;padding:4px 0 4px 20px;display:flex}.hero-side-label,.metric-label,.field-label,.mini-label{color:var(--subtle);letter-spacing:.07em;text-transform:uppercase;font-size:.74rem;font-weight:700}.hero-time{color:var(--text);letter-spacing:-.04em;font-size:2rem;font-weight:750}.hero-meta,.inline-meta,.action-row,.card-header,.section-header{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.hero-meta{margin-top:18px}.chip{border:1px solid var(--graphite-600);min-height:30px;color:var(--muted);border-radius:999px;align-items:center;gap:6px;padding:4px 9px;font-size:.8rem;display:inline-flex}.chip.cyan{color:var(--cyan);border-color:var(--cyan-muted)}.chip.purple{color:var(--purple);border-color:#b49bff59}.chip.orange{color:var(--orange);border-color:#f4b46d59}.metric-card,.card,.timeline-card,.table-card{padding:18px}.metric-card{min-height:100px}.hero-card.sleep .hero-label,.hero-card.provisional_sleep .hero-label,.hero-card.waking .hero-label,.hero-side-label,.hero-time{color:var(--purple)}.semantic-cyan{border-color:#61d8e657}.semantic-purple{border-color:#b49bff5c}.semantic-orange{border-color:#f4b46d61}.semantic-green{border-color:#7dd7ad61}.semantic-red{border-color:#ff8b8b6b}.state-overview,.metric-grid{margin-top:14px}.trace-card{min-height:220px}.trace-summary{color:var(--muted);line-height:1.5}.quality-line{color:var(--subtle);margin:12px 0;font-size:.78rem;display:block}.metric-value{color:var(--text);margin:8px 0 4px;font-size:1.25rem;font-weight:700}.metric-note{color:var(--subtle);margin:0;font-size:.78rem}.timeline-card{margin-top:14px}.section-header{justify-content:space-between;margin-bottom:14px}.section-header h3,.card-header h3{margin-bottom:0}.timeline-track{gap:2px;height:68px;padding-top:10px;display:flex;position:relative}.timeline-marker{z-index:2;background:var(--cyan);width:2px;position:absolute;top:0;bottom:0;box-shadow:0 0 0 3px #61d8e621}.timeline-phase{border:1px solid var(--graphite-700);background:var(--graphite-850);border-radius:6px;min-width:0;height:58px;padding:9px 6px;position:relative;overflow:hidden}.timeline-phase.active{border-color:var(--cyan-muted);background:#20333a}.timeline-phase-label{color:var(--muted);text-overflow:ellipsis;white-space:nowrap;font-size:.7rem;font-weight:650;display:block;overflow:hidden}.timeline-phase-time{color:var(--subtle);font-variant-numeric:tabular-nums;white-space:nowrap;margin-top:5px;font-size:.68rem;display:block}.tooltip{z-index:10;border:1px solid var(--graphite-600);border-radius:var(--radius-sm);max-width:260px;color:var(--text);background:var(--graphite-800);box-shadow:var(--shadow);padding:8px 10px;font-size:.75rem;line-height:1.4}.progress-bar{background:var(--graphite-700);border-radius:999px;height:6px;margin-top:12px;overflow:hidden}.progress-bar>span{background:var(--cyan);height:100%;display:block}.action-row{margin-top:18px}.calendar-grid{grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;max-width:1780px;margin:0 auto;display:grid}.calendar-day{border:1px solid var(--graphite-700);border-radius:var(--radius-sm);background:var(--graphite-900);flex-direction:column;gap:8px;min-height:142px;padding:12px;display:flex}.calendar-day.weekend{background:#1b202a}.calendar-day.holiday,.calendar-day.vacation{border-color:#f4b46d85}.calendar-day.vacation{background:#5c422c33}.calendar-day.weekday{background:var(--graphite-900)}.calendar-day.degraded,.calendar-day.stale{border-color:#f4d37b66}.calendar-day-header{justify-content:space-between;align-items:center;gap:6px;display:flex}.calendar-date{color:var(--text);font-size:.8rem;font-weight:700}.calendar-wake{color:var(--cyan);font-size:1.35rem;font-weight:750}.calendar-wake.purple{color:var(--purple)}.calendar-wake.orange{color:var(--orange)}.day-context-list{flex-direction:column;align-items:flex-start;gap:6px;display:flex}.calendar-day .helper{font-size:.75rem}.calendar-day .data-status{align-self:flex-start;min-height:26px;margin-top:auto;padding:3px 7px;font-size:.7rem}.profile-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;display:grid}.profile-matrix{border:1px solid var(--graphite-700);border-radius:var(--radius-md);background:var(--graphite-900);padding:18px}.profile-card{border:1px solid var(--graphite-700);border-radius:var(--radius-md);width:100%;min-height:44px;color:var(--text);background:var(--graphite-850);text-align:left;padding:18px;display:block}.profile-card:hover,.profile-card:focus-visible,.profile-card.active{border-color:var(--cyan-muted);background:#202d35}.profile-card h3{color:var(--text);margin-bottom:14px}.profile-matrix-list{gap:10px;margin:0 0 14px;display:grid}.profile-matrix-list>div{border-bottom:1px solid var(--graphite-700);grid-template-columns:minmax(0,1.4fr) minmax(120px,.6fr);gap:12px;padding-bottom:9px;display:grid}.profile-matrix-list dt{color:var(--muted);font-size:.82rem}.profile-matrix-list dd{color:var(--text);text-align:right;margin:0;font-weight:700}.form-card{border:1px solid var(--graphite-700);border-radius:var(--radius-md);background:var(--graphite-900);padding:18px}.form-card.active{border-color:var(--cyan-muted);box-shadow:inset 0 0 0 1px #61d8e629, var(--shadow)}.form-card h3{color:var(--cyan)}.form-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px;display:grid}.field{flex-direction:column;gap:6px;min-width:0;display:flex}.field.full{grid-column:1/-1}.field input,.field select,.field textarea{border:1px solid var(--graphite-600);border-radius:var(--radius-sm);width:100%;min-height:44px;color:var(--text);background:var(--graphite-850);padding:9px 10px}.field textarea{resize:vertical;min-height:88px}.field small{color:var(--subtle);font-size:.73rem;line-height:1.4}.validation-error{border-radius:var(--radius-sm);color:#ffd0d0;background:#6f283238;border:1px solid #ff8b8b73;margin-top:14px;padding:10px 12px}.table-wrap{overflow-x:auto}.rules-table{border-collapse:collapse;width:100%;font-size:.84rem}.rules-table th,.rules-table td{border-bottom:1px solid var(--graphite-700);text-align:left;vertical-align:top;padding:12px 10px}.rules-table th{color:var(--subtle);letter-spacing:.06em;text-transform:uppercase;font-size:.72rem}.rules-table td{color:var(--muted)}.rules-table strong{color:var(--text)}.diagnostic-list{grid-template-columns:minmax(130px,.5fr) minmax(0,1fr);gap:8px 16px;margin:0;font-size:.84rem;display:grid}.diagnostic-list dt{color:var(--subtle)}.diagnostic-list dd{color:var(--muted);overflow-wrap:anywhere;margin:0}.diagnostic-pre{border:1px solid var(--graphite-700);border-radius:var(--radius-sm);color:#c9d6e4;white-space:pre-wrap;background:#121820;max-height:360px;margin:0 0 12px;padding:12px;font-family:Cascadia Code,SFMono-Regular,Consolas,monospace;font-size:.75rem;line-height:1.5;overflow:auto}.core-state-module details{border-top:1px solid var(--graphite-700)}.core-state-module details summary{min-height:44px;color:var(--cyan);cursor:pointer;padding:13px 0;font-size:.86rem;font-weight:650}.core-state-module details[open] summary{margin-bottom:8px}.anchor-table{table-layout:fixed;min-width:640px}.anchor-table th:first-child{width:22%}.anchor-input{border:1px solid var(--graphite-600);border-radius:var(--radius-sm);width:100%;min-height:40px;color:var(--text);background:var(--graphite-850);font-variant-numeric:tabular-nums;padding:7px 9px}.anchor-input[aria-invalid=true]{border-color:var(--red);box-shadow:inset 0 0 0 1px #ff8b8b59}.anchor-error{color:#ffd0d0;margin-top:4px;font-size:.72rem;line-height:1.35;display:block}.rules-table td.active-profile{color:var(--cyan)}.skeleton{border:1px solid var(--graphite-700);border-radius:var(--radius-md);background:var(--graphite-900);min-height:180px}.empty-state{border:1px dashed var(--graphite-600);border-radius:var(--radius-md);color:var(--muted);text-align:center;padding:36px 18px}@media (width<=880px){.hero-card,.grid.two,.grid.three,.grid.four,.profile-grid{grid-template-columns:1fr}.hero-side{border-top:1px solid var(--graphite-700);border-left:0;padding:16px 0 0}.calendar-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (width<=560px){.core-state-module{width:calc(100% - 20px);max-width:none;padding-top:16px}.module-header,.view-heading{flex-direction:column;align-items:flex-start}.form-grid{grid-template-columns:1fr}.field.full{grid-column:auto}.calendar-grid{grid-template-columns:1fr}}@media (prefers-reduced-motion:reduce){.core-state-module,.core-state-module *,.core-state-module :before,.core-state-module :after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", Xp = "data-bcs-styles", Zp = "data-bcs-mount";
function Qp(e) {
	let t = e.querySelector(`style[${Xp}]`);
	t || (t = document.createElement("style"), t.setAttribute(Xp, ""), t.textContent = Yp, e.append(t));
	let n = e.querySelector(`[${Zp}]`);
	return n || (n = document.createElement("div"), n.setAttribute(Zp, ""), e.append(n)), n;
}
var $p = ct(null), em = class extends HTMLElement {
	app = null;
	_hass = null;
	unmountPromise = null;
	mountGeneration = 0;
	get hass() {
		return this._hass;
	}
	set hass(e) {
		this._hass = e, $p.set(e);
	}
	connectedCallback() {
		if (this.app) return;
		let e = ++this.mountGeneration, t = Qp(this.shadowRoot ?? this.attachShadow({ mode: "open" })), n = () => {
			!this.isConnected || this.app || e !== this.mountGeneration || (this.app = ei(Jp, { target: t }));
		};
		if (this.unmountPromise) {
			let e = this.unmountPromise;
			this.unmountPromise = null, e.then(n, n);
		} else n();
	}
	disconnectedCallback() {
		this.mountGeneration += 1, this.app && (this.unmountPromise = ii(this.app)), this.app = null;
	}
};
customElements.get("bcs-app") || customElements.define("bcs-app", em);
//#endregion
export { $p as hassStore };
