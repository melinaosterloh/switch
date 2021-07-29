class credits extends Phaser.Scene {

    constructor (config) {
        super(config);
        Phaser.Scene.call(this, { key: 'credits'});
    }


   /*  init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	} */

    preload(){
        this.load.image('bgCredits', 'assets/backgroundCredits.png');
        this.load.image('home', 'assets/buttonHome.png')
        this.load.image('soundOn', 'assets/tonAn.png')

        this.load.audio('menuSound', ['assets/menuSound.mp3'])
        this.load.audio('buttonClick', ['assets/buttonClick.mp3'])
    }

    create() {

        // Hintergrund hinzufügen
        var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'bgCredits');

        // Hintergrundmusik hinzufügen 
        var music = this.sound.add('menuSound', { loop: true });
        music.play();

        // Sound für Button Click hinzufügen
       var buttonClick = this.sound.add('buttonClick', { loop: false });

        // Button zum Hauptmenü zurück
        var buttonHome = this.add.image(1288, 35, 'home').setInteractive({
            useHandCursor: true
          });
        buttonHome.on('pointerdown', function(event){ // Start game on click
            buttonClick.play();
            this.scene.stop('credits');
           this.scene.start('mainMenu');
           music.stop();
           console.log("Zurück zum Hauptmenü")
        }, this);

        // Button Sound an/Sound aus 
        var clickCount = 0;
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive({
            useHandCursor: true
          });
        buttonSound.on('pointerdown', function(event){
            if (clickCount == 0) {
                buttonClick.play();
                music.stop();
                clickCount = 1;
                console.log("Sound aus")
            } else {
                buttonClick.play();
                music.play();
                clickCount = 0;
                console.log("Sound an")
            }
            });

    }
}