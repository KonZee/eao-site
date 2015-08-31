(function($){

	$.fn.simpleSlider = function(){

		var options = ({
			showItems: 1,
			navOutside: false,
			sideText: false,
		});

		this.each(function(){
			var slider= $(this);

			// Get data
			var showItems = slider.data('showitems');
			if (showItems === undefined) {showItems = options.showItems;}
			var sideText = slider.data('side-text');
			if (sideText === undefined) {
				sideText = options.sideText;

			}

			// Get slider items
			var sliderItem = slider.find('li');
			// Number of items
			var sliderLength = sliderItem.length;
			// Container
			var sliderContainer = slider.find('ul');

			// Current and next item
			var currentItem = 0;
			var nextItem;

			// If text exist, assign class to current text item
			if(sideText){
				var sliderText = $(this).siblings('.slider-text').find('.slider-text__item');
				sliderText.eq(currentItem).addClass('active');
			}

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

					// Update side text if exist
					if(sideText){
						sliderText.eq(currentItem).removeClass("active");
						sliderText.eq(nextItem).addClass("active");
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

					// Update side text if exist
					if(sideText){
						sliderText.eq(currentItem).removeClass("active");
						sliderText.eq(nextItem).addClass("active");
					}

					// Assign new current item
					currentItem = nextItem;
				}
			});

			// Text click
			if(sideText){
				sliderText.click(function(){
					nextItem = $(this).index();
					//console.log('currentItem: ', currentItem)
					var deltaLeft = 0;
					var deltaRight = 0;
					if(nextItem !== currentItem){
						if(nextItem > currentItem){
							//console.log("Higher");
							deltaRight = nextItem - currentItem;
							deltaLeft = sliderLength - nextItem + currentItem;
							//console.log("Delta left: ", deltaLeft, " Delta right: ", deltaRight);
						}
						else{
							//console.log("Less");
							deltaLeft = currentItem - nextItem;
							deltaRight = sliderLength - currentItem + nextItem;
							//console.log("Delta left: ", deltaLeft, " Delta right: ", deltaRight);
						}
					}
					// Move right
					if (deltaLeft >= deltaRight){
						//console.log("right");
						for (var i = 1; i <= deltaRight; i++){
							//console.log("i: ",i);
							if(i + currentItem < sliderLength){
								sliderItem.eq(currentItem + i).css({'left': (i * offset + (offset - itemWIdth)/2 )});
							}
							else{
								sliderItem.eq(currentItem + i - sliderLength).css({'left': (i * offset + (offset - itemWIdth)/2 )});
							}
						}
						sliderItem.each(function(){
							$(this).animate({'left': parseInt($(this).css('left')) - offset * deltaRight});
						});
					}
					// Move left
					else{
						//console.log("left");
						for (var i = 1; i <= deltaLeft; i++){
							//console.log("i: ",i);
							if(currentItem - i >=0){
								sliderItem.eq(currentItem - i).css({'left': (i * -1 * offset + (offset - itemWIdth)/2 )});
							}
							else{
								sliderItem.eq(sliderLength + currentItem - i).css({'left': (i * -1 * offset + (offset - itemWIdth)/2 )});
							}
						}
						sliderItem.each(function(){
							$(this).animate({'left': parseInt($(this).css('left')) + offset * deltaLeft});
						});
					}
					sliderText.eq(currentItem).removeClass("active");
					sliderText.eq(nextItem).addClass("active");
					currentItem = nextItem;
				});
			}

		});

		return this;
	}
}( jQuery ));