(function () {
  var root = document.documentElement;
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var form = document.getElementById("rate-form");
  var error = document.getElementById("form-error");
  var waBase = "https://wa.me/923175404197?text=";

  var messages = {
    en: "Hello. I am contacting Javed Handmade Coffins, Lalkurti, Rawalpindi. Please share the rate and delivery time for a coffin box.",
    ur: "السلام علیکم۔ جاوید ہاتھ سے تیار کوفنز، لالکورٹی، راولپنڈی سے رابطہ ہے۔ کوفن باکس کا ریٹ اور ڈیلیوری کا وقت بتائیں۔"
  };

  var titles = {
    en: "Javed Handmade Coffins | Lalkurti, Rawalpindi",
    ur: "جاوید ہاتھ سے تیار کوفنز | لالکورٹی، راولپنڈی"
  };

  function currentLang() {
    return root.lang === "ur" ? "ur" : "en";
  }

  function setLang(lang) {
    var next = lang === "ur" ? "ur" : "en";
    root.lang = next;
    root.dir = next === "ur" ? "rtl" : "ltr";
    document.title = titles[next];
    try {
      localStorage.setItem("jfc-lang", next);
    } catch (e) {}
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-lang") === next ? "true" : "false");
    });
    var href = waBase + encodeURIComponent(messages[next]);
    document.querySelectorAll(".js-wa").forEach(function (link) {
      link.href = href;
    });
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  setLang(currentLang());

  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLang(button.getAttribute("data-set-lang"));
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

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var city = String(data.get("city") || "").trim();
      var note = String(data.get("note") || "").trim();
      if (!name || !city) {
        error.hidden = false;
        return;
      }
      error.hidden = true;
      var text = currentLang() === "ur"
        ? "السلام علیکم، جاوید ہاتھ سے تیار کوفنز (جاوید ٹریڈرز)۔ میرا نام " + name + " ہے۔ مجھے " + city + " میں کوفن باکس چاہیے۔" + (note ? " " + note : "") + " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
        : "Hello Javed Handmade Coffins (Javed Traders). My name is " + name + ". I need a coffin box in " + city + "." + (note ? " " + note : "") + " Please share the rate and delivery time.";
      var url = waBase + encodeURIComponent(text);
      var opened = window.open(url, "_blank", "noopener");
      if (!opened) window.location.href = url;
    });
  }
})();
