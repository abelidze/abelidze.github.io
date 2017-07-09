function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

jQuery.fn.center = function(gm, parent) {
	let w = this.width();
	let h = this.height();
	let offset = $(this).offset();
	this.css({position: 'fixed', left:offset.left, top:offset.top});
	this.css('z-index', '3');
	this.css({
		width: w,
		height: h
	});

	offset = parent.offset();
	this.animate(
		{
			top: offset.top + parent.height()/2 - h/2,
			left: offset.left + parent.width()/2 - w/2
		},
		{
			duration: 750,
			complete: function(){
				setTimeout(function() {
					if(gm.freeze) {
						parent.fadeOut('slow', gm.Restart.bind(gm));
					}
				}, 1200);
			}
		}
	);
	return this;
}