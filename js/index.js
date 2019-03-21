  var dec_ra = [{
        "name": "Cnc",
        "ra": 130.1000000,
        "dec": 20,
        "width": 263,
        "height":362.6,
        "intro": "BuT1r0U.png"
      }, {
        "name": "Leo",
        "ra": 159.3999333,
        "dec": 15.7834611,
        "width": 263,
        "height": 300,
        "intro": "3wUPgrl.png"
      }, {
        "name": "Vir",
        "ra": 202.4695750,
        "dec": -5.0791694,
        "width": 263,
        "height": 400,
        "intro": "vBwB7Ev.png"
      }, {
        "name": "Oph",
        "ra": 258.4625000,
        "dec": -5.0791694,
        "width": 263,
        "height": 400,
        "intro": "sJITcyf.png"
      }, {
        "name": "Gem",
        "ra": 104.1458000,
        "dec": 22.0145000,
        "width": 263,
        "height": 764.3,
        "intro": "hayBVBB.png"
      }, {
        "name": "UMa",
        "ra": 160.9905542,
        "dec": 55.0190889,
        "width": 263,
        "height": 400,
        "intro": "z1BY63E.png"
      }, {
        "name": "Boo",
        "ra": 206.6231708,
        "dec": 30,
        "width": 263,
        "height": 500,
        "intro": "aQUzTED.png"
      }, {
        "name": "Lyr",
        "ra": 294.9987917,
        "dec": 40.8651694,
        "width": 263,
        "height": 500,
        "intro": "PypCwTG.png"
      }, {
        "name": "Tau",
        "ra": 65.3146,
        "dec": 20.8223806,
        "width": 263,
        "height": 610.3,
        "intro": "14wMw00.png"
      }, {
        "name": "UMi",
        "ra": 244.2877083,
        "dec": 80,
        "width": 263,
        "height": 500,
        "intro": "z1BY63E.png"
      }, {
        "name": "Her",
        "ra": 255.3025000,
        "dec": 30.6599417,
        "width": 263,
        "height": 500,
        "intro": "OU12G4N.png"
      }, {
        "name": "Cyg",
        "ra": 305.9833000,
        "dec": 34.03,
        "width": 263,
        "height": 500,
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
      });
    for(var i in dec_ra) {
        planetarium.addPointer({
            'ra': dec_ra[i].ra + 6,
            'dec': dec_ra[i].dec + 7,
            'label': dec_ra[i].name,
            'img': "https://i.imgur.com/" + dec_ra[i].intro,
            'height': dec_ra[i].height,
            'width' : dec_ra[i].width,
            colour: 'rgb(255,255,255)'
        });
    }


    var canvas = document.getElementById('starmap_inner'),
    context = canvas.getContext('2d');

    $('#next').on('click',function(){
        target = target + 1
        planetarium.target = target
        planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    })

    $('#magnify').on('click', function () {
        var refreshId = setInterval(function(){
            if (planetarium.fov <= 35) {
                clearInterval(refreshId);
            }
            planetarium.fov -= 0.1
            planetarium.changeFOV(0).draw()
        },5)
    })

    // var refreshId =setInterval(function(){
    //     if(target <= 0 ) {
    //         clearInterval(refreshId);
    //     }
    //     target = target - 1
    //     planetarium.target = target
    //     planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
    // },3000)
    var lastTime = new Date();
    var use = false;
    const latest = database.ref('textcollection/latest');
    latest.on('value', function (snapshot) {
        var newTime = new Date();
        var data = snapshot.val().gesture
        if(data == 'right') {
            if(!use) {
                console.log('right')
            }
            use = true
        }else if(data == 'left') {
           if (!use) {
               console.log('left')
           }
            use = true
        }else if(data == 'none') {
            use = false
        }
        // if(newTime-lastTime > 500) {
        //     target = target + 1
        //     planetarium.target = target
        //     planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
        //     lastTime = newTime

        // }
        // console.log(newTime-lastTime)
        // console.log(data)
    });




      // LeapMotion
      var bounce = false;
      var controller = Leap.loop({
          enableGestures: true
      }, function (frame) {
          if (frame.gestures.length > 0) {
              for (var i = 0; i < frame.gestures.length; i++) {
                  var gesture = frame.gestures[i];
                  // console.log(gesture.type);
                  if (gesture.type == "swipe" && bounce == false) {
                      console.log('swipe')
                      bounce = true;
                      //Classify swipe as either horizontal or vertical
                      var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                      //Classify as right-left or up-down
                      if (isHorizontal) {
                          if (gesture.direction[0] > 0) {
                              // right
                              console.log('right')

                              if (planetarium.target != 8) {
                                  planetarium.target += 1
                              }
                          } else {
                              // left
                              console.log('left')
                              if (planetarium.target != 0) {
                                  planetarium.target -= 1
                              }
                              //    planetarium.panTo(83.6330833, 22.0145000, 1000)
                          }
                      } else { //vertical
                          if (gesture.direction[1] > 0) {
                              // up
                              if (planetarium.target - 3 >= 0) {
                                  planetarium.target -= 3
                              }
                              console.log('up')
                              //    planetarium.panTo(229.6384167, 2.0810278, 1000)

                          } else {
                              // down
                              if (planetarium.target + 3 <= 11) {
                                  planetarium.target += 3;
                              }
                              console.log('down')
                              //    planetarium.panTo(268.4625000, 2.0810278, 1000)
                          }
                      }
                      // planetarium.fov = fov
                      planetarium.panTo(dec_ra[planetarium.target].ra, dec_ra[planetarium.target].dec, 0)
                      // setTimeout(function(){
                      //     console.log(planetarium.target)
                      // },500)


                  } else if (gesture.type == 'circle') {
                      var pointableID = gesture.pointableIds[0];
                      var direction = frame.pointable(pointableID).direction;
                      var dotProduct = Leap.vec3.dot(direction, gesture.normal);

                      if (dotProduct > 0) {
                          if (planetarium.fov > 35) {
                              planetarium.fov -= 0.1
                              planetarium.changeFOV(0).draw()
                          }
                      } else {
                          if (planetarium.fov < 60) {
                              planetarium.fov += 0.1
                              planetarium.changeFOV(0).draw()
                          }
                      }
                      console.log('circle')
                      console.log(planetarium.fov)

                  }
              }

          } else {
              bounce = false
          }

      });



  });