function detectGround(player, ground) {
    this.currentGround = ground;
    if ((ground.texture.key == 'water' || ground.texture.key == 'puddle') && player.texture.key != 'Ente') {
        player.setX(player.x - 200)
        this.leben -= 1
        player.setX(player.x - 100)
    }
}


function hitDarkness(player, darkness) {
    this.leben -= 1;
}

function hitObstacle(player, obstacle) {
    collisionObstacle = true;
}

function die(that) {
    currentPlayer.anims.play(that.currentModel.name + '_death');
}

function win(that) {
    currentPlayer.anims.play(that.currentModel.name + '_turn');
}

function moveDarkness(that,speed) {
    if(collisionObstacle){
        speed = that.defaultDarknessSpeed;
    }

    if(that.currentGround != undefined){
        if((that.currentGround.texture.key == "water" || that.currentGround.texture.key == "puddle")){
            speed = that.defaultDarknessSpeed;
        }
    }

    darknesses.getChildren()[0].x = darknesses.getChildren()[0].x + speed
    darknesses.getChildren()[0].body.x = darknesses.getChildren()[0].body.x + speed
    ghosts.getChildren()[0].x = ghosts.getChildren()[0].x + speed
    ghosts.getChildren()[0].body.x = ghosts.getChildren()[0].body.x + speed
    ghosts2.getChildren()[0].x = ghosts2.getChildren()[0].x + speed
    ghosts2.getChildren()[0].body.x = ghosts2.getChildren()[0].body.x + speed
    console.log("DarknessSpeed = " + speed)
}

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

function collectLights(player, light) {
    light.disableBody(true, true);
    score += 10;
    console.log(score)
    if(score >= 100){
        console.log("Level Up")
        score = 0;
        this.leben +=1;
    }
    scoreText.setText('Score: ' + score);
}

/*function movePlayer(that, direction, speed) {
    var groundSpeed = 0.5;

    if ('left' == direction) {
        speed = speed * -1;
        groundSpeed = groundSpeed * -1;
    }

    if(that.currentGround.texture.key == "water" && that.currentModel.name == "Ente" && !keyObkSpace.isDown){
        speed  = 0;
        groundSpeed = 0;
    }


    background.tilePositionX += groundSpeed

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
}*/