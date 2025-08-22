/**
 * Vanilla, framework-agnostic theme controller.
 * - Single source of truth: html[data-theme="light" | "dark"]
 * - Persists user preference in localStorage ("theme") and cookie ("theme")
 * - Respects OS preference when user has no explicit choice ("system")
 * - Applies before paint via inline IIFE (see getPreloadScript snippet in README)
 * - Emits window "themechange" CustomEvent({ detail: { theme, resolvedTheme } })
 */

(function attachGlobal() {
  const STORAGE_KEY = "theme";
  const COOKIE_NAME = "theme";
  const THEME_ATTR = "data-theme";
  const DARK_MQL = "(prefers-color-scheme: dark)";

  function getCookie(name) {
    try {
      const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch {
      return null;
    }
  }

  function setCookie(name, value) {
    try {
      document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {}
  }

  function getSystemTheme() {
    if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
    return window.matchMedia(DARK_MQL).matches ? "dark" : "light";
  }

  function getStoredTheme() {
    // Returns "light" | "dark" | "system" | null
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark" || v === "system") return v;
    } catch {}
    const c = getCookie(COOKIE_NAME);
    if (c === "light" || c === "dark" || c === "system") return c;
    return null;
  }

  function getTheme() {
    const v = typeof document !== "undefined" ? getStoredTheme() : null;
    return v ?? "system";
  }

  function setMetaThemeColor(effective) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", effective === "dark" ? "#0b1220" : "#ffffff");
  }

  function disableTransitionsTemporarily() {
    const style = document.createElement("style");
    style.setAttribute("data-theme-transition-cancel", "true");
    style.appendChild(document.createTextNode("*{transition:none !important}"));
    document.head.appendChild(style);
    return () => {
      // Force reflow then remove
      void document.documentElement.offsetHeight;
      style.remove();
    };
  }

  function applyTheme(theme, opts) {
    opts = opts || { persist: true };
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const effective = theme === "system" ? getSystemTheme() : theme;

    root.setAttribute(THEME_ATTR, effective);
    root.style.colorScheme = effective;
    setMetaThemeColor(effective);

    if (opts.persist) {
      try {
        if (theme === "system") localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, theme);
      } catch {}
      setCookie(COOKIE_NAME, theme);
    }

    try {
      window.dispatchEvent(new CustomEvent("themechange", { detail: { theme, resolvedTheme: effective } }));
    } catch {}
  }

  function setTheme(theme) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = reduce ? null : disableTransitionsTemporarily();
    applyTheme(theme, { persist: true });
    if (done) done();
  }

  function toggleTheme() {
    const attr = document.documentElement.getAttribute(THEME_ATTR);
    const current = (attr === "light" || attr === "dark" ? attr : null) || getSystemTheme();
    setTheme(current === "light" ? "dark" : "light");
  }

  let initialized = false;
  function initTheme() {
    if (initialized || typeof document === "undefined") return;
    initialized = true;

    const stored = getStoredTheme();
    const theme = stored ?? "system";
    applyTheme(theme, { persist: false });

    const mql = window.matchMedia(DARK_MQL);
    const onSystem = () => {
      if (getTheme() === "system") {
        applyTheme("system", { persist: false });
      }
    };
    mql.addEventListener?.("change", onSystem);

    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        const v = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "system";
        applyTheme(v, { persist: false });
      }
    });
  }

  function getPreloadScript() {
    // Inline this in <head> before CSS to avoid flash
    return `(function(){try{var d=document.documentElement;var ls=null;try{ls=localStorage.getItem('theme');}catch(_){};var pref=(ls==='light'||ls==='dark')?ls:null;var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);var cs=m?decodeURIComponent(m[1]):null;cs=(cs==='light'||cs==='dark'||cs==='system')?cs:null;var sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=(pref||cs||'system');var eff=t==='system'?sys:t;d.setAttribute('data-theme',eff);d.style.colorScheme=eff;var meta=document.querySelector('meta[name="theme-color"]');if(meta){meta.setAttribute('content',eff==='dark'?'#0b1220':'#ffffff');}}catch(e){}})();`;
  }

  // Expose API on window for vanilla usage
  window.ThemeController = {
    getTheme,
    setTheme,
    toggleTheme,
    initTheme,
    getPreloadScript,
    applyTheme, // advanced use
  };
})();
