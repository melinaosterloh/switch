// Level Drei in der Wohnsiedlung

var enteModel;
var duckSound;
var affeModel;
var monkeySound;
var katzeModel;
var catSound;
var leben;
var spielAmLaufen;
var currentPlayer
var lebenLabel
var cursors
var keyObjE
var keyObjA
var keyObjK
var keyObkSpace
var keyObkEnter

//var background
var background_3
var platforms3
var trees
var trees3
/*var ziel
var ziele*/
var lights;
var darknesses;
var darkness;
var ghosts;
var ghosts2;
var ghost;
var ghost2;
var anzahlBodenplatten;
var house;
var houses;
var fences;
var fence;

var buttonHome;
var buttonSound;
var buttonClick;
var clickCount;
var levelMusic;
var jumpSound;
var gameOverSound;
var winThisGame = false;
var waterSound;
var winSound;

var xTreeValue;
var xValue;
var rnd;

var playerPosition;
var score = 0;
var scoreText;
var currentModel;
var currentGround;

var collisionObstacle = false;
var defaultDarknessSpeed;

class levelThree extends Phaser.Scene {

    constructor(config) {
        super(config);
        Phaser.Scene.call(this, {
            key: 'levelThree'
        });
    }
    //Funktion um Bilder/Sprites im Voraus zu laden
    //##############
    ///PRELOAD
    //##############
    preload() {
        this.load.image('sky3', 'assets/background_3.png');
        this.load.image('street', 'assets/strasse.png');
        this.load.image('puddle', 'assets/pfueze.png')
        this.load.image('meadow', 'assets/wiese.png')
        this.load.image('fence', 'assets/zaun.png')
        this.load.image('bike', 'assets/fahrrad.png')
        this.load.image('lantern', 'assets/laterne.png')
        this.load.image('shrub', 'assets/busch.png')
        this.load.image('light', 'assets/light.png')
        this.load.image('house', 'assets/haus.png')
        this.load.image('home', 'assets/buttonHome.png')
        this.load.image('soundOn', 'assets/tonAn.png')

        this.load.audio('levelSound', ['assets/levelSound.mp3'])
        this.load.audio('buttonClick', ['assets/buttonClick.mp3'])
        this.load.audio('jumpSound', ['assets/jumpSound.mp3'])
        this.load.audio('waterSound', ['assets/water.mp3'])
        this.load.audio('gameOverSound', ['assets/gameOver.mp3'])

        this.load.audio('duckSound', ['assets/duck.mp3'])
        this.load.audio('monkeySound', ['assets/monkey.mp3'])
        this.load.audio('catSound', ['assets/cat.mp3'])

        this.enteModel = {
            name: 'Ente',
            speed: 50,
            jumping: false,
            supermodel: 'Ente'
        }
        this.affeModel = {
            name: 'Affe',
            speed: 50,
            jumping: false,
            supermodel: 'Affe'
        }
        this.katzeModel = {
            name: 'Katze',
            speed: 50,
            jumping: false,
            supermodel: 'SuperCat'
        }

        this.leben = 3;
        this.spielAmLaufen = true;
        this.defaultDarknessSpeed = 0.8;

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
        /*    this.load.spritesheet('ziel', 'assets/sun.png', {
                frameWidth: 750,
                frameHeight: 500
            });*/
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
        console.log("Level 3 beginnt.");
        //------HINTERGRUND-----//
        //x und y parameter werden übergeben (Halbiert der gesamten Größe)
        background_3 = this.add.tileSprite(0, 707, 1400 * 2, 707 * 2, 'sky3');

        // Hintergrundmusik hinzufügen 
        levelMusic = this.sound.add('levelSound', {
            loop: true
        });
        levelMusic.play();

        // Sound für Button Click hinzufügen
        buttonClick = this.sound.add('buttonClick', {
            loop: false
        });

        // Sound wenn einer der Spieler springt
        jumpSound = this.sound.add('jumpSound', {
            loop: false
        });

        // Geräusch, wenn Ente das Wasser berührt
        waterSound = this.sound.add('waterSound', {
            loop: false
        });

        // Game Over Soundeffekt
        gameOverSound = this.sound.add('gameOverSound', {
            loop: false
        });

        // Tiere kriegen einen Sound bei Aktivierung per Keyboard Taste
        duckSound = this.sound.add('duckSound', {
            loop: false
        });
        monkeySound = this.sound.add('monkeySound', {
            loop: false
        });
        catSound = this.sound.add('catSound', {
            loop: false
        });

        // Button zum Hauptmenü zurück
        buttonHome = this.add.image(1288, 35, 'home').setInteractive({
            useHandCursor: true
        });
        buttonHome.on('pointerdown', function (event) { // Start game on click
            buttonClick.play();
            this.scene.stop('levelThree');
            this.scene.start('mainMenu');
            levelMusic.stop();
            console.log("Zurück zum Hauptmenü")
        }, this);

        // Button Sound an/Sound aus 
        clickCount = 0;
        buttonSound = this.add.image(1357, 35, 'soundOn').setInteractive({
            useHandCursor: true
        });
        buttonSound.on('pointerdown', function (event) {
            if (clickCount == 0) {
                buttonClick.play();
                buttonClick.play();
                levelMusic.stop();
                clickCount = 1;
                console.log("Sound aus")
            } else {
                buttonClick.play();
                buttonClick.play();
                levelMusic.play();
                clickCount = 0;
                console.log("Sound an")
            }
        });

        //------PLATFORMEN&BODEN-----//
        platforms3 = this.physics.add.staticGroup();
        fences = this.physics.add.staticGroup();
        trees3 = this.physics.add.staticGroup();
        //    ziele = this.physics.add.staticGroup();
        houses = this.physics.add.staticGroup();

        anzahlBodenplatten = 15

        for (let i = 0; i <= anzahlBodenplatten; i++) {
            if (i == 0) {
                platforms3.create(200 + (400 * i), 707 - 16, 'street')
            } else if (i > (anzahlBodenplatten - 5)) {
                platforms3.create(200 + (400 * i), 707 - 16, 'meadow')
                fences.create(200 + (400 * i), 647 - 16, 'fence')
            } else {
                if (Math.random() < 0.3) {
                    platforms3.create(200 + (400 * i), 707 - 16, 'puddle')
                } else {
                    xValue = 200 + (400 * i)
                    if ('bike') {
                        xTreeValue = Phaser.Math.Between(xValue - 50, xValue + 50)
                    } else {
                        xTreeValue = Phaser.Math.Between(xValue - 200, xValue + 200)
                    }

                    rnd = Phaser.Math.Between(0, 3)

                    createTree3(rnd, xTreeValue)

                    platforms3.create(xValue, 707 - 16, 'street')
                }
            }
        }
        house = houses.create((anzahlBodenplatten - 1) * 400 - 100, 390, 'house');
        //    ziel = ziele.create((anzahlBodenplatten) * 400, 300, 'ziel');

        lights = this.physics.add.group({
            key: 'light',
            repeat: 5,
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

        //------PUNKTE------//
        scoreText = this.add.text(16, 50, 'Score: ' + score, {
            fontSize: '32px',
            fill: 'white'
        })

        //Bounce bewirkt, dass der Player kurz 'hüpft' wenn er landet
        currentPlayer.setBounce(0.2);
        //Verhindert, dass der Spieler über das Ende des Bildschirms hinaus laufen/springen kann
        currentPlayer.setCollideWorldBounds(true);


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

        //    createZielAnimation(this);
        createDarknessAnimation(this);
        createGhostAnimation(this);
        createGhostAnimation2(this);

        //------KOLLISIONEN------//
        this.physics.add.collider(currentPlayer, platforms3, detectGround, null, this);
        this.physics.add.collider(fences, detectGround, null, this);
        this.physics.add.collider(currentPlayer, trees3, hitObstacle, null, this);
        this.physics.add.collider(currentPlayer, darkness, hitDarkness, null, this);
        //    this.physics.add.collider(platforms3, ziel);
        this.physics.add.collider(currentPlayer, house, gewonnen, null, this);
        this.physics.add.collider(darkness, fences, gewonnen, null, this);
        this.physics.add.collider(platforms3, ghost);
        this.physics.add.collider(platforms3, fences);

        this.physics.add.collider(lights, platforms3);
        this.physics.add.collider(lights, trees3);
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
        //    ziel.anims.play('ziel', true);
        darkness.anims.play('darkness', true);
        ghost.anims.play('ghost', true);
        ghost2.anims.play('ghost2', true);
        lebenLabel.setText('Leben: ' + this.leben)
        if (this.leben > 0 && this.spielAmLaufen) {
            moveDarkness(this, this.defaultDarknessSpeed);
            if (cursors.left.isDown) {
                moveGroundLvlThree(this, 2);
                movePlayerLvl3(this, 'left', this.currentModel.speed)
            }
            //Rechte Pfeiltaste gedrückt: Rechtsdrehung (160) & Laufanimation nach rechts
            else if (cursors.right.isDown) {
                moveGroundLvlThree(this, -2);
                movePlayerLvl3(this, 'right', this.currentModel.speed)
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
            this.currentModel = this.enteModel;
            duckSound.play();
        }

        if (keyObjA.isDown) {
            this.currentModel = this.affeModel;
            monkeySound.play();
        }

        if (keyObjK.isDown) {
            this.currentModel = this.katzeModel;
            catSound.play();
        }

        } else {

            currentPlayer.setVelocityX(0);
            if (this.leben <= 0) {
                this.leben = 0;
                console.log("Game Over in Level 3");
                gameOverSound.play();
                this.scene.start('gameOver');
            }

            if (this.spielAmLaufen == false) {
                lebenLabel.setText('GEWONNEN :)')
                console.log("Gewonnen!");
                winSound.play();
                this.scene.start('winGame');
                win(this)

                /* if (gameOver == true){
                    data.menuMusicData.stop(); // Funktion, dass Musik bei Game over stoppt????
                    return;
                } */


            } else {
                die(this)
            }
        }
        collisionObstacle = false;
    }
}

//##############
///FUNKTIONEN
//##############

function createTree3(rnd, x) {
    switch (rnd) {
        case 1:
            scale = 0.5
            tree = trees3.create(x, 605, 'bike')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 2:
            scale = 0.6
            tree = trees3.create(x, 510, 'lantern')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 3:
            scale = 0.4
            tree = trees3.create(x, 630, 'shrub')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
    }
}

function movePlayerLvl3(that, direction, speed) {
    var groundSpeed = 0.5;

    if ('left' == direction) {
        speed = speed * -1;
        groundSpeed = groundSpeed * -1;
    }

    if (that.currentGround != undefined && that.currentGround.texture.key == "puddle" && that.currentModel.name == "Ente" && !keyObkSpace.isDown) {
        speed = 0;
        groundSpeed = 0;
    }

    if(collisionObstacle){
        groundSpeed = 0;
    }


    background_3.tilePositionX += groundSpeed

    if (keyObkSpace.isDown) {
        switch (that.currentModel.name) {
            case 'Ente':
                if (that.currentGround.texture.key == 'street' && currentPlayer.body.touching.down) {
                    currentPlayer.setVelocityX(0);
                } else {
                    currentPlayer.setVelocityX(speed);
                }
                currentPlayer.anims.play(that.currentModel.supermodel + '_swim_' + direction, true);
                break;
            case 'Affe':
                currentPlayer.setVelocityX(speed);
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
                background_3.tilePositionX -= 2
            } else {
                background_3.tilePositionX += 2
            }
        }
        currentPlayer.anims.play(that.currentModel.name + '_' + direction, true);
    }
}

function moveGroundLvlThree(that, speed) {

    if (that.currentGround != undefined && that.currentGround.texture.key == "puddle" && currentPlayer.texture.key == "Ente" && !keyObkSpace.isDown) {
        waterSound.play();
        speed = 0;
    }

    if(collisionObstacle){
        speed = 0;
    }

    platforms3.getChildren().forEach((c) => {
        if (c instanceof Phaser.GameObjects.Sprite) {
            c.x = c.x + speed
            c.body.x = c.body.x + speed
        }
    })
    fences.getChildren().forEach((c) => {
        if (c instanceof Phaser.GameObjects.Sprite) {
            c.x = c.x + speed
            c.body.x = c.body.x + speed
        }
    })
    trees3.getChildren().forEach((t) => {
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
    houses.getChildren().forEach((t) => {
        if (t instanceof Phaser.GameObjects.Sprite) {
            t.x = t.x + speed
            t.body.x = t.body.x + speed
        }
    })
    /*    ziel.x = ziel.x + speed
        ziel.body.x = ziel.body.x + speed;*/
}

function gewonnen(player, goal) {
    this.spielAmLaufen = false
}