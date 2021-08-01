// Fenster, dass angezeigt wird, wenn Level 3 geschafft wurde

var winScreen;
var goMainMenu;
var goTryAgain;
var goCloseWindow;
var buttonClick;

class winGame extends Phaser.Scene {

    constructor(config) {
        super(config);
        Phaser.Scene.call(this, {
            key: 'winGame'
        });
    }

    preload() {
      this.load.image('winScreen', 'assets/winScreen.png');
        this.load.image('goMainMenu', 'assets/goMainMenu.png');
        this.load.image('goAgain', 'assets/goAgain.png');

        this.load.audio('buttonClick', ['assets/buttonClick.png']);
    }
  
  
    create() {
      winScreen = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'winScreen');

        // Sound für Button Click hinzufügen
       buttonClick = this.sound.add('buttonClick', { loop: false });

        // Zurück zum Hauptmenü Button
        goMainMenu = this.add.image(475, 349, 'goMainMenu').setInteractive({
            useHandCursor: true,
          });
          goMainMenu.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.stop('gameOver');
            this.scene.start('mainMenu');
            console.log("Zurück zum Hauptmenü")
         }, this);

         // Neuer Versuch Button
         goAgain = this.add.image(849, 349, 'goTryAgain').setInteractive({
            useHandCursor: true,
          });
          goAgain.on('pointerdown', function(event){
            buttonClick.play();
            this.scene.stop('gameOver');
            this.scene.start('levelOne');
            console.log("Level 1 wird gestartet, Neuanfang")
         }, this);

    }
  }