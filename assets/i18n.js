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
