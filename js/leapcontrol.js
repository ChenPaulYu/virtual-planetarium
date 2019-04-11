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
var controller = new Leap.Controller();
controller.connect();
controller.on('frame', onFrame);
var newTime = new Date();
var lastTime = new Date();
var holdingTime = 0;

function onFrame(frame) {
    
    if (frame.pointables.length > 0) {
        
        var distance;
        var hand = frame.hands[0];
        var normal = hand.palmNormal
        var position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;
        var v0 = Math.round(velocity[0])
        var v2 = Math.round(velocity[2])


        if(frame.hands.length == 2) {
            distance = Math.abs(frame.hands[0].palmPosition[0] - frame.hands[1].palmPosition[0])
        }else {
            distance = 1000;
        }

        console.log(hand.grabStrength)
        
        newTime = new Date();
        
        $('#position0').text(position[0])
        $('#position1').text(position[1])
        $('#position2').text(position[2])
        $('#velocity').text(v2)
        $('#direction').text(direction)
        $('#normal').text(normal)

        if (distance < 60) {
            holdingTime += newTime - lastTime;
            $('#gesture').text('pray')
            updataData(database, 'latest', {
                'gesture': 'pray',
                'time'   :  holdingTime
            })
        } else {
            holdingTime = 0
            if (position[0] < -30 && v0 < -300 && distance == 1000) {
                $('#gesture').text('left')
                updataData(database, 'latest', {
                    'gesture': 'left',
                    'time': holdingTime
                })
            } else if (position[0] > 60 && v0 > 500 && distance == 1000) {
                $('#gesture').text('right')
                updataData(database, 'latest', {
                    'gesture': 'right',
                    'time': holdingTime
                })
            } else if (position[2] < 0 && v2 < -200 && distance == 1000) {
                $('#gesture').text('front')
                updataData(database, 'latest', {
                    'gesture': 'front',
                    'time': holdingTime
                })
            } else if (position[2] > 40 && v2 > 200 && distance == 1000) {
                $('#gesture').text('back')
                updataData(database, 'latest', {
                    'gesture': 'back',
                    'time': holdingTime
                })
            } else {
                $('#gesture').text('none')
                updataData(database, 'latest', {
                    'gesture': 'none',
                    'time': holdingTime
                })
            }
        }
    } else {
        holdingTime = 0
        $('#gesture').text('null')
        updataData(database, 'latest', {
            'gesture': 'null',
            'time': holdingTime
        })
    }

    lastTime = newTime
}
$(document).ready(function () {

    $('#guide').on('click', function () {
        updataData(database, 'guide', {
            'guide': true
        })
        setTimeout(() => {
            updataData(database, 'guide', {
                'guide': false
            })
        }, 100);

    })
})



function updataData(database,table,data) {
    database.ref(`leapmotion/${table}`).update(data);
}
