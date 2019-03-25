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
controller.setBackground(true); //
controller.connect();
controller.on('frame', onFrame);

function onFrame(frame) {
    
    if (frame.pointables.length > 0) {
        var hand = frame.hands[0];
        var normal = hand.palmNormal
        var position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;
        var v0 = Math.round(velocity[0])
        var v1 = Math.round(velocity[1])
        var v2 = Math.round(velocity[2])


        $('#position0').text(position[0])
        $('#position1').text(position[1])
        $('#position2').text(position[2])
        $('#velocity').text(v2)
        $('#direction').text(direction)
        $('#normal').text(normal)


        if (position[0] < -30 && v0 < -500) {
            $('#gesture').text('left')
            updataData(database, 'latest', {
                'gesture': 'left'
            })
        } else if (position[0] > 60 && v0 > 500) {
            $('#gesture').text('right')
            updataData(database, 'latest', {
                'gesture': 'right'
            })
        } else if (position[2] < -20 && v2 < -700) {
            $('#gesture').text('front')
            updataData(database, 'latest', {
                'gesture': 'front'
            })
        } else if (position[2] > 90 && v2 > 700) {
            $('#gesture').text('back')
            updataData(database, 'latest', {
                'gesture': 'back'
            })
        } else {
            $('#gesture').text('None')
            updataData(database, 'latest', {
                'gesture': 'none'
            })
        }

    } else {
        $('#gesture').text('None')
        updataData(database, 'latest', {
            'gesture': 'none'
        })
    }
}




function updataData(database,table,data) {
    database.ref(`leapmotion/${table}`).update(data);
}
