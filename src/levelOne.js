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
            debug: false
        }
    },
    //Vorbereitung der Ansicht
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);

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





function createTurnAnimation(that, name, frame) {
    that.anims.create({
        key: name + '_turn',
        frames: [{
            key: name,
            frame: frame
        }],
        frameRate: 20
    });
}

function createDeathAnimation(that, name, frame){
    that.anims.create({
        key: name + '_death',
        frames: [{
            key: name,
            frame: frame
        }],
        frameRate: 20
    });
}


function createMoveAnimation(that, direction, name, frame_from, frame_to) {
    that.anims.create({
        key: name + '_' + direction,
        frames: that.anims.generateFrameNumbers(name, {
            start: frame_from,
            end: frame_to
        }),
        frameRate: 10,
        repeat: -1
    });
}


function createZielAnimation(that) {
    that.anims.create({
        key: 'ziel',
        frames: that.anims.generateFrameNumbers('ziel', {
            start: 0,
            end: 3
        }),
        frameRate: 4,
        repeat: -1
    });
}

function createDarknessAnimation(that) {
    that.anims.create({
        key: 'darkness',
        frames: that.anims.generateFrameNumbers('darkness', {
            start: 0,
            end: 5
        }),
        frameRate: 3,
        repeat: -1
    });
}

function createGhostAnimation(that) {
    that.anims.create({
        key: 'ghost',
        frames: that.anims.generateFrameNumbers('ghost', {
            start: 0,
            end: 3
        }),
        frameRate: 4,
        repeat: -1
    });
}

function createGhostAnimation2(that) {
    that.anims.create({
        key: 'ghost2',
        frames: that.anims.generateFrameNumbers('ghost2', {
            start: 0,
            end: 3
        }),
        frameRate: 4,
        repeat: -1
    });
}

function createTree(rnd, x) {
    switch (rnd) {
        case 1:
            scale = 0.5
            tree = trees.create(x, 705, 'tree0')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 2:
            scale = 0.6
            tree = trees.create(x, 600, 'tree1')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
        case 3:
            scale = 0.4
            tree = trees.create(x, 710, 'tree2')
            tree.setScale(scale)
            tree.body.width = tree.body.width * scale
            tree.body.height = tree.body.height * scale
            tree.body.x = tree.x - tree.width * scale / 2;
            tree.body.y = tree.y - tree.height * scale / 2
            break;
    }
}

function movePlayer(that, direction, speed) {
    if ('left' == direction) {
        speed = speed * -1;
    }

    if (keyObkSpace.isDown) {
        switch (that.currentModel.name) {
            case 'Ente':
                if (that.currentGround.texture.key == 'ground' && currentPlayer.body.touching.down) {
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
                background.tilePositionX -= 2
            } else {
                background.tilePositionX += 2
            }
        }
        currentPlayer.anims.play(that.currentModel.name + '_' + direction, true);
    }
}

function die(that) {
    currentPlayer.anims.play(that.currentModel.name + '_death');
}

function win(that) {
    currentPlayer.anims.play(that.currentModel.name + '_turn');
}


function moveGround(speed) {
    platforms.getChildren().forEach((c) => {
        if (c instanceof Phaser.GameObjects.Sprite) {
            c.x = c.x + speed
            c.body.x = c.body.x + speed
        }
    })
    trees.getChildren().forEach((t) => {
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

function hitDarkness(player, darkness) {
    this.leben = 0;
}

function detectGround(player, ground) {
    this.currentGround = ground;
    if (ground.texture.key == 'water' && player.texture.key != 'Ente') {
        this.leben -= 1
        player.setX(player.x - 100)
    }
}

function gewonnen(player, ziel) {
    this.spielAmLaufen = false
}

function collectLights (player, light) {
    light.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

//Funktion um Bilder/Sprites im Voraus zu laden
//##############
///PRELOAD
//##############
function preload() {
    this.load.image('sky', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('water', 'assets/water.png')
/*    this.load.image('darkness', 'assets/darkness2.png')
    this.load.image('darkness2', 'assets/darkness2.png')*/
    this.load.image('tree0', 'assets/Bank.png')
    this.load.image('tree1', 'assets/laterne.png')
    this.load.image('tree2', 'assets/eimer.png')
    this.load.image('light', 'assets/light.png')

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
function create() {
    //------HINTERGRUND-----//
    //x und y parameter werden übergeben (Halbiert der gesamten Größe)
    background = this.add.tileSprite(0, 795, 1593 * 2, 795 * 2, 'sky');

    //------PLATFORMEN&BODEN-----//
    platforms = this.physics.add.staticGroup();
    trees = this.physics.add.staticGroup();
    ziele = this.physics.add.staticGroup();



    anzahlBodenplatten = 20

    for (let i = 0; i <= anzahlBodenplatten; i++) {
        if (i == 0) {
            platforms.create(200 + (400 * i), 795 - 16, 'ground')
        } else if (i ==(anzahlBodenplatten-3)) {
            platforms.create(200 + (400 * i), 795 - 16, 'ground')
            } else {
            if (Math.random() < 0.3) {
                platforms.create(200 + (400 * i), 795 - 16, 'water')
            } else {
                xValue = 200 + (400 * i)
                if ('tree0') {
                    xTreeValue = Phaser.Math.Between(xValue - 50, xValue + 50)
                } else {
                    xTreeValue = Phaser.Math.Between(xValue - 200, xValue + 200)
                }

                rnd = Phaser.Math.Between(0, 3)

                createTree(rnd, xTreeValue)

                platforms.create(xValue, 795 - 16, 'ground')
            }
        }
    }

    ziel = ziele.create((anzahlBodenplatten-2) * 400-60, 650, 'ziel');

    lights = this.physics.add.group({
        key: 'light',
        repeat: 30,
        setXY: { x: 500, y: 0, stepX: 300 }
    });

    lights.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    darknesses = this.physics.add.staticGroup();
    darkness = darknesses.create(-650, 630 / 2 + 60, 'darkness')

/*    darkness2 = this.physics.add.staticGroup();
    darkness2.create(-700, 630 / 2 + 60, 'darkness2')*/

    ghosts = this.physics.add.staticGroup();
    ghost = ghosts.create(-150, 600, 'ghost');

    ghosts2 = this.physics.add.staticGroup();
    ghost2 = ghosts2.create(-300, 300, 'ghost2');

    //------PLAYER-----//
    this.currentModel = this.enteModel
    currentPlayer = this.physics.add.sprite(200, 650, this.currentModel.name);

    //------LEBEN------//
    lebenLabel = this.add.text(16, 16, 'Leben: ' + this.leben, {
        fontSize: '32px',
        fill: 'white'
    })

    scoreText = this.add.text(16, 50, 'Score: 0', { fontSize: '32px', fill: 'white'});

    //Bounce bewirkt, dass der Player kurz 'hüpft' wenn er landet
    currentPlayer.setBounce(0.2);
    //Verhindert, dass der Spieler über das Ende des Bildschirms hinaus laufen/springen kann
    currentPlayer.setCollideWorldBounds(true);



    //------KAMERA-----//
    //Kamera folgt Figur
    this.cameras.main.setBounds(0, 0, 1593, 795);
    this.physics.world.setBounds(0, 0, 1200, 795);
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

    this.physics.add.collider(currentPlayer, platforms, detectGround, null, this);
    this.physics.add.collider(currentPlayer, trees);
    this.physics.add.collider(currentPlayer, darkness, hitDarkness, null, this);
    this.physics.add.collider(platforms, ziel);
    this.physics.add.collider(currentPlayer, ziel, gewonnen, null, this);
    this.physics.add.collider(platforms, ghost);

    this.physics.add.collider(lights, platforms);
    this.physics.add.collider(lights, trees);
    this.physics.add.overlap(currentPlayer, lights, collectLights, null, this);

    //Eingebauter Keyboard Manager
    cursors = this.input.keyboard.createCursorKeys();
    keyObjE = this.input.keyboard.addKey('e'); // Get key object
    keyObjA = this.input.keyboard.addKey('a'); // Get key object
    keyObjK = this.input.keyboard.addKey('k'); // Get key object
    keyObkSpace = this.input.keyboard.addKey('space'); // Get key object
    keyObkEnter = this.input.keyboard.addKey('enter'); // Get key object

    //PUNKTE BZW. LICHTPUNKTE HINZUFÜGEN ZUM SAMMELN

}

//##############
///UPDATE
//##############
function update() {
    ziel.anims.play('ziel', true);
    darkness.anims.play('darkness', true);
    ghost.anims.play('ghost', true);
    ghost2.anims.play('ghost2', true);
    lebenLabel.setText('Leben: ' + this.leben)

    if (this.leben > 0 && this.spielAmLaufen) {
        moveDarkness(0.5);
        if (cursors.left.isDown) {
//            background.tilePositionX -= 0.5

            moveGround(2);
            movePlayer(this, 'left', this.currentModel.speed)
        }

        //Rechte Pfeiltaste gedrückt: Rechtsdrehung (160) & Laufanimation nach rechts
        else if (cursors.right.isDown) {
        console.log("Lauf");

            background.tilePositionX += 0.5
            moveDarkness(-1);
            moveGround(-2);
            movePlayer(this, 'right', this.currentModel.speed)
        }
        else if (cursors.right.isDown && keyObkSpace.isDown) {

                    console.log("Knall");
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

            currentPlayer.setVelocityX(0);
            die(this)


        if(this.spielAmLaufen == false){


                currentPlayer.setVelocityX(0);
                lebenLabel.setText('Press "ENTER"                    GEWONNEN :)')
                win(this)

                if (keyObkEnter.isDown) {
                    this.scene.start('levelTwo.js')
                }


        }
    }
}