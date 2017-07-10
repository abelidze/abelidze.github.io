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
					if(gm.result != GameResult.NONE) {
						parent.fadeOut('slow', gm.ShowGameResult.bind(gm));
					}
				}, 1200);
			}
		}
	);
	return this;
}

function ResetField() {
	gameManager.SetMode(Number($('#Width > input')[0].value),
						Number($('#Height > input')[0].value),
						Number($('#INRow > input')[0].value));
}

function InitMenu() {
	$('.input__field').each(function() {
		var el = $(this);
		el.on('focus', 	function () {
			el.parent().find($('span')).text(el.parent().attr('id'));
		});
		$(this).on('blur', onInputBlur);
	});


	function onInputBlur() {
		let text = $(this).parent().attr('id');
		console.log(this.value);
		if($(this)[0].value.trim() !== '') {
			text += ': ' + $(this)[0].value;
		}
		$(this).parent().find($('span')).text(text);
	}
}

function ToggleMenu() {
	let cnt = $('.container');
	if(cnt.is( ":hidden" )) {
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	}
	cnt.toggle('slow');
}

// function AlphaBeta(position, alpha, beta, depth, player) {
// 	if isTerminal(position) {
// 		return -heuristic(position);
// 	}
// 	score = beta;
// 	for(child of children(position, player)) {
// 		s = -AlphaBeta(child, -score, -alpha, depth+1, -player);
// 		if(s < score)
// 			score = s;
// 			if(score <= alpha)
// 				return score;
// 	}
// 	return score
// }