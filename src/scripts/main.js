$(document).ready(function(){

	// Tabs
	$('.news-panel__tab a').click(function (e) {
		e.preventDefault();
		if($(this).parent().hasClass("active")){
			var url = $(this).data('url');
			window.location.replace(url);
		}
		$(this).tab('show');
	});
	if($(window).width() <= 991){
		// Convert tabs to slider for tablets and mobile.
		var slider = $('.js-slider-tabs');
		var sliderItem = slider.find('.news-panel__tab');
		slider.height(sliderItem.height());
		var sliderWidth = slider.width();
		var sliderLength = sliderItem.length;
		sliderItem.css({'position':'absolute', 'top': 0, 'width':'100%'});
		for(var i=0; i< sliderLength; i++){
			sliderItem.eq(i).css({'left':sliderWidth * i});
		}
		$('.news-panel__tabs .js-prev').click(function(e){
			e.preventDefault();
			var currentIndex = $('.news-panel__tab.active').index();
			var nextIndex;
			if (currentIndex > 0){nextIndex = currentIndex - 1}
			else {nextIndex = $('.news-panel__tab').length - 1}
			$('.news-panel__tab').eq(nextIndex).children('a').trigger('click');
			sliderItem.eq(nextIndex).css('left', sliderWidth * -1);
			sliderItem.each(function(){
				$(this).animate({'left': parseInt($(this).css('left')) + sliderWidth});
			});
		});
		$('.news-panel__tabs .js-next').click(function(e){
			e.preventDefault();
			var currentIndex = $('.news-panel__tab.active').index();
			var nextIndex;
			if (currentIndex === $('.news-panel__tab').length - 1){nextIndex = 0}
			else {nextIndex = currentIndex + 1}
			$('.news-panel__tab').eq(nextIndex).children('a').trigger('click');
			sliderItem.eq(nextIndex).css('left', sliderWidth);
			sliderItem.each(function(){
				$(this).animate({'left': parseInt($(this).css('left')) - sliderWidth});
			});
		});
	}

	// Mobile menu
	$('.menu__hamburger').click(function(){
		$(this).siblings('ul').slideToggle();
	});
	$('.menu__top-item--submenu > a').click(function(e){
		e.preventDefault();
		var sub = $(this).siblings('.menu__submenu--1');
		if(sub.is(':visible')){
			sub.slideUp();
		}
		else{
			$('.menu__submenu--1').not(sub).slideUp();
			sub.slideDown();
		}
	});
	$('.menu__item--submenu > a').click(function(e){
		e.preventDefault();
		var sub = $(this).siblings('.menu__submenu--2');
		if(sub.is(':visible')){
			sub.slideUp();
		}
		else{
			$('.menu__submenu--2').not(sub).slideUp();
			sub.slideDown();
		}
	});

	// Multiply slides
	var w = $(window).width();
	var mSlides = 1;
	if (w >= 1200){mSlides=5}
	else if(w >= 992){mSlides = 4}
	else if(w >= 768){mSlides = 3}
	else if(w >= 768){mSlides = 3}

	// Check ie9
	var ua = window.navigator.userAgent;
	var msie = parseInt(ua.split('MSIE')[1]);


	if(msie !=9){

		// Enable sliders
		// Top left frontpage slider
		if($('.swiper-1 .slider__item').length > 1){
			var swiper1 = new Swiper('.swiper-1', {
				pagination: '.swiper-pagination-1',
				paginationClickable: true,
				nextButton: '.swiper-button-next-1',
				prevButton: '.swiper-button-prev-1',
				loop: true,
			});
		}
		else{
			$('.swiper-button-prev-1, .swiper-button-next-1').hide();
		}
		// Tabs/slider (top right) frontpage slider

		// First small wide frontpage slider
		if($('.swiper-3 .slider__item').length > mSlides){
			var swiper3 = new Swiper('.swiper-3', {
				pagination: '.swiper-pagination-3',
				paginationClickable: true,
				nextButton: '.swiper-button-next-3',
				prevButton: '.swiper-button-prev-3',
				loop: true,
				slidesPerView: 'auto',
			});
		}
		else{
			$('.swiper-button-prev-3, .swiper-button-next-3').hide();
		}

		// Bottom left frontpage slider
		if($('.swiper-4 .slider__item').length > 1){
			var swiper4 = new Swiper('.swiper-4', {
				pagination: '.swiper-pagination-4',
				paginationClickable: true,
				nextButton: '.swiper-button-next-4',
				prevButton: '.swiper-button-prev-4',
				loop: true,
				onInit: function(swiper){
					var swiper4Text = $('.swiper-4').siblings('.slider-text');
					cloneText(swiper4Text);
					swiper4Text.children().hide();
					swiper4Text.children().eq(swiper.activeIndex).show();
				},
				onSlideChangeEnd: function(swiper){
					var swiper4Text = $('.swiper-4').siblings('.slider-text');
					swiper4Text.children().hide();
					swiper4Text.children().eq(swiper.activeIndex).fadeIn();
				},
			});
		}
		else{
			$('.swiper-button-prev-4, .swiper-button-next-4').hide();
		}

		// Bottom right frontpage slider
		if($('.swiper-5 .slider__item').length > 1){
			var swiper5 = new Swiper('.swiper-5', {
				pagination: '.swiper-pagination-5',
				paginationClickable: true,
				nextButton: '.swiper-button-next-5',
				prevButton: '.swiper-button-prev-5',
				loop: true,
			});
		}
		else{
			$('.swiper-button-prev-5, .swiper-button-next-5').hide();
		}

		// Second small wide frontpage slider
		if($('.swiper-6 .slider__item').length > mSlides){
			var swiper6 = new Swiper('.swiper-6', {
				pagination: '.swiper-pagination-6',
				paginationClickable: true,
				nextButton: '.swiper-button-next-6',
				prevButton: '.swiper-button-prev-6',
				loop: true,
				slidesPerView: 'auto',
			});
		}
		else{
			$('.swiper-button-prev-6, .swiper-button-next-6').hide();
		}

		// News page slider
		if($('.swiper-7 .slider__item').length > 1){
			var swiper7 = new Swiper('.swiper-7', {
				pagination: '.swiper-pagination-7',
				paginationClickable: true,
				nextButton: '.swiper-button-next-7',
				prevButton: '.swiper-button-prev-7',
				loop: true,
				onInit: function(swiper){
					var swiper7Text = $('.swiper-7').siblings('.other-news__texts');
					cloneText(swiper7Text);
					swiper7Text.children().hide();
					swiper7Text.children().eq(swiper.activeIndex).show();
				},
				onSlideChangeEnd: function(swiper){
					var swiper7Text = $('.swiper-7').siblings('.other-news__texts');
					swiper7Text.children().hide();
					swiper7Text.children().eq(swiper.activeIndex).fadeIn();
				},
			});
		}
		else{
			$('.swiper-button-prev-7, .swiper-button-next-7').hide();
		}
	}
	else{
		$(".slider").each(function(){
			var slider = $(this);
			var sliderWrapper = slider.children('.swiper-wrapper');
			var sliderItem = slider.find('.slider__item');
			var sliderLength = sliderItem.length;
			var sliderWidth = slider.width();
			var itemWidth = sliderItem.width();
			var itemPerView = Math.floor(sliderWidth / itemWidth);
			var maxItemHeight = 0;
			var sliderHeight = 0;
			var prev = slider.children('.swiper-button-prev')
			var next = slider.children('.swiper-button-next')

			if(sliderLength < 2 * itemPerView){
				sliderWrapper.append(sliderItem.clone());
				sliderItem = slider.find('.slider__item');
				sliderLength = sliderItem.length;
			}

			for (var i = 0; i< sliderLength; i++){
				if (sliderItem.eq(i).height() > maxItemHeight){
					maxItemHeight = sliderItem.eq(i).height();
				}
			}
			sliderWrapper.height(maxItemHeight);
			sliderItem.css({'position':'absolute', 'top': 0});
			for (var i=0; i< sliderLength; i++){
				sliderItem.eq(i).css({'left':itemWidth * i});
			}

			var sliderText = slider.siblings('.slider-text, .other-news__texts');
			var sliderTextContainer = sliderText.children('.slider-text__tab, .other-news__tab');

			var currentItem = 0;
			var nextItem;

			prev.click(function(){
				if(currentItem + itemPerView < sliderLength){
					nextItem = currentItem + itemPerView;
				}
				else{
					nextItem = currentItem + itemPerView - sliderLength;
				}
				var endElements = currentItem + itemPerView; // Show how many items from ends needs to show
				var headElements = 0;                      // Show how many items from head needs to show
				if (endElements >= sliderLength){
					headElements = endElements - sliderLength;
					endElements = sliderLength;
				}
				for (var i = currentItem; i < endElements; i++){
					sliderItem.eq(i).css({'left': (i - currentItem) * itemWidth});
				}
				for (var i = 0; i < headElements; i++){
					sliderItem.eq(i).css({'left': (itemPerView - headElements + i) * itemWidth});
				}
				for (var i = headElements; i < currentItem; i++){
					sliderItem.eq(i).css({'left': (currentItem - i) * -1 * itemWidth});
				}
				for (var i = currentItem + itemPerView + 1; i < sliderLength; i++){
					sliderItem.eq(i).css({'left': (sliderLength - i + currentItem) * -1 * itemWidth});
				}
				sliderItem.each(function(){
					$(this).animate({'left': parseInt($(this).css('left')) + (itemWidth * itemPerView)})
				});
				currentItem = nextItem;

				sliderTextContainer.hide();
				sliderTextContainer.eq(currentItem).fadeIn();

			});
			next.click(function(){
				if(currentItem + itemPerView < sliderLength){
					nextItem = currentItem + itemPerView;
				}
				else{
					nextItem = itemPerView - (sliderLength - currentItem);
				}
				for(var i = currentItem; i < sliderLength; i++){
					sliderItem.eq(i).css({'left':itemWidth * (i - currentItem)});
				}
				for(var i = 0; i < currentItem; i++){
					sliderItem.eq(i).css({'left':itemWidth * (i + sliderLength - currentItem)});
				}
				sliderItem.each(function(){
					$(this).animate({'left': parseInt($(this).css('left')) - (itemWidth * itemPerView)})
				});
				currentItem = nextItem;

				sliderTextContainer.hide();
				sliderTextContainer.eq(currentItem).fadeIn();

			});
		});
	}


	// Children page show/hide text
	var childrenNumber = $('.children-info__description').length;
	for (var i=0; i < childrenNumber; i++){
		$('.children-info__description').eq(i).css({'z-index': 1000-i});
	}

	$('.children-info__description .switch').on('click', function(){
		var button = $(this);
		var text = button.prev('.text');
		var open = button.children('.open');
		var closed = button.children('.closed');
		if ((text).hasClass('expanded')){
			text.removeClass('expanded');
//			text.parent().removeClass('text-expanded');
			open.hide();
			closed.show();
		}
		else{
			text.addClass('expanded');
//			text.parent().addClass('text-expanded');
			open.show();
			closed.hide();
		}
	});


	// Section page toggle text
	$('.section__authority .title').on('click', function(){
		$(this).parent().toggleClass('collapsed');
		$(this).siblings('.description').slideToggle();
	});
	// Section page news height
	if($(window).width() >= 768){
		var sectionNews = 0;
		$('.section-news').each(function(){
			if($(this).height() > sectionNews){
				sectionNews = $(this).height();
			}
		});
		$('.section-news').height(sectionNews);
	}


	/*
	 * Tables
	 */
	$("[class^='minitable']").click(function(){
		$("html").toggleClass( $(this).attr("class") );
		if($(this).css('display') === 'table'){
			$(this).removeAttr('style');
		}
		else{
			$(this).css({'display':'table'});
		}
	});

	/*
	 * Post page photos
	 */
	var colorboxIndex = 0;
	$('.post-page__photos a').click(function(e){
		e.preventDefault();
		colorboxIndex = $(this).index();
		// Create images if isn't exits
		if($('.colorbox__content').children('img').length == 0){
			$('.post-page__photos a').each(function(){
				var url = $(this).data('url');
				$('.colorbox__content').append('<img src="'+ url +'">');
			});
		}
		$('.colorbox__content img').hide();
		$('.colorbox__content img').eq(colorboxIndex).show();
		$('.colorbox').fadeIn(150);

	});
	$('.colorbox, .colorbox .times').click(function(){
		var colorbox = $('.colorbox');
		colorbox.fadeOut(150);
	});
	$('.colorbox *').click(function(e){
		e.stopPropagation();
	});
	$('.colorbox .arrow--left').click(function(){
		var nextIndex = colorboxIndex - 1;
		if (nextIndex < 0){nextIndex = $('.colorbox__content img').length - 1;}
		colorboxIndex = nextIndex;
		$('.colorbox__content img').hide();
		$('.colorbox__content img').eq(colorboxIndex).fadeIn();
	});
	$('.colorbox__content').on('click', 'img', function(){
		right();
	});
	$('.colorbox__content .arrow--right').click(function(){
		right();
	});
	var right = function(){
		var nextIndex = colorboxIndex + 1;
		if (nextIndex === $('.colorbox__content img').length){nextIndex = 0;}
		colorboxIndex = nextIndex;
		$('.colorbox__content img').hide();
		$('.colorbox__content img').eq(colorboxIndex).fadeIn();
	};


	/*
	 * Accessibility
	 */

	// Change font-size
	$('.sizes--normal').on('click', function(e){
		e.preventDefault();
		$('body').removeClass('medium big');
	});
	$('.sizes--one-and-half').on('click', function(e){
		e.preventDefault();
		$('body').removeClass('big').addClass('medium');
	});
	$('.sizes--double').on('click', function(e){
		e.preventDefault();
		$('body').removeClass('medium').addClass('big');
	});

	// Change color scheme
	$('.color.color--white').click(function (e){
		e.preventDefault();
		$('link[href^="css/black.css"]').attr('href','css/white.css');
	});
	$('.color.color--black').click(function (e){
		e.preventDefault();
		$('link[href^="css/white.css"]').attr('href','css/black.css');
	});

});

// Prepare linked text for looped swiper slider
var cloneText = function(text){
	var firstEl = text.children().eq(0).clone();
	var lastEl = text.children().eq(text.children().length - 1).clone();
	firstEl.appendTo(text);
	lastEl.prependTo(text);
};

