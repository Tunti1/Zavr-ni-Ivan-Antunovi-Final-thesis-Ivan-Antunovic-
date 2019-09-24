class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x=scene.player.x - 2;
        var y=scene.player.y - 16;
        super(scene,x,y,"bullet");
        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 600;

        scene.projectiles.add(this);

    }
    update(){

        
        if(this.y < 1 ){
          this.destroy();
        }
    }
}