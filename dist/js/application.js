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
        var fontALSRublArial = new FontFaceObserver('TTNormsRegular');

        fontALSRublArial.load().then(function () {
            console.log('TTNorms');
        });
    }

    // if (enable.components.fontsRubleSerif === true) {
    //     const fontALSRublTimes = new FontFaceObserver('ALSRubl-Times');
    //
    //     fontALSRublTimes
    //         .load()
    //         .then(function () {
    //             console.log('ALSRubl-Times has loaded.');
    //         });
    // }
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
//
// var html = document.documentElement;
// var body = document.body;
//
// var scroller = {
//     target: document.querySelector("#page-container"),
//     ease: 0.05, // <= scroll speed
//     endY: 0,
//     y: 0,
//     resizeRequest: 1,
//     scrollRequest: 0,
// };
//
// var requestId = null;
//
// TweenLite.set(scroller.target, {
//     rotation: 0.01,
//     force3D: true
// });
//
// window.addEventListener("load", onLoad);
//
// function onLoad() {
//     updateScroller();
//     window.focus();
//     window.addEventListener("resize", onResize);
//     document.addEventListener("scroll", onScroll);
// }
//
// function updateScroller() {
//
//     var resized = scroller.resizeRequest > 0;
//
//     if (resized) {
//         var height = scroller.target.clientHeight;
//         body.style.height = height + "px";
//         scroller.resizeRequest = 0;
//     }
//
//     var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
//
//     scroller.endY = scrollY;
//     scroller.y += (scrollY - scroller.y) * scroller.ease;
//
//     if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//         scroller.y = scrollY;
//         scroller.scrollRequest = 0;
//     }
//
//     TweenLite.set(scroller.target, {
//         y: -scroller.y
//     });
//
//     requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }
//
// function onScroll() {
//     scroller.scrollRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }
//
// function onResize() {
//     scroller.resizeRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }
"use strict";
'use strict';

// $('.js-parallax-window').parallax();
jarallax(document.querySelectorAll('.jarallax'));