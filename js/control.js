var orientationData = {
    gamma: 0,
    beta: 0,
    alpha: 0
}
var motionData = {
    z: 0,
    y: 0,
    x: 0,
    zr: 0
}
var values = {
    p: 0,
    v: 0,
    a: 0,
    lastP: 0,
    lastV: 0,
    xA  : 0,
    yA  : 0,
    zA  : 0,
    xyzA: 0
}

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


function orientation(event) {
    if (event.gamma) {
        orientationData = {
            gamma: Math.round(event.gamma) || 0,
            beta : Math.round(event.beta)  || 0,
            alpha: Math.round(event.alpha) || 0
        }
    }
}

function handleMotion(event) {
    motionData = {
        z: Math.round(event.acceleration.z) || 0,
        y: Math.round(event.acceleration.y) || 0,
        x: Math.round(event.acceleration.x) || 0
    }
}



function main() {

    values.lastP = values.p
    values.lastV = values.v
    values.lastA = values.a

    if(orientationData.alpha > 180) {
        values.p = -1* (360 - orientationData.alpha)

    }else {
        values.p = orientationData.alpha
    }



    values.xA = motionData.x
    values.yA = motionData.y
    values.zA = motionData.z
    values.xyzA = Math.sqrt(Math.pow(motionData.x, 2) + Math.pow(motionData.y, 2) + Math.pow(motionData.z, 2));
    xyzA = Math.round(values.xyzA)
    values.v = values.p - values.lastP
    values.a = values.v - values.lastV
    $('#p').text(values.p)
    $('#v').text(values.v)
    $('#a').text(values.a)
    $('#xA').text(values.xA)
    $('#yA').text(values.yA)
    $('#zA').text(values.zA)
    $('#xyzA').text(xyzA)

    var use = false;
    if (values.v > 20 && values.p > 20) {
        if(!use) {
            $('#gesture').text('左')
            database.ref('textcollection/latest').update({
                'gesture': 'left',
                'theta': values.v,
                'p': values.p,
                'lastP': values.lastP
            });
        }

        use = true;
    } else if (values.v < -20 && values.p < -20) {
        if(!use) {
            $('#gesture').text('右')
            database.ref('textcollection/latest').update({
                'gesture': 'right',
                'theta': values.v,
                'p': values.p,
                'lastP': values.lastP
            });
        }
        use = true;
    } else {
        if(use) {
            $('#gesture').text('無')
            database.ref('textcollection/latest').update({
                'gesture': 'none'
            });
        }
        use = false;
    }


}



if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', orientation, false);
    window.addEventListener('devicemotion', handleMotion, false);
} else {
    document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}

setInterval(main,300)