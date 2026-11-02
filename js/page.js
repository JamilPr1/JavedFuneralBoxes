(function () {
  var map = {
    "delivery.html": {
      en: "Coffin Box Delivery Pakistan & Abroad | Javed Handmade Coffins",
      ur: "کوفن باکس ڈیلیوری پاکستان اور بیرون ملک | جاوید ہاتھ سے تیار کوفنز"
    },
    "about.html": {
      en: "About Javed Traders & Handmade Coffins Lalkurti | Javed Yaqub",
      ur: "جاوید ٹریڈرز اور ہاتھ سے تیار کوفنز لالکورٹی | جاوید یعقوب"
    },
    "contact.html": {
      en: "Contact for Coffin Box Rate Rawalpindi | WhatsApp 0317 5404197",
      ur: "کوفن باکس ریٹ راولپنڈی رابطہ | واٹس ایپ 0317 5404197"
    }
  };
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  JFC.initChrome(map[file] || map["about.html"]);

  var form = document.getElementById("rate-form");
  var error = document.getElementById("form-error");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var city = String(data.get("city") || "").trim();
    var note = String(data.get("note") || "").trim();
    if (!name || !city) {
      if (error) error.hidden = false;
      return;
    }
    if (error) error.hidden = true;
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
})();
