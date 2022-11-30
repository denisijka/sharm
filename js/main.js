/*! For license information please see app.min.js.LICENSE.txt */
(() => {
    "use strict";
    function e(e) {
        this.type = e;
    }
    (e.prototype.init = function () {
        const e = this;
        (this.оbjects = []), (this.daClassname = "_dynamic_adapt_"), (this.nodes = document.querySelectorAll("[data-da]"));
        for (let e = 0; e < this.nodes.length; e++) {
            const t = this.nodes[e],
                s = t.dataset.da.trim().split(","),
                i = {};
            (i.element = t),
                (i.parent = t.parentNode),
                (i.destination = document.querySelector(s[0].trim())),
                (i.breakpoint = s[1] ? s[1].trim() : "767"),
                (i.place = s[2] ? s[2].trim() : "last"),
                (i.index = this.indexInParent(i.parent, i.element)),
                this.оbjects.push(i);
        }
        this.arraySort(this.оbjects),
            (this.mediaQueries = Array.prototype.map.call(
                this.оbjects,
                function (e) {
                    return "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint;
                },
                this
            )),
            (this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (e, t, s) {
                return Array.prototype.indexOf.call(s, e) === t;
            }));
        for (let t = 0; t < this.mediaQueries.length; t++) {
            const s = this.mediaQueries[t],
                i = String.prototype.split.call(s, ","),
                n = window.matchMedia(i[0]),
                a = i[1],
                l = Array.prototype.filter.call(this.оbjects, function (e) {
                    return e.breakpoint === a;
                });
            n.addListener(function () {
                e.mediaHandler(n, l);
            }),
                this.mediaHandler(n, l);
        }
    }),
        (e.prototype.mediaHandler = function (e, t) {
            if (e.matches)
                for (let e = 0; e < t.length; e++) {
                    const s = t[e];
                    (s.index = this.indexInParent(s.parent, s.element)), this.moveTo(s.place, s.element, s.destination);
                }
            else
                for (let e = t.length - 1; e >= 0; e--) {
                    const s = t[e];
                    s.element.classList.contains(this.daClassname) && this.moveBack(s.parent, s.element, s.index);
                }
        }),
        (e.prototype.moveTo = function (e, t, s) {
            t.classList.add(this.daClassname),
                "last" === e || e >= s.children.length ? s.insertAdjacentElement("beforeend", t) : "first" !== e ? s.children[e].insertAdjacentElement("beforebegin", t) : s.insertAdjacentElement("afterbegin", t);
        }),
        (e.prototype.moveBack = function (e, t, s) {
            t.classList.remove(this.daClassname), void 0 !== e.children[s] ? e.children[s].insertAdjacentElement("beforebegin", t) : e.insertAdjacentElement("beforeend", t);
        }),
        (e.prototype.indexInParent = function (e, t) {
            const s = Array.prototype.slice.call(e.children);
            return Array.prototype.indexOf.call(s, t);
        }),
        (e.prototype.arraySort = function (e) {
            "min" === this.type
                ? Array.prototype.sort.call(e, function (e, t) {
                      return e.breakpoint === t.breakpoint ? (e.place === t.place ? 0 : "first" === e.place || "last" === t.place ? -1 : "last" === e.place || "first" === t.place ? 1 : e.place - t.place) : e.breakpoint - t.breakpoint;
                  })
                : Array.prototype.sort.call(e, function (e, t) {
                      return e.breakpoint === t.breakpoint ? (e.place === t.place ? 0 : "first" === e.place || "last" === t.place ? 1 : "last" === e.place || "first" === t.place ? -1 : t.place - e.place) : t.breakpoint - e.breakpoint;
                  });
        });
    new e("max").init();
    class t {
        constructor(e) {
            let t = {
                logging: !0,
                init: !0,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-youtube",
                youtubePlaceAttribute: "data-youtube-place",
                setAutoplayYoutube: !0,
                classes: { popup: "popup", popupContent: "popup__content", popupActive: "popup_show", bodyActive: "popup-show" },
                focusCatch: !0,
                closeEsc: !0,
                bodyLock: !0,
                bodyLockDelay: 500,
                hashSettings: { location: !0, goHash: !0 },
                on: { beforeOpen: function () {}, afterOpen: function () {}, beforeClose: function () {}, afterClose: function () {} },
            };
            (this.isOpen = !1),
                (this.targetOpen = { selector: !1, element: !1 }),
                (this.previousOpen = { selector: !1, element: !1 }),
                (this.lastClosed = { selector: !1, element: !1 }),
                (this._dataValue = !1),
                (this.hash = !1),
                (this._reopen = !1),
                (this._selectorOpen = !1),
                (this.lastFocusEl = !1),
                (this._focusEl = [
                    "a[href]",
                    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                    "button:not([disabled]):not([aria-hidden])",
                    "select:not([disabled]):not([aria-hidden])",
                    "textarea:not([disabled]):not([aria-hidden])",
                    "area[href]",
                    "iframe",
                    "object",
                    "embed",
                    "[contenteditable]",
                    '[tabindex]:not([tabindex^="-"])',
                ]),
                (this.options = { ...t, ...e, classes: { ...t.classes, ...e?.classes }, hashSettings: { ...t.hashSettings, ...e?.hashSettings }, on: { ...t.on, ...e?.on } }),
                this.options.init && this.initPopups();
        }
        // --------------------------------------------------------------------
        initPopups() {
            this.popupLogging("Проснулся"), this.eventsPopup();
        }
        // ---------------------------------------------------------------------
        eventsPopup() {
            document.addEventListener(
                "click",
                function (e) {
                    const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (t)
                        return (
                            e.preventDefault(),
                            (this._dataValue = t.getAttribute(this.options.attributeOpenButton) ? t.getAttribute(this.options.attributeOpenButton) : "error"),
                            "error" !== this._dataValue
                                ? (this.isOpen || (this.lastFocusEl = t), (this.targetOpen.selector = `${this._dataValue}`), (this._selectorOpen = !0), void this.open())
                                : void this.popupLogging(`Ой ой, не заполнен атрибут у ${t.classList}`)
                        );
                    return e.target.closest(`[${this.options.attributeCloseButton}]`) || (!e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen)
                        ? (e.preventDefault(), this.close(), void document.documentElement.classList.remove("lock"))
                        : void 0;
                }.bind(this)
            ),
                document.addEventListener(
                    "keydown",
                    function (e) {
                        if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) return e.preventDefault(), void this.close();
                        this.options.focusCatch && 9 == e.which && this.isOpen && this._focusCatch(e);
                    }.bind(this)
                ),
                document.querySelector("form[data-ajax],form[data-dev]") &&
                    document.addEventListener(
                        "formSent",
                        function (e) {
                            const t = e.detail.form.dataset.popupMessage;
                            t && this.open(t);
                        }.bind(this)
                    ),
                this.options.hashSettings.goHash &&
                    (window.addEventListener(
                        "hashchange",
                        function () {
                            window.location.hash ? this._openToHash() : this.close(this.targetOpen.selector);
                        }.bind(this)
                    ),
                    window.addEventListener(
                        "load",
                        function () {
                            window.location.hash && this._openToHash();
                        }.bind(this)
                    ));
        }
         // ---------------------------------------------------------------------
        // Video youtube
        open(e) {
            if (
                (e && "string" == typeof e && "" !== e.trim() && ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
                this.isOpen && ((this._reopen = !0), this.close()),
                this._selectorOpen || (this.targetOpen.selector = this.lastClosed.selector),
                this._reopen || (this.previousActiveElement = document.activeElement),
                (this.targetOpen.element = document.querySelector(this.targetOpen.selector)),
                this.targetOpen.element)
            ) {
                if (this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)) {
                    const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(this.options.youtubeAttribute)}?rel=0&showinfo=0&autoplay=1`,
                        t = document.createElement("iframe");
                    t.setAttribute("allowfullscreen", "");
                    const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
                    t.setAttribute("allow", `${s}; encrypted-media`),
                        t.setAttribute("src", e),
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`) && this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(t);
                }
                this.options.hashSettings.location && (this._getHash(), this._setHash()),
                    this.options.on.beforeOpen(this),
                    this.targetOpen.element.classList.add(this.options.classes.popupActive),
                    document.body.classList.add(this.options.classes.bodyActive),
                    this._reopen ? (this._reopen = !1) : r(),
                    this.targetOpen.element.setAttribute("aria-hidden", "false"),
                    (this.previousOpen.selector = this.targetOpen.selector),
                    (this.previousOpen.element = this.targetOpen.element),
                    (this._selectorOpen = !1),
                    (this.isOpen = !0),
                    setTimeout(() => {
                        this._focusTrap();
                    }, 50),
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", { detail: { popup: this } })),
                    this.popupLogging("Popup has opened`");
            } else this.popupLogging("Ой ой, такого попапа нет. Проверьте корректность ввода. ");
        }
        close(e) {
            e && "string" == typeof e && "" !== e.trim() && (this.previousOpen.selector = e),
                this.isOpen &&
                    l &&
                    (this.options.on.beforeClose(this),
                    this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`) &&
                        (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = ""),
                    this.previousOpen.element.classList.remove(this.options.classes.popupActive),
                    this.previousOpen.element.setAttribute("aria-hidden", "true"),
                    this._reopen || (document.body.classList.remove(this.options.classes.bodyActive), r(), (this.isOpen = !1)),
                    this._removeHash(),
                    this._selectorOpen && ((this.lastClosed.selector = this.previousOpen.selector), (this.lastClosed.element = this.previousOpen.element)),
                    this.options.on.afterClose(this),
                    setTimeout(() => {
                        this._focusTrap();
                    }, 50),
                    this.popupLogging("Popup has closed"));
        }
        // ---------------------------------------------------
        _getHash() {
            this.options.hashSettings.location && (this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
            let e = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) && e && this.open(e);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const t = this.targetOpen.element.querySelectorAll(this._focusEl),
                s = Array.prototype.slice.call(t),
                i = s.indexOf(document.activeElement);
            e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()), e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
        }
        _focusTrap() {
            const e = this.previousOpen.element.querySelectorAll(this._focusEl);
            !this.isOpen && this.lastFocusEl ? this.lastFocusEl.focus() : e[0].focus();
        }
        popupLogging(e) {
            this.options.logging && h(`[Попапос]: ${e}`);
        }
    }
    // --------------------------------------------------------------
    let s = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return s.Android() || s.BlackBerry() || s.iOS() || s.Opera() || s.Windows();
        },
    };
    // --------------------------------------------------------------
    let i = (e, t = 500, s = 0) => {
            e.classList.contains("_slide") ||
                (e.classList.add("_slide"),
                (e.style.transitionProperty = "height, margin, padding"),
                (e.style.transitionDuration = t + "ms"),
                (e.style.height = `${e.offsetHeight}px`),
                e.offsetHeight,
                (e.style.overflow = "hidden"),
                (e.style.height = s ? `${s}px` : "0px"),
                (e.style.paddingTop = 0),
                (e.style.paddingBottom = 0),
                (e.style.marginTop = 0),
                (e.style.marginBottom = 0),
                window.setTimeout(() => {
                    (e.hidden = !s),
                        !s && e.style.removeProperty("height"),
                        e.style.removeProperty("padding-top"),
                        e.style.removeProperty("padding-bottom"),
                        e.style.removeProperty("margin-top"),
                        e.style.removeProperty("margin-bottom"),
                        !s && e.style.removeProperty("overflow"),
                        e.style.removeProperty("transition-duration"),
                        e.style.removeProperty("transition-property"),
                        e.classList.remove("_slide");
                }, t));
        },
        n = (e, t = 500, s = 0) => {
            if (!e.classList.contains("_slide")) {
                e.classList.add("_slide"), (e.hidden = !e.hidden && null), s && e.style.removeProperty("height");
                let i = e.offsetHeight;
                (e.style.overflow = "hidden"),
                    (e.style.height = s ? `${s}px` : "0px"),
                    (e.style.paddingTop = 0),
                    (e.style.paddingBottom = 0),
                    (e.style.marginTop = 0),
                    (e.style.marginBottom = 0),
                    e.offsetHeight,
                    (e.style.transitionProperty = "height, margin, padding"),
                    (e.style.transitionDuration = t + "ms"),
                    (e.style.height = i + "px"),
                    e.style.removeProperty("padding-top"),
                    e.style.removeProperty("padding-bottom"),
                    e.style.removeProperty("margin-top"),
                    e.style.removeProperty("margin-bottom"),
                    window.setTimeout(() => {
                        e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property"), e.classList.remove("_slide");
                    }, t);
            }
        },
        a = (e, t = 500) => (e.hidden ? n(e, t) : i(e, t)),
        l = !0,
        r = (e = 500) => {
            document.documentElement.classList.contains("lock") ? o(e) : d(e);
        },
        o = (e = 500) => {
            let t = document.querySelector("body");
            if (l) {
                let s = document.querySelectorAll("[data-lp]");
                setTimeout(() => {
                    for (let e = 0; e < s.length; e++) {
                        s[e].style.paddingRight = "0px";
                    }
                    (t.style.paddingRight = "0px"), document.documentElement.classList.remove("lock");
                }, e),
                    (l = !1),
                    setTimeout(function () {
                        l = !0;
                    }, e);
            }
        },
        d = (e = 500) => {
            let t = document.querySelector("body");
            if (l) {
                let s = document.querySelectorAll("[data-lp]");
                for (let e = 0; e < s.length; e++) {
                    s[e].style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                (t.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"),
                    document.documentElement.classList.add("lock"),
                    (l = !1),
                    setTimeout(function () {
                        l = !0;
                    }, e);
            }
        };
        // ---------------------------------------------------------
    document.addEventListener(
        "touchstart",
        function (e) {
            const t = (function (e) {
                return e.touches || e.originalEvent.touches;
            })(e)[0];
            (c = t.clientX), (p = t.clientY);
        },
        !1
    ),
        document.addEventListener(
            "touchmove",
            function (e) {
                if (!c || !p) return;
                let t = e.touches[0].clientX,
                    s = e.touches[0].clientY,
                    i = c - t,
                    n = p - s;
                const a = document.querySelector(".main-block__swipe-icon");
                Math.abs(i) > Math.abs(n) && i > 0 && (d(), document.documentElement.classList.add("menu-open"), a && (a.style.display = "none"));
                (c = null), (p = null);
            },
            !1
        );
    let c = null,
        p = null;
    function h(e) {
        setTimeout(() => {
            window.FLS && console.log(e);
        }, 0);
    }
    function u(e) {
        return e.filter(function (e, t, s) {
            return s.indexOf(e) === t;
        });
    }
    function g(e, t) {
        const s = Array.from(e).filter(function (e, s, i) {
            if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (s.length) {
            const e = [];
            s.forEach((s) => {
                const i = {},
                    n = s.dataset[t].split(",");
                (i.value = n[0]), (i.type = n[1] ? n[1].trim() : "max"), (i.item = s), e.push(i);
            });
            let i = e.map(function (e) {
                return "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type;
            });
            i = u(i);
            const n = [];
            if (i.length)
                return (
                    i.forEach((t) => {
                        const s = t.split(","),
                            i = s[1],
                            a = s[2],
                            l = window.matchMedia(s[0]),
                            r = e.filter(function (e) {
                                if (e.value === i && e.type === a) return !0;
                            });
                        n.push({ itemsArray: r, matchMedia: l });
                    }),
                    n
                );
        }
    }
    // -------------------------------------------------
    let m = (e, t = !1, s = 500, i = 0) => {
        const n = document.querySelector(e);
        if (n) {
            let a = "",
                l = 0;
            t && ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
            let r = { speedAsDuration: !0, speed: s, header: a, offset: i, easing: "easeOutQuad" };
            if ((document.documentElement.classList.contains("menu-open") && (o(), document.documentElement.classList.remove("menu-open")), "undefined" != typeof SmoothScroll)) new SmoothScroll().animateScroll(n, "", r);
            else {
                let e = n.getBoundingClientRect().top + scrollY;
                window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
            }
            h(`[gotoBlock]: Юхуу...едем к ${e}`);
        } else h(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    // ------------------------------------------------------------------------
    class f {
        constructor(e, t = null) {
            if (
                ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
                (this.selectClasses = {
                    classSelect: "select",
                    classSelectBody: "select__body",
                    classSelectTitle: "select__title",
                    classSelectValue: "select__value",
                    classSelectLabel: "select__label",
                    classSelectInput: "select__input",
                    classSelectText: "select__text",
                    classSelectLink: "select__link",
                    classSelectOptions: "select__options",
                    classSelectOptionsScroll: "select__scroll",
                    classSelectOption: "select__option",
                    classSelectContent: "select__content",
                    classSelectRow: "select__row",
                    classSelectData: "select__asset",
                    classSelectDisabled: "_select-disabled",
                    classSelectTag: "_select-tag",
                    classSelectOpen: "_select-open",
                    classSelectActive: "_select-active",
                    classSelectFocus: "_select-focus",
                    classSelectMultiple: "_select-multiple",
                    classSelectCheckBox: "_select-checkbox",
                    classSelectOptionSelected: "_select-selected",
                }),
                (this._this = this),
                this.config.init)
            ) {
                const e = t ? document.querySelectorAll(t) : document.querySelectorAll("select");
                e.length ? (this.selectsInit(e), this.setLogging(`Проснулся, построил селектов: (${e.length})`)) : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
            }
        }
        getSelectClass(e) {
            return `.${e}`;
        }
        getSelectElement(e, t) {
            return { originalSelect: e.querySelector("select"), selectElement: e.querySelector(this.getSelectClass(t)) };
        }
        selectsInit(e) {
            e.forEach((e, t) => {
                this.selectInit(e, t + 1);
            }),
                document.addEventListener(
                    "click",
                    function (e) {
                        this.selectsActions(e);
                    }.bind(this)
                ),
                document.addEventListener(
                    "keydown",
                    function (e) {
                        this.selectsActions(e);
                    }.bind(this)
                ),
                document.addEventListener(
                    "focusin",
                    function (e) {
                        this.selectsActions(e);
                    }.bind(this)
                ),
                document.addEventListener(
                    "focusout",
                    function (e) {
                        this.selectsActions(e);
                    }.bind(this)
                );
        }
        selectInit(e, t) {
            const s = this;
            let i = document.createElement("div");
            if (
                (i.classList.add(this.selectClasses.classSelect),
                e.parentNode.insertBefore(i, e),
                i.appendChild(e),
                (e.hidden = !0),
                t && (e.dataset.id = t),
                i.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`),
                this.selectBuild(e),
                this.getSelectPlaceholder(e) && ((e.dataset.placeholder = this.getSelectPlaceholder(e).value), this.getSelectPlaceholder(e).label.show))
            ) {
                this.getSelectElement(i, this.selectClasses.classSelectTitle).selectElement.insertAdjacentHTML(
                    "afterbegin",
                    `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(e).label.text ? this.getSelectPlaceholder(e).label.text : this.getSelectPlaceholder(e).value}</span>`
                );
            }
            (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
                e.addEventListener("change", function (e) {
                    s.selectChange(e);
                });
        }
        selectBuild(e) {
            const t = e.parentElement;
            (t.dataset.id = e.dataset.id),
                t.classList.add(e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""),
                e.multiple ? t.classList.add(this.selectClasses.classSelectMultiple) : t.classList.remove(this.selectClasses.classSelectMultiple),
                e.hasAttribute("data-checkbox") && e.multiple ? t.classList.add(this.selectClasses.classSelectCheckBox) : t.classList.remove(this.selectClasses.classSelectCheckBox),
                this.setSelectTitleValue(t, e),
                this.setOptions(t, e),
                e.hasAttribute("data-search") && this.searchActions(t),
                e.hasAttribute("data-open") && this.selectAction(t),
                this.selectDisabled(t, e);
        }
        selectsActions(e) {
            const t = e.target,
                s = e.type;
            if (t.closest(this.getSelectClass(this.selectClasses.classSelect)) || t.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const i = t.closest(".select") ? t.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${t.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`),
                    n = this.getSelectElement(i).originalSelect;
                if ("click" === s) {
                    if (!n.disabled)
                        if (t.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                            const e = t.closest(this.getSelectClass(this.selectClasses.classSelectTag)),
                                s = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`);
                            this.optionAction(i, n, s);
                        } else if (t.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(i);
                        else if (t.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                            const e = t.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                            this.optionAction(i, n, e);
                        }
                } else
                    "focusin" === s || "focusout" === s
                        ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) && ("focusin" === s ? i.classList.add(this.selectClasses.classSelectFocus) : i.classList.remove(this.selectClasses.classSelectFocus))
                        : "keydown" === s && "Escape" === e.code && this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose() {
            const e = document.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            e.length &&
                e.forEach((e) => {
                    this.selectAction(e);
                });
        }
        selectAction(e) {
            const t = this.getSelectElement(e).originalSelect,
                s = this.getSelectElement(e, this.selectClasses.classSelectOptions).selectElement;
            s.classList.contains("_slide") || (e.classList.toggle(this.selectClasses.classSelectOpen), a(s, t.dataset.speed));
        }
        setSelectTitleValue(e, t) {
            const s = this.getSelectElement(e, this.selectClasses.classSelectBody).selectElement,
                i = this.getSelectElement(e, this.selectClasses.classSelectTitle).selectElement;
            i && i.remove(), s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
        }
        getSelectTitleValue(e, t) {
            let s = this.getSelectedOptionsData(t, 2).html;
            if (
                (t.multiple &&
                    t.hasAttribute("data-tags") &&
                    ((s = this.getSelectedOptionsData(t)
                        .elements.map((t) => `<span role="button" data-select-id="${e.dataset.id}" data-value="${t.value}" class="_select-tag">${this.getSelectElementContent(t)}</span>`)
                        .join("")),
                    t.dataset.tags && document.querySelector(t.dataset.tags) && ((document.querySelector(t.dataset.tags).innerHTML = s), t.hasAttribute("data-search") && (s = !1))),
                (s = s.length ? s : t.dataset.placeholder),
                this.getSelectedOptionsData(t).values.length ? e.classList.add(this.selectClasses.classSelectActive) : e.classList.remove(this.selectClasses.classSelectActive),
                t.hasAttribute("data-search"))
            )
                return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
            {
                const e = this.getSelectedOptionsData(t).elements.length && this.getSelectedOptionsData(t).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
            }
        }
        getSelectElementContent(e) {
            const t = e.dataset.asset ? `${e.dataset.asset}` : "",
                s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
            let i = "";
            return (
                (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
                (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
                (i += t ? s : ""),
                (i += t ? "</span>" : ""),
                (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
                (i += e.textContent),
                (i += t ? "</span>" : ""),
                (i += t ? "</span>" : ""),
                i
            );
        }
        getSelectPlaceholder(e) {
            const t = Array.from(e.options).find((e) => !e.value);
            if (t) return { value: t.textContent, show: t.hasAttribute("data-show"), label: { show: t.hasAttribute("data-label"), text: t.dataset.label } };
        }
        getSelectedOptionsData(e, t) {
            let s = [];
            return (
                e.multiple
                    ? (s = Array.from(e.options)
                          .filter((e) => e.value)
                          .filter((e) => e.selected))
                    : s.push(e.options[e.selectedIndex]),
                { elements: s.map((e) => e), values: s.filter((e) => e.value).map((e) => e.value), html: s.map((e) => this.getSelectElementContent(e)) }
            );
        }
        getOptions(e) {
            let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
                s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
                i = Array.from(e.options);
            if (i.length > 0) {
                let n = "";
                return (
                    ((this.getSelectPlaceholder(e) && !this.getSelectPlaceholder(e).show) || e.multiple) && (i = i.filter((e) => e.value)),
                    (n += t ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">` : ""),
                    i.forEach((t) => {
                        n += this.getOption(t, e);
                    }),
                    (n += t ? "</div>" : ""),
                    n
                );
            }
        }
        getOption(e, t) {
            const s = e.selected && t.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "",
                i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
                n = e.dataset.class ? ` ${e.dataset.class}` : "",
                a = !!e.dataset.href && e.dataset.href,
                l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
            let r = "";
            return (
                (r += a
                    ? `<a ${l} ${i} href="${a}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
                    : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
                (r += this.getSelectElementContent(e)),
                (r += a ? "</a>" : "</button>"),
                r
            );
        }
        setOptions(e, t) {
            this.getSelectElement(e, this.selectClasses.classSelectOptions).selectElement.innerHTML = this.getOptions(t);
        }
        optionAction(e, t, s) {
            if (t.multiple) {
                s.classList.toggle(this.selectClasses.classSelectOptionSelected);
                this.getSelectedOptionsData(t).elements.forEach((e) => {
                    e.removeAttribute("selected");
                });
                e.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected)).forEach((e) => {
                    t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute("selected", "selected");
                });
            } else
                t.hasAttribute("data-show-selected") ||
                    (e.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`) && (e.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = !1), (s.hidden = !0)),
                    (t.value = s.hasAttribute("data-value") ? s.dataset.value : s.textContent),
                    this.selectAction(e);
            this.setSelectTitleValue(e, t), this.setSelectChange(t);
        }
        selectChange(e) {
            const t = e.target;
            this.selectBuild(t), this.setSelectChange(t);
        }
        setSelectChange(e) {
            if ((e.hasAttribute("data-validate") && y.validateInput(e), e.hasAttribute("data-submit") && e.value)) {
                let t = document.createElement("button");
                (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
            }
            const t = e.parentElement;
            this.selectCallback(t, e);
        }
        selectDisabled(e, t) {
            t.disabled
                ? (e.classList.add(this.selectClasses.classSelectDisabled), (this.getSelectElement(e, this.selectClasses.classSelectTitle).selectElement.disabled = !0))
                : (e.classList.remove(this.selectClasses.classSelectDisabled), (this.getSelectElement(e, this.selectClasses.classSelectTitle).selectElement.disabled = !1));
        }
        searchActions(e) {
            this.getSelectElement(e).originalSelect;
            const t = this.getSelectElement(e, this.selectClasses.classSelectInput).selectElement,
                s = this.getSelectElement(e, this.selectClasses.classSelectOptions).selectElement,
                i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
                n = this;
            t.addEventListener("input", function () {
                i.forEach((e) => {
                    e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0 ? (e.hidden = !1) : (e.hidden = !0);
                }),
                    !0 === s.hidden && n.selectAction(e);
            });
        }
        selectCallback(e, t) {
            document.dispatchEvent(new CustomEvent("selectCallback", { detail: { select: t } }));
        }
        setLogging(e) {
            this.config.logging && h(`[select]: ${e}`);
        }
    }
    const v = { inputMaskModule: null, selectModule: null };
    let y = {
        getErrors(e) {
            let t = 0,
                s = e.querySelectorAll("*[data-required]");
            return (
                s.length &&
                    s.forEach((e) => {
                        (null === e.offsetParent && "SELECT" !== e.tagName) || e.disabled || (t += this.validateInput(e));
                    }),
                t
            );
        },
        validateInput(e) {
            let t = 0;
            return (
                "email" === e.dataset.required
                    ? ((e.value = e.value.replace(" ", "")), this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
                    : ("checkbox" !== e.type || e.checked) && e.value
                    ? this.removeError(e)
                    : (this.addError(e), t++),
                t
            );
        },
        addError(e) {
            e.classList.add("_form-error"), e.parentElement.classList.add("_form-error");
            let t = e.parentElement.querySelector(".form__error");
            t && e.parentElement.removeChild(t), e.dataset.error && e.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${e.dataset.error}</div>`);
        },
        removeError(e) {
            e.classList.remove("_form-error"), e.parentElement.classList.remove("_form-error"), e.parentElement.querySelector(".form__error") && e.parentElement.removeChild(e.parentElement.querySelector(".form__error"));
        },
        formClean(e) {
            e.reset(),
                setTimeout(() => {
                    let t = e.querySelectorAll("input,textarea");
                    for (let e = 0; e < t.length; e++) {
                        const s = t[e];
                        s.parentElement.classList.remove("_form-focus"), s.classList.remove("_form-focus"), y.removeError(s), (s.value = s.dataset.placeholder);
                    }
                    let s = e.querySelectorAll(".checkbox__input");
                    if (s.length > 0)
                        for (let e = 0; e < s.length; e++) {
                            s[e].checked = !1;
                        }
                    if (v.selectModule) {
                        let t = e.querySelectorAll(".select");
                        if (t.length)
                            for (let e = 0; e < t.length; e++) {
                                const s = t[e].querySelector("select");
                                v.selectModule.selectBuild(s);
                            }
                    }
                }, 0);
        },
        emailTest: (e) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function b(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
    }
    function w(e = {}, t = {}) {
        Object.keys(t).forEach((s) => {
            void 0 === e[s] ? (e[s] = t[s]) : b(t[s]) && b(e[s]) && Object.keys(t[s]).length > 0 && w(e[s], t[s]);
        });
    }
    const S = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
    };
    function C() {
        const e = "undefined" != typeof document ? document : {};
        return w(e, S), e;
    }
    const E = {
        document: S,
        navigator: { userAgent: "" },
        location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e);
        },
    };
    function x() {
        const e = "undefined" != typeof window ? window : {};
        return w(e, E), e;
    }
    class T extends Array {
        constructor(e) {
            "number" == typeof e
                ? super(e)
                : (super(...(e || [])),
                  (function (e) {
                      const t = e.__proto__;
                      Object.defineProperty(e, "__proto__", {
                          get: () => t,
                          set(e) {
                              t.__proto__ = e;
                          },
                      });
                  })(this));
        }
    }
    function L(e = []) {
        const t = [];
        return (
            e.forEach((e) => {
                Array.isArray(e) ? t.push(...L(e)) : t.push(e);
            }),
            t
        );
    }
    function I(e, t) {
        return Array.prototype.filter.call(e, t);
    }
    function O(e, t) {
        const s = x(),
            i = C();
        let n = [];
        if (!t && e instanceof T) return e;
        if (!e) return new T(n);
        if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                let e = "div";
                0 === s.indexOf("<li") && (e = "ul"),
                    0 === s.indexOf("<tr") && (e = "tbody"),
                    (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
                    0 === s.indexOf("<tbody") && (e = "table"),
                    0 === s.indexOf("<option") && (e = "select");
                const t = i.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) n.push(t.childNodes[e]);
            } else
                n = (function (e, t) {
                    if ("string" != typeof e) return [e];
                    const s = [],
                        i = t.querySelectorAll(e);
                    for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                    return s;
                })(e.trim(), t || i);
        } else if (e.nodeType || e === s || e === i) n.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof T) return e;
            n = e;
        }
        return new T(
            (function (e) {
                const t = [];
                for (let s = 0; s < e.length; s += 1) -1 === t.indexOf(e[s]) && t.push(e[s]);
                return t;
            })(n)
        );
    }
    O.fn = T.prototype;
    const $ = "resize scroll".split(" ");
    function k(e) {
        return function (...t) {
            if (void 0 === t[0]) {
                for (let t = 0; t < this.length; t += 1) $.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : O(this[t]).trigger(e));
                return this;
            }
            return this.on(e, ...t);
        };
    }
    k("click"),
        k("blur"),
        k("focus"),
        k("focusin"),
        k("focusout"),
        k("keyup"),
        k("keydown"),
        k("keypress"),
        k("submit"),
        k("change"),
        k("mousedown"),
        k("mousemove"),
        k("mouseup"),
        k("mouseenter"),
        k("mouseleave"),
        k("mouseout"),
        k("mouseover"),
        k("touchstart"),
        k("touchend"),
        k("touchmove"),
        k("resize"),
        k("scroll");
    const A = {
        addClass: function (...e) {
            const t = L(e.map((e) => e.split(" ")));
            return (
                this.forEach((e) => {
                    e.classList.add(...t);
                }),
                this
            );
        },
        removeClass: function (...e) {
            const t = L(e.map((e) => e.split(" ")));
            return (
                this.forEach((e) => {
                    e.classList.remove(...t);
                }),
                this
            );
        },
        hasClass: function (...e) {
            const t = L(e.map((e) => e.split(" ")));
            return I(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0).length > 0;
        },
        toggleClass: function (...e) {
            const t = L(e.map((e) => e.split(" ")));
            this.forEach((e) => {
                t.forEach((t) => {
                    e.classList.toggle(t);
                });
            });
        },
        attr: function (e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length) this[s].setAttribute(e, t);
                else for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
            return this;
        },
        removeAttr: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
        },
        transform: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this;
        },
        transition: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
            return this;
        },
        on: function (...e) {
            let [t, s, i, n] = e;
            function a(e) {
                const t = e.target;
                if (!t) return;
                const n = e.target.dom7EventData || [];
                if ((n.indexOf(e) < 0 && n.unshift(e), O(t).is(s))) i.apply(t, n);
                else {
                    const e = O(t).parents();
                    for (let t = 0; t < e.length; t += 1) O(e[t]).is(s) && i.apply(e[t], n);
                }
            }
            function l(e) {
                const t = (e && e.target && e.target.dom7EventData) || [];
                t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
            }
            "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
            const r = t.split(" ");
            let o;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (s)
                    for (o = 0; o < r.length; o += 1) {
                        const e = r[o];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({ listener: i, proxyListener: a }), t.addEventListener(e, a, n);
                    }
                else
                    for (o = 0; o < r.length; o += 1) {
                        const e = r[o];
                        t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({ listener: i, proxyListener: l }), t.addEventListener(e, l, n);
                    }
            }
            return this;
        },
        off: function (...e) {
            let [t, s, i, n] = e;
            "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
            const a = t.split(" ");
            for (let e = 0; e < a.length; e += 1) {
                const t = a[e];
                for (let e = 0; e < this.length; e += 1) {
                    const a = this[e];
                    let l;
                    if ((!s && a.dom7Listeners ? (l = a.dom7Listeners[t]) : s && a.dom7LiveListeners && (l = a.dom7LiveListeners[t]), l && l.length))
                        for (let e = l.length - 1; e >= 0; e -= 1) {
                            const s = l[e];
                            (i && s.listener === i) || (i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i)
                                ? (a.removeEventListener(t, s.proxyListener, n), l.splice(e, 1))
                                : i || (a.removeEventListener(t, s.proxyListener, n), l.splice(e, 1));
                        }
                }
            }
            return this;
        },
        trigger: function (...e) {
            const t = x(),
                s = e[0].split(" "),
                i = e[1];
            for (let n = 0; n < s.length; n += 1) {
                const a = s[n];
                for (let s = 0; s < this.length; s += 1) {
                    const n = this[s];
                    if (t.CustomEvent) {
                        const s = new t.CustomEvent(a, { detail: i, bubbles: !0, cancelable: !0 });
                        (n.dom7EventData = e.filter((e, t) => t > 0)), n.dispatchEvent(s), (n.dom7EventData = []), delete n.dom7EventData;
                    }
                }
            }
            return this;
        },
        transitionEnd: function (e) {
            const t = this;
            return (
                e &&
                    t.on("transitionend", function s(i) {
                        i.target === this && (e.call(this, i), t.off("transitionend", s));
                    }),
                this
            );
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        },
        styles: function () {
            const e = x();
            return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
            if (this.length > 0) {
                const e = x(),
                    t = C(),
                    s = this[0],
                    i = s.getBoundingClientRect(),
                    n = t.body,
                    a = s.clientTop || n.clientTop || 0,
                    l = s.clientLeft || n.clientLeft || 0,
                    r = s === e ? e.scrollY : s.scrollTop,
                    o = s === e ? e.scrollX : s.scrollLeft;
                return { top: i.top + r - a, left: i.left + o - l };
            }
            return null;
        },
        css: function (e, t) {
            const s = x();
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1) for (const t in e) this[i].style[t] = e[t];
                    return this;
                }
                if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this;
            }
            return this;
        },
        each: function (e) {
            return e
                ? (this.forEach((t, s) => {
                      e.apply(t, [t, s]);
                  }),
                  this)
                : this;
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
        },
        is: function (e) {
            const t = x(),
                s = C(),
                i = this[0];
            let n, a;
            if (!i || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (i.matches) return i.matches(e);
                if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector) return i.msMatchesSelector(e);
                for (n = O(e), a = 0; a < n.length; a += 1) if (n[a] === i) return !0;
                return !1;
            }
            if (e === s) return i === s;
            if (e === t) return i === t;
            if (e.nodeType || e instanceof T) {
                for (n = e.nodeType ? [e] : e, a = 0; a < n.length; a += 1) if (n[a] === i) return !0;
                return !1;
            }
            return !1;
        },
        index: function () {
            let e,
                t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                return e;
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return O([]);
            if (e < 0) {
                const s = t + e;
                return O(s < 0 ? [] : [this[s]]);
            }
            return O([this[e]]);
        },
        append: function (...e) {
            let t;
            const s = C();
            for (let i = 0; i < e.length; i += 1) {
                t = e[i];
                for (let e = 0; e < this.length; e += 1)
                    if ("string" == typeof t) {
                        const i = s.createElement("div");
                        for (i.innerHTML = t; i.firstChild; ) this[e].appendChild(i.firstChild);
                    } else if (t instanceof T) for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
                    else this[e].appendChild(t);
            }
            return this;
        },
        prepend: function (e) {
            const t = C();
            let s, i;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof e) {
                    const n = t.createElement("div");
                    for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1) this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
                } else if (e instanceof T) for (i = 0; i < e.length; i += 1) this[s].insertBefore(e[i], this[s].childNodes[0]);
                else this[s].insertBefore(e, this[s].childNodes[0]);
            return this;
        },
        next: function (e) {
            return this.length > 0 ? (e ? (this[0].nextElementSibling && O(this[0].nextElementSibling).is(e) ? O([this[0].nextElementSibling]) : O([])) : this[0].nextElementSibling ? O([this[0].nextElementSibling]) : O([])) : O([]);
        },
        nextAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return O([]);
            for (; s.nextElementSibling; ) {
                const i = s.nextElementSibling;
                e ? O(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return O(t);
        },
        prev: function (e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? (t.previousElementSibling && O(t.previousElementSibling).is(e) ? O([t.previousElementSibling]) : O([])) : t.previousElementSibling ? O([t.previousElementSibling]) : O([]);
            }
            return O([]);
        },
        prevAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return O([]);
            for (; s.previousElementSibling; ) {
                const i = s.previousElementSibling;
                e ? O(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return O(t);
        },
        parent: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? O(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
            return O(t);
        },
        parents: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                let i = this[s].parentNode;
                for (; i; ) e ? O(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
            }
            return O(t);
        },
        closest: function (e) {
            let t = this;
            return void 0 === e ? O([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) t.push(i[e]);
            }
            return O(t);
        },
        children: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].children;
                for (let s = 0; s < i.length; s += 1) (e && !O(i[s]).is(e)) || t.push(i[s]);
            }
            return O(t);
        },
        filter: function (e) {
            return O(I(this, e));
        },
        remove: function () {
            for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
        },
    };
    Object.keys(A).forEach((e) => {
        Object.defineProperty(O.fn, e, { value: A[e], writable: !0 });
    });
    const M = O;
    function _(e, t = 0) {
        return setTimeout(e, t);
    }
    function P() {
        return Date.now();
    }
    function z(e, t = "x") {
        const s = x();
        let i, n, a;
        const l = (function (e) {
            const t = x();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s;
        })(e);
        return (
            s.WebKitCSSMatrix
                ? ((n = l.transform || l.webkitTransform),
                  n.split(",").length > 6 &&
                      (n = n
                          .split(", ")
                          .map((e) => e.replace(",", "."))
                          .join(", ")),
                  (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
                : ((a = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")), (i = a.toString().split(","))),
            "x" === t && (n = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
            "y" === t && (n = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
            n || 0
        );
    }
    function D(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
    }
    function B(...e) {
        const t = Object(e[0]),
            s = ["__proto__", "constructor", "prototype"];
        for (let n = 1; n < e.length; n += 1) {
            const a = e[n];
            if (null != a && ((i = a), !("undefined" != typeof window && void 0 !== window.HTMLElement ? i instanceof HTMLElement : i && (1 === i.nodeType || 11 === i.nodeType)))) {
                const e = Object.keys(Object(a)).filter((e) => s.indexOf(e) < 0);
                for (let s = 0, i = e.length; s < i; s += 1) {
                    const i = e[s],
                        n = Object.getOwnPropertyDescriptor(a, i);
                    void 0 !== n && n.enumerable && (D(t[i]) && D(a[i]) ? (a[i].__swiper__ ? (t[i] = a[i]) : B(t[i], a[i])) : !D(t[i]) && D(a[i]) ? ((t[i] = {}), a[i].__swiper__ ? (t[i] = a[i]) : B(t[i], a[i])) : (t[i] = a[i]));
                }
            }
        }
        var i;
        return t;
    }
    function G(e, t, s) {
        e.style.setProperty(t, s);
    }
    function H({ swiper: e, targetPosition: t, side: s }) {
        const i = x(),
            n = -e.translate;
        let a,
            l = null;
        const r = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = "none"), i.cancelAnimationFrame(e.cssModeFrameID);
        const o = t > n ? "next" : "prev",
            d = (e, t) => ("next" === o && e >= t) || ("prev" === o && e <= t),
            c = () => {
                (a = new Date().getTime()), null === l && (l = a);
                const o = Math.max(Math.min((a - l) / r, 1), 0),
                    p = 0.5 - Math.cos(o * Math.PI) / 2;
                let h = n + p * (t - n);
                if ((d(h, t) && (h = t), e.wrapperEl.scrollTo({ [s]: h }), d(h, t)))
                    return (
                        (e.wrapperEl.style.overflow = "hidden"),
                        (e.wrapperEl.style.scrollSnapType = ""),
                        setTimeout(() => {
                            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [s]: h });
                        }),
                        void i.cancelAnimationFrame(e.cssModeFrameID)
                    );
                e.cssModeFrameID = i.requestAnimationFrame(c);
            };
        c();
    }
    let q, N, F;
    function V() {
        return (
            q ||
                (q = (function () {
                    const e = x(),
                        t = C();
                    return {
                        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                        touch: !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
                        passiveListener: (function () {
                            let t = !1;
                            try {
                                const s = Object.defineProperty({}, "passive", {
                                    get() {
                                        t = !0;
                                    },
                                });
                                e.addEventListener("testPassiveListener", null, s);
                            } catch (e) {}
                            return t;
                        })(),
                        gestures: "ongesturestart" in e,
                    };
                })()),
            q
        );
    }
    function W(e = {}) {
        return (
            N ||
                (N = (function ({ userAgent: e } = {}) {
                    const t = V(),
                        s = x(),
                        i = s.navigator.platform,
                        n = e || s.navigator.userAgent,
                        a = { ios: !1, android: !1 },
                        l = s.screen.width,
                        r = s.screen.height,
                        o = n.match(/(Android);?[\s\/]+([\d.]+)?/);
                    let d = n.match(/(iPad).*OS\s([\d_]+)/);
                    const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                        p = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        h = "Win32" === i;
                    let u = "MacIntel" === i;
                    return (
                        !d &&
                            u &&
                            t.touch &&
                            ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${r}`) >= 0 &&
                            ((d = n.match(/(Version)\/([\d.]+)/)), d || (d = [0, 1, "13_0_0"]), (u = !1)),
                        o && !h && ((a.os = "android"), (a.android = !0)),
                        (d || p || c) && ((a.os = "ios"), (a.ios = !0)),
                        a
                    );
                })(e)),
            N
        );
    }
    function j() {
        return (
            F ||
                (F = (function () {
                    const e = x();
                    return {
                        isSafari: (function () {
                            const t = e.navigator.userAgent.toLowerCase();
                            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
                        })(),
                        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
                    };
                })()),
            F
        );
    }
    const R = {
        on(e, t, s) {
            const i = this;
            if ("function" != typeof t) return i;
            const n = s ? "unshift" : "push";
            return (
                e.split(" ").forEach((e) => {
                    i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t);
                }),
                i
            );
        },
        once(e, t, s) {
            const i = this;
            if ("function" != typeof t) return i;
            function n(...s) {
                i.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(i, s);
            }
            return (n.__emitterProxy = t), i.on(e, n, s);
        },
        onAny(e, t) {
            const s = this;
            if ("function" != typeof e) return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s;
        },
        offAny(e) {
            const t = this;
            if (!t.eventsAnyListeners) return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
        },
        off(e, t) {
            const s = this;
            return s.eventsListeners
                ? (e.split(" ").forEach((e) => {
                      void 0 === t
                          ? (s.eventsListeners[e] = [])
                          : s.eventsListeners[e] &&
                            s.eventsListeners[e].forEach((i, n) => {
                                (i === t || (i.__emitterProxy && i.__emitterProxy === t)) && s.eventsListeners[e].splice(n, 1);
                            });
                  }),
                  s)
                : s;
        },
        emit(...e) {
            const t = this;
            if (!t.eventsListeners) return t;
            let s, i, n;
            "string" == typeof e[0] || Array.isArray(e[0]) ? ((s = e[0]), (i = e.slice(1, e.length)), (n = t)) : ((s = e[0].events), (i = e[0].data), (n = e[0].context || t)), i.unshift(n);
            return (
                (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
                    t.eventsAnyListeners &&
                        t.eventsAnyListeners.length &&
                        t.eventsAnyListeners.forEach((t) => {
                            t.apply(n, [e, ...i]);
                        }),
                        t.eventsListeners &&
                            t.eventsListeners[e] &&
                            t.eventsListeners[e].forEach((e) => {
                                e.apply(n, i);
                            });
                }),
                t
            );
        },
    };
    const Y = {
        updateSize: function () {
            const e = this;
            let t, s;
            const i = e.$el;
            (t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth),
                (s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight),
                (0 === t && e.isHorizontal()) ||
                    (0 === s && e.isVertical()) ||
                    ((t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10)),
                    (s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10)),
                    Number.isNaN(t) && (t = 0),
                    Number.isNaN(s) && (s = 0),
                    Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }));
        },
        updateSlides: function () {
            const e = this;
            function t(t) {
                return e.isHorizontal()
                    ? t
                    : {
                          width: "height",
                          "margin-top": "margin-left",
                          "margin-bottom ": "margin-right",
                          "margin-left": "margin-top",
                          "margin-right": "margin-bottom",
                          "padding-left": "padding-top",
                          "padding-right": "padding-bottom",
                          marginRight: "marginBottom",
                      }[t];
            }
            function s(e, s) {
                return parseFloat(e.getPropertyValue(t(s)) || 0);
            }
            const i = e.params,
                { $wrapperEl: n, size: a, rtlTranslate: l, wrongRTL: r } = e,
                o = e.virtual && i.virtual.enabled,
                d = o ? e.virtual.slides.length : e.slides.length,
                c = n.children(`.${e.params.slideClass}`),
                p = o ? e.virtual.slides.length : c.length;
            let h = [];
            const u = [],
                g = [];
            let m = i.slidesOffsetBefore;
            "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
            let f = i.slidesOffsetAfter;
            "function" == typeof f && (f = i.slidesOffsetAfter.call(e));
            const v = e.snapGrid.length,
                y = e.slidesGrid.length;
            let b = i.spaceBetween,
                w = -m,
                S = 0,
                C = 0;
            if (void 0 === a) return;
            "string" == typeof b && b.indexOf("%") >= 0 && (b = (parseFloat(b.replace("%", "")) / 100) * a),
                (e.virtualSize = -b),
                l ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
                i.centeredSlides && i.cssMode && (G(e.wrapperEl, "--swiper-centered-offset-before", ""), G(e.wrapperEl, "--swiper-centered-offset-after", ""));
            const E = i.grid && i.grid.rows > 1 && e.grid;
            let x;
            E && e.grid.initSlides(p);
            const T = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((e) => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
            for (let n = 0; n < p; n += 1) {
                x = 0;
                const l = c.eq(n);
                if ((E && e.grid.updateSlide(n, l, p, t), "none" !== l.css("display"))) {
                    if ("auto" === i.slidesPerView) {
                        T && (c[n].style[t("width")] = "");
                        const a = getComputedStyle(l[0]),
                            r = l[0].style.transform,
                            o = l[0].style.webkitTransform;
                        if ((r && (l[0].style.transform = "none"), o && (l[0].style.webkitTransform = "none"), i.roundLengths)) x = e.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
                        else {
                            const e = s(a, "width"),
                                t = s(a, "padding-left"),
                                i = s(a, "padding-right"),
                                n = s(a, "margin-left"),
                                r = s(a, "margin-right"),
                                o = a.getPropertyValue("box-sizing");
                            if (o && "border-box" === o) x = e + n + r;
                            else {
                                const { clientWidth: s, offsetWidth: a } = l[0];
                                x = e + t + i + n + r + (a - s);
                            }
                        }
                        r && (l[0].style.transform = r), o && (l[0].style.webkitTransform = o), i.roundLengths && (x = Math.floor(x));
                    } else (x = (a - (i.slidesPerView - 1) * b) / i.slidesPerView), i.roundLengths && (x = Math.floor(x)), c[n] && (c[n].style[t("width")] = `${x}px`);
                    c[n] && (c[n].swiperSlideSize = x),
                        g.push(x),
                        i.centeredSlides
                            ? ((w = w + x / 2 + S / 2 + b),
                              0 === S && 0 !== n && (w = w - a / 2 - b),
                              0 === n && (w = w - a / 2 - b),
                              Math.abs(w) < 0.001 && (w = 0),
                              i.roundLengths && (w = Math.floor(w)),
                              C % i.slidesPerGroup == 0 && h.push(w),
                              u.push(w))
                            : (i.roundLengths && (w = Math.floor(w)), (C - Math.min(e.params.slidesPerGroupSkip, C)) % e.params.slidesPerGroup == 0 && h.push(w), u.push(w), (w = w + x + b)),
                        (e.virtualSize += x + b),
                        (S = x),
                        (C += 1);
                }
            }
            if (
                ((e.virtualSize = Math.max(e.virtualSize, a) + f),
                l && r && ("slide" === i.effect || "coverflow" === i.effect) && n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
                i.setWrapperSize && n.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
                E && e.grid.updateWrapperSize(x, h, t),
                !i.centeredSlides)
            ) {
                const t = [];
                for (let s = 0; s < h.length; s += 1) {
                    let n = h[s];
                    i.roundLengths && (n = Math.floor(n)), h[s] <= e.virtualSize - a && t.push(n);
                }
                (h = t), Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - a);
            }
            if ((0 === h.length && (h = [0]), 0 !== i.spaceBetween)) {
                const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
                c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({ [s]: `${b}px` });
            }
            if (i.centeredSlides && i.centeredSlidesBounds) {
                let e = 0;
                g.forEach((t) => {
                    e += t + (i.spaceBetween ? i.spaceBetween : 0);
                }),
                    (e -= i.spaceBetween);
                const t = e - a;
                h = h.map((e) => (e < 0 ? -m : e > t ? t + f : e));
            }
            if (i.centerInsufficientSlides) {
                let e = 0;
                if (
                    (g.forEach((t) => {
                        e += t + (i.spaceBetween ? i.spaceBetween : 0);
                    }),
                    (e -= i.spaceBetween),
                    e < a)
                ) {
                    const t = (a - e) / 2;
                    h.forEach((e, s) => {
                        h[s] = e - t;
                    }),
                        u.forEach((e, s) => {
                            u[s] = e + t;
                        });
                }
            }
            if ((Object.assign(e, { slides: c, snapGrid: h, slidesGrid: u, slidesSizesGrid: g }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)) {
                G(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"), G(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - g[g.length - 1] / 2 + "px");
                const t = -e.snapGrid[0],
                    s = -e.slidesGrid[0];
                (e.snapGrid = e.snapGrid.map((e) => e + t)), (e.slidesGrid = e.slidesGrid.map((e) => e + s));
            }
            p !== d && e.emit("slidesLengthChange"),
                h.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")),
                u.length !== y && e.emit("slidesGridLengthChange"),
                i.watchSlidesProgress && e.updateSlidesOffset();
        },
        updateAutoHeight: function (e) {
            const t = this,
                s = [],
                i = t.virtual && t.params.virtual.enabled;
            let n,
                a = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const l = (e) => (i ? t.slides.filter((t) => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0]);
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    t.visibleSlides.each((e) => {
                        s.push(e);
                    });
                else
                    for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                        const e = t.activeIndex + n;
                        if (e > t.slides.length && !i) break;
                        s.push(l(e));
                    }
            else s.push(l(t.activeIndex));
            for (n = 0; n < s.length; n += 1)
                if (void 0 !== s[n]) {
                    const e = s[n].offsetHeight;
                    a = e > a ? e : a;
                }
            (a || 0 === a) && t.$wrapperEl.css("height", `${a}px`);
        },
        updateSlidesOffset: function () {
            const e = this,
                t = e.slides;
            for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop;
        },
        updateSlidesProgress: function (e = (this && this.translate) || 0) {
            const t = this,
                s = t.params,
                { slides: i, rtlTranslate: n, snapGrid: a } = t;
            if (0 === i.length) return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let l = -e;
            n && (l = e), i.removeClass(s.slideVisibleClass), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
            for (let e = 0; e < i.length; e += 1) {
                const r = i[e];
                let o = r.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
                const d = (l + (s.centeredSlides ? t.minTranslate() : 0) - o) / (r.swiperSlideSize + s.spaceBetween),
                    c = (l - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (r.swiperSlideSize + s.spaceBetween),
                    p = -(l - o),
                    h = p + t.slidesSizesGrid[e];
                ((p >= 0 && p < t.size - 1) || (h > 1 && h <= t.size) || (p <= 0 && h >= t.size)) && (t.visibleSlides.push(r), t.visibleSlidesIndexes.push(e), i.eq(e).addClass(s.slideVisibleClass)),
                    (r.progress = n ? -d : d),
                    (r.originalProgress = n ? -c : c);
            }
            t.visibleSlides = M(t.visibleSlides);
        },
        updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = (t && t.translate && t.translate * s) || 0;
            }
            const s = t.params,
                i = t.maxTranslate() - t.minTranslate();
            let { progress: n, isBeginning: a, isEnd: l } = t;
            const r = a,
                o = l;
            0 === i ? ((n = 0), (a = !0), (l = !0)) : ((n = (e - t.minTranslate()) / i), (a = n <= 0), (l = n >= 1)),
                Object.assign(t, { progress: n, isBeginning: a, isEnd: l }),
                (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && t.updateSlidesProgress(e),
                a && !r && t.emit("reachBeginning toEdge"),
                l && !o && t.emit("reachEnd toEdge"),
                ((r && !a) || (o && !l)) && t.emit("fromEdge"),
                t.emit("progress", n);
        },
        updateSlidesClasses: function () {
            const e = this,
                { slides: t, params: s, $wrapperEl: i, activeIndex: n, realIndex: a } = e,
                l = e.virtual && s.virtual.enabled;
            let r;
            t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),
                (r = l ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n)),
                r.addClass(s.slideActiveClass),
                s.loop &&
                    (r.hasClass(s.slideDuplicateClass)
                        ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass)
                        : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass));
            let o = r.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
            s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
            let d = r.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
            s.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
                s.loop &&
                    (o.hasClass(s.slideDuplicateClass)
                        ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass)
                        : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),
                    d.hasClass(s.slideDuplicateClass)
                        ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)
                        : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),
                e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
            const t = this,
                s = t.rtlTranslate ? t.translate : -t.translate,
                { slidesGrid: i, snapGrid: n, params: a, activeIndex: l, realIndex: r, snapIndex: o } = t;
            let d,
                c = e;
            if (void 0 === c) {
                for (let e = 0; e < i.length; e += 1) void 0 !== i[e + 1] ? (s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2 ? (c = e) : s >= i[e] && s < i[e + 1] && (c = e + 1)) : s >= i[e] && (c = e);
                a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
            }
            if (n.indexOf(s) >= 0) d = n.indexOf(s);
            else {
                const e = Math.min(a.slidesPerGroupSkip, c);
                d = e + Math.floor((c - e) / a.slidesPerGroup);
            }
            if ((d >= n.length && (d = n.length - 1), c === l)) return void (d !== o && ((t.snapIndex = d), t.emit("snapIndexChange")));
            const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
            Object.assign(t, { snapIndex: d, realIndex: p, previousIndex: l, activeIndex: c }),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                r !== p && t.emit("realIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
            const t = this,
                s = t.params,
                i = M(e).closest(`.${s.slideClass}`)[0];
            let n,
                a = !1;
            if (i)
                for (let e = 0; e < t.slides.length; e += 1)
                    if (t.slides[e] === i) {
                        (a = !0), (n = e);
                        break;
                    }
            if (!i || !a) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
            (t.clickedSlide = i),
                t.virtual && t.params.virtual.enabled ? (t.clickedIndex = parseInt(M(i).attr("data-swiper-slide-index"), 10)) : (t.clickedIndex = n),
                s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
        },
    };
    const X = {
        getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
            const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this;
            if (t.virtualTranslate) return s ? -i : i;
            if (t.cssMode) return i;
            let a = z(n[0], e);
            return s && (a = -a), a || 0;
        },
        setTranslate: function (e, t) {
            const s = this,
                { rtlTranslate: i, params: n, $wrapperEl: a, wrapperEl: l, progress: r } = s;
            let o,
                d = 0,
                c = 0;
            s.isHorizontal() ? (d = i ? -e : e) : (c = e),
                n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
                n.cssMode ? (l[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c) : n.virtualTranslate || a.transform(`translate3d(${d}px, ${c}px, 0px)`),
                (s.previousTranslate = s.translate),
                (s.translate = s.isHorizontal() ? d : c);
            const p = s.maxTranslate() - s.minTranslate();
            (o = 0 === p ? 0 : (e - s.minTranslate()) / p), o !== r && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
            return -this.snapGrid[0];
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, n) {
            const a = this,
                { params: l, wrapperEl: r } = a;
            if (a.animating && l.preventInteractionOnTransition) return !1;
            const o = a.minTranslate(),
                d = a.maxTranslate();
            let c;
            if (((c = i && e > o ? o : i && e < d ? d : e), a.updateProgress(c), l.cssMode)) {
                const e = a.isHorizontal();
                if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!a.support.smoothScroll) return H({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }), !0;
                    r.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
                }
                return !0;
            }
            return (
                0 === t
                    ? (a.setTransition(0), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, n), a.emit("transitionEnd")))
                    : (a.setTransition(t),
                      a.setTranslate(c),
                      s && (a.emit("beforeTransitionStart", t, n), a.emit("transitionStart")),
                      a.animating ||
                          ((a.animating = !0),
                          a.onTranslateToWrapperTransitionEnd ||
                              (a.onTranslateToWrapperTransitionEnd = function (e) {
                                  a &&
                                      !a.destroyed &&
                                      e.target === this &&
                                      (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                                      a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd),
                                      (a.onTranslateToWrapperTransitionEnd = null),
                                      delete a.onTranslateToWrapperTransitionEnd,
                                      s && a.emit("transitionEnd"));
                              }),
                          a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                          a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd))),
                !0
            );
        },
    };
    function U({ swiper: e, runCallbacks: t, direction: s, step: i }) {
        const { activeIndex: n, previousIndex: a } = e;
        let l = s;
        if ((l || (l = n > a ? "next" : n < a ? "prev" : "reset"), e.emit(`transition${i}`), t && n !== a)) {
            if ("reset" === l) return void e.emit(`slideResetTransition${i}`);
            e.emit(`slideChangeTransition${i}`), "next" === l ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`);
        }
    }
    const K = {
        slideTo: function (e = 0, t = this.params.speed, s = !0, i, n) {
            if ("number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
            if ("string" == typeof e) {
                const t = parseInt(e, 10);
                if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                e = t;
            }
            const a = this;
            let l = e;
            l < 0 && (l = 0);
            const { params: r, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: h, wrapperEl: u, enabled: g } = a;
            if ((a.animating && r.preventInteractionOnTransition) || (!g && !i && !n)) return !1;
            const m = Math.min(a.params.slidesPerGroupSkip, l);
            let f = m + Math.floor((l - m) / a.params.slidesPerGroup);
            f >= o.length && (f = o.length - 1), (p || r.initialSlide || 0) === (c || 0) && s && a.emit("beforeSlideChangeStart");
            const v = -o[f];
            if ((a.updateProgress(v), r.normalizeSlideIndex))
                for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * v),
                        s = Math.floor(100 * d[e]),
                        i = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1] ? (t >= s && t < i - (i - s) / 2 ? (l = e) : t >= s && t < i && (l = e + 1)) : t >= s && (l = e);
                }
            if (a.initialized && l !== p) {
                if (!a.allowSlideNext && v < a.translate && v < a.minTranslate()) return !1;
                if (!a.allowSlidePrev && v > a.translate && v > a.maxTranslate() && (p || 0) !== l) return !1;
            }
            let y;
            if (((y = l > p ? "next" : l < p ? "prev" : "reset"), (h && -v === a.translate) || (!h && v === a.translate)))
                return a.updateActiveIndex(l), r.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== r.effect && a.setTranslate(v), "reset" !== y && (a.transitionStart(s, y), a.transitionEnd(s, y)), !1;
            if (r.cssMode) {
                const e = a.isHorizontal(),
                    s = h ? v : -v;
                if (0 === t) {
                    const t = a.virtual && a.params.virtual.enabled;
                    t && ((a.wrapperEl.style.scrollSnapType = "none"), (a._immediateVirtual = !0)),
                        (u[e ? "scrollLeft" : "scrollTop"] = s),
                        t &&
                            requestAnimationFrame(() => {
                                (a.wrapperEl.style.scrollSnapType = ""), (a._swiperImmediateVirtual = !1);
                            });
                } else {
                    if (!a.support.smoothScroll) return H({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0;
                    u.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
                }
                return !0;
            }
            return (
                a.setTransition(t),
                a.setTranslate(v),
                a.updateActiveIndex(l),
                a.updateSlidesClasses(),
                a.emit("beforeTransitionStart", t, i),
                a.transitionStart(s, y),
                0 === t
                    ? a.transitionEnd(s, y)
                    : a.animating ||
                      ((a.animating = !0),
                      a.onSlideToWrapperTransitionEnd ||
                          (a.onSlideToWrapperTransitionEnd = function (e) {
                              a &&
                                  !a.destroyed &&
                                  e.target === this &&
                                  (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                                  a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd),
                                  (a.onSlideToWrapperTransitionEnd = null),
                                  delete a.onSlideToWrapperTransitionEnd,
                                  a.transitionEnd(s, y));
                          }),
                      a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                      a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd)),
                !0
            );
        },
        slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
            const n = this;
            let a = e;
            return n.params.loop && (a += n.loopedSlides), n.slideTo(a, t, s, i);
        },
        slideNext: function (e = this.params.speed, t = !0, s) {
            const i = this,
                { animating: n, enabled: a, params: l } = i;
            if (!a) return i;
            let r = l.slidesPerGroup;
            "auto" === l.slidesPerView && 1 === l.slidesPerGroup && l.slidesPerGroupAuto && (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const o = i.activeIndex < l.slidesPerGroupSkip ? 1 : r;
            if (l.loop) {
                if (n && l.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            return l.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s);
        },
        slidePrev: function (e = this.params.speed, t = !0, s) {
            const i = this,
                { params: n, animating: a, snapGrid: l, slidesGrid: r, rtlTranslate: o, enabled: d } = i;
            if (!d) return i;
            if (n.loop) {
                if (a && n.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const p = c(o ? i.translate : -i.translate),
                h = l.map((e) => c(e));
            let u = l[h.indexOf(p) - 1];
            if (void 0 === u && n.cssMode) {
                let e;
                l.forEach((t, s) => {
                    p >= t && (e = s);
                }),
                    void 0 !== e && (u = l[e > 0 ? e - 1 : e]);
            }
            let g = 0;
            return (
                void 0 !== u &&
                    ((g = r.indexOf(u)), g < 0 && (g = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && ((g = g - i.slidesPerViewDynamic("previous", !0) + 1), (g = Math.max(g, 0)))),
                n.rewind && i.isBeginning ? i.slideTo(i.slides.length - 1, e, t, s) : i.slideTo(g, e, t, s)
            );
        },
        slideReset: function (e = this.params.speed, t = !0, s) {
            return this.slideTo(this.activeIndex, e, t, s);
        },
        slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
            const n = this;
            let a = n.activeIndex;
            const l = Math.min(n.params.slidesPerGroupSkip, a),
                r = l + Math.floor((a - l) / n.params.slidesPerGroup),
                o = n.rtlTranslate ? n.translate : -n.translate;
            if (o >= n.snapGrid[r]) {
                const e = n.snapGrid[r];
                o - e > (n.snapGrid[r + 1] - e) * i && (a += n.params.slidesPerGroup);
            } else {
                const e = n.snapGrid[r - 1];
                o - e <= (n.snapGrid[r] - e) * i && (a -= n.params.slidesPerGroup);
            }
            return (a = Math.max(a, 0)), (a = Math.min(a, n.slidesGrid.length - 1)), n.slideTo(a, e, t, s);
        },
        slideToClickedSlide: function () {
            const e = this,
                { params: t, $wrapperEl: s } = e,
                i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let n,
                a = e.clickedIndex;
            if (t.loop) {
                if (e.animating) return;
                (n = parseInt(M(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
                    t.centeredSlides
                        ? a < e.loopedSlides - i / 2 || a > e.slides.length - e.loopedSlides + i / 2
                            ? (e.loopFix(),
                              (a = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
                              _(() => {
                                  e.slideTo(a);
                              }))
                            : e.slideTo(a)
                        : a > e.slides.length - i
                        ? (e.loopFix(),
                          (a = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
                          _(() => {
                              e.slideTo(a);
                          }))
                        : e.slideTo(a);
            } else e.slideTo(a);
        },
    };
    const Z = {
        loopCreate: function () {
            const e = this,
                t = C(),
                { params: s, $wrapperEl: i } = e,
                n = i.children().length > 0 ? M(i.children()[0].parentNode) : i;
            n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
            let a = n.children(`.${s.slideClass}`);
            if (s.loopFillGroupWithBlank) {
                const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
                if (e !== s.slidesPerGroup) {
                    for (let i = 0; i < e; i += 1) {
                        const e = M(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                        n.append(e);
                    }
                    a = n.children(`.${s.slideClass}`);
                }
            }
            "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length),
                (e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10))),
                (e.loopedSlides += s.loopAdditionalSlides),
                e.loopedSlides > a.length && (e.loopedSlides = a.length);
            const l = [],
                r = [];
            a.each((t, s) => {
                const i = M(t);
                s < e.loopedSlides && r.push(t), s < a.length && s >= a.length - e.loopedSlides && l.push(t), i.attr("data-swiper-slide-index", s);
            });
            for (let e = 0; e < r.length; e += 1) n.append(M(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
            for (let e = l.length - 1; e >= 0; e -= 1) n.prepend(M(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
            const e = this;
            e.emit("beforeLoopFix");
            const { activeIndex: t, slides: s, loopedSlides: i, allowSlidePrev: n, allowSlideNext: a, snapGrid: l, rtlTranslate: r } = e;
            let o;
            (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
            const d = -l[t] - e.getTranslate();
            if (t < i) {
                (o = s.length - 3 * i + t), (o += i);
                e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((r ? -e.translate : e.translate) - d);
            } else if (t >= s.length - i) {
                (o = -s.length + t + i), (o += i);
                e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((r ? -e.translate : e.translate) - d);
            }
            (e.allowSlidePrev = n), (e.allowSlideNext = a), e.emit("loopFix");
        },
        loopDestroy: function () {
            const { $wrapperEl: e, params: t, slides: s } = this;
            e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index");
        },
    };
    function Q(e) {
        const t = this,
            s = C(),
            i = x(),
            n = t.touchEventsData,
            { params: a, touches: l, enabled: r } = t;
        if (!r) return;
        if (t.animating && a.preventInteractionOnTransition) return;
        !t.animating && a.cssMode && a.loop && t.loopFix();
        let o = e;
        o.originalEvent && (o = o.originalEvent);
        let d = M(o.target);
        if ("wrapper" === a.touchEventsTarget && !d.closest(t.wrapperEl).length) return;
        if (((n.isTouchEvent = "touchstart" === o.type), !n.isTouchEvent && "which" in o && 3 === o.which)) return;
        if (!n.isTouchEvent && "button" in o && o.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        !!a.noSwipingClass && "" !== a.noSwipingClass && o.target && o.target.shadowRoot && e.path && e.path[0] && (d = M(e.path[0]));
        const c = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`,
            p = !(!o.target || !o.target.shadowRoot);
        if (
            a.noSwiping &&
            (p
                ? (function (e, t = this) {
                      return (function t(s) {
                          return s && s !== C() && s !== x() ? (s.assignedSlot && (s = s.assignedSlot), s.closest(e) || t(s.getRootNode().host)) : null;
                      })(t);
                  })(c, o.target)
                : d.closest(c)[0])
        )
            return void (t.allowClick = !0);
        if (a.swipeHandler && !d.closest(a.swipeHandler)[0]) return;
        (l.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX), (l.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
        const h = l.currentX,
            u = l.currentY,
            g = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
            m = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
        if (g && (h <= m || h >= i.innerWidth - m)) {
            if ("prevent" !== g) return;
            e.preventDefault();
        }
        if (
            (Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
            (l.startX = h),
            (l.startY = u),
            (n.touchStartTime = P()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            a.threshold > 0 && (n.allowThresholdMove = !1),
            "touchstart" !== o.type)
        ) {
            let e = !0;
            d.is(n.focusableElements) && (e = !1), s.activeElement && M(s.activeElement).is(n.focusableElements) && s.activeElement !== d[0] && s.activeElement.blur();
            const i = e && t.allowTouchMove && a.touchStartPreventDefault;
            (!a.touchStartForcePreventDefault && !i) || d[0].isContentEditable || o.preventDefault();
        }
        t.emit("touchStart", o);
    }
    function J(e) {
        const t = C(),
            s = this,
            i = s.touchEventsData,
            { params: n, touches: a, rtlTranslate: l, enabled: r } = s;
        if (!r) return;
        let o = e;
        if ((o.originalEvent && (o = o.originalEvent), !i.isTouched)) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", o));
        if (i.isTouchEvent && "touchmove" !== o.type) return;
        const d = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
            c = "touchmove" === o.type ? d.pageX : o.pageX,
            p = "touchmove" === o.type ? d.pageY : o.pageY;
        if (o.preventedByNestedSwiper) return (a.startX = c), void (a.startY = p);
        if (!s.allowTouchMove) return (s.allowClick = !1), void (i.isTouched && (Object.assign(a, { startX: c, startY: p, currentX: c, currentY: p }), (i.touchStartTime = P())));
        if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
            if (s.isVertical()) {
                if ((p < a.startY && s.translate <= s.maxTranslate()) || (p > a.startY && s.translate >= s.minTranslate())) return (i.isTouched = !1), void (i.isMoved = !1);
            } else if ((c < a.startX && s.translate <= s.maxTranslate()) || (c > a.startX && s.translate >= s.minTranslate())) return;
        if (i.isTouchEvent && t.activeElement && o.target === t.activeElement && M(o.target).is(i.focusableElements)) return (i.isMoved = !0), void (s.allowClick = !1);
        if ((i.allowTouchCallbacks && s.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1)) return;
        (a.currentX = c), (a.currentY = p);
        const h = a.currentX - a.startX,
            u = a.currentY - a.startY;
        if (s.params.threshold && Math.sqrt(h ** 2 + u ** 2) < s.params.threshold) return;
        if (void 0 === i.isScrolling) {
            let e;
            (s.isHorizontal() && a.currentY === a.startY) || (s.isVertical() && a.currentX === a.startX)
                ? (i.isScrolling = !1)
                : h * h + u * u >= 25 && ((e = (180 * Math.atan2(Math.abs(u), Math.abs(h))) / Math.PI), (i.isScrolling = s.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle));
        }
        if ((i.isScrolling && s.emit("touchMoveOpposite", o), void 0 === i.startMoving && ((a.currentX === a.startX && a.currentY === a.startY) || (i.startMoving = !0)), i.isScrolling)) return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (s.allowClick = !1),
            !n.cssMode && o.cancelable && o.preventDefault(),
            n.touchMoveStopPropagation && !n.nested && o.stopPropagation(),
            i.isMoved ||
                (n.loop && !n.cssMode && s.loopFix(),
                (i.startTranslate = s.getTranslate()),
                s.setTransition(0),
                s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                (i.allowMomentumBounce = !1),
                !n.grabCursor || (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) || s.setGrabCursor(!0),
                s.emit("sliderFirstMove", o)),
            s.emit("sliderMove", o),
            (i.isMoved = !0);
        let g = s.isHorizontal() ? h : u;
        (a.diff = g), (g *= n.touchRatio), l && (g = -g), (s.swipeDirection = g > 0 ? "prev" : "next"), (i.currentTranslate = g + i.startTranslate);
        let m = !0,
            f = n.resistanceRatio;
        if (
            (n.touchReleaseOnEdges && (f = 0),
            g > 0 && i.currentTranslate > s.minTranslate()
                ? ((m = !1), n.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + g) ** f))
                : g < 0 && i.currentTranslate < s.maxTranslate() && ((m = !1), n.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - g) ** f)),
            m && (o.preventedByNestedSwiper = !0),
            !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
            !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
            s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
            n.threshold > 0)
        ) {
            if (!(Math.abs(g) > n.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
            if (!i.allowThresholdMove)
                return (i.allowThresholdMove = !0), (a.startX = a.currentX), (a.startY = a.currentY), (i.currentTranslate = i.startTranslate), void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
        }
        n.followFinger &&
            !n.cssMode &&
            (((n.freeMode && n.freeMode.enabled && s.freeMode) || n.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()),
            s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
            s.updateProgress(i.currentTranslate),
            s.setTranslate(i.currentTranslate));
    }
    function ee(e) {
        const t = this,
            s = t.touchEventsData,
            { params: i, touches: n, rtlTranslate: a, slidesGrid: l, enabled: r } = t;
        if (!r) return;
        let o = e;
        if ((o.originalEvent && (o = o.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", o), (s.allowTouchCallbacks = !1), !s.isTouched))
            return s.isMoved && i.grabCursor && t.setGrabCursor(!1), (s.isMoved = !1), void (s.startMoving = !1);
        i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const d = P(),
            c = d - s.touchStartTime;
        if (t.allowClick) {
            const e = o.path || (o.composedPath && o.composedPath());
            t.updateClickedSlide((e && e[0]) || o.target), t.emit("tap click", o), c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o);
        }
        if (
            ((s.lastClickTime = P()),
            _(() => {
                t.destroyed || (t.allowClick = !0);
            }),
            !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate)
        )
            return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
        let p;
        if (((s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1), (p = i.followFinger ? (a ? t.translate : -t.translate) : -s.currentTranslate), i.cssMode)) return;
        if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: p });
        let h = 0,
            u = t.slidesSizesGrid[0];
        for (let e = 0; e < l.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== l[e + t] ? p >= l[e] && p < l[e + t] && ((h = e), (u = l[e + t] - l[e])) : p >= l[e] && ((h = e), (u = l[l.length - 1] - l[l.length - 2]));
        }
        const g = (p - l[h]) / u,
            m = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (g >= i.longSwipesRatio ? t.slideTo(h + m) : t.slideTo(h)), "prev" === t.swipeDirection && (g > 1 - i.longSwipesRatio ? t.slideTo(h + m) : t.slideTo(h));
        } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
                ? o.target === t.navigation.nextEl
                    ? t.slideTo(h + m)
                    : t.slideTo(h)
                : ("next" === t.swipeDirection && t.slideTo(h + m), "prev" === t.swipeDirection && t.slideTo(h));
        }
    }
    function te() {
        const e = this,
            { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e;
        (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
            (e.allowSlidePrev = n),
            (e.allowSlideNext = i),
            e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
    }
    function se(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function ie() {
        const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let n;
        (e.previousTranslate = e.translate), e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop), -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        const a = e.maxTranslate() - e.minTranslate();
        (n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a), n !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
    }
    let ne = !1;
    function ae() {}
    const le = (e, t) => {
        const s = C(),
            { params: i, touchEvents: n, el: a, wrapperEl: l, device: r, support: o } = e,
            d = !!i.nested,
            c = "on" === t ? "addEventListener" : "removeEventListener",
            p = t;
        if (o.touch) {
            const t = !("touchstart" !== n.start || !o.passiveListener || !i.passiveListeners) && { passive: !0, capture: !1 };
            a[c](n.start, e.onTouchStart, t), a[c](n.move, e.onTouchMove, o.passiveListener ? { passive: !1, capture: d } : d), a[c](n.end, e.onTouchEnd, t), n.cancel && a[c](n.cancel, e.onTouchEnd, t);
        } else a[c](n.start, e.onTouchStart, !1), s[c](n.move, e.onTouchMove, d), s[c](n.end, e.onTouchEnd, !1);
        (i.preventClicks || i.preventClicksPropagation) && a[c]("click", e.onClick, !0),
            i.cssMode && l[c]("scroll", e.onScroll),
            i.updateOnWindowResize ? e[p](r.ios || r.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", te, !0) : e[p]("observerUpdate", te, !0);
    };
    const re = {
            attachEvents: function () {
                const e = this,
                    t = C(),
                    { params: s, support: i } = e;
                (e.onTouchStart = Q.bind(e)),
                    (e.onTouchMove = J.bind(e)),
                    (e.onTouchEnd = ee.bind(e)),
                    s.cssMode && (e.onScroll = ie.bind(e)),
                    (e.onClick = se.bind(e)),
                    i.touch && !ne && (t.addEventListener("touchstart", ae), (ne = !0)),
                    le(e, "on");
            },
            detachEvents: function () {
                le(this, "off");
            },
        },
        oe = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const de = {
        setBreakpoint: function () {
            const e = this,
                { activeIndex: t, initialized: s, loopedSlides: i = 0, params: n, $el: a } = e,
                l = n.breakpoints;
            if (!l || (l && 0 === Object.keys(l).length)) return;
            const r = e.getBreakpoint(l, e.params.breakpointsBase, e.el);
            if (!r || e.currentBreakpoint === r) return;
            const o = (r in l ? l[r] : void 0) || e.originalParams,
                d = oe(e, n),
                c = oe(e, o),
                p = n.enabled;
            d && !c
                ? (a.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), e.emitContainerClasses())
                : !d &&
                  c &&
                  (a.addClass(`${n.containerModifierClass}grid`), ((o.grid.fill && "column" === o.grid.fill) || (!o.grid.fill && "column" === n.grid.fill)) && a.addClass(`${n.containerModifierClass}grid-column`), e.emitContainerClasses());
            const h = o.direction && o.direction !== n.direction,
                u = n.loop && (o.slidesPerView !== n.slidesPerView || h);
            h && s && e.changeDirection(), B(e.params, o);
            const g = e.params.enabled;
            Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }),
                p && !g ? e.disable() : !p && g && e.enable(),
                (e.currentBreakpoint = r),
                e.emit("_beforeBreakpoint", o),
                u && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t = "window", s) {
            if (!e || ("container" === t && !s)) return;
            let i = !1;
            const n = x(),
                a = "window" === t ? n.innerHeight : s.clientHeight,
                l = Object.keys(e).map((e) => {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return { value: a * t, point: e };
                    }
                    return { value: e, point: e };
                });
            l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < l.length; e += 1) {
                const { point: a, value: r } = l[e];
                "window" === t ? n.matchMedia(`(min-width: ${r}px)`).matches && (i = a) : r <= s.clientWidth && (i = a);
            }
            return i || "max";
        },
    };
    const ce = {
        addClasses: function () {
            const e = this,
                { classNames: t, params: s, rtl: i, $el: n, device: a, support: l } = e,
                r = (function (e, t) {
                    const s = [];
                    return (
                        e.forEach((e) => {
                            "object" == typeof e
                                ? Object.keys(e).forEach((i) => {
                                      e[i] && s.push(t + i);
                                  })
                                : "string" == typeof e && s.push(t + e);
                        }),
                        s
                    );
                })(
                    [
                        "initialized",
                        s.direction,
                        { "pointer-events": !l.touch },
                        { "free-mode": e.params.freeMode && s.freeMode.enabled },
                        { autoheight: s.autoHeight },
                        { rtl: i },
                        { grid: s.grid && s.grid.rows > 1 },
                        { "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill },
                        { android: a.android },
                        { ios: a.ios },
                        { "css-mode": s.cssMode },
                        { centered: s.cssMode && s.centeredSlides },
                    ],
                    s.containerModifierClass
                );
            t.push(...r), n.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
            const { $el: e, classNames: t } = this;
            e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
    };
    const pe = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
    };
    function he(e, t) {
        return function (s = {}) {
            const i = Object.keys(s)[0],
                n = s[i];
            "object" == typeof n && null !== n
                ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = { auto: !0 }),
                  i in e && "enabled" in n ? (!0 === e[i] && (e[i] = { enabled: !0 }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = { enabled: !1 }), B(t, s)) : B(t, s))
                : B(t, s);
        };
    }
    const ue = {
            eventsEmitter: R,
            update: Y,
            translate: X,
            transition: {
                setTransition: function (e, t) {
                    const s = this;
                    s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t);
                },
                transitionStart: function (e = !0, t) {
                    const s = this,
                        { params: i } = s;
                    i.cssMode || (i.autoHeight && s.updateAutoHeight(), U({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
                },
                transitionEnd: function (e = !0, t) {
                    const s = this,
                        { params: i } = s;
                    (s.animating = !1), i.cssMode || (s.setTransition(0), U({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
                },
            },
            slide: K,
            loop: Z,
            grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (t.support.touch || !t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode) return;
                    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    (s.style.cursor = "move"), (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"), (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"), (s.style.cursor = e ? "grabbing" : "grab");
                },
                unsetGrabCursor: function () {
                    const e = this;
                    e.support.touch || (e.params.watchOverflow && e.isLocked) || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "");
                },
            },
            events: re,
            breakpoints: de,
            checkOverflow: {
                checkOverflow: function () {
                    const e = this,
                        { isLocked: t, params: s } = e,
                        { slidesOffsetBefore: i } = s;
                    if (i) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                        e.isLocked = e.size > s;
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                        !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                        t && t !== e.isLocked && (e.isEnd = !1),
                        t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
                },
            },
            classes: ce,
            images: {
                loadImage: function (e, t, s, i, n, a) {
                    const l = x();
                    let r;
                    function o() {
                        a && a();
                    }
                    M(e).parent("picture")[0] || (e.complete && n) ? o() : t ? ((r = new l.Image()), (r.onload = o), (r.onerror = o), i && (r.sizes = i), s && (r.srcset = s), t && (r.src = t)) : o();
                },
                preloadImages: function () {
                    const e = this;
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                        const i = e.imagesToLoad[s];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t);
                    }
                },
            },
        },
        ge = {};
    class me {
        constructor(...e) {
            let t, s;
            if ((1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? (s = e[0]) : ([t, s] = e), s || (s = {}), (s = B({}, s)), t && !s.el && (s.el = t), s.el && M(s.el).length > 1)) {
                const e = [];
                return (
                    M(s.el).each((t) => {
                        const i = B({}, s, { el: t });
                        e.push(new me(i));
                    }),
                    e
                );
            }
            const i = this;
            (i.__swiper__ = !0),
                (i.support = V()),
                (i.device = W({ userAgent: s.userAgent })),
                (i.browser = j()),
                (i.eventsListeners = {}),
                (i.eventsAnyListeners = []),
                (i.modules = [...i.__modules__]),
                s.modules && Array.isArray(s.modules) && i.modules.push(...s.modules);
            const n = {};
            i.modules.forEach((e) => {
                e({ swiper: i, extendParams: he(s, n), on: i.on.bind(i), once: i.once.bind(i), off: i.off.bind(i), emit: i.emit.bind(i) });
            });
            const a = B({}, pe, n);
            return (
                (i.params = B({}, a, ge, s)),
                (i.originalParams = B({}, i.params)),
                (i.passedParams = B({}, s)),
                i.params &&
                    i.params.on &&
                    Object.keys(i.params.on).forEach((e) => {
                        i.on(e, i.params.on[e]);
                    }),
                i.params && i.params.onAny && i.onAny(i.params.onAny),
                (i.$ = M),
                Object.assign(i, {
                    enabled: i.params.enabled,
                    el: t,
                    classNames: [],
                    slides: M(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: () => "horizontal" === i.params.direction,
                    isVertical: () => "vertical" === i.params.direction,
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: i.params.allowSlideNext,
                    allowSlidePrev: i.params.allowSlidePrev,
                    touchEvents: (function () {
                        const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                            t = ["pointerdown", "pointermove", "pointerup"];
                        return (
                            (i.touchEventsTouch = { start: e[0], move: e[1], end: e[2], cancel: e[3] }),
                            (i.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                            i.support.touch || !i.params.simulateTouch ? i.touchEventsTouch : i.touchEventsDesktop
                        );
                    })(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: i.params.focusableElements,
                        lastClickTime: P(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0,
                    },
                    allowClick: !0,
                    allowTouchMove: i.params.allowTouchMove,
                    touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                    imagesToLoad: [],
                    imagesLoaded: 0,
                }),
                i.emit("_swiper"),
                i.params.init && i.init(),
                i
            );
        }
        enable() {
            const e = this;
            e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
        }
        disable() {
            const e = this;
            e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate(),
                n = (s.maxTranslate() - i) * e + i;
            s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className.split(" ").filter((t) => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
            const t = this;
            return e.className
                .split(" ")
                .filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
                .join(" ");
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each((s) => {
                const i = e.getSlideClasses(s);
                t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
            }),
                e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e = "current", t = !1) {
            const { params: s, slides: i, slidesGrid: n, slidesSizesGrid: a, size: l, activeIndex: r } = this;
            let o = 1;
            if (s.centeredSlides) {
                let e,
                    t = i[r].swiperSlideSize;
                for (let s = r + 1; s < i.length; s += 1) i[s] && !e && ((t += i[s].swiperSlideSize), (o += 1), t > l && (e = !0));
                for (let s = r - 1; s >= 0; s -= 1) i[s] && !e && ((t += i[s].swiperSlideSize), (o += 1), t > l && (e = !0));
            } else if ("current" === e)
                for (let e = r + 1; e < i.length; e += 1) {
                    (t ? n[e] + a[e] - n[r] < l : n[e] - n[r] < l) && (o += 1);
                }
            else
                for (let e = r - 1; e >= 0; e -= 1) {
                    n[r] - n[e] < l && (o += 1);
                }
            return o;
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: s } = e;
            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            let n;
            s.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode && e.params.freeMode.enabled
                    ? (i(), e.params.autoHeight && e.updateAutoHeight())
                    : ((n = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)), n || i()),
                s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update");
        }
        changeDirection(e, t = !0) {
            const s = this,
                i = s.params.direction;
            return (
                e || (e = "horizontal" === i ? "vertical" : "horizontal"),
                e === i ||
                    ("horizontal" !== e && "vertical" !== e) ||
                    (s.$el.removeClass(`${s.params.containerModifierClass}${i}`).addClass(`${s.params.containerModifierClass}${e}`),
                    s.emitContainerClasses(),
                    (s.params.direction = e),
                    s.slides.each((t) => {
                        "vertical" === e ? (t.style.width = "") : (t.style.height = "");
                    }),
                    s.emit("changeDirection"),
                    t && s.update()),
                s
            );
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const s = M(e || t.params.el);
            if (!(e = s[0])) return !1;
            e.swiper = t;
            const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let n = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = M(e.shadowRoot.querySelector(i()));
                    return (t.children = (e) => s.children(e)), t;
                }
                return s.children(i());
            })();
            if (0 === n.length && t.params.createElements) {
                const e = C().createElement("div");
                (n = M(e)),
                    (e.className = t.params.wrapperClass),
                    s.append(e),
                    s.children(`.${t.params.slideClass}`).each((e) => {
                        n.append(e);
                    });
            }
            return (
                Object.assign(t, {
                    $el: s,
                    el: e,
                    $wrapperEl: n,
                    wrapperEl: n[0],
                    mounted: !0,
                    rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                    rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                    wrongRTL: "-webkit-box" === n.css("display"),
                }),
                !0
            );
        }
        init(e) {
            const t = this;
            if (t.initialized) return t;
            return (
                !1 === t.mount(e) ||
                    (t.emit("beforeInit"),
                    t.params.breakpoints && t.setBreakpoint(),
                    t.addClasses(),
                    t.params.loop && t.loopCreate(),
                    t.updateSize(),
                    t.updateSlides(),
                    t.params.watchOverflow && t.checkOverflow(),
                    t.params.grabCursor && t.enabled && t.setGrabCursor(),
                    t.params.preloadImages && t.preloadImages(),
                    t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
                    t.attachEvents(),
                    (t.initialized = !0),
                    t.emit("init"),
                    t.emit("afterInit")),
                t
            );
        }
        destroy(e = !0, t = !0) {
            const s = this,
                { params: i, $el: n, $wrapperEl: a, slides: l } = s;
            return (
                void 0 === s.params ||
                    s.destroyed ||
                    (s.emit("beforeDestroy"),
                    (s.initialized = !1),
                    s.detachEvents(),
                    i.loop && s.loopDestroy(),
                    t &&
                        (s.removeClasses(),
                        n.removeAttr("style"),
                        a.removeAttr("style"),
                        l && l.length && l.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
                    s.emit("destroy"),
                    Object.keys(s.eventsListeners).forEach((e) => {
                        s.off(e);
                    }),
                    !1 !== e &&
                        ((s.$el[0].swiper = null),
                        (function (e) {
                            const t = e;
                            Object.keys(t).forEach((e) => {
                                try {
                                    t[e] = null;
                                } catch (e) {}
                                try {
                                    delete t[e];
                                } catch (e) {}
                            });
                        })(s)),
                    (s.destroyed = !0)),
                null
            );
        }
        static extendDefaults(e) {
            B(ge, e);
        }
        static get extendedDefaults() {
            return ge;
        }
        static get defaults() {
            return pe;
        }
        static installModule(e) {
            me.prototype.__modules__ || (me.prototype.__modules__ = []);
            const t = me.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach((e) => me.installModule(e)), me) : (me.installModule(e), me);
        }
    }
    Object.keys(ue).forEach((e) => {
        Object.keys(ue[e]).forEach((t) => {
            me.prototype[t] = ue[e][t];
        });
    }),
        me.use([
            function ({ swiper: e, on: t, emit: s }) {
                const i = x();
                let n = null;
                const a = () => {
                        e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"));
                    },
                    l = () => {
                        e && !e.destroyed && e.initialized && s("orientationchange");
                    };
                t("init", () => {
                    e.params.resizeObserver && void 0 !== i.ResizeObserver
                        ? e &&
                          !e.destroyed &&
                          e.initialized &&
                          ((n = new ResizeObserver((t) => {
                              const { width: s, height: i } = e;
                              let n = s,
                                  l = i;
                              t.forEach(({ contentBoxSize: t, contentRect: s, target: i }) => {
                                  (i && i !== e.el) || ((n = s ? s.width : (t[0] || t).inlineSize), (l = s ? s.height : (t[0] || t).blockSize));
                              }),
                                  (n === s && l === i) || a();
                          })),
                          n.observe(e.el))
                        : (i.addEventListener("resize", a), i.addEventListener("orientationchange", l));
                }),
                    t("destroy", () => {
                        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)), i.removeEventListener("resize", a), i.removeEventListener("orientationchange", l);
                    });
            },
            function ({ swiper: e, extendParams: t, on: s, emit: i }) {
                const n = [],
                    a = x(),
                    l = (e, t = {}) => {
                        const s = new (a.MutationObserver || a.WebkitMutationObserver)((e) => {
                            if (1 === e.length) return void i("observerUpdate", e[0]);
                            const t = function () {
                                i("observerUpdate", e[0]);
                            };
                            a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0);
                        });
                        s.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), n.push(s);
                    };
                t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                    s("init", () => {
                        if (e.params.observer) {
                            if (e.params.observeParents) {
                                const t = e.$el.parents();
                                for (let e = 0; e < t.length; e += 1) l(t[e]);
                            }
                            l(e.$el[0], { childList: e.params.observeSlideChildren }), l(e.$wrapperEl[0], { attributes: !1 });
                        }
                    }),
                    s("destroy", () => {
                        n.forEach((e) => {
                            e.disconnect();
                        }),
                            n.splice(0, n.length);
                    });
            },
        ]);
    const fe = me;
    function ve(e, t, s, i) {
        const n = C();
        return (
            e.params.createElements &&
                Object.keys(i).forEach((a) => {
                    if (!s[a] && !0 === s.auto) {
                        let l = e.$el.children(`.${i[a]}`)[0];
                        l || ((l = n.createElement("div")), (l.className = i[a]), e.$el.append(l)), (s[a] = l), (t[a] = l);
                    }
                }),
            s
        );
    }
    function ye({ swiper: e, extendParams: t, on: s, emit: i }) {
        function n(t) {
            let s;
            return t && ((s = M(t)), e.params.uniqueNavElements && "string" == typeof t && s.length > 1 && 1 === e.$el.find(t).length && (s = e.$el.find(t))), s;
        }
        function a(t, s) {
            const i = e.params.navigation;
            t && t.length > 0 && (t[s ? "addClass" : "removeClass"](i.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s), e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](i.lockClass));
        }
        function l() {
            if (e.params.loop) return;
            const { $nextEl: t, $prevEl: s } = e.navigation;
            a(s, e.isBeginning && !e.params.rewind), a(t, e.isEnd && !e.params.rewind);
        }
        function r(t) {
            t.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
        }
        function o(t) {
            t.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
        }
        function d() {
            const t = e.params.navigation;
            if (((e.params.navigation = ve(e, e.originalParams.navigation, e.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" })), !t.nextEl && !t.prevEl)) return;
            const s = n(t.nextEl),
                i = n(t.prevEl);
            s && s.length > 0 && s.on("click", o),
                i && i.length > 0 && i.on("click", r),
                Object.assign(e.navigation, { $nextEl: s, nextEl: s && s[0], $prevEl: i, prevEl: i && i[0] }),
                e.enabled || (s && s.addClass(t.lockClass), i && i.addClass(t.lockClass));
        }
        function c() {
            const { $nextEl: t, $prevEl: s } = e.navigation;
            t && t.length && (t.off("click", o), t.removeClass(e.params.navigation.disabledClass)), s && s.length && (s.off("click", r), s.removeClass(e.params.navigation.disabledClass));
        }
        t({ navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } }),
            (e.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }),
            s("init", () => {
                d(), l();
            }),
            s("toEdge fromEdge lock unlock", () => {
                l();
            }),
            s("destroy", () => {
                c();
            }),
            s("enable disable", () => {
                const { $nextEl: t, $prevEl: s } = e.navigation;
                t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), s && s[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass);
            }),
            s("click", (t, s) => {
                const { $nextEl: n, $prevEl: a } = e.navigation,
                    l = s.target;
                if (e.params.navigation.hideOnClick && !M(l).is(a) && !M(l).is(n)) {
                    if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === l || e.pagination.el.contains(l))) return;
                    let t;
                    n ? (t = n.hasClass(e.params.navigation.hiddenClass)) : a && (t = a.hasClass(e.params.navigation.hiddenClass)),
                        i(!0 === t ? "navigationShow" : "navigationHide"),
                        n && n.toggleClass(e.params.navigation.hiddenClass),
                        a && a.toggleClass(e.params.navigation.hiddenClass);
                }
            }),
            Object.assign(e.navigation, { update: l, init: d, destroy: c });
    }
    function be(e = "") {
        return `.${e
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`;
    }
    function we({ swiper: e, extendParams: t, on: s, emit: i }) {
        const n = "swiper-pagination";
        let a;
        t({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: (e) => e,
                formatFractionTotal: (e) => e,
                bulletClass: `${n}-bullet`,
                bulletActiveClass: `${n}-bullet-active`,
                modifierClass: `${n}-`,
                currentClass: `${n}-current`,
                totalClass: `${n}-total`,
                hiddenClass: `${n}-hidden`,
                progressbarFillClass: `${n}-progressbar-fill`,
                progressbarOppositeClass: `${n}-progressbar-opposite`,
                clickableClass: `${n}-clickable`,
                lockClass: `${n}-lock`,
                horizontalClass: `${n}-horizontal`,
                verticalClass: `${n}-vertical`,
            },
        }),
            (e.pagination = { el: null, $el: null, bullets: [] });
        let l = 0;
        function r() {
            return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length;
        }
        function o(t, s) {
            const { bulletActiveClass: i } = e.params.pagination;
            t[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
        }
        function d() {
            const t = e.rtl,
                s = e.params.pagination;
            if (r()) return;
            const n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                d = e.pagination.$el;
            let c;
            const p = e.params.loop ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
            if (
                (e.params.loop
                    ? ((c = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)),
                      c > n - 1 - 2 * e.loopedSlides && (c -= n - 2 * e.loopedSlides),
                      c > p - 1 && (c -= p),
                      c < 0 && "bullets" !== e.params.paginationType && (c = p + c))
                    : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
                "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0)
            ) {
                const i = e.pagination.bullets;
                let n, r, p;
                if (
                    (s.dynamicBullets &&
                        ((a = i.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                        d.css(e.isHorizontal() ? "width" : "height", a * (s.dynamicMainBullets + 4) + "px"),
                        s.dynamicMainBullets > 1 && void 0 !== e.previousIndex && ((l += c - (e.previousIndex - e.loopedSlides || 0)), l > s.dynamicMainBullets - 1 ? (l = s.dynamicMainBullets - 1) : l < 0 && (l = 0)),
                        (n = Math.max(c - l, 0)),
                        (r = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                        (p = (r + n) / 2)),
                    i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e) => `${s.bulletActiveClass}${e}`).join(" ")),
                    d.length > 1)
                )
                    i.each((e) => {
                        const t = M(e),
                            i = t.index();
                        i === c && t.addClass(s.bulletActiveClass), s.dynamicBullets && (i >= n && i <= r && t.addClass(`${s.bulletActiveClass}-main`), i === n && o(t, "prev"), i === r && o(t, "next"));
                    });
                else {
                    const t = i.eq(c),
                        a = t.index();
                    if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                        const t = i.eq(n),
                            l = i.eq(r);
                        for (let e = n; e <= r; e += 1) i.eq(e).addClass(`${s.bulletActiveClass}-main`);
                        if (e.params.loop)
                            if (a >= i.length) {
                                for (let e = s.dynamicMainBullets; e >= 0; e -= 1) i.eq(i.length - e).addClass(`${s.bulletActiveClass}-main`);
                                i.eq(i.length - s.dynamicMainBullets - 1).addClass(`${s.bulletActiveClass}-prev`);
                            } else o(t, "prev"), o(l, "next");
                        else o(t, "prev"), o(l, "next");
                    }
                }
                if (s.dynamicBullets) {
                    const n = Math.min(i.length, s.dynamicMainBullets + 4),
                        l = (a * n - a) / 2 - p * a,
                        r = t ? "right" : "left";
                    i.css(e.isHorizontal() ? r : "top", `${l}px`);
                }
            }
            if (("fraction" === s.type && (d.find(be(s.currentClass)).text(s.formatFractionCurrent(c + 1)), d.find(be(s.totalClass)).text(s.formatFractionTotal(p))), "progressbar" === s.type)) {
                let t;
                t = s.progressbarOpposite ? (e.isHorizontal() ? "vertical" : "horizontal") : e.isHorizontal() ? "horizontal" : "vertical";
                const i = (c + 1) / p;
                let n = 1,
                    a = 1;
                "horizontal" === t ? (n = i) : (a = i), d.find(be(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(e.params.speed);
            }
            "custom" === s.type && s.renderCustom ? (d.html(s.renderCustom(e, c + 1, p)), i("paginationRender", d[0])) : i("paginationUpdate", d[0]),
                e.params.watchOverflow && e.enabled && d[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
        }
        function c() {
            const t = e.params.pagination;
            if (r()) return;
            const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                n = e.pagination.$el;
            let a = "";
            if ("bullets" === t.type) {
                let i = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && i > s && (i = s);
                for (let s = 0; s < i; s += 1) t.renderBullet ? (a += t.renderBullet.call(e, s, t.bulletClass)) : (a += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
                n.html(a), (e.pagination.bullets = n.find(be(t.bulletClass)));
            }
            "fraction" === t.type && ((a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`), n.html(a)),
                "progressbar" === t.type && ((a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`), n.html(a)),
                "custom" !== t.type && i("paginationRender", e.pagination.$el[0]);
        }
        function p() {
            e.params.pagination = ve(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
            const t = e.params.pagination;
            if (!t.el) return;
            let s = M(t.el);
            0 !== s.length &&
                (e.params.uniqueNavElements && "string" == typeof t.el && s.length > 1 && ((s = e.$el.find(t.el)), s.length > 1 && (s = s.filter((t) => M(t).parents(".swiper")[0] === e.el))),
                "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
                s.addClass(t.modifierClass + t.type),
                s.addClass(t.modifierClass + e.params.direction),
                "bullets" === t.type && t.dynamicBullets && (s.addClass(`${t.modifierClass}${t.type}-dynamic`), (l = 0), t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && s.addClass(t.progressbarOppositeClass),
                t.clickable &&
                    s.on("click", be(t.bulletClass), function (t) {
                        t.preventDefault();
                        let s = M(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (s += e.loopedSlides), e.slideTo(s);
                    }),
                Object.assign(e.pagination, { $el: s, el: s[0] }),
                e.enabled || s.addClass(t.lockClass));
        }
        function h() {
            const t = e.params.pagination;
            if (r()) return;
            const s = e.pagination.$el;
            s.removeClass(t.hiddenClass),
                s.removeClass(t.modifierClass + t.type),
                s.removeClass(t.modifierClass + e.params.direction),
                e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t.bulletActiveClass),
                t.clickable && s.off("click", be(t.bulletClass));
        }
        s("init", () => {
            p(), c(), d();
        }),
            s("activeIndexChange", () => {
                (e.params.loop || void 0 === e.snapIndex) && d();
            }),
            s("snapIndexChange", () => {
                e.params.loop || d();
            }),
            s("slidesLengthChange", () => {
                e.params.loop && (c(), d());
            }),
            s("snapGridLengthChange", () => {
                e.params.loop || (c(), d());
            }),
            s("destroy", () => {
                h();
            }),
            s("enable disable", () => {
                const { $el: t } = e.pagination;
                t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass);
            }),
            s("lock unlock", () => {
                d();
            }),
            s("click", (t, s) => {
                const n = s.target,
                    { $el: a } = e.pagination;
                if (e.params.pagination.el && e.params.pagination.hideOnClick && a.length > 0 && !M(n).hasClass(e.params.pagination.bulletClass)) {
                    if (e.navigation && ((e.navigation.nextEl && n === e.navigation.nextEl) || (e.navigation.prevEl && n === e.navigation.prevEl))) return;
                    const t = a.hasClass(e.params.pagination.hiddenClass);
                    i(!0 === t ? "paginationShow" : "paginationHide"), a.toggleClass(e.params.pagination.hiddenClass);
                }
            }),
            Object.assign(e.pagination, { render: c, update: d, init: p, destroy: h });
    }
    function Se({ swiper: e, extendParams: t, on: s, emit: i }) {
        t({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader",
            },
        }),
            (e.lazy = {});
        let n = !1,
            a = !1;
        function l(t, s = !0) {
            const n = e.params.lazy;
            if (void 0 === t) return;
            if (0 === e.slides.length) return;
            const a = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`) : e.slides.eq(t),
                r = a.find(`.${n.elementClass}:not(.${n.loadedClass}):not(.${n.loadingClass})`);
            !a.hasClass(n.elementClass) || a.hasClass(n.loadedClass) || a.hasClass(n.loadingClass) || r.push(a[0]),
                0 !== r.length &&
                    r.each((t) => {
                        const r = M(t);
                        r.addClass(n.loadingClass);
                        const o = r.attr("data-background"),
                            d = r.attr("data-src"),
                            c = r.attr("data-srcset"),
                            p = r.attr("data-sizes"),
                            h = r.parent("picture");
                        e.loadImage(r[0], d || o, c, p, !1, () => {
                            if (null != e && e && (!e || e.params) && !e.destroyed) {
                                if (
                                    (o
                                        ? (r.css("background-image", `url("${o}")`), r.removeAttr("data-background"))
                                        : (c && (r.attr("srcset", c), r.removeAttr("data-srcset")),
                                          p && (r.attr("sizes", p), r.removeAttr("data-sizes")),
                                          h.length &&
                                              h.children("source").each((e) => {
                                                  const t = M(e);
                                                  t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"));
                                              }),
                                          d && (r.attr("src", d), r.removeAttr("data-src"))),
                                    r.addClass(n.loadedClass).removeClass(n.loadingClass),
                                    a.find(`.${n.preloaderClass}`).remove(),
                                    e.params.loop && s)
                                ) {
                                    const t = a.attr("data-swiper-slide-index");
                                    if (a.hasClass(e.params.slideDuplicateClass)) {
                                        l(e.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`).index(), !1);
                                    } else {
                                        l(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(), !1);
                                    }
                                }
                                i("lazyImageReady", a[0], r[0]), e.params.autoHeight && e.updateAutoHeight();
                            }
                        }),
                            i("lazyImageLoad", a[0], r[0]);
                    });
        }
        function r() {
            const { $wrapperEl: t, params: s, slides: i, activeIndex: n } = e,
                r = e.virtual && s.virtual.enabled,
                o = s.lazy;
            let d = s.slidesPerView;
            function c(e) {
                if (r) {
                    if (t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0;
                } else if (i[e]) return !0;
                return !1;
            }
            function p(e) {
                return r ? M(e).attr("data-swiper-slide-index") : M(e).index();
            }
            if (("auto" === d && (d = 0), a || (a = !0), e.params.watchSlidesProgress))
                t.children(`.${s.slideVisibleClass}`).each((e) => {
                    l(r ? M(e).attr("data-swiper-slide-index") : M(e).index());
                });
            else if (d > 1) for (let e = n; e < n + d; e += 1) c(e) && l(e);
            else l(n);
            if (o.loadPrevNext)
                if (d > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
                    const e = o.loadPrevNextAmount,
                        t = d,
                        s = Math.min(n + t + Math.max(e, t), i.length),
                        a = Math.max(n - Math.max(t, e), 0);
                    for (let e = n + d; e < s; e += 1) c(e) && l(e);
                    for (let e = a; e < n; e += 1) c(e) && l(e);
                } else {
                    const e = t.children(`.${s.slideNextClass}`);
                    e.length > 0 && l(p(e));
                    const i = t.children(`.${s.slidePrevClass}`);
                    i.length > 0 && l(p(i));
                }
        }
        function o() {
            const t = x();
            if (!e || e.destroyed) return;
            const s = e.params.lazy.scrollingElement ? M(e.params.lazy.scrollingElement) : M(t),
                i = s[0] === t,
                a = i ? t.innerWidth : s[0].offsetWidth,
                l = i ? t.innerHeight : s[0].offsetHeight,
                d = e.$el.offset(),
                { rtlTranslate: c } = e;
            let p = !1;
            c && (d.left -= e.$el[0].scrollLeft);
            const h = [
                [d.left, d.top],
                [d.left + e.width, d.top],
                [d.left, d.top + e.height],
                [d.left + e.width, d.top + e.height],
            ];
            for (let e = 0; e < h.length; e += 1) {
                const t = h[e];
                if (t[0] >= 0 && t[0] <= a && t[1] >= 0 && t[1] <= l) {
                    if (0 === t[0] && 0 === t[1]) continue;
                    p = !0;
                }
            }
            const u = !("touchstart" !== e.touchEvents.start || !e.support.passiveListener || !e.params.passiveListeners) && { passive: !0, capture: !1 };
            p ? (r(), s.off("scroll", o, u)) : n || ((n = !0), s.on("scroll", o, u));
        }
        s("beforeInit", () => {
            e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1);
        }),
            s("init", () => {
                e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : r());
            }),
            s("scroll", () => {
                e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && r();
            }),
            s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
                e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : r());
            }),
            s("transitionStart", () => {
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || (!e.params.lazy.loadOnTransitionStart && !a)) && (e.params.lazy.checkInView ? o() : r());
            }),
            s("transitionEnd", () => {
                e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? o() : r());
            }),
            s("slideChange", () => {
                const { lazy: t, cssMode: s, watchSlidesProgress: i, touchReleaseOnEdges: n, resistanceRatio: a } = e.params;
                t.enabled && (s || (i && (n || 0 === a))) && r();
            }),
            Object.assign(e.lazy, { load: r, loadInSlide: l });
    }
    function Ce({ swiper: e, extendParams: t, on: s, emit: i }) {
        let n;
        function a() {
            const t = e.slides.eq(e.activeIndex);
            let s = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                clearTimeout(n),
                (n = _(() => {
                    let t;
                    e.params.autoplay.reverseDirection
                        ? e.params.loop
                            ? (e.loopFix(), (t = e.slidePrev(e.params.speed, !0, !0)), i("autoplay"))
                            : e.isBeginning
                            ? e.params.autoplay.stopOnLastSlide
                                ? r()
                                : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)), i("autoplay"))
                            : ((t = e.slidePrev(e.params.speed, !0, !0)), i("autoplay"))
                        : e.params.loop
                        ? (e.loopFix(), (t = e.slideNext(e.params.speed, !0, !0)), i("autoplay"))
                        : e.isEnd
                        ? e.params.autoplay.stopOnLastSlide
                            ? r()
                            : ((t = e.slideTo(0, e.params.speed, !0, !0)), i("autoplay"))
                        : ((t = e.slideNext(e.params.speed, !0, !0)), i("autoplay")),
                        ((e.params.cssMode && e.autoplay.running) || !1 === t) && a();
                }, s));
        }
        function l() {
            return void 0 === n && !e.autoplay.running && ((e.autoplay.running = !0), i("autoplayStart"), a(), !0);
        }
        function r() {
            return !!e.autoplay.running && void 0 !== n && (n && (clearTimeout(n), (n = void 0)), (e.autoplay.running = !1), i("autoplayStop"), !0);
        }
        function o(t) {
            e.autoplay.running &&
                (e.autoplay.paused ||
                    (n && clearTimeout(n),
                    (e.autoplay.paused = !0),
                    0 !== t && e.params.autoplay.waitForTransition
                        ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                              e.$wrapperEl[0].addEventListener(t, c);
                          })
                        : ((e.autoplay.paused = !1), a())));
        }
        function d() {
            const t = C();
            "hidden" === t.visibilityState && e.autoplay.running && o(), "visible" === t.visibilityState && e.autoplay.paused && (a(), (e.autoplay.paused = !1));
        }
        function c(t) {
            e &&
                !e.destroyed &&
                e.$wrapperEl &&
                t.target === e.$wrapperEl[0] &&
                (["transitionend", "webkitTransitionEnd"].forEach((t) => {
                    e.$wrapperEl[0].removeEventListener(t, c);
                }),
                (e.autoplay.paused = !1),
                e.autoplay.running ? a() : r());
        }
        function p() {
            e.params.autoplay.disableOnInteraction ? r() : o(),
                ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                    e.$wrapperEl[0].removeEventListener(t, c);
                });
        }
        function h() {
            e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), a());
        }
        (e.autoplay = { running: !1, paused: !1 }),
            t({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }),
            s("init", () => {
                if (e.params.autoplay.enabled) {
                    l();
                    C().addEventListener("visibilitychange", d), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", p), e.$el.on("mouseleave", h));
                }
            }),
            s("beforeTransitionStart", (t, s, i) => {
                e.autoplay.running && (i || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s) : r());
            }),
            s("sliderFirstMove", () => {
                e.autoplay.running && (e.params.autoplay.disableOnInteraction ? r() : o());
            }),
            s("touchEnd", () => {
                e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && a();
            }),
            s("destroy", () => {
                e.$el.off("mouseenter", p), e.$el.off("mouseleave", h), e.autoplay.running && r();
                C().removeEventListener("visibilitychange", d);
            }),
            Object.assign(e.autoplay, { pause: o, run: a, start: l, stop: r });
    }
    function Ee(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" }) : t;
    }
    function xe({ swiper: e, extendParams: t, on: s }) {
        t({ fadeEffect: { crossFade: !1, transformEl: null } });
        !(function (e) {
            const { effect: t, swiper: s, on: i, setTranslate: n, setTransition: a, overwriteParams: l, perspective: r } = e;
            i("beforeInit", () => {
                if (s.params.effect !== t) return;
                s.classNames.push(`${s.params.containerModifierClass}${t}`), r && r() && s.classNames.push(`${s.params.containerModifierClass}3d`);
                const e = l ? l() : {};
                Object.assign(s.params, e), Object.assign(s.originalParams, e);
            }),
                i("setTranslate", () => {
                    s.params.effect === t && n();
                }),
                i("setTransition", (e, i) => {
                    s.params.effect === t && a(i);
                });
        })({
            effect: "fade",
            swiper: e,
            on: s,
            setTranslate: () => {
                const { slides: t } = e,
                    s = e.params.fadeEffect;
                for (let i = 0; i < t.length; i += 1) {
                    const t = e.slides.eq(i);
                    let n = -t[0].swiperSlideOffset;
                    e.params.virtualTranslate || (n -= e.translate);
                    let a = 0;
                    e.isHorizontal() || ((a = n), (n = 0));
                    const l = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                    Ee(s, t).css({ opacity: l }).transform(`translate3d(${n}px, ${a}px, 0px)`);
                }
            },
            setTransition: (t) => {
                const { transformEl: s } = e.params.fadeEffect;
                (s ? e.slides.find(s) : e.slides).transition(t),
                    (function ({ swiper: e, duration: t, transformEl: s, allSlides: i }) {
                        const { slides: n, activeIndex: a, $wrapperEl: l } = e;
                        if (e.params.virtualTranslate && 0 !== t) {
                            let t,
                                r = !1;
                            (t = i ? (s ? n.find(s) : n) : s ? n.eq(a).find(s) : n.eq(a)),
                                t.transitionEnd(() => {
                                    if (r) return;
                                    if (!e || e.destroyed) return;
                                    (r = !0), (e.animating = !1);
                                    const t = ["webkitTransitionEnd", "transitionend"];
                                    for (let e = 0; e < t.length; e += 1) l.trigger(t[e]);
                                });
                        }
                    })({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
            },
            overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !e.params.cssMode }),
        });
    }
    function Te() {
        let e = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
        e &&
            e.forEach((e) => {
                e.parentElement.classList.add("swiper"), e.classList.add("swiper-wrapper");
                for (const t of e.children) t.classList.add("swiper-slide");
            });
    }
    window.addEventListener("load", function (e) {
        Te(),
            document.querySelector(".staff-slider") &&
                new fe(".staff-slider", {
                    modules: [ye, we, Se],
                    lazy: {},
                    observer: !0,
                    observeParents: !0,
                    slidesPerView: 3,
                    spaceBetween: 35,
                    autoHeight: !0,
                    speed: 800,
                    loop: !0,
                    pagination: { el: ".staff-slider__pagination", type: "fraction" },
                    navigation: { nextEl: ".staff-slider__next", prevEl: ".staff-slider__prev" },
                    breakpoints: { 320: { slidesPerView: 1.6, spaceBetween: 20, autoHeight: !0 }, 768: { slidesPerView: 2, spaceBetween: 20 }, 992: { slidesPerView: 3, spaceBetween: 20 }, 1268: { slidesPerView: 3, spaceBetween: 30 } },
                    on: {},
                }),
            document.querySelector(".reviews-slider") &&
                new fe(".reviews-slider", {
                    modules: [ye, we, xe],
                    effect: "fade",
                    fadeEffect: { crossFade: !0 },
                    observer: !0,
                    observeParents: !0,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: !0,
                    speed: 800,
                    loop: !0,
                    pagination: { el: ".reviews-slider__pagination", type: "fraction" },
                    navigation: { nextEl: ".reviews-slider__next", prevEl: ".reviews-slider__prev" },
                    on: {},
                }),
            document.querySelector(".courses-slider") &&
                new fe(".courses-slider", {
                    modules: [ye, we, Se, Ce],
                    autoplay: { delay: 2e3, disableOnInteraction: !0 },
                    observer: !0,
                    observeParents: !0,
                    slidesPerView: 3,
                    speed: 800,
                    centeredSlides: !0,
                    loop: !0,
                    lazy: { loadPrevNext: !0 },
                    pagination: { el: ".courses-slider__pagination", type: "fraction" },
                    navigation: { nextEl: ".courses-slider__next", prevEl: ".courses-slider__prev" },
                    breakpoints: {
                        320: { slidesPerView: 1.2, spaceBetween: 20, autoHeight: !0, centeredSlides: !1 },
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        992: { slidesPerView: 3, spaceBetween: 20 },
                        1268: { slidesPerView: 3, spaceBetween: 30 },
                    },
                    on: {
                        init() {
                            this.el.addEventListener("mouseenter", () => {
                                this.autoplay.stop();
                            }),
                                this.el.addEventListener("mouseleave", () => {
                                    this.autoplay.start();
                                });
                        },
                    },
                }),
            document.querySelector(".gallery-slider") &&
                new fe(".gallery-slider", {
                    modules: [ye, we, Se],
                    observer: !0,
                    observeParents: !0,
                    slidesPerView: 2,
                    spaceBetween: 30,
                    speed: 800,
                    loop: !0,
                    preloadImages: !1,
                    lazy: { loadPrevNext: !0 },
                    pagination: { el: ".gallery-slider__pagination", type: "fraction" },
                    navigation: { nextEl: ".gallery-slider__next", prevEl: ".gallery-slider__prev" },
                    breakpoints: { 320: { slidesPerView: 1.2, spaceBetween: 20 }, 768: { slidesPerView: 2, spaceBetween: 20 } },
                    on: {},
                });
    });
    class Le {
        constructor(e) {
            (this.config = Object.assign({ logging: !0 }, e)), this.observer, !document.documentElement.classList.contains("watcher") && this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher"), this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(e) {
            if (e.length) {
                this.scrollWatcherLogging(`Проснулся, слежу за объектами (${e.length})...`),
                    u(
                        Array.from(e).map(function (e) {
                            return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
                        })
                    ).forEach((t) => {
                        let s = t.split("|"),
                            i = { root: s[0], margin: s[1], threshold: s[2] },
                            n = Array.from(e).filter(function (e) {
                                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                                    s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                                    n = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                                if (String(t) === i.root && String(s) === i.margin && String(n) === i.threshold) return e;
                            }),
                            a = this.getScrollWatcherConfig(i);
                        this.scrollWatcherInit(n, a);
                    });
            } else this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
        }
        getScrollWatcherConfig(e) {
            let t = {};
            if (
                (document.querySelector(e.root) ? (t.root = document.querySelector(e.root)) : "null" !== e.root && this.scrollWatcherLogging(`Эмм... родительского объекта ${e.root} нет на странице`),
                (t.rootMargin = e.margin),
                !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
            ) {
                if ("prx" === e.threshold) {
                    e.threshold = [];
                    for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
                } else e.threshold = e.threshold.split(",");
                return (t.threshold = e.threshold), t;
            }
            this.scrollWatcherLogging("Ой ой, настройку data-watch-margin нужно задавать в PX или %");
        }
        scrollWatcherCreate(e) {
            this.observer = new IntersectionObserver((e, t) => {
                e.forEach((e) => {
                    this.scrollWatcherCallback(e, t);
                });
            }, e);
        }
        scrollWatcherInit(e, t) {
            this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
        }
        scrollWatcherIntersecting(e, t) {
            if (e.isIntersecting) {
                if ((!t.classList.contains("_watcher-view") && t.classList.add("_watcher-view"), this.scrollWatcherLogging(`Я вижу ${t.classList}, добавил класс _watcher-view`), t.classList.contains("_watcher-view"))) {
                    let e = 5;
                    const t = document.querySelector(".main-block__swipe-icon");
                    let s = setInterval(function () {
                        e--, 0 == e && t && ((t.style.display = "none"), clearInterval(s));
                    }, 1e3);
                }
            } else t.classList.contains("_watcher-view") && t.classList.remove("_watcher-view"), this.scrollWatcherLogging(`Я не вижу ${t.classList}, убрал класс _watcher-view`);
        }
        scrollWatcherOff(e, t) {
            t.unobserve(e), this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
        }
        scrollWatcherLogging(e) {
            this.config.logging && h(`[Наблюдатель]: ${e}`);
        }
        scrollWatcherCallback(e, t) {
            const s = e.target;
            this.scrollWatcherIntersecting(e, s), s.hasAttribute("data-watch-once") && e.isIntersecting && this.scrollWatcherOff(s, t), document.dispatchEvent(new CustomEvent("watcherCallback", { detail: { entry: e } }));
        }
    }
    let Ie = !1;
    setTimeout(() => {
        if (Ie) {
            let e = new Event("windowScroll");
            window.addEventListener("scroll", function (t) {
                document.dispatchEvent(e);
            });
        }
    }, 0);
    var Oe = function () {
        return (
            (Oe =
                Object.assign ||
                function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++) for (var n in (t = arguments[s])) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e;
                }),
            Oe.apply(this, arguments)
        );
    };
    var $e = (function () {
        function e(e) {
            return (this.cssVenderPrefixes = ["TransitionDuration", "TransitionTimingFunction", "Transform", "Transition"]), (this.selector = this._getSelector(e)), (this.firstElement = this._getFirstEl()), this;
        }
        return (
            (e.generateUUID = function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                    var t = (16 * Math.random()) | 0;
                    return ("x" == e ? t : (3 & t) | 8).toString(16);
                });
            }),
            (e.prototype._getSelector = function (e, t) {
                return void 0 === t && (t = document), "string" != typeof e ? e : ((t = t || document), "#" === e.substring(0, 1) ? t.querySelector(e) : t.querySelectorAll(e));
            }),
            (e.prototype._each = function (e) {
                return this.selector ? (void 0 !== this.selector.length ? [].forEach.call(this.selector, e) : e(this.selector, 0), this) : this;
            }),
            (e.prototype._setCssVendorPrefix = function (e, t, s) {
                var i = t.replace(/-([a-z])/gi, function (e, t) {
                    return t.toUpperCase();
                });
                -1 !== this.cssVenderPrefixes.indexOf(i) ? ((e.style[i.charAt(0).toLowerCase() + i.slice(1)] = s), (e.style["webkit" + i] = s), (e.style["moz" + i] = s), (e.style["ms" + i] = s), (e.style["o" + i] = s)) : (e.style[i] = s);
            }),
            (e.prototype._getFirstEl = function () {
                return this.selector && void 0 !== this.selector.length ? this.selector[0] : this.selector;
            }),
            (e.prototype.isEventMatched = function (e, t) {
                var s = t.split(".");
                return e
                    .split(".")
                    .filter(function (e) {
                        return e;
                    })
                    .every(function (e) {
                        return -1 !== s.indexOf(e);
                    });
            }),
            (e.prototype.attr = function (e, t) {
                return void 0 === t
                    ? this.firstElement
                        ? this.firstElement.getAttribute(e)
                        : ""
                    : (this._each(function (s) {
                          s.setAttribute(e, t);
                      }),
                      this);
            }),
            (e.prototype.find = function (e) {
                return ke(this._getSelector(e, this.selector));
            }),
            (e.prototype.first = function () {
                return this.selector && void 0 !== this.selector.length ? ke(this.selector[0]) : ke(this.selector);
            }),
            (e.prototype.eq = function (e) {
                return ke(this.selector[e]);
            }),
            (e.prototype.parent = function () {
                return ke(this.selector.parentElement);
            }),
            (e.prototype.get = function () {
                return this._getFirstEl();
            }),
            (e.prototype.removeAttr = function (e) {
                var t = e.split(" ");
                return (
                    this._each(function (e) {
                        t.forEach(function (t) {
                            return e.removeAttribute(t);
                        });
                    }),
                    this
                );
            }),
            (e.prototype.wrap = function (e) {
                if (!this.firstElement) return this;
                var t = document.createElement("div");
                return (t.className = e), this.firstElement.parentNode.insertBefore(t, this.firstElement), this.firstElement.parentNode.removeChild(this.firstElement), t.appendChild(this.firstElement), this;
            }),
            (e.prototype.addClass = function (e) {
                return (
                    void 0 === e && (e = ""),
                    this._each(function (t) {
                        e.split(" ").forEach(function (e) {
                            e && t.classList.add(e);
                        });
                    }),
                    this
                );
            }),
            (e.prototype.removeClass = function (e) {
                return (
                    this._each(function (t) {
                        e.split(" ").forEach(function (e) {
                            e && t.classList.remove(e);
                        });
                    }),
                    this
                );
            }),
            (e.prototype.hasClass = function (e) {
                return !!this.firstElement && this.firstElement.classList.contains(e);
            }),
            (e.prototype.hasAttribute = function (e) {
                return !!this.firstElement && this.firstElement.hasAttribute(e);
            }),
            (e.prototype.toggleClass = function (e) {
                return this.firstElement ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this) : this;
            }),
            (e.prototype.css = function (e, t) {
                var s = this;
                return (
                    this._each(function (i) {
                        s._setCssVendorPrefix(i, e, t);
                    }),
                    this
                );
            }),
            (e.prototype.on = function (t, s) {
                var i = this;
                return this.selector
                    ? (t.split(" ").forEach(function (t) {
                          Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []), e.eventListeners[t].push(s), i.selector.addEventListener(t.split(".")[0], s);
                      }),
                      this)
                    : this;
            }),
            (e.prototype.once = function (e, t) {
                var s = this;
                return (
                    this.on(e, function () {
                        s.off(e), t(e);
                    }),
                    this
                );
            }),
            (e.prototype.off = function (t) {
                var s = this;
                return this.selector
                    ? (Object.keys(e.eventListeners).forEach(function (i) {
                          s.isEventMatched(t, i) &&
                              (e.eventListeners[i].forEach(function (e) {
                                  s.selector.removeEventListener(i.split(".")[0], e);
                              }),
                              (e.eventListeners[i] = []));
                      }),
                      this)
                    : this;
            }),
            (e.prototype.trigger = function (e, t) {
                if (!this.firstElement) return this;
                var s = new CustomEvent(e.split(".")[0], { detail: t || null });
                return this.firstElement.dispatchEvent(s), this;
            }),
            (e.prototype.load = function (e) {
                var t = this;
                return (
                    fetch(e).then(function (e) {
                        t.selector.innerHTML = e;
                    }),
                    this
                );
            }),
            (e.prototype.html = function (e) {
                return void 0 === e
                    ? this.firstElement
                        ? this.firstElement.innerHTML
                        : ""
                    : (this._each(function (t) {
                          t.innerHTML = e;
                      }),
                      this);
            }),
            (e.prototype.append = function (e) {
                return (
                    this._each(function (t) {
                        "string" == typeof e ? t.insertAdjacentHTML("beforeend", e) : t.appendChild(e);
                    }),
                    this
                );
            }),
            (e.prototype.prepend = function (e) {
                return (
                    this._each(function (t) {
                        t.insertAdjacentHTML("afterbegin", e);
                    }),
                    this
                );
            }),
            (e.prototype.remove = function () {
                return (
                    this._each(function (e) {
                        e.parentNode.removeChild(e);
                    }),
                    this
                );
            }),
            (e.prototype.empty = function () {
                return (
                    this._each(function (e) {
                        e.innerHTML = "";
                    }),
                    this
                );
            }),
            (e.prototype.scrollTop = function (e) {
                return void 0 !== e ? ((document.body.scrollTop = e), (document.documentElement.scrollTop = e), this) : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            }),
            (e.prototype.scrollLeft = function (e) {
                return void 0 !== e ? ((document.body.scrollLeft = e), (document.documentElement.scrollLeft = e), this) : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            }),
            (e.prototype.offset = function () {
                if (!this.firstElement) return { left: 0, top: 0 };
                var e = this.firstElement.getBoundingClientRect(),
                    t = ke("body").style().marginLeft;
                return { left: e.left - parseFloat(t) + this.scrollLeft(), top: e.top + this.scrollTop() };
            }),
            (e.prototype.style = function () {
                return this.firstElement ? this.firstElement.currentStyle || window.getComputedStyle(this.firstElement) : {};
            }),
            (e.prototype.width = function () {
                var e = this.style();
                return this.firstElement.clientWidth - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight);
            }),
            (e.prototype.height = function () {
                var e = this.style();
                return this.firstElement.clientHeight - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom);
            }),
            (e.eventListeners = {}),
            e
        );
    })();
    function ke(e) {
        return (
            (function () {
                if ("function" == typeof window.CustomEvent) return !1;
                window.CustomEvent = function (e, t) {
                    t = t || { bubbles: !1, cancelable: !1, detail: null };
                    var s = document.createEvent("CustomEvent");
                    return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
                };
            })(),
            Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
            new $e(e)
        );
    }
    var Ae = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
    ];
    function Me(e) {
        return "href" === e
            ? "src"
            : (e = (e = (e = e.replace("data-", "")).charAt(0).toLowerCase() + e.slice(1)).replace(/-([a-z])/g, function (e) {
                  return e[1].toUpperCase();
              }));
    }
    var _e = function (e, t, s, i) {
            void 0 === s && (s = 0);
            var n = ke(e).attr("data-lg-size") || i;
            if (n) {
                var a = n.split(",");
                if (a[1])
                    for (var l = window.innerWidth, r = 0; r < a.length; r++) {
                        var o = a[r];
                        if (parseInt(o.split("-")[2], 10) > l) {
                            n = o;
                            break;
                        }
                        r === a.length - 1 && (n = o);
                    }
                var d = n.split("-"),
                    c = parseInt(d[0], 10),
                    p = parseInt(d[1], 10),
                    h = t.width(),
                    u = t.height() - s,
                    g = Math.min(h, c),
                    m = Math.min(u, p),
                    f = Math.min(g / c, m / p);
                return { width: c * f, height: p * f };
            }
        },
        Pe = function (e, t, s, i, n) {
            if (n) {
                var a = ke(e).find("img").first();
                if (a.get()) {
                    var l = t.get().getBoundingClientRect(),
                        r = l.width,
                        o = t.height() - (s + i),
                        d = a.width(),
                        c = a.height(),
                        p = a.style(),
                        h = (r - d) / 2 - a.offset().left + (parseFloat(p.paddingLeft) || 0) + (parseFloat(p.borderLeft) || 0) + ke(window).scrollLeft() + l.left,
                        u = (o - c) / 2 - a.offset().top + (parseFloat(p.paddingTop) || 0) + (parseFloat(p.borderTop) || 0) + ke(window).scrollTop() + s;
                    return "translate3d(" + (h *= -1) + "px, " + (u *= -1) + "px, 0) scale3d(" + d / n.width + ", " + c / n.height + ", 1)";
                }
            }
        },
        ze = function (e, t, s, i, n, a) {
            return (
                '<div class="lg-video-cont lg-has-iframe" style="width:' +
                e +
                "; max-width:" +
                s +
                "; height: " +
                t +
                "; max-height:" +
                i +
                '">\n                    <iframe class="lg-object" frameborder="0" ' +
                (a ? 'title="' + a + '"' : "") +
                ' src="' +
                n +
                '"  allowfullscreen="true"></iframe>\n                </div>'
            );
        },
        De = function (e, t, s, i, n, a) {
            var l = "<img " + s + " " + (i ? 'srcset="' + i + '"' : "") + "  " + (n ? 'sizes="' + n + '"' : "") + ' class="lg-object lg-image" data-index="' + e + '" src="' + t + '" />',
                r = "";
            a &&
                (r = ("string" == typeof a ? JSON.parse(a) : a).map(function (e) {
                    var t = "";
                    return (
                        Object.keys(e).forEach(function (s) {
                            t += " " + s + '="' + e[s] + '"';
                        }),
                        "<source " + t + "></source>"
                    );
                }));
            return "" + r + l;
        },
        Be = function (e) {
            for (var t = [], s = [], i = "", n = 0; n < e.length; n++) {
                var a = e[n].split(" ");
                "" === a[0] && a.splice(0, 1), s.push(a[0]), t.push(a[1]);
            }
            for (var l = window.innerWidth, r = 0; r < t.length; r++)
                if (parseInt(t[r], 10) > l) {
                    i = s[r];
                    break;
                }
            return i;
        },
        Ge = function (e) {
            return !!e && !!e.complete && 0 !== e.naturalWidth;
        },
        He = function (e, t, s, i) {
            return (
                '<div class="lg-video-cont ' +
                (i && i.youtube ? "lg-has-youtube" : i && i.vimeo ? "lg-has-vimeo" : "lg-has-html5") +
                '" style="' +
                s +
                '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
                (t || "") +
                '\n            <img class="lg-object lg-video-poster" src="' +
                e +
                '" />\n        </div>'
            );
        },
        qe = function (e, t, s, i) {
            var n = [],
                a = (function () {
                    for (var e = 0, t = 0, s = arguments.length; t < s; t++) e += arguments[t].length;
                    var i = Array(e),
                        n = 0;
                    for (t = 0; t < s; t++) for (var a = arguments[t], l = 0, r = a.length; l < r; l++, n++) i[n] = a[l];
                    return i;
                })(Ae, t);
            return (
                [].forEach.call(e, function (e) {
                    for (var t = {}, l = 0; l < e.attributes.length; l++) {
                        var r = e.attributes[l];
                        if (r.specified) {
                            var o = Me(r.name),
                                d = "";
                            a.indexOf(o) > -1 && (d = o), d && (t[d] = r.value);
                        }
                    }
                    var c = ke(e),
                        p = c.find("img").first().attr("alt"),
                        h = c.attr("title"),
                        u = i ? c.attr(i) : c.find("img").first().attr("src");
                    (t.thumb = u), s && !t.subHtml && (t.subHtml = h || p || ""), (t.alt = p || h || ""), n.push(t);
                }),
                n
            );
        },
        Ne = function () {
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        Fe = function (e, t, s) {
            if (!e)
                return t
                    ? { html5: !0 }
                    : void console.error(
                          "lightGallery :- data-src is not provided on slide item " + (s + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                      );
            var i = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i),
                n = e.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i),
                a = e.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
            return i ? { youtube: i } : n ? { vimeo: n } : a ? { wistia: a } : void 0;
        },
        Ve = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: !0,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: !0,
            allowMediaOverlap: !1,
            videoMaxSize: "1280-720",
            loadYouTubePoster: !0,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            closable: !0,
            swipeToClose: !0,
            closeOnTap: !0,
            showCloseIcon: !0,
            showMaximizeIcon: !1,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimation: !0,
            hideControlOnEnd: !1,
            mousewheel: !1,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
            plugins: [],
        },
        We = "lgAfterAppendSlide",
        je = "lgInit",
        Re = "lgHasVideo",
        Ye = "lgContainerResize",
        Xe = "lgUpdateSlides",
        Ue = "lgAfterAppendSubHtml",
        Ke = "lgBeforeOpen",
        Ze = "lgAfterOpen",
        Qe = "lgSlideItemLoad",
        Je = "lgBeforeSlide",
        et = "lgAfterSlide",
        tt = "lgPosterClick",
        st = "lgDragStart",
        it = "lgDragMove",
        nt = "lgDragEnd",
        at = "lgBeforeNextSlide",
        lt = "lgBeforePrevSlide",
        rt = "lgBeforeClose",
        ot = "lgAfterClose",
        dt = 0,
        ct = (function () {
            function e(e, t) {
                if (
                    ((this.lgOpened = !1),
                    (this.index = 0),
                    (this.plugins = []),
                    (this.lGalleryOn = !1),
                    (this.lgBusy = !1),
                    (this.currentItemsInDom = []),
                    (this.prevScrollTop = 0),
                    (this.isDummyImageRemoved = !1),
                    (this.dragOrSwipeEnabled = !1),
                    (this.mediaContainerPosition = { top: 0, bottom: 0 }),
                    !e)
                )
                    return this;
                if ((dt++, (this.lgId = dt), (this.el = e), (this.LGel = ke(e)), this.generateSettings(t), this.buildModules(), this.settings.dynamic && void 0 !== this.settings.dynamicEl && !Array.isArray(this.settings.dynamicEl)))
                    throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return (this.galleryItems = this.getItems()), this.normalizeSettings(), this.init(), this.validateLicense(), this;
            }
            return (
                (e.prototype.generateSettings = function (e) {
                    if (((this.settings = Oe(Oe({}, Ve), e)), this.settings.isMobile && "function" == typeof this.settings.isMobile ? this.settings.isMobile() : Ne())) {
                        var t = Oe(Oe({}, this.settings.mobileSettings), this.settings.mobileSettings);
                        this.settings = Oe(Oe({}, this.settings), t);
                    }
                }),
                (e.prototype.normalizeSettings = function () {
                    this.settings.slideEndAnimation && (this.settings.hideControlOnEnd = !1),
                        this.settings.closable || (this.settings.swipeToClose = !1),
                        (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                        this.settings.dynamic && (this.zoomFromOrigin = !1),
                        this.settings.container || (this.settings.container = document.body),
                        (this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length));
                }),
                (e.prototype.init = function () {
                    var e = this;
                    this.addSlideVideoInfo(this.galleryItems),
                        this.buildStructure(),
                        this.LGel.trigger(je, { instance: this }),
                        this.settings.keyPress && this.keyPress(),
                        setTimeout(function () {
                            e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
                        }, 50),
                        this.arrow(),
                        this.settings.mousewheel && this.mousewheel(),
                        this.settings.dynamic || this.openGalleryOnItemClick();
                }),
                (e.prototype.openGalleryOnItemClick = function () {
                    for (
                        var e = this,
                            t = function (t) {
                                var i = s.items[t],
                                    n = ke(i),
                                    a = $e.generateUUID();
                                n.attr("data-lg-id", a).on("click.lgcustom-item-" + a, function (s) {
                                    s.preventDefault();
                                    var n = e.settings.index || t;
                                    e.openGallery(n, i);
                                });
                            },
                            s = this,
                            i = 0;
                        i < this.items.length;
                        i++
                    )
                        t(i);
                }),
                (e.prototype.buildModules = function () {
                    var e = this;
                    this.settings.plugins.forEach(function (t) {
                        e.plugins.push(new t(e, ke));
                    });
                }),
                (e.prototype.validateLicense = function () {
                    this.settings.licenseKey
                        ? "0000-0000-000-0000" === this.settings.licenseKey && console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use")
                        : console.error("Please provide a valid license key");
                }),
                (e.prototype.getSlideItem = function (e) {
                    return ke(this.getSlideItemId(e));
                }),
                (e.prototype.getSlideItemId = function (e) {
                    return "#lg-item-" + this.lgId + "-" + e;
                }),
                (e.prototype.getIdName = function (e) {
                    return e + "-" + this.lgId;
                }),
                (e.prototype.getElementById = function (e) {
                    return ke("#" + this.getIdName(e));
                }),
                (e.prototype.manageSingleSlideClassName = function () {
                    this.galleryItems.length < 2 ? this.outer.addClass("lg-single-item") : this.outer.removeClass("lg-single-item");
                }),
                (e.prototype.buildStructure = function () {
                    var e = this;
                    if (!(this.$container && this.$container.get())) {
                        var t = "",
                            s = "";
                        this.settings.controls &&
                            (t =
                                '<button type="button" id="' +
                                this.getIdName("lg-prev") +
                                '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                                this.settings.prevHtml +
                                ' </button>\n                <button type="button" id="' +
                                this.getIdName("lg-next") +
                                '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                                this.settings.nextHtml +
                                " </button>"),
                            ".lg-item" !== this.settings.appendSubHtmlTo && (s = '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                        var i = "";
                        this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
                        var n = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "",
                            a = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "",
                            l = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : ""),
                            r = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="Close gallery" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "",
                            o = this.settings.showMaximizeIcon ? '<button type="button" aria-label="Toggle maximize" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "",
                            d =
                                '\n        <div class="' +
                                l +
                                '" id="' +
                                this.getIdName("lg-container") +
                                '" tabindex="-1" aria-modal="true" ' +
                                n +
                                " " +
                                a +
                                ' role="dialog"\n        >\n            <div id="' +
                                this.getIdName("lg-backdrop") +
                                '" class="lg-backdrop"></div>\n\n            <div id="' +
                                this.getIdName("lg-outer") +
                                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                                i +
                                ' ">\n\n              <div id="' +
                                this.getIdName("lg-content") +
                                '" class="lg-content">\n                <div id="' +
                                this.getIdName("lg-inner") +
                                '" class="lg-inner">\n                </div>\n                ' +
                                t +
                                '\n              </div>\n                <div id="' +
                                this.getIdName("lg-toolbar") +
                                '" class="lg-toolbar lg-group">\n                    ' +
                                o +
                                "\n                    " +
                                r +
                                "\n                    </div>\n                    " +
                                (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                                '\n                <div id="' +
                                this.getIdName("lg-components") +
                                '" class="lg-components">\n                    ' +
                                (".lg-sub-html" === this.settings.appendSubHtmlTo ? s : "") +
                                "\n                </div>\n            </div>\n        </div>\n        ";
                        ke(this.settings.container).css("position", "relative").append(d),
                            (this.outer = this.getElementById("lg-outer")),
                            (this.$lgComponents = this.getElementById("lg-components")),
                            (this.$backdrop = this.getElementById("lg-backdrop")),
                            (this.$container = this.getElementById("lg-container")),
                            (this.$inner = this.getElementById("lg-inner")),
                            (this.$content = this.getElementById("lg-content")),
                            (this.$toolbar = this.getElementById("lg-toolbar")),
                            this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                        var c = this.settings.mode + " ";
                        this.manageSingleSlideClassName(),
                            this.settings.enableDrag && (c += "lg-grab "),
                            this.outer.addClass(c),
                            this.$inner.css("transition-timing-function", this.settings.easing),
                            this.$inner.css("transition-duration", this.settings.speed + "ms"),
                            this.settings.download && this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'),
                            this.counter(),
                            ke(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function () {
                                e.refreshOnResize();
                            }),
                            this.hideBars(),
                            this.manageCloseGallery(),
                            this.toggleMaximize(),
                            this.initModules();
                    }
                }),
                (e.prototype.refreshOnResize = function () {
                    if (this.lgOpened) {
                        var e = this.galleryItems[this.index].__slideVideoInfo;
                        this.mediaContainerPosition = this.getMediaContainerPosition();
                        var t = this.mediaContainerPosition,
                            s = t.top,
                            i = t.bottom;
                        if (
                            ((this.currentImageSize = _e(this.items[this.index], this.outer, s + i, e && this.settings.videoMaxSize)),
                            e && this.resizeVideoSlide(this.index, this.currentImageSize),
                            this.zoomFromOrigin && !this.isDummyImageRemoved)
                        ) {
                            var n = this.getDummyImgStyles(this.currentImageSize);
                            this.outer.find(".lg-current .lg-dummy-img").first().attr("style", n);
                        }
                        this.LGel.trigger(Ye);
                    }
                }),
                (e.prototype.resizeVideoSlide = function (e, t) {
                    var s = this.getVideoContStyle(t);
                    this.getSlideItem(e).find(".lg-video-cont").attr("style", s);
                }),
                (e.prototype.updateSlides = function (e, t) {
                    if ((this.index > e.length - 1 && (this.index = e.length - 1), 1 === e.length && (this.index = 0), e.length)) {
                        var s = this.galleryItems[t].src;
                        (this.galleryItems = e), this.updateControls(), this.$inner.empty(), (this.currentItemsInDom = []);
                        var i = 0;
                        this.galleryItems.some(function (e, t) {
                            return e.src === s && ((i = t), !0);
                        }),
                            (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
                            this.loadContent(i, !0),
                            this.getSlideItem(i).addClass("lg-current"),
                            (this.index = i),
                            this.updateCurrentCounter(i),
                            this.LGel.trigger(Xe);
                    } else this.closeGallery();
                }),
                (e.prototype.getItems = function () {
                    if (((this.items = []), this.settings.dynamic)) return this.settings.dynamicEl || [];
                    if ("this" === this.settings.selector) this.items.push(this.el);
                    else if (this.settings.selector)
                        if ("string" == typeof this.settings.selector)
                            if (this.settings.selectWithin) {
                                var e = ke(this.settings.selectWithin);
                                this.items = e.find(this.settings.selector).get();
                            } else this.items = this.el.querySelectorAll(this.settings.selector);
                        else this.items = this.settings.selector;
                    else this.items = this.el.children;
                    return qe(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                }),
                (e.prototype.openGallery = function (e, t) {
                    var s = this;
                    if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
                        (this.lgOpened = !0), this.outer.get().focus(), this.outer.removeClass("lg-hide-items"), this.$container.addClass("lg-show");
                        var i = this.getItemsToBeInsertedToDom(e, e);
                        this.currentItemsInDom = i;
                        var n = "";
                        i.forEach(function (e) {
                            n = n + '<div id="' + e + '" class="lg-item"></div>';
                        }),
                            this.$inner.append(n),
                            this.addHtml(e);
                        var a = "";
                        this.mediaContainerPosition = this.getMediaContainerPosition();
                        var l = this.mediaContainerPosition,
                            r = l.top,
                            o = l.bottom;
                        this.settings.allowMediaOverlap || this.setMediaContainerPosition(r, o);
                        var d = this.galleryItems[e].__slideVideoInfo;
                        this.zoomFromOrigin && t && ((this.currentImageSize = _e(t, this.outer, r + o, d && this.settings.videoMaxSize)), (a = Pe(t, this.outer, r, o, this.currentImageSize))),
                            (this.zoomFromOrigin && a) || (this.outer.addClass(this.settings.startClass), this.getSlideItem(e).removeClass("lg-complete"));
                        var c = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                        setTimeout(function () {
                            s.outer.addClass("lg-components-open");
                        }, c),
                            (this.index = e),
                            this.LGel.trigger(Ke),
                            this.getSlideItem(e).addClass("lg-current"),
                            (this.lGalleryOn = !1),
                            (this.prevScrollTop = ke(window).scrollTop()),
                            setTimeout(function () {
                                if (s.zoomFromOrigin && a) {
                                    var t = s.getSlideItem(e);
                                    t.css("transform", a),
                                        setTimeout(function () {
                                            t.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", s.settings.startAnimationDuration + "ms"), s.outer.addClass("lg-zoom-from-image");
                                        }),
                                        setTimeout(function () {
                                            t.css("transform", "translate3d(0, 0, 0)");
                                        }, 100);
                                }
                                setTimeout(function () {
                                    s.$backdrop.addClass("in"), s.$container.addClass("lg-show-in");
                                }, 10),
                                    (s.zoomFromOrigin && a) ||
                                        setTimeout(function () {
                                            s.outer.addClass("lg-visible");
                                        }, s.settings.backdropDuration),
                                    s.slide(e, !1, !1, !1),
                                    s.LGel.trigger(Ze);
                            }),
                            document.body === this.settings.container && ke("html").addClass("lg-on");
                    }
                }),
                (e.prototype.getMediaContainerPosition = function () {
                    if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
                    var e = this.$toolbar.get().clientHeight || 0,
                        t = this.outer.find(".lg-components .lg-sub-html").get(),
                        s = this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
                        i = this.outer.find(".lg-thumb-outer").get();
                    return { top: e, bottom: (i ? i.clientHeight : 0) + s };
                }),
                (e.prototype.setMediaContainerPosition = function (e, t) {
                    void 0 === e && (e = 0), void 0 === t && (t = 0), this.$content.css("top", e + "px").css("bottom", t + "px");
                }),
                (e.prototype.hideBars = function () {
                    var e = this;
                    setTimeout(function () {
                        e.outer.removeClass("lg-hide-items"),
                            e.settings.hideBarsDelay > 0 &&
                                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                                    e.outer.removeClass("lg-hide-items"),
                                        clearTimeout(e.hideBarTimeout),
                                        (e.hideBarTimeout = setTimeout(function () {
                                            e.outer.addClass("lg-hide-items");
                                        }, e.settings.hideBarsDelay));
                                }),
                                e.outer.trigger("mousemove.lg"));
                    }, this.settings.showBarsAfter);
                }),
                (e.prototype.initPictureFill = function (e) {
                    if (this.settings.supportLegacyBrowser)
                        try {
                            picturefill({ elements: [e.get()] });
                        } catch (e) {
                            console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                        }
                }),
                (e.prototype.counter = function () {
                    if (this.settings.counter) {
                        var e =
                            '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                            this.getIdName("lg-counter-current") +
                            '" class="lg-counter-current">' +
                            (this.index + 1) +
                            ' </span> /\n                <span id="' +
                            this.getIdName("lg-counter-all") +
                            '" class="lg-counter-all">' +
                            this.galleryItems.length +
                            " </span></div>";
                        this.outer.find(this.settings.appendCounterTo).append(e);
                    }
                }),
                (e.prototype.addHtml = function (e) {
                    var t, s;
                    if ((this.galleryItems[e].subHtmlUrl ? (s = this.galleryItems[e].subHtmlUrl) : (t = this.galleryItems[e].subHtml), !s))
                        if (t) {
                            var i = t.substring(0, 1);
                            ("." !== i && "#" !== i) || (t = this.settings.subHtmlSelectorRelative && !this.settings.dynamic ? ke(this.items).eq(e).find(t).first().html() : ke(t).first().html());
                        } else t = "";
                    if (".lg-item" !== this.settings.appendSubHtmlTo) s ? this.outer.find(".lg-sub-html").load(s) : this.outer.find(".lg-sub-html").html(t);
                    else {
                        var n = ke(this.getSlideItemId(e));
                        s ? n.load(s) : n.append('<div class="lg-sub-html">' + t + "</div>");
                    }
                    null != t && ("" === t ? this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html") : this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html")), this.LGel.trigger(Ue, { index: e });
                }),
                (e.prototype.preload = function (e) {
                    for (var t = 1; t <= this.settings.preload && !(t >= this.galleryItems.length - e); t++) this.loadContent(e + t, !1);
                    for (var s = 1; s <= this.settings.preload && !(e - s < 0); s++) this.loadContent(e - s, !1);
                }),
                (e.prototype.getDummyImgStyles = function (e) {
                    return e ? "width:" + e.width + "px;\n                margin-left: -" + e.width / 2 + "px;\n                margin-top: -" + e.height / 2 + "px;\n                height:" + e.height + "px" : "";
                }),
                (e.prototype.getVideoContStyle = function (e) {
                    return e ? "width:" + e.width + "px;\n                height:" + e.height + "px" : "";
                }),
                (e.prototype.getDummyImageContent = function (e, t, s) {
                    var i;
                    if ((this.settings.dynamic || (i = ke(this.items).eq(t)), i)) {
                        var n = void 0;
                        if (!(n = this.settings.exThumbImage ? i.attr(this.settings.exThumbImage) : i.find("img").first().attr("src"))) return "";
                        var a = "<img " + s + ' style="' + this.getDummyImgStyles(this.currentImageSize) + '" class="lg-dummy-img" src="' + n + '" />';
                        return e.addClass("lg-first-slide"), this.outer.addClass("lg-first-slide-loading"), a;
                    }
                    return "";
                }),
                (e.prototype.setImgMarkup = function (e, t, s) {
                    var i = this.galleryItems[s],
                        n = i.alt,
                        a = i.srcset,
                        l = i.sizes,
                        r = i.sources,
                        o = n ? 'alt="' + n + '"' : "",
                        d = '<picture class="lg-img-wrap"> ' + (this.isFirstSlideWithZoomAnimation() ? this.getDummyImageContent(t, s, o) : De(s, e, o, a, l, r)) + "</picture>";
                    t.prepend(d);
                }),
                (e.prototype.onSlideObjectLoad = function (e, t, s, i) {
                    var n = e.find(".lg-object").first();
                    Ge(n.get()) || t
                        ? s()
                        : (n.on("load.lg error.lg", function () {
                              s && s();
                          }),
                          n.on("error.lg", function () {
                              i && i();
                          }));
                }),
                (e.prototype.onLgObjectLoad = function (e, t, s, i, n, a) {
                    var l = this;
                    this.onSlideObjectLoad(
                        e,
                        a,
                        function () {
                            l.triggerSlideItemLoad(e, t, s, i, n);
                        },
                        function () {
                            e.addClass("lg-complete lg-complete_"), e.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
                        }
                    );
                }),
                (e.prototype.triggerSlideItemLoad = function (e, t, s, i, n) {
                    var a = this,
                        l = this.galleryItems[t],
                        r = n && "video" === this.getSlideType(l) && !l.poster ? i : 0;
                    setTimeout(function () {
                        e.addClass("lg-complete lg-complete_"), a.LGel.trigger(Qe, { index: t, delay: s || 0, isFirstSlide: n });
                    }, r);
                }),
                (e.prototype.isFirstSlideWithZoomAnimation = function () {
                    return !(this.lGalleryOn || !this.zoomFromOrigin || !this.currentImageSize);
                }),
                (e.prototype.addSlideVideoInfo = function (e) {
                    var t = this;
                    e.forEach(function (e, s) {
                        (e.__slideVideoInfo = Fe(e.src, !!e.video, s)),
                            e.__slideVideoInfo && t.settings.loadYouTubePoster && !e.poster && e.__slideVideoInfo.youtube && (e.poster = "//img.youtube.com/vi/" + e.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg");
                    });
                }),
                (e.prototype.loadContent = function (e, t) {
                    var s = this,
                        i = this.galleryItems[e],
                        n = ke(this.getSlideItemId(e)),
                        a = i.poster,
                        l = i.srcset,
                        r = i.sizes,
                        o = i.sources,
                        d = i.src,
                        c = i.video,
                        p = c && "string" == typeof c ? JSON.parse(c) : c;
                    if (i.responsive) {
                        var h = i.responsive.split(",");
                        d = Be(h) || d;
                    }
                    var u = i.__slideVideoInfo,
                        g = "",
                        m = !!i.iframe,
                        f = !this.lGalleryOn,
                        v = 0;
                    if ((f && (v = this.zoomFromOrigin && this.currentImageSize ? this.settings.startAnimationDuration + 10 : this.settings.backdropDuration + 10), !n.hasClass("lg-loaded"))) {
                        if (u) {
                            var y = this.mediaContainerPosition,
                                b = y.top,
                                w = y.bottom,
                                S = _e(this.items[e], this.outer, b + w, u && this.settings.videoMaxSize);
                            g = this.getVideoContStyle(S);
                        }
                        if (m) {
                            var C = ze(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, d, i.iframeTitle);
                            n.prepend(C);
                        } else if (a) {
                            var E = "";
                            f && this.zoomFromOrigin && this.currentImageSize && (E = this.getDummyImageContent(n, e, ""));
                            C = He(a, E || "", g, u);
                            n.prepend(C);
                        } else if (u) {
                            C = '<div class="lg-video-cont " style="' + g + '"></div>';
                            n.prepend(C);
                        } else if ((this.setImgMarkup(d, n, e), l || o)) {
                            var x = n.find(".lg-object");
                            this.initPictureFill(x);
                        }
                        (a || u) && this.LGel.trigger(Re, { index: e, src: d, html5Video: p, hasPoster: !!a }), this.LGel.trigger(We, { index: e }), this.lGalleryOn && ".lg-item" === this.settings.appendSubHtmlTo && this.addHtml(e);
                    }
                    var T = 0;
                    v && !ke(document.body).hasClass("lg-from-hash") && (T = v),
                        this.isFirstSlideWithZoomAnimation() &&
                            (setTimeout(function () {
                                n.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                            }, this.settings.startAnimationDuration + 100),
                            n.hasClass("lg-loaded") ||
                                setTimeout(function () {
                                    if ("image" === s.getSlideType(i) && (n.find(".lg-img-wrap").append(De(e, d, "", l, r, i.sources)), l || o)) {
                                        var t = n.find(".lg-object");
                                        s.initPictureFill(t);
                                    }
                                    ("image" === s.getSlideType(i) || ("video" === s.getSlideType(i) && a)) &&
                                        (s.onLgObjectLoad(n, e, v, T, !0, !1),
                                        s.onSlideObjectLoad(
                                            n,
                                            !(!u || !u.html5 || a),
                                            function () {
                                                s.loadContentOnFirstSlideLoad(e, n, T);
                                            },
                                            function () {
                                                s.loadContentOnFirstSlideLoad(e, n, T);
                                            }
                                        ));
                                }, this.settings.startAnimationDuration + 100)),
                        n.addClass("lg-loaded"),
                        (this.isFirstSlideWithZoomAnimation() && ("video" !== this.getSlideType(i) || a)) || this.onLgObjectLoad(n, e, v, T, f, !(!u || !u.html5 || a)),
                        (this.zoomFromOrigin && this.currentImageSize) ||
                            !n.hasClass("lg-complete_") ||
                            this.lGalleryOn ||
                            setTimeout(function () {
                                n.addClass("lg-complete");
                            }, this.settings.backdropDuration),
                        (this.lGalleryOn = !0),
                        !0 === t &&
                            (n.hasClass("lg-complete_")
                                ? this.preload(e)
                                : n
                                      .find(".lg-object")
                                      .first()
                                      .on("load.lg error.lg", function () {
                                          s.preload(e);
                                      }));
                }),
                (e.prototype.loadContentOnFirstSlideLoad = function (e, t, s) {
                    var i = this;
                    setTimeout(function () {
                        t.find(".lg-dummy-img").remove(), t.removeClass("lg-first-slide"), i.outer.removeClass("lg-first-slide-loading"), (i.isDummyImageRemoved = !0), i.preload(e);
                    }, s + 300);
                }),
                (e.prototype.getItemsToBeInsertedToDom = function (e, t, s) {
                    var i = this;
                    void 0 === s && (s = 0);
                    var n = [],
                        a = Math.max(s, 3);
                    a = Math.min(a, this.galleryItems.length);
                    var l = "lg-item-" + this.lgId + "-" + t;
                    if (this.galleryItems.length <= 3)
                        return (
                            this.galleryItems.forEach(function (e, t) {
                                n.push("lg-item-" + i.lgId + "-" + t);
                            }),
                            n
                        );
                    if (e < (this.galleryItems.length - 1) / 2) {
                        for (var r = e; r > e - a / 2 && r >= 0; r--) n.push("lg-item-" + this.lgId + "-" + r);
                        var o = n.length;
                        for (r = 0; r < a - o; r++) n.push("lg-item-" + this.lgId + "-" + (e + r + 1));
                    } else {
                        for (r = e; r <= this.galleryItems.length - 1 && r < e + a / 2; r++) n.push("lg-item-" + this.lgId + "-" + r);
                        for (o = n.length, r = 0; r < a - o; r++) n.push("lg-item-" + this.lgId + "-" + (e - r - 1));
                    }
                    return (
                        this.settings.loop && (e === this.galleryItems.length - 1 ? n.push("lg-item-" + this.lgId + "-0") : 0 === e && n.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1))),
                        -1 === n.indexOf(l) && n.push("lg-item-" + this.lgId + "-" + t),
                        n
                    );
                }),
                (e.prototype.organizeSlideItems = function (e, t) {
                    var s = this,
                        i = this.getItemsToBeInsertedToDom(e, t, this.settings.numberOfSlideItemsInDom);
                    return (
                        i.forEach(function (e) {
                            -1 === s.currentItemsInDom.indexOf(e) && s.$inner.append('<div id="' + e + '" class="lg-item"></div>');
                        }),
                        this.currentItemsInDom.forEach(function (e) {
                            -1 === i.indexOf(e) && ke("#" + e).remove();
                        }),
                        i
                    );
                }),
                (e.prototype.getPreviousSlideIndex = function () {
                    var e = 0;
                    try {
                        var t = this.outer.find(".lg-current").first().attr("id");
                        e = parseInt(t.split("-")[3]) || 0;
                    } catch (t) {
                        e = 0;
                    }
                    return e;
                }),
                (e.prototype.setDownloadValue = function (e) {
                    if (this.settings.download) {
                        var t = this.galleryItems[e];
                        if (!1 === t.downloadUrl || "false" === t.downloadUrl) this.outer.addClass("lg-hide-download");
                        else {
                            var s = this.getElementById("lg-download");
                            this.outer.removeClass("lg-hide-download"), s.attr("href", t.downloadUrl || t.src), t.download && s.attr("download", t.download);
                        }
                    }
                }),
                (e.prototype.makeSlideAnimation = function (e, t, s) {
                    var i = this;
                    this.lGalleryOn && s.addClass("lg-slide-progress"),
                        setTimeout(
                            function () {
                                i.outer.addClass("lg-no-trans"),
                                    i.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide"),
                                    "prev" === e ? (t.addClass("lg-prev-slide"), s.addClass("lg-next-slide")) : (t.addClass("lg-next-slide"), s.addClass("lg-prev-slide")),
                                    setTimeout(function () {
                                        i.outer.find(".lg-item").removeClass("lg-current"), t.addClass("lg-current"), i.outer.removeClass("lg-no-trans");
                                    }, 50);
                            },
                            this.lGalleryOn ? this.settings.slideDelay : 0
                        );
                }),
                (e.prototype.slide = function (e, t, s, i) {
                    var n = this,
                        a = this.getPreviousSlideIndex();
                    if (((this.currentItemsInDom = this.organizeSlideItems(e, a)), !this.lGalleryOn || a !== e)) {
                        var l = this.galleryItems.length;
                        if (!this.lgBusy) {
                            this.settings.counter && this.updateCurrentCounter(e);
                            var r = this.getSlideItem(e),
                                o = this.getSlideItem(a),
                                d = this.galleryItems[e],
                                c = d.__slideVideoInfo;
                            if ((this.outer.attr("data-lg-slide-type", this.getSlideType(d)), this.setDownloadValue(e), c)) {
                                var p = this.mediaContainerPosition,
                                    h = p.top,
                                    u = p.bottom,
                                    g = _e(this.items[e], this.outer, h + u, c && this.settings.videoMaxSize);
                                this.resizeVideoSlide(e, g);
                            }
                            if (
                                (this.LGel.trigger(Je, { prevIndex: a, index: e, fromTouch: !!t, fromThumb: !!s }),
                                (this.lgBusy = !0),
                                clearTimeout(this.hideBarTimeout),
                                this.arrowDisable(e),
                                i || (e < a ? (i = "prev") : e > a && (i = "next")),
                                t)
                            ) {
                                this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                                var m = void 0,
                                    f = void 0;
                                l > 2 ? ((m = e - 1), (f = e + 1), ((0 === e && a === l - 1) || (e === l - 1 && 0 === a)) && ((f = 0), (m = l - 1))) : ((m = 0), (f = 1)),
                                    "prev" === i ? this.getSlideItem(f).addClass("lg-next-slide") : this.getSlideItem(m).addClass("lg-prev-slide"),
                                    r.addClass("lg-current");
                            } else this.makeSlideAnimation(i, r, o);
                            this.lGalleryOn
                                ? setTimeout(function () {
                                      n.loadContent(e, !0), ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(e);
                                  }, this.settings.speed + 50 + (t ? 0 : this.settings.slideDelay))
                                : this.loadContent(e, !0),
                                setTimeout(function () {
                                    (n.lgBusy = !1), o.removeClass("lg-slide-progress"), n.LGel.trigger(et, { prevIndex: a, index: e, fromTouch: t, fromThumb: s });
                                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (t ? 0 : this.settings.slideDelay));
                        }
                        this.index = e;
                    }
                }),
                (e.prototype.updateCurrentCounter = function (e) {
                    this.getElementById("lg-counter-current").html(e + 1 + "");
                }),
                (e.prototype.updateCounterTotal = function () {
                    this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
                }),
                (e.prototype.getSlideType = function (e) {
                    return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
                }),
                (e.prototype.touchMove = function (e, t, s) {
                    var i = t.pageX - e.pageX,
                        n = t.pageY - e.pageY,
                        a = !1;
                    if ((this.swipeDirection ? (a = !0) : Math.abs(i) > 15 ? ((this.swipeDirection = "horizontal"), (a = !0)) : Math.abs(n) > 15 && ((this.swipeDirection = "vertical"), (a = !0)), a)) {
                        var l = this.getSlideItem(this.index);
                        if ("horizontal" === this.swipeDirection) {
                            null == s || s.preventDefault(), this.outer.addClass("lg-dragging"), this.setTranslate(l, i, 0);
                            var r = l.get().offsetWidth,
                                o = (15 * r) / 100 - Math.abs((10 * i) / 100);
                            this.setTranslate(this.outer.find(".lg-prev-slide").first(), -r + i - o, 0), this.setTranslate(this.outer.find(".lg-next-slide").first(), r + i + o, 0);
                        } else if ("vertical" === this.swipeDirection && this.settings.swipeToClose) {
                            null == s || s.preventDefault(), this.$container.addClass("lg-dragging-vertical");
                            var d = 1 - Math.abs(n) / window.innerHeight;
                            this.$backdrop.css("opacity", d);
                            var c = 1 - Math.abs(n) / (2 * window.innerWidth);
                            this.setTranslate(l, 0, n, c, c), Math.abs(n) > 100 && this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                        }
                    }
                }),
                (e.prototype.touchEnd = function (e, t, s) {
                    var i,
                        n = this;
                    "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
                        setTimeout(function () {
                            n.$container.removeClass("lg-dragging-vertical"), n.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                            var a = !0;
                            if ("horizontal" === n.swipeDirection) {
                                i = e.pageX - t.pageX;
                                var l = Math.abs(e.pageX - t.pageX);
                                i < 0 && l > n.settings.swipeThreshold ? (n.goToNextSlide(!0), (a = !1)) : i > 0 && l > n.settings.swipeThreshold && (n.goToPrevSlide(!0), (a = !1));
                            } else if ("vertical" === n.swipeDirection) {
                                if (((i = Math.abs(e.pageY - t.pageY)), n.settings.closable && n.settings.swipeToClose && i > 100)) return void n.closeGallery();
                                n.$backdrop.css("opacity", 1);
                            }
                            if ((n.outer.find(".lg-item").removeAttr("style"), a && Math.abs(e.pageX - t.pageX) < 5)) {
                                var r = ke(s.target);
                                n.isPosterElement(r) && n.LGel.trigger(tt);
                            }
                            n.swipeDirection = void 0;
                        }),
                        setTimeout(function () {
                            n.outer.hasClass("lg-dragging") || "lg-slide" === n.settings.mode || n.outer.removeClass("lg-slide");
                        }, this.settings.speed + 100);
                }),
                (e.prototype.enableSwipe = function () {
                    var e = this,
                        t = {},
                        s = {},
                        i = !1,
                        n = !1;
                    this.settings.enableSwipe &&
                        (this.$inner.on("touchstart.lg", function (s) {
                            e.dragOrSwipeEnabled = !0;
                            var i = e.getSlideItem(e.index);
                            (!ke(s.target).hasClass("lg-item") && !i.get().contains(s.target)) ||
                                e.outer.hasClass("lg-zoomed") ||
                                e.lgBusy ||
                                1 !== s.targetTouches.length ||
                                ((n = !0), (e.touchAction = "swipe"), e.manageSwipeClass(), (t = { pageX: s.targetTouches[0].pageX, pageY: s.targetTouches[0].pageY }));
                        }),
                        this.$inner.on("touchmove.lg", function (a) {
                            n && "swipe" === e.touchAction && 1 === a.targetTouches.length && ((s = { pageX: a.targetTouches[0].pageX, pageY: a.targetTouches[0].pageY }), e.touchMove(t, s, a), (i = !0));
                        }),
                        this.$inner.on("touchend.lg", function (a) {
                            if ("swipe" === e.touchAction) {
                                if (i) (i = !1), e.touchEnd(s, t, a);
                                else if (n) {
                                    var l = ke(a.target);
                                    e.isPosterElement(l) && e.LGel.trigger(tt);
                                }
                                (e.touchAction = void 0), (n = !1);
                            }
                        }));
                }),
                (e.prototype.enableDrag = function () {
                    var e = this,
                        t = {},
                        s = {},
                        i = !1,
                        n = !1;
                    this.settings.enableDrag &&
                        (this.outer.on("mousedown.lg", function (s) {
                            e.dragOrSwipeEnabled = !0;
                            var n = e.getSlideItem(e.index);
                            (ke(s.target).hasClass("lg-item") || n.get().contains(s.target)) &&
                                (e.outer.hasClass("lg-zoomed") ||
                                    e.lgBusy ||
                                    (s.preventDefault(),
                                    e.lgBusy ||
                                        (e.manageSwipeClass(),
                                        (t = { pageX: s.pageX, pageY: s.pageY }),
                                        (i = !0),
                                        (e.outer.get().scrollLeft += 1),
                                        (e.outer.get().scrollLeft -= 1),
                                        e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                                        e.LGel.trigger(st))));
                        }),
                        ke(window).on("mousemove.lg.global" + this.lgId, function (a) {
                            i && e.lgOpened && ((n = !0), (s = { pageX: a.pageX, pageY: a.pageY }), e.touchMove(t, s), e.LGel.trigger(it));
                        }),
                        ke(window).on("mouseup.lg.global" + this.lgId, function (a) {
                            if (e.lgOpened) {
                                var l = ke(a.target);
                                n ? ((n = !1), e.touchEnd(s, t, a), e.LGel.trigger(nt)) : e.isPosterElement(l) && e.LGel.trigger(tt), i && ((i = !1), e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                            }
                        }));
                }),
                (e.prototype.triggerPosterClick = function () {
                    var e = this;
                    this.$inner.on("click.lg", function (t) {
                        !e.dragOrSwipeEnabled && e.isPosterElement(ke(t.target)) && e.LGel.trigger(tt);
                    });
                }),
                (e.prototype.manageSwipeClass = function () {
                    var e = this.index + 1,
                        t = this.index - 1;
                    this.settings.loop && this.galleryItems.length > 2 && (0 === this.index ? (t = this.galleryItems.length - 1) : this.index === this.galleryItems.length - 1 && (e = 0)),
                        this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide"),
                        t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
                        this.getSlideItem(e).addClass("lg-next-slide");
                }),
                (e.prototype.goToNextSlide = function (e) {
                    var t = this,
                        s = this.settings.loop;
                    e && this.galleryItems.length < 3 && (s = !1),
                        this.lgBusy ||
                            (this.index + 1 < this.galleryItems.length
                                ? (this.index++, this.LGel.trigger(at, { index: this.index }), this.slide(this.index, !!e, !1, "next"))
                                : s
                                ? ((this.index = 0), this.LGel.trigger(at, { index: this.index }), this.slide(this.index, !!e, !1, "next"))
                                : this.settings.slideEndAnimation &&
                                  !e &&
                                  (this.outer.addClass("lg-right-end"),
                                  setTimeout(function () {
                                      t.outer.removeClass("lg-right-end");
                                  }, 400)));
                }),
                (e.prototype.goToPrevSlide = function (e) {
                    var t = this,
                        s = this.settings.loop;
                    e && this.galleryItems.length < 3 && (s = !1),
                        this.lgBusy ||
                            (this.index > 0
                                ? (this.index--, this.LGel.trigger(lt, { index: this.index, fromTouch: e }), this.slide(this.index, !!e, !1, "prev"))
                                : s
                                ? ((this.index = this.galleryItems.length - 1), this.LGel.trigger(lt, { index: this.index, fromTouch: e }), this.slide(this.index, !!e, !1, "prev"))
                                : this.settings.slideEndAnimation &&
                                  !e &&
                                  (this.outer.addClass("lg-left-end"),
                                  setTimeout(function () {
                                      t.outer.removeClass("lg-left-end");
                                  }, 400)));
                }),
                (e.prototype.keyPress = function () {
                    var e = this;
                    ke(window).on("keydown.lg.global" + this.lgId, function (t) {
                        e.lgOpened &&
                            !0 === e.settings.escKey &&
                            27 === t.keyCode &&
                            (t.preventDefault(), e.settings.allowMediaOverlap && e.outer.hasClass("lg-can-toggle") && e.outer.hasClass("lg-components-open") ? e.outer.removeClass("lg-components-open") : e.closeGallery()),
                            e.lgOpened && e.galleryItems.length > 1 && (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()), 39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
                    });
                }),
                (e.prototype.arrow = function () {
                    var e = this;
                    this.getElementById("lg-prev").on("click.lg", function () {
                        e.goToPrevSlide();
                    }),
                        this.getElementById("lg-next").on("click.lg", function () {
                            e.goToNextSlide();
                        });
                }),
                (e.prototype.arrowDisable = function (e) {
                    if (!this.settings.loop && this.settings.hideControlOnEnd) {
                        var t = this.getElementById("lg-prev"),
                            s = this.getElementById("lg-next");
                        e + 1 === this.galleryItems.length ? s.attr("disabled", "disabled").addClass("disabled") : s.removeAttr("disabled").removeClass("disabled"),
                            0 === e ? t.attr("disabled", "disabled").addClass("disabled") : t.removeAttr("disabled").removeClass("disabled");
                    }
                }),
                (e.prototype.setTranslate = function (e, t, s, i, n) {
                    void 0 === i && (i = 1), void 0 === n && (n = 1), e.css("transform", "translate3d(" + t + "px, " + s + "px, 0px) scale3d(" + i + ", " + n + ", 1)");
                }),
                (e.prototype.mousewheel = function () {
                    var e = this,
                        t = 0;
                    this.outer.on("wheel.lg", function (s) {
                        if (s.deltaY && !(e.galleryItems.length < 2)) {
                            s.preventDefault();
                            var i = new Date().getTime();
                            i - t < 1e3 || ((t = i), s.deltaY > 0 ? e.goToNextSlide() : s.deltaY < 0 && e.goToPrevSlide());
                        }
                    });
                }),
                (e.prototype.isSlideElement = function (e) {
                    return e.hasClass("lg-outer") || e.hasClass("lg-item") || e.hasClass("lg-img-wrap");
                }),
                (e.prototype.isPosterElement = function (e) {
                    var t = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                    return e.hasClass("lg-video-poster") || e.hasClass("lg-video-play-button") || (t && t.contains(e.get()));
                }),
                (e.prototype.toggleMaximize = function () {
                    var e = this;
                    this.getElementById("lg-maximize").on("click.lg", function () {
                        e.$container.toggleClass("lg-inline"), e.refreshOnResize();
                    });
                }),
                (e.prototype.invalidateItems = function () {
                    for (var e = 0; e < this.items.length; e++) {
                        var t = ke(this.items[e]);
                        t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
                    }
                }),
                (e.prototype.manageCloseGallery = function () {
                    var e = this;
                    if (this.settings.closable) {
                        var t = !1;
                        this.getElementById("lg-close").on("click.lg", function () {
                            e.closeGallery();
                        }),
                            this.settings.closeOnTap &&
                                (this.outer.on("mousedown.lg", function (s) {
                                    var i = ke(s.target);
                                    t = !!e.isSlideElement(i);
                                }),
                                this.outer.on("mousemove.lg", function () {
                                    t = !1;
                                }),
                                this.outer.on("mouseup.lg", function (s) {
                                    var i = ke(s.target);
                                    e.isSlideElement(i) && t && (e.outer.hasClass("lg-dragging") || e.closeGallery());
                                }));
                    }
                }),
                (e.prototype.closeGallery = function (e) {
                    var t = this;
                    if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
                    this.LGel.trigger(rt), ke(window).scrollTop(this.prevScrollTop);
                    var s,
                        i = this.items[this.index];
                    if (this.zoomFromOrigin && i) {
                        var n = this.mediaContainerPosition,
                            a = n.top,
                            l = n.bottom,
                            r = this.galleryItems[this.index],
                            o = r.__slideVideoInfo,
                            d = r.poster,
                            c = _e(i, this.outer, a + l, o && d && this.settings.videoMaxSize);
                        s = Pe(i, this.outer, a, l, c);
                    }
                    this.zoomFromOrigin && s
                        ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                          this.getSlideItem(this.index)
                              .addClass("lg-start-end-progress")
                              .css("transition-duration", this.settings.startAnimationDuration + "ms")
                              .css("transform", s))
                        : (this.outer.addClass("lg-hide-items"), this.outer.removeClass("lg-zoom-from-image")),
                        this.destroyModules(),
                        (this.lGalleryOn = !1),
                        (this.isDummyImageRemoved = !1),
                        (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                        clearTimeout(this.hideBarTimeout),
                        (this.hideBarTimeout = !1),
                        ke("html").removeClass("lg-on"),
                        this.outer.removeClass("lg-visible lg-components-open"),
                        this.$backdrop.removeClass("in").css("opacity", 0);
                    var p = this.zoomFromOrigin && s ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                    return (
                        this.$container.removeClass("lg-show-in"),
                        setTimeout(function () {
                            t.zoomFromOrigin && s && t.outer.removeClass("lg-zoom-from-image"),
                                t.$container.removeClass("lg-show"),
                                t.$backdrop.removeAttr("style").css("transition-duration", t.settings.backdropDuration + "ms"),
                                t.outer.removeClass("lg-closing " + t.settings.startClass),
                                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                                t.$inner.empty(),
                                t.lgOpened && t.LGel.trigger(ot, { instance: t }),
                                t.outer.get() && t.outer.get().blur(),
                                (t.lgOpened = !1);
                        }, p + 100),
                        p + 100
                    );
                }),
                (e.prototype.initModules = function () {
                    this.plugins.forEach(function (e) {
                        try {
                            e.init();
                        } catch (e) {
                            console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                        }
                    });
                }),
                (e.prototype.destroyModules = function (e) {
                    this.plugins.forEach(function (t) {
                        try {
                            e ? t.destroy() : t.closeGallery && t.closeGallery();
                        } catch (e) {
                            console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                        }
                    });
                }),
                (e.prototype.refresh = function (e) {
                    this.settings.dynamic || this.invalidateItems(), (this.galleryItems = e || this.getItems()), this.updateControls(), this.openGalleryOnItemClick(), this.LGel.trigger(Xe);
                }),
                (e.prototype.updateControls = function () {
                    this.addSlideVideoInfo(this.galleryItems), this.updateCounterTotal(), this.manageSingleSlideClassName();
                }),
                (e.prototype.destroy = function () {
                    var e = this,
                        t = this.closeGallery(!0);
                    return (
                        setTimeout(function () {
                            e.destroyModules(!0), e.settings.dynamic || e.invalidateItems(), ke(window).off(".lg.global" + e.lgId), e.LGel.off(".lg"), e.$container.remove();
                        }, t),
                        t
                    );
                }),
                e
            );
        })();
    const pt = function (e, t) {
            return new ct(e, t);
        },
        ht = document.querySelectorAll("[data-gallery]");
    ht.length &&
        ht.forEach((e) => {
            pt(e, { licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E", speed: 500 });
        }),
        (function () {
            let e = document.querySelector(".video-module__item"),
                t = document.querySelectorAll(".video-module__video-track"),
                s = document.querySelector(".video-module__timeline"),
                i = document.querySelector(".video-module__play"),
                n = document.querySelector(".video-module__rewind"),
                a = document.querySelector(".video-module__forward"),
                l = document.querySelector(".video-module__volume");
            i &&
                i.addEventListener(
                    "click",
                    function (t) {
                        var videoPlay;
                        e.paused
                            ? (e.play(), e.parentElement.classList.add("playing"), e.parentElement.classList.remove("paused"))
                            : (e.pause(), e.parentElement.classList.remove("playing"), e.parentElement.classList.add("paused"), clearInterval(videoPlay)),
                            (videoPlay = setInterval(function (t) {
                                let i = Math.round(e.currentTime),
                                    n = Math.round(e.duration);
                                s.style.width = (100 * i) / n + "%";
                            }, 10));
                    },
                    !1
                ),
                t.forEach((e) =>
                    e.addEventListener("click", function (e) {
                        var t = null == e.offsetX ? e.layerX : e.offsetX,
                            s = e.currentTarget.closest(".video-module"),
                            i = s.querySelector(".video-module__video-track").offsetWidth,
                            n = s.querySelector(".video-module__item").duration;
                        s.querySelector(".video-module__item").currentTime = (t * n) / i;
                    })
                ),
                e &&
                    e.addEventListener(
                        "ended",
                        function (t) {
                            (e.currentTime = 0), e.parentElement.classList.remove("playing");
                        },
                        !1
                    ),
                l &&
                    l.addEventListener(
                        "input",
                        function (t) {
                            e.volume = l.value;
                        },
                        !1
                    ),
                n &&
                    n.addEventListener("click", function (t) {
                        e.currentTime -= 5;
                    }),
                a &&
                    a.addEventListener("click", function (t) {
                        e.currentTime += 5;
                    });
        })();
    let ut = document.getElementsByClassName("menu__link"),
        gt = document.getElementsByClassName("footer__link"),
        mt = document.location.href;
    for (let e = 0; e < ut.length; e++) mt == ut[e].href && ut[e].classList.add("active-menu");
    for (let e = 0; e < gt.length; e++) mt == gt[e].href && gt[e].classList.add("active-menu");
    const ft = document.documentElement;
    document.addEventListener("click", function (e) {
        !e.target.closest(".header__menu") && innerWidth < 992 && (ft.classList.remove("menu-open"), ft.classList.remove("lock"));
    }),
        (window.FLS = !0),
        (function (e) {
            let t = new Image();
            (t.onload = t.onerror = function () {
                e(2 == t.height);
            }),
                (t.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (e) {
            let t = !0 === e ? "webp" : "no-webp";
            document.documentElement.classList.add(t);
        }),
        s.any() && document.documentElement.classList.add("touch"),
        (function () {
            let e = document.querySelector(".icon-menu");
            e &&
                e.addEventListener("click", function (e) {
                    l && (r(), document.documentElement.classList.toggle("menu-open"));
                });
        })(),
        (function () {
            if (document.querySelectorAll("[data-fullscreen]").length && s.any()) {
                function e() {
                    let e = 0.01 * window.innerHeight;
                    document.documentElement.style.setProperty("--vh", `${e}px`);
                }
                window.addEventListener("resize", e), e();
            }
        })(),
        (function () {
            const e = document.querySelectorAll("[data-tabs]");
            let t = [];
            if (e.length > 0) {
                const i = location.hash.replace("#", "");
                i.startsWith("tab-") && (t = i.replace("tab-", "").split("-")),
                    e.forEach((e, s) => {
                        e.classList.add("_tab-init"),
                            e.setAttribute("data-tabs-index", s),
                            e.addEventListener("click", a),
                            (function (e) {
                                const s = e.querySelectorAll("[data-tabs-titles]>*"),
                                    i = e.querySelectorAll("[data-tabs-body]>*"),
                                    n = e.dataset.tabsIndex,
                                    a = t[0] == n;
                                if (a) {
                                    e.querySelector("[data-tabs-titles]>._tab-active").classList.remove("_tab-active");
                                }
                                i.length > 0 &&
                                    i.forEach((e, i) => {
                                        s[i].setAttribute("data-tabs-title", ""), e.setAttribute("data-tabs-item", ""), a && i == t[1] && s[i].classList.add("_tab-active"), (e.hidden = !s[i].classList.contains("_tab-active"));
                                    });
                            })(e);
                    });
                let n = g(e, "tabs");
                n &&
                    n.length &&
                    n.forEach((e) => {
                        e.matchMedia.addEventListener("change", function () {
                            s(e.itemsArray, e.matchMedia);
                        }),
                            s(e.itemsArray, e.matchMedia);
                    });
            }
            function s(e, t) {
                e.forEach((e) => {
                    const s = (e = e.item).querySelector("[data-tabs-titles]"),
                        i = e.querySelectorAll("[data-tabs-title]"),
                        n = e.querySelector("[data-tabs-body]");
                    e.querySelectorAll("[data-tabs-item]").forEach((a, l) => {
                        t.matches ? (n.append(i[l]), n.append(a), e.classList.toggle("_tab-spoller")) : (s.append(i[l]), e.classList.remove("_tab-spoller"));
                    });
                });
            }
            function a(e) {
                const t = e.target;
                if (t.closest("[data-tabs-title]")) {
                    const s = t.closest("[data-tabs-title]"),
                        a = s.closest("[data-tabs]");
                    if (!s.classList.contains("_tab-active") && !a.querySelectorAll("._slide").length) {
                        const e = a.querySelector("[data-tabs-title]._tab-active");
                        e && e.classList.remove("_tab-active"),
                            s.classList.add("_tab-active"),
                            (function (e) {
                                const t = e.querySelectorAll("[data-tabs-title]"),
                                    s = e.querySelectorAll("[data-tabs-item]"),
                                    a = e.dataset.tabsIndex,
                                    l = (function (e) {
                                        if (e.hasAttribute("data-tabs-animate")) return e.dataset.tabsAnimate > 0 ? e.dataset.tabsAnimate : 1e3;
                                    })(e);
                                s.length > 0 &&
                                    s.forEach((e, s) => {
                                        t[s].classList.contains("_tab-active") ? (l ? n(e, l) : (e.hidden = !1), e.closest(".popup") || (location.hash = `tab-${a}-${s}`)) : l ? i(e, l) : (e.hidden = !0);
                                    });
                            })(a);
                    }
                    e.preventDefault();
                }
            }
        })(),
        (function () {
            const e = document.querySelectorAll("[data-showmore]");
            let t, s;
            function a(e) {
                e.forEach((e) => {
                    l(e.itemsArray, e.matchMedia);
                });
            }
            function l(e, t) {
                e.forEach((e) => {
                    !(function (e, t = !1) {
                        const s = (e = t ? e.item : e).querySelector("[data-showmore-content]"),
                            a = e.querySelector("[data-showmore-button]"),
                            l = r(e, s);
                        (t.matches || !t) &&
                        l <
                            (function (e) {
                                let t = e.offsetHeight;
                                e.style.removeProperty("height");
                                let s = e.offsetHeight;
                                return (e.style.height = `${t}px`), s;
                            })(s)
                            ? (i(s, 0, l), (a.hidden = !1))
                            : (n(s, 0, l), (a.hidden = !0));
                    })(e, t);
                });
            }
            function r(e, t) {
                let s = 0;
                if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
                    const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
                        i = t.children;
                    for (let t = 1; t < i.length; t++) {
                        if (((s += i[t - 1].offsetHeight), t === e)) break;
                    }
                } else {
                    s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
                }
                return s;
            }
            function o(e) {
                const o = e.target,
                    d = e.type;
                if ("click" === d) {
                    if (o.closest("[data-showmore-button]")) {
                        const e = o.closest("[data-showmore-button]").closest("[data-showmore]"),
                            t = e.querySelector("[data-showmore-content]"),
                            s = e.dataset.showmoreButton ? e.dataset.showmoreButton : "400",
                            a = r(e, t);
                        t.classList.contains("_slide") || (e.classList.contains("_showmore-active") ? i(t, s, a) : n(t, s, a), e.classList.toggle("_showmore-active"));
                    }
                } else "resize" === d && (t.length && l(t), s.length && a(s));
            }
            e.length &&
                ((t = Array.from(e).filter(function (e, t, s) {
                    return !e.dataset.showmoreMedia;
                })),
                t.length && l(t),
                document.addEventListener("click", o),
                window.addEventListener("resize", o),
                (s = g(e, "showmoreMedia")),
                s &&
                    s.length &&
                    (s.forEach((e) => {
                        e.matchMedia.addEventListener("change", function () {
                            l(e.itemsArray, e.matchMedia);
                        });
                    }),
                    a(s)));
        })(),
        new t({}),
        (v.selectModule = new f({})),
        new Le({}),
        (function () {
            function e(e) {
                if ("click" === e.type && innerWidth < 768) {
                    const t = e.target;
                    if (t.closest("[data-goto]")) {
                        const s = t.closest("[data-goto]"),
                            i = s.dataset.goto ? s.dataset.goto : "",
                            n = !!s.hasAttribute("data-goto-header"),
                            a = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                        m(i, n, a), e.preventDefault();
                    }
                } else if ("watcherCallback" === e.type && e.detail) {
                    const t = e.detail.entry,
                        s = t.target;
                    if ("navigator" === s.dataset.watch) {
                        const e = s.id,
                            i = (document.querySelector("[data-goto]._navigator-active"), document.querySelector(`[data-goto="${e}"]`));
                        t.isIntersecting ? i && i.classList.add("_navigator-active") : i && i.classList.remove("_navigator-active");
                    }
                }
            }
            document.addEventListener("click", e), document.addEventListener("watcherCallback", e);
        })(),
        (function () {
            Ie = !0;
            const e = document.querySelector("header.header"),
                t = e.hasAttribute("data-scroll-show"),
                s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
                i = e.dataset.scroll ? e.dataset.scroll : 1;
            let n,
                a = 0;
            document.addEventListener("windowScroll", function (l) {
                const r = window.scrollY;
                clearTimeout(n),
                    r >= i
                        ? (!e.classList.contains("_header-scroll") && e.classList.add("_header-scroll"),
                          t &&
                              (r > a ? e.classList.contains("_header-show") && e.classList.remove("_header-show") : !e.classList.contains("_header-show") && e.classList.add("_header-show"),
                              (n = setTimeout(() => {
                                  !e.classList.contains("_header-show") && e.classList.add("_header-show");
                              }, s))))
                        : (e.classList.contains("_header-scroll") && e.classList.remove("_header-scroll"), t && e.classList.contains("_header-show") && e.classList.remove("_header-show")),
                    (a = r <= 0 ? 0 : r);
            });
        })();
})();
