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
		var sliderWidth;
		var currentItem = 0;
		var nextItem;
		$.when(getSize(sliderContainer)).then(function(){
			sliderWidth = slider.width();
			sliderItem.css({'display':'block', 'position':'absolute'});
			for(var i=0; i< sliderLength; i++){
				sliderItem.eq(i).css({'left': i * sliderWidth});
			}
		});

		// Click left
		slider.children('.js-prev').click(function(e){
			e.preventDefault();
			console.log(currentItem);
			nextItem = currentItem - 1;
			if (nextItem < 0){nextItem = sliderLength - 1;}
			for (var i = currentItem + 1; i < sliderLength; i++){
				console.log("i higher: ", i);
				sliderItem.eq(i).css({'left': (sliderLength - i + currentItem) * -1 * sliderWidth}	);
			}
			for (var i = 0; i <= currentItem; i++){
				console.log("i less: ", i);
				sliderItem.eq(i).css({'left': (currentItem - i) * -1 * sliderWidth}	);
			}
			sliderItem.each(function(){
				$(this).animate({'left': parseInt($(this).css('left')) + sliderWidth});
			});
			currentItem = nextItem;
			//moveLeft();
		});

		// Click right
		slider.children('.js-next').click(function(e){
			e.preventDefault();
			console.log(currentItem);
			nextItem = currentItem + 1;
			if(nextItem === sliderLength){nextItem = 0;}
			for(var i = currentItem; i < sliderLength; i++){
				console.log("I=",i);
				sliderItem.eq(i).css({'left': (i - currentItem) * sliderWidth});
			}
			for(var i = 0; i < currentItem; i++){
				console.log("I'=",i);
				sliderItem.eq(i).css({'left': (sliderLength - currentItem + i) * sliderWidth});
			}
			sliderItem.each(function(){
				$(this).animate({'left': parseInt($(this).css('left')) - sliderWidth});
			});
			currentItem = nextItem;
			//moveRight();
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
						for(var i = currentItem; i < sliderLength; i++){
							sliderItem.eq(i).css({'left': (i - currentItem) * sliderWidth});
						}
						for(var i = 0; i < currentItem; i++){
							sliderItem.eq(i).css({'left': (sliderLength - currentItem + i) * sliderWidth});
						}
						sliderItem.each(function(){
							$(this).animate({'left': parseInt($(this).css('left')) - sliderWidth});
						});
					}
					// Move left
					else{
						for (var i = currentItem + 1; i < sliderLength; i++){
							sliderItem.eq(i).css({'left': (sliderLength - i + currentItem) * -1 * sliderWidth}	);
						}
						for (var i = 0; i <= currentItem; i++){
							sliderItem.eq(i).css({'left': (currentItem - i) * -1 * sliderWidth}	);
						}
						sliderItem.each(function(){
							$(this).animate({'left': parseInt($(this).css('left')) + sliderWidth});
						});
					}

					$(this).addClass('active').siblings().removeClass('active');
					currentItem = nextItem;
				}
			});
		}
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
			if($(this).width() > maxWidth){
				maxWidth = $(this).width();
			}
		});
		slider.height(maxHeight);
		slider.find('.slider__item').width(maxWidth);
	});
};


var moveLeft = function(items){
	console.log("Let's move left");
	console.log(currentItem);
}
var moveRight = function(items){
	console.log("Let's move right");
}