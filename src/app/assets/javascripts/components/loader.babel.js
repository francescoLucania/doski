$(function () {

    function loaderClose() {
        $('.js-loader').addClass('is-hide');
        $('.js-promo').addClass('is-visible');
    }

    document.addEventListener("DOMContentLoaded", loaderClose());

});
