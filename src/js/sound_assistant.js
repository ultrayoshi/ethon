(function () {
    "use strict";

    var resourceAssistant = require("./resource_assistant"),
        enabled           = false,
        muted             = false,
        backgroundMusic   = null;

    function setBackgroundMusic(music) {
        if (music) {
            backgroundMusic = resourceAssistant.getSound(music);
            backgroundMusic.volume = 0.5;
            backgroundMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    }

    function playBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.firstTime = true;
            if (!muted && enabled) {
                backgroundMusic.play();
            }
        }
    }

    function stopBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function toggleBackgroundMusic() {
        if (backgroundMusic && backgroundMusic.firstTime) {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            } else {
                backgroundMusic.pause();
            }
        }
    }

    function playSoundEffect(soundEffect) {
        if (soundEffect && !muted && enabled) {
            //TODO: bad idea... sound is downloaded again and again
            resourceAssistant.getSound(soundEffect).cloneNode().play();
        }
    }

    function setEnabled (e) {
        enabled = e;
        if (enabled) {
            $('.audio-controls').show();
            $('.audio-controls').on('click', function () {
                toggleMute();
            });
        }
    }

    function toggleMute () {
        muted = !muted;
        $('.audio-controls .mute').toggle();
        $('.audio-controls .button').toggle();
        toggleBackgroundMusic();
    }

    function setMuted (_muted) {
        muted = _muted;
        if (muted) {
            $('.audio-controls .mute').show();
            $('.audio-controls .button').hide();
        }
    }

    module.exports = {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        toggleBackgroundMusic: toggleBackgroundMusic,
        playSoundEffect: playSoundEffect,
        setEnabled: setEnabled, 
        toggleMute: toggleMute,
        setMuted: setMuted
    };
}());
