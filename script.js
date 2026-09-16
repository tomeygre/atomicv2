(function () {
  "use strict";

  /* ---------------- intro loader ---------------- */
  // Runs immediately (not on DOMContentLoaded) since this script sits at the
  // end of body, after the loader markup — the DOM it needs already exists.
  // Everything else on the page renders and animates in behind the opaque
  // overlay the whole time; only the cycling words are the loader's own work.
  (function initLoader() {
    var loader = document.getElementById("loader");
    var cycleEl = document.getElementById("loaderCycle");
    var barFill = document.getElementById("loaderBarFill");
    if (!loader || !cycleEl) {
      return;
    }

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var words = ["Energy", "Number", "Mass", "Habits", "Design", "Power", "Theory", "Model"];
    var FINAL_WORD = "Strategy";
    var FLIP_MS = 70;
    var TOTAL_STEPS = words.length + 1; // +1 for the final "Strategy" landing

    document.body.classList.add("is-loading");

    function setProgress(step) {
      if (barFill) {
        barFill.style.width = Math.min(100, (step / TOTAL_STEPS) * 100) + "%";
      }
    }

    function finish() {
      cycleEl.textContent = FINAL_WORD;
      cycleEl.classList.remove("is-flip");
      cycleEl.classList.add("is-final");
      setProgress(TOTAL_STEPS);
      window.setTimeout(function () {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
      }, 550);
    }

    if (reduceMotion) {
      finish();
      return;
    }

    var i = 0;
    var delay = 65;
    setProgress(1);

    function tick() {
      cycleEl.classList.add("is-flip");
      window.setTimeout(function () {
        i += 1;
        if (i >= words.length) {
          finish();
          return;
        }
        cycleEl.textContent = words[i];
        cycleEl.classList.remove("is-flip");
        setProgress(i + 1);
        delay += 5; // eases out — the last few words land a touch slower
        window.setTimeout(tick, delay);
      }, FLIP_MS);
    }

    window.setTimeout(tick, delay);
  })();

  var STORAGE_KEY = "as-lang";
  var DEFAULT_LANG = "el";

  var translations = {
    el: {
      "meta.title": "Marketing that brings brands forward — Atomic Strategy",
      "meta.description": "Atomic Strategy — boutique brand & marketing strategy studio στο Ηράκλειο Κρήτης.",
      "a11y.skipLink": "Μετάβαση στο περιεχόμενο",

      "nav.about": "Σχετικά",
      "nav.services": "Υπηρεσίες",
      "nav.work": "Case Studies",
      "nav.contact": "Επικοινωνία",
      "nav.cta": "Ας μιλήσουμε",
      "nav.servicesFooterPrompt": "Δεν ξέρεις από πού να ξεκινήσεις;",
      "nav.servicesFooterCta": "Κλείσε ένα ραντεβού →",

      "hero.title": "Marketing that brings <span class=\"glow-text\">brands</span> <span class=\"glow-text\">forward</span>.",
      "hero.scroll": "Explore",

      "about.kicker": "Σχετικά",
      "about.heading": "Λίγα λόγια για εμάς",
      "about.body": "Το Atomic Strategy είναι ένα boutique brand & marketing strategy studio. Δουλεύουμε με brands που θέλουν να ξεχωρίσουν από το πλήθος, συνδυάζοντας στρατηγική με δημιουργικό περιεχόμενο για να χτίσουν ισχυρή ψηφιακή παρουσία και να πετύχουν ουσιαστική ανάπτυξη.",
      "about.stat1Label": "χρόνια εμπειρίας",
      "about.stat2Label": "ολοκληρωμένα έργα",
      "about.stat3Label": "custom λύσεις",

      "services.kicker": "Υπηρεσίες",
      "services.heading": "Πώς μπορούμε να βοηθήσουμε",
      "services.subheading": "Social, διαφημίσεις και web — χτισμένα γύρω από το funnel που πραγματικά ακολουθούν οι πελάτες σου.",
      "service1.title": "Διαχείριση Social Media",
      "service1.desc": "Στρατηγική, παραγωγή και διαχείριση περιεχομένου για Meta & TikTok, προσαρμοσμένα στο brand σου.",
      "service2.title": "Meta & Google Ads",
      "service2.desc": "Καμπάνιες βασισμένες στο customer funnel, με στοχευμένο retargeting και μηνιαίο reporting.",
      "service3.title": "Κατασκευή Ιστοσελίδων",
      "service3.desc": "Γρήγορες, custom ιστοσελίδες φτιαγμένες να μετατρέπουν — όχι απλώς να δείχνουν ωραία.",
      "service4.title": "Brand Strategy",
      "service4.desc": "Θέση, αφήγηση και ταυτότητα που κάνουν το brand σου να ξεχωρίζει από το πλήθος.",

      "work.kicker": "Case Studies",
      "work.heading": "Brands που πήραμε ένα βήμα παραπέρα",
      "work.subheading": "Οκτώ brands, μία στρατηγική τη φορά.",

      "contact.kicker": "Επικοινωνία",
      "contact.heading": "Ας φτιάξουμε κάτι μαζί",
      "contact.body": "Έχεις ένα project στο μυαλό σου; Πες μας λίγα λόγια και θα επικοινωνήσουμε μαζί σου σύντομα.",
      "contact.formName": "Όνομα",
      "contact.formEmail": "Email",
      "contact.formMessage": "Μήνυμα",
      "contact.formSubmit": "Στείλε μήνυμα",
      "contact.formNote": "Ανοίγει η εφαρμογή email σου με τα στοιχεία συμπληρωμένα.",
      "contact.orDivider": "Ή επικοινώνησε απευθείας",
      "contact.emailLabel": "Στείλε email",
      "contact.instagram": "Instagram",
      "contact.linkedin": "LinkedIn",

      "footer.tagline": "Σχεδιασμένο &amp; φτιαγμένο με προσοχή στη λεπτομέρεια.",
      "footer.rights": "Όλα τα δικαιώματα διατηρούνται."
    },

    en: {
      "meta.title": "Marketing that brings brands forward — Atomic Strategy",
      "meta.description": "Atomic Strategy — boutique brand & marketing strategy studio in Heraklion, Crete.",
      "a11y.skipLink": "Skip to content",

      "nav.about": "About",
      "nav.services": "Services",
      "nav.work": "Case Studies",
      "nav.contact": "Contact",
      "nav.cta": "Let's talk",
      "nav.servicesFooterPrompt": "Not sure where to start?",
      "nav.servicesFooterCta": "Book a strategy call →",

      "hero.title": "Marketing that brings <span class=\"glow-text\">brands</span> <span class=\"glow-text\">forward</span>.",
      "hero.scroll": "Explore",

      "about.kicker": "About",
      "about.heading": "A little about us",
      "about.body": "Atomic Strategy is a boutique brand & marketing strategy studio. We work with brands that want to stand out from the crowd, pairing strategy with creative content to build a strong digital presence and drive meaningful growth.",
      "about.stat1Label": "years of experience",
      "about.stat2Label": "projects shipped",
      "about.stat3Label": "custom-built solutions",

      "services.kicker": "Services",
      "services.heading": "How we can help",
      "services.subheading": "Social, ads, and web — built around the funnel your customers actually follow.",
      "service1.title": "Social Media Management",
      "service1.desc": "Strategy, production, and content management for Meta & TikTok, tailored to your brand.",
      "service2.title": "Meta & Google Ads",
      "service2.desc": "Campaigns built around the customer funnel, with targeted retargeting and monthly reporting.",
      "service3.title": "Web Development",
      "service3.desc": "Fast, custom websites built to convert — not just to look good.",
      "service4.title": "Brand Strategy",
      "service4.desc": "Positioning, story, and identity that make your brand stand out from the crowd.",

      "work.kicker": "Case Studies",
      "work.heading": "Brands we've moved forward",
      "work.subheading": "Eight brands, one strategy at a time.",

      "contact.kicker": "Contact",
      "contact.heading": "Let's build something together",
      "contact.body": "Got a project in mind? Send us a few details and we'll get back to you soon.",
      "contact.formName": "Name",
      "contact.formEmail": "Email",
      "contact.formMessage": "Message",
      "contact.formSubmit": "Send message",
      "contact.formNote": "Opens your email app with the details filled in.",
      "contact.orDivider": "Or reach out directly",
      "contact.emailLabel": "Send an email",
      "contact.instagram": "Instagram",
      "contact.linkedin": "LinkedIn",

      "footer.tagline": "Designed &amp; built with attention to detail.",
      "footer.rights": "All rights reserved."
    }
  };

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — ignore, language just won't persist */
    }
  }

  function applyLang(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-content");
      if (dict[key] !== undefined) {
        el.setAttribute("content", dict[key]);
      }
    });

    if (dict["meta.title"]) {
      document.title = dict["meta.title"];
    }

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function initLangSwitch() {
    var stored = getStoredLang();
    var initialLang = stored || DEFAULT_LANG;
    applyLang(initialLang);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        applyLang(lang);
        storeLang(lang);
      });
    });
  }

  function initFooterYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function initNavDropdown(triggerId, panelId) {
    var trigger = document.getElementById(triggerId);
    var panel = document.getElementById(panelId);
    if (!trigger || !panel) {
      return;
    }
    var wrap = trigger.closest(".nav-dropdown");

    function close() {
      trigger.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      if (wrap) wrap.classList.remove("is-open");
    }

    function open() {
      trigger.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
      if (wrap) wrap.classList.add("is-open");
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("click", function (event) {
      if (wrap && !wrap.contains(event.target)) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        close();
      }
    });
  }

  function initNavDropdowns() {
    initNavDropdown("servicesDropdownTrigger", "servicesDropdownPanel");
    initNavDropdown("servicesDropdownTriggerFloating", "servicesDropdownPanelFloating");
  }

  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initPinnedScroll() {
    if (!document.documentElement.classList.contains("pin-mode")) {
      return;
    }

    var pinWrap = document.getElementById("pinWrap");
    var pinAtom = pinWrap ? pinWrap.querySelector(".pin-bg-atom") : null;
    var heroWatermarkFill = pinWrap ? pinWrap.querySelector(".hero-watermark-fill") : null;
    var floatingNav = document.getElementById("floatingNav");
    var lastScrollY = window.scrollY;
    if (!pinWrap) {
      return;
    }

    var panels = Array.prototype.slice.call(pinWrap.querySelectorAll(".panel"));
    if (!panels.length) {
      return;
    }

    var panelIds = panels.map(function (panel) {
      return panel.id;
    });

    var PANEL_MARGIN = 0.035;
    var MIN_SCALE = 0.88;

    // The background atom mark starts small right where the hero's own focal
    // point sits, grows in as the journey begins, then fades from a
    // bold hero-level presence down to a subtle ambient glow as it
    // drifts across the background for the rest of the scroll. "blur" is
    // no longer applied as a real CSS blur (the atom stays crisp) — it's
    // kept only as an abstract "spread" input to the watermark mask radius
    // below, same as it always fed that calculation.
    var blobStops = [
      { left: 78, top: 46, opacity: 0.55, scale: 0.3, blur: 38 },  // hero
      { left: 84, top: 26, opacity: 0.3, scale: 0.62, blur: 70 },  // about — top-right
      { left: 14, top: 64, opacity: 0.22, scale: 1.0, blur: 90 },  // services — bottom-left
      { left: 82, top: 70, opacity: 0.24, scale: 0.92, blur: 90 }, // work — bottom-right
      { left: 85, top: 48, opacity: 0.24, scale: 0.85, blur: 90 }  // contact — right side, clear of the form
    ];

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function blobStateAt(progress) {
      var segments = blobStops.length - 1;
      var scaled = Math.min(Math.max(progress, 0), 1) * segments;
      var index = Math.min(Math.floor(scaled), segments - 1);
      var t = scaled - index;
      var a = blobStops[index];
      var b = blobStops[index + 1];
      return {
        left: lerp(a.left, b.left, t),
        top: lerp(a.top, b.top, t),
        opacity: lerp(a.opacity, b.opacity, t),
        scale: lerp(a.scale, b.scale, t),
        blur: lerp(a.blur, b.blur, t)
      };
    }

    // Both outgoing and incoming panels shrink toward MIN_SCALE (never
    // grow past 1) so they visually recede instead of overlapping —
    // opacity resolves faster than scale within the same window, so the
    // crossfade reads as a quick zoom rather than a lingering fade.
    function panelStateAt(index, count, progress) {
      var slice = 1 / count;
      var start = Math.max(0, index * slice - PANEL_MARGIN);
      var end = Math.min(1, (index + 1) * slice + PANEL_MARGIN);

      if (progress <= start) {
        return index === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: MIN_SCALE };
      }
      if (progress >= end) {
        return index === count - 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: MIN_SCALE };
      }

      var local = (progress - start) / (end - start);

      if (index === 0) {
        if (local < 0.5) {
          return { opacity: 1, scale: 1 };
        }
        var t0 = (local - 0.5) / 0.5;
        return {
          opacity: Math.max(0, 1 - t0 / 0.5),
          scale: 1 - t0 * (1 - MIN_SCALE)
        };
      }

      if (index === count - 1) {
        if (local > 0.5) {
          return { opacity: 1, scale: 1 };
        }
        var t1 = local / 0.5;
        return {
          opacity: Math.min(1, t1 / 0.5),
          scale: MIN_SCALE + t1 * (1 - MIN_SCALE)
        };
      }

      if (local < 0.4) {
        var tIn = local / 0.4;
        return {
          opacity: Math.min(1, tIn / 0.5),
          scale: MIN_SCALE + tIn * (1 - MIN_SCALE)
        };
      }
      if (local > 0.6) {
        var tOut = (local - 0.6) / 0.4;
        return {
          opacity: Math.max(0, 1 - tOut / 0.5),
          scale: 1 - tOut * (1 - MIN_SCALE)
        };
      }
      return { opacity: 1, scale: 1 };
    }

    function update() {
      var total = pinWrap.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(window.scrollY - pinWrap.offsetTop, 0), total);
      var progress = total > 0 ? scrolled / total : 0;

      var activeIndex = 0;
      var bestOpacity = -1;

      panels.forEach(function (panel, i) {
        var state = panelStateAt(i, panels.length, progress);
        panel.style.opacity = String(state.opacity);
        panel.style.transform = "scale(" + state.scale + ")";
        if (state.opacity > bestOpacity) {
          bestOpacity = state.opacity;
          activeIndex = i;
        }
      });

      panels.forEach(function (panel, i) {
        if (i === activeIndex) {
          panel.removeAttribute("inert");
          panel.classList.add("is-active");
        } else {
          panel.setAttribute("inert", "");
          panel.classList.remove("is-active");
        }
      });

      // The floating pill navbar only makes sense once the hero (with its
      // own embedded nav) is no longer the panel in view — and even then,
      // only pops in on an upward scroll (checking back for it), staying
      // out of the way while actively scrolling down through the page.
      if (floatingNav) {
        var scrollingUp = window.scrollY < lastScrollY;
        if (activeIndex === 0) {
          floatingNav.classList.remove("is-visible");
        } else if (scrollingUp) {
          floatingNav.classList.add("is-visible");
        } else if (window.scrollY > lastScrollY) {
          floatingNav.classList.remove("is-visible");
        }
      }
      lastScrollY = window.scrollY;
    }

    // The ring drifts on its own via the scripted blobStops path — driven by
    // scroll progress, not the cursor. Specifically while the hero panel is
    // showing, that same scroll progress instead sweeps it once, left to
    // right, across the full width of the "ATOMIC STRATEGY" watermark —
    // finishing the sweep by the time the hero starts fading into the next
    // panel. Runs on its own continuous rAF loop, not just scroll ticks.
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DRIFT_PX = 16;
    var SWEEP_LEAD_PX = 140; // safely past the reveal mask's radius, so there's no glow at rest

    var heroWatermarkWord = document.querySelector(".hero-watermark .hero-watermark-word");
    var heroSlice = 1 / panels.length;
    var heroZoneEnd = Math.min(1, heroSlice + PANEL_MARGIN);
    // The hero stays fully opaque only for the first half of its own zone
    // (see panelStateAt below — it starts fading past local 0.5). Racing
    // the sweep to finish there, instead of at heroZoneEnd itself, means
    // "ATOMIC STRATEGY" is still fully visible (not already fading out)
    // the moment it finishes — otherwise the two finish at the same instant
    // and the completed word is never actually seen before it dissolves.
    var heroSweepEnd = heroZoneEnd * 0.5;
    var sweepAdvanceTriggered = false;
    var sweepAdvanceTimer = null;

    // How much of the atom's own opacity to suppress when it's currently
    // passing behind the "ATOMIC STRATEGY" watermark letters — 1 right on
    // top of them, fading to 0 by `falloff` px away. That's also exactly
    // the reveal mask's radius, so the two effects hand off at the same
    // edge: the atom icon fades out just as the glow-through-the-letters
    // effect fades in, and it reappears the moment it clears the word.
    function insideTextFactor(px, py, rect, falloff) {
      if (!rect || falloff <= 0) {
        return 0;
      }
      var dx = Math.max(rect.left - px, 0, px - rect.right);
      var dy = Math.max(rect.top - py, 0, py - rect.bottom);
      var dist = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, Math.min(1, 1 - dist / falloff));
    }

    if (pinAtom && !reduceMotion) {
      (function blobFrame(timestamp) {
        var total = pinWrap.offsetHeight - window.innerHeight;
        var scrolled = Math.min(Math.max(window.scrollY - pinWrap.offsetTop, 0), total);
        var progress = total > 0 ? scrolled / total : 0;
        var state = blobStateAt(progress);
        var heroT = panelStateAt(0, panels.length, progress).opacity;
        var heroLocalT = heroSweepEnd > 0 ? Math.min(1, Math.max(0, progress / heroSweepEnd)) : 0;

        // Once the sweep actually reaches the "Y" of STRATEGY, hand off to
        // the next panel automatically instead of waiting on more manual
        // scrolling — but only once per hero visit (resets once scrolled
        // back well above the hero zone, so revisiting it can retrigger
        // it). Driven off raw scroll progress rather than heroT: by the
        // exact point heroLocalT reaches 1, hero's own crossfade opacity
        // has already dropped to 0 too, so gating on heroT here would miss
        // the moment almost every time. A short pause before advancing
        // lets "ATOMIC STRATEGY" actually be seen fully lit, rather than
        // the transition starting the instant it lands on the Y.
        if (heroLocalT >= 0.999 && !sweepAdvanceTriggered && panelIds[1]) {
          sweepAdvanceTriggered = true;
          sweepAdvanceTimer = window.setTimeout(function () {
            scrollToPanel(panelIds[1]);
          }, 550);
        } else if (progress < heroSweepEnd * 0.5) {
          if (sweepAdvanceTimer) {
            window.clearTimeout(sweepAdvanceTimer);
            sweepAdvanceTimer = null;
          }
          sweepAdvanceTriggered = false;
        }

        var left, top;
        var wordRect = heroWatermarkWord && heroT > 0.05 ? heroWatermarkWord.getBoundingClientRect() : null;
        if (wordRect) {
          // Starts just off the word's left edge — so at rest (no scroll
          // yet) there's no glow at all — then sweeps left-to-right across
          // the full watermark in step with scroll, reaching the right edge
          // (the "Y") right as the hero finishes fading into the next panel.
          var sweepStart = wordRect.left - SWEEP_LEAD_PX;
          var sweepX = sweepStart + heroLocalT * (wordRect.right - sweepStart);
          left = (sweepX / window.innerWidth) * 100;
          top = ((wordRect.top + wordRect.height / 2) / window.innerHeight) * 100;
        } else {
          left = state.left;
          top = state.top;
        }

        var t = timestamp * 0.00035;
        var driftX = Math.sin(t) * DRIFT_PX;
        var driftY = Math.cos(t * 0.8) * DRIFT_PX * 0.7;

        var transform =
          "translate(calc(-50% + " + driftX.toFixed(1) + "px), calc(-50% + " + driftY.toFixed(1) + "px)) " +
          "rotate(" + (progress * 720) + "deg) scale(" + state.scale + ")";

        var maskRadius = 210 * state.scale + state.blur * 0.8;

        var insideFactor = 0;
        if (wordRect) {
          var atomPxX = (left / 100) * window.innerWidth + driftX;
          var atomPxY = (top / 100) * window.innerHeight + driftY;
          insideFactor = insideTextFactor(atomPxX, atomPxY, wordRect, maskRadius) * heroT;
        }

        pinAtom.style.left = left + "%";
        pinAtom.style.top = top + "%";
        pinAtom.style.opacity = String(state.opacity * (1 - insideFactor));
        pinAtom.style.transform = transform;

        // The watermark's dark "cutout" mask tracks the exact same
        // position/offset/size as the atom mark, so it reads as a cutout
        // of that specific glow rather than a generic spotlight.
        if (heroWatermarkFill) {
          heroWatermarkFill.style.setProperty(
            "--blob-x",
            "calc(" + left + "% + " + driftX.toFixed(1) + "px)"
          );
          heroWatermarkFill.style.setProperty(
            "--blob-y",
            "calc(" + top + "% + " + driftY.toFixed(1) + "px)"
          );
          heroWatermarkFill.style.setProperty("--blob-r", maskRadius.toFixed(1) + "px");
        }

        window.requestAnimationFrame(blobFrame);
      })(0);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    function holdProgressFor(index, count) {
      if (index === 0) {
        return 0;
      }
      if (index === count - 1) {
        return 1;
      }
      var slice = 1 / count;
      var start = Math.max(0, index * slice - PANEL_MARGIN);
      var end = Math.min(1, (index + 1) * slice + PANEL_MARGIN);
      return start + 0.5 * (end - start);
    }

    function scrollToPanel(id) {
      var index = panelIds.indexOf(id);
      if (index === -1) {
        return;
      }
      var total = pinWrap.offsetHeight - window.innerHeight;
      var targetY = pinWrap.offsetTop + holdProgressFor(index, panels.length) * total;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      try {
        history.pushState(null, "", "#" + id);
      } catch (e) {
        /* ignore */
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      if (panelIds.indexOf(id) === -1) {
        return;
      }
      link.addEventListener("click", function (event) {
        event.preventDefault();
        scrollToPanel(id);
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      var subject = encodeURIComponent("Νέο μήνυμα από " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");

      window.location.href = "mailto:helloatomicstrategy@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    initFooterYear();
    initNavDropdowns();
    initContactForm();
    initScrollReveal();
    initPinnedScroll();
  });
})();
