if (window.DeviceOrientationEvent) {
    $(window).on('deviceorientation', function (event) {
        var a = document.getElementById('alpha'),
            b = document.getElementById('beta'),
            g = document.getElementById('gamma'),
            alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;

        a.innerHTML = Math.round(alpha);
        b.innerHTML = Math.round(beta);
        g.innerHTML = Math.round(gamma);
    }, false)
} else {
    document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}