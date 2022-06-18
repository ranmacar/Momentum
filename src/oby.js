// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/lazy.js
var lazyArrayEach = (arr, B) => {
    if (arr instanceof Array) {
        arr.forEach(B);
    } else if (arr) {
        B(arr);
    }
}
    ;
var lazyArrayPush = (obj, C, D) => {
    const arr = obj[C];
    if (arr instanceof Array) {
        arr.push(D);
    } else if (arr) {
        obj[C] = [arr, D];
    } else {
        obj[C] = D;
    }
}
    ;
var lazySetAdd = (obj, C, D) => {
    const set = obj[C];
    if (set instanceof Set) {
        set.add(D);
    } else if (set) {
        const s = new Set();
        s.add(set);
        s.add(D);
        obj[C] = s;
    } else {
        obj[C] = D;
    }
}
    ;
var lazySetDelete = (obj, C, D) => {
    const set = obj[C];
    if (set instanceof Set) {
        set.delete(D);
    } else if (set === D) {
        obj[C] = void 0;
    }
}
    ;
var lazySetEach = (set, B) => {
    if (set instanceof Set) {
        for (const D of set) {
            B(D);
        }
    } else if (set) {
        B(set);
    }
}
    ;
var lazySetHas = (set, D) => {
    if (set instanceof Set) {
        return set.has(D);
    } else {
        return set === D;
    }
}
    ;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/utils.js
var { toString } = Object.prototype;
var castError = (error2) => {
    if (error2 instanceof Error)
        return error2;
    if (typeof error2 === "string")
        return new Error(error2);
    return new Error("Unknown error");
}
    ;
var isFunction = (D) => {
    return typeof D === "function";
}
    ;
var isFunctionAsync = (D) => {
    return toString.call(D) === "[object AsyncFunction]";
}
    ;
var isObject = (D) => {
    return D !== null && typeof D === "object";
}
    ;
var max = (a, b) => {
    return Math.max(a, b);
}
    ;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/observer.js
var Observer = class {
    AE(cleanup2) {
        lazyArrayPush(this, "A4", cleanup2);
    }
    AF(symbol, D) {
        this.AG || (this.AG = {});
        this.AG[symbol] = D;
    }
    AH(error2) {
        lazyArrayPush(this, "AI", error2);
    }
    A8(observable2) {
        lazyArrayPush(this, "A3", observable2);
    }
    T(observer) {
        lazyArrayPush(this, "A2", observer);
    }
    AJ(root2) {
        lazySetAdd(this, "AD", root2);
    }
    AK(root2) {
        lazySetDelete(this, "AD", root2);
    }
    context(symbol) {
        const { AG, K } = this;
        if (AG && symbol in AG)
            return AG[symbol];
        return K === null || K === void 0 ? void 0 : K.context(symbol);
    }
    U(deep, immediate) {
        const { A2, A3, A4, AI, AG } = this;
        if (A2) {
            this.A2 = void 0;
            lazyArrayEach(A2, (observer) => {
                observer.U(true, immediate);
            }
            );
        }
        if (A3) {
            this.A3 = void 0;
            if (immediate) {
                lazyArrayEach(A3, (observable2) => {
                    if (!observable2.disposed && !observable2.L.disposed) {
                        observable2.AA(this);
                    }
                }
                );
            } else {
                this.AL = A3;
            }
        }
        if (A4) {
            this.A4 = void 0;
            this.S = true;
            lazyArrayEach(A4, (cleanup2) => cleanup2.call(cleanup2));
            this.S = false;
        }
        if (AI) {
            this.AI = void 0;
        }
        if (AG) {
            this.AG = void 0;
        }
    }
    A0() {
        const prev = this.AL;
        const next = this.A3;
        if (!prev)
            return;
        this.AL = void 0;
        if (prev === next)
            return;
        const a = prev instanceof Array ? prev : [prev];
        const b = next instanceof Array ? next : [next];
        outer: for (let ai = 0, al = a.length; ai < al; ai++) {
            const av = a[ai];
            if (av.disposed || av.L.disposed)
                continue;
            if (av === b[ai])
                continue;
            for (let bi = 0, bl = b.length; bi < bl; bi++) {
                if (av === b[bi])
                    continue outer;
            }
            av.AA(this);
        }
    }
    error(error2, silent) {
        const { AI, K } = this;
        if (AI) {
            lazyArrayEach(AI, (B) => B.call(B, error2));
            return true;
        } else {
            if (K === null || K === void 0 ? void 0 : K.error(error2, true))
                return true;
            if (silent) {
                return false;
            } else {
                throw error2;
            }
        }
    }
    V(B) {
        const ownerPrev = OWNER.A;
        const samplingPrev = SAMPLING.A;
        OWNER.A = this;
        SAMPLING.A = false;
        let AM;
        try {
            AM = B();
        } catch (error2) {
            this.error(castError(error2), false);
        } finally {
            OWNER.A = ownerPrev;
            SAMPLING.A = samplingPrev;
        }
        return AM;
    }
}
    ;
var observer_default = Observer;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/superroot.js
var SuperRoot = class extends observer_default {
    constructor() {
        super(...arguments);
        this.disposed = false;
    }
}
    ;
var superroot_default = SuperRoot;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/constants.js
var BATCH = {
    A: void 0
};
var FALSE = () => false;
var IS = Object.is;
var NOOP = () => { }
    ;
var SUPER_OWNER = new superroot_default();
var OWNER = {
    A: SUPER_OWNER
};
var ROOT = {
    A: SUPER_OWNER
};
var SAMPLING = {
    A: false
};
var SUSPENSE = {
    A: void 0
};
var SUSPENSE_ENABLED = {
    A: false
};
var SYMBOL_OBSERVABLE = Symbol("Observable");
var SYMBOL_OBSERVABLE_FROZEN = Symbol("Frozen");
var SYMBOL_OBSERVABLE_READABLE = Symbol("Readable");
var SYMBOL_OBSERVABLE_WRITABLE = Symbol("Writable");
var SYMBOL_RESOLVE_UNWRAPPED = Symbol("Unwrapped");
var SYMBOL_SAMPLED = Symbol("Sampled");
var SYMBOL_STORE = Symbol("Store");
var SYMBOL_STORE_TARGET = Symbol("Target");
var SYMBOL_STORE_VALUES = Symbol("Values");
var SYMBOL_SUSPENSE = Symbol("Suspense");
var TRUE = () => true;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/batch.js
var flush = (D, observable2) => observable2.G(D);
var O = (D, observable2) => observable2.O(false);
var P = (D, observable2) => observable2.P(false);
function batch(B) {
    if (isFunction(B)) {
        if (BATCH.A) {
            return B();
        } else {
            const batch2 = BATCH.A = new Map();
            try {
                return B();
            } finally {
                BATCH.A = void 0;
                if (batch2.size > 1) {
                    batch2.forEach(O);
                }
                try {
                    batch2.forEach(flush);
                } finally {
                    if (batch2.size > 1) {
                        batch2.forEach(P);
                    }
                }
            }
        }
    } else {
        return B;
    }
}
var batch_default = batch;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/cleanup.js
var cleanup = (B) => {
    if (OWNER.A === SUPER_OWNER)
        return;
    OWNER.A.AE(B);
}
    ;
var cleanup_default = cleanup;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/callable.js
var { bind, prototype } = Function;
var { setPrototypeOf } = Object;
function frozenFunction(symbol) {
    if (arguments.length)
        throw new Error("A readonly Observable can not be updated");
    return this;
}
function readableFunction(symbol) {
    if (arguments.length) {
        if (symbol === SYMBOL_OBSERVABLE)
            return this;
        throw new Error("A readonly Observable can not be updated");
    }
    return this.E();
}
function writableFunction(B) {
    if (arguments.length) {
        if (B === SYMBOL_OBSERVABLE)
            return this;
        if (isFunction(B))
            return this.F(B);
        return this.G(B);
    }
    return this.E();
}
var frozenPrototype = setPrototypeOf({
    [SYMBOL_OBSERVABLE]: true,
    [SYMBOL_OBSERVABLE_FROZEN]: true
}, prototype);
var readablePrototype = setPrototypeOf({
    [SYMBOL_OBSERVABLE]: true,
    [SYMBOL_OBSERVABLE_READABLE]: true
}, prototype);
var writablePrototype = setPrototypeOf({
    [SYMBOL_OBSERVABLE]: true,
    [SYMBOL_OBSERVABLE_WRITABLE]: true
}, prototype);
setPrototypeOf(frozenFunction, frozenPrototype);
setPrototypeOf(readableFunction, readablePrototype);
setPrototypeOf(writableFunction, writablePrototype);
var H = bind.bind(frozenFunction);
var I = bind.bind(readableFunction);
var J = bind.bind(writableFunction);

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/computation.js
var Computation = class extends observer_default {
    constructor(B) {
        super();
        this.K = OWNER.A;
        this.L = OWNER.A.L || ROOT.A;
        this.M = 0;
        this.Q = 0;
        this.R = false;
        if (isFunctionAsync(B))
            throw new Error("A computation is forbidden from executing an async function");
    }
    O(fresh) {
        this.M += 1;
        this.R || (this.R = fresh);
    }
    P(fresh) {
        if (!this.M)
            return;
        this.M -= 1;
        this.R || (this.R = fresh);
        if (this.M)
            return;
        fresh = this.R;
        this.R = false;
        if (this.S)
            return;
        this.F(fresh);
    }
    F(fresh) { }
}
    ;
var computation_default = Computation;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/observable.js
var Observable = class {
    constructor(D, options, K) {
        this.L = OWNER.A.L || ROOT.A;
        this.D = D;
        if (K) {
            this.K = K;
        }
        if ((options === null || options === void 0 ? void 0 : options.equals) !== void 0) {
            this.equals = options.equals || FALSE;
        }
    }
    A5(listener) {
        listener.call(listener, this.D);
        if (lazySetHas(this.A6, listener))
            return;
        lazySetAdd(this, "A6", listener);
    }
    T(observer) {
        lazySetAdd(this, "A2", observer);
    }
    A7() {
        var _a;
        if (this.disposed || this.L.disposed)
            return;
        if (!SAMPLING.A && OWNER.A instanceof computation_default) {
            this.T(OWNER.A);
            OWNER.A.A8(this);
        }
        if ((_a = this.K) === null || _a === void 0 ? void 0 : _a.M) {
            this.K.M = 0;
            this.K.R = false;
            this.K.F(true);
        }
    }
    A9(listener) {
        lazySetDelete(this, "A6", listener);
    }
    AA(observer) {
        lazySetDelete(this, "A2", observer);
    }
    E() {
        this.A7();
        return this.D;
    }
    G(D) {
        if (this.disposed)
            throw new Error("A disposed Observable can not be updated");
        if (BATCH.A) {
            BATCH.A.set(this, D);
            return D;
        } else {
            const equals = this.equals || IS;
            const fresh = !equals(D, this.D);
            if (!this.K) {
                if (!fresh)
                    return D;
                if (!this.L.disposed) {
                    this.O(fresh);
                }
            }
            if (fresh) {
                const valuePrev = this.D;
                this.D = D;
                this.AB(valuePrev);
            }
            if (!this.L.disposed) {
                this.P(fresh);
            }
            return D;
        }
    }
    F(B) {
        const valueNext = B(this.D);
        return this.G(valueNext);
    }
    AB(valuePrev) {
        if (this.disposed || this.L.disposed)
            return;
        const { A6 } = this;
        if (A6) {
            if (A6 instanceof Set) {
                for (const listener of A6) {
                    listener.call(listener, this.D, valuePrev);
                }
            } else {
                A6.call(A6, this.D, valuePrev);
            }
        }
    }
    O(fresh) {
        if (this.disposed || this.L.disposed)
            return;
        const computations = this.A2;
        if (computations) {
            if (computations instanceof Set) {
                for (const computation of computations) {
                    computation.O(fresh);
                }
            } else {
                computations.O(fresh);
            }
        }
    }
    P(fresh) {
        if (this.disposed || this.L.disposed)
            return;
        const computations = this.A2;
        if (computations) {
            if (computations instanceof Set) {
                for (const computation of computations) {
                    computation.P(fresh);
                }
            } else {
                computations.P(fresh);
            }
        }
    }
    U() {
        this.disposed = true;
    }
}
    ;
var observable_default = Observable;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/computed.js
var Computed = class extends computation_default {
    constructor(B, options) {
        super(B);
        this.B = B;
        this.observable = new observable_default(void 0, options, this);
        this.K.T(this);
        this.F(true);
    }
    U(deep, immediate) {
        if (deep && !this.L.disposed) {
            this.observable.U();
        }
        super.U(deep, immediate);
    }
    O(fresh) {
        if (!this.M) {
            this.observable.O(false);
        }
        super.O(fresh);
    }
    F(fresh) {
        if (fresh && !this.observable.disposed && !this.observable.L.disposed) {
            const status = this.Q;
            if (status) {
                this.Q = fresh ? 3 : max(status, 2);
                if (status > 1) {
                    this.observable.P(false);
                }
            } else {
                this.Q = 1;
                this.U();
                try {
                    const D = this.V(this.B);
                    this.A0();
                    if (this.observable.disposed || this.observable.L.disposed) {
                        this.observable.P(false);
                    } else {
                        this.observable.G(D);
                    }
                    if (!this.A2 && !this.A3 && !this.A4) {
                        this.U(true, true);
                    }
                } catch (error2) {
                    this.A0();
                    this.error(castError(error2), false);
                    this.observable.P(false);
                } finally {
                    const status2 = this.Q;
                    this.Q = 0;
                    if (status2 > 1) {
                        this.F(status2 === 3);
                    }
                }
            }
        } else {
            this.observable.P(false);
        }
    }
}
    ;
var computed_default = Computed;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/computed.js
var DUMMY_FN = () => { }
    ;
var DUMMY_OBSERVABLE = new observable_default(void 0);
var computed = (B, options) => {
    const computed2 = new computed_default(B, options);
    const { observable: observable2 } = computed2;
    if (!computed2.A3) {
        computed2.B = DUMMY_FN;
        computed2.observable = DUMMY_OBSERVABLE;
        return H(observable2.D);
    } else {
        return I(observable2);
    }
}
    ;
var computed_default2 = computed;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/context.js
function context(symbol, D) {
    if (arguments.length < 2) {
        return OWNER.A.context(symbol);
    } else {
        return OWNER.A.AF(symbol, D);
    }
}
var context_default = context;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/disposed.js
var disposed = () => {
    const observable2 = new observable_default(false);
    cleanup_default(() => {
        observable2.G(true);
    }
    );
    return I(observable2);
}
    ;
var disposed_default = disposed;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/suspended.js
var AN = () => {
    if (!SUSPENSE_ENABLED.A)
        return 0;
    const suspense2 = SUSPENSE.A || OWNER.A.context(SYMBOL_SUSPENSE);
    return (suspense2 === null || suspense2 === void 0 ? void 0 : suspense2.AN) || 0;
}
    ;
var suspended_default = AN;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/reaction.js
var Reaction = class extends computation_default {
    constructor(B, AO) {
        super(B);
        this.B = B;
        this.K.T(this);
        if (AO && suspended_default()) {
            this.O(true);
        } else {
            this.F(true);
        }
    }
    F(fresh) {
        if (fresh && !this.L.disposed) {
            const status = this.Q;
            if (status) {
                this.Q = fresh ? 3 : max(status, 2);
            } else {
                this.Q = 1;
                this.U();
                try {
                    const cleanup2 = this.V(this.B);
                    this.A0();
                    if (isFunction(cleanup2)) {
                        this.AE(cleanup2);
                    } else {
                        if (!this.A2 && !this.A3 && !this.A4) {
                            this.U(true, true);
                        }
                    }
                } catch (error2) {
                    this.A0();
                    this.error(castError(error2), false);
                } finally {
                    const status2 = this.Q;
                    this.Q = 0;
                    if (status2 > 1) {
                        this.F(status2 === 3);
                    }
                }
            }
        }
    }
}
    ;
var reaction_default = Reaction;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/effect.js
var Effect = class extends reaction_default {
    constructor(B) {
        super(B, true);
    }
}
    ;
var effect_default = Effect;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/effect.js
var effect = (B) => {
    const effect2 = new effect_default(B);
    if (!effect2.A3 && !suspended_default()) {
        effect2.B = NOOP;
    }
    return effect2.U.bind(effect2, true, true);
}
    ;
var effect_default2 = effect;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/error.js
var error = (B) => {
    OWNER.A.AH(B);
}
    ;
var error_default = error;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/is_store.js
var isStore = (D) => {
    return isObject(D) && SYMBOL_STORE in D;
}
    ;
var is_store_default = isStore;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/sample.js
function sample(B) {
    if (isFunction(B)) {
        if (SAMPLING.A) {
            return B();
        } else {
            SAMPLING.A = true;
            try {
                return B();
            } finally {
                SAMPLING.A = false;
            }
        }
    } else {
        return B;
    }
}
var sample_default = sample;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/resolve.js
var resolve = (D) => {
    if (isFunction(D)) {
        if (SYMBOL_SAMPLED in D) {
            if (SYMBOL_RESOLVE_UNWRAPPED in D) {
                return resolve(D());
            } else {
                return H(resolve(D()));
            }
        } else if (SYMBOL_OBSERVABLE in D) {
            return D;
        } else {
            return computed_default2(() => resolve(D()));
        }
    }
    if (D instanceof Array) {
        const resolved = new Array(D.length);
        for (let i = 0, l = resolved.length; i < l; i++) {
            resolved[i] = resolve(D[i]);
        }
        return resolved;
    } else {
        return D;
    }
}
    ;
var resolve_default = resolve;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/suspendable.js
var suspendable = () => {
    return !!SUSPENSE_ENABLED.A && (!!SUSPENSE.A || !!OWNER.A.context(SYMBOL_SUSPENSE));
}
    ;
var suspendable_default = suspendable;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/root.js
var Root = class extends observer_default {
    constructor(AO) {
        super();
        this.K = OWNER.A;
        if (AO && suspendable_default()) {
            this.AO = true;
            this.K.AJ(this);
        }
    }
    U(deep, immediate) {
        this.disposed = true;
        if (this.AO) {
            this.K.AK(this);
        }
        super.U(deep, immediate);
    }
    V(B) {
        const U = this.U.bind(this, true, true);
        const fnWithDispose = B.bind(void 0, U);
        const rootPrev = ROOT.A;
        ROOT.A = this;
        try {
            return super.V(fnWithDispose);
        } finally {
            ROOT.A = rootPrev;
        }
    }
}
    ;
var root_default = Root;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/for.cache.js
var DUMMY_INDEX = H(-1);
var MappedRoot = class extends root_default {
}
    ;
var Cache = class {
    constructor(B) {
        this.AQ = new Map();
        this.AR = false;
        this.AS = 0;
        this.AT = 0;
        this.K = OWNER.A;
        this.cleanup = () => {
            if (!this.AS)
                return;
            if (!this.AT)
                return this.U();
            const { AQ, AR } = this;
            AQ.forEach((mapped, D) => {
                if (mapped.AR === AR)
                    return;
                mapped.U(true, true);
                AQ.delete(D);
            }
            );
        }
            ;
        this.U = () => {
            this.K.AK(this.AD);
            if (!this.AQ.size)
                return;
            this.AQ.forEach((mapped) => {
                mapped.U(true, true);
            }
            );
            this.AQ = new Map();
        }
            ;
        this.A1 = (values) => {
            this.AR = !this.AR;
            this.AT = 0;
        }
            ;
        this.AC = (values) => {
            this.AT = values.length;
            this.cleanup();
            this.AS = this.AT;
        }
            ;
        this.map = (D, index) => {
            var _a;
            const { AQ, AR, B: B2, AU } = this;
            const cached = AQ.get(D);
            if (cached && cached.AR !== AR) {
                cached.AR = AR;
                (_a = cached.observable) === null || _a === void 0 ? void 0 : _a.G(index);
                return cached.AM;
            } else {
                const mapped = new MappedRoot();
                if (cached) {
                    cleanup_default(() => mapped.U());
                }
                return mapped.V(() => {
                    let observable2 = DUMMY_INDEX;
                    if (AU) {
                        mapped.observable = new observable_default(index);
                        observable2 = I(mapped.observable);
                    }
                    const AM = resolve_default(B2(D, observable2));
                    mapped.AR = AR;
                    mapped.AM = AM;
                    if (!cached) {
                        AQ.set(D, mapped);
                    }
                    return AM;
                }
                );
            }
        }
            ;
        this.AD = () => {
            return Array.from(this.AQ.values());
        }
            ;
        this.B = B;
        this.AU = B.length > 1;
        this.K.AJ(this.AD);
    }
}
    ;
var for_cache_default = Cache;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/for.js
var _for = (values, B, fallback = []) => {
    const AQ = new for_cache_default(B);
    const { U, A1, AC, map } = AQ;
    cleanup_default(U);
    return computed_default2(() => {
        const array = isFunction(values) ? values() : values;
        if (is_store_default(array))
            array[SYMBOL_STORE_VALUES];
        A1(array);
        const AM = sample_default(() => array.length ? array.map(map) : resolve_default(fallback));
        AC(array);
        return AM;
    }
    );
}
    ;
var for_default = _for;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/is_observable.js
var isObservable = (D) => {
    return isFunction(D) && SYMBOL_OBSERVABLE in D;
}
    ;
var is_observable_default = isObservable;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/get.js
var get = (D) => {
    if (is_observable_default(D))
        return D();
    return D;
}
    ;
var get_default = get;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/for_index.cache.js
var IndexedRoot = class extends root_default {
}
    ;
var Cache2 = class {
    constructor(B) {
        this.K = OWNER.A;
        this.cleanup = (startIndex) => {
            const { AQ } = this;
            for (let i = startIndex, l = AQ.length; i < l; i++) {
                AQ[i].U(true, true);
            }
            AQ.length = startIndex;
        }
            ;
        this.U = () => {
            this.K.AK(this.AD);
            this.cleanup(0);
        }
            ;
        this.map = (values) => {
            const { AQ, B: B2 } = this;
            const results = [];
            for (let i = 0, l = values.length; i < l; i++) {
                const D = values[i];
                const cached = AQ[i];
                if (cached) {
                    cached.AV.G(D);
                    results[i] = cached.AM;
                } else {
                    const indexed = new IndexedRoot();
                    indexed.V(() => {
                        const AV = new observable_default(D);
                        const B02 = computed_default2(() => get_default(AV.E()));
                        indexed.AV = AV;
                        indexed.B0 = B02;
                        indexed.AM = resolve_default(B2(B02, i));
                        AQ[i] = indexed;
                        results[i] = indexed.AM;
                    }
                    );
                }
            }
            this.cleanup(values.length);
            return results;
        }
            ;
        this.AD = () => {
            return Array.from(this.AQ.values());
        }
            ;
        this.B = B;
        this.AQ = [];
        this.K.AJ(this.AD);
    }
}
    ;
var for_index_cache_default = Cache2;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/for_index.js
var forIndex = (values, B, fallback = []) => {
    const AQ = new for_index_cache_default(B);
    const { U, map } = AQ;
    cleanup_default(U);
    return computed_default2(() => {
        const array = isFunction(values) ? values() : values;
        if (is_store_default(array))
            array[SYMBOL_STORE_VALUES];
        const AM = sample_default(() => array.length ? map(array) : resolve_default(fallback));
        return AM;
    }
    );
}
    ;
var for_index_default = forIndex;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/boolean.js
var boolean = (D) => {
    if (!isFunction(D))
        return D ? TRUE : FALSE;
    return computed_default2(() => !!D());
}
    ;
var boolean_default = boolean;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/switch.js
function _switch(when, values) {
    const D = computed_default2(() => {
        const condition = isFunction(when) ? when() : when;
        for (let i = 0, l = values.length; i < l; i++) {
            const D2 = values[i];
            if (D2.length === 1)
                return D2[0];
            if (IS(D2[0], condition))
                return D2[1];
        }
    }
    );
    return computed_default2(() => {
        return resolve_default(D());
    }
    );
}
var switch_default = _switch;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/ternary.js
var ternary = (when, valueTrue, valueFalse) => {
    const condition = boolean_default(when);
    return switch_default(condition, [[true, valueTrue], [valueFalse]]);
}
    ;
var ternary_default = ternary;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/if.js
var _if = (when, valueTrue, valueFalse) => {
    return ternary_default(when, valueTrue, valueFalse);
}
    ;
var if_default = _if;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/target.js
var B0 = (observable2) => {
    if (observable2 instanceof observable_default)
        return observable2;
    if (SYMBOL_OBSERVABLE_FROZEN in observable2)
        throw new Error();
    return observable2(SYMBOL_OBSERVABLE);
}
    ;
var target_default = B0;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/off.js
var off = (observable2, listener) => {
    if (SYMBOL_OBSERVABLE_FROZEN in observable2) {
        return;
    } else {
        target_default(observable2).A9(listener);
    }
}
    ;
var off_default = off;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/on.js
var on = (observable2, listener) => {
    if (SYMBOL_OBSERVABLE_FROZEN in observable2) {
        listener.call(listener, observable2());
    } else {
        target_default(observable2).A5(listener);
    }
    return () => {
        off_default(observable2, listener);
    }
        ;
}
    ;
var on_default = on;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/reaction.js
var reaction = (B) => {
    const reaction2 = new reaction_default(B);
    if (!reaction2.A3) {
        reaction2.B = NOOP;
    }
    return reaction2.U.bind(reaction2, true, true);
}
    ;
var reaction_default2 = reaction;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/readonly.js
var readonly = (observable2) => {
    if (SYMBOL_OBSERVABLE_FROZEN in observable2 || SYMBOL_OBSERVABLE_READABLE in observable2)
        return observable2;
    return I(target_default(observable2));
}
    ;
var readonly_default = readonly;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/root.js
var root = (B) => {
    return new root_default(true).V(B);
}
    ;
var root_default2 = root;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/selector.js
var SelectedObservable = class extends observable_default {
    constructor() {
        super(...arguments);
        this.N = 0;
    }
    call() {
        if (!this.B1.size)
            return;
        this.N -= 1;
        if (this.N)
            return;
        this.U();
        this.B1.delete(this.AV);
    }
}
    ;
var selector = (AV) => {
    const L = OWNER.A.L || ROOT.A;
    let B1 = new Map();
    let valuePrev;
    reaction_default2(() => {
        const selectedPrev = B1.get(valuePrev);
        if (selectedPrev)
            selectedPrev.G(false);
        const valueNext = AV();
        const selectedNext = B1.get(valueNext);
        if (selectedNext)
            selectedNext.G(true);
        valuePrev = valueNext;
    }
    );
    const cleanupAll = () => {
        if (!L.disposed) {
            B1.forEach((selected) => {
                selected.U();
            }
            );
        }
        B1 = new Map();
    }
        ;
    cleanup_default(cleanupAll);
    return (D) => {
        let selected;
        let selectedPrev = B1.get(D);
        if (selectedPrev) {
            selected = selectedPrev;
        } else {
            selected = new SelectedObservable(sample_default(AV) === D);
            selected.B1 = B1;
            selected.AV = D;
            selected.L = L;
            B1.set(D, selected);
        }
        selected.N += 1;
        cleanup_default(selected);
        return I(selected);
    }
        ;
}
    ;
var selector_default = selector;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/store.js
var StoreMap = class extends Map {
    B2(C, D) {
        super.set(C, D);
        return D;
    }
}
    ;
var StoreCleanable = class {
    constructor() {
        this.N = 0;
    }
    B3() {
        this.N += 1;
        cleanup_default(this);
    }
    call() {
        this.N -= 1;
        if (this.N)
            return;
        this.U();
    }
    U() { }
}
    ;
var StoreKeys = class extends StoreCleanable {
    constructor(K, observable2) {
        super();
        this.K = K;
        this.observable = observable2;
    }
    U() {
        this.K.keys = void 0;
    }
}
    ;
var StoreValues = class extends StoreCleanable {
    constructor(K, observable2) {
        super();
        this.K = K;
        this.observable = observable2;
    }
    U() {
        this.K.values = void 0;
    }
}
    ;
var StoreHas = class extends StoreCleanable {
    constructor(K, C, observable2) {
        super();
        this.K = K;
        this.C = C;
        this.observable = observable2;
    }
    U() {
        var _a;
        (_a = this.K.has) === null || _a === void 0 ? void 0 : _a.delete(this.C);
    }
}
    ;
var StoreProperty = class extends StoreCleanable {
    constructor(K, C, observable2, B4) {
        super();
        this.K = K;
        this.C = C;
        this.observable = observable2;
        this.B4 = B4;
    }
    U() {
        var _a;
        (_a = this.K.B5) === null || _a === void 0 ? void 0 : _a.delete(this.C);
    }
}
    ;
var NODES = new WeakMap();
var SPECIAL_SYMBOLS = new Set([SYMBOL_STORE, SYMBOL_STORE_TARGET, SYMBOL_STORE_VALUES]);
var UNREACTIVE_KEYS = new Set(["__proto__", "prototype", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toSource", "toString", "valueOf"]);
var TRAPS = {
    get: (B02, C) => {
        var _a, _b;
        if (SPECIAL_SYMBOLS.has(C)) {
            if (C === SYMBOL_STORE)
                return true;
            if (C === SYMBOL_STORE_TARGET)
                return B02;
            if (C === SYMBOL_STORE_VALUES) {
                if (isListenable()) {
                    const B42 = getNodeExisting(B02);
                    B42.values || (B42.values = getNodeValues(B42));
                    B42.values.B3();
                    B42.values.observable.E();
                }
            }
        }
        if (UNREACTIVE_KEYS.has(C))
            return B02[C];
        const B4 = getNodeExisting(B02);
        const getter = (_a = B4.B6) === null || _a === void 0 ? void 0 : _a.get(C);
        const D = getter || B02[C];
        B4.B5 || (B4.B5 = new StoreMap());
        const property = B4.B5.get(C) || B4.B5.B2(C, getNodeProperty(B4, C, D));
        if (isListenable()) {
            property.B3();
            property.observable || (property.observable = getNodeObservable(B4, D));
            property.observable.E();
        }
        if (getter) {
            return getter.call(B4.store);
        } else {
            if (typeof D === "function" && D === Array.prototype[C]) {
                return function () {
                    return batch_default(() => D.apply(B4.store, arguments));
                }
                    ;
            }
            return ((_b = property.B4) === null || _b === void 0 ? void 0 : _b.store) || D;
        }
    }
    ,
    set: (B02, C, D) => {
        var _a;
        D = getTarget(D);
        const B4 = getNodeExisting(B02);
        const setter = (_a = B4.B7) === null || _a === void 0 ? void 0 : _a.get(C);
        if (setter) {
            batch_default(() => setter.call(B4.store, D));
        } else {
            const hadProperty = C in B02;
            B02[C] = D;
            batch_default(() => {
                var _a2, _b, _c, _d, _e, _f;
                (_a2 = B4.values) === null || _a2 === void 0 ? void 0 : _a2.observable.G(0);
                if (!hadProperty) {
                    (_b = B4.keys) === null || _b === void 0 ? void 0 : _b.observable.G(0);
                    (_d = (_c = B4.has) === null || _c === void 0 ? void 0 : _c.get(C)) === null || _d === void 0 ? void 0 : _d.observable.G(true);
                }
                const property = (_e = B4.B5) === null || _e === void 0 ? void 0 : _e.get(C);
                if (property) {
                    (_f = property.observable) === null || _f === void 0 ? void 0 : _f.G(D);
                    property.B4 = isProxiable(D) ? NODES.get(D) || getNode(D, B4) : void 0;
                }
            }
            );
        }
        return true;
    }
    ,
    deleteProperty: (B02, C) => {
        const hasProperty = C in B02;
        if (!hasProperty)
            return true;
        const deleted = Reflect.deleteProperty(B02, C);
        if (!deleted)
            return false;
        const B4 = getNodeExisting(B02);
        batch_default(() => {
            var _a, _b, _c, _d, _e, _f;
            (_a = B4.keys) === null || _a === void 0 ? void 0 : _a.observable.G(0);
            (_b = B4.values) === null || _b === void 0 ? void 0 : _b.observable.G(0);
            (_d = (_c = B4.has) === null || _c === void 0 ? void 0 : _c.get(C)) === null || _d === void 0 ? void 0 : _d.observable.G(false);
            const property = (_e = B4.B5) === null || _e === void 0 ? void 0 : _e.get(C);
            if (property) {
                (_f = property.observable) === null || _f === void 0 ? void 0 : _f.G(void 0);
                property.B4 = void 0;
            }
        }
        );
        return true;
    }
    ,
    defineProperty: (B02, C, descriptor) => {
        const hadProperty = C in B02;
        const defined = Reflect.defineProperty(B02, C, descriptor);
        if (!defined)
            return false;
        const B4 = getNodeExisting(B02);
        batch_default(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!descriptor.get) {
                (_a = B4.B6) === null || _a === void 0 ? void 0 : _a.delete(C);
            } else if (descriptor.get) {
                B4.B6 || (B4.B6 = new StoreMap());
                B4.B6.set(C, descriptor.get);
            }
            if (!descriptor.set) {
                (_b = B4.B7) === null || _b === void 0 ? void 0 : _b.delete(C);
            } else if (descriptor.set) {
                B4.B7 || (B4.B7 = new StoreMap());
                B4.B7.set(C, descriptor.set);
            }
            if (hadProperty !== !!descriptor.enumerable) {
                (_c = B4.keys) === null || _c === void 0 ? void 0 : _c.observable.G(0);
                (_e = (_d = B4.has) === null || _d === void 0 ? void 0 : _d.get(C)) === null || _e === void 0 ? void 0 : _e.observable.G(!!descriptor.enumerable);
            }
            const property = (_f = B4.B5) === null || _f === void 0 ? void 0 : _f.get(C);
            if (property) {
                if ("get" in descriptor) {
                    (_g = property.observable) === null || _g === void 0 ? void 0 : _g.G(descriptor.get);
                    property.B4 = void 0;
                } else {
                    const D = descriptor["value"];
                    (_h = property.observable) === null || _h === void 0 ? void 0 : _h.G(D);
                    property.B4 = isProxiable(D) ? NODES.get(D) || getNode(D, B4) : void 0;
                }
            }
        }
        );
        return true;
    }
    ,
    has: (B02, C) => {
        if (C === SYMBOL_STORE)
            return true;
        if (C === SYMBOL_STORE_TARGET)
            return true;
        const D = C in B02;
        if (isListenable()) {
            const B4 = getNodeExisting(B02);
            B4.has || (B4.has = new StoreMap());
            const has = B4.has.get(C) || B4.has.B2(C, getNodeHas(B4, C, D));
            has.B3();
            has.observable.E();
        }
        return D;
    }
    ,
    ownKeys: (B02) => {
        const keys = Reflect.ownKeys(B02);
        if (isListenable()) {
            const B4 = getNodeExisting(B02);
            B4.keys || (B4.keys = getNodeKeys(B4));
            B4.keys.B3();
            B4.keys.observable.E();
        }
        return keys;
    }
};
var getNode = (D, K) => {
    const store2 = new Proxy(D, TRAPS);
    const L = (K === null || K === void 0 ? void 0 : K.L) || OWNER.A.L || ROOT.A;
    const { B6, B7 } = getGettersAndSetters(D);
    const B4 = {
        store: store2,
        L
    };
    if (B6)
        B4.B6 = B6;
    if (B7)
        B4.B7 = B7;
    NODES.set(D, B4);
    return B4;
}
    ;
var getNodeExisting = (D) => {
    const B4 = NODES.get(D);
    if (!B4)
        throw new Error();
    return B4;
}
    ;
var getNodeKeys = (B4) => {
    const observable2 = getNodeObservable(B4, 0, {
        equals: false
    });
    const keys = new StoreKeys(B4, observable2);
    return keys;
}
    ;
var getNodeValues = (B4) => {
    const observable2 = getNodeObservable(B4, 0, {
        equals: false
    });
    const values = new StoreValues(B4, observable2);
    return values;
}
    ;
var getNodeHas = (B4, C, D) => {
    const observable2 = getNodeObservable(B4, D);
    const has = new StoreHas(B4, C, observable2);
    return has;
}
    ;
var getNodeObservable = (B4, D, options) => {
    const observable2 = new observable_default(D, options);
    observable2.L = B4.L;
    return observable2;
}
    ;
var getNodeProperty = (B4, C, D) => {
    const observable2 = void 0;
    const propertyNode = isProxiable(D) ? NODES.get(D) || getNode(D, B4) : void 0;
    const property = new StoreProperty(B4, C, observable2, propertyNode);
    B4.B5 || (B4.B5 = new StoreMap());
    B4.B5.set(C, property);
    return property;
}
    ;
var getGettersAndSetters = (D) => {
    if (Array.isArray(D))
        return {};
    let B6;
    let B7;
    const keys = Reflect.ownKeys(D);
    for (let i = 0, l = keys.length; i < l; i++) {
        const C = keys[i];
        const descriptor = Object.getOwnPropertyDescriptor(D, C);
        if (!descriptor)
            continue;
        const { get: get2, set } = descriptor;
        if (get2) {
            B6 || (B6 = new StoreMap());
            B6.set(C, get2);
        }
        if (set) {
            B7 || (B7 = new StoreMap());
            B7.set(C, set);
        }
    }
    return {
        B6,
        B7
    };
}
    ;
var getStore = (D) => {
    if (is_store_default(D))
        return D;
    const B4 = NODES.get(D) || getNode(D);
    return B4.store;
}
    ;
var getTarget = (D) => {
    if (is_store_default(D))
        return D[SYMBOL_STORE_TARGET];
    return D;
}
    ;
var isListenable = () => {
    return OWNER.A instanceof computation_default;
}
    ;
var isProxiable = (D) => {
    if (D === null || typeof D !== "object")
        return false;
    if (Array.isArray(D))
        return true;
    const prototype2 = Object.getPrototypeOf(D);
    if (prototype2 === null)
        return true;
    return Object.getPrototypeOf(prototype2) === null;
}
    ;
var store = (D, options) => {
    if (!isProxiable(D))
        return D;
    if (options === null || options === void 0 ? void 0 : options.unwrap)
        return getTarget(D);
    return getStore(D);
}
    ;
var store_default = store;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/objects/suspense.js
var Suspense = class extends observer_default {
    constructor() {
        super();
        this.K = OWNER.A;
        this.AN = suspended_default();
        SUSPENSE_ENABLED.A = true;
        OWNER.A.T(this);
        this.AF(SYMBOL_SUSPENSE, this);
    }
    AP(force) {
        if (!this.AN && !force)
            return;
        const suspendedPrev = this.AN;
        this.AN += force ? 1 : -1;
        if (suspendedPrev >= 2)
            return;
        const notifyRoot = (root2) => {
            if (isFunction(root2)) {
                root2().forEach(notifyObserver);
            } else {
                notifyObserver(root2);
            }
        }
            ;
        const notifyObserver = (observer) => {
            if (observer instanceof Suspense)
                return;
            if (observer instanceof effect_default) {
                if (force) {
                    observer.O(false);
                } else {
                    observer.P(false);
                }
            }
            lazyArrayEach(observer.A2, notifyObserver);
            lazySetEach(observer.AD, notifyRoot);
        }
            ;
        const notifySuspense = (observer) => {
            if (!(observer instanceof Suspense))
                return;
            observer.AP(force);
        }
            ;
        lazyArrayEach(this.A2, notifyObserver);
        lazyArrayEach(this.A2, notifySuspense);
        lazySetEach(this.AD, notifyRoot);
    }
    V(B) {
        const suspensePrev = SUSPENSE.A;
        SUSPENSE.A = this;
        try {
            return super.V(B);
        } finally {
            SUSPENSE.A = suspensePrev;
        }
    }
}
    ;
var suspense_default = Suspense;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/suspense.js
var suspense = (when, B) => {
    const suspense2 = new suspense_default();
    const condition = boolean_default(when);
    effect_default2(() => {
        suspense2.AP(condition());
    }
    );
    return suspense2.V(B);
}
    ;
var suspense_default2 = suspense;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/try_catch.js
var tryCatch = (D, B) => {
    const observable2 = new observable_default(void 0);
    return computed_default2(() => {
        if (observable2.E()) {
            const error2 = observable2.D;
            const reset = () => observable2.G(void 0);
            const options = {
                error: error2,
                reset
            };
            return resolve_default(B(options));
        } else {
            error_default((error2) => {
                observable2.G(castError(error2));
            }
            );
            return resolve_default(D);
        }
    }
    );
}
    ;
var try_catch_default = tryCatch;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/with.js
var _with = () => {
    const owner = OWNER.A;
    return (B) => {
        return owner.V(() => B());
    }
        ;
}
    ;
var with_default = _with;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/$.js
function $(D, options) {
    return J(new observable_default(D, options));
}
$.batch = batch_default;
$.cleanup = cleanup_default;
$.computed = computed_default2;
$.context = context_default;
$.disposed = disposed_default;
$.effect = effect_default2;
$.error = error_default;
$.for = for_default;
$.forIndex = for_index_default;
$.get = get_default;
$.if = if_default;
$.isObservable = is_observable_default;
$.isStore = is_store_default;
$.off = off_default;
$.on = on_default;
$.reaction = reaction_default2;
$.readonly = readonly_default;
$.resolve = resolve_default;
$.root = root_default2;
$.sample = sample_default;
$.selector = selector_default;
$.store = store_default;
$.suspense = suspense_default2;
$.switch = switch_default;
$.ternary = ternary_default;
$.tryCatch = try_catch_default;
$.with = with_default;
var __default = $;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/methods/observable.js
function observable(D, options) {
    return J(new observable_default(D, options));
}
var observable_default2 = observable;

// node_modules/.pnpm/oby@9.2.0/node_modules/oby/dist/index.js
var dist_default = __default;

// dep:oby
var oby_default = dist_default;
export { SYMBOL_OBSERVABLE, SYMBOL_OBSERVABLE_FROZEN, SYMBOL_OBSERVABLE_READABLE, SYMBOL_OBSERVABLE_WRITABLE, SYMBOL_RESOLVE_UNWRAPPED, SYMBOL_SAMPLED, batch_default as batch, cleanup_default as cleanup, computed_default2 as computed, context_default as context, oby_default as default, disposed_default as disposed, effect_default2 as effect, error_default as error, for_default as for, for_index_default as forIndex, get_default as get, if_default as if, is_observable_default as isObservable, is_store_default as isStore, observable_default2 as observable, off_default as off, on_default as on, reaction_default2 as reaction, readonly_default as readonly, resolve_default as resolve, root_default2 as root, sample_default as sample, selector_default as selector, store_default as store, suspense_default2 as suspense, switch_default as switch, ternary_default as ternary, try_catch_default as tryCatch, with_default as with };
//# sourceMappingURL=oby.js.map

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbGF6eS5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvdXRpbHMuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L29iamVjdHMvb2JzZXJ2ZXIuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L29iamVjdHMvc3VwZXJyb290LmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9jb25zdGFudHMuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvYmF0Y2guanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvY2xlYW51cC5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3Qvb2JqZWN0cy9jYWxsYWJsZS5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3Qvb2JqZWN0cy9jb21wdXRhdGlvbi5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3Qvb2JqZWN0cy9vYnNlcnZhYmxlLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9vYmplY3RzL2NvbXB1dGVkLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL2NvbXB1dGVkLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL2NvbnRleHQuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvZGlzcG9zZWQuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc3VzcGVuZGVkLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9vYmplY3RzL3JlYWN0aW9uLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9vYmplY3RzL2VmZmVjdC5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9lZmZlY3QuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvZXJyb3IuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvaXNfc3RvcmUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc2FtcGxlLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL3Jlc29sdmUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc3VzcGVuZGFibGUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L29iamVjdHMvcm9vdC5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9mb3IuY2FjaGUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvZm9yLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL2lzX29ic2VydmFibGUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvZ2V0LmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL2Zvcl9pbmRleC5jYWNoZS5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9mb3JfaW5kZXguanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvYm9vbGVhbi5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9zd2l0Y2guanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvdGVybmFyeS5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9pZi5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy90YXJnZXQuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvb2ZmLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL29uLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL3JlYWN0aW9uLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL3JlYWRvbmx5LmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL3Jvb3QuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc2VsZWN0b3IuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc3RvcmUuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L29iamVjdHMvc3VzcGVuc2UuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvc3VzcGVuc2UuanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvdHJ5X2NhdGNoLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9tZXRob2RzL3dpdGguanMiLCIuLi8ucG5wbS9vYnlAOS4yLjAvbm9kZV9tb2R1bGVzL29ieS9kaXN0L21ldGhvZHMvJC5qcyIsIi4uLy5wbnBtL29ieUA5LjIuMC9ub2RlX21vZHVsZXMvb2J5L2Rpc3QvbWV0aG9kcy9vYnNlcnZhYmxlLmpzIiwiLi4vLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9pbmRleC5qcyIsImRlcDpvYnkiXSwic291cmNlc0NvbnRlbnQiOlsiLyogSU1QT1JUICovXG4vKiBNQUlOICovXG5jb25zdCBsYXp5QXJyYXlFYWNoID0gKGFyciwgQikgPT4ge1xuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBhcnIuZm9yRWFjaChCKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXJyKSB7XG4gICAgICAgIEIoYXJyKTtcbiAgICB9XG59O1xuY29uc3QgbGF6eUFycmF5UHVzaCA9IChvYmosIEMsIEQpID0+IHtcbiAgICBjb25zdCBhcnIgPSBvYmpbQ107XG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGFyci5wdXNoKEQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhcnIpIHtcbiAgICAgICAgb2JqW0NdID0gW2FyciwgRF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmpbQ10gPSBEO1xuICAgIH1cbn07XG5jb25zdCBsYXp5U2V0QWRkID0gKG9iaiwgQywgRCkgPT4ge1xuICAgIGNvbnN0IHNldCA9IG9ialtDXTtcbiAgICBpZiAoc2V0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIHNldC5hZGQoRCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNldCkge1xuICAgICAgICBjb25zdCBzID0gbmV3IFNldCgpO1xuICAgICAgICBzLmFkZChzZXQpO1xuICAgICAgICBzLmFkZChEKTtcbiAgICAgICAgb2JqW0NdID0gcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9ialtDXSA9IEQ7XG4gICAgfVxufTtcbmNvbnN0IGxhenlTZXREZWxldGUgPSAob2JqLCBDLCBEKSA9PiB7XG4gICAgY29uc3Qgc2V0ID0gb2JqW0NdO1xuICAgIGlmIChzZXQgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgc2V0LmRlbGV0ZShEKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2V0ID09PSBEKSB7XG4gICAgICAgIG9ialtDXSA9IHVuZGVmaW5lZDtcbiAgICB9XG59O1xuY29uc3QgbGF6eVNldEVhY2ggPSAoc2V0LCBCKSA9PiB7XG4gICAgaWYgKHNldCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICBmb3IgKGNvbnN0IEQgb2Ygc2V0KSB7XG4gICAgICAgICAgICBCKEQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNldCkge1xuICAgICAgICBCKHNldCk7XG4gICAgfVxufTtcbmNvbnN0IGxhenlTZXRIYXMgPSAoc2V0LCBEKSA9PiB7XG4gICAgaWYgKHNldCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXR1cm4gc2V0LmhhcyhEKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXQgPT09IEQ7XG4gICAgfVxufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IHsgbGF6eUFycmF5RWFjaCwgbGF6eUFycmF5UHVzaCB9O1xuZXhwb3J0IHsgbGF6eVNldEFkZCwgbGF6eVNldERlbGV0ZSwgbGF6eVNldEVhY2gsIGxhenlTZXRIYXMgfTtcbiIsIi8qIEhFTFBFUlMgKi9cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGU7XG4vKiBNQUlOICovXG5jb25zdCBjYXN0RXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKTtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdVbmtub3duIGVycm9yJyk7XG59O1xuY29uc3QgaXNGdW5jdGlvbiA9IChEKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBEID09PSAnZnVuY3Rpb24nO1xufTtcbmNvbnN0IGlzRnVuY3Rpb25Bc3luYyA9IChEKSA9PiB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoRCkgPT09ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJztcbn07XG5jb25zdCBpc09iamVjdCA9IChEKSA9PiB7XG4gICAgcmV0dXJuIChEICE9PSBudWxsKSAmJiAodHlwZW9mIEQgPT09ICdvYmplY3QnKTtcbn07XG5jb25zdCBtYXggPSAoYSwgYikgPT4ge1xuICAgIHJldHVybiBNYXRoLm1heChhLCBiKTsgLy9UU0Ncbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCB7IGNhc3RFcnJvciwgaXNGdW5jdGlvbiwgaXNGdW5jdGlvbkFzeW5jLCBpc09iamVjdCwgbWF4IH07XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBTQU1QTElORyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBsYXp5QXJyYXlFYWNoLCBsYXp5QXJyYXlQdXNoLCBsYXp5U2V0QWRkLCBsYXp5U2V0RGVsZXRlIH0gZnJvbSAnLi4vbGF6eS5qcyc7XG5pbXBvcnQgeyBjYXN0RXJyb3IgfSBmcm9tICcuLi91dGlscy5qcyc7XG4vKiBNQUlOICovXG4vL1RPRE86IFRocm93IHdoZW4gcmVnaXN0ZXJpbmcgc3R1ZmYgQUMgZGlzcG9zaW5nLCBtYWlubHkgcmVsZXZhbnQgd2hlbiBBRCBhcmUgdXNlZFxuY2xhc3MgT2JzZXJ2ZXIge1xuICAgIC8qIFJFR0lTVFJBVElPTiBBUEkgKi9cbiAgICBBRShjbGVhbnVwKSB7XG4gICAgICAgIGxhenlBcnJheVB1c2godGhpcywgJ0E0JywgY2xlYW51cCk7XG4gICAgfVxuICAgIEFGKHN5bWJvbCwgRCkge1xuICAgICAgICB0aGlzLkFHIHx8ICh0aGlzLkFHID0ge30pO1xuICAgICAgICB0aGlzLkFHW3N5bWJvbF0gPSBEO1xuICAgIH1cbiAgICBBSChlcnJvcikge1xuICAgICAgICBsYXp5QXJyYXlQdXNoKHRoaXMsICdBSScsIGVycm9yKTtcbiAgICB9XG4gICAgQTgob2JzZXJ2YWJsZSkge1xuICAgICAgICBsYXp5QXJyYXlQdXNoKHRoaXMsICdBMycsIG9ic2VydmFibGUpO1xuICAgIH1cbiAgICBUKG9ic2VydmVyKSB7XG4gICAgICAgIGxhenlBcnJheVB1c2godGhpcywgJ0EyJywgb2JzZXJ2ZXIpO1xuICAgIH1cbiAgICBBSihyb290KSB7XG4gICAgICAgIGxhenlTZXRBZGQodGhpcywgJ0FEJywgcm9vdCk7XG4gICAgfVxuICAgIEFLKHJvb3QpIHtcbiAgICAgICAgbGF6eVNldERlbGV0ZSh0aGlzLCAnQUQnLCByb290KTtcbiAgICB9XG4gICAgLyogQVBJICovXG4gICAgY29udGV4dChzeW1ib2wpIHtcbiAgICAgICAgY29uc3QgeyBBRywgSyB9ID0gdGhpcztcbiAgICAgICAgaWYgKEFHICYmIHN5bWJvbCBpbiBBRylcbiAgICAgICAgICAgIHJldHVybiBBR1tzeW1ib2xdO1xuICAgICAgICByZXR1cm4gSyA9PT0gbnVsbCB8fCBLID09PSB2b2lkIDAgPyB2b2lkIDAgOiBLLmNvbnRleHQoc3ltYm9sKTtcbiAgICB9XG4gICAgVShkZWVwLCBpbW1lZGlhdGUpIHtcbiAgICAgICAgY29uc3QgeyBBMiwgQTMsIEE0LCBBSSwgQUcgfSA9IHRoaXM7XG4gICAgICAgIGlmIChBMikge1xuICAgICAgICAgICAgdGhpcy5BMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGxhenlBcnJheUVhY2goQTIsIG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5VKHRydWUsIGltbWVkaWF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQTMpIHtcbiAgICAgICAgICAgIHRoaXMuQTMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgbGF6eUFycmF5RWFjaChBMywgb2JzZXJ2YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JzZXJ2YWJsZS5kaXNwb3NlZCAmJiAhb2JzZXJ2YWJsZS5MLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLkFBKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFMID0gQTM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEE0KSB7XG4gICAgICAgICAgICB0aGlzLkE0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5TID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhenlBcnJheUVhY2goQTQsIGNsZWFudXAgPT4gY2xlYW51cC5jYWxsKGNsZWFudXApKTtcbiAgICAgICAgICAgIHRoaXMuUyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBSSkge1xuICAgICAgICAgICAgdGhpcy5BSSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQUcpIHtcbiAgICAgICAgICAgIHRoaXMuQUcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQTAoKSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLkFMO1xuICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy5BMztcbiAgICAgICAgaWYgKCFwcmV2KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLkFMID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAocHJldiA9PT0gbmV4dClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgYSA9IChwcmV2IGluc3RhbmNlb2YgQXJyYXkpID8gcHJldiA6IFtwcmV2XTtcbiAgICAgICAgY29uc3QgYiA9IChuZXh0IGluc3RhbmNlb2YgQXJyYXkpID8gbmV4dCA6IFtuZXh0XTtcbiAgICAgICAgb3V0ZXI6IGZvciAobGV0IGFpID0gMCwgYWwgPSBhLmxlbmd0aDsgYWkgPCBhbDsgYWkrKykgeyAvLyBVbmxpbmtpbmcgZnJvbSBwcmV2aW91cyBBMyB3aGljaCBhcmUgbm90IG5leHQgQTMgdG9vXG4gICAgICAgICAgICBjb25zdCBhdiA9IGFbYWldO1xuICAgICAgICAgICAgaWYgKGF2LmRpc3Bvc2VkIHx8IGF2LkwuZGlzcG9zZWQpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYXYgPT09IGJbYWldKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgYmkgPSAwLCBibCA9IGIubGVuZ3RoOyBiaSA8IGJsOyBiaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF2ID09PSBiW2JpXSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdi5BQSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlcnJvcihlcnJvciwgc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IHsgQUksIEsgfSA9IHRoaXM7XG4gICAgICAgIGlmIChBSSkge1xuICAgICAgICAgICAgbGF6eUFycmF5RWFjaChBSSwgQiA9PiBCLmNhbGwoQiwgZXJyb3IpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKEsgPT09IG51bGwgfHwgSyA9PT0gdm9pZCAwID8gdm9pZCAwIDogSy5lcnJvcihlcnJvciwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgVihCKSB7XG4gICAgICAgIGNvbnN0IG93bmVyUHJldiA9IE9XTkVSLkE7XG4gICAgICAgIGNvbnN0IHNhbXBsaW5nUHJldiA9IFNBTVBMSU5HLkE7XG4gICAgICAgIE9XTkVSLkEgPSB0aGlzO1xuICAgICAgICBTQU1QTElORy5BID0gZmFsc2U7XG4gICAgICAgIGxldCBBTTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEFNID0gQigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvcihjYXN0RXJyb3IoZXJyb3IpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBPV05FUi5BID0gb3duZXJQcmV2O1xuICAgICAgICAgICAgU0FNUExJTkcuQSA9IHNhbXBsaW5nUHJldjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQU07XG4gICAgfVxufVxuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBPYnNlcnZlcjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4vb2JzZXJ2ZXIuanMnO1xuLyogTUFJTiAqL1xuY2xhc3MgU3VwZXJSb290IGV4dGVuZHMgT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiBWQVJJQUJMRVMgKi9cbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbn1cbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgU3VwZXJSb290O1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgU3VwZXJSb290IGZyb20gJy4vb2JqZWN0cy9zdXBlcnJvb3QuanMnO1xuLyogTUFJTiAqL1xuY29uc3QgQkFUQ0ggPSB7IEE6IHVuZGVmaW5lZCB9O1xuY29uc3QgRkFMU0UgPSAoKSA9PiBmYWxzZTtcbmNvbnN0IElTID0gT2JqZWN0LmlzO1xuY29uc3QgTk9PUCA9ICgpID0+IHsgfTtcbmNvbnN0IFNVUEVSX09XTkVSID0gbmV3IFN1cGVyUm9vdCgpO1xuY29uc3QgT1dORVIgPSB7IEE6IFNVUEVSX09XTkVSIH07XG5jb25zdCBST09UID0geyBBOiBTVVBFUl9PV05FUiB9O1xuY29uc3QgU0FNUExJTkcgPSB7IEE6IGZhbHNlIH07XG5jb25zdCBTVVNQRU5TRSA9IHsgQTogdW5kZWZpbmVkIH07XG5jb25zdCBTVVNQRU5TRV9FTkFCTEVEID0geyBBOiBmYWxzZSB9O1xuY29uc3QgU1lNQk9MX09CU0VSVkFCTEUgPSBTeW1ib2woJ09ic2VydmFibGUnKTtcbmNvbnN0IFNZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTiA9IFN5bWJvbCgnRnJvemVuJyk7XG5jb25zdCBTWU1CT0xfT0JTRVJWQUJMRV9SRUFEQUJMRSA9IFN5bWJvbCgnUmVhZGFibGUnKTtcbmNvbnN0IFNZTUJPTF9PQlNFUlZBQkxFX1dSSVRBQkxFID0gU3ltYm9sKCdXcml0YWJsZScpO1xuY29uc3QgU1lNQk9MX1JFU09MVkVfVU5XUkFQUEVEID0gU3ltYm9sKCdVbndyYXBwZWQnKTtcbmNvbnN0IFNZTUJPTF9TQU1QTEVEID0gU3ltYm9sKCdTYW1wbGVkJyk7XG5jb25zdCBTWU1CT0xfU1RPUkUgPSBTeW1ib2woJ1N0b3JlJyk7XG5jb25zdCBTWU1CT0xfU1RPUkVfVEFSR0VUID0gU3ltYm9sKCdUYXJnZXQnKTtcbmNvbnN0IFNZTUJPTF9TVE9SRV9WQUxVRVMgPSBTeW1ib2woJ1ZhbHVlcycpO1xuY29uc3QgU1lNQk9MX1NVU1BFTlNFID0gU3ltYm9sKCdTdXNwZW5zZScpO1xuY29uc3QgVFJVRSA9ICgpID0+IHRydWU7XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCB7IEJBVENILCBGQUxTRSwgSVMsIE5PT1AsIFNVUEVSX09XTkVSLCBPV05FUiwgUk9PVCwgU0FNUExJTkcsIFNVU1BFTlNFLCBTVVNQRU5TRV9FTkFCTEVELCBTWU1CT0xfT0JTRVJWQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOLCBTWU1CT0xfT0JTRVJWQUJMRV9SRUFEQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfV1JJVEFCTEUsIFNZTUJPTF9SRVNPTFZFX1VOV1JBUFBFRCwgU1lNQk9MX1NBTVBMRUQsIFNZTUJPTF9TVE9SRSwgU1lNQk9MX1NUT1JFX1RBUkdFVCwgU1lNQk9MX1NUT1JFX1ZBTFVFUywgU1lNQk9MX1NVU1BFTlNFLCBUUlVFIH07XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IEJBVENIIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy5qcyc7XG4vKiBIRUxQRVJTICovXG5jb25zdCBmbHVzaCA9IChELCBvYnNlcnZhYmxlKSA9PiBvYnNlcnZhYmxlLkcoRCk7XG5jb25zdCBPID0gKEQsIG9ic2VydmFibGUpID0+IG9ic2VydmFibGUuTyhmYWxzZSk7XG5jb25zdCBQID0gKEQsIG9ic2VydmFibGUpID0+IG9ic2VydmFibGUuUChmYWxzZSk7XG5mdW5jdGlvbiBiYXRjaChCKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oQikpIHtcbiAgICAgICAgaWYgKEJBVENILkEpIHsgLy8gQWxyZWFkeSBiYXRjaGluZ1xuICAgICAgICAgICAgcmV0dXJuIEIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gU3RhcnRpbmcgYmF0Y2hpbmdcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoID0gQkFUQ0guQSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIEJBVENILkEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGJhdGNoLnNpemUgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhdGNoLmZvckVhY2goTyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGJhdGNoLmZvckVhY2goZmx1c2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdGNoLnNpemUgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaC5mb3JFYWNoKFApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQjtcbiAgICB9XG59XG47XG4vKiBNQUlOICovXG5leHBvcnQgZGVmYXVsdCBiYXRjaDtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgT1dORVIsIFNVUEVSX09XTkVSIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IGNsZWFudXAgPSAoQikgPT4ge1xuICAgIGlmIChPV05FUi5BID09PSBTVVBFUl9PV05FUilcbiAgICAgICAgcmV0dXJuO1xuICAgIE9XTkVSLkEuQUUoQik7XG59O1xuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBjbGVhbnVwO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBTWU1CT0xfT0JTRVJWQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOLCBTWU1CT0xfT0JTRVJWQUJMRV9SRUFEQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfV1JJVEFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIEhFTFBFUlMgKi9cbmNvbnN0IHsgYmluZCwgcHJvdG90eXBlIH0gPSBGdW5jdGlvbjtcbmNvbnN0IHsgc2V0UHJvdG90eXBlT2YgfSA9IE9iamVjdDtcbmZ1bmN0aW9uIGZyb3plbkZ1bmN0aW9uKHN5bWJvbCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgcmVhZG9ubHkgT2JzZXJ2YWJsZSBjYW4gbm90IGJlIHVwZGF0ZWQnKTtcbiAgICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHJlYWRhYmxlRnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHN5bWJvbCA9PT0gU1lNQk9MX09CU0VSVkFCTEUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHJlYWRvbmx5IE9ic2VydmFibGUgY2FuIG5vdCBiZSB1cGRhdGVkJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLkUoKTtcbn1cbmZ1bmN0aW9uIHdyaXRhYmxlRnVuY3Rpb24oQikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChCID09PSBTWU1CT0xfT0JTRVJWQUJMRSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihCKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkYoQik7IC8vVFNDXG4gICAgICAgIHJldHVybiB0aGlzLkcoQik7IC8vVFNDXG4gICAgfVxuICAgIHJldHVybiB0aGlzLkUoKTtcbn1cbmNvbnN0IGZyb3plblByb3RvdHlwZSA9IHNldFByb3RvdHlwZU9mKHsgW1NZTUJPTF9PQlNFUlZBQkxFXTogdHJ1ZSwgW1NZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTl06IHRydWUgfSwgcHJvdG90eXBlKTtcbmNvbnN0IHJlYWRhYmxlUHJvdG90eXBlID0gc2V0UHJvdG90eXBlT2YoeyBbU1lNQk9MX09CU0VSVkFCTEVdOiB0cnVlLCBbU1lNQk9MX09CU0VSVkFCTEVfUkVBREFCTEVdOiB0cnVlIH0sIHByb3RvdHlwZSk7XG5jb25zdCB3cml0YWJsZVByb3RvdHlwZSA9IHNldFByb3RvdHlwZU9mKHsgW1NZTUJPTF9PQlNFUlZBQkxFXTogdHJ1ZSwgW1NZTUJPTF9PQlNFUlZBQkxFX1dSSVRBQkxFXTogdHJ1ZSB9LCBwcm90b3R5cGUpO1xuc2V0UHJvdG90eXBlT2YoZnJvemVuRnVuY3Rpb24sIGZyb3plblByb3RvdHlwZSk7XG5zZXRQcm90b3R5cGVPZihyZWFkYWJsZUZ1bmN0aW9uLCByZWFkYWJsZVByb3RvdHlwZSk7XG5zZXRQcm90b3R5cGVPZih3cml0YWJsZUZ1bmN0aW9uLCB3cml0YWJsZVByb3RvdHlwZSk7XG5jb25zdCBIID0gYmluZC5iaW5kKGZyb3plbkZ1bmN0aW9uKTsgLy9UU0NcbmNvbnN0IEkgPSBiaW5kLmJpbmQocmVhZGFibGVGdW5jdGlvbik7IC8vVFNDXG5jb25zdCBKID0gYmluZC5iaW5kKHdyaXRhYmxlRnVuY3Rpb24pOyAvL1RTQ1xuLyogRVhQT1JUICovXG5leHBvcnQgeyBILCBJLCBKIH07XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBST09UIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuL29ic2VydmVyLmpzJztcbmltcG9ydCB7IGlzRnVuY3Rpb25Bc3luYyB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbmNsYXNzIENvbXB1dGF0aW9uIGV4dGVuZHMgT2JzZXJ2ZXIge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoQikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKiBWQVJJQUJMRVMgKi9cbiAgICAgICAgdGhpcy5LID0gT1dORVIuQTtcbiAgICAgICAgdGhpcy5MID0gT1dORVIuQS5MIHx8IFJPT1QuQTtcbiAgICAgICAgdGhpcy5NID0gMDsgLy8gVGhlIE4gaXMgaW5jcmVtZW50ZWQgb24gTyBtZXNzYWdlcyBhbmQgZGVjcmVtZW50ZWQgb24gUCBtZXNzYWdlc1xuICAgICAgICB0aGlzLlEgPSAwOyAvLyAwOiBTTEVFUElORywgMTogRVhFQ1VUSU5HLCAyOiBQRU5ESU5HX05PX0ZSRVNILCAzOiBQRU5ESU5HX0ZSRVNIXG4gICAgICAgIHRoaXMuUiA9IGZhbHNlO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbkFzeW5jKEIpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGNvbXB1dGF0aW9uIGlzIGZvcmJpZGRlbiBmcm9tIGV4ZWN1dGluZyBhbiBhc3luYyBmdW5jdGlvbicpO1xuICAgIH1cbiAgICAvKiBBUEkgKi9cbiAgICBPKGZyZXNoKSB7XG4gICAgICAgIHRoaXMuTSArPSAxO1xuICAgICAgICB0aGlzLlIgfHwgKHRoaXMuUiA9IGZyZXNoKTtcbiAgICB9XG4gICAgUChmcmVzaCkge1xuICAgICAgICBpZiAoIXRoaXMuTSlcbiAgICAgICAgICAgIHJldHVybjsgLy8gVGhlIGNvbXB1dGF0aW9uIHVwZGF0ZWQgaXRzZWxmIGFscmVhZHlcbiAgICAgICAgdGhpcy5NIC09IDE7XG4gICAgICAgIHRoaXMuUiB8fCAodGhpcy5SID0gZnJlc2gpO1xuICAgICAgICBpZiAodGhpcy5NKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmcmVzaCA9IHRoaXMuUjtcbiAgICAgICAgdGhpcy5SID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLlMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuRihmcmVzaCk7XG4gICAgfVxuICAgIEYoZnJlc2gpIHsgfVxufVxuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBDb21wdXRhdGlvbjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgQkFUQ0gsIEZBTFNFLCBJUywgT1dORVIsIFJPT1QsIFNBTVBMSU5HIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGxhenlTZXRBZGQsIGxhenlTZXREZWxldGUsIGxhenlTZXRIYXMgfSBmcm9tICcuLi9sYXp5LmpzJztcbmltcG9ydCBDb21wdXRhdGlvbiBmcm9tICcuL2NvbXB1dGF0aW9uLmpzJztcbi8qIE1BSU4gKi9cbmNsYXNzIE9ic2VydmFibGUge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoRCwgb3B0aW9ucywgSykge1xuICAgICAgICB0aGlzLkwgPSBPV05FUi5BLkwgfHwgUk9PVC5BO1xuICAgICAgICB0aGlzLkQgPSBEO1xuICAgICAgICBpZiAoSykge1xuICAgICAgICAgICAgdGhpcy5LID0gSztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lcXVhbHMpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXF1YWxzID0gb3B0aW9ucy5lcXVhbHMgfHwgRkFMU0U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogUkVHSVNUUkFUSU9OIEFQSSAqL1xuICAgIEE1KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLmNhbGwobGlzdGVuZXIsIHRoaXMuRCk7XG4gICAgICAgIGlmIChsYXp5U2V0SGFzKHRoaXMuQTYsIGxpc3RlbmVyKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGF6eVNldEFkZCh0aGlzLCAnQTYnLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIFQob2JzZXJ2ZXIpIHtcbiAgICAgICAgbGF6eVNldEFkZCh0aGlzLCAnQTInLCBvYnNlcnZlcik7XG4gICAgfVxuICAgIEE3KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VkIHx8IHRoaXMuTC5kaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFTQU1QTElORy5BICYmIE9XTkVSLkEgaW5zdGFuY2VvZiBDb21wdXRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5UKE9XTkVSLkEpO1xuICAgICAgICAgICAgT1dORVIuQS5BOCh0aGlzKTsgLy9UU0NcbiAgICAgICAgfVxuICAgICAgICBpZiAoKF9hID0gdGhpcy5LKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuTSkgeyAvLyBQb3RlbnRpYWxseSBPIEQsIGZvcmNpbmcgYSByZWZyZXNoXG4gICAgICAgICAgICB0aGlzLksuTSA9IDA7XG4gICAgICAgICAgICB0aGlzLksuUiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5LLkYodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQTkobGlzdGVuZXIpIHtcbiAgICAgICAgbGF6eVNldERlbGV0ZSh0aGlzLCAnQTYnLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIEFBKG9ic2VydmVyKSB7XG4gICAgICAgIGxhenlTZXREZWxldGUodGhpcywgJ0EyJywgb2JzZXJ2ZXIpO1xuICAgIH1cbiAgICAvKiBBUEkgKi9cbiAgICBFKCkge1xuICAgICAgICB0aGlzLkE3KCk7XG4gICAgICAgIHJldHVybiB0aGlzLkQ7XG4gICAgfVxuICAgIEcoRCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBkaXNwb3NlZCBPYnNlcnZhYmxlIGNhbiBub3QgYmUgdXBkYXRlZCcpO1xuICAgICAgICBpZiAoQkFUQ0guQSkge1xuICAgICAgICAgICAgQkFUQ0guQS5zZXQodGhpcywgRCk7XG4gICAgICAgICAgICByZXR1cm4gRDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVxdWFscyA9IHRoaXMuZXF1YWxzIHx8IElTO1xuICAgICAgICAgICAgY29uc3QgZnJlc2ggPSAhZXF1YWxzKEQsIHRoaXMuRCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuSykge1xuICAgICAgICAgICAgICAgIGlmICghZnJlc2gpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5MLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTyhmcmVzaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZyZXNoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVQcmV2ID0gdGhpcy5EO1xuICAgICAgICAgICAgICAgIHRoaXMuRCA9IEQ7XG4gICAgICAgICAgICAgICAgdGhpcy5BQih2YWx1ZVByZXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLkwuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLlAoZnJlc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRihCKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlTmV4dCA9IEIodGhpcy5EKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuRyh2YWx1ZU5leHQpO1xuICAgIH1cbiAgICBBQih2YWx1ZVByZXYpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcG9zZWQgfHwgdGhpcy5MLmRpc3Bvc2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB7IEE2IH0gPSB0aGlzO1xuICAgICAgICBpZiAoQTYpIHtcbiAgICAgICAgICAgIGlmIChBNiBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQTYpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbChsaXN0ZW5lciwgdGhpcy5ELCB2YWx1ZVByZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEE2LmNhbGwoQTYsIHRoaXMuRCwgdmFsdWVQcmV2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBPKGZyZXNoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VkIHx8IHRoaXMuTC5kaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgY29tcHV0YXRpb25zID0gdGhpcy5BMjsgLy9UU0NcbiAgICAgICAgaWYgKGNvbXB1dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKGNvbXB1dGF0aW9ucyBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29tcHV0YXRpb24gb2YgY29tcHV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGF0aW9uLk8oZnJlc2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXB1dGF0aW9ucy5PKGZyZXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQKGZyZXNoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VkIHx8IHRoaXMuTC5kaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgY29tcHV0YXRpb25zID0gdGhpcy5BMjsgLy9UU0NcbiAgICAgICAgaWYgKGNvbXB1dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKGNvbXB1dGF0aW9ucyBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29tcHV0YXRpb24gb2YgY29tcHV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGF0aW9uLlAoZnJlc2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXB1dGF0aW9ucy5QKGZyZXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBVKCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG59XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGU7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCBDb21wdXRhdGlvbiBmcm9tICcuL2NvbXB1dGF0aW9uLmpzJztcbmltcG9ydCBPYnNlcnZhYmxlIGZyb20gJy4vb2JzZXJ2YWJsZS5qcyc7XG5pbXBvcnQgeyBjYXN0RXJyb3IsIG1heCB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbmNsYXNzIENvbXB1dGVkIGV4dGVuZHMgQ29tcHV0YXRpb24ge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoQiwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihCKTtcbiAgICAgICAgdGhpcy5CID0gQjtcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUodW5kZWZpbmVkLCBvcHRpb25zLCB0aGlzKTsgLy9UU0NcbiAgICAgICAgdGhpcy5LLlQodGhpcyk7XG4gICAgICAgIHRoaXMuRih0cnVlKTtcbiAgICB9XG4gICAgLyogQVBJICovXG4gICAgVShkZWVwLCBpbW1lZGlhdGUpIHtcbiAgICAgICAgaWYgKGRlZXAgJiYgIXRoaXMuTC5kaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZhYmxlLlUoKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5VKGRlZXAsIGltbWVkaWF0ZSk7XG4gICAgfVxuICAgIE8oZnJlc2gpIHtcbiAgICAgICAgaWYgKCF0aGlzLk0pIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2YWJsZS5PKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5PKGZyZXNoKTtcbiAgICB9XG4gICAgRihmcmVzaCkge1xuICAgICAgICBpZiAoZnJlc2ggJiYgIXRoaXMub2JzZXJ2YWJsZS5kaXNwb3NlZCAmJiAhdGhpcy5vYnNlcnZhYmxlLkwuZGlzcG9zZWQpIHsgLy8gVGhlIHJlc3VsdGluZyBEIG1pZ2h0IGNoYW5nZVxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5RO1xuICAgICAgICAgICAgaWYgKHN0YXR1cykgeyAvLyBDdXJyZW50bHkgZXhlY3V0aW5nIG9yIHBlbmRpbmdcbiAgICAgICAgICAgICAgICB0aGlzLlEgPSBmcmVzaCA/IDMgOiBtYXgoc3RhdHVzLCAyKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmFibGUuUChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIEN1cnJlbnRseSBzbGVlcGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuUSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5VKCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgRCA9IHRoaXMuVih0aGlzLkIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkEwKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ic2VydmFibGUuZGlzcG9zZWQgfHwgdGhpcy5vYnNlcnZhYmxlLkwuZGlzcG9zZWQpIHsgLy8gTWF5YmUgYSBjb21wdXRlZCBkaXNwb3NlZCBvZiBpdHNlbGYgdmlhIGEgcm9vdCBBMSByZXR1cm5pbmcsIG9yIGNhdXNlZCBpdHNlbGYgdG8gcmUtZXhlY3V0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZhYmxlLlAoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZhYmxlLkcoRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkEyICYmICF0aGlzLkEzICYmICF0aGlzLkE0KSB7IC8vIEF1dG8tZGlzcG9zYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5VKHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkEwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoY2FzdEVycm9yKGVycm9yKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmFibGUuUChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLlE7IC8vVFNDXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkYoc3RhdHVzID09PSAzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gVGhlIHJlc3VsdGluZyBEIGNvdWxkL3Nob3VsZCBub3QgcG9zc2libHkgY2hhbmdlXG4gICAgICAgICAgICB0aGlzLm9ic2VydmFibGUuUChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVkO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBILCBJIH0gZnJvbSAnLi4vb2JqZWN0cy9jYWxsYWJsZS5qcyc7XG5pbXBvcnQgQ29tcHV0ZWQgZnJvbSAnLi4vb2JqZWN0cy9jb21wdXRlZC5qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSBmcm9tICcuLi9vYmplY3RzL29ic2VydmFibGUuanMnO1xuLyogSEVMUEVSUyAqL1xuY29uc3QgRFVNTVlfRk4gPSAoKSA9PiB7IH07XG5jb25zdCBEVU1NWV9PQlNFUlZBQkxFID0gbmV3IE9ic2VydmFibGUodW5kZWZpbmVkKTtcbi8qIE1BSU4gKi9cbmNvbnN0IGNvbXB1dGVkID0gKEIsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyBDb21wdXRlZChCLCBvcHRpb25zKTtcbiAgICBjb25zdCB7IG9ic2VydmFibGUgfSA9IGNvbXB1dGVkO1xuICAgIGlmICghY29tcHV0ZWQuQTMpIHsgLy8gSXQgY2FuIG5ldmVyIHJ1biBhZ2FpbiwgZnJlZWluZyB1cCBzb21lIG1lbW9yeSBhbmQgcmV0dXJuaW5nIGEgY2hlYXBlciBIIG9ic2VydmFibGVcbiAgICAgICAgY29tcHV0ZWQuQiA9IERVTU1ZX0ZOO1xuICAgICAgICBjb21wdXRlZC5vYnNlcnZhYmxlID0gRFVNTVlfT0JTRVJWQUJMRTtcbiAgICAgICAgcmV0dXJuIEgob2JzZXJ2YWJsZS5EKTtcbiAgICB9XG4gICAgZWxzZSB7IC8vIEl0IGNvdWxkIHJ1biBhZ2FpbiwgcmV0dXJuaW5nIGEgcmVndWxhciBJIG9ic2VydmFibGVcbiAgICAgICAgcmV0dXJuIEkob2JzZXJ2YWJsZSk7XG4gICAgfVxufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZWQ7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmZ1bmN0aW9uIGNvbnRleHQoc3ltYm9sLCBEKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7IC8vIFJlYWRcbiAgICAgICAgcmV0dXJuIE9XTkVSLkEuY29udGV4dChzeW1ib2wpO1xuICAgIH1cbiAgICBlbHNlIHsgLy8gV3JpdGVcbiAgICAgICAgcmV0dXJuIE9XTkVSLkEuQUYoc3ltYm9sLCBEKTtcbiAgICB9XG59XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IGNvbnRleHQ7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCBjbGVhbnVwIGZyb20gJy4vY2xlYW51cC5qcyc7XG5pbXBvcnQgeyBJIH0gZnJvbSAnLi4vb2JqZWN0cy9jYWxsYWJsZS5qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSBmcm9tICcuLi9vYmplY3RzL29ic2VydmFibGUuanMnO1xuLyogTUFJTiAqL1xuY29uc3QgZGlzcG9zZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKGZhbHNlKTtcbiAgICBjbGVhbnVwKCgpID0+IHtcbiAgICAgICAgb2JzZXJ2YWJsZS5HKHRydWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBJKG9ic2VydmFibGUpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgZGlzcG9zZWQ7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBTVVNQRU5TRSwgU1VTUEVOU0VfRU5BQkxFRCwgU1lNQk9MX1NVU1BFTlNFIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IEFOID0gKCkgPT4ge1xuICAgIGlmICghU1VTUEVOU0VfRU5BQkxFRC5BKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBjb25zdCBzdXNwZW5zZSA9IFNVU1BFTlNFLkEgfHwgT1dORVIuQS5jb250ZXh0KFNZTUJPTF9TVVNQRU5TRSk7XG4gICAgcmV0dXJuIChzdXNwZW5zZSA9PT0gbnVsbCB8fCBzdXNwZW5zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3VzcGVuc2UuQU4pIHx8IDA7XG59O1xuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBBTjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IEFOIGZyb20gJy4uL21ldGhvZHMvc3VzcGVuZGVkLmpzJztcbmltcG9ydCBDb21wdXRhdGlvbiBmcm9tICcuL2NvbXB1dGF0aW9uLmpzJztcbmltcG9ydCB7IGNhc3RFcnJvciwgaXNGdW5jdGlvbiwgbWF4IH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuLyogTUFJTiAqL1xuY2xhc3MgUmVhY3Rpb24gZXh0ZW5kcyBDb21wdXRhdGlvbiB7XG4gICAgLyogQ09OU1RSVUNUT1IgKi9cbiAgICBjb25zdHJ1Y3RvcihCLCBBTykge1xuICAgICAgICBzdXBlcihCKTtcbiAgICAgICAgdGhpcy5CID0gQjtcbiAgICAgICAgdGhpcy5LLlQodGhpcyk7XG4gICAgICAgIGlmIChBTyAmJiBBTigpKSB7XG4gICAgICAgICAgICB0aGlzLk8odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLkYodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogQVBJICovXG4gICAgRihmcmVzaCkge1xuICAgICAgICBpZiAoZnJlc2ggJiYgIXRoaXMuTC5kaXNwb3NlZCkgeyAvLyBTb21ldGhpbmcgbWlnaHQgY2hhbmdlXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLlE7XG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7IC8vIEN1cnJlbnRseSBleGVjdXRpbmcgb3IgcGVuZGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuUSA9IGZyZXNoID8gMyA6IG1heChzdGF0dXMsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIEN1cnJlbnRseSBzbGVlcGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuUSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5VKCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xlYW51cCA9IHRoaXMuVih0aGlzLkIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkEwKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGNsZWFudXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFFKGNsZWFudXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkEyICYmICF0aGlzLkEzICYmICF0aGlzLkE0KSB7IC8vIEF1dG8tZGlzcG9zYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVSh0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BMCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGNhc3RFcnJvcihlcnJvciksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuUTsgLy9UU0NcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5RID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRihzdGF0dXMgPT09IDMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBSZWFjdGlvbjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IFJlYWN0aW9uIGZyb20gJy4vcmVhY3Rpb24uanMnO1xuLyogTUFJTiAqL1xuY2xhc3MgRWZmZWN0IGV4dGVuZHMgUmVhY3Rpb24ge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoQikge1xuICAgICAgICBzdXBlcihCLCB0cnVlKTtcbiAgICB9XG59XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IEVmZmVjdDtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgTk9PUCB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgQU4gZnJvbSAnLi9zdXNwZW5kZWQuanMnO1xuaW1wb3J0IEVmZmVjdCBmcm9tICcuLi9vYmplY3RzL2VmZmVjdC5qcyc7XG4vKiBNQUlOICovXG5jb25zdCBlZmZlY3QgPSAoQikgPT4ge1xuICAgIGNvbnN0IGVmZmVjdCA9IG5ldyBFZmZlY3QoQik7XG4gICAgaWYgKCFlZmZlY3QuQTMgJiYgIUFOKCkpIHsgLy8gSXQgY2FuIG5ldmVyIHJ1biBhZ2FpbiwgZnJlZWluZyB1cCBzb21lIG1lbW9yeVxuICAgICAgICBlZmZlY3QuQiA9IE5PT1A7XG4gICAgfVxuICAgIHJldHVybiBlZmZlY3QuVS5iaW5kKGVmZmVjdCwgdHJ1ZSwgdHJ1ZSk7XG59O1xuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBlZmZlY3Q7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IGVycm9yID0gKEIpID0+IHtcbiAgICBPV05FUi5BLkFIKEIpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgZXJyb3I7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IFNZTUJPTF9TVE9SRSB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IGlzU3RvcmUgPSAoRCkgPT4ge1xuICAgIHJldHVybiBpc09iamVjdChEKSAmJiAoU1lNQk9MX1NUT1JFIGluIEQpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgaXNTdG9yZTtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgU0FNUExJTkcgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzLmpzJztcbmZ1bmN0aW9uIHNhbXBsZShCKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oQikpIHtcbiAgICAgICAgaWYgKFNBTVBMSU5HLkEpIHsgLy8gQWxyZWFkeSBzYW1wbGluZ1xuICAgICAgICAgICAgcmV0dXJuIEIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gU3RhcnRpbmcgc2FtcGxpbmdcbiAgICAgICAgICAgIFNBTVBMSU5HLkEgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgU0FNUExJTkcuQSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQjtcbiAgICB9XG59XG47XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IHNhbXBsZTtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgU1lNQk9MX09CU0VSVkFCTEUsIFNZTUJPTF9SRVNPTFZFX1VOV1JBUFBFRCwgU1lNQk9MX1NBTVBMRUQgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGNvbXB1dGVkIGZyb20gJy4vY29tcHV0ZWQuanMnO1xuaW1wb3J0IHsgSCB9IGZyb20gJy4uL29iamVjdHMvY2FsbGFibGUuanMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbi8vVE9ETzogVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgdWdseSwgbWF5YmUgaXQgY2FuIGJlIHdyaXR0ZW4gZGVjZW50bHk/XG5jb25zdCByZXNvbHZlID0gKEQpID0+IHtcbiAgICBpZiAoaXNGdW5jdGlvbihEKSkge1xuICAgICAgICBpZiAoU1lNQk9MX1NBTVBMRUQgaW4gRCkge1xuICAgICAgICAgICAgaWYgKFNZTUJPTF9SRVNPTFZFX1VOV1JBUFBFRCBpbiBEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoRCgpKTsgLy9UU0NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBIKHJlc29sdmUoRCgpKSk7IC8vVFNDXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoU1lNQk9MX09CU0VSVkFCTEUgaW4gRCkge1xuICAgICAgICAgICAgcmV0dXJuIEQ7IC8vVFNDXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gcmVzb2x2ZShEKCkpKTsgLy9UU0NcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoRCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gbmV3IEFycmF5KEQubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZXNvbHZlZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHJlc29sdmVkW2ldID0gcmVzb2x2ZShEW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7IC8vVFNDXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gRDsgLy9UU0NcbiAgICB9XG59O1xuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBPV05FUiwgU1VTUEVOU0UsIFNVU1BFTlNFX0VOQUJMRUQsIFNZTUJPTF9TVVNQRU5TRSB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG4vKiBNQUlOICovXG5jb25zdCBzdXNwZW5kYWJsZSA9ICgpID0+IHtcbiAgICByZXR1cm4gISFTVVNQRU5TRV9FTkFCTEVELkEgJiYgKCEhU1VTUEVOU0UuQSB8fCAhIU9XTkVSLkEuY29udGV4dChTWU1CT0xfU1VTUEVOU0UpKTtcbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IHN1c3BlbmRhYmxlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBPV05FUiwgUk9PVCB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgc3VzcGVuZGFibGUgZnJvbSAnLi4vbWV0aG9kcy9zdXNwZW5kYWJsZS5qcyc7XG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYnNlcnZlci5qcyc7XG4vKiBNQUlOICovXG5jbGFzcyBSb290IGV4dGVuZHMgT2JzZXJ2ZXIge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoQU8pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyogVkFSSUFCTEVTICovXG4gICAgICAgIHRoaXMuSyA9IE9XTkVSLkE7XG4gICAgICAgIGlmIChBTyAmJiBzdXNwZW5kYWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLkFPID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuSy5BSih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBBUEkgKi9cbiAgICBVKGRlZXAsIGltbWVkaWF0ZSkge1xuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuQU8pIHtcbiAgICAgICAgICAgIHRoaXMuSy5BSyh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5VKGRlZXAsIGltbWVkaWF0ZSk7XG4gICAgfVxuICAgIFYoQikge1xuICAgICAgICBjb25zdCBVID0gdGhpcy5VLmJpbmQodGhpcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IGZuV2l0aERpc3Bvc2UgPSBCLmJpbmQodW5kZWZpbmVkLCBVKTtcbiAgICAgICAgY29uc3Qgcm9vdFByZXYgPSBST09ULkE7XG4gICAgICAgIFJPT1QuQSA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuVihmbldpdGhEaXNwb3NlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIFJPT1QuQSA9IHJvb3RQcmV2O1xuICAgICAgICB9XG4gICAgfVxufVxuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBSb290O1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBPV05FUiB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgY2xlYW51cCBmcm9tICcuL2NsZWFudXAuanMnO1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi9yZXNvbHZlLmpzJztcbmltcG9ydCB7IEgsIEkgfSBmcm9tICcuLi9vYmplY3RzL2NhbGxhYmxlLmpzJztcbmltcG9ydCBPYnNlcnZhYmxlIGZyb20gJy4uL29iamVjdHMvb2JzZXJ2YWJsZS5qcyc7XG5pbXBvcnQgUm9vdCBmcm9tICcuLi9vYmplY3RzL3Jvb3QuanMnO1xuLyogSEVMUEVSUyAqL1xuY29uc3QgRFVNTVlfSU5ERVggPSBIKC0xKTtcbmNsYXNzIE1hcHBlZFJvb3QgZXh0ZW5kcyBSb290IHtcbn1cbi8qIE1BSU4gKi9cbmNsYXNzIENhY2hlIHtcbiAgICAvKiBDT05TVFJVQ1RPUiAqL1xuICAgIGNvbnN0cnVjdG9yKEIpIHtcbiAgICAgICAgdGhpcy5BUSA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5BUiA9IGZhbHNlOyAvLyBUaGUgQVIgaXMgZmxpcHBlZCB3aXRoIGVhY2ggaXRlcmF0aW9uLCB0aGUgQUQgdGhhdCBkb24ndCBoYXZlIHRoZSB1cGRhdGVkIG9uZSBhcmUgZGlzcG9zZWQsIGl0J3MgbGlrZSBhIGNoZWFwIGNvdW50ZXIgYmFzaWNhbGx5XG4gICAgICAgIHRoaXMuQVMgPSAwOyAvLyBOdW1iZXIgb2YgcHJldmlvdXMgaXRlbXNcbiAgICAgICAgdGhpcy5BVCA9IDA7IC8vIE51bWJlciBvZiBuZXh0IGl0ZW1zXG4gICAgICAgIHRoaXMuSyA9IE9XTkVSLkE7XG4gICAgICAgIC8qIEFQSSAqL1xuICAgICAgICB0aGlzLmNsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuQVMpXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBUaGVyZSB3YXMgbm90aGluZyBBMSwgbm8gbmVlZCB0byBjbGVhbnVwXG4gICAgICAgICAgICBpZiAoIXRoaXMuQVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuVSgpOyAvLyBUaGVyZSBpcyBub3RoaW5nIEFDLCBxdWlja2x5IGRpc3Bvc2luZ1xuICAgICAgICAgICAgY29uc3QgeyBBUSwgQVIgfSA9IHRoaXM7XG4gICAgICAgICAgICBBUS5mb3JFYWNoKChtYXBwZWQsIEQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobWFwcGVkLkFSID09PSBBUilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG1hcHBlZC5VKHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFRLmRlbGV0ZShEKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLlUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLksuQUsodGhpcy5BRCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuQVEuc2l6ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIE5vdGhpbmcgdG8gVSBvZlxuICAgICAgICAgICAgdGhpcy5BUS5mb3JFYWNoKG1hcHBlZCA9PiB7XG4gICAgICAgICAgICAgICAgbWFwcGVkLlUodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuQVEgPSBuZXcgTWFwKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuQTEgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkFSID0gIXRoaXMuQVI7XG4gICAgICAgICAgICB0aGlzLkFUID0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5BQyA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQVQgPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLkFTID0gdGhpcy5BVDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tYXAgPSAoRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHsgQVEsIEFSLCBCLCBBVSB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZCA9IEFRLmdldChEKTtcbiAgICAgICAgICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLkFSICE9PSBBUikge1xuICAgICAgICAgICAgICAgIGNhY2hlZC5BUiA9IEFSO1xuICAgICAgICAgICAgICAgIChfYSA9IGNhY2hlZC5vYnNlcnZhYmxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuRyhpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZC5BTTsgLy9UU0NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZCA9IG5ldyBNYXBwZWRSb290KCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCgpID0+IG1hcHBlZC5VKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwcGVkLlYoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IERVTU1ZX0lOREVYO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQVUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBlZC5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IEkobWFwcGVkLm9ic2VydmFibGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IEFNID0gcmVzb2x2ZShCKEQsIG9ic2VydmFibGUpKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGVkLkFSID0gQVI7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBlZC5BTSA9IEFNO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQVEuc2V0KEQsIG1hcHBlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFNO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLkFEID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5BUS52YWx1ZXMoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuQiA9IEI7XG4gICAgICAgIHRoaXMuQVUgPSAoQi5sZW5ndGggPiAxKTtcbiAgICAgICAgdGhpcy5LLkFKKHRoaXMuQUQpO1xuICAgIH1cbn1cbjtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IFNZTUJPTF9TVE9SRV9WQUxVRVMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGNsZWFudXAgZnJvbSAnLi9jbGVhbnVwLmpzJztcbmltcG9ydCBjb21wdXRlZCBmcm9tICcuL2NvbXB1dGVkLmpzJztcbmltcG9ydCBpc1N0b3JlIGZyb20gJy4vaXNfc3RvcmUuanMnO1xuaW1wb3J0IHNhbXBsZSBmcm9tICcuL3NhbXBsZS5qcyc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9mb3IuY2FjaGUuanMnO1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi9yZXNvbHZlLmpzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy5qcyc7XG4vKiBNQUlOICovXG5jb25zdCBfZm9yID0gKHZhbHVlcywgQiwgZmFsbGJhY2sgPSBbXSkgPT4ge1xuICAgIGNvbnN0IEFRID0gbmV3IENhY2hlKEIpO1xuICAgIGNvbnN0IHsgVSwgQTEsIEFDLCBtYXAgfSA9IEFRO1xuICAgIGNsZWFudXAoVSk7XG4gICAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBpc0Z1bmN0aW9uKHZhbHVlcykgPyB2YWx1ZXMoKSA6IHZhbHVlcztcbiAgICAgICAgaWYgKGlzU3RvcmUoYXJyYXkpKVxuICAgICAgICAgICAgYXJyYXlbU1lNQk9MX1NUT1JFX1ZBTFVFU107XG4gICAgICAgIEExKGFycmF5KTtcbiAgICAgICAgY29uc3QgQU0gPSBzYW1wbGUoKCkgPT4gYXJyYXkubGVuZ3RoID8gYXJyYXkubWFwKG1hcCkgOiByZXNvbHZlKGZhbGxiYWNrKSk7XG4gICAgICAgIEFDKGFycmF5KTtcbiAgICAgICAgcmV0dXJuIEFNO1xuICAgIH0pO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgX2ZvcjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgU1lNQk9MX09CU0VSVkFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IGlzT2JzZXJ2YWJsZSA9IChEKSA9PiB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oRCkgJiYgKFNZTUJPTF9PQlNFUlZBQkxFIGluIEQpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgaXNPYnNlcnZhYmxlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgaXNPYnNlcnZhYmxlIGZyb20gJy4vaXNfb2JzZXJ2YWJsZS5qcyc7XG4vKiBNQUlOICovXG4vL1RPRE86IE1heWJlIGFkZCBhIFwicmVzb2x2ZUZ1bmN0aW9uXCIgYXJndW1lbnRcbmNvbnN0IGdldCA9IChEKSA9PiB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZShEKSlcbiAgICAgICAgcmV0dXJuIEQoKTsgLy9UU0NcbiAgICByZXR1cm4gRDsgLy9UU0Ncbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IGdldDtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgT1dORVIgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGNvbXB1dGVkIGZyb20gJy4vY29tcHV0ZWQuanMnO1xuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XG5pbXBvcnQgcmVzb2x2ZSBmcm9tICcuL3Jlc29sdmUuanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi4vb2JqZWN0cy9vYnNlcnZhYmxlLmpzJztcbmltcG9ydCBSb290IGZyb20gJy4uL29iamVjdHMvcm9vdC5qcyc7XG4vKiBIRUxQRVJTICovXG5jbGFzcyBJbmRleGVkUm9vdCBleHRlbmRzIFJvb3Qge1xufVxuLyogTUFJTiAqL1xuY2xhc3MgQ2FjaGUge1xuICAgIC8qIENPTlNUUlVDVE9SICovXG4gICAgY29uc3RydWN0b3IoQikge1xuICAgICAgICB0aGlzLksgPSBPV05FUi5BO1xuICAgICAgICAvKiBBUEkgKi9cbiAgICAgICAgdGhpcy5jbGVhbnVwID0gKHN0YXJ0SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgQVEgfSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleCwgbCA9IEFRLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIEFRW2ldLlUodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUS5sZW5ndGggPSBzdGFydEluZGV4O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLlUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLksuQUsodGhpcy5BRCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFudXAoMCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWFwID0gKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBBUSwgQiB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IEQgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2FjaGVkID0gQVFbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZWQuQVYuRyhEKTsgLy9UU0NcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpXSA9IGNhY2hlZC5BTTsgLy9UU0NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ZWQgPSBuZXcgSW5kZXhlZFJvb3QoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhlZC5WKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEFWID0gbmV3IE9ic2VydmFibGUoRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBCMCA9IGNvbXB1dGVkKCgpID0+IGdldChBVi5FKCkpKTsgLy9UU0NcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZWQuQVYgPSBBVjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZWQuQjAgPSBCMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZWQuQU0gPSByZXNvbHZlKEIoQjAsIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFRW2ldID0gaW5kZXhlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbaV0gPSBpbmRleGVkLkFNO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsZWFudXAodmFsdWVzLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5BRCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuQVEudmFsdWVzKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLkIgPSBCO1xuICAgICAgICB0aGlzLkFRID0gW107XG4gICAgICAgIHRoaXMuSy5BSih0aGlzLkFEKTtcbiAgICB9XG59XG47XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBTWU1CT0xfU1RPUkVfVkFMVUVTIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBjbGVhbnVwIGZyb20gJy4vY2xlYW51cC5qcyc7XG5pbXBvcnQgY29tcHV0ZWQgZnJvbSAnLi9jb21wdXRlZC5qcyc7XG5pbXBvcnQgaXNTdG9yZSBmcm9tICcuL2lzX3N0b3JlLmpzJztcbmltcG9ydCBzYW1wbGUgZnJvbSAnLi9zYW1wbGUuanMnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vZm9yX2luZGV4LmNhY2hlLmpzJztcbmltcG9ydCByZXNvbHZlIGZyb20gJy4vcmVzb2x2ZS5qcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuLyogTUFJTiAqL1xuY29uc3QgZm9ySW5kZXggPSAodmFsdWVzLCBCLCBmYWxsYmFjayA9IFtdKSA9PiB7XG4gICAgY29uc3QgQVEgPSBuZXcgQ2FjaGUoQik7XG4gICAgY29uc3QgeyBVLCBtYXAgfSA9IEFRO1xuICAgIGNsZWFudXAoVSk7XG4gICAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBpc0Z1bmN0aW9uKHZhbHVlcykgPyB2YWx1ZXMoKSA6IHZhbHVlcztcbiAgICAgICAgaWYgKGlzU3RvcmUoYXJyYXkpKVxuICAgICAgICAgICAgYXJyYXlbU1lNQk9MX1NUT1JFX1ZBTFVFU107XG4gICAgICAgIGNvbnN0IEFNID0gc2FtcGxlKCgpID0+IGFycmF5Lmxlbmd0aCA/IG1hcChhcnJheSkgOiByZXNvbHZlKGZhbGxiYWNrKSk7XG4gICAgICAgIHJldHVybiBBTTtcbiAgICB9KTtcbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IGZvckluZGV4O1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBGQUxTRSwgVFJVRSB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgY29tcHV0ZWQgZnJvbSAnLi9jb21wdXRlZC5qcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuLyogTUFJTiAqL1xuY29uc3QgYm9vbGVhbiA9IChEKSA9PiB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKEQpKVxuICAgICAgICByZXR1cm4gRCA/IFRSVUUgOiBGQUxTRTtcbiAgICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gISFEKCkpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgYm9vbGVhbjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgSVMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGNvbXB1dGVkIGZyb20gJy4vY29tcHV0ZWQuanMnO1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi9yZXNvbHZlLmpzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy5qcyc7XG5mdW5jdGlvbiBfc3dpdGNoKHdoZW4sIHZhbHVlcykge1xuICAgIGNvbnN0IEQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGlzRnVuY3Rpb24od2hlbikgPyB3aGVuKCkgOiB3aGVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IEQgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICBpZiAoRC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIERbMF07XG4gICAgICAgICAgICBpZiAoSVMoRFswXSwgY29uZGl0aW9uKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gRFsxXTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKEQoKSk7XG4gICAgfSk7XG59XG47XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IF9zd2l0Y2g7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCBib29sZWFuIGZyb20gJy4vYm9vbGVhbi5qcyc7XG5pbXBvcnQgX3N3aXRjaCBmcm9tICcuL3N3aXRjaC5qcyc7XG4vKiBNQUlOICovXG5jb25zdCB0ZXJuYXJ5ID0gKHdoZW4sIHZhbHVlVHJ1ZSwgdmFsdWVGYWxzZSkgPT4ge1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGJvb2xlYW4od2hlbik7XG4gICAgcmV0dXJuIF9zd2l0Y2goY29uZGl0aW9uLCBbW3RydWUsIHZhbHVlVHJ1ZV0sIFt2YWx1ZUZhbHNlXV0pO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgdGVybmFyeTtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHRlcm5hcnkgZnJvbSAnLi90ZXJuYXJ5LmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IF9pZiA9ICh3aGVuLCB2YWx1ZVRydWUsIHZhbHVlRmFsc2UpID0+IHtcbiAgICByZXR1cm4gdGVybmFyeSh3aGVuLCB2YWx1ZVRydWUsIHZhbHVlRmFsc2UpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgX2lmO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBTWU1CT0xfT0JTRVJWQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBPYnNlcnZhYmxlQ2xhc3MgZnJvbSAnLi4vb2JqZWN0cy9vYnNlcnZhYmxlLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IEIwID0gKG9ic2VydmFibGUpID0+IHtcbiAgICBpZiAob2JzZXJ2YWJsZSBpbnN0YW5jZW9mIE9ic2VydmFibGVDbGFzcylcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgaWYgKFNZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTiBpbiBvYnNlcnZhYmxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZShTWU1CT0xfT0JTRVJWQUJMRSk7IC8vVFNDXG59O1xuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBCMDtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBCMCBmcm9tICcuL3RhcmdldC5qcyc7XG4vKiBNQUlOICovXG5jb25zdCBvZmYgPSAob2JzZXJ2YWJsZSwgbGlzdGVuZXIpID0+IHtcbiAgICBpZiAoU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOIGluIG9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgQjAob2JzZXJ2YWJsZSkuQTkobGlzdGVuZXIpO1xuICAgIH1cbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IG9mZjtcbiIsIi8qIElNUE9SVCAqL1xuaW1wb3J0IHsgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBvZmYgZnJvbSAnLi9vZmYuanMnO1xuaW1wb3J0IEIwIGZyb20gJy4vdGFyZ2V0LmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IG9uID0gKG9ic2VydmFibGUsIGxpc3RlbmVyKSA9PiB7XG4gICAgaWYgKFNZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTiBpbiBvYnNlcnZhYmxlKSB7XG4gICAgICAgIGxpc3RlbmVyLmNhbGwobGlzdGVuZXIsIG9ic2VydmFibGUoKSk7IC8vVFNDXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBCMChvYnNlcnZhYmxlKS5BNShsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG9mZihvYnNlcnZhYmxlLCBsaXN0ZW5lcik7XG4gICAgfTtcbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IG9uO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBOT09QIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBSZWFjdGlvbiBmcm9tICcuLi9vYmplY3RzL3JlYWN0aW9uLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IHJlYWN0aW9uID0gKEIpID0+IHtcbiAgICBjb25zdCByZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihCKTtcbiAgICBpZiAoIXJlYWN0aW9uLkEzKSB7IC8vIEl0IGNhbiBuZXZlciBydW4gYWdhaW4sIGZyZWVpbmcgdXAgc29tZSBtZW1vcnlcbiAgICAgICAgcmVhY3Rpb24uQiA9IE5PT1A7XG4gICAgfVxuICAgIHJldHVybiByZWFjdGlvbi5VLmJpbmQocmVhY3Rpb24sIHRydWUsIHRydWUpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgcmVhY3Rpb247XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IFNZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTiwgU1lNQk9MX09CU0VSVkFCTEVfUkVBREFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IEIwIGZyb20gJy4vdGFyZ2V0LmpzJztcbmltcG9ydCB7IEkgfSBmcm9tICcuLi9vYmplY3RzL2NhbGxhYmxlLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IHJlYWRvbmx5ID0gKG9ic2VydmFibGUpID0+IHtcbiAgICBpZiAoU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOIGluIG9ic2VydmFibGUgfHwgU1lNQk9MX09CU0VSVkFCTEVfUkVBREFCTEUgaW4gb2JzZXJ2YWJsZSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgcmV0dXJuIEkoQjAob2JzZXJ2YWJsZSkpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgcmVhZG9ubHk7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCBSb290IGZyb20gJy4uL29iamVjdHMvcm9vdC5qcyc7XG4vKiBNQUlOICovXG5jb25zdCByb290ID0gKEIpID0+IHtcbiAgICByZXR1cm4gbmV3IFJvb3QodHJ1ZSkuVihCKTtcbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBST09UIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBjbGVhbnVwIGZyb20gJy4vY2xlYW51cC5qcyc7XG5pbXBvcnQgcmVhY3Rpb24gZnJvbSAnLi9yZWFjdGlvbi5qcyc7XG5pbXBvcnQgc2FtcGxlIGZyb20gJy4vc2FtcGxlLmpzJztcbmltcG9ydCB7IEkgfSBmcm9tICcuLi9vYmplY3RzL2NhbGxhYmxlLmpzJztcbmltcG9ydCBPYnNlcnZhYmxlIGZyb20gJy4uL29iamVjdHMvb2JzZXJ2YWJsZS5qcyc7XG4vKiBIRUxQRVJTICovXG5jbGFzcyBTZWxlY3RlZE9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5OID0gMDtcbiAgICB9XG4gICAgLyogQVBJICovXG4gICAgY2FsbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLkIxLnNpemUpXG4gICAgICAgICAgICByZXR1cm47IC8vVFNDXG4gICAgICAgIHRoaXMuTiAtPSAxO1xuICAgICAgICBpZiAodGhpcy5OKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLlUoKTtcbiAgICAgICAgdGhpcy5CMS5kZWxldGUodGhpcy5BVik7IC8vVFNDXG4gICAgfVxufVxuLyogTUFJTiAqL1xuY29uc3Qgc2VsZWN0b3IgPSAoQVYpID0+IHtcbiAgICAvKiBTSUdOQUwgKi9cbiAgICBjb25zdCBMID0gT1dORVIuQS5MIHx8IFJPT1QuQTtcbiAgICAvKiBTRUxFQ1RFRFMgKi9cbiAgICBsZXQgQjEgPSBuZXcgTWFwKCk7XG4gICAgbGV0IHZhbHVlUHJldjtcbiAgICByZWFjdGlvbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJldiA9IEIxLmdldCh2YWx1ZVByZXYpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRQcmV2KVxuICAgICAgICAgICAgc2VsZWN0ZWRQcmV2LkcoZmFsc2UpO1xuICAgICAgICBjb25zdCB2YWx1ZU5leHQgPSBBVigpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE5leHQgPSBCMS5nZXQodmFsdWVOZXh0KTtcbiAgICAgICAgaWYgKHNlbGVjdGVkTmV4dClcbiAgICAgICAgICAgIHNlbGVjdGVkTmV4dC5HKHRydWUpO1xuICAgICAgICB2YWx1ZVByZXYgPSB2YWx1ZU5leHQ7XG4gICAgfSk7XG4gICAgLyogQ0xFQU5VUCBBTEwgKi9cbiAgICBjb25zdCBjbGVhbnVwQWxsID0gKCkgPT4ge1xuICAgICAgICBpZiAoIUwuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgIEIxLmZvckVhY2goc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkLlUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIEIxID0gbmV3IE1hcCgpO1xuICAgIH07XG4gICAgY2xlYW51cChjbGVhbnVwQWxsKTtcbiAgICAvKiBTRUxFQ1RPUiAqL1xuICAgIHJldHVybiAoRCkgPT4ge1xuICAgICAgICAvKiBJTklUICovXG4gICAgICAgIGxldCBzZWxlY3RlZDtcbiAgICAgICAgbGV0IHNlbGVjdGVkUHJldiA9IEIxLmdldChEKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkUHJldikge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZFByZXY7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IG5ldyBTZWxlY3RlZE9ic2VydmFibGUoc2FtcGxlKEFWKSA9PT0gRCk7XG4gICAgICAgICAgICBzZWxlY3RlZC5CMSA9IEIxO1xuICAgICAgICAgICAgc2VsZWN0ZWQuQVYgPSBEO1xuICAgICAgICAgICAgc2VsZWN0ZWQuTCA9IEw7XG4gICAgICAgICAgICBCMS5zZXQoRCwgc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkLk4gKz0gMTtcbiAgICAgICAgLyogQ0xFQU5VUCAqL1xuICAgICAgICBjbGVhbnVwKHNlbGVjdGVkKTtcbiAgICAgICAgLyogUkVUVVJOICovXG4gICAgICAgIHJldHVybiBJKHNlbGVjdGVkKTtcbiAgICB9O1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgc2VsZWN0b3I7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBST09ULCBTWU1CT0xfU1RPUkUsIFNZTUJPTF9TVE9SRV9UQVJHRVQsIFNZTUJPTF9TVE9SRV9WQUxVRVMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGJhdGNoIGZyb20gJy4vYmF0Y2guanMnO1xuaW1wb3J0IGNsZWFudXAgZnJvbSAnLi9jbGVhbnVwLmpzJztcbmltcG9ydCBpc1N0b3JlIGZyb20gJy4vaXNfc3RvcmUuanMnO1xuaW1wb3J0IENvbXB1dGF0aW9uIGZyb20gJy4uL29iamVjdHMvY29tcHV0YXRpb24uanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi4vb2JqZWN0cy9vYnNlcnZhYmxlLmpzJztcbi8qIENMQVNTRVMgKi9cbmNsYXNzIFN0b3JlTWFwIGV4dGVuZHMgTWFwIHtcbiAgICBCMihDLCBEKSB7XG4gICAgICAgIHN1cGVyLnNldChDLCBEKTtcbiAgICAgICAgcmV0dXJuIEQ7XG4gICAgfVxufVxuY2xhc3MgU3RvcmVDbGVhbmFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLk4gPSAwO1xuICAgIH1cbiAgICBCMygpIHtcbiAgICAgICAgdGhpcy5OICs9IDE7XG4gICAgICAgIGNsZWFudXAodGhpcyk7XG4gICAgfVxuICAgIGNhbGwoKSB7XG4gICAgICAgIHRoaXMuTiAtPSAxO1xuICAgICAgICBpZiAodGhpcy5OKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLlUoKTtcbiAgICB9XG4gICAgVSgpIHsgfVxufVxuY2xhc3MgU3RvcmVLZXlzIGV4dGVuZHMgU3RvcmVDbGVhbmFibGUge1xuICAgIGNvbnN0cnVjdG9yKEssIG9ic2VydmFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5LID0gSztcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbiAgICB9XG4gICAgVSgpIHtcbiAgICAgICAgdGhpcy5LLmtleXMgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuY2xhc3MgU3RvcmVWYWx1ZXMgZXh0ZW5kcyBTdG9yZUNsZWFuYWJsZSB7XG4gICAgY29uc3RydWN0b3IoSywgb2JzZXJ2YWJsZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLksgPSBLO1xuICAgICAgICB0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuICAgIH1cbiAgICBVKCkge1xuICAgICAgICB0aGlzLksudmFsdWVzID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmNsYXNzIFN0b3JlSGFzIGV4dGVuZHMgU3RvcmVDbGVhbmFibGUge1xuICAgIGNvbnN0cnVjdG9yKEssIEMsIG9ic2VydmFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5LID0gSztcbiAgICAgICAgdGhpcy5DID0gQztcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbiAgICB9XG4gICAgVSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLksuaGFzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVsZXRlKHRoaXMuQyk7XG4gICAgfVxufVxuY2xhc3MgU3RvcmVQcm9wZXJ0eSBleHRlbmRzIFN0b3JlQ2xlYW5hYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihLLCBDLCBvYnNlcnZhYmxlLCBCNCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLksgPSBLO1xuICAgICAgICB0aGlzLkMgPSBDO1xuICAgICAgICB0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuICAgICAgICB0aGlzLkI0ID0gQjQ7XG4gICAgfVxuICAgIFUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5LLkI1KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVsZXRlKHRoaXMuQyk7XG4gICAgfVxufVxuLyogQ09OU1RBTlRTICovXG5jb25zdCBOT0RFUyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBTUEVDSUFMX1NZTUJPTFMgPSBuZXcgU2V0KFtTWU1CT0xfU1RPUkUsIFNZTUJPTF9TVE9SRV9UQVJHRVQsIFNZTUJPTF9TVE9SRV9WQUxVRVNdKTtcbmNvbnN0IFVOUkVBQ1RJVkVfS0VZUyA9IG5ldyBTZXQoWydfX3Byb3RvX18nLCAncHJvdG90eXBlJywgJ2NvbnN0cnVjdG9yJywgJ2hhc093blByb3BlcnR5JywgJ2lzUHJvdG90eXBlT2YnLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAndG9Mb2NhbGVTdHJpbmcnLCAndG9Tb3VyY2UnLCAndG9TdHJpbmcnLCAndmFsdWVPZiddKTtcbmNvbnN0IFRSQVBTID0ge1xuICAgIC8qIEFQSSAqL1xuICAgIGdldDogKEIwLCBDKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmIChTUEVDSUFMX1NZTUJPTFMuaGFzKEMpKSB7XG4gICAgICAgICAgICBpZiAoQyA9PT0gU1lNQk9MX1NUT1JFKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKEMgPT09IFNZTUJPTF9TVE9SRV9UQVJHRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEIwO1xuICAgICAgICAgICAgaWYgKEMgPT09IFNZTUJPTF9TVE9SRV9WQUxVRVMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMaXN0ZW5hYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgQjQgPSBnZXROb2RlRXhpc3RpbmcoQjApO1xuICAgICAgICAgICAgICAgICAgICBCNC52YWx1ZXMgfHwgKEI0LnZhbHVlcyA9IGdldE5vZGVWYWx1ZXMoQjQpKTtcbiAgICAgICAgICAgICAgICAgICAgQjQudmFsdWVzLkIzKCk7XG4gICAgICAgICAgICAgICAgICAgIEI0LnZhbHVlcy5vYnNlcnZhYmxlLkUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVOUkVBQ1RJVkVfS0VZUy5oYXMoQykpXG4gICAgICAgICAgICByZXR1cm4gQjBbQ107XG4gICAgICAgIGNvbnN0IEI0ID0gZ2V0Tm9kZUV4aXN0aW5nKEIwKTtcbiAgICAgICAgY29uc3QgZ2V0dGVyID0gKF9hID0gQjQuQjYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQoQyk7XG4gICAgICAgIGNvbnN0IEQgPSBnZXR0ZXIgfHwgQjBbQ107XG4gICAgICAgIEI0LkI1IHx8IChCNC5CNSA9IG5ldyBTdG9yZU1hcCgpKTtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBCNC5CNS5nZXQoQykgfHwgQjQuQjUuQjIoQywgZ2V0Tm9kZVByb3BlcnR5KEI0LCBDLCBEKSk7XG4gICAgICAgIGlmIChpc0xpc3RlbmFibGUoKSkge1xuICAgICAgICAgICAgcHJvcGVydHkuQjMoKTtcbiAgICAgICAgICAgIHByb3BlcnR5Lm9ic2VydmFibGUgfHwgKHByb3BlcnR5Lm9ic2VydmFibGUgPSBnZXROb2RlT2JzZXJ2YWJsZShCNCwgRCkpO1xuICAgICAgICAgICAgcHJvcGVydHkub2JzZXJ2YWJsZS5FKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGdldHRlci5jYWxsKEI0LnN0b3JlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRCA9PT0gJ2Z1bmN0aW9uJyAmJiBEID09PSBBcnJheS5wcm90b3R5cGVbQ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmF0Y2goKCkgPT4gRC5hcHBseShCNC5zdG9yZSwgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoKF9iID0gcHJvcGVydHkuQjQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdG9yZSkgfHwgRDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0OiAoQjAsIEMsIEQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBEID0gZ2V0VGFyZ2V0KEQpO1xuICAgICAgICBjb25zdCBCNCA9IGdldE5vZGVFeGlzdGluZyhCMCk7XG4gICAgICAgIGNvbnN0IHNldHRlciA9IChfYSA9IEI0LkI3KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KEMpO1xuICAgICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgICAgICBiYXRjaCgoKSA9PiBzZXR0ZXIuY2FsbChCNC5zdG9yZSwgRCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaGFkUHJvcGVydHkgPSAoQyBpbiBCMCk7XG4gICAgICAgICAgICBCMFtDXSA9IEQ7XG4gICAgICAgICAgICBiYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgICAgICAgICAgKF9hID0gQjQudmFsdWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub2JzZXJ2YWJsZS5HKDApO1xuICAgICAgICAgICAgICAgIGlmICghaGFkUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gQjQua2V5cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9ic2VydmFibGUuRygwKTtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gKF9jID0gQjQuaGFzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0KEMpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Qub2JzZXJ2YWJsZS5HKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IChfZSA9IEI0LkI1KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZ2V0KEMpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSBwcm9wZXJ0eS5vYnNlcnZhYmxlKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuRyhEKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkuQjQgPSBpc1Byb3hpYWJsZShEKSA/IE5PREVTLmdldChEKSB8fCBnZXROb2RlKEQsIEI0KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5OiAoQjAsIEMpID0+IHtcbiAgICAgICAgY29uc3QgaGFzUHJvcGVydHkgPSAoQyBpbiBCMCk7XG4gICAgICAgIGlmICghaGFzUHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoQjAsIEMpO1xuICAgICAgICBpZiAoIWRlbGV0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IEI0ID0gZ2V0Tm9kZUV4aXN0aW5nKEIwKTtcbiAgICAgICAgYmF0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgICAgICAoX2EgPSBCNC5rZXlzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub2JzZXJ2YWJsZS5HKDApO1xuICAgICAgICAgICAgKF9iID0gQjQudmFsdWVzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub2JzZXJ2YWJsZS5HKDApO1xuICAgICAgICAgICAgKF9kID0gKF9jID0gQjQuaGFzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0KEMpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Qub2JzZXJ2YWJsZS5HKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gKF9lID0gQjQuQjUpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5nZXQoQyk7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAoX2YgPSBwcm9wZXJ0eS5vYnNlcnZhYmxlKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuRyh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5LkI0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBkZWZpbmVQcm9wZXJ0eTogKEIwLCBDLCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhZFByb3BlcnR5ID0gKEMgaW4gQjApO1xuICAgICAgICBjb25zdCBkZWZpbmVkID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShCMCwgQywgZGVzY3JpcHRvcik7XG4gICAgICAgIGlmICghZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgQjQgPSBnZXROb2RlRXhpc3RpbmcoQjApO1xuICAgICAgICBiYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmdldCkge1xuICAgICAgICAgICAgICAgIChfYSA9IEI0LkI2KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVsZXRlKEMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvci5nZXQpIHtcbiAgICAgICAgICAgICAgICBCNC5CNiB8fCAoQjQuQjYgPSBuZXcgU3RvcmVNYXAoKSk7XG4gICAgICAgICAgICAgICAgQjQuQjYuc2V0KEMsIGRlc2NyaXB0b3IuZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBCNC5CNykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRlbGV0ZShDKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgICAgICAgICAgQjQuQjcgfHwgKEI0LkI3ID0gbmV3IFN0b3JlTWFwKCkpO1xuICAgICAgICAgICAgICAgIEI0LkI3LnNldChDLCBkZXNjcmlwdG9yLnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFkUHJvcGVydHkgIT09ICEhZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgKF9jID0gQjQua2V5cykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm9ic2VydmFibGUuRygwKTtcbiAgICAgICAgICAgICAgICAoX2UgPSAoX2QgPSBCNC5oYXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXQoQykpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5vYnNlcnZhYmxlLkcoISFkZXNjcmlwdG9yLmVudW1lcmFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvcGVydHkgPSAoX2YgPSBCNC5CNSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmdldChDKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGlmICgnZ2V0JyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZyA9IHByb3BlcnR5Lm9ic2VydmFibGUpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5HKGRlc2NyaXB0b3IuZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkuQjQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBEID0gZGVzY3JpcHRvclsndmFsJyArICd1ZSddOyAvL1VHTFk6IEJhaWxpbmcgb3V0IG9mIG1hbmdsaW5nXG4gICAgICAgICAgICAgICAgICAgIChfaCA9IHByb3BlcnR5Lm9ic2VydmFibGUpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5HKEQpO1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5CNCA9IGlzUHJveGlhYmxlKEQpID8gTk9ERVMuZ2V0KEQpIHx8IGdldE5vZGUoRCwgQjQpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzOiAoQjAsIEMpID0+IHtcbiAgICAgICAgaWYgKEMgPT09IFNZTUJPTF9TVE9SRSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoQyA9PT0gU1lNQk9MX1NUT1JFX1RBUkdFVClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBEID0gKEMgaW4gQjApO1xuICAgICAgICBpZiAoaXNMaXN0ZW5hYmxlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IEI0ID0gZ2V0Tm9kZUV4aXN0aW5nKEIwKTtcbiAgICAgICAgICAgIEI0LmhhcyB8fCAoQjQuaGFzID0gbmV3IFN0b3JlTWFwKCkpO1xuICAgICAgICAgICAgY29uc3QgaGFzID0gQjQuaGFzLmdldChDKSB8fCBCNC5oYXMuQjIoQywgZ2V0Tm9kZUhhcyhCNCwgQywgRCkpO1xuICAgICAgICAgICAgaGFzLkIzKCk7XG4gICAgICAgICAgICBoYXMub2JzZXJ2YWJsZS5FKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEQ7XG4gICAgfSxcbiAgICBvd25LZXlzOiAoQjApID0+IHtcbiAgICAgICAgY29uc3Qga2V5cyA9IFJlZmxlY3Qub3duS2V5cyhCMCk7XG4gICAgICAgIGlmIChpc0xpc3RlbmFibGUoKSkge1xuICAgICAgICAgICAgY29uc3QgQjQgPSBnZXROb2RlRXhpc3RpbmcoQjApO1xuICAgICAgICAgICAgQjQua2V5cyB8fCAoQjQua2V5cyA9IGdldE5vZGVLZXlzKEI0KSk7XG4gICAgICAgICAgICBCNC5rZXlzLkIzKCk7XG4gICAgICAgICAgICBCNC5rZXlzLm9ic2VydmFibGUuRSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cbn07XG4vKiBIRUxQRVJTICovXG5jb25zdCBnZXROb2RlID0gKEQsIEspID0+IHtcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBQcm94eShELCBUUkFQUyk7XG4gICAgY29uc3QgTCA9IChLID09PSBudWxsIHx8IEsgPT09IHZvaWQgMCA/IHZvaWQgMCA6IEsuTCkgfHwgT1dORVIuQS5MIHx8IFJPT1QuQTtcbiAgICBjb25zdCB7IEI2LCBCNyB9ID0gZ2V0R2V0dGVyc0FuZFNldHRlcnMoRCk7XG4gICAgY29uc3QgQjQgPSB7IHN0b3JlLCBMIH07XG4gICAgaWYgKEI2KVxuICAgICAgICBCNC5CNiA9IEI2O1xuICAgIGlmIChCNylcbiAgICAgICAgQjQuQjcgPSBCNztcbiAgICBOT0RFUy5zZXQoRCwgQjQpO1xuICAgIHJldHVybiBCNDtcbn07XG5jb25zdCBnZXROb2RlRXhpc3RpbmcgPSAoRCkgPT4ge1xuICAgIGNvbnN0IEI0ID0gTk9ERVMuZ2V0KEQpO1xuICAgIGlmICghQjQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgIHJldHVybiBCNDtcbn07XG5jb25zdCBnZXROb2RlS2V5cyA9IChCNCkgPT4ge1xuICAgIGNvbnN0IG9ic2VydmFibGUgPSBnZXROb2RlT2JzZXJ2YWJsZShCNCwgMCwgeyBlcXVhbHM6IGZhbHNlIH0pO1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU3RvcmVLZXlzKEI0LCBvYnNlcnZhYmxlKTtcbiAgICByZXR1cm4ga2V5cztcbn07XG5jb25zdCBnZXROb2RlVmFsdWVzID0gKEI0KSA9PiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IGdldE5vZGVPYnNlcnZhYmxlKEI0LCAwLCB7IGVxdWFsczogZmFsc2UgfSk7XG4gICAgY29uc3QgdmFsdWVzID0gbmV3IFN0b3JlVmFsdWVzKEI0LCBvYnNlcnZhYmxlKTtcbiAgICByZXR1cm4gdmFsdWVzO1xufTtcbmNvbnN0IGdldE5vZGVIYXMgPSAoQjQsIEMsIEQpID0+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gZ2V0Tm9kZU9ic2VydmFibGUoQjQsIEQpO1xuICAgIGNvbnN0IGhhcyA9IG5ldyBTdG9yZUhhcyhCNCwgQywgb2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIGhhcztcbn07XG5jb25zdCBnZXROb2RlT2JzZXJ2YWJsZSA9IChCNCwgRCwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZShELCBvcHRpb25zKTtcbiAgICBvYnNlcnZhYmxlLkwgPSBCNC5MO1xuICAgIHJldHVybiBvYnNlcnZhYmxlO1xufTtcbmNvbnN0IGdldE5vZGVQcm9wZXJ0eSA9IChCNCwgQywgRCkgPT4ge1xuICAgIGNvbnN0IG9ic2VydmFibGUgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvcGVydHlOb2RlID0gaXNQcm94aWFibGUoRCkgPyBOT0RFUy5nZXQoRCkgfHwgZ2V0Tm9kZShELCBCNCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvcGVydHkgPSBuZXcgU3RvcmVQcm9wZXJ0eShCNCwgQywgb2JzZXJ2YWJsZSwgcHJvcGVydHlOb2RlKTtcbiAgICBCNC5CNSB8fCAoQjQuQjUgPSBuZXcgU3RvcmVNYXAoKSk7XG4gICAgQjQuQjUuc2V0KEMsIHByb3BlcnR5KTtcbiAgICByZXR1cm4gcHJvcGVydHk7XG59O1xuY29uc3QgZ2V0R2V0dGVyc0FuZFNldHRlcnMgPSAoRCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KEQpKVxuICAgICAgICByZXR1cm4ge307XG4gICAgbGV0IEI2O1xuICAgIGxldCBCNztcbiAgICBjb25zdCBrZXlzID0gUmVmbGVjdC5vd25LZXlzKEQpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY29uc3QgQyA9IGtleXNbaV07XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEQsIEMpO1xuICAgICAgICBpZiAoIWRlc2NyaXB0b3IpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgeyBnZXQsIHNldCB9ID0gZGVzY3JpcHRvcjtcbiAgICAgICAgaWYgKGdldCkge1xuICAgICAgICAgICAgQjYgfHwgKEI2ID0gbmV3IFN0b3JlTWFwKCkpO1xuICAgICAgICAgICAgQjYuc2V0KEMsIGdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldCkge1xuICAgICAgICAgICAgQjcgfHwgKEI3ID0gbmV3IFN0b3JlTWFwKCkpO1xuICAgICAgICAgICAgQjcuc2V0KEMsIHNldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgQjYsIEI3IH07XG59O1xuY29uc3QgZ2V0U3RvcmUgPSAoRCkgPT4ge1xuICAgIGlmIChpc1N0b3JlKEQpKVxuICAgICAgICByZXR1cm4gRDtcbiAgICBjb25zdCBCNCA9IE5PREVTLmdldChEKSB8fCBnZXROb2RlKEQpO1xuICAgIHJldHVybiBCNC5zdG9yZTtcbn07XG5jb25zdCBnZXRUYXJnZXQgPSAoRCkgPT4ge1xuICAgIGlmIChpc1N0b3JlKEQpKVxuICAgICAgICByZXR1cm4gRFtTWU1CT0xfU1RPUkVfVEFSR0VUXTtcbiAgICByZXR1cm4gRDtcbn07XG5jb25zdCBpc0xpc3RlbmFibGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChPV05FUi5BIGluc3RhbmNlb2YgQ29tcHV0YXRpb24pO1xufTtcbmNvbnN0IGlzUHJveGlhYmxlID0gKEQpID0+IHtcbiAgICBpZiAoRCA9PT0gbnVsbCB8fCB0eXBlb2YgRCAhPT0gJ29iamVjdCcpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShEKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEQpO1xuICAgIGlmIChwcm90b3R5cGUgPT09IG51bGwpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpO1xufTtcbi8qIE1BSU4gKi9cbi8vVE9ETzogQWRkIGFuIG9wdGlvbiBmb3IgZ2xpdGNoLWZyZWUgYmF0Y2hpbmcsIG1ha2luZyBpdCBjbGVhciB0aGF0IHRoYXQgd291bGQgYnJlYWsgdHlwZS1jaGVja2luZ1xuLy9UT0RPOiBBZGQgYW4gb3B0aW9uIGZvciBpbW11dGFibGUgc3RvcmVzIHRoYXQgYXJlIGVkaXRlZCB2aWEgc2V0L21lcmdlL3Byb2R1Y2UgZnVuY3Rpb25zLCB3aGljaCBoYXZlIG5vbmUgb2YgdGhlIGlzc3VlcyBidXQgcG9vciBEWFxuLy9UT0RPOiBTdXBwb3J0IGxpc3RlbmluZyB0byBldmVyeXRoaW5nXG4vL1RPRE86IFN1cHBvcnQgcHJveHlpbmcgbW9yZSBidWlsdC1pbnM6IEFycmF5QnVmZmVyLCBSZWdFeHAsIERhdGUsIFR5cGVkQXJyYXksIE1hcCwgV2VrYU1hcCwgU2V0LCBXZWFrU2V0XG4vL1RPRE86IEV4cGxvcmUgbm90IHVzaW5nIGEgV2Vha01hcCtBNCBhbmQgaW5zdGVhZCBhdHRhY2hpbmcgdGhlIHByb3h5IHRvIHRoZSBvYmplY3QgaXRzZWxmIHZpYSBhIHByb3h5XG5jb25zdCBzdG9yZSA9IChELCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKCFpc1Byb3hpYWJsZShEKSlcbiAgICAgICAgcmV0dXJuIEQ7XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy51bndyYXApXG4gICAgICAgIHJldHVybiBnZXRUYXJnZXQoRCk7XG4gICAgcmV0dXJuIGdldFN0b3JlKEQpO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSLCBTVVNQRU5TRSwgU1VTUEVOU0VfRU5BQkxFRCwgU1lNQk9MX1NVU1BFTlNFIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGxhenlBcnJheUVhY2gsIGxhenlTZXRFYWNoIH0gZnJvbSAnLi4vbGF6eS5qcyc7XG5pbXBvcnQgQU4gZnJvbSAnLi4vbWV0aG9kcy9zdXNwZW5kZWQuanMnO1xuaW1wb3J0IEVmZmVjdCBmcm9tICcuL2VmZmVjdC5qcyc7XG5pbXBvcnQgT2JzZXJ2ZXIgZnJvbSAnLi9vYnNlcnZlci5qcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuLyogTUFJTiAqL1xuY2xhc3MgU3VzcGVuc2UgZXh0ZW5kcyBPYnNlcnZlciB7XG4gICAgLyogQ09OU1RSVUNUT1IgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyogVkFSSUFCTEVTICovXG4gICAgICAgIHRoaXMuSyA9IE9XTkVSLkE7XG4gICAgICAgIHRoaXMuQU4gPSBBTigpOyAvLyAwOiBVTlNVU1BFTkRFRCwgMTogVEhJU19TVVNQRU5ERUQsIDIrOiBUSElTX0FORF9QQVJFTlRfU1VTUEVOREVEXG4gICAgICAgIFNVU1BFTlNFX0VOQUJMRUQuQSA9IHRydWU7XG4gICAgICAgIE9XTkVSLkEuVCh0aGlzKTtcbiAgICAgICAgdGhpcy5BRihTWU1CT0xfU1VTUEVOU0UsIHRoaXMpO1xuICAgIH1cbiAgICAvKiBBUEkgKi9cbiAgICBBUChmb3JjZSkge1xuICAgICAgICBpZiAoIXRoaXMuQU4gJiYgIWZvcmNlKVxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBbHJlYWR5IEFOLCB0aGlzIGNhbiBoYXBwZW4gYXQgaW5zdGFudGlvbiB0aW1lXG4gICAgICAgIGNvbnN0IHN1c3BlbmRlZFByZXYgPSB0aGlzLkFOO1xuICAgICAgICB0aGlzLkFOICs9IGZvcmNlID8gMSA6IC0xO1xuICAgICAgICBpZiAoc3VzcGVuZGVkUHJldiA+PSAyKVxuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBwYXVzaW5nIG9yIHJlc3VtaW5nXG4gICAgICAgIC8qIE5PVElGWUlORyBFRkZFQ1RTIEFORCBTVVNQRU5TRVMgKi9cbiAgICAgICAgY29uc3Qgbm90aWZ5Um9vdCA9IChyb290KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihyb290KSkge1xuICAgICAgICAgICAgICAgIHJvb3QoKS5mb3JFYWNoKG5vdGlmeU9ic2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdGlmeU9ic2VydmVyKHJvb3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBub3RpZnlPYnNlcnZlciA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyIGluc3RhbmNlb2YgU3VzcGVuc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyIGluc3RhbmNlb2YgRWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLk8oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuUChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF6eUFycmF5RWFjaChvYnNlcnZlci5BMiwgbm90aWZ5T2JzZXJ2ZXIpO1xuICAgICAgICAgICAgbGF6eVNldEVhY2gob2JzZXJ2ZXIuQUQsIG5vdGlmeVJvb3QpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBub3RpZnlTdXNwZW5zZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgaWYgKCEob2JzZXJ2ZXIgaW5zdGFuY2VvZiBTdXNwZW5zZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuQVAoZm9yY2UpO1xuICAgICAgICB9O1xuICAgICAgICBsYXp5QXJyYXlFYWNoKHRoaXMuQTIsIG5vdGlmeU9ic2VydmVyKTtcbiAgICAgICAgbGF6eUFycmF5RWFjaCh0aGlzLkEyLCBub3RpZnlTdXNwZW5zZSk7XG4gICAgICAgIGxhenlTZXRFYWNoKHRoaXMuQUQsIG5vdGlmeVJvb3QpO1xuICAgIH1cbiAgICBWKEIpIHtcbiAgICAgICAgY29uc3Qgc3VzcGVuc2VQcmV2ID0gU1VTUEVOU0UuQTtcbiAgICAgICAgU1VTUEVOU0UuQSA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuVihCKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIFNVU1BFTlNFLkEgPSBzdXNwZW5zZVByZXY7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IFN1c3BlbnNlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgYm9vbGVhbiBmcm9tICcuL2Jvb2xlYW4uanMnO1xuaW1wb3J0IGVmZmVjdCBmcm9tICcuL2VmZmVjdC5qcyc7XG5pbXBvcnQgU3VzcGVuc2UgZnJvbSAnLi4vb2JqZWN0cy9zdXNwZW5zZS5qcyc7XG4vKiBNQUlOICovXG5jb25zdCBzdXNwZW5zZSA9ICh3aGVuLCBCKSA9PiB7XG4gICAgY29uc3Qgc3VzcGVuc2UgPSBuZXcgU3VzcGVuc2UoKTtcbiAgICBjb25zdCBjb25kaXRpb24gPSBib29sZWFuKHdoZW4pO1xuICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHN1c3BlbnNlLkFQKGNvbmRpdGlvbigpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3VzcGVuc2UuVihCKTtcbn07XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0IHN1c3BlbnNlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgY29tcHV0ZWQgZnJvbSAnLi9jb21wdXRlZC5qcyc7XG5pbXBvcnQgZXJyb3IgZnJvbSAnLi9lcnJvci5qcyc7XG5pbXBvcnQgcmVzb2x2ZSBmcm9tICcuL3Jlc29sdmUuanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi4vb2JqZWN0cy9vYnNlcnZhYmxlLmpzJztcbmltcG9ydCB7IGNhc3RFcnJvciB9IGZyb20gJy4uL3V0aWxzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IHRyeUNhdGNoID0gKEQsIEIpID0+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBpZiAob2JzZXJ2YWJsZS5FKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gb2JzZXJ2YWJsZS5EO1xuICAgICAgICAgICAgY29uc3QgcmVzZXQgPSAoKSA9PiBvYnNlcnZhYmxlLkcodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGVycm9yLCByZXNldCB9O1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoQihvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5HKGNhc3RFcnJvcihlcnJvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShEKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgdHJ5Q2F0Y2g7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IE9XTkVSIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbi8qIE1BSU4gKi9cbmNvbnN0IF93aXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IG93bmVyID0gT1dORVIuQTtcbiAgICByZXR1cm4gKEIpID0+IHtcbiAgICAgICAgcmV0dXJuIG93bmVyLlYoKCkgPT4gQigpKTtcbiAgICB9O1xufTtcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgX3dpdGg7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCBiYXRjaCBmcm9tICcuL2JhdGNoLmpzJztcbmltcG9ydCBjbGVhbnVwIGZyb20gJy4vY2xlYW51cC5qcyc7XG5pbXBvcnQgY29tcHV0ZWQgZnJvbSAnLi9jb21wdXRlZC5qcyc7XG5pbXBvcnQgY29udGV4dCBmcm9tICcuL2NvbnRleHQuanMnO1xuaW1wb3J0IGRpc3Bvc2VkIGZyb20gJy4vZGlzcG9zZWQuanMnO1xuaW1wb3J0IGVmZmVjdCBmcm9tICcuL2VmZmVjdC5qcyc7XG5pbXBvcnQgZXJyb3IgZnJvbSAnLi9lcnJvci5qcyc7XG5pbXBvcnQgX2ZvciBmcm9tICcuL2Zvci5qcyc7XG5pbXBvcnQgZm9ySW5kZXggZnJvbSAnLi9mb3JfaW5kZXguanMnO1xuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XG5pbXBvcnQgX2lmIGZyb20gJy4vaWYuanMnO1xuaW1wb3J0IGlzT2JzZXJ2YWJsZSBmcm9tICcuL2lzX29ic2VydmFibGUuanMnO1xuaW1wb3J0IGlzU3RvcmUgZnJvbSAnLi9pc19zdG9yZS5qcyc7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmLmpzJztcbmltcG9ydCBvbiBmcm9tICcuL29uLmpzJztcbmltcG9ydCByZWFjdGlvbiBmcm9tICcuL3JlYWN0aW9uLmpzJztcbmltcG9ydCByZWFkb25seSBmcm9tICcuL3JlYWRvbmx5LmpzJztcbmltcG9ydCByZXNvbHZlIGZyb20gJy4vcmVzb2x2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL3Jvb3QuanMnO1xuaW1wb3J0IHNhbXBsZSBmcm9tICcuL3NhbXBsZS5qcyc7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSAnLi9zZWxlY3Rvci5qcyc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZS5qcyc7XG5pbXBvcnQgc3VzcGVuc2UgZnJvbSAnLi9zdXNwZW5zZS5qcyc7XG5pbXBvcnQgX3N3aXRjaCBmcm9tICcuL3N3aXRjaC5qcyc7XG5pbXBvcnQgdGVybmFyeSBmcm9tICcuL3Rlcm5hcnkuanMnO1xuaW1wb3J0IHRyeUNhdGNoIGZyb20gJy4vdHJ5X2NhdGNoLmpzJztcbmltcG9ydCBfd2l0aCBmcm9tICcuL3dpdGguanMnO1xuaW1wb3J0IHsgSiB9IGZyb20gJy4uL29iamVjdHMvY2FsbGFibGUuanMnO1xuaW1wb3J0IE9ic2VydmFibGVDbGFzcyBmcm9tICcuLi9vYmplY3RzL29ic2VydmFibGUuanMnO1xuZnVuY3Rpb24gJChELCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIEoobmV3IE9ic2VydmFibGVDbGFzcyhELCBvcHRpb25zKSk7XG59XG4vKiBVVElMSVRJRVMgKi9cbiQuYmF0Y2ggPSBiYXRjaDtcbiQuY2xlYW51cCA9IGNsZWFudXA7XG4kLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG4kLmNvbnRleHQgPSBjb250ZXh0O1xuJC5kaXNwb3NlZCA9IGRpc3Bvc2VkO1xuJC5lZmZlY3QgPSBlZmZlY3Q7XG4kLmVycm9yID0gZXJyb3I7XG4kLmZvciA9IF9mb3I7XG4kLmZvckluZGV4ID0gZm9ySW5kZXg7XG4kLmdldCA9IGdldDtcbiQuaWYgPSBfaWY7XG4kLmlzT2JzZXJ2YWJsZSA9IGlzT2JzZXJ2YWJsZTtcbiQuaXNTdG9yZSA9IGlzU3RvcmU7XG4kLm9mZiA9IG9mZjtcbiQub24gPSBvbjtcbiQucmVhY3Rpb24gPSByZWFjdGlvbjtcbiQucmVhZG9ubHkgPSByZWFkb25seTtcbiQucmVzb2x2ZSA9IHJlc29sdmU7XG4kLnJvb3QgPSByb290O1xuJC5zYW1wbGUgPSBzYW1wbGU7XG4kLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4kLnN0b3JlID0gc3RvcmU7XG4kLnN1c3BlbnNlID0gc3VzcGVuc2U7XG4kLnN3aXRjaCA9IF9zd2l0Y2g7XG4kLnRlcm5hcnkgPSB0ZXJuYXJ5O1xuJC50cnlDYXRjaCA9IHRyeUNhdGNoO1xuJC53aXRoID0gX3dpdGg7XG4vKiBFWFBPUlQgKi9cbmV4cG9ydCBkZWZhdWx0ICQ7XG4iLCIvKiBJTVBPUlQgKi9cbmltcG9ydCB7IEogfSBmcm9tICcuLi9vYmplY3RzL2NhbGxhYmxlLmpzJztcbmltcG9ydCBPYnNlcnZhYmxlQ2xhc3MgZnJvbSAnLi4vb2JqZWN0cy9vYnNlcnZhYmxlLmpzJztcbmZ1bmN0aW9uIG9ic2VydmFibGUoRCwgb3B0aW9ucykge1xuICAgIHJldHVybiBKKG5ldyBPYnNlcnZhYmxlQ2xhc3MoRCwgb3B0aW9ucykpO1xufVxuLyogRVhQT1JUICovXG5leHBvcnQgZGVmYXVsdCBvYnNlcnZhYmxlO1xuIiwiLyogSU1QT1JUICovXG5pbXBvcnQgeyBTWU1CT0xfT0JTRVJWQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfRlJPWkVOLCBTWU1CT0xfT0JTRVJWQUJMRV9SRUFEQUJMRSwgU1lNQk9MX09CU0VSVkFCTEVfV1JJVEFCTEUsIFNZTUJPTF9SRVNPTFZFX1VOV1JBUFBFRCwgU1lNQk9MX1NBTVBMRUQgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgJCBmcm9tICcuL21ldGhvZHMvJC5qcyc7XG5pbXBvcnQgYmF0Y2ggZnJvbSAnLi9tZXRob2RzL2JhdGNoLmpzJztcbmltcG9ydCBjbGVhbnVwIGZyb20gJy4vbWV0aG9kcy9jbGVhbnVwLmpzJztcbmltcG9ydCBjb21wdXRlZCBmcm9tICcuL21ldGhvZHMvY29tcHV0ZWQuanMnO1xuaW1wb3J0IGNvbnRleHQgZnJvbSAnLi9tZXRob2RzL2NvbnRleHQuanMnO1xuaW1wb3J0IGRpc3Bvc2VkIGZyb20gJy4vbWV0aG9kcy9kaXNwb3NlZC5qcyc7XG5pbXBvcnQgZWZmZWN0IGZyb20gJy4vbWV0aG9kcy9lZmZlY3QuanMnO1xuaW1wb3J0IGVycm9yIGZyb20gJy4vbWV0aG9kcy9lcnJvci5qcyc7XG5pbXBvcnQgX2ZvciBmcm9tICcuL21ldGhvZHMvZm9yLmpzJztcbmltcG9ydCBmb3JJbmRleCBmcm9tICcuL21ldGhvZHMvZm9yX2luZGV4LmpzJztcbmltcG9ydCBnZXQgZnJvbSAnLi9tZXRob2RzL2dldC5qcyc7XG5pbXBvcnQgX2lmIGZyb20gJy4vbWV0aG9kcy9pZi5qcyc7XG5pbXBvcnQgaXNPYnNlcnZhYmxlIGZyb20gJy4vbWV0aG9kcy9pc19vYnNlcnZhYmxlLmpzJztcbmltcG9ydCBpc1N0b3JlIGZyb20gJy4vbWV0aG9kcy9pc19zdG9yZS5qcyc7XG5pbXBvcnQgb2JzZXJ2YWJsZSBmcm9tICcuL21ldGhvZHMvb2JzZXJ2YWJsZS5qcyc7XG5pbXBvcnQgb2ZmIGZyb20gJy4vbWV0aG9kcy9vZmYuanMnO1xuaW1wb3J0IG9uIGZyb20gJy4vbWV0aG9kcy9vbi5qcyc7XG5pbXBvcnQgcmVhY3Rpb24gZnJvbSAnLi9tZXRob2RzL3JlYWN0aW9uLmpzJztcbmltcG9ydCByZWFkb25seSBmcm9tICcuL21ldGhvZHMvcmVhZG9ubHkuanMnO1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi9tZXRob2RzL3Jlc29sdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9tZXRob2RzL3Jvb3QuanMnO1xuaW1wb3J0IHNhbXBsZSBmcm9tICcuL21ldGhvZHMvc2FtcGxlLmpzJztcbmltcG9ydCBzZWxlY3RvciBmcm9tICcuL21ldGhvZHMvc2VsZWN0b3IuanMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vbWV0aG9kcy9zdG9yZS5qcyc7XG5pbXBvcnQgc3VzcGVuc2UgZnJvbSAnLi9tZXRob2RzL3N1c3BlbnNlLmpzJztcbmltcG9ydCBfc3dpdGNoIGZyb20gJy4vbWV0aG9kcy9zd2l0Y2guanMnO1xuaW1wb3J0IHRlcm5hcnkgZnJvbSAnLi9tZXRob2RzL3Rlcm5hcnkuanMnO1xuaW1wb3J0IHRyeUNhdGNoIGZyb20gJy4vbWV0aG9kcy90cnlfY2F0Y2guanMnO1xuaW1wb3J0IF93aXRoIGZyb20gJy4vbWV0aG9kcy93aXRoLmpzJztcbi8qIEVYUE9SVCAqL1xuZXhwb3J0IGRlZmF1bHQgJDtcbmV4cG9ydCB7IGJhdGNoLCBjbGVhbnVwLCBjb21wdXRlZCwgY29udGV4dCwgZGlzcG9zZWQsIGVmZmVjdCwgZXJyb3IsIF9mb3IgYXMgZm9yLCBmb3JJbmRleCwgZ2V0LCBfaWYgYXMgaWYsIGlzT2JzZXJ2YWJsZSwgaXNTdG9yZSwgb2JzZXJ2YWJsZSwgb2ZmLCBvbiwgcmVhY3Rpb24sIHJlYWRvbmx5LCByZXNvbHZlLCByb290LCBzYW1wbGUsIHNlbGVjdG9yLCBzdG9yZSwgc3VzcGVuc2UsIF9zd2l0Y2ggYXMgc3dpdGNoLCB0ZXJuYXJ5LCB0cnlDYXRjaCwgX3dpdGggYXMgd2l0aCB9O1xuZXhwb3J0IHsgU1lNQk9MX09CU0VSVkFCTEUsIFNZTUJPTF9PQlNFUlZBQkxFX0ZST1pFTiwgU1lNQk9MX09CU0VSVkFCTEVfUkVBREFCTEUsIFNZTUJPTF9PQlNFUlZBQkxFX1dSSVRBQkxFLCBTWU1CT0xfUkVTT0xWRV9VTldSQVBQRUQsIFNZTUJPTF9TQU1QTEVEIH07XG4iLCJpbXBvcnQgZCBmcm9tIFwiLi9ub2RlX21vZHVsZXMvLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9pbmRleC5qc1wiO2V4cG9ydCBkZWZhdWx0IGQ7XG5leHBvcnQgKiBmcm9tIFwiLi9ub2RlX21vZHVsZXMvLnBucG0vb2J5QDkuMi4wL25vZGVfbW9kdWxlcy9vYnkvZGlzdC9pbmRleC5qc1wiIl0sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxnQkFBZ0IsQ0FBQyxLQUFLLE1BQU07QUFDOUIsTUFBSSxlQUFlLE9BQU87QUFDdEIsUUFBSSxRQUFRO0FBQUEsYUFFUCxLQUFLO0FBQ1YsTUFBRTtBQUFBO0FBQUE7QUFHVixJQUFNLGdCQUFnQixDQUFDLEtBQUssR0FBRyxNQUFNO0FBQ2pDLFFBQU0sTUFBTSxJQUFJO0FBQ2hCLE1BQUksZUFBZSxPQUFPO0FBQ3RCLFFBQUksS0FBSztBQUFBLGFBRUosS0FBSztBQUNWLFFBQUksS0FBSyxDQUFDLEtBQUs7QUFBQSxTQUVkO0FBQ0QsUUFBSSxLQUFLO0FBQUE7QUFBQTtBQUdqQixJQUFNLGFBQWEsQ0FBQyxLQUFLLEdBQUcsTUFBTTtBQUM5QixRQUFNLE1BQU0sSUFBSTtBQUNoQixNQUFJLGVBQWUsS0FBSztBQUNwQixRQUFJLElBQUk7QUFBQSxhQUVILEtBQUs7QUFDVixVQUFNLElBQUksSUFBSTtBQUNkLE1BQUUsSUFBSTtBQUNOLE1BQUUsSUFBSTtBQUNOLFFBQUksS0FBSztBQUFBLFNBRVI7QUFDRCxRQUFJLEtBQUs7QUFBQTtBQUFBO0FBR2pCLElBQU0sZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE1BQU07QUFDakMsUUFBTSxNQUFNLElBQUk7QUFDaEIsTUFBSSxlQUFlLEtBQUs7QUFDcEIsUUFBSSxPQUFPO0FBQUEsYUFFTixRQUFRLEdBQUc7QUFDaEIsUUFBSSxLQUFLO0FBQUE7QUFBQTtBQUdqQixJQUFNLGNBQWMsQ0FBQyxLQUFLLE1BQU07QUFDNUIsTUFBSSxlQUFlLEtBQUs7QUFDcEIsZUFBVyxLQUFLLEtBQUs7QUFDakIsUUFBRTtBQUFBO0FBQUEsYUFHRCxLQUFLO0FBQ1YsTUFBRTtBQUFBO0FBQUE7QUFHVixJQUFNLGFBQWEsQ0FBQyxLQUFLLE1BQU07QUFDM0IsTUFBSSxlQUFlLEtBQUs7QUFDcEIsV0FBTyxJQUFJLElBQUk7QUFBQSxTQUVkO0FBQ0QsV0FBTyxRQUFRO0FBQUE7QUFBQTs7O0FDNUR2QixJQUFNLEVBQUUsYUFBYSxPQUFPO0FBRTVCLElBQU0sWUFBWSxDQUFDLFdBQVU7QUFDekIsTUFBSSxrQkFBaUI7QUFDakIsV0FBTztBQUNYLE1BQUksT0FBTyxXQUFVO0FBQ2pCLFdBQU8sSUFBSSxNQUFNO0FBQ3JCLFNBQU8sSUFBSSxNQUFNO0FBQUE7QUFFckIsSUFBTSxhQUFhLENBQUMsTUFBTTtBQUN0QixTQUFPLE9BQU8sTUFBTTtBQUFBO0FBRXhCLElBQU0sa0JBQWtCLENBQUMsTUFBTTtBQUMzQixTQUFPLFNBQVMsS0FBSyxPQUFPO0FBQUE7QUFFaEMsSUFBTSxXQUFXLENBQUMsTUFBTTtBQUNwQixTQUFRLE1BQU0sUUFBVSxPQUFPLE1BQU07QUFBQTtBQUV6QyxJQUFNLE1BQU0sQ0FBQyxHQUFHLE1BQU07QUFDbEIsU0FBTyxLQUFLLElBQUksR0FBRztBQUFBOzs7QUNkdkIscUJBQWU7QUFBQSxFQUVYLEdBQUcsVUFBUztBQUNSLGtCQUFjLE1BQU0sTUFBTTtBQUFBO0FBQUEsRUFFOUIsR0FBRyxRQUFRLEdBQUc7QUFDVixTQUFLLE1BQU8sTUFBSyxLQUFLO0FBQ3RCLFNBQUssR0FBRyxVQUFVO0FBQUE7QUFBQSxFQUV0QixHQUFHLFFBQU87QUFDTixrQkFBYyxNQUFNLE1BQU07QUFBQTtBQUFBLEVBRTlCLEdBQUcsYUFBWTtBQUNYLGtCQUFjLE1BQU0sTUFBTTtBQUFBO0FBQUEsRUFFOUIsRUFBRSxVQUFVO0FBQ1Isa0JBQWMsTUFBTSxNQUFNO0FBQUE7QUFBQSxFQUU5QixHQUFHLE9BQU07QUFDTCxlQUFXLE1BQU0sTUFBTTtBQUFBO0FBQUEsRUFFM0IsR0FBRyxPQUFNO0FBQ0wsa0JBQWMsTUFBTSxNQUFNO0FBQUE7QUFBQSxFQUc5QixRQUFRLFFBQVE7QUFDWixVQUFNLEVBQUUsSUFBSSxNQUFNO0FBQ2xCLFFBQUksTUFBTSxVQUFVO0FBQ2hCLGFBQU8sR0FBRztBQUNkLFdBQU8sTUFBTSxRQUFRLE1BQU0sU0FBUyxTQUFTLEVBQUUsUUFBUTtBQUFBO0FBQUEsRUFFM0QsRUFBRSxNQUFNLFdBQVc7QUFDZixVQUFNLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPO0FBQy9CLFFBQUksSUFBSTtBQUNKLFdBQUssS0FBSztBQUNWLG9CQUFjLElBQUksY0FBWTtBQUMxQixpQkFBUyxFQUFFLE1BQU07QUFBQTtBQUFBO0FBR3pCLFFBQUksSUFBSTtBQUNKLFdBQUssS0FBSztBQUNWLFVBQUksV0FBVztBQUNYLHNCQUFjLElBQUksaUJBQWM7QUFDNUIsY0FBSSxDQUFDLFlBQVcsWUFBWSxDQUFDLFlBQVcsRUFBRSxVQUFVO0FBQ2hELHdCQUFXLEdBQUc7QUFBQTtBQUFBO0FBQUEsYUFJckI7QUFDRCxhQUFLLEtBQUs7QUFBQTtBQUFBO0FBR2xCLFFBQUksSUFBSTtBQUNKLFdBQUssS0FBSztBQUNWLFdBQUssSUFBSTtBQUNULG9CQUFjLElBQUksY0FBVyxTQUFRLEtBQUs7QUFDMUMsV0FBSyxJQUFJO0FBQUE7QUFFYixRQUFJLElBQUk7QUFDSixXQUFLLEtBQUs7QUFBQTtBQUVkLFFBQUksSUFBSTtBQUNKLFdBQUssS0FBSztBQUFBO0FBQUE7QUFBQSxFQUdsQixLQUFLO0FBQ0QsVUFBTSxPQUFPLEtBQUs7QUFDbEIsVUFBTSxPQUFPLEtBQUs7QUFDbEIsUUFBSSxDQUFDO0FBQ0Q7QUFDSixTQUFLLEtBQUs7QUFDVixRQUFJLFNBQVM7QUFDVDtBQUNKLFVBQU0sSUFBSyxnQkFBZ0IsUUFBUyxPQUFPLENBQUM7QUFDNUMsVUFBTSxJQUFLLGdCQUFnQixRQUFTLE9BQU8sQ0FBQztBQUM1QztBQUFPLGVBQVMsS0FBSyxHQUFHLEtBQUssRUFBRSxRQUFRLEtBQUssSUFBSSxNQUFNO0FBQ2xELGNBQU0sS0FBSyxFQUFFO0FBQ2IsWUFBSSxHQUFHLFlBQVksR0FBRyxFQUFFO0FBQ3BCO0FBQ0osWUFBSSxPQUFPLEVBQUU7QUFDVDtBQUNKLGlCQUFTLEtBQUssR0FBRyxLQUFLLEVBQUUsUUFBUSxLQUFLLElBQUksTUFBTTtBQUMzQyxjQUFJLE9BQU8sRUFBRTtBQUNUO0FBQUE7QUFFUixXQUFHLEdBQUc7QUFBQTtBQUFBO0FBQUEsRUFHZCxNQUFNLFFBQU8sUUFBUTtBQUNqQixVQUFNLEVBQUUsSUFBSSxNQUFNO0FBQ2xCLFFBQUksSUFBSTtBQUNKLG9CQUFjLElBQUksT0FBSyxFQUFFLEtBQUssR0FBRztBQUNqQyxhQUFPO0FBQUEsV0FFTjtBQUNELFVBQUksTUFBTSxRQUFRLE1BQU0sU0FBUyxTQUFTLEVBQUUsTUFBTSxRQUFPO0FBQ3JELGVBQU87QUFDWCxVQUFJLFFBQVE7QUFDUixlQUFPO0FBQUEsYUFFTjtBQUNELGNBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlsQixFQUFFLEdBQUc7QUFDRCxVQUFNLFlBQVksTUFBTTtBQUN4QixVQUFNLGVBQWUsU0FBUztBQUM5QixVQUFNLElBQUk7QUFDVixhQUFTLElBQUk7QUFDYixRQUFJO0FBQ0osUUFBSTtBQUNBLFdBQUs7QUFBQSxhQUVGLFFBQVA7QUFDSSxXQUFLLE1BQU0sVUFBVSxTQUFRO0FBQUEsY0FFakM7QUFDSSxZQUFNLElBQUk7QUFDVixlQUFTLElBQUk7QUFBQTtBQUVqQixXQUFPO0FBQUE7QUFBQTtBQUlmLElBQU8sbUJBQVE7OztBQ2hJZiw4QkFBd0IsaUJBQVM7QUFBQSxFQUM3QixjQUFjO0FBRVYsVUFBTSxHQUFHO0FBQ1QsU0FBSyxXQUFXO0FBQUE7QUFBQTtBQUl4QixJQUFPLG9CQUFROzs7QUNSZixJQUFNLFFBQVEsRUFBRSxHQUFHO0FBQ25CLElBQU0sUUFBUSxNQUFNO0FBQ3BCLElBQU0sS0FBSyxPQUFPO0FBQ2xCLElBQU0sT0FBTyxNQUFNO0FBQUE7QUFDbkIsSUFBTSxjQUFjLElBQUk7QUFDeEIsSUFBTSxRQUFRLEVBQUUsR0FBRztBQUNuQixJQUFNLE9BQU8sRUFBRSxHQUFHO0FBQ2xCLElBQU0sV0FBVyxFQUFFLEdBQUc7QUFDdEIsSUFBTSxXQUFXLEVBQUUsR0FBRztBQUN0QixJQUFNLG1CQUFtQixFQUFFLEdBQUc7QUFDOUIsSUFBTSxvQkFBb0IsT0FBTztBQUNqQyxJQUFNLDJCQUEyQixPQUFPO0FBQ3hDLElBQU0sNkJBQTZCLE9BQU87QUFDMUMsSUFBTSw2QkFBNkIsT0FBTztBQUMxQyxJQUFNLDJCQUEyQixPQUFPO0FBQ3hDLElBQU0saUJBQWlCLE9BQU87QUFDOUIsSUFBTSxlQUFlLE9BQU87QUFDNUIsSUFBTSxzQkFBc0IsT0FBTztBQUNuQyxJQUFNLHNCQUFzQixPQUFPO0FBQ25DLElBQU0sa0JBQWtCLE9BQU87QUFDL0IsSUFBTSxPQUFPLE1BQU07OztBQ25CbkIsSUFBTSxRQUFRLENBQUMsR0FBRyxnQkFBZSxZQUFXLEVBQUU7QUFDOUMsSUFBTSxJQUFJLENBQUMsR0FBRyxnQkFBZSxZQUFXLEVBQUU7QUFDMUMsSUFBTSxJQUFJLENBQUMsR0FBRyxnQkFBZSxZQUFXLEVBQUU7QUFDMUMsZUFBZSxHQUFHO0FBQ2QsTUFBSSxXQUFXLElBQUk7QUFDZixRQUFJLE1BQU0sR0FBRztBQUNULGFBQU87QUFBQSxXQUVOO0FBQ0QsWUFBTSxTQUFRLE1BQU0sSUFBSSxJQUFJO0FBQzVCLFVBQUk7QUFDQSxlQUFPO0FBQUEsZ0JBRVg7QUFDSSxjQUFNLElBQUk7QUFDVixZQUFJLE9BQU0sT0FBTyxHQUFHO0FBQ2hCLGlCQUFNLFFBQVE7QUFBQTtBQUVsQixZQUFJO0FBQ0EsaUJBQU0sUUFBUTtBQUFBLGtCQUVsQjtBQUNJLGNBQUksT0FBTSxPQUFPLEdBQUc7QUFDaEIsbUJBQU0sUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FNN0I7QUFDRCxXQUFPO0FBQUE7QUFBQTtBQUtmLElBQU8sZ0JBQVE7OztBQ3BDZixJQUFNLFVBQVUsQ0FBQyxNQUFNO0FBQ25CLE1BQUksTUFBTSxNQUFNO0FBQ1o7QUFDSixRQUFNLEVBQUUsR0FBRztBQUFBO0FBR2YsSUFBTyxrQkFBUTs7O0FDTGYsSUFBTSxFQUFFLE1BQU0sY0FBYztBQUM1QixJQUFNLEVBQUUsbUJBQW1CO0FBQzNCLHdCQUF3QixRQUFRO0FBQzVCLE1BQUksVUFBVTtBQUNWLFVBQU0sSUFBSSxNQUFNO0FBQ3BCLFNBQU87QUFBQTtBQUVYLDBCQUEwQixRQUFRO0FBQzlCLE1BQUksVUFBVSxRQUFRO0FBQ2xCLFFBQUksV0FBVztBQUNYLGFBQU87QUFDWCxVQUFNLElBQUksTUFBTTtBQUFBO0FBRXBCLFNBQU8sS0FBSztBQUFBO0FBRWhCLDBCQUEwQixHQUFHO0FBQ3pCLE1BQUksVUFBVSxRQUFRO0FBQ2xCLFFBQUksTUFBTTtBQUNOLGFBQU87QUFDWCxRQUFJLFdBQVc7QUFDWCxhQUFPLEtBQUssRUFBRTtBQUNsQixXQUFPLEtBQUssRUFBRTtBQUFBO0FBRWxCLFNBQU8sS0FBSztBQUFBO0FBRWhCLElBQU0sa0JBQWtCLGVBQWUsR0FBRyxvQkFBb0IsT0FBTywyQkFBMkIsUUFBUTtBQUN4RyxJQUFNLG9CQUFvQixlQUFlLEdBQUcsb0JBQW9CLE9BQU8sNkJBQTZCLFFBQVE7QUFDNUcsSUFBTSxvQkFBb0IsZUFBZSxHQUFHLG9CQUFvQixPQUFPLDZCQUE2QixRQUFRO0FBQzVHLGVBQWUsZ0JBQWdCO0FBQy9CLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsa0JBQWtCO0FBQ2pDLElBQU0sSUFBSSxLQUFLLEtBQUs7QUFDcEIsSUFBTSxJQUFJLEtBQUssS0FBSztBQUNwQixJQUFNLElBQUksS0FBSyxLQUFLOzs7QUNoQ3BCLGdDQUEwQixpQkFBUztBQUFBLEVBRS9CLFlBQVksR0FBRztBQUNYO0FBRUEsU0FBSyxJQUFJLE1BQU07QUFDZixTQUFLLElBQUksTUFBTSxFQUFFLEtBQUssS0FBSztBQUMzQixTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFDVCxRQUFJLGdCQUFnQjtBQUNoQixZQUFNLElBQUksTUFBTTtBQUFBO0FBQUEsRUFHeEIsRUFBRSxPQUFPO0FBQ0wsU0FBSyxLQUFLO0FBQ1YsU0FBSyxLQUFNLE1BQUssSUFBSTtBQUFBO0FBQUEsRUFFeEIsRUFBRSxPQUFPO0FBQ0wsUUFBSSxDQUFDLEtBQUs7QUFDTjtBQUNKLFNBQUssS0FBSztBQUNWLFNBQUssS0FBTSxNQUFLLElBQUk7QUFDcEIsUUFBSSxLQUFLO0FBQ0w7QUFDSixZQUFRLEtBQUs7QUFDYixTQUFLLElBQUk7QUFDVCxRQUFJLEtBQUs7QUFDTDtBQUNKLFNBQUssRUFBRTtBQUFBO0FBQUEsRUFFWCxFQUFFLE9BQU87QUFBQTtBQUFBO0FBR2IsSUFBTyxzQkFBUTs7O0FDbENmLHVCQUFpQjtBQUFBLEVBRWIsWUFBWSxHQUFHLFNBQVMsR0FBRztBQUN2QixTQUFLLElBQUksTUFBTSxFQUFFLEtBQUssS0FBSztBQUMzQixTQUFLLElBQUk7QUFDVCxRQUFJLEdBQUc7QUFDSCxXQUFLLElBQUk7QUFBQTtBQUViLFFBQUssYUFBWSxRQUFRLFlBQVksU0FBUyxTQUFTLFFBQVEsWUFBWSxRQUFXO0FBQ2xGLFdBQUssU0FBUyxRQUFRLFVBQVU7QUFBQTtBQUFBO0FBQUEsRUFJeEMsR0FBRyxVQUFVO0FBQ1QsYUFBUyxLQUFLLFVBQVUsS0FBSztBQUM3QixRQUFJLFdBQVcsS0FBSyxJQUFJO0FBQ3BCO0FBQ0osZUFBVyxNQUFNLE1BQU07QUFBQTtBQUFBLEVBRTNCLEVBQUUsVUFBVTtBQUNSLGVBQVcsTUFBTSxNQUFNO0FBQUE7QUFBQSxFQUUzQixLQUFLO0FBQ0QsUUFBSTtBQUNKLFFBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtBQUN4QjtBQUNKLFFBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxhQUFhLHFCQUFhO0FBQy9DLFdBQUssRUFBRSxNQUFNO0FBQ2IsWUFBTSxFQUFFLEdBQUc7QUFBQTtBQUVmLFFBQUssTUFBSyxLQUFLLE9BQU8sUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLEdBQUc7QUFDekQsV0FBSyxFQUFFLElBQUk7QUFDWCxXQUFLLEVBQUUsSUFBSTtBQUNYLFdBQUssRUFBRSxFQUFFO0FBQUE7QUFBQTtBQUFBLEVBR2pCLEdBQUcsVUFBVTtBQUNULGtCQUFjLE1BQU0sTUFBTTtBQUFBO0FBQUEsRUFFOUIsR0FBRyxVQUFVO0FBQ1Qsa0JBQWMsTUFBTSxNQUFNO0FBQUE7QUFBQSxFQUc5QixJQUFJO0FBQ0EsU0FBSztBQUNMLFdBQU8sS0FBSztBQUFBO0FBQUEsRUFFaEIsRUFBRSxHQUFHO0FBQ0QsUUFBSSxLQUFLO0FBQ0wsWUFBTSxJQUFJLE1BQU07QUFDcEIsUUFBSSxNQUFNLEdBQUc7QUFDVCxZQUFNLEVBQUUsSUFBSSxNQUFNO0FBQ2xCLGFBQU87QUFBQSxXQUVOO0FBQ0QsWUFBTSxTQUFTLEtBQUssVUFBVTtBQUM5QixZQUFNLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSztBQUM5QixVQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QsWUFBSSxDQUFDO0FBQ0QsaUJBQU87QUFDWCxZQUFJLENBQUMsS0FBSyxFQUFFLFVBQVU7QUFDbEIsZUFBSyxFQUFFO0FBQUE7QUFBQTtBQUdmLFVBQUksT0FBTztBQUNQLGNBQU0sWUFBWSxLQUFLO0FBQ3ZCLGFBQUssSUFBSTtBQUNULGFBQUssR0FBRztBQUFBO0FBRVosVUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVO0FBQ2xCLGFBQUssRUFBRTtBQUFBO0FBRVgsYUFBTztBQUFBO0FBQUE7QUFBQSxFQUdmLEVBQUUsR0FBRztBQUNELFVBQU0sWUFBWSxFQUFFLEtBQUs7QUFDekIsV0FBTyxLQUFLLEVBQUU7QUFBQTtBQUFBLEVBRWxCLEdBQUcsV0FBVztBQUNWLFFBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtBQUN4QjtBQUNKLFVBQU0sRUFBRSxPQUFPO0FBQ2YsUUFBSSxJQUFJO0FBQ0osVUFBSSxjQUFjLEtBQUs7QUFDbkIsbUJBQVcsWUFBWSxJQUFJO0FBQ3ZCLG1CQUFTLEtBQUssVUFBVSxLQUFLLEdBQUc7QUFBQTtBQUFBLGFBR25DO0FBQ0QsV0FBRyxLQUFLLElBQUksS0FBSyxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJaEMsRUFBRSxPQUFPO0FBQ0wsUUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO0FBQ3hCO0FBQ0osVUFBTSxlQUFlLEtBQUs7QUFDMUIsUUFBSSxjQUFjO0FBQ2QsVUFBSSx3QkFBd0IsS0FBSztBQUM3QixtQkFBVyxlQUFlLGNBQWM7QUFDcEMsc0JBQVksRUFBRTtBQUFBO0FBQUEsYUFHakI7QUFDRCxxQkFBYSxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJM0IsRUFBRSxPQUFPO0FBQ0wsUUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO0FBQ3hCO0FBQ0osVUFBTSxlQUFlLEtBQUs7QUFDMUIsUUFBSSxjQUFjO0FBQ2QsVUFBSSx3QkFBd0IsS0FBSztBQUM3QixtQkFBVyxlQUFlLGNBQWM7QUFDcEMsc0JBQVksRUFBRTtBQUFBO0FBQUEsYUFHakI7QUFDRCxxQkFBYSxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJM0IsSUFBSTtBQUNBLFNBQUssV0FBVztBQUFBO0FBQUE7QUFJeEIsSUFBTyxxQkFBUTs7O0FDaklmLDZCQUF1QixvQkFBWTtBQUFBLEVBRS9CLFlBQVksR0FBRyxTQUFTO0FBQ3BCLFVBQU07QUFDTixTQUFLLElBQUk7QUFDVCxTQUFLLGFBQWEsSUFBSSxtQkFBVyxRQUFXLFNBQVM7QUFDckQsU0FBSyxFQUFFLEVBQUU7QUFDVCxTQUFLLEVBQUU7QUFBQTtBQUFBLEVBR1gsRUFBRSxNQUFNLFdBQVc7QUFDZixRQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVTtBQUMxQixXQUFLLFdBQVc7QUFBQTtBQUVwQixVQUFNLEVBQUUsTUFBTTtBQUFBO0FBQUEsRUFFbEIsRUFBRSxPQUFPO0FBQ0wsUUFBSSxDQUFDLEtBQUssR0FBRztBQUNULFdBQUssV0FBVyxFQUFFO0FBQUE7QUFFdEIsVUFBTSxFQUFFO0FBQUE7QUFBQSxFQUVaLEVBQUUsT0FBTztBQUNMLFFBQUksU0FBUyxDQUFDLEtBQUssV0FBVyxZQUFZLENBQUMsS0FBSyxXQUFXLEVBQUUsVUFBVTtBQUNuRSxZQUFNLFNBQVMsS0FBSztBQUNwQixVQUFJLFFBQVE7QUFDUixhQUFLLElBQUksUUFBUSxJQUFJLElBQUksUUFBUTtBQUNqQyxZQUFJLFNBQVMsR0FBRztBQUNaLGVBQUssV0FBVyxFQUFFO0FBQUE7QUFBQSxhQUdyQjtBQUNELGFBQUssSUFBSTtBQUNULGFBQUs7QUFDTCxZQUFJO0FBQ0EsZ0JBQU0sSUFBSSxLQUFLLEVBQUUsS0FBSztBQUN0QixlQUFLO0FBQ0wsY0FBSSxLQUFLLFdBQVcsWUFBWSxLQUFLLFdBQVcsRUFBRSxVQUFVO0FBQ3hELGlCQUFLLFdBQVcsRUFBRTtBQUFBLGlCQUVqQjtBQUNELGlCQUFLLFdBQVcsRUFBRTtBQUFBO0FBRXRCLGNBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUk7QUFDbEMsaUJBQUssRUFBRSxNQUFNO0FBQUE7QUFBQSxpQkFHZCxRQUFQO0FBQ0ksZUFBSztBQUNMLGVBQUssTUFBTSxVQUFVLFNBQVE7QUFDN0IsZUFBSyxXQUFXLEVBQUU7QUFBQSxrQkFFdEI7QUFDSSxnQkFBTSxVQUFTLEtBQUs7QUFDcEIsZUFBSyxJQUFJO0FBQ1QsY0FBSSxVQUFTLEdBQUc7QUFDWixpQkFBSyxFQUFFLFlBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUs3QjtBQUNELFdBQUssV0FBVyxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBSzlCLElBQU8sbUJBQVE7OztBQ25FZixJQUFNLFdBQVcsTUFBTTtBQUFBO0FBQ3ZCLElBQU0sbUJBQW1CLElBQUksbUJBQVc7QUFFeEMsSUFBTSxXQUFXLENBQUMsR0FBRyxZQUFZO0FBQzdCLFFBQU0sWUFBVyxJQUFJLGlCQUFTLEdBQUc7QUFDakMsUUFBTSxFQUFFLDRCQUFlO0FBQ3ZCLE1BQUksQ0FBQyxVQUFTLElBQUk7QUFDZCxjQUFTLElBQUk7QUFDYixjQUFTLGFBQWE7QUFDdEIsV0FBTyxFQUFFLFlBQVc7QUFBQSxTQUVuQjtBQUNELFdBQU8sRUFBRTtBQUFBO0FBQUE7QUFJakIsSUFBTyxvQkFBUTs7O0FDbkJmLGlCQUFpQixRQUFRLEdBQUc7QUFDeEIsTUFBSSxVQUFVLFNBQVMsR0FBRztBQUN0QixXQUFPLE1BQU0sRUFBRSxRQUFRO0FBQUEsU0FFdEI7QUFDRCxXQUFPLE1BQU0sRUFBRSxHQUFHLFFBQVE7QUFBQTtBQUFBO0FBSWxDLElBQU8sa0JBQVE7OztBQ05mLElBQU0sV0FBVyxNQUFNO0FBQ25CLFFBQU0sY0FBYSxJQUFJLG1CQUFXO0FBQ2xDLGtCQUFRLE1BQU07QUFDVixnQkFBVyxFQUFFO0FBQUE7QUFFakIsU0FBTyxFQUFFO0FBQUE7QUFHYixJQUFPLG1CQUFROzs7QUNWZixJQUFNLEtBQUssTUFBTTtBQUNiLE1BQUksQ0FBQyxpQkFBaUI7QUFDbEIsV0FBTztBQUNYLFFBQU0sWUFBVyxTQUFTLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFDL0MsU0FBUSxlQUFhLFFBQVEsY0FBYSxTQUFTLFNBQVMsVUFBUyxPQUFPO0FBQUE7QUFHaEYsSUFBTyxvQkFBUTs7O0FDTGYsNkJBQXVCLG9CQUFZO0FBQUEsRUFFL0IsWUFBWSxHQUFHLElBQUk7QUFDZixVQUFNO0FBQ04sU0FBSyxJQUFJO0FBQ1QsU0FBSyxFQUFFLEVBQUU7QUFDVCxRQUFJLE1BQU0scUJBQU07QUFDWixXQUFLLEVBQUU7QUFBQSxXQUVOO0FBQ0QsV0FBSyxFQUFFO0FBQUE7QUFBQTtBQUFBLEVBSWYsRUFBRSxPQUFPO0FBQ0wsUUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVU7QUFDM0IsWUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBSSxRQUFRO0FBQ1IsYUFBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLFFBQVE7QUFBQSxhQUVoQztBQUNELGFBQUssSUFBSTtBQUNULGFBQUs7QUFDTCxZQUFJO0FBQ0EsZ0JBQU0sV0FBVSxLQUFLLEVBQUUsS0FBSztBQUM1QixlQUFLO0FBQ0wsY0FBSSxXQUFXLFdBQVU7QUFDckIsaUJBQUssR0FBRztBQUFBLGlCQUVQO0FBQ0QsZ0JBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUk7QUFDbEMsbUJBQUssRUFBRSxNQUFNO0FBQUE7QUFBQTtBQUFBLGlCQUlsQixRQUFQO0FBQ0ksZUFBSztBQUNMLGVBQUssTUFBTSxVQUFVLFNBQVE7QUFBQSxrQkFFakM7QUFDSSxnQkFBTSxVQUFTLEtBQUs7QUFDcEIsZUFBSyxJQUFJO0FBQ1QsY0FBSSxVQUFTLEdBQUc7QUFDWixpQkFBSyxFQUFFLFlBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRMUMsSUFBTyxtQkFBUTs7O0FDckRmLDJCQUFxQixpQkFBUztBQUFBLEVBRTFCLFlBQVksR0FBRztBQUNYLFVBQU0sR0FBRztBQUFBO0FBQUE7QUFJakIsSUFBTyxpQkFBUTs7O0FDTGYsSUFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQixRQUFNLFVBQVMsSUFBSSxlQUFPO0FBQzFCLE1BQUksQ0FBQyxRQUFPLE1BQU0sQ0FBQyxxQkFBTTtBQUNyQixZQUFPLElBQUk7QUFBQTtBQUVmLFNBQU8sUUFBTyxFQUFFLEtBQUssU0FBUSxNQUFNO0FBQUE7QUFHdkMsSUFBTyxrQkFBUTs7O0FDVmYsSUFBTSxRQUFRLENBQUMsTUFBTTtBQUNqQixRQUFNLEVBQUUsR0FBRztBQUFBO0FBR2YsSUFBTyxnQkFBUTs7O0FDSGYsSUFBTSxVQUFVLENBQUMsTUFBTTtBQUNuQixTQUFPLFNBQVMsTUFBTyxnQkFBZ0I7QUFBQTtBQUczQyxJQUFPLG1CQUFROzs7QUNMZixnQkFBZ0IsR0FBRztBQUNmLE1BQUksV0FBVyxJQUFJO0FBQ2YsUUFBSSxTQUFTLEdBQUc7QUFDWixhQUFPO0FBQUEsV0FFTjtBQUNELGVBQVMsSUFBSTtBQUNiLFVBQUk7QUFDQSxlQUFPO0FBQUEsZ0JBRVg7QUFDSSxpQkFBUyxJQUFJO0FBQUE7QUFBQTtBQUFBLFNBSXBCO0FBQ0QsV0FBTztBQUFBO0FBQUE7QUFLZixJQUFPLGlCQUFROzs7QUNqQmYsSUFBTSxVQUFVLENBQUMsTUFBTTtBQUNuQixNQUFJLFdBQVcsSUFBSTtBQUNmLFFBQUksa0JBQWtCLEdBQUc7QUFDckIsVUFBSSw0QkFBNEIsR0FBRztBQUMvQixlQUFPLFFBQVE7QUFBQSxhQUVkO0FBQ0QsZUFBTyxFQUFFLFFBQVE7QUFBQTtBQUFBLGVBR2hCLHFCQUFxQixHQUFHO0FBQzdCLGFBQU87QUFBQSxXQUVOO0FBQ0QsYUFBTyxrQkFBUyxNQUFNLFFBQVE7QUFBQTtBQUFBO0FBR3RDLE1BQUksYUFBYSxPQUFPO0FBQ3BCLFVBQU0sV0FBVyxJQUFJLE1BQU0sRUFBRTtBQUM3QixhQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUM3QyxlQUFTLEtBQUssUUFBUSxFQUFFO0FBQUE7QUFFNUIsV0FBTztBQUFBLFNBRU47QUFDRCxXQUFPO0FBQUE7QUFBQTtBQUlmLElBQU8sa0JBQVE7OztBQ2pDZixJQUFNLGNBQWMsTUFBTTtBQUN0QixTQUFPLENBQUMsQ0FBQyxpQkFBaUIsS0FBTSxFQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUTtBQUFBO0FBR3RFLElBQU8sc0JBQVE7OztBQ0ZmLHlCQUFtQixpQkFBUztBQUFBLEVBRXhCLFlBQVksSUFBSTtBQUNaO0FBRUEsU0FBSyxJQUFJLE1BQU07QUFDZixRQUFJLE1BQU0sdUJBQWU7QUFDckIsV0FBSyxLQUFLO0FBQ1YsV0FBSyxFQUFFLEdBQUc7QUFBQTtBQUFBO0FBQUEsRUFJbEIsRUFBRSxNQUFNLFdBQVc7QUFDZixTQUFLLFdBQVc7QUFDaEIsUUFBSSxLQUFLLElBQUk7QUFDVCxXQUFLLEVBQUUsR0FBRztBQUFBO0FBRWQsVUFBTSxFQUFFLE1BQU07QUFBQTtBQUFBLEVBRWxCLEVBQUUsR0FBRztBQUNELFVBQU0sSUFBSSxLQUFLLEVBQUUsS0FBSyxNQUFNLE1BQU07QUFDbEMsVUFBTSxnQkFBZ0IsRUFBRSxLQUFLLFFBQVc7QUFDeEMsVUFBTSxXQUFXLEtBQUs7QUFDdEIsU0FBSyxJQUFJO0FBQ1QsUUFBSTtBQUNBLGFBQU8sTUFBTSxFQUFFO0FBQUEsY0FFbkI7QUFDSSxXQUFLLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFLckIsSUFBTyxlQUFROzs7QUM5QmYsSUFBTSxjQUFjLEVBQUU7QUFDdEIsK0JBQXlCLGFBQUs7QUFBQTtBQUc5QixrQkFBWTtBQUFBLEVBRVIsWUFBWSxHQUFHO0FBQ1gsU0FBSyxLQUFLLElBQUk7QUFDZCxTQUFLLEtBQUs7QUFDVixTQUFLLEtBQUs7QUFDVixTQUFLLEtBQUs7QUFDVixTQUFLLElBQUksTUFBTTtBQUVmLFNBQUssVUFBVSxNQUFNO0FBQ2pCLFVBQUksQ0FBQyxLQUFLO0FBQ047QUFDSixVQUFJLENBQUMsS0FBSztBQUNOLGVBQU8sS0FBSztBQUNoQixZQUFNLEVBQUUsSUFBSSxPQUFPO0FBQ25CLFNBQUcsUUFBUSxDQUFDLFFBQVEsTUFBTTtBQUN0QixZQUFJLE9BQU8sT0FBTztBQUNkO0FBQ0osZUFBTyxFQUFFLE1BQU07QUFDZixXQUFHLE9BQU87QUFBQTtBQUFBO0FBR2xCLFNBQUssSUFBSSxNQUFNO0FBQ1gsV0FBSyxFQUFFLEdBQUcsS0FBSztBQUNmLFVBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVDtBQUNKLFdBQUssR0FBRyxRQUFRLFlBQVU7QUFDdEIsZUFBTyxFQUFFLE1BQU07QUFBQTtBQUVuQixXQUFLLEtBQUssSUFBSTtBQUFBO0FBRWxCLFNBQUssS0FBSyxDQUFDLFdBQVc7QUFDbEIsV0FBSyxLQUFLLENBQUMsS0FBSztBQUNoQixXQUFLLEtBQUs7QUFBQTtBQUVkLFNBQUssS0FBSyxDQUFDLFdBQVc7QUFDbEIsV0FBSyxLQUFLLE9BQU87QUFDakIsV0FBSztBQUNMLFdBQUssS0FBSyxLQUFLO0FBQUE7QUFFbkIsU0FBSyxNQUFNLENBQUMsR0FBRyxVQUFVO0FBQ3JCLFVBQUk7QUFDSixZQUFNLEVBQUUsSUFBSSxJQUFJLE9BQUcsT0FBTztBQUMxQixZQUFNLFNBQVMsR0FBRyxJQUFJO0FBQ3RCLFVBQUksVUFBVSxPQUFPLE9BQU8sSUFBSTtBQUM1QixlQUFPLEtBQUs7QUFDWixRQUFDLE1BQUssT0FBTyxnQkFBZ0IsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLEVBQUU7QUFDbkUsZUFBTyxPQUFPO0FBQUEsYUFFYjtBQUNELGNBQU0sU0FBUyxJQUFJO0FBQ25CLFlBQUksUUFBUTtBQUNSLDBCQUFRLE1BQU0sT0FBTztBQUFBO0FBRXpCLGVBQU8sT0FBTyxFQUFFLE1BQU07QUFDbEIsY0FBSSxjQUFhO0FBQ2pCLGNBQUksSUFBSTtBQUNKLG1CQUFPLGFBQWEsSUFBSSxtQkFBVztBQUNuQywwQkFBYSxFQUFFLE9BQU87QUFBQTtBQUUxQixnQkFBTSxLQUFLLGdCQUFRLEdBQUUsR0FBRztBQUN4QixpQkFBTyxLQUFLO0FBQ1osaUJBQU8sS0FBSztBQUNaLGNBQUksQ0FBQyxRQUFRO0FBQ1QsZUFBRyxJQUFJLEdBQUc7QUFBQTtBQUVkLGlCQUFPO0FBQUE7QUFBQTtBQUFBO0FBSW5CLFNBQUssS0FBSyxNQUFNO0FBQ1osYUFBTyxNQUFNLEtBQUssS0FBSyxHQUFHO0FBQUE7QUFFOUIsU0FBSyxJQUFJO0FBQ1QsU0FBSyxLQUFNLEVBQUUsU0FBUztBQUN0QixTQUFLLEVBQUUsR0FBRyxLQUFLO0FBQUE7QUFBQTtBQUt2QixJQUFPLG9CQUFROzs7QUNsRmYsSUFBTSxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVcsT0FBTztBQUN2QyxRQUFNLEtBQUssSUFBSSxrQkFBTTtBQUNyQixRQUFNLEVBQUUsR0FBRyxJQUFJLElBQUksUUFBUTtBQUMzQixrQkFBUTtBQUNSLFNBQU8sa0JBQVMsTUFBTTtBQUNsQixVQUFNLFFBQVEsV0FBVyxVQUFVLFdBQVc7QUFDOUMsUUFBSSxpQkFBUTtBQUNSLFlBQU07QUFDVixPQUFHO0FBQ0gsVUFBTSxLQUFLLGVBQU8sTUFBTSxNQUFNLFNBQVMsTUFBTSxJQUFJLE9BQU8sZ0JBQVE7QUFDaEUsT0FBRztBQUNILFdBQU87QUFBQTtBQUFBO0FBSWYsSUFBTyxjQUFROzs7QUNyQmYsSUFBTSxlQUFlLENBQUMsTUFBTTtBQUN4QixTQUFPLFdBQVcsTUFBTyxxQkFBcUI7QUFBQTtBQUdsRCxJQUFPLHdCQUFROzs7QUNKZixJQUFNLE1BQU0sQ0FBQyxNQUFNO0FBQ2YsTUFBSSxzQkFBYTtBQUNiLFdBQU87QUFDWCxTQUFPO0FBQUE7QUFHWCxJQUFPLGNBQVE7OztBQ0ZmLGdDQUEwQixhQUFLO0FBQUE7QUFHL0IsbUJBQVk7QUFBQSxFQUVSLFlBQVksR0FBRztBQUNYLFNBQUssSUFBSSxNQUFNO0FBRWYsU0FBSyxVQUFVLENBQUMsZUFBZTtBQUMzQixZQUFNLEVBQUUsT0FBTztBQUNmLGVBQVMsSUFBSSxZQUFZLElBQUksR0FBRyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQ2hELFdBQUcsR0FBRyxFQUFFLE1BQU07QUFBQTtBQUVsQixTQUFHLFNBQVM7QUFBQTtBQUVoQixTQUFLLElBQUksTUFBTTtBQUNYLFdBQUssRUFBRSxHQUFHLEtBQUs7QUFDZixXQUFLLFFBQVE7QUFBQTtBQUVqQixTQUFLLE1BQU0sQ0FBQyxXQUFXO0FBQ25CLFlBQU0sRUFBRSxJQUFJLFVBQU07QUFDbEIsWUFBTSxVQUFVO0FBQ2hCLGVBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQzNDLGNBQU0sSUFBSSxPQUFPO0FBQ2pCLGNBQU0sU0FBUyxHQUFHO0FBQ2xCLFlBQUksUUFBUTtBQUNSLGlCQUFPLEdBQUcsRUFBRTtBQUNaLGtCQUFRLEtBQUssT0FBTztBQUFBLGVBRW5CO0FBQ0QsZ0JBQU0sVUFBVSxJQUFJO0FBQ3BCLGtCQUFRLEVBQUUsTUFBTTtBQUNaLGtCQUFNLEtBQUssSUFBSSxtQkFBVztBQUMxQixrQkFBTSxNQUFLLGtCQUFTLE1BQU0sWUFBSSxHQUFHO0FBQ2pDLG9CQUFRLEtBQUs7QUFDYixvQkFBUSxLQUFLO0FBQ2Isb0JBQVEsS0FBSyxnQkFBUSxHQUFFLEtBQUk7QUFDM0IsZUFBRyxLQUFLO0FBQ1Isb0JBQVEsS0FBSyxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBSWpDLFdBQUssUUFBUSxPQUFPO0FBQ3BCLGFBQU87QUFBQTtBQUVYLFNBQUssS0FBSyxNQUFNO0FBQ1osYUFBTyxNQUFNLEtBQUssS0FBSyxHQUFHO0FBQUE7QUFFOUIsU0FBSyxJQUFJO0FBQ1QsU0FBSyxLQUFLO0FBQ1YsU0FBSyxFQUFFLEdBQUcsS0FBSztBQUFBO0FBQUE7QUFLdkIsSUFBTywwQkFBUTs7O0FDckRmLElBQU0sV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLE9BQU87QUFDM0MsUUFBTSxLQUFLLElBQUksd0JBQU07QUFDckIsUUFBTSxFQUFFLEdBQUcsUUFBUTtBQUNuQixrQkFBUTtBQUNSLFNBQU8sa0JBQVMsTUFBTTtBQUNsQixVQUFNLFFBQVEsV0FBVyxVQUFVLFdBQVc7QUFDOUMsUUFBSSxpQkFBUTtBQUNSLFlBQU07QUFDVixVQUFNLEtBQUssZUFBTyxNQUFNLE1BQU0sU0FBUyxJQUFJLFNBQVMsZ0JBQVE7QUFDNUQsV0FBTztBQUFBO0FBQUE7QUFJZixJQUFPLG9CQUFROzs7QUNsQmYsSUFBTSxVQUFVLENBQUMsTUFBTTtBQUNuQixNQUFJLENBQUMsV0FBVztBQUNaLFdBQU8sSUFBSSxPQUFPO0FBQ3RCLFNBQU8sa0JBQVMsTUFBTSxDQUFDLENBQUM7QUFBQTtBQUc1QixJQUFPLGtCQUFROzs7QUNOZixpQkFBaUIsTUFBTSxRQUFRO0FBQzNCLFFBQU0sSUFBSSxrQkFBUyxNQUFNO0FBQ3JCLFVBQU0sWUFBWSxXQUFXLFFBQVEsU0FBUztBQUM5QyxhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxJQUFJLEdBQUcsS0FBSztBQUMzQyxZQUFNLEtBQUksT0FBTztBQUNqQixVQUFJLEdBQUUsV0FBVztBQUNiLGVBQU8sR0FBRTtBQUNiLFVBQUksR0FBRyxHQUFFLElBQUk7QUFDVCxlQUFPLEdBQUU7QUFBQTtBQUFBO0FBR3JCLFNBQU8sa0JBQVMsTUFBTTtBQUNsQixXQUFPLGdCQUFRO0FBQUE7QUFBQTtBQUt2QixJQUFPLGlCQUFROzs7QUNsQmYsSUFBTSxVQUFVLENBQUMsTUFBTSxXQUFXLGVBQWU7QUFDN0MsUUFBTSxZQUFZLGdCQUFRO0FBQzFCLFNBQU8sZUFBUSxXQUFXLENBQUMsQ0FBQyxNQUFNLFlBQVksQ0FBQztBQUFBO0FBR25ELElBQU8sa0JBQVE7OztBQ05mLElBQU0sTUFBTSxDQUFDLE1BQU0sV0FBVyxlQUFlO0FBQ3pDLFNBQU8sZ0JBQVEsTUFBTSxXQUFXO0FBQUE7QUFHcEMsSUFBTyxhQUFROzs7QUNIZixJQUFNLEtBQUssQ0FBQyxnQkFBZTtBQUN2QixNQUFJLHVCQUFzQjtBQUN0QixXQUFPO0FBQ1gsTUFBSSw0QkFBNEI7QUFDNUIsVUFBTSxJQUFJO0FBQ2QsU0FBTyxZQUFXO0FBQUE7QUFHdEIsSUFBTyxpQkFBUTs7O0FDUmYsSUFBTSxNQUFNLENBQUMsYUFBWSxhQUFhO0FBQ2xDLE1BQUksNEJBQTRCLGFBQVk7QUFDeEM7QUFBQSxTQUVDO0FBQ0QsbUJBQUcsYUFBWSxHQUFHO0FBQUE7QUFBQTtBQUkxQixJQUFPLGNBQVE7OztBQ1JmLElBQU0sS0FBSyxDQUFDLGFBQVksYUFBYTtBQUNqQyxNQUFJLDRCQUE0QixhQUFZO0FBQ3hDLGFBQVMsS0FBSyxVQUFVO0FBQUEsU0FFdkI7QUFDRCxtQkFBRyxhQUFZLEdBQUc7QUFBQTtBQUV0QixTQUFPLE1BQU07QUFDVCxnQkFBSSxhQUFZO0FBQUE7QUFBQTtBQUl4QixJQUFPLGFBQVE7OztBQ2JmLElBQU0sV0FBVyxDQUFDLE1BQU07QUFDcEIsUUFBTSxZQUFXLElBQUksaUJBQVM7QUFDOUIsTUFBSSxDQUFDLFVBQVMsSUFBSTtBQUNkLGNBQVMsSUFBSTtBQUFBO0FBRWpCLFNBQU8sVUFBUyxFQUFFLEtBQUssV0FBVSxNQUFNO0FBQUE7QUFHM0MsSUFBTyxvQkFBUTs7O0FDUGYsSUFBTSxXQUFXLENBQUMsZ0JBQWU7QUFDN0IsTUFBSSw0QkFBNEIsZUFBYyw4QkFBOEI7QUFDeEUsV0FBTztBQUNYLFNBQU8sRUFBRSxlQUFHO0FBQUE7QUFHaEIsSUFBTyxtQkFBUTs7O0FDUmYsSUFBTSxPQUFPLENBQUMsTUFBTTtBQUNoQixTQUFPLElBQUksYUFBSyxNQUFNLEVBQUU7QUFBQTtBQUc1QixJQUFPLGdCQUFROzs7QUNDZix1Q0FBaUMsbUJBQVc7QUFBQSxFQUN4QyxjQUFjO0FBQ1YsVUFBTSxHQUFHO0FBQ1QsU0FBSyxJQUFJO0FBQUE7QUFBQSxFQUdiLE9BQU87QUFDSCxRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1Q7QUFDSixTQUFLLEtBQUs7QUFDVixRQUFJLEtBQUs7QUFDTDtBQUNKLFNBQUs7QUFDTCxTQUFLLEdBQUcsT0FBTyxLQUFLO0FBQUE7QUFBQTtBQUk1QixJQUFNLFdBQVcsQ0FBQyxPQUFPO0FBRXJCLFFBQU0sSUFBSSxNQUFNLEVBQUUsS0FBSyxLQUFLO0FBRTVCLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSTtBQUNKLG9CQUFTLE1BQU07QUFDWCxVQUFNLGVBQWUsR0FBRyxJQUFJO0FBQzVCLFFBQUk7QUFDQSxtQkFBYSxFQUFFO0FBQ25CLFVBQU0sWUFBWTtBQUNsQixVQUFNLGVBQWUsR0FBRyxJQUFJO0FBQzVCLFFBQUk7QUFDQSxtQkFBYSxFQUFFO0FBQ25CLGdCQUFZO0FBQUE7QUFHaEIsUUFBTSxhQUFhLE1BQU07QUFDckIsUUFBSSxDQUFDLEVBQUUsVUFBVTtBQUNiLFNBQUcsUUFBUSxjQUFZO0FBQ25CLGlCQUFTO0FBQUE7QUFBQTtBQUdqQixTQUFLLElBQUk7QUFBQTtBQUViLGtCQUFRO0FBRVIsU0FBTyxDQUFDLE1BQU07QUFFVixRQUFJO0FBQ0osUUFBSSxlQUFlLEdBQUcsSUFBSTtBQUMxQixRQUFJLGNBQWM7QUFDZCxpQkFBVztBQUFBLFdBRVY7QUFDRCxpQkFBVyxJQUFJLG1CQUFtQixlQUFPLFFBQVE7QUFDakQsZUFBUyxLQUFLO0FBQ2QsZUFBUyxLQUFLO0FBQ2QsZUFBUyxJQUFJO0FBQ2IsU0FBRyxJQUFJLEdBQUc7QUFBQTtBQUVkLGFBQVMsS0FBSztBQUVkLG9CQUFRO0FBRVIsV0FBTyxFQUFFO0FBQUE7QUFBQTtBQUlqQixJQUFPLG1CQUFROzs7QUNsRWYsNkJBQXVCLElBQUk7QUFBQSxFQUN2QixHQUFHLEdBQUcsR0FBRztBQUNMLFVBQU0sSUFBSSxHQUFHO0FBQ2IsV0FBTztBQUFBO0FBQUE7QUFHZiwyQkFBcUI7QUFBQSxFQUNqQixjQUFjO0FBQ1YsU0FBSyxJQUFJO0FBQUE7QUFBQSxFQUViLEtBQUs7QUFDRCxTQUFLLEtBQUs7QUFDVixvQkFBUTtBQUFBO0FBQUEsRUFFWixPQUFPO0FBQ0gsU0FBSyxLQUFLO0FBQ1YsUUFBSSxLQUFLO0FBQ0w7QUFDSixTQUFLO0FBQUE7QUFBQSxFQUVULElBQUk7QUFBQTtBQUFBO0FBRVIsOEJBQXdCLGVBQWU7QUFBQSxFQUNuQyxZQUFZLEdBQUcsYUFBWTtBQUN2QjtBQUNBLFNBQUssSUFBSTtBQUNULFNBQUssYUFBYTtBQUFBO0FBQUEsRUFFdEIsSUFBSTtBQUNBLFNBQUssRUFBRSxPQUFPO0FBQUE7QUFBQTtBQUd0QixnQ0FBMEIsZUFBZTtBQUFBLEVBQ3JDLFlBQVksR0FBRyxhQUFZO0FBQ3ZCO0FBQ0EsU0FBSyxJQUFJO0FBQ1QsU0FBSyxhQUFhO0FBQUE7QUFBQSxFQUV0QixJQUFJO0FBQ0EsU0FBSyxFQUFFLFNBQVM7QUFBQTtBQUFBO0FBR3hCLDZCQUF1QixlQUFlO0FBQUEsRUFDbEMsWUFBWSxHQUFHLEdBQUcsYUFBWTtBQUMxQjtBQUNBLFNBQUssSUFBSTtBQUNULFNBQUssSUFBSTtBQUNULFNBQUssYUFBYTtBQUFBO0FBQUEsRUFFdEIsSUFBSTtBQUNBLFFBQUk7QUFDSixJQUFDLE1BQUssS0FBSyxFQUFFLFNBQVMsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLE9BQU8sS0FBSztBQUFBO0FBQUE7QUFHOUUsa0NBQTRCLGVBQWU7QUFBQSxFQUN2QyxZQUFZLEdBQUcsR0FBRyxhQUFZLElBQUk7QUFDOUI7QUFDQSxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFDVCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxLQUFLO0FBQUE7QUFBQSxFQUVkLElBQUk7QUFDQSxRQUFJO0FBQ0osSUFBQyxNQUFLLEtBQUssRUFBRSxRQUFRLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxPQUFPLEtBQUs7QUFBQTtBQUFBO0FBSTdFLElBQU0sUUFBUSxJQUFJO0FBQ2xCLElBQU0sa0JBQWtCLElBQUksSUFBSSxDQUFDLGNBQWMscUJBQXFCO0FBQ3BFLElBQU0sa0JBQWtCLElBQUksSUFBSSxDQUFDLGFBQWEsYUFBYSxlQUFlLGtCQUFrQixpQkFBaUIsd0JBQXdCLGtCQUFrQixZQUFZLFlBQVk7QUFDL0ssSUFBTSxRQUFRO0FBQUEsRUFFVixLQUFLLENBQUMsS0FBSSxNQUFNO0FBQ1osUUFBSSxJQUFJO0FBQ1IsUUFBSSxnQkFBZ0IsSUFBSSxJQUFJO0FBQ3hCLFVBQUksTUFBTTtBQUNOLGVBQU87QUFDWCxVQUFJLE1BQU07QUFDTixlQUFPO0FBQ1gsVUFBSSxNQUFNLHFCQUFxQjtBQUMzQixZQUFJLGdCQUFnQjtBQUNoQixnQkFBTSxNQUFLLGdCQUFnQjtBQUMzQixjQUFHLFVBQVcsS0FBRyxTQUFTLGNBQWM7QUFDeEMsY0FBRyxPQUFPO0FBQ1YsY0FBRyxPQUFPLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFJakMsUUFBSSxnQkFBZ0IsSUFBSTtBQUNwQixhQUFPLElBQUc7QUFDZCxVQUFNLEtBQUssZ0JBQWdCO0FBQzNCLFVBQU0sU0FBVSxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsSUFBSTtBQUN4RSxVQUFNLElBQUksVUFBVSxJQUFHO0FBQ3ZCLE9BQUcsTUFBTyxJQUFHLEtBQUssSUFBSTtBQUN0QixVQUFNLFdBQVcsR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixJQUFJLEdBQUc7QUFDcEUsUUFBSSxnQkFBZ0I7QUFDaEIsZUFBUztBQUNULGVBQVMsY0FBZSxVQUFTLGFBQWEsa0JBQWtCLElBQUk7QUFDcEUsZUFBUyxXQUFXO0FBQUE7QUFFeEIsUUFBSSxRQUFRO0FBQ1IsYUFBTyxPQUFPLEtBQUssR0FBRztBQUFBLFdBRXJCO0FBQ0QsVUFBSSxPQUFPLE1BQU0sY0FBYyxNQUFNLE1BQU0sVUFBVSxJQUFJO0FBQ3JELGVBQU8sV0FBWTtBQUNmLGlCQUFPLGNBQU0sTUFBTSxFQUFFLE1BQU0sR0FBRyxPQUFPO0FBQUE7QUFBQTtBQUc3QyxhQUFTLE9BQUssU0FBUyxRQUFRLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxVQUFVO0FBQUE7QUFBQTtBQUFBLEVBR3JGLEtBQUssQ0FBQyxLQUFJLEdBQUcsTUFBTTtBQUNmLFFBQUk7QUFDSixRQUFJLFVBQVU7QUFDZCxVQUFNLEtBQUssZ0JBQWdCO0FBQzNCLFVBQU0sU0FBVSxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsSUFBSTtBQUN4RSxRQUFJLFFBQVE7QUFDUixvQkFBTSxNQUFNLE9BQU8sS0FBSyxHQUFHLE9BQU87QUFBQSxXQUVqQztBQUNELFlBQU0sY0FBZSxLQUFLO0FBQzFCLFVBQUcsS0FBSztBQUNSLG9CQUFNLE1BQU07QUFDUixZQUFJLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSTtBQUN4QixRQUFDLE9BQUssR0FBRyxZQUFZLFFBQVEsUUFBTyxTQUFTLFNBQVMsSUFBRyxXQUFXLEVBQUU7QUFDdEUsWUFBSSxDQUFDLGFBQWE7QUFDZCxVQUFDLE1BQUssR0FBRyxVQUFVLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxXQUFXLEVBQUU7QUFDcEUsVUFBQyxNQUFNLE1BQUssR0FBRyxTQUFTLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxJQUFJLFFBQVEsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUFBO0FBRTdILGNBQU0sV0FBWSxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsSUFBSTtBQUMxRSxZQUFJLFVBQVU7QUFDVixVQUFDLE1BQUssU0FBUyxnQkFBZ0IsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLEVBQUU7QUFDckUsbUJBQVMsS0FBSyxZQUFZLEtBQUssTUFBTSxJQUFJLE1BQU0sUUFBUSxHQUFHLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFJNUUsV0FBTztBQUFBO0FBQUEsRUFFWCxnQkFBZ0IsQ0FBQyxLQUFJLE1BQU07QUFDdkIsVUFBTSxjQUFlLEtBQUs7QUFDMUIsUUFBSSxDQUFDO0FBQ0QsYUFBTztBQUNYLFVBQU0sVUFBVSxRQUFRLGVBQWUsS0FBSTtBQUMzQyxRQUFJLENBQUM7QUFDRCxhQUFPO0FBQ1gsVUFBTSxLQUFLLGdCQUFnQjtBQUMzQixrQkFBTSxNQUFNO0FBQ1IsVUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUk7QUFDeEIsTUFBQyxNQUFLLEdBQUcsVUFBVSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsV0FBVyxFQUFFO0FBQ3BFLE1BQUMsTUFBSyxHQUFHLFlBQVksUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUN0RSxNQUFDLE1BQU0sTUFBSyxHQUFHLFNBQVMsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLElBQUksUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsV0FBVyxFQUFFO0FBQ3pILFlBQU0sV0FBWSxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsSUFBSTtBQUMxRSxVQUFJLFVBQVU7QUFDVixRQUFDLE1BQUssU0FBUyxnQkFBZ0IsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLEVBQUU7QUFDckUsaUJBQVMsS0FBSztBQUFBO0FBQUE7QUFHdEIsV0FBTztBQUFBO0FBQUEsRUFFWCxnQkFBZ0IsQ0FBQyxLQUFJLEdBQUcsZUFBZTtBQUNuQyxVQUFNLGNBQWUsS0FBSztBQUMxQixVQUFNLFVBQVUsUUFBUSxlQUFlLEtBQUksR0FBRztBQUM5QyxRQUFJLENBQUM7QUFDRCxhQUFPO0FBQ1gsVUFBTSxLQUFLLGdCQUFnQjtBQUMzQixrQkFBTSxNQUFNO0FBQ1IsVUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJO0FBQ2hDLFVBQUksQ0FBQyxXQUFXLEtBQUs7QUFDakIsUUFBQyxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsT0FBTztBQUFBLGlCQUV2RCxXQUFXLEtBQUs7QUFDckIsV0FBRyxNQUFPLElBQUcsS0FBSyxJQUFJO0FBQ3RCLFdBQUcsR0FBRyxJQUFJLEdBQUcsV0FBVztBQUFBO0FBRTVCLFVBQUksQ0FBQyxXQUFXLEtBQUs7QUFDakIsUUFBQyxNQUFLLEdBQUcsUUFBUSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsT0FBTztBQUFBLGlCQUV2RCxXQUFXLEtBQUs7QUFDckIsV0FBRyxNQUFPLElBQUcsS0FBSyxJQUFJO0FBQ3RCLFdBQUcsR0FBRyxJQUFJLEdBQUcsV0FBVztBQUFBO0FBRTVCLFVBQUksZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLFlBQVk7QUFDekMsUUFBQyxNQUFLLEdBQUcsVUFBVSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsV0FBVyxFQUFFO0FBQ3BFLFFBQUMsTUFBTSxNQUFLLEdBQUcsU0FBUyxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsSUFBSSxRQUFRLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7QUFBQTtBQUUxSSxZQUFNLFdBQVksTUFBSyxHQUFHLFFBQVEsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLElBQUk7QUFDMUUsVUFBSSxVQUFVO0FBQ1YsWUFBSSxTQUFTLFlBQVk7QUFDckIsVUFBQyxNQUFLLFNBQVMsZ0JBQWdCLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxFQUFFLFdBQVc7QUFDaEYsbUJBQVMsS0FBSztBQUFBLGVBRWI7QUFDRCxnQkFBTSxJQUFJLFdBQVc7QUFDckIsVUFBQyxNQUFLLFNBQVMsZ0JBQWdCLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxFQUFFO0FBQ3JFLG1CQUFTLEtBQUssWUFBWSxLQUFLLE1BQU0sSUFBSSxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBSTVFLFdBQU87QUFBQTtBQUFBLEVBRVgsS0FBSyxDQUFDLEtBQUksTUFBTTtBQUNaLFFBQUksTUFBTTtBQUNOLGFBQU87QUFDWCxRQUFJLE1BQU07QUFDTixhQUFPO0FBQ1gsVUFBTSxJQUFLLEtBQUs7QUFDaEIsUUFBSSxnQkFBZ0I7QUFDaEIsWUFBTSxLQUFLLGdCQUFnQjtBQUMzQixTQUFHLE9BQVEsSUFBRyxNQUFNLElBQUk7QUFDeEIsWUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxXQUFXLElBQUksR0FBRztBQUM1RCxVQUFJO0FBQ0osVUFBSSxXQUFXO0FBQUE7QUFFbkIsV0FBTztBQUFBO0FBQUEsRUFFWCxTQUFTLENBQUMsUUFBTztBQUNiLFVBQU0sT0FBTyxRQUFRLFFBQVE7QUFDN0IsUUFBSSxnQkFBZ0I7QUFDaEIsWUFBTSxLQUFLLGdCQUFnQjtBQUMzQixTQUFHLFFBQVMsSUFBRyxPQUFPLFlBQVk7QUFDbEMsU0FBRyxLQUFLO0FBQ1IsU0FBRyxLQUFLLFdBQVc7QUFBQTtBQUV2QixXQUFPO0FBQUE7QUFBQTtBQUlmLElBQU0sVUFBVSxDQUFDLEdBQUcsTUFBTTtBQUN0QixRQUFNLFNBQVEsSUFBSSxNQUFNLEdBQUc7QUFDM0IsUUFBTSxJQUFLLE9BQU0sUUFBUSxNQUFNLFNBQVMsU0FBUyxFQUFFLE1BQU0sTUFBTSxFQUFFLEtBQUssS0FBSztBQUMzRSxRQUFNLEVBQUUsSUFBSSxPQUFPLHFCQUFxQjtBQUN4QyxRQUFNLEtBQUssRUFBRSxlQUFPO0FBQ3BCLE1BQUk7QUFDQSxPQUFHLEtBQUs7QUFDWixNQUFJO0FBQ0EsT0FBRyxLQUFLO0FBQ1osUUFBTSxJQUFJLEdBQUc7QUFDYixTQUFPO0FBQUE7QUFFWCxJQUFNLGtCQUFrQixDQUFDLE1BQU07QUFDM0IsUUFBTSxLQUFLLE1BQU0sSUFBSTtBQUNyQixNQUFJLENBQUM7QUFDRCxVQUFNLElBQUk7QUFDZCxTQUFPO0FBQUE7QUFFWCxJQUFNLGNBQWMsQ0FBQyxPQUFPO0FBQ3hCLFFBQU0sY0FBYSxrQkFBa0IsSUFBSSxHQUFHLEVBQUUsUUFBUTtBQUN0RCxRQUFNLE9BQU8sSUFBSSxVQUFVLElBQUk7QUFDL0IsU0FBTztBQUFBO0FBRVgsSUFBTSxnQkFBZ0IsQ0FBQyxPQUFPO0FBQzFCLFFBQU0sY0FBYSxrQkFBa0IsSUFBSSxHQUFHLEVBQUUsUUFBUTtBQUN0RCxRQUFNLFNBQVMsSUFBSSxZQUFZLElBQUk7QUFDbkMsU0FBTztBQUFBO0FBRVgsSUFBTSxhQUFhLENBQUMsSUFBSSxHQUFHLE1BQU07QUFDN0IsUUFBTSxjQUFhLGtCQUFrQixJQUFJO0FBQ3pDLFFBQU0sTUFBTSxJQUFJLFNBQVMsSUFBSSxHQUFHO0FBQ2hDLFNBQU87QUFBQTtBQUVYLElBQU0sb0JBQW9CLENBQUMsSUFBSSxHQUFHLFlBQVk7QUFDMUMsUUFBTSxjQUFhLElBQUksbUJBQVcsR0FBRztBQUNyQyxjQUFXLElBQUksR0FBRztBQUNsQixTQUFPO0FBQUE7QUFFWCxJQUFNLGtCQUFrQixDQUFDLElBQUksR0FBRyxNQUFNO0FBQ2xDLFFBQU0sY0FBYTtBQUNuQixRQUFNLGVBQWUsWUFBWSxLQUFLLE1BQU0sSUFBSSxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQ3ZFLFFBQU0sV0FBVyxJQUFJLGNBQWMsSUFBSSxHQUFHLGFBQVk7QUFDdEQsS0FBRyxNQUFPLElBQUcsS0FBSyxJQUFJO0FBQ3RCLEtBQUcsR0FBRyxJQUFJLEdBQUc7QUFDYixTQUFPO0FBQUE7QUFFWCxJQUFNLHVCQUF1QixDQUFDLE1BQU07QUFDaEMsTUFBSSxNQUFNLFFBQVE7QUFDZCxXQUFPO0FBQ1gsTUFBSTtBQUNKLE1BQUk7QUFDSixRQUFNLE9BQU8sUUFBUSxRQUFRO0FBQzdCLFdBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQ3pDLFVBQU0sSUFBSSxLQUFLO0FBQ2YsVUFBTSxhQUFhLE9BQU8seUJBQXlCLEdBQUc7QUFDdEQsUUFBSSxDQUFDO0FBQ0Q7QUFDSixVQUFNLEVBQUUsV0FBSyxRQUFRO0FBQ3JCLFFBQUksTUFBSztBQUNMLFlBQU8sTUFBSyxJQUFJO0FBQ2hCLFNBQUcsSUFBSSxHQUFHO0FBQUE7QUFFZCxRQUFJLEtBQUs7QUFDTCxZQUFPLE1BQUssSUFBSTtBQUNoQixTQUFHLElBQUksR0FBRztBQUFBO0FBQUE7QUFHbEIsU0FBTyxFQUFFLElBQUk7QUFBQTtBQUVqQixJQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQ3BCLE1BQUksaUJBQVE7QUFDUixXQUFPO0FBQ1gsUUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLFFBQVE7QUFDbkMsU0FBTyxHQUFHO0FBQUE7QUFFZCxJQUFNLFlBQVksQ0FBQyxNQUFNO0FBQ3JCLE1BQUksaUJBQVE7QUFDUixXQUFPLEVBQUU7QUFDYixTQUFPO0FBQUE7QUFFWCxJQUFNLGVBQWUsTUFBTTtBQUN2QixTQUFRLE1BQU0sYUFBYTtBQUFBO0FBRS9CLElBQU0sY0FBYyxDQUFDLE1BQU07QUFDdkIsTUFBSSxNQUFNLFFBQVEsT0FBTyxNQUFNO0FBQzNCLFdBQU87QUFDWCxNQUFJLE1BQU0sUUFBUTtBQUNkLFdBQU87QUFDWCxRQUFNLGFBQVksT0FBTyxlQUFlO0FBQ3hDLE1BQUksZUFBYztBQUNkLFdBQU87QUFDWCxTQUFRLE9BQU8sZUFBZSxnQkFBZTtBQUFBO0FBUWpELElBQU0sUUFBUSxDQUFDLEdBQUcsWUFBWTtBQUMxQixNQUFJLENBQUMsWUFBWTtBQUNiLFdBQU87QUFDWCxNQUFJLFlBQVksUUFBUSxZQUFZLFNBQVMsU0FBUyxRQUFRO0FBQzFELFdBQU8sVUFBVTtBQUNyQixTQUFPLFNBQVM7QUFBQTtBQUdwQixJQUFPLGdCQUFROzs7QUNoVmYsNkJBQXVCLGlCQUFTO0FBQUEsRUFFNUIsY0FBYztBQUNWO0FBRUEsU0FBSyxJQUFJLE1BQU07QUFDZixTQUFLLEtBQUs7QUFDVixxQkFBaUIsSUFBSTtBQUNyQixVQUFNLEVBQUUsRUFBRTtBQUNWLFNBQUssR0FBRyxpQkFBaUI7QUFBQTtBQUFBLEVBRzdCLEdBQUcsT0FBTztBQUNOLFFBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUNiO0FBQ0osVUFBTSxnQkFBZ0IsS0FBSztBQUMzQixTQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ3ZCLFFBQUksaUJBQWlCO0FBQ2pCO0FBRUosVUFBTSxhQUFhLENBQUMsVUFBUztBQUN6QixVQUFJLFdBQVcsUUFBTztBQUNsQixnQkFBTyxRQUFRO0FBQUEsYUFFZDtBQUNELHVCQUFlO0FBQUE7QUFBQTtBQUd2QixVQUFNLGlCQUFpQixDQUFDLGFBQWE7QUFDakMsVUFBSSxvQkFBb0I7QUFDcEI7QUFDSixVQUFJLG9CQUFvQixnQkFBUTtBQUM1QixZQUFJLE9BQU87QUFDUCxtQkFBUyxFQUFFO0FBQUEsZUFFVjtBQUNELG1CQUFTLEVBQUU7QUFBQTtBQUFBO0FBR25CLG9CQUFjLFNBQVMsSUFBSTtBQUMzQixrQkFBWSxTQUFTLElBQUk7QUFBQTtBQUU3QixVQUFNLGlCQUFpQixDQUFDLGFBQWE7QUFDakMsVUFBSSxDQUFFLHFCQUFvQjtBQUN0QjtBQUNKLGVBQVMsR0FBRztBQUFBO0FBRWhCLGtCQUFjLEtBQUssSUFBSTtBQUN2QixrQkFBYyxLQUFLLElBQUk7QUFDdkIsZ0JBQVksS0FBSyxJQUFJO0FBQUE7QUFBQSxFQUV6QixFQUFFLEdBQUc7QUFDRCxVQUFNLGVBQWUsU0FBUztBQUM5QixhQUFTLElBQUk7QUFDYixRQUFJO0FBQ0EsYUFBTyxNQUFNLEVBQUU7QUFBQSxjQUVuQjtBQUNJLGVBQVMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUt6QixJQUFPLG1CQUFROzs7QUNsRWYsSUFBTSxXQUFXLENBQUMsTUFBTSxNQUFNO0FBQzFCLFFBQU0sWUFBVyxJQUFJO0FBQ3JCLFFBQU0sWUFBWSxnQkFBUTtBQUMxQixrQkFBTyxNQUFNO0FBQ1QsY0FBUyxHQUFHO0FBQUE7QUFFaEIsU0FBTyxVQUFTLEVBQUU7QUFBQTtBQUd0QixJQUFPLG9CQUFROzs7QUNQZixJQUFNLFdBQVcsQ0FBQyxHQUFHLE1BQU07QUFDdkIsUUFBTSxjQUFhLElBQUksbUJBQVc7QUFDbEMsU0FBTyxrQkFBUyxNQUFNO0FBQ2xCLFFBQUksWUFBVyxLQUFLO0FBQ2hCLFlBQU0sU0FBUSxZQUFXO0FBQ3pCLFlBQU0sUUFBUSxNQUFNLFlBQVcsRUFBRTtBQUNqQyxZQUFNLFVBQVUsRUFBRSxlQUFPO0FBQ3pCLGFBQU8sZ0JBQVEsRUFBRTtBQUFBLFdBRWhCO0FBQ0Qsb0JBQU0sWUFBUztBQUNYLG9CQUFXLEVBQUUsVUFBVTtBQUFBO0FBRTNCLGFBQU8sZ0JBQVE7QUFBQTtBQUFBO0FBQUE7QUFLM0IsSUFBTyxvQkFBUTs7O0FDdEJmLElBQU0sUUFBUSxNQUFNO0FBQ2hCLFFBQU0sUUFBUSxNQUFNO0FBQ3BCLFNBQU8sQ0FBQyxNQUFNO0FBQ1YsV0FBTyxNQUFNLEVBQUUsTUFBTTtBQUFBO0FBQUE7QUFJN0IsSUFBTyxlQUFROzs7QUNvQmYsV0FBVyxHQUFHLFNBQVM7QUFDbkIsU0FBTyxFQUFFLElBQUksbUJBQWdCLEdBQUc7QUFBQTtBQUdwQyxFQUFFLFFBQVE7QUFDVixFQUFFLFVBQVU7QUFDWixFQUFFLFdBQVc7QUFDYixFQUFFLFVBQVU7QUFDWixFQUFFLFdBQVc7QUFDYixFQUFFLFNBQVM7QUFDWCxFQUFFLFFBQVE7QUFDVixFQUFFLE1BQU07QUFDUixFQUFFLFdBQVc7QUFDYixFQUFFLE1BQU07QUFDUixFQUFFLEtBQUs7QUFDUCxFQUFFLGVBQWU7QUFDakIsRUFBRSxVQUFVO0FBQ1osRUFBRSxNQUFNO0FBQ1IsRUFBRSxLQUFLO0FBQ1AsRUFBRSxXQUFXO0FBQ2IsRUFBRSxXQUFXO0FBQ2IsRUFBRSxVQUFVO0FBQ1osRUFBRSxPQUFPO0FBQ1QsRUFBRSxTQUFTO0FBQ1gsRUFBRSxXQUFXO0FBQ2IsRUFBRSxRQUFRO0FBQ1YsRUFBRSxXQUFXO0FBQ2IsRUFBRSxTQUFTO0FBQ1gsRUFBRSxVQUFVO0FBQ1osRUFBRSxXQUFXO0FBQ2IsRUFBRSxPQUFPO0FBRVQsSUFBTyxZQUFROzs7QUMzRGYsb0JBQW9CLEdBQUcsU0FBUztBQUM1QixTQUFPLEVBQUUsSUFBSSxtQkFBZ0IsR0FBRztBQUFBO0FBR3BDLElBQU8sc0JBQVE7OztBQ3lCZixJQUFPLGVBQVE7OztBQ2hDK0QsSUFBTyxjQUFROyIsIm5hbWVzIjpbXX0=
