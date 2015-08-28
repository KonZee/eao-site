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

			// Get slider items
			var sliderItem = slider.find('li');
			// Number of items
			var sliderLength = sliderItem.length;
			// Container
			var sliderContainer = slider.find('ul');

			// Current and next item
			var currentItem = 0;
			var nextItem;
			// Exit, if slider contain no more than 1 item
			if(sliderLength <= showItems){
				sliderContainer.addClass('inline');
				sliderContainer.siblings('.js-next').hide();
				sliderContainer.siblings('.js-prev').hide();
				return;
			}
			// Get navigation position and setup margins for outside nav
			if (slider.data('nav-outside') === true){sliderContainer.css('margin', '0 60px');}

			// Set fixed size for container
			// Width
			var sliderWidth = sliderContainer.width();
			var itemWIdth = sliderItem.width();
			// height
			var maxHeight = 0;
			sliderItem.each(function(){
				if ($(this).height() > maxHeight){maxHeight = $(this).height();}
			});

			sliderContainer.height(maxHeight);
			sliderContainer.width(sliderContainer.width());

			// Set position of elements
			var offset = sliderWidth / showItems;
			for(var i=0; i < sliderLength; i++){
				//console.log(sliderWidth, currentItem, i, offset, itemWIdth);
				sliderItem.eq(i).css({'position':'absolute','left': (offset * i + (offset - itemWIdth)/2 ), 'width': itemWIdth});
			}

			//Click left
			sliderContainer.siblings('.js-prev').click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('disabled')){
					// Store number of moving slides, visible item in sliders
					var delta = showItems;

					//console.log("CURRENT ITEM:" + currentItem);

					// Move slider
					// Slider in left position
					if(currentItem === 0){
						nextItem = sliderLength - showItems;
						// Items more two times than in slider view, just move it before
						if ((sliderLength / showItems) >= 2){
							for(var i=1; i <= (sliderLength - showItems); i++){
								sliderItem.eq(sliderLength - i).css({'left': (offset * -1 * i  + (offset - itemWIdth)/2 )});
							}
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) + sliderWidth});
							});
						}
						// Items less two times than in slider view, need to clone or move in other direction (currently move in other direction)
						else{
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) - offset * (sliderLength - showItems)});
							});
						}

					}
					// Slider in other position
					else{
						if (currentItem < showItems){
							delta = showItems - currentItem;
							//console.log("delta: "+delta);
							if ((sliderLength / showItems) >= 2){
								// First items
								for(var i=1; i <= currentItem; i++){
									sliderItem.eq(currentItem - i).css({'left': (offset * -1 * i  + (offset - itemWIdth)/2 )});
								}
								// Last items
								for(var i = 1; i <= delta; i++){
									//console.log("I:"+ i, "sliderLength - i: " + (sliderLength - i));
									sliderItem.eq(sliderLength - i).css({'left': (offset * -1 * (i+currentItem)  + (offset - itemWIdth)/2 )});
									nextItem = sliderLength - i;
								}
								sliderItem.each(function(){
									$(this).animate({'left': parseInt($(this).css('left')) + offset * showItems});
								});
							}
							else{
								nextItem = 0;
								sliderItem.each(function(){
									$(this).animate({'left': parseInt($(this).css('left')) + offset * currentItem});
								});
							}
							//console.log("NEXT ITEM: "+nextItem);
						}
						else{
							nextItem = currentItem - showItems;
							for(var i=0; i <= showItems; i++){
								//console.log(i);
								sliderItem.eq(currentItem - i).css({'left': (offset * -1 * i  + (offset - itemWIdth)/2 )});
							}
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) + offset * showItems});
							});
						}
						//console.log("currentItem: "+currentItem + ", delta: "+ delta );
					}
					// Add disable class for animation time (a little bit less)
					$('.arrow').addClass('disabled');
					setTimeout(function () {
						$(".arrow").removeClass('disabled');
					}, 400);
					// Switch slide
					//console.log(delta);
					for(var i = currentItem; i < (currentItem + showItems); i++){
						//console.log(i);
						if (currentItem === 0){

						}
					}
					// Set new slide to current
					currentItem = nextItem;
				}
			});

			//Click right
			sliderContainer.siblings('.js-next').click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('disabled')){
					// Store number of moving slides, visible item in sliders

					//console.log("CURRENT ITEM:" + currentItem);
					//console.log("sliderLength - showItems:" + (sliderLength - showItems));

					// Long sliders
					if ((sliderLength / showItems) >= 2){
						//console.log("Long slider")
						// Need to move some  items for scroll
						if(currentItem >= (sliderLength - 2 * showItems)){
							//console.log("currentItem >= (sliderLength - 2 * showItems)");
							// Get new item
							nextItem = currentItem + showItems;
							if(nextItem >= sliderLength){
								nextItem = nextItem - sliderLength;
							}
							// Setup items for scroll
							var countLast = 0; // Count items
							for(var i = currentItem + showItems; i < sliderLength; i++){
								var n = i - currentItem;
								//console.log("i: "+i);
								sliderItem.eq(i).css({'left': (n * offset + (offset - itemWIdth)/2 )});
								countLast++;
							}
							if (nextItem > currentItem){
								for(var i = 0; i < showItems - countLast; i++){
									//console.log("i aa: "+i);
									sliderItem.eq(i).css({'left': ((showItems + i + countLast) * offset + (offset - itemWIdth)/2 )});
								}
							}
							else{
								for(var i = nextItem; i < nextItem + showItems; i++){
									var n = i - nextItem + showItems;
									//console.log("i bb: "+i);
									sliderItem.eq(i).css({'left': (n * offset + (offset - itemWIdth)/2 )});
								}
							}
							//console.log("NEXT ITEM:" + nextItem);
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) - sliderWidth});
							});
						}
						// Just scroll
						else{
							//console.log("Just scroll", "currentItem < (sliderLength - 2 * showItems)");
							nextItem = currentItem + showItems;
							for(var i = 0; i < showItems; i++){
								//console.log("I: ",i, " Current item: ", currentItem, " currentItem + showItems + i: ", currentItem + showItems + i);
								sliderItem.eq(currentItem + showItems + i).css({'left': ((showItems + i) * offset + (offset - itemWIdth)/2 )});
							}
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) - sliderWidth});
							});
						}
					}
					// Short sliders
					else{
						//console.log("short slider")
						if(currentItem === (sliderLength - showItems)){
							nextItem = 0;
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) + offset * currentItem});
							});
						}
						else{
							nextItem = sliderLength - showItems;
							sliderItem.each(function(){
								$(this).animate({'left': parseInt($(this).css('left')) - offset * (sliderLength - showItems)});
							});
						}
					}

					// Assign new current item
					currentItem = nextItem;
				}
			});



		});

		return this;
	}
}( jQuery ));