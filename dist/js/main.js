$(document).ready(function(){



	// Language selector
	$('.topmenu__lang a').click(function(e){
		e.preventDefault();
	});

	// Tabs
	$('.news-panel__tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	// Mobile menu
	$('.menu__hamburger').click(function(){
		$(this).siblings('ul').slideToggle();
	});


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
	});
	// Prepare texts for swiper4
	if(swiper4.activeIndex !== undefined ){
		var swiper4Text = $('.swiper-4').siblings('.slider-text');
		cloneText(swiper4Text);
		swiper4Text.children().hide();
		swiper4Text.children().eq(swiper4.activeIndex).show();

		// Check control
		swiper4.on('click', function(){
			swiper4Text.children().hide();
			swiper4Text.children().eq(swiper4.activeIndex).fadeIn();
		});
	}


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
	});

	// Prepare texts for swiper7
	if(swiper7.activeIndex !== undefined ){
		var swiper7Text = $('.swiper-7').siblings('.other-news__texts');
		var active7 = swiper7.activeIndex
		cloneText(swiper7Text);
		swiper7Text.children().hide();
		swiper7Text.children().eq(swiper7.activeIndex).show();

		// Check control
		swiper7.on('click', function(){
			swiper7Text.children().hide();
			swiper7Text.children().eq(swiper7.activeIndex).fadeIn();
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
			closed.show()
		}
		else{
			text.addClass('expanded');
			open.show()
			closed.hide()
		}
	});

});

var cloneText = function(text){
	var firstEl = text.children().eq(0).clone();
	var lastEl = text.children().eq(text.children().length - 1).clone();
	firstEl.appendTo(text);
	lastEl.prependTo(text);
};

