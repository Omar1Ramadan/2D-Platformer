
// this function allows to check collision between two objects (better to keep separate from the class to avoid confusion)

// 1. does the bottom of object1 collide with the top of object2? we need the value of the bottom of the object1 and the top of the object2
// 2. does the top of object1 collide with the bottom of object2? we need the value of the top of the object1 and the bottom of the object2
// 3. does the left of object1 collide with the right of object2? we need the value of the left of the object1 and the right of the object2
// 4. does the right of object1 collide with the left of object2? we need the value of the right of the object1 and the left of the object2
function collision({object1, object2}){ 
    return object1.position.y + object1.height >= object2.position.y && 
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
}

function platformCollision({object1, object2}){ 
    return object1.position.y + object1.height >= object2.position.y && 
    object1.position.y + object1.height <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
}