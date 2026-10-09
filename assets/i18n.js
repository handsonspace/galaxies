// Galaxienkreisel: shared language switch (DE, FR, IT, EN).
// Each page passes its own dictionary T = { de: {...}, fr: {...}, it: {...}, en: {...} }.
// Elements with data-i18n="key" get T[lang][key] as their content,
// elements with data-i18n-alt="key" get it as their image description.
(function () {
  var LANGS = ["de", "fr", "it", "en"];
  var STORE = "galaxienkreisel_lang";

  function pick() {
    var hash = location.hash.replace("#", "").toLowerCase();
    if (LANGS.indexOf(hash) > -1) return hash;
    try {
      var saved = localStorage.getItem(STORE);
      if (LANGS.indexOf(saved) > -1) return saved;
    } catch (e) {}
    var prefs = navigator.languages || [navigator.language || "de"];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) > -1) return code;
    }
    return "de";
  }

  window.initI18n = function (T, onChange) {
    function apply(lang) {
      var d = T[lang] || T.de;
      document.documentElement.lang = lang;
      if (d.doc) document.title = d.doc;
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var v = d[el.dataset.i18n];
        if (v !== undefined) el.innerHTML = v;
      });
      document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
        var v = d[el.dataset.i18nAlt];
        if (v !== undefined) el.alt = v;
      });
      document.querySelectorAll(".langs button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
      });
      try { localStorage.setItem(STORE, lang); } catch (e) {}
      if (onChange) onChange(lang);
    }
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.lang); });
    });
    apply(pick());
  };

  // Statistics: record every page under one short address, so that
  // "/galaxies/sombrero/index.html" and "/galaxies/sombrero/" are counted as the same page
  // ("/galaxies/sombrero"). This must run before GoatCounter loads, which is why
  // i18n.js is included above the GoatCounter line on every page.
  window.goatcounter = window.goatcounter || {};
  window.goatcounter.path = function (p) {
    var clean = String(p).replace(/index\.html$/, "").replace(/\/+$/, "");
    return clean || "/";
  };

  // Count sticker scans separately.
  // The QR codes on the stickers open the page with "?qr" at the end of the address.
  // We remove "?qr" from the address right away (so shared links are not counted as scans)
  // and send one extra "qr-scan-<galaxy>" event to GoatCounter.
  (function countStickerScan() {
    try {
      var params = new URLSearchParams(location.search);
      if (!params.has("qr")) return;
      var parts = location.pathname.split("/").filter(Boolean);
      var slug = parts.length ? parts[parts.length - 1] : "home";
      if (/\.html$/.test(slug)) slug = parts.length > 1 ? parts[parts.length - 2] : "home";
      params.delete("qr");
      var rest = params.toString();
      history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash);
      var tries = 0;
      (function send() {
        if (window.goatcounter && window.goatcounter.count) {
          window.goatcounter.count({ path: "qr-scan-" + slug, title: "Sticker scan: " + slug, event: true });
        } else if (tries++ < 40) {
          setTimeout(send, 250);
        }
      })();
    } catch (e) {}
  })();

  // Tap the big galaxy picture to make it spin fast for a moment.
  window.initSpinner = function () {
    var spinner = document.getElementById("spinner");
    if (!spinner) return;
    var timer;
    spinner.addEventListener("click", function () {
      var img = spinner.querySelector("img");
      var anim = img.getAnimations ? img.getAnimations()[0] : null;
      if (!anim) return;
      anim.playbackRate = 25;
      clearTimeout(timer);
      timer = setTimeout(function () { anim.playbackRate = 1; }, 2500);
    });
  };
})();
