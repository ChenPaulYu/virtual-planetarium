//const anime = require('lib/anime.js');
//alert("?");

var guideImage = ['KwL8Vdb.png', 'KzMmlOs.png', 'lPU2n6j.png', 'sc6M218.png', 'uTu6XIq.png']

var animation = null;
var animation2 = null;
var drop = {
	targets: "#move",
	translateY: [-1000, 0],
	duration: 1000,
	easing: 'easeOutElastic(1, 0.45)'
};
var up = {
	targets: "#move",
	translateY: [0, -2000],
	duration: 800,
	easing: 'easeInElastic(1, 1)',
	endDelay: 300
};
var state = 0;
var timeout = null;
var start = false;

$(window).bind("load", function() {	

	animation = anime({
	  targets: "#move",	
	  rotateZ: [-360, 360],
	  duration: 200000,
	  easing: 'linear',
	  loop: true,
	  autoplay: false
	})


	// animation2 = anime({
	//   targets: "#move",
	//   rotateZ: [-10, 10],
	//   duration: 400,
	//   easing: 'easeInCirc',
	//   loop: 6,
	//   direction: 'alternate',
	//   autoplay: false
	// })

	anime(drop);
	// $("#move").css("z-index", "5");

	setTimeout(function() {
		restartAnime();
	}, 1000)

	//restartAnime();
})

function restartAnime() {
	animation.restart();
	start = true;
	// timeout = setTimeout(function() {
	// 	restartAnime();
	// }, 3000);
}



function upAndDrop() {
	start = false;
	var myTimeline = anime.timeline();
	myTimeline.add(up);
	myTimeline.add(drop);
	
}

function setState(i) {
	state = i;
}


function checkstate() {
	return state	
}


function starAnimate() {
	animation = animation2
}



function stopAnime(s) {

	console.log("state:" + state);
	if (state == s && start) {
		clearTimeout(timeout);
		if (state < guideImage.length) {
			state++;
			// animation = animation2;
			upAndDrop();

			setTimeout(function() {
				// var html = '<span id="shake" class="big_text">SHAKE</span></br>';
				// html += '<span id="harder" class="big_text">HARDER</span></br>'
				// html += '<span id="sound">to change timbre</span>';
				$('#move').attr("style", "z-index:3");
				$("#move").attr("src", `./image/guide/${guideImage[s]}`);

				// var html = '<img id="move" src="./image/guide/KzMmlOs.png" />'
				// $("#move").html(html);
			}, 800);
			setTimeout(function() {
				restartAnime();
			}, 2100);

		} else {
			console.log('123')
			state++;
			anime(up);
			setTimeout(() => {
				$("#move").attr("src", ``);
				$('#move').attr("style","z-index:-3")
				animation = null
				// $("#move").remove();
			}, 1000);
			
			

		}
	}
}

// $(function() {
// 	alert("?");
// 	anime({
// 	  targets: '#guide',
// 	  translateX: 250,
// 	  rotate: '1turn',
// 	  backgroundColor: '#FFF',
// 	  duration: 800
// 	})





// });