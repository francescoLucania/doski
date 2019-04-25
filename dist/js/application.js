"use strict";

var enable = {
    mq: true,
    mqDevice: false,

    interactMultiple: true,

    jQueryUI: {
        autocomplete: true,
        datepicker: true,
        selectmenu: true
    },

    components: {
        fonts: true,
        fontsRubleSans: true,
        fontsRubleSerif: true,
        icons: true,
        wysiwyg: true
    }
};
'use strict';

// Responsive
var mqBreakpoints = [['sm', 767], ['md', 768], ['lg', 1025]];

// Not responsive
var viewportWidth = 1220;
'use strict';

// Viewport
if (enable.mqDevice) {
    var viewport = document.querySelector('meta[name="viewport"]');

    if (screen.width >= mqBreakpoints[0][1]) {
        viewport.setAttribute('content', 'width=' + viewportWidth);
    }
}

// Create mq
var mq = {};

function createMq(array) {
    var mqDevice = enable.mqDevice ? 'device-' : '';

    array.forEach(function (element, index) {
        var mqRange = index === 0 ? 'max' : 'min';

        mq[element[0]] = {
            int: element[1],
            str: '(' + mqRange + '-' + mqDevice + 'width: ' + element[1] + 'px)'
        };
    });
}

if (enable.mq) {
    createMq(mqBreakpoints);
}

// Interact multiple
var interactMultiple = function interactMultiple(selector, hoverClass, activeClass) {
    if (!Modernizr.touchevents) {
        $(document).on('mouseenter mouseleave', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(hoverClass, e.type === 'mouseenter');
        }).on('mousedown mouseup', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(activeClass, e.type === 'mousedown');
        });
    }
};

if (enable.interactMultiple) {
    interactMultiple('.js-hover', 'hover', 'active');
}

// Optimized resize
// https://developer.mozilla.org/ru/docs/Web/Events/resize
(function () {
    var throttle = function throttle(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function func() {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');
})();
'use strict';

if (enable.jQueryUI.autocomplete === true) {
    var availableTags = ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'];
    var $autocomplete = $('.js-autocomplete-input');

    $autocomplete.autocomplete({
        source: availableTags,
        open: function open(event) {
            $(event.target).addClass('ui-autocomplete-input-opened');
        },
        close: function close(event) {
            $(event.target).removeClass('ui-autocomplete-input-opened');
        }
    });

    $(window).on('optimizedResize', function () {
        $autocomplete.autocomplete('close');
    });
}
"use strict";

if (enable.jQueryUI.datepicker === true) {
    var datepickerSetMinWidth = function datepickerSetMinWidth(input, dpDiv) {
        setTimeout(function () {
            $(dpDiv).css('min-width', '').css('min-width', $(input).outerWidth());
        }, 0);
    };

    // Force Datepicker open always under input


    // Localization
    $.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

    $.datepicker.setDefaults($.datepicker.regional.ru);

    // Datepicker
    var $datepicker = $('.js-datepicker-input');

    $.extend($.datepicker, {
        _checkOffset: function _checkOffset(inst, offset) {
            return offset;
        }
    });

    $datepicker.datepicker({
        prevText: '',
        nextText: '',
        beforeShow: function beforeShow(input, inst) {
            $(input).addClass('hasDatepickerFocus');

            datepickerSetMinWidth(input, inst.dpDiv);
        },
        onChangeMonthYear: function onChangeMonthYear(year, month, inst) {
            datepickerSetMinWidth(inst.input, inst.dpDiv);
        },
        onClose: function onClose(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        },
        onSelect: function onSelect(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        }
    });

    $(window).on('optimizedResize', function () {
        $datepicker.datepicker('hide');
    });
}
'use strict';

if (enable.jQueryUI.selectmenu === true) {
    var $selectmenu = $('.js-selectmenu-select');

    $selectmenu.selectmenu({
        create: function create(event) {
            var $select = $(event.target);
            var $button = $(event.target.nextSibling);

            $('#' + event.target.id + '-menu').css('max-width', $button.outerWidth());

            if ($select.find('option:first-child').is(':disabled')) {
                $select.next('.ui-selectmenu-button').find('.ui-selectmenu-text').addClass('ui-state-placeholder');
            }
        }
    });

    $(window).on('optimizedResize', function () {
        $selectmenu.selectmenu('close');
    });
}
'use strict';

if (enable.components.fonts === true) {

    if (enable.components.fontsRubleSans === true) {
        var fontBase = new FontFaceObserver('Montserrat');

        fontBase.load().then(function () {
            console.log('Montserrat');
        });
    }
}
"use strict";

if (enable.components.icons === true) {
    svg4everybody();
}
'use strict';

if (enable.components.wysiwyg === true) {
    var $wysiwyg = $('.js-wysiwyg');

    // Img
    $wysiwyg.find('img').each(function () {
        $(this).removeAttr('width height');
    });

    $wysiwyg.find('> p > img').each(function () {
        $(this).unwrap();
    });

    // Table
    $wysiwyg.find('> table').each(function () {
        $(this).wrap('<div class="wysiwyg__table"/>');
    });

    // Video (Youtube, Vimeo)
    $wysiwyg.find('> iframe[src*="vimeo"], > iframe[src*="youtube"]').each(function () {
        $(this).wrap('<div class="wysiwyg__video"/>');
    });
}
'use strict';

$(function () {

    function loaderClose() {
        $('.js-loader').addClass('is-hide');
        $('.js-promo').addClass('is-visible');
    }

    document.addEventListener("DOMContentLoaded", loaderClose());
});
'use strict';

if (Modernizr.mq(mq.md.str)) {
    jarallax(document.querySelectorAll('.jarallax'));
}
'use strict';

$(function () {
    var $rightMenuBox = $('.js-right-menu-box');

    $(document).on('click touchend', '.js-open-right-menu', function () {

        $('.js-open-tooltip-link').removeClass('is-active');
        $rightMenuBox.addClass('is-open');

        return false;
    });

    $(document).on('click touchend', '.js-close-right-menu', function () {

        $rightMenuBox.addClass('is-close');

        if ($rightMenuBox.hasClass('is-close')) {
            setTimeout(function () {
                $rightMenuBox.removeClass('is-open');
                $rightMenuBox.removeClass('is-close');
            }, 400); // 400ms css animation
        }

        return false;
    });

    var rightMenuModel = $('#right-menu-model');
    var rightMenuModelType = $('#right-menu-model-type');

    $(document).on('click', '.js-right-menu-model-open', function () {
        rightMenuModelType.removeClass('is-active');
        rightMenuModel.addClass('is-active');

        $('.js-right-menu-model-type-open').removeClass('dedicated');
        $(this).addClass('dedicated');

        return false;
    });

    $(document).on('click', '.js-right-menu-model-type-open', function () {
        rightMenuModel.removeClass('is-active');
        rightMenuModelType.addClass('is-active');

        $('.js-right-menu-model-open').removeClass('dedicated');
        $(this).addClass('dedicated');

        return false;
    });
});
'use strict';

$(function () {

    document.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;

        if (keyCode === 27) {
            closeGallery();
        }
    }, false);

    $(document).on('click', '.js-open-gallery', function () {

        var index = $(this).data('index');

        openGallery(index);

        return false;
    });

    $(document).on('click', '.js-close-gallery', function () {

        closeGallery();

        return false;
    });

    function openGallery(index) {

        var galleryBlock = $('.js-gallery-block');

        galleryBlock.addClass('is-open');
        $('html').addClass('hidden');
        $('body').addClass('hidden');

        $('.js-product-slider').slick('slickGoTo', index);
    }

    function closeGallery() {
        $('html').removeClass('hidden');
        $('body').removeClass('hidden');
        $('.js-gallery-block').removeClass('is-open');
    }

    $('.js-product-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        asNavFor: '.js-product-slider-nav',
        prevArrow: '<button class="slick-prev slick-arrow js-node-hover" aria-label="Next" type="button" style="" aria-disabled="false"><img src="img/arrow.svg" alt="prev" /></button>',
        nextArrow: '<button class="slick-next slick-arrow js-node-hover" aria-label="Next" type="button" style="" aria-disabled="false"><img src="img/arrow.svg" alt="next" /></button>'
    });

    $('.js-product-slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        asNavFor: '.js-product-slider',
        arrows: false,
        dots: false,
        focusOnSelect: true
    });

    $(document).on('click', '.js-order-gallery', function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 400);

        setTimeout(function () {
            closeGallery();
        }, 1000);

        return false;
    });
});
'use strict';

var initCursor = new NodeCursor({
    cursor: true,
    node: true,
    cursor_velocity: .8,
    node_velocity: 0.25,
    native_cursor: 'none',
    element_to_hover: '.js-node-hover',
    cursor_class_hover: 'disable',
    node_class_hover: 'expand',
    hide_mode: true,
    hide_timing: 2000
});