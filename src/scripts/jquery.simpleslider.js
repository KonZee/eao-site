(function($){

	$.fn.simpleSlider = function(){

		var options = ({
			items: 1,
			sideText: false,
		});

		this.each(function(){
			console.log(this);
		});

		return this;
	}
}( jQuery ));