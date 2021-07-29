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
    }

    create() {

        // Hintergrund hinzufügen
        var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'bgCredits');

        // Button zum Hauptmenü zurück
        var buttonHome = this.add.image(1288, 35, 'home').setInteractive();
        buttonHome.on('pointerdown', function(event){ // Start game on click
            this.scene.stop('credits');
           this.scene.start('mainMenu');
           console.log("Zurück zum Hauptmenü")
        }, this);

        // Button Sound an/Sound aus
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive();
        buttonSound.on('pointerdown', function(event){
            console.log("Sound an/aus")
         }, this);

    }
}