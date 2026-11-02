(function () {
  var items = [
    {
      photo: "images/testimonials/samuel-masih.jpg",
      name: { en: "Samuel Masih", ur: "سیموئل مسیح" },
      place: { en: "Rawalpindi, Pakistan", ur: "راولپنڈی، پاکستان" },
      quote: {
        en: "When we needed a coffin box the same day, Javed Yaqub answered WhatsApp himself. The box arrived in Lalkurti timing that matched our family prayer.",
        ur: "جب ہمیں اسی دن کوفن باکس چاہیے تھا، جاوید یعقوب نے خود واٹس ایپ کا جواب دیا۔ باکس لالکورٹی سے ایسے وقت پہنچا جو ہمارے خاندانی دعا کے مطابق تھا۔"
      }
    },
    {
      photo: "images/testimonials/grace-bhatti.jpg",
      name: { en: "Grace Bhatti", ur: "گریس بھٹی" },
      place: { en: "Lahore, Pakistan", ur: "لاہور، پاکستان" },
      quote: {
        en: "We ordered from Lahore for our church community. The finish was careful, the lining clean, and the city delivery was confirmed before the box left Rawalpindi.",
        ur: "ہم نے لاہور سے اپنی چرچ کمیونٹی کے لیے آرڈر کیا۔ فنش احتیاط سے تھی، استر صاف، اور باکس راولپنڈی سے نکلنے سے پہلے شہر ڈیلیوری کی تصدیق ہو گئی۔"
      }
    },
    {
      photo: "images/testimonials/joseph-gill.jpg",
      name: { en: "Joseph Gill", ur: "جوزف گل" },
      place: { en: "Islamabad, Pakistan", ur: "اسلام آباد، پاکستان" },
      quote: {
        en: "Handmade felt different from a factory box. Our family trusted the Lalkurti workshop because every detail was explained on the call.",
        ur: "ہاتھ سے تیار باکس فیکٹری والے سے مختلف لگا۔ ہمارے خاندان نے لالکورٹی ورکشاپ پر بھروسہ کیا کیونکہ کال پر ہر تفصیل واضح کی گئی۔"
      }
    },
    {
      photo: "images/testimonials/rebecca-john.jpg",
      name: { en: "Rebecca John", ur: "ربیکہ جان" },
      place: { en: "Karachi, Pakistan", ur: "کراچی، پاکستان" },
      quote: {
        en: "From Karachi we only had a short window. Javed Traders arranged a ready taboot box and kept us updated until our relatives received it.",
        ur: "کراچی سے ہمارے پاس وقت کم تھا۔ جاوید ٹریڈرز نے تیار تابوت باکس کا بندوبست کیا اور رشتہ داروں کے ملنے تک ہمیں اپ ڈیٹ دیتے رہے۔"
      }
    },
    {
      photo: "images/testimonials/michael-thompson.jpg",
      name: { en: "Michael Thompson", ur: "مائیکل تھامسن" },
      place: { en: "Houston, United States", ur: "ہیوسٹن، امریکہ" },
      quote: {
        en: "Calling from Houston, I needed a coffin box prepared in Pakistan for my uncle’s family. WhatsApp +92 317 5404197 made the size, rate, and local handoff clear without flying home first.",
        ur: "ہیوسٹن سے کال کر کے مجھے پاکستان میں چچا کے خاندان کے لیے کوفن باکس چاہیے تھا۔ واٹس ایپ +92 317 5404197 سے سائز، ریٹ اور مقامی حوالگی واضح ہو گئی — پہلے گھر آئے بغیر۔"
      }
    },
    {
      photo: "images/testimonials/patricia-miller.jpg",
      name: { en: "Patricia Miller", ur: "پیٹریشیا ملر" },
      place: { en: "Chicago, United States", ur: "شکاگو، امریکہ" },
      quote: {
        en: "From Chicago we asked about a transit-style box for repatriation planning. Javed explained what they can prepare from Lalkurti and what documents our side must arrange. Calm, direct service.",
        ur: "شکاگو سے ہم نے ریپٹری ایشن کے لیے ٹرانزٹ طرز کے باکس کے بارے میں پوچھا۔ جاوید نے بتایا لالکورٹی سے کیا تیار ہو سکتا ہے اور ہمارے پاس کون سے کاغذات ہیں۔ پرسکون، سیدھی خدمت۔"
      }
    }
  ];

  function cardHtml(item, index) {
    return (
      '<article class="testimonial-card" data-index="' +
      index +
      '" role="group" aria-roledescription="slide" aria-label="' +
      (index + 1) +
      " of " +
      items.length +
      '">' +
      '<figure class="testimonial-photo">' +
      '<img src="' +
      item.photo +
      '" alt="" width="160" height="160" loading="lazy" decoding="async">' +
      "</figure>" +
      '<blockquote class="testimonial-quote">' +
      '<p><span class="t-en">' +
      item.quote.en +
      '</span><span class="t-ur">' +
      item.quote.ur +
      "</span></p>" +
      "</blockquote>" +
      '<footer class="testimonial-meta">' +
      '<strong><span class="t-en">' +
      item.name.en +
      '</span><span class="t-ur">' +
      item.name.ur +
      "</span></strong>" +
      '<span class="testimonial-place"><span class="t-en">' +
      item.place.en +
      '</span><span class="t-ur">' +
      item.place.ur +
      "</span></span>" +
      "</footer>" +
      "</article>"
    );
  }

  function initCarousel(root) {
    if (!root || root.dataset.ready === "1") return;
    root.dataset.ready = "1";

    var viewport = root.querySelector(".testimonials-viewport");
    var track = root.querySelector(".testimonials-track");
    var dotsWrap = root.querySelector(".testimonials-dots");
    var prevBtn = root.querySelector('[data-testimonial-nav="prev"]');
    var nextBtn = root.querySelector('[data-testimonial-nav="next"]');
    if (!viewport || !track) return;

    track.innerHTML = items.map(cardHtml).join("");
    if (dotsWrap) {
      dotsWrap.innerHTML = items
        .map(function (_, i) {
          return (
            '<button type="button" class="testimonials-dot" data-dot="' +
            i +
            '" aria-label="Show testimonial ' +
            (i + 1) +
            '"></button>'
          );
        })
        .join("");
    }

    var index = 0;
    var timer = null;
    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(next) {
      index = (next + items.length) % items.length;
      var rtl = document.documentElement.dir === "rtl";
      var offset = (rtl ? index : -index) * 100;
      track.style.transform = "translate3d(" + offset + "%, 0, 0)";
      root.querySelectorAll(".testimonials-dot").forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
      track.querySelectorAll(".testimonial-card").forEach(function (card, i) {
        card.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    }

    function play() {
      if (reduced) return;
      stop();
      timer = window.setInterval(function () {
        go(index + 1);
      }, 5600);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        go(index - 1);
        play();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        go(index + 1);
        play();
      });
    }
    if (dotsWrap) {
      dotsWrap.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-dot]");
        if (!btn) return;
        go(Number(btn.getAttribute("data-dot")));
        play();
      });
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) play();
    });

    document.addEventListener("jfc:lang", function () {
      go(index);
    });

    go(0);
    play();
  }

  document.querySelectorAll("[data-testimonials]").forEach(initCarousel);
})();
