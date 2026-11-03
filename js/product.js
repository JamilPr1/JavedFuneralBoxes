(function () {
  var titles = {
    en: "Handmade Coffin Box Rawalpindi | Javed Traders - Funeral Services",
    ur: "ہاتھ سے تیار کوفن باکس راولپنڈی | جاوید ٹریڈرز - جنازہ خدمات"
  };
  JFC.initChrome(titles);

  var missing = document.getElementById("product-missing");
  var view = document.getElementById("product-view");
  var ask = document.getElementById("ask-rate");
  var more = document.getElementById("more-boxes");
  var mainImg = document.getElementById("product-main-img");
  var thumbs = document.getElementById("product-thumbs");
  var form = document.getElementById("product-form");
  var error = document.getElementById("product-error");
  var product = null;
  var allProducts = [];

  function setMain(src, alt) {
    mainImg.src = src;
    mainImg.alt = alt || "";
  }

  function fillCopy() {
    if (!product) return;
    var lang = JFC.currentLang();
    var imgs = JFC.productImages(product);
    document.title =
      lang === "ur"
        ? product.ur + " | کوفن باکس راولپنڈی | جاوید ٹریڈرز - جنازہ خدمات"
        : product.en + " | Coffin Box Rawalpindi | Javed Traders - Funeral Services";

    document.getElementById("product-title").innerHTML =
      '<span class="t-en">' + product.en + '</span><span class="t-ur">' + product.ur + "</span>";
    document.getElementById("product-type").innerHTML =
      '<span class="t-en">Handmade · ' +
      (product.type_en || "") +
      '</span><span class="t-ur">ہاتھ سے تیار · ' +
      (product.type_ur || "") +
      "</span>";
    document.getElementById("product-desc").innerHTML =
      '<span class="t-en">' +
      product.finish_en +
      ". " +
      product.feature_en +
      '. Open photos below, then ask Javed Gill for the rate on WhatsApp.</span><span class="t-ur">' +
      product.finish_ur +
      "۔ " +
      product.feature_ur +
      "۔ نیچے تصاویر دیکھیں، پھر ریٹ کے لیے جاوید گل سے واٹس ایپ پر پوچھیں۔</span>";
    document.getElementById("product-finish").innerHTML =
      '<span class="t-en">' + product.finish_en + '</span><span class="t-ur">' + product.finish_ur + "</span>";
    document.getElementById("product-feature").innerHTML =
      '<span class="t-en">' + product.feature_en + '</span><span class="t-ur">' + product.feature_ur + "</span>";

    setMain(imgs[0].image, product.en);
    thumbs.innerHTML = "";
    imgs.forEach(function (item, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "product-thumb" + (index === 0 ? " is-active" : "");
      btn.innerHTML = '<img src="' + item.thumb + '" alt="">';
      btn.addEventListener("click", function () {
        setMain(item.image, product.en);
        thumbs.querySelectorAll(".product-thumb").forEach(function (el) {
          el.classList.remove("is-active");
        });
        btn.classList.add("is-active");
      });
      thumbs.appendChild(btn);
    });

    document.getElementById("selected-box").value = product.id;
    document.getElementById("order-preview-img").src = imgs[0].image;
    document.getElementById("order-preview-img").alt = product.en;
    document.getElementById("selected-name").innerHTML =
      '<span class="t-en">' + product.en + '</span><span class="t-ur">' + product.ur + "</span>";
    document.getElementById("selected-meta").innerHTML =
      '<span class="t-en">' +
      product.finish_en +
      " · " +
      product.feature_en +
      '</span><span class="t-ur">' +
      product.finish_ur +
      " · " +
      product.feature_ur +
      "</span>";
  }

  function renderMore() {
    if (!product || !more) return;
    var others = allProducts.filter(function (p) {
      return p.id !== product.id;
    }).slice(0, 4);
    var grid = document.getElementById("more-grid");
    if (!others.length) {
      more.hidden = true;
      return;
    }
    more.hidden = false;
    grid.innerHTML = others
      .map(function (p) {
        return JFC.productCardHtml(p);
      })
      .join("");
  }

  JFC.loadProducts()
    .then(function (data) {
      allProducts = (data.products || []).filter(function (p) {
        return p.shop !== false;
      });
      var id = JFC.queryParam("id");
      product = allProducts.find(function (p) {
        return p.id === id;
      });
      if (!product) {
        missing.hidden = false;
        return;
      }
      view.hidden = false;
      ask.hidden = false;
      fillCopy();
      renderMore();
    })
    .catch(function () {
      missing.hidden = false;
    });

  document.addEventListener("jfc:lang", function () {
    if (product) {
      fillCopy();
      renderMore();
    }
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!product) return;
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var city = String(data.get("city") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var note = String(data.get("note") || "").trim();
      if (!name || !city) {
        error.hidden = false;
        return;
      }
      error.hidden = true;
      var lang = JFC.currentLang();
      var boxName = JFC.productLabel(product, lang);
      var text =
        lang === "ur"
          ? "السلام علیکم، جاوید ٹریڈرز - جنازہ خدمات۔ میرا نام " +
            name +
            " ہے۔ مجھے یہ ہاتھ سے تیار باکس چاہیے: " +
            boxName +
            "۔ ڈیلیوری شہر: " +
            city +
            "۔" +
            (phone ? " فون: " + phone + "۔" : "") +
            (note ? " " + note : "") +
            " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
          : "Hello Javed Traders - Funeral Services. My name is " +
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
