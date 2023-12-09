const canvas = document.querySelector('canvas');
//canvas context
const c = canvas.getContext('2d');
//console.log(c) allows to see the context of the page

//gives us the size of canvas
canvas.width = 1024;
canvas.height = 576;
//lets make a global variable to identify gravity 
const gravity = 0.1;
// creating a 2d array to represent the collision blocks made from the sprite 
const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
// we must loop through the 2d array to find the collision blocks represented by the number 202
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})


const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      )
    }
  })
})



// represent the scale of the image after the scale adjustement
const scaleCanvas = {
    width : canvas.width/4,
    height : canvas.height/4
}


const player = new Player({
    position:{
        x: 100,
        y: 300, 
    },

    collisionBlocks,
    platformCollisionBlocks,

    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,

    animations: {
      Idle: {
        imageSrc: './img/warrior/Idle.png',
        frameRate: 8,
        frameBuffer: 5,
      },
      Run: {
        imageSrc: './img/warrior/Run.png',
        frameRate: 8,
        frameBuffer: 6,
      },
      Jump: {
        imageSrc: './img/warrior/Jump.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      Fall: {
        imageSrc: './img/warrior/Fall.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      RunLeft: {
        imageSrc: './img/warrior/RunLeft.png',
        frameRate: 8,
        frameBuffer: 6,
      },
      FallLeft: {
        imageSrc: './img/warrior/FallLeft.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      JumpLeft: {
        imageSrc: './img/warrior/JumpLeft.png',
        frameRate: 2,
        frameBuffer: 3,
      },

    },
});

const keys = {
    d: {
        pressed:false,
    },

    a: {
        pressed:false,
    },
}

const background = new Sprite({
    position:{
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',

})

const camera = {
    position: {
        x: 0,
        y: 0,
    },
    width: 200,
    height: 80,
}
// fills the canvas as well as set boundries 
// lets animate the player moving by constanly changing his position on the screen 
// we need change using a variable, also the position of the player is changing with the red outline as well as the overall canvas
// this method is very procedural so will be confusing with more players we should use classes
function animate(){
    window.requestAnimationFrame(animate);

    c.fillStyle = 'white';
    c.fillRect(0,0,canvas.width,canvas.height)
    
    // does get affected by local scope, only global scope using save and restore
    // scale is used to make the background fit the canvas 
    // translate to the bottom of the background 
    c.save();
    c.scale(4,4);
    c.translate(camera.position.x, -background.image.height + scaleCanvas.height);
    background.update();
    
    collisionBlocks.forEach( (collisionBlock) => {
        collisionBlock.update();
    })

    platformCollisionBlocks.forEach((block) =>{
        block.update();
    })

    player.update();

    player.velocity.x = 0;

    if(keys.d.pressed){
      player.switchSprite('Run')
      player.velocity.x = 3.2;
      player.shouldPanCameraLeft({camera,canvas})
    }
    else if(keys.a.pressed){
        player.switchSprite('RunLeft')
        player.velocity.x = -3.2;
    }
    else if(player.velocity.y === 0){
        player.switchSprite('Idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('Jump');
    }
    else if(player.velocity.y > 0){
        player.switchSprite('Fall');
    }
    if(player.velocity.y < 0 && keys.a.pressed){
        player.switchSprite('JumpLeft');
    }
    else if(player.velocity.y > 0 && keys.a.pressed){
        player.switchSprite('FallLeft');
    }
    c.restore();

}
animate();

window.addEventListener('keydown', (event) => {
    
    switch(event.key){
        case 'd':
        keys.d.pressed = true;
        break;

        case 'a':
        keys.a.pressed = true;
        break;

        case 'w':
        player.velocity.y = -3,5;
        break;

        case' ':
        player.velocity.y = -3.5;
    }
})

window.addEventListener('keyup', (event) => {
    
    switch(event.key){
        case 'd':
        keys.d.pressed = false;
        break;

        case 'a':
        keys.a.pressed = false;
        break;
    }
})
