(function (global) {
  var waBase = "https://wa.me/923175404197?text=";
  var messages = {
    en: "Hello. I am contacting Javed Traders Coffins, Lalkurti, Rawalpindi. Please share the rate and delivery time for a coffin box.",
    ur: "السلام علیکم۔ جاوید ٹریڈرز کوفنز، لالکورٹی، راولپنڈی سے رابطہ ہے۔ کوفن باکس کا ریٹ اور ڈیلیوری کا وقت بتائیں۔"
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

  function productImages(product) {
    if (product.images && product.images.length) return product.images;
    return [{ image: product.image, thumb: product.thumb || product.image }];
  }

  function productUrl(product) {
    return "product.html?id=" + encodeURIComponent(product.id);
  }

  function queryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (e) {
      return "";
    }
  }

  function productCardHtml(product, options) {
    var opts = options || {};
    var imgs = productImages(product);
    var count = imgs.length;
    var href = productUrl(product);
    var countHtml =
      count > 1
        ? '<span class="photo-count"><span class="t-en">' +
          count +
          ' photos</span><span class="t-ur">' +
          count +
          " تصاویر</span></span>"
        : "";
    var pick =
      opts.pick === false
        ? ""
        : '<span class="product-pick"><span class="t-en">View this box</span><span class="t-ur">یہ باکس دیکھیں</span></span>';
    return (
      '<a class="product-card" href="' +
      href +
      '">' +
      '<div class="product-media"><img src="' +
      (product.thumb || imgs[0].thumb) +
      '" alt="' +
      product.en +
      '" loading="lazy" width="560" height="420">' +
      countHtml +
      "</div>" +
      "<h3><span class=\"t-en\">" +
      product.en +
      '</span><span class="t-ur">' +
      product.ur +
      "</span></h3>" +
      '<p class="product-meta"><span class="t-en">Handmade · ' +
      (product.type_en || "") +
      '</span><span class="t-ur">ہاتھ سے تیار · ' +
      (product.type_ur || "") +
      "</span></p>" +
      '<p class="product-meta product-meta-soft"><span class="t-en">' +
      product.feature_en +
      '</span><span class="t-ur">' +
      product.feature_ur +
      "</span></p>" +
      pick +
      "</a>"
    );
  }

  global.JFC = {
    waBase: waBase,
    currentLang: currentLang,
    setLang: setLang,
    initChrome: initChrome,
    openWhatsApp: openWhatsApp,
    loadProducts: loadProducts,
    productLabel: productLabel,
    productImages: productImages,
    productUrl: productUrl,
    queryParam: queryParam,
    productCardHtml: productCardHtml
  };
})(window);
