nallow = false;
touch = false;
$(document).ready(function() {
	var wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var breakpoint = 961;
	if(wWidth < breakpoint){
		nallow = true;
	}else{
		nallow = false;
	}
	if($('body').hasClass('touch')){
		touch = true;
	}else{
		touch = false;
	}
	
	scrFunc();
	imgCheck();
	resizeTop();
	
	$('a[href^="#"]').click(function(e) {
	  e.preventDefault();
	  var anc = $(this).attr('href');
	  var target = $(anc);
	  var scr = target.offset().top;
	  $('html,body').animate({scrollTop:(scr)},800,'easeInOutExpo');
	});
		
	$('header .menu_btn').click(function(e){
		$('#menu, #menu_bg').toggleClass('open');
	});
	
	$('header .training_cases').click(function(e){
		$(this).siblings('.submenu').slideToggle(400);
	});
	
	var bb = $('#btns_bottom'),
			bn = bb.length;
	if(bn > 0){
		$('footer').addClass('pb');
	}
	
	$('#btns_bottom .close').click(function(){
		$('#btns_bottom').addClass('done');
		$('footer').removeClass('pb');
	});
	
	$('.visual-slider').imagesLoaded(function(i){
		buildVis();
		$('.visual-slider .slide').addClass('active');
	});
	buildArt();

$(window).on('scroll resize', function() {
	scrFunc();
});
jQuery.fn.almComplete = function(alm){
 scrFunc();
};
	
function scrFunc(){
	var scrTop = $(window).scrollTop();
	var wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	var setElm = $('.setElm');
	setElm.each(function(index, element) {
		var $this = $(this);
		//var id = $this.attr('id');
		var elmH = $(this).outerHeight();
		var elmTop = $(this).offset().top;
		var elmMdl = (elmH / 2) + elmTop;
		var elmBtm = elmTop + elmH;
				
		//if(touch){
			if(scrTop >= elmMdl - wHeight){
				$this.addClass('move');
			}
		//}
	});
	
	var kv = $('.p-index-kv');
	kv.each(function() {
		var $this = $(this);
		//var id = $this.attr('id');
		var elmH = $this.outerHeight();
		var elmTop = $this.offset().top;
		var elmBtm = elmTop + elmH;
				
		//if(touch){
			if(scrTop >= elmH*0.8){
				$('body').addClass('is-second');
			}else{
				$('body').removeClass('is-second');
			}
		//}
	});

	var pageTop = $('.pageTop');
	if(scrTop >= wHeight){
		pageTop.addClass('active');
	}else{
		pageTop.removeClass('active');
	}
	
	var bb = $('#btns_bottom');
	if(scrTop >= wHeight){
		bb.addClass('active');
	}else{
		bb.removeClass('active');
	}
	
	
}
});

$(window).on('resize', function() {
	imgCheck();
	var wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var breakpoint = 961;
	if(wWidth >= breakpoint){
		var n = $('.article .slick-slider').length;
		if(n == 0){
			buildArt();
		}
	}
});


function imgCheck(){
	var wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var brakepoint = 960;
	if(wW <= brakepoint){
		$('img[src*="_pc."]').each(function(){
			var src = $(this).attr('src');
			src = src.replace('_pc.','_sp.');
			$(this).attr('src', src);
		});
	}else{
		$('img[src*="_sp."]').each(function(){
			var src = $(this).attr('src');
			src = src.replace('_sp.','_pc.');
			$(this).attr('src', src);
		});
	}
	setTimeout(function(){
		getImg();
	},200);
}

function getImg(){
	$('.getImg').each(function(){
		var $this = $(this),
				$src = $this.children('img').attr('src');
		$this.css('background-image', 'url('+$src+')');
	});
//	$('#visual .slide').each(function(){
//		var $this = $(this),
//				$src = $this.find('.img img').attr('src');
//		$this.find('.img').css('background-image', 'url('+$src+')');
//	});
}

function resizeTop(){
	var ruler = $('body > .ruler');
	if(ruler.length > 0){
		var h = ruler.height();
		$('.p-index-kv').css('height', h);
		imagesLoaded( $('.p-index-kv'), function(){
			setTimeout(function(){
				buildSlick();
			},400);
		});
	}
}

function buildVis(){
	$('.visual-slider').slick({
		slide: '.slide',
		infinite: true,
		//arrows: false,
		fade: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 4000,
		pauseOnHover: false,
		pauseOnFocus: false,
		prevArrow:'<a href="javascript:void(0)" class="slick-arrow slick-prev" title="Prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.55 13.18"><path class="cls-1" style="fill: white;" d="M7.27,5.91,1.63.27A1,1,0,0,0,.28.27,1,1,0,0,0,0,1a1,1,0,0,0,.28.68l5,5-5,5A1,1,0,0,0,1,13.18a1,1,0,0,0,.67-.28L7.27,7.26a1,1,0,0,0,0-1.35Z"/></svg></a>',
		nextArrow:'<a href="javascript:void(0)" class="slick-arrow slick-next" title="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.55 13.18"><path class="cls-1" style="fill: white;" d="M7.27,5.91,1.63.27A1,1,0,0,0,.28.27,1,1,0,0,0,0,1a1,1,0,0,0,.28.68l5,5-5,5A1,1,0,0,0,1,13.18a1,1,0,0,0,.67-.28L7.27,7.26a1,1,0,0,0,0-1.35Z"/></svg></a>',
	});
}

function buildArt(){
	$('.article .slider, #article .slider').each(function(){
		var $slider = $(this),
				n = $slider.find('.slide').length;
		if(n > 3){
			$slider.slick({
				slide: '.slide',
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 3,
				//arrows: false,
				//autoplay: true,
				//autoplaySpeed: 4000,
				//pauseOnHover: false,
				//pauseOnFocus: false,
				prevArrow:'<a href="javascript:void(0)" class="slick-arrow slick-prev" title="Prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.55 13.18"><path class="cls-1" style="fill: white;" d="M7.27,5.91,1.63.27A1,1,0,0,0,.28.27,1,1,0,0,0,0,1a1,1,0,0,0,.28.68l5,5-5,5A1,1,0,0,0,1,13.18a1,1,0,0,0,.67-.28L7.27,7.26a1,1,0,0,0,0-1.35Z"/></svg></a>',
				nextArrow:'<a href="javascript:void(0)" class="slick-arrow slick-next" title="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.55 13.18"><path class="cls-1" style="fill: white;" d="M7.27,5.91,1.63.27A1,1,0,0,0,.28.27,1,1,0,0,0,0,1a1,1,0,0,0,.28.68l5,5-5,5A1,1,0,0,0,1,13.18a1,1,0,0,0,.67-.28L7.27,7.26a1,1,0,0,0,0-1.35Z"/></svg></a>',
				responsive: [
					{
						breakpoint:960,
						settings: "unslick"
					}
				]
			});
		}
	});
}

/* SP タブ切り替え */
jQuery(function($){
	$('.tab').click(function(){
		$('.tab.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		$(".content.is-show").removeClass('is-show');
    // クリックしたタブからインデックス番号を取得
		const index = $(this).index();
    // クリックしたタブと同じインデックス番号をもつコンテンツを表示
		$(".content").eq(index).addClass('is-show');
	});
});

/* アコーディオンメニュー */
$(document).ready(function(){
if ($(window).width() < 961) {
		$(function(){
			$('.toggle').on('click',function(){
			  $(this).toggleClass('open');
			  $(this).next('.togglewrap').slideToggle();
			});
		});
	}
});

/* SP 最下部にメニュー表示 */
$(document).ready(function(){
if ($(window).width() < 961) {
		$(function() {
		  var showFlag = false;
		  var topBtn = $('#menu');
		  topBtn.css('bottom', '-150px');
		  //スクロールが100に達したらボタン表示
		  $(window).scroll(function() {
		    if ($(this).scrollTop() > 100) {
		      if (showFlag == false) {
		        showFlag = true;
		        topBtn.stop().animate({'bottom': '0px'}, 200);
		      }
		    } else {
		      if (showFlag) {
		        showFlag = false;
		        topBtn.stop().animate({'bottom': '-100px'}, 200);
		      }
		    }
		  });
		});
	}
});