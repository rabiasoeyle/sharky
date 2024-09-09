let level3;
/**
 * This function loads level3.
 */
function initLevel3(){
    level3 = null;
level3 = new Level(
    [
        new Endboss(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
        
    ],
    [
        new Water('img/Background/Layers/Water/L1.png', 0),
        new Water('img/Background/Layers/Water/L1.png',718),
        new Water('img/Background/Layers/Water/L1.png',718*2),
        new Water('img/Background/Layers/Water/L1.png',718*3),
        new Water('img/Background/Layers/Water/L1.png',718*4),
        new Water('img/Background/Layers/Water/L1.png',718*5),
    ],
    [
        new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', -720),
        new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', -720),
        new BackgroundObjects('img/Background/Layers/Floor/D2.png', -720),

        new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 0),
        new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 0),
        new BackgroundObjects('img/Background/Layers/Floor/D1.png', 0),

        new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', 720),
        new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', 720),
        new BackgroundObjects('img/Background/Layers/Floor/D2.png', 720),

        new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 1440),
        new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 1440),
        new BackgroundObjects('img/Background/Layers/Floor/D1.png', 1440),

        new BackgroundObjects('img/Background/Layers/Fondo1/L2.png', 2160),
        new BackgroundObjects('img/Background/Layers/Fondo1/D2.png', 2160),
        new BackgroundObjects('img/Background/Layers/Floor/D2.png', 2160),

        new BackgroundObjects('img/Background/Layers/Fondo1/L1.png', 2880),
        new BackgroundObjects('img/Background/Layers/Fondo1/D1.png', 2880),
        new BackgroundObjects('img/Background/Layers/Floor/D1.png', 2880),
    ],
    [
        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),

        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),
        new CollectablePoison(),
    ],
    [
        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),

        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),
        new CollectableCoins(),
    ]
)
}