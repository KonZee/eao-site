$(document).ready(function(){

	// Language selector
	$('.topmenu__lang a').click(function(e){
		e.preventDefault();
	});

	// Init slider
	indexSlider('.slider');

	// Init tabs
	$('.news-panel__tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
	})

	$('.slider').simpleSlider();

});

var indexSlider = function(slider){
	$(slider).each(function(){
		var slider = $(this);
		// Get sliders
		var sliderItem = slider.find('li')
		// Number of items
		var sliderLength = sliderItem.length;
		// Container
		var sliderContainer = slider.find('ul');
		// Width
		var sliderWidth = sliderContainer.width();
		// Current and next item
		var currentItem = 0;
		var nextItem;
		// Exit, if slider contain no more than 1 item
		if(sliderLength <= 1){
			sliderContainer.siblings('.js-next').hide();
			sliderContainer.siblings('.js-prev').hide();
			return;
		}
		// Set fixed size for container
		sliderContainer.height(sliderItem.height());
		sliderContainer.width(sliderContainer.width());

		// Set position of elements, first in view, all other out of view
		sliderItem.css({'position':'absolute', 'left': sliderWidth, 'width': sliderWidth, 'display': 'block'});
		sliderItem.eq(currentItem).css({'left': 0});

		//Click left
		sliderContainer.siblings('.js-prev').click(function(e){
			e.preventDefault();
			if (!$(this).hasClass('disabled')){
				// Get the next slide
				if(currentItem === 0){
					nextItem = sliderLength - 1;
				}
				else{
					nextItem = currentItem - 1;
				}
				// Add disable class for animation time (a little bit less)
				$('.arrow').addClass('disabled');
				setTimeout(function () {
					$(".arrow").removeClass('disabled');
				}, 380);
				// Switch slide
				sliderItem.eq(currentItem).animate({'left': '100%'});
				sliderItem.eq(nextItem).css({'left': '-100%'}).animate({'left': 0});
				// Set new slide to current
				currentItem = nextItem;
			}
		});

		//Click right
		sliderContainer.siblings('.js-next').click(function(e){
			e.preventDefault();
			if(!$(this).hasClass('disabled')){
				// Get the next slide
				if(currentItem === (sliderLength - 1)){
					nextItem = 0;
				}
				else{
					nextItem = currentItem + 1;
				}
				// Add disable class for animation time (a little bit less)
				$('.arrow').addClass('disabled');
				setTimeout(function () {
					$(".arrow").removeClass('disabled');
				}, 380);
				// Switch slide
				sliderItem.eq(currentItem).animate({'left': '-100%'});
				sliderItem.eq(nextItem).css({'left': '100%'}).animate({'left': 0});
				// Set new slide to current
				currentItem = nextItem;
			}
		});
	});
};