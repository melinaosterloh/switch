class levelMenu extends Phaser.Scene {

    constructor (config) {
        super(config);
        Phaser.Scene.call(this, { key: 'levelMenu'});
    }


   /*  init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	} */

    preload(){
        this.load.image('bgLevels', 'assets/backgroundLevels.png');
        //this.load.image('fence', 'assets/zaun.png')
        this.load.image('level1', 'assets/level1.png')
        this.load.image('home', 'assets/buttonHome.png')
        this.load.image('soundOn', 'assets/tonAn.png')
    }

    create() {

        // Hintergrund hinzufügen
        var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'bgLevels');

        // Button zum Hauptmenü zurück
        var buttonHome = this.add.image(1288, 35, 'home').setInteractive();
        buttonHome.on('pointerdown', function(event){ // Start game on click
            this.scene.stop('levelMenu');
           this.scene.start('mainMenu');
           console.log("Zurück zum Hauptmenü")
        }, this);

        // Button Sound an/Sound aus
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive();
        buttonSound.on('pointerdown', function(event){
            console.log("Sound an/aus")
         }, this);

        // Steuerung Button
        var buttonLevel1 = this.add.image(356, 298, 'level1').setInteractive();
        buttonLevel1.on('pointerdown', function(event){
            this.scene.start('levelOne');
            console.log("Level 1 wird gestartet")
         }, this);

        // Steuerung Button
        var buttonLevel2 = this.add.image(1021, 298, 'level1').setInteractive();
        buttonLevel2.on('pointerdown', function(event){
            this.scene.start('levelTwo');
            console.log("Level 2 wird gestartet")
         }, this);

         // Steuerung Button
        var buttonLevel3 = this.add.image(682, 564, 'level1').setInteractive();
        buttonLevel3.on('pointerdown', function(event){
            this.scene.start('levelThree');
            console.log("Level 3 wird gestartet")
         }, this);

    }
}