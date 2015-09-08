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

	// News page frontpage slider

});



