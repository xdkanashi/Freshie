// Получаем базовый URL из глобальной переменной, заданной в Blade-шаблоне
const ASSET_BASE_URL = window.ASSET_BASE_URL || "";

// Функция-обёртка для p5
function sketch(p) {
    // Глобальные переменные внутри экземпляра
    let doodlerSize,
        doodlerX,
        doodlerY,
        doodlerVelocity,
        doodlerXSpeed,
        doodlerTouchSpeed;
    let platformWidth,
        platformHeight,
        numOfPlatforms = 5,
        platformList = [];
    let platYChange = 0,
        gameStarted = false,
        score = 0,
        highScore = 0;
    let doodlerImg, platformImg, trampoline1Img, trampoline2Img, trampoline3Img;
    let backgroundImg,
        monster = null,
        monsterSpeed = 0.5,
        monsterDirection = 1;
    let baseSpawnChance = 0.005,
        cameraOffset = 0,
        isAnimatingCamera = false,
        animationTimer = 0;
    let bgColor = { r: 240, g: 235, b: 230 },
        targetBgColor = { r: 240, g: 235, b: 230 };
    let hole = null,
        holeImg,
        holeSpawnChance = 0.0001;
    let helloSvgImg,
        helloPngImg,
        gameOver = false,
        nickname = "Anonymous";
    let showNicknameInput = false,
        gameOverSoundPlayed = false,
        startPlatformImg,
        startPlatform = null;
    let lightBlueImg,
        grayishImg,
        orangeImgs = [],
        brownImg,
        brokenBrownImg,
        redImg,
        brokenRedImg,
        blackImg,
        brokenBlackImg;
    let monsterImg1,
        monsterImg2,
        monsterImg3,
        monsterImg4,
        monsterImg5,
        monsterImg6;
    let monsterAnimFlying1 = [],
        monsterAnimFlying2 = [],
        monsterAnimTrampoline1 = [],
        monsterAnimTrampoline2 = [],
        monsterAnimSlow = [];
    let spaceShipImgs = [];
    let gameOverSound,
        trampolineSound,
        trampolineBounceSound,
        fallSoundMp3,
        impactSound,
        buttonClickSound;
    let doodleJumpFont, doodleJumpBoldFont, doodleJumpBoldV3Font;

    // Preload
    p.preload = function () {
        backgroundImg = p.loadImage(`${ASSET_BASE_URL}/img/bg3.png`);
        doodlerImg = p.loadImage(`${ASSET_BASE_URL}/img/cat.png`);
        platformImg = p.loadImage(`${ASSET_BASE_URL}/img/trampline.png`);
        trampoline1Img = p.loadImage(`${ASSET_BASE_URL}/img/trampline1.png`);
        trampoline2Img = p.loadImage(`${ASSET_BASE_URL}/img/trampline2.png`);
        trampoline3Img = p.loadImage(`${ASSET_BASE_URL}/img/trampline3.png`);
        startPlatformImg = p.loadImage(`${ASSET_BASE_URL}/img/start.png`);
        monsterImg1 = p.loadImage(`${ASSET_BASE_URL}/img/m1.png`);
        monsterImg2 = p.loadImage(`${ASSET_BASE_URL}/img/m2.png`);
        monsterImg3 = p.loadImage(`${ASSET_BASE_URL}/img/m3.png`);
        monsterImg4 = p.loadImage(`${ASSET_BASE_URL}/img/mob4.png`);
        monsterImg5 = p.loadImage(`${ASSET_BASE_URL}/img/mob5.png`);
        monsterImg6 = p.loadImage(`${ASSET_BASE_URL}/img/mob6.png`);

        monsterAnimFlying1 = [
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.2.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-2.3.png`),
        ];
        monsterAnimFlying2 = [
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.2.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.3.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.4.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-3.5.png`),
        ];
        monsterAnimTrampoline1 = [
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.2.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.3.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.4.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-4.5.png`),
        ];
        monsterAnimTrampoline2 = [
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-1.1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-anim-1.2.png`),
        ];
        monsterAnimSlow = [
            p.loadImage(`${ASSET_BASE_URL}/img/mob-slow-anim-1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/mob-slow-anim-2.png`),
        ];
        spaceShipImgs = [
            p.loadImage(`${ASSET_BASE_URL}/img/space-ship-anim-1.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/space-ship-anim-2.png`),
        ];
        holeImg = p.loadImage(`${ASSET_BASE_URL}/img/hole1.png`);
        helloSvgImg = p.loadImage(`${ASSET_BASE_URL}/img/hello.svg`);
        helloPngImg = p.loadImage(`${ASSET_BASE_URL}/img/hello.png`);

        lightBlueImg = p.loadImage(`${ASSET_BASE_URL}/img/platform11.png`);
        grayishImg = p.loadImage(`${ASSET_BASE_URL}/img/platform12.png`);
        orangeImgs = [
            p.loadImage(`${ASSET_BASE_URL}/img/platform3.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/platform4.png`),
            p.loadImage(`${ASSET_BASE_URL}/img/platform5.png`),
        ];
        brownImg = p.loadImage(`${ASSET_BASE_URL}/img/platform13.png`);
        brokenBrownImg = p.loadImage(`${ASSET_BASE_URL}/img/platform16.png`);
        redImg = p.loadImage(`${ASSET_BASE_URL}/img/platform6.png`);
        brokenRedImg = p.loadImage(`${ASSET_BASE_URL}/img/platform10.png`);
        blackImg = p.loadImage(`${ASSET_BASE_URL}/img/platform8.png`);
        brokenBlackImg = p.loadImage(`${ASSET_BASE_URL}/img/platform10.png`);

        doodleJumpFont = p.loadFont(
            `${ASSET_BASE_URL}/fonts/doodlejump_v2.ttf`
        );
        doodleJumpBoldFont = p.loadFont(
            `${ASSET_BASE_URL}/fonts/doodlejumpbold_v2.ttf`
        );
        doodleJumpBoldV3Font = p.loadFont(
            `${ASSET_BASE_URL}/fonts/doodlejumpbold_v3.ttf`
        );

        // Загрузка звуков через нативный Audio
        gameOverSound = new Audio(`${ASSET_BASE_URL}/mp3/gameover.mp3`);
        trampolineSound = new Audio(
            `${ASSET_BASE_URL}/mp3/trampoline-zvuk.mp3`
        );
        trampolineBounceSound = new Audio(
            `${ASSET_BASE_URL}/mp3/trampoline-zvuk-bounced.mp3`
        );
        fallSoundMp3 = new Audio(`${ASSET_BASE_URL}/mp3/zvuk-padeniya.mp3`);
        impactSound = new Audio(`${ASSET_BASE_URL}/wav/zvuk-udara-v-igre.wav`);
        buttonClickSound = new Audio(
            `${ASSET_BASE_URL}/mp3/button-clicked.mp3`
        );

        // Проверка загрузки звуков (опционально)
        [
            gameOverSound,
            trampolineSound,
            trampolineBounceSound,
            fallSoundMp3,
            impactSound,
            buttonClickSound,
        ].forEach((sound) => {
            sound.onerror = () =>
                console.error(`Failed to load sound: ${sound.src}`);
        });
    };

    // Setup
    p.setup = function () {
        let maxContainerWidth = p.min(p.windowWidth - 40, 1200);
        let gameWidth = p.min(maxContainerWidth - 40, 750);
        let gameHeight = (gameWidth * 700) / 750;
        let canvas = p.createCanvas(gameWidth, gameHeight);
        canvas.parent("game-container");
        p.frameRate(60);
        gameOverSoundPlayed = false;

        doodlerSize = gameWidth * 0.092;
        doodlerX = p.width / 2 - doodlerSize / 2;
        doodlerY = p.height - doodlerSize - 15;
        doodlerVelocity = 0;
        doodlerXSpeed = gameWidth * 0.006;
        doodlerTouchSpeed = gameWidth * 0.012;
        platformWidth = gameWidth * 0.13;
        platformHeight = gameHeight * 0.025;

        startPlatform = {
            xPos: 0,
            yPos: p.height - 5,
            width: p.width,
            height: platformHeight,
            type: "start",
        };

        adjustGameContainer();
        displayLeaderboard();
    };

    // Window resize
    p.windowResized = function () {
        let maxContainerWidth = p.min(p.windowWidth - 40, 1200);
        let gameWidth = p.min(maxContainerWidth - 40, 750);
        let gameHeight = (gameWidth * 700) / 750;
        p.resizeCanvas(gameWidth, gameHeight);

        doodlerSize = gameWidth * 0.092;
        doodlerX = p.width / 2 - doodlerSize / 2;
        doodlerY = p.height - doodlerSize - 15;
        doodlerXSpeed = gameWidth * 0.006;
        doodlerTouchSpeed = gameWidth * 0.012;
        platformWidth = gameWidth * 0.13;
        platformHeight = gameHeight * 0.025;

        if (startPlatform) {
            startPlatform.width = p.width;
            startPlatform.yPos = p.height - 5;
        }

        platformList.forEach((plat) => {
            plat.width = platformWidth;
            plat.height = platformHeight;
        });

        adjustGameContainer();
    };

    // Adjust game container
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

    // Draw
    p.draw = function () {
        updateDifficulty();
        updateBackgroundColor();
        p.background(bgColor.r, bgColor.g, bgColor.b);

        if (!showNicknameInput && !gameStarted && !gameOver) {
            p.image(helloSvgImg, 0, 0, p.width, p.height);
            drawStartButton();
        } else if (showNicknameInput) {
            p.image(helloPngImg, 0, 0, p.width, p.height);
            drawNicknameInput();
        } else if (gameOver) {
            drawGameOverScreen();
        } else {
            p.image(backgroundImg, 0, 0, p.width, p.height);

            if (startPlatform && score === 0) {
                p.image(
                    startPlatformImg,
                    startPlatform.xPos,
                    startPlatform.yPos,
                    startPlatform.width,
                    startPlatform.height
                );
            }

            p.push();
            p.translate(0, cameraOffset);

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

            p.pop();
        }
    };

    // Mouse pressed
    p.mousePressed = function () {
        if (!showNicknameInput && !gameStarted && !gameOver) {
            let buttonWidth = p.width * 0.308;
            let buttonHeight = p.height * 0.1;
            if (
                p.mouseX > p.width / 2 - buttonWidth / 2 &&
                p.mouseX < p.width / 2 + buttonWidth / 2 &&
                p.mouseY > p.height * 0.667 - buttonHeight / 2 &&
                p.mouseY < p.height * 0.667 + buttonHeight / 2
            ) {
                showNicknameInput = true;
                if (buttonClickSound && buttonClickSound.readyState >= 2)
                    buttonClickSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
            }
        } else if (showNicknameInput) {
            let buttonWidth = p.width * 0.308;
            let buttonHeight = p.height * 0.1;
            if (
                p.mouseX > p.width / 2 - buttonWidth / 2 &&
                p.mouseX < p.width / 2 + buttonWidth / 2 &&
                p.mouseY > p.height * 0.75 - buttonHeight / 2 &&
                p.mouseY < p.height * 0.75 + buttonHeight / 2
            ) {
                showNicknameInput = false;
                if (nickname === "Anonymous" || nickname.trim() === "")
                    nickname = "Anonymous";

                score = 0;
                doodlerX = p.width / 2 - doodlerSize / 2;
                doodlerY = p.height - doodlerSize - 15;
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
                    yPos: p.height - 5,
                    width: p.width,
                    height: platformHeight,
                    type: "start",
                };
                setupPlatforms();
                if (buttonClickSound && buttonClickSound.readyState >= 2)
                    buttonClickSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
            }
        } else if (gameOver) {
            if (
                p.mouseX > 0 &&
                p.mouseX < p.width &&
                p.mouseY > 0 &&
                p.mouseY < p.height
            ) {
                score = 0;
                doodlerY = p.height - doodlerSize - 15;
                doodlerX = p.width / 2 - doodlerSize / 2;
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
                    yPos: p.height - 5,
                    width: p.width,
                    height: platformHeight,
                    type: "start",
                };
                setupPlatforms();
                if (buttonClickSound && buttonClickSound.readyState >= 2)
                    buttonClickSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
            }
        }
    };

    // Key pressed
    p.keyPressed = function () {
        if (showNicknameInput) {
            if (p.keyCode === p.ENTER || p.keyCode === p.RETURN) {
                showNicknameInput = false;
                if (nickname === "Anonymous" || nickname.trim() === "")
                    nickname = "Anonymous";

                score = 0;
                doodlerX = p.width / 2 - doodlerSize / 2;
                doodlerY = p.height - doodlerSize - 15;
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
                    yPos: p.height - 5,
                    width: p.width,
                    height: platformHeight,
                    type: "start",
                };
                setupPlatforms();
                if (buttonClickSound && buttonClickSound.readyState >= 2)
                    buttonClickSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
            } else if (p.key.length === 1 && nickname.length < 20) {
                if (nickname === "Anonymous") nickname = "";
                nickname += p.key;
            } else if (p.keyCode === p.BACKSPACE && nickname.length > 0) {
                nickname = nickname.slice(0, -1);
                if (nickname === "") nickname = "Anonymous";
            }
        }
    };

    // Draw doodler
    function drawDoodler() {
        p.image(doodlerImg, doodlerX, doodlerY, doodlerSize, doodlerSize);
    }

    // Move doodler
    function moveDoodler() {
        doodlerVelocity += p.height * 0.000333;
        doodlerY += doodlerVelocity;

        if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65))
            doodlerX -= doodlerXSpeed;
        if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68))
            doodlerX += doodlerXSpeed;

        if (p.mouseIsPressed && gameStarted && !gameOver) {
            let deadZone = p.width * 0.077;
            if (p.mouseX < p.width / 2 - deadZone) {
                doodlerX -= doodlerTouchSpeed;
            } else if (p.mouseX > p.width / 2 + deadZone) {
                doodlerX += doodlerTouchSpeed;
            }
        }

        if (doodlerX < -doodlerSize) doodlerX = p.width;
        else if (doodlerX > p.width) doodlerX = -doodlerSize;
    }

    // Setup platforms
    function setupPlatforms() {
        platformList = [];
        for (let i = 0; i < numOfPlatforms; i++) {
            let platGap = p.height / numOfPlatforms;
            let newPlatformYPosition = i * platGap;
            let type = getRandomPlatformType();
            let plat = new Platform(newPlatformYPosition, type);
            platformList.push(plat);
        }
    }

    // Get random platform type
    function getRandomPlatformType() {
        let rand = p.random();
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

    // Draw platforms
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
                else if (plat.xPos >= p.width - plat.width)
                    plat.moveDirection = -1;
            } else if (plat.type === 8) {
                currentImg = grayishImg;
            } else if (plat.type === 9) {
                currentImg = orangeImgs[p.floor(p.random(orangeImgs.length))];
            } else if (plat.type === 10) {
                if (!plat.broken) {
                    currentImg = brownImg;
                } else if (plat.breakAnimationFrame === undefined) {
                    plat.breakAnimationFrame = 0;
                    plat.breakAnimationTimer = 0;
                } else {
                    plat.breakAnimationTimer += p.deltaTime / 1000;
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
                    plat.breakAnimationTimer += p.deltaTime / 1000;
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
                    plat.breakAnimationTimer += p.deltaTime / 1000;
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
                p.image(
                    currentImg,
                    plat.xPos,
                    plat.yPos,
                    plat.width,
                    plat.height
                );
            } else {
                console.warn("Platform image not loaded for type", plat.type);
            }

            if (plat.yPos > p.height) {
                score++;
                platformList.pop();
                let newType = getRandomPlatformType();
                let newPlat = new Platform(0, newType);
                platformList.unshift(newPlat);
            }
        });
    }

    // Platform constructor
    function Platform(newPlatformYPosition, type) {
        this.xPos = p.random(p.width * 0.023, p.width * 0.846);
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

    // Draw monsters
    function drawMonsters() {
        if (monster) {
            monster.yPos += platYChange;
            let currentImg = null;

            if (monster.type === 0) {
                currentImg = monster.img;
            } else if (monster.type === 1) {
                if (monster.animFrame === undefined) monster.animFrame = 0;
                monster.animTimer =
                    (monster.animTimer || 0) + p.deltaTime / 1000;
                if (monster.animTimer >= 1.0) {
                    monster.animFrame =
                        (monster.animFrame + 1) % monsterAnimSlow.length;
                    monster.animTimer = 0;
                }
                currentImg = monsterAnimSlow[monster.animFrame];
            } else if (monster.type === 2) {
                if (monster.animFrame === undefined) monster.animFrame = 0;
                monster.animTimer =
                    (monster.animTimer || 0) + p.deltaTime / 1000;
                if (monster.animTimer >= 0.1) {
                    monster.animFrame =
                        (monster.animFrame + 1) % monsterAnimFlying1.length;
                    monster.animTimer = 0;
                }
                currentImg = monsterAnimFlying1[monster.animFrame];
            } else if (monster.type === 3) {
                if (monster.animFrame === undefined) monster.animFrame = 0;
                monster.animTimer =
                    (monster.animTimer || 0) + p.deltaTime / 1000;
                if (monster.animTimer >= 0.1) {
                    monster.animFrame =
                        (monster.animFrame + 1) % monsterAnimTrampoline1.length;
                    monster.animTimer = 0;
                }
                currentImg = monsterAnimTrampoline1[monster.animFrame];
            } else if (monster.type === 4) {
                if (monster.animFrame === undefined) monster.animFrame = 0;
                monster.animTimer =
                    (monster.animTimer || 0) + p.deltaTime / 1000;
                if (monster.animTimer >= 0.1) {
                    monster.animFrame =
                        (monster.animFrame + 1) % monsterAnimTrampoline2.length;
                    monster.animTimer = 0;
                }
                currentImg = monsterAnimTrampoline2[monster.animFrame];
            } else if (monster.type === 5) {
                if (monster.animFrame === undefined) monster.animFrame = 0;
                monster.animTimer =
                    (monster.animTimer || 0) + p.deltaTime / 1000;
                if (monster.animTimer >= 0.1) {
                    monster.animFrame =
                        (monster.animFrame + 1) % monsterAnimFlying2.length;
                    monster.animTimer = 0;
                }
                currentImg = monsterAnimFlying2[monster.animFrame];
            }

            if (currentImg) {
                p.image(
                    currentImg,
                    monster.xPos,
                    monster.yPos,
                    doodlerSize,
                    doodlerSize
                );
            } else {
                console.warn("Monster image not loaded for type", monster.type);
            }

            if (monster.yPos > p.height) {
                monster.yPos = p.random(-p.height, -p.height * 0.167);
                monster.xPos = p.random(0, p.width - doodlerSize);
            }
        }
    }

    // Update monsters
    function updateMonsters() {
        if (monster) {
            if (monster.type === 0 || monster.type === 1) {
                monster.xPos += monsterSpeed * monsterDirection;
                if (monster.xPos <= 0) monsterDirection = 1;
                else if (monster.xPos >= p.width - doodlerSize)
                    monsterDirection = -1;
            } else if (monster.type === 2 || monster.type === 5) {
                monster.xPos += monsterSpeed * monsterDirection;
                if (monster.xPos <= 0) monsterDirection = 1;
                else if (monster.xPos >= p.width - doodlerSize)
                    monsterDirection = -1;
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

    // Spawn monsters
    function spawnMonsters() {
        let spawnChance = baseSpawnChance + score * 0.0005;
        if (!monster && p.random() < spawnChance) {
            let monsterY = p.random(-p.height, -p.height * 0.167);
            let monsterType;
            if (score < 20) {
                const types = [3, 4, 0, 1];
                monsterType = types[p.floor(p.random(types.length))];
            } else if (score < 50) {
                const types = [3, 4, 0, 1, 2, 5];
                monsterType = types[p.floor(p.random(types.length))];
            } else if (score < 80) {
                const types = [3, 4, 0, 1, 2, 5];
                monsterType = types[p.floor(p.random(types.length))];
            } else {
                const types = [3, 4, 0, 1, 2, 5];
                monsterType = types[p.floor(p.random(types.length))];
            }
            let monsterImg;
            if (monsterType === 0) {
                let staticType = p.floor(p.random(6));
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
                        p.yPos + p.height >= monsterY
                );
                if (platform) monsterY = platform.yPos - doodlerSize;
            } else if (monsterType === 4) {
                monsterImg = monsterAnimTrampoline2[0];
                let platform = platformList.find(
                    (p) =>
                        p.yPos <= monsterY + doodlerSize &&
                        p.yPos + p.height >= monsterY
                );
                if (platform) monsterY = platform.yPos - doodlerSize;
            } else if (monsterType === 5) {
                monsterImg = monsterAnimFlying2[0];
            }
            monster = new Monster(monsterY, monsterType, monsterImg);
        }
    }

    // Monster constructor
    function Monster(yPos, type, img) {
        this.xPos = p.random(0, p.width - doodlerSize);
        this.yPos = yPos;
        this.type = type;
        this.img = img;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    // Draw spaceship
    function drawSpaceShip() {
        if (p.random() < 0.02) {
            let spaceShipY = p.random(-p.height * 0.5, -p.height * 0.167);
            let spaceShipX = p.random(0, p.width - p.width * 0.154);
            let currentShipImg =
                spaceShipImgs[
                    p.floor(p.frameCount / 30) % spaceShipImgs.length
                ];
            p.image(
                currentShipImg,
                spaceShipX,
                spaceShipY,
                p.width * 0.154,
                p.width * 0.154
            );
        }
    }

    // Check collision
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
                    doodlerVelocity = -p.height * 0.017;
                    if (trampolineSound && trampolineSound.readyState >= 2)
                        trampolineSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                } else if (plat.type === 4) {
                    doodlerVelocity = -p.height * 0.033;
                    isAnimatingCamera = true;
                    if (
                        trampolineBounceSound &&
                        trampolineBounceSound.readyState >= 2
                    )
                        trampolineBounceSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                    if (trampolineSound && trampolineSound.readyState >= 2)
                        trampolineSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                } else if (plat.type === 5) {
                    doodlerVelocity = -p.height * 0.017;
                    if (!plat.used && !plat.broken) {
                        plat.used = true;
                        plat.breakAnimationFrame = 0;
                        plat.breakAnimationTimer = 0;
                        if (trampolineSound && trampolineSound.readyState >= 2)
                            trampolineSound
                                .play()
                                .catch((err) =>
                                    console.error("Error playing sound:", err)
                                );
                    } else if (!plat.broken) {
                        plat.breakAnimationTimer += p.deltaTime / 1000;
                        if (plat.breakAnimationTimer >= 0.5) plat.broken = true;
                    }
                } else if (plat.type === 7) {
                    doodlerVelocity = -p.height * 0.017;
                    if (trampolineSound && trampolineSound.readyState >= 2)
                        trampolineSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                } else if (plat.type === 10) {
                    doodlerVelocity = -p.height * 0.017;
                    if (!plat.broken) {
                        plat.broken = true;
                        plat.breakAnimationFrame = 0;
                        plat.breakAnimationTimer = 0;
                        if (trampolineSound && trampolineSound.readyState >= 2)
                            trampolineSound
                                .play()
                                .catch((err) =>
                                    console.error("Error playing sound:", err)
                                );
                    }
                } else if (plat.type === 14) {
                    doodlerVelocity = -p.height * 0.017;
                    if (!plat.broken) {
                        plat.broken = true;
                        plat.breakAnimationFrame = 0;
                        plat.breakAnimationTimer = 0;
                        if (trampolineSound && trampolineSound.readyState >= 2)
                            trampolineSound
                                .play()
                                .catch((err) =>
                                    console.error("Error playing sound:", err)
                                );
                    }
                } else if (plat.type === 16) {
                    doodlerVelocity = -p.height * 0.017;
                    if (!plat.broken) {
                        plat.broken = true;
                        plat.breakAnimationFrame = 0;
                        plat.breakAnimationTimer = 0;
                        if (trampolineSound && trampolineSound.readyState >= 2)
                            trampolineSound
                                .play()
                                .catch((err) =>
                                    console.error("Error playing sound:", err)
                                );
                    }
                }
            }
        });

        if (
            startPlatform &&
            score === 0 &&
            doodlerX < startPlatform.xPos + startPlatform.width &&
            doodlerX + doodlerSize > startPlatform.xPos &&
            doodlerY + doodlerSize <
                startPlatform.yPos + startPlatform.height &&
            doodlerY + doodlerSize > startPlatform.yPos &&
            doodlerVelocity > 0
        ) {
            doodlerVelocity = -p.height * 0.017;
            if (trampolineSound && trampolineSound.readyState >= 2)
                trampolineSound
                    .play()
                    .catch((err) => console.error("Error playing sound:", err));
        }

        if (monster) {
            if (
                doodlerX < monster.xPos + doodlerSize &&
                doodlerX + doodlerSize > monster.xPos &&
                doodlerY + doodlerSize < monster.yPos + p.height * 0.033 &&
                doodlerY + doodlerSize > monster.yPos &&
                doodlerVelocity > 0
            ) {
                if (monster.type === 0 || monster.type === 1) {
                    doodlerVelocity = -p.height * 0.025;
                    if (impactSound && impactSound.readyState >= 2)
                        impactSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                } else if (monster.type === 3 || monster.type === 4) {
                    doodlerVelocity = -p.height * 0.025;
                    if (trampolineSound && trampolineSound.readyState >= 2)
                        trampolineSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                }
            } else if (
                doodlerX < monster.xPos + doodlerSize &&
                doodlerX + doodlerSize > monster.xPos &&
                doodlerY < monster.yPos + doodlerSize &&
                doodlerY + doodlerSize > monster.yPos + p.height * 0.033
            ) {
                if (
                    monster.type === 0 ||
                    monster.type === 1 ||
                    monster.type === 2 ||
                    monster.type === 5
                ) {
                    if (impactSound && impactSound.readyState >= 2)
                        impactSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
                    gameOver = true;
                    saveScoreToLeaderboard();
                    if (
                        gameOverSound &&
                        gameOverSound.readyState >= 2 &&
                        !gameOverSoundPlayed
                    ) {
                        gameOverSound
                            .play()
                            .catch((err) =>
                                console.error("Error playing sound:", err)
                            );
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
                if (impactSound && impactSound.readyState >= 2)
                    impactSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
                gameOver = true;
                saveScoreToLeaderboard();
                if (
                    gameOverSound &&
                    gameOverSound.readyState >= 2 &&
                    !gameOverSoundPlayed
                ) {
                    gameOverSound
                        .play()
                        .catch((err) =>
                            console.error("Error playing sound:", err)
                        );
                    gameOverSoundPlayed = true;
                }
            }
        }

        if (doodlerY > p.height) {
            if (fallSoundMp3 && fallSoundMp3.readyState >= 2)
                fallSoundMp3
                    .play()
                    .catch((err) => console.error("Error playing sound:", err));
            gameOver = true;
            saveScoreToLeaderboard();
            if (
                gameOverSound &&
                gameOverSound.readyState >= 2 &&
                !gameOverSoundPlayed
            ) {
                gameOverSound
                    .play()
                    .catch((err) => console.error("Error playing sound:", err));
                gameOverSoundPlayed = true;
            }
        }

        if (doodlerX < -doodlerSize) doodlerX = p.width;
        else if (doodlerX > p.width) doodlerX = -doodlerSize;
    }

    // Spawn hole
    function spawnHole() {
        if (!hole && p.random() < holeSpawnChance && score >= 20) {
            let holeY = p.random(-p.height, -p.height * 0.167);
            let holeX = p.random(0, p.width - p.width * 0.154);
            hole = {
                xPos: holeX,
                yPos: holeY,
                width: p.width * 0.154,
                height: p.width * 0.154,
            };
        }
    }

    // Draw hole
    function drawHole() {
        hole.yPos += platYChange;
        p.image(holeImg, hole.xPos, hole.yPos, hole.width, hole.height);
        if (hole.yPos > p.height) {
            hole = null;
        }
    }

    // Display score
    function displayScore() {
        p.fill(0);
        p.textSize(p.height * 0.06);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.LEFT, p.TOP);
        p.text("Score: " + score, p.width * 0.015, p.height * 0.017);
    }

    // Update camera animation
    function updateCameraAnimation() {
        if (isAnimatingCamera) {
            animationTimer += p.deltaTime / 1000;
            if (animationTimer < 0.5) {
                cameraOffset = -p.height * 0.083 * p.sin(animationTimer * 20);
                platYChange = p.height * 0.017;
            } else {
                isAnimatingCamera = false;
                platYChange = 0;
                animationTimer = 0;
                cameraOffset = 0;
            }
        }
    }

    // Update difficulty
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

    // Update background color
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

    // Move screen
    function moveScreen() {
        if (doodlerY < p.height * 0.417 && !isAnimatingCamera) {
            platYChange = p.height * 0.005;
            doodlerVelocity += p.height * 0.000417;
        } else if (doodlerVelocity < -p.height * 0.025) {
            platYChange = p.height * 0.01;
            doodlerVelocity += p.height * 0.000417;
        } else {
            platYChange = 0;
        }
    }

    // Draw start button
    function drawStartButton() {
        p.fill(173, 216, 230, 200);
        p.rectMode(p.CENTER);
        let buttonWidth = p.width * 0.308;
        let buttonHeight = p.height * 0.1;
        p.rect(p.width / 2, p.height * 0.667, buttonWidth, buttonHeight, 10);
        p.fill(0);
        p.textSize(p.height * 0.06);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Start", p.width / 2, p.height * 0.667);
    }

    // Draw nickname input
    function drawNicknameInput() {
        p.image(helloPngImg, 0, 0, p.width, p.height);

        p.fill(0);
        p.textSize(p.height * 0.08);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Enter Nickname", p.width / 2, p.height * 0.417);

        p.fill(211, 211, 211, 150);
        p.rectMode(p.CENTER);
        let inputWidth = p.width * 0.523;
        let inputHeight = p.height * 0.1;
        p.rect(p.width / 2, p.height * 0.583, inputWidth, inputHeight, 10);
        p.fill(0);
        p.textSize(p.height * 0.06);
        p.textAlign(p.CENTER, p.CENTER);
        let displayText =
            nickname === "Anonymous" && !p.keyIsPressed
                ? "Anonymous"
                : nickname;
        if (nickname === "Anonymous" && !p.keyIsPressed) {
            p.fill(130, 130, 130);
        } else {
            p.fill(0);
        }
        p.text(displayText, p.width / 2, p.height * 0.583);

        p.fill(144, 238, 144, 200);
        p.rectMode(p.CENTER);
        let buttonWidth = p.width * 0.308;
        let buttonHeight = p.height * 0.1;
        p.rect(p.width / 2, p.height * 0.75, buttonWidth, buttonHeight, 10);
        p.fill(0);
        p.textSize(p.height * 0.06);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Submit", p.width / 2, p.height * 0.75);
    }

    // Draw game over screen
    function drawGameOverScreen() {
        p.image(backgroundImg, 0, 0, p.width, p.height);

        let monsterSize = p.width * 0.205;
        p.image(
            monsterImg1,
            p.width * 0.067,
            p.height * 0.08,
            monsterSize,
            monsterSize
        );
        p.image(
            monsterAnimSlow[0],
            p.width * 0.4,
            p.height * 0.08,
            monsterSize,
            monsterSize
        );
        p.image(
            monsterAnimFlying1[0],
            p.width * 0.72,
            p.height * 0.08,
            monsterSize,
            monsterSize
        );

        p.fill(0);
        p.textSize(p.height * 0.2);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Game Over", p.width / 2, p.height * 0.35);

        p.fill(0);
        p.textSize(p.height * 0.133);
        p.textFont(doodleJumpBoldFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Score: " + score, p.width / 2, p.height * 0.517);

        p.fill(0);
        p.textSize(p.height * 0.067);
        p.textFont(doodleJumpFont);
        p.text("Player: " + nickname, p.width / 2, p.height * 0.633);

        p.image(
            doodlerImg,
            p.width / 2 - doodlerSize * 1.5,
            p.height * 0.667,
            doodlerSize * 3,
            doodlerSize * 3
        );

        if (!gameOverSoundPlayed) {
            saveScoreToLeaderboard();
            if (gameOverSound && gameOverSound.readyState >= 2) {
                gameOverSound
                    .play()
                    .catch((err) => console.error("Error playing sound:", err));
                gameOverSoundPlayed = true;
            }
        }
    }

    // Save score to leaderboard
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
                localStorage.setItem(
                    "leaderboard",
                    JSON.stringify(leaderboard)
                );
                displayLeaderboard();
            });
    }

    // Display leaderboard
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
}

// Создаём экземпляр p5
console.log("p5.js loaded:", typeof p5 !== "undefined");
console.log("Creating p5 instance...");
const myp5 = new p5(sketch, "game-container");
