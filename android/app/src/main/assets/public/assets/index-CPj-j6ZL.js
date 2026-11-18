const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-4DKRim6a.js","assets/firebase-vendor-YILmzwxr.js"])))=>i.map(i=>d[i]);
import { n as __toESM } from "./rolldown-runtime-CO0Nlsmt.js";
import { n as require_client, t as require_jsx_runtime } from "./react-vendor-DqmI8VDC.js";
import { $ as CircleUser, A as Mail, B as HardDriveDownload, C as Phone, D as Menu, E as MessageCircle, F as Info, G as EyeOff, H as FileText, I as House, J as Database, K as ExternalLink, L as Hospital, M as LogIn, N as Lock, O as Megaphone, P as KeyRound, Q as CircleX, R as Heart, S as Plus, T as MessageSquare, U as FileSpreadsheet, V as FolderOpen, W as Eye, X as Compass, Y as Copy, Z as Clock, _ as Share2, a as User, at as Check, b as Search, c as Upload, ct as BellRing, d as Target, dt as ArrowLeft, et as CirclePlus, f as Sparkles, ft as require_react, g as ShieldAlert, h as ShieldCheck, i as Users, it as ChevronLeft, j as LogOut, k as MapPin, l as TriangleAlert, lt as Award, m as Shield, n as VolumeX, nt as CircleAlert, o as UserPlus, ot as Calendar, p as Smartphone, q as Droplet, r as Volume2, rt as ChevronRight, s as UserCheck, st as Bell, t as X, tt as CircleCheck, u as Trash2, ut as ArrowRight, v as Settings, w as PenLine, x as RefreshCw, y as Send, z as HeartHandshake } from "./icons-vendor-B7FEDE-A.js";
import { $ as deleteDoc, A as onAuthStateChanged, K as signOut, Q as addDoc, V as signInWithEmailAndPassword, W as signInWithPopup, X as updateProfile, Y as updatePassword, _ as createUserWithEmailAndPassword, _t as getFirestore, at as orderBy, bt as serverTimestamp, ct as query, dt as updateDoc, et as getDoc, ft as where, gt as doc, ht as collection, i as EmailAuthProvider, it as onSnapshot, j as reauthenticateWithCredential, lt as runTransaction, mt as arrayUnion, n as initializeAppCheck, nt as getDocs, ot as persistentLocalCache, pt as writeBatch, r as getFunctions, rt as limit, s as GoogleAuthProvider, st as persistentMultipleTabManager, t as ReCaptchaV3Provider, tt as getDocFromServer, ut as setDoc, v as deleteUser, vt as increment, x as getAuth, xt as initializeApp, yt as initializeFirestore, z as signInWithCredential } from "./firebase-vendor-YILmzwxr.js";
// \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
// node_modules/@capacitor/core/dist/index.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = require_client();
/*! Capacitor: https://capacitorjs.com/ - MIT License */
var ExceptionCode;
(function(ExceptionCode) {
	/**
	* API is not implemented.
	*
	* This usually means the API can't be used because it is not implemented for
	* the current platform.
	*/
	ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
	/**
	* API is not available.
	*
	* This means the API can't be used right now because:
	*   - it is currently missing a prerequisite, such as network connectivity
	*   - it requires a particular platform or browser version
	*/
	ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
var CapacitorException = class extends Error {
	constructor(message, code, data) {
		super(message);
		this.message = message;
		this.code = code;
		this.data = data;
	}
};
var getPlatformId = (win) => {
	var _a, _b;
	if (win === null || win === void 0 ? void 0 : win.androidBridge) return "android";
	else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) return "ios";
	else return "web";
};
var createCapacitor = (win) => {
	const capCustomPlatform = win.CapacitorCustomPlatform || null;
	const cap = win.Capacitor || {};
	const Plugins = cap.Plugins = cap.Plugins || {};
	const getPlatform = () => {
		return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
	};
	const isNativePlatform = () => getPlatform() !== "web";
	const isPluginAvailable = (pluginName) => {
		const plugin = registeredPlugins.get(pluginName);
		if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) return true;
		if (getPluginHeader(pluginName)) return true;
		return false;
	};
	const getPluginHeader = (pluginName) => {
		var _a;
		return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
	};
	const handleError = (err) => win.console.error(err);
	const registeredPlugins = /* @__PURE__ */ new Map();
	const registerPlugin = (pluginName, jsImplementations = {}) => {
		const registeredPlugin = registeredPlugins.get(pluginName);
		if (registeredPlugin) {
			console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
			return registeredPlugin.proxy;
		}
		const platform = getPlatform();
		const pluginHeader = getPluginHeader(pluginName);
		let jsImplementation;
		const loadPluginImplementation = async () => {
			if (!jsImplementation && platform in jsImplementations) jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
			else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
			return jsImplementation;
		};
		const createPluginMethod = (impl, prop) => {
			var _a, _b;
			if (pluginHeader) {
				const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
				if (methodHeader) {
					if (methodHeader.rtype === "promise") return (options) => cap.nativePromise(pluginName, prop.toString(), options);
					else return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
				} else if (impl) return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
			} else if (impl) return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
			else throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
		};
		const createPluginMethodWrapper = (prop) => {
			let remove;
			const wrapper = (...args) => {
				const p = loadPluginImplementation().then((impl) => {
					const fn = createPluginMethod(impl, prop);
					if (fn) {
						const p = fn(...args);
						remove = p === null || p === void 0 ? void 0 : p.remove;
						return p;
					} else throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
				});
				if (prop === "addListener") p.remove = async () => remove();
				return p;
			};
			wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
			Object.defineProperty(wrapper, "name", {
				value: prop,
				writable: false,
				configurable: false
			});
			return wrapper;
		};
		const addListener = createPluginMethodWrapper("addListener");
		const removeListener = createPluginMethodWrapper("removeListener");
		const addListenerNative = (eventName, callback) => {
			const call = addListener({ eventName }, callback).then((callbackId) => callbackId);
			const remove = async () => {
				const callbackId = await call;
				await removeListener({
					eventName,
					callbackId
				});
			};
			const p = new Promise((resolve) => call.then(() => resolve({ remove })));
			p.remove = async () => {
				console.warn(`Using addListener() without 'await' is deprecated.`);
				await remove();
			};
			return p;
		};
		const proxy = new Proxy({}, { get(_, prop) {
			switch (prop) {
				case "$$typeof": return;
				case "toJSON": return () => ({});
				case "addListener": return pluginHeader ? addListenerNative : addListener;
				case "removeListener": return removeListener;
				default: return createPluginMethodWrapper(prop);
			}
		} });
		Plugins[pluginName] = proxy;
		registeredPlugins.set(pluginName, {
			name: pluginName,
			proxy,
			platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
		});
		return proxy;
	};
	if (!cap.convertFileSrc) cap.convertFileSrc = (filePath) => filePath;
	cap.getPlatform = getPlatform;
	cap.handleError = handleError;
	cap.isNativePlatform = isNativePlatform;
	cap.isPluginAvailable = isPluginAvailable;
	cap.registerPlugin = registerPlugin;
	cap.Exception = CapacitorException;
	cap.DEBUG = !!cap.DEBUG;
	cap.isLoggingEnabled = !!cap.isLoggingEnabled;
	return cap;
};
var initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
var Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
var registerPlugin = Capacitor.registerPlugin;
/**
* Base class web plugins should extend.
*/
var WebPlugin = class {
	constructor() {
		this.listeners = {};
		this.retainedEventArguments = {};
		this.windowListeners = {};
	}
	addListener(eventName, listenerFunc) {
		let firstListener = false;
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
			firstListener = true;
		}
		this.listeners[eventName].push(listenerFunc);
		const windowListener = this.windowListeners[eventName];
		if (windowListener && !windowListener.registered) this.addWindowListener(windowListener);
		if (firstListener) this.sendRetainedArgumentsForEvent(eventName);
		const remove = async () => this.removeListener(eventName, listenerFunc);
		return Promise.resolve({ remove });
	}
	async removeAllListeners() {
		this.listeners = {};
		for (const listener in this.windowListeners) this.removeWindowListener(this.windowListeners[listener]);
		this.windowListeners = {};
	}
	notifyListeners(eventName, data, retainUntilConsumed) {
		const listeners = this.listeners[eventName];
		if (!listeners) {
			if (retainUntilConsumed) {
				let args = this.retainedEventArguments[eventName];
				if (!args) args = [];
				args.push(data);
				this.retainedEventArguments[eventName] = args;
			}
			return;
		}
		listeners.forEach((listener) => listener(data));
	}
	hasListeners(eventName) {
		var _a;
		return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
	}
	registerWindowListener(windowEventName, pluginEventName) {
		this.windowListeners[pluginEventName] = {
			registered: false,
			windowEventName,
			pluginEventName,
			handler: (event) => {
				this.notifyListeners(pluginEventName, event);
			}
		};
	}
	unimplemented(msg = "not implemented") {
		return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
	}
	unavailable(msg = "not available") {
		return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
	}
	async removeListener(eventName, listenerFunc) {
		const listeners = this.listeners[eventName];
		if (!listeners) return;
		const index = listeners.indexOf(listenerFunc);
		if (index !== -1) this.listeners[eventName].splice(index, 1);
		if (!this.listeners[eventName].length) this.removeWindowListener(this.windowListeners[eventName]);
	}
	addWindowListener(handle) {
		window.addEventListener(handle.windowEventName, handle.handler);
		handle.registered = true;
	}
	removeWindowListener(handle) {
		if (!handle) return;
		window.removeEventListener(handle.windowEventName, handle.handler);
		handle.registered = false;
	}
	sendRetainedArgumentsForEvent(eventName) {
		const args = this.retainedEventArguments[eventName];
		if (!args) return;
		delete this.retainedEventArguments[eventName];
		args.forEach((arg) => {
			this.notifyListeners(eventName, arg);
		});
	}
};
/******** END WEB VIEW PLUGIN ********/
/******** COOKIES PLUGIN ********/
/**
* Safely web encode a string value (inspired by js-cookie)
* @param str The string value to encode
*/
var encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
/**
* Safely web decode a string value (inspired by js-cookie)
* @param str The string value to decode
*/
var decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
var CapacitorCookiesPluginWeb = class extends WebPlugin {
	async getCookies() {
		const cookies = document.cookie;
		const cookieMap = {};
		cookies.split(";").forEach((cookie) => {
			if (cookie.length <= 0) return;
			let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
			key = decode(key).trim();
			value = decode(value).trim();
			cookieMap[key] = value;
		});
		return cookieMap;
	}
	async setCookie(options) {
		try {
			const encodedKey = encode(options.key);
			const encodedValue = encode(options.value);
			const expires = options.expires ? `; expires=${options.expires.replace("expires=", "")}` : "";
			const path = (options.path || "/").replace("path=", "");
			const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
			document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async deleteCookie(options) {
		try {
			document.cookie = `${options.key}=; Max-Age=0`;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async clearCookies() {
		try {
			const cookies = document.cookie.split(";") || [];
			for (const cookie of cookies) document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async clearAllCookies() {
		try {
			await this.clearCookies();
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
registerPlugin("CapacitorCookies", { web: () => new CapacitorCookiesPluginWeb() });
/**
* Read in a Blob value and return it as a base64 string
* @param blob The blob value to convert to a base64 string
*/
var readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.onload = () => {
		const base64String = reader.result;
		resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
	};
	reader.onerror = (error) => reject(error);
	reader.readAsDataURL(blob);
});
/**
* Normalize an HttpHeaders map by lowercasing all of the values
* @param headers The HttpHeaders object to normalize
*/
var normalizeHttpHeaders = (headers = {}) => {
	const originalKeys = Object.keys(headers);
	return Object.keys(headers).map((k) => k.toLocaleLowerCase()).reduce((acc, key, index) => {
		acc[key] = headers[originalKeys[index]];
		return acc;
	}, {});
};
/**
* Builds a string of url parameters that
* @param params A map of url parameters
* @param shouldEncode true if you should encodeURIComponent() the values (true by default)
*/
var buildUrlParams = (params, shouldEncode = true) => {
	if (!params) return null;
	return Object.entries(params).reduce((accumulator, entry) => {
		const [key, value] = entry;
		let encodedValue;
		let item;
		if (Array.isArray(value)) {
			item = "";
			value.forEach((str) => {
				encodedValue = shouldEncode ? encodeURIComponent(str) : str;
				item += `${key}=${encodedValue}&`;
			});
			item.slice(0, -1);
		} else {
			encodedValue = shouldEncode ? encodeURIComponent(value) : value;
			item = `${key}=${encodedValue}`;
		}
		return `${accumulator}&${item}`;
	}, "").substr(1);
};
/**
* Build the RequestInit object based on the options passed into the initial request
* @param options The Http plugin options
* @param extra Any extra RequestInit values
*/
var buildRequestInit = (options, extra = {}) => {
	const output = Object.assign({
		method: options.method || "GET",
		headers: options.headers
	}, extra);
	const type = normalizeHttpHeaders(options.headers)["content-type"] || "";
	if (typeof options.data === "string") output.body = options.data;
	else if (type.includes("application/x-www-form-urlencoded")) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(options.data || {})) params.set(key, value);
		output.body = params.toString();
	} else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
		const form = new FormData();
		if (options.data instanceof FormData) options.data.forEach((value, key) => {
			form.append(key, value);
		});
		else for (const key of Object.keys(options.data)) form.append(key, options.data[key]);
		output.body = form;
		const headers = new Headers(output.headers);
		headers.delete("content-type");
		output.headers = headers;
	} else if (type.includes("application/json") || typeof options.data === "object") output.body = JSON.stringify(options.data);
	return output;
};
var CapacitorHttpPluginWeb = class extends WebPlugin {
	/**
	* Perform an Http request given a set of options
	* @param options Options to build the HTTP request
	*/
	async request(options) {
		const requestInit = buildRequestInit(options, options.webFetchExtra);
		const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
		const url = urlParams ? `${options.url}?${urlParams}` : options.url;
		const response = await fetch(url, requestInit);
		const contentType = response.headers.get("content-type") || "";
		let { responseType = "text" } = response.ok ? options : {};
		if (contentType.includes("application/json")) responseType = "json";
		let data;
		let blob;
		switch (responseType) {
			case "arraybuffer":
			case "blob":
				blob = await response.blob();
				data = await readBlobAsBase64(blob);
				break;
			case "json":
				data = await response.json();
				break;
			default: data = await response.text();
		}
		const headers = {};
		response.headers.forEach((value, key) => {
			headers[key] = value;
		});
		return {
			data,
			headers,
			status: response.status,
			url: response.url
		};
	}
	/**
	* Perform an Http GET request given a set of options
	* @param options Options to build the HTTP request
	*/
	async get(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
	}
	/**
	* Perform an Http POST request given a set of options
	* @param options Options to build the HTTP request
	*/
	async post(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
	}
	/**
	* Perform an Http PUT request given a set of options
	* @param options Options to build the HTTP request
	*/
	async put(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
	}
	/**
	* Perform an Http PATCH request given a set of options
	* @param options Options to build the HTTP request
	*/
	async patch(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
	}
	/**
	* Perform an Http DELETE request given a set of options
	* @param options Options to build the HTTP request
	*/
	async delete(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
	}
};
var CapacitorHttp = registerPlugin("CapacitorHttp", { web: () => new CapacitorHttpPluginWeb() });
/******** END HTTP PLUGIN ********/
/******** SYSTEM BARS PLUGIN ********/
/**
* Available status bar styles.
*/
var SystemBarsStyle;
(function(SystemBarsStyle) {
	/**
	* Light system bar content on a dark background.
	*
	* @since 8.0.0
	*/
	SystemBarsStyle["Dark"] = "DARK";
	/**
	* For dark system bar content on a light background.
	*
	* @since 8.0.0
	*/
	SystemBarsStyle["Light"] = "LIGHT";
	/**
	* The style is based on the device appearance or the underlying content.
	* If the device is using Dark mode, the system bars content will be light.
	* If the device is using Light mode, the system bars content will be dark.
	*
	* @since 8.0.0
	*/
	SystemBarsStyle["Default"] = "DEFAULT";
})(SystemBarsStyle || (SystemBarsStyle = {}));
/**
* Available system bar types.
*/
var SystemBarType;
(function(SystemBarType) {
	/**
	* The top status bar on both Android and iOS.
	*
	* @since 8.0.0
	*/
	SystemBarType["StatusBar"] = "StatusBar";
	/**
	* The navigation bar (or gesture bar on iOS) on both Android and iOS.
	*
	* @since 8.0.0
	*/
	SystemBarType["NavigationBar"] = "NavigationBar";
})(SystemBarType || (SystemBarType = {}));
var SystemBarsPluginWeb = class extends WebPlugin {
	async setStyle() {
		this.unavailable("not available for web");
	}
	async setAnimation() {
		this.unavailable("not available for web");
	}
	async show() {
		this.unavailable("not available for web");
	}
	async hide() {
		this.unavailable("not available for web");
	}
};
registerPlugin("SystemBars", { web: () => new SystemBarsPluginWeb() });
var firebase_applet_config_default = {
	projectId: "a-drop-of-blood-saves-a-life",
	appId: "1:303623115940:web:61ea0e61a3531f836f8231",
	apiKey: "AIzaSyCcxj8UP8kRfSB-fUkBMgltXN8Fk8GBQTo",
	authDomain: "a-drop-of-blood-saves-a-life.firebaseapp.com",
	firestoreDatabaseId: "ai-studio-remixremixremix-797cdaa7-fcd3-4ecd-a13f-0cffe9a43f72",
	storageBucket: "a-drop-of-blood-saves-a-life.firebasestorage.app",
	messagingSenderId: "303623115940",
	measurementId: "G-7EH8RBDCMH",
	oAuthClientId: "303623115940-2veemdmqto16oa6n2jeo16umdi6t3eoc.apps.googleusercontent.com",
	recaptchaSiteKey: ""
};
// src/firebase.ts
if (typeof window !== "undefined") self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
var app = initializeApp(firebase_applet_config_default);
if (typeof window !== "undefined" && firebase_applet_config_default.recaptchaSiteKey) try {
	initializeAppCheck(app, {
		provider: new ReCaptchaV3Provider(firebase_applet_config_default.recaptchaSiteKey),
		isTokenAutoRefreshEnabled: true
	});
} catch (appCheckErr) {
	console.warn("App Check initialization note:", appCheckErr);
}
var firestoreDb;
try {
	firestoreDb = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }, firebase_applet_config_default.firestoreDatabaseId);
} catch (persistenceError) {
	console.warn("Persistent Firestore cache unavailable; using standard cache:", persistenceError);
	firestoreDb = getFirestore(app, firebase_applet_config_default.firestoreDatabaseId);
}
var db = firestoreDb;
var auth = getAuth(app);
getFunctions(app, "us-central1");
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid,
			email: auth.currentUser?.email,
			emailVerified: auth.currentUser?.emailVerified,
			isAnonymous: auth.currentUser?.isAnonymous,
			tenantId: auth.currentUser?.tenantId,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
async function testConnection() {
	try {
		await getDocFromServer(doc(db, "test", "connection"));
		return true;
	} catch (error) {
		if (error instanceof Error && error.message.includes("the client is offline")) console.warn("Firebase client is offline or pending network sync.");
		return false;
	}
}
testConnection();
// \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/" + dep;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var preloadOnce = function preloadOnce(seen, href, preload) {
	if (href in seen) return seen[href];
	const promise = preload();
	if (!promise) {
		seen[href] = void 0;
		return;
	}
	const preloadPromise = promise.then(() => {
		seen[href] = void 0;
	}, (err) => {
		seen[href] = void 0;
		throw err;
	});
	seen[href] = preloadPromise;
	return preloadPromise;
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			const isCss = isCssPreloadUrl(dep);
			return preloadOnce(seen, dep.href, () => {
				if (preloadedHrefs === void 0) {
					preloadedHrefs = {
						all: /* @__PURE__ */ new Set(),
						styles: /* @__PURE__ */ new Set()
					};
					const links = document.getElementsByTagName("link");
					for (let i = links.length - 1; i >= 0; i--) {
						const link = links[i];
						preloadedHrefs.all.add(link.href);
						if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
					}
				}
				if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep.href;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					link.addEventListener("load", res);
					link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
				});
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
// node_modules/@capawesome/capacitor-live-update/dist/esm/index.js
var LiveUpdate = registerPlugin("LiveUpdate", { web: () => __vitePreload(() => import("./web-BkEgnVug.js").then((m) => new m.LiveUpdateWeb()), []) });
// src/live-update.ts
var MANIFEST_URL = "https://github.com/ziadalsyyadi-ctrl/ziadalsyyadi635/releases/download/ota-latest/manifest.json";
var BUNDLE_BASE_URL = "https://github.com/ziadalsyyadi-ctrl/ziadalsyyadi635/releases/download/";
var MIN_AUTO_CHECK_INTERVAL_MS = 3e4;
var initialized = false;
var readyCompleted = false;
var lastCheckStartedAt = 0;
var activeCheckPromise = null;
function otaLog(stage, details) {
	if (details instanceof Error) console.info(`[BankAlDam OTA] ${stage}: ${details.name}: ${details.message}`);
	else if (details !== void 0) console.info(`[BankAlDam OTA] ${stage}`, details);
	else console.info(`[BankAlDam OTA] ${stage}`);
}
function isValidManifest(value) {
	if (!value || typeof value !== "object") return false;
	const manifest = value;
	return typeof manifest.bundleId === "string" && /^[A-Za-z0-9._-]{1,80}$/.test(manifest.bundleId) && manifest.bundleId !== "public" && typeof manifest.url === "string" && manifest.url.startsWith(BUNDLE_BASE_URL) && manifest.url.endsWith(".zip") && typeof manifest.checksum === "string" && /^[a-fA-F0-9]{64}$/.test(manifest.checksum) && typeof manifest.signature === "string" && /^[A-Za-z0-9+/]+={0,2}$/.test(manifest.signature);
}
async function runLiveUpdateCheck() {
	otaLog("بدء فحص manifest", MANIFEST_URL);
	try {
		const response = await fetch(MANIFEST_URL, {
			cache: "no-store",
			headers: { Accept: "application/json" }
		});
		if (!response.ok) {
			otaLog("فشل جلب manifest", {
				status: response.status,
				statusText: response.statusText
			});
			return { status: "error" };
		}
		const manifest = await response.json();
		if (!isValidManifest(manifest)) {
			otaLog("manifest غير صالح أو حقوله لا تطابق التنسيق المتوقع");
			return { status: "error" };
		}
		const [{ bundleId: currentBundleId }, { bundleId: nextBundleId }] = await Promise.all([LiveUpdate.getCurrentBundle(), LiveUpdate.getNextBundle()]);
		otaLog("تم فحص الحزم", {
			publishedBundleId: manifest.bundleId,
			currentBundleId,
			nextBundleId
		});
		if (manifest.bundleId === currentBundleId) {
			otaLog("التطبيق يستخدم بالفعل الحزمة المنشورة");
			return {
				status: "up-to-date",
				bundleId: manifest.bundleId
			};
		}
		if (manifest.bundleId === nextBundleId) {
			otaLog("الحزمة المنشورة محددة مسبقاً للتطبيق عند التشغيل القادم");
			return {
				status: "pending",
				bundleId: manifest.bundleId
			};
		}
		otaLog("بدء تنزيل الحزمة", manifest.bundleId);
		await LiveUpdate.downloadBundle({
			artifactType: "zip",
			bundleId: manifest.bundleId,
			url: manifest.url,
			checksum: manifest.checksum.toLowerCase(),
			signature: manifest.signature
		});
		otaLog("اكتمل تنزيل الحزمة والتحقق منها", manifest.bundleId);
		await LiveUpdate.setNextBundle({ bundleId: manifest.bundleId });
		otaLog("تم تعيين الحزمة لتطبيقها عند التشغيل القادم", manifest.bundleId);
		return {
			status: "downloaded",
			bundleId: manifest.bundleId
		};
	} catch (error) {
		otaLog("حدث خطأ أثناء فحص أو تنزيل OTA", error);
		return { status: "error" };
	}
}
async function checkForLiveUpdate(options) {
	if (!Capacitor.isNativePlatform()) return { status: "skipped" };
	if (!readyCompleted) try {
		await LiveUpdate.ready();
		readyCompleted = true;
	} catch (error) {
		otaLog("تعذر إكمال LiveUpdate.ready قبل الفحص", error);
		return { status: "error" };
	}
	if (activeCheckPromise) return activeCheckPromise;
	const now = Date.now();
	if (!options?.force && now - lastCheckStartedAt < MIN_AUTO_CHECK_INTERVAL_MS) return { status: "skipped" };
	lastCheckStartedAt = now;
	activeCheckPromise = runLiveUpdateCheck().finally(() => {
		activeCheckPromise = null;
	});
	return activeCheckPromise;
}
async function initializeLiveUpdates() {
	if (initialized) return;
	initialized = true;
	if (!Capacitor.isNativePlatform()) {
		otaLog("تخطي OTA: التشغيل ليس على منصة Android/iOS");
		return;
	}
	await new Promise((resolve) => {
		requestAnimationFrame(() => resolve());
	});
	try {
		const readyResult = await LiveUpdate.ready();
		readyCompleted = true;
		otaLog("LiveUpdate.ready اكتمل", readyResult);
	} catch (error) {
		otaLog("فشل LiveUpdate.ready", error);
		return;
	}
	if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible" && navigator.onLine) checkForLiveUpdate();
	});
	if (typeof window !== "undefined") window.addEventListener("online", () => {
		checkForLiveUpdate();
	});
	checkForLiveUpdate({ force: true });
}
// node_modules/@capacitor-firebase/authentication/dist/esm/definitions.js
/**
* @since 5.2.0
*/
var Persistence;
(function(Persistence) {
	/**
	* Long term persistence using IndexedDB.
	*
	* @since 5.2.0
	*/
	Persistence["IndexedDbLocal"] = "INDEXED_DB_LOCAL";
	/**
	* No persistence.
	*
	* @since 5.2.0
	*/
	Persistence["InMemory"] = "IN_MEMORY";
	/**
	* Long term persistence using local storage.
	*
	* @since 5.2.0
	*/
	Persistence["BrowserLocal"] = "BROWSER_LOCAL";
	/**
	* Temporary persistence using session storage.
	*
	* @since 5.2.0
	*/
	Persistence["BrowserSession"] = "BROWSER_SESSION";
})(Persistence || (Persistence = {}));
var ProviderId;
(function(ProviderId) {
	ProviderId["APPLE"] = "apple.com";
	ProviderId["FACEBOOK"] = "facebook.com";
	ProviderId["GAME_CENTER"] = "gc.apple.com";
	ProviderId["GITHUB"] = "github.com";
	ProviderId["GOOGLE"] = "google.com";
	ProviderId["MICROSOFT"] = "microsoft.com";
	ProviderId["PLAY_GAMES"] = "playgames.google.com";
	ProviderId["TWITTER"] = "twitter.com";
	ProviderId["YAHOO"] = "yahoo.com";
	ProviderId["PASSWORD"] = "password";
	ProviderId["PHONE"] = "phone";
})(ProviderId || (ProviderId = {}));
// node_modules/@capacitor-firebase/authentication/dist/esm/index.js
var FirebaseAuthentication = registerPlugin("FirebaseAuthentication", { web: () => __vitePreload(() => import("./web-4DKRim6a.js").then((m) => new m.FirebaseAuthenticationWeb()), __vite__mapDeps([0,1])) });
// src/services/phoneVerificationService.ts
function sanitizePhone(phone) {
	const digits = phone.trim().replace(/\D/g, "");
	if (digits.startsWith("967") && digits.length > 9) return digits.slice(3);
	if (digits.startsWith("0") && digits.length === 10) return digits.slice(1);
	return digits;
}
// src/context/AuthContext.tsx
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function getPhoneAuthEmail(cleanPhone, version = 1) {
	return `user_967${cleanPhone}_v${version}@qataba-blood.app`;
}
var AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [userProfile, setUserProfile] = (0, import_react.useState)(null);
	const [isGuest, setIsGuest] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [activeRole, setActiveRole] = (0, import_react.useState)("user");
	const switchActiveRole = (role) => {
		const isMasterAdmin = currentUser?.email === "ziadalsyyadi@gmail.com" || currentUser?.email === "user_967773633918_v1@qataba-blood.app";
		const isAuthorizedAdmin = userProfile?.role === "admin" || isMasterAdmin;
		const nextRole = role === "admin" && isAuthorizedAdmin ? "admin" : "user";
		setActiveRole(nextRole);
		localStorage.setItem("blood_app_active_role", nextRole);
	};
	const fetchUserProfile = async (user) => {
		const userDocRef = doc(db, "users", user.uid);
		try {
			const snap = await getDoc(userDocRef);
			const isAdminEmail = user.email === "ziadalsyyadi@gmail.com" || user.email === "user_967773633918_v1@qataba-blood.app";
			if (snap.exists()) {
				const data = snap.data();
				if (isAdminEmail && data.role !== "admin") await updateDoc(userDocRef, { role: "admin" });
				setUserProfile({
					uid: user.uid,
					displayName: data.displayName || user.displayName || "مستخدم",
					phone: data.phone || "",
					phoneVerified: data.phoneVerified ?? Boolean(user.phoneNumber),
					role: isAdminEmail ? "admin" : data.role || "user",
					createdAt: data.createdAt
				});
			} else {
				if (typeof window !== "undefined" && window.__QATABA_RECOVERY_IN_PROGRESS__) return;
				const phoneMatch = user.email?.match(/user_967(\d+)_/);
				const legacyMatch = user.email?.match(/user_(\d+)@/);
				const extractedPhone = phoneMatch ? phoneMatch[1] : legacyMatch ? legacyMatch[1] : "";
				const newProfile = {
					uid: user.uid,
					displayName: user.displayName || (extractedPhone ? `مستخدم ${extractedPhone}` : "فاعل خير"),
					phone: extractedPhone,
					phoneVerified: Boolean(user.phoneNumber),
					role: isAdminEmail ? "admin" : "user"
				};
				await setDoc(userDocRef, {
					displayName: newProfile.displayName,
					phone: extractedPhone,
					phoneVerified: Boolean(user.phoneNumber),
					role: isAdminEmail ? "admin" : "user",
					createdAt: serverTimestamp()
				}, { merge: true });
				setUserProfile(newProfile);
			}
			setActiveRole("user");
			localStorage.setItem("blood_app_active_role", "user");
		} catch (err) {
			console.warn("Could not fetch user profile:", err);
		}
	};
	const loadUserProfileSafely = async (user) => {
		let timeoutId;
		try {
			await Promise.race([fetchUserProfile(user), new Promise((resolve) => {
				timeoutId = setTimeout(() => {
					console.warn("Profile loading timed out; continuing with the authenticated session.");
					resolve();
				}, 8e3);
			})]);
		} finally {
			if (timeoutId !== void 0) clearTimeout(timeoutId);
		}
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		let authEventVersion = 0;
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			const eventVersion = ++authEventVersion;
			setCurrentUser(user);
			try {
				if (user) {
					setIsGuest(false);
					localStorage.removeItem("blood_app_guest");
					loadUserProfileSafely(user).catch((error) => {
						console.warn("Background user profile hydration failed:", error);
					});
				} else {
					setUserProfile(null);
					setIsGuest(localStorage.getItem("blood_app_guest") === "true");
					setActiveRole("user");
				}
			} finally {
				if (active && eventVersion === authEventVersion) setIsLoading(false);
			}
		});
		const handleRecoveryComplete = () => {
			if (auth.currentUser) loadUserProfileSafely(auth.currentUser).catch((error) => {
				console.warn("Post-recovery profile hydration failed:", error);
			});
		};
		if (typeof window !== "undefined") window.addEventListener("qataba-recovery-complete", handleRecoveryComplete);
		return () => {
			active = false;
			unsubscribe();
			if (typeof window !== "undefined") window.removeEventListener("qataba-recovery-complete", handleRecoveryComplete);
		};
	}, []);
	const getPhoneAuthVersion = async (cleanPhone) => {
		try {
			const authDoc = await getDoc(doc(db, "phone_auth", cleanPhone));
			if (authDoc.exists()) {
				const data = authDoc.data();
				return Number(data.version) || 1;
			}
		} catch (err) {
			console.warn("Error reading phone_auth record:", err);
		}
		return 1;
	};
	/**
	* Direct Email/Password Login
	*/
	const loginWithEmailPassword = async (email, pass) => {
		setIsLoading(true);
		try {
			const credential = await signInWithEmailAndPassword(auth, email, pass);
			setCurrentUser(credential.user);
			setIsGuest(false);
			localStorage.removeItem("blood_app_guest");
			localStorage.removeItem("has_logged_out");
			await loadUserProfileSafely(credential.user);
		} catch (err) {
			if (err.code === "auth/operation-not-allowed") throw new Error("تسجيل الدخول بكلمة المرور غير مفعّل. يرجى تفعيل مزود Email/Password في Firebase.");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Direct Login: Phone number + Password (no SMS code required)
	*/
	const loginWithPhone = async (phone, pass) => {
		setIsLoading(true);
		try {
			const cleanPhone = sanitizePhone(phone);
			if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 12) throw new Error("يرجى إدخال رقم الهاتف بشكل صحيح");
			if (!pass) throw new Error("يرجى إدخال كلمة المرور");
			const versionCacheKey = `blood_app_phone_auth_version_${cleanPhone}`;
			const cachedVersion = Number(localStorage.getItem(versionCacheKey) || 0);
			const candidateEmails = [
				...cachedVersion >= 1 && cachedVersion <= 50 ? [cachedVersion] : [],
				1,
				...Array.from({ length: 15 }, (_, index) => index + 1)
			].filter((version, index, all) => all.indexOf(version) === index).map((version) => getPhoneAuthEmail(cleanPhone, version));
			candidateEmails.push(`user_${cleanPhone}@qataba-blood.app`);
			let lastCredentialError = null;
			for (const email of candidateEmails) try {
				const credential = await signInWithEmailAndPassword(auth, email, pass);
				const matchedVersionMatch = email.match(/_v(\d+)@qataba-blood\.app$/);
				const matchedVersion = matchedVersionMatch ? Number(matchedVersionMatch[1]) : 0;
				const activeVersion = await getPhoneAuthVersion(cleanPhone);
				if (matchedVersion > 0 && activeVersion > matchedVersion || matchedVersion === 0 && activeVersion > 1) {
					await signOut(auth);
					localStorage.setItem(versionCacheKey, String(activeVersion));
					lastCredentialError = /* @__PURE__ */ new Error("تم استبدال كلمة المرور القديمة. استخدم كلمة المرور الجديدة.");
					continue;
				}
				setCurrentUser(credential.user);
				setIsGuest(false);
				localStorage.removeItem("blood_app_guest");
				localStorage.removeItem("has_logged_out");
				if (matchedVersion > 0) localStorage.setItem(versionCacheKey, String(matchedVersion));
				await loadUserProfileSafely(credential.user);
				return;
			} catch (loginErr) {
				if (loginErr.code === "auth/operation-not-allowed") {
					const e = /* @__PURE__ */ new Error("تسجيل الدخول بكلمة المرور غير مفعّل في Firebase. فعّل مزود Email/Password من إعدادات Authentication.");
					e.code = loginErr.code;
					throw e;
				}
				if (loginErr.code === "auth/too-many-requests") throw new Error("تم إجراء محاولات دخول كثيرة مؤقتاً. انتظر قليلاً ثم أعد المحاولة، أو استخدم «نسيت كلمة المرور؟».");
				if (loginErr.code === "auth/invalid-credential" || loginErr.code === "auth/user-not-found" || loginErr.code === "auth/wrong-password") {
					lastCredentialError = loginErr;
					continue;
				}
				throw loginErr;
			}
			throw lastCredentialError || /* @__PURE__ */ new Error("رقم الهاتف أو كلمة المرور غير صحيحة.");
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Direct Register: Phone number + Password only (no verification code, instant 1-step sign-up)
	*/
	const registerWithPhone = async (phone, pass, fullName) => {
		setIsLoading(true);
		try {
			const cleanPhone = sanitizePhone(phone);
			if (cleanPhone.length < 7 || cleanPhone.length > 12) throw new Error("يرجى إدخال رقم هاتف يمني صحيح (مثال: 773633918)");
			if (!pass || pass.length < 6) throw new Error("كلمة المرور يجب أن لا تقل عن 6 خانات");
			if (!fullName || fullName.trim().length < 2) throw new Error("يرجى إدخال الاسم الكامل (3 أحرف على الأقل)");
			const email = getPhoneAuthEmail(cleanPhone, 1);
			let cred;
			try {
				cred = await createUserWithEmailAndPassword(auth, email, pass);
			} catch (authErr) {
				if (authErr.code === "auth/operation-not-allowed") throw new Error("خدمة تسجيل الدخول بكلمة المرور غير مفعلة في Firebase.");
				if (authErr.code === "auth/email-already-in-use") throw new Error("هذا الرقم لديه حساب بالفعل. سجّل الدخول أو استخدم استعادة الحساب بعد التحقق من ملكيتك.");
				if (authErr.code === "auth/weak-password") throw new Error("كلمة المرور ضعيفة. اختر كلمة مرور لا تقل عن 6 خانات.");
				throw authErr;
			}
			const displayName = fullName.trim();
			try {
				await updateProfile(cred.user, { displayName });
				const mappingRef = doc(db, "phone_auth", cleanPhone);
				const profileRef = doc(db, "users", cred.user.uid);
				await runTransaction(db, async (transaction) => {
					if ((await transaction.get(mappingRef)).exists()) throw new Error("هذا الرقم مرتبط بحساب سابق. لا يمكن إنشاء حساب مكرر.");
					transaction.set(mappingRef, {
						phone: cleanPhone,
						version: 1,
						userId: cred.user.uid,
						updatedAt: serverTimestamp()
					});
					transaction.set(profileRef, {
						displayName,
						phone: cleanPhone,
						phoneVerified: false,
						role: "user",
						createdAt: serverTimestamp()
					});
				});
			} catch (writeError) {
				if (writeError?.message?.includes("مرتبط بحساب سابق")) {
					try {
						if (auth.currentUser?.uid === cred.user.uid) await deleteUser(cred.user);
					} catch (rollbackError) {
						console.error("Could not roll back duplicate Auth account:", rollbackError);
					}
					throw writeError;
				}
				console.error("Registration profile transaction failed; Auth account preserved:", writeError);
				const registrationError = /* @__PURE__ */ new Error("تم إنشاء بيانات الدخول، لكن تعذر حفظ ملف المستخدم في Firestore. لم نحذف حساب الدخول؛ تحقق من صلاحيات Firestore ثم سجّل الدخول بالرقم وكلمة المرور لإكمال الملف.");
				registrationError.code = writeError?.code;
				throw registrationError;
			}
			setCurrentUser(cred.user);
			setIsGuest(false);
			localStorage.removeItem("blood_app_guest");
			localStorage.removeItem("has_logged_out");
			localStorage.setItem(`blood_app_phone_auth_version_${cleanPhone}`, "1");
			await fetchUserProfile(cred.user);
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Password Reset with Scrambled Captcha:
	* Increments credential version and registers new password securely in Firebase Auth
	*/
	/**
	* Password reset is intentionally blocked until real phone ownership
	* verification is implemented. The previous flow created a new Firebase
	* Auth UID and could overwrite the existing phone mapping, causing duplicates.
	*/
	const resetPasswordDirect = async (_phone, _newPass) => {
		throw new Error("لحماية حسابك وبيانات متبرعيك، أوقفنا الاستعادة التي تنشئ حساباً جديداً. استخدم تسجيل الدخول بالبريد المرتبط بالحساب أو تواصل مع المسؤول لإثبات ملكية رقم الهاتف.");
	};
	const loginWithGoogle = async () => {
		setIsLoading(true);
		try {
			let signedInUser;
			if (Capacitor.getPlatform() === "android") {
				const idToken = (await FirebaseAuthentication.signInWithGoogle({
					skipNativeAuth: true,
					useCredentialManager: true
				})).credential?.idToken;
				if (!idToken) throw new Error("لم يُرجع Google رمز الهوية. تحقق من إعداد OAuth وملف google-services.json.");
				const googleCredential = GoogleAuthProvider.credential(idToken);
				signedInUser = (await signInWithCredential(auth, googleCredential)).user;
			} else {
				const provider = new GoogleAuthProvider();
				signedInUser = (await signInWithPopup(auth, provider)).user;
			}
			setCurrentUser(signedInUser);
			setIsGuest(false);
			localStorage.removeItem("blood_app_guest");
			localStorage.removeItem("has_logged_out");
			await loadUserProfileSafely(signedInUser);
			return signedInUser;
		} finally {
			setIsLoading(false);
		}
	};
	const continueAsGuest = () => {
		setIsGuest(true);
		localStorage.setItem("blood_app_guest", "true");
	};
	const logout = async () => {
		await signOut(auth);
		setIsGuest(false);
		localStorage.removeItem("blood_app_guest");
		localStorage.removeItem("blood_app_active_role");
		setActiveRole("user");
	};
	const deleteAccount = async (password) => {
		if (!currentUser) throw new Error("يرجى تسجيل الدخول أولاً");
		setIsLoading(true);
		try {
			const uid = currentUser.uid;
			try {
				await deleteDoc(doc(db, "users", uid));
			} catch (e) {
				console.warn("Could not delete users doc:", e);
			}
			try {
				await deleteDoc(doc(db, "donors", `donor_${uid}`));
			} catch (e) {
				console.warn("Could not delete donor doc:", e);
			}
			try {
				await deleteUser(currentUser);
			} catch (authErr) {
				if (authErr.code === "auth/requires-recent-login") {
					if (!password) {
						const e = /* @__PURE__ */ new Error("requires-recent-login");
						e.code = "auth/requires-recent-login";
						throw e;
					}
					if (currentUser.email) {
						const credential = EmailAuthProvider.credential(currentUser.email, password);
						await reauthenticateWithCredential(currentUser, credential);
						await deleteUser(currentUser);
					} else throw authErr;
				} else throw authErr;
			}
			setCurrentUser(null);
			setUserProfile(null);
			setIsGuest(false);
			localStorage.removeItem("blood_app_guest");
			localStorage.removeItem("blood_app_active_role");
			localStorage.setItem("has_logged_out", "true");
		} finally {
			setIsLoading(false);
		}
	};
	const updateUserName = async (newName) => {
		if (!currentUser) throw new Error("يرجى تسجيل الدخول أولاً");
		const trimmed = newName.trim();
		if (trimmed.length < 2) throw new Error("الاسم يجب أن يتكون من حرفين على الأقل");
		await updateProfile(currentUser, { displayName: trimmed });
		await setDoc(doc(db, "users", currentUser.uid), {
			displayName: trimmed,
			updatedAt: serverTimestamp()
		}, { merge: true });
		setUserProfile((prev) => prev ? {
			...prev,
			displayName: trimmed
		} : null);
	};
	const updateUserProfileAndAccount = async (fullName, phone, newPassword) => {
		if (!currentUser) throw new Error("يرجى تسجيل الدخول أولاً");
		const cleanName = fullName.trim();
		if (cleanName.length < 2) throw new Error("الاسم الكامل يجب أن يتكون من حرفين على الأقل");
		const cleanPhone = sanitizePhone(phone);
		await updateProfile(currentUser, { displayName: cleanName });
		const userDocRef = doc(db, "users", currentUser.uid);
		await setDoc(userDocRef, {
			displayName: cleanName,
			phone: cleanPhone || userProfile?.phone || "",
			updatedAt: serverTimestamp()
		}, { merge: true });
		try {
			const donorDocRef = doc(db, "donors", `donor_${currentUser.uid}`);
			const donorSnap = await getDoc(donorDocRef);
			if (donorSnap.exists()) await updateDoc(donorDocRef, {
				fullName: cleanName,
				phone: cleanPhone || donorSnap.data().phone,
				updatedAt: serverTimestamp()
			});
		} catch (e) {
			console.warn("Could not update donor profile during account update:", e);
		}
		if (newPassword && newPassword.trim().length >= 6) try {
			await updatePassword(currentUser, newPassword.trim());
		} catch (passErr) {
			if (passErr.code === "auth/requires-recent-login") throw new Error("لتغيير كلمة المرور، يرجى الخروج وتسجيل الدخول مجدداً ثم المحاولة.");
			throw new Error(passErr.message || "فشل تحديث كلمة المرور");
		}
		setUserProfile((prev) => prev ? {
			...prev,
			displayName: cleanName,
			phone: cleanPhone || prev.phone
		} : {
			uid: currentUser.uid,
			displayName: cleanName,
			phone: cleanPhone,
			phoneVerified: true,
			role: "user"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			currentUser,
			userProfile,
			isGuest,
			isLoading,
			loginWithPhone,
			loginWithEmailPassword,
			registerWithPhone,
			resetPasswordDirect,
			loginWithGoogle,
			continueAsGuest,
			logout,
			deleteAccount,
			updateUserName,
			updateUserProfileAndAccount,
			activeRole,
			switchActiveRole
		},
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
// src/data/initialData.ts
var COMMON_LOCATIONS = [
	"قعطبة - المدينة",
	"قعطبة - السوق العام",
	"مريس - الجبارة",
	"مريس - الصدر",
	"مريس - القهرة",
	"الفاخر",
	"سناح",
	"شخب",
	"حمر",
	"قردح",
	"حمك",
	"الضالع",
	"دمت",
	"أخرى (تحديد يدوي)"
];
var INITIAL_SEED_DONORS = [
	{
		fullName: "صالح محمد القعطبي",
		bloodType: "O+",
		phone: "771234501",
		residence: "قعطبة - المدينة",
		notes: "مستعد للتبرع في أي وقت لحالات الطوارئ",
		isAvailable: true
	},
	{
		fullName: "عبدالله أحمد المريسي",
		bloodType: "A+",
		phone: "772345602",
		residence: "مريس - الجبارة",
		notes: "متواجد بالقرب من مستشفى السلام",
		isAvailable: true
	},
	{
		fullName: "يحيى قاسم الفاخري",
		bloodType: "B+",
		phone: "773456703",
		residence: "الفاخر",
		notes: "جاهز لأي حالة طارئة في قعطبة أو الفاخر",
		isAvailable: true
	},
	{
		fullName: "ماجد ناصر الحالمي",
		bloodType: "O-",
		phone: "774567804",
		residence: "سناح",
		notes: "فصيلة O- معطي عام، تحت الطلب فوراً",
		isAvailable: true
	},
	{
		fullName: "محسن علي العولقي",
		bloodType: "AB+",
		phone: "775678905",
		residence: "قعطبة - الشارع العام",
		notes: "مستعد للتبرع بالحالات المستعجلة",
		isAvailable: true
	},
	{
		fullName: "طارق عبدالكريم",
		bloodType: "A-",
		phone: "776789006",
		residence: "مريس - الصدر",
		notes: "فصيلة نادرة جاهز للتبرع",
		isAvailable: true
	},
	{
		fullName: "هيثم مسعد الجباري",
		bloodType: "B-",
		phone: "777890107",
		residence: "مريس - الجبارة",
		notes: "متوفر وسيارة جاهزة للوصول لأي مشفى",
		isAvailable: true
	},
	{
		fullName: "فؤاد منصور اليافعي",
		bloodType: "AB-",
		phone: "778901208",
		residence: "قعطبة - المدينة",
		notes: "فصيلة AB سالب نادرة، جاهز لإنقاذ الأرواح",
		isAvailable: true
	}
];
var INITIAL_SEED_REQUESTS = [{
	patientName: "مريض في العناية المركزة (حادث سير)",
	bloodType: "O-",
	unitsNeeded: 3,
	hospital: "مستشفى السلام التخصصي - قعطبة",
	contactName: "أخو المريض (أبو محمد)",
	contactPhone: "770987654",
	urgencyLevel: "critical",
	status: "open",
	notes: "حالة حرجة جداً بحاجة ماسة لثلاثة أكياس دم فصيلة O سالب اليوم"
}, {
	patientName: "حالة ولادة قيصرية طارئة",
	bloodType: "B+",
	unitsNeeded: 2,
	hospital: "مستشفى قعطبة العام",
	contactName: "د. خالد (المشرف المناوب)",
	contactPhone: "771122334",
	urgencyLevel: "urgent",
	status: "open",
	notes: "بحاجة لكيسين دم B موجب قبل العملية خلال الساعات القادمة"
}];
// src/services/googleSheetsService.ts
/**
* خدمة الربط بجدول بيانات Google (Google Sheets)
* معرّف الجدول: 169L0-gWsPmSez8rXivSX5kt5p278Ry6ZJDU66AC42SY
* اسم ورقة العمل: قائمة الأشخاص
*/
var GOOGLE_SHEETS_CONFIG = {
	spreadsheetId: "169L0-gWsPmSez8rXivSX5kt5p278Ry6ZJDU66AC42SY",
	sheetName: "قائمة الأشخاص",
	appsScriptUrl: "https://script.google.com/macros/s/AKfycbx3HihrveSRxxjWGEl60y4vNcCFcb8IPQH3YlkfvwqaGapESvj11BTvXNwke-O7L56v/exec"
};
/**
* إرسال مباشر إلى Google Apps Script من تطبيق Android والويب.
* text/plain يمنع طلب CORS التمهيدي، مع بقاء جسم الطلب JSON.
*/
async function postToGoogleAppsScript(payload) {
	const requestData = {
		spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
		sheetName: GOOGLE_SHEETS_CONFIG.sheetName,
		...payload
	};
	let data;
	if (Capacitor.isNativePlatform()) try {
		const response = await CapacitorHttp.post({
			url: GOOGLE_SHEETS_CONFIG.appsScriptUrl,
			headers: { "Content-Type": "application/json" },
			data: requestData,
			connectTimeout: 2e4,
			readTimeout: 3e4,
			responseType: "json"
		});
		if (response.status < 200 || response.status >= 300) throw new Error(`Google Apps Script returned HTTP ${response.status}.`);
		data = response.data;
		if (typeof data === "string") data = JSON.parse(data);
	} catch (nativeErr) {
		const fallbackRes = await fetch(GOOGLE_SHEETS_CONFIG.appsScriptUrl, {
			method: "POST",
			headers: { "Content-Type": "text/plain;charset=utf-8" },
			body: JSON.stringify(requestData),
			redirect: "follow"
		});
		const fallbackText = await fallbackRes.text();
		if (!fallbackRes.ok || fallbackText.includes("<!DOCTYPE html>")) throw nativeErr instanceof Error ? nativeErr : /* @__PURE__ */ new Error(`HTTP ${fallbackRes.status}`);
		data = JSON.parse(fallbackText);
	}
	else {
		const response = await fetch("/api/sheets/proxy", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestData)
		});
		try {
			data = await response.json();
		} catch {
			throw new Error(`رد غير مفهوم من خادم المزامنة (HTTP ${response.status}).`);
		}
		if (!response.ok) throw new Error(data?.error || `فشل خادم المزامنة (HTTP ${response.status}).`);
	}
	if (!data || data.success !== true) throw new Error(data?.error || data?.message || "Google Apps Script لم يؤكد حفظ البيانات.");
	return data;
}
var PENDING_SHEETS_DONOR_SYNC_KEY = "qataba_pending_sheets_donor_sync_v1";
function readPendingSheetsDonorSyncs() {
	try {
		const parsed = JSON.parse(localStorage.getItem(PENDING_SHEETS_DONOR_SYNC_KEY) || "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function cancelPendingDonorSheetSync(donorId) {
	try {
		const remaining = readPendingSheetsDonorSyncs().filter((item) => item.donorId !== donorId);
		localStorage.setItem(PENDING_SHEETS_DONOR_SYNC_KEY, JSON.stringify(remaining));
	} catch {}
}
function queueSheetsDonorSync(payload) {
	try {
		const next = readPendingSheetsDonorSyncs().filter((item) => item.donorId !== payload.donorId);
		next.push(payload);
		localStorage.setItem(PENDING_SHEETS_DONOR_SYNC_KEY, JSON.stringify(next));
	} catch (error) {
		console.warn("Could not persist pending Sheets donor sync:", error);
	}
}
/**
* إرسال بيانات المتبرع إلى جدول Google Sheets عبر خادم التطبيق وواجهة Apps Script
* لا تعرض نجاحاً إلا عند تأكيد خادم Google حفظ البيانات فعلياً
*/
async function syncDonorToGoogleSheets(payload) {
	try {
		const data = await postToGoogleAppsScript({
			action: "registerDonor",
			name: payload.name.trim(),
			bloodType: payload.bloodType.trim(),
			phone: payload.phone.trim(),
			address: payload.address.trim(),
			donorId: payload.donorId || "",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		return {
			success: true,
			message: data.message || "تم تأكيد حفظ المتبرع في جدول Google Sheets بنجاح.",
			statusCode: 200,
			data
		};
	} catch (clientErr) {
		queueSheetsDonorSync(payload);
		return {
			success: false,
			error: `تعذر الاتصال حالياً؛ تم حفظ طلب المزامنة محلياً وسيعاد إرساله عند عودة الإنترنت: ${clientErr.message}`,
			statusCode: 0
		};
	}
}
/**
* حذف سجل المتبرع فعلياً من Google Sheets عبر Apps Script.
* يتم تمرير معرف السجل الأصلي دون بادئة العرض sheet_.
*/
async function deleteDonorFromGoogleSheets(donorId, phone) {
	try {
		const rawId = String(donorId || "").replace(/^sheet_/, "").trim();
		const normalizedId = /^row_\d+$/i.test(rawId) ? "" : rawId;
		const normalizedPhone = String(phone || "").replace(/[^\d]/g, "");
		if (!normalizedId && !normalizedPhone) return {
			success: false,
			error: "معرف المتبرع أو رقم هاتفه مطلوب للحذف."
		};
		const data = await postToGoogleAppsScript({
			action: "deleteDonor",
			donorId: normalizedId,
			phone: normalizedPhone
		});
		if (data.deleted === false) return {
			success: false,
			error: data.message || "لم يعثر Google Sheets على سجل المتبرع لحذفه.",
			data
		};
		return {
			success: true,
			message: data.message || "تم حذف المتبرع من Google Sheets.",
			statusCode: 200,
			data
		};
	} catch (err) {
		return {
			success: false,
			error: `فشل حذف المتبرع من Google Sheets: ${err.message}`,
			statusCode: 0
		};
	}
}
function normalizeAppsScriptDonor(d, idx) {
	const rawPhone = d?.phone !== void 0 && d?.phone !== null ? String(d.phone).trim() : "";
	return {
		...d,
		donorId: String(d?.donorId || d?.id || `sheet_${idx + 1}`).trim(),
		fullName: String(d?.fullName || d?.name || "").trim(),
		bloodType: String(d?.bloodType || "O+").trim().toUpperCase(),
		phone: rawPhone,
		residence: String(d?.residence || d?.address || "قعطبة").trim(),
		createdAt: d?.createdAt ? String(d.createdAt).trim() : "",
		source: "google_sheets"
	};
}
/**
* البحث عن المتبرعين في جدول Google Sheets
*/
async function searchDonorsFromSheets(bloodType) {
	try {
		const data = await postToGoogleAppsScript({
			action: "searchDonors",
			bloodType
		});
		return {
			success: true,
			data: (Array.isArray(data.donors) ? data.donors : Array.isArray(data) ? data : []).map((d, idx) => normalizeAppsScriptDonor(d, idx)),
			statusCode: 200
		};
	} catch (err) {
		return {
			success: false,
			error: `خطأ في الاتصال: ${err.message}`,
			statusCode: 0
		};
	}
}
/**
* تفكيك وتحليل نص أسطر CSV القادمة من جدول بيانات غوغل بدقة
*/
function parseGoogleSheetsCsv(csvText) {
	if (!csvText || typeof csvText !== "string") return [];
	const parseCsvLine = (line) => {
		const values = [];
		let current = "";
		let inQuotes = false;
		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			if (char === "\"") {
				if (inQuotes && line[i + 1] === "\"") {
					current += "\"";
					i++;
				} else inQuotes = !inQuotes;
			} else if (char === "," && !inQuotes) {
				values.push(current.trim());
				current = "";
			} else current += char;
		}
		values.push(current.trim());
		return values;
	};
	const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
	if (lines.length < 1) return [];
	const headerCols = parseCsvLine(lines[0]).map((h) => h.trim());
	let nameIdx = headerCols.findIndex((h) => (h.includes("اسم") || h.toLowerCase().includes("name")) && !h.toLowerCase().includes("donor"));
	let bloodIdx = headerCols.findIndex((h) => h.includes("فصيلة") || h.includes("دم") || h.toLowerCase().includes("blood"));
	let phoneIdx = headerCols.findIndex((h) => h.includes("هاتف") || h.includes("رقم") || h.toLowerCase().includes("phone") || h.includes("جوال"));
	let residenceIdx = headerCols.findIndex((h) => h.includes("سكن") || h.includes("عنوان") || h.toLowerCase().includes("address") || h.toLowerCase().includes("residence"));
	let dateIdx = headerCols.findIndex((h) => h.includes("تاريخ") || h.toLowerCase().includes("date") || h.toLowerCase().includes("createdat") || h.toLowerCase().includes("created_at"));
	let idIdx = headerCols.findIndex((h) => h.toLowerCase().includes("donorid") || h.toLowerCase().includes("id"));
	if (nameIdx === -1) nameIdx = 1;
	if (bloodIdx === -1) bloodIdx = 2;
	if (phoneIdx === -1) phoneIdx = 3;
	if (residenceIdx === -1) residenceIdx = 4;
	if (idIdx === -1) idIdx = 0;
	const startIndex = lines[0].includes("اسم") || lines[0].includes("name") || lines[0].includes("donorId") ? 1 : 0;
	const donors = [];
	for (let i = startIndex; i < lines.length; i++) {
		const cols = parseCsvLine(lines[i]);
		const sheetId = idIdx >= 0 ? cols[idIdx] : "";
		const name = (cols[nameIdx] || "").trim();
		const blood = (cols[bloodIdx] || "O+").trim().toUpperCase();
		const phone = (cols[phoneIdx] || "").trim();
		const residence = (cols[residenceIdx] || "قعطبة").trim();
		const date = dateIdx >= 0 ? (cols[dateIdx] || "").trim() : "";
		if (name && name.length >= 2) donors.push({
			fullName: name,
			bloodType: blood || "O+",
			phone,
			residence: residence || "قعطبة",
			createdAt: date,
			source: "google_sheets",
			donorId: sheetId || `row_${i}`
		});
	}
	return donors;
}
/**
* جلب قائمة المتبرعين من جدول Google Sheets لمزامنتها في التطبيق
* يدعم العمل في بيئة الويب وتطبيق Android APK مع مسار احتياطي مباشر لـ CSV
*/
async function fetchDonorsFromGoogleSheets() {
	try {
		const res = await fetch("/api/sheets/donors");
		if (res.ok) {
			const data = await res.json();
			if (data.success && Array.isArray(data.donors) && data.donors.length > 0) return {
				success: true,
				donors: data.donors,
				count: data.donors.length,
				source: data.source || "proxy"
			};
		}
	} catch {}
	try {
		const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(GOOGLE_SHEETS_CONFIG.sheetName)}`;
		const res = await fetch(csvUrl);
		if (res.ok) {
			const text = await res.text();
			if (!text.includes("<!DOCTYPE html>") && text.length > 50) {
				const parsed = parseGoogleSheetsCsv(text);
				if (parsed.length > 0) return {
					success: true,
					donors: parsed,
					count: parsed.length,
					source: "csv_direct"
				};
			}
		}
	} catch (directErr) {
		console.warn("Direct CSV fetch warning:", directErr);
	}
	try {
		const data = await postToGoogleAppsScript({
			action: "searchDonors",
			bloodType: ""
		});
		const list = Array.isArray(data?.donors) ? data.donors : [];
		if (list.length > 0) {
			const normalized = list.map((d, idx) => normalizeAppsScriptDonor(d, idx)).filter((d) => d.fullName && d.fullName.length >= 2);
			return {
				success: true,
				donors: normalized,
				count: normalized.length,
				source: "apps_script"
			};
		}
	} catch (scriptErr) {
		console.warn("Direct Apps Script fetch warning:", scriptErr);
	}
	return {
		success: false,
		error: "تعذر جلب بيانات الشيت عبر الخادم أو الرابط المباشر أو Apps Script",
		donors: []
	};
}
/**
* إرسال نص صفوف منسوخة من جدول البيانات أو ملف CSV للمزامنة المباشرة
*/
async function importRawDonors(textData) {
	try {
		return await (await fetch("/api/sheets/import-raw", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ textData })
		})).json();
	} catch (err) {
		return {
			success: false,
			error: `فشل استيراد البيانات: ${err.message}`
		};
	}
}
/**
* إرسال قائمة كاملة من المتبرعين إلى جدول Google Sheets للمزامنة الشاملة
* يستخدم هذا الخيار لمزامنة كافة بيانات التطبيق مع الجدول دفعة واحدة
*/
async function pushAllDonorsToSheets(donors) {
	try {
		const data = await postToGoogleAppsScript({
			action: "batchRegister",
			donors: donors.map((d) => ({
				name: d.fullName || d.name,
				bloodType: d.bloodType,
				phone: d.phone,
				address: d.residence || d.address || "قعطبة",
				donorId: d.id || d.donorId || "",
				createdAt: d.createdAt || (/* @__PURE__ */ new Date()).toISOString()
			}))
		});
		const count = Number(data.count);
		const processedCount = Number(data.added || 0) + Number(data.updated || 0);
		return {
			success: true,
			count: Number.isFinite(count) && count > 0 ? count : processedCount
		};
	} catch (err) {
		return {
			success: false,
			count: 0,
			error: `فشل المزامنة الشاملة: ${err.message}`
		};
	}
}
// src/services/donorService.ts
var DONORS_COLLECTION = "donors";
var REQUESTS_COLLECTION = "urgent_requests";
function subscribeToDonors(callback, onError) {
	const q = query(collection(db, DONORS_COLLECTION));
	return onSnapshot(q, (snapshot) => {
		const items = [];
		snapshot.forEach((d) => {
			const data = d.data();
			items.push({
				id: d.id,
				userId: data.userId || "",
				fullName: data.fullName || "",
				bloodType: data.bloodType || "O+",
				phone: data.phone || "",
				phoneVerified: data.phoneVerified ?? true,
				residence: data.residence || "",
				notes: data.notes || "",
				lastDonationDate: data.lastDonationDate || "",
				isAvailable: data.isAvailable ?? true,
				allowContact: data.allowContact ?? true,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt
			});
		});
		callback(items);
	}, (error) => {
		console.warn("Subscription snapshot warning in subscribeToDonors (e.g. offline):", error);
		if (onError) onError(error);
		if (!(error.message?.toLowerCase().includes("offline") || error.message?.toLowerCase().includes("unavailable") || error.message?.toLowerCase().includes("network"))) handleFirestoreError(error, OperationType.LIST, DONORS_COLLECTION);
	});
}
async function saveDonorProfile(donorData, existingDonorId) {
	const isSheetDonor = Boolean(existingDonorId && existingDonorId.startsWith("sheet_"));
	const donorId = existingDonorId && !isSheetDonor ? existingDonorId : `donor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
	const donorDocRef = doc(db, DONORS_COLLECTION, donorId);
	const cleanPhone = donorData.phone.trim().replace(/\D/g, "");
	const payload = {
		userId: donorData.userId,
		fullName: donorData.fullName.trim(),
		bloodType: donorData.bloodType,
		phone: cleanPhone,
		phoneVerified: Boolean(donorData.phoneVerified ?? true),
		residence: donorData.residence.trim(),
		notes: (donorData.notes || "").trim(),
		lastDonationDate: (donorData.lastDonationDate || "").trim(),
		isAvailable: Boolean(donorData.isAvailable),
		allowContact: Boolean(donorData.allowContact),
		updatedAt: serverTimestamp()
	};
	try {
		if (existingDonorId && !isSheetDonor) {
			await updateDoc(donorDocRef, payload);
			return donorId;
		} else {
			await setDoc(donorDocRef, {
				...payload,
				createdAt: serverTimestamp()
			});
			if (isSheetDonor && existingDonorId) try {
				const settingsRef = doc(db, "settings", "global");
				const snap = await getDoc(settingsRef);
				const currentDeleted = snap.exists() ? snap.data().deletedDonors || [] : [];
				if (!currentDeleted.includes(existingDonorId)) await setDoc(settingsRef, {
					deletedDonors: [...currentDeleted, existingDonorId],
					updatedAt: serverTimestamp()
				}, { merge: true });
			} catch (e) {
				console.warn("Note: sheet upgrade sync caught:", e);
			}
			return donorId;
		}
	} catch (error) {
		handleFirestoreError(error, existingDonorId && !isSheetDonor ? OperationType.UPDATE : OperationType.CREATE, `${DONORS_COLLECTION}/${donorId}`);
	}
}
async function updateDonorProfile(donorId, updates) {
	const donorDocRef = doc(db, DONORS_COLLECTION, donorId);
	try {
		const payload = {
			...updates,
			updatedAt: serverTimestamp()
		};
		if (payload.id) delete payload.id;
		await updateDoc(donorDocRef, payload);
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, `${DONORS_COLLECTION}/${donorId}`);
	}
}
var PENDING_DONOR_DELETIONS_KEY = "qataba_pending_donor_deletions_v1";
function readPendingDonorDeletions() {
	try {
		const parsed = JSON.parse(localStorage.getItem(PENDING_DONOR_DELETIONS_KEY) || "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function savePendingDonorDeletions(items) {
	try {
		localStorage.setItem(PENDING_DONOR_DELETIONS_KEY, JSON.stringify(items));
	} catch {}
}
function isAlreadyMissingFromSheets(result) {
	return /not found|لم يعثر|غير موجود|لا يوجد سجل|لم يتم العثور/i.test(String(result.error || result.message || ""));
}
async function applyDonorDeletionToCloud(donorId, phone) {
	const sheetsDonorId = donorId.startsWith("sheet_") ? donorId.slice(6) : donorId;
	if (!donorId.startsWith("sheet_")) await deleteDoc(doc(db, DONORS_COLLECTION, donorId));
	const cleanP = phone.replace(/[^\d]/g, "");
	const tombstones = Array.from(/* @__PURE__ */ new Set([
		donorId,
		sheetsDonorId,
		...cleanP ? [cleanP] : []
	]));
	await setDoc(doc(db, "settings", "global"), {
		deletedDonors: arrayUnion(...tombstones),
		updatedAt: serverTimestamp()
	}, { merge: true });
}
async function deleteDonorProfile(donorId, donorPhone) {
	const phone = String(donorPhone || "");
	cancelPendingDonorSheetSync(donorId);
	const pending = readPendingDonorDeletions();
	if (!pending.some((item) => item.donorId === donorId)) {
		pending.push({
			donorId,
			phone
		});
		savePendingDonorDeletions(pending);
	}
	if (typeof navigator !== "undefined" && !navigator.onLine) return;
	try {
		const sheetsDonorId = donorId.startsWith("sheet_") ? donorId.slice(6) : donorId;
		await applyDonorDeletionToCloud(donorId, phone);
		const sheetsResult = await deleteDonorFromGoogleSheets(sheetsDonorId, phone);
		if (!sheetsResult.success && !isAlreadyMissingFromSheets(sheetsResult)) throw new Error(sheetsResult.error || "تعذر حذف المتبرع من جدول Google Sheets.");
		savePendingDonorDeletions(readPendingDonorDeletions().filter((item) => item.donorId !== donorId));
	} catch (error) {
		console.warn("Donor deletion queued for retry:", error);
	}
}
function subscribeToUrgentRequests(callback, onError) {
	const q = query(collection(db, REQUESTS_COLLECTION), orderBy("createdAt", "desc"), limit(50));
	return onSnapshot(q, (snapshot) => {
		const items = [];
		snapshot.forEach((d) => {
			const data = d.data();
			items.push({
				id: d.id,
				userId: data.userId || "",
				patientName: data.patientName || "",
				bloodType: data.bloodType || "O+",
				unitsNeeded: Number(data.unitsNeeded) || 1,
				hospital: data.hospital || "",
				contactName: data.contactName || "",
				contactPhone: data.contactPhone || "",
				urgencyLevel: data.urgencyLevel || "urgent",
				status: data.status || "open",
				notes: data.notes || "",
				createdAt: data.createdAt,
				updatedAt: data.updatedAt
			});
		});
		callback(items);
	}, (error) => {
		console.warn("Subscription snapshot warning in subscribeToUrgentRequests (e.g. offline):", error);
		if (onError) onError(error);
		if (!(error.message?.toLowerCase().includes("offline") || error.message?.toLowerCase().includes("unavailable") || error.message?.toLowerCase().includes("network"))) handleFirestoreError(error, OperationType.LIST, REQUESTS_COLLECTION);
	});
}
async function createUrgentRequest(requestData) {
	const reqId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
	const reqDocRef = doc(db, REQUESTS_COLLECTION, reqId);
	const cleanPhone = requestData.contactPhone.trim().replace(/\D/g, "");
	const payload = {
		userId: requestData.userId,
		patientName: requestData.patientName.trim(),
		bloodType: requestData.bloodType,
		unitsNeeded: Math.max(1, Math.min(20, Number(requestData.unitsNeeded) || 1)),
		hospital: requestData.hospital.trim(),
		contactName: requestData.contactName.trim(),
		contactPhone: cleanPhone,
		urgencyLevel: requestData.urgencyLevel,
		status: "open",
		notes: (requestData.notes || "").trim(),
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	};
	try {
		await setDoc(reqDocRef, payload);
		return reqId;
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, `${REQUESTS_COLLECTION}/${reqId}`);
	}
}
async function updateRequestStatus(requestId, newStatus) {
	const reqDocRef = doc(db, REQUESTS_COLLECTION, requestId);
	try {
		await updateDoc(reqDocRef, {
			status: newStatus,
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, `${REQUESTS_COLLECTION}/${requestId}`);
	}
}
async function deleteUrgentRequest(requestId) {
	try {
		await deleteDoc(doc(db, REQUESTS_COLLECTION, requestId));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, `${REQUESTS_COLLECTION}/${requestId}`);
	}
}
async function seedInitialCommunityData(currentUserId) {
	try {
		if ((await getDocs(collection(db, DONORS_COLLECTION))).empty) {
			console.log("Seeding initial community donors for Qa'tabah...");
			for (let i = 0; i < INITIAL_SEED_DONORS.length; i++) {
				const item = INITIAL_SEED_DONORS[i];
				const seedId = `donor_seed_${i + 1}`;
				await setDoc(doc(db, DONORS_COLLECTION, seedId), {
					...item,
					userId: currentUserId,
					allowContact: true,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp()
				});
			}
			for (let j = 0; j < INITIAL_SEED_REQUESTS.length; j++) {
				const req = INITIAL_SEED_REQUESTS[j];
				const reqId = `req_seed_${j + 1}`;
				await setDoc(doc(db, REQUESTS_COLLECTION, reqId), {
					...req,
					userId: currentUserId,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp()
				});
			}
		}
	} catch (err) {
		console.warn("Seeding check completed (or rules restricted non-auth):", err);
	}
}
// src/services/offlineStorageService.ts
/**
* نظام التخزين المحلي الدائم (Offline-First) لبنك الدم - قعطبة
* يعتمد على IndexedDB مع مرآة متزامنة فورية (Synchronous LocalStorage Cache)
* لضمان تحميل فوري بنسبة 100% دون أي تأخير عند فتح التطبيق بدون اتصال بالإنترنت.
*/
var DB_NAME = "QatabaBloodBankDB";
var DB_VERSION = 1;
var STORE_DONORS = "donors";
var STORE_URGENT = "urgent_requests";
var STORE_METADATA = "sync_metadata";
var LOCAL_STORAGE_DONORS_KEY = "qataba_offline_donors_v1";
var LOCAL_STORAGE_URGENT_KEY = "qataba_offline_urgent_v1";
var LOCAL_STORAGE_META_KEY = "qataba_offline_meta_v1";
var dbPromise = null;
/**
* فتح قاعدة بيانات IndexedDB وضمان إنشاء الجداول (Object Stores) والفهارس
*/
function openOfflineDB() {
	if (typeof window === "undefined" || !window.indexedDB) return Promise.reject(/* @__PURE__ */ new Error("IndexedDB غير مدعوم في هذه البيئة"));
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		try {
			const request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(STORE_DONORS)) {
					const donorStore = db.createObjectStore(STORE_DONORS, { keyPath: "id" });
					donorStore.createIndex("bloodType", "bloodType", { unique: false });
					donorStore.createIndex("residence", "residence", { unique: false });
					donorStore.createIndex("phone", "phone", { unique: false });
					donorStore.createIndex("source", "source", { unique: false });
				}
				if (!db.objectStoreNames.contains(STORE_URGENT)) {
					const urgentStore = db.createObjectStore(STORE_URGENT, { keyPath: "id" });
					urgentStore.createIndex("bloodType", "bloodType", { unique: false });
					urgentStore.createIndex("status", "status", { unique: false });
					urgentStore.createIndex("urgencyLevel", "urgencyLevel", { unique: false });
				}
				if (!db.objectStoreNames.contains(STORE_METADATA)) db.createObjectStore(STORE_METADATA, { keyPath: "key" });
			};
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				console.warn("⚠️ فشل فتح IndexedDB:", request.error);
				reject(request.error);
			};
		} catch (err) {
			console.warn("⚠️ خطأ استثنائي أثناء محاولة فتح IndexedDB:", err);
			reject(err);
		}
	});
	return dbPromise;
}
/**
* 0-Millisecond Synchronous Hydration:
* جلب فوري من الذاكرة المحلية المخزنة مسبقاً قبل انتظار أي وعود (Promises) غير متزامنة.
* هذا يمنح التطبيق ظهوراً فورياً بنسبة 0ms لقائمة المتبرعين عند فتحه بدون إنترنت.
*/
function getInstantLocalDonorsSync() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_DONORS_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return parsed;
		}
	} catch (err) {
		console.warn("تعذر قراءة الكاش المتزامن للمتبرعين:", err);
	}
	return [];
}
/**
* جلب الكاش المتزامن لطلبات الدم العاجلة
*/
function getInstantLocalUrgentSync() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_URGENT_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return parsed;
		}
	} catch (err) {
		console.warn("تعذر قراءة الكاش المتزامن لطلبات الدم:", err);
	}
	return [];
}
/**
* جلب البيانات الوصفية للمزامنة بشكل متزامن
*/
function getInstantSyncMetaSync() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_META_KEY);
		if (raw) return JSON.parse(raw);
	} catch {}
	return null;
}
/**
* حفظ قائمة المتبرعين في قاعدة البيانات المحلية الدائمة (IndexedDB)
* وتحديث المرآة السريعة (LocalStorage) والبيانات الوصفية
*/
async function saveDonorsToOfflineStorage(donors, extraMeta) {
	if (!Array.isArray(donors) || donors.length === 0) return false;
	if (getInstantLocalDonorsSync().length > donors.length && donors.length < 10) {
		console.warn("رفض حفظ قائمة متبرعين جزئية حتى لا تُستبدل النسخة المحلية الكاملة.");
		return false;
	}
	const timestamp = Date.now();
	const metadata = {
		key: "latest",
		lastSyncTime: (/* @__PURE__ */ new Date()).toLocaleTimeString("ar-YE", {
			hour: "2-digit",
			minute: "2-digit"
		}),
		lastSyncTimestamp: timestamp,
		donorCount: donors.length,
		sheetsCount: extraMeta?.sheetsCount,
		firestoreCount: extraMeta?.firestoreCount,
		isOfflineSnapshot: !navigator.onLine,
		version: 1
	};
	try {
		localStorage.setItem(LOCAL_STORAGE_DONORS_KEY, JSON.stringify(donors));
		localStorage.setItem(LOCAL_STORAGE_META_KEY, JSON.stringify(metadata));
	} catch (e) {
		console.warn("تنبيه: حجم LocalStorage ممتلئ، الاعتماد الأساسي على IndexedDB.");
	}
	try {
		const db = await openOfflineDB();
		return new Promise((resolve) => {
			const tx = db.transaction([STORE_DONORS, STORE_METADATA], "readwrite");
			const donorStore = tx.objectStore(STORE_DONORS);
			const metaStore = tx.objectStore(STORE_METADATA);
			donorStore.clear();
			for (const donor of donors) donorStore.put(donor);
			metaStore.put(metadata);
			tx.oncomplete = () => {
				resolve(true);
			};
			tx.onerror = () => {
				console.warn("⚠️ خطأ أثناء حفظ المتبرعين في IndexedDB:", tx.error);
				resolve(false);
			};
		});
	} catch (err) {
		console.warn("⚠️ تعذر إتمام عملية الحفظ في IndexedDB:", err);
		return false;
	}
}
/**
* استرجاع جميع المتبرعين من قاعدة البيانات المحلية IndexedDB
*/
async function getDonorsFromOfflineStorage() {
	try {
		const db = await openOfflineDB();
		return new Promise((resolve) => {
			const request = db.transaction(STORE_DONORS, "readonly").objectStore(STORE_DONORS).getAll();
			request.onsuccess = () => {
				const results = request.result;
				if (Array.isArray(results) && results.length > 0) resolve(results);
				else resolve(getInstantLocalDonorsSync());
			};
			request.onerror = () => {
				resolve(getInstantLocalDonorsSync());
			};
		});
	} catch (err) {
		return getInstantLocalDonorsSync();
	}
}
/**
* حفظ طلبات الدم العاجلة محلياً
*/
async function saveUrgentRequestsToOfflineStorage(requests) {
	if (!Array.isArray(requests)) return false;
	try {
		localStorage.setItem(LOCAL_STORAGE_URGENT_KEY, JSON.stringify(requests));
	} catch {}
	try {
		const db = await openOfflineDB();
		return new Promise((resolve) => {
			const tx = db.transaction(STORE_URGENT, "readwrite");
			const store = tx.objectStore(STORE_URGENT);
			store.clear();
			for (const req of requests) store.put(req);
			tx.oncomplete = () => resolve(true);
			tx.onerror = () => resolve(false);
		});
	} catch {
		return false;
	}
}
/**
* استرجاع طلبات الدم العاجلة من التخزين المحلي
*/
async function getUrgentRequestsFromOfflineStorage() {
	try {
		const db = await openOfflineDB();
		return new Promise((resolve) => {
			const req = db.transaction(STORE_URGENT, "readonly").objectStore(STORE_URGENT).getAll();
			req.onsuccess = () => {
				if (Array.isArray(req.result) && req.result.length > 0) resolve(req.result);
				else resolve(getInstantLocalUrgentSync());
			};
			req.onerror = () => resolve(getInstantLocalUrgentSync());
		});
	} catch {
		return getInstantLocalUrgentSync();
	}
}
/**
* حذف متبرع من التخزين المحلي فوراً عند قيام المسؤول بحذفه
*/
async function deleteDonorFromOfflineStorage(donorId, phone) {
	try {
		const cleanP = phone ? phone.replace(/\\D/g, "") : "";
		const matchesDeleted = (d) => {
			if (String(d.id) === String(donorId)) return true;
			if (cleanP && d.phone && String(d.phone).replace(/\\D/g, "") === cleanP) return true;
			return false;
		};
		const updated = getInstantLocalDonorsSync().filter((d) => !matchesDeleted(d));
		localStorage.setItem(LOCAL_STORAGE_DONORS_KEY, JSON.stringify(updated));
		const db = await openOfflineDB();
		return await new Promise((resolve) => {
			const tx = db.transaction([STORE_DONORS, STORE_METADATA], "readwrite");
			const store = tx.objectStore(STORE_DONORS);
			const metaStore = tx.objectStore(STORE_METADATA);
			const request = store.getAll();
			request.onsuccess = () => {
				const remaining = request.result.filter((d) => !matchesDeleted(d));
				store.clear();
				for (const donor of remaining) store.put(donor);
				const rawMeta = localStorage.getItem(LOCAL_STORAGE_META_KEY);
				let previousMeta = null;
				try {
					previousMeta = rawMeta ? JSON.parse(rawMeta) : null;
				} catch {}
				const metadata = {
					key: "latest",
					lastSyncTime: (/* @__PURE__ */ new Date()).toLocaleTimeString("ar-YE", {
						hour: "2-digit",
						minute: "2-digit"
					}),
					lastSyncTimestamp: Date.now(),
					donorCount: remaining.length,
					sheetsCount: previousMeta?.sheetsCount,
					firestoreCount: previousMeta?.firestoreCount,
					isOfflineSnapshot: !navigator.onLine,
					version: 1
				};
				try {
					localStorage.setItem(LOCAL_STORAGE_META_KEY, JSON.stringify(metadata));
				} catch {}
				metaStore.put(metadata);
			};
			request.onerror = () => {
				tx.abort();
			};
			tx.oncomplete = () => resolve(true);
			tx.onerror = () => resolve(false);
			tx.onabort = () => resolve(false);
		});
	} catch (error) {
		console.warn("تعذر حذف المتبرع من التخزين المحلي:", error);
		return false;
	}
}
// src/components/Header.tsx
var Header = ({ onOpenAuth, onOpenInstallModal, onOpenSidebar, onGoToUrgent, onOpenNotifications, onOpenRoleModal, onGlobalRefresh, isRefreshing = false, unreadCount = 2 }) => {
	const { activeRole } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto px-3 py-2 flex items-center justify-between gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 shrink-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpenSidebar,
					className: "w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-0.5 rounded-full border-2 border-rose-500 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/images/app_logo_icon.jpg",
								alt: "أيقونة بنك الدم",
								className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover",
								onError: (e) => {
									e.target.style.display = "none";
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0.5 right-0.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[11px] sm:text-sm font-black text-slate-900 leading-none whitespace-nowrap",
							children: "قطرة دم تنقذ حياة إنسان"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] text-slate-400 font-bold mt-1 whitespace-nowrap leading-none",
							children: "مديرية قعطبه - محافظة الضالع"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 shrink-0",
				children: [
					activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenRoleModal,
						className: "px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-black shadow-xs hidden sm:block",
						children: "وضع المسؤول ✓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenRoleModal,
						title: "تبديل وضع المستخدم (مسؤول / متبرع)",
						className: `w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer ${activeRole === "admin" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-red-600 hover:bg-red-50"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "w-5 h-5 sm:w-5.5 sm:h-5.5" })
					}),
					onGlobalRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onGlobalRefresh,
						disabled: isRefreshing,
						title: "تحديث شامل للتطبيق وسحب أي إضافات وتعديلات جديدة فوراً",
						className: `w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition-all shadow-xs cursor-pointer ${isRefreshing ? "opacity-80" : "active:scale-95"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 sm:w-4.5 sm:h-4.5 ${isRefreshing ? "animate-spin text-emerald-600" : ""}` })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (onOpenNotifications) onOpenNotifications();
							else if (onGoToUrgent) onGoToUrgent();
						},
						title: "الإشعارات والتنبيهات الواردة",
						className: "relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shadow-xs cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4 sm:w-5 sm:h-5" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-red-600 text-white font-black text-[9px] flex items-center justify-center border-2 border-white shadow-xs animate-pulse",
							children: unreadCount
						})]
					})
				]
			})]
		})
	});
};
// src/services/chatService.ts
var CONVERSATIONS_COLLECTION = "conversations";
/**
* Subscribe to all conversations (Admin only)
*/
var subscribeToAllConversations = (callback) => {
	const q = query(collection(db, CONVERSATIONS_COLLECTION), orderBy("updatedAt", "desc"));
	return onSnapshot(q, (snapshot) => {
		callback(snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})));
	}, (error) => {
		handleFirestoreError(error, OperationType.LIST, CONVERSATIONS_COLLECTION);
	});
};
/**
* Subscribe to a single conversation (User or Admin)
*/
var subscribeToConversation = (userId, callback) => {
	const docRef = doc(db, CONVERSATIONS_COLLECTION, userId);
	return onSnapshot(docRef, (snapshot) => {
		if (snapshot.exists()) callback({
			id: snapshot.id,
			...snapshot.data()
		});
		else callback(null);
	}, (error) => {
		handleFirestoreError(error, OperationType.GET, `${CONVERSATIONS_COLLECTION}/${userId}`);
	});
};
/**
* Subscribe to messages in a conversation
*/
var subscribeToMessages = (userId, callback) => {
	const q = query(collection(db, CONVERSATIONS_COLLECTION, userId, "messages"), orderBy("createdAt", "asc"));
	return onSnapshot(q, (snapshot) => {
		callback(snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})));
	}, (error) => {
		handleFirestoreError(error, OperationType.LIST, `${CONVERSATIONS_COLLECTION}/${userId}/messages`);
	});
};
/**
* Send a message
*/
var sendMessage = async (userId, senderId, text, isAdmin, userProfile) => {
	try {
		const convRef = doc(db, CONVERSATIONS_COLLECTION, userId);
		const messagesRef = collection(db, CONVERSATIONS_COLLECTION, userId, "messages");
		await addDoc(messagesRef, {
			senderId,
			text: text.trim(),
			isAdmin,
			createdAt: serverTimestamp()
		});
		const convSnap = await getDoc(convRef);
		const updateData = {
			lastMessage: text.trim(),
			lastMessageAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			status: isAdmin ? "replied" : "new"
		};
		if (isAdmin) updateData.unreadCountByUser = increment(1);
		else {
			updateData.unreadCountByAdmin = increment(1);
			if (!convSnap.exists() && userProfile) {
				updateData.userId = userId;
				updateData.userDisplayName = userProfile.displayName;
				updateData.userPhone = userProfile.phone || "";
				updateData.unreadCountByUser = 0;
			}
		}
		await setDoc(convRef, updateData, { merge: true });
		try {
			let targetToken = null;
			let title = "";
			let body = text.length > 50 ? text.substring(0, 47) + "..." : text;
			if (isAdmin) {
				const userSnap = await getDoc(doc(db, "users", userId));
				targetToken = userSnap.exists() ? userSnap.data().fcmToken : null;
				title = "رد من إدارة تطبيق قطرة دم";
			} else {
				const adminsQuery = query(collection(db, "users"), where("role", "==", "admin"), limit(1));
				const adminsSnap = await getDocs(adminsQuery);
				if (!adminsSnap.empty) targetToken = adminsSnap.docs[0].data().fcmToken;
				title = `رسالة جديدة من ${userProfile?.displayName || "مستخدم"}`;
			}
			if (targetToken) await fetch("/api/notifications/send", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token: targetToken,
					title,
					body
				})
			});
		} catch (notifyErr) {
			console.warn("Notification trigger failed:", notifyErr);
		}
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, CONVERSATIONS_COLLECTION);
	}
};
/**
* Mark messages as read
*/
var markAsRead = async (userId, isAdmin) => {
	try {
		const convRef = doc(db, CONVERSATIONS_COLLECTION, userId);
		const updateData = {};
		if (isAdmin) {
			updateData.unreadCountByAdmin = 0;
			updateData.status = "read";
		} else updateData.unreadCountByUser = 0;
		await updateDoc(convRef, updateData);
	} catch (error) {}
};
/**
* Update conversation status
*/
var updateConversationStatus = async (userId, status) => {
	try {
		const convRef = doc(db, CONVERSATIONS_COLLECTION, userId);
		await updateDoc(convRef, {
			status,
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, CONVERSATIONS_COLLECTION);
	}
};
// src/components/AboutUsModal.tsx
var AboutUsModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-['Cairo',sans-serif] text-right",
			dir: "rtl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 bg-linear-to-r from-red-600 to-rose-700 text-white flex items-center justify-between shrink-0 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-6 h-6 fill-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-black",
							children: "من نحن"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-red-100 font-bold",
							children: "مبادرة «قطرة دم تنقذ حياة إنسان»"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-2 hover:bg-white/20 rounded-xl transition-colors text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2 border-b border-slate-100 pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-black",
									children: "مبادرة إنسانية خيرية"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-xl font-black text-slate-900",
									children: "قطرة دم تنقذ حياة إنسان"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-extrabold text-slate-600",
									children: "مبادرة إنسانية لخدمة أبناء مديرية قعطبة – محافظة الضالع"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm font-medium text-slate-700 leading-loose",
								children: [
									"تطبيق ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "«قطرة دم تنقذ حياة إنسان»" }),
									" هو مبادرة إنسانية وخيرية تهدف إلى تسهيل عملية التبرع بالدم، وربط المحتاجين إلى الدم بالمتبرعين في مديرية قعطبة والمناطق المجاورة، من خلال منصة إلكترونية تساعد على الوصول إلى المتبرع المناسب في الوقت المناسب."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm font-medium text-slate-700 leading-loose",
								children: "نسعى من خلال هذا التطبيق إلى بناء مجتمع متعاون ومتكاتف، تكون فيه قطرة الدم أملاً لمريض، وسبباً في إنقاذ حياة إنسان."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-red-600 border-b border-slate-100 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-sm text-slate-900",
									children: "أهداف التطبيق"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-xs sm:text-sm text-slate-700 font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنشاء قاعدة بيانات منظمة للمتبرعين بالدم حسب فصائل الدم." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسهيل البحث عن المتبرعين حسب فصيلة الدم ومكان السكن." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "استقبال ونشر طلبات التبرع بالدم العاجلة." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسهيل التواصل بين المحتاجين والمتبرعين." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نشر ثقافة التبرع بالدم والعمل التطوعي." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعزيز روح التكافل والتعاون بين أبناء المجتمع." })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 bg-rose-50/60 p-4 rounded-2xl border border-rose-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-rose-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-sm text-slate-900",
									children: "رسالتنا"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-slate-700 font-medium leading-relaxed",
								children: "أن نجعل الوصول إلى متبرع بالدم أسرع وأسهل، وأن نساهم في إنقاذ الأرواح من خلال العمل الإنساني والتعاون المجتمعي."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-emerald-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-sm text-slate-900",
									children: "رؤيتنا"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-slate-700 font-medium leading-relaxed",
								children: "أن تصبح مديرية قعطبة نموذجاً في التكافل الإنساني والتعاون في مجال التبرع بالدم، وأن تمتد هذه المبادرة لخدمة بقية المديريات والمحافظات اليمنية."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-2xl bg-linear-to-r from-red-600 to-rose-600 text-white text-center space-y-1 shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 text-xs font-extrabold text-red-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 fill-white text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "شعارنا" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-black",
								children: "قطرة منك قد تعيد الحياة لإنسان."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-snug",
								children: "هذا التطبيق مبادرة خيرية مجتمعية، غايتها خدمة الإنسان دون مقابل، والتبرع بالدم فيه عمل تطوعي وإنساني."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 bg-slate-50 border-t border-slate-100 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-colors shadow-xs",
						children: "إغلاق"
					})
				})
			]
		})
	});
};
// src/utils/whatsapp.ts
/**
* أداة معالجة وتجهيز أرقام وروابط الواتساب لمديرية قعطبة
* تحل مشكلة أرقام الهواتف التي تبدأ بصفر (مثل 077...) أو البادئات الدولية (00967 أو +967)
* وتوفر روابط مباشرة ومجربة لا تعلق في دوائر البحث ولا تظهر خطأ "تعذر الاتصال حاول مرة أخرى".
*/
/**
* تنظيف وتنسيق رقم الهاتف ليكون رقماً دولياً صالحاً 100% في واتساب
*/
function formatWhatsAppNumber(phone) {
	if (!phone) return "";
	let p = String(phone).trim().replace(/\D/g, "");
	if (!p) return "";
	if (p.startsWith("00")) p = p.slice(2);
	if (p.startsWith("967")) p = p.slice(3);
	while (p.startsWith("0")) p = p.slice(1);
	if (p.length === 9 && p.startsWith("7")) return `967${p}`;
	if (p.length >= 11 && (p.startsWith("966") || p.startsWith("971") || p.startsWith("20") || p.startsWith("967"))) return p;
	if (p.length === 9) return `967${p}`;
	if (p.length > 0 && p.length <= 9) return `967${p}`;
	return p;
}
/**
* إنشاء الرابط المباشر الصحيح للمحادثة في تطبيق واتساب
* نستخدم https://api.whatsapp.com/send مباشرة لأنه مدعوم عالمياً من أنظمة أندرويد
* ويفتح تطبيق واتساب فوراً دون الحاجة لصفحات إعادة توجيه وسيطة قد تفشل أو تعلق
*/
function getWhatsAppUrl(phone, message) {
	const cleanPhone = formatWhatsAppNumber(phone);
	if (!cleanPhone) return "#";
	const encodedText = message ? encodeURIComponent(message.trim()) : "";
	return `https://api.whatsapp.com/send${encodedText ? `?phone=${cleanPhone}&text=${encodedText}` : `?phone=${cleanPhone}`}`;
}
/**
* فتح محادثة الواتساب بطريقة موثوقة في بيئة الويب وتطبيق Android Capacitor
*/
function openWhatsAppChat(phone, message) {
	const url = getWhatsAppUrl(phone, message);
	if (url === "#") {
		alert("رقم الهاتف غير متوفر أو غير صالح للواتساب");
		return;
	}
	try {
		const win = window.open(url, "_blank");
		if (!win || win.closed || typeof win.closed === "undefined") window.location.href = url;
	} catch {
		window.location.href = url;
	}
}
// src/components/PrivacyPolicyModal.tsx
var PrivacyPolicyModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-['Cairo',sans-serif] animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-right",
			dir: "rtl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-5 bg-linear-to-r from-red-600 to-rose-700 text-white flex items-center justify-between shrink-0 shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm sm:text-base font-black",
							children: "سياسة الخصوصية وأمان البيانات"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-red-100 font-bold",
							children: "متوافق مع سياسات متجر Google Play"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-1.5 hover:bg-white/20 rounded-xl transition-colors text-white cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-red-50 p-3.5 rounded-2xl border border-red-100 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black inline-block mb-1",
								children: "التزام الخصوصية الإنسانية"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-slate-800 text-xs sm:text-sm",
								children: "تطبيق «بنك الدم - قعطبة» مبادرة خيرية وإنسانية تطوعية بالكامل، تهدف لإنقاذ حياة المرضى وربط المحتاجين بالمتبرعين في مديرية قعطبة ومحافظة الضالع."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-black text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-red-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "١. البيانات التي يجمعها التطبيق" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-600 text-[11px] sm:text-xs",
								children: "يجمع التطبيق البيانات التي يدخلها المتبرع برغبته واختياره: الاسم، فصيلة الدم، رقم الهاتف، والمنطقة السكنية (قعطبة، مريس، الفاخر، إلخ) فقط لغرض التنسيق للتبرع بالدم عند الحاجة."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200/80 space-y-1 text-emerald-950",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 font-black text-xs sm:text-sm text-emerald-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "٢. عدم بيع أو مشاركة البيانات" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] sm:text-xs text-emerald-900 leading-normal",
								children: "نضمن عدم بيع أو تأجير أو مشاركة أرقام الهواتف أو بيانات المتبرعين مع أي جهات خارجية أو شركات إعلانية، والتطبيق خالٍ تماماً من الإعلانات التجارية."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-black text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 text-red-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "٣. حق تعديل وحذف البيانات (Data Deletion)" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-slate-600 text-[11px] sm:text-xs leading-normal",
								children: [
									"يحق لكل متبرع في أي وقت:",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"• تغيير حالته إلى (غير متاح للتبرع حالياً).",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"• حذف اسمه ورقم هاتفه نهائياً من السجل مباشرة عبر زر الحذف في الملف الشخصي.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"• طلب حذف بياناته عبر مراسلة الإدارة على البريد: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "ziadalsyyadi@gmail.com" }),
									" أو عبر واتساب."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-black text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-red-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "٤. أمان وتشفير النقل والتخزين المحلي" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-600 text-[11px] sm:text-xs",
								children: "يتم نقل البيانات عبر اتصالات مشفرة بالكامل (HTTPS / SSL)، وتُحفظ البيانات محلياً على جهاز المستخدم لدعم العمل في وضع عدم الاتصال (Offline) بأمان تام."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-black text-slate-800 block",
								children: "للتواصل مع المسؤولين وإدارة الخصوصية:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-600 font-bold",
									children: "البريد: ziadalsyyadi@gmail.com"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openWhatsAppChat("773633918", "السلام عليكم، استفسار بخصوص سياسة الخصوصية وأمان البيانات"),
									className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "واتساب الإدارة" })]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/privacy.html",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-[11px] text-red-600 hover:underline font-bold",
						children: "فتح صفحة الويب الكاملة للسياسة ↗"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "py-2 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer",
						children: "إغلاق"
					})]
				})
			]
		})
	});
};
// src/version.ts
var APP_VERSION = ("1.2.0".trim(), "1.2.0".trim());
// node_modules/@capacitor/share/dist/esm/index.js
var Share = registerPlugin("Share", { web: () => __vitePreload(() => import("./web-DhI0AxaA.js").then((m) => new m.ShareWeb()), []) });
// src/utils/shareUtils.ts
/**
* The permanent official distribution link for Bank AlDam Qataba.
* This is used as the primary link for sharing.
*/
var PERMANENT_APP_LINK = "https://play.google.com/store/apps/details?id=com.qatrahayat.app";
/**
* Gets the official distribution link for the app.
*/
var getAppLink = () => {
	return PERMANENT_APP_LINK;
};
/**
* Unified sharing function that uses Capacitor native share if available,
* otherwise falls back to Web Share API or Clipboard.
*/
var shareData = async (options) => {
	const shareUrl = options.url || getAppLink();
	const cleanText = options.text.replace(/http:\/\/localhost:\d+/g, shareUrl);
	try {
		if (Capacitor.isNativePlatform()) await Share.share({
			title: options.title,
			text: cleanText,
			url: shareUrl,
			dialogTitle: "مشاركة عبر..."
		});
		else if (navigator.share) await navigator.share({
			title: options.title,
			text: cleanText,
			url: shareUrl
		});
		else {
			const fullContent = `${options.title}\n\n${cleanText}\n\n${shareUrl}`;
			await navigator.clipboard.writeText(fullContent);
			alert("تم نسخ تفاصيل المشاركة مع رابط التطبيق بنجاح!");
		}
	} catch (error) {
		console.error("Sharing failed:", error);
	}
};
// src/components/Sidebar.tsx
var Sidebar = ({ isOpen, onClose, donors, onOpenExitConfirm, onOpenChat }) => {
	const { currentUser, userProfile, logout, deleteAccount } = useAuth();
	const [isEditing, setIsSidebarEditing] = (0, import_react.useState)(false);
	const [editName, setEditName] = (0, import_react.useState)(userProfile?.displayName || "");
	const [editPhone, setEditPhone] = (0, import_react.useState)(userProfile?.phone || "");
	const [saveLoading, setSaveLoading] = (0, import_react.useState)(false);
	const [newDonationDate, setNewDonationDate] = (0, import_react.useState)("");
	const [showAddDonation, setShowAddDonation] = (0, import_react.useState)(false);
	const [conversation, setConversation] = (0, import_react.useState)(null);
	const [showAboutModal, setShowAboutModal] = (0, import_react.useState)(false);
	const [showPrivacyModal, setShowPrivacyModal] = (0, import_react.useState)(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = (0, import_react.useState)(false);
	const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = (0, import_react.useState)(false);
	const [deletePassword, setDeletePassword] = (0, import_react.useState)("");
	const [deleteError, setDeleteError] = (0, import_react.useState)(null);
	const [needsPassword, setNeedsPassword] = (0, import_react.useState)(false);
	const [isDeletingAccount, setIsDeletingAccount] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!currentUser || userProfile?.role === "admin") return;
		const unsubscribe = subscribeToConversation(currentUser.uid, setConversation);
		return () => unsubscribe();
	}, [currentUser, userProfile?.role]);
	const myDonorProfile = donors.find((d) => d.userId === currentUser?.uid);
	const handleSaveSettings = async () => {
		if (!currentUser) return;
		setSaveLoading(true);
		try {
			if (myDonorProfile) await updateDonorProfile(myDonorProfile.id, {
				fullName: editName,
				phone: editPhone
			});
			setIsSidebarEditing(false);
		} catch (err) {
			console.error("Failed to save settings:", err);
		} finally {
			setSaveLoading(false);
		}
	};
	const handleAddDonation = async () => {
		if (!myDonorProfile || !newDonationDate) return;
		setSaveLoading(true);
		try {
			const history = myDonorProfile.donationHistory || [];
			const newRecord = {
				id: crypto.randomUUID(),
				date: newDonationDate
			};
			await updateDonorProfile(myDonorProfile.id, {
				donationHistory: [...history, newRecord],
				lastDonationDate: newDonationDate
			});
			setNewDonationDate("");
			setShowAddDonation(false);
		} catch (err) {
			console.error("Failed to add donation:", err);
		} finally {
			setSaveLoading(false);
		}
	};
	const handleDeleteDonation = async (recordId) => {
		if (!myDonorProfile) return;
		setSaveLoading(true);
		try {
			const history = (myDonorProfile.donationHistory || []).filter((r) => r.id !== recordId);
			await updateDonorProfile(myDonorProfile.id, { donationHistory: history });
		} catch (err) {
			console.error("Failed to delete donation:", err);
		} finally {
			setSaveLoading(false);
		}
	};
	const handleShareApp = () => {
		shareData({
			title: "Bank AlDam Qataba | تطبيق بنك الدم - قعطبة",
			text: "تطبيق Bank AlDam Qataba: مبادرة خيرية لربط المتبرعين بالمحتاجين في مديرية قعطبة. حمله الآن وساهم في إنقاذ الأرواح."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in",
			onClick: onClose
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `fixed inset-y-0 right-0 z-50 w-full max-w-[280px] sm:max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col font-['Cairo',sans-serif] text-right`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 bg-linear-to-br from-red-600 to-rose-700 text-white shrink-0 relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex items-start justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-12 h-12 rounded-2xl bg-white p-1 shadow-inner overflow-hidden border border-white/20 flex items-center justify-center relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "absolute w-6 h-6 text-red-600 fill-red-600 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/assets/images/app_logo_icon.jpg",
										alt: "Logo",
										className: "relative z-10 w-full h-full object-cover rounded-xl",
										onError: (e) => {
											e.target.style.display = "none";
										}
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-black leading-tight",
									children: "قطرة دم تنقذ حياة إنسان"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-red-100",
									children: "مديرية قعطبه - محافظة الضالع"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "p-1.5 hover:bg-white/20 rounded-xl transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-black truncate",
								children: userProfile?.displayName || "ضيف"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-red-100 text-xs font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									dir: "ltr",
									children: userProfile?.phone || "بدون رقم هاتف"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4.5 h-4.5 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-black text-slate-900",
											children: "سجل التبرع بالدم"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setShowAddDonation(!showAddDonation),
										className: "p-1 hover:bg-red-50 rounded-lg text-red-600 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
									})]
								}),
								showAddDonation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-red-50 rounded-2xl border border-red-100 animate-in slide-in-from-top-2 duration-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] font-bold text-red-700 mb-1",
										children: "تاريخ التبرع الجديد:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: newDonationDate,
											onChange: (e) => setNewDonationDate(e.target.value),
											className: "flex-1 p-2 rounded-xl bg-white border border-red-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-red-500"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: handleAddDonation,
											disabled: !newDonationDate || saveLoading,
											className: "px-3 bg-red-600 text-white rounded-xl text-xs font-bold disabled:opacity-50",
											children: "إضافة"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: myDonorProfile?.donationHistory?.length ? myDonorProfile.donationHistory.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-3 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:border-red-100 transition-colors group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-black",
												children: index + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-slate-700",
												children: record.date
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleDeleteDonation(record.id),
											className: "p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})]
									}, record.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold text-slate-400",
											children: "لا يوجد سجل تبرع حالياً"
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4.5 h-4.5 text-slate-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-black text-slate-900",
									children: "الإعدادات"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4",
								children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] font-bold text-slate-500 mr-1",
											children: "الاسم الكامل:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: editName,
											onChange: (e) => setEditName(e.target.value),
											className: "w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-red-500"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] font-bold text-slate-500 mr-1",
											children: "رقم الهاتف:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: editPhone,
											onChange: (e) => setEditPhone(e.target.value),
											className: "w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-red-500",
											dir: "ltr"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleSaveSettings,
										disabled: saveLoading,
										className: "flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-sm",
										children: saveLoading ? "جارٍ الحفظ..." : "حفظ التغييرات"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsSidebarEditing(false),
										className: "px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold",
										children: "إلغاء"
									})]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsSidebarEditing(true),
									className: "w-full flex items-center justify-between p-1 group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-700 group-hover:text-red-600 transition-colors",
										children: "تعديل الملف الشخصي"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-slate-300 group-hover:text-red-500 transition-all rotate-180" })]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowAboutModal(true),
									className: "w-full flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-2xl shadow-2xs hover:bg-red-100/80 transition-colors text-right cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-red-950 block",
										children: "من نحن (عن المبادرة)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-red-700 font-bold block",
										children: "مبادرة قعطبة الإنسانية"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowPrivacyModal(true),
									className: "w-full flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:bg-slate-50 transition-colors text-right cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-slate-800 block",
										children: "سياسة الخصوصية وأمان البيانات"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-emerald-700 font-bold block",
										children: "حماية بيانات المتبرعين وحذف الحساب"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleShareApp,
									className: "w-full flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:bg-slate-50 transition-colors text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-700",
										children: "مشاركة التطبيق مع الأصدقاء"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 pb-2 border-b border-slate-200/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-black text-slate-900",
												children: "التواصل مع الإدارة"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												onOpenChat();
												onClose();
											},
											className: "w-full flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-colors text-right relative group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3.5 h-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-slate-800 block",
													children: "إرسال رسالة عبر التطبيق"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-400",
													children: "محادثة خاصة ومباشرة"
												})] })]
											}), conversation && conversation.unreadCountByUser > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs",
												children: conversation.unreadCountByUser
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: getWhatsAppUrl("773633918", "السلام عليكم، تواصل بخصوص تطبيق بنك الدم قعطبة"),
											onClick: (e) => {
												e.preventDefault();
												openWhatsAppChat("773633918", "السلام عليكم، تواصل بخصوص تطبيق بنك الدم قعطبة");
											},
											target: "_blank",
											rel: "noopener noreferrer",
											className: "w-full flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100/80 transition-colors text-right cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-emerald-950 block",
													children: "مراسلة عبر واتساب"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono font-bold text-emerald-800",
													dir: "ltr",
													children: "773633918"
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-black text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200 shadow-2xs",
												children: "مراسلة"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "mailto:ziadalsyyadi@gmail.com",
											className: "w-full flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3.5 h-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-slate-800 block",
													children: "البريد الإلكتروني"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-slate-500",
													dir: "ltr",
													children: "ziadalsyyadi@gmail.com"
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-black text-slate-700 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200",
												children: "إيميل"
											})]
										})
									]
								}),
								currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-2 border-t border-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 px-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4.5 h-4.5 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-black text-slate-900",
											children: "حسابي"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setShowLogoutConfirm(true),
											className: "w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors text-right cursor-pointer shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4 rotate-180" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-black",
												children: "تسجيل الخروج"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setShowDeleteAccountConfirm(true),
											className: "w-full flex items-center gap-3 p-3 bg-rose-50/80 border border-rose-200 rounded-2xl text-rose-700 hover:bg-rose-100 transition-colors text-right cursor-pointer shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-black",
												children: "حذف الحساب"
											})]
										})]
									})]
								})
							]
						})
					]
				}),
				showLogoutConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-7 h-7 rotate-180" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-slate-900",
									children: "تأكيد تسجيل الخروج"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100",
									children: "«هل أنت متأكد أنك تريد تسجيل الخروج؟»"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: async () => {
										try {
											await logout();
											setShowLogoutConfirm(false);
											onClose();
										} catch (e) {
											console.error("Logout error:", e);
										}
									},
									className: "py-3 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تأكيد" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowLogoutConfirm(false),
									className: "py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إلغاء" })
								})]
							})
						]
					})
				}),
				showDeleteAccountConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-7 h-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-slate-900",
									children: "تحذير حذف الحساب"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed bg-rose-50/80 p-3.5 rounded-2xl border border-rose-100",
									children: "«هل أنت متأكد أنك تريد حذف حسابك؟ ستفقد بيانات حسابك نهائياً»"
								})]
							}),
							needsPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "كلمة المرور الحالية للتأكيد:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: deletePassword,
									onChange: (e) => setDeletePassword(e.target.value),
									placeholder: "أدخل كلمة المرور...",
									className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-rose-500",
									dir: "ltr"
								})]
							}),
							deleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold text-center border border-rose-200",
								children: deleteError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: async () => {
										setIsDeletingAccount(true);
										setDeleteError(null);
										try {
											await deleteAccount(deletePassword || void 0);
											setShowDeleteAccountConfirm(false);
											onClose();
										} catch (err) {
											if (err.message === "requires-recent-login" || err.code === "auth/requires-recent-login") {
												setNeedsPassword(true);
												setDeleteError("يرجى إدخال كلمة المرور لتأكيد الحذف الأمني للحساب");
											} else setDeleteError(err.message || "فشل حذف الحساب. يرجى إعادة تسجيل الدخول ثم المحاولة.");
										} finally {
											setIsDeletingAccount(false);
										}
									},
									disabled: isDeletingAccount,
									className: "py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer",
									children: isDeletingAccount ? "جارٍ الحذف..." : "تأكيد الحذف"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setShowDeleteAccountConfirm(false);
										setNeedsPassword(false);
										setDeletePassword("");
										setDeleteError(null);
									},
									disabled: isDeletingAccount,
									className: "py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer",
									children: "إلغاء"
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 bg-slate-50 border-t border-slate-100 text-center space-y-1 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-1.5 text-[11px] font-black text-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3 h-3 text-red-500 fill-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "قطرة دم تنقذ حياة إنسان" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-slate-400 font-bold",
						children: ["مديرية قعطبة • الإصدار ", APP_VERSION]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutUsModal, {
			isOpen: showAboutModal,
			onClose: () => setShowAboutModal(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyPolicyModal, {
			isOpen: showPrivacyModal,
			onClose: () => setShowPrivacyModal(false)
		})
	] });
};
// src/components/BottomNav.tsx
var BottomNav = ({ activeTab, onTabChange, urgentCount }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-slate-200/80 shadow-lg pb-safe",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-md mx-auto grid grid-cols-5 h-16",
			children: [
				{
					id: "home",
					label: "الرئيسية",
					icon: House
				},
				{
					id: "search",
					label: "المتبرعون",
					icon: Users
				},
				{
					id: "urgent",
					label: "طلبات الدم",
					icon: Droplet,
					badge: urgentCount > 0 ? urgentCount : void 0
				},
				{
					id: "hospitals",
					label: "المستشفيات",
					icon: Hospital
				},
				{
					id: "info",
					label: "فوائد التبرع",
					icon: Heart
				}
			].map((item) => {
				const Icon = item.icon;
				const isActive = activeTab === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onTabChange(item.id),
					className: `relative flex flex-col items-center justify-center gap-1 transition-all select-none active:scale-95 ${isActive ? "text-red-600 font-extrabold" : "text-slate-500 hover:text-slate-800 font-medium"}`,
					children: [
						isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 w-8 h-1 bg-red-600 rounded-b-full shadow-xs shadow-red-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-5 h-5 transition-transform ${isActive ? "scale-110 stroke-[2.5] text-red-600" : "stroke-[1.8]"}` }), item.badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-xs",
								children: item.badge
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] leading-none tracking-tight",
							children: item.label
						})
					]
				}, item.id);
			})
		})
	});
};
// src/assets/images/regenerated_image_1793757211567.jpg
var regenerated_image_1793757211567_default = "/assets/regenerated_image_1793757211567-CPhLLiej.jpg";
// src/components/HeroBanner.tsx
var BloodDropBadge = ({ type, className = "w-11 h-13" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: `relative flex items-center justify-center shrink-0 ${className} drop-shadow-sm`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 58",
		className: "w-full h-full",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `dropGrad-${type}`,
				cx: "35%",
				cy: "30%",
				r: "70%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#ff416c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "45%",
						stopColor: "#e50914"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "85%",
						stopColor: "#a30813"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#750009"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `highlight-${type}`,
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "100%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "60%",
					stopColor: "#ffffff",
					stopOpacity: "0"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 2 C24 2 6 22 6 36 C6 46 14.05 54 24 54 C33.95 54 42 46 42 36 C42 22 24 2 24 2 Z",
				fill: `url(#dropGrad-${type})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 8 C20 12 12 25 12 35 C12 38 13 41 15 43 C13.5 40 14 34 16 28 C18 22 23 13 22 8 Z",
				fill: `url(#highlight-${type})`,
				opacity: "0.6"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute inset-0 flex items-center justify-center pt-2 text-white font-black text-xs sm:text-sm tracking-wider drop-shadow-md select-none",
		children: type
	})]
});
var HeroBanner = ({ onNavigate, donors, urgentRequests, onOpenCompatibility }) => {
	const heroImagePath = regenerated_image_1793757211567_default;
	const activeUrgentCount = urgentRequests.filter((r) => r.status === "open").length;
	urgentRequests.filter((r) => r.status === "fulfilled").length;
	const rawTotalDonors = donors.length;
	const totalDonors = rawTotalDonors > 0 ? rawTotalDonors : 1250;
	const rawAvailable = donors.filter((d) => d.isAvailable).length;
	const availableDonorsCount = rawTotalDonors > 0 ? rawAvailable : 978;
	const unavailableDonorsCount = totalDonors - availableDonorsCount;
	const availablePercentage = Math.round(availableDonorsCount / totalDonors * 100) || 78;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-4xl mx-auto space-y-4 font-['Cairo',sans-serif] text-right",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 border border-slate-200 shadow-md relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: heroImagePath,
						alt: "بنك الدم في مديرية قعطبة - قطرة دم تنقذ حياة",
						className: "w-full h-auto object-cover sm:object-contain rounded-xl sm:rounded-2xl shadow-xs pointer-events-none select-none max-h-[260px] sm:max-h-[360px]",
						loading: "eager",
						draggable: false,
						onError: (e) => {
							e.target.style.display = "none";
						}
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full bg-linear-to-r from-red-700 via-rose-700 to-red-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg border border-red-500/30 text-center space-y-3 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base sm:text-xl font-extrabold text-amber-200 tracking-wide font-serif leading-relaxed",
							children: "﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ﴾"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] sm:text-xs font-bold text-red-100",
							children: "سورة المائدة – الآية 32"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2 bg-white/15 backdrop-blur-md rounded-full text-xs sm:text-base font-black text-white border border-white/20 shadow-inner relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❤️" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "قَطْرَةُ دَمٍ تُنْقِذُ حَيَاةَ إِنْسَان" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "❤️" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-xs sm:text-sm font-bold text-red-50 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-snug",
							children: "معاً لإنقاذ الأرواح في مديرية قعطبة."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-amber-200 font-extrabold",
							children: "تبرعك حياة، وعطاؤك أمل، وتعاوننا إنقاذ."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2.5 sm:gap-4 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-linear-to-br from-[#effbf4] via-[#e4f7ec] to-[#d8f3e2] border border-emerald-200 shadow-xs flex items-center justify-between text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-2xl sm:text-4xl font-black text-emerald-900 tracking-tight leading-none",
							dir: "ltr",
							children: [availablePercentage, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] sm:text-xs font-black text-emerald-800 mt-1 leading-tight text-left",
							children: "نسبة المتبرعين المتاحين"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-linear-to-br from-[#fff1f3] via-[#ffe7eb] to-[#ffdce2] border border-rose-200 shadow-xs flex items-center justify-between text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-sm shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl sm:text-4xl font-black text-red-900 tracking-tight leading-none",
							dir: "ltr",
							children: totalDonors.toLocaleString()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] sm:text-xs font-black text-red-800 mt-1 leading-tight text-left",
							children: "إجمالي المتبرعين"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center my-3 sm:my-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t-2 border-red-200" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-red-700 hidden sm:inline-block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-6 sm:px-10 py-2 sm:py-2.5 rounded-full bg-linear-to-r from-red-700 via-rose-700 to-red-800 text-white font-black text-xs sm:text-base shadow-md shadow-red-200 flex items-center gap-2 select-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "توزيع فصائل الدم" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-red-700 hidden sm:inline-block" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2 sm:gap-3.5 w-full",
				children: [
					{
						type: "O+",
						defaultCount: 400,
						defaultPct: 32
					},
					{
						type: "A+",
						defaultCount: 300,
						defaultPct: 24
					},
					{
						type: "B+",
						defaultCount: 200,
						defaultPct: 16
					},
					{
						type: "AB+",
						defaultCount: 100,
						defaultPct: 8
					},
					{
						type: "O-",
						defaultCount: 90,
						defaultPct: 7.2
					},
					{
						type: "A-",
						defaultCount: 70,
						defaultPct: 5.6
					},
					{
						type: "B-",
						defaultCount: 60,
						defaultPct: 4.8
					},
					{
						type: "AB-",
						defaultCount: 30,
						defaultPct: 2.4
					}
				].map((item) => {
					const actualCount = donors.filter((d) => d.bloodType === item.type).length;
					const displayCount = rawTotalDonors > 0 ? actualCount : item.defaultCount;
					const displayPct = rawTotalDonors > 0 ? Number((displayCount / totalDonors * 100).toFixed(1)) : item.defaultPct;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onNavigate(item.type),
						title: `عرض المتبرعين بفصيلة ${item.type}`,
						className: "group bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-slate-200 hover:border-red-500 shadow-2xs hover:shadow-lg transition-all text-center flex flex-col items-center justify-between min-h-[135px] sm:min-h-[155px] cursor-pointer active:scale-95 relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodDropBadge, {
								type: item.type,
								className: "w-10 h-12 sm:w-13 sm:h-15 group-hover:scale-110 transition-transform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 leading-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] sm:text-xs font-black text-slate-900 block",
									children: [displayCount, " متبرع"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] sm:text-[11px] font-bold text-slate-500 block mt-0.5",
									dir: "ltr",
									children: [displayPct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-rose-100 rounded-full h-1.5 sm:h-2 mt-1.5 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-linear-to-r from-red-600 to-rose-700 h-full rounded-full transition-all duration-500",
									style: { width: `${Math.max(displayPct, 8)}%` }
								})
							})
						]
					}, item.type);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-linear-to-r from-[#effbf4] via-[#fff5f6] to-[#ffeef1] border border-slate-200 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 divide-x divide-x-reverse divide-slate-200/80 text-center items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 sm:gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] sm:text-xs font-black text-emerald-800",
									children: "متاح للتبرع الآن"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3 stroke-[2.5]" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base sm:text-xl font-black text-emerald-900 leading-none",
								children: [availableDonorsCount, " متبرع"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 sm:gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] sm:text-xs font-black text-slate-700",
									children: "إجمالي المتبرعين"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5 text-red-600" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl sm:text-2xl font-black text-red-700 leading-none tracking-tight",
								children: totalDonors.toLocaleString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 sm:gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] sm:text-xs font-black text-rose-700",
									children: "غير متاح حالياً"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-3.5 h-3.5 text-rose-600 fill-rose-600" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base sm:text-xl font-black text-rose-800 leading-none",
								children: [unavailableDonorsCount, " متبرع"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onNavigate("urgent"),
					className: "group relative overflow-hidden py-3.5 sm:py-4 px-4 rounded-full bg-linear-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm sm:text-base shadow-lg shadow-red-200/80 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-500/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "طلب دم عاجل" }),
						activeUrgentCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-white text-red-700 text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse",
							children: activeUrgentCount
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onNavigate("register"),
					className: "group relative overflow-hidden py-3.5 sm:py-4 px-4 rounded-full bg-linear-to-r from-red-700 via-rose-800 to-red-900 hover:from-red-800 hover:to-rose-900 text-white font-black text-sm sm:text-base shadow-lg shadow-red-300/80 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-600/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4 sm:w-4.5 sm:h-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة متبرع" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: onOpenCompatibility,
				className: "flex items-center justify-between p-3.5 rounded-2xl bg-linear-to-r from-red-50 to-rose-50 border border-red-200 cursor-pointer hover:bg-red-100/60 transition-colors shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-2xs",
						children: "ABO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs sm:text-sm font-bold text-slate-900",
						children: "دليل توافق فصائل الدم التفاعلي"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] sm:text-[11px] text-slate-500",
						children: "تعرّف على الفصيلة التي يمكنها التبرع لك ولمن تستطيع التبرع في قعطبة"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4 text-slate-400" })]
			})
		]
	});
};
// src/types.ts
var BLOOD_TYPES = [
	"O+",
	"A+",
	"B+",
	"AB+",
	"O-",
	"A-",
	"B-",
	"AB-"
];
// src/components/VisitorRestrictionModal.tsx
var VisitorRestrictionModal = ({ isOpen, onClose, onOpenRegister, onOpenLogin }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner border border-red-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-7 h-7" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-black text-slate-900",
						children: "تنبيه الصلاحيات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed bg-red-50/80 p-3.5 rounded-2xl border border-red-100",
						children: "«هذه الخدمة تتطلب إنشاء حساب أو تسجيل الدخول»"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							onClose();
							onOpenRegister();
						},
						className: "py-3 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنشاء حساب" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							onClose();
							onOpenLogin();
						},
						className: "py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center pt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "text-[11px] text-slate-400 hover:text-slate-600 font-bold",
						children: "إلغاء"
					})
				})
			]
		})
	});
};
// src/components/DonorSearch.tsx
var DonorSearch = ({ donors, onNavigateToRegister, initialBloodType = "ALL", onEditDonor, onDeleteDonor, syncStats, isOffline = false, onOpenAuth }) => {
	const { userProfile, currentUser, activeRole } = useAuth();
	const isAdmin = activeRole === "admin";
	const [showVisitorRestriction, setShowVisitorRestriction] = (0, import_react.useState)(false);
	const [selectedBloodType, setSelectedBloodType] = (0, import_react.useState)(initialBloodType);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [onlyAvailable, setOnlyAvailable] = (0, import_react.useState)(false);
	const [copiedPhone, setCopiedPhone] = (0, import_react.useState)(null);
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const [importText, setImportText] = (0, import_react.useState)("");
	const [importLoading, setImportLoading] = (0, import_react.useState)(false);
	const [importResult, setImportResult] = (0, import_react.useState)(null);
	const [isSyncingSheets, setIsSyncingSheets] = (0, import_react.useState)(false);
	const [sheetsSyncFeedback, setSheetsSyncFeedback] = (0, import_react.useState)(null);
	const [donorToDelete, setDonorToDelete] = (0, import_react.useState)(null);
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const [deleteError, setDeleteError] = (0, import_react.useState)(null);
	const [deleteSuccess, setDeleteSuccess] = (0, import_react.useState)(null);
	import_react.useEffect(() => {
		setSelectedBloodType(initialBloodType);
	}, [initialBloodType]);
	const [sheetsDonors, setSheetsDonors] = (0, import_react.useState)([]);
	const [isSearchingSheets, setIsSearchingSheets] = (0, import_react.useState)(false);
	const [sheetsError, setSheetsError] = (0, import_react.useState)(null);
	const handleSearchSheets = async () => {
		if (selectedBloodType === "ALL") {
			setSheetsError("يرجى اختيار فصيلة دم محددة للبحث في الأرشيف");
			return;
		}
		setIsSearchingSheets(true);
		setSheetsError(null);
		try {
			const result = await searchDonorsFromSheets(selectedBloodType);
			if (result.success && Array.isArray(result.data)) {
				const mapped = result.data.map((d, idx) => ({
					id: String(d.donorId || d.id || `sheet_${idx}_${Date.now()}`),
					userId: "",
					fullName: String(d.fullName || d.name || "غير معروف").trim(),
					bloodType: d.bloodType || selectedBloodType,
					phone: d.phone !== void 0 && d.phone !== null ? String(d.phone).trim() : "",
					phoneVerified: false,
					residence: String(d.residence || d.address || "قعطبة").trim(),
					notes: d.notes || "من سجل Google Sheets",
					isAvailable: true,
					allowContact: true
				}));
				setSheetsDonors(mapped);
				if (mapped.length === 0) setSheetsError("لا يوجد متبرعون بهذه الفصيلة في أرشيف Google Sheets حالياً");
			} else setSheetsError(result.error || "تعذر جلب البيانات من Google Sheets");
		} catch (err) {
			setSheetsError(`خطأ: ${err.message}`);
		} finally {
			setIsSearchingSheets(false);
		}
	};
	const combinedDonors = (0, import_react.useMemo)(() => {
		return donors.filter((donor) => {
			if (selectedBloodType !== "ALL" && donor.bloodType !== selectedBloodType) return false;
			if (onlyAvailable && !donor.isAvailable) return false;
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				return donor.fullName.toLowerCase().includes(q) || donor.residence.toLowerCase().includes(q) || donor.phone.includes(q);
			}
			return true;
		});
	}, [
		donors,
		selectedBloodType,
		onlyAvailable,
		searchQuery
	]);
	const handleCopyPhone = (phone) => {
		navigator.clipboard.writeText(phone);
		setCopiedPhone(phone);
		setTimeout(() => {
			setCopiedPhone(null);
		}, 2e3);
	};
	const [whatsAppTargetDonor, setWhatsAppTargetDonor] = (0, import_react.useState)(null);
	const confirmWhatsAppNavigation = (donor) => {
		const message = `السلام عليكم أخي ${donor.fullName} الكريم،\nحصلت على رقمك من تطبيق (قطرة دم تنقذ حياة - سجل المتبرعين بقعطبة).\nلدينا حالة بحاجة ماسة لفصيلة الدم (${donor.bloodType})، هل أنت متاح للتبرع وجزاك الله خيراً؟`;
		openWhatsAppChat(donor.phone, message);
	};
	const handleShare = async (donor) => {
		const appUrl = getAppLink();
		const text = `🩸 بطاقة متبرع بالدم - Bank AlDam Qataba 🩸\n👤 الاسم: ${donor.fullName}\n🩸 فصيلة الدم: ${donor.bloodType}\n📍 السكن: ${donor.residence || "مديرية قعطبة"}\n📞 رقم الهاتف: ${donor.phone}\n\n📱 رابط تطبيق Bank AlDam Qataba - قعطبة:\n${appUrl}`;
		await shareData({
			title: `بطاقة متبرع (Bank AlDam Qataba): ${donor.fullName}`,
			text,
			url: appUrl
		});
	};
	const handleImportSubmit = async () => {
		if (!importText.trim()) return;
		setImportLoading(true);
		setImportResult(null);
		try {
			const res = await importRawDonors(importText);
			if (res.success) {
				setImportResult({
					success: true,
					message: `تم استيراد ${res.count} متبرعاً بنجاح إلى قاعدة البيانات!`
				});
				setImportText("");
			} else setImportResult({
				success: false,
				message: res.error || "فشل الاستيراد"
			});
		} catch (err) {
			setImportResult({
				success: false,
				message: err.message || "خطأ أثناء الاستيراد"
			});
		} finally {
			setImportLoading(false);
		}
	};
	const handleSyncAllToSheets = async () => {
		setIsSyncingSheets(true);
		setSheetsSyncFeedback(null);
		try {
			const res = await pushAllDonorsToSheets(donors);
			if (res.success) setSheetsSyncFeedback(`تمت مزامنة ${res.count} متبرعاً مع جدول Google Sheets بنجاح!`);
			else setSheetsSyncFeedback(res.error || "فشلت المزامنة مع Google Sheets");
		} catch (err) {
			setSheetsSyncFeedback(`خطأ: ${err.message}`);
		} finally {
			setIsSyncingSheets(false);
			setTimeout(() => setSheetsSyncFeedback(null), 5e3);
		}
	};
	const countsPerType = (0, import_react.useMemo)(() => {
		const map = { ALL: donors.length };
		BLOOD_TYPES.forEach((bt) => {
			map[bt] = donors.filter((d) => d.bloodType === bt).length;
		});
		return map;
	}, [donors]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			deleteSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-emerald-200 animate-in fade-in slide-in-from-top-2 duration-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deleteSuccess })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setDeleteSuccess(null),
					className: "text-white/80 hover:text-white text-xs px-2 py-0.5",
					children: "إغلاق"
				})]
			}),
			activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-linear-to-r from-amber-600 via-amber-600 to-rose-700 text-white rounded-2xl p-4 shadow-md space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-amber-200 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-black",
							children: "أدوات إدارة المتبرعين (وضع المسؤول)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-amber-100",
							children: "إضافة أو استيراد أو تصدير وتعديل سجل المتبرعين مباشرة"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onNavigateToRegister,
								className: "px-3 py-1.5 rounded-xl bg-white text-amber-900 hover:bg-amber-50 text-xs font-black flex items-center gap-1 shadow-xs transition-colors active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة متبرع" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setIsImportModalOpen(true),
								className: "px-3 py-1.5 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1 border border-amber-500/40 transition-colors active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "استيراد دفعة" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleSyncAllToSheets,
								disabled: isSyncingSheets,
								className: "px-3 py-1.5 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1 border border-amber-500/40 transition-colors active:scale-95 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isSyncingSheets ? "جارٍ المزامنة..." : "تصدير للشيت" })]
							})
						]
					})]
				}), sheetsSyncFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs bg-amber-950/70 p-2.5 rounded-xl text-amber-100 border border-amber-500/40",
					children: sheetsSyncFeedback
				})]
			}),
			isImportModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-extrabold text-slate-900",
									children: "استيراد متبرعين دفعة واحدة"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setIsImportModalOpen(false);
									setImportResult(null);
								},
								className: "p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 leading-relaxed",
							children: "الصق هنا أسطر المتبرعين من جدول Excel أو CSV أو رسالة نصية. يتعرف النظام تلقائياً على الاسم ورقم الهاتف وفصيلة الدم والمنطقة."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: importText,
							onChange: (e) => setImportText(e.target.value),
							placeholder: "مثال:\nمحمد صالح, O+, 773123456, قعطبة\nعلي أحمد, A+, 771987654, مريس",
							rows: 6,
							className: "w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 outline-hidden focus:ring-2 focus:ring-amber-500"
						}),
						importResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `p-3 rounded-xl text-xs font-bold ${importResult.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`,
							children: importResult.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleImportSubmit,
								disabled: importLoading || !importText.trim(),
								className: "flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50",
								children: [importLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بدء الاستيراد" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsImportModalOpen(false);
									setImportResult(null);
								},
								className: "py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors",
								children: "إغلاق"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base sm:text-lg font-extrabold text-slate-900 tracking-tight",
							children: "البحث عن متبرعي الدم"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500",
							children: "اختر فصيلة الدم المطلوبة أو ابحث بالاسم أو السكن في قعطبة"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs bg-red-50 text-red-700 font-bold px-2.5 py-1 rounded-full border border-red-200",
								children: [combinedDonors.length, " متبرع"]
							}), sheetsDonors.length > 0 && activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded-sm",
								children: "يتضمن بيانات الأرشيف"
							})]
						})]
					}),
					syncStats && (syncStats.firestoreCount > 0 || syncStats.sheetsCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-3.5 h-3.5 text-red-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"المصادر المتصلة: فايربيس (",
								syncStats.firestoreCount,
								") + الشيت (",
								syncStats.sheetsCount,
								")"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200",
								children: [
									"الإجمالي المتاح: ",
									donors.length,
									" متبرع"
								]
							}), syncStats.duplicateCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-400",
								children: [
									"(معالجة ",
									syncStats.duplicateCount,
									" مكرر)"
								]
							})]
						})]
					}),
					isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-amber-50 border border-amber-200 rounded-2xl p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-900 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDriveDownload, { className: "w-3.5 h-3.5 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"تم تفعيل قاعدة البيانات المحلية (Offline) • جميع المتبرعين (",
								donors.length,
								") متاحون للاتصال بدون إنترنت"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-amber-200/90 text-amber-900 px-2 py-0.5 rounded-md",
							children: "الذاكرة المحلية نشطة"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "ابحث بالاسم أو السكن (مثلاً: مريس، قعطبة، الفاخر، سناح)...",
								className: "w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm outline-hidden font-medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5 text-slate-400 absolute right-3 top-2.5" }),
							searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchQuery(""),
								className: "absolute left-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded",
								children: "مسح"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تصفية حسب فصيلة الدم:" }), selectedBloodType !== "ALL" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSelectedBloodType("ALL");
								setSheetsDonors([]);
							},
							className: "text-red-600 hover:underline",
							children: "عرض كل الفصائل"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-5 sm:grid-cols-9 gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setSelectedBloodType("ALL");
								setSheetsDonors([]);
							},
							className: `py-2 px-1 rounded-xl text-center font-bold text-xs border transition-all ${selectedBloodType === "ALL" ? "bg-red-600 text-white border-red-600 shadow-xs" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "الكل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] opacity-80",
								children: [
									"(",
									countsPerType.ALL,
									")"
								]
							})]
						}), BLOOD_TYPES.map((bt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setSelectedBloodType(bt);
								setSheetsDonors([]);
							},
							className: `py-2 px-1 rounded-xl text-center font-black text-xs sm:text-sm border transition-all ${selectedBloodType === bt ? "bg-red-600 text-white border-red-600 shadow-xs scale-102" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50/40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: bt }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] opacity-85 font-normal",
								children: [
									"(",
									countsPerType[bt] || 0,
									")"
								]
							})]
						}, bt))]
					})] }),
					selectedBloodType !== "ALL" && sheetsDonors.length === 0 && userProfile?.role === "admin" && activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSearchSheets,
							disabled: isSearchingSheets,
							className: "w-full py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98",
							children: [isSearchingSheets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-3.5 h-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"ابحث أيضاً في أرشيف Google Sheets (فصيلة ",
								selectedBloodType,
								")"
							] })]
						}), sheetsError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-red-500 mt-1 text-center font-medium",
							children: sheetsError
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-1 text-xs border-t border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-slate-700 cursor-pointer select-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: onlyAvailable,
								onChange: (e) => setOnlyAvailable(e.target.checked),
								className: "w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "إظهار المتاحين للتبرع حالياً فقط"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-slate-500",
							children: "مديرية قعطبة وضواحيها"
						})]
					})
				]
			}),
			combinedDonors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: combinedDonors.map((donor) => {
					const isCopied = copiedPhone === donor.phone;
					const cleanDonorPhone = donor.phone ? donor.phone.replace(/\D/g, "") : "";
					const cleanUserPhone = userProfile?.phone ? userProfile.phone.replace(/\D/g, "") : "";
					const isMyRecord = Boolean(currentUser && (donor.userId && donor.userId === currentUser.uid || cleanUserPhone.length >= 7 && cleanDonorPhone.length >= 7 && cleanDonorPhone === cleanUserPhone));
					const donationDateDisplay = donor.lastDonationDate ? donor.lastDonationDate : donor.createdAt ? typeof donor.createdAt === "string" ? donor.createdAt.split("T")[0] : donor.createdAt?.seconds ? (/* @__PURE__ */ new Date(donor.createdAt.seconds * 1e3)).toISOString().split("T")[0] : "مسجل حديثاً" : "لم يُحدد بعد";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-white rounded-2xl p-4 border transition-all shadow-xs space-y-3 ${isMyRecord ? "border-amber-300 ring-2 ring-amber-100 bg-amber-50/20" : "border-slate-200 hover:border-red-200"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-base font-extrabold text-slate-900",
													children: donor.fullName
												}),
												isMyRecord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-2 py-0.5 rounded-full shadow-2xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-3 h-3 text-amber-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بياناتي المسجلة" })]
												}),
												donor.phoneVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-0.5 text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-bold px-1.5 py-0.5 rounded-full",
													title: "تم التحقق من ملكية رقم الهاتف برمز تأكيد",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3 h-3 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رقم موثوق" })]
												}),
												donor.source === "google_sheets" && activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-0.5 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-1.5 py-0.5 rounded-full",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-3 h-3 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "سجل الأرشيف" })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5 pt-0.5",
											children: donor.isAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حالة المتبرع: متاح للتبرع الآن" })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-700 border border-slate-300 font-bold px-2.5 py-0.5 rounded-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حالة المتبرع: غير متاح مؤقتاً" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-red-500 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-slate-900",
													children: "السكن / المنطقة:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-slate-800",
													children: donor.residence || "مديرية قعطبة"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs text-slate-700 bg-red-50/60 px-2.5 py-1.5 rounded-xl border border-red-100",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5 text-red-600 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-slate-900",
													children: "تاريخ التبرع:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-red-900",
													children: donationDateDisplay
												})
											]
										}),
										donor.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500 bg-slate-50 p-2 rounded-lg mt-1 border border-slate-100",
											children: donor.notes
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-red-600 to-rose-700 text-white shadow-md shadow-red-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg sm:text-xl font-black leading-none",
										children: donor.bloodType
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase tracking-wider font-semibold opacity-90 mt-0.5",
										children: "فصيلة"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2",
								children: [
									isMyRecord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => onEditDonor?.(donor.id),
										className: "flex-1 min-w-[125px] py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95",
										title: "تعديل بياناتي التي سجلتها",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعديل بياناتي" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${donor.phone}`,
										onClick: (e) => {
											if (!currentUser) {
												e.preventDefault();
												setShowVisitorRestriction(true);
											}
										},
										className: "flex-1 min-w-[110px] py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "اتصال" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: getWhatsAppUrl(donor.phone, `السلام عليكم أخي ${donor.fullName} الكريم،\nحصلت على رقمك من تطبيق (قطرة دم تنقذ حياة - سجل المتبرعين بقعطبة).\nلدينا حالة بحاجة ماسة لفصيلة الدم (${donor.bloodType})، هل أنت متاح للتبرع وجزاك الله خيراً؟`),
										onClick: (e) => {
											e.preventDefault();
											if (!currentUser) {
												setShowVisitorRestriction(true);
												return;
											}
											const message = `السلام عليكم أخي ${donor.fullName} الكريم،\nحصلت على رقمك من تطبيق (قطرة دم تنقذ حياة - سجل المتبرعين بقعطبة).\nلدينا حالة بحاجة ماسة لفصيلة الدم (${donor.bloodType})، هل أنت متاح للتبرع وجزاك الله خيراً؟`;
											openWhatsAppChat(donor.phone, message);
										},
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex-1 min-w-[95px] py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "واتساب" })]
									}),
									isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleCopyPhone(donor.phone),
										className: "p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors",
										title: "نسخ رقم الهاتف (للمسؤول فقط)",
										children: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare(donor),
										className: "p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors",
										title: "مشاركة بيانات المتبرع",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" })
									})
								]
							}),
							isAdmin && !isMyRecord && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2.5 mt-1 border-t border-amber-200/60 bg-amber-50/60 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-amber-900 text-[11px] font-black",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "صلاحيات المسؤول:" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => onEditDonor?.(donor.id),
										className: "py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1 active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعديل" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setDonorToDelete(donor),
										className: "py-1.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-black transition-all flex items-center gap-1 active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حذف" })]
									})]
								})]
							})
						]
					}, donor.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "لم نجد متبرعين مطابقين للبحث"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-slate-500 max-w-sm mx-auto",
						children: "جرب اختيار فصيلة دم أخرى، أو إزالة التصفية، أو كن أول من يسجل بهذه الفصيلة لإنقاذ الأرواح في قعطبة!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onNavigateToRegister,
						className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "سجل كمتبرع الآن" })]
					})
				]
			}),
			donorToDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-slate-900",
									children: "تأكيد حذف المتبرع"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-600 leading-relaxed",
									children: [
										"هل أنت متأكد من رغبتك في حذف بيانات المتبرع ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-red-600 underline underline-offset-2",
											children: donorToDelete.fullName
										}),
										" (فصيلة ",
										donorToDelete.bloodType,
										") من السجل؟"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-400 font-medium",
									children: "بصفتك مسؤول التطبيق، سيتم حذف هذا السجل نهائياً من قاعدة البيانات واستبعاده من كافة الشاشات فوراً."
								})
							]
						}),
						deleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold text-center border border-red-200 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 shrink-0 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deleteError })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: async () => {
									if (!donorToDelete || !onDeleteDonor) return;
									setIsDeleting(true);
									setDeleteError(null);
									try {
										await onDeleteDonor(donorToDelete.id, donorToDelete.phone);
										setDeleteSuccess(`تم حذف بيانات المتبرع (${donorToDelete.fullName}) بنجاح!`);
										setTimeout(() => {
											setDeleteSuccess(null);
										}, 3500);
										setDonorToDelete(null);
									} catch (err) {
										setDeleteError(err.message || "حدث خطأ أثناء محاولة الحذف");
									} finally {
										setIsDeleting(false);
									}
								},
								disabled: isDeleting,
								className: "py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50",
								children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تأكيد الحذف" })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setDonorToDelete(null);
									setDeleteError(null);
								},
								disabled: isDeleting,
								className: "py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			whatsAppTargetDonor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in",
				onClick: () => setWhatsAppTargetDonor(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-100 text-center font-['Cairo',sans-serif]",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-slate-900",
								children: "هل تريد المغادرة إلى واتساب؟"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-600 leading-relaxed font-semibold",
								children: "أنت على وشك مغادرة التطبيق وفتح محادثة واتساب مع المتبرع:"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-right space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-slate-900",
										children: whatsAppTargetDonor.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full",
										children: ["فصيلة ", whatsAppTargetDonor.bloodType]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-600 font-bold flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رقم الهاتف:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										dir: "ltr",
										className: "font-mono text-emerald-800 font-extrabold",
										children: whatsAppTargetDonor.phone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-slate-500 font-medium",
									children: ["السكن: ", whatsAppTargetDonor.residence || "مديرية قعطبة"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const target = whatsAppTargetDonor;
									setWhatsAppTargetDonor(null);
									confirmWhatsAppNavigation(target);
								},
								className: "flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نعم، الذهاب للواتس" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setWhatsAppTargetDonor(null),
								className: "py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitorRestrictionModal, {
				isOpen: showVisitorRestriction,
				onClose: () => setShowVisitorRestriction(false),
				onOpenRegister: () => {
					setShowVisitorRestriction(false);
					onOpenAuth();
				},
				onOpenLogin: () => {
					setShowVisitorRestriction(false);
					onOpenAuth();
				}
			})
		]
	});
};
// node_modules/canvas-confetti/dist/confetti.module.mjs
var module = {};
(function main(global, module, isWorker, workerSize) {
	var canUseWorker = !!(global.Worker && global.Blob && global.Promise && global.OffscreenCanvas && global.OffscreenCanvasRenderingContext2D && global.HTMLCanvasElement && global.HTMLCanvasElement.prototype.transferControlToOffscreen && global.URL && global.URL.createObjectURL);
	var canUsePaths = typeof Path2D === "function" && typeof DOMMatrix === "function";
	var canDrawBitmap = (function() {
		if (!global.OffscreenCanvas) return false;
		try {
			var canvas = new OffscreenCanvas(1, 1);
			var ctx = canvas.getContext("2d");
			ctx.fillRect(0, 0, 1, 1);
			var bitmap = canvas.transferToImageBitmap();
			ctx.createPattern(bitmap, "no-repeat");
		} catch (e) {
			return false;
		}
		return true;
	})();
	function noop() {}
	function promise(func) {
		var ModulePromise = module.exports.Promise;
		var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;
		if (typeof Prom === "function") return new Prom(func);
		func(noop, noop);
		return null;
	}
	var bitmapMapper = (function(skipTransform, map) {
		return {
			transform: function(bitmap) {
				if (skipTransform) return bitmap;
				if (map.has(bitmap)) return map.get(bitmap);
				var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				canvas.getContext("2d").drawImage(bitmap, 0, 0);
				map.set(bitmap, canvas);
				return canvas;
			},
			clear: function() {
				map.clear();
			}
		};
	})(canDrawBitmap, /* @__PURE__ */ new Map());
	var raf = function() {
		var TIME = Math.floor(1e3 / 60);
		var frame, cancel;
		var frames = {};
		var lastFrameTime = 0;
		if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
			frame = function(cb) {
				var id = Math.random();
				frames[id] = requestAnimationFrame(function onFrame(time) {
					if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
						lastFrameTime = time;
						delete frames[id];
						cb();
					} else frames[id] = requestAnimationFrame(onFrame);
				});
				return id;
			};
			cancel = function(id) {
				if (frames[id]) cancelAnimationFrame(frames[id]);
			};
		} else {
			frame = function(cb) {
				return setTimeout(cb, TIME);
			};
			cancel = function(timer) {
				return clearTimeout(timer);
			};
		}
		return {
			frame,
			cancel
		};
	}();
	var getWorker = (function() {
		var worker;
		var prom;
		var resolves = {};
		function decorate(worker) {
			function execute(options, callback) {
				worker.postMessage({
					options: options || {},
					callback
				});
			}
			worker.init = function initWorker(canvas) {
				var offscreen = canvas.transferControlToOffscreen();
				worker.postMessage({ canvas: offscreen }, [offscreen]);
			};
			worker.fire = function fireWorker(options, size, done) {
				if (prom) {
					execute(options, null);
					return prom;
				}
				var id = Math.random().toString(36).slice(2);
				prom = promise(function(resolve) {
					function workerDone(msg) {
						if (msg.data.callback !== id) return;
						delete resolves[id];
						worker.removeEventListener("message", workerDone);
						prom = null;
						bitmapMapper.clear();
						done();
						resolve();
					}
					worker.addEventListener("message", workerDone);
					execute(options, id);
					resolves[id] = workerDone.bind(null, { data: { callback: id } });
				});
				return prom;
			};
			worker.reset = function resetWorker() {
				worker.postMessage({ reset: true });
				for (var id in resolves) {
					resolves[id]();
					delete resolves[id];
				}
			};
		}
		return function() {
			if (worker) return worker;
			if (!isWorker && canUseWorker) {
				var code = [
					"var CONFETTI, SIZE = {}, module = {};",
					"(" + main.toString() + ")(this, module, true, SIZE);",
					"onmessage = function(msg) {",
					"  if (msg.data.options) {",
					"    CONFETTI(msg.data.options).then(function () {",
					"      if (msg.data.callback) {",
					"        postMessage({ callback: msg.data.callback });",
					"      }",
					"    });",
					"  } else if (msg.data.reset) {",
					"    CONFETTI && CONFETTI.reset();",
					"  } else if (msg.data.resize) {",
					"    SIZE.width = msg.data.resize.width;",
					"    SIZE.height = msg.data.resize.height;",
					"  } else if (msg.data.canvas) {",
					"    SIZE.width = msg.data.canvas.width;",
					"    SIZE.height = msg.data.canvas.height;",
					"    CONFETTI = module.exports.create(msg.data.canvas);",
					"  }",
					"}"
				].join("\n");
				try {
					worker = new Worker(URL.createObjectURL(new Blob([code])));
				} catch (e) {
					typeof console !== "undefined" && typeof console.warn === "function" && console.warn("🎊 Could not load worker", e);
					return null;
				}
				decorate(worker);
			}
			return worker;
		};
	})();
	var defaults = {
		particleCount: 50,
		angle: 90,
		spread: 45,
		startVelocity: 45,
		decay: .9,
		gravity: 1,
		drift: 0,
		ticks: 200,
		x: .5,
		y: .5,
		shapes: ["square", "circle"],
		zIndex: 100,
		colors: [
			"#26ccff",
			"#a25afd",
			"#ff5e7e",
			"#88ff5a",
			"#fcff42",
			"#ffa62d",
			"#ff36ff"
		],
		disableForReducedMotion: false,
		scalar: 1
	};
	function convert(val, transform) {
		return transform ? transform(val) : val;
	}
	function isOk(val) {
		return !(val === null || val === void 0);
	}
	function prop(options, name, transform) {
		return convert(options && isOk(options[name]) ? options[name] : defaults[name], transform);
	}
	function onlyPositiveInt(number) {
		return number < 0 ? 0 : Math.floor(number);
	}
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function toDecimal(str) {
		return parseInt(str, 16);
	}
	function colorsToRgb(colors) {
		return colors.map(hexToRgb);
	}
	function hexToRgb(str) {
		var val = String(str).replace(/[^0-9a-f]/gi, "");
		if (val.length < 6) val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
		return {
			r: toDecimal(val.substring(0, 2)),
			g: toDecimal(val.substring(2, 4)),
			b: toDecimal(val.substring(4, 6))
		};
	}
	function getOrigin(options) {
		var origin = prop(options, "origin", Object);
		origin.x = prop(origin, "x", Number);
		origin.y = prop(origin, "y", Number);
		return origin;
	}
	function setCanvasWindowSize(canvas) {
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
	}
	function setCanvasRectSize(canvas) {
		var rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
	}
	function getCanvas(zIndex) {
		var canvas = document.createElement("canvas");
		canvas.style.position = "fixed";
		canvas.style.top = "0px";
		canvas.style.left = "0px";
		canvas.style.pointerEvents = "none";
		canvas.style.zIndex = zIndex;
		return canvas;
	}
	function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
		context.save();
		context.translate(x, y);
		context.rotate(rotation);
		context.scale(radiusX, radiusY);
		context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
		context.restore();
	}
	function randomPhysics(opts) {
		var radAngle = opts.angle * (Math.PI / 180);
		var radSpread = opts.spread * (Math.PI / 180);
		return {
			x: opts.x,
			y: opts.y,
			wobble: Math.random() * 10,
			wobbleSpeed: Math.min(.11, Math.random() * .1 + .05),
			velocity: opts.startVelocity * .5 + Math.random() * opts.startVelocity,
			angle2D: -radAngle + (.5 * radSpread - Math.random() * radSpread),
			tiltAngle: (Math.random() * .5 + .25) * Math.PI,
			color: opts.color,
			shape: opts.shape,
			tick: 0,
			totalTicks: opts.ticks,
			decay: opts.decay,
			drift: opts.drift,
			random: Math.random() + 2,
			tiltSin: 0,
			tiltCos: 0,
			wobbleX: 0,
			wobbleY: 0,
			gravity: opts.gravity * 3,
			ovalScalar: .6,
			scalar: opts.scalar,
			flat: opts.flat
		};
	}
	function updateFetti(context, fetti) {
		fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
		fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
		fetti.velocity *= fetti.decay;
		if (fetti.flat) {
			fetti.wobble = 0;
			fetti.wobbleX = fetti.x + 10 * fetti.scalar;
			fetti.wobbleY = fetti.y + 10 * fetti.scalar;
			fetti.tiltSin = 0;
			fetti.tiltCos = 0;
			fetti.random = 1;
		} else {
			fetti.wobble += fetti.wobbleSpeed;
			fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
			fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
			fetti.tiltAngle += .1;
			fetti.tiltSin = Math.sin(fetti.tiltAngle);
			fetti.tiltCos = Math.cos(fetti.tiltAngle);
			fetti.random = Math.random() + 2;
		}
		var progress = fetti.tick++ / fetti.totalTicks;
		var x1 = fetti.x + fetti.random * fetti.tiltCos;
		var y1 = fetti.y + fetti.random * fetti.tiltSin;
		var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
		var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
		context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
		context.beginPath();
		if (canUsePaths && fetti.shape.type === "path" && typeof fetti.shape.path === "string" && Array.isArray(fetti.shape.matrix)) context.fill(transformPath2D(fetti.shape.path, fetti.shape.matrix, fetti.x, fetti.y, Math.abs(x2 - x1) * .1, Math.abs(y2 - y1) * .1, Math.PI / 10 * fetti.wobble));
		else if (fetti.shape.type === "bitmap") {
			var rotation = Math.PI / 10 * fetti.wobble;
			var scaleX = Math.abs(x2 - x1) * .1;
			var scaleY = Math.abs(y2 - y1) * .1;
			var width = fetti.shape.bitmap.width * fetti.scalar;
			var height = fetti.shape.bitmap.height * fetti.scalar;
			var matrix = new DOMMatrix([
				Math.cos(rotation) * scaleX,
				Math.sin(rotation) * scaleX,
				-Math.sin(rotation) * scaleY,
				Math.cos(rotation) * scaleY,
				fetti.x,
				fetti.y
			]);
			matrix.multiplySelf(new DOMMatrix(fetti.shape.matrix));
			var pattern = context.createPattern(bitmapMapper.transform(fetti.shape.bitmap), "no-repeat");
			pattern.setTransform(matrix);
			context.globalAlpha = 1 - progress;
			context.fillStyle = pattern;
			context.fillRect(fetti.x - width / 2, fetti.y - height / 2, width, height);
			context.globalAlpha = 1;
		} else if (fetti.shape === "circle") context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
		else if (fetti.shape === "star") {
			var rot = Math.PI / 2 * 3;
			var innerRadius = 4 * fetti.scalar;
			var outerRadius = 8 * fetti.scalar;
			var x = fetti.x;
			var y = fetti.y;
			var spikes = 5;
			var step = Math.PI / spikes;
			while (spikes--) {
				x = fetti.x + Math.cos(rot) * outerRadius;
				y = fetti.y + Math.sin(rot) * outerRadius;
				context.lineTo(x, y);
				rot += step;
				x = fetti.x + Math.cos(rot) * innerRadius;
				y = fetti.y + Math.sin(rot) * innerRadius;
				context.lineTo(x, y);
				rot += step;
			}
		} else {
			context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
			context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
			context.lineTo(Math.floor(x2), Math.floor(y2));
			context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
		}
		context.closePath();
		context.fill();
		return fetti.tick < fetti.totalTicks;
	}
	function animate(canvas, fettis, resizer, size, done) {
		var animatingFettis = fettis.slice();
		var context = canvas.getContext("2d");
		var animationFrame;
		var destroy;
		var prom = promise(function(resolve) {
			function onDone() {
				animationFrame = destroy = null;
				context.clearRect(0, 0, size.width, size.height);
				bitmapMapper.clear();
				done();
				resolve();
			}
			function update() {
				if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
					size.width = canvas.width = workerSize.width;
					size.height = canvas.height = workerSize.height;
				}
				if (!size.width && !size.height) {
					resizer(canvas);
					size.width = canvas.width;
					size.height = canvas.height;
				}
				context.clearRect(0, 0, size.width, size.height);
				animatingFettis = animatingFettis.filter(function(fetti) {
					return updateFetti(context, fetti);
				});
				if (animatingFettis.length) animationFrame = raf.frame(update);
				else onDone();
			}
			animationFrame = raf.frame(update);
			destroy = onDone;
		});
		return {
			addFettis: function(fettis) {
				animatingFettis = animatingFettis.concat(fettis);
				return prom;
			},
			canvas,
			promise: prom,
			reset: function() {
				if (animationFrame) raf.cancel(animationFrame);
				if (destroy) destroy();
			}
		};
	}
	function confettiCannon(canvas, globalOpts) {
		var isLibCanvas = !canvas;
		var allowResize = !!prop(globalOpts || {}, "resize");
		var hasResizeEventRegistered = false;
		var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
		var worker = canUseWorker && !!prop(globalOpts || {}, "useWorker") ? getWorker() : null;
		var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
		var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
		var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
		var animationObj;
		function fireLocal(options, size, done) {
			var particleCount = prop(options, "particleCount", onlyPositiveInt);
			var angle = prop(options, "angle", Number);
			var spread = prop(options, "spread", Number);
			var startVelocity = prop(options, "startVelocity", Number);
			var decay = prop(options, "decay", Number);
			var gravity = prop(options, "gravity", Number);
			var drift = prop(options, "drift", Number);
			var colors = prop(options, "colors", colorsToRgb);
			var ticks = prop(options, "ticks", Number);
			var shapes = prop(options, "shapes");
			var scalar = prop(options, "scalar");
			var flat = !!prop(options, "flat");
			var origin = getOrigin(options);
			var temp = particleCount;
			var fettis = [];
			var startX = canvas.width * origin.x;
			var startY = canvas.height * origin.y;
			while (temp--) fettis.push(randomPhysics({
				x: startX,
				y: startY,
				angle,
				spread,
				startVelocity,
				color: colors[temp % colors.length],
				shape: shapes[randomInt(0, shapes.length)],
				ticks,
				decay,
				gravity,
				drift,
				scalar,
				flat
			}));
			if (animationObj) return animationObj.addFettis(fettis);
			animationObj = animate(canvas, fettis, resizer, size, done);
			return animationObj.promise;
		}
		function fire(options) {
			var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
			var zIndex = prop(options, "zIndex", Number);
			if (disableForReducedMotion && preferLessMotion) return promise(function(resolve) {
				resolve();
			});
			if (isLibCanvas && animationObj) canvas = animationObj.canvas;
			else if (isLibCanvas && !canvas) {
				canvas = getCanvas(zIndex);
				document.body.appendChild(canvas);
			}
			if (allowResize && !initialized) resizer(canvas);
			var size = {
				width: canvas.width,
				height: canvas.height
			};
			if (worker && !initialized) worker.init(canvas);
			initialized = true;
			if (worker) canvas.__confetti_initialized = true;
			function onResize() {
				if (worker) {
					var obj = { getBoundingClientRect: function() {
						if (!isLibCanvas) return canvas.getBoundingClientRect();
					} };
					resizer(obj);
					worker.postMessage({ resize: {
						width: obj.width,
						height: obj.height
					} });
					return;
				}
				size.width = size.height = null;
			}
			function done() {
				animationObj = null;
				if (allowResize) {
					hasResizeEventRegistered = false;
					global.removeEventListener("resize", onResize);
				}
				if (isLibCanvas && canvas) {
					if (document.body.contains(canvas)) document.body.removeChild(canvas);
					canvas = null;
					initialized = false;
				}
			}
			if (allowResize && !hasResizeEventRegistered) {
				hasResizeEventRegistered = true;
				global.addEventListener("resize", onResize, false);
			}
			if (worker) return worker.fire(options, size, done);
			return fireLocal(options, size, done);
		}
		fire.reset = function() {
			if (worker) worker.reset();
			if (animationObj) animationObj.reset();
		};
		return fire;
	}
	var defaultFire;
	function getDefaultFire() {
		if (!defaultFire) defaultFire = confettiCannon(null, {
			useWorker: true,
			resize: true
		});
		return defaultFire;
	}
	function transformPath2D(pathString, pathMatrix, x, y, scaleX, scaleY, rotation) {
		var path2d = new Path2D(pathString);
		var t1 = new Path2D();
		t1.addPath(path2d, new DOMMatrix(pathMatrix));
		var t2 = new Path2D();
		t2.addPath(t1, new DOMMatrix([
			Math.cos(rotation) * scaleX,
			Math.sin(rotation) * scaleX,
			-Math.sin(rotation) * scaleY,
			Math.cos(rotation) * scaleY,
			x,
			y
		]));
		return t2;
	}
	function shapeFromPath(pathData) {
		if (!canUsePaths) throw new Error("path confetti are not supported in this browser");
		var path, matrix;
		if (typeof pathData === "string") path = pathData;
		else {
			path = pathData.path;
			matrix = pathData.matrix;
		}
		var path2d = new Path2D(path);
		var tempCtx = document.createElement("canvas").getContext("2d");
		if (!matrix) {
			var maxSize = 1e3;
			var minX = maxSize;
			var minY = maxSize;
			var maxX = 0;
			var maxY = 0;
			var width, height;
			for (var x = 0; x < maxSize; x += 2) for (var y = 0; y < maxSize; y += 2) if (tempCtx.isPointInPath(path2d, x, y, "nonzero")) {
				minX = Math.min(minX, x);
				minY = Math.min(minY, y);
				maxX = Math.max(maxX, x);
				maxY = Math.max(maxY, y);
			}
			width = maxX - minX;
			height = maxY - minY;
			var maxDesiredSize = 10;
			var scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);
			matrix = [
				scale,
				0,
				0,
				scale,
				-Math.round(width / 2 + minX) * scale,
				-Math.round(height / 2 + minY) * scale
			];
		}
		return {
			type: "path",
			path,
			matrix
		};
	}
	function shapeFromText(textData) {
		var text, scalar = 1, color = "#000000", fontFamily = "\"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\", \"Twemoji Mozilla\", \"system emoji\", sans-serif";
		if (typeof textData === "string") text = textData;
		else {
			text = textData.text;
			scalar = "scalar" in textData ? textData.scalar : scalar;
			fontFamily = "fontFamily" in textData ? textData.fontFamily : fontFamily;
			color = "color" in textData ? textData.color : color;
		}
		var fontSize = 10 * scalar;
		var font = "" + fontSize + "px " + fontFamily;
		var canvas = new OffscreenCanvas(fontSize, fontSize);
		var ctx = canvas.getContext("2d");
		ctx.font = font;
		var size = ctx.measureText(text);
		var width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
		var height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);
		var padding = 2;
		var x = size.actualBoundingBoxLeft + padding;
		var y = size.actualBoundingBoxAscent + padding;
		width += padding + padding;
		height += padding + padding;
		canvas = new OffscreenCanvas(width, height);
		ctx = canvas.getContext("2d");
		ctx.font = font;
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
		var scale = 1 / scalar;
		return {
			type: "bitmap",
			bitmap: canvas.transferToImageBitmap(),
			matrix: [
				scale,
				0,
				0,
				scale,
				-width * scale / 2,
				-height * scale / 2
			]
		};
	}
	module.exports = function() {
		return getDefaultFire().apply(this, arguments);
	};
	module.exports.reset = function() {
		getDefaultFire().reset();
	};
	module.exports.create = confettiCannon;
	module.exports.shapeFromPath = shapeFromPath;
	module.exports.shapeFromText = shapeFromText;
})((function() {
	if (typeof window !== "undefined") return window;
	if (typeof self !== "undefined") return self;
	return this || {};
})(), module, false);
var confetti_module_default = module.exports;
module.exports.create;
// src/components/YemenPhoneInput.tsx
var YemenPhoneInput = ({ value, onChange, placeholder = "773 633 918", required = true, disabled = false, autoFocus = false }) => {
	const handleChange = (e) => {
		const raw = e.target.value;
		onChange(sanitizePhone(raw));
	};
	const getOperator = (val) => {
		if (val.startsWith("77") || val.startsWith("78")) return {
			name: "يمن موبايل",
			color: "bg-red-50 text-red-700 border-red-200"
		};
		if (val.startsWith("73")) return {
			name: "يو (YOU)",
			color: "bg-amber-50 text-amber-700 border-amber-200"
		};
		if (val.startsWith("71")) return {
			name: "سبأفون",
			color: "bg-blue-50 text-blue-700 border-blue-200"
		};
		if (val.startsWith("70")) return {
			name: "واي (Y)",
			color: "bg-emerald-50 text-emerald-700 border-emerald-200"
		};
		return null;
	};
	const operator = getOperator(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 text-right font-['Cairo',sans-serif]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center rounded-2xl border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 bg-white overflow-hidden transition-all shadow-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 px-3.5 py-3 bg-slate-50 border-l border-slate-200 text-slate-800 font-mono font-bold text-xs sm:text-sm select-none shrink-0",
					dir: "ltr",
					title: "مفتاح الجمهورية اليمنية +967 مضاف تلقائياً",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base leading-none",
						children: "🇾🇪"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-slate-800 font-extrabold",
						children: "+967"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "tel",
					maxLength: 9,
					value,
					onChange: handleChange,
					placeholder,
					dir: "ltr",
					disabled,
					autoFocus,
					className: "w-full px-3.5 py-3 text-xs sm:text-sm font-mono font-bold text-slate-900 placeholder:text-slate-300 outline-hidden bg-transparent text-right",
					required
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pl-3.5 text-slate-400 pointer-events-none shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 stroke-[2]" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-[11px] px-1 font-bold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-slate-400",
				children: "أدخل الأرقام الـ 9 فقط (مثال: 773633918)"
			}), operator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `px-2 py-0.5 rounded-md border text-[10px] ${operator.color}`,
				children: operator.name
			})]
		})]
	});
};
// src/components/UrgentRequests.tsx
var isUrgentRequestExpired = (req) => {
	if (!req.createdAt) return false;
	let createdMs = 0;
	if (typeof req.createdAt?.toMillis === "function") createdMs = req.createdAt.toMillis();
	else if (req.createdAt?.seconds) createdMs = req.createdAt.seconds * 1e3;
	else if (typeof req.createdAt === "number") createdMs = req.createdAt;
	else if (typeof req.createdAt === "string") createdMs = new Date(req.createdAt).getTime();
	else if (req.createdAt instanceof Date) createdMs = req.createdAt.getTime();
	if (!createdMs || isNaN(createdMs)) return false;
	return Date.now() - createdMs > 1728e5;
};
var getUrgentRemainingHours = (req) => {
	if (!req.createdAt) return 48;
	let createdMs = Date.now();
	if (typeof req.createdAt?.toMillis === "function") createdMs = req.createdAt.toMillis();
	else if (req.createdAt?.seconds) createdMs = req.createdAt.seconds * 1e3;
	else if (typeof req.createdAt === "number") createdMs = req.createdAt;
	else if (typeof req.createdAt === "string") createdMs = new Date(req.createdAt).getTime();
	else if (req.createdAt instanceof Date) createdMs = req.createdAt.getTime();
	const leftMs = 1728e5 - (Date.now() - createdMs);
	return Math.max(0, Math.floor(leftMs / 36e5));
};
var UrgentRequests = ({ urgentRequests, onOpenAuth }) => {
	const { currentUser, userProfile, activeRole } = useAuth();
	const isAdmin = activeRole === "admin";
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("open");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [showVisitorRestriction, setShowVisitorRestriction] = (0, import_react.useState)(false);
	const [whatsAppTargetReq, setWhatsAppTargetReq] = (0, import_react.useState)(null);
	const [reqToDelete, setReqToDelete] = (0, import_react.useState)(null);
	const [isDeletingReq, setIsDeletingReq] = (0, import_react.useState)(false);
	const [deleteReqError, setDeleteReqError] = (0, import_react.useState)(null);
	const handleDeleteRequestConfirm = async () => {
		if (!reqToDelete) return;
		setIsDeletingReq(true);
		setDeleteReqError(null);
		try {
			await deleteUrgentRequest(reqToDelete.id);
			setReqToDelete(null);
		} catch (err) {
			setDeleteReqError(err.message || "فشل حذف البلاغ");
		} finally {
			setIsDeletingReq(false);
		}
	};
	const [patientName, setPatientName] = (0, import_react.useState)("");
	const [bloodType, setBloodType] = (0, import_react.useState)("O+");
	const [unitsNeeded, setUnitsNeeded] = (0, import_react.useState)(1);
	const [hospital, setHospital] = (0, import_react.useState)("");
	const [contactName, setContactName] = (0, import_react.useState)("");
	const [contactPhone, setContactPhone] = (0, import_react.useState)("");
	const [urgencyLevel, setUrgencyLevel] = (0, import_react.useState)("urgent");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)(null);
	const validRequests = urgentRequests.filter((req) => !isUrgentRequestExpired(req));
	const filteredRequests = validRequests.filter((req) => {
		if (filterStatus === "open") return req.status === "open";
		if (filterStatus === "fulfilled") return req.status === "fulfilled";
		return true;
	});
	const openCount = validRequests.filter((r) => r.status === "open").length;
	const fulfilledCount = validRequests.filter((r) => r.status === "fulfilled").length;
	const handleCreateRequest = async (e) => {
		e.preventDefault();
		setFormError(null);
		if (!currentUser) {
			setFormError("يرجى تسجيل الدخول أو إنشاء حساب لنشر طلب دم عاجل ومتابعته");
			return;
		}
		if (patientName.trim().length < 2) {
			setFormError("يرجى كتابة اسم المريض أو الحالة");
			return;
		}
		if (hospital.trim().length < 2) {
			setFormError("يرجى كتابة المستشفى أو مكان الحاجة");
			return;
		}
		if (contactPhone.trim().replace(/\D/g, "").length < 7) {
			setFormError("يرجى إدخال رقم هاتف صحيح للتواصل");
			return;
		}
		setSubmitting(true);
		try {
			await createUrgentRequest({
				userId: currentUser.uid,
				patientName: patientName.trim(),
				bloodType,
				unitsNeeded: Number(unitsNeeded) || 1,
				hospital: hospital.trim(),
				contactName: contactName.trim() || patientName.trim(),
				contactPhone: contactPhone.trim(),
				urgencyLevel,
				status: "open",
				notes: notes.trim()
			});
			confetti_module_default({
				particleCount: 70,
				spread: 60
			});
			setPatientName("");
			setHospital("");
			setContactName("");
			setContactPhone("");
			setNotes("");
			setIsModalOpen(false);
		} catch (err) {
			console.error("Error creating request:", err);
			setFormError("حدث خطأ أثناء نشر الطلب. يرجى المحاولة ثانية.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleToggleStatus = async (request) => {
		const newStatus = request.status === "open" ? "fulfilled" : "open";
		try {
			await updateRequestStatus(request.id, newStatus);
			if (newStatus === "fulfilled") confetti_module_default({
				particleCount: 100,
				spread: 80,
				origin: { y: .6 }
			});
		} catch (err) {
			console.error("Error updating status:", err);
		}
	};
	const HOSPITAL_SUGGESTIONS = [
		"مستشفى السلام التخصصي - قعطبة",
		"مستشفى قعطبة العام",
		"مستشفى النصر العام - الضالع",
		"مستشفى التضامن التخصصي - الضالع",
		"مركز الطوارئ التوليدية - قعطبة",
		"مستشفى مريس العام"
	];
	const confirmWhatsAppNavigation = (req) => {
		const message = `السلام عليكم ورحمة الله،\nبخصوص طلب الدم العاجل لفصيلة (${req.bloodType}) في (${req.hospital}) للمريض (${req.patientName}) عبر تطبيق (قطرة دم تنقذ حياة).\nأنا مستعد للتبرع والمساعدة، يرجى إفادتي بالتفاصيل ومكان الحضور فوراً.`;
		openWhatsAppChat(req.contactPhone, message);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-linear-to-r from-amber-600 via-amber-700 to-rose-700 text-white rounded-2xl p-4 shadow-md space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-amber-200 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-black",
							children: "أدوات إدارة طلبات الدم (وضع المسؤول)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-amber-100",
							children: "يمكنك إغلاق أي طلب أو إعادة فتحه أو حذفه مباشرة عند توفير أكياس الدم"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs bg-amber-900/60 px-3 py-1 rounded-full font-bold border border-amber-400/30",
						children: [openCount, " طلبات نشطة"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-linear-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-2xl p-4 sm:p-5 shadow-md shadow-red-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-white animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg sm:text-xl font-black tracking-tight",
								children: "طلبات الدم العاجلة والحرجة"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-red-100",
							children: "مديرية قعطبة والمستشفيات المجاورة • استجابة فورية لإنقاذ الأرواح"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (!currentUser) setShowVisitorRestriction(true);
							else setIsModalOpen(true);
						},
						className: "w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 stroke-[3]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نشر طلب دم عاجل" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs font-bold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilterStatus("open"),
						className: `flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${filterStatus === "open" ? "bg-red-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"الحالات المفتوحة (",
							openCount,
							")"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilterStatus("fulfilled"),
						className: `flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${filterStatus === "fulfilled" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"تم توفير الدم (",
							fulfilledCount,
							")"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilterStatus("all"),
						className: `py-2 px-3 rounded-lg transition-all ${filterStatus === "all" ? "bg-slate-800 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"الكل (",
							urgentRequests.length,
							")"
						] })
					})
				]
			}),
			filteredRequests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredRequests.map((req) => {
					const isAuthor = currentUser && currentUser.uid === req.userId;
					const isCritical = req.urgencyLevel === "critical";
					const isFulfilled = req.status === "fulfilled";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-white rounded-2xl p-4 border transition-all shadow-xs space-y-3 relative overflow-hidden ${isFulfilled ? "border-emerald-200 bg-emerald-50/20" : isCritical ? "border-red-300 ring-2 ring-red-100" : "border-slate-200 hover:border-red-200"}`,
						children: [
							isCritical && !isFulfilled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-red-600 via-rose-500 to-amber-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5",
											children: [
												isFulfilled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), "تم توفير الدم بنجاح بحمد الله"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${isCritical ? "bg-red-600 text-white animate-pulse" : "bg-amber-100 text-amber-800 border border-amber-200"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3.5 h-3.5" }), isCritical ? "حالة حرجة جداً" : "طلب عاجل"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full",
													children: [
														"مطلوب ",
														req.unitsNeeded,
														" كيس دم"
													]
												}),
												!isFulfilled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full",
													title: "صلاحية ظهور البلاغ 48 ساعة فقط ثم يختفي تلقائياً",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"متبقي ",
														getUrgentRemainingHours(req),
														" ساعة"
													] })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-extrabold text-slate-900 pt-0.5",
											children: req.patientName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs text-slate-600 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-3.5 h-3.5 text-red-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: req.hospital })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs text-slate-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["مسؤول الحالة: ", req.contactName] })]
										}),
										req.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-1 border border-slate-100",
											children: req.notes
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-red-600 to-rose-700 text-white shadow-md shadow-red-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg sm:text-xl font-black leading-none",
										children: req.bloodType
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase tracking-wider font-semibold opacity-90 mt-0.5",
										children: "مطلوب"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${req.contactPhone}`,
											className: "py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "اتصال" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: getWhatsAppUrl(req.contactPhone, `السلام عليكم ورحمة الله،\nبخصوص طلب الدم العاجل لفصيلة (${req.bloodType}) في (${req.hospital}) للمريض (${req.patientName}) عبر تطبيق (قطرة دم تنقذ حياة).\nأنا مستعد للتبرع والمساعدة، يرجى إفادتي بالتفاصيل ومكان الحضور فوراً.`),
											onClick: (e) => {
												e.preventDefault();
												const message = `السلام عليكم ورحمة الله،\nبخصوص طلب الدم العاجل لفصيلة (${req.bloodType}) في (${req.hospital}) للمريض (${req.patientName}) عبر تطبيق (قطرة دم تنقذ حياة).\nأنا مستعد للتبرع والمساعدة، يرجى إفادتي بالتفاصيل ومكان الحضور فوراً.`;
												openWhatsAppChat(req.contactPhone, message);
											},
											target: "_blank",
											rel: "noopener noreferrer",
											className: "py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أنا مستعد للتبرع" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												const appUrl = getAppLink();
												shareData({
													title: "نداء عاجل للتبرع بالدم - Bank AlDam Qataba",
													text: `🔴 نداء طارئ للتبرع بالدم (Bank AlDam Qataba)!\n👤 المريض: ${req.patientName}\n🩸 الفصيلة المطلوبة: ${req.bloodType}\n💉 الوحدات: ${req.unitsNeeded} كيس\n🏥 المستشفى: ${req.hospital}\n⚠️ ملاحظة: الطلب ساري لمدة 48 ساعة.\n\n📱 رابط تطبيق Bank AlDam Qataba - قعطبة:\n${appUrl}`,
													url: appUrl
												});
											},
											className: "py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95",
											title: "مشاركة النداء عبر واتساب ومجموعات الخير",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5 text-slate-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "مشاركة"
											})]
										})
									]
								}), (isAuthor || isAdmin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleToggleStatus(req),
										className: `text-xs px-3 py-1.5 rounded-lg font-bold border transition-colors ${isFulfilled ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"}`,
										children: isFulfilled ? "إعادة فتح الطلب" : "إغلاق (تم توفير الدم)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setReqToDelete(req),
										className: "p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors",
										title: "حذف البلاغ",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-rose-600" })
									})]
								})]
							})
						]
					}, req.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-slate-900",
						children: filterStatus === "open" ? "الحمد لله، لا توجد طلبات دم عاجلة مفتوحة حالياً" : "لا توجد طلبات ضمن هذا القسم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-slate-500 max-w-sm mx-auto",
						children: "إذا كانت هناك حالة بحاجة ماسة للدم في قعطبة أو المستشفيات المجاورة، اضغط على زر النشر لإبلاغ المتبرعين فوراً."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (!currentUser) onOpenAuth();
							else setIsModalOpen(true);
						},
						className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نشر طلب دم عاجل" })]
					})
				]
			}),
			isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-extrabold text-slate-900",
									children: "نشر طلب دم عاجل"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsModalOpen(false),
								className: "p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}),
						formError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 text-red-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formError })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreateRequest,
							className: "space-y-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-slate-800 mb-1",
									children: ["اسم المريض أو وصف الحالة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: patientName,
									onChange: (e) => setPatientName(e.target.value),
									placeholder: "مثال: مريض بالعناية، أو حالة ولادة طارئة...",
									className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm outline-hidden font-medium",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-slate-800 mb-1",
										children: ["فصيلة الدم المطلوبة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: bloodType,
										onChange: (e) => setBloodType(e.target.value),
										className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm font-bold bg-white outline-hidden",
										children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: bt,
											children: bt
										}, bt))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-slate-800 mb-1",
										children: ["عدد الأكياس / الوحدات ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										max: 20,
										value: unitsNeeded,
										onChange: (e) => setUnitsNeeded(Number(e.target.value)),
										className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm font-bold outline-hidden",
										required: true
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-slate-800 mb-1",
										children: ["المستشفى / مكان الحاجة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: hospital,
										onChange: (e) => setHospital(e.target.value),
										placeholder: "اكتب اسم المستشفى أو اختر من القائمة أدناه",
										className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm outline-hidden font-medium mb-1.5",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: HOSPITAL_SUGGESTIONS.map((hosp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setHospital(hosp),
											className: `text-[10px] px-2 py-0.5 rounded-md border transition-colors ${hospital === hosp ? "bg-red-100 text-red-800 border-red-300 font-bold" : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"}`,
											children: hosp
										}, hosp))
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-slate-800 mb-1",
										children: ["اسم مسؤول الحالة ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: contactName,
										onChange: (e) => setContactName(e.target.value),
										placeholder: "مثال: أخو المريض / د. مناوب",
										className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm outline-hidden font-medium",
										required: true
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-slate-800 mb-1",
										children: ["رقم هاتف الاتصال والواتساب ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
										value: contactPhone,
										onChange: setContactPhone,
										required: true
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold text-slate-800 mb-1",
									children: ["درجة الاستعجال ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setUrgencyLevel("critical"),
											className: `py-2 px-2 rounded-xl text-center text-xs font-bold border transition-all ${urgencyLevel === "critical" ? "bg-red-600 text-white border-red-600 shadow-xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
											children: "حرج جداً (الآن)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setUrgencyLevel("urgent"),
											className: `py-2 px-2 rounded-xl text-center text-xs font-bold border transition-all ${urgencyLevel === "urgent" ? "bg-amber-600 text-white border-amber-600 shadow-xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
											children: "عاجل اليوم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setUrgencyLevel("normal"),
											className: `py-2 px-2 rounded-xl text-center text-xs font-bold border transition-all ${urgencyLevel === "normal" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
											children: "خلال 24-48 ساعة"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-slate-800 mb-1",
									children: "ملاحظات أو تعليمات للمتبرع (اختياري)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "أي تفاصيل عن القسم أو موعد التبرع أو الاتصال...",
									rows: 2,
									maxLength: 500,
									className: "w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-red-500 text-xs sm:text-sm outline-hidden"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تنويه: يستمر ظهور طلب الدم العاجل لمدة 48 ساعة فقط من وقت الإرسال ثم يختفي تلقائياً لضمان مصداقية وحداثة البلاغات في قعطبة." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex items-center justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsModalOpen(false),
										className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold",
										children: "إلغاء"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submitting,
										className: "px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-red-200 flex items-center gap-1.5 disabled:opacity-50",
										children: submitting ? "جارٍ النشر..." : "نشر الطلب العاجل فوراً"
									})]
								})
							]
						})
					]
				})
			}),
			whatsAppTargetReq && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in",
				onClick: () => setWhatsAppTargetReq(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-100 text-center font-['Cairo',sans-serif]",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-slate-900",
								children: "هل تريد المغادرة إلى واتساب؟"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-600 leading-relaxed font-semibold",
								children: "أنت على وشك مغادرة التطبيق والتواصل عبر واتساب للمساعدة في إنقاذ حالة المريض:"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-rose-50/70 p-3 rounded-2xl border border-rose-100 text-right space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-slate-900",
										children: whatsAppTargetReq.patientName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full",
										children: ["فصيلة ", whatsAppTargetReq.bloodType]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-600 font-bold flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المستشفى:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-800 font-extrabold",
										children: whatsAppTargetReq.hospital
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-600 font-bold flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المسؤول:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-800",
										children: whatsAppTargetReq.contactName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-600 font-bold flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الهاتف:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										dir: "ltr",
										className: "font-mono text-emerald-800 font-extrabold",
										children: whatsAppTargetReq.contactPhone
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const target = whatsAppTargetReq;
									setWhatsAppTargetReq(null);
									confirmWhatsAppNavigation(target);
								},
								className: "flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نعم، الذهاب للواتس" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setWhatsAppTargetReq(null),
								className: "py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			reqToDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-extrabold text-slate-900",
								children: "تأكيد حذف طلب الدم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-500",
								children: [
									"هل أنت متأكد من حذف طلب الدم للمريض ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-slate-800",
										children: [
											"(",
											reqToDelete.patientName,
											")"
										]
									}),
									"؟"
								]
							})]
						}),
						deleteReqError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs p-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold border border-rose-200",
							children: deleteReqError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleDeleteRequestConfirm,
								disabled: isDeletingReq,
								className: "flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 transition-colors active:scale-95 disabled:opacity-50",
								children: isDeletingReq ? "جارٍ الحذف..." : "نعم، حذف الطلب"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setReqToDelete(null);
									setDeleteReqError(null);
								},
								className: "py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitorRestrictionModal, {
				isOpen: showVisitorRestriction,
				onClose: () => setShowVisitorRestriction(false),
				onOpenRegister: () => {
					setShowVisitorRestriction(false);
					onOpenAuth();
				},
				onOpenLogin: () => {
					setShowVisitorRestriction(false);
					onOpenAuth();
				}
			})
		]
	});
};
// src/services/locationService.ts
var LOCATIONS_COLLECTION = "locations";
var subscribeToLocations = (callback) => {
	const q = query(collection(db, LOCATIONS_COLLECTION), orderBy("name", "asc"));
	return onSnapshot(q, (snapshot) => {
		callback(snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})));
	}, (error) => {
		handleFirestoreError(error, OperationType.LIST, LOCATIONS_COLLECTION);
	});
};
var saveLocation = async (name, locationId) => {
	const id = locationId || doc(collection(db, LOCATIONS_COLLECTION)).id;
	const docRef = doc(db, LOCATIONS_COLLECTION, id);
	try {
		await setDoc(docRef, {
			name: name.trim(),
			isDefault: false,
			updatedAt: serverTimestamp()
		}, { merge: true });
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, LOCATIONS_COLLECTION);
	}
};
var deleteLocation = async (locationId) => {
	const docRef = doc(db, LOCATIONS_COLLECTION, locationId);
	try {
		await deleteDoc(docRef);
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, LOCATIONS_COLLECTION);
	}
};
var seedInitialLocations = async () => {
	try {
		if ((await getDocs(collection(db, LOCATIONS_COLLECTION))).empty) for (const locName of COMMON_LOCATIONS) {
			const id = `loc_${Math.random().toString(36).substring(2, 15)}`;
			await setDoc(doc(db, LOCATIONS_COLLECTION, id), {
				name: locName,
				isDefault: true,
				updatedAt: serverTimestamp()
			});
		}
	} catch (e) {
		console.warn("Location seeding skipped:", e);
	}
};
// src/components/DonorRegistration.tsx
var DonorRegistration = ({ onSuccessNavigate, donors, onOpenAuth, editingDonorId, onDeleteDonor }) => {
	const { currentUser, userProfile, activeRole } = useAuth();
	const isAdmin = activeRole === "admin";
	const existingDonor = editingDonorId ? donors.find((d) => d.id === editingDonorId) : currentUser ? donors.find((d) => d.userId === currentUser.uid) : null;
	const cleanDonorPhone = existingDonor?.phone ? existingDonor.phone.replace(/\D/g, "") : "";
	const cleanUserPhone = userProfile?.phone ? userProfile.phone.replace(/\D/g, "") : "";
	const canEdit = Boolean(existingDonor && currentUser && (existingDonor.userId && existingDonor.userId === currentUser.uid || cleanUserPhone.length >= 7 && cleanDonorPhone.length >= 7 && cleanDonorPhone === cleanUserPhone)) || isAdmin;
	const [confirmDeleteModal, setConfirmDeleteModal] = (0, import_react.useState)(false);
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const [deleteError, setDeleteError] = (0, import_react.useState)(null);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [bloodType, setBloodType] = (0, import_react.useState)("O+");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [residence, setResidence] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lastDonationDate, setLastDonationDate] = (0, import_react.useState)("");
	const [isAvailable, setIsAvailable] = (0, import_react.useState)(true);
	const [allowContact, setAllowContact] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [successMessage, setSuccessMessage] = (0, import_react.useState)(null);
	const [isCreatingNew, setIsCreatingNew] = (0, import_react.useState)(false);
	const [locationsList, setLocationsList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		seedInitialLocations();
		const unsub = subscribeToLocations((locs) => {
			setLocationsList(locs.map((l) => l.name));
		});
		return () => unsub();
	}, []);
	const [newLocationInput, setNewLocationInput] = (0, import_react.useState)("");
	const [showLocationAddInput, setShowLocationAddInput] = (0, import_react.useState)(false);
	const handleAddCustomLocation = async () => {
		if (!newLocationInput.trim()) return;
		const clean = newLocationInput.trim();
		try {
			await saveLocation(clean);
			setResidence(clean);
			setNewLocationInput("");
			setShowLocationAddInput(false);
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!editingDonorId && currentUser && donors.some((d) => d.userId === currentUser.uid)) setIsCreatingNew(true);
		else setIsCreatingNew(false);
	}, [
		editingDonorId,
		currentUser,
		donors
	]);
	(0, import_react.useEffect)(() => {
		if (existingDonor && !isCreatingNew) {
			setFullName(existingDonor.fullName);
			setBloodType(existingDonor.bloodType);
			setPhone(existingDonor.phone);
			setResidence(existingDonor.residence);
			setNotes(existingDonor.notes || "");
			setLastDonationDate(existingDonor.lastDonationDate || "");
			setIsAvailable(existingDonor.isAvailable);
			setAllowContact(existingDonor.allowContact);
		} else {
			setFullName("");
			setBloodType("O+");
			setPhone(userProfile?.phone || "");
			setResidence("");
			setNotes("");
			setLastDonationDate("");
			setIsAvailable(true);
			setAllowContact(true);
			if (currentUser && !existingDonor) {
				if (userProfile?.displayName && !userProfile.displayName.startsWith("فاعل خير (")) setFullName(userProfile.displayName);
			}
		}
	}, [
		existingDonor,
		currentUser,
		userProfile,
		isCreatingNew
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);
		if (!currentUser) {
			onOpenAuth();
			return;
		}
		const cleanName = fullName.trim();
		if (cleanName.length < 2) {
			setErrorMessage("يرجى كتابة الاسم الكامل (حرفين على الأقل)");
			return;
		}
		const cleanPhone = sanitizePhone(phone || userProfile?.phone || "");
		if (cleanPhone.length < 7 || cleanPhone.length > 15) {
			setErrorMessage("يرجى إدخال رقم هاتف صحيح");
			return;
		}
		const cleanResidence = residence.trim();
		if (cleanResidence.length < 2) {
			setErrorMessage("يرجى تحديد السكن أو المنطقة الحالية");
			return;
		}
		if (!canEdit && existingDonor && !isCreatingNew) {
			setErrorMessage("عذراً، لا تملك صلاحية تعديل بيانات هذا المتبرع. يُسمح لكل شخص بتعديل بياناته فقط.");
			return;
		}
		const sanitizedPhone = cleanPhone.slice(-9);
		const currentEditingId = !isCreatingNew && existingDonor ? existingDonor.id : null;
		const duplicateDonor = donors.find((d) => {
			if (currentEditingId && d.id === currentEditingId) return false;
			const dClean = d.phone.replace(/\D/g, "").slice(-9);
			return dClean.length >= 7 && dClean === sanitizedPhone;
		});
		if (duplicateDonor && !isAdmin) {
			setErrorMessage(`رقم الهاتف (${cleanPhone}) مسجل بالفعل لمتبرع آخر باسم (${duplicateDonor.fullName}). يُمنع تكرار تسجيل أرقام الهواتف لضمان مصداقية السجل الخيري.`);
			return;
		}
		setLoading(true);
		try {
			const activeUserId = currentUser.uid;
			const savedDonorId = await saveDonorProfile({
				userId: !isCreatingNew && existingDonor && existingDonor.userId ? existingDonor.userId : activeUserId,
				fullName: cleanName,
				bloodType,
				phone: cleanPhone,
				phoneVerified: true,
				residence: cleanResidence,
				notes: notes.trim(),
				lastDonationDate: lastDonationDate.trim(),
				isAvailable,
				allowContact
			}, !isCreatingNew && existingDonor ? existingDonor.id : void 0);
			setSuccessMessage(existingDonor && !isCreatingNew ? isAdmin ? `تم تحديث بيانات المتبرع (${cleanName}) بنجاح بصلاحية مسؤول التطبيق!` : "تم تحديث بيانات المتبرع بنجاح!" : "بارك الله فيك! تم تسجيلك بنجاح وحفظ بياناتك كمتبرع مؤكد.");
			confetti_module_default({
				particleCount: 100,
				spread: 80,
				origin: { y: .6 }
			});
			if (savedDonorId) {
				const syncResult = await syncDonorToGoogleSheets({
					name: cleanName,
					bloodType,
					phone: cleanPhone,
					address: cleanResidence,
					notes: notes.trim(),
					donorId: savedDonorId
				});
				if (syncResult.success) setSuccessMessage(existingDonor && !isCreatingNew ? isAdmin ? `تم تحديث بيانات المتبرع (${cleanName}) بنجاح وبمزامنة الجدول!` : "تم تحديث البيانات بنجاح!" : "بارك الله فيك! تم تسجيلك وحفظ بياناتك بنجاح في التطبيق والجدول.");
				else setErrorMessage(`تم حفظ البيانات في التطبيق بنجاح، ولكن فشلت المزامنة مع Google Sheets: ${syncResult.error}`);
			} else setSuccessMessage(existingDonor && !isCreatingNew ? isAdmin ? `تم تحديث بيانات المتبرع (${cleanName}) بنجاح!` : "تم تحديث البيانات بنجاح!" : "بارك الله فيك! تم تسجيلك بنجاح.");
			setLoading(false);
			setTimeout(() => onSuccessNavigate(), 500);
		} catch (err) {
			console.error("Error saving donor profile:", err);
			setLoading(false);
			setErrorMessage("حدث خطأ أثناء حفظ البيانات. يرجى التأكد من اتصال الإنترنت.");
		}
	};
	if (editingDonorId && existingDonor && !canEdit && !isCreatingNew) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-xl mx-auto p-4 sm:p-6 text-center space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-8 h-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-black text-slate-900",
					children: "تعديل البيانات متاح لصاحب الحساب فقط"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto",
					children: "عذراً، وفقاً لسياسة الخصوصية وأمان سجل المتبرعين، لا يمكن تعديل بيانات متبرع آخر. يُسمح لكل شخص بتعديل بياناته التي أدخلها بنفسه فقط."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 flex flex-col sm:flex-row items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsCreatingNew(true);
							setFullName("");
							setBloodType("O+");
							setPhone(userProfile?.phone || "");
							setResidence("");
							setNotes("");
							setLastDonationDate("");
							setIsAvailable(true);
							setAllowContact(true);
						},
						className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors",
						children: "التسجيل كمتبرع جديد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onSuccessNavigate,
						className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors",
						children: "العودة لقائمة المتبرعين"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl mx-auto space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-linear-to-r from-red-600 to-rose-700 text-white rounded-2xl p-4 sm:p-5 shadow-md shadow-red-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0",
						children: !isCreatingNew && existingDonor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-6 h-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg sm:text-xl font-extrabold tracking-tight",
						children: !isCreatingNew && existingDonor ? "تعديل بيانات المتبرع" : "التسجيل في بنك الدم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-red-100 mt-0.5",
						children: "مديرية قعطبة وضواحيها • سجل موثوق ومحمي للمتبرعين"
					})] })]
				}), existingDonor && !isCreatingNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs bg-white/15 px-3 py-1.5 rounded-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-300 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"أنت مسجل برقم مؤكد (",
							existingDonor.phone,
							"). يمكنك تعديل بياناتك أو تحديث حالة توفرك."
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsCreatingNew(true);
							setFullName("");
							setBloodType("O+");
							setPhone(userProfile?.phone || "");
							setResidence("");
							setNotes("");
							setIsAvailable(true);
							setAllowContact(true);
						},
						className: "text-[11px] bg-red-100 text-red-800 px-3 py-1.5 rounded-lg font-bold hover:bg-red-200 transition-colors",
						children: "+ إضافة متبرع جديد (إضافة أخرى)"
					})]
				})]
			}),
			!currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-6 h-6 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-extrabold text-amber-950",
							children: "تسجيل الدخول مطلوب لحفظ ملف المتبرع الموثوق"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-amber-800 leading-relaxed",
							children: "لضمان عدم استخدام أرقام هواتف غير مؤكدة ولحماية خصوصيتك والسماح لك بتعديل بياناتك لاحقاً، يرجى تسجيل الدخول أو إنشاء حساب برقم هاتفك وكلمة المرور أولاً."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onOpenAuth,
					className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول / إنشاء حساب برقم الهاتف" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs",
				children: [
					errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 shrink-0 text-red-500 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: "تنبيه"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: errorMessage })] })]
					}),
					successMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 shrink-0 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: successMessage
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs sm:text-sm font-bold text-slate-800 mb-1.5",
								children: ["الاسم الكامل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									placeholder: "مثال: صالح محمد القعطبي",
									className: "w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm outline-hidden font-medium",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-slate-400 absolute right-3 top-2.5" })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs sm:text-sm font-bold text-slate-800 mb-1.5",
									children: ["فصيلة الدم ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-4 sm:grid-cols-8 gap-2",
									children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setBloodType(bt),
										className: `py-2.5 rounded-xl text-center font-black text-sm sm:text-base border-2 transition-all active:scale-95 ${bloodType === bt ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200 scale-102" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50/50"}`,
										children: bt
									}, bt))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 mt-1",
									children: "الفصائل المطلوبة: O+، O-، A+، A-، B+، B-، AB+، AB-"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs sm:text-sm font-bold text-slate-800",
										children: ["رقم الهاتف الموثق في الحساب ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }), "رقم مؤكد في Firebase"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
									value: phone || userProfile?.phone || "",
									onChange: setPhone,
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 mt-1",
									children: "يُمنع تكرار رقم الهاتف لمتبرع آخر لضمان مصداقية السجل الخيري."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs sm:text-sm font-bold text-slate-800",
										children: ["السكن الحالي (المنطقة / القرية) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})]
									}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setShowLocationAddInput(!showLocationAddInput),
										className: "text-[11px] font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "w-3.5 h-3.5 text-amber-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة منطقة (وضع المسؤول)" })]
									})]
								}),
								isAdmin && showLocationAddInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 animate-in fade-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-amber-900 block",
										children: "إضافة منطقة جديدة لقائمة قعطبة:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: newLocationInput,
											onChange: (e) => setNewLocationInput(e.target.value),
											placeholder: "اسم المنطقة (مثال: قعطبة - حارة السلام)",
											className: "flex-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs font-bold outline-hidden focus:ring-2 focus:ring-amber-500"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleAddCustomLocation,
											disabled: !newLocationInput.trim(),
											className: "px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-colors disabled:opacity-50 shrink-0",
											children: "حفظ المنطقة"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: residence,
										onChange: (e) => setResidence(e.target.value),
										placeholder: "اكتب السكن أو اختر من المناطق أدناه",
										className: "w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm outline-hidden font-medium",
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5 text-slate-400 absolute right-3 top-2.5" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: locationsList.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setResidence(loc.replace(" (تحديد يدوي)", "")),
										className: `text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${residence === loc ? "bg-red-100 text-red-800 border-red-300 font-bold" : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"}`,
										children: loc
									}, loc))
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-slate-400 mt-2",
									children: [
										"* يمكنك تعديل أو حذف هذه المناطق نهائياً من ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-amber-600",
											children: "لوحة تحكم المسؤول"
										}),
										"."
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs sm:text-sm font-bold text-slate-800 mb-1.5",
								children: "ملاحظات إضافية (اختياري)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "مثلاً: متوفر سيارة للوصول للمستشفى، أفضل وقت للتواصل بعد العصر، آخر تبرع قبل 4 أشهر...",
									rows: 2,
									maxLength: 500,
									className: "w-full pl-3 pr-10 py-2 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm outline-hidden"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-slate-400 absolute right-3 top-2.5" })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تاريخ التبرع / آخر تبرع بالدم (اختياري)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-slate-500 font-normal",
										children: "للتأكد من انقضاء المدة الصحية"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: lastDonationDate,
										onChange: (e) => setLastDonationDate(e.target.value),
										className: "w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm outline-hidden font-medium"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setLastDonationDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
											className: "text-[11px] px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors",
											children: "اليوم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												const d = /* @__PURE__ */ new Date();
												d.setMonth(d.getMonth() - 2);
												setLastDonationDate(d.toISOString().split("T")[0]);
											},
											className: "text-[11px] px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors",
											children: "قبل شهرين"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												const d = /* @__PURE__ */ new Date();
												d.setMonth(d.getMonth() - 4);
												setLastDonationDate(d.toISOString().split("T")[0]);
											},
											className: "text-[11px] px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors",
											children: "قبل 4 أشهر"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setLastDonationDate(""),
											className: "text-[11px] px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors",
											children: "متبرع جديد (لم أتبرع بعد)"
										})
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs sm:text-sm font-bold text-slate-800",
									children: "جاهز للتبرع حالياً"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-slate-500",
									children: "يمكنك إيقاف التفعيل مؤقتاً عند السفر أو المرض"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative inline-flex items-center cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isAvailable,
										onChange: (e) => setIsAvailable(e.target.checked),
										className: "sr-only peer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 p-3 rounded-xl bg-red-50/50 border border-red-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									id: "consent",
									checked: allowContact,
									onChange: (e) => setAllowContact(e.target.checked),
									className: "mt-1 w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500 cursor-pointer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "consent",
									className: "text-xs text-slate-700 leading-relaxed cursor-pointer select-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-900",
											children: "موافقة على التواصل الخيري:"
										}),
										" ",
										"أوافق على إتاحة رقم هاتفي للباحثين عن فصيلة الدم لإنقاذ حياة المحتاجين والحالات الطارئة."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-sm sm:text-base shadow-md shadow-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }) : !currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول برقم الهاتف للمتابعة" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !isCreatingNew && existingDonor ? isAdmin ? `حفظ تعديلات المتبرع (${fullName || existingDonor.fullName}) كمسؤول` : "حفظ تعديلات المتبرع" : "تأكيد التسجيل كمتبرع مؤكد بالدم" })] })
								}), isAdmin && existingDonor && !isCreatingNew && onDeleteDonor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setConfirmDeleteModal(true),
									disabled: loading || isDeleting,
									className: "w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حذف هذا المتبرع نهائياً من السجل (صلاحيات المسؤول)" })]
								})]
							})
						]
					})
				]
			}),
			confirmDeleteModal && existingDonor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-slate-900",
									children: "تأكيد حذف المتبرع"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-600 leading-relaxed",
									children: [
										"هل أنت متأكد من حذف بيانات المتبرع ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-red-600 underline",
											children: existingDonor.fullName
										}),
										" (",
										existingDonor.bloodType,
										") من السجل نهائياً؟"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-400 font-medium",
									children: "بصفتك مسؤول التطبيق، سيتم حذف هذا المتبرع فوراً ولن يظهر في نتائج البحث."
								})
							]
						}),
						deleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold text-center border border-red-200 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 shrink-0 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deleteError })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: async () => {
									if (!onDeleteDonor || !existingDonor) return;
									setIsDeleting(true);
									setDeleteError(null);
									try {
										await onDeleteDonor(existingDonor.id, existingDonor.phone);
										setConfirmDeleteModal(false);
										onSuccessNavigate();
									} catch (err) {
										setDeleteError(err.message || "حدث خطأ أثناء الحذف");
									} finally {
										setIsDeleting(false);
									}
								},
								disabled: isDeleting,
								className: "py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50",
								children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تأكيد الحذف" })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setConfirmDeleteModal(false);
									setDeleteError(null);
								},
								disabled: isDeleting,
								className: "py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors",
								children: "إلغاء"
							})]
						})
					]
				})
			})
		]
	});
};
// src/components/BloodDonationEducationalInfo.tsx
var BloodDonationEducationalInfo = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-4xl mx-auto space-y-4 text-right font-['Cairo',sans-serif] select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white rounded-3xl p-2 sm:p-3 border border-slate-200/90 shadow-sm relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/images/blood_benefits_poster.jpg",
						alt: "فوائد وشروط التبرع بالدم",
						className: "w-full h-auto object-contain rounded-2xl shadow-xs pointer-events-none",
						loading: "eager",
						draggable: false
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base sm:text-lg font-black text-slate-900",
					children: "فوائد وتعليمات التبرع بالدم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500 font-medium mt-0.5",
					children: "الملصق التوعوي الطبي المعتمد • مديرية قعطبة"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-5 h-5 fill-red-600 text-red-600" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 p-6 text-white shadow-xl shadow-red-500/20 border-2 border-red-500/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-12 -left-12 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-center text-center space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black border border-white/20 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4 text-amber-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "وسام العطاء الإنساني" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-amber-300 animate-pulse" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2 flex-wrap drop-shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "«دمك أمانة، وتبرعك وسام حياة»" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-6 h-6 sm:w-7 sm:h-7 fill-white text-white shrink-0 animate-pulse" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm font-bold text-amber-200/95 max-w-md bg-black/15 px-4 py-2 rounded-2xl border border-white/10",
								children: "﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ﴾"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-20 h-0.5 bg-white/30 rounded-full my-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-extrabold text-white",
									children: "شكراً لكل بطل ومتبرع يبادر لإنقاذ الأرواح"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-red-100/90 font-medium",
									children: "تطبيق بنك الدم في مديرية قعطبة - محافظة الضالع"
								})]
							})
						]
					})
				]
			})
		]
	});
};
// src/services/hospitalService.ts
var HOSPITALS_COLLECTION = "hospitals";
var subscribeToHospitals = (callback) => {
	const q = query(collection(db, HOSPITALS_COLLECTION), orderBy("name", "asc"));
	return onSnapshot(q, (snapshot) => {
		callback(snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})));
	}, (error) => {
		handleFirestoreError(error, OperationType.LIST, HOSPITALS_COLLECTION);
	});
};
var saveHospital = async (hospital, hospitalId) => {
	const id = hospitalId || doc(collection(db, HOSPITALS_COLLECTION)).id;
	const docRef = doc(db, HOSPITALS_COLLECTION, id);
	try {
		await setDoc(docRef, {
			...hospital,
			updatedAt: serverTimestamp()
		}, { merge: true });
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, HOSPITALS_COLLECTION);
	}
};
var deleteHospital = async (hospitalId) => {
	const docRef = doc(db, HOSPITALS_COLLECTION, hospitalId);
	try {
		await deleteDoc(docRef);
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, HOSPITALS_COLLECTION);
	}
};
var INITIAL_HOSPITALS = [
	{
		name: "مستشفى قعطبة العام (المركزي)",
		type: "مستشفى حكومي رئيسي",
		address: "المدينة المركزية - قعطبة",
		phone: "+967 773 000 000",
		services: "طوارئ على مدار الساعة، بنك دم، جراحة عامة، رقود"
	},
	{
		name: "مستشفى السلام التخصصي",
		type: "مستشفى أهلي",
		address: "شارع الثلاثين - قعطبة",
		phone: "+967 711 223 344",
		services: "طوارئ، مختبرات متكاملة، عمليات، بنك دم فرعي"
	},
	{
		name: "مستوصف النور الطبي الخيري",
		type: "مركز صحي",
		address: "سوق قعطبة القديم",
		phone: "+967 733 445 566",
		services: "إسعافات أولية، عيادات عامة، فحوصات دم"
	},
	{
		name: "مختبرات قعطبة المركزية",
		type: "مختبر وتحاليل",
		address: "جوار المستشفى العام - قعطبة",
		phone: "+967 700 889 900",
		services: "فصائل الدم، مطابقة الدم، فحوصات شاملة"
	},
	{
		name: "مستشفى الامل التخصصي",
		type: "مستشفى خاص",
		address: "مدخل المدينة - قعطبة",
		phone: "+967 777 112 233",
		services: "طوارئ، قسم عمليات، عناية مركزة، بنك دم"
	}
];
var seedHospitals = async () => {
	for (const hospital of INITIAL_HOSPITALS) await saveHospital(hospital);
};
// src/components/QaetabahHospitalsDirectory.tsx
var QaetabahHospitalsDirectory = ({ isOpen, onClose, isEmbedded = false }) => {
	const { currentUser, userProfile, activeRole } = useAuth();
	const isAdmin = activeRole === "admin";
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [hospitals, setHospitals] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingHospital, setEditingHospital] = (0, import_react.useState)(null);
	const [hospitalForm, setHospitalForm] = (0, import_react.useState)({
		name: "",
		type: "",
		address: "",
		phone: "",
		services: ""
	});
	const [hospitalLoading, setHospitalLoading] = (0, import_react.useState)(false);
	const [adminFeedback, setAdminFeedback] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		setLoading(true);
		const unsub = subscribeToHospitals((data) => {
			setHospitals(data);
			setLoading(false);
		});
		return () => unsub();
	}, [isOpen]);
	const handleSaveHospital = async (e) => {
		e.preventDefault();
		if (!hospitalForm.name.trim() || !hospitalForm.phone.trim()) {
			setAdminFeedback("يرجى ملء اسم المستشفى ورقم الهاتف");
			return;
		}
		setHospitalLoading(true);
		setAdminFeedback(null);
		try {
			await saveHospital({
				name: hospitalForm.name.trim(),
				type: hospitalForm.type.trim() || "مستشفى عام",
				address: hospitalForm.address.trim() || "قعطبة",
				phone: hospitalForm.phone.trim(),
				services: hospitalForm.services.trim() || "طوارئ وبنك دم"
			}, editingHospital?.id);
			setAdminFeedback("تم حفظ بيانات المستشفى بنجاح! ✓");
			setIsFormOpen(false);
			setEditingHospital(null);
			setHospitalForm({
				name: "",
				type: "",
				address: "",
				phone: "",
				services: ""
			});
			setTimeout(() => setAdminFeedback(null), 4e3);
		} catch (err) {
			setAdminFeedback(`خطأ في الحفظ: ${err.message}`);
		} finally {
			setHospitalLoading(false);
		}
	};
	const handleDeleteHospital = async (id, name) => {
		if (!window.confirm(`هل أنت متأكد من حذف (${name})؟`)) return;
		try {
			await deleteHospital(id);
			setAdminFeedback("تم حذف المستشفى بنجاح");
			setTimeout(() => setAdminFeedback(null), 3e3);
		} catch (err) {
			setAdminFeedback(`خطأ في الحذف: ${err.message}`);
		}
	};
	const handleSeed = async () => {
		if (!window.confirm("هل تريد استعادة قائمة مستشفيات قعطبة المعتمدة الافتراضية؟")) return;
		try {
			await seedHospitals();
			setAdminFeedback("تم استعادة المستشفيات الافتراضية بنجاح!");
			setTimeout(() => setAdminFeedback(null), 3e3);
		} catch (err) {
			setAdminFeedback(`خطأ: ${err.message}`);
		}
	};
	if (!isOpen) return null;
	const filteredHospitals = hospitals.filter((h) => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.address.toLowerCase().includes(searchQuery.toLowerCase()) || h.services.toLowerCase().includes(searchQuery.toLowerCase()));
	const directoryContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `bg-white rounded-3xl w-full shadow-lg overflow-hidden border border-slate-200/90 flex flex-col font-['Cairo',sans-serif] ${isEmbedded ? "max-w-4xl mx-auto" : "max-w-lg max-h-[85vh]"}`,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-linear-to-r from-red-600 to-rose-700 px-5 py-4 text-white flex items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-5 h-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-extrabold text-white leading-tight",
						children: "دليل المستشفيات والنقاط الطبية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-red-100 font-medium",
						children: "مديرية قعطبة • مستشفيات وبنوك الدم المعتمدة"
					})] })]
				}), !isEmbedded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}),
			isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs text-amber-900 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أدوات المستشفيات (وضع المسؤول)" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setEditingHospital(null);
							setHospitalForm({
								name: "",
								type: "مستشفى عام",
								address: "قعطبة",
								phone: "",
								services: "طوارئ وبنك دم"
							});
							setIsFormOpen(true);
						},
						className: "px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة مستشفى" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleSeed,
						className: "px-2 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold",
						title: "استعادة المستشفيات الافتراضية",
						children: "استعادة"
					})]
				})]
			}),
			adminFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-bold border-b border-emerald-200 text-center",
				children: adminFeedback
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 bg-slate-50 border-b border-slate-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "ابحث باسم المستشفى، العنوان، أو الخدمات...",
						className: "w-full pl-4 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-hidden focus:ring-2 focus:ring-red-500 shadow-2xs"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 overflow-y-auto space-y-3 grow",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-20 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-8 h-8 text-red-500 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-slate-400 text-center",
						children: "جارٍ جلب بيانات المستشفيات..."
					})]
				}) : filteredHospitals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-10 h-10 text-slate-300 mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-slate-600",
						children: "لا توجد نتائج مطابقة لبحثك"
					})]
				}) : filteredHospitals.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-2.5 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-black text-slate-900",
							children: h.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block mt-0.5 text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-100",
							children: h.type
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${h.phone.replace(/\s+/g, "")}`,
								className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "اتصال" })]
							}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setEditingHospital(h);
										setHospitalForm({
											name: h.name,
											type: h.type,
											address: h.address,
											phone: h.phone,
											services: h.services
										});
										setIsFormOpen(true);
									},
									className: "p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors",
									title: "تعديل المستشفى",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleDeleteHospital(h.id, h.name),
									className: "p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors",
									title: "حذف المستشفى",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 pt-1 border-t border-slate-100 text-xs text-slate-600 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-red-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.address })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-700 font-bold",
								children: h.services
							})]
						})]
					})]
				}, h.id))
			}),
			isFormOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-2 border-b border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-slate-900",
							children: editingHospital ? "تعديل بيانات المستشفى" : "إضافة مستشفى جديد"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsFormOpen(false),
							className: "p-1 rounded-xl text-slate-400 hover:text-slate-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveHospital,
						className: "space-y-3 text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-slate-700 block mb-1",
								children: "اسم المستشفى / المركز:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: hospitalForm.name,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									name: e.target.value
								}),
								placeholder: "مثال: مستشفى السلام التخصصي",
								className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-slate-700 block mb-1",
								children: "التصنيف:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.type,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									type: e.target.value
								}),
								placeholder: "مثال: مستشفى عام / مركز طوارئ",
								className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-slate-700 block mb-1",
								children: "العنوان / المنطقة:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.address,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									address: e.target.value
								}),
								placeholder: "مثال: الشارع العام - قعطبة",
								className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-slate-700 block mb-1",
								children: "رقم الهاتف / الطوارئ:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								dir: "ltr",
								value: hospitalForm.phone,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									phone: e.target.value
								}),
								placeholder: "02-XXXXXX أو 77XXXXXXX",
								className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-slate-700 block mb-1",
								children: "الخدمات المتوفرة:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.services,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									services: e.target.value
								}),
								placeholder: "مثال: طوارئ 24 ساعة، فحص توافق، بنك دم",
								className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: hospitalLoading,
									className: "flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50",
									children: hospitalLoading ? "جارٍ الحفظ..." : "حفظ المستشفى"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsFormOpen(false),
									className: "py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200",
									children: "إلغاء"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500 font-bold",
				children: "🏥 يتم تحديث الدليل الطبي لمديرية قعطبة دورياً لخدمة المرضى والمتبرعين"
			})
		]
	});
	if (isEmbedded) return directoryContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200",
		children: directoryContent
	});
};
// node_modules/@capacitor/synapse/dist/synapse.mjs
function s(t) {
	t.CapacitorUtils.Synapse = new Proxy({}, { get(e, n) {
		return new Proxy({}, { get(w, o) {
			return (c, p, r) => {
				const i = t.Capacitor.Plugins[n];
				if (i === void 0) {
					r(/* @__PURE__ */ new Error(`Capacitor plugin ${n} not found`));
					return;
				}
				if (typeof i[o] != "function") {
					r(/* @__PURE__ */ new Error(`Method ${o} not found in Capacitor plugin ${n}`));
					return;
				}
				(async () => {
					try {
						p(await i[o](c));
					} catch (a) {
						r(a);
					}
				})();
			};
		} });
	} });
}
function u(t) {
	t.CapacitorUtils.Synapse = new Proxy({}, { get(e, n) {
		return t.cordova.plugins[n];
	} });
}
function f(t = !1) {
	typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window));
}
// node_modules/@capacitor/filesystem/dist/esm/definitions.js
var Directory;
(function(Directory) {
	/**
	* The Documents directory.
	* On iOS it's the app's documents directory.
	* Use this directory to store user-generated content.
	* On Android it's the Public Documents folder, so it's accessible from other apps.
	* It's not accessible on Android 10 unless the app enables legacy External Storage
	* by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
	* in the `AndroidManifest.xml`.
	* On Android 11 or newer the app can only access the files/folders the app created.
	*
	* @since 1.0.0
	*/
	Directory["Documents"] = "DOCUMENTS";
	/**
	* The Data directory.
	* On iOS it will use the Documents directory.
	* On Android it's the directory holding application files.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.0.0
	*/
	Directory["Data"] = "DATA";
	/**
	* The Library directory.
	* On iOS it will use the Library directory.
	* On Android it's the directory holding application files.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.1.0
	*/
	Directory["Library"] = "LIBRARY";
	/**
	* The Cache directory.
	* Can be deleted in cases of low memory, so use this directory to write app-specific files.
	* that your app can re-create easily.
	*
	* @since 1.0.0
	*/
	Directory["Cache"] = "CACHE";
	/**
	* The external directory.
	* On iOS it will use the Documents directory.
	* On Android it's the directory on the primary shared/external
	* storage device where the application can place persistent files it owns.
	* These files are internal to the applications, and not typically visible
	* to the user as media.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.0.0
	*/
	Directory["External"] = "EXTERNAL";
	/**
	* The external storage directory.
	* On iOS it will use the Documents directory.
	* On Android it's the primary shared/external storage directory.
	* It's not accessible on Android 10 unless the app enables legacy External Storage
	* by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
	* in the `AndroidManifest.xml`.
	* It's not accessible on Android 11 or newer.
	*
	* @since 1.0.0
	*/
	Directory["ExternalStorage"] = "EXTERNAL_STORAGE";
	/**
	* The external cache directory.
	* On iOS it will use the Documents directory.
	* On Android it's the primary shared/external cache.
	*
	* @since 7.1.0
	*/
	Directory["ExternalCache"] = "EXTERNAL_CACHE";
	/**
	* The Library directory without cloud backup. Used in iOS.
	* On Android it's the directory holding application files.
	*
	* @since 7.1.0
	*/
	Directory["LibraryNoCloud"] = "LIBRARY_NO_CLOUD";
	/**
	* A temporary directory for iOS.
	* On Android it's the directory holding the application cache.
	*
	* @since 7.1.0
	*/
	Directory["Temporary"] = "TEMPORARY";
})(Directory || (Directory = {}));
var Encoding;
(function(Encoding) {
	/**
	* Eight-bit UCS Transformation Format
	*
	* @since 1.0.0
	*/
	Encoding["UTF8"] = "utf8";
	/**
	* Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the
	* Unicode character set
	* This encoding is only supported on Android.
	*
	* @since 1.0.0
	*/
	Encoding["ASCII"] = "ascii";
	/**
	* Sixteen-bit UCS Transformation Format, byte order identified by an
	* optional byte-order mark
	* This encoding is only supported on Android.
	*
	* @since 1.0.0
	*/
	Encoding["UTF16"] = "utf16";
})(Encoding || (Encoding = {}));
// node_modules/@capacitor/filesystem/dist/esm/index.js
var Filesystem = registerPlugin("Filesystem", { web: () => __vitePreload(() => import("./web-BEE279sx.js").then((m) => new m.FilesystemWeb()), []) });
f();
-(Math.pow(10, 8) * 24 * 60 * 60 * 1e3);
/**
* @constant
* @name millisecondsInWeek
* @summary Milliseconds in 1 week.
*/
var millisecondsInWeek = 6048e5;
/**
* @constant
* @name millisecondsInDay
* @summary Milliseconds in 1 day.
*/
var millisecondsInDay = 864e5;
/**
* @constant
* @name constructFromSymbol
* @summary Symbol enabling Date extensions to inherit properties from the reference date.
*
* The symbol is used to enable the `constructFrom` function to construct a date
* using a reference date and a value. It allows to transfer extra properties
* from the reference date to the new date. It's useful for extensions like
* [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
* a constructor argument.
*/
var constructFromSymbol = Symbol.for("constructDateFrom");
// node_modules/date-fns/constructFrom.js
/**
* @name constructFrom
* @category Generic Helpers
* @summary Constructs a date using the reference date and the value
*
* @description
* The function constructs a new date using the constructor from the reference
* date and the given value. It helps to build generic functions that accept
* date extensions.
*
* It defaults to `Date` if the passed reference date is a number or a string.
*
* Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The reference date to take constructor from
* @param value - The value to create the date
*
* @returns Date initialized using the given date and value
*
* @example
* import { constructFrom } from "./constructFrom/date-fns";
*
* // A function that clones a date preserving the original type
* function cloneDate<DateType extends Date>(date: DateType): DateType {
*   return constructFrom(
*     date, // Use constructor from the given date
*     date.getTime() // Use the date value to create a new date
*   );
* }
*/
function constructFrom(date, value) {
	if (typeof date === "function") return date(value);
	if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
	if (date instanceof Date) return new date.constructor(value);
	return new Date(value);
}
// node_modules/date-fns/toDate.js
/**
* @name toDate
* @category Common Helpers
* @summary Convert the given argument to an instance of Date.
*
* @description
* Convert the given argument to an instance of Date.
*
* If the argument is an instance of Date, the function returns its clone.
*
* If the argument is a number, it is treated as a timestamp.
*
* If the argument is none of the above, the function returns Invalid Date.
*
* Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param argument - The value to convert
*
* @returns The parsed date in the local time zone
*
* @example
* // Clone the date:
* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
* //=> Tue Feb 11 2014 11:30:30
*
* @example
* // Convert the timestamp to date:
* const result = toDate(1392098430000)
* //=> Tue Feb 11 2014 11:30:30
*/
function toDate(argument, context) {
	return constructFrom(context || argument, argument);
}
// node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
// node_modules/date-fns/startOfWeek.js
/**
* The {@link startOfWeek} function options.
*/
/**
* @name startOfWeek
* @category Week Helpers
* @summary Return the start of a week for the given date.
*
* @description
* Return the start of a week for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week
*
* @example
* // The start of a week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Sun Aug 31 2014 00:00:00
*
* @example
* // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfWeek(date, options) {
	const defaultOptions = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
// node_modules/date-fns/startOfISOWeek.js
/**
* The {@link startOfISOWeek} function options.
*/
/**
* @name startOfISOWeek
* @category ISO Week Helpers
* @summary Return the start of an ISO week for the given date.
*
* @description
* Return the start of an ISO week for the given date.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week
*
* @example
* // The start of an ISO week for 2 September 2014 11:55:00:
* const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfISOWeek(date, options) {
	return startOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
// node_modules/date-fns/getISOWeekYear.js
/**
* The {@link getISOWeekYear} function options.
*/
/**
* @name getISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Get the ISO week-numbering year of the given date.
*
* @description
* Get the ISO week-numbering year of the given date,
* which always starts 3 days before the year's first Thursday.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
*
* @returns The ISO week-numbering year
*
* @example
* // Which ISO-week numbering year is 2 January 2005?
* const result = getISOWeekYear(new Date(2005, 0, 2))
* //=> 2004
*/
function getISOWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
	fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
	const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
	fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
	if (_date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (_date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
/**
* Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
* They usually appear for dates that denote time before the timezones were introduced
* (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
* and GMT+01:00:00 after that date)
*
* Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
* which would lead to incorrect calculations.
*
* This function returns the timezone offset in milliseconds that takes seconds in account.
*/
function getTimezoneOffsetInMilliseconds(date) {
	const _date = toDate(date);
	const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
	utcDate.setUTCFullYear(_date.getFullYear());
	return +date - +utcDate;
}
// node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
	const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
	return dates.map(normalize);
}
// node_modules/date-fns/startOfDay.js
/**
* The {@link startOfDay} function options.
*/
/**
* @name startOfDay
* @category Day Helpers
* @summary Return the start of a day for the given date.
*
* @description
* Return the start of a day for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a day
*
* @example
* // The start of a day for 2 September 2014 11:55:00:
* const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 02 2014 00:00:00
*/
function startOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
// node_modules/date-fns/differenceInCalendarDays.js
/**
* The {@link differenceInCalendarDays} function options.
*/
/**
* @name differenceInCalendarDays
* @category Day Helpers
* @summary Get the number of calendar days between the given dates.
*
* @description
* Get the number of calendar days between the given dates. This means that the times are removed
* from the dates and then the difference in days is calculated.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - The options object
*
* @returns The number of calendar days
*
* @example
* // How many calendar days are between
* // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
* const result = differenceInCalendarDays(
*   new Date(2012, 6, 2, 0, 0),
*   new Date(2011, 6, 2, 23, 0)
* )
* //=> 366
* // How many calendar days are between
* // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
* const result = differenceInCalendarDays(
*   new Date(2011, 6, 3, 0, 1),
*   new Date(2011, 6, 2, 23, 59)
* )
* //=> 1
*/
function differenceInCalendarDays(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const laterStartOfDay = startOfDay(laterDate_);
	const earlierStartOfDay = startOfDay(earlierDate_);
	const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
	const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
	return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
// node_modules/date-fns/startOfISOWeekYear.js
/**
* The {@link startOfISOWeekYear} function options.
*/
/**
* @name startOfISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Return the start of an ISO week-numbering year for the given date.
*
* @description
* Return the start of an ISO week-numbering year,
* which always starts 3 days before the year's first Thursday.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week-numbering year
*
* @example
* // The start of an ISO week-numbering year for 2 July 2005:
* const result = startOfISOWeekYear(new Date(2005, 6, 2))
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfISOWeekYear(date, options) {
	const year = getISOWeekYear(date, options);
	const fourthOfJanuary = constructFrom(options?.in || date, 0);
	fourthOfJanuary.setFullYear(year, 0, 4);
	fourthOfJanuary.setHours(0, 0, 0, 0);
	return startOfISOWeek(fourthOfJanuary);
}
// node_modules/date-fns/isDate.js
/**
* @name isDate
* @category Common Helpers
* @summary Is the given value a date?
*
* @description
* Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
*
* @param value - The value to check
*
* @returns True if the given value is a date
*
* @example
* // For a valid date:
* const result = isDate(new Date())
* //=> true
*
* @example
* // For an invalid date:
* const result = isDate(new Date(NaN))
* //=> true
*
* @example
* // For some value:
* const result = isDate('2014-02-31')
* //=> false
*
* @example
* // For an object:
* const result = isDate({})
* //=> false
*/
function isDate(value) {
	return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
// node_modules/date-fns/isValid.js
/**
* @name isValid
* @category Common Helpers
* @summary Is the given date valid?
*
* @description
* Returns false if argument is Invalid Date and true otherwise.
* Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
* Invalid Date is a Date, whose time value is NaN.
*
* Time value of Date: http://es5.github.io/#x15.9.1.1
*
* @param date - The date to check
*
* @returns The date is valid
*
* @example
* // For the valid date:
* const result = isValid(new Date(2014, 1, 31))
* //=> true
*
* @example
* // For the value, convertible into a date:
* const result = isValid(1393804800000)
* //=> true
*
* @example
* // For the invalid date:
* const result = isValid(new Date(''))
* //=> false
*/
function isValid(date) {
	return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
// node_modules/date-fns/startOfYear.js
/**
* The {@link startOfYear} function options.
*/
/**
* @name startOfYear
* @category Year Helpers
* @summary Return the start of a year for the given date.
*
* @description
* Return the start of a year for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a year
*
* @example
* // The start of a year for 2 September 2014 11:55:00:
* const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
* //=> Wed Jan 01 2014 00:00:00
*/
function startOfYear(date, options) {
	const date_ = toDate(date, options?.in);
	date_.setFullYear(date_.getFullYear(), 0, 1);
	date_.setHours(0, 0, 0, 0);
	return date_;
}
// node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale$1 = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
var formatDistance$1 = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale$1[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", count.toString());
	if (options?.addSuffix) {
		if (options.comparison && options.comparison > 0) return "in " + result;
		else return result + " ago";
	}
	return result;
};
// node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
var formatLong$1 = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
// node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale$1 = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
var formatRelative$1 = (token, _date, _baseDate, _options) => formatRelativeLocale$1[token];
// node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
* The localize function argument callback which allows to convert raw value to
* the actual type.
*
* @param value - The value to convert
*
* @returns The converted value
*/
/**
* The map of localized values for each width.
*/
/**
* The index type of the locale unit value. It types conversion of units of
* values that don't start at 0 (i.e. quarters).
*/
/**
* Converts the unit value to the tuple of values.
*/
/**
* The tuple of localized era values. The first element represents BC,
* the second element represents AD.
*/
/**
* The tuple of localized quarter values. The first element represents Q1.
*/
/**
* The tuple of localized day values. The first element represents Sunday.
*/
/**
* The tuple of localized month values. The first element represents January.
*/
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = options?.context ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = options?.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = options?.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
// node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues$1 = {
	narrow: ["B", "A"],
	abbreviated: ["BC", "AD"],
	wide: ["Before Christ", "Anno Domini"]
};
var quarterValues$1 = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	wide: [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	]
};
var monthValues$1 = {
	narrow: [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	wide: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
};
var dayValues$1 = {
	narrow: [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	short: [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	abbreviated: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	wide: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
};
var dayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	}
};
var formattingDayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	}
};
var ordinalNumber$1 = (dirtyNumber, _options) => {
	const number = Number(dirtyNumber);
	const rem100 = number % 100;
	if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
		case 1: return number + "st";
		case 2: return number + "nd";
		case 3: return number + "rd";
	}
	return number + "th";
};
var localize$1 = {
	ordinalNumber: ordinalNumber$1,
	era: buildLocalizeFn({
		values: eraValues$1,
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: quarterValues$1,
		defaultWidth: "wide",
		argumentCallback: (quarter) => quarter - 1
	}),
	month: buildLocalizeFn({
		values: monthValues$1,
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: dayValues$1,
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: dayPeriodValues$1,
		defaultWidth: "wide",
		formattingValues: formattingDayPeriodValues$1,
		defaultFormattingWidth: "wide"
	})
};
// node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
// node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
// node_modules/date-fns/locale/en-US.js
/**
* @category Locales
* @summary English locale (United States).
* @language English
* @iso-639-2 eng
* @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
* @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
*/
var enUS = {
	code: "en-US",
	formatDistance: formatDistance$1,
	formatLong: formatLong$1,
	formatRelative: formatRelative$1,
	localize: localize$1,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
// node_modules/date-fns/getDayOfYear.js
/**
* The {@link getDayOfYear} function options.
*/
/**
* @name getDayOfYear
* @category Day Helpers
* @summary Get the day of the year of the given date.
*
* @description
* Get the day of the year of the given date.
*
* @param date - The given date
* @param options - The options
*
* @returns The day of year
*
* @example
* // Which day of the year is 2 July 2014?
* const result = getDayOfYear(new Date(2014, 6, 2))
* //=> 183
*/
function getDayOfYear(date, options) {
	const _date = toDate(date, options?.in);
	return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
}
// node_modules/date-fns/getISOWeek.js
/**
* The {@link getISOWeek} function options.
*/
/**
* @name getISOWeek
* @category ISO Week Helpers
* @summary Get the ISO week of the given date.
*
* @description
* Get the ISO week of the given date.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
* @param options - The options
*
* @returns The ISO week
*
* @example
* // Which week of the ISO-week numbering year is 2 January 2005?
* const result = getISOWeek(new Date(2005, 0, 2))
* //=> 53
*/
function getISOWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
	return Math.round(diff / millisecondsInWeek) + 1;
}
// node_modules/date-fns/getWeekYear.js
/**
* The {@link getWeekYear} function options.
*/
/**
* @name getWeekYear
* @category Week-Numbering Year Helpers
* @summary Get the local week-numbering year of the given date.
*
* @description
* Get the local week-numbering year of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options.
*
* @returns The local week-numbering year
*
* @example
* // Which week numbering year is 26 December 2004 with the default settings?
* const result = getWeekYear(new Date(2004, 11, 26))
* //=> 2005
*
* @example
* // Which week numbering year is 26 December 2004 if week starts on Saturday?
* const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
* //=> 2004
*
* @example
* // Which week numbering year is 26 December 2004 if the first week contains 4 January?
* const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
* //=> 2004
*/
function getWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
	firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
	const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
	firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
	if (+_date >= +startOfNextYear) return year + 1;
	else if (+_date >= +startOfThisYear) return year;
	else return year - 1;
}
// node_modules/date-fns/startOfWeekYear.js
/**
* The {@link startOfWeekYear} function options.
*/
/**
* @name startOfWeekYear
* @category Week-Numbering Year Helpers
* @summary Return the start of a local week-numbering year for the given date.
*
* @description
* Return the start of a local week-numbering year.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week-numbering year
*
* @example
* // The start of an a week-numbering year for 2 July 2005 with default settings:
* const result = startOfWeekYear(new Date(2005, 6, 2))
* //=> Sun Dec 26 2004 00:00:00
*
* @example
* // The start of a week-numbering year for 2 July 2005
* // if Monday is the first day of week
* // and 4 January is always in the first week of the year:
* const result = startOfWeekYear(new Date(2005, 6, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfWeekYear(date, options) {
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const year = getWeekYear(date, options);
	const firstWeek = constructFrom(options?.in || date, 0);
	firstWeek.setFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setHours(0, 0, 0, 0);
	return startOfWeek(firstWeek, options);
}
// node_modules/date-fns/getWeek.js
/**
* The {@link getWeek} function options.
*/
/**
* @name getWeek
* @category Week Helpers
* @summary Get the local week index of the given date.
*
* @description
* Get the local week index of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options
*
* @returns The week
*
* @example
* // Which week of the local week numbering year is 2 January 2005 with default options?
* const result = getWeek(new Date(2005, 0, 2))
* //=> 2
*
* @example
* // Which week of the local week numbering year is 2 January 2005,
* // if Monday is the first day of the week,
* // and the first week of the year always contains 4 January?
* const result = getWeek(new Date(2005, 0, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> 53
*/
function getWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
	return Math.round(diff / millisecondsInWeek) + 1;
}
// node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
	return (number < 0 ? "-" : "") + Math.abs(number).toString().padStart(targetLength, "0");
}
// node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
	y(date, token) {
		const signedYear = date.getFullYear();
		const year = signedYear > 0 ? signedYear : 1 - signedYear;
		return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
	},
	M(date, token) {
		const month = date.getMonth();
		return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
	},
	d(date, token) {
		return addLeadingZeros(date.getDate(), token.length);
	},
	a(date, token) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return dayPeriodEnumValue.toUpperCase();
			case "aaa": return dayPeriodEnumValue;
			case "aaaaa": return dayPeriodEnumValue[0];
			default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
		}
	},
	h(date, token) {
		return addLeadingZeros(date.getHours() % 12 || 12, token.length);
	},
	H(date, token) {
		return addLeadingZeros(date.getHours(), token.length);
	},
	m(date, token) {
		return addLeadingZeros(date.getMinutes(), token.length);
	},
	s(date, token) {
		return addLeadingZeros(date.getSeconds(), token.length);
	},
	S(date, token) {
		const numberOfDigits = token.length;
		const milliseconds = date.getMilliseconds();
		return addLeadingZeros(Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
	}
};
// node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
var formatters = {
	G: function(date, token, localize) {
		const era = date.getFullYear() > 0 ? 1 : 0;
		switch (token) {
			case "G":
			case "GG":
			case "GGG": return localize.era(era, { width: "abbreviated" });
			case "GGGGG": return localize.era(era, { width: "narrow" });
			default: return localize.era(era, { width: "wide" });
		}
	},
	y: function(date, token, localize) {
		if (token === "yo") {
			const signedYear = date.getFullYear();
			const year = signedYear > 0 ? signedYear : 1 - signedYear;
			return localize.ordinalNumber(year, { unit: "year" });
		}
		return lightFormatters.y(date, token);
	},
	Y: function(date, token, localize, options) {
		const signedWeekYear = getWeekYear(date, options);
		const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
		if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
		if (token === "Yo") return localize.ordinalNumber(weekYear, { unit: "year" });
		return addLeadingZeros(weekYear, token.length);
	},
	R: function(date, token) {
		return addLeadingZeros(getISOWeekYear(date), token.length);
	},
	u: function(date, token) {
		return addLeadingZeros(date.getFullYear(), token.length);
	},
	Q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "Q": return String(quarter);
			case "QQ": return addLeadingZeros(quarter, 2);
			case "Qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "QQQ": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return localize.quarter(quarter, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "q": return String(quarter);
			case "qq": return addLeadingZeros(quarter, 2);
			case "qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "qqq": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return localize.quarter(quarter, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "M":
			case "MM": return lightFormatters.M(date, token);
			case "Mo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "MMM": return localize.month(month, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return localize.month(month, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "L": return String(month + 1);
			case "LL": return addLeadingZeros(month + 1, 2);
			case "Lo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "LLL": return localize.month(month, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return localize.month(month, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(date, token, localize, options) {
		const week = getWeek(date, options);
		if (token === "wo") return localize.ordinalNumber(week, { unit: "week" });
		return addLeadingZeros(week, token.length);
	},
	I: function(date, token, localize) {
		const isoWeek = getISOWeek(date);
		if (token === "Io") return localize.ordinalNumber(isoWeek, { unit: "week" });
		return addLeadingZeros(isoWeek, token.length);
	},
	d: function(date, token, localize) {
		if (token === "do") return localize.ordinalNumber(date.getDate(), { unit: "date" });
		return lightFormatters.d(date, token);
	},
	D: function(date, token, localize) {
		const dayOfYear = getDayOfYear(date);
		if (token === "Do") return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
		return addLeadingZeros(dayOfYear, token.length);
	},
	E: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		switch (token) {
			case "E":
			case "EE":
			case "EEE": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "e": return String(localDayOfWeek);
			case "ee": return addLeadingZeros(localDayOfWeek, 2);
			case "eo": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "eee": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "c": return String(localDayOfWeek);
			case "cc": return addLeadingZeros(localDayOfWeek, token.length);
			case "co": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "ccc": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return localize.day(dayOfWeek, {
				width: "short",
				context: "standalone"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
		switch (token) {
			case "i": return String(isoDayOfWeek);
			case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
			case "io": return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
			case "iii": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(date, token, localize) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
		else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
		else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "b":
			case "bb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
		else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
		else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
		else dayPeriodEnumValue = dayPeriodEnum.night;
		switch (token) {
			case "B":
			case "BB":
			case "BBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(date, token, localize) {
		if (token === "ho") {
			let hours = date.getHours() % 12;
			if (hours === 0) hours = 12;
			return localize.ordinalNumber(hours, { unit: "hour" });
		}
		return lightFormatters.h(date, token);
	},
	H: function(date, token, localize) {
		if (token === "Ho") return localize.ordinalNumber(date.getHours(), { unit: "hour" });
		return lightFormatters.H(date, token);
	},
	K: function(date, token, localize) {
		const hours = date.getHours() % 12;
		if (token === "Ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	k: function(date, token, localize) {
		let hours = date.getHours();
		if (hours === 0) hours = 24;
		if (token === "ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	m: function(date, token, localize) {
		if (token === "mo") return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
		return lightFormatters.m(date, token);
	},
	s: function(date, token, localize) {
		if (token === "so") return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
		return lightFormatters.s(date, token);
	},
	S: function(date, token) {
		return lightFormatters.S(date, token);
	},
	X: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		if (timezoneOffset === 0) return "Z";
		switch (token) {
			case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "XXXX":
			case "XX": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	x: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "xxxx":
			case "xx": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	O: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	z: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	t: function(date, token, _localize) {
		return addLeadingZeros(Math.trunc(+date / 1e3), token.length);
	},
	T: function(date, token, _localize) {
		return addLeadingZeros(+date, token.length);
	}
};
function formatTimezoneShort(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = Math.trunc(absOffset / 60);
	const minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
	const minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
// node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "P": return formatLong.date({ width: "short" });
		case "PP": return formatLong.date({ width: "medium" });
		case "PPP": return formatLong.date({ width: "long" });
		default: return formatLong.date({ width: "full" });
	}
};
var timeLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "p": return formatLong.time({ width: "short" });
		case "pp": return formatLong.time({ width: "medium" });
		case "ppp": return formatLong.time({ width: "long" });
		default: return formatLong.time({ width: "full" });
	}
};
var dateTimeLongFormatter = (pattern, formatLong) => {
	const matchResult = pattern.match(/(P+)(p+)?/) || [];
	const datePattern = matchResult[1];
	const timePattern = matchResult[2];
	if (!timePattern) return dateLongFormatter(pattern, formatLong);
	let dateTimeFormat;
	switch (datePattern) {
		case "P":
			dateTimeFormat = formatLong.dateTime({ width: "short" });
			break;
		case "PP":
			dateTimeFormat = formatLong.dateTime({ width: "medium" });
			break;
		case "PPP":
			dateTimeFormat = formatLong.dateTime({ width: "long" });
			break;
		default: dateTimeFormat = formatLong.dateTime({ width: "full" });
	}
	return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
	p: timeLongFormatter,
	P: dateTimeLongFormatter
};
// node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(token) {
	return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
	return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format, input) {
	const _message = message(token, format, input);
	console.warn(_message);
	if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format, input) {
	const subject = token[0] === "Y" ? "years" : "days of the month";
	return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
// node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
* The {@link format} function options.
*/
/**
* @name format
* @alias formatDate
* @category Common Helpers
* @summary Format the date.
*
* @description
* Return the formatted date string in the given format. The result may vary by locale.
*
* > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
* > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* The characters wrapped between two single quotes characters (') are escaped.
* Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
* (see the last example)
*
* Format of the string is based on Unicode Technical Standard #35:
* https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* with a few additions (see note 7 below the table).
*
* Accepted patterns:
* | Unit                            | Pattern | Result examples                   | Notes |
* |---------------------------------|---------|-----------------------------------|-------|
* | Era                             | G..GGG  | AD, BC                            |       |
* |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
* |                                 | GGGGG   | A, B                              |       |
* | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
* |                                 | yy      | 44, 01, 00, 17                    | 5     |
* |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
* |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
* |                                 | yyyyy   | ...                               | 3,5   |
* | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
* |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
* |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
* |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
* |                                 | YYYYY   | ...                               | 3,5   |
* | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
* |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
* |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
* |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
* |                                 | RRRRR   | ...                               | 3,5,7 |
* | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
* |                                 | uu      | -43, 01, 1900, 2017               | 5     |
* |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
* |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
* |                                 | uuuuu   | ...                               | 3,5   |
* | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
* |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | QQ      | 01, 02, 03, 04                    |       |
* |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
* |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
* | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
* |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | qq      | 01, 02, 03, 04                    |       |
* |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
* |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
* | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
* |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | MM      | 01, 02, ..., 12                   |       |
* |                                 | MMM     | Jan, Feb, ..., Dec                |       |
* |                                 | MMMM    | January, February, ..., December  | 2     |
* |                                 | MMMMM   | J, F, ..., D                      |       |
* | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
* |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | LL      | 01, 02, ..., 12                   |       |
* |                                 | LLL     | Jan, Feb, ..., Dec                |       |
* |                                 | LLLL    | January, February, ..., December  | 2     |
* |                                 | LLLLL   | J, F, ..., D                      |       |
* | Local week of year              | w       | 1, 2, ..., 53                     |       |
* |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | ww      | 01, 02, ..., 53                   |       |
* | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
* |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | II      | 01, 02, ..., 53                   | 7     |
* | Day of month                    | d       | 1, 2, ..., 31                     |       |
* |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
* |                                 | dd      | 01, 02, ..., 31                   |       |
* | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
* |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
* |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
* |                                 | DDD     | 001, 002, ..., 365, 366           |       |
* |                                 | DDDD    | ...                               | 3     |
* | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
* |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
* |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
* |                                 | ii      | 01, 02, ..., 07                   | 7     |
* |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
* |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
* |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
* |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
* | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
* |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | ee      | 02, 03, ..., 01                   |       |
* |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | eeeee   | M, T, W, T, F, S, S               |       |
* |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
* |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | cc      | 02, 03, ..., 01                   |       |
* |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | ccccc   | M, T, W, T, F, S, S               |       |
* |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | AM, PM                          | a..aa   | AM, PM                            |       |
* |                                 | aaa     | am, pm                            |       |
* |                                 | aaaa    | a.m., p.m.                        | 2     |
* |                                 | aaaaa   | a, p                              |       |
* | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
* |                                 | bbb     | am, pm, noon, midnight            |       |
* |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
* |                                 | bbbbb   | a, p, n, mi                       |       |
* | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
* |                                 | BBBB    | at night, in the morning, ...     | 2     |
* |                                 | BBBBB   | at night, in the morning, ...     |       |
* | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
* |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
* |                                 | hh      | 01, 02, ..., 11, 12               |       |
* | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
* |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
* |                                 | HH      | 00, 01, 02, ..., 23               |       |
* | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
* |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
* |                                 | KK      | 01, 02, ..., 11, 00               |       |
* | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
* |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
* |                                 | kk      | 24, 01, 02, ..., 23               |       |
* | Minute                          | m       | 0, 1, ..., 59                     |       |
* |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
* |                                 | mm      | 00, 01, ..., 59                   |       |
* | Second                          | s       | 0, 1, ..., 59                     |       |
* |                                 | so      | 0th, 1st, ..., 59th               | 7     |
* |                                 | ss      | 00, 01, ..., 59                   |       |
* | Fraction of second              | S       | 0, 1, ..., 9                      |       |
* |                                 | SS      | 00, 01, ..., 99                   |       |
* |                                 | SSS     | 000, 001, ..., 999                |       |
* |                                 | SSSS    | ...                               | 3     |
* | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
* |                                 | XX      | -0800, +0530, Z                   |       |
* |                                 | XXX     | -08:00, +05:30, Z                 |       |
* |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
* |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
* | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
* |                                 | xx      | -0800, +0530, +0000               |       |
* |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
* |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
* |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
* | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
* |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
* | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
* |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
* | Seconds timestamp               | t       | 512969520                         | 7     |
* |                                 | tt      | ...                               | 3,7   |
* | Milliseconds timestamp          | T       | 512969520900                      | 7     |
* |                                 | TT      | ...                               | 3,7   |
* | Long localized date             | P       | 04/29/1453                        | 7     |
* |                                 | PP      | Apr 29, 1453                      | 7     |
* |                                 | PPP     | April 29th, 1453                  | 7     |
* |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
* | Long localized time             | p       | 12:00 AM                          | 7     |
* |                                 | pp      | 12:00:00 AM                       | 7     |
* |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
* |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
* | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
* |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
* |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
* |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
* Notes:
* 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
*    are the same as "stand-alone" units, but are different in some languages.
*    "Formatting" units are declined according to the rules of the language
*    in the context of a date. "Stand-alone" units are always nominative singular:
*
*    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
*
*    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
*
* 2. Any sequence of the identical letters is a pattern, unless it is escaped by
*    the single quote characters (see below).
*    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
*    the output will be the same as default pattern for this unit, usually
*    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
*    are marked with "2" in the last column of the table.
*
*    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
*
*    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
*
* 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
*    The output will be padded with zeros to match the length of the pattern.
*
*    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
*
* 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
*    These tokens represent the shortest form of the quarter.
*
* 5. The main difference between `y` and `u` patterns are B.C. years:
*
*    | Year | `y` | `u` |
*    |------|-----|-----|
*    | AC 1 |   1 |   1 |
*    | BC 1 |   1 |   0 |
*    | BC 2 |   2 |  -1 |
*
*    Also `yy` always returns the last two digits of a year,
*    while `uu` pads single digit years to 2 characters and returns other years unchanged:
*
*    | Year | `yy` | `uu` |
*    |------|------|------|
*    | 1    |   01 |   01 |
*    | 14   |   14 |   14 |
*    | 376  |   76 |  376 |
*    | 1453 |   53 | 1453 |
*
*    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
*    except local week-numbering years are dependent on `options.weekStartsOn`
*    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
*    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
*
* 6. Specific non-location timezones are currently unavailable in `date-fns`,
*    so right now these tokens fall back to GMT timezones.
*
* 7. These patterns are not in the Unicode Technical Standard #35:
*    - `i`: ISO day of week
*    - `I`: ISO week of year
*    - `R`: ISO week-numbering year
*    - `t`: seconds timestamp
*    - `T`: milliseconds timestamp
*    - `o`: ordinal number modifier
*    - `P`: long localized date
*    - `p`: long localized time
*
* 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
*    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
*    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* @param date - The original date
* @param format - The string of tokens
* @param options - An object with options
*
* @returns The formatted date string
*
* @throws `date` must not be Invalid Date
* @throws `options.locale` must contain `localize` property
* @throws `options.locale` must contain `formatLong` property
* @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws format string contains an unescaped latin alphabet character
*
* @example
* // Represent 11 February 2014 in middle-endian format:
* const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
* //=> '02/11/2014'
*
* @example
* // Represent 2 July 2014 in Esperanto:
* import { eoLocale } from 'date-fns/locale/eo'
* const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
*   locale: eoLocale
* })
* //=> '2-a de julio 2014'
*
* @example
* // Escape string by single quote characters:
* const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
* //=> "3 o'clock"
*/
function format(date, formatStr, options) {
	const defaultOptions = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions.locale ?? enUS;
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const originalDate = toDate(date, options?.in);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
		const firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			const longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map((substring) => {
		if (substring === "''") return {
			isToken: false,
			value: "'"
		};
		const firstCharacter = substring[0];
		if (firstCharacter === "'") return {
			isToken: false,
			value: cleanEscapedString(substring)
		};
		if (formatters[firstCharacter]) return {
			isToken: true,
			value: substring
		};
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return {
			isToken: false,
			value: substring
		};
	});
	if (locale.localize.preprocessor) parts = locale.localize.preprocessor(originalDate, parts);
	const formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale
	};
	return parts.map((part) => {
		if (!part.isToken) return part.value;
		const token = part.value;
		if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) warnOrThrowProtectedError(token, formatStr, String(date));
		const formatter = formatters[token[0]];
		return formatter(originalDate, token, locale.localize, formatterOptions);
	}).join("");
}
function cleanEscapedString(input) {
	const matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
// node_modules/date-fns/locale/ar/_lib/formatDistance.js
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "أقل من ثانية",
		two: "أقل من ثانيتين",
		threeToTen: "أقل من {{count}} ثواني",
		other: "أقل من {{count}} ثانية"
	},
	xSeconds: {
		one: "ثانية واحدة",
		two: "ثانيتان",
		threeToTen: "{{count}} ثواني",
		other: "{{count}} ثانية"
	},
	halfAMinute: "نصف دقيقة",
	lessThanXMinutes: {
		one: "أقل من دقيقة",
		two: "أقل من دقيقتين",
		threeToTen: "أقل من {{count}} دقائق",
		other: "أقل من {{count}} دقيقة"
	},
	xMinutes: {
		one: "دقيقة واحدة",
		two: "دقيقتان",
		threeToTen: "{{count}} دقائق",
		other: "{{count}} دقيقة"
	},
	aboutXHours: {
		one: "ساعة واحدة تقريباً",
		two: "ساعتين تقريبا",
		threeToTen: "{{count}} ساعات تقريباً",
		other: "{{count}} ساعة تقريباً"
	},
	xHours: {
		one: "ساعة واحدة",
		two: "ساعتان",
		threeToTen: "{{count}} ساعات",
		other: "{{count}} ساعة"
	},
	xDays: {
		one: "يوم واحد",
		two: "يومان",
		threeToTen: "{{count}} أيام",
		other: "{{count}} يوم"
	},
	aboutXWeeks: {
		one: "أسبوع واحد تقريبا",
		two: "أسبوعين تقريبا",
		threeToTen: "{{count}} أسابيع تقريبا",
		other: "{{count}} أسبوعا تقريبا"
	},
	xWeeks: {
		one: "أسبوع واحد",
		two: "أسبوعان",
		threeToTen: "{{count}} أسابيع",
		other: "{{count}} أسبوعا"
	},
	aboutXMonths: {
		one: "شهر واحد تقريباً",
		two: "شهرين تقريبا",
		threeToTen: "{{count}} أشهر تقريبا",
		other: "{{count}} شهرا تقريباً"
	},
	xMonths: {
		one: "شهر واحد",
		two: "شهران",
		threeToTen: "{{count}} أشهر",
		other: "{{count}} شهرا"
	},
	aboutXYears: {
		one: "سنة واحدة تقريباً",
		two: "سنتين تقريبا",
		threeToTen: "{{count}} سنوات تقريباً",
		other: "{{count}} سنة تقريباً"
	},
	xYears: {
		one: "سنة واحد",
		two: "سنتان",
		threeToTen: "{{count}} سنوات",
		other: "{{count}} سنة"
	},
	overXYears: {
		one: "أكثر من سنة",
		two: "أكثر من سنتين",
		threeToTen: "أكثر من {{count}} سنوات",
		other: "أكثر من {{count}} سنة"
	},
	almostXYears: {
		one: "ما يقارب سنة واحدة",
		two: "ما يقارب سنتين",
		threeToTen: "ما يقارب {{count}} سنوات",
		other: "ما يقارب {{count}} سنة"
	}
};
var formatDistance = (token, count, options) => {
	const usageGroup = formatDistanceLocale[token];
	let result;
	if (typeof usageGroup === "string") result = usageGroup;
	else if (count === 1) result = usageGroup.one;
	else if (count === 2) result = usageGroup.two;
	else if (count <= 10) result = usageGroup.threeToTen.replace("{{count}}", String(count));
	else result = usageGroup.other.replace("{{count}}", String(count));
	if (options?.addSuffix) {
		if (options.comparison && options.comparison > 0) return "خلال " + result;
		else return "منذ " + result;
	}
	return result;
};
var formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE، do MMMM y",
			long: "do MMMM y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "HH:mm:ss",
			long: "HH:mm:ss",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'عند الساعة' {{time}}",
			long: "{{date}} 'عند الساعة' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
// node_modules/date-fns/locale/ar/_lib/formatRelative.js
var formatRelativeLocale = {
	lastWeek: "eeee 'الماضي عند الساعة' p",
	yesterday: "'الأمس عند الساعة' p",
	today: "'اليوم عند الساعة' p",
	tomorrow: "'غدا عند الساعة' p",
	nextWeek: "eeee 'القادم عند الساعة' p",
	other: "P"
};
var formatRelative = (token) => formatRelativeLocale[token];
// node_modules/date-fns/locale/ar/_lib/localize.js
var eraValues = {
	narrow: ["ق", "ب"],
	abbreviated: ["ق.م.", "ب.م."],
	wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"ر1",
		"ر2",
		"ر3",
		"ر4"
	],
	wide: [
		"الربع الأول",
		"الربع الثاني",
		"الربع الثالث",
		"الربع الرابع"
	]
};
var monthValues = {
	narrow: [
		"ي",
		"ف",
		"م",
		"أ",
		"م",
		"ي",
		"ي",
		"أ",
		"س",
		"أ",
		"ن",
		"د"
	],
	abbreviated: [
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر"
	],
	wide: [
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر"
	]
};
var dayValues = {
	narrow: [
		"ح",
		"ن",
		"ث",
		"ر",
		"خ",
		"ج",
		"س"
	],
	short: [
		"أحد",
		"اثنين",
		"ثلاثاء",
		"أربعاء",
		"خميس",
		"جمعة",
		"سبت"
	],
	abbreviated: [
		"أحد",
		"اثنين",
		"ثلاثاء",
		"أربعاء",
		"خميس",
		"جمعة",
		"سبت"
	],
	wide: [
		"الأحد",
		"الاثنين",
		"الثلاثاء",
		"الأربعاء",
		"الخميس",
		"الجمعة",
		"السبت"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "ص",
		pm: "م",
		morning: "الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "المساء",
		night: "الليل",
		midnight: "منتصف الليل"
	},
	abbreviated: {
		am: "ص",
		pm: "م",
		morning: "الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "المساء",
		night: "الليل",
		midnight: "منتصف الليل"
	},
	wide: {
		am: "ص",
		pm: "م",
		morning: "الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "المساء",
		night: "الليل",
		midnight: "منتصف الليل"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "ص",
		pm: "م",
		morning: "في الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "في المساء",
		night: "في الليل",
		midnight: "منتصف الليل"
	},
	abbreviated: {
		am: "ص",
		pm: "م",
		morning: "في الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "في المساء",
		night: "في الليل",
		midnight: "منتصف الليل"
	},
	wide: {
		am: "ص",
		pm: "م",
		morning: "في الصباح",
		noon: "الظهر",
		afternoon: "بعد الظهر",
		evening: "في المساء",
		night: "في الليل",
		midnight: "منتصف الليل"
	}
};
var ordinalNumber = (num) => String(num);
// node_modules/date-fns/locale/ar.js
/**
* @category Locales
* @summary Arabic locale (Modern Standard Arabic - Al-fussha).
* @language Modern Standard Arabic
* @iso-639-2 ara
* @author Abdallah Hassan [@AbdallahAHO](https://github.com/AbdallahAHO)
* @author Koussay Haj Kacem [@essana3](https://github.com/essana3)
*/
var ar = {
	code: "ar",
	formatDistance,
	formatLong,
	formatRelative,
	localize: {
		ordinalNumber,
		era: buildLocalizeFn({
			values: eraValues,
			defaultWidth: "wide"
		}),
		quarter: buildLocalizeFn({
			values: quarterValues,
			defaultWidth: "wide",
			argumentCallback: (quarter) => quarter - 1
		}),
		month: buildLocalizeFn({
			values: monthValues,
			defaultWidth: "wide"
		}),
		day: buildLocalizeFn({
			values: dayValues,
			defaultWidth: "wide"
		}),
		dayPeriod: buildLocalizeFn({
			values: dayPeriodValues,
			defaultWidth: "wide",
			formattingValues: formattingDayPeriodValues,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /[قب]/,
				abbreviated: /[قب]\.م\./,
				wide: /(قبل|بعد) الميلاد/
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/قبل/, /بعد/] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /ر[1234]/,
				wide: /الربع (الأول|الثاني|الثالث|الرابع)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[أيفمسند]/,
				abbreviated: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
				wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ي/i,
					/^ف/i,
					/^م/i,
					/^أ/i,
					/^م/i,
					/^ي/i,
					/^ي/i,
					/^أ/i,
					/^س/i,
					/^أ/i,
					/^ن/i,
					/^د/i
				],
				any: [
					/^يناير/i,
					/^فبراير/i,
					/^مارس/i,
					/^أبريل/i,
					/^مايو/i,
					/^يونيو/i,
					/^يوليو/i,
					/^أغسطس/i,
					/^سبتمبر/i,
					/^أكتوبر/i,
					/^نوفمبر/i,
					/^ديسمبر/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[حنثرخجس]/i,
				short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
				abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
				wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ح/i,
					/^ن/i,
					/^ث/i,
					/^ر/i,
					/^خ/i,
					/^ج/i,
					/^س/i
				],
				wide: [
					/^الأحد/i,
					/^الاثنين/i,
					/^الثلاثاء/i,
					/^الأربعاء/i,
					/^الخميس/i,
					/^الجمعة/i,
					/^السبت/i
				],
				any: [
					/^أح/i,
					/^اث/i,
					/^ث/i,
					/^أر/i,
					/^خ/i,
					/^ج/i,
					/^س/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/,
				any: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^ص/,
				pm: /^م/,
				midnight: /منتصف الليل/,
				noon: /الظهر/,
				afternoon: /بعد الظهر/,
				morning: /في الصباح/,
				evening: /في المساء/,
				night: /في الليل/
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 6,
		firstWeekContainsDate: 1
	}
};
// src/components/AdminChatManager.tsx
var AdminChatManager = () => {
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [selectedUserId, setSelectedUserId] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const unsubscribe = subscribeToAllConversations(setConversations);
		return () => unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!selectedUserId) {
			setMessages([]);
			return;
		}
		const unsubscribe = subscribeToMessages(selectedUserId, (msgs) => {
			setMessages(msgs);
			markAsRead(selectedUserId, true);
		});
		return () => unsubscribe();
	}, [selectedUserId]);
	(0, import_react.useEffect)(() => {
		scrollToBottom();
	}, [messages]);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!inputText.trim() || !selectedUserId) return;
		const text = inputText;
		setInputText("");
		await sendMessage(selectedUserId, "admin", text, true);
	};
	const handleStatusChange = async (userId, status) => {
		await updateConversationStatus(userId, status);
	};
	const filteredConversations = conversations.filter((conv) => {
		const matchesSearch = conv.userDisplayName.toLowerCase().includes(searchTerm.toLowerCase()) || conv.userPhone && conv.userPhone.includes(searchTerm);
		const matchesFilter = statusFilter === "all" || conv.status === statusFilter;
		return matchesSearch && matchesFilter;
	});
	const selectedConversation = conversations.find((c) => c.id === selectedUserId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col lg:flex-row h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `w-full lg:w-96 border-l bg-gray-50 flex flex-col ${selectedUserId ? "hidden lg:flex" : "flex"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 bg-white border-b sticky top-0 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-gray-900 mb-4",
						children: "إدارة الرسائل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "بحث باسم المستخدم أو الهاتف...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "w-full pr-10 pl-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500 transition-all"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-2",
						children: [
							"all",
							"new",
							"read",
							"replied",
							"closed"
						].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStatusFilter(status),
							className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${statusFilter === status ? "bg-red-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
							children: status === "all" ? "الكل" : status === "new" ? "جديد" : status === "read" ? "تمت القراءة" : status === "replied" ? "تم الرد" : "مغلق"
						}, status))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto",
				children: filteredConversations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 text-center text-gray-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "لا توجد محادثات تطابق البحث" })]
				}) : filteredConversations.map((conv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedUserId(conv.id),
					className: `w-full p-4 flex items-start gap-3 border-b transition-all hover:bg-white text-right ${selectedUserId === conv.id ? "bg-white border-r-4 border-r-red-600" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold overflow-hidden border-2 border-white shadow-sm",
							children: conv.userDisplayName.charAt(0)
						}), conv.unreadCountByAdmin > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white",
							children: conv.unreadCountByAdmin
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-gray-900 truncate text-sm",
									children: conv.userDisplayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-gray-400",
									children: conv.updatedAt?.toDate ? format(conv.updatedAt.toDate(), "p", { locale: ar }) : ""
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 truncate mb-1",
								children: conv.lastMessage || "بدأ محادثة جديدة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: conv.status })
							})
						]
					})]
				}, conv.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex-1 flex flex-col bg-white ${!selectedUserId ? "hidden lg:flex items-center justify-center" : "flex"}`,
			children: !selectedUserId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-12 h-12 text-red-600 opacity-50" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold text-gray-900 mb-2",
						children: "اختر محادثة للمتابعة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-500 max-w-xs mx-auto",
						children: "يمكنك البدء بالرد على رسائل المستخدمين وتقديم المساعدة اللازمة."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 bg-white border-b flex items-center justify-between shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedUserId(null),
								className: "p-2 hover:bg-gray-100 rounded-full lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-5 h-5 transform rotate-180" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold",
								children: selectedConversation?.userDisplayName.charAt(0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-gray-900",
								children: selectedConversation?.userDisplayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-gray-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedConversation?.userPhone || "بدون هاتف" })]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: selectedConversation?.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleStatusChange(selectedUserId, "closed"),
							className: "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4" }), "إغلاق المحادثة"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleStatusChange(selectedUserId, "new"),
							className: "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }), "إعادة فتح"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4",
					children: [messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${msg.isAdmin ? "justify-start" : "justify-end"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.isAdmin ? "bg-red-600 text-white rounded-tr-none" : "bg-white text-gray-900 border border-gray-100 rounded-tl-none"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed whitespace-pre-wrap",
								children: msg.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[10px] mt-1 text-left ${msg.isAdmin ? "text-red-100" : "text-gray-400"}`,
								children: msg.createdAt?.toDate ? format(msg.createdAt.toDate(), "p", { locale: ar }) : "جاري الإرسال..."
							})]
						})
					}, msg.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 bg-white border-t",
					children: selectedConversation?.status === "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "هذه المحادثة مغلقة. أعد فتحها لتتمكن من الرد."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSendMessage,
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: inputText,
							onChange: (e) => setInputText(e.target.value),
							placeholder: "اكتب ردك هنا...",
							className: "flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 transition-all"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !inputText.trim(),
							className: "bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-5 h-5 transform rotate-180" })
						})]
					})
				})
			] })
		})]
	});
};
var StatusBadge = ({ status }) => {
	switch (status) {
		case "new": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), "جديد"]
		});
		case "read": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), "تمت القراءة"]
		});
		case "replied": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3 h-3" }), "تم الرد"]
		});
		case "closed": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3 h-3" }), "مغلق"]
		});
		default: return null;
	}
};
// src/services/accountRecoveryService.ts
var LAST_RECOVERY_REQUEST_KEY = "qataba_last_recovery_request_ts";
var RECOVERY_COOLDOWN_MS = 45e3;
function isPermissionError(error) {
	const err = error;
	return err?.code === "permission-denied" || String(err?.message || "").includes("Missing or insufficient permissions");
}
function getRecoveryEmail(cleanPhone, version) {
	return `user_967${cleanPhone}_v${version}@qataba-blood.app`;
}
async function sha256Hex(value) {
	const encoded = new TextEncoder().encode(value);
	const digest = await crypto.subtle.digest("SHA-256", encoded);
	return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function buildRecoveryGrantId(cleanPhone, code) {
	return sha256Hex(`qataba_recovery:${cleanPhone}:${code.trim()}`);
}
function generateSixDigitCode() {
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		const arr = /* @__PURE__ */ new Uint32Array(1);
		crypto.getRandomValues(arr);
		return String(1e5 + arr[0] % 9e5);
	}
	return String(Math.floor(1e5 + Math.random() * 9e5));
}
function createSafeDocId(prefix) {
	const randomPart = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "").slice(0, 14) : Math.random().toString(36).slice(2, 12);
	return `${prefix}_${Date.now()}_${randomPart}`;
}
async function resolveExistingAccountForPhone(cleanPhone) {
	let previousUid = "";
	let previousDonorId = "";
	let currentVersion = 0;
	let resolvedName = "";
	try {
		const phoneAuthSnap = await getDoc(doc(db, "phone_auth", cleanPhone));
		if (phoneAuthSnap.exists()) {
			const data = phoneAuthSnap.data();
			previousUid = String(data.userId || "");
			currentVersion = Number(data.version) || 1;
		}
	} catch (err) {
		console.warn("Could not inspect phone_auth during recovery lookup:", err);
	}
	try {
		const usersSnap = await getDocs(query(collection(db, "users"), where("phone", "==", cleanPhone)));
		if (!usersSnap.empty) {
			const userDoc = usersSnap.docs[0];
			if (!previousUid) previousUid = userDoc.id;
			resolvedName = String(userDoc.data()?.displayName || "");
		}
	} catch (err) {
		console.warn("Could not inspect users during recovery lookup:", err);
	}
	try {
		if (previousUid) {
			const byUidSnap = await getDocs(query(collection(db, "donors"), where("userId", "==", previousUid)));
			if (!byUidSnap.empty) {
				previousDonorId = byUidSnap.docs[0].id;
				if (!resolvedName) resolvedName = String(byUidSnap.docs[0].data()?.fullName || "");
			}
		}
		if (!previousDonorId) {
			const matched = (await getDocs(collection(db, "donors"))).docs.find((d) => {
				return sanitizePhone(String(d.data()?.phone || "")) === cleanPhone;
			});
			if (matched) {
				const candidateUid = String(matched.data()?.userId || "");
				if (!previousUid && candidateUid) try {
					const candidateUserSnap = await getDoc(doc(db, "users", candidateUid));
					if (String(candidateUserSnap.data()?.role || "user") !== "admin") previousUid = candidateUid;
				} catch {}
				if (candidateUid && candidateUid === previousUid) previousDonorId = matched.id;
				if (!resolvedName) resolvedName = String(matched.data()?.fullName || "");
			}
		}
	} catch (err) {
		console.warn("Could not inspect donors during recovery lookup:", err);
	}
	return {
		previousUid,
		previousDonorId,
		currentVersion,
		resolvedName
	};
}
/**
* Step 1 (User): Submit a password recovery request using only Phone + Full Name (no UID required).
*/
async function requestAccountRecoveryByPhone(phone, fullName, note) {
	const cleanPhone = sanitizePhone(phone);
	const trimmedName = fullName.trim();
	const trimmedNote = (note || "").trim().slice(0, 300);
	if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) throw new Error("يرجى إدخال رقم الهاتف المسجل بشكل صحيح (مثال: 773633918).");
	if (trimmedName.length < 2) throw new Error("يرجى إدخال الاسم الكامل للمساعدة في التحقق من الحساب.");
	if (typeof window !== "undefined") {
		const lastTs = Number(localStorage.getItem(`${LAST_RECOVERY_REQUEST_KEY}_${cleanPhone}`) || 0);
		if (lastTs && Date.now() - lastTs < RECOVERY_COOLDOWN_MS) {
			const waitSeconds = Math.ceil((RECOVERY_COOLDOWN_MS - (Date.now() - lastTs)) / 1e3);
			throw new Error(`تم إرسال طلب لهذا الرقم قبل قليل. انتظر ${waitSeconds} ثانية أو أدخل الرمز إذا وصلك من المسؤول.`);
		}
	}
	const requestId = createSafeDocId("req");
	const path = `account_recovery_requests/${requestId}`;
	try {
		await setDoc(doc(db, "account_recovery_requests", requestId), {
			phone: cleanPhone,
			fullName: trimmedName.slice(0, 100),
			...trimmedNote ? { note: trimmedNote } : {},
			status: "pending",
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.CREATE, path);
		throw new Error("تعذر حفظ طلب الاستعادة في قاعدة البيانات. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.");
	}
	if (typeof window !== "undefined") localStorage.setItem(`${LAST_RECOVERY_REQUEST_KEY}_${cleanPhone}`, String(Date.now()));
	return {
		requestId,
		phone: cleanPhone,
		fullName: trimmedName,
		message: "تم إرسال طلب استعادة كلمة المرور للمسؤول بنجاح."
	};
}
/**
* Step 2 (User): Validate admin-issued 6-digit recovery code and set a brand-new password.
* Rotates to next available version slot (_v2.._v50), invalidating older credentials via phone_auth.
*/
async function completeAccountRecoveryByCode(params) {
	const cleanPhone = sanitizePhone(params.phone);
	const code = params.code.trim();
	const newPassword = params.newPassword;
	if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) throw new Error("يرجى إدخال رقم الهاتف المسجل بشكل صحيح.");
	if (!/^\d{6}$/.test(code)) throw new Error("رمز الاستعادة يجب أن يتكون من 6 أرقام.");
	if (!newPassword || newPassword.length < 6) throw new Error("كلمة المرور الجديدة يجب أن لا تقل عن 6 خانات.");
	const grantId = await buildRecoveryGrantId(cleanPhone, code);
	const grantRef = doc(db, "recovery_grants", grantId);
	let grantSnap;
	try {
		grantSnap = await getDocFromServer(grantRef);
	} catch {
		grantSnap = await getDoc(grantRef);
	}
	if (!grantSnap.exists()) throw new Error("رقم الهاتف أو رمز الاستعادة غير صحيح. تأكد من الرمز المرسل لك من المسؤول.");
	const grantData = grantSnap.data();
	if (grantData.status === "used") throw new Error("تم استخدام هذا الرمز مسبقاً. يمكنك تسجيل الدخول الآن بكلمة المرور الجديدة.");
	if (grantData.status !== "active") throw new Error("انتهت صلاحية هذا الرمز أو تم إلغاؤه من المسؤول. اطلب رمزاً جديداً.");
	const startVersion = Math.max(2, Number(grantData.nextVersion) || 2);
	const recoveryDisplayName = (params.fullName || "").trim().slice(0, 100) || `مستخدم ${cleanPhone}`;
	if (typeof window !== "undefined") window.__QATABA_RECOVERY_IN_PROGRESS__ = true;
	try {
		let createdCred = null;
		let assignedVersion = startVersion;
		for (let version = startVersion; version <= 50; version++) {
			const candidateEmail = getRecoveryEmail(cleanPhone, version);
			try {
				createdCred = await createUserWithEmailAndPassword(auth, candidateEmail, newPassword);
				assignedVersion = version;
				break;
			} catch (authErr) {
				if (authErr?.code === "auth/email-already-in-use") continue;
				if (authErr?.code === "auth/weak-password") throw new Error("كلمة المرور الجديدة ضعيفة. اختر كلمة مرور أقوى (6 خانات فأكثر).");
				if (authErr?.code === "auth/operation-not-allowed") throw new Error("خدمة تسجيل الدخول بكلمة المرور غير مفعلة في إعدادات Firebase.");
				throw authErr;
			}
		}
		if (!createdCred) throw new Error("تعذر تخصيص نسخة دخول جديدة لهذا الرقم. تواصل مع المسؤول.");
		const newUid = createdCred.user.uid;
		try {
			await updateProfile(createdCred.user, { displayName: recoveryDisplayName });
		} catch {}
		const phoneAuthRef = doc(db, "phone_auth", cleanPhone);
		const existingPhoneAuthSnap = await getDoc(phoneAuthRef);
		const targetRequestId = String(grantData.requestId || params.requestId || "").trim();
		const previousUid = String(grantData.previousUid || "").trim();
		const previousDonorId = String(grantData.previousDonorId || "").trim();
		let canTransferDonor = false;
		if (previousDonorId && previousUid) try {
			const donorSnap = await getDoc(doc(db, "donors", previousDonorId));
			canTransferDonor = donorSnap.exists() && donorSnap.data()?.userId === previousUid;
		} catch {
			canTransferDonor = false;
		}
		const batch = writeBatch(db);
		batch.set(doc(db, "users", newUid), {
			displayName: recoveryDisplayName,
			phone: cleanPhone,
			phoneVerified: true,
			role: "user",
			recoveredFromUid: previousUid,
			recoveredGrantId: grantId,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp()
		});
		batch.update(grantRef, {
			status: "used",
			claimedByUid: newUid,
			usedAt: serverTimestamp()
		});
		if (existingPhoneAuthSnap.exists()) batch.update(phoneAuthRef, {
			phone: cleanPhone,
			version: assignedVersion,
			userId: newUid,
			grantId,
			updatedAt: serverTimestamp()
		});
		else batch.set(phoneAuthRef, {
			phone: cleanPhone,
			version: assignedVersion,
			userId: newUid,
			grantId,
			updatedAt: serverTimestamp()
		});
		if (targetRequestId) batch.update(doc(db, "account_recovery_requests", targetRequestId), {
			status: "used",
			usedAt: serverTimestamp(),
			updatedAt: serverTimestamp()
		});
		if (canTransferDonor) batch.update(doc(db, "donors", previousDonorId), {
			userId: newUid,
			updatedAt: serverTimestamp()
		});
		try {
			await batch.commit();
		} catch (error) {
			if (isPermissionError(error)) handleFirestoreError(error, OperationType.WRITE, `recovery_grants/${grantId}`);
			throw error;
		}
		if (typeof window !== "undefined") {
			localStorage.setItem(`blood_app_phone_auth_version_${cleanPhone}`, String(assignedVersion));
			localStorage.removeItem("blood_app_guest");
			localStorage.removeItem("has_logged_out");
			localStorage.removeItem("qataba_recovery_phone");
			localStorage.removeItem("qataba_recovery_name");
			localStorage.removeItem("qataba_recovery_request_id");
			delete window.__QATABA_RECOVERY_IN_PROGRESS__;
			window.dispatchEvent(new Event("qataba-recovery-complete"));
		}
		return {
			message: "تم التحقق من الرمز وتعيين كلمة المرور الجديدة بنجاح!",
			assignedVersion,
			uid: newUid
		};
	} finally {
		if (typeof window !== "undefined") delete window.__QATABA_RECOVERY_IN_PROGRESS__;
	}
}
/**
* Admin: List all password recovery requests from Firestore.
*/
async function listAccountRecoveryRequests() {
	const path = "account_recovery_requests";
	try {
		return (await getDocs(collection(db, path))).docs.map((docSnap) => {
			const data = docSnap.data();
			const phone = sanitizePhone(String(data.phone || ""));
			return {
				id: docSnap.id,
				phone,
				phoneLast4: phone ? phone.slice(-4) : String(data.phoneLast4 || ""),
				fullName: String(data.fullName || data.displayName || "مستخدم"),
				note: typeof data.note === "string" ? data.note : void 0,
				status: data.status || "pending",
				grantId: typeof data.grantId === "string" ? data.grantId : void 0,
				nextVersion: typeof data.nextVersion === "number" ? data.nextVersion : void 0,
				matchedUid: typeof data.matchedUid === "string" ? data.matchedUid : void 0,
				createdAtMillis: data.createdAt?.toMillis?.() || null,
				approvedAtMillis: data.approvedAt?.toMillis?.() || null,
				usedAtMillis: data.usedAt?.toMillis?.() || null
			};
		}).sort((a, b) => (b.createdAtMillis || 0) - (a.createdAtMillis || 0)).slice(0, 100);
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.LIST, path);
		throw error;
	}
}
/**
* Admin: Verify and approve an existing recovery request, creating a hashed 6-digit grant.
*/
async function approveAccountRecovery(requestId) {
	const reqRef = doc(db, "account_recovery_requests", requestId);
	const reqSnap = await getDoc(reqRef);
	if (!reqSnap.exists()) throw new Error("طلب الاستعادة غير موجود.");
	const reqData = reqSnap.data();
	const cleanPhone = sanitizePhone(String(reqData.phone || ""));
	if (!cleanPhone || cleanPhone.length < 7) throw new Error("رقم الهاتف المرتبط بالطلب غير صالح.");
	const { previousUid, previousDonorId, currentVersion, resolvedName } = await resolveExistingAccountForPhone(cleanPhone);
	const requestedVersion = Math.max(2, currentVersion + 1, (Number(reqData.nextVersion) || 1) + 1);
	const nextVersion = Math.min(50, requestedVersion);
	const code = generateSixDigitCode();
	const grantId = await buildRecoveryGrantId(cleanPhone, code);
	const batch = writeBatch(db);
	if (reqData.grantId && typeof reqData.grantId === "string") {
		const oldGrantRef = doc(db, "recovery_grants", reqData.grantId);
		try {
			const oldGrantSnap = await getDoc(oldGrantRef);
			if (oldGrantSnap.exists() && oldGrantSnap.data()?.status === "active") batch.update(oldGrantRef, {
				status: "revoked",
				revokedAt: serverTimestamp()
			});
		} catch {}
	}
	batch.set(doc(db, "recovery_grants", grantId), {
		nextVersion,
		...previousUid ? { previousUid } : {},
		...previousDonorId ? { previousDonorId } : {},
		requestId,
		status: "active",
		createdAt: serverTimestamp()
	});
	batch.update(reqRef, {
		status: "approved",
		grantId,
		nextVersion,
		matchedUid: previousUid || "",
		approvedAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	try {
		await batch.commit();
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.WRITE, `account_recovery_requests/${requestId}`);
		throw error;
	}
	return {
		requestId,
		code,
		phone: cleanPhone,
		fullName: String(reqData.fullName || resolvedName || "مستخدم"),
		nextVersion,
		matchedExistingAccount: Boolean(previousUid)
	};
}
/**
* Admin: Issue a 6-digit recovery code directly for any phone number without waiting for a prior form.
*/
async function issueDirectRecoveryByPhone(phone, fullNameHint) {
	const cleanPhone = sanitizePhone(phone);
	if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) throw new Error("يرجى إدخال رقم هاتف صحيح (مثال: 773633918).");
	const { previousUid, previousDonorId, currentVersion, resolvedName } = await resolveExistingAccountForPhone(cleanPhone);
	const nextVersion = Math.min(50, Math.max(2, currentVersion + 1));
	const code = generateSixDigitCode();
	const grantId = await buildRecoveryGrantId(cleanPhone, code);
	const requestId = createSafeDocId("req");
	const displayName = (fullNameHint || "").trim() || resolvedName || `مستخدم ${cleanPhone}`;
	const batch = writeBatch(db);
	batch.set(doc(db, "recovery_grants", grantId), {
		nextVersion,
		...previousUid ? { previousUid } : {},
		...previousDonorId ? { previousDonorId } : {},
		requestId,
		status: "active",
		createdAt: serverTimestamp()
	});
	batch.set(doc(db, "account_recovery_requests", requestId), {
		phone: cleanPhone,
		fullName: displayName.slice(0, 100),
		note: "إصدار مباشر من لوحة المسؤول",
		status: "approved",
		grantId,
		nextVersion,
		matchedUid: previousUid || "",
		createdAt: serverTimestamp(),
		approvedAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	try {
		await batch.commit();
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.WRITE, `recovery_grants/${grantId}`);
		throw error;
	}
	return {
		requestId,
		code,
		phone: cleanPhone,
		fullName: displayName,
		nextVersion,
		matchedExistingAccount: Boolean(previousUid)
	};
}
/**
* Admin: Revoke an unused recovery code/request.
*/
async function revokeAccountRecovery(requestId) {
	const reqRef = doc(db, "account_recovery_requests", requestId);
	const reqSnap = await getDoc(reqRef);
	if (!reqSnap.exists()) throw new Error("طلب الاستعادة غير موجود.");
	const grantId = reqSnap.data()?.grantId;
	const batch = writeBatch(db);
	batch.update(reqRef, {
		status: "revoked",
		revokedAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	if (grantId && typeof grantId === "string") batch.update(doc(db, "recovery_grants", grantId), {
		status: "revoked",
		revokedAt: serverTimestamp()
	});
	try {
		await batch.commit();
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.UPDATE, `account_recovery_requests/${requestId}`);
		throw error;
	}
}
/**
* Admin: Delete a closed/revoked recovery request entry.
*/
async function deleteAccountRecoveryRequest(requestId) {
	const path = `account_recovery_requests/${requestId}`;
	const reqRef = doc(db, "account_recovery_requests", requestId);
	try {
		const reqSnap = await getDoc(reqRef);
		const batch = writeBatch(db);
		const grantId = reqSnap.exists() ? reqSnap.data()?.grantId : null;
		if (grantId && typeof grantId === "string") {
			const grantRef = doc(db, "recovery_grants", grantId);
			const grantSnap = await getDoc(grantRef);
			if (grantSnap.exists() && grantSnap.data()?.status === "active") batch.update(grantRef, {
				status: "revoked",
				revokedAt: serverTimestamp()
			});
		}
		batch.delete(reqRef);
		await batch.commit();
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.DELETE, path);
		throw error;
	}
}
async function listAppUsers() {
	return (await getDocs(collection(db, "users"))).docs.map((d) => {
		const data = d.data();
		return {
			uid: d.id,
			displayName: String(data.displayName || "مستخدم"),
			phone: String(data.phone || ""),
			email: String(data.email || ""),
			role: String(data.role || "user"),
			disabled: false,
			createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null
		};
	});
}
async function deleteAppUser(uid) {
	const path = `users/${uid}`;
	try {
		await deleteDoc(doc(db, "users", uid));
	} catch (error) {
		if (isPermissionError(error)) handleFirestoreError(error, OperationType.DELETE, path);
		throw error;
	}
}
// src/components/AdminDashboard.tsx
var AdminDashboard = ({ onBack, donors = [], onEditDonor, onDeleteDonor, onGlobalRefresh, isRefreshing = false }) => {
	const { userProfile, currentUser, activeRole, switchActiveRole, loginWithGoogle } = useAuth();
	const [importText, setImportText] = (0, import_react.useState)("");
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	const [announcementType, setAnnouncementType] = (0, import_react.useState)("general");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [pinInput, setPinInput] = (0, import_react.useState)("");
	const [pinError, setPinError] = (0, import_react.useState)("");
	const [adminAuthLoading, setAdminAuthLoading] = (0, import_react.useState)(false);
	const [adminSearchQuery, setAdminSearchQuery] = (0, import_react.useState)("");
	const [adminBloodFilter, setAdminBloodFilter] = (0, import_react.useState)("ALL");
	const [adminDonorToDelete, setAdminDonorToDelete] = (0, import_react.useState)(null);
	const [adminIsDeleting, setAdminIsDeleting] = (0, import_react.useState)(false);
	const [adminDeleteError, setAdminDeleteError] = (0, import_react.useState)(null);
	const [showDonorsSection, setShowDonorsSection] = (0, import_react.useState)(true);
	const [hospitals, setHospitals] = (0, import_react.useState)([]);
	const [showHospitalsSection, setShowHospitalsSection] = (0, import_react.useState)(false);
	const [editingHospital, setEditingHospital] = (0, import_react.useState)(null);
	const [isHospitalFormOpen, setIsHospitalFormOpen] = (0, import_react.useState)(false);
	const [hospitalForm, setHospitalForm] = (0, import_react.useState)({
		name: "",
		type: "",
		address: "",
		phone: "",
		services: ""
	});
	const [hospitalLoading, setHospitalLoading] = (0, import_react.useState)(false);
	const [showChatManager, setShowChatManager] = (0, import_react.useState)(false);
	import_react.useEffect(() => {
		const unsub = subscribeToHospitals((data) => {
			setHospitals(data);
		});
		return () => unsub();
	}, []);
	const [totalUsersCount, setTotalUsersCount] = (0, import_react.useState)(0);
	const [todaySignupsCount, setTodaySignupsCount] = (0, import_react.useState)(0);
	const [adminsCount, setAdminsCount] = (0, import_react.useState)(0);
	const [adminsList, setAdminsList] = (0, import_react.useState)([]);
	const [allUsersList, setAllUsersList] = (0, import_react.useState)([]);
	const [isCleaningUp, setIsCleaningUp] = (0, import_react.useState)(false);
	const [showUsersSection, setShowUsersSection] = (0, import_react.useState)(false);
	const [recoveryRequests, setRecoveryRequests] = (0, import_react.useState)([]);
	const [deletingUserId, setDeletingUserId] = (0, import_react.useState)(null);
	const [approvingRecoveryId, setApprovingRecoveryId] = (0, import_react.useState)(null);
	const [revokingRecoveryId, setRevokingRecoveryId] = (0, import_react.useState)(null);
	const [deletingRecoveryId, setDeletingRecoveryId] = (0, import_react.useState)(null);
	const [issuedRecoveryCode, setIssuedRecoveryCode] = (0, import_react.useState)(null);
	const [directRecoveryPhone, setDirectRecoveryPhone] = (0, import_react.useState)("");
	const [directRecoveryName, setDirectRecoveryName] = (0, import_react.useState)("");
	const [issuingDirectRecovery, setIssuingDirectRecovery] = (0, import_react.useState)(false);
	const [copiedRecoveryCode, setCopiedRecoveryCode] = (0, import_react.useState)(false);
	const [locations, setLocations] = (0, import_react.useState)([]);
	const [showLocationsSection, setShowLocationsSection] = (0, import_react.useState)(false);
	const [editingLocationId, setEditingLocationId] = (0, import_react.useState)(null);
	const [locationNameInput, setLocationLocationNameInput] = (0, import_react.useState)("");
	const fetchUserStats = async () => {
		try {
			let authUsers = [];
			try {
				authUsers = await listAppUsers();
			} catch (listErr) {
				console.warn("Could not fetch users list:", listErr);
			}
			const usersSnap = await getDocs(collection(db, "users"));
			const total = authUsers.length || usersSnap.size;
			setTotalUsersCount(total);
			const now = /* @__PURE__ */ new Date();
			const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
			let todayCount = 0;
			const admins = [];
			const allUsers = authUsers;
			usersSnap.forEach((docSnap) => {
				const data = docSnap.data();
				const userWithId = {
					id: docSnap.id,
					...data
				};
				const authRecord = allUsers.find((item) => item.uid === docSnap.id);
				if (authRecord) Object.assign(authRecord, userWithId);
				else allUsers.push(userWithId);
				if (data.role === "admin" || data.email === "ziadalsyyadi@gmail.com") admins.push(userWithId);
				let createdTime = null;
				if (data.createdAt?.toDate) createdTime = data.createdAt.toDate().getTime();
				else if (data.createdAt) createdTime = new Date(data.createdAt).getTime();
				if (createdTime && createdTime >= startOfDay) todayCount++;
			});
			setTodaySignupsCount(todayCount);
			setAdminsCount(admins.length);
			setAdminsList(admins);
			setAllUsersList(allUsers);
		} catch (e) {
			console.warn("Could not fetch user stats:", e);
		}
	};
	const refreshRecoveryRequests = async () => {
		try {
			setRecoveryRequests(await listAccountRecoveryRequests());
		} catch (error) {
			console.warn("Could not load recovery requests:", error);
		}
	};
	const toWhatsAppNumber = (phone) => {
		const digits = phone.replace(/\D/g, "");
		if (!digits) return "";
		if (digits.startsWith("967")) return digits;
		if (digits.length === 9 && digits.startsWith("7")) return `967${digits}`;
		return digits;
	};
	const handleApproveRecovery = async (requestId) => {
		setApprovingRecoveryId(requestId);
		setIssuedRecoveryCode(null);
		setCopiedRecoveryCode(false);
		try {
			const issued = await approveAccountRecovery(requestId);
			setIssuedRecoveryCode(issued);
			await refreshRecoveryRequests();
			setResult({
				success: true,
				message: `تم إصدار رمز الاستعادة للرقم ${issued.phone} بنجاح.`
			});
		} catch (error) {
			setResult({
				success: false,
				message: error?.message || "تعذر إصدار رمز الاستعادة."
			});
		} finally {
			setApprovingRecoveryId(null);
		}
	};
	const handleIssueDirectRecovery = async (e) => {
		e.preventDefault();
		if (!directRecoveryPhone.trim()) return;
		setIssuingDirectRecovery(true);
		setIssuedRecoveryCode(null);
		setCopiedRecoveryCode(false);
		try {
			const issued = await issueDirectRecoveryByPhone(directRecoveryPhone, directRecoveryName);
			setIssuedRecoveryCode(issued);
			setDirectRecoveryPhone("");
			setDirectRecoveryName("");
			await refreshRecoveryRequests();
			setResult({
				success: true,
				message: `تم إصدار رمز استعادة مباشر للرقم ${issued.phone}.`
			});
		} catch (error) {
			setResult({
				success: false,
				message: error?.message || "تعذر إصدار رمز الاستعادة المباشر."
			});
		} finally {
			setIssuingDirectRecovery(false);
		}
	};
	const handleRevokeRecovery = async (requestId) => {
		setRevokingRecoveryId(requestId);
		try {
			await revokeAccountRecovery(requestId);
			setIssuedRecoveryCode((current) => current?.requestId === requestId ? null : current);
			await refreshRecoveryRequests();
			setResult({
				success: true,
				message: "تم إلغاء الرمز بنجاح. يمكن للمستخدم طلب رمز جديد."
			});
		} catch (error) {
			setResult({
				success: false,
				message: error?.message || "تعذر إلغاء رمز الاستعادة."
			});
		} finally {
			setRevokingRecoveryId(null);
		}
	};
	const handleDeleteRecoveryRequest = async (requestId) => {
		setDeletingRecoveryId(requestId);
		try {
			await deleteAccountRecoveryRequest(requestId);
			setRecoveryRequests((prev) => prev.filter((r) => r.id !== requestId));
			setIssuedRecoveryCode((current) => current?.requestId === requestId ? null : current);
			setResult({
				success: true,
				message: "تم حذف سجل طلب الاستعادة."
			});
		} catch (error) {
			setResult({
				success: false,
				message: error?.message || "تعذر حذف سجل الطلب."
			});
		} finally {
			setDeletingRecoveryId(null);
		}
	};
	const handleDeleteAppUser = async (uid) => {
		if (!window.confirm("سيتم حذف حساب المستخدم من Firebase Auth وملفه وسجلاته المرتبطة. هل تريد المتابعة؟")) return;
		setDeletingUserId(uid);
		try {
			await deleteAppUser(uid);
			setAllUsersList((prev) => prev.filter((item) => (item.uid || item.id) !== uid));
			setTotalUsersCount((prev) => Math.max(0, prev - 1));
			setResult({
				success: true,
				message: "تم حذف حساب المستخدم وسجلاته المرتبطة."
			});
		} catch (error) {
			setResult({
				success: false,
				message: error?.message || "تعذر حذف حساب المستخدم."
			});
		} finally {
			setDeletingUserId(null);
		}
	};
	import_react.useEffect(() => {
		const unsub = subscribeToLocations((data) => {
			setLocations(data);
		});
		return () => unsub();
	}, []);
	import_react.useEffect(() => {
		fetchUserStats();
		refreshRecoveryRequests();
	}, [donors.length]);
	const filteredDonors = import_react.useMemo(() => {
		return donors.filter((d) => {
			if (adminBloodFilter !== "ALL" && d.bloodType !== adminBloodFilter) return false;
			if (adminSearchQuery.trim()) {
				const q = adminSearchQuery.toLowerCase().trim();
				return d.fullName.toLowerCase().includes(q) || d.residence.toLowerCase().includes(q) || d.phone.includes(q);
			}
			return true;
		});
	}, [
		donors,
		adminBloodFilter,
		adminSearchQuery
	]);
	import_react.useEffect(() => {
		const fetchSettings = async () => {
			try {
				const snap = await getDoc(doc(db, "settings", "global"));
				if (snap.exists()) {
					const data = snap.data();
					setAnnouncement(data.announcement || data.noticeMessage || "");
					if (data.announcementType) setAnnouncementType(data.announcementType);
				}
			} catch (e) {}
		};
		fetchSettings();
	}, []);
	const handleExportExcel = async () => {
		setLoading(true);
		setResult(null);
		let objectUrl = null;
		try {
			let donorsList = Array.isArray(donors) ? [...donors] : [];
			if (donorsList.length === 0) {
				const sheetsRes = await fetchDonorsFromGoogleSheets();
				if (!sheetsRes.success || !Array.isArray(sheetsRes.donors)) throw new Error(sheetsRes.error || "تعذر جلب بيانات المتبرعين من الجدول.");
				donorsList = sheetsRes.donors;
			}
			if (donorsList.length === 0) {
				setResult({
					success: false,
					message: "لا توجد بيانات متبرعين للتصدير حالياً"
				});
				return;
			}
			const escapeCsv = (value) => "\"" + String(value ?? "").replace(/"/g, "\"\"") + "\"";
			const csvRows = [[
				"الاسم الكامل",
				"فصيلة الدم",
				"رقم الهاتف",
				"العنوان / السكن",
				"الملاحظات"
			].map(escapeCsv).join(",")];
			donorsList.forEach((d) => {
				csvRows.push([
					d.fullName || d.name || "",
					d.bloodType || "",
					d.phone || "",
					d.residence || d.address || "قعطبة",
					d.notes || ""
				].map(escapeCsv).join(","));
			});
			const csvContent = "﻿" + csvRows.join("\r\n");
			const fileName = `Bank_AlDam_Donors_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
			if (Capacitor.isNativePlatform()) {
				if (Capacitor.isPluginAvailable("Filesystem") && Capacitor.isPluginAvailable("Share")) {
					const writeRes = await Filesystem.writeFile({
						path: fileName,
						data: csvContent,
						directory: Directory.Cache,
						encoding: Encoding.UTF8,
						recursive: true
					});
					await Share.share({
						title: "سجل متبرعي بنك الدم قعطبة",
						text: `ملف إكسل (CSV) يحتوي على ${donorsList.length} متبرعاً`,
						files: [writeRes.uri],
						dialogTitle: "حفظ أو مشاركة ملف الإكسل"
					});
					setResult({
						success: true,
						message: `تم تجهيز ملف ${fileName} (${donorsList.length} متبرعاً). اختر «حفظ في الملفات» أو برنامج الإكسل أو المشاركة.`
					});
					return;
				}
				try {
					await navigator.clipboard.writeText(csvContent);
				} catch {}
				if (Capacitor.isPluginAvailable("Share")) {
					await Share.share({
						title: fileName,
						text: csvContent,
						dialogTitle: "مشاركة بيانات الإكسل (CSV)"
					});
					setResult({
						success: true,
						message: `تم فتح مشاركة بيانات ${fileName} (${donorsList.length} متبرعاً) ونسخها للحافظة. لحفظه كملف .csv مباشرة يُنصح بتحديث نسخة الـ APK الجديدة.`
					});
					return;
				}
				setResult({
					success: true,
					message: `تم نسخ بيانات ${donorsList.length} متبرعاً بصيغة CSV إلى الحافظة؛ حدّث نسخة الـ APK لتفعيل التصدير كملف مباشرة.`
				});
				return;
			}
			const file = new File([csvContent], fileName, { type: "text/csv;charset=utf-8" });
			const nav = navigator;
			if (typeof nav.share === "function" && typeof nav.canShare === "function" && nav.canShare({ files: [file] })) {
				await nav.share({
					files: [file],
					title: "سجل متبرعي بنك الدم قعطبة"
				});
				setResult({
					success: true,
					message: `تم فتح المشاركة للملف ${fileName} ويحتوي على ${donorsList.length} متبرعاً.`
				});
				return;
			}
			objectUrl = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.href = objectUrl;
			link.download = fileName;
			link.style.position = "fixed";
			link.style.left = "-10000px";
			document.body.appendChild(link);
			link.click();
			link.remove();
			setResult({
				success: true,
				message: `تم إنشاء ملف ${fileName} ويحتوي على ${donorsList.length} متبرعاً. بدأ طلب التنزيل؛ افحص مجلد التنزيلات.`
			});
		} catch (err) {
			const msg = String(err?.message || "");
			if (err?.name === "AbortError" || msg.toLowerCase().includes("cancel")) setResult({
				success: false,
				message: "تم إلغاء مشاركة الملف؛ لم يتم إرسال أي بيانات."
			});
			else {
				console.error("Donor export failed:", err);
				setResult({
					success: false,
					message: err?.message || "تعذر إنشاء أو مشاركة ملف المتبرعين."
				});
			}
		} finally {
			if (objectUrl) window.setTimeout(() => URL.revokeObjectURL(objectUrl), 6e4);
			setLoading(false);
		}
	};
	if (!(userProfile?.role === "admin" || currentUser?.email === "ziadalsyyadi@gmail.com" || currentUser?.email === "user_967773633918_v1@qataba-blood.app")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md mx-auto my-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-right",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-7 h-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-black text-center text-slate-900",
				children: "الدخول للمسؤول فقط"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-center text-slate-600",
				children: "سجّل الدخول بحساب المسؤول المعتمد. لا يمكن فتح لوحة الإدارة باستخدام رمز PIN أو وضع المستخدم."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs",
				children: "العودة"
			})
		]
	});
	const handleSaveSettings = async () => {
		if (!currentUser) return;
		setLoading(true);
		setResult(null);
		try {
			await setDoc(doc(db, "settings", "global"), {
				announcement: announcement.trim(),
				noticeMessage: announcement.trim(),
				announcementType,
				announcementTime: (/* @__PURE__ */ new Date()).toISOString(),
				announcementActive: Boolean(announcement.trim()),
				updatedAt: serverTimestamp(),
				updatedBy: currentUser.uid
			}, { merge: true });
			setResult({
				success: true,
				message: announcement.trim() ? "تم تعميم الرسالة ونشرها بنجاح لتظهر فوراً عند جميع المشتركين في الإشعارات! ✓" : "تم تحديث الإعدادات بنجاح!"
			});
		} catch (err) {
			setResult({
				success: false,
				message: `فشل الحفظ: ${err.message}`
			});
		} finally {
			setLoading(false);
		}
	};
	const handleClearAnnouncement = async () => {
		if (!currentUser) return;
		setLoading(true);
		setResult(null);
		try {
			await setDoc(doc(db, "settings", "global"), {
				announcement: "",
				noticeMessage: "",
				announcementActive: false,
				updatedAt: serverTimestamp(),
				updatedBy: currentUser.uid
			}, { merge: true });
			setAnnouncement("");
			setResult({
				success: true,
				message: "تم إلغاء ومسح الرسالة من إشعارات جميع المشتركين بنجاح. ✓"
			});
		} catch (err) {
			setResult({
				success: false,
				message: `فشل المسح: ${err.message}`
			});
		} finally {
			setLoading(false);
		}
	};
	const handleImport = async () => {
		if (!importText.trim()) return;
		setLoading(true);
		setResult(null);
		try {
			const res = await importRawDonors(importText);
			if (res.success) {
				setResult({
					success: true,
					message: `تم استيراد ${res.count} متبرعاً بنجاح إلى قاعدة البيانات!`
				});
				setImportText("");
			} else setResult({
				success: false,
				message: res.error || "فشل الاستيراد"
			});
		} catch (err) {
			setResult({
				success: false,
				message: err.message
			});
		} finally {
			setLoading(false);
		}
	};
	const fileInputRef = import_react.useRef(null);
	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setLoading(true);
		setResult(null);
		const reader = new FileReader();
		reader.onload = async (event) => {
			try {
				const text = event.target?.result;
				if (!text || !text.trim()) {
					setResult({
						success: false,
						message: "الملف المختار فارغ أو تعذر قراءته"
					});
					setLoading(false);
					return;
				}
				setImportText(text);
				const res = await importRawDonors(text);
				if (res.success) setResult({
					success: true,
					message: `تم اختيار الملف (${file.name}) واستيراد ${res.count} متبرعاً بنجاح إلى قاعدة البيانات!`
				});
				else setResult({
					success: false,
					message: res.error || "حدث خطأ أثناء تحليل بيانات الملف المختار"
				});
			} catch (err) {
				setResult({
					success: false,
					message: `فشل قراءة الملف: ${err.message}`
				});
			} finally {
				setLoading(false);
				if (fileInputRef.current) fileInputRef.current.value = "";
			}
		};
		reader.onerror = () => {
			setResult({
				success: false,
				message: "حدث خطأ أثناء فتح ملف الهاتف"
			});
			setLoading(false);
		};
		reader.readAsText(file);
	};
	const handleCleanupUsers = async () => {
		if (!window.confirm("هل أنت متأكد من حذف كافة المستخدمين التجريبيين؟ سيتم الإبقاء على حسابك وحسابات المسؤولين الموثقة فقط.")) return;
		setIsCleaningUp(true);
		setResult(null);
		try {
			const usersSnap = await getDocs(collection(db, "users"));
			let deletedCount = 0;
			for (const userDoc of usersSnap.docs) {
				const data = userDoc.data();
				const email = data.email || "";
				if (email === "ziadalsyyadi@gmail.com" || email === "user_967773633918_v1@qataba-blood.app" || data.role === "admin" || userDoc.id === currentUser?.uid) continue;
				await deleteDoc(doc(db, "users", userDoc.id));
				deletedCount++;
			}
			setResult({
				success: true,
				message: `تم تنظيف قاعدة البيانات وحذف ${deletedCount} مستخدم تجريبي بنجاح.`
			});
			fetchUserStats();
		} catch (e) {
			setResult({
				success: false,
				message: `فشل التنظيف: ${e.message}`
			});
		} finally {
			setIsCleaningUp(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				ref: fileInputRef,
				onChange: handleFileSelect,
				accept: ".csv,.txt,.tsv,.xlsx,.xls",
				className: "hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-black text-slate-900",
							children: "لوحة تحكم المسؤول"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full",
							children: "صلاحيات كاملة ✓"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-600 font-medium",
						children: "إدارة السجل، الإعلانات، المزامنة، وصلاحيات التعديل"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						onGlobalRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onGlobalRefresh,
							disabled: isRefreshing,
							className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-xs font-bold shadow-xs active:scale-95 disabled:opacity-50",
							title: "تحديث شامل للتطبيق وسحب أي إضافات وتعديلات جديدة فوراً",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isRefreshing ? "جارٍ التحديث..." : "تحديث شامل للتطبيق" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								switchActiveRole("user");
								onBack();
							},
							className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الرجوع لوضع المستخدم" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onBack,
							className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-black transition-colors text-xs font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الرئيسية" })]
						})
					]
				})]
			}),
			showChatManager && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-white lg:bg-black/50 lg:backdrop-blur-sm lg:p-4 flex items-center justify-center animate-in fade-in zoom-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full h-full lg:max-w-6xl lg:h-[90vh] relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowChatManager(false),
						className: "absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6 text-gray-900" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminChatManager, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-3xl bg-linear-to-br from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200 flex flex-col items-center justify-center text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-2xl bg-white/20 backdrop-blur-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black",
								children: totalUsersCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold text-amber-100",
								children: "إجمالي مستخدمي التطبيق"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200 flex flex-col items-center justify-center text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-2xl bg-white/20 backdrop-blur-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xl font-black",
								children: ["+", todaySignupsCount]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold text-emerald-100",
								children: "المنضمين الجدد اليوم"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-3xl bg-linear-to-br from-red-600 to-red-700 text-white shadow-md shadow-red-200 flex flex-col items-center justify-center text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-2xl bg-white/20 backdrop-blur-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black",
								children: donors.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold text-red-100",
								children: "إجمالي المتبرعين المسجلين"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-3xl bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200 flex flex-col items-center justify-center text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-2xl bg-white/20 backdrop-blur-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black",
								children: adminsCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold text-blue-100",
								children: "المسؤولين (Admins)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-3xl bg-linear-to-br from-slate-800 to-slate-900 text-white shadow-md shadow-slate-200 flex flex-col items-center justify-center text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-2xl bg-white/20 backdrop-blur-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-5 h-5 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black",
								children: hospitals.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold text-slate-300",
								children: "المستشفيات والمراكز"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-red-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-black",
									children: "استيراد بيانات من إكسل / ملفات الهاتف"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-600 leading-relaxed",
								children: "اضغط الزر أدناه لفتح ملفات الهاتف مباشرة واختيار ملف إكسل أو ملف نصي للاستيراد التلقائي."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								disabled: loading,
								className: "w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📁 فتح ملفات الهاتف واختيار الملف تلقائياً" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center justify-center my-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-slate-200 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-white px-2 text-[10px] text-slate-400 uppercase font-bold",
									children: "أو لصق نصي يدوي"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: importText,
								onChange: (e) => setImportText(e.target.value),
								placeholder: "ألصق النص هنا (الاسم، الفصيلة، الهاتف، العنوان...)",
								className: "w-full h-24 p-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-hidden text-xs font-medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleImport,
									disabled: loading || !importText.trim(),
									className: "flex-1 py-3 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md shadow-red-100 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بدء الاستيراد النصي" })] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleExportExcel,
									disabled: loading,
									className: "py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-100 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تصدير السجل إلى Excel" })]
								})]
							}),
							result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-3 rounded-xl flex items-center gap-2 text-xs font-bold ${result.success ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`,
								children: [result.success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: result.message })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-slate-900",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-5 h-5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-black",
										children: "إرسال رسالة تظهر عند الجميع في الإشعارات"
									})]
								}), announcement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نشط حالياً" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-600 leading-relaxed font-medium",
								children: "اكتب رسالة أو تعميم لتظهر لجميع المشتركين في نافذة الإشعارات والشريط التنبيهي فوراً:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] font-bold text-slate-500 mb-1",
										children: "نوع الإشعار:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAnnouncementType("general"),
												className: `py-1.5 px-2 rounded-xl text-center text-xs font-bold border transition-all ${announcementType === "general" ? "bg-amber-500 text-white border-amber-500 shadow-2xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
												children: "تنويه عام"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAnnouncementType("urgent"),
												className: `py-1.5 px-2 rounded-xl text-center text-xs font-bold border transition-all ${announcementType === "urgent" ? "bg-red-600 text-white border-red-600 shadow-2xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
												children: "نداء طارئ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAnnouncementType("campaign"),
												className: `py-1.5 px-2 rounded-xl text-center text-xs font-bold border transition-all ${announcementType === "campaign" ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs" : "bg-slate-50 text-slate-700 border-slate-200"}`,
												children: "حملة تبرع"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] font-bold text-slate-500 mb-1 uppercase",
										children: "نص الرسالة المنشورة للجميع:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: announcement,
										onChange: (e) => setAnnouncement(e.target.value),
										placeholder: "اكتب التنويه أو الإشعار الذي تريده أن يظهر لجميع المستخدمين فوراً...",
										rows: 3,
										className: "w-full p-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-hidden text-xs font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleSaveSettings,
											disabled: loading || !announcement.trim(),
											className: "flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-50 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إرسال وتعميم في الإشعارات للجميع" })]
										}), announcement.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleClearAnnouncement,
											disabled: loading,
											className: "py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer",
											title: "مسح الإشعار الحالي",
											children: "مسح الإشعار"
										})]
									}),
									onGlobalRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 border-t border-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: onGlobalRefresh,
											disabled: isRefreshing,
											className: "w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-98",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 text-emerald-600 ${isRefreshing ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isRefreshing ? "جارٍ التحديث الشامل..." : "🔄 زر التحديث الشامل للتطبيق وسحب أي إضافة جديدة" })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-slate-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-slate-400",
										children: "روابط الربط والتحكم"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold",
										children: "متصل"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/edit`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-black",
												children: "فتح جدول بيانات Google Sheets"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5 opacity-80" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "text-[9px] text-slate-500 truncate flex-1 font-mono",
												dir: "ltr",
												children: GOOGLE_SHEETS_CONFIG.appsScriptUrl
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													navigator.clipboard.writeText(GOOGLE_SHEETS_CONFIG.appsScriptUrl);
													setResult({
														success: true,
														message: "تم نسخ رابط Google Apps Script بنجاح."
													});
												},
												title: "نسخ رابط Apps Script",
												className: "p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: GOOGLE_SHEETS_CONFIG.appsScriptUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												title: "فحص رابط Apps Script",
												className: "p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })
											})
										]
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-8 h-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-black text-slate-900",
								children: "مركز الرسائل والدعم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 mt-1 max-w-[200px]",
								children: "الرد على استفسارات المستخدمين وحل مشكلاتهم عبر المحادثة المباشرة"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowChatManager(true),
								className: "w-full py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-100 transition-all flex items-center justify-center gap-2 active:scale-98",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "فتح مركز الرسائل" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-slate-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-black",
									children: "إدارة النظام والتنظيف"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-600 leading-relaxed",
								children: "يمكنك تنظيف قاعدة البيانات من الحسابات التجريبية أو إدارة صلاحيات المسؤولين. سيتم الحفاظ على حسابك الأساسي فقط."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleCleanupUsers,
								disabled: isCleaningUp,
								className: "w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50",
								children: [isCleaningUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حذف كافة المستخدمين التجريبيين (تنظيف)" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-slate-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-[10px] font-black text-slate-400 mb-2 uppercase",
									children: [
										"المسؤولون الحاليون (",
										adminsCount,
										"):"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5 max-h-[120px] overflow-y-auto pr-1",
									children: adminsList.map((admin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-2 rounded-lg bg-blue-50/50 border border-blue-100/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold text-slate-800",
												children: admin.displayName || admin.fullName || "بدون اسم"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] text-slate-500 font-mono truncate max-w-[120px]",
												children: admin.email || admin.phone || admin.id
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-bold",
											children: "مسؤول"
										})]
									}, admin.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-slate-900",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-black",
										children: "إدارة مستخدمي التطبيق"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowUsersSection(!showUsersSection),
									className: "text-[10px] font-bold text-indigo-600 hover:underline",
									children: showUsersSection ? "إخفاء القائمة" : "عرض كافة المستخدمين"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 leading-relaxed font-medium",
								children: "عرض أسماء وبيانات كافة المسجلين في التطبيق."
							}),
							showUsersSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-[300px] overflow-y-auto pr-1 pt-2 border-t border-slate-50",
								children: allUsersList.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-black text-slate-900",
											children: u.displayName || u.fullName || "مستخدم غير معروف"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-slate-500 font-mono",
											children: u.phone || u.email || "بدون هاتف"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [u.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold",
											children: "مسؤول"
										}), u.role !== "admin" && (u.uid || u.id) !== currentUser?.uid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleDeleteAppUser(u.uid || u.id),
											disabled: deletingUserId === (u.uid || u.id),
											className: "p-1.5 rounded-lg bg-red-50 text-red-600 disabled:opacity-40",
											title: "حذف الحساب",
											children: deletingUserId === (u.uid || u.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})]
									})]
								}, u.uid || u.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-slate-900",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-5 h-5 text-rose-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-sm font-black",
										children: [
											"استعادة كلمات المرور (",
											recoveryRequests.length,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: refreshRecoveryRequests,
									className: "text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تحديث" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-600 leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "من أين تحصل على الرمز؟" }), " يقوم التطبيق بتوليد رمز المكوّن من 6 أرقام تلقائياً هنا في لوحة المسؤول فور ضغطك على «اعتماد وإصدار رمز» أو «توليد رمز استعادة»، ليظهر لك مباشرةً مع زر نسخه وإرساله للمستخدم عبر واتساب."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleIssueDirectRecovery,
								className: "p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-black text-slate-800 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5 text-rose-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إصدار رمز استعادة فوري برقم الهاتف" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											dir: "ltr",
											value: directRecoveryPhone,
											onChange: (e) => setDirectRecoveryPhone(e.target.value),
											placeholder: "رقم هاتف المستخدم (مثال: 773633918)",
											className: "w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-right outline-hidden focus:ring-2 focus:ring-rose-500",
											required: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: directRecoveryName,
											onChange: (e) => setDirectRecoveryName(e.target.value),
											placeholder: "اسم المستخدم (اختياري)",
											className: "w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-rose-500"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: issuingDirectRecovery || !directRecoveryPhone.trim(),
										className: "w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition-all disabled:opacity-50 cursor-pointer",
										children: issuingDirectRecovery ? "جارٍ توليد الرمز..." : "توليد رمز استعادة من 6 أرقام الآن"
									})
								]
							}),
							issuedRecoveryCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs font-black text-emerald-950",
											children: ["رمز الاستعادة لـ ", issuedRecoveryCode.fullName]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${issuedRecoveryCode.matchedExistingAccount ? "bg-emerald-200 text-emerald-900" : "bg-amber-100 text-amber-800"}`,
											children: issuedRecoveryCode.matchedExistingAccount ? "تم ربطه بالحساب السابق" : "تفعيل/تعيين للرقم"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-bold text-emerald-800",
										dir: "ltr",
										children: issuedRecoveryCode.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-black tracking-[0.35em] text-center text-emerald-950 bg-white/80 py-2 rounded-xl border border-emerald-100 select-all",
										dir: "ltr",
										children: issuedRecoveryCode.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												navigator.clipboard?.writeText(issuedRecoveryCode.code);
												setCopiedRecoveryCode(true);
											},
											className: "py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copiedRecoveryCode ? "تم نسخ الرمز ✓" : "نسخ الرمز" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://wa.me/${toWhatsAppNumber(issuedRecoveryCode.phone)}?text=${encodeURIComponent(`مرحباً ${issuedRecoveryCode.fullName}، تم التحقق من حسابك في تطبيق بنك الدم قعطبة.\nرمز استعادة كلمة المرور الخاص بك هو: *${issuedRecoveryCode.code}*\nافتح شاشة "نسيت كلمة المرور؟" وأدخل رقم هاتفك (${issuedRecoveryCode.phone}) وهذا الرمز لتعيين كلمة مرور جديدة.`)}`,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-black flex items-center justify-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إرسال عبر واتساب" })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-emerald-800",
										children: "لا يظهر هذا الرمز السري مرة أخرى بعد إغلاق أو تحديث الصفحة؛ أرسله الآن لصاحب الحساب."
									})
								]
							}),
							recoveryRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 text-center py-2",
								children: "لا توجد طلبات استعادة مسجلة حالياً."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5 max-h-[360px] overflow-y-auto pr-1",
								children: recoveryRequests.map((item) => {
									const statusInfo = item.status === "pending" ? {
										label: "بانتظار الموافقة",
										cls: "bg-amber-100 text-amber-800"
									} : item.status === "approved" ? {
										label: "تم إصدار الرمز",
										cls: "bg-blue-100 text-blue-800"
									} : item.status === "used" ? {
										label: "تم التعيين بنجاح",
										cls: "bg-emerald-100 text-emerald-800"
									} : {
										label: "ملغي",
										cls: "bg-rose-100 text-rose-800"
									};
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-black text-slate-900",
													children: item.fullName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-mono font-bold text-slate-700 select-all",
													dir: "ltr",
													children: item.phone || `...${item.phoneLast4}`
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[10px] font-black px-2 py-0.5 rounded-full ${statusInfo.cls}`,
													children: statusInfo.label
												})]
											}),
											item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-slate-600 bg-white px-2.5 py-1.5 rounded-lg border border-slate-100",
												children: item.note
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2 text-[10px] text-slate-500",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.matchedUid ? "✓ حساب مسجل مرتبط" : "التحقق بالرقم" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono",
														children: item.id
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-1.5 pt-1",
												children: [
													(item.status === "pending" || item.status === "approved") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: approvingRecoveryId === item.id,
														onClick: () => handleApproveRecovery(item.id),
														className: "flex-1 py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-[11px] font-black disabled:opacity-50 cursor-pointer",
														children: approvingRecoveryId === item.id ? "جارٍ الإصدار..." : item.status === "approved" ? "إصدار رمز جديد" : "اعتماد وإصدار رمز"
													}),
													item.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: revokingRecoveryId === item.id,
														onClick: () => handleRevokeRecovery(item.id),
														className: "py-2 px-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-black disabled:opacity-50 cursor-pointer",
														children: revokingRecoveryId === item.id ? "جارٍ الإلغاء..." : "إلغاء الرمز"
													}),
													item.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `https://wa.me/${toWhatsAppNumber(item.phone)}`,
														target: "_blank",
														rel: "noopener noreferrer",
														className: "py-2 px-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[11px] font-black flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "واتساب" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: deletingRecoveryId === item.id,
														onClick: () => handleDeleteRecoveryRequest(item.id),
														className: "p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 disabled:opacity-40 cursor-pointer",
														title: "حذف السجل",
														children: deletingRecoveryId === item.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
													})
												]
											})
										]
									}, item.id);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-slate-900",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5 text-rose-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-black",
										children: "إدارة المناطق السكنية"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowLocationsSection(!showLocationsSection),
									className: "text-[10px] font-bold text-rose-600 hover:underline",
									children: showLocationsSection ? "إخفاء المناطق" : "إدارة قائمة المناطق"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 leading-relaxed font-medium",
								children: "تعديل أو حذف المناطق التي تظهر للمتبرعين عند التسجيل."
							}),
							showLocationsSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 pt-2 border-t border-slate-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: locationNameInput,
										onChange: (e) => setLocationLocationNameInput(e.target.value),
										placeholder: "إضافة منطقة جديدة...",
										className: "flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-rose-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: async () => {
											if (!locationNameInput.trim()) return;
											await saveLocation(locationNameInput, editingLocationId || void 0);
											setLocationLocationNameInput("");
											setEditingLocationId(null);
											setResult({
												success: true,
												message: "تم حفظ المنطقة بنجاح! ✓"
											});
										},
										className: "px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-black shadow-md shadow-rose-100",
										children: editingLocationId ? "تعديل" : "إضافة"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-1",
									children: locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-slate-800",
											children: loc.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setEditingLocationId(loc.id);
													setLocationLocationNameInput(loc.name);
												},
												className: "p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: async () => {
													if (window.confirm(`هل أنت متأكد من حذف منطقة "${loc.name}"؟`)) {
														await deleteLocation(loc.id);
														setResult({
															success: true,
															message: "تم حذف المنطقة بنجاح."
														});
													}
												},
												className: "p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
											})]
										})]
									}, loc.id))
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-black text-slate-900 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إدارة بيانات المجتمع" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base sm:text-lg font-black text-slate-900",
								children: "سجل المتبرعين (تعديل وحذف)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500 font-medium",
								children: "التحكم المباشر في بيانات المتبرعين، التعديل أو الحذف الفوري"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowDonorsSection((prev) => !prev),
								className: "px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all",
								children: showDonorsSection ? "إخفاء القائمة" : "عرض السجل للتحكم"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs pt-1 border-t border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-bold",
								children: "إجمالي المتبرعين المسجلين:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "bg-red-50 text-red-700 font-black px-2 py-0.5 rounded-full border border-red-200",
								children: [donors.length, " متبرع"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-black text-slate-900",
								children: "مزامنة الأرشيف"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-500",
								children: "جلب أحدث البيانات من Google Sheets"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									setLoading(true);
									setResult(null);
									try {
										const data = await fetchDonorsFromGoogleSheets();
										if (data.success) {
											if (onGlobalRefresh) await onGlobalRefresh();
											setResult({
												success: true,
												message: `تم مزامنة ${data.count || 0} اسماً من الأرشيف (Sheets ➔ App) بنجاح!`
											});
										} else setResult({
											success: false,
											message: data.error || "فشل المزامنة"
										});
									} catch (e) {
										setResult({
											success: false,
											message: e?.message || "خطأ في الاتصال بالخادم"
										});
									} finally {
										setLoading(false);
									}
								},
								disabled: loading,
								className: "px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 border border-emerald-100 transition-all flex items-center gap-1.5 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مزامنة (من الجدول للتطبيق)" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-base font-black text-rose-900",
									children: "مزامنة التطبيق ➔ جدول غوغل"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-rose-600 font-medium",
									children: "تحديث جدول البيانات بكافة متبرعي التطبيق دفعة واحدة"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									setLoading(true);
									setResult(null);
									try {
										const donors = (await getDocs(collection(db, "donors"))).docs.map((doc) => ({
											id: doc.id,
											...doc.data()
										}));
										if (donors.length === 0) {
											setResult({
												success: false,
												message: "لا توجد بيانات متبرعين في التطبيق لمزامنتها حالياً"
											});
											setLoading(false);
											return;
										}
										const res = await pushAllDonorsToSheets(donors);
										if (res.success) setResult({
											success: true,
											message: `تم تحديث جدول البيانات بـ ${res.count} متبرع من التطبيق بنجاح! ✓`
										});
										else setResult({
											success: false,
											message: res.error || "فشل تحديث جدول البيانات. تأكد من صلاحية Anyone في Apps Script."
										});
									} catch (err) {
										setResult({
											success: false,
											message: `خطأ أثناء المزامنة: ${err.message}`
										});
									} finally {
										setLoading(false);
									}
								},
								disabled: loading,
								className: "w-full py-3.5 rounded-xl bg-rose-600 text-white font-black text-sm hover:bg-rose-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-rose-200 active:scale-98",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بدء المزامنة الشاملة للجدول" })] })
							})]
						})]
					})]
				})]
			}),
			showDonorsSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-xl bg-red-50 text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-black text-slate-900",
									children: "إدارة وتعديل وحذف أي متبرع"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 font-medium",
									children: "بصفتك مسؤول التطبيق، يمكنك إضافة، تعديل أو حذف أي متبرع نهائياً"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onEditDonor?.(""),
									className: "px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-200 transition-all flex items-center gap-2 active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة متبرع جديد" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 text-xs font-bold text-slate-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "bg-slate-100 px-3 py-1 rounded-full",
								children: [
									filteredDonors.length,
									" من أصل ",
									donors.length,
									" متبرع"
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: adminSearchQuery,
									onChange: (e) => setAdminSearchQuery(e.target.value),
									placeholder: "ابحث بالاسم، السكن، أو رقم الهاتف...",
									className: "w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-hidden"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-slate-400 absolute right-3 top-3" }),
								adminSearchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAdminSearchQuery(""),
									className: "absolute left-3 top-2.5 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded",
									children: "مسح"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAdminBloodFilter("ALL"),
								className: `py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${adminBloodFilter === "ALL" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
								children: [
									"الكل (",
									donors.length,
									")"
								]
							}), BLOOD_TYPES.map((bt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAdminBloodFilter(bt),
								className: `py-1 px-2.5 rounded-lg text-xs font-black transition-all ${adminBloodFilter === bt ? "bg-red-600 text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-red-50"}`,
								children: bt
							}, bt))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5 max-h-[460px] overflow-y-auto pr-1",
						children: filteredDonors.length > 0 ? filteredDonors.map((donor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-wrap items-center justify-between gap-3 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm shadow-red-200",
									children: donor.bloodType
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs sm:text-sm font-extrabold text-slate-900",
										children: donor.fullName
									}), donor.isAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full",
										children: "متاح"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] bg-slate-200 text-slate-600 font-medium px-1.5 py-0.5 rounded-full",
										children: "غير متاح"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-[11px] text-slate-500 mt-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-mono font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3 text-slate-400" }), donor.phone]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3 text-red-500" }), donor.residence]
									})]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onEditDonor?.(donor.id),
									className: "px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعديل" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAdminDonorToDelete(donor),
									className: "px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-black transition-all flex items-center gap-1.5 active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حذف" })]
								})]
							})]
						}, donor.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs",
							children: "لا يوجد متبرعون يطابقون معايير البحث الحالية"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 rounded-xl bg-emerald-50 text-emerald-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-black",
							children: "إدارة دليل المستشفيات"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-500 font-medium",
							children: "إضافة وتعديل بيانات المستشفيات والمختبرات في الدليل"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							hospitals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									setLoading(true);
									setResult(null);
									try {
										await seedHospitals();
										setResult({
											success: true,
											message: "تم إدراج البيانات الأولية للمستشفيات بنجاح! ✓"
										});
									} catch (err) {
										console.error("Seed hospitals error:", err);
										setResult({
											success: false,
											message: "فشل تحميل البيانات الافتراضية. تأكد من صلاحيات المسؤول."
										});
									} finally {
										setLoading(false);
									}
								},
								className: "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black transition-all",
								children: "تحميل البيانات الافتراضية"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setEditingHospital(null);
									setHospitalForm({
										name: "",
										type: "",
										address: "",
										phone: "",
										services: ""
									});
									setIsHospitalFormOpen(true);
								},
								className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-200 transition-all flex items-center gap-2 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة مستشفى جديد" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowHospitalsSection((prev) => !prev),
								className: "px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all",
								children: showHospitalsSection ? "إخفاء الدليل" : "عرض الدليل للتحكم"
							})
						]
					})]
				}), showHospitalsSection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5 max-h-[460px] overflow-y-auto pr-1",
					children: hospitals.length > 0 ? hospitals.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-wrap items-center justify-between gap-3 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm shadow-emerald-200",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs sm:text-sm font-extrabold text-slate-900",
								children: h.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-[11px] text-slate-500 mt-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold",
									children: h.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3 text-slate-400" }), h.phone]
								})]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setEditingHospital(h);
									setHospitalForm({
										name: h.name,
										type: h.type,
										address: h.address,
										phone: h.phone,
										services: h.services
									});
									setIsHospitalFormOpen(true);
								},
								className: "px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعديل" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									if (window.confirm(`هل أنت متأكد من حذف ${h.name} من الدليل؟`)) {
										await deleteHospital(h.id);
										setResult({
											success: true,
											message: "تم حذف المستشفى بنجاح"
										});
									}
								},
								className: "px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-black transition-all flex items-center gap-1.5 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حذف" })]
							})]
						})]
					}, h.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs",
						children: "دليل المستشفيات فارغ حالياً. يمكنك إضافة مستشفيات يدوياً أو تحميل البيانات الافتراضية."
					})
				})]
			}),
			isHospitalFormOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 overflow-y-auto max-h-[90vh]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-100 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black text-slate-900",
							children: editingHospital ? "تعديل بيانات مستشفى" : "إضافة مستشفى جديد"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsHospitalFormOpen(false),
							className: "text-slate-400 hover:text-slate-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: async (e) => {
							e.preventDefault();
							setHospitalLoading(true);
							setResult(null);
							try {
								await saveHospital(hospitalForm, editingHospital?.id);
								setResult({
									success: true,
									message: editingHospital ? "تم تحديث بيانات المستشفى بنجاح! ✓" : "تم إضافة المستشفى الجديد بنجاح! ✓"
								});
								setIsHospitalFormOpen(false);
							} catch (err) {
								console.error("Hospital save error:", err);
								setResult({
									success: false,
									message: `فشل حفظ البيانات: ${err.message?.includes("Permission denied") ? "عذراً، لا تمتلك صلاحيات كافية (Admin) للقيام بهذا الإجراء." : "حدث خطأ تقني أثناء الحفظ."}`
								});
							} finally {
								setHospitalLoading(false);
							}
						},
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-slate-700 mb-1",
								children: "اسم المستشفى / المختبر:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.name,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									name: e.target.value
								}),
								className: "w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-slate-700 mb-1",
								children: "النوع (حكومي، خاص، مختبر...):"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.type,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									type: e.target.value
								}),
								className: "w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-slate-700 mb-1",
								children: "العنوان / الموقع:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.address,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									address: e.target.value
								}),
								className: "w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-slate-700 mb-1",
								children: "رقم الهاتف:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hospitalForm.phone,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									phone: e.target.value
								}),
								className: "w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono",
								dir: "ltr",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-slate-700 mb-1",
								children: "الخدمات المتوفرة:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: hospitalForm.services,
								onChange: (e) => setHospitalForm({
									...hospitalForm,
									services: e.target.value
								}),
								className: "w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-hidden",
								rows: 3
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: hospitalLoading,
								className: "w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2",
								children: [hospitalLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: editingHospital ? "تحديث البيانات" : "إضافة إلى الدليل" })]
							})
						]
					})]
				})
			}),
			adminDonorToDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-slate-900",
									children: "تأكيد حذف المتبرع كمسؤول"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-600 leading-relaxed",
									children: [
										"هل أنت متأكد من حذف بيانات المتبرع ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-red-600 underline underline-offset-2",
											children: adminDonorToDelete.fullName
										}),
										" (فصيلة ",
										adminDonorToDelete.bloodType,
										") من السجل نهائياً؟"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-400 font-medium",
									children: "سيتم حذف المتبرع فوراً واستبعاده من كافة الشاشات وقواعد البيانات."
								})
							]
						}),
						adminDeleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold text-center border border-red-200 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 shrink-0 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: adminDeleteError })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: async () => {
									if (!adminDonorToDelete || !onDeleteDonor) return;
									setAdminIsDeleting(true);
									setAdminDeleteError(null);
									try {
										await onDeleteDonor(adminDonorToDelete.id, adminDonorToDelete.phone);
										setResult({
											success: true,
											message: `تم حذف بيانات المتبرع (${adminDonorToDelete.fullName}) بنجاح! ✓`
										});
										setAdminDonorToDelete(null);
									} catch (err) {
										setAdminDeleteError(err.message || "حدث خطأ أثناء محاولة الحذف");
									} finally {
										setAdminIsDeleting(false);
									}
								},
								disabled: adminIsDeleting,
								className: "py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50",
								children: adminIsDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تأكيد الحذف" })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setAdminDonorToDelete(null);
									setAdminDeleteError(null);
								},
								disabled: adminIsDeleting,
								className: "py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors",
								children: "إلغاء"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					{
						label: "إجمالي المتبرعين",
						value: donors.length.toString(),
						icon: Database,
						color: "blue"
					},
					{
						label: "متاحين للتبرع",
						value: donors.filter((d) => d.isAvailable).length.toString(),
						icon: CircleCheck,
						color: "emerald"
					},
					{
						label: "متبرعين بدم إيجابي",
						value: donors.filter((d) => d.bloodType.includes("+")).length.toString(),
						icon: ShieldCheck,
						color: "rose"
					},
					{
						label: "متبرعين بدم سلبي",
						value: donors.filter((d) => d.bloodType.includes("-")).length.toString(),
						icon: Search,
						color: "amber"
					}
				].map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: `w-5 h-5 text-${stat.color}-500 mb-1` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-black text-slate-900",
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-bold text-slate-500",
							children: stat.label
						})
					]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodDonationEducationalInfo, {})
		]
	});
};
// src/components/ChatSupport.tsx
var ChatSupport = ({ userProfile, onBack }) => {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [conversation, setConversation] = (0, import_react.useState)(null);
	const messagesEndRef = (0, import_react.useRef)(null);
	const currentUser = auth.currentUser;
	(0, import_react.useEffect)(() => {
		if (!currentUser) return;
		const unsubscribeMessages = subscribeToMessages(currentUser.uid, (msgs) => {
			setMessages(msgs);
			markAsRead(currentUser.uid, false);
		});
		const unsubscribeConv = subscribeToConversation(currentUser.uid, (conv) => {
			setConversation(conv);
		});
		return () => {
			unsubscribeMessages();
			unsubscribeConv();
		};
	}, [currentUser]);
	(0, import_react.useEffect)(() => {
		scrollToBottom();
	}, [messages]);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!inputText.trim() || !currentUser) return;
		const text = inputText;
		setInputText("");
		await sendMessage(currentUser.uid, currentUser.uid, text, false, userProfile ? {
			displayName: userProfile.displayName,
			phone: userProfile.phone
		} : void 0);
	};
	if (!currentUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-full p-8 text-center bg-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "text-red-600 w-8 h-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold text-gray-900 mb-2",
				children: "يرجى تسجيل الدخول"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-gray-600",
				children: "يجب عليك تسجيل الدخول لتتمكن من التواصل مع الإدارة."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-gray-50 max-w-4xl mx-auto w-full",
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onBack,
							className: "p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md",
							children: "ق"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold text-gray-900",
							children: "تواصل مع الإدارة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-green-500 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-gray-500",
								children: "متصل الآن"
							})]
						})] })
					]
				}), conversation?.status === "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium",
					children: "المحادثة مغلقة"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4",
				children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center justify-center h-full text-center space-y-4 opacity-75",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-12 h-12 text-red-500 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-600 font-medium leading-relaxed",
							children: "مرحباً بك! يمكنك إرسال استفساراتك أو بلاغاتك هنا، وسيقوم فريق الإدارة بالرد عليك في أقرب وقت."
						})]
					})
				}) : messages.map((msg) => {
					const isMe = msg.senderId === currentUser.uid;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${isMe ? "justify-start" : "justify-end"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[85%] rounded-2xl px-4 py-2 shadow-sm ${isMe ? "bg-red-600 text-white rounded-tr-none" : "bg-white text-gray-900 border border-gray-100 rounded-tl-none"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed whitespace-pre-wrap",
								children: msg.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[10px] mt-1 text-left ${isMe ? "text-red-100" : "text-gray-400"}`,
								children: msg.createdAt?.toDate ? format(msg.createdAt.toDate(), "p", { locale: ar }) : ""
							})]
						})
					}, msg.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border-t p-4 sticky bottom-0",
				children: conversation?.status === "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center p-2 bg-gray-50 rounded-lg border border-gray-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500",
						children: "تم إغلاق هذه المحادثة من قبل الإدارة."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleSendMessage({ preventDefault: () => {} }),
						className: "text-red-600 text-sm font-bold mt-1 hover:underline",
						children: "بدء محادثة جديدة؟"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSendMessage,
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: inputText,
						onChange: (e) => setInputText(e.target.value),
						placeholder: "اكتب رسالتك هنا...",
						className: "flex-1 bg-gray-100 border-none focus:ring-2 focus:ring-red-500 rounded-xl px-4 py-3 text-sm transition-all"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !inputText.trim(),
						className: "bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 transition-colors shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-5 h-5 transform rotate-180" })
					})]
				})
			})
		]
	});
};
// src/components/AuthModal.tsx
var AuthModal = ({ isOpen, onClose, isInitialScreen = false }) => {
	const { loginWithPhone, registerWithPhone, loginWithGoogle, continueAsGuest } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [phone, setPhone] = (0, import_react.useState)(() => localStorage.getItem("qataba_recovery_phone") || "");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)(() => localStorage.getItem("qataba_recovery_name") || "");
	const [recoveryNote, setRecoveryNote] = (0, import_react.useState)("");
	const [recoveryRequestId, setRecoveryRequestId] = (0, import_react.useState)(() => localStorage.getItem("qataba_recovery_request_id") || "");
	const [recoveryCode, setRecoveryCode] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmNewPassword, setConfirmNewPassword] = (0, import_react.useState)("");
	const [showNewPassword, setShowNewPassword] = (0, import_react.useState)(false);
	const [recoveryRequested, setRecoveryRequested] = (0, import_react.useState)(() => Boolean(localStorage.getItem("qataba_recovery_request_id")));
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)(null);
	const [showProviderSetupHelp, setShowProviderSetupHelp] = (0, import_react.useState)(false);
	if (!isOpen) return null;
	const handleResetForm = (preservePhone = false) => {
		setErrorMsg(null);
		setSuccessMsg(null);
		setShowProviderSetupHelp(false);
		if (!preservePhone) {
			setFullName("");
			setRecoveryRequestId("");
			setRecoveryRequested(false);
		}
		setRecoveryNote("");
		setRecoveryCode("");
		setNewPassword("");
		setConfirmNewPassword("");
	};
	const handleGoogleSignIn = async () => {
		setErrorMsg(null);
		setSuccessMsg(null);
		setShowProviderSetupHelp(false);
		setLoading(true);
		try {
			const googleUser = await loginWithGoogle();
			localStorage.removeItem("has_logged_out");
			confetti_module_default({
				particleCount: 80,
				spread: 60,
				origin: { y: .6 }
			});
			setSuccessMsg(`تم تسجيل الدخول بنجاح باستخدام ${googleUser.email || "حساب Google"}`);
			setTimeout(() => {
				onClose();
				handleResetForm();
			}, 1e3);
		} catch (err) {
			console.error("Google sign in error:", err);
			if (!([
				"auth/popup-closed-by-user",
				"auth/cancelled-popup-request",
				"auth/cancelled"
			].includes(err.code) || /cancelled|canceled/i.test(err.message || ""))) setErrorMsg("حدث خطأ أثناء تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.");
		} finally {
			setLoading(false);
		}
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMsg(null);
		setSuccessMsg(null);
		setLoading(true);
		try {
			if (!phone) throw new Error("يرجى إدخال رقم الهاتف");
			await loginWithPhone(phone, password);
			localStorage.removeItem("has_logged_out");
			onClose();
			handleResetForm();
		} catch (err) {
			console.error("Login error:", err);
			if (err.code === "auth/firebase-app-check-token-is-invalid" || err.message?.includes("firebase-app-check-token-is-invalid") || err.message?.includes("app-check")) setErrorMsg("⚠️ حماية App Check في مشروعك بـ Firebase تمنع الدخول بدون توثيق (App Check Token Invalid). يرجى فتح Firebase Console ⬅️ App Check ⬅️ اختيار (Authentication / Identity Platform) وتغيير حالتها من Enforced إلى Un-enforced.");
			else if (err.code === "auth/operation-not-allowed" || err.message?.includes("operation-not-allowed")) {
				setShowProviderSetupHelp(true);
				setErrorMsg("خدمة تسجيل الدخول بكلمة المرور (Email/Password) غير مفعلة في مشروع Firebase حتى الآن.");
			} else if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") setErrorMsg("رقم الهاتف/البريد أو كلمة المرور غير صحيحة");
			else setErrorMsg(err.message || "حدث خطأ أثناء تسجيل الدخول. يرجى التأكد من البيانات والمحاولة مجدداً.");
		} finally {
			setLoading(false);
		}
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		setErrorMsg(null);
		setSuccessMsg(null);
		if (!phone || phone.length < 7) {
			setErrorMsg("يرجى إدخال رقم الهاتف اليمني المكون من 9 أرقام");
			return;
		}
		if (!password || password.length < 6) {
			setErrorMsg("كلمة المرور يجب أن لا تقل عن 6 خانات");
			return;
		}
		if (!fullName || fullName.trim().length < 3) {
			setErrorMsg("يرجى إدخال اسمك الكامل بشكل صحيح (3 أحرف على الأقل)");
			return;
		}
		setLoading(true);
		try {
			await registerWithPhone(phone, password, fullName);
			localStorage.removeItem("has_logged_out");
			confetti_module_default({
				particleCount: 90,
				spread: 70,
				origin: { y: .6 }
			});
			setSuccessMsg("تم إنشاء حسابك وحفظه بنجاح والدخول تلقائياً!");
			setTimeout(() => {
				onClose();
				handleResetForm();
			}, 1200);
		} catch (err) {
			console.error("Register error:", err);
			if (err.code === "auth/firebase-app-check-token-is-invalid" || err.message?.includes("firebase-app-check-token-is-invalid") || err.message?.includes("app-check")) setErrorMsg("⚠️ حماية App Check في مشروعك بـ Firebase تمنع إنشاء الحسابات بدون توثيق (App Check Token Invalid). يرجى فتح Firebase Console ⬅️ App Check ⬅️ اختيار (Authentication / Identity Platform) وتغيير حالتها من Enforced إلى Un-enforced.");
			else if (err.code === "auth/operation-not-allowed" || err.message?.includes("operation-not-allowed")) {
				setShowProviderSetupHelp(true);
				setErrorMsg("خدمة إنشاء الحسابات بكلمة المرور (Email/Password) غير مفعلة في مشروعك حتى الآن.");
			} else if (err.code === "auth/email-already-in-use" || err.message?.includes("مسجل بالفعل")) setErrorMsg("هذا الرقم مسجل بالفعل في التطبيق. يمكنك تسجيل الدخول مباشرة أو استعادة كلمة المرور.");
			else if (err.code === "auth/weak-password" || err.message?.includes("كلمة المرور ضعيفة")) setErrorMsg("كلمة المرور ضعيفة. يرجى اختيار كلمة مرور لا تقل عن 6 خانات.");
			else if (err.message?.includes("Missing or insufficient permissions") || err.code === "permission-denied") setErrorMsg("تعذر حفظ بيانات الحساب في Firestore بسبب الصلاحيات. لم يكتمل التسجيل؛ تحقق من إعدادات قاعدة البيانات قبل إعادة المحاولة.");
			else setErrorMsg(err.message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
		} finally {
			setLoading(false);
		}
	};
	const handleGuest = () => {
		localStorage.removeItem("has_logged_out");
		continueAsGuest();
		onClose();
		handleResetForm();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: isInitialScreen ? "min-h-screen w-full bg-linear-to-b from-[#2a0408] via-[#4d070e] to-[#1a0204] flex flex-col items-center justify-center p-4 py-8 sm:py-12 font-['Cairo',sans-serif] dir-rtl" : "fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] dir-rtl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `bg-white rounded-[32px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative space-y-4 text-right border border-white/20 ${isInitialScreen ? "shadow-red-950/80 my-auto" : ""}`,
			children: [
				!isInitialScreen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						onClose();
						handleResetForm();
					},
					className: "absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-2 pt-1 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center drop-shadow-md mb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 100 120",
								className: "w-full h-full",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
										id: "authDropGrad",
										cx: "35%",
										cy: "30%",
										r: "70%",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#ff4b6b"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "40%",
												stopColor: "#e50914"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "85%",
												stopColor: "#a8000b"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#6e0007"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "authHighlight",
										x1: "0%",
										y1: "0%",
										x2: "100%",
										y2: "100%",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#ffffff",
											stopOpacity: "0.8"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "60%",
											stopColor: "#ffffff",
											stopOpacity: "0"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M50 4 C50 4 12 48 12 76 C12 97 29 114 50 114 C71 114 88 97 88 76 C88 48 50 4 50 4 Z",
										fill: "url(#authDropGrad)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M46 16 C42 24 24 52 24 73 C24 80 26 86 30 90 C27 84 28 72 32 60 C36 48 48 28 46 16 Z",
										fill: "url(#authHighlight)",
										opacity: "0.6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										fill: "#ffffff",
										transform: "translate(25, 45) scale(0.5)",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "20",
												r: "12"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 50,38 C 30,38 18,52 18,68 C 18,72 22,76 26,76 C 30,76 34,70 38,62 L 38,94 C 38,98 42,102 46,102 L 54,102 C 58,102 62,98 62,94 L 62,62 C 66,70 70,76 74,76 C 78,76 82,72 82,68 C 82,52 70,38 50,38 Z" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 50,60 C 44,52 34,56 34,65 C 34,74 50,86 50,86 C 50,86 66,74 66,65 C 66,56 56,52 50,60 Z",
												fill: "#e50914"
											})
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-[26px] font-extrabold text-[#d3101c] tracking-tight leading-none",
							children: "قطرة دم تنقذ حياة إنسان"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm font-extrabold text-slate-700",
							children: "بنك الدم - مديرية قعطبه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-xs font-black text-red-600 bg-[#ffecee] border border-red-100 px-4 py-1.5 rounded-full shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3.5 h-3.5 fill-red-600 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "«معاً لإنقاذ الأرواح» ❤️" })]
							})
						})
					]
				}),
				mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 bg-[#f0f3f8] p-1.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 shadow-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("login");
							handleResetForm();
						},
						className: `py-2.5 rounded-xl transition-all cursor-pointer ${mode === "login" ? "bg-white text-red-600 shadow-sm border border-slate-200/60 font-black" : "hover:text-slate-900"}`,
						children: "تسجيل الدخول"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("register");
							handleResetForm();
						},
						className: `py-2.5 rounded-xl transition-all cursor-pointer ${mode === "register" ? "bg-white text-red-600 shadow-sm border border-slate-200/60 font-black" : "hover:text-slate-900"}`,
						children: "حساب جديد لأول مرة"
					})]
				}),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 text-red-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
				}),
				showProviderSetupHelp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2.5 text-xs shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-extrabold text-amber-950 text-xs sm:text-sm",
								children: "خطوة تفعيل سريعة في Firebase (لمرة واحدة فقط)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-amber-800 text-[11px] mt-0.5 leading-relaxed font-bold",
								children: [
									"مشروع Firebase يتطلب تفعيل خيار ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Email/Password" }),
									" لتمكين إنشاء الحسابات بكلمة المرور:"
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/95 p-2.5 rounded-xl border border-amber-200 space-y-1 text-[11px] text-slate-700 font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "1. اضغط على الزر أدناه لفتح صفحة مزودي الدخول في مشروعك." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"2. اضغط على ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "البريد الإلكتروني/كلمة المرور (Email/Password)" }),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"3. قم بتفعيل الخيار الأول (Enable) واضغط ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "حفظ (Save)" }),
									"."
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://console.firebase.google.com/project/a-drop-of-blood-saves-a-life/authentication/providers",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs shadow-xs transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "فتح صفحة تفعيل Email/Password في Firebase" })]
						})
					]
				}),
				successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: successMsg })]
				}),
				mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs sm:text-sm font-black text-slate-800 mb-1.5 text-right",
							children: "رقم الهاتف"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
							value: phone,
							onChange: setPhone,
							placeholder: "773 633 918",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs sm:text-sm font-black text-slate-800 text-right",
								children: "كلمة المرور"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("forgot");
									handleResetForm(true);
								},
								className: "text-xs text-red-600 hover:underline font-bold cursor-pointer",
								children: "نسيت كلمة المرور؟"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center rounded-2xl border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 bg-white overflow-hidden shadow-xs transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pr-3.5 text-slate-400 pointer-events-none shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 stroke-[2]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "أدخل كلمة المرور",
									className: "w-full px-3 py-3 text-xs sm:text-sm outline-hidden font-bold text-slate-900 placeholder:text-slate-300 bg-transparent text-right",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "pl-3.5 pr-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0",
									title: showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full py-3.5 sm:py-4 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 active:scale-[0.98] cursor-pointer mt-2",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-5 h-5 stroke-[2.5]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول" })] })
						})
					]
				}),
				mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRegister,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs sm:text-sm font-black text-slate-800 mb-1.5 text-right",
							children: "1. الاسم الرباعي"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center rounded-2xl border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 bg-white overflow-hidden shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pr-3.5 text-slate-400 pointer-events-none shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 stroke-[2]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								placeholder: "أدخل اسمك الرباعي الكامل",
								className: "w-full px-3 py-3 text-xs sm:text-sm outline-hidden font-bold text-slate-900 placeholder:text-slate-300 bg-transparent text-right",
								required: true
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs sm:text-sm font-black text-slate-800 mb-1.5 text-right",
							children: "2. رقم الهاتف"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
							value: phone,
							onChange: setPhone,
							placeholder: "773 633 918",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs sm:text-sm font-black text-slate-800 mb-1.5 text-right",
							children: "3. كلمة المرور"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center rounded-2xl border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 bg-white overflow-hidden shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pr-3.5 text-slate-400 pointer-events-none shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 stroke-[2]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "اختر كلمة مرور (6 خانات على الأقل)",
									className: "w-full px-3 py-3 text-xs sm:text-sm outline-hidden font-bold text-slate-900 placeholder:text-slate-300 bg-transparent text-right",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "pl-3.5 pr-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-red-50/70 border border-red-100 text-slate-700 text-[11px] leading-relaxed flex items-start gap-2 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-red-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "سيتم حفظ حسابك تلقائياً وتبقى مسجلاً في التطبيق. ولن تحتاج لتسجيل الدخول مرة أخرى إلا إذا قمت بعمل تسجيل خروج يدوي." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full py-3.5 sm:py-4 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 active:scale-[0.98] cursor-pointer",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-5 h-5 stroke-[2.5]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنشاء الحساب والدخول تلقائياً" })] })
						})
					]
				}),
				mode === "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-2.5 border-b border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-slate-900",
								children: "استعادة كلمة المرور"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setMode("login");
								handleResetForm(true);
							},
							className: "text-xs text-red-600 hover:underline font-bold flex items-center gap-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "العودة للدخول" })]
						})]
					}), !recoveryRequested ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs leading-relaxed text-amber-950 font-bold",
								children: "أدخل رقم هاتفك واسمك الكامل لإرسال طلب استعادة كلمة المرور إلى مسؤول التطبيق. بعد التحقق من هويتك سيرسل لك المسؤول رمزاً من 6 أرقام لتعيين كلمة مرور جديدة لحسابك."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-800 mb-1",
								children: "1. رقم الهاتف المسجل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
								value: phone,
								onChange: setPhone,
								placeholder: "773 633 918",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-800 mb-1",
								children: "2. الاسم الكامل (لتأكيد هويتك لدى المسؤول)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								placeholder: "مثال: أحمد محمد علي",
								className: "w-full p-3 rounded-2xl border border-slate-200 focus:border-red-500 outline-hidden text-xs sm:text-sm font-bold text-slate-900 text-right"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-600 mb-1",
								children: "ملاحظة إضافية للمسؤول (اختياري: فصيلة الدم أو المنطقة)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: recoveryNote,
								onChange: (e) => setRecoveryNote(e.target.value),
								placeholder: "مثال: فصيلتي O+ من منطقة قعطبة",
								className: "w-full p-3 rounded-2xl border border-slate-200 focus:border-red-500 outline-hidden text-xs font-bold text-slate-800 text-right"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: loading || !phone.trim() || fullName.trim().length < 2,
								onClick: async () => {
									setLoading(true);
									setErrorMsg(null);
									setSuccessMsg(null);
									try {
										const result = await requestAccountRecoveryByPhone(phone, fullName, recoveryNote);
										setRecoveryRequestId(result.requestId);
										setPhone(result.phone);
										localStorage.setItem("qataba_recovery_phone", result.phone);
										localStorage.setItem("qataba_recovery_name", result.fullName);
										localStorage.setItem("qataba_recovery_request_id", result.requestId);
										setRecoveryRequested(true);
										setSuccessMsg(result.message);
									} catch (error) {
										setErrorMsg(error?.message || "تعذر إرسال طلب الاستعادة.");
									} finally {
										setLoading(false);
									}
								},
								className: "w-full py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-black text-sm shadow-md shadow-red-500/20 disabled:opacity-50 transition-all cursor-pointer",
								children: loading ? "جارٍ إرسال الطلب..." : "إرسال طلب استعادة كلمة المرور للمسؤول"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setErrorMsg(null);
									setSuccessMsg(null);
									setRecoveryRequested(true);
								},
								className: "w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors cursor-pointer",
								children: "لدي رمز استعادة (6 أرقام) من المسؤول بالفعل"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs leading-relaxed text-emerald-950 font-bold space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "تواصل مع المسؤول عبر واتساب لتأكيد هويتك واستلام رمز التفعيل المكون من 6 أرقام، ثم أدخل الرمز وكلمة المرور الجديدة أدناه." }), recoveryRequestId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-emerald-800 font-mono break-all",
									children: ["رقم الطلب: ", recoveryRequestId]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/967773633918?text=${encodeURIComponent(`السلام عليكم، أرجو مساعدتي في استعادة كلمة مرور حسابي في تطبيق بنك الدم قعطبة.\nالاسم: ${fullName || "غير محدد"}\nرقم الهاتف: ${phone || "غير محدد"}${recoveryRequestId ? `\nرقم الطلب: ${recoveryRequestId}` : ""}`)}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-center font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4.5 h-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "التواصل مع المسؤول عبر واتساب لاستلام الرمز" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-800 mb-1",
								children: "رقم الهاتف"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YemenPhoneInput, {
								value: phone,
								onChange: setPhone,
								placeholder: "773 633 918",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-800 mb-1",
								children: "رمز الاستعادة من المسؤول (6 أرقام)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: recoveryCode,
								onChange: (e) => setRecoveryCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
								inputMode: "numeric",
								maxLength: 6,
								placeholder: "000000",
								dir: "ltr",
								className: "w-full p-3 rounded-2xl border border-slate-200 focus:border-red-500 outline-hidden text-center font-mono text-xl font-black tracking-[0.4em] text-slate-900"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-black text-slate-800 mb-1",
								children: "كلمة المرور الجديدة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center rounded-2xl border border-slate-200 focus-within:border-red-500 bg-white overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showNewPassword ? "text" : "password",
									value: newPassword,
									onChange: (e) => setNewPassword(e.target.value),
									autoComplete: "new-password",
									placeholder: "6 خانات على الأقل",
									className: "w-full px-3.5 py-3 text-xs sm:text-sm outline-hidden font-bold text-slate-900 text-right bg-transparent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowNewPassword(!showNewPassword),
									className: "pl-3.5 pr-1 text-slate-400 hover:text-slate-600 cursor-pointer",
									children: showNewPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-black text-slate-800 mb-1",
									children: "تأكيد كلمة المرور الجديدة"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showNewPassword ? "text" : "password",
									value: confirmNewPassword,
									onChange: (e) => setConfirmNewPassword(e.target.value),
									autoComplete: "new-password",
									placeholder: "أعد كتابة كلمة المرور الجديدة",
									className: "w-full p-3 rounded-2xl border border-slate-200 focus:border-red-500 outline-hidden text-xs sm:text-sm font-bold text-slate-900 text-right"
								}),
								confirmNewPassword && newPassword !== confirmNewPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-red-600 font-bold mt-1",
									children: "كلمتا المرور غير متطابقتين"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: loading || !phone.trim() || recoveryCode.length !== 6 || newPassword.length < 6 || newPassword !== confirmNewPassword,
								onClick: async () => {
									setLoading(true);
									setErrorMsg(null);
									setSuccessMsg(null);
									try {
										const result = await completeAccountRecoveryByCode({
											phone,
											code: recoveryCode,
											newPassword,
											fullName,
											requestId: recoveryRequestId
										});
										confetti_module_default({
											particleCount: 90,
											spread: 70,
											origin: { y: .6 }
										});
										setSuccessMsg(`${result.message} تم تسجيل دخولك تلقائياً بحسابك.`);
										localStorage.removeItem("qataba_recovery_phone");
										localStorage.removeItem("qataba_recovery_name");
										localStorage.removeItem("qataba_recovery_request_id");
										setRecoveryRequested(false);
										setRecoveryRequestId("");
										setRecoveryCode("");
										setNewPassword("");
										setConfirmNewPassword("");
										setTimeout(() => {
											onClose();
											handleResetForm();
										}, 1500);
									} catch (error) {
										setErrorMsg(error?.message || "تعذر إكمال استعادة كلمة المرور.");
									} finally {
										setLoading(false);
									}
								},
								className: "w-full py-3.5 rounded-2xl bg-[#e50914] hover:bg-red-700 text-white font-black text-sm shadow-md shadow-red-500/20 disabled:opacity-50 transition-all cursor-pointer",
								children: loading ? "جارٍ التحقق وتعيين كلمة المرور..." : "تأكيد الرمز وتعيين كلمة المرور الجديدة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									localStorage.removeItem("qataba_recovery_request_id");
									setRecoveryRequestId("");
									setRecoveryRequested(false);
									setErrorMsg(null);
									setSuccessMsg(null);
								},
								className: "w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer",
								children: "إرسال طلب استعادة جديد"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center my-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-slate-200 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-white px-3 text-xs text-slate-400 font-bold",
						children: "أو"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleGoogleSignIn,
					disabled: loading,
					className: "w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "w-4.5 h-4.5 shrink-0",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تسجيل الدخول السريع بحساب Google" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleGuest,
					className: "w-full py-3.5 px-4 rounded-2xl bg-[#f0f4f9] hover:bg-slate-200/80 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-colors cursor-pointer active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4.5 h-4.5 text-slate-600 stroke-[2]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المتابعة كزائر دون تسجيل حساب" })]
				})
			]
		})
	});
};
// src/components/AndroidInstallModal.tsx
var AndroidInstallModal = ({ isOpen, onClose }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const appUrl = getAppLink();
	if (!isOpen) return null;
	const handleCopyUrl = () => {
		navigator.clipboard.writeText(appUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleShareApp = async () => {
		await shareData({
			title: "قطرة دم تنقذ حياة - بنك الدم في مديرية قعطبة",
			text: "رابط تطبيق قطرة دم تنقذ حياة، بنك الدم بمديرية قعطبة للبحث والتبرع وإنقاذ الحالات الحرجة:",
			url: appUrl
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 left-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base sm:text-lg font-black text-slate-900",
						children: "دليل تشغيل وتثبيت التطبيق على أندرويد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500",
						children: "خطوات سهلة ومباشرة من هاتفك الأندرويد بدون الحاجة لكمبيوتر"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-xs text-slate-600 font-mono",
						dir: "ltr",
						children: appUrl
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCopyUrl,
						className: "shrink-0 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-2xs",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "تم النسخ" : "نسخ الرابط" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-2xl bg-linear-to-br from-red-50 to-rose-50 border border-red-200 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center shrink-0",
								children: "1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-red-950",
								children: "الطريقة الأسرع والمثالية: التثبيت الفوري عبر متصفح كروم (PWA)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-700 leading-relaxed",
							children: [
								"التطبيق مجهز كـ ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: "Progressive Web App"
								}),
								" مع أيقونة رسمية ويعمل كأي تطبيق أندرويد مثبت:"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "text-xs text-slate-700 space-y-1.5 list-decimal list-inside pr-1 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"افتح الرابط في متصفح ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Google Chrome"
									}),
									" على هاتفك."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"اضغط على زر الخيارات (الثلاث نقاط ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold font-mono",
										children: "⋮"
									}),
									" أعلى يسار أو يمين الشاشة)."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"اختر ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-red-700",
										children: "«تثبيت التطبيق»"
									}),
									" أو ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-red-700",
										children: "«إضافة إلى الشاشة الرئيسية»"
									}),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ستظهر أيقونة «قطرة دم» على شاشة هاتفك الرئيسية وتفتح كشاشة كاملة دون شريط متصفح وبسرعة فائقة!" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0",
								children: "2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-emerald-950",
								children: "تحويل التطبيق إلى ملف APK للتثبيت والإرسال عبر واتساب"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-700 leading-relaxed",
							children: [
								"إذا كنت تريد استخراج ملف بصيغة ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold font-mono",
									children: ".apk"
								}),
								" لمشاركته يدوياً مع أهالي قعطبة:"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 text-xs text-slate-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5 rounded-xl bg-white border border-emerald-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-slate-900 block mb-0.5",
										children: "الخيار المجاني السريع (من متصفح الهاتف):"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ادخل إلى موقع " }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://www.pwabuilder.com",
										target: "_blank",
										rel: "noreferrer",
										className: "font-bold text-emerald-700 underline inline-flex items-center gap-0.5",
										children: ["PWABuilder.com ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 inline" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " أو " }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://www.webintoapp.com",
										target: "_blank",
										rel: "noreferrer",
										className: "font-bold text-emerald-700 underline inline-flex items-center gap-0.5",
										children: ["WebIntoApp.com ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 inline" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " والصق رابط هذا التطبيق، واضغط Generate APK وسيتم تحميل ملف التثبيت مباشرة إلى هاتفك." })
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-900",
						children: "قاعدة البيانات السحابية متصلة:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-500 mt-0.5",
						children: "بيانات المتبرعين والطلبات العاجلة تُحفظ في Google Cloud Firestore وتتزامن فورياً بين كل المستخدمين."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleShareApp,
					className: "w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مشاركة رابط التطبيق عبر واتساب قعطبة" })]
				})
			]
		})
	});
};
// src/components/BloodCompatibilityModal.tsx
var COMPATIBILITY_DATA = {
	"O-": {
		canGiveTo: [
			"O-",
			"O+",
			"A-",
			"A+",
			"B-",
			"B+",
			"AB-",
			"AB+"
		],
		canReceiveFrom: ["O-"],
		special: "المعطي العام للجميع: فصيلة نادرة وثمينة جداً تُنقذ أي مريض في الطوارئ الحرجة."
	},
	"O+": {
		canGiveTo: [
			"O+",
			"A+",
			"B+",
			"AB+"
		],
		canReceiveFrom: ["O+", "O-"],
		special: "أكثر فصائل الدم شيوعاً وطلباً في المستشفيات وبنوك الدم."
	},
	"A-": {
		canGiveTo: [
			"A-",
			"A+",
			"AB-",
			"AB+"
		],
		canReceiveFrom: ["A-", "O-"],
		special: "فصيلة مهمة تُعطي فصائل A و AB بنوعيها الموجب والسالب."
	},
	"A+": {
		canGiveTo: ["A+", "AB+"],
		canReceiveFrom: [
			"A+",
			"A-",
			"O+",
			"O-"
		],
		special: "ثاني أكثر فصيلة انتشاراً، تستقبل من 4 فصائل مختلفة."
	},
	"B-": {
		canGiveTo: [
			"B-",
			"B+",
			"AB-",
			"AB+"
		],
		canReceiveFrom: ["B-", "O-"],
		special: "فصيلة نادرة مطلوبة بكثرة للمرضى ذوي الفصيلة B سالب."
	},
	"B+": {
		canGiveTo: ["B+", "AB+"],
		canReceiveFrom: [
			"B+",
			"B-",
			"O+",
			"O-"
		],
		special: "فصيلة شائعة ومهمة لجراحات الطوارئ ومرضى التلاسيميا."
	},
	"AB-": {
		canGiveTo: ["AB-", "AB+"],
		canReceiveFrom: [
			"AB-",
			"A-",
			"B-",
			"O-"
		],
		special: "أندر فصيلة دم على الإطلاق (أقل من 1% من البشر)."
	},
	"AB+": {
		canGiveTo: ["AB+"],
		canReceiveFrom: [
			"AB+",
			"AB-",
			"A+",
			"A-",
			"B+",
			"B-",
			"O+",
			"O-"
		],
		special: "المستقبل العام: يستطيع أصحاب هذه الفصيلة استقبال الدم من أي متبرع على الإطلاق."
	}
};
var BloodCompatibilityModal = ({ isOpen, onClose }) => {
	const [selected, setSelected] = (0, import_react.useState)("O+");
	if (!isOpen) return null;
	const info = COMPATIBILITY_DATA[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 left-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-6 h-6 fill-red-600" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base sm:text-lg font-black text-slate-900",
						children: "دليل توافق فصائل الدم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500",
						children: "اختر فصيلتك لتعرف لمن تستطيع التبرع ومن يستطيع إعطاءك"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 sm:grid-cols-8 gap-1.5",
					children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelected(bt),
						className: `py-2 rounded-xl text-center font-black text-xs sm:text-sm border transition-all ${selected === bt ? "bg-red-600 text-white border-red-600 shadow-xs scale-105" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,
						children: bt
					}, bt))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-2 border-b border-slate-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 h-9 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-xs",
									children: selected
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-extrabold text-sm text-slate-900",
									children: ["فصيلة ", selected]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full",
								children: "معلومات التوافق"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-600 leading-relaxed font-medium",
							children: info.special
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-slate-800 block",
								children: "تستطيع التبرع بالدم لأصحاب الفصائل:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: info.canGiveTo.map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-emerald-700" }), target]
								}, target))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-slate-800 block",
								children: "تستقبل الدم فقط من أصحاب الفصائل:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: info.canReceiveFrom.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 text-xs font-black border border-blue-300 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-blue-700" }), source]
								}, source))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "قواعد طبية ذهبية:" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] leading-relaxed text-amber-800",
						children: [
							"• ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "O- (سالب):"
							}),
							" المعطي العام لجميع البشر في الحوادث والحروب.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"• ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "AB+ (موجب):"
							}),
							" المستقبل العام من جميع فصائل الدم.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"• الفصائل السالبة تقبل التبرع من السالب فقط، بينما الفصائل الموجبة تقبل من الموجب والسالب."
						]
					})]
				})
			]
		})
	});
};
// src/components/ConfirmExitModal.tsx
var ConfirmExitModal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-xs w-full p-6 shadow-2xl space-y-5 text-center relative animate-in zoom-in-95 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 left-4 p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-8 h-8 rotate-180" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-black text-slate-900 leading-tight",
						children: "تأكيد تسجيل الخروج"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 font-bold leading-relaxed",
						children: "هل تريد حقاً تسجيل الخروج من حسابك؟"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2.5 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onConfirm,
							className: "w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4 rotate-180" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "نعم، تسجيل الخروج" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all active:scale-95 cursor-pointer",
							children: "لا، إلغاء والبقاء"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2 border-t border-slate-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: getWhatsAppUrl("773633918", "السلام عليكم، تواصل بخصوص تطبيق بنك الدم قعطبة"),
								onClick: (e) => {
									e.preventDefault();
									openWhatsAppChat("773633918", "السلام عليكم، تواصل بخصوص تطبيق بنك الدم قعطبة");
								},
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center justify-center gap-1.5 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تواصل مع الإدارة واتساب: 773633918" })]
							})
						})
					]
				})
			]
		})
	});
};
// src/components/RoleSelectionModal.tsx
var RoleSelectionModal = ({ isOpen, onClose, currentRole, onRoleChange }) => {
	const { userProfile, currentUser } = useAuth();
	if (!isOpen) return null;
	const isAuthorizedAdmin = userProfile?.role === "admin" || currentUser?.email === "ziadalsyyadi@gmail.com" || currentUser?.email === "user_967773633918_v1@qataba-blood.app";
	const selectRole = (role) => {
		if (role === "admin" && !isAuthorizedAdmin) return;
		onRoleChange(role);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 text-right",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-6 h-6 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-black",
						children: "أدوار وصلاحيات التطبيق"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => selectRole("user"),
					className: `w-full text-right p-4 rounded-2xl border-2 ${currentRole === "user" ? "border-red-600 bg-red-50" : "border-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-black",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" }), " دور المستخدم"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 mt-1",
						children: "البحث وتسجيل المتبرعين وطلبات الدم"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => selectRole("admin"),
					disabled: !isAuthorizedAdmin,
					className: "w-full text-right p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-black text-amber-900",
						children: "لوحة المسؤول"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-amber-800 mt-1",
						children: isAuthorizedAdmin ? "تم التحقق من صلاحية حسابك" : "الدخول لحساب المسؤول المعتمد فقط بعد تسجيل الدخول"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "w-full py-2 rounded-xl bg-slate-100 text-slate-700 font-bold",
					children: "إغلاق"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-slate-500 text-center",
					children: "صلاحيات المسؤول تُحدد من الحساب وقاعدة البيانات، وليس برمز داخل التطبيق."
				})
			]
		})
	});
};
// node_modules/@capacitor/local-notifications/dist/esm/definitions.js
/**
* Day of the week. Used for scheduling notifications on a particular weekday.
*/
var Weekday;
(function(Weekday) {
	Weekday[Weekday["Sunday"] = 1] = "Sunday";
	Weekday[Weekday["Monday"] = 2] = "Monday";
	Weekday[Weekday["Tuesday"] = 3] = "Tuesday";
	Weekday[Weekday["Wednesday"] = 4] = "Wednesday";
	Weekday[Weekday["Thursday"] = 5] = "Thursday";
	Weekday[Weekday["Friday"] = 6] = "Friday";
	Weekday[Weekday["Saturday"] = 7] = "Saturday";
})(Weekday || (Weekday = {}));
// node_modules/@capacitor/local-notifications/dist/esm/index.js
var LocalNotifications = registerPlugin("LocalNotifications", { web: () => __vitePreload(() => import("./web-CfFeQJEL.js").then((m) => new m.LocalNotificationsWeb()), []) });
// src/services/notificationService.ts
var SOUND_PREF_KEY = "qataba_alert_sound_enabled_v1";
var SEEN_ALERTS_KEY = "qataba_seen_alerts_v1";
var ANDROID_URGENT_CHANNEL_ID = "urgent_blood_alerts";
var sharedAudioCtx = null;
var audioUnlockInstalled = false;
var nativeListenerAttached = false;
var nativeChannelReady = false;
var tapHandler = null;
function getAudioContext() {
	if (typeof window === "undefined") return null;
	const Ctx = window.AudioContext || window.webkitAudioContext;
	if (!Ctx) return null;
	if (!sharedAudioCtx) sharedAudioCtx = new Ctx();
	return sharedAudioCtx;
}
function installAudioUnlockListeners() {
	if (audioUnlockInstalled || typeof window === "undefined") return;
	audioUnlockInstalled = true;
	const unlock = () => {
		const ctx = getAudioContext();
		if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
	};
	window.addEventListener("pointerdown", unlock, { passive: true });
	window.addEventListener("touchstart", unlock, { passive: true });
	window.addEventListener("keydown", unlock, { passive: true });
}
function isAlertSoundEnabled() {
	try {
		const raw = localStorage.getItem(SOUND_PREF_KEY);
		return raw === null ? true : raw === "true";
	} catch {
		return true;
	}
}
function setAlertSoundEnabled(enabled) {
	try {
		localStorage.setItem(SOUND_PREF_KEY, enabled ? "true" : "false");
	} catch {}
}
function hasSeenAlertId(alertId) {
	if (!alertId) return false;
	try {
		const list = JSON.parse(localStorage.getItem(SEEN_ALERTS_KEY) || "[]");
		return Array.isArray(list) && list.includes(alertId);
	} catch {
		return false;
	}
}
function markAlertIdSeen(alertId) {
	if (!alertId) return;
	try {
		const list = JSON.parse(localStorage.getItem(SEEN_ALERTS_KEY) || "[]");
		const clean = Array.isArray(list) ? list : [];
		if (clean.includes(alertId)) return;
		clean.push(alertId);
		const trimmed = clean.slice(-200);
		localStorage.setItem(SEEN_ALERTS_KEY, JSON.stringify(trimmed));
	} catch {}
}
function playUrgentAlertSound(kind = "urgent_request") {
	if (!isAlertSoundEnabled()) return;
	try {
		const ctx = getAudioContext();
		if (!ctx) return;
		if (ctx.state === "suspended") ctx.resume().catch(() => {});
		const now = ctx.currentTime;
		const notes = kind === "admin_reply" ? [{
			freq: 784,
			start: 0,
			dur: .14
		}, {
			freq: 1046.5,
			start: .16,
			dur: .22
		}] : [
			{
				freq: 880,
				start: 0,
				dur: .14
			},
			{
				freq: 1174.66,
				start: .16,
				dur: .14
			},
			{
				freq: 1318.51,
				start: .32,
				dur: .2
			},
			{
				freq: 880,
				start: .62,
				dur: .14
			},
			{
				freq: 1174.66,
				start: .78,
				dur: .14
			},
			{
				freq: 1318.51,
				start: .94,
				dur: .24
			}
		];
		for (const note of notes) {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(note.freq, now + note.start);
			gain.gain.setValueAtTime(1e-4, now + note.start);
			gain.gain.exponentialRampToValueAtTime(.28, now + note.start + .02);
			gain.gain.exponentialRampToValueAtTime(1e-4, now + note.start + note.dur);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now + note.start);
			osc.stop(now + note.start + note.dur + .02);
		}
	} catch (err) {
		console.warn("Alert sound playback skipped:", err);
	}
}
function triggerAlertVibration(kind = "urgent_request") {
	try {
		if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
			const pattern = kind === "admin_reply" ? [
				180,
				90,
				220
			] : [
				250,
				100,
				250,
				100,
				420
			];
			navigator.vibrate(pattern);
		}
	} catch {}
}
function stableNumericId(input) {
	let hash = 0;
	for (let i = 0; i < input.length; i++) hash = hash * 31 + input.charCodeAt(i) | 0;
	const positive = Math.abs(hash) % 2e9;
	return positive > 0 ? positive : 1;
}
async function ensureNativeChannel() {
	if (nativeChannelReady) return;
	if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable("LocalNotifications")) return;
	try {
		await LocalNotifications.createChannel({
			id: ANDROID_URGENT_CHANNEL_ID,
			name: "تنبيهات الدم والرسائل العاجلة",
			description: "إشعارات عالية الأهمية لطلبات التبرع الطارئة وتنبيهات المسؤول",
			importance: 5,
			visibility: 1,
			sound: "default",
			vibration: true,
			lights: true,
			lightColor: "#DC2626"
		});
		nativeChannelReady = true;
	} catch (err) {
		console.warn("Could not create Android notification channel:", err);
	}
}
function setNotificationTapHandler(handler) {
	tapHandler = handler;
}
async function getAlertPermissionStatus() {
	if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("LocalNotifications")) try {
		const status = await LocalNotifications.checkPermissions();
		if (status.display === "granted") return "granted";
		if (status.display === "denied") return "denied";
		return "prompt";
	} catch {
		return "unsupported";
	}
	if (typeof window !== "undefined" && "Notification" in window) {
		if (Notification.permission === "granted") return "granted";
		if (Notification.permission === "denied") return "denied";
		return "prompt";
	}
	return "unsupported";
}
async function requestAlertPermission() {
	if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("LocalNotifications")) try {
		await ensureNativeChannel();
		if ((await LocalNotifications.checkPermissions()).display === "granted") return "granted";
		const req = await LocalNotifications.requestPermissions();
		return req.display === "granted" ? "granted" : req.display === "denied" ? "denied" : "prompt";
	} catch {
		return "unsupported";
	}
	if (typeof window !== "undefined" && "Notification" in window) try {
		const perm = await Notification.requestPermission();
		return perm === "granted" ? "granted" : perm === "denied" ? "denied" : "prompt";
	} catch {
		return "denied";
	}
	return "unsupported";
}
var initializePushNotifications = async (_userId) => {
	installAudioUnlockListeners();
	if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("LocalNotifications")) {
		try {
			await ensureNativeChannel();
			if (!nativeListenerAttached) {
				nativeListenerAttached = true;
				await LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
					const targetTab = event?.notification?.extra?.targetTab;
					if (tapHandler && (targetTab === "urgent" || targetTab === "notifications" || targetTab === "chat")) tapHandler(targetTab);
				});
			}
			await LocalNotifications.requestPermissions();
		} catch (error) {
			console.warn("Native notification initialization note:", error);
		}
		return;
	}
	if (typeof window !== "undefined" && "Notification" in window) try {
		if (Notification.permission === "default") await Notification.requestPermission();
	} catch (error) {
		console.warn("Browser notification permission note:", error);
	}
};
async function sendSystemAlertNotification(payload) {
	if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("LocalNotifications")) try {
		if ((await LocalNotifications.checkPermissions()).display !== "granted") return;
		await ensureNativeChannel();
		await LocalNotifications.schedule({ notifications: [{
			id: stableNumericId(payload.id),
			title: payload.title,
			body: payload.body,
			channelId: ANDROID_URGENT_CHANNEL_ID,
			smallIcon: "ic_launcher",
			extra: {
				targetTab: payload.targetTab,
				alertId: payload.id
			}
		}] });
		return;
	} catch (err) {
		console.warn("Native local notification schedule warning:", err);
	}
	if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
		const options = {
			body: payload.body,
			icon: "/assets/images/app_logo_icon.jpg",
			badge: "/assets/images/app_logo_icon.jpg",
			tag: payload.id,
			renotify: true,
			requireInteraction: payload.kind === "urgent_request" || payload.kind === "admin_urgent",
			vibrate: [
				240,
				100,
				240
			],
			data: { targetTab: payload.targetTab }
		};
		try {
			if ("serviceWorker" in navigator) {
				const reg = await navigator.serviceWorker.ready;
				if (reg && typeof reg.showNotification === "function") {
					await reg.showNotification(payload.title, options);
					return;
				}
			}
		} catch {}
		try {
			const notif = new Notification(payload.title, options);
			notif.onclick = () => {
				try {
					window.focus();
					if (tapHandler) tapHandler(payload.targetTab);
					notif.close();
				} catch {}
			};
		} catch (err) {
			console.warn("Web Notification fallback warning:", err);
		}
	}
}
async function dispatchUrgentAlert(payload) {
	playUrgentAlertSound(payload.kind);
	triggerAlertVibration(payload.kind);
	await sendSystemAlertNotification(payload);
}
// src/components/NotificationsModal.tsx
var NotificationsModal = ({ isOpen, onClose, urgentRequests, announcement, announcementType = "general", announcementTime, onGoToUrgent }) => {
	const [permStatus, setPermStatus] = (0, import_react.useState)("prompt");
	const [soundOn, setSoundOn] = (0, import_react.useState)(() => isAlertSoundEnabled());
	const [feedbackMsg, setFeedbackMsg] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		setSoundOn(isAlertSoundEnabled());
		getAlertPermissionStatus().then(setPermStatus);
		setFeedbackMsg(null);
	}, [isOpen]);
	if (!isOpen) return null;
	const openRequests = urgentRequests.filter((r) => r.status === "open" && !isUrgentRequestExpired(r));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] font-['Cairo',sans-serif]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-linear-to-r from-red-600 to-rose-600 px-5 py-4 text-white flex items-center justify-between shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5 text-white animate-bounce" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-extrabold text-white leading-tight",
							children: "الإشعارات والتنبيهات الواردة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-red-100 font-medium",
							children: [announcement ? "يوجد تعميم جديد من إدارة التطبيق • " : "", openRequests.length > 0 ? `يوجد ${openRequests.length} طلب دم عاجل بحاجة لمتبرعين` : "لا توجد طلبات دم عاجلة حالياً"]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 overflow-y-auto space-y-4 grow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										const next = !soundOn;
										setAlertSoundEnabled(next);
										setSoundOn(next);
										setFeedbackMsg(next ? "تم تفعيل صوت تنبيهات الطوارئ." : "تم كتم صوت التنبيهات.");
									},
									className: `px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1.5 border transition-colors cursor-pointer ${soundOn ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-slate-200 text-slate-700 border-slate-300"}`,
									children: [soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: soundOn ? "صوت التنبيهات: مفعّل" : "صوت التنبيهات: مكتوم" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [permStatus !== "granted" && permStatus !== "unsupported" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: async () => {
											const nextPerm = await requestAlertPermission();
											setPermStatus(nextPerm);
											setFeedbackMsg(nextPerm === "granted" ? "تم تفعيل إشعارات الجهاز بنجاح!" : "إشعارات الجهاز مرفوضة من إعدادات المتصفح/الهاتف؛ سيبقى التنبيه الصوتي والنافذة المنبثقة يعملان.");
										},
										className: "px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تفعيل إشعارات الجهاز" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											dispatchUrgentAlert({
												id: `test_${Date.now()}`,
												kind: "urgent_request",
												title: "اختبار تنبيه بنك الدم قعطبة",
												body: "هذا اختبار للتأكد من عمل الصوت والاهتزاز والإشعار عند وصول طلب دم عاجل.",
												targetTab: "urgent"
											});
											setFeedbackMsg("تم إرسال تنبيه تجريبي بالصوت والاهتزاز.");
										},
										className: "px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold cursor-pointer",
										children: "تجربة التنبيه"
									})]
								})]
							}), feedbackMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold text-slate-600 px-1",
								children: feedbackMsg
							})]
						}),
						announcement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 space-y-2.5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-4.5 h-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-black text-amber-950",
										children: "تعميم رسمي من إدارة التطبيق"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-amber-800 font-bold",
										children: announcementType === "urgent" ? "🔴 نداء استغاثة طارئ" : announcementType === "campaign" ? "🟢 حملة تبرع بالدم في قعطبة" : "📢 تنويه إداري عام"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] bg-amber-200/90 text-amber-900 font-black px-2.5 py-0.5 rounded-full border border-amber-300",
									children: "إشعار لجميع المشتركين"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-950 leading-relaxed font-bold bg-white/80 p-3 rounded-xl border border-amber-200/70 shadow-2xs",
								children: announcement
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-black text-slate-800",
										children: "الطلبات العاجلة الواردة حديثاً"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full",
									children: [openRequests.length, " نشطة"]
								})]
							}), openRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-10 h-10 text-emerald-500 mx-auto" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-slate-700",
										children: "لا توجد حالات تبرع طارئة غير ملباة حالياً"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-slate-500",
										children: "نشكر جميع المتبرعين الكرام في قعطبة ومريس والضالع على استجابتهم المستمرة"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: openRequests.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-2 hover:bg-rose-50 transition-colors shadow-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-extrabold text-slate-900",
															children: req.patientName
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full shadow-xs",
															children: req.bloodType
														}),
														req.urgencyLevel === "critical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-full",
															children: "حرجة جداً"
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 text-slate-600 text-[11px] font-medium",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-3.5 h-3.5 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: req.hospital })]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left shrink-0 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-lg inline-block",
													children: [req.unitsNeeded, " أكياس"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded-md inline-flex items-center gap-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-2.5 h-2.5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"متبقي ",
														getUrgentRemainingHours(req),
														" س"
													] })]
												}) })]
											})]
										}),
										req.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-rose-100/60 font-medium leading-snug",
											children: req.notes
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-1 flex items-center justify-between border-t border-rose-100/80",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] text-slate-500 font-bold",
												children: ["التواصل: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-800",
													children: req.contactName
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `tel:${req.contactPhone}`,
												className: "inline-flex items-center gap-1 bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] font-extrabold px-3 py-1 rounded-xl shadow-xs transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["اتصال ", req.contactPhone] })]
											})]
										})
									]
								}, req.id))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							onClose();
							onGoToUrgent();
						},
						className: "flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "عرض كل الحالات في التبويب الرئيسي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-3.5 h-3.5" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer",
						children: "إغلاق"
					})]
				})
			]
		})
	});
};
// src/components/UrgentAlertModal.tsx
var UrgentAlertModal = ({ alerts, soundEnabled, onToggleSound, onDismissCurrent, onDismissAll, onNavigateTarget }) => {
	if (!alerts || alerts.length === 0) return null;
	const current = alerts[0];
	const isReply = current.kind === "admin_reply";
	const isAdminUrgent = current.kind === "admin_urgent" || current.kind === "admin_notice";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 font-['Cairo',sans-serif]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border-2 border-red-300 animate-in zoom-in-95 duration-200",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-linear-to-r ${isReply ? "from-emerald-600 via-teal-600 to-emerald-700" : isAdminUrgent ? "from-amber-600 via-rose-600 to-red-700" : "from-red-600 via-rose-600 to-red-700"} px-5 py-4 text-white flex items-center justify-between gap-2`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shadow-inner animate-pulse shrink-0",
						children: isReply ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-6 h-6 text-white" }) : isAdminUrgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-6 h-6 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "w-6 h-6 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-black bg-white text-red-700 px-2 py-0.5 rounded-full",
							children: isReply ? "رسالة من الإدارة" : isAdminUrgent ? "إشعار رسمي عاجل" : "نداء دم عاجل"
						}), alerts.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-black bg-black/25 text-white px-2 py-0.5 rounded-full",
							children: ["1 من ", alerts.length]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm sm:text-base font-black text-white mt-1 leading-snug",
						children: current.title
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onToggleSound,
						title: soundEnabled ? "كتم صوت التنبيهات" : "تفعيل صوت التنبيهات",
						className: "w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer",
						children: soundEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onDismissCurrent,
						title: "إغلاق التنبيه",
						className: "w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4.5 h-4.5" })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 space-y-4",
				children: [current.kind === "urgent_request" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-3.5 h-3.5 fill-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										dir: "ltr",
										children: current.bloodType || "O+"
									})]
								}), current.unitsNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-red-800 bg-red-100 px-2.5 py-1 rounded-xl",
									children: [current.unitsNeeded, " أكياس دم"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-red-600 animate-bounce shrink-0" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm font-black text-slate-900 leading-relaxed",
							children: current.body
						}),
						current.hospital && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white p-2 rounded-xl border border-rose-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-4 h-4 text-rose-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: current.hospital })]
						}),
						current.contactPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${current.contactPhone}`,
							className: "w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"اتصال فوري بـ ",
								current.contactName || "المرافق",
								" (",
								current.contactPhone,
								")"
							] })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm font-black text-slate-900 leading-relaxed whitespace-pre-line",
						children: current.body
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							const target = current.targetTab;
							onDismissCurrent();
							onNavigateTarget(target);
						},
						className: "flex-1 py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md shadow-red-200 transition-all active:scale-98 cursor-pointer",
						children: isReply ? "فتح المحادثة مع المسؤول" : isAdminUrgent ? "عرض تفاصيل التعميم" : "عرض كل الطلبات العاجلة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: alerts.length > 1 ? onDismissAll : onDismissCurrent,
						className: "py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer",
						children: alerts.length > 1 ? `تجاهل الكل (${alerts.length})` : "حسناً، تم الاطلاع"
					})]
				})]
			})]
		})
	});
};
// src/App.tsx
function AppContent() {
	const { currentUser, userProfile, activeRole, switchActiveRole, isLoading, logout, isGuest } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("home");
	const [searchInitialBloodType, setSearchInitialBloodType] = (0, import_react.useState)("ALL");
	const [rawDonors, setRawDonors] = (0, import_react.useState)(() => getInstantLocalDonorsSync());
	const [deletedDonors, setDeletedDonors] = (0, import_react.useState)([]);
	const [urgentRequests, setUrgentRequests] = (0, import_react.useState)(() => getInstantLocalUrgentSync());
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	const [announcementType, setAnnouncementType] = (0, import_react.useState)("general");
	const [announcementTime, setAnnouncementTime] = (0, import_react.useState)("");
	const [draftAnnouncement, setDraftAnnouncement] = (0, import_react.useState)("");
	const [draftAnnouncementType, setDraftAnnouncementType] = (0, import_react.useState)("general");
	const [isSavingAnnouncement, setIsSavingAnnouncement] = (0, import_react.useState)(false);
	const [isOffline, setIsOffline] = (0, import_react.useState)(!navigator.onLine);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [syncStats, setSyncStats] = (0, import_react.useState)(() => {
		const meta = getInstantSyncMetaSync();
		return {
			firestoreCount: meta?.firestoreCount || 0,
			sheetsCount: meta?.sheetsCount || 0,
			duplicateCount: 0,
			excludedCount: 0,
			finalCount: meta?.donorCount || getInstantLocalDonorsSync().length,
			lastSyncTime: meta?.lastSyncTime || "محفوظ محلياً"
		};
	});
	const firestoreDonorsRef = (0, import_react.useRef)([]);
	const sheetsDonorsRef = (0, import_react.useRef)([]);
	const [pendingAlerts, setPendingAlerts] = (0, import_react.useState)([]);
	const [soundEnabled, setSoundEnabled] = (0, import_react.useState)(() => isAlertSoundEnabled());
	const activeTabRef = (0, import_react.useRef)(activeTab);
	const currentUserIdRef = (0, import_react.useRef)(currentUser?.uid || null);
	const hasInitialUrgentRef = (0, import_react.useRef)(false);
	const knownUrgentIdsRef = (0, import_react.useRef)(new Set(getInstantLocalUrgentSync().map((r) => r.id)));
	const hasInitialSettingsRef = (0, import_react.useRef)(false);
	const justSavedAnnouncementAtRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		activeTabRef.current = activeTab;
	}, [activeTab]);
	(0, import_react.useEffect)(() => {
		currentUserIdRef.current = currentUser?.uid || null;
	}, [currentUser]);
	const enqueueAlert = (alert) => {
		if (hasSeenAlertId(alert.id)) return;
		markAlertIdSeen(alert.id);
		setPendingAlerts((prev) => prev.some((item) => item.id === alert.id) ? prev : [...prev, alert]);
		dispatchUrgentAlert(alert);
	};
	(0, import_react.useEffect)(() => {
		const handleOnline = () => {
			setIsOffline(false);
			setToastMessage("تمت استعادة الاتصال بالإنترنت! جاري تحديث ومزامنة البيانات مع السحابة...");
			handleGlobalRefresh();
		};
		const handleOffline = () => {
			setIsOffline(true);
			setToastMessage("انقطع الاتصال بالإنترنت. تم تفعيل وضع التخزين المحلي (Offline) وجميع المتبرعين متاحون فوراً!");
		};
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible" && navigator.onLine) handleGlobalRefresh();
		};
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);
	const [isAuthModalOpen, setIsAuthModalOpen] = (0, import_react.useState)(false);
	const [isInstallModalOpen, setIsInstallModalOpen] = (0, import_react.useState)(false);
	const [isCompatibilityOpen, setIsCompatibilityOpen] = (0, import_react.useState)(false);
	const [isExitConfirmOpen, setIsExitConfirmOpen] = (0, import_react.useState)(false);
	const [isRoleModalOpen, setIsRoleModalOpen] = (0, import_react.useState)(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = (0, import_react.useState)(false);
	const [isHospitalsModalOpen, setIsHospitalsModalOpen] = (0, import_react.useState)(false);
	const [isSidebarOpen, setIsSidebarOpen] = (0, import_react.useState)(false);
	const [editingDonorId, setEditingDonorId] = (0, import_react.useState)(null);
	const [isVisitorRestrictionOpen, setIsVisitorRestrictionOpen] = (0, import_react.useState)(false);
	const handleEditDonor = (donorId) => {
		setEditingDonorId(donorId || null);
		setActiveTab("register");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const handleDeleteDonor = async (donorId, phone) => {
		try {
			await deleteDonorProfile(donorId, phone);
			await deleteDonorFromOfflineStorage(donorId, phone).catch(() => {});
			const cleanPhone = phone ? phone.trim().replace(/\D/g, "") : "";
			const idsToExclude = [donorId];
			if (cleanPhone) idsToExclude.push(cleanPhone);
			setDeletedDonors((prev) => [...prev, ...idsToExclude]);
			setRawDonors((prev) => prev.filter((d) => !(d.id === donorId || cleanPhone && String(d.phone).replace(/\D/g, "") === cleanPhone)));
		} catch (err) {
			console.error("Failed to delete donor:", err);
			throw err;
		}
	};
	const handleHeroNavigate = (target) => {
		if (target === "register" && !currentUser) {
			setIsVisitorRestrictionOpen(true);
			return;
		}
		if (target === "home" || target === "search" || target === "urgent" || target === "register" || target === "admin") {
			if (target === "search") setSearchInitialBloodType("ALL");
			setActiveTab(target);
			if (target !== "register") setEditingDonorId(null);
		} else {
			setSearchInitialBloodType(target);
			setActiveTab("search");
			setEditingDonorId(null);
		}
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	(0, import_react.useEffect)(() => {
		if (announcement) setDraftAnnouncement(announcement);
	}, [announcement]);
	const handleSaveAnnouncement = async () => {
		if (!currentUser) return;
		setIsSavingAnnouncement(true);
		justSavedAnnouncementAtRef.current = Date.now();
		try {
			await setDoc(doc(db, "settings", "global"), {
				announcement: draftAnnouncement.trim(),
				noticeMessage: draftAnnouncement.trim(),
				announcementType: draftAnnouncementType,
				announcementTime: (/* @__PURE__ */ new Date()).toISOString(),
				announcementActive: Boolean(draftAnnouncement.trim()),
				updatedAt: serverTimestamp(),
				updatedBy: currentUser.uid
			}, { merge: true });
			setToastMessage("تم نشر وتحديث التعميم بنجاح لتظهر فوراً لدى جميع المستخدمين! ✓");
			setTimeout(() => setToastMessage(null), 4e3);
		} catch (err) {
			console.error("Error saving announcement:", err);
			setToastMessage(`فشل حفظ التعميم: ${err.message}`);
			setTimeout(() => setToastMessage(null), 4e3);
		} finally {
			setIsSavingAnnouncement(false);
		}
	};
	const handleClearAnnouncement = async () => {
		if (!currentUser) return;
		setIsSavingAnnouncement(true);
		try {
			await setDoc(doc(db, "settings", "global"), {
				announcement: "",
				noticeMessage: "",
				announcementActive: false,
				updatedAt: serverTimestamp(),
				updatedBy: currentUser.uid
			}, { merge: true });
			setDraftAnnouncement("");
			setToastMessage("تم مسح التعميم بنجاح! ✓");
			setTimeout(() => setToastMessage(null), 3e3);
		} catch (err) {
			console.error("Error clearing announcement:", err);
		} finally {
			setIsSavingAnnouncement(false);
		}
	};
	const handleConfirmLogout = async () => {
		try {
			await logout();
		} catch (err) {
			console.error("Logout error:", err);
		}
		localStorage.removeItem("blood_app_guest");
		localStorage.setItem("has_logged_out", "true");
		setIsExitConfirmOpen(false);
		setActiveTab("home");
		setIsAuthModalOpen(true);
	};
	const normalizePhoneForDedupe = (phone) => {
		if (!phone) return "";
		let clean = String(phone).replace(/\D/g, "");
		if (clean.startsWith("00967")) clean = clean.slice(5);
		else if (clean.startsWith("967")) clean = clean.slice(3);
		else if (clean.startsWith("0") && clean.length === 10) clean = clean.slice(1);
		if (clean === "0" || clean.length < 7) return "";
		return clean;
	};
	const donors = (0, import_react.useMemo)(() => {
		if (!deletedDonors || deletedDonors.length === 0) return rawDonors;
		const deletedSet = new Set(deletedDonors.map((id) => String(id).trim()).filter(Boolean));
		if (deletedSet.size === 0) return rawDonors;
		return rawDonors.filter((d) => {
			if (deletedSet.has(d.id)) return false;
			const cleanPhone = normalizePhoneForDedupe(d.phone);
			return !(cleanPhone && deletedSet.has(cleanPhone));
		});
	}, [rawDonors, deletedDonors]);
	const mergeAndSaveDonors = (firestoreList, sheetsList) => {
		if (firestoreList.length === 0 && sheetsList.length === 0) return;
		const seenPhones = /* @__PURE__ */ new Set();
		const merged = [];
		let duplicateCount = 0;
		const excludedCount = 0;
		for (const d of firestoreList) {
			const cleanPhone = normalizePhoneForDedupe(d.phone);
			if (cleanPhone) seenPhones.add(cleanPhone);
			merged.push({
				...d,
				source: d.source || "firestore"
			});
		}
		for (const d of sheetsList) {
			const cleanPhone = normalizePhoneForDedupe(d.phone);
			if (cleanPhone) {
				if (seenPhones.has(cleanPhone)) duplicateCount++;
				else {
					seenPhones.add(cleanPhone);
					merged.push({
						...d,
						source: "google_sheets"
					});
				}
			} else merged.push({
				...d,
				source: "google_sheets"
			});
		}
		const stats = {
			firestoreCount: firestoreList.length,
			sheetsCount: sheetsList.length,
			duplicateCount,
			excludedCount,
			finalCount: merged.length,
			lastSyncTime: (/* @__PURE__ */ new Date()).toLocaleTimeString("ar-YE")
		};
		console.log("📊 [Donor Sync Diagnostic]:", stats);
		setSyncStats(stats);
		setRawDonors((prev) => {
			if (prev.length > merged.length && merged.length < 10) {
				console.warn("Prevented replacing full donor list with partial result");
				return prev;
			}
			return merged;
		});
		saveDonorsToOfflineStorage(merged, {
			sheetsCount: sheetsList.length,
			firestoreCount: firestoreList.length
		}).catch((err) => console.warn("Offline storage save warning:", err));
	};
	const loadSheetsDonors = async () => {
		try {
			const result = await fetchDonorsFromGoogleSheets();
			if (result.success && Array.isArray(result.donors) && result.donors.length > 0) {
				const mapped = result.donors.map((d, idx) => ({
					id: d.donorId ? `sheet_${d.donorId}` : `sheet_row_${idx + 1}`,
					userId: "",
					fullName: d.fullName || d.name || "متبرع بدون اسم",
					bloodType: (d.bloodType || "O+").toUpperCase(),
					phone: d.phone || "",
					phoneVerified: false,
					residence: d.residence || d.address || "قعطبة",
					notes: d.notes || "من سجل جدول غوغل",
					isAvailable: true,
					allowContact: true,
					source: "google_sheets"
				}));
				sheetsDonorsRef.current = mapped;
				return mapped;
			}
		} catch (err) {
			console.warn("Sheets fetch caught error:", err);
		}
		return sheetsDonorsRef.current;
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		installAudioUnlockListeners();
		setNotificationTapHandler((targetTab) => {
			if (targetTab === "notifications") setIsNotificationsOpen(true);
			else {
				setActiveTab(targetTab);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		});
		getDonorsFromOfflineStorage().then((cached) => {
			if (active && cached.length > 0) setRawDonors((prev) => cached.length >= prev.length ? cached : prev);
		});
		getUrgentRequestsFromOfflineStorage().then((cachedReqs) => {
			if (active && cachedReqs.length > 0) setUrgentRequests((prev) => cachedReqs.length >= prev.length ? cachedReqs : prev);
		});
		loadSheetsDonors().then((sheetsList) => {
			if (active && sheetsList.length > 0) mergeAndSaveDonors(firestoreDonorsRef.current, sheetsList);
		});
		const unsubDonors = subscribeToDonors((firestoreList) => {
			firestoreDonorsRef.current = firestoreList;
			if (active) mergeAndSaveDonors(firestoreList, sheetsDonorsRef.current);
		});
		const getUrgentCreatedMs = (req) => {
			const val = req.createdAt;
			if (!val) return 0;
			if (typeof val?.toMillis === "function") return val.toMillis();
			if (typeof val?.seconds === "number") return val.seconds * 1e3;
			const parsed = Date.parse(String(val));
			return Number.isFinite(parsed) ? parsed : 0;
		};
		const unsubUrgent = subscribeToUrgentRequests((reqs) => {
			if (!active) return;
			setUrgentRequests(reqs);
			saveUrgentRequestsToOfflineStorage(reqs).catch(() => {});
			const now = Date.now();
			const openReqs = reqs.filter((r) => r.status === "open" && !isUrgentRequestExpired(r));
			for (const req of openReqs) {
				const alertId = `urgent_${req.id}`;
				const isOwnRequest = Boolean(currentUserIdRef.current && req.userId === currentUserIdRef.current);
				if (!hasInitialUrgentRef.current) {
					const createdMs = getUrgentCreatedMs(req);
					if (createdMs > 0 && now - createdMs < 18e5 && !isOwnRequest && !hasSeenAlertId(alertId)) enqueueAlert({
						id: alertId,
						kind: "urgent_request",
						title: `طلب دم عاجل (${req.bloodType})`,
						body: `المريض: ${req.patientName} — مطلوب ${req.unitsNeeded} أكياس فصيلة ${req.bloodType}`,
						targetTab: "urgent",
						bloodType: req.bloodType,
						hospital: req.hospital,
						contactPhone: req.contactPhone,
						contactName: req.contactName,
						unitsNeeded: req.unitsNeeded
					});
					else markAlertIdSeen(alertId);
				} else if (!knownUrgentIdsRef.current.has(req.id) && !isOwnRequest) enqueueAlert({
					id: alertId,
					kind: "urgent_request",
					title: `طلب دم عاجل جديد (${req.bloodType})`,
					body: `المريض: ${req.patientName} — مطلوب ${req.unitsNeeded} أكياس فصيلة ${req.bloodType}`,
					targetTab: "urgent",
					bloodType: req.bloodType,
					hospital: req.hospital,
					contactPhone: req.contactPhone,
					contactName: req.contactName,
					unitsNeeded: req.unitsNeeded
				});
			}
			knownUrgentIdsRef.current = new Set(reqs.map((r) => r.id));
			hasInitialUrgentRef.current = true;
		});
		const unsubSettings = onSnapshot(doc(db, "settings", "global"), (snap) => {
			if (active && snap.exists()) {
				const data = snap.data();
				const notice = String(data.announcement || data.noticeMessage || "").trim();
				const noticeType = data.announcementType || "general";
				const noticeTime = String(data.announcementTime || "");
				setAnnouncement(notice);
				setAnnouncementType(noticeType);
				if (noticeTime) setAnnouncementTime(noticeTime);
				if (Array.isArray(data.deletedDonors)) setDeletedDonors(data.deletedDonors);
				if (notice) {
					const annKey = `ann_${noticeTime}|${notice}`;
					const noticeTimeMs = Date.parse(noticeTime);
					if (!(Date.now() - justSavedAnnouncementAtRef.current < 8e3 || Boolean(currentUserIdRef.current && data.updatedBy === currentUserIdRef.current && Number.isFinite(noticeTimeMs) && Date.now() - noticeTimeMs < 15e3)) && !hasSeenAlertId(annKey)) {
						if (noticeType === "urgent" || hasInitialSettingsRef.current) enqueueAlert({
							id: annKey,
							kind: noticeType === "urgent" ? "admin_urgent" : "admin_notice",
							title: noticeType === "urgent" ? "نداء استغاثة عاجل من المسؤول" : noticeType === "campaign" ? "إعلان حملة تبرع بالدم" : "رسالة جديدة من إدارة التطبيق",
							body: notice,
							targetTab: "notifications"
						});
						else markAlertIdSeen(annKey);
					}
				}
				hasInitialSettingsRef.current = true;
			}
		});
		const intervalId = setInterval(() => {
			loadSheetsDonors().then((sheetsList) => {
				if (active && sheetsList.length > 0) mergeAndSaveDonors(firestoreDonorsRef.current, sheetsList);
			});
		}, 3e5);
		return () => {
			active = false;
			setNotificationTapHandler(null);
			unsubDonors();
			unsubUrgent();
			unsubSettings();
			clearInterval(intervalId);
		};
	}, []);
	const handleGlobalRefresh = async () => {
		try {
			setIsRefreshing(true);
			setToastMessage(null);
			if (!Capacitor.isNativePlatform() && "serviceWorker" in navigator) try {
				const regs = await navigator.serviceWorker.getRegistrations();
				for (const reg of regs) await reg.update();
			} catch {}
			const [sheetsList, otaResult] = await Promise.all([loadSheetsDonors(), checkForLiveUpdate()]);
			mergeAndSaveDonors(firestoreDonorsRef.current, sheetsList);
			const count = donors.length;
			if (otaResult.status === "downloaded" || otaResult.status === "pending") setToastMessage(`تم تحديث البيانات (${count} متبرع) وتجهيز تحديث جديد للتطبيق! أعد فتح التطبيق لتطبيقه.`);
			else setToastMessage(`تم التحديث الشامل بنجاح! الإجمالي المتوفر: ${count} متبرع.`);
			setTimeout(() => setToastMessage(null), 4e3);
		} catch {
			setToastMessage("تم فحص الاتصال ومزامنة البيانات.");
			setTimeout(() => setToastMessage(null), 2500);
		} finally {
			setIsRefreshing(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (rawDonors.length === 0 && currentUser) seedInitialCommunityData(currentUser.uid);
	}, [rawDonors.length, currentUser]);
	(0, import_react.useEffect)(() => {
		if (currentUser) initializePushNotifications(currentUser.uid);
	}, [currentUser]);
	(0, import_react.useEffect)(() => {
		if (!currentUser || currentUser.isAnonymous) return;
		let active = true;
		const unsub = subscribeToConversation(currentUser.uid, (conv) => {
			if (!active || !conv) return;
			if (Number(conv.unreadCountByUser || 0) > 0 && conv.status === "replied" && activeTabRef.current !== "chat") {
				const msgTime = typeof conv.lastMessageAt?.toMillis === "function" ? conv.lastMessageAt.toMillis() : conv.lastMessageAt?.seconds || "";
				const chatAlertId = `chat_${currentUser.uid}_${msgTime}_${String(conv.lastMessage || "").slice(0, 32)}`;
				enqueueAlert({
					id: chatAlertId,
					kind: "admin_reply",
					title: "رسالة جديدة من المسؤول",
					body: String(conv.lastMessage || "لديك رد جديد من إدارة التطبيق."),
					targetTab: "chat"
				});
			}
		});
		return () => {
			active = false;
			unsub();
		};
	}, [currentUser]);
	const activeUrgentRequests = urgentRequests.filter((r) => !isUrgentRequestExpired(r));
	const openUrgentCount = activeUrgentRequests.filter((r) => r.status === "open").length;
	const unreadNotificationsCount = openUrgentCount + (announcement ? 1 : 0);
	const hasLoggedOut = typeof window !== "undefined" && localStorage.getItem("has_logged_out") === "true";
	const showInitialAuth = !currentUser && (!isGuest || hasLoggedOut);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-linear-to-b from-slate-950 via-red-950 to-slate-950 flex flex-col items-center justify-center p-6 text-white text-center font-['Cairo',sans-serif]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-linear-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-2xl shadow-red-600/50 animate-pulse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-10 h-10 sm:w-12 sm:h-12 fill-white text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-1 -right-1 w-7 h-7 bg-white text-red-600 rounded-full flex items-center justify-center shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 fill-red-600 text-red-600" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-black tracking-tight mb-2",
				children: "قطرة دم تنقذ حياة إنسان"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-red-200/90 font-bold max-w-xs mb-8",
				children: "بنك الدم -مديرية قعطبه"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-red-100 text-xs font-bold border border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "جاري تهيئة التطبيق وفحص البيانات..." })]
			})
		]
	});
	if (showInitialAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-linear-to-b from-slate-950 via-red-950 to-slate-950 font-['Cairo',sans-serif]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
			isOpen: true,
			isInitialScreen: true,
			onClose: () => {}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50 text-slate-800 pb-20 font-['Cairo',sans-serif]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				onOpenAuth: () => setIsAuthModalOpen(true),
				onOpenInstallModal: () => setIsInstallModalOpen(true),
				onOpenSidebar: () => setIsSidebarOpen(true),
				onGoToUrgent: () => setActiveTab("urgent"),
				onOpenNotifications: () => setIsNotificationsOpen(true),
				onOpenRoleModal: () => setIsRoleModalOpen(true),
				onGlobalRefresh: handleGlobalRefresh,
				isRefreshing,
				unreadCount: unreadNotificationsCount
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				isOpen: isSidebarOpen,
				onClose: () => setIsSidebarOpen(false),
				donors,
				onOpenExitConfirm: () => setIsExitConfirmOpen(true),
				onOpenChat: () => setActiveTab("chat")
			}),
			toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed top-16 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-in slide-in-from-top-3 duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-emerald-200 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm font-bold flex-1 leading-snug",
						children: toastMessage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setToastMessage(null),
						className: "text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-600 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-5xl mx-auto px-3 sm:px-6 py-4 pb-28 sm:pb-16 min-h-[calc(100vh-4rem)]",
				children: [isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 p-3.5 rounded-2xl bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-amber-400/40 dir-rtl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDriveDownload, { className: "w-5 h-5 text-amber-100 animate-pulse" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-white text-amber-900 px-2 py-0.5 rounded-full font-black",
								children: "وضع عدم الاتصال (Offline)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs sm:text-sm font-bold",
								children: [
									"البيانات محفوظة بالكامل على جهازك (",
									donors.length,
									" متبرع)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-amber-100",
							children: "يمكنك البحث والاتصال بجميع المتبرعين فوراً بدون انتظار الإنترنت. ستتم المزامنة تلقائياً عند الاتصال."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (navigator.onLine) setIsOffline(false);
							handleGlobalRefresh();
						},
						className: "px-3.5 py-1.5 bg-white text-amber-800 hover:bg-amber-50 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 active:scale-95 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}` }), "فحص الاتصال والتحديث"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					announcement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setIsNotificationsOpen(true),
						className: `mb-4 p-3 rounded-2xl text-white shadow-lg flex items-center justify-between gap-3 overflow-hidden relative group cursor-pointer transition-all active:scale-99 ${announcementType === "urgent" ? "bg-linear-to-r from-red-700 via-rose-700 to-red-800 border-2 border-red-400" : announcementType === "campaign" ? "bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 border-2 border-emerald-400" : "bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 border-2 border-amber-300"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-4.5 h-4.5 fill-white animate-pulse" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-black",
										children: announcementType === "urgent" ? "نداء استغاثة عاجل" : announcementType === "campaign" ? "حملة تبرع" : "تنويه الإدارة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black truncate",
										children: announcement
									})]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-white text-slate-900 px-2 py-1 rounded-lg font-bold shrink-0",
							children: "عرض التفاصيل"
						})]
					}),
					activeTab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [activeRole === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-linear-to-r from-amber-600 via-amber-700 to-rose-700 text-white rounded-2xl p-4 shadow-md space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-amber-200 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-black",
										children: "أدوات الإدارة والتعميم (وضع المسؤول)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-amber-100",
										children: "تحكم بالرسائل العامة والإشعارات وتحديث النظام"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleGlobalRefresh,
										disabled: isRefreshing,
										className: "px-3 py-1.5 rounded-xl bg-white text-amber-950 hover:bg-amber-50 text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors active:scale-95 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تحديث شامل" })]
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-amber-100",
										children: "التعميم الحالي المنشور:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDraftAnnouncementType("general"),
												className: `px-2 py-0.5 rounded-lg font-bold ${draftAnnouncementType === "general" ? "bg-amber-500 text-white" : "text-amber-200 hover:bg-amber-800"}`,
												children: "عام"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDraftAnnouncementType("urgent"),
												className: `px-2 py-0.5 rounded-lg font-bold ${draftAnnouncementType === "urgent" ? "bg-rose-600 text-white" : "text-amber-200 hover:bg-amber-800"}`,
												children: "عاجل"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDraftAnnouncementType("campaign"),
												className: `px-2 py-0.5 rounded-lg font-bold ${draftAnnouncementType === "campaign" ? "bg-emerald-600 text-white" : "text-amber-200 hover:bg-amber-800"}`,
												children: "حملة"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: draftAnnouncement,
											onChange: (e) => setDraftAnnouncement(e.target.value),
											placeholder: "اكتب رسالة أو تعميم ليظهر كشريط إشعارات عند جميع المستخدمين...",
											className: "flex-1 px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold outline-hidden shadow-inner"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleSaveAnnouncement,
											disabled: isSavingAnnouncement,
											className: "px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs transition-colors shrink-0 disabled:opacity-50",
											children: isSavingAnnouncement ? "جارٍ النشر..." : "نشر"
										}),
										announcement && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleClearAnnouncement,
											className: "px-2.5 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-rose-200 text-xs font-bold shrink-0",
											title: "مسح التعميم",
											children: "مسح"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroBanner, {
							onNavigate: handleHeroNavigate,
							donors,
							urgentRequests: activeUrgentRequests,
							onOpenCompatibility: () => setIsCompatibilityOpen(true)
						})]
					}),
					activeTab === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonorSearch, {
						donors,
						onNavigateToRegister: () => {
							if (currentUser) setActiveTab("register");
							else setIsVisitorRestrictionOpen(true);
						},
						initialBloodType: searchInitialBloodType,
						onEditDonor: handleEditDonor,
						onDeleteDonor: handleDeleteDonor,
						syncStats,
						isOffline,
						onOpenAuth: () => setIsAuthModalOpen(true)
					}),
					activeTab === "urgent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgentRequests, {
						urgentRequests,
						onOpenAuth: () => setIsAuthModalOpen(true)
					}),
					activeTab === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonorRegistration, {
						onSuccessNavigate: () => {
							setActiveTab("search");
							setEditingDonorId(null);
						},
						donors,
						onOpenAuth: () => setIsAuthModalOpen(true),
						editingDonorId,
						onDeleteDonor: handleDeleteDonor
					}),
					activeTab === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodDonationEducationalInfo, {}),
					activeTab === "hospitals" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-4xl mx-auto space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hospital, { className: "w-7 h-7 sm:w-8 sm:h-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg sm:text-xl font-black text-slate-900",
									children: "دليل المستشفيات والنقاط الطبية"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-slate-500 font-bold mt-1",
									children: "مديرية قعطبة - الضالع"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QaetabahHospitalsDirectory, {
							isOpen: true,
							isEmbedded: true,
							onClose: () => setActiveTab("home")
						})]
					}),
					activeTab === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {
						onBack: () => setActiveTab("home"),
						donors,
						onEditDonor: handleEditDonor,
						onDeleteDonor: handleDeleteDonor,
						onGlobalRefresh: handleGlobalRefresh,
						isRefreshing
					}),
					activeTab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSupport, {
						userProfile,
						onBack: () => setActiveTab("home")
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {
				activeTab,
				onTabChange: (tab) => {
					if (tab === "register" && !currentUser) {
						setIsVisitorRestrictionOpen(true);
						return;
					}
					if (tab === "search") setSearchInitialBloodType("ALL");
					setActiveTab(tab);
					if (tab === "register") setEditingDonorId(null);
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				},
				urgentCount: openUrgentCount
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				isOpen: isAuthModalOpen,
				onClose: () => setIsAuthModalOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitorRestrictionModal, {
				isOpen: isVisitorRestrictionOpen,
				onClose: () => setIsVisitorRestrictionOpen(false),
				onOpenRegister: () => {
					setIsVisitorRestrictionOpen(false);
					setIsAuthModalOpen(true);
				},
				onOpenLogin: () => {
					setIsVisitorRestrictionOpen(false);
					setIsAuthModalOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AndroidInstallModal, {
				isOpen: isInstallModalOpen,
				onClose: () => setIsInstallModalOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodCompatibilityModal, {
				isOpen: isCompatibilityOpen,
				onClose: () => setIsCompatibilityOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmExitModal, {
				isOpen: isExitConfirmOpen,
				onClose: () => setIsExitConfirmOpen(false),
				onConfirm: handleConfirmLogout
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleSelectionModal, {
				isOpen: isRoleModalOpen,
				onClose: () => setIsRoleModalOpen(false),
				currentRole: activeRole,
				onRoleChange: (role) => {
					switchActiveRole(role);
					setActiveTab(role === "admin" ? "admin" : "home");
				},
				onOpenAdminAuth: () => setIsAuthModalOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsModal, {
				isOpen: isNotificationsOpen,
				onClose: () => setIsNotificationsOpen(false),
				urgentRequests: activeUrgentRequests,
				announcement,
				announcementType,
				announcementTime,
				onGoToUrgent: () => {
					setActiveTab("urgent");
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QaetabahHospitalsDirectory, {
				isOpen: isHospitalsModalOpen,
				onClose: () => setIsHospitalsModalOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgentAlertModal, {
				alerts: pendingAlerts,
				soundEnabled,
				onToggleSound: () => {
					const next = !soundEnabled;
					setAlertSoundEnabled(next);
					setSoundEnabled(next);
				},
				onDismissCurrent: () => setPendingAlerts((prev) => prev.slice(1)),
				onDismissAll: () => setPendingAlerts([]),
				onNavigateTarget: (targetTab) => {
					if (targetTab === "notifications") setIsNotificationsOpen(true);
					else {
						setActiveTab(targetTab);
						window.scrollTo({
							top: 0,
							behavior: "smooth"
						});
					}
				}
			})
		]
	});
}
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContent, {}) });
}
// src/main.tsx
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
initializeLiveUpdates();
export { buildRequestInit as a, WebPlugin as i, Persistence as n, ProviderId as r, Encoding as t };
