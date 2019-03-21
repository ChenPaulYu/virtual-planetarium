if (window.DeviceOrientationEvent) {


    window.addEventListener('deviceorientation', function (event) {
        var a  = document.getElementById('alpha'),
            b  = document.getElementById('beta'),
            g  = document.getElementById('gamma'),
            t  = document.getElementById('gesture')
            alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;

            
        
        a.innerHTML = Math.round(alpha);
        b.innerHTML = Math.round(beta);
        g.innerHTML = Math.round(gamma);

    }, false);

        window.addEventListener('devicemotion', function (event) {

            var ax = document.getElementById('ax'),
                ay = document.getElementById('ay'),
                az = document.getElementById('az'),

            ax_value = event.acceleration.x
            ay_value = event.acceleration.y
            az_value = event.acceleration.z

            ax.innerHTML = Math.round(ax_value);
            ay.innerHTML = Math.round(ay_value);
            az.innerHTML = Math.round(az_value);

        }, false);

} else {
        document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}