var Enemy = function(x, y, anim, animLength) {
    this.enemy = game.add.sprite(path[0].x * tileSquare, path[0].y * tileSquare, anim);
    
    this.enemy.animations.add('walk');
    this.enemy.animations.play('walk', animLength, true);
    this.enemy.anchor.setTo(0.5, 0.5);
    this.enemy.speed = 1;
    this.enemy.speedX = 0;
    this.enemy.speedY = 0;
    this.enemy.curTile = 0
    enemys.add(this.enemy);
    Enemy.prototype.nextTile(this.enemy);
    Enemy.prototype.moveElmt(this.enemy);

}
Enemy.prototype.moveElmt = function(enemy) {

    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    if (enemy.speedX > 0 && enemy.x >= enemy.next_positX) {
        enemy.x = enemy.next_positX;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedX < 0 && enemy.x <= enemy.next_positX) {
        enemy.x = enemy.next_positX;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedY > 0 && enemy.y >= enemy.next_positY) {
        enemy.y = enemy.next_positY;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedY < 0 && enemy.y <= enemy.next_positY) {
        enemy.y = enemy.next_positY;
        Enemy.prototype.nextTile(enemy);
    }

}
Enemy.prototype.nextTile = function(enemy) {
    enemy.curTile++;
    enemy.next_positX = parseInt(path[enemy.curTile].x * tileSquare);
    enemy.next_positY = parseInt(path[enemy.curTile].y * tileSquare);
    // on check le sens gauche/droite
    if (enemy.next_positX > enemy.x) {
        enemy.speedX = enemy.speed;
        enemy.angle = 0;
    } else if (enemy.next_positX < enemy.x) {
        enemy.speedX = -enemy.speed;
        enemy.angle = 180;
    } else {
        enemy.speedX = 0;
    }
    // on check le sens haut/bas
    if (enemy.next_positY > enemy.y) {
        enemy.speedY = enemy.speed;
        enemy.angle = 90;
    } else if (enemy.next_positY < enemy.y) {
        enemy.speedY = -enemy.speed;
        enemy.angle = -90;
    } else {
        enemy.speedY = 0;
    }
}
