(function () {
  var titles = {
    en: "Handmade Coffin Boxes in Rawalpindi | Javed Handmade Coffins",
    ur: "راولپنڈی میں ہاتھ سے تیار کوفن باکس | جاوید ہاتھ سے تیار کوفنز"
  };
  JFC.initChrome(titles);

  var grid = document.getElementById("featured-grid");
  var form = document.getElementById("rate-form");
  var error = document.getElementById("form-error");

  function renderFeatured(list) {
    if (!grid) return;
    grid.innerHTML = list
      .map(function (p) {
        return JFC.productCardHtml(p);
      })
      .join("");
  }

  JFC.loadProducts()
    .then(function (data) {
      var list = (data.products || []).filter(function (p) {
        return p.shop !== false;
      });
      // Eight featured types: fills a 4×2 laptop grid
      var featuredIds = [
        "light-pine-viewing-white-lined",
        "carved-cherry-cross-viewing-coffin",
        "dark-walnut-silver-rail-rectangular",
        "honey-oak-tapered-brass-handles",
        "white-painted-tapered-white-rails",
        "dark-mahogany-viewing-brass-handles",
        "classic-cherry-tapered-brass-handles",
        "cherry-cargo-repatriation-transit-box"
      ];
      var featured = featuredIds
        .map(function (id) {
          return list.find(function (p) {
            return p.id === id;
          });
        })
        .filter(Boolean);
      if (featured.length < 8) {
        list.forEach(function (p) {
          if (featured.length >= 8) return;
          if (!featured.some(function (f) { return f.id === p.id; })) featured.push(p);
        });
      }
      renderFeatured(featured);
    })
    .catch(function () {});

  document.addEventListener("jfc:lang", function () {
    // Re-render not needed for static bilingual spans inside cards
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
      var text =
        JFC.currentLang() === "ur"
          ? "السلام علیکم، جاوید ہاتھ سے تیار کوفنز (جاوید ٹریڈرز)۔ میرا نام " +
            name +
            " ہے۔ مجھے " +
            city +
            " میں ہاتھ سے تیار کوفن باکس چاہیے۔" +
            (note ? " " + note : "") +
            " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
          : "Hello Javed Handmade Coffins (Javed Traders). My name is " +
            name +
            ". I need a handmade coffin box in " +
            city +
            "." +
            (note ? " " + note : "") +
            " Please share the rate and delivery time.";
      JFC.openWhatsApp(text);
    });
  }
})();
