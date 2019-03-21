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
    xyzA: 0
}


function orientation(event) {
    if (event.gamma) {
        orientationData = {
            gamma: event.gamma || 0,
            beta : event.beta  || 0,
            alpha: event.alpha || 0
        }
    }
}

function handleMotion(event) {
    motionData = {
        z: event.acceleration.z || 0,
        y: event.acceleration.y || 0,
        x: event.acceleration.x || 0
    }
}

var count = 0

function main() {

    // values.lastP = values.p
    // values.lastV = values.v
    // values.lastA = values.a
    $('#p').text(orientationData.gamma)
    $('#v').text(orientationData.beta)
    $('#a').text(orientationData.alpha)
    // values.p = orientationData.beta
    // values.xyzA = Math.sqrt(Math.pow(motionData.x, 2) + Math.pow(motionData.y, 2) + Math.pow(motionData.z, 2));
    // values.v = values.p - values.lastP
    // values.a = values.v - values.lastV

}



if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', orientation, false);
    window.addEventListener('devicemotion', handleMotion, false);
} else {
    document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}

setInterval(main,100)