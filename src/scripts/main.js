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

	$('.slider').simpleSlider();

});

