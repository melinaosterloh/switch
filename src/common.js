function detectGround(player, ground) {
    this.currentGround = ground;
    if (ground.texture.key == 'water' && player.texture.key != 'Ente') {
        this.leben -= 1
        player.setX(player.x - 100)
    }
}

function die(that) {
    currentPlayer.anims.play(that.currentModel.name + '_death');
}

function win(that) {
    currentPlayer.anims.play(that.currentModel.name + '_turn');
}

function moveDarkness(speed) {
    darknesses.getChildren()[0].x = darknesses.getChildren()[0].x + speed
    darknesses.getChildren()[0].body.x = darknesses.getChildren()[0].body.x + speed
    ghosts.getChildren()[0].x = ghosts.getChildren()[0].x + speed
    ghosts.getChildren()[0].body.x = ghosts.getChildren()[0].body.x + speed
    ghosts2.getChildren()[0].x = ghosts2.getChildren()[0].x + speed
    ghosts2.getChildren()[0].body.x = ghosts2.getChildren()[0].body.x + speed
}


function movePlayer(that, direction, speed) {
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
}