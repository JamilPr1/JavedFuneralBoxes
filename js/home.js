(function () {
  var titles = {
    en: "Funeral Services Rawalpindi | Coffins, Transit & Cremation | Javed Traders",
    ur: "جنازہ خدمات راولپنڈی | کوفن، ٹرانزٹ اور کریمیشن | جاوید ٹریڈرز"
  };
  JFC.initChrome(titles);

  var grid = document.getElementById("featured-grid");

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

})();
