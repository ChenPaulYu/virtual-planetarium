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
var values_alpha = {
    p: 0,
    v: 0,
    a: 0,
    lastP: 0,
    lastV: 0,
    xyzA: 0
}

var values_beta = {
    p: 0,
    v: 0,
    a: 0,
    lastP: 0,
    lastV: 0,
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
        var alpha;

        if (event.alpha > 180) {
            alpha = -1 * (360 - event.alpha)

        } else {
            alpha = event.alpha
        }
        orientationData = {
            gamma: Math.round(event.gamma) || 0,
            beta : Math.round(event.beta)  || 0,
            alpha: Math.round(alpha) || 0
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

    values_alpha.lastP = values_alpha.p
    values_alpha.lastV = values_alpha.v
    values_alpha.lastA = values_alpha.a


    values_alpha.p = orientationData.alpha
    




    values_alpha.xyzA = Math.round(Math.sqrt(Math.pow(motionData.x, 2) + Math.pow(motionData.y, 2) + Math.pow(motionData.z, 2)));
    values_alpha.v = values_alpha.p - values_alpha.lastP
    values_alpha.a = values_alpha.v - values_alpha.lastV


    $('#p').text(values_alpha.p)
    $('#v').text(values_alpha.v)
    $('#a').text(values_alpha.a)
    $('#xyzA').text(values_alpha.xyzA)

    database.ref('textcollection/gryoscope').update({
        'gamma': orientationData.gamma,
        'beta' : orientationData.beta,
        'alpha': orientationData.alpha,
    });

    database.ref('textcollection/acceleration').update({
        'az': motionData.z,
        'ay': motionData.y,
        'ax': motionData.x,
        'axyz': Math.round(Math.sqrt(Math.pow(motionData.x, 2) + Math.pow(motionData.y, 2) + Math.pow(motionData.z, 2)))
    });

    database.ref('textcollection/latest').update({
        'beta': orientationData.beta
    });

    var use = false;
    if (values_alpha.v > 20 && values_alpha.p > 20) {
        if(!use) {
            $('#gesture').text('左')
            database.ref('textcollection/latest').update({
                'gesture': 'left'
            });
        }

        use = true;
    } else if (values_alpha.v < -20 && values_alpha.p < -20) {
        if(!use) {
            $('#gesture').text('右')
            database.ref('textcollection/latest').update({
                'gesture': 'right'
            });
        }
        use = true;
    } else {
        $('#gesture').text('無')
        database.ref('textcollection/latest').update({
            'gesture': 'none'
        });
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