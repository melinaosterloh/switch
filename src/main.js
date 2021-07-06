var config = {
    type: Phaser.AUTO,
    //Größe des Spielsbildschirms
    width: 1593,
    height: 795,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    },
    //Vorbereitung der Ansicht
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var enteModel;
var affeModel;
var katzeModel


var game = new Phaser.Game(config);
var currentPlayer;
var players;
var platforms;
//var cursors;
//var score = 0;
//var scoreText;
//var darkness
//var choosenPlayer;
var keyObjE
var keyObjK
var keyObjA
var keyObkSpace

var playerPosition

var currentModel


//Funktion um Bilder/Sprites im Voraus zu laden
function preload() {
    this.load.image('sky', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('water','assets/water.png')

    this.enteModel = {
        name: 'Ente',
        speed: 160,
        jumping: false,
        supermodel: 'Ente'
    }
    this.affeModel = {
        name: 'Affe',
        speed: 160,
        jumping: false,
        supermodel: 'Affe'
    }
    this.katzeModel = {
        name: 'Katze',
        speed: 160,
        jumping: false,
        supermodel: 'SuperCat'
    }

    this.load.spritesheet(this.enteModel.name, 'assets/ente2.png', {
        frameWidth: 49,
        frameHeight: 60
    });
    this.load.spritesheet(this.affeModel.name, 'assets/affe2.png', {
        frameWidth: 38,
        frameHeight: 60
    });
    this.load.spritesheet(this.katzeModel.name, 'assets/katze.png', {
        frameWidth: 77,
        frameHeight: 60
    });
    this.load.spritesheet(this.katzeModel.supermodel, 'assets/super_cat.png', {
        frameWidth: 77,
        frameHeight: 60
    });




}



function create() {
    //------HINTERGRUND-----//
    //x und y parameter werden übergeben (Halbiert der gesamten Größe)
    background = this.add.tileSprite(0,795,1593*2, 795*2, 'sky');

    //------PLATFORMEN&BODEN-----//
    platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 10; i++) {
        if(i == 0){
            platforms.create(200 + (400 * i), 795-16, 'ground')
        } else {
            if(Math.random() < 0.4){
                platforms.create(200 + (400 * i), 795-16, 'water')
            } else {
                platforms.create(200 + (400 * i), 795-16, 'ground')
            }
        }
      }

    //platforms.create(600, 400, 'ground');
    //platforms.create(50, 250, 'ground');
    //platforms.create(750, 220, 'ground');


    //------PLAYER-----//
    this.currentModel = this.enteModel
    currentPlayer = this.physics.add.sprite(200, 650, this.currentModel.name);

    //Bounce bewirkt, dass der Player kurz 'hüpft' wenn er landet
    currentPlayer.setBounce(0.2);
    //Verhindert, dass der Spieler über das Ende des Bildschirms hinaus laufen/springen kann
    currentPlayer.setCollideWorldBounds(true);

    //------KAMERA-----//
    //Kamera folgt Figur
    this.cameras.main.setBounds(0, 0, 1593, 795);
    this.physics.world.setBounds(0, 0, 1593, 795);
    this.cameras.main.startFollow(currentPlayer, true, 0.5, 0.5);


    //ANIMATIONEN SPIELER MIT SPRITESHEET
    this.anims.create({
        key: 'Ente_left',
        //Benutzt die ersten 4 Animationsbilder (0-3)
        frames: this.anims.generateFrameNumbers('Ente', {
            start: 0,
            end: 3
        }),
        //10 frames per Seconds
        frameRate: 10,
        //Loop
        repeat: -1
    });

    this.anims.create({
        key: 'SuperCat_left',
        //Benutzt die ersten 4 Animationsbilder (0-3)
        frames: this.anims.generateFrameNumbers('SuperCat', {
            start: 0,
            end: 3
        }),
        //10 frames per Seconds
        frameRate: 10,
        //Loop
        repeat: -1
    });

    this.anims.create({
        key: 'Affe_left',
        //Benutzt die ersten 4 Animationsbilder (0-3)
        frames: this.anims.generateFrameNumbers('Affe', {
            start: 0,
            end: 3
        }),
        //10 frames per Seconds
        frameRate: 10,
        //Loop
        repeat: -1
    });

    this.anims.create({
        key: 'Katze_left',
        //Benutzt die ersten 4 Animationsbilder (0-3)
        frames: this.anims.generateFrameNumbers('Katze', {
            start: 0,
            end: 3
        }),
        //10 frames per Seconds
        frameRate: 10,
        //Loop
        repeat: -1
    });

    this.anims.create({
        key: 'Ente_turn',
        frames: [{
            key: 'Ente',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'Affe_turn',
        frames: [{
            key: 'Affe',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'SuperAffe_jump',
        frames: this.anims.generateFrameNumbers('Affe', {
            start: 9,
            end: 10
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'Katze_turn',
        frames: [{
            key: 'Katze',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'SuperCat_turn',
        frames: [{
            key: 'SuperCat',
            frame: 4
        }],
        frameRate: 20
    });


    this.anims.create({
        key: 'Ente_right',
        frames: this.anims.generateFrameNumbers('Ente', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Affe_right',
        frames: this.anims.generateFrameNumbers('Affe', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Katze_right',
        frames: this.anims.generateFrameNumbers('Katze', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'SuperCat_right',
        frames: this.anims.generateFrameNumbers('SuperCat', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(currentPlayer, platforms);

    //Eingebauter Keyboard Manager
    cursors = this.input.keyboard.createCursorKeys();
    keyObjE = this.input.keyboard.addKey('e'); // Get key object
    keyObjA = this.input.keyboard.addKey('a'); // Get key object
    keyObjK = this.input.keyboard.addKey('k'); // Get key object
    keyObkSpace = this.input.keyboard.addKey('space'); // Get key object

    //PUNKTE BZW. LICHTPUNKTE HINZUFÜGEN ZUM SAMMELN

}

function update() {
    //this.playerPosition = currentPlayer.getCenter().x;
    //console.log(this.playerPosition)

    if (cursors.left.isDown) {

        platforms.getChildren().forEach((c) => {
            if(c instanceof Phaser.GameObjects.Sprite){
                c.x += 2
                c.body.x += 2
            }
        })

        background.tilePositionX -= 0.5
        if (keyObkSpace.isDown) {
            switch (this.currentModel.name) {
                case 'Ente':
                    break;
                case 'Affe':
                    break;
                case 'Katze':
                    // keine lust auf Selbstmord!
                    break;
            }
        } else {

            if(currentPlayer.getCenter().x > 100){
                currentPlayer.setVelocityX(-this.currentModel.speed);
            } else {
                currentPlayer.setVelocityX(0);
                background.tilePositionX -= 2
            }
            currentPlayer.anims.play(this.currentModel.name + '_left', true);
        }
    }

    //Rechte Pfeiltaste gedrückt: Rechtsdrehung (160) & Laufanimation nach rechts
    else if (cursors.right.isDown) {

        platforms.getChildren().forEach((c) => {
            if(c instanceof Phaser.GameObjects.Sprite){
                c.x -= 2
                c.body.x -= 2
            }
        })

        background.tilePositionX += 0.5
        if (keyObkSpace.isDown) {
            switch (this.currentModel.name) {
                case 'Ente':
                    currentPlayer.setVelocityX(this.currentModel.speed);
                    currentPlayer.anims.play(this.currentModel.name + '_right', true);
                    break;
                case 'Affe':
                    currentPlayer.setVelocityX(this.currentModel.speed);
                    currentPlayer.anims.play(this.currentModel.name + '_right', true);
                    break;
                case 'Katze':
                    currentPlayer.setVelocityX(this.currentModel.speed * 2);
                    currentPlayer.anims.play(this.currentModel.supermodel + '_right', true);
                    break;
            }
        } else {
            if(currentPlayer.getCenter().x < 1200){
                currentPlayer.setVelocityX(this.currentModel.speed);
            } else {
                currentPlayer.setVelocityX(0);
                background.tilePositionX += 2
            }
            
            currentPlayer.anims.play(this.currentModel.name + '_right', true);
        }
    }

    //Start-Stop-Animation
    else {
        if (keyObkSpace.isDown) {
            switch (this.currentModel.name) {
                case 'Ente':
                    currentPlayer.setVelocityX(0);
                    currentPlayer.anims.play(this.currentModel.name + '_turn');
                    break;
                case 'Affe':
                    currentPlayer.setVelocityX(0);
                    if (this.currentModel.jumping) {
                        currentPlayer.anims.play('SuperAffe_jump');
                    }
                    break;
                case 'Katze':
                    currentPlayer.setVelocityX(0);
                    currentPlayer.anims.play(this.currentModel.name + '_turn');
                    break;
            }
        } else {
            currentPlayer.setVelocityX(0);
            currentPlayer.anims.play(this.currentModel.name + '_turn');
        }
    }

    //Wenn Pfeiltaste oben gedrückt ist und der Player den Boden berührt
    //Damit er nur vom Boden springen kann!!
    if (currentPlayer.body.touching.down) {
        this.currentModel.jumping = false

        if (cursors.up.isDown) {
            this.currentModel.jumping = true;
            if (keyObkSpace.isDown) {
                switch (this.currentModel.name) {
                    case 'Ente':
                        currentPlayer.setVelocityY(-330); //Y weil nach oben
                        break;
                    case 'Affe':
                        currentPlayer.setVelocityY(-330 * 2); //Y weil nach oben
                        break;
                    case 'Katze':
                        currentPlayer.setVelocityY(-330); //Y weil nach oben
                        break;
                }
            } else {
                currentPlayer.setVelocityY(-330); //Y weil nach oben
            }
        }
    }

    if (keyObjE.isDown) {
        this.currentModel = this.enteModel
    }

    if (keyObjA.isDown) {
        this.currentModel = this.affeModel
    }

    if (keyObjK.isDown) {
        this.currentModel = this.katzeModel
    }
}