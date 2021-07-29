class mainMenu extends Phaser.Scene {

    constructor (config) {
        super(config);
        Phaser.Scene.call(this, { key: 'mainMenu'});
    }
    

   /*  init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	} */

    preload(){
        this.load.image('background', 'assets/backgroundWithFence.png');
        //this.load.image('fence', 'assets/zaun.png')
        this.load.image('buttonStart', 'assets/buttonStart.png')
        this.load.image('buttonLevels', 'assets/buttonLevels.png')
        this.load.image('buttonControl', 'assets/buttonControl.png')
        this.load.image('buttonCredits', 'assets/buttonCredits.png')
        this.load.image('logo', 'assets/logo.png')
        this.load.image('soundOn', 'assets/tonAn.png')
    }

    create() {

        // Hintergrund hinzufügen
        var background = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'background');

        // add logo
        var logo = this.add.image(690, 137, 'logo');

        // Button Sound an/Sound aus
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive();
        buttonSound.on('pointerdown', function(event){
            console.log("Sound an/aus")
         }, this);

        // Start Button
       var buttonStart = this.add.image(436, 329, 'buttonStart').setInteractive();
       //this.buttonStart.on('pointerover', function (event) { /* Do something when the mouse enters */ });
       //this.buttonStart.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
       buttonStart.on('pointerdown', function(event){// Start game on click.
           //buttonStart.setTexture('imgButtonStartClicked');
           this.scene.start('levelOne');
           console.log("Level 1 wird gestartet")
        }, this);
       
        // Levelauswahl Button
        var buttonLevels = this.add.image(941, 329, 'buttonLevels').setInteractive();
        buttonLevels.on('pointerdown', function(event){
            this.scene.start('levelMenu');
            console.log("Levelmenü wird angezeigt")
         }, this);

        // Steuerung Button
        var buttonControl = this.add.image(436, 540, 'buttonControl').setInteractive();
        buttonControl.on('pointerdown', function(event){
            this.scene.start('control');
            console.log("Steuerung wird angezeigt")
         }, this);

        // Credits Button
        var buttonCredits = this.add.image(941, 540, 'buttonCredits').setInteractive();
        buttonCredits.on('pointerdown', function(event){
            this.scene.start('credits');
            console.log("Credits werden angezeigt")
         }, this);
		
    }
}