(function () {
  var titles = {
    en: "Shop Coffin Boxes | Javed Handmade Coffins",
    ur: "کوفن باکس خریدیں | جاوید ہاتھ سے تیار کوفنز"
  };
  JFC.initChrome(titles);

  var grid = document.getElementById("shop-grid");
  var empty = document.getElementById("shop-empty");

  function render(products) {
    if (!products.length) {
      empty.hidden = false;
      grid.innerHTML = "";
      return;
    }
    empty.hidden = true;
    grid.innerHTML = products
      .map(function (p) {
        return JFC.productCardHtml(p);
      })
      .join("");
  }

  JFC.loadProducts()
    .then(function (data) {
      var products = (data.products || []).filter(function (p) {
        return p.shop !== false;
      });
      render(products);
    })
    .catch(function () {
      empty.hidden = false;
    });

  document.addEventListener("jfc:lang", function () {
    // bilingual spans already in markup
  });
})();
