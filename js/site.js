(function (global) {
  var waBase = "https://wa.me/923175404197?text=";
  var messages = {
    en: "Hello. I am contacting Javed Handmade Coffins, Lalkurti, Rawalpindi. Please share the rate and delivery time for a coffin box.",
    ur: "السلام علیکم۔ جاوید ہاتھ سے تیار کوفنز، لالکورٹی، راولپنڈی سے رابطہ ہے۔ کوفن باکس کا ریٹ اور ڈیلیوری کا وقت بتائیں۔"
  };

  function currentLang() {
    return document.documentElement.lang === "ur" ? "ur" : "en";
  }

  function setLang(lang, titles) {
    var next = lang === "ur" ? "ur" : "en";
    var root = document.documentElement;
    root.lang = next;
    root.dir = next === "ur" ? "rtl" : "ltr";
    if (titles && titles[next]) document.title = titles[next];
    try {
      localStorage.setItem("jfc-lang", next);
    } catch (e) {}
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-lang") === next ? "true" : "false");
    });
    var href = waBase + encodeURIComponent(messages[next]);
    document.querySelectorAll(".js-wa").forEach(function (link) {
      if (!link.dataset.keepText) link.href = href;
    });
    document.dispatchEvent(new CustomEvent("jfc:lang", { detail: { lang: next } }));
  }

  function initChrome(titles) {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");

    function closeNav() {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    setLang(currentLang(), titles);

    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLang(button.getAttribute("data-set-lang"), titles);
      });
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = !document.body.classList.contains("nav-open");
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    if (nav) {
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeNav();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  function openWhatsApp(text) {
    var url = waBase + encodeURIComponent(text);
    var opened = window.open(url, "_blank", "noopener");
    if (!opened) window.location.href = url;
  }

  function loadProducts() {
    return fetch("js/products.json").then(function (res) {
      if (!res.ok) throw new Error("products missing");
      return res.json();
    });
  }

  function productLabel(product, lang) {
    return lang === "ur" ? product.ur : product.en;
  }

  global.JFC = {
    waBase: waBase,
    currentLang: currentLang,
    setLang: setLang,
    initChrome: initChrome,
    openWhatsApp: openWhatsApp,
    loadProducts: loadProducts,
    productLabel: productLabel
  };
})(window);
