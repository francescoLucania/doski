$(function () {

    document.addEventListener('keydown', (event) => {
        const keyCode = event.keyCode;

        if (keyCode === 27) {
            closeGallery();
        }

    }, false);

    $(document).on('click', '.js-open-gallery', function () {

        var index = $(this).data('index');

        openGallery(index);

        return false
    });

    $(document).on('click', '.js-close-gallery', function () {

        closeGallery();

        return false
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
        nextArrow: '<button class="slick-next slick-arrow js-node-hover" aria-label="Next" type="button" style="" aria-disabled="false"><img src="img/arrow.svg" alt="next" /></button>',
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
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 400);

        setTimeout(function () {
            closeGallery();
        }, 1000);

        return false;
    });
});
