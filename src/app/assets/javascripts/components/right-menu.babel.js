$(function () {
    const $rightMenuBox = $('.js-right-menu-box');

    $(document).on('click touchend', '.js-open-right-menu', function () {

        $('.js-open-tooltip-link').removeClass('is-active');
        $rightMenuBox.addClass('is-open');

        return false
    });

    $(document).on('click touchend', '.js-close-right-menu', function () {

        $rightMenuBox.addClass('is-close');

        if ($rightMenuBox.hasClass('is-close')) {
            setTimeout(function () {
                $rightMenuBox.removeClass('is-open');
                $rightMenuBox.removeClass('is-close');
            }, 400); // 400ms css animation
        }

        return false
    });

    const rightMenuModel = $('#right-menu-model');
    const rightMenuModelType = $('#right-menu-model-type');

    $(document).on('click', '.js-right-menu-model-open', function () {
        rightMenuModelType.removeClass('is-active');
        rightMenuModel.addClass('is-active');

        $('.js-right-menu-model-type-open').removeClass('dedicated');
        $(this).addClass('dedicated');

        return false
    });

    $(document).on('click', '.js-right-menu-model-type-open', function () {
        rightMenuModel.removeClass('is-active');
        rightMenuModelType.addClass('is-active');

        $('.js-right-menu-model-open').removeClass('dedicated');
        $(this).addClass('dedicated');

        return false
    });
});
