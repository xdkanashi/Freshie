// Global variables (удаляем ненужное)
let doodlerSize;
let doodlerX;
let doodlerY;
let doodlerVelocity;
let doodlerXSpeed;
let doodlerTouchSpeed;
let platformWidth;
let platformHeight;
let numOfPlatforms = 5;
let platformList = [];
let platYChange = 0;
let gameStarted = false;
let score = 0;
let highScore = 0;
let doodlerImg;
let platformImg;
let trampoline1Img;
let trampoline2Img;
let trampoline3Img;
let backgroundImg;
let monster = null;
let monsterSpeed = 0.5;
let monsterDirection = 1;
let baseSpawnChance = 0.005;
let cameraOffset = 0;
let isAnimatingCamera = false;
let animationTimer = 0;
let bgColor = { r: 240, g: 235, b: 230 };
let targetBgColor = { r: 240, g: 235, b: 230 };
let hole = null;
let holeImg;
let holeSpawnChance = 0.0001;
let helloSvgImg;
let helloPngImg;
let gameOver = false;
let nickname = "Anonymous";
let showNicknameInput = false;
let gameOverSoundPlayed = false;
let startPlatformImg;
let startPlatform = null;

let lightBlueImg;
let grayishImg;
let orangeImgs = [];
let brownImg;
let brokenBrownImg;
let redImg;
let brokenRedImg;
let blackImg;
let brokenBlackImg;

let monsterImg1;
let monsterImg2;
let monsterImg3;
let monsterImg4;
let monsterImg5;
let monsterImg6;
let monsterAnimFlying1 = [];
let monsterAnimFlying2 = [];
let monsterAnimTrampoline1 = [];
let monsterAnimTrampoline2 = [];
let monsterAnimSlow = [];

let spaceShipImgs = [];

let gameOverSound;
let trampolineSound;
let trampolineBounceSound;
let fallSoundMp3;
let impactSound;
let buttonClickSound;

// Удалённые переменные, связанные с паузой и жизнями
// let isPaused = false;
// let pauseButtonX;
// let pauseButtonY;
// let pauseButtonWidth;
// let pauseButtonHeight;
// let lives = 3;
// let heartImg;
// let blinkTimer = 0;
// let isBlinking = false;
// let blinkCount = 0;
// const BLINK_DURATION = 0.5;
// const BLINK_COUNT = 4;

// Base URL for assets (will be set from Blade template)
let ASSET_BASE_URL = "";

// Preload function updated to use ASSET_BASE_URL
function preload() {
    backgroundImg = loadImage(`${ASSET_BASE_URL}/img/bg3.png`);
    doodlerImg = loadImage(`${ASSET_BASE_URL}/img/cat.png`);
    platformImg = loadImage(`${ASSET_BASE_URL}/img/trampline.png`);
    trampoline1Img = loadImage(`${ASSET_BASE_URL}/img/trampline1.png`);
    trampoline2Img = loadImage(`${ASSET_BASE_URL}/img/trampline2.png`);
    trampoline3Img = loadImage(`${ASSET_BASE_URL}/img/trampline3.png`);
    startPlatformImg = loadImage(`${ASSET_BASE_URL}/img/start.png`);
    monsterImg1 = loadImage(`${ASSET_BASE_URL}/img/m1.png`);
    monsterImg2 = loadImage(`${ASSET_BASE_URL}/img/m2.png`);
    monsterImg3 = loadImage(`${ASSET_BASE_URL}/img/m3.png`);
    monsterImg4 = loadImage(`${ASSET_BASE_URL}/img/mob4.png`);
    monsterImg5 = loadImage(`${ASSET_BASE_URL}/img/mob5.png`);
    monsterImg6 = loadImage(`${ASSET_BASE_URL}/img/mob6.png`);

    monsterAnimFlying1 = [
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.1.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.2.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.3.png`),
    ];
    monsterAnimFlying2 = [
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.1.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.2.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.3.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.4.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.5.png`),
    ];
    monsterAnimTrampoline1 = [
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.1.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.2.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.3.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.4.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.5.png`),
    ];
    monsterAnimTrampoline2 = [
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-1.1.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-anim-1.2.png`),
    ];
    monsterAnimSlow = [
        loadImage(`${ASSET_BASE_URL}/img/mob-slow-anim-1.png`),
        loadImage(`${ASSET_BASE_URL}/img/mob-slow-anim-2.png`),
    ];
    spaceShipImgs = [
        loadImage(`${ASSET_BASE_URL}/img/space-ship-anim-1.png`),
        loadImage(`${ASSET_BASE_URL}/img/space-ship-anim-2.png`),
    ];
    holeImg = loadImage(`${ASSET_BASE_URL}/img/hole1.png`);
    helloSvgImg = loadImage(`${ASSET_BASE_URL}/img/hello.svg`);
    helloPngImg = loadImage(`${ASSET_BASE_URL}/img/hello.png`);

    lightBlueImg = loadImage(`${ASSET_BASE_URL}/img/platform11.png`);
    grayishImg = loadImage(`${ASSET_BASE_URL}/img/platform12.png`);
    orangeImgs = [
        loadImage(`${ASSET_BASE_URL}/img/platform3.png`),
        loadImage(`${ASSET_BASE_URL}/img/platform4.png`),
        loadImage(`${ASSET_BASE_URL}/img/platform5.png`),
    ];
    brownImg = loadImage(`${ASSET_BASE_URL}/img/platform13.png`);
    brokenBrownImg = loadImage(`${ASSET_BASE_URL}/img/platform16.png`);
    redImg = loadImage(`${ASSET_BASE_URL}/img/platform6.png`);
    brokenRedImg = loadImage(`${ASSET_BASE_URL}/img/platform10.png`);
    blackImg = loadImage(`${ASSET_BASE_URL}/img/platform8.png`);
    brokenBlackImg = loadImage(`${ASSET_BASE_URL}/img/platform10.png`);

    doodleJumpFont = loadFont(`${ASSET_BASE_URL}/fonts/doodlejump_v2.ttf`);
    doodleJumpBoldFont = loadFont(
        `${ASSET_BASE_URL}/fonts/doodlejumpbold_v2.ttf`
    );
    doodleJumpBoldV3Font = loadFont(
        `${ASSET_BASE_URL}/fonts/doodlejumpbold_v3.ttf`
    );

    try {
        gameOverSound = loadSound(`${ASSET_BASE_URL}/mp3/gameover.mp3`);
        trampolineSound = loadSound(
            `${ASSET_BASE_URL}/mp3/trampoline-zvuk.mp3`
        );
        trampolineBounceSound = loadSound(
            `${ASSET_BASE_URL}/mp3/trampoline-zvuk-bounced.mp3`
        );
        fallSoundMp3 = loadSound(`${ASSET_BASE_URL}/mp3/zvuk-padeniya.mp3`);
        impactSound = loadSound(`${ASSET_BASE_URL}/wav/zvuk-udara-v-igre.wav`);
        buttonClickSound = loadSound(
            `${ASSET_BASE_URL}/mp3/button-clicked.mp3`
        );
    } catch (error) {
        console.error("Error loading sounds:", error);
        gameOverSound = null;
        trampolineSound = null;
        trampolineBounceSound = null;
        fallSoundMp3 = null;
        impactSound = null;
        buttonClickSound = null;
    }
}

// Setup function (удаляем паузу и жизни)
function setup() {
    let maxContainerWidth = min(windowWidth - 40, 1200);
    let gameWidth = min(maxContainerWidth - 40, 750);
    let gameHeight = (gameWidth * 700) / 750;
    let canvas = createCanvas(gameWidth, gameHeight);
    canvas.parent("game-container");
    frameRate(60);
    gameOverSoundPlayed = false;

    doodlerSize = gameWidth * 0.092;
    doodlerX = width / 2 - doodlerSize / 2;
    doodlerY = height - doodlerSize - 15;
    doodlerVelocity = 0;
    doodlerXSpeed = gameWidth * 0.006;
    doodlerTouchSpeed = gameWidth * 0.012;
    platformWidth = gameWidth * 0.13;
    platformHeight = gameHeight * 0.025;

    startPlatform = {
        xPos: 0,
        yPos: height - 5,
        width: width,
        height: platformHeight,
        type: "start",
    };

    adjustGameContainer();
    displayLeaderboard();
}

// Window resize (удаляем паузу)
function windowResized() {
    let maxContainerWidth = min(windowWidth - 40, 1200);
    let gameWidth = min(maxContainerWidth - 40, 750);
    let gameHeight = (gameWidth * 700) / 750;
    resizeCanvas(gameWidth, gameHeight);

    doodlerSize = gameWidth * 0.092;
    doodlerX = width / 2 - doodlerSize / 2;
    doodlerY = height - doodlerSize - 15;
    doodlerXSpeed = gameWidth * 0.006;
    doodlerTouchSpeed = gameWidth * 0.012;
    platformWidth = gameWidth * 0.13;
    platformHeight = gameHeight * 0.025;

    if (startPlatform) {
        startPlatform.width = width;
        startPlatform.yPos = height - 5;
    }

    platformList.forEach((plat) => {
        plat.width = platformWidth;
        plat.height = platformHeight;
    });

    adjustGameContainer();
}

function adjustGameContainer() {
    let gameContainer = document.getElementById("game-container");
    let gameWrapper = document.querySelector(".game-wrapper");
    let canvas = document.querySelector("#game-container canvas");

    if (gameContainer && gameWrapper && canvas) {
        let canvasWidth = canvas.clientWidth;
        let canvasHeight = canvas.clientHeight;

        gameWrapper.style.width = `${canvasWidth}px`;
        gameWrapper.style.height = `${canvasHeight}px`;

        let wrapperPadding =
            parseFloat(getComputedStyle(gameWrapper).padding) * 2;
        gameContainer.style.width = `${canvasWidth + wrapperPadding}px`;
        gameContainer.style.height = `${canvasHeight + wrapperPadding}px`;

        gameContainer.style.margin = "0 auto";
    }
}

// Draw function (удаляем вызовы паузы и жизней)
function draw() {
    updateDifficulty();
    updateBackgroundColor();
    background(bgColor.r, bgColor.g, bgColor.b);

    if (!showNicknameInput && !gameStarted && !gameOver) {
        image(helloSvgImg, 0, 0, width, height);
        drawStartButton();
    } else if (showNicknameInput) {
        image(helloPngImg, 0, 0, width, height);
        drawNicknameInput();
    } else if (gameOver) {
        drawGameOverScreen();
    } else {
        image(backgroundImg, 0, 0, width, height);

        if (startPlatform && score === 0) {
            image(
                startPlatformImg,
                startPlatform.xPos,
                startPlatform.yPos,
                startPlatform.width,
                startPlatform.height
            );
        }

        push();
        translate(0, cameraOffset);

        drawPlatforms();
        drawDoodler();
        if (monster) drawMonsters();
        if (hole) drawHole();
        drawSpaceShip();
        checkCollision();
        moveDoodler();
        moveScreen();
        if (monster) updateMonsters();
        spawnMonsters();
        spawnHole();
        displayScore();
        updateCameraAnimation();

        pop();
    }
}

function mousePressed() {
    if (!showNicknameInput && !gameStarted && !gameOver) {
        let buttonWidth = width * 0.308;
        let buttonHeight = height * 0.1;
        if (
            mouseX > width / 2 - buttonWidth / 2 &&
            mouseX < width / 2 + buttonWidth / 2 &&
            mouseY > height * 0.667 - buttonHeight / 2 &&
            mouseY < height * 0.667 + buttonHeight / 2
        ) {
            showNicknameInput = true;
            if (buttonClickSound && buttonClickSound.isLoaded())
                buttonClickSound.play();
        }
    } else if (showNicknameInput) {
        let buttonWidth = width * 0.308;
        let buttonHeight = height * 0.1;
        if (
            mouseX > width / 2 - buttonWidth / 2 &&
            mouseX < width / 2 + buttonWidth / 2 &&
            mouseY > height * 0.75 - buttonHeight / 2 &&
            mouseY < height * 0.75 + buttonHeight / 2
        ) {
            showNicknameInput = false;
            if (nickname === "Anonymous" || nickname.trim() === "")
                nickname = "Anonymous";

            score = 0;
            doodlerX = width / 2 - doodlerSize / 2;
            doodlerY = height - doodlerSize - 15;
            doodlerVelocity = 0;
            gameStarted = true;
            gameOver = false;
            monster = null;
            hole = null;
            cameraOffset = 0;
            isAnimatingCamera = false;
            baseSpawnChance = 0.01;
            bgColor = { r: 240, g: 235, b: 230 };
            targetBgColor = { r: 240, g: 235, b: 230 };
            gameOverSoundPlayed = false;
            platformList = [];
            startPlatform = {
                xPos: 0,
                yPos: height - 5,
                width: width,
                height: platformHeight,
                type: "start",
            };
            setupPlatforms();
            if (buttonClickSound && buttonClickSound.isLoaded())
                buttonClickSound.play();
        }
    } else if (gameOver) {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            score = 0;
            doodlerY = height - doodlerSize - 15;
            doodlerX = width / 2 - doodlerSize / 2;
            doodlerVelocity = 0;
            gameStarted = true;
            gameOver = false;
            monster = null;
            hole = null;
            cameraOffset = 0;
            isAnimatingCamera = false;
            baseSpawnChance = 0.01;
            bgColor = { r: 240, g: 235, b: 230 };
            targetBgColor = { r: 240, g: 235, b: 230 };
            gameOverSoundPlayed = false;
            platformList = [];
            startPlatform = {
                xPos: 0,
                yPos: height - 5,
                width: width,
                height: platformHeight,
                type: "start",
            };
            setupPlatforms();
            if (buttonClickSound && buttonClickSound.isLoaded())
                buttonClickSound.play();
        }
    }
}

function keyPressed() {
    if (showNicknameInput) {
        if (keyCode === ENTER || keyCode === RETURN) {
            showNicknameInput = false;
            if (nickname === "Anonymous" || nickname.trim() === "")
                nickname = "Anonymous";

            score = 0;
            doodlerX = width / 2 - doodlerSize / 2;
            doodlerY = height - doodlerSize - 15;
            doodlerVelocity = 0;
            gameStarted = true;
            gameOver = false;
            monster = null;
            hole = null;
            cameraOffset = 0;
            isAnimatingCamera = false;
            baseSpawnChance = 0.01;
            bgColor = { r: 240, g: 235, b: 230 };
            targetBgColor = { r: 240, g: 235, b: 230 };
            gameOverSoundPlayed = false;
            platformList = [];
            startPlatform = {
                xPos: 0,
                yPos: height - 5,
                width: width,
                height: platformHeight,
                type: "start",
            };
            setupPlatforms();
            if (buttonClickSound && buttonClickSound.isLoaded())
                buttonClickSound.play();
        } else if (key.length === 1 && nickname.length < 20) {
            if (nickname === "Anonymous") nickname = "";
            nickname += key;
        } else if (keyCode === BACKSPACE && nickname.length > 0) {
            nickname = nickname.slice(0, -1);
            if (nickname === "") nickname = "Anonymous";
        }
    }
}

function drawDoodler() {
    image(doodlerImg, doodlerX, doodlerY, doodlerSize, doodlerSize);
}

function moveDoodler() {
    doodlerVelocity += height * 0.000333;
    doodlerY += doodlerVelocity;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) doodlerX -= doodlerXSpeed;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) doodlerX += doodlerXSpeed;

    if (mouseIsPressed && gameStarted && !gameOver) {
        let deadZone = width * 0.077;
        if (mouseX < width / 2 - deadZone) {
            doodlerX -= doodlerTouchSpeed;
        } else if (mouseX > width / 2 + deadZone) {
            doodlerX += doodlerTouchSpeed;
        }
    }

    if (doodlerX < -doodlerSize) doodlerX = width;
    else if (doodlerX > width) doodlerX = -doodlerSize;
}

function setupPlatforms() {
    platformList = [];
    for (let i = 0; i < numOfPlatforms; i++) {
        let platGap = height / numOfPlatforms;
        let newPlatformYPosition = i * platGap;
        let type = getRandomPlatformType();
        let plat = new Platform(newPlatformYPosition, type);
        platformList.push(plat);
    }
}

function getRandomPlatformType() {
    let rand = random();
    if (score < 20) {
        if (rand < 0.9) return 0;
        else if (rand < 0.95) return 4;
        else return 5;
    } else if (score < 50) {
        if (rand < 0.75) return 6;
        else if (rand < 0.85) return 4;
        else if (rand < 0.95) return 5;
        else return 7;
    } else if (score < 80) {
        if (rand < 0.5) return 8;
        else if (rand < 0.65) return 9;
        else if (rand < 0.8) return 4;
        else if (rand < 0.95) return 5;
        else return 7;
    } else {
        if (rand < 0.25) return 10;
        else if (rand < 0.5) return 14;
        else if (rand < 0.75) return 16;
        else if (rand < 0.9) return 4;
        else return 7;
    }
}

function drawPlatforms() {
    platformList.forEach(function (plat) {
        plat.yPos += platYChange;
        let currentImg = null;

        if (plat.type === 0) {
            currentImg = platformImg;
        } else if (plat.type === 4) {
            currentImg = trampoline1Img;
        } else if (plat.type === 5) {
            if (!plat.used && !plat.broken) {
                currentImg = trampoline2Img;
            } else if (plat.broken) {
                currentImg = brokenBrownImg;
            } else {
                currentImg = trampoline2Img;
            }
        } else if (plat.type === 6) {
            currentImg = lightBlueImg;
        } else if (plat.type === 7) {
            currentImg = trampoline3Img;
            plat.xPos += plat.moveSpeed * plat.moveDirection;
            if (plat.xPos <= 0) plat.moveDirection = 1;
            else if (plat.xPos >= width - plat.width) plat.moveDirection = -1;
        } else if (plat.type === 8) {
            currentImg = grayishImg;
        } else if (plat.type === 9) {
            currentImg = orangeImgs[floor(random(orangeImgs.length))];
        } else if (plat.type === 10) {
            if (!plat.broken) {
                currentImg = brownImg;
            } else if (plat.breakAnimationFrame === undefined) {
                plat.breakAnimationFrame = 0;
                plat.breakAnimationTimer = 0;
            } else {
                plat.breakAnimationTimer += deltaTime / 1000;
                if (plat.breakAnimationTimer >= 0.5) {
                    plat.broken = false;
                    plat.breakAnimationFrame = undefined;
                    plat.breakAnimationTimer = undefined;
                    return;
                }
                if (plat.breakAnimationTimer < 0.5) {
                    currentImg = brokenBrownImg;
                }
            }
        } else if (plat.type === 14) {
            if (!plat.broken) {
                currentImg = redImg;
            } else if (plat.breakAnimationFrame === undefined) {
                plat.breakAnimationFrame = 0;
                plat.breakAnimationTimer = 0;
            } else {
                plat.breakAnimationTimer += deltaTime / 1000;
                if (plat.breakAnimationTimer >= 0.5) {
                    plat.breakAnimationFrame = undefined;
                    plat.breakAnimationTimer = undefined;
                    currentImg = brokenRedImg;
                } else {
                    currentImg = brokenRedImg;
                }
            }
        } else if (plat.type === 16) {
            if (!plat.broken) {
                currentImg = blackImg;
            } else if (plat.breakAnimationFrame === undefined) {
                plat.breakAnimationFrame = 0;
                plat.breakAnimationTimer = 0;
            } else {
                plat.breakAnimationTimer += deltaTime / 1000;
                if (plat.breakAnimationTimer >= 0.5) {
                    plat.breakAnimationFrame = undefined;
                    plat.breakAnimationTimer = undefined;
                    currentImg = brokenBlackImg;
                } else {
                    currentImg = brokenBlackImg;
                }
            }
        }

        if (currentImg) {
            image(currentImg, plat.xPos, plat.yPos, plat.width, plat.height);
        } else {
            console.warn("Platform image not loaded for type", plat.type);
        }

        if (plat.yPos > height) {
            score++;
            platformList.pop();
            let newType = getRandomPlatformType();
            let newPlat = new Platform(0, newType);
            platformList.unshift(newPlat);
        }
    });
}

function Platform(newPlatformYPosition, type) {
    this.xPos = random(width * 0.023, width * 0.846);
    this.yPos = newPlatformYPosition;
    this.width = platformWidth;
    this.height = platformHeight;
    this.type = type;
    this.used = false;
    this.broken = false;
    this.breakAnimationFrame = 0;
    this.breakAnimationTimer = 0;
    if (type === 7) {
        this.moveSpeed = 1 + score / 50;
        this.moveDirection = 1;
    }
}

function drawMonsters() {
    if (monster) {
        monster.yPos += platYChange;
        let currentImg = null;

        if (monster.type === 0) {
            currentImg = monster.img;
        } else if (monster.type === 1) {
            if (monster.animFrame === undefined) monster.animFrame = 0;
            monster.animTimer = (monster.animTimer || 0) + deltaTime / 1000;
            if (monster.animTimer >= 1.0) {
                monster.animFrame =
                    (monster.animFrame + 1) % monsterAnimSlow.length;
                monster.animTimer = 0;
            }
            currentImg = monsterAnimSlow[monster.animFrame];
        } else if (monster.type === 2) {
            if (monster.animFrame === undefined) monster.animFrame = 0;
            monster.animTimer = (monster.animTimer || 0) + deltaTime / 1000;
            if (monster.animTimer >= 0.1) {
                monster.animFrame =
                    (monster.animFrame + 1) % monsterAnimFlying1.length;
                monster.animTimer = 0;
            }
            currentImg = monsterAnimFlying1[monster.animFrame];
        } else if (monster.type === 3) {
            if (monster.animFrame === undefined) monster.animFrame = 0;
            monster.animTimer = (monster.animTimer || 0) + deltaTime / 1000;
            if (monster.animTimer >= 0.1) {
                monster.animFrame =
                    (monster.animFrame + 1) % monsterAnimTrampoline1.length;
                monster.animTimer = 0;
            }
            currentImg = monsterAnimTrampoline1[monster.animFrame];
        } else if (monster.type === 4) {
            if (monster.animFrame === undefined) monster.animFrame = 0;
            monster.animTimer = (monster.animTimer || 0) + deltaTime / 1000;
            if (monster.animTimer >= 0.1) {
                monster.animFrame =
                    (monster.animFrame + 1) % monsterAnimTrampoline2.length;
                monster.animTimer = 0;
            }
            currentImg = monsterAnimTrampoline2[monster.animFrame];
        } else if (monster.type === 5) {
            if (monster.animFrame === undefined) monster.animFrame = 0;
            monster.animTimer = (monster.animTimer || 0) + deltaTime / 1000;
            if (monster.animTimer >= 0.1) {
                monster.animFrame =
                    (monster.animFrame + 1) % monsterAnimFlying2.length;
                monster.animTimer = 0;
            }
            currentImg = monsterAnimFlying2[monster.animFrame];
        }

        if (currentImg) {
            image(
                currentImg,
                monster.xPos,
                monster.yPos,
                doodlerSize,
                doodlerSize
            );
        } else {
            console.warn("Monster image not loaded for type", monster.type);
        }

        if (monster.yPos > height) {
            monster.yPos = random(-height, -height * 0.167);
            monster.xPos = random(0, width - doodlerSize);
        }
    }
}

function updateMonsters() {
    if (monster) {
        if (monster.type === 0 || monster.type === 1) {
            monster.xPos += monsterSpeed * monsterDirection;
            if (monster.xPos <= 0) monsterDirection = 1;
            else if (monster.xPos >= width - doodlerSize) monsterDirection = -1;
        } else if (monster.type === 2 || monster.type === 5) {
            monster.xPos += monsterSpeed * monsterDirection;
            if (monster.xPos <= 0) monsterDirection = 1;
            else if (monster.xPos >= width - doodlerSize) monsterDirection = -1;
        } else if (monster.type === 3 || monster.type === 4) {
            let platform = platformList.find(
                (p) =>
                    p.yPos <= monster.yPos + doodlerSize &&
                    p.yPos + p.height >= monster.yPos
            );
            if (platform) {
                monster.xPos =
                    platform.xPos + (platform.width - doodlerSize) / 2;
            }
        }
    }
}

function spawnMonsters() {
    let spawnChance = baseSpawnChance + score * 0.0005;
    if (!monster && random() < spawnChance) {
        let monsterY = random(-height, -height * 0.167);
        let monsterType;
        if (score < 20) {
            const types = [3, 4, 0, 1];
            monsterType = types[floor(random(types.length))];
        } else if (score < 50) {
            const types = [3, 4, 0, 1, 2, 5];
            monsterType = types[floor(random(types.length))];
        } else if (score < 80) {
            const types = [3, 4, 0, 1, 2, 5];
            monsterType = types[floor(random(types.length))];
        } else {
            const types = [3, 4, 0, 1, 2, 5];
            monsterType = types[floor(random(types.length))];
        }
        let monsterImg;
        if (monsterType === 0) {
            let staticType = floor(random(6));
            if (staticType === 0) monsterImg = monsterImg1;
            else if (staticType === 1) monsterImg = monsterImg2;
            else if (staticType === 2) monsterImg = monsterImg3;
            else if (staticType === 3) monsterImg = monsterImg4;
            else if (staticType === 4) monsterImg = monsterImg5;
            else monsterImg = monsterImg6;
        } else if (monsterType === 1) {
            monsterImg = monsterAnimSlow[0];
        } else if (monsterType === 2) {
            monsterImg = monsterAnimFlying1[0];
        } else if (monsterType === 3) {
            monsterImg = monsterAnimTrampoline1[0];
            let platform = platformList.find(
                (p) =>
                    p.yPos <= monsterY + doodlerSize &&
                    p.yPos + p.height >= monster.yPos
            );
            if (platform) monsterY = platform.yPos - doodlerSize;
        } else if (monsterType === 4) {
            monsterImg = monsterAnimTrampoline2[0];
            let platform = platformList.find(
                (p) =>
                    p.yPos <= monsterY + doodlerSize &&
                    p.yPos + p.height >= monster.yPos
            );
            if (platform) monsterY = platform.yPos - doodlerSize;
        } else if (monsterType === 5) {
            monsterImg = monsterAnimFlying2[0];
        }
        monster = new Monster(monsterY, monsterType, monsterImg);
    }
}

function Monster(yPos, type, img) {
    this.xPos = random(0, width - doodlerSize);
    this.yPos = yPos;
    this.type = type;
    this.img = img;
    this.animFrame = 0;
    this.animTimer = 0;
}

function drawSpaceShip() {
    if (random() < 0.02) {
        let spaceShipY = random(-height * 0.5, -height * 0.167);
        let spaceShipX = random(0, width - width * 0.154);
        let currentShipImg =
            spaceShipImgs[floor(frameCount / 30) % spaceShipImgs.length];
        image(
            currentShipImg,
            spaceShipX,
            spaceShipY,
            width * 0.154,
            width * 0.154
        );
    }
}

function checkCollision() {
    platformList.forEach(function (plat) {
        if (
            doodlerX < plat.xPos + plat.width &&
            doodlerX + doodlerSize > plat.xPos &&
            doodlerY + doodlerSize < plat.yPos + plat.height &&
            doodlerY + doodlerSize > plat.yPos &&
            doodlerVelocity > 0
        ) {
            if (
                plat.type === 0 ||
                plat.type === 6 ||
                plat.type === 8 ||
                plat.type === 9
            ) {
                doodlerVelocity = -height * 0.017;
                if (trampolineSound && trampolineSound.isLoaded())
                    trampolineSound.play();
            } else if (plat.type === 4) {
                doodlerVelocity = -height * 0.033;
                isAnimatingCamera = true;
                if (trampolineBounceSound && trampolineBounceSound.isLoaded())
                    trampolineBounceSound.play();
                if (trampolineSound && trampolineSound.isLoaded())
                    trampolineSound.play();
            } else if (plat.type === 5) {
                doodlerVelocity = -height * 0.017;
                if (!plat.used && !plat.broken) {
                    plat.used = true;
                    plat.breakAnimationFrame = 0;
                    plat.breakAnimationTimer = 0;
                    if (trampolineSound && trampolineSound.isLoaded())
                        trampolineSound.play();
                } else if (!plat.broken) {
                    plat.breakAnimationTimer += deltaTime / 1000;
                    if (plat.breakAnimationTimer >= 0.5) plat.broken = true;
                }
            } else if (plat.type === 7) {
                doodlerVelocity = -height * 0.017;
                if (trampolineSound && trampolineSound.isLoaded())
                    trampolineSound.play();
            } else if (plat.type === 10) {
                doodlerVelocity = -height * 0.017;
                if (!plat.broken) {
                    plat.broken = true;
                    plat.breakAnimationFrame = 0;
                    plat.breakAnimationTimer = 0;
                    if (trampolineSound && trampolineSound.isLoaded())
                        trampolineSound.play();
                }
            } else if (plat.type === 14) {
                doodlerVelocity = -height * 0.017;
                if (!plat.broken) {
                    plat.broken = true;
                    plat.breakAnimationFrame = 0;
                    plat.breakAnimationTimer = 0;
                    if (trampolineSound && trampolineSound.isLoaded())
                        trampolineSound.play();
                }
            } else if (plat.type === 16) {
                doodlerVelocity = -height * 0.017;
                if (!plat.broken) {
                    plat.broken = true;
                    plat.breakAnimationFrame = 0;
                    plat.breakAnimationTimer = 0;
                    if (trampolineSound && trampolineSound.isLoaded())
                        trampolineSound.play();
                }
            }
        }
    });

    if (
        startPlatform &&
        score === 0 &&
        doodlerX < startPlatform.xPos + startPlatform.width &&
        doodlerX + doodlerSize > startPlatform.xPos &&
        doodlerY + doodlerSize < startPlatform.yPos + startPlatform.height &&
        doodlerY + doodlerSize > startPlatform.yPos &&
        doodlerVelocity > 0
    ) {
        doodlerVelocity = -height * 0.017;
        if (trampolineSound && trampolineSound.isLoaded())
            trampolineSound.play();
    }

    if (monster) {
        if (
            doodlerX < monster.xPos + doodlerSize &&
            doodlerX + doodlerSize > monster.xPos &&
            doodlerY + doodlerSize < monster.yPos + height * 0.033 &&
            doodlerY + doodlerSize > monster.yPos &&
            doodlerVelocity > 0
        ) {
            if (monster.type === 0 || monster.type === 1) {
                doodlerVelocity = -height * 0.025;
                if (impactSound && impactSound.isLoaded()) impactSound.play();
            } else if (monster.type === 3 || monster.type === 4) {
                doodlerVelocity = -height * 0.025;
                if (trampolineSound && trampolineSound.isLoaded())
                    trampolineSound.play();
            }
        } else if (
            doodlerX < monster.xPos + doodlerSize &&
            doodlerX + doodlerSize > monster.xPos &&
            doodlerY < monster.yPos + doodlerSize &&
            doodlerY + doodlerSize > monster.yPos + height * 0.033
        ) {
            if (
                monster.type === 0 ||
                monster.type === 1 ||
                monster.type === 2 ||
                monster.type === 5
            ) {
                if (impactSound && impactSound.isLoaded()) impactSound.play();
                gameOver = true;
                saveScoreToLeaderboard();
                if (
                    gameOverSound &&
                    gameOverSound.isLoaded() &&
                    !gameOverSoundPlayed
                ) {
                    gameOverSound.play();
                    gameOverSoundPlayed = true;
                }
            }
        }
    }

    if (hole) {
        if (
            doodlerX < hole.xPos + hole.width &&
            doodlerX + doodlerSize > hole.xPos &&
            doodlerY < hole.yPos + hole.height &&
            doodlerY + doodlerSize > hole.yPos
        ) {
            if (impactSound && impactSound.isLoaded()) impactSound.play();
            gameOver = true;
            saveScoreToLeaderboard();
            if (
                gameOverSound &&
                gameOverSound.isLoaded() &&
                !gameOverSoundPlayed
            ) {
                gameOverSound.play();
                gameOverSoundPlayed = true;
            }
        }
    }

    if (doodlerY > height) {
        if (fallSoundMp3 && fallSoundMp3.isLoaded()) fallSoundMp3.play();
        gameOver = true;
        saveScoreToLeaderboard();
        if (gameOverSound && gameOverSound.isLoaded() && !gameOverSoundPlayed) {
            gameOverSound.play();
            gameOverSoundPlayed = true;
        }
    }

    if (doodlerX < -doodlerSize) doodlerX = width;
    else if (doodlerX > width) doodlerX = -doodlerSize;
}

function spawnHole() {
    if (!hole && random() < holeSpawnChance && score >= 20) {
        let holeY = random(-height, -height * 0.167);
        let holeX = random(0, width - width * 0.154);
        hole = {
            xPos: holeX,
            yPos: holeY,
            width: width * 0.154,
            height: width * 0.154,
        };
    }
}

function drawHole() {
    hole.yPos += platYChange;
    image(holeImg, hole.xPos, hole.yPos, hole.width, hole.height);
    if (hole.yPos > height) {
        hole = null;
    }
}

function displayScore() {
    fill(0);
    textSize(height * 0.06);
    textFont(doodleJumpBoldFont);
    textAlign(LEFT, TOP);
    text("Score: " + score, width * 0.015, height * 0.017);
}

function updateCameraAnimation() {
    if (isAnimatingCamera) {
        animationTimer += deltaTime / 1000;
        if (animationTimer < 0.5) {
            cameraOffset = -height * 0.083 * sin(animationTimer * 20);
            platYChange = height * 0.017;
        } else {
            isAnimatingCamera = false;
            platYChange = 0;
            animationTimer = 0;
            cameraOffset = 0;
        }
    }
}

function updateDifficulty() {
    if (score < 20) {
        baseSpawnChance = 0.01;
        holeSpawnChance = 0.0001;
        monsterSpeed = 0.5;
    } else if (score < 50) {
        baseSpawnChance = 0.015;
        holeSpawnChance = 0.0005;
        monsterSpeed = 0.7;
    } else if (score < 80) {
        baseSpawnChance = 0.02;
        holeSpawnChance = 0.001;
        monsterSpeed = 1.0;
    } else {
        baseSpawnChance = 0.025;
        holeSpawnChance = 0.002;
        monsterSpeed = 1.5;
    }
}

function updateBackgroundColor() {
    if (score < 20) {
        targetBgColor = { r: 220, g: 230, b: 240 };
    } else if (score < 50) {
        targetBgColor = { r: 245, g: 235, b: 220 };
    } else if (score < 80) {
        targetBgColor = { r: 230, g: 220, b: 240 };
    } else {
        targetBgColor = { r: 240, g: 220, b: 225 };
    }

    bgColor.r += (targetBgColor.r - bgColor.r) * 0.05;
    bgColor.g += (targetBgColor.g - bgColor.g) * 0.05;
    bgColor.b += (targetBgColor.b - bgColor.b) * 0.05;
}

function moveScreen() {
    if (doodlerY < height * 0.417 && !isAnimatingCamera) {
        platYChange = height * 0.005;
        doodlerVelocity += height * 0.000417;
    } else if (doodlerVelocity < -height * 0.025) {
        platYChange = height * 0.01;
        doodlerVelocity += height * 0.000417;
    } else {
        platYChange = 0;
    }
}

function drawStartButton() {
    fill(173, 216, 230, 200);
    rectMode(CENTER);
    let buttonWidth = width * 0.308;
    let buttonHeight = height * 0.1;
    rect(width / 2, height * 0.667, buttonWidth, buttonHeight, 10);
    fill(0);
    textSize(height * 0.06);
    textFont(doodleJumpBoldFont);
    textAlign(CENTER, CENTER);
    text("Start", width / 2, height * 0.667);
}

function drawNicknameInput() {
    image(helloPngImg, 0, 0, width, height);

    fill(0);
    textSize(height * 0.08);
    textFont(doodleJumpBoldFont);
    textAlign(CENTER, CENTER);
    text("Enter Nickname", width / 2, height * 0.417);

    fill(211, 211, 211, 150);
    rectMode(CENTER);
    let inputWidth = width * 0.523;
    let inputHeight = height * 0.1;
    rect(width / 2, height * 0.583, inputWidth, inputHeight, 10);
    fill(0);
    textSize(height * 0.06);
    textAlign(CENTER, CENTER);
    let displayText =
        nickname === "Anonymous" && !keyIsPressed ? "Anonymous" : nickname;
    if (nickname === "Anonymous" && !keyIsPressed) {
        fill(130, 130, 130);
    } else {
        fill(0);
    }
    text(displayText, width / 2, height * 0.583);

    fill(144, 238, 144, 200);
    rectMode(CENTER);
    let buttonWidth = width * 0.308;
    let buttonHeight = height * 0.1;
    rect(width / 2, height * 0.75, buttonWidth, buttonHeight, 10);
    fill(0);
    textSize(height * 0.06);
    textFont(doodleJumpBoldFont);
    textAlign(CENTER, CENTER);
    text("Submit", width / 2, height * 0.75);
}

function drawGameOverScreen() {
    image(backgroundImg, 0, 0, width, height);

    let monsterSize = width * 0.205;
    image(monsterImg1, width * 0.067, height * 0.08, monsterSize, monsterSize);
    image(
        monsterAnimSlow[0],
        width * 0.4,
        height * 0.08,
        monsterSize,
        monsterSize
    );
    image(
        monsterAnimFlying1[0],
        width * 0.72,
        height * 0.08,
        monsterSize,
        monsterSize
    );

    fill(0);
    textSize(height * 0.2);
    textFont(doodleJumpBoldFont);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height * 0.35);

    fill(0);
    textSize(height * 0.133);
    textFont(doodleJumpBoldFont);
    textAlign(CENTER, CENTER);
    text("Score: " + score, width / 2, height * 0.517);

    fill(0);
    textSize(height * 0.067);
    textFont(doodleJumpFont);
    text("Player: " + nickname, width / 2, height * 0.633);

    image(
        doodlerImg,
        width / 2 - doodlerSize * 1.5,
        height * 0.667,
        doodlerSize * 3,
        doodlerSize * 3
    );

    if (!gameOverSoundPlayed) {
        saveScoreToLeaderboard();
        if (gameOverSound && gameOverSound.isLoaded()) {
            gameOverSound.play();
        }
        gameOverSoundPlayed = true;
    }
}

// Updated leaderboard functions to use AJAX
function saveScoreToLeaderboard() {
    console.log("Saving score for", nickname, "with score", score);

    fetch("/leaderboard/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify({
            nickname: nickname,
            score: score,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Score saved:", data);
            displayLeaderboard();
        })
        .catch((error) => {
            console.error("Error saving score:", error);
            let leaderboard =
                JSON.parse(localStorage.getItem("leaderboard")) || [];
            const existingPlayerIndex = leaderboard.findIndex(
                (entry) => entry.nickname === nickname
            );
            if (existingPlayerIndex !== -1) {
                if (leaderboard[existingPlayerIndex].score < score) {
                    leaderboard[existingPlayerIndex].score = score;
                    leaderboard[existingPlayerIndex].date =
                        new Date().toISOString();
                }
            } else {
                leaderboard.push({
                    nickname: nickname,
                    score: score,
                    date: new Date().toISOString(),
                });
            }
            leaderboard.sort((a, b) => b.score - a.score);
            leaderboard = leaderboard.slice(0, 10);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
            displayLeaderboard();
        });
}

function displayLeaderboard() {
    fetch("/leaderboard")
        .then((response) => response.json())
        .then((leaderboard) => {
            console.log("Displaying leaderboard:", leaderboard);
            const tbody = document.getElementById("leaderboard-body");

            if (!tbody) {
                console.error("Leaderboard body element not found!");
                return;
            }

            tbody.innerHTML = "";

            if (leaderboard.length === 0) {
                const row = document.createElement("tr");
                row.classList.add("pt-1", "sm:pt-1.5", "lg:pt-2");
                row.innerHTML = `<td colspan="3" class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">No scores yet!</td>`;
                tbody.appendChild(row);
            } else {
                leaderboard.forEach((entry, index) => {
                    const row = document.createElement("tr");
                    row.classList.add(
                        "border-b",
                        "border-white/10",
                        "pt-1",
                        "sm:pt-1.5",
                        "lg:pt-2"
                    );
                    row.innerHTML = `
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            index + 1
                        }</td>
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            entry.nickname
                        }</td>
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            entry.score
                        }</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching leaderboard:", error);
            let leaderboard =
                JSON.parse(localStorage.getItem("leaderboard")) || [];
            const tbody = document.getElementById("leaderboard-body");
            if (!tbody) {
                console.error("Leaderboard body element not found!");
                return;
            }
            tbody.innerHTML = "";
            if (leaderboard.length === 0) {
                const row = document.createElement("tr");
                row.classList.add("pt-1", "sm:pt-1.5", "lg:pt-2");
                row.innerHTML = `<td colspan="3" class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">No scores yet!</td>`;
                tbody.appendChild(row);
            } else {
                leaderboard.forEach((entry, index) => {
                    const row = document.createElement("tr");
                    row.classList.add(
                        "border-b",
                        "border-white/10",
                        "pt-1",
                        "sm:pt-1.5",
                        "lg:pt-2"
                    );
                    row.innerHTML = `
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            index + 1
                        }</td>
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            entry.nickname
                        }</td>
                        <td class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">${
                            entry.score
                        }</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        });
}
