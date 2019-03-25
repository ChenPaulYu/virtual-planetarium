




var bounce = false;
var controller = Leap.loop({
    enableGestures: true
}, function (frame) {
    if (frame.gestures.length > 0) {
        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            if (gesture.type == "swipe" && bounce == false) {
                console.log('swipe')
                bounce = true;
                //Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                //Classify as right-left or up-down
                if (isHorizontal) {
                    if (gesture.direction[0] > 0) {
                        console.log('right')
                    } else {
                        console.log('left')
                    }
                } else { //vertical
                    if (gesture.direction[1] > 0) {
                        console.log('up')
                    } else {
                        console.log('down')
                    }
                }

            } else if (gesture.type == 'circle') {
                var pointableID = gesture.pointableIds[0];
                var direction = frame.pointable(pointableID).direction;
                var dotProduct = Leap.vec3.dot(direction, gesture.normal);
                if (dotProduct > 0) {
                    console.log('clockwise')
                } else {
                    console.log('counterclockwise')
                }
            }
        }

    } else {
        bounce = false
    }

});