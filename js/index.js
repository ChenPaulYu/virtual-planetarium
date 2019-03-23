  var dec_ra = [{
        "name": "Cnc",
        "ra": 132.1000000,
        "dec": 25,
        "width": 263,
        "height":362.6,
        "scaleX": 1,
        "scaleY": 0,
        "intro": "BuT1r0U.png"
      }, {
        "name": "Leo",
        "ra": 171.3999333,
        "dec": 17.7834611,
        "width": 263,
        "height": 546.33,
        "scaleX": 1,
        "scaleY": 0,
        "intro": "3wUPgrl.png"
      }, {
        "name": "Vir",
        "ra": 202.4695750,
        "dec": -5.0791694,
        "width": 263,
        "height": 740.66,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "vBwB7Ev.png"
      }, {
        "name": "Oph",
        "ra": 258.4625000,
        "dec": -5.0791694,
        "width": 263,
        "height": 587.66,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "sJITcyf.png"
      }, {
        "name": "Gem",
        "ra": 104.1458000,
        "dec": 22.0145000,
        "width": 263,
        "height": 536.66,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "hayBVBB.png"
      }, {
        "name": "UMa",
        "ra": 160.9905542,
        "dec": 55.0190889,
        "width": 263,
        "height": 761.33,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "z1BY63E.png"
      }, {
        "name": "Boo",
        "ra": 206.6231708,
        "dec": 30,
        "width": 263,
        "height": 670,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "aQUzTED.png"
      }, {
        "name": "Lyr",
        "ra": 294.9987917,
        "dec": 40.8651694,
        "width": 263,
        "height": 764.33,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "PypCwTG.png"
      }, {
        "name": "Tau",
        "ra": 65.3146,
        "dec": 20.8223806,
        "width": 263,
        "height": 610.3,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "7B00n3L.png"
      }, {
        "name": "UMi",
        "ra": 244.2877083,
        "dec": 80,
        "width": 263,
        "height": 761.33,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "z1BY63E.png"
      }, {
        "name": "Her",
        "ra": 255.3025000,
        "dec": 30.6599417,
        "width": 263,
        "height": 384.33,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "OU12G4N.png"
      }, {
        "name": "Cyg",
        "ra": 305.9833000,
        "dec": 34.03,
        "width": 263,
        "height": 395,
        "scaleX": 0,
        "scaleY": 0,
        "intro": "iZ6EBk6.png"
      }

  ]

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
            'ra': dec_ra[i].ra + 6,
            'dec': dec_ra[i].dec + 7,
            'label': dec_ra[i].name,
            'img': "https://i.imgur.com/" + dec_ra[i].intro,
            'height': dec_ra[i].height,
            'width' : dec_ra[i].width,
            'scaleX': dec_ra[i].scaleX,
            'scaleY': dec_ra[i].scaleY,
            colour: 'rgb(255,255,255)'
        });
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
        if (target > 0) {
            console.log(target)
            planetarium.toggleInfoBox(target, false)
            target = target - 1
            planetarium.target = target
            $('#target').text(target)
            planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
            setTimeout(function () {
                console.log('trigger')
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
    var use = false;
    var zoom = false
    var beta;
    const latest = database.ref('textcollection/latest');
    latest.on('value', function (snapshot) {
        var newTime = new Date();
        var data = snapshot.val().gesture
        beta = snapshot.val().beta

        if(beta > 70) {
            var refreshId = setInterval(function () {
                if (planetarium.fov <= 35) {
                    clearInterval(refreshId);
                    zoom = true
                }
                planetarium.fov -= 0.1
                planetarium.changeFOV(0).draw()
            }, 5)
        }else if(beta > 50) {
            var refreshId = setInterval(function () {
                if (planetarium.fov <= 50) {
                    clearInterval(refreshId);
                }
                planetarium.fov -= 0.1
                planetarium.changeFOV(0).draw()
            }, 5)
        }


        if (newTime - lastTime > 100 && zoom == true) {
            if(data == 'right') {
                if(!use) {
                    if (target > 0) {
                        target = target - 1
                        planetarium.target = target
                        planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                    }
                    $('#gesture').text('right')
                    $('#target').text(target)
                    console.log('right')
                }
                use = true
            }else if(data == 'left') {
                if (!use) {
                    if (target < 12) {
                        target = target + 1
                        planetarium.target = target
                        planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                    }
                    console.log('left')
                    $('#gesture').text('left')
                    $('#target').text(target)
                    use = true
                }
            }else if(data == 'none') {
                use = false
            }
            lastTime = newTime
        }

    });

});