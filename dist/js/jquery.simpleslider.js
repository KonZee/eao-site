(function($){

	$.fn.simpleSlider = function(){

		var options = ({
			showItems: 1,
			navOutside: false,
			sideText: false,
		});

		this.each(function(){
			var slider= $(this);

			// Get number of items in view
			var showItems = slider.data('showitems');
			if (showItems === undefined) {showItems = options.showItems;}
			// Variable for store image size
			var offset;

			// Get slider items
			var sliderItem = slider.find('li');
			// Number of items
			var sliderLength = sliderItem.length;
			// Container
			var sliderContainer = slider.find('ul');
			// Get navigation position and setup margins for outside nav
			if (slider.data('nav-outside') === true){sliderContainer.css('margin', '0 60px');}

			// Width
			var sliderWidth = sliderContainer.width();
			var itemWIdth = sliderItem.width();

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
			// height
			var maxHeight = 0;
			sliderItem.each(function(){
				if ($(this).height() > maxHeight){maxHeight = $(this).height();}
			});

			sliderContainer.height(maxHeight);
			sliderContainer.width(sliderContainer.width());

			// Set position of elements
			if (showItems === 1){
				sliderItem.css({'position':'absolute', 'left': sliderWidth, 'width': sliderWidth, 'display': 'block'});
				sliderItem.eq(currentItem).css({'left': 0});
			}
			else{
				offset = sliderWidth / showItems;
				sliderItem.css({'position':'absolute', 'left': sliderWidth});
				for(var i=0; i < showItems; i++){
					console.log(currentItem, i, offset,itemWIdth);
					sliderItem.eq(i).css({'left': (offset * i + (offset - itemWIdth)/2 )});
				}
			}

			//Click left
			sliderContainer.siblings('.js-prev').click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('disabled')){
					// Get the next slide
					if(currentItem === 0){
						nextItem = sliderLength - showItems;
					}
					else{
						nextItem = currentItem - showItems;
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
						nextItem = currentItem + showItems;
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

		return this;
	}
}( jQuery ));