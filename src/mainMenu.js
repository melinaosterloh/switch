class mainMenu extends Phaser.Scene {

    constructor (config) {
        super(config);
        Phaser.Scene.call(this, { key: 'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/backgroundWithFence.png');
        this.load.image('buttonStart', 'assets/buttonStart.png')
        this.load.image('buttonLevels', 'assets/buttonLevels.png')
        this.load.image('buttonControl', 'assets/buttonControl.png')
        this.load.image('buttonCredits', 'assets/buttonCredits.png')
        this.load.image('logo', 'assets/logo.png')
        this.load.image('soundOn', 'assets/tonAn.png')

        this.load.audio('menuSound', ['assets/menuSound.mp3'])
        this.load.audio('buttonClick', ['assets/buttonClick.mp3'])
    }

    create() {
       // Hintergrund hinzufügen
       var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'background');

       // Hintergrundmusik hinzufügen 
       var music = this.sound.add('menuSound', { loop: true });
<<<<<<< HEAD
=======
       music.autoplay = true;
       music.play();

>>>>>>> main

       // Sound für Button Click hinzufügen
       var buttonClick = this.sound.add('buttonClick', { loop: false });

        // add logo
        var logo = this.add.image(690, 137, 'logo');

        // Button Sound an/Sound aus 
        var clickCount = 0;
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive({
            useHandCursor: true
          });
        buttonSound.on('pointerdown', function(event){
            if (clickCount == 0) {
                buttonClick.play();
                music.play();
                clickCount = 1;
                console.log("Sound aus")
            } else {
                buttonClick.play();
                music.stop();
                clickCount = 0;
                console.log("Sound an")
            }
            });

        // Start Button
       var buttonStart = this.add.image(436, 329, 'buttonStart').setInteractive({
        useHandCursor: true
      });
       //this.buttonStart.on('pointerover', function (event) { /* Do something when the mouse enters */ });
       //this.buttonStart.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
       buttonStart.on('pointerdown', function(event){ // Start game on click.
           //buttonStart.setTexture('imgButtonStartClicked');
           buttonClick.play();
           this.scene.start('levelOne');
           music.stop();
           console.log("Level 1 wird gestartet")
           
        }, this);
       
        // Levelauswahl Button
        var buttonLevels = this.add.image(941, 329, 'buttonLevels').setInteractive({
            useHandCursor: true
          });
        buttonLevels.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.start('levelMenu');
            music.stop();
            console.log("Levelmenü wird angezeigt")
         }, this);

        // Steuerung Button
        var buttonControl = this.add.image(436, 540, 'buttonControl').setInteractive({
            useHandCursor: true
          });
        buttonControl.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.start('control');
            music.stop();
            console.log("Steuerung wird angezeigt")
         }, this);

        // Credits Button
        var buttonCredits = this.add.image(941, 540, 'buttonCredits').setInteractive({
            useHandCursor: true
          });
        buttonCredits.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.start('credits');
            music.stop();
            console.log("Credits werden angezeigt")
         }, this);

        
    }

    render() {
        this.debug.soundInfo(music, 20, 32);
    }
}