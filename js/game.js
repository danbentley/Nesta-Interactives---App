
var offsetStart;
var offsetEnd;
var angle;
var speed;
var clicked = false;

$(window).on('mousedown', function(e) {
    offsetStart = {
        x:e.offsetX,
        y:e.offsetY
    };
    clicked = true;
});

$(window).on('mousemove', function(e) {

    if (!clicked) return;

    offsetEnd = {
        x:e.offsetX,
        y:e.offsetY,
    };
    var dragDistance = offsetStart.x - offsetEnd.x;
    speed = Math.abs(Math.min(dragDistance, MAX_SPEED));
    angle = getAngle(offsetEnd, offsetStart);
    updateStats()
});

$(window).on('mouseup', function(e) {
    player.applyImpulse(speed, angle);
    clicked = false;
});

function getAngle(startPosition, endPosition) {
    var calcAngle = Math.atan2(startPosition.x - endPosition.x, startPosition.y - endPosition.y) * (180 / Math.PI);	
    // To atan2 returns a range of -180 to 180 which is perfect
    // for CSS3 rotation but not here where we'd prefer a range
    // between 0 and 360
    if(calcAngle < 0) {
        calcAngle = Math.abs(calcAngle);
    } else {
        calcAngle = 360 - calcAngle;		
    }
    return calcAngle;
}

// Follow make the camera follow the player .
setInterval(function() {
    var position = player.position();
    position.y = 0;
    position.x -= 10;
    world.camera(position);
}, 1);


function updateStats() {
    $('#stats .angle').html(Math.round(angle));
    $('#stats .speed').html(speed + '/300');
}
