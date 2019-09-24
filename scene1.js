    
class scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
    preload(){

      this.load.image("start","assets/button_start-game.png",{
        frameWidth: 200,
        frameHeight:250,
      });
     
      this.load.image("more","assets/more.jpg");
      this.load.image("kraj","assets/kraj.png");
      this.load.image("kamikaza1","assets/kamikaza1.png",{
        frameWidth: 150,
        frameHeight: 150,
      });
      this.load.spritesheet("kamikaza2","assets/kamikaza2.png",{
        frameWidth: 80,
        frameHeight: 80,
      });
      this.load.spritesheet("kamikaza3","assets/kamikaza3.png",{
        frameWidth: 80,
        frameHeight: 80,
      });
      this.load.spritesheet("player","assets/player.png",{
        frameWidth: 75,
        frameHeight: 75
      });
      this.load.spritesheet("explosion", "assets/explosion.png",{
        frameWidth: 77,
        frameHeight: 73
      });
      this.load.spritesheet("bullet","assets/bullet.png",{
        frameWidth: 60,
        frameHeight: 70

      });
      this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
      this.load.audio("pozadinska","assets/pozadinska.mp3");
      this.load.audio("explozija","assets/explozija.mp3");
    }
   
  
    create() {
     this.start= this.add.image(400,300,"start");
     this.start.setInteractive();
     this.input.on('gameobjectdown',this.startGame,this);
    
      
      this.anims.create({
        key: "plane_anim",
        frames: this.anims.generateFrameNumbers("kamikaza"),
        frameRate: 1,
        repeat: -1
      });
      this.anims.create({
        key: "player_anim",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 10,
        repeat: -1
      });
     

      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 30,
        repeat: 0,
        hideOnComplete: true
      });
      
     
    }
    startGame(){
      this.scene.start("playGame");

    }

  }