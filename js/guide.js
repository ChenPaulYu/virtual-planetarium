//const anime = require('lib/anime.js');
//alert("?");
var guideImage = ['eQjYlhI.png', 'fEpAzuJ.png', 'waJWQUP.png', 'GhNDkt7.png', 'Z174U9W.png', 'OmQOQMe.png', 'jzdDjq2.png', 'mjcNEtH.png', 'MW1Hq7U.png', 'auMBnbx.png']

var animation = null;
var ufo = null;


var drop = {
	targets: ".guideAll",
	translateY: [-1000, 0],
	duration: 1000,
	easing: 'easeOutElastic(1, 0.45)'
};

var up = {
	targets: ".guideAll",
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
	  rotateZ: [0, 360],
	  duration: 200000,
	  easing: 'linear',
	  direction: 'alternate',
	  loop: true,
	  autoplay: false
	})

	ufo = animation = anime({
		targets: "#ufo",
		translateY: [0, 15],
		duration: 1000,
		easing: 'linear',
		direction: 'alternate',
		loop: true,
		autoplay: false
	})



	anime(drop);

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
	if(state >= 2) {
		setTimeout(() => {
			dropsound.start()
		}, 100);
	}


	
}

function setState(i) {
	state = i;
}


function checkstate() {
	return state	
}





function Anime(s) {

	console.log("state:" + state);
	if (state == s && start) {
		clearTimeout(timeout);
		if (state < guideImage.length) {
			state++;
			// animation = animation2;
			upAndDrop();

			setTimeout(function() {
				$('#move').attr("style", "z-index:3");
				$('#move').attr("src",'./image/guide/SPN9Zko.png')
				$('#gestureguide').attr("style", "z-index:3");
				$("#gestureguide").attr("src", `./image/guide/${guideImage[s]}`);
			}, 800);
			setTimeout(function() {
				restartAnime();
			}, 1700);

		} else {
			console.log('here')
			console.log(state)
			state++;
			anime(up);
			setTimeout(() => {
				$("#gestureguide").attr("src", "");
				$('#move').attr("src", "")
				$('#gestureguide').attr("style", "z-index:-3")
				$('#move').attr("style", "z-index:-3")
				// animation = null
				// $("#move").remove();
			}, 1000);
			
			

		}
	}
}
