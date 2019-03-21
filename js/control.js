if (window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', function (event) {
        var a = document.getElementById('alpha');
        var b = document.getElementById('beta');
        var g = document.getElementById('gamma');
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

            
        
        a.innerHTML = Math.round(alpha);
        b.innerHTML = Math.round(beta);
        g.innerHTML = Math.round(gamma);

    }, false);

    window.addEventListener('devicemotion', function (event) {

        var ax = document.getElementById('ax');
        var ay = document.getElementById('ay');
        var az = document.getElementById('az');
        var gesture = document.getElementById('gesture');

        var ax_value = event.acceleration.x;
        var ay_value = event.acceleration.y;
        var az_value = event.acceleration.z;

        ax.innerHTML = Math.round(ax_value);
        ay.innerHTML = Math.round(ay_value);
        az.innerHTML = Math.round(az_value);

        if(ax_value != 0) {
            gesture.innerHTML = "改變"
        }

    }, false);

} else {
    document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}