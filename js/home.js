(function () {
  var titles = {
    en: "Javed Handmade Coffins | Lalkurti, Rawalpindi",
    ur: "جاوید ہاتھ سے تیار کوفنز | لالکورٹی، راولپنڈی"
  };
  JFC.initChrome(titles);

  var track = document.getElementById("loop-track");
  var form = document.getElementById("rate-form");
  var error = document.getElementById("form-error");

  JFC.loadProducts()
    .then(function (data) {
      var list = data.products || [];
      if (!track || !list.length) return;
      var cards = [];
      list.forEach(function (p) {
        var imgs = p.images && p.images.length ? p.images : [{ thumb: p.thumb, image: p.image }];
        // Cover + up to 2 more angles so the carousel shows variety of the same handmade types
        imgs.slice(0, 3).forEach(function (img, i) {
          cards.push({
            href: "shop.html#" + p.id,
            thumb: img.thumb || img.image,
            en: i === 0 ? p.en : p.en + " · view",
            ur: i === 0 ? p.ur : p.ur + " · زاویہ"
          });
        });
      });
      var html = cards
        .map(function (c) {
          return (
            '<a class="loop-card" href="' +
            c.href +
            '"><img src="' +
            c.thumb +
            '" alt="' +
            c.en +
            '" loading="lazy" width="420" height="420"><span><span class="t-en">' +
            c.en +
            '</span><span class="t-ur">' +
            c.ur +
            "</span></span></a>"
          );
        })
        .join("");
      track.innerHTML = html + html;
    })
    .catch(function () {});

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
          ? "السلام علیکم، جاوید ہاتھ سے تیار کوفنز۔ میرا نام " +
            name +
            " ہے۔ مجھے " +
            city +
            " میں ہاتھ سے تیار کوفن باکس چاہیے۔" +
            (note ? " " + note : "") +
            " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
          : "Hello Javed Handmade Coffins. My name is " +
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
