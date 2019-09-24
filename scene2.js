
class scene2 extends Phaser.Scene{
    constructor(){
      
      super("playGame");
    }
    preload(){

     
      this.load.image("kraj","assets/kraj.png");
    }
  
    create(){
      
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "more");
      this.background.setOrigin(0,0);
      
      

      this.kamikaza3=this.add.sprite(config.width/2-50,config.height/20,"kamikaza3");
      this.kamikaza2=this.add.sprite(config.width/3,config.height/10,"kamikaza2");
      this.kamikaza1=this.add.sprite(config.width/4,config.height/11,"kamikaza1");
      
      this.enemyPlanes= this.physics.add.group();
      this.enemyPlanes.add(this.kamikaza3);
      this.enemyPlanes.add(this.kamikaza1);
      this.enemyPlanes.add(this.kamikaza2);
      
      
     
      this.kamikaza3.setInteractive();
      this.kamikaza1.setInteractive();
      this.kamikaza2.setInteractive();
     
      this.pozadinska=this.sound.add("pozadinska");
      this.explozija=this.sound.add("explozija");

      var pozadinskaConfig = {

        mute: false,
        volume:2,
        rate:2,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0

      }
     
      this.slowdown=0;

      this.pozadinska.play(pozadinskaConfig);
      
      this.player=this.physics.add.sprite(config.width/2-8,config.height-65,"player");
      this.cursorKeys=this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);
      this.player.play("player_anim");


     
      this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.projectiles = this.add.group();

      this.physics.add.overlap(this.player,this.enemyPlanes,this.killPlayer,null,this);
      this.physics.add.overlap(this.projectiles, this.enemyPlanes, this.killKamikaza, null, this);
    
      this.score=0;
      this.life=3;
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE "   , 26);
      this.lifeLabel = this.add.bitmapText(550,5,"pixelFont","LIFE",27);
      this.lifeLabel.text="Life points " + this.life;
    }
    

    killKamikaza(projectile,kamikaza){
      var explosion= new Explosion(this,kamikaza.x,kamikaza.y);
      projectile.destroy();
      var explozijaConfig = {

        mute: false,
        volume:2,
        rate: 2,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
      this.explozija.play(explozijaConfig);
      this.resetPlane(kamikaza);
      this.score+=10;
      this.scoreLabel.text= "SCORE" + this.score; 
    }
    moveKamikaza3(plane,score)
    {
      if(plane.y>config.height)
      {
        this.resetPlane(plane);
      }

      plane.y+=2 + score/100 - this.slowdown;
      plane.x+=3.5;
      if(plane.x>config.width){
        this.resetPlane(plane)
      }
    }
    moveKamikaza1(plane,score)
    {
      if(plane.y>config.height){
        this.resetPlane(plane);
      }
      plane.x+=+0.6;
        plane.y+=2 + score/120 - this.slowdown; 
    }
    moveKamikaza2(plane,score)
    {
      if(plane.y>config.height){
        this.resetPlane(plane);
      }
      plane.x-=1;
      plane.y+=2+score/130 - this.slowdown;
    }



    resetPlane(plane){
     
      plane.y=3;
      var random=Phaser.Math.Between(0,config.width);
      plane.x=random;

    }

    update(){
      if(this.life>0){
      this.movePlayer();
      this.moveKamikaza3(this.kamikaza3,this.score);
      this.moveKamikaza2(this.kamikaza2,this.score);
      this.moveKamikaza1(this.kamikaza1,this.score);
      this.background.tilePositionY -= 2;
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
        
        this.shootBullet();
      }
        for(var i = 0; i < this.projectiles.getChildren().length; i++){
          var bullet = this.projectiles.getChildren()[i];
          bullet.update();
        }
      }
       else{
        this.kraj.tilePositionX -=2;

       }
          
    }
    
    
    
    movePlayer(){
      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        this.shootBullet();
      }
      this.player.setVelocity(0);
      if(this.cursorKeys.left.isDown){

        this.player.setVelocityX(-gameSettings.playerSpeed);
      }
      else if(this.cursorKeys.right.isDown)
        {

          this.player.setVelocityX(gameSettings.playerSpeed);


        }

        if(this.cursorKeys.up.isDown)
        {
          
          this.player.setVelocityY(-gameSettings.playerSpeed);
          
        }
        else if(this.cursorKeys.down.isDown)
        {
          
          this.player.setVelocityY(gameSettings.playerSpeed);
          
        }
      }
      shootBullet(){
        var bullet= new Bullet(this);
      }
      killPlayer(player){
        if(this.player.alpha==1){
        this.life-=1;
        }
        this.slowdown=this.score/200;
        this.lifeLabel.text= "Life points " + this.life;
        if(this.life<1){
          
          this.kraj = this.add.tileSprite(0,0, config.width, config.height, "kraj");
          this.kraj.tilePositionX -=2;
          this.kraj.setOrigin(0,0);
          this.konacni=this.score;
          
          
          this.scoreLabel = this.add.bitmapText(200,400 , "pixelFont", "YOUR FINAL SCORE: " + this.score , 50);
          this.credits1Label = this.add.bitmapText(10,450 , "pixelFont", "This game was made by Ivan Antunovic, student of 3rd year bacc. Inf" , 30);
          this.credits2Label = this.add.bitmapText(10,480 , "pixelFont", "Mentor:doc.dr.sc. Tihomir Orehovacki-FACULTY of Informatics, Pula" , 30);
          this.credits2Label = this.add.bitmapText(10,520 , "pixelFont", "Purpose of making : final thesis" , 30);

          player.disableBody(true, true);
          this.time.addEvent({
            delay: 2000,
            
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
          });

          
          
        }
        this.resetPlane(this.kamikaza1);
        this.resetPlane(this.kamikaza3);
        this.resetPlane(this.kamikaza2);
        
      
      
      var explosion = new Explosion(this, player.x, player.y);
  
     
      
      
      player.disableBody(true, true);
      
      this.time.addEvent({
        delay: 1500,
        
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      });
    }
    resetPlayer(){
     
      var x = config.width / 2 - 8;
      var y = config.height + 64;
      
  
      
    
      this.player.alpha = 0.5;
      
      var tween = this.tweens.add({
        targets: this.player,
        y: config.height - 64,
        ease: 'Power1',
        duration: 1500,
        repeat:0,
        onComplete: function(){
          this.player.alpha = 1;
        },
        callbackScope: this
      });
      this.player.enableBody(true, x, y, true, true);
    }
      }

    
  


  