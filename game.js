// create a new scene named "Game"


//our game's configuration
let config = {
    type: Phaser.AUTO, //Phaser will decidie how to render our game
    width: 640,
    height: 360,
    scene: {
        preload: preload,
        create: create
    }// Our newly created scene
};

// create the game and pass in the config

let game = new Phaser.Game(config);

// Some parametes for our scene
function init() {
    this.playerSpeed = 1.5;
    this.enemySpeed = Z;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
}

// load asset files for our game
function preload () {
    this.load.image('background', '/assets/background.png');
    this.load.image('player', '/assets/player.png');
    this.load.image('dragon', '/assets/dragon.png');
    this.load.image('treasure','/assets/treasure.png');

};

// executed once, after assets wre loaded
function create() {
   const bg = this.add.sprite(0,0, 'background');

   bg.setOrigin(0,0);

       // player
       this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
       // scale down
       this.player.setScale(0.5);

       // group of enemies
       this.enemies = this.add.group({
           key: 'dragon',
           repeat: 5,
           setXY: {
               x: 110,
               y: 100,
               stepX: 80,
               stepY: 20
           }
       })

       // scale enemies
       Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

       // goal
       this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure')
};

function update() {
    if (this.input.activePointer.isDown) {
        // player walks
        this.player.x += this.playerSpeed;
    }

    // treasure collision
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getsBounds(), this.treasure.getBounds())) {
        this.gameOver();
    };

    // enemy movement
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

        for (let i = 0; i < numEnemies; i++) {
            // move enemies
            enemies[i].y += enemies[i].speed;

            // reverse movement if reached the edges
            if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
                enemies[i].speed *= 1;
            } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
                enemies[i].speed *= -1;
            }

        }

        // set speeds
        Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
            enemy.speed = Math.random() * 2 + 1;
        }, this);

    // enemy movement and collision
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

    for (let i = 0;)

}

function gameOver() {
    this.scene.restart();
}