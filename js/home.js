$(document).ready(function () {

//スクロールすると, 各ブロックに差し掛かるとanimation, homeMindよりスクロールするとfixedBnr出現
var fps = 60;
var frameTime = 1000 / fps;
var setTimeoutId = null;

var $scrollTarget = $('.js-scroll-target');

var $fixedBnrDisplay = $('.js-fixedBnrDisplay');
var $fixedBnr = $('.js-fixedBnr');
var $fixedBtn = $('.js-fixedBnr-btn');
var fixedBnrFlg = true;

$(window).on('load scroll', function () {
    if (setTimeoutId) {
        return false;
    }

    setTimeoutId = setTimeout(function () {
        var windowPos = $(window).scrollTop();

        //scrollイベント　各ブロックにクラスつけてcssAnimation 発生
        $scrollTarget.each(function () {
            var $thisTarget = $(this);
            var targetTop = $thisTarget.offset().top;
            var targetMargin = 100;
            var windowHeight = $(window).height();

            if (windowPos > ((targetTop + targetMargin) - windowHeight)) {
                $thisTarget.addClass('is-active');
            }
        });

        //fixedBnrDisplayよりスクロールするとfixedBnr出現 fixedBnrFlgにより一回だけ実行
        var fixedBnrDisplayTop = $fixedBnrDisplay.offset().top;

        if (windowPos > fixedBnrDisplayTop) {
            if (fixedBnrFlg) {
                fixedBnrFlg = false;
                $fixedBnr.one().addClass('is-active');
                $fixedBtn.on('click', function () {
                    $fixedBnr.removeClass('is-active');
                });
            }
        }

        setTimeoutId = null;
    }, frameTime);
});
});
