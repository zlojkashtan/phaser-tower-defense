var Tower = function(worldX, worldY, tileX, tileY, tile) {
    var index = String(eval(tileX + "" + tileY));



    if ($.inArray(index, tileForbiden) == -1) {
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.worldX = worldX;
        this.tower.worldY = worldY;
        this.tower.tileX = tileX;
        this.tower.tileY = tileY;
        this.tower.tile = tile;
        this.tower.fireTime = 2000;
        this.tower.fireLastTime = game.time.now + this.tower.fireTime;
        towers.add(this.tower);
        tileForbiden.push(index);
    }
}

Tower.prototype.add = function(pointer) {
    game.input.onDown.add(Tower.prototype.posit, this);
}

Tower.prototype.posit = function(pointer) {
    var tileworldX = pointer.worldX - (pointer.worldX % tileSquare);
    var tileworldY = pointer.worldY - (pointer.worldY % tileSquare);
    var tileX = Math.floor(pointer.worldX / tileSquare);
    var tileY = Math.floor(pointer.worldY / tileSquare);
    new Tower(tileworldX, tileworldY, tileX, tileY, 'tower')
}

Tower.prototype.fire = function(tower) {
    bullets.createMultiple(1, 'bullet', 0, false);
    if (game.time.now > tower.fireLastTime) {
        var bullet = bullets.getFirstExists(false);
        if (bullet && typeof enemys.children[0] != "undefined") {
            bullet.reset(tower.x, tower.y);
            bullet.body.collideWorldBounds = true;
            bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, enemys.children[0].x, enemys.children[0].y)) * 180 / Math.PI;
            game.physics.arcade.moveToObject(bullet, enemys.children[0], 500);
        }
        tower.fireLastTime = game.time.now + tower.fireTime;
    }
}
