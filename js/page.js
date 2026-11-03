(function () {
  var map = {
    "delivery.html": {
      en: "Coffin Box Delivery Pakistan & Abroad | Javed Traders - Funeral Services",
      ur: "کوفن باکس ڈیلیوری پاکستان اور بیرون ملک | جاوید ٹریڈرز - جنازہ خدمات"
    },
    "about.html": {
      en: "About Javed Traders - Funeral Services Lalkurti | Javed Gill",
      ur: "جاوید ٹریڈرز - جنازہ خدمات لالکورٹی | جاوید گل"
    },
    "contact.html": {
      en: "Contact Funeral Services Rawalpindi | Call 0342 5277953 | WhatsApp 0317 5404197",
      ur: "جنازہ خدمات رابطہ راولپنڈی | کال 0342 5277953 | واٹس ایپ 0317 5404197"
    },
    "privacy-policy.html": {
      en: "Privacy Policy | Javed Traders - Funeral Services",
      ur: "رازداری کی پالیسی | جاوید ٹریڈرز - جنازہ خدمات"
    },
    "terms.html": {
      en: "Terms of Use | Javed Traders - Funeral Services",
      ur: "شرائط استعمال | جاوید ٹریڈرز - جنازہ خدمات"
    },
    "disclaimer.html": {
      en: "Disclaimer | Javed Traders - Funeral Services",
      ur: "دستبرداری | جاوید ٹریڈرز - جنازہ خدمات"
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
        ? "السلام علیکم، جاوید ٹریڈرز - جنازہ خدمات۔ میرا نام " +
          name +
          " ہے۔ مجھے " +
          city +
          " میں ہاتھ سے تیار کوفن باکس چاہیے۔" +
          (note ? " " + note : "") +
          " براہ کرم ریٹ اور ڈیلیوری کا وقت بتائیں۔"
        : "Hello Javed Traders - Funeral Services. My name is " +
          name +
          ". I need a handmade coffin box in " +
          city +
          "." +
          (note ? " " + note : "") +
          " Please share the rate and delivery time.";
    JFC.openWhatsApp(text);
  });
})();
