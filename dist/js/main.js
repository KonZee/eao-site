$(document).ready(function(){

	// Language selector
	$('.topmenu__lang a').click(function(e){
		e.preventDefault();
	});

	// Init tabs
	$('.news-panel__tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
	})

	// Init slider
	// $('.slider').simpleSlider();

	// Another slider zoo
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
		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}

			moveRight(currentItem, sliderItem, sliderLength, itemWidth);

			currentItem = nextItem;
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
						moveRight(currentItem, sliderItem, sliderLength, sliderWidth);
					}
					// Move left
					else{
						moveLeft(currentItem, sliderItem, sliderLength, sliderWidth);
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

		// Clone items if needs
		if(sliderLength < showItems * 2){
			sliderContainer.append(sliderItem.clone());
			sliderLength *= 2;
			sliderItem = slider.find('.slider__item');
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
			nextItem = currentItem - 1;
			if (nextItem < 0){nextItem = sliderLength - 1;}

			moveLeft(currentItem, sliderItem, sliderLength, itemWidth, showItems);

			currentItem = nextItem;
		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}

			moveRight(currentItem, sliderItem, sliderLength, itemWidth, showItems);

			currentItem = nextItem;
		});

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
var moveLeft = function(currentItem, sliderItem , sliderLength, itemWidth, showItems){
	if(showItems === undefined){showItems = 1}
	for (var i = currentItem + 1; i < sliderLength; i++){
		sliderItem.eq(i).css({'left': (sliderLength - i + currentItem) * -1 * itemWidth}	);
	}
	for (var i = 0; i <= currentItem; i++){
		sliderItem.eq(i).css({'left': (currentItem - i) * -1 * itemWidth}	);
	}
	sliderItem.each(function(){
		//$(this).animate({'left': parseInt($(this).css('left')) + itemWidth});
	});
}
// Move right function
var moveRight = function(currentItem, sliderItem , sliderLength, itemWidth, showItems){
	if(showItems === undefined){showItems = 1}
	for(var i = currentItem; i < sliderLength; i++){
		sliderItem.eq(i).css({'left': (i - currentItem) * itemWidth});
	}
	for(var i = 0; i < currentItem; i++){
		sliderItem.eq(i).css({'left': (sliderLength - currentItem + i) * itemWidth});
	}
	sliderItem.each(function(){
		$(this).animate({'left': parseInt($(this).css('left')) - itemWidth});
	});
}