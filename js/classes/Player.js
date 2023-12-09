// creating class to create object player 
class Player extends Sprite{   
    constructor({position, collisionBlocks,imageSrc, frameRate, scale = 0.5, animations, platformCollisionsBlocks}){
        // we call the constructor of the parent class

        super({imageSrc , frameRate ,scale})
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.platformCollisionBlocks = platformCollisionsBlocks
        this.collisionBlocks = collisionBlocks
        

        this.animations = animations
        this.direction = 'right';  
         
        for(let key in this.animations){
            
            const image = new Image();
            image.src = this.animations[key].imageSrc;


            this.animations[key].image = image;

        }
        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
}

switchSprite(key){
    // if the key is not in the animations object, we return
        if(this.image == this.animations[key].image || !this.loaded) return

        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameRate = this.animations[key].frameRate;
        this.frameBuffer = this.animations[key].frameBuffer;
        
}
    //update the hitbox of the player

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27,
        }
}
// render player type     

    updateCameraBox(){
        this.cameraBox = {
            position: {
                x: this.position.x-50,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    shouldPanCameraLeft({canvas,camera}){
        const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width;
        const scaledCanvasWidth = canvas.width/4;

        if(cameraBoxRightSide >= canvas.width/scaledCanvasWidth){
            camera.position.x -= this.velocity.x;
        }
    }


    //simulate the physics of the object player
    update(){
        this.updateFrames();
        this.updateHitbox();

        this.updateCameraBox();
        //this draws the camera box
        c.fillStyle = 'rgba(0,0,255,0.5)'
        c.fillRect(this.cameraBox.position.x,this.cameraBox.position.y,this.cameraBox.width,this.cameraBox.height)

        //this draws the image of the player
        //c.fillStyle = 'rgba(0,255,0,0.5)'
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)

        //this draws the hitbox of the player 
        //c.fillStyle = 'rgba(255,0,0,0.5)'
        //c.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height)


        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
    }
    
    checkForHorizontalCollision(){
        for(let i = 0; i <collisionBlocks.length; i++){
            const collisionBlock = collisionBlocks[i];
        
            if(collision({
                object1: this.hitbox, 
                object2: collisionBlock,
            })
            ){
                if(this.velocity.x > 0){
                    
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - offset - 0.01;
                    break;
                }
                if(this.velocity.x < 0){

                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset+ 0.01;
                    this.velocity.x = 0;
                    break;
                }

            }  
        }      
    
    }

    applyGravity(){
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
        
    }

    checkForVerticalCollision(){
        for(let i = 0; i <collisionBlocks.length; i++){
            const collisionBlock = collisionBlocks[i];
        

            if(collision({
                object1: this.hitbox, 
                object2: collisionBlock,
            })
            ){
                if(this.velocity.y > 0){
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    this.velocity.y = 0;
                    break;
                }
                if(this.velocity.y < 0){
                    const offset = this.hitbox.position.y - this.position.y;

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    this.velocity.y = 0;
                    break;
                }

            }

        }

        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = platformCollisionBlocks[i]
      
            if (platformCollision({
                object1: this.hitbox,
                object2: platformCollisionBlock,
              })
            ) {
              if (this.velocity.y > 0) {
                this.velocity.y = 0
      
                const offset =
                  this.hitbox.position.y - this.position.y + this.hitbox.height
      
                this.position.y = platformCollisionBlock.position.y - offset - 0.01
                break
              }
            }
          }

        

    }

}
