(function () {
  var titles = {
    en: "Coffin Box Gallery Rawalpindi | Javed Traders Coffins",
    ur: "کوفن باکس گیلری راولپنڈی | جاوید ٹریڈرز کوفنز"
  };
  JFC.initChrome(titles);

  var grid = document.getElementById("gallery-grid");
  var empty = document.getElementById("gallery-empty");
  var lightbox = document.getElementById("lightbox");
  var lightImg = document.getElementById("lightbox-img");
  var items = [];

  function openLight(src) {
    lightImg.src = src;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function closeLight() {
    lightbox.hidden = true;
    lightImg.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
  }

  JFC.loadProducts()
    .then(function (data) {
      var products = data.products || [];
      items = [];
      if (products.length) {
        products.forEach(function (p) {
          var imgs = JFC.productImages(p);
          imgs.forEach(function (img, i) {
            items.push({
              src: img.image,
              thumb: img.thumb || img.image,
              en: i === 0 ? p.en : p.en + " · detail",
              ur: i === 0 ? p.ur : p.ur + " · تفصیل",
              href: JFC.productUrl(p)
            });
          });
        });
      }

      if (!items.length) {
        empty.hidden = false;
        return;
      }

      grid.innerHTML = "";
      items.forEach(function (item) {
        var figure = document.createElement("div");
        figure.className = "gallery-item-wrap";
        figure.innerHTML =
          '<button type="button" class="gallery-item" aria-label="' +
          item.en +
          '">' +
          '<img src="' +
          item.thumb +
          '" alt="' +
          item.en +
          '" loading="lazy" width="560" height="420">' +
          "</button>" +
          '<a class="gallery-caption" href="' +
          item.href +
          '"><span class="t-en">' +
          item.en +
          '</span><span class="t-ur">' +
          item.ur +
          "</span></a>";
        figure.querySelector("button").addEventListener("click", function () {
          openLight(item.src);
        });
        grid.appendChild(figure);
      });
    })
    .catch(function () {
      empty.hidden = false;
    });

  document.querySelectorAll("[data-close-lightbox]").forEach(function (el) {
    el.addEventListener("click", closeLight);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLight();
  });
})();
