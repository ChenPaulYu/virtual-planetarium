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
        "height": 761.33,
        "offsetX": -35,
        "offsetY": 10,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "z1BY63E.png"
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
        "height": 764.33,
        "offsetX": -8,
        "offsetY": 5,
        "scaleX": 1,
        "scaleY": 0,
        "intro": "PypCwTG.png"
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
        "height": 761.33,
        "offsetX": 100,
        "offsetY": 6,
        "scaleX": 1,
        "scaleY": 0,
        "intro": "z1BY63E.png"
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
      }

  ]

var meteor_c = []; 
var meteor_l = [];
var meteorites = []
var stars = []
const synth = new Tone.MembraneSynth().toMaster();

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
const collection = database.ref('textcollection');

S(document).ready(function () {
    
    var target = 0
    var ra = dec_ra[target].ra;
    var dec = dec_ra[target].dec;
    var fov = 60;
    var planetarium = S.virtualsky({
        'id': 'starmap',
        'projection': 'gnomic',
        'ra': ra,
        'dec': dec,
        'ground': false,
        'keyboard': true,
        'gradient': true,
        'cardinalpoints': false,
        'showposition': true,
        'fov': fov,
        'target': target,
        'constellations': true,
        'constellationlabels': false,
        'mouse': false
      });
    $('#target').text(target)
    for(var i in dec_ra) {
        planetarium.addPointer({
            'ra': dec_ra[i].ra + dec_ra[i].offsetX,
            'dec': dec_ra[i].dec + dec_ra[i].offsetY,
            'label': dec_ra[i].name,
            'img': "https://i.imgur.com/" + dec_ra[i].intro,
            'height': dec_ra[i].height,
            'width' : dec_ra[i].width,
            'scaleX': dec_ra[i].scaleX,
            'scaleY': dec_ra[i].scaleY,
            colour: 'rgb(255,255,255)'
        });
    }

        
    setInterval(() => {

        if (!planetarium.animate) {
            var w = $(document).width();
            var h = $(document).height();
            planetarium.draw()
            for(var i = 0;i< meteor_c.length;i++) {
                drawC(meteor_c[i])
                if (meteor_c[i].x > w || meteor_c[i].y > h || meteor_c[i].x < 0 || meteor_c[i].y < 0) {
                    meteor_c.splice(i, 1)
                }
            }

            for (var i = 0; i < meteor_l.length; i++) {
                drawL(meteor_l[i])
                if (meteor_l[i].x > w || meteor_l[i].y > h || meteor_l[i].x < 0 || meteor_l[i].y < 0) {
                    synth.triggerAttackRelease("C2", "4n");
                    meteor_l.splice(i, 1)
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

    }, 10);   
        addS(300)
        var count = 0
        setInterval(() => {
            if(meteor_c.length < 50) {
                addstarC(10)    
            }
            
            
            count++
            if(count%2 == 0 ) {
                addstarL(1)
                addM(5);
            }
        }, 1000);

        function addstarL(c) {
            var w = document.body.offsetWidth;
            var count_l = Math.round(Math.random() * c)

            for (var i = 0; i < count_l; i++) {
                var star = {
                    x: Math.random() * w,
                    y: 0,
                    vx: Math.random() * 2,
                    vy: Math.random() * 1,
                    len: 20 + Math.random() * 20,
                }
                meteor_l.push(star)
            }
        }
        

        function addstarC(c) {
            var w = document.body.offsetWidth;
            var h = document.body.offsetHeight;
            var count_c = Math.round(Math.random() * c)

            for (var i = 0; i < count_c; i++) {
                var star = {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (-1 + Math.random() * 2)/10,
                    vy: (-1 + Math.random() * 2)/10,
                    m: Math.random() * 2
                }
                meteor_c.push(star)
            }
        }

        function drawC(star) {
            var c = document.getElementById("starmap_inner");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.m, 0, 2 * Math.PI);
            
            if(star.vx > 0 ) {
                star.vx += 0.00001
            }else {
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

        function drawL(star) {
            var c = document.getElementById("starmap_inner");
            var ctx = c.getContext("2d");

            ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(star.x, star.y);
			ctx.lineTo(star.x + star.len, star.y - star.len);
			ctx.stroke();
            star.vx -= 0.06
            star.vy += 0.06
            star.x += star.vx
            star.y += star.vy
            if(star.len > 0 ) {
                star.len -= 0.1
            }
            
    

            ctx.fill();

        }


        
        function addM(c) {
            var count = Math.round(Math.random()* c)
            for (let i = 0; i < count; i++) {
                var c = document.getElementById("starmap_inner");
                var ctx = c.getContext("2d");
                const m = new Meteorite(ctx)
                meteorites.push(m);
            }
        }

        function addS(c) {
            
            var count = c/1
            for (var i = 0; i < count; i++) {
                var c = document.getElementById("starmap_inner");
                var ctx = c.getContext("2d");
                const s = new Star(ctx)
                stars.push(s);
            }
        }




    $('#last').on('click',function(){
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
    })

    $('#next').on('click', function () {
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
    })

    $('#zoomin').on('click', function () {
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
        } else if(planetarium.fov > 50) {
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
        $('#target').text(target)

    })

    $('#zoomout').on('click', function () {
        synth.triggerAttackRelease("C2", "2n");
        if (planetarium.fov < 50 && planetarium.fov >= 35) {
            use = true
            var refreshId = setInterval(function () {
                if (planetarium.fov >= 50) {
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

            }, 5)
        } else if(planetarium.fov >= 50 && planetarium.fov < 60) {
            console.log('here')
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

            }, 10)
        } else {
            synth.triggerAttackRelease("C5", "8n");
        }
        $('#target').text(target)
    })

    

    var lastTime = new Date();
    const latest = database.ref('leapmotion/latest');
    var use = false;
    latest.on('value', function (snapshot) {

        var newTime = new Date();
        var data = snapshot.val().gesture


        if (newTime - lastTime > 500) {
            if (data == 'right') {

                if (target > 0 && !planetarium.animate) {
                    planetarium.toggleInfoBox(target, false)
                    synth.triggerAttackRelease("C2", "8n");
                    target = target - 1
                    planetarium.target = target
                    if (planetarium.fov == 35) {
                        planetarium.alpha = 0
                    }
                    planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                }else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                $('#gesture').text('right')
                $('#target').text(target)
                console.log('right')

            } else if (data == 'left' ) {
                if (target < 11 && !planetarium.animate) {
                    console.log('trigger')
                    planetarium.toggleInfoBox(target, false)
                    synth.triggerAttackRelease("C2", "2n");
                    target = target + 1
                    planetarium.target = target
                    if(planetarium.fov == 35) {
                        planetarium.alpha = 0
                    }
                    planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                }else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                console.log('left')
                $('#gesture').text('left')
                $('#target').text(target)

            } else if (data == 'front' && !use) {
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
                $('#gesture').text('front')
                $('#target').text(target)
            } else if (data == 'back' && !use) {
                synth.triggerAttackRelease("C2", "2n");
                if (planetarium.fov < 50 && planetarium.fov >= 35) {
                    use = true
                    var refreshId = setInterval(function () {
                        if (planetarium.fov >= 50) {
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

                    }, 5)
                } else if (planetarium.fov >= 50 && planetarium.fov < 60) {
                    console.log('here')
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

                    }, 10)
                } else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                $('#gesture').text('back')
                $('#target').text(target)
            }

            
            lastTime = newTime
        }

    });


    // var lastTime = new Date();
    // var use = false;
    // var zoom = false
    // var beta;
    // const latest = database.ref('textcollection/latest');
    // latest.on('value', function (snapshot) {
    //     var newTime = new Date();
    //     var data = snapshot.val().gesture
    //     beta = snapshot.val().beta

    //     if(beta > 70) {
    //         var refreshId = setInterval(function () {
    //             if (planetarium.fov <= 35) {
    //                 clearInterval(refreshId);
    //                 zoom = true
    //             }
    //             planetarium.fov -= 0.1
    //             planetarium.changeFOV(0).draw()
    //         }, 5)
    //     }else if(beta > 50) {
            // var refreshId = setInterval(function () {
            //     if (planetarium.fov <= 50) {
            //         clearInterval(refreshId);
            //     }
            //     planetarium.fov -= 0.1
            //     planetarium.changeFOV(0).draw()
            // }, 5)
    //     }


    //     if (newTime - lastTime > 100 && zoom == true) {
    //         if(data == 'right') {
    //             if(!use) {
    //                 if (target > 0) {
    //                     target = target - 1
    //                     planetarium.target = target
    //                     planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    //                 }
    //                 $('#gesture').text('right')
    //                 $('#target').text(target)
    //                 console.log('right')
    //             }
    //             use = true
    //         }else if(data == 'left') {
    //             if (!use) {
    //                 if (target < 11) {
    //                     target = target + 1
    //                     planetarium.target = target
    //                     planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    //                 }
    //                 console.log('left')
    //                 $('#gesture').text('left')
    //                 $('#target').text(target)
    //                 use = true
    //             }
    //         }else if(data == 'none') {
    //             use = false
    //         }
    //         lastTime = newTime
    //     }

    // });

});

const maxSize = 3
const maxSpeed = 10
const minSpeed = 5
const color = '#FFFFFF'

class Star {
    constructor(context) {
        var w = $(document).width();
        var h = $(document).height();
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.color = color
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

    constructor(context) {
        super();
        this.context = context
        this.originalPosition = {
            x: this.x,
            y: this.y
        }
        this.radius = Math.random() * maxSize;
        this.speed = Math.random() * maxSpeed + minSpeed;
        this.trailLength = Math.floor(Math.random() * 25 + 15)
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
            const color = 'rgba(255, 255, 255, ' + Math.abs(1 - i / this.trailLength) + ')'
            this.draw(this.x - i * 2, this.y - i * 2, this.radius - (i * this.radius / (this.trailLength * 1.7)), color)
        }
        this.speed += 0.01
        this.x += this.speed;
        this.y += this.speed;

    }
}


