var controllerOptions = {
    enableGestures: true
};
Leap.loop(controllerOptions, function (frame) {
    if(frame.pointables.length > 0 ) {
       var hand = frame.hands[0];
       var normal = hand.palmNormal
       var position = hand.palmPosition;
       var velocity = hand.palmVelocity;
       var direction = hand.direction;
       $('#position').text(position[2])
       $('#velocity').text(velocity)
       $('#direction').text(direction)
       $('#normal').text(normal)
        if (position[0] < -80) {
            $('#gesture').text('left')
        } else if (position[0] > 70) {
            $('#gesture').text('right')
        }else if(position[1] > 170){
            $('#gesture').text('up')
        } else if (position[1] < 90) {
            $('#gesture').text('down')
        } else if (position[2] < -20) {
            $('#gesture').text('front')
        } else if (position[2] > 100) {
            $('#gesture').text('back')
        } else {
            $('#gesture').text('None')
        }

    }





});

