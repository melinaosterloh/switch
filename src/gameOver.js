var gameOverBackground;
var goMainMenu;
var goTryAgain;
var goCloseWindow;
var buttonClick;

class gameOver extends Phaser.Scene {

    constructor (config) {
        super(config);
        Phaser.Scene.call(this, { key: 'gameOver'});
    }

    preload() {
      this.load.image('overlay', 'assets/gameOverWindow.png');
        this.load.image('goMainMenu', 'assets/goMainMenu.png');
        this.load.image('goTryAgain', 'assets/goTryAgain.png');
        this.load.image('goCloseWindow', 'assets/goCloseWindow.png');

        this.load.audio('buttonClick', ['assets/buttonClick.png']);
    }
  
  
    create() {
      var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'overlay');

        // Sound für Button Click hinzufügen
       buttonClick = this.sound.add('buttonClick', { loop: false });

        // Zurück zum Hauptmenü Button
        goMainMenu = this.add.image(445, 451, 'goMainMenu').setInteractive({
            useHandCursor: true,
          });
          goMainMenu.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.stop('gameOver');
            this.scene.start('mainMenu');
            console.log("Zurück zum Hauptmenü")
         }, this);

         // Neuer Versuch Button
        goTryAgain = this.add.image(881, 451, 'goTryAgain').setInteractive({
            useHandCursor: true,
          });
          goTryAgain.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.stop('gameOver');
            this.scene.start('levelOne');
            console.log("Level 1 wird gestartet, Neuanfang")
         }, this);

         /* // Zurück zum Hauptmenü Button
        goCloseWindow = this.add.image(1023, 142, 'goCloseWindow').setInteractive({
            useHandCursor: true,
          });
          goCloseWindow.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.stop('gameOver');
            console.log("Game Over Screen wird geschlossen")
         }, this); */

    }
  }
  