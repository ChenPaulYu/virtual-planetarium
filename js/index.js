var dec_ra = [{
    "name": "Cnc",
    "ra": 132.1000000,
    "dec": 25,
    "width": 263,
    "height":362.6,
    "offsetX": 10,
    "offsetY": 6,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "BuT1r0U.png"
}, {
    "name": "Leo",
    "ra": 171.3999333,
    "dec": 17.7834611,
    "width": 263,
    "height": 546.33,
    "offsetX": 10,
    "offsetY": 6,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "3wUPgrl.png"
}, {
    "name": "Vir",
    "ra": 202.4695750,
    "dec": -5.0791694,
    "width": 263,
    "height": 740.66,
    "offsetX": 15,
    "offsetY": 12,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "vBwB7Ev.png"
}, {
    "name": "Oph",
    "ra": 258.4625000,
    "dec": -5.0791694,
    "width": 263,
    "height": 587.66,
    "offsetX": 15,
    "offsetY": 10,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "sJITcyf.png"
}, {
    "name": "Gem",
    "ra": 104.1458000,
    "dec": 22.0145000,
    "width": 263,
    "height": 536.66,
    "offsetX": 15,
    "offsetY": 10,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "hayBVBB.png"
}, {
    "name": "UMa",
    "ra": 160.9905542,
    "dec": 55.0190889,
    "width": 263,
    "height": 622.7,
    "offsetX": -35,
    "offsetY": 10,
    "scaleX": 0,
    "scaleY": 0,
    "intro": "ihXTbkx.png"
}, {
    "name": "Boo",
    "ra": 206.6231708,
    "dec": 30,
    "width": 263,
    "height": 670,
    "offsetX": 25,
    "offsetY": 10,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "aQUzTED.png"
}, {
    "name": "Lyr",
    "ra": 294.9987917,
    "dec": 35.8651694,
    "width": 263,
    "height": 377.6,
    "offsetX": -8,
    "offsetY": 5,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "1ftAjTj.png"
}, {
    "name": "Tau",
    "ra": 65.3146,
    "dec": 20.8223806,
    "width": 263,
    "height": 610.3,
    "offsetX": 18,
    "offsetY": 6,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "7B00n3L.png"
}, {
    "name": "UMi",
    "ra": 244.2877083,
    "dec": 80,
    "width": 263,
    "height": 622.7,
    "offsetX": 100,
    "offsetY": 6,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "Yxdlpvu.png"
}, {
    "name": "Her",
    "ra": 255.3025000,
    "dec": 30.6599417,
    "width": 263,
    "height": 384.33,
    "offsetX": 15,
    "offsetY": 6,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "OU12G4N.png"
}, {
    "name": "Cyg",
    "ra": 305.9833000,
    "dec": 34.03,
    "width": 263,
    "height": 395,
    "offsetX": 15,
    "offsetY": 10,
    "scaleX": 1,
    "scaleY": 0,
    "intro": "iZ6EBk6.png"
}]
var config = {
    apiKey: "AIzaSyDCK218r1QNc85tc2Qxq_KTe7RpIz3I8Ec",
    authDomain: "virtual-planetarium.firebaseapp.com",
    databaseURL: "https://virtual-planetarium.firebaseio.com",
    projectId: "virtual-planetarium",
    storageBucket: "virtual-planetarium.appspot.com",
    messagingSenderId: "355869410482"
};

firebase.initializeApp(config);
const database = firebase.database();
const latest = database.ref('leapmotion/latest');

const synth = new Tone.MembraneSynth().toMaster();

var meteor_c = []; 
var meteor_l = [];
var meteorites = []
var stars = []
var target = 0
var ra = dec_ra[target].ra;
var dec = dec_ra[target].dec;
var fov = 60;
var lastTime = new Date();
var use = false;
var pray = false
var praytime = 0;


function right(planetarium) {
    if (target > 0 && !planetarium.animate) {
        planetarium.toggleInfoBox(target, false)
        synth.triggerAttackRelease("C2", "8n");
        target = target - 1
        planetarium.target = target
        if (planetarium.fov == 35) {
            planetarium.alpha = 0
        }
        planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    } else {
        synth.triggerAttackRelease("C5", "8n");
    }
    $('#target').text(target)
}
function left(planetarium) {
    if (target < 11 && !planetarium.animate) {
        planetarium.toggleInfoBox(target, false)
        synth.triggerAttackRelease("C2", "2n");
        target = target + 1
        planetarium.target = target
        if (planetarium.fov == 35) {
            planetarium.alpha = 0
        }
        planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    } else {
        synth.triggerAttackRelease("C5", "8n");
    }
    console.log('left')
    $('#target').text(target)
}

function zoomin(planetarium) {
    if(!planetarium.animate) {
        if (planetarium.fov > 35 && planetarium.fov < 50) {
            planetarium.alpha = 0
            synth.triggerAttackRelease("C2", "2n");
            var refreshId = setInterval(function () {
                planetarium.animate = true;
                use = true
                if (planetarium.fov <= 35) {
                    use = false
                    planetarium.animate = false;
                    clearInterval(refreshId);
                } else {
                    planetarium.fov -= 0.1
                    planetarium.changeFOV(0).draw()
                }

            }, 5)
        } else if (planetarium.fov > 50) {
            console.log('2')
            synth.triggerAttackRelease("C2", "2n");
            var refreshId = setInterval(function () {
                planetarium.animate = true;
                use = true
                if (planetarium.fov <= 50) {
                    use = false
                    planetarium.animate = false;
                    clearInterval(refreshId);
                } else {
                    planetarium.fov -= 0.1
                    planetarium.changeFOV(0).draw()
                }
            }, 10)
        } else {
            synth.triggerAttackRelease("C5", "8n");
        }
    }
}

function zoomout(planetarium) {
    if(!planetarium.animate) {
        if (Math.round(planetarium.fov) < 50 && Math.round(planetarium.fov) >= 35) {
            use = true
            var refreshId = setInterval(function () {
                if (Math.round(planetarium.fov) >= 50) {
                    planetarium.fov = 50
                    planetarium.animate = false;
                    use = false
                    clearInterval(refreshId);
                } else {
                    planetarium.animate = true;
                    planetarium.toggleInfoBox(target, false)
                    planetarium.fov += 0.1
                    planetarium.changeFOV(0).draw()
                }
            }, 10)
        } else if (Math.round(planetarium.fov) >= 50 && Math.round(planetarium.fov) < 60) {
            console.log('2')
            var refreshId = setInterval(function () {
                if (planetarium.fov >= 60) {
                    planetarium.animate = false;
                    use = false
                    clearInterval(refreshId);
                } else {
                    planetarium.animate = true;
                    planetarium.toggleInfoBox(target, false)
                    planetarium.fov += 0.1
                    planetarium.changeFOV(0).draw()
                }

            }, 5)
        } else {
            synth.triggerAttackRelease("C5", "8n");
        }
    }
}


// function pray(planetarium) {
    
// }

function addConstellationsPointers(planetarium) {
    for (var i in dec_ra) {
        planetarium.addPointer({
            'ra': dec_ra[i].ra + dec_ra[i].offsetX,
            'dec': dec_ra[i].dec + dec_ra[i].offsetY,
            'label': dec_ra[i].name,
            'img': "./image/intro/" + dec_ra[i].intro,
            'height': dec_ra[i].height,
            'width': dec_ra[i].width,
            'scaleX': dec_ra[i].scaleX,
            'scaleY': dec_ra[i].scaleY,
            colour: 'rgb(255,255,255)'
        });
    }
}

function createPlanetarium() {
    var planetarium = S.virtualsky({
        'id': 'starmap',
        'projection': 'gnomic',
        'ra': ra,
        'dec': dec,
        'ground': false,
        'keyboard': false,
        'gradient': true,
        'cardinalpoints': false,
        'showposition': true,
        'fov': fov,
        'target': target,
        'constellations': true,
        'constellationlabels': false,
        'mouse': false,
        'fullscreen': true
    });
    addConstellationsPointers(planetarium)
    return planetarium
}

function addMeteor(ctx, r, count, color) {
    
    for (let i = 0; i < count; i++) {
        if(r == 0 ) {
            var radius = Math.random() * 3
        }else {
            var radius = Math.random() * r
        }
        
        var speed  = 5 + radius * 2
        var trailLength = radius * 15
        
        const m = new Meteorite(ctx, radius, speed, trailLength, color)
        meteorites.push(m);
    }
}

function addShiningStar(ctx, count) {
    count = count / 1
    
    for (var i = 0; i < count; i++) {
        const s = new Star(ctx)
        stars.push(s);
    }
}

function addMovingStar(w,h,count) {
    var count = Math.round(Math.random() * count)
    for (var i = 0; i < count; i++) {
        var star = {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (-1 + Math.random() * 2) / 10,
            vy: (-1 + Math.random() * 2) / 10,
            m: Math.random() * 2
        }
        meteor_c.push(star)
    }
}

function drawMovingStar(ctx,star) 
{
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.m, 0, 2 * Math.PI);
    
    if (star.vx > 0) {
        star.vx += 0.00001
    } else {
        star.vx -= 0.00001
    }
    if (star.vy > 0) {
        star.vy += 0.00001
    } else {
        star.vy -= 0.00001
    }
    star.x += star.vx
    star.y += star.vy
    ctx.fill();
    return star;
}

function drawAll(ctx,w,h) {
            for(var i = 0;i< meteor_c.length;i++) {
                drawMovingStar(ctx, meteor_c[i])
                if (meteor_c[i].x > w || meteor_c[i].y > h || meteor_c[i].x < 0 || meteor_c[i].y < 0) {
                    meteor_c.splice(i, 1)
                }
            }


            for (let i = 0; i < meteorites.length; i++) {
                meteorites[i].update();
                if (meteorites[i].x > w || meteorites[i].y > h || meteorites[i].x < 0 || meteorites[i].y < 0) {
                    meteorites.splice(i, 1)
                    synth.triggerAttackRelease("C5", "4n");
                }
            }
            
            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
            }
}



$(document).ready(function () {


    var planetarium = createPlanetarium()
    var canvas = document.getElementById("starmap_inner");
    var w = document.body.offsetWidth;
    var h = document.body.offsetHeight;
    var ctx = canvas.getContext("2d");
    
    planetarium.guide()

    setInterval(() => {

        if (!planetarium.animate) {
            var width = $(document).width();
            var height = $(document).height();
            
            planetarium.draw()
            drawAll(ctx, width, height)
        }

    }, 10);   

    var count = 0
    addShiningStar(ctx,300)
    setInterval(() => {
        if(meteor_c.length < 50) {
            addMovingStar(w,h,5)
        }
        if(count%2 == 0 ) {
            // addMeteor(ctx, 0, Math.random() * 3, 'rgba(255,255,255,0.6)');
        }


        count++
    }, 1000);


    $("body").keydown(function (e) {
        console.log(e.which)
        switch (e.which) {
            case 13: 
                planetarium.stop()
                addMeteor(ctx, 0, Math.random() * 3, 'rgba(255,255,255,0.6)');
                break;
            case 16:
                planetarium.guide()
            case 32:
                planetarium.stopAnim(0)
                // planetarium.toggleFullScreen()
                break;
            case 37:
                planetarium.stopAnim(1)
                // left(planetarium)
                break;
            case 38:
                planetarium.stopAnim(3)
                // zoomin(planetarium)
                break;
            case 39:
                planetarium.stopAnim(2)
                // right(planetarium)
                break;
            case 40:
                planetarium.stopAnim(4)
                // zoomout(planetarium)
                break;

        }
    });


    latest.on('value', function (snapshot) {

        var newTime = new Date();
        var data = snapshot.val().gesture
        if (newTime - lastTime > 500) {
            
            if (data == 'right') {
                right(planetarium)
            } else if (data == 'left') {
                left(planetarium)
            } else if (data == 'front' && !use) {
                zoomin(planetarium)
            } else if (data == 'back' && !use) {
                zoomout(planetarium)
            }else if(data == 'pray') {
                console.log('pray')
                addMeteor(ctx, 0, 1, 'rgba(255,255,255,0.6)');
            }
            

            lastTime = newTime
        }

    });


});


class Star {
    constructor(context) {
        var w = $(document).width();
        var h = $(document).height();
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.color = 'rgb(255,255,255)'
        this.context = context;
        this.radius = Math.random() * 1;
        this.originalRadius = this.radius;
        this.maxDuration = Math.abs(Math.random() * 200) + 50;
        this.timing = 0
        this.expanding = true
    }


    update(t) {
        if (!this.expanding) {
            this.radius -= this.originalRadius / this.maxDuration
            this.timing--;
        } else {
            this.radius += this.originalRadius / this.maxDuration
            this.timing++;
        }

        if (this.timing === 0) {
            this.expanding = true
        } else if (this.timing >= this.maxDuration) {
            this.expanding = false
        }

        this.draw()
    }

    draw(x = this.x, y = this.y, radius = this.radius, color = this.color) {
        const c = this.context;
        c.save();
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.shadowColor = color;
        c.shadowBlur = 10;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = color;
        c.fill();
        c.closePath();
        c.restore();
    }



}

class Meteorite extends Star {

    constructor(context,radius,speed,trailLength,color) {
        super();
        this.context = context
        this.y = 0
        this.originalPosition = {
            x: this.x,
            y: this.y
        }
        // this.color = color
        this.color = color
        this.radius = radius
        this.speed = speed
        this.trailLength = trailLength
    }

    update() {
        if (this.x > window.innerWidth + this.radius + this.trailLength) {
            this.x = -this.radius * 10;
        }

        if (this.y > window.innerHeight + this.radius + this.trailLength) {
            this.y = -this.radius * 10;
        }

        this.draw(this.x, this.y, this.radius * 1.5, 'rgba(255, 255, 255, 0.2')
        for (let i = 0; i <= this.trailLength; i++) {
            // if (randomeColor) {
            //     var color = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.abs(1 - i / this.trailLength)})`
            // }else {
                
            // }
            // var color = 'rgba(0, 255, 255, ' + Math.abs(1 - i / this.trailLength) + ')'
            
            this.draw(this.x - i * 2, this.y - i * 2, this.radius - (i * this.radius / (this.trailLength * 1.7)), this.color)
        }
        this.speed += 0.01
        this.x += this.speed;
        this.y += this.speed;

    }
}


