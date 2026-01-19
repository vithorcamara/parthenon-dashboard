//////////////////////////////////////////////////////////////////////////
///*                          AUDIO (SAFE)                            *///
//////////////////////////////////////////////////////////////////////////

const SoundPath = {
    BOOT: "./assets/audio/sfx/startup.wav",
    CURSOR: "./assets/audio/sfx/cursor.adp",
    CANCEL: "./assets/audio/sfx/cancel.adp"
};

// -----------------------------
// Estado interno (global)
// -----------------------------
let CurrentBGM = null;

// -----------------------------
// Init
// -----------------------------
Sound.setVolume(100);

// -----------------------------
// Update (chamar a cada frame)
// -----------------------------
function AudioUpdate() {
    if (CurrentBGM && !CurrentBGM.playing()) {
        CurrentBGM.free();
        CurrentBGM = null;
    }
}

// -----------------------------
// Play
// -----------------------------
function playSfx(pathOrSound) {
    if (!pathOrSound) return;

    // Se for string, cria SFX rápido
    if (typeof pathOrSound === 'string') {
        const sfx = Sound.Sfx(pathOrSound);
        sfx.play();
        sfx.free();
    } else {
        pathOrSound.play();
    }
}

function playBgm(path) {
    console.log("[AUDIO] playBgm:", path);
    if (!path) return;

    if (CurrentBGM) {
        CurrentBGM.stop();
        CurrentBGM.free();
        CurrentBGM = null;
    }

    const bgm = Sound.Stream(path);
    bgm.play(true);
    CurrentBGM = bgm;
}

// -----------------------------
// Stop
// -----------------------------
function stopBgm() {
    if (!CurrentBGM) return;

    CurrentBGM.stop();
    CurrentBGM.free();
    CurrentBGM = null;
}

// -----------------------------
// Shutdown (CRÍTICO)
// -----------------------------
function AudioShutdown() {
    stopBgm();
}

// -----------------------------
// Exports
// -----------------------------

console.log("INIT LIB: AUDIO SAFE COMPLETE");
