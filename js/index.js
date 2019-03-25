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
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "sJITcyf.png"
      }, {
        "name": "Gem",
        "ra": 104.1458000,
        "dec": 22.0145000,
        "width": 263,
        "height": 536.66,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "hayBVBB.png"
      }, {
        "name": "UMa",
        "ra": 160.9905542,
        "dec": 55.0190889,
        "width": 263,
        "height": 761.33,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "z1BY63E.png"
      }, {
        "name": "Boo",
        "ra": 206.6231708,
        "dec": 30,
        "width": 263,
        "height": 670,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "aQUzTED.png"
      }, {
        "name": "Lyr",
        "ra": 294.9987917,
        "dec": 40.8651694,
        "width": 263,
        "height": 764.33,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "PypCwTG.png"
      }, {
        "name": "Tau",
        "ra": 65.3146,
        "dec": 20.8223806,
        "width": 263,
        "height": 610.3,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "7B00n3L.png"
      }, {
        "name": "UMi",
        "ra": 244.2877083,
        "dec": 80,
        "width": 263,
        "height": 761.33,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "z1BY63E.png"
      }, {
        "name": "Her",
        "ra": 255.3025000,
        "dec": 30.6599417,
        "width": 263,
        "height": 384.33,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "OU12G4N.png"
      }, {
        "name": "Cyg",
        "ra": 305.9833000,
        "dec": 34.03,
        "width": 263,
        "height": 395,
        "offsetX": 10,
        "offsetY": 6,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "iZ6EBk6.png"
      }

  ]

var meteor_c = []; 
var meteor_l = [];
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
    
    var target = 11
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


        

        
        var refreshid = setInterval(() => {
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
            }

        }, 10);   
        var refreshid = setInterval(() => {
            addstarL(1)
        }, 2000);
         setInterval(() => {
            addstarC(10)
        }, 1000);

        function addstarL(c) {
            var w = document.body.offsetWidth;
            var h = document.body.offsetHeight;
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
                    vx: -1 + Math.random() * 2,
                    vy: -3 + Math.random() * 5,
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
            star.vy += 0.01
            if(star.vx > 0 ) {
                star.vx += 0.01
            }else {
                star.vx -= 0.01
            }
            if (star.vy > 0) {
                star.vy += 0.01
            } else {
                star.vy -= 0.01
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
        




    $('#next').on('click',function(){
        
        if(target < 11) { 
            
            console.log(target)
            planetarium.toggleInfoBox(target, false)
            target = target + 1
            $('#target').text(target)
            planetarium.target = target
            planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
            setTimeout(function(){
                console.log('trigger')
                if(planetarium.fov == 35) {
                    planetarium.toggleInfoBox(target, true)
                }
                
            },1000)
        }
    })

    $('#last').on('click', function () {
        // clearInterval(refreshid)
        planetarium.draw()
        if (target > 0) {
            
            console.log(target)
            planetarium.toggleInfoBox(target, false)
            target = target - 1
            planetarium.target = target
            $('#target').text(target)
            planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
            setTimeout(function () {
                if (planetarium.fov == 35) {
                    planetarium.toggleInfoBox(target, true)
                }

            }, 1000)
        }
    })

    $('#zoomin').on('click', function () {
        var refreshId = setInterval(function(){
            if (planetarium.fov <= 35) {
                planetarium.toggleInfoBox(target,true)
                clearInterval(refreshId);
            }
            planetarium.fov -= 0.1
            planetarium.changeFOV(0).draw()
        },5)

    })

    $('#zoomout').on('click', function () {
         planetarium.toggleInfoBox(target, false)
        var refreshId = setInterval(function () {
            if (planetarium.fov >= 60) {
                clearInterval(refreshId);
            }
            planetarium.fov += 0.1
            planetarium.changeFOV(0).draw()
        }, 5)

    })

    

    var lastTime = new Date();
    const latest = database.ref('leapmotion/latest');
    var use = false;
    latest.on('value', function (snapshot) {

        var newTime = new Date();
        var data = snapshot.val().gesture


        if (newTime - lastTime > 500) {
            if (data == 'right') {
                if (target > 0) {
                    planetarium.toggleInfoBox(target, false)
                    synth.triggerAttackRelease("C2", "8n");
                    target = target - 1
                    planetarium.target = target
                    planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                    setTimeout(function () {
                        if (planetarium.fov == 35) {
                            planetarium.toggleInfoBox(target, true)
                        }
                    }, 1000)
                }else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                $('#gesture').text('right')
                $('#target').text(target)
                console.log('right')

            } else if (data == 'left') {
                if (target < 11) {
                    planetarium.toggleInfoBox(target, false)
                    synth.triggerAttackRelease("C2", "2n");
                    target = target + 1
                    planetarium.target = target
                    planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                    setTimeout(function () {
                        if (planetarium.fov == 35) {
                            planetarium.toggleInfoBox(target, true)
                        }

                    }, 1000)
                }else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                console.log('left')
                $('#gesture').text('left')
                $('#target').text(target)

            } else if (data == 'front' && !use) {
                if (planetarium.fov > 35) {
                    var refreshId = setInterval(function () {
                        use = true
                        if (planetarium.fov <= 35) {
                            use = false
                            clearInterval(refreshId);
                            planetarium.toggleInfoBox(target, true)
                        }
                        planetarium.fov -= 0.1
                        synth.triggerAttackRelease("C2", "2n");
                        planetarium.changeFOV(0).draw()
                    }, 5)
                } else {
                    synth.triggerAttackRelease("C5", "8n");
                }
                $('#gesture').text('front')
                $('#target').text(target)
            } else if (data == 'back' && !use) {
                planetarium.toggleInfoBox(target, false)
                if (planetarium.fov < 60) {
                    use = true
                    var refreshId = setInterval(function () {
                        if (planetarium.fov >= 60) {
                            use = false
                            clearInterval(refreshId);
                        }
                        planetarium.fov += 0.1
                        synth.triggerAttackRelease("C2", "2n");
                        planetarium.changeFOV(0).draw()
                    }, 5)
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