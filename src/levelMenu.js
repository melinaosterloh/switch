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
        this.load.image('level2', 'assets/level2.png')
        this.load.image('level3', 'assets/level3.png')
        this.load.image('home', 'assets/buttonHome.png')
        this.load.image('soundOn', 'assets/tonAn.png')

        this.load.audio('menuSound', ['assets/menuSound.mp3'])
        this.load.audio('buttonClick', ['assets/buttonClick.mp3'])
    }

    create() {

        // Hintergrund hinzufügen
        var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'bgLevels');

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
            this.scene.stop('levelMenu');
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

        // Steuerung Button
                var buttonLevel1 = this.add.image(356, 298, 'level1').setInteractive({
                    useHandCursor: true
                  });
                buttonLevel1.on('pointerdown', function(event){
                    this.scene.start('levelOne');
                    music.stop();
                    console.log("Level 1 wird gestartet")
                 }, this);

                // Steuerung Button
                var buttonLevel2 = this.add.image(1021, 298, 'level2').setInteractive({
                    useHandCursor: true
                  });
                buttonLevel2.on('pointerdown', function(event){
                    this.scene.start('levelTwo');
                    music.stop();
                    console.log("Level 2 wird gestartet")
                 }, this);

                 // Steuerung Button
                var buttonLevel3 = this.add.image(682, 564, 'level3').setInteractive({
                    useHandCursor: true
                  });
                buttonLevel3.on('pointerdown', function(event){
                    this.scene.start('levelThree');
                    music.stop();
                    console.log("Level 3 wird gestartet")
                }, this);

    }
}