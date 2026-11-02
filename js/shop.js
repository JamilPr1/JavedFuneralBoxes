(function () {
  var titles = {
    en: "Shop Coffin Boxes | Javed Handmade Coffins",
    ur: "کوفن باکس خریدیں | جاوید ہاتھ سے تیار کوفنز"
  };
  JFC.initChrome(titles);

  var grid = document.getElementById("shop-grid");
  var empty = document.getElementById("shop-empty");
  var form = document.getElementById("shop-form");
  var error = document.getElementById("shop-error");
  var selectedInput = document.getElementById("selected-box");
  var selectedPreview = document.getElementById("selected-preview");
  var selectedName = document.getElementById("selected-name");
  var selectedMeta = document.getElementById("selected-meta");
  var selectedGallery = document.getElementById("selected-gallery");
  var selected = null;
  var products = [];

  function productImages(product) {
    if (product.images && product.images.length) return product.images;
    return [{ image: product.image, thumb: product.thumb || product.image }];
  }

  function applySelection(product, scroll) {
    selected = product;
    selectedInput.value = product.id;
    selectedPreview.hidden = false;
    var imgs = productImages(product);
    selectedPreview.querySelector("img").src = imgs[0].image;
    selectedPreview.querySelector("img").alt = product.en;
    selectedName.innerHTML = "<span class=\"t-en\">" + product.en + "</span><span class=\"t-ur\">" + product.ur + "</span>";
    selectedMeta.innerHTML =
      "<span class=\"t-en\">" + product.finish_en + " · " + product.feature_en + "</span>" +
      "<span class=\"t-ur\">" + product.finish_ur + " · " + product.feature_ur + "</span>";

    if (selectedGallery) {
      selectedGallery.innerHTML = "";
      selectedGallery.hidden = imgs.length < 2;
      imgs.forEach(function (item, index) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "selected-thumb" + (index === 0 ? " is-active" : "");
        btn.innerHTML = '<img src="' + item.thumb + '" alt="">';
        btn.addEventListener("click", function (event) {
          event.stopPropagation();
          selectedPreview.querySelector("img").src = item.image;
          selectedGallery.querySelectorAll(".selected-thumb").forEach(function (el) {
            el.classList.remove("is-active");
          });
          btn.classList.add("is-active");
        });
        selectedGallery.appendChild(btn);
      });
    }

    render();
    if (scroll) form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function render() {
    grid.innerHTML = "";
    products.forEach(function (product) {
      var imgs = productImages(product);
      var count = imgs.length;
      var card = document.createElement("article");
      card.id = product.id;
      card.className = "product-card" + (selected && selected.id === product.id ? " is-selected" : "");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", selected && selected.id === product.id ? "true" : "false");
      card.innerHTML =
        '<div class="product-media">' +
        '<img src="' + product.thumb + '" alt="' + product.en + '" loading="lazy" width="420" height="420">' +
        (count > 1
          ? '<span class="photo-count"><span class="t-en">' + count + " photos</span><span class=\"t-ur\">" + count + " تصاویر</span></span>"
          : "") +
        "</div>" +
        "<h3><span class=\"t-en\">" + product.en + "</span><span class=\"t-ur\">" + product.ur + "</span></h3>" +
        "<p class=\"product-meta\"><span class=\"t-en\">Handmade · " + product.type_en + "</span>" +
        "<span class=\"t-ur\">ہاتھ سے تیار · " + product.type_ur + "</span></p>" +
        "<p class=\"product-meta product-meta-soft\"><span class=\"t-en\">" + product.feature_en + "</span>" +
        "<span class=\"t-ur\">" + product.feature_ur + "</span></p>" +
        '<span class="product-pick"><span class="t-en">Select this box</span><span class="t-ur">یہ باکس منتخب کریں</span></span>';
      function choose() {
        applySelection(product, true);
      }
      card.addEventListener("click", choose);
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      });
      grid.appendChild(card);
    });
  }

  JFC.loadProducts()
    .then(function (data) {
      products = (data.products || []).filter(function (p) {
        return p.shop !== false;
      });
      if (!products.length) {
        empty.hidden = false;
        return;
      }
      render();
      var hash = (location.hash || "").replace(/^#/, "");
      if (hash) {
        var match = products.find(function (p) {
          return p.id === hash;
        });
        if (match) applySelection(match, true);
      }
    })
    .catch(function () {
      empty.hidden = false;
    });

  document.addEventListener("jfc:lang", function () {
    render();
    if (selected) applySelection(selected, false);
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var city = String(data.get("city") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var note = String(data.get("note") || "").trim();
      if (!selected) {
        error.hidden = false;
        error.querySelector(".t-en").textContent = "Please select a coffin box first.";
        error.querySelector(".t-ur").textContent = "پہلے ایک کوفن باکس منتخب کریں۔";
        return;
      }
      if (!name || !city) {
        error.hidden = false;
        error.querySelector(".t-en").textContent = "Please add your name and city.";
        error.querySelector(".t-ur").textContent = "براہ کرم نام اور شہر لکھیں۔";
        return;
      }
      error.hidden = true;
      var lang = JFC.currentLang();
      var boxName = JFC.productLabel(selected, lang);
      var text =
        lang === "ur"
          ? "السلام علیکم، جاوید ہاتھ سے تیار کوفنز۔ میرا نام " +
            name +
            " ہے۔ مجھے یہ ہاتھ سے تیار باکس چاہیے: " +
            boxName +
            "۔ ڈیلیوری شہر: " +
            city +
            "۔" +
            (phone ? " فون: " + phone + "۔" : "") +
            (note ? " " + note : "") +
            " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
          : "Hello Javed Handmade Coffins. My name is " +
            name +
            ". I want this handmade box: " +
            boxName +
            ". Delivery city: " +
            city +
            "." +
            (phone ? " Phone: " + phone + "." : "") +
            (note ? " " + note : "") +
            " Please share the rate and delivery time.";
      JFC.openWhatsApp(text);
    });
  }
})();
