(function () {
  var titles = {
    en: "Gallery | Javed Handmade Coffins",
    ur: "گیلری | جاوید ہاتھ سے تیار کوفنز"
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
          var imgs = p.images && p.images.length ? p.images : [{ image: p.image, thumb: p.thumb }];
          imgs.forEach(function (img, i) {
            items.push({
              src: img.image,
              thumb: img.thumb || img.image,
              en: i === 0 ? p.en : p.en + " · detail",
              ur: i === 0 ? p.ur : p.ur + " · تفصیل",
              href: "shop.html#" + p.id
            });
          });
        });
      } else if (data.gallery && data.gallery.length) {
        items = data.gallery.map(function (src, index) {
          return {
            src: src,
            thumb: src,
            en: "Handmade coffin box " + (index + 1),
            ur: "ہاتھ سے تیار کوفن باکس " + (index + 1),
            href: "shop.html"
          };
        });
      }

      if (!items.length) {
        empty.hidden = false;
        return;
      }

      grid.innerHTML = "";
      items.forEach(function (item) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "gallery-item";
        button.innerHTML =
          '<img src="' +
          item.thumb +
          '" alt="' +
          item.en +
          '" loading="lazy" width="560" height="420">' +
          '<span class="gallery-caption"><span class="t-en">' +
          item.en +
          '</span><span class="t-ur">' +
          item.ur +
          "</span></span>";
        button.addEventListener("click", function () {
          openLight(item.src);
        });
        grid.appendChild(button);
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
