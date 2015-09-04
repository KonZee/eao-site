$(document).ready(function(){

	var screenMD = 992;

	// Language selector
	$('.topmenu__lang a').click(function(e){
		e.preventDefault();
	});

	// Tabs
	$('.news-panel__tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	// Init slider
	// $('.slider').simpleSlider();

	// Another slider zoo
	slidersInit();

	// Mobile menu
	$('.menu__hamburger').click(function(){
		$(this).siblings('ul').slideToggle();
	});

	// Load more news
	$('.js-load-more').click(function(e){
		e.preventDefault();
		$.ajax({
			url: "morenews.html",
			datatype: 'html',
			success: function(html){
				$(html).insertBefore($('#more-news-placeholder'));
			}
		});
	});

});


var slidersInit = function(){
	var screenXS = 480;
	var screenSM = 768;

	$('.js-slider-single').each(function(){
		var slider = $(this);
		var sliderContainer = $(this).children('.slider__container');
		var sliderItem = slider.find('.slider__item');
		var sliderLength = sliderItem.length;
		var sliderWidth = slider.width();
		var itemWidth = sliderWidth;
		var currentItem = 0;
		var nextItem;
		$.when(getSize(sliderContainer)).then(function(){
			console.log(sliderWidth);
			sliderItem.css({'display':'block', 'position':'absolute', 'width': itemWidth});
			for(var i=0; i< sliderLength; i++){
				sliderItem.eq(i).css({'left': i * itemWidth});
			}
		});

		// Click left
		slider.children('.js-prev').click(function(e){
			e.preventDefault();
			nextItem = currentItem - 1;
			if (nextItem < 0){nextItem = sliderLength - 1;}

			moveLeft(currentItem, sliderItem, sliderLength, itemWidth);

			currentItem = nextItem;

			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}

			moveRight(currentItem, sliderItem, sliderLength, itemWidth);

			currentItem = nextItem;

			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
		});

		// Add points navigation
		if(slider.children('.slider__nav').length > 0){
			var sliderNav = slider.children('.slider__nav');
			for(var i = 0; i < sliderLength; i++){
				//$('.slider__nav').append($('<div/>').addClass('slider__click'));
				if(i === 0){
					sliderNav.append('<div class="js-circle-nav active"></div>')
				}
				else{
					sliderNav.append('<div class="js-circle-nav"></div>')
				}
			}
			sliderNav.on('click', '.js-circle-nav', function(){
				var index = $(this).index();
				if (index !== currentItem){
					nextItem = index;

					// Check short way
					var deltaLeft = 0;
					var deltaRight = 0;
					if(nextItem > currentItem){
						deltaRight = nextItem - currentItem;
						deltaLeft = sliderLength - nextItem + currentItem;
					}
					else{
						deltaLeft = currentItem - nextItem;
						deltaRight = sliderLength - currentItem + nextItem;
					}


					// Move right
					if (deltaLeft >= deltaRight){
						moveRight(currentItem, sliderItem, sliderLength, itemWidth);
					}
					// Move left
					else{
						moveLeft(currentItem, sliderItem, sliderLength, itemWidth);
					}

					$(this).addClass('active').siblings().removeClass('active');
					currentItem = nextItem;


				}
			});
		}
	});

	$('.js-slider-multiply').each(function(){
		var slider = $(this);
		var sliderContainer = $(this).children('.slider__container');
		var sliderItem = slider.find('.slider__item');
		var sliderLength = sliderItem.length;
		var sliderWidth = slider.width();
		var currentItem = 0;
		var nextItem;
		var itemWidth = sliderItem.width();
		var showItems = sliderWidth / itemWidth;

		// Variable for short slider
		var doubled = false;

		// Clone items if needs
		if(sliderLength < showItems * 2){
			sliderContainer.append(sliderItem.clone());
			sliderLength *= 2;
			sliderItem = slider.find('.slider__item');
			doubled = true;
		}

		$.when(getSize(sliderContainer)).then(function(){
			console.log(sliderWidth);
			sliderItem.css({'display':'block', 'position':'absolute', 'width': itemWidth});
			for(var i=0; i< sliderLength; i++){
				sliderItem.eq(i).css({'left': i * itemWidth});
			}
		});

		// Click left
		slider.children('.js-prev').click(function(e){
			e.preventDefault();
			nextItem = currentItem - showItems;
			if (nextItem < 0){nextItem = sliderLength + nextItem;}

			console.log('currentItem: ', currentItem, ' nextItem: ', nextItem);

			moveLeft(currentItem, sliderItem, sliderLength, itemWidth, showItems);

			currentItem = nextItem;

			if(doubled){
				hideDoubles(sliderNav.children('.js-circle-nav'), currentItem, sliderLength);
			}
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');

		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + showItems;
			if(nextItem >= sliderLength){nextItem = nextItem - sliderLength;}


			moveRight(currentItem, sliderItem, sliderLength, itemWidth, showItems);

			currentItem = nextItem;

			if(doubled){
				hideDoubles(sliderNav.children('.js-circle-nav'), currentItem, sliderLength);
			}
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');

		});

		// Add points navigation
		if(slider.children('.slider__nav').length > 0){
			var sliderNav = slider.children('.slider__nav');
			for(var i = 0; i < sliderLength; i++){
				//$('.slider__nav').append($('<div/>').addClass('slider__click'));
				if(i === 0){
					sliderNav.append('<div class="js-circle-nav active"></div>')
				}
				else{
					sliderNav.append('<div class="js-circle-nav"></div>')
				}
			}
			// if slider doubled, hide half or circle
			if(doubled){
				hideDoubles(sliderNav.children('.js-circle-nav'), currentItem, sliderLength);
			}

			sliderNav.on('click', '.js-circle-nav', function(){
				var index = $(this).index();
				if (index !== currentItem){
					nextItem = index;

					// Check short way
					var deltaLeft = 0;
					var deltaRight = 0;
					if(nextItem > currentItem){
						deltaRight = nextItem - currentItem;
						deltaLeft = sliderLength - nextItem + currentItem;
					}
					else{
						deltaLeft = currentItem - nextItem;
						deltaRight = sliderLength - currentItem + nextItem;
					}


					// Move right
					if (deltaLeft >= deltaRight){
						console.log(currentItem, sliderLength, sliderWidth, showItems)
						moveRight(currentItem, sliderItem, sliderLength, itemWidth, showItems, deltaRight);
					}
					// Move left
					else{
						console.log(currentItem, sliderLength, sliderWidth, showItems)
						moveLeft(currentItem, sliderItem, sliderLength, itemWidth, showItems, deltaLeft);
					}

					$(this).addClass('active').siblings().removeClass('active');

					currentItem = nextItem;
				}
			});
		}
	});



	$('.js-slider-text').each(function(){
		var slider = $(this);
		var sliderContainer = $(this).children('.slider__container');
		var sliderItem = slider.find('.slider__item');
		var sliderLength = sliderItem.length;
		var sliderWidth = slider.width();
		var itemWidth = sliderWidth;
		var currentItem = 0;
		var nextItem;
		var sliderText = slider.siblings('.slider-text');
		var sliderTextContainer = sliderText.children('.slider-text__tab');
		console.log("sliderTextContainer: ", sliderTextContainer);
		$.when(getSize(sliderContainer)).then(function(){
			console.log(sliderWidth);
			sliderItem.css({'display':'block', 'position':'absolute', 'width': itemWidth});
			for(var i=0; i< sliderLength; i++){
				sliderItem.eq(i).css({'left': i * itemWidth});
			}
		});

		// Click left
		slider.children('.js-prev').click(function(e){
			e.preventDefault();
			nextItem = currentItem - 1;
			if (nextItem < 0){nextItem = sliderLength - 1;}

			moveLeft(currentItem, sliderItem, sliderLength, itemWidth);

			currentItem = nextItem;

			changeTextContainer(sliderTextContainer, currentItem);
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}

			moveRight(currentItem, sliderItem, sliderLength, itemWidth);

			currentItem = nextItem;

			changeTextContainer(sliderTextContainer, currentItem);
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
		});

		// Add points navigation
		if(slider.children('.slider__nav').length > 0){
			var sliderNav = slider.children('.slider__nav');
			for(var i = 0; i < sliderLength; i++){
				//$('.slider__nav').append($('<div/>').addClass('slider__click'));
				if(i === 0){
					sliderNav.append('<div class="js-circle-nav active"></div>')
				}
				else{
					sliderNav.append('<div class="js-circle-nav"></div>')
				}
			}
			sliderNav.on('click', '.js-circle-nav', function(){
				var index = $(this).index();
				if (index !== currentItem){
					nextItem = index;

					// Check short way
					var deltaLeft = 0;
					var deltaRight = 0;
					if(nextItem > currentItem){
						deltaRight = nextItem - currentItem;
						deltaLeft = sliderLength - nextItem + currentItem;
					}
					else{
						deltaLeft = currentItem - nextItem;
						deltaRight = sliderLength - currentItem + nextItem;
					}


					// Move right
					if (deltaLeft >= deltaRight){
						moveRight(currentItem, sliderItem, sliderLength, itemWidth);
					}
					// Move left
					else{
						moveLeft(currentItem, sliderItem, sliderLength, itemWidth);
					}

					$(this).addClass('active').siblings().removeClass('active');
					currentItem = nextItem;
					changeTextContainer(sliderTextContainer, currentItem);
				}
			});
		}
	});

	$('.js-slider-tabs').each(function(){
		var currentItem = 0;
		var nextItem;
		var slider = $(this);
		var sliderTab = slider.find('.news-panel__tab');
		var sliderLength = sliderTab.length;
		var itemWidth = slider.width();
		sliderTab.css({'display':'block', 'position':'absolute', 'width': itemWidth});
		for(var i=0; i< sliderLength; i++){
			sliderTab.eq(i).css({'left': i * itemWidth});
		}
		slider.children('.js-prev').click(function(e){
			e.preventDefault();
			nextItem = currentItem - 1;
			if (nextItem < 0){nextItem = sliderLength - 1;}
			console.log("Next item: ", nextItem);
			sliderTab.eq(nextItem).children('a').trigger('click');
			moveLeft(currentItem, sliderTab, sliderLength, itemWidth);
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
			currentItem = nextItem;
		});
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}
			console.log("Next item: ", nextItem);
			sliderTab.eq(nextItem).children('a').trigger('click');
			moveRight(currentItem, sliderTab, sliderLength, itemWidth);
			slider.find('.js-circle-nav').eq(nextItem).addClass('active').siblings().removeClass('active');
			currentItem = nextItem;
		});

		// Add points navigation
		if(slider.children('.slider__nav').length > 0){
			var sliderNav = slider.children('.slider__nav');
			for(var i = 0; i < sliderLength; i++){
				if(i === 0){
					sliderNav.append('<div class="js-circle-nav active"></div>')
				}
				else{
					sliderNav.append('<div class="js-circle-nav"></div>')
				}
			}
			sliderNav.on('click', '.js-circle-nav', function(){
				var index = $(this).index();
				if (index !== currentItem){
					nextItem = index;

					// Check short way
					var deltaLeft = 0;
					var deltaRight = 0;
					if(nextItem > currentItem){
						deltaRight = nextItem - currentItem;
						deltaLeft = sliderLength - nextItem + currentItem;
					}
					else{
						deltaLeft = currentItem - nextItem;
						deltaRight = sliderLength - currentItem + nextItem;
					}


					// Move right
					if (deltaLeft >= deltaRight){
						moveRight(currentItem, sliderTab, sliderLength, itemWidth);
					}
					// Move left
					else{
						moveLeft(currentItem, sliderTab, sliderLength, itemWidth);
					}

					$(this).addClass('active').siblings().removeClass('active');
					currentItem = nextItem;


				}
			});
		}
	});


};


var getSize = function(slider){
	var maxHeight = 0;
	var maxWidth = 0
	slider.find('img').load(function(){
		slider.find('.slider__item').each(function(){
			if($(this).height() > maxHeight){
				maxHeight = $(this).height();
			}
		});
		slider.height(maxHeight);
	});
};

// Move left function
var moveLeft = function(currentItem, sliderItem , sliderLength, itemWidth, showItems, deltaLeft){
	if(showItems === undefined){showItems = 1}
	var endElements = currentItem + showItems; // Show how many items from ends needs to show
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
		sliderItem.eq(i).css({'left': (showItems - headElements + i) * itemWidth});
	}
	for (var i = headElements; i < currentItem; i++){
		sliderItem.eq(i).css({'left': (currentItem - i) * -1 * itemWidth});
	}
	for (var i = currentItem + showItems + 1; i < sliderLength; i++){
		sliderItem.eq(i).css({'left': (sliderLength - i + currentItem) * -1 * itemWidth});
	}
	var switcher;
	if(deltaLeft !== undefined){switcher = deltaLeft} else {switcher = showItems}
	sliderItem.each(function(){
		$(this).animate({'left': parseInt($(this).css('left')) + (itemWidth * switcher)});
	});
}
// Move right function
var moveRight = function(currentItem, sliderItem , sliderLength, itemWidth, showItems, deltaRight){
	if(showItems === undefined){showItems = 1}
	for(var i = currentItem; i < sliderLength; i++){
		sliderItem.eq(i).css({'left': (i - currentItem) * itemWidth});
	}
	for(var i = 0; i < currentItem; i++){
		sliderItem.eq(i).css({'left': (sliderLength - currentItem + i) * itemWidth});
	}
	var switcher;
	if(deltaRight !== undefined){switcher = deltaRight} else {switcher = showItems}
	sliderItem.each(function(){
		$(this).animate({'left': parseInt($(this).css('left')) - (itemWidth * switcher)});
	});
}

var hideDoubles = function(circles, currentItem, sliderLength){
	circles.show();
	if(currentItem < sliderLength / 2){
		circles.slice(sliderLength / 2, sliderLength).hide();
	}
	else{
		circles.slice(0, sliderLength / 2).hide();
	}
}

var changeTextContainer = function(text, currentItem){
	text.hide();
	text.eq(currentItem).fadeIn();
}
