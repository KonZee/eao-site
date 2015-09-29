$(document).ready(function(){

	// Tabs
	$('.news-panel__tabs a').click(function (e) {
		e.preventDefault();
		if($(this).parent().hasClass("active")){
			var url = $(this).data('url');
			window.location.replace(url);
		}
		$(this).tab('show');
	});

	// Mobile menu
	$('.menu__hamburger').click(function(){
		$(this).siblings('ul').slideToggle();
	});

	// Check ie9
	var ua = window.navigator.userAgent;
	var msie = parseInt(ua.split('MSIE')[1]);

	if(msie !=9){

		// Enable sliders
		// Top left frontpage slider
		var swiper1 = new Swiper('.swiper-1', {
			pagination: '.swiper-pagination-1',
			paginationClickable: true,
			nextButton: '.swiper-button-next-1',
			prevButton: '.swiper-button-prev-1',
			loop: true,
		});
		// Tabs/slider (top right) frontpage slider

		// First small wide frontpage slider
		var swiper3 = new Swiper('.swiper-3', {
			pagination: '.swiper-pagination-3',
			paginationClickable: true,
			nextButton: '.swiper-button-next-3',
			prevButton: '.swiper-button-prev-3',
			loop: true,
			slidesPerView: 'auto',
		});

		// Bottom left frontpage slider
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

		// Bottom right frontpage slider
		var swiper5 = new Swiper('.swiper-5', {
			pagination: '.swiper-pagination-5',
			paginationClickable: true,
			nextButton: '.swiper-button-next-5',
			prevButton: '.swiper-button-prev-5',
			loop: true,
		});

		// Second small wide frontpage slider
		var swiper6 = new Swiper('.swiper-6', {
			pagination: '.swiper-pagination-6',
			paginationClickable: true,
			nextButton: '.swiper-button-next-6',
			prevButton: '.swiper-button-prev-6',
			loop: true,
			slidesPerView: 'auto',
		});

		// News page slider
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
					console.log("Show end items i: ", i)
					sliderItem.eq(i).css({'left': (i - currentItem) * itemWidth});
				}
				for (var i = 0; i < headElements; i++){
					console.log("Show head items i: ", i)
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
			});
		});
	}


	// Children page show/hide text
	$('.children-info__description .switch').on('click', function(){
		var button = $(this);
		var text = button.prev('.text');
		var open = button.children('.open');
		var closed = button.children('.closed');
		if ((text).hasClass('expanded')){
			text.removeClass('expanded');
			open.hide();
			closed.show();
		}
		else{
			text.addClass('expanded');
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

