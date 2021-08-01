// Level Zwei im Park

var enteModel;
var affeModel;
var katzeModel
var leben;
var spielAmLaufen;

var playerPosition
var score = 0;
var scoreText;
var currentModel
var currentGround
var currentPlayer
var lebenLabel
var cursors
var keyObjE
var keyObjA
var keyObjK
var keyObkSpace
var keyObkEnter

//var background
var background_2
var platforms2
var trees2
var ziel
var ziele
var lights
var darknesses
var darkness
var ghosts
var ghosts2
var ghost
var ghost2
var anzahlBodenplatten

var levelMusic
var jumpSound

var xTreeValue
var xValue
var rnd

var collisionObstacle = false;

class levelTwo extends Phaser.Scene {

    constructor(config) {
        super(config);
        Phaser.Scene.call(this, {
            key: 'levelTwo'
        });
    }

    //Funktion um Bilder/Sprites im Voraus zu laden
    //##############
    ///PRELOAD
    //##############
    preload() {
        this.load.image('sky2', 'assets/background_2.png');
        this.load.image('street', 'assets/strasse.png');
        this.load.image('puddle', 'assets/pfueze.png')
        this.load.image('barrier1', 'assets/absperrung.png')
        this.load.image('traffic_light', 'assets/ampel.png')
        this.load.image('barrier2', 'assets/absperrung2.png')
        this.load.image('light', 'assets/light.png')
        this.load.image('home', 'assets/buttonHome.png')
        this.load.image('soundOn', 'assets/tonAn.png')

        this.load.audio('levelSound', ['assets/levelSound.mp3'])
        this.load.audio('buttonClick', ['assets/buttonClick.mp3'])
        this.load.audio('jumpSound', ['assets/jumpSound.mp3'])

        this.enteModel = {
            name: 'Ente',
            speed: 90,
            jumping: false,
            supermodel: 'Ente'
        }
        this.affeModel = {
            name: 'Affe',
            speed: 110,
            jumping: false,
            supermodel: 'Affe'
        }
        this.katzeModel = {
            name: 'Katze',
            speed: 110,
            jumping: false,
            supermodel: 'SuperCat'
        }

        this.leben = 3;
        this.spielAmLaufen = true;

        this.load.spritesheet(this.enteModel.name, 'assets/ente.png', {
            frameWidth: 62,
            frameHeight: 70
        });
        this.load.spritesheet(this.affeModel.name, 'assets/affe.png', {
            frameWidth: 50,
            frameHeight: 70
        });
        this.load.spritesheet(this.katzeModel.name, 'assets/katze.png', {
            frameWidth: 102,
            frameHeight: 70
        });
        this.load.spritesheet(this.katzeModel.supermodel, 'assets/supercat.png', {
            frameWidth: 95,
            frameHeight: 70
        });
        this.load.spritesheet('ziel', 'assets/ziel2.png', {
            frameWidth: 44,
            frameHeight: 100
        });
        this.load.spritesheet('darkness', 'assets/darknessSprite2.png', {
            frameWidth: 1464,
            frameHeight: 950
        });
        this.load.spritesheet('ghost', 'assets/ghost.png', {
            frameWidth: 150,
            frameHeight: 195
        });
        this.load.spritesheet('ghost2', 'assets/ghost.png', {
            frameWidth: 150,
            frameHeight: 195
        });
    }

    //##############
    ///CREATE
    //##############
    create() {
        //------HINTERGRUND-----//
        //x und y parameter werden übergeben (Halbiert der gesamten Größe)
        background_2 = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'sky2');

        // Hintergrundmusik hinzufügen 
        levelMusic = this.sound.add('levelSound', {
            loop: true
        });
        levelMusic.play();

        // Sound für Button Click hinzufügen
        var buttonClick = this.sound.add('buttonClick', {
            loop: false
        });

        // Sound wenn einer der Spieler springt
        jumpSound = this.sound.add('jumpSound', {
            loop: false
        });

        // Button zum Hauptmenü zurück
        var buttonHome = this.add.image(1288, 35, 'home').setInteractive({
            useHandCursor: true
        });
        buttonHome.on('pointerdown', function (event) { // Start game on click
            buttonClick.play();
            this.scene.stop('levelTwo');
            this.scene.start('mainMenu');
            levelMusic.stop();
            console.log("Zurück zum Hauptmenü")
        }, this);

        // Button Sound an/Sound aus 
        var clickCount = 0;
        var buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive({
            useHandCursor: true
        });
        buttonSound.on('pointerdown', function (event) {
            if (clickCount == 0) {
                buttonClick.play();
                levelMusic.stop();
                clickCount = 1;
                console.log("Sound aus")
            } else {
                buttonClick.play();
                levelMusic.play();
                clickCount = 0;
                console.log("Sound an")
            }
        });

        //------PLATFORMEN&BODEN-----//
        platforms2 = this.physics.add.staticGroup();
        trees2 = this.physics.add.staticGroup();
        ziele = this.physics.add.staticGroup();

        anzahlBodenplatten = 10

        for (let i = 0; i <= anzahlBodenplatten; i++) {
            if (i == 0) {
                platforms2.create(200 + (400 * i), 707 - 16, 'street')
            } else if (i == (anzahlBodenplatten - 3)) {
                platforms2.create(200 + (400 * i), 707 - 16, 'street')
            } else {
                if (Math.random() < 0.3) {
                    platforms2.create(200 + (400 * i), 707 - 16, 'puddle')
                } else {
                    xValue = 200 + (400 * i)
                    if ('barrier1') {
                        xTreeValue = Phaser.Math.Between(xValue - 50, xValue + 50)
                    } else {
                        xTreeValue = Phaser.Math.Between(xValue - 200, xValue + 200)
                    }

                    rnd = Phaser.Math.Between(0, 3)

                    createTree2(rnd, xTreeValue)

                    platforms2.create(xValue, 707 - 16, 'street')
                }
            }
        }

        ziel = ziele.create((anzahlBodenplatten - 2) * 400 - 60, 580, 'ziel');

        //------LICHTKUGELN------//
        lights = this.physics.add.group({
            key: 'light',
            repeat: 30,
            setXY: {
                x: 500,
                y: 0,
                stepX: 300
            }
        });

        lights.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //------DUNKELHEIT------//
        darknesses = this.physics.add.staticGroup();
        darkness = darknesses.create(-650, 630 / 2 + 60, 'darkness')

        //------GEISTER------//
        ghosts = this.physics.add.staticGroup();
        ghost = ghosts.create(-200, 520, 'ghost');

        ghosts2 = this.physics.add.staticGroup();
        ghost2 = ghosts2.create(-350, 220, 'ghost2');

        //------PLAYER-----//
        this.currentModel = this.enteModel
        currentPlayer = this.physics.add.sprite(200, 600, this.currentModel.name);

        //------LEBEN------//
        lebenLabel = this.add.text(16, 16, 'Leben: ' + this.leben, {
            fontSize: '32px',
            fill: 'white'
        })

        //Bounce bewirkt, dass der Player kurz 'hüpft' wenn er landet
        currentPlayer.setBounce(0.2);
        //Verhindert, dass der Spieler über das Ende des Bildschirms hinaus laufen/springen kann
        currentPlayer.setCollideWorldBounds(true);

        //------PUNKTE------//
        scoreText = this.add.text(16, 50, 'Score: ' + score, {
            fontSize: '32px',
            fill: 'white'
        })

        //------KAMERA-----//
        //Kamera folgt Figur
        this.cameras.main.setBounds(0, 0, 1400, 707);
        this.physics.world.setBounds(0, 0, 1000, 707);
        this.cameras.main.startFollow(currentPlayer, true, 0.5, 0.5);


        //ANIMATIONEN SPIELER MIT SPRITESHEET

        createDeathAnimation(this, this.enteModel.name, 13);
        createDeathAnimation(this, this.affeModel.name, 11);
        createDeathAnimation(this, this.katzeModel.name, 9);

        createTurnAnimation(this, this.enteModel.name, 4);
        createTurnAnimation(this, this.affeModel.name, 4);
        createTurnAnimation(this, this.katzeModel.name, 4);
        createTurnAnimation(this, this.katzeModel.supermodel, 4);

        createMoveAnimation(this, 'right', this.enteModel.name, 5, 8);
        createMoveAnimation(this, 'right', this.affeModel.name, 5, 8);
        createMoveAnimation(this, 'right', this.katzeModel.name, 5, 8);
        createMoveAnimation(this, 'right', this.katzeModel.supermodel, 0, 5);

        createMoveAnimation(this, 'left', this.enteModel.name, 0, 3);
        createMoveAnimation(this, 'left', this.affeModel.name, 0, 3);
        createMoveAnimation(this, 'left', this.katzeModel.name, 0, 3);
        //    createMoveAnimation(this, 'left', this.katzeModel.supermodel, 0, 2);

        createMoveAnimation(this, 'jump', this.affeModel.name, 9, 10)

        createMoveAnimation(this, 'swim_right', this.enteModel.name, 11, 12)
        createMoveAnimation(this, 'swim_left', this.enteModel.name, 9, 10)

        createZielAnimation(this);
        createDarknessAnimation(this);
        createGhostAnimation(this);
        createGhostAnimation2(this);

        //------KOLLISIONEN------//
        this.physics.add.collider(currentPlayer, platforms2, detectGround, null, this);
        this.physics.add.collider(currentPlayer, trees2, hitObstacle, null, this);
        this.physics.add.collider(currentPlayer, darkness, hitDarkness, null, this);
        this.physics.add.collider(platforms2, ziel);
        this.physics.add.collider(currentPlayer, ziel, gewonnen, null, this);
        this.physics.add.collider(platforms2, ghost);

        this.physics.add.collider(lights, platforms2);
        this.physics.add.collider(lights, trees2);
        this.physics.add.overlap(currentPlayer, lights, collectLights, null, this);

        //Eingebauter Keyboard Manager
        cursors = this.input.keyboard.createCursorKeys();
        keyObjE = this.input.keyboard.addKey('e'); // Get key object
        keyObjA = this.input.keyboard.addKey('a'); // Get key object
        keyObjK = this.input.keyboard.addKey('k'); // Get key object
        keyObkSpace = this.input.keyboard.addKey('space'); // Get key object
        keyObkEnter = this.input.keyboard.addKey('enter'); // Get key object

    }

    //##############
    ///UPDATE
    //##############
    update() {
        ziel.anims.play('ziel', true);
        darkness.anims.play('darkness', true);
        ghost.anims.play('ghost', true);
        ghost2.anims.play('ghost2', true);
        lebenLabel.setText('Leben: ' + this.leben)

        if (this.leben > 0 && this.spielAmLaufen) {
            moveDarkness(0.5);
            if (cursors.left.isDown) {
                moveGroundLvlTwo(this, 2);
                movePlayerLvl2(this, 'left', this.currentModel.speed)
            }
            //Rechte Pfeiltaste gedrückt: Rechtsdrehung (160) & Laufanimation nach rechts
            else if (cursors.right.isDown) {
                moveDarkness(-1);
                moveGroundLvlTwo(this, -2);
                movePlayerLvl2(this, 'right', this.currentModel.speed)
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
                                currentPlayer.anims.play(this.currentModel.name + '_jump');
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
                    jumpSound.play();
                    this.currentModel.jumping = true;
                    if (keyObkSpace.isDown) {
                        switch (this.currentModel.name) {
                            case 'Ente':
                                currentPlayer.setVelocityY(-150); //Y weil nach oben
                                break;
                            case 'Affe':
                                currentPlayer.setVelocityY(-150 * 3.1); //Y weil nach oben
                                break;
                            case 'Katze':
                                currentPlayer.setVelocityY(-250); //Y weil nach oben
                                break;
                        }
                    } else {
                        //                    currentPlayer.setVelocityY(-200); //Y weil nach oben
                        switch (this.currentModel.name) {
                            case 'Ente':
                                currentPlayer.setVelocityY(-150); //Y weil nach oben
                                break;
                            case 'Affe':
                                currentPlayer.setVelocityY(-250); //Y weil nach oben
                                break;
                            case 'Katze':
                                currentPlayer.setVelocityY(-250); //Y weil nach oben
                                break;
                        }
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

        } else {

            if(this.leben <= 0){
                this.leben = 0;
            }

            currentPlayer.setVelocityX(0);
            die(this)

            if (this.spielAmLaufen == false) {


                currentPlayer.setVelocityX(0);
                lebenLabel.setText('Press "ENTER"                    GEWONNEN :)')
                win(this)

                if (keyObkEnter.isDown) {
                    this.scene.start('levelThree');
                    levelMusic.stop();
                    console.log("Level 2 auf 3 wurde gewechselt!")
                }
            }
        }
    }
}
//Erstellen der Hindernisse
function createTree2(rnd, x) {
    switch (rnd) {
        case 1:
            scale = 0.5
            var tree = trees2.create(x, 610, 'barrier1')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 2:
            scale = 0.6
            var tree = trees2.create(x, 535, 'traffic_light')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 3:
            scale = 0.4
            var tree = trees2.create(x, 625, 'barrier2')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
    }
}

function movePlayerLvl2(that, direction, speed) {
    var groundSpeed = 0.5;

    if ('left' == direction) {
        speed = speed * -1;
        groundSpeed = groundSpeed * -1;
    }

    if (that.currentGround.texture.key == "puddle" && that.currentModel.name == "Ente" && !keyObkSpace.isDown) {
        speed = 0;
        groundSpeed = 0;
    }

    if(collisionObstacle){
        groundSpeed = 0;
    }


    background_2.tilePositionX += groundSpeed



    if (keyObkSpace.isDown) {
        switch (that.currentModel.name) {
            case 'Ente':
                if (that.currentGround.texture.key == 'street' && currentPlayer.body.touching.down) {
                    currentPlayer.setVelocityX(0);
                }
                currentPlayer.anims.play(that.currentModel.supermodel + '_swim_' + direction, true);
                break;
            case 'Affe':

                break;
            case 'Katze':
                currentPlayer.setVelocityX(speed * 2);
                currentPlayer.anims.play(that.currentModel.supermodel + '_' + direction, true);

                break;
        }
    } else {

        if (currentPlayer.getCenter().x > 100 || currentPlayer.getCenter().x < 1200) {
            currentPlayer.setVelocityX(speed);
        } else {
            currentPlayer.setVelocityX(0);
            if (direction == 'left') {
                background_2.tilePositionX -= 2
            } else {
                background_2.tilePositionX += 2
            }
        }
        currentPlayer.anims.play(that.currentModel.name + '_' + direction, true);
    }
}

function moveGroundLvlTwo(that, speed) {

    console.log(that.currentGround.texture.key)

    if (that.currentGround.texture.key == "puddle" && currentPlayer.texture.key == "Ente" && !keyObkSpace.isDown) {
        speed = 0;
    }

    if(collisionObstacle) {
        speed = 0;
    }

    platforms2.getChildren().forEach((c) => {
        if (c instanceof Phaser.GameObjects.Sprite) {
            c.x = c.x + speed
            c.body.x = c.body.x + speed
        }
    })
    trees2.getChildren().forEach((t) => {
        if (t instanceof Phaser.GameObjects.Sprite) {
            t.x = t.x + speed
            t.body.x = t.body.x + speed
        }
    })
    lights.getChildren().forEach((t) => {
        if (t instanceof Phaser.GameObjects.Sprite) {
            t.x = t.x + speed
            t.body.x = t.body.x + speed
        }
    })
    ziel.x = ziel.x + speed
    ziel.body.x = ziel.body.x + speed;
}

function moveDarkness(speed) {
    darknesses.getChildren()[0].x = darknesses.getChildren()[0].x + speed
    darknesses.getChildren()[0].body.x = darknesses.getChildren()[0].body.x + speed
    ghosts.getChildren()[0].x = ghosts.getChildren()[0].x + speed
    ghosts.getChildren()[0].body.x = ghosts.getChildren()[0].body.x + speed
    ghosts2.getChildren()[0].x = ghosts2.getChildren()[0].x + speed
    ghosts2.getChildren()[0].body.x = ghosts2.getChildren()[0].body.x + speed
}

/*function popUp1(player, ground) {
    this.currentGround = ground;
    if (ground.texture.key == 'puddle' && player.texture.key != 'Ente') {

        player.setX(player.x - 100)
        popUp1 = this.add.text(600,200, "Drücke 'e' um auf die Ente zu wechsel und mit 'Space' das Wasser zu überwinden", {
                    color: 'white',
                    fontSize: '22px',
        });
    }
}*/

function gewonnen(player, ziel) {
    this.spielAmLaufen = false
}

function collectLights(player, light) {
    light.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}