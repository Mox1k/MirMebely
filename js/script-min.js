$(function() {
    var App;
    window.userEventHandler = function(event, data = {}) {
        for (var i in console.log("event:" + event), "undefined" != typeof VK && (console.log("vk pixel event: " + event), VK.Retargeting.Event(event)), "undefined" != typeof fbq && (console.log("fb pixel event: " + event), fbq("trackCustom", event)), window)
            if (new RegExp(/yaCounter/).test(i)) {
                var ya_counter_id = i;
                ya_counter_id = eval(ya_counter_id), ya_counter_id.reachGoal(event), console.log("ym event: " + event), "add" != event && "order" != event || (window.dataLayer = window.dataLayer || [], window.dataLayer.push(data))
            } return "undefined" != typeof ga && (console.log("ga event: " + event), "add" == event && ga("send", {
            hitType: "event",
            eventCategory: "Items",
            eventAction: "Add"
        }), "order" == event && ga("send", {
            hitType: "event",
            eventCategory: "Items",
            eventAction: "Order"
        })), !0
    }, window.addshop = (App = {
        version: "0.003 alfa",
        basket: {
            status: 0,
            storage_name: "addshop_basket",
            getData: function() {
                var e = JSON.parse(localStorage.getItem(this.storage_name));
                return null == e ? [] : e
            },
            getItem: function(e) {
                var t = this.getData(),
                    i = {};
                return $.each(t, function(t, a) {
                    t == e && (i = a)
                }), i
            },
            saveData: function(e) {
                try {
                    localStorage.setItem(this.storage_name, JSON.stringify(e))
                } catch (e) {
                    e == QUOTA_EXCEEDED_ERR && alert("Ошибка добавления номера в корзину.")
                }
            },
            clean: function() {
                this.saveData([])
            },
            countItems: function() {
                return this.getData().length
            },
            countTotalSum: function() {
                var e = 0;
                return $.each(this.getData(), function(t, i) {
                    e += i.price * i.quantity
                }), e
            },
            countTotalSumSale: function() {
                var e = 0;
                return $.each(this.getData(), function(t, i) {
                    0 != i.discount ? "percent" == i.discount_type ? e += i.price * i.quantity * (1 - i.discount / 100) : e += i.quantity * (i.price - i.discount) : window.customer_discount ? e += i.price * i.quantity * (1 - window.customer_discount / 100) : window.promo_discount ? e += i.price * i.quantity * (1 - window.promo_discount / 100) : e += i.price * i.quantity
                }), e
            },
            addItem: function(e) {
                var t = this.getData(),
                    i = !1;
                $.each(t, function(a, n) {
                    n.offer_id == e.offer_id && (i++, t[a].quantity = 1 * t[a].quantity, t[a].quantity += 1 * e.quantity)
                }), 0 == i && (t.push(e), window.userEventHandler("add", {
                    ecommerce: {
                        add: {
                            products: [{
                                id: e.offer_id,
                                name: e.title,
                                price: e.price,
                                quantity: e.quantity
                            }]
                        }
                    }
                })), this.saveData(t)
            },
            replaceItemByIndex: function(e, t) {
                var i = this.getData();
                i.splice(t, 1, e), this.saveData(i)
            },
            removeItemByIndex: function(e) {
                var t = this.getData();
                t.splice(e, 1), this.saveData(t), $(".pop_up_price").remove()
            },
            numberWithCommas: function(e) {
                return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            },
            getPromoTitle: function(e) {
                var t = this.getData(),
                    i = "";
                return $.each(t, function(t, a) {
                    t == e && (i = a.promo_title)
                }), i
            },
            renderBasket: function() {
                var e = this.getData(),
                    t = App.basket.countTotalSum(),
                    i = App.basket.countTotalSumSale(),
                    a = "",
                    n = "",
                    s = window.customer_discount,
                    o = parseFloat(1 - s / 100),
                    c = "";
                return $.each(e, function(e, t) {
                    var r = "",
                        l = "";
                    if (0 != t.discount)
                        if ("percent" == t.discount_type) var d = 1 - parseFloat(t.discount) / 100;
                        else d = parseFloat(t.discount);
                    if (window.promo_discount && t.promo_used && $(".promo-descr").text("Вы уже использовали купон на скидку!"), window.promo_discount && !t.promo_used) {
                        var p = window.promo_discount,
                            u = window.promo_title,
                            m = parseFloat(1 - p / 100);
                        $(".promo-descr").text("Вы использовали купон " + u + " на скидку " + p + "%"), t.discount = p, t.promo_used = !0, t.promo_title = u, t.discount_type = "percent", App.basket.replaceItemByIndex(t, e)
                    }
                    var v = parseFloat(t.price * t.quantity).toFixed(2),
                        _ = parseFloat(t.price).toFixed(2),
                        h = parseFloat(t.quantity).toFixed(2),
                        f = parseFloat(t.step).toFixed(2),
                        b = parseFloat(t.max).toFixed(2),
                        g = "";
                    if (p) c = "discount_exist", l = "discount_exist", g = App.basket.numberWithCommas(parseFloat(t.price * t.quantity * m).toFixed(2)) + " " + shop_currency, r = (m * _).toFixed(2) + " " + shop_currency;
                    else if (0 != d && d < 1 || d > 0 && "" != t.discount_type) switch (l = "discount_exist", c = "discount_exist", t.discount_type) {
                        case "percent":
                            g = App.basket.numberWithCommas(parseFloat(t.price * t.quantity * d).toFixed(2)) + " " + shop_currency, r = (_ * d).toFixed(2) + " " + shop_currency;
                            break;
                        case "absolute":
                            g = App.basket.numberWithCommas(parseFloat((t.price - d) * t.quantity).toFixed(2)) + " " + shop_currency, r = (_ - d).toFixed(2) + " " + shop_currency
                    } else s ? (c = "discount_exist", l = "discount_exist", g = App.basket.numberWithCommas(parseFloat(t.price * t.quantity * o).toFixed(2)) + " " + shop_currency, r = (_ * o).toFixed(2) + " " + shop_currency) : g = "";
                    0;
                    var y = "";
                    null != t.vendor_code && (y = `Код товара: ${t.vendor_code}`);
                    var w = "";
                    null != t.offer_title && (w = `${t.offer_title}`), n += `\n                        <div class="basket_item_wrapp">\n                        <div class="item_in_basket_titles">\n                                    <div class="title">Наименование товара</div>\n                                    <div class="img"></div>\n                                    <div class="price">Цена</div>\n                                    <div class="quantity">Количество</div>\n                                    <div class="total">Стоимость</div>\n                                    <div class="remove" data-index="${e}"></div>\n                                </div>\n                                <div class="item_in_basket">\n                                    <div class="image"><img src="${t.image}" /></div>\n                                    <div class="title"><a href="${t.link}">${t.title}</a><br><span class="v_code">${y}</span> <span class="v_code">${w}</span> </div>\n                                    <div class="price"><div>${r} </div><span class="${l}">${_} ${shop_currency}<span></div>\n                                    <div class="quantity">\n                                        <div class="count">\n                                            <div class="count_minus">-</div>\n                                            <input  data-index="${e}" type="text" name="quantity" class="number_input" value="${h}" min="${f}"  step="${f}" max="${b}">\n                                            <div class="count_plus">+</div>\n                                        </div>\n                                    </div>\n                                    <div class="total"><div class="total_new">${g}</div><span class="${l}">${App.basket.numberWithCommas(v)} ${shop_currency}</span></div>\n                                    <div class="">  </div>\n                                </div>\n                                </div>`, (p || s || d) && (a = i.toFixed(2))
                }), n = "" == n ? "Нет товаров." : "" + n + `<div class="basket_end">                        \n                            <div class="left">\n                                <div class="promo">\n                                <form method="POST" id="apply_promo">\n                                    <input name="action" type="hidden" value="apply_promo" />\n                                    <input type="text" name="promo" class="promo" value="" placeholder="Введите промокод ..." />\n                                    <button class="get_promo">Применить</button>\n                                </form>\n                                </div>\n                            </div>\n                            <div class="right">\n                                <div class="total_basket_wrapp"><span>Итоговая сумма: </span><span id="basket_total"><span class="${c}">${App.basket.numberWithCommas(t.toFixed(2))}</span> &nbsp;${App.basket.numberWithCommas(a)}</span> ${shop_currency}</div>\n                                <a class="checkout_btn" href="/checkout/">Оформить заказ</a>\n                            </div>\n                            </div>`, $("#basket_list").html(n), !0
            },
            renderfloatBasketList: function() {
                var e = this.getData(),
                    t = parseFloat(window.customer_discount),
                    i = 0,
                    a = "",
                    n = 1 - t / 100,
                    s = 0,
                    o = 0,
                    c = "",
                    r = "",
                    l = 0;
                t && (r = "discount_exist"), $.each(e, function(e, c) {
                    if ($(".pop_up_price").remove(), 0 != c.discount)
                        if (i = c.discount, "percent" === c.discount_type) var d = 1 - parseFloat(c.discount) / 100;
                        else d = parseFloat(c.discount);
                    var p = "",
                        u = parseFloat(c.quantity).toFixed(1);
                    l += parseInt(u);
                    var m = parseFloat(c.price).toFixed(2),
                        v = m * n;
                    if ("percent" === c.discount_type) var _ = m * d;
                    else _ = m - d;
                    if (d ? (r = "discount_exist", p = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(_.toFixed(2))} ${shop_currency}</div>`) : t && (r = "discount_exist", p = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(v.toFixed(2))}  ${shop_currency}</div>`), "percent" === c.discount_type) var h = parseFloat(c.price * c.quantity).toFixed(2);
                    else h = parseFloat((c.price - c.discount) * c.quantity).toFixed(2);
                    0, a += `<div class="item_in_basket">\n                                    <a  href="${c.link}">\n                                    <div class="image"><img src="${c.image}" /></div>\n                                    <div class="descr">\n                                        <div class="title">${c.title}</div>\n                                        <div class="quantity">Количество: ${u}</div>\n                                        <div class="price ${r}">Цена: ${m}  ${shop_currency}</div>\n                                        ${p}\n                                    </div>\n                                    </a>\n                                </div>`, o += parseFloat(h), d && d < 1 ? "percent" == c.discount_type && (h *= d) : t && (h *= 1 - t / 100), s += parseFloat(h)
                }), c = window.customer_discount || i ? s.toFixed(2) : "";
                var d = "";
                d = 0 == s ? '<div class="itogo">\n                            <div class="total">Ваша корзина пуста</div>\n                        </div>' : `<div class="itogo">\n                                <div class="total">Итого: <span class="${r}">${App.basket.numberWithCommas(o.toFixed(2))}</span>&nbsp; ${App.basket.numberWithCommas(c)} ${shop_currency}</div>\n                                <div class="btns"><a href="/basket/">Корзина</a> <a href="/checkout/">Оформить</a></div>\n                            </div>`, $("#basket_popup_list").remove(), $("body").append(`<div id="basket_popup_list" class="${template_class}">\n                                    <div class="close">&#10005;</div>\n                                    <div class="items">${a}</div>\n                                  ${d}\n                                </div>`);
                var p = ($("body").outerWidth() - $(".inner").outerWidth()) / 2 + "px";
                return $("#basket_popup_list").css("right", p), "kanasi" == template_class ? $(".basket").append(`<div class="pop_up_price">${parseInt(s)} ${shop_currency}</div>`) : "taymyr" == template_class ? ($(".basket .icon_cont").append(`<div class="pop_up_price">${parseInt(s)} ${shop_currency}</div>`), $(".basket a").append(`<div class="pop_up_count">${l}</div>`)) : "simple" != template_class && "mirror" != template_class && "michigan" != template_class && "superior" != template_class || $(".basket a").append(`<div class="pop_up_count">${l}</div>`), !0
            },
            renderPopupBasket: function() {
                var e = this.getData(),
                    t = parseFloat(window.customer_discount),
                    i = "",
                    a = 0,
                    n = 0,
                    s = 0,
                    o = "",
                    c = "",
                    r = "";
                return $.each(e, function(e, o) {
                    if (0 != o.discount)
                        if (n = o.discount, "percent" === o.discount_type) var l = 1 - parseFloat(o.discount) / 100;
                        else if ("absolute" === o.discount_type) l = n;
                    var d = parseFloat(o.price).toFixed(2),
                        p = (d * (1 - t / 100).toFixed(2)).toFixed(2);
                    if ("percent" === o.discount_type) var u = (d * l).toFixed(2),
                        m = parseFloat(o.price * o.quantity).toFixed(2);
                    else if ("absolute" === o.discount_type) u = (d - l).toFixed(2), m = parseFloat((o.price - o.discount) * o.quantity).toFixed(2);
                    var v = parseFloat(o.quantity).toFixed(2);
                    l && l < 1 || l && "absolute" == o.discount_type ? (r = "discount_exist", c = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(u)} ${shop_currency}</div>`) : t ? (r = "discount_exist", c = `<div class="price_new">Цена со скидкой: ${p} ${shop_currency}</div>`) : c = "", 0, i += `<div class="item_in_basket">\n                                <a href="${o.link}">\n                                    <div class="image"><img src="${o.image}" /></div>\n                                    <div class="descr">\n                                        <div class="title">${o.title}</div>\n                                        <div class="quantity">Количество: ${v}</div>\n                                        <div class="price">Цена: ${App.basket.numberWithCommas(d)} ${shop_currency}</div>\n                                        ${c}\n                                    </div>\n                                </a>\n                            </div>`, s += parseFloat(m), l && l < 1 ? m *= l : t && (m *= 1 - t / 100), a += parseFloat(m)
                }), (window.customer_discount || n) && (o = a.toFixed(2)), $("#basket_popup_wrapper").remove(), $("body").addClass("modal"), $("body").append(`<div id="basket_popup_wrapper"><div id="basket_popup">\n                                    <div class="close">&#10005;</div>\n                                    <div class="items">${i}</div>\n                                    <div class="itogo">\n                                        <div class="total">Итого: <span class="${r}">${App.basket.numberWithCommas(s.toFixed(2))} </span>&nbsp; ${App.basket.numberWithCommas(o)} ${shop_currency}</div>\n                                        <div class="btns"><a href="/basket/">Корзина</a> <a href="/checkout/">Оформить</a></div>\n                                    </div>\n                                </div></div>`), !0
            }
        },
        storage: {
            status: 0,
            storage_name: "addshop_common",
            getData: function() {
                var e = JSON.parse(sessionStorage.getItem(this.storage_name));
                return null == e ? {} : e
            },
            saveData: function(e) {
                try {
                    return sessionStorage.setItem(this.storage_name, JSON.stringify(e)), !0
                } catch (e) {
                    return e == QUOTA_EXCEEDED_ERR && alert("Ошибка добавления в хранилище."), !1
                }
            },
            clean: function() {
                return this.saveData({}), !0
            },
            setProp: function(e, t) {
                var i = this.getData();
                return i[e] = t, this.saveData(i), !0
            },
            setProps: function(e) {
                var t = this.getData();
                return $.extend(t, e), this.saveData(t), !0
            },
            removeProp: function(e) {
                var t = this.getData();
                return delete t[e], this.saveData(t), !0
            },
            getProp: function(e) {
                return this.getData()[e] || ""
            }
        },
        checkDropdownMenu: function() {
            $(".menu_collapse_1 .level_1 .level_2").before('<div class="chevron_down"><i class="chevron_down_icon"></i></div>')
        },
        renderFavorites: function() {
            var e = App.storage.getProp("favorites") || [];
            $("#favorites_list").html(""), 0 == e.length && $("#favorites_list").html("Пока тут пусто."), $.each(e, function(t) {
                $("#favorites_list").append(`<div class="item_favorites"><img class="image" src="${e[t].image}" /><a class="title" href="${e[t].link}">${e[t].title}</a><span class="price">${e[t].price} ${shop_currency}</span> <span class="remove" data-index="${t}"><i class="fas fa-trash-alt"></i></span></div>`)
            })
        },
        setCookieSimple: function(e, t) {
            document.cookie = e + "=" + (t || "")
        },
        setCookie: function(e, t, i) {
            var a = (i = i || {}).expires;
            if ("number" == typeof a && a) {
                var n = new Date;
                n.setTime(n.getTime() + 1e3 * a), a = i.expires = n
            }
            a && a.toUTCString && (i.expires = a.toUTCString());
            var s = e + "=" + (t = encodeURIComponent(t)) + ";path=/";
            for (var o in i) {
                s += "; " + o;
                var c = i[o];
                !0 !== c && (s += "=" + c)
            }
            document.cookie = s
        },
        getCookie: function(e) {
            var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
            return t ? decodeURIComponent(t[1]) : void 0
        },
        getView: function() {
            if (null !== localStorage.getItem("view")) {
                var e = localStorage.getItem("view");
                $("body").addClass(e), $(".show_style div").removeClass("active"), $(".show_style ." + e).addClass("active")
            }
        },
        itemSC: function(e) {
            var t, i, a = 0,
                n = 0,
                s = (e = $(e), new Swiper(".gallery-top", {}));
            if (e.hasClass("color")) {
                var o = !1;
                $(".size").addClass("disabled"), $(".size.active").removeClass("disabled"), $(".colors .color.active").removeClass("disabled")
            }
            $(".color.active").data("color") && (a = 1 * $(".color.active").data("color")), $(".size.active").data("size") && (n = 1 * $(".size.active").data("size")), $.each(window.item.offers, function(e, t) {
                a > 0 && 0 == n && a == t.color_id && $('.size[data-size="' + t.size_id + '"]').removeClass("disabled"), n > 0 && 0 == a && n == t.size_id && $('.color[data-color="' + t.color_id + '"]').removeClass("disabled")
            }), s.slideTo((t = "offer_image_" + a, i = 0, $.each($(".gallery-top .swiper-wrapper").children(), function(e, a) {
                if ($(a).hasClass(t)) return i = e, !1
            }), i), 0, !0), 0 == a && 0 == n && ($(".size").removeClass("disabled"), $(".color").removeClass("disabled")), $.each(window.item.offers, function(e, t) {
                t.color_id == a && t.size_id == n && (o = t)
            });
            var c = window.item.step || 1;
            if (o) {
                var r = window.item.max_in_order,
                    l = window.item.min_in_order;
                if (1 * o.quantity > 0 && 1 * o.infinitely == 0) $(".availability").text("В наличии"), r = o.quantity;
                else if (1 == o.infinitely) $(".availability").text("В наличии");
                else {
                    if (!(1 * o.quantity <= 0 && 1 * window.item.under_the_order == 1)) return $(".availability").text("Нет в наличии"), void $(".item_price").html("Извините, но данный товар закончился на складе.");
                    $(".availability").text("Под заказ")
                }
                let e = "",
                    t = "",
                    i = "",
                    a = 0,
                    n = "";
                switch (window.one_click_buy && (n = '<button class="oneclickbuy"><i class="f7-icons">arrowshape_turn_up_left_2</i>Купить в 1 клик</button>', one_buy_click_button_new = '<button class="oneclickbuy"><i class="fas fa-shopping-bag"></i>Купить в 1 клик</button>'), window.item_discount ? (t = "discount_exist", e = `<span class="one_price">${((a="absolute"==window.discount_type?o.price-window.item_discount:o.price*(1-window.item_discount/100).toFixed(2))*window.item.min_in_order).toFixed(2)} ${shop_currency}</span>`, i = `<span class="total_new">${(a*window.item.min_in_order).toFixed(2)} ${shop_currency}</span>`) : window.customer_discount && (t = "discount_exist", e = `<span class="one_price">${((a=o.price*(1-window.customer_discount/100).toFixed(2))*window.item.min_in_order).toFixed(2)} ${shop_currency}</span>`, i = `<span class="total_new">${(a*window.item.min_in_order).toFixed(2)} ${shop_currency}</span>`), template_class) {
                    case "simple":
                        $(".item_price").html(`\n                                <form method="GET" action="/basket/add/">\n                                    <input type="hidden" name="step" value="${c}" />\n                                    <input type="hidden" name="max" value="${r}" />\n                                    <input type="hidden" name="min" value="${l}" />\n                                    <input type="hidden" name="price" value="${o.price}" />\n                                    <input type="hidden" name="offer_id" value="${o.id}" />\n                                    <div class="count">\n                                        <div class="count_minus">-</div>\n                                        <input type="text" name="quantity" class="number_input" value="${l}" min="${l}" step="${c}" max="${r}" />\n                                        <div class="count_plus">+</div>\n                                    </div>\n                                    <div class="total_price">${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price)}  ${shop_currency}</span></div>\n                                    <button class="add_to_basket">В корзину</button>\n                                    ${n}\n                                </form>`), $(".simple_price").children().remove(), $(".simple_price").prepend(`<div class="total_price">${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price*window.item.min_in_order)}  ${shop_currency}</span></div>`);
                        break;
                    case "superior":
                        $(".item_price").html(`<form method="GET" action="/basket/add/">\n                                    <input type="hidden" name="step" value="${c}" />\n                                    <input type="hidden" name="max" value="${r}" />\n                                    <input type="hidden" name="min" value="${l}" />\n                                    <input type="hidden" name="price" value="${o.price}" />\n                                    <input type="hidden" name="offer_id" value="${o.id}" />\n                                    <div class="count">\n                                    <div class="count_minus">-</div>\n                                    <input type="text" name="quantity" class="number_input" value="${l}" min="${l}" step="${c}" max="${r}"  />\n                                    <div class="count_plus">+</div>\n                                </div>\n                                    <button class="add_to_basket"><i class="fas fa-cart-plus"></i>В корзину</button>\n                                    ${one_buy_click_button_new}\n                                </form>`), $(".item_top_price").children().remove(), $(".item_top_price").prepend(`<div class="total_price">${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price*window.item.min_in_order)}  ${shop_currency}</span></div>`);
                        break;
                    case "michigan":
                    case "tahoe":
                        $(".item_price").html(`\n                                <form method="GET" action="/basket/add/">\n                                    <input type="hidden" name="step" value="${c}" />\n                                    <input type="hidden" name="max" value="${r}" />\n                                    <input type="hidden" name="min" value="${l}" />\n                                    <input type="hidden" name="price" value="${o.price}" />\n                                    <input type="hidden" name="offer_id" value="${o.id}" />\n                                    <div class="count">\n                                        <div class="count_minus">-</div>\n                                        <input type="text" name="quantity" class="number_input" value="${l}" min="${l}" step="${c}" max="${r}" />\n                                        <div class="count_plus">+</div>\n                                    </div>\n                                    <div class="total_price">${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price*window.item.min_in_order)}  ${shop_currency}</span></div>\n                                    <button class="add_to_basket">В корзину</button>\n                                    ${n}\n                                </form>`);
                        break;
                    case "taymyr":
                        $(".item_price").html(`\n                                <form method="GET" action="/basket/add/">\n                                    <input type="hidden" name="step" value="${c}" />\n                                    <input type="hidden" name="max" value="${r}" />\n                                    <input type="hidden" name="min" value="${l}" />\n                                    <input type="hidden" name="price" value="${o.price}" />\n                                    <input type="hidden" name="offer_id" value="${o.id}" />\n                                    <div class="count">\n                                        <div class="count_minus">-</div>\n                                        <input type="text" name="quantity" class="number_input" value="${l}" min="${l}" step="${c}" max="${r}" />\n                                        <div class="count_plus">+</div>\n                                    </div>\n                                    <div class="total_price">${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price*window.item.min_in_order)}  ${shop_currency}</span></div>\n                                    <button class="item_add_to_cart">В корзину</button>\n                                    ${n}\n                                </form>`);
                        break;
                    default:
                        $(".item_price").html(`\n                                <form method="GET" action="/basket/add/">\n                                    <input type="hidden" name="step" value="${c}" />\n                                    <input type="hidden" name="max" value="${r}" />\n                                    <input type="hidden" name="min" value="${l}" />\n                                    <input type="hidden" name="price" value="${o.price}" />\n                                    <input type="hidden" name="offer_id" value="${o.id}" />\n                                    <div class="count">\n                                    <span class="details_title">Количество: </span>\n                                    <div class="count_minus">-</div>\n                                    <input type="text" name="quantity" class="number_input" value="${l}" min="${l}" step="${c}" max="${r}"  />\n                                    <div class="count_plus">+</div>\n                                </div>\n                                    <button class="add_to_basket"><i class="f7-icons">cart_fill</i>В корзину</button>\n                                    ${n}\n                                </form>\n                                <div class="price_one_wrapp">\n                                    <span class="details_title ">Цена:</span>${App.basket.numberWithCommas(e)}<span class="one_price ${App.basket.numberWithCommas(t)}">${App.basket.numberWithCommas(o.price)} ${shop_currency}</span> \n                                </div>\n                                <div class="total_price"><span class="details_title">Общая сумма.:</span>${App.basket.numberWithCommas(i)}<span class="total ${t}"> ${App.basket.numberWithCommas(o.price*window.item.min_in_order)}  ${shop_currency}</span></div>`)
                }
                $("body").on("click", ".oneclickbuy", function(e) {
                    e.stopPropagation(), e.preventDefault();
                    var t = $(".item_preview").find('[name="quantity"]').eq(0).val(),
                        i = $(".item_preview").find('[name="quantity"]').attr("step");
                    if (0 == t || isNaN(t)) 0 == $(".item_preview .count .invalid").length ? $(".item_preview .count").append('<span class="invalid" style="color:red;  font-size: 12px;">Некорректное значение поля</span>') : $(".item_preview .count .invalid").text("Некорректное значение поля");
                    else {
                        $(".item_preview .invalid").remove(), 1 == i && (t = parseInt(t));
                        var a = "";
                        null != $(".item_preview .size.active").eq(0).text() && (a = $(".item_preview .size.active").eq(0).text()), null != $(".item_preview .color.active .color_view").eq(0).attr("title") && (a += " " + $(".item_preview .color.active .color_view").eq(0).attr("title"));
                        var n = {
                            title: $(".item_title").eq(0).text(),
                            vendor_code: $(".vendor_or_id").eq(0).text(),
                            offer_title: a,
                            image: $(".extra_image").find("img").eq(0).attr("src"),
                            offer_id: $(".item_preview").find('[name="offer_id"]').eq(0).val(),
                            quantity: t,
                            price: $(".item_preview").find('[name="price"]').eq(0).val(),
                            max: $(".item_preview").find('[name="max"]').eq(0).val(),
                            step: $(".item_preview").find('[name="step"]').eq(0).val(),
                            discount: window.item_discount,
                            discount_type: $(".item_price").data("discount-type"),
                            one_click_buy: !0,
                            link: window.location.pathname
                        };
                        App.basket.addItem(n), window.location.href = "/checkout/"
                    }
                })
            }
        },
        stringFind: function(e, t) {
            return -1 != e.search(t)
        },
        eventListener: function() {
            if (App.checkDropdownMenu(), setTimeout(function() {
                    ! function() {
                        let e = document.getElementById("menu-toggler");
                        $(e).length && e.addEventListener("click", function() {
                            $(".menu_p").toggleClass("menu_open")
                        });

                        function t() {
                            let e = Array.from(document.querySelectorAll(".menu #menu_list .li")),
                                t = function(e) {
                                    let t = document.getElementById("menu_list");
                                    var i = 0;
                                    return e.filter(function(e) {
                                        if ((i += e.getBoundingClientRect().width) + 50 > t.offsetWidth) return e
                                    })
                                }(e),
                                i = document.getElementById("menu_popup");
                            t.forEach(function(e) {
                                i.appendChild(e)
                            }), 0 == t.length ? $("#menu-toggler").hide() : $("#menu-toggler").show()
                        }
                        window.addEventListener("resize", (i = function() {
                            (function() {
                                let e = Array.from(document.querySelectorAll("#menu_popup .li")),
                                    t = document.getElementById("menu_list");
                                e.forEach(function(e) {
                                    t.appendChild(e)
                                })
                            })(), t()
                        }, a = 450, function() {
                            var e = this,
                                t = arguments,
                                o = n && !s;
                            clearTimeout(s), s = setTimeout(function() {
                                s = null, n || i.apply(e, t)
                            }, a), o && i.apply(e, t)
                        })), t(), $("#menu_list").css("overflow", "visible");
                        var i, a, n, s
                    }()
                }, 400), void 0 !== window.item || $(".items_table").length) {
                if (void 0 !== window.item) {
                    App.itemSC();
                    var e = 0,
                        t = 0;
                    $.each(window.item.offers, function(i, a) {
                        1 * a.size_id != 0 && e++, 1 * a.color_id != 0 && t++
                    }), 0 == t ? $(".colors_wrapper").hide() : setTimeout(function() {
                        $(".colors .color:first-child").click()
                    }, 300), 0 == e ? $(".sizes_wrapper").hide() : setTimeout(function() {
                        $(".sizes .size:first-child").hasClass("disabled") ? $(".sizes .size").click() : $(".sizes .size:first-child").click()
                    }, 150), $("body").on("click", ".colors", function(e) {
                        $(this).toggleClass("active")
                    }), $("body").on("click", ".color", function(e) {
                        e.stopPropagation(), e.preventDefault();
                        var t = $(".size.active").data("size");
                        $(".size").removeClass("active"), setTimeout(function() {
                            $('.sizes .size[data-size="' + t + '"]').hasClass("disabled") ? $(".sizes .size").click() : $('.sizes .size[data-size="' + t + '"]').click()
                        }, 100), $(this).hasClass("disabled") || ($(this).hasClass("active") || ($(".color").removeClass("active"), $(this).addClass("active")), App.itemSC(this))
                    }), $("body").on("click", ".sizes", function(e) {
                        $(this).toggleClass("active")
                    }), $("body").on("click", ".item_tab_controlls .tab", function() {
                        var e = $(this).data("tabControll");
                        $(".item_tab_controlls .tab").removeClass("active"), $(this).addClass("active"), $(".tab_content").removeClass("active"), $(".tab_content").each(function() {
                            $(this).data("tabContent") == e && $(this).addClass("active")
                        })
                    }), $("body").on("click", ".size", function() {
                        $(this).hasClass("disabled") || ($(this).hasClass("active") || ($(".size").removeClass("active"), $(this).addClass("active")), App.itemSC(this))
                    })
                }
                $("body").on("submit", 'form[action="/basket/add/"]', function(e) {
                    if (e.preventDefault(), !$(".item_price").hasClass("disable")) {
                        var t = $(this).find('[name="quantity"]').eq(0).val(),
                            i = $(this).find('[name="quantity"]').attr("step"),
                            a = $(this).find('[name="quantity"]').eq(0).data("min"),
                            n = $(this).find('[name="quantity"]').eq(0).data("max");
                        if (t < a && (t = a), t > n && (t = n), 0 == t || isNaN(t)) 0 == $(".item_preview .count .invalid").length ? $(".item_preview .count").append('<span class="invalid" style="color:red;  font-size: 12px;">Некорректное значение поля</span>') : $(".item_preview .count .invalid").text("Некорректное значение поля");
                        else {
                            $(".item_preview .invalid").remove(), 1 == i && (t = parseInt(t));
                            var s = $(this).parents(".item").find(".item_price").data("discount") || $(".item_price").data("discount");
                            "0.00" == s && (s = 0);
                            var o = "";
                            null != $(".item_preview .size.active").eq(0).text() && (o = $(".item_preview .size.active").eq(0).text()), null != $(".item_preview .color.active .color_view").eq(0).attr("title") && (o += " " + $(".item_preview .color.active .color_view").eq(0).attr("title"));
                            var c = {
                                title: $("h1").eq(0).text(),
                                vendor_code: $(".item_preview .vendor_or_id").eq(0).text(),
                                offer_title: o,
                                image: $(".extra_image").find("img").eq(0).attr("src"),
                                offer_id: $(this).find('[name="offer_id"]').eq(0).val(),
                                quantity: t,
                                price: $(this).find('[name="price"]').eq(0).val(),
                                max: $(this).find('[name="max"]').eq(0).val(),
                                min: $(this).find('[name="min"]').eq(0).val(),
                                step: $(this).find('[name="step"]').eq(0).val(),
                                discount: s,
                                discount_type: $(".item_price").data("discount-type"),
                                promo_used: !1,
                                link: window.location.pathname
                            };
                            c.link.includes("categories") && (c.title = $(this).parents(".item").find(".descr").text(), c.vendor_code = $(this).parents(".item").data("code"), c.image = $(this).parents(".item").find("img").eq(0).attr("src"), c.link = $(this).parents(".item").find(".descr a").attr("href"), c.discount = $(this).parents(".item").data("discount"), c.discount_type = $(this).parents(".item").data("discount-type"), $(this).parents(".item").data("size") && 0 !== $(this).parents(".item").data("size") && (c.offer_title = $(this).parents(".item").data("size")), $(this).parents(".item").data("color") && 0 !== $(this).parents(".item").data("color") && (c.offer_title += " " + $(this).parents(".item").data("color"))), console.log(c), App.basket.addItem(c), App.basket.renderfloatBasketList(), App.basket.renderPopupBasket()
                        }
                    }
                })
            }
            switch ($("body").on("click", ".show_style div", function(e) {
                    $(".show_style div").removeClass("active"), $(this).addClass("active"), $(".items").removeClass("list grid");
                    var t = $(this).data("id");
                    $(".items").addClass(t), App.setCookieSimple("view", t)
                }), $(".main").click(function() {
                    $(".search_form").removeClass("active"), $("body").removeClass("search_opened"), $(".slogan").removeClass("hide")
                }), $("body").click(function(e) {
                    0 === $(e.target).closest(".icon").length && $(".links").removeClass("active"), 0 === $(e.target).closest(".filter_bar").length && $(".filter_bar").removeClass("active"), 0 !== $(e.target).closest(".user_mob").length || $(e.target).hasClass("logout") || $(".logout").removeClass("active"), 0 === $(e.target).closest(".menu").length && $(".menu_p").removeClass("menu_open"), 0 !== $(e.target).closest(".new_category").length || $(e.target).closest(".catalog_title") || ($(".new_category").removeClass("active"), $("body").removeClass("menu_active")), 0 !== $(e.target).closest(".catalog_title").length || $(e.target).closest(".categories") || $(".categories").removeClass("active"), 0 === $(e.target).closest(".search_open").length && $(".search_open").removeClass("active")
                }), template_class) {
                case "simple":
                    App.stringFind(window.location.pathname, /manufacturers/) ? $(".top-right-bottom-left .level_1").prepend('<li class="li light"><span class="current">Бренды</span></li>') : $(".top-right-bottom-left .level_1").prepend('<li class="li light"><a href="/manufacturers/">Бренды</a></li>'), $(".user_profile").on("click", ".user_email", function() {
                        $(".user_mob").toggleClass("active")
                    });
                    break;
                case "victoria":
                    var a = $(".header-top").outerHeight() + $(".header-middle").outerHeight() + $(".header-bottom").outerHeight(),
                        n = ($("body").outerWidth() - $(".inner").outerWidth()) / 2;
                    $(".header-middle").on("click", ".user", function() {
                        $(".user-popup").toggleClass("active")
                    }), $(".search_form").css("height", a), $(".slider .swiper-pagination").css("padding-right", n), $(".search_form").on("click", ".feather-x-circle", function() {
                        $(".search_form").removeClass("active")
                    });
                    break;
                case "superior":
                    $("body").on("click", ".search_bg", function() {
                        $(".search_form").removeClass("active"), $("body").removeClass("search_opened")
                    }), $("header").on("click", ".user.login", function() {
                        $(this).toggleClass("active"), $(".user_popup").toggleClass("active")
                    });
                    break;
                case "mirror":
                    $("body").on("click", ".search_open", function() {
                        $("header .logo_wrapper").addClass("hidden")
                    }), $("body").on("click", ".main", function() {
                        $("header .logo_wrapper").removeClass("hidden")
                    }), $("body").on("click", ".menu_opener", function() {
                        $(".menu-wrapper").addClass("show"), $(".menu-wrapper-overlay").addClass("show")
                    }), $("body").on("click", ".menu-close", function() {
                        $(".menu-wrapper").removeClass("show"), $(".menu-wrapper-overlay").removeClass("show")
                    }), $("body").on("click", ".menu-wrapper-overlay", function() {
                        $(".menu-wrapper").removeClass("show"), $(".menu-wrapper-overlay").removeClass("show")
                    }), $("body").on("click", ".user-profile", function() {
                        $(".user-popup").toggleClass("active")
                    });
                    break;
                case "michigan":
                    $("body").on("click", ".catalog_title", function() {
                        $(".catalog_wrapper").toggleClass("active")
                    });
                    break;
                case "mystic":
                    $(".search_open").click(function(e) {
                        e.stopPropagation(), $(".search_form ").addClass("active"), $("#search").focus()
                    }), $(".search_form").click(function(e) {
                        e.stopPropagation()
                    }), $("body").click(function() {
                        $(".search_form ").removeClass("active")
                    }), $(".target-burger, .close_mobile_menu").click(function(e) {
                        e.preventDefault(), $("body").toggleClass("menu_open"), $("html").toggleClass("popup_open")
                    });
                    break;
                case "kanasi":
                case "tahoe":
                    $(".search_open").click(function(e) {
                        e.stopPropagation(), $(".search_form ").addClass("active"), $(".search_open ").addClass("hide"), $("#search").focus()
                    }), $(".search_form").click(function(e) {
                        e.stopPropagation()
                    }), $("body").click(function() {
                        $(".search_form ").removeClass("active"), $(".search_open ").removeClass("hide")
                    });
                    break;
                case "ladoga":
                    var s = $(".level_1").children();
                    for (i = 0; i < $(".level_1").children().length; i++) s[i].children.length > 1 && $(s[i]).append('<i class="f7-icons">chevron_compact_right</i>');
                    var o = $(".level_2").children();
                    for (i = 0; i < $(".level_2").children().length; i++) o[i].children.length > 1 && $(o[i]).append('<i class="f7-icons">chevron_compact_right</i>')
            }
            if ($("body").on("click", "main, .slider", function() {
                    $(".popup-city, .popup-cities, .user_popup, .user.login").removeClass("active"), $("body").removeClass("search_opened")
                }), $("body").on("click", ".customer-city", function() {
                    $(".popup-city").toggleClass("active"), $(".popup-cities").removeClass("active")
                }), $(".popup-city").on("click", ".btn-primary", function() {
                    $(".popup-city").removeClass("active")
                }), $(".popup-city").on("click", ".btn-secondary", function() {
                    $(".popup-city").removeClass("active"), $(".popup-cities").addClass("active")
                }), $(".popup-cities").on("click", "li", function() {
                    var e = $(this).data("name");
                    App.setCookie("city", e, 0, "/"), $(".popup-cities").removeClass("active"), location.reload()
                }), $(".inner_more").click(function() {
                    $(".inner_prop").toggleClass("dropdown")
                }), $(".horseshoe .catalog_title").click(function(e) {
                    $(".categories").toggleClass("active")
                }), $("body").on("click", ".menu .close", function(e) {
                    $(".menu").removeClass("active")
                }), $("body").on("click", ".mob_menu", function(e) {
                    $(".menu").addClass("active")
                }), $("body").on("click", ".catalog_title.mob", function(e) {
                    $(".sidebar").toggleClass("active")
                }), $("body").on("click", ".main .filter_bar .title", function(e) {
                    $(this).parent().toggleClass("active"), $(".filter_bar .price_range .f_title").click()
                }), $("body").on("click", ".filter_bar .f_title", function(e) {
                    $(this).toggleClass("active"), $(this).next().toggleClass("active")
                }), $(".search_form input").on("click", function(e) {
                    $(this).parent().parent().addClass("active")
                }), $(".new_category li").hover(function(e) {
                    if (window.innerWidth >= 1e3) {
                        $(this).children(".level_2") && $(this).addClass("active")
                    }
                }, function() {
                    window.innerWidth >= 1e3 && $(this).removeClass("active")
                }), window.onscroll = function() {
                    (window.pageYOffset || document.documentElement.scrollTop) >= 150 ? $(".kanasi .basket").addClass("hide") : $(".kanasi .basket").removeClass("hide")
                }, "simple" !== template_class && "baikal" !== template_class && "michigan" !== template_class && "victoria" !== template_class && "isabelle" !== template_class && "louise" !== template_class && "kanasi" !== template_class && "champlain" !== template_class && "tahoe" !== template_class && "superior" !== template_class && "ladoga" !== template_class && "emerald" !== template_class && "taymyr" !== template_class || ($(".menu_popup_mob .close").click(function(e) {
                    $(".menu_popup_mob").toggleClass("active")
                }), $(".mob_menu").click(function(e) {
                    $(".menu_popup_mob").toggleClass("active")
                })), $(".baikal .catalog_title").click(function(e) {
                    $(".categories").toggleClass("active")
                }), $(".emerald .catalog_title").click(function(e) {
                    $(".emerald .categories").toggleClass("active")
                }), $(".new_category .chevron_down").click(function(e) {
                    if (window.innerWidth < 1e3) {
                        $(".new_category li").removeClass("active"), $(this).siblings(".level_2") && $(this).parent().addClass("active")
                    }
                }), $("body").on("click", ".search_open", function(e) {
                    console.log("touchend"), $(this).addClass("active"), $(".search_form").addClass("active"), $(".slogan").addClass("hide"), $(".search_form input").focus(), $("body").addClass("search_opened")
                }), $("body").on("click", ".user_mob, .icon", function(e) {
                    $(this).next().addClass("active")
                }), $("body").on("click", ".login_or_reg, .icon", function(e) {
                    $(this).next().addClass("active")
                }), $("body").on("click", ".catalog_title", function(e) {
                    $(".nositebar .categories").toggleClass("active")
                }), $("select").each(function() {
                    var e = $(this),
                        t = $(this).children("option").length;
                    e.addClass("s-hidden"), e.wrap('<div class="select"></div>'), e.after('<div class="styledSelect"></div>');
                    var i = e.next("div.styledSelect");
                    i.text(e.children("option:selected").eq(0).text() || e.children("option").eq(0).text());
                    for (var a = $("<ul />", {
                            class: "options"
                        }).insertAfter(i), n = 0; n < t; n++) $("<li />", {
                        text: e.children("option").eq(n).text(),
                        rel: e.children("option").eq(n).val()
                    }).appendTo(a);
                    var s = a.children("li");
                    i.click(function(e) {
                        e.stopPropagation(), $("div.styledSelect.active").each(function() {
                            $(this).removeClass("active").next("ul.options").hide()
                        }), $(this).toggleClass("active").next("ul.options").toggle()
                    }), s.click(function(t) {
                        t.stopPropagation(), i.text($(this).text()).removeClass("active"), e.val($(this).attr("rel")), a.hide(), e.parents(".sort_show").length && $(".filter_items").submit()
                    }), $(document).click(function() {
                        i.removeClass("active"), a.hide()
                    })
                }), "/basket/" == window.location.pathname && (App.basket.renderBasket(), $("#basket_list").on("click", ".basket_item_wrapp .remove", function() {
                    var e = $(this).data("index");
                    App.basket.removeItemByIndex(e), App.basket.renderBasket(), App.basket.renderfloatBasketList()
                }), $("#basket_list").on("click", ".count_minus, .count_plus", function() {
                    var e = $(this).parent().find('input[name="quantity"]'),
                        t = 1 * e.attr("max"),
                        i = 1 * e.attr("min"),
                        a = 1 * e.attr("step"),
                        n = 1 * e.val();
                    n > 0 && $(".count .invalid").remove(), $(this).hasClass("count_minus") ? n > i ? n -= a : alert("Минимальное количество для заказа " + i) : n < t ? n += a : alert("Максимальное количество для заказа " + t), n <= 0 && (n = 0), n < i && (n = i), n >= t && (n = t);
                    var s = e.data("index"),
                        o = App.basket.getItem(s);
                    o.quantity = n, App.basket.replaceItemByIndex(o, s), App.basket.renderBasket(), App.basket.renderfloatBasketList()
                })), "/favorites/" == window.location.pathname && (App.renderFavorites(), $("#favorites_list").on("click", ".remove", function() {
                    var e = $(this).data("index"),
                        t = App.storage.getProp("favorites") || [];
                    t.splice(e, 1), App.storage.setProp("favorites", t), App.renderFavorites()
                })), App.basket.renderfloatBasketList(), $("body").on("mouseleave", "#basket_popup_list", function(e) {
                    $(this).hide()
                }), $("body").on("mouseover", ".basket a", function(e) {
                    e.preventDefault(), $(window).width() > 1200 && $("#basket_popup_list").show()
                }), $("body").on("click", "#basket_popup_list .close", function(e) {
                    $("#basket_popup_list").hide()
                }), $("body").on("click", "#basket_popup .close", function(e) {
                    $("body").removeClass("modal"), $("#basket_popup_wrapper").remove()
                }), $("body").on("change", '#checkout_form [name="customer_type"]', function(e) {
                    "ur" == $(this).data("type") ? ($("#checkout_form .ul_extra_fields").show(), $(".ul_extra_fields").find("input[data-required]").attr("required", "required")) : ($("#checkout_form .ul_extra_fields").hide(), $(".ul_extra_fields").find("input[data-required]").removeAttr("required", "required"))
                }), $("body").on("click", ".menu_collapse_1 .chevron_down", function(e) {
                    $(this).toggleClass("active"), $(this).next().toggleClass("active")
                }), $("body").on("change", ".item_price .number_input", function() {
                    var e = $(this).parent().parent().find('input[name="price"]'),
                        t = 1 * e.val(),
                        i = e.val() * (1 - window.customer_discount / 100),
                        a = e.val() * (1 - window.item_discount / 100),
                        n = 1 * $(this).val();
                    $(".total_price .total").html(App.basket.numberWithCommas((t * n).toFixed(2)) + " " + shop_currency), window.customer_discount ? $(".total_price .total_new").html(App.basket.numberWithCommas((i * n).toFixed(2)) + " " + shop_currency) : window.item_discount && $(".total_price .total_new").html(App.basket.numberWithCommas((a * n).toFixed(2)) + " " + shop_currency)
                }), $("body").on("click", ".item_price .count_minus, .item_price .count_plus, .item .count_minus, .item .count_plus", function() {
                    var e = $(this).parent().find('input[name="quantity"]'),
                        t = $(this).parent().parent().find('input[name="price"]'),
                        i = 1 * e.attr("max"),
                        a = 1 * e.attr("step"),
                        n = 1 * e.val(),
                        s = 1 * t.val();
                    if ("absolute" == window.discount_type) o = t.val() - window.item_discount;
                    else var o = t.val() * (1 - window.item_discount / 100);
                    var c = t.val() * (1 - window.customer_discount / 100);
                    $(this).hasClass("count_minus") ? n > window.item.min_in_order ? n -= a : alert("Минимальное количество для заказа ", window.item.min_in_order) : n < window.item.max_in_order ? n += a : alert("Максимальное количество для заказа ", window.item.max_in_order), n <= 0 && (n = 0), n >= i && (n = i), n <= window.item.min_in_order && (n = window.item.min_in_order), n >= window.item.max_in_order && (n = window.item.max_in_order), e.val(n), $(".total_price .total").html(App.basket.numberWithCommas((s * n).toFixed(2)) + " " + shop_currency), window.item_discount ? $(".total_price .total_new").html(App.basket.numberWithCommas((o * n).toFixed(2)) + " " + shop_currency) : window.customer_discount && $(".total_price .total_new").html(App.basket.numberWithCommas((c * n).toFixed(2)) + " " + shop_currency)
                }), $("body").on("click", ".add_favorite", function() {
                    var e = $(this).data("id"),
                        t = $(this).data(),
                        i = App.storage.getProp("favorites") || [],
                        a = 0;
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active"), $(this).children("span").text("В избранное");
                        ! function(e, t, i) {
                            for (var a = e.length; a--;) e[a] && e[a].hasOwnProperty(t) && arguments.length > 2 && e[a][t] === i && e.splice(a, 1)
                        }(i, "id", e)
                    } else $(this).addClass("active"), $(this).children("span").text("В избранном"), $.each(i, function(e) {
                        i[e].id == t.id && (a = 1)
                    }), a || i.push(t);
                    App.storage.setProp("favorites", i)
                }), $("#search").on("keyup", function() {
                    var e = $(this).val().trim();
                    if (e.length < 4) return !1;
                    e.length > 0 ? $.ajax({
                        dataType: "json",
                        type: "POST",
                        url: "/ajax/",
                        data: {
                            action: "search",
                            search: e
                        },
                        success: function(t) {
                            if (t.results.items) {
                                var i = "";
                                $.each(t.results.items, function(e, a) {
                                    console.log(e, t.results.limit), i += `<a class="search_item" href="${a.url}">\n                                        <img src="/img/50x50${a.image}">\n                                        <span>${a.title}</span>\n                                    </a>`
                                }), t.results.total > t.results.limit && (i += `<a class="search_item all_results" href="/search/?search=${e}">\n                                    <span>ВСЕ РЕЗУЛЬТАТЫ (${t.results.total})</span>\n                                    </a>`), $("#autocomplete").html(i).show(), $("#autocomplete").addClass("active")
                            } else $("#autocomplete").empty().hide(), $("#autocomplete").removeClass("active")
                        }
                    }) : $("#autocomplete").empty().hide()
                }), $("#autocomplete").click(function(e) {
                    e.stopPropagation()
                }), $("#callback_form").on("submit", function() {
                    var e = $("#callback_name").val(),
                        t = $("#callback_phone").val();
                    return e.length > 0 && t.length > 0 ? $.ajax({
                        dataType: "json",
                        type: "POST",
                        url: "/ajax/",
                        data: {
                            action: "callback",
                            name: e,
                            phone: t
                        },
                        success: function(e) {
                            e.status && ($("#callback_form").remove(), $(".callback-title").remove(), $(".callback-form").append('<div class="callback-msg">Благодарим за заявку. Наши специалисты свяжутся с вами в ближайшее время!</div>'))
                        },
                        error: function(e) {
                            $(".callback-form").html('<div class="callback-msg callback-error">Ошибка. Данные не отправлены.</div>')
                        }
                    }) : alert("Поля не должны быть пустыми!"), !1
                }), $("body").on("click", ".callback-toggler", function() {
                    $(".callback-form").toggleClass("active")
                }), $(".callback-form").on("click", ".callback-close", function() {
                    $(".callback-form").removeClass("active")
                }), 1 == window.item_img_zoom && "" != window.item_img_zoom && $(window).width() > 1e3) {
                var c = {
                        cursor: "crosshair"
                    },
                    r = $(".extra_image img"),
                    l = "";
                setTimeout(function() {
                    (l = $(".swiper-slide.swiper-slide-active img.big")).elevateZoom(c)
                }, 1e3), r.on("click", function() {
                    $(".zoomContainer").remove(), setTimeout(function() {
                        (l = $(".swiper-slide.swiper-slide-active img.big")).removeData("elevateZoom"), l.attr("src", $(this).data("image")), l.data("zoom-image", $(this).data("zoom-image")), l.elevateZoom(c)
                    }, 500)
                })
            }
        },
        init: function() {
            App.eventListener()
        }
    }, App.init(), App)
});