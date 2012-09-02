var document = document || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    paths: {
        ethon: "../../../lib/ethon/"
    }
});

define(function (require) {
    "use strict";

    var Game             = require("ethon/game"),
        Map              = require("ethon/map"),
        GUI              = require("ethon/gui"),
        Soul             = require("ethon/soul"),
        proxy            = require("ethon/proxy"),
        actionDispatcher = require("ethon/action_dispatcher"),
        Paddle           = require("paddle"),
        Ball             = require("ball"),
        result = document.getElementById("game"),
        map,
        gui,
        playerScoreLabel,
        iaScoreLabel,
        playerScore = 0,
        iaScore = 0,
        playerPaddle,
        iaPaddle,
        ball,
        game;

    // Pong map: black quad with a grey net
    map = new Map();
    map.addLayer(function (renderAssistant) {
        renderAssistant.drawQuad(0, 0, 800, 600);
    });
    map.addLayer(function (renderAssistant) {
        var i = 0;

        for (i = 0; i < 20; i += 1) {
            renderAssistant.drawQuad(390, 5 + i * 30, 10, 20, "#cccccc");
        }
    });

    // Pong gui: two labels with player's score
    gui = new GUI();

    playerScoreLabel = new GUI.Label("player_score", 170, 100, "0",
            { fillStyle: "#ffffff", font: "100px Courier New" });
    playerScoreLabel.on("player_scored", proxy(playerScoreLabel, function () {
        playerScore += 1;
        this.message = this.message.replace(/(\d*)$/, playerScore);
    }));
    iaScoreLabel = new GUI.Label("ia_score", 570, 100, "0",
            { fillStyle: "#ffffff", font: "100px Courier New" });
    iaScoreLabel.on("ia_scored", proxy(iaScoreLabel, function () {
        iaScore += 1;
        this.message = this.message.replace(/(\d*)$/, iaScore);
    }));

    gui.addElement(playerScoreLabel);
    gui.addElement(iaScoreLabel);

    // Pong paddles: two quads on each field side
    // The left quad is the player and the right quad is the ia
    playerPaddle = new Paddle("player_paddle", 20, 225);

    iaPaddle = new Paddle("ia_paddle", 780, 225);
    iaPaddle.update = function (dt) {
        var ballPosition = ball.getPosition(),
            position = this.getPosition();

        Soul.prototype.update.call(this, dt);

        if (ballPosition.y - position.y < 45) {
            this.moveUp();
        } else if (ballPosition.y - position.y > 50) {
            this.moveDown();
        } else {
            this.stop();
        }
    };

    // Pong actions: use actionDispatcher to handle them
    actionDispatcher.registerKeyboardAction("KEY_UP_ARROW",
            proxy(playerPaddle, playerPaddle.moveUp),
            proxy(playerPaddle, playerPaddle.stop));
    actionDispatcher.registerKeyboardAction("KEY_DOWN_ARROW",
            proxy(playerPaddle, playerPaddle.moveDown),
            proxy(playerPaddle, playerPaddle.stop));

    // Pong ball
    ball = new Ball(400, 300);

    // Init Game and start 
    game = new Game(result, 800, 600);
    game.setMap(map);
    game.setGUI(gui);
    game.addSoul(playerPaddle);
    game.addSoul(iaPaddle);
    game.addSoul(ball);
    game.start();
});
