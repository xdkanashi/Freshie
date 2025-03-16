var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(600, 600);
        frameRate(60);
        smooth();

        textFont(createFont("Trebuchet MS"));

        var app;

        //manages the key/mouse states
        var pressed = false,
            clicked = false,
            hover = false,
            keys = [];
        mouseClicked = function () {
            clicked = true;
        };
        mousePressed = function () {
            pressed = true;
        };
        keyPressed = function () {
            keys[keyCode] = true;
        };
        keyReleased = function () {
            keys[keyCode] = false;
        };

        // Function to save score to Laravel backend
        var saveScoreToLeaderboard = function (score) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/leaderboard", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                // Try to safely get the CSRF token
                var csrfToken = null;
                var metaTag = document.querySelector('meta[name="csrf-token"]');
                if (metaTag) {
                    csrfToken = metaTag.getAttribute("content");
                    xhr.setRequestHeader("X-CSRF-TOKEN", csrfToken);
                } else {
                    console.warn("CSRF token not found in meta tag!");
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(
                                "Score saved successfully:",
                                xhr.responseText
                            );
                        } else {
                            console.error(
                                "Failed to save score:",
                                xhr.status,
                                xhr.responseText
                            );
                        }
                    }
                };

                var data = JSON.stringify({ score: score });
                xhr.send(data);
            } catch (error) {
                console.error("Error saving score to leaderboard:", error);
            }
        };

        //Button object
        var Button = (function () {
            var Button = function (args) {
                this.x = args.x;
                this.y = args.y;
                this.diameter = args.diameter || 120;
                this.content = args.content;
                this.textSize = args.textSize || this.diameter * 0.13;
                this.hover = false;
                this.action = args.action;
                this.backColor = args.backColor || color(242, 242, 242);
                this.textColor = args.textColor || color(242, 239, 242);
            };
            Button.prototype = {
                over: function () {
                    //check if the mouse is over the button
                    return (
                        dist(mouseX, mouseY, this.x, this.y) < this.diameter / 2
                    );
                },
                draw: function () {
                    //set hover based on mouse over the button
                    this.hover = this.over();

                    if (this.hover) {
                        hover = true;
                    }

                    pushMatrix();
                    translate(this.x, this.y);

                    fill(this.backColor, this.hover ? 200 : 255);
                    noStroke();
                    ellipse(0, 0, this.diameter, this.diameter);
                    fill(app.colors.stroke);
                    switch (this.content) {
                        case "play":
                            triangle(
                                this.diameter * 0.25,
                                0,
                                -this.diameter * 0.15,
                                -this.diameter * 0.25,
                                -this.diameter * 0.15,
                                this.diameter * 0.25
                            );
                            break;
                        case "sound":
                            pushStyle();
                            noStroke();
                            fill(app.colors.stroke);
                            triangle(
                                0,
                                -this.diameter * 0.3,
                                0,
                                this.diameter * 0.3,
                                -this.diameter * 0.3,
                                0
                            );
                            rect(
                                -this.diameter * 0.3,
                                -this.diameter * 0.1,
                                this.diameter * 0.3,
                                this.diameter * 0.2
                            );
                            if (app.sound) {
                                noFill();
                                stroke(app.colors.stroke);
                                strokeWeight(this.diameter / 20);
                                arc(
                                    this.diameter * 0.1,
                                    0,
                                    this.diameter * 0.2,
                                    this.diameter * 0.2,
                                    radians(-91),
                                    radians(90)
                                );
                                arc(
                                    this.diameter * 0.1,
                                    0,
                                    this.diameter * 0.4,
                                    this.diameter * 0.4,
                                    radians(-81),
                                    radians(80)
                                );
                            } else {
                                noFill();
                                stroke(app.colors.stroke);
                                strokeWeight(this.diameter / 20);
                                line(
                                    this.diameter * 0.1,
                                    -this.diameter * 0.1,
                                    this.diameter * 0.25,
                                    this.diameter * 0.1
                                );
                                line(
                                    this.diameter * 0.1,
                                    this.diameter * 0.1,
                                    this.diameter * 0.25,
                                    -this.diameter * 0.1
                                );
                            }
                            popStyle();
                            break;
                        case "leaders":
                            pushStyle();
                            noFill();
                            stroke(app.colors.stroke);
                            strokeWeight(this.diameter * 0.14);
                            strokeCap(SQUARE);
                            line(
                                0,
                                this.diameter * 0.25,
                                0,
                                -this.diameter * 0.3
                            );
                            line(
                                -this.diameter * 0.2,
                                this.diameter * 0.25,
                                -this.diameter * 0.2,
                                -this.diameter * 0.1
                            );
                            line(
                                this.diameter * 0.2,
                                this.diameter * 0.25,
                                this.diameter * 0.2,
                                -this.diameter * 0.2
                            );
                            popStyle();
                            break;
                        case "shop":
                            pushStyle();
                            noStroke();
                            fill(app.colors.stroke);
                            rect(
                                -this.diameter * 0.25,
                                -this.diameter * 0.25,
                                this.diameter * 0.5,
                                this.diameter * 0.5
                            );
                            fill(255, 100);
                            rect(
                                -this.diameter * 0.15,
                                -this.diameter * 0.15,
                                this.diameter * 0.1,
                                this.diameter * 0.15
                            );
                            rect(
                                this.diameter * 0.05,
                                -this.diameter * 0.15,
                                this.diameter * 0.1,
                                this.diameter * 0.15
                            );
                            popStyle();
                            break;
                        case "home":
                            pushStyle();
                            beginShape();
                            vertex(this.diameter * 0.25, 0); //1
                            vertex(this.diameter * 0.25, this.diameter * 0.25); //2
                            vertex(this.diameter * 0.07, this.diameter * 0.25); //3
                            vertex(this.diameter * 0.07, this.diameter * 0.12); //4
                            vertex(-this.diameter * 0.07, this.diameter * 0.12); //5
                            vertex(-this.diameter * 0.07, this.diameter * 0.25); //6
                            vertex(-this.diameter * 0.25, this.diameter * 0.25); //7
                            vertex(-this.diameter * 0.25, 0); //8
                            vertex(0, -this.diameter * 0.2); //9
                            vertex(this.diameter * 0.25, 0); //10
                            endShape();
                            noFill();
                            stroke(app.colors.stroke);
                            strokeWeight(this.diameter * 0.05);
                            line(
                                -this.diameter * 0.27,
                                -this.diameter * 0.05,
                                0,
                                -this.diameter * 0.27
                            );
                            line(
                                this.diameter * 0.27,
                                -this.diameter * 0.05,
                                0,
                                -this.diameter * 0.27
                            );
                            line(
                                this.diameter * 0.15,
                                -this.diameter * 0.19,
                                this.diameter * 0.15,
                                -this.diameter * 0.25
                            );
                            popStyle();
                            break;
                        case "replay":
                            pushStyle();
                            noFill();
                            stroke(app.colors.stroke);
                            strokeWeight(5);
                            pushMatrix();
                            rotate(radians(frameCount * 3));
                            arc(
                                0,
                                0,
                                this.diameter * 0.6,
                                this.diameter * 0.6,
                                0,
                                radians(275)
                            );
                            noStroke();
                            fill(app.colors.stroke);
                            translate(
                                this.diameter * 0.3,
                                -this.diameter * 0.18
                            );
                            rotate(radians(-70));
                            triangle(
                                0,
                                -this.diameter * 0.1,
                                -this.diameter * 0.14,
                                -this.diameter * 0.3,
                                this.diameter * 0.14,
                                -this.diameter * 0.3
                            );
                            popMatrix();
                            popStyle();
                            break;
                        case "how":
                            pushStyle();
                            textAlign(CENTER, CENTER);
                            textFont(this.diameter * 0.7);
                            text("?", 0, 0);
                            popStyle();
                            break;
                        default:
                            pushStyle();
                            textAlign(CENTER, CENTER);
                            text(this.content, 0, 0);
                            popStyle();
                    }
                    popMatrix();

                    //if button is clicked then run the function argument
                    if (clicked && this.hover) {
                        this.action();
                    }
                },
            };
            return Button;
        })();

        //Player object
        var Player = (function () {
            var Player = function () {
                this.x = 275;
                this.y = 400;
                this.px = 275;
                this.py = 400;
                this.w = 40;
                this.h = 40;
                this.color = color(227, 211, 134);
                this.state = 0; //0 = normal, 1 = lava
                this.mouth = {
                    value: 0,
                    max: 3,
                };
                this.eyes = {
                    value: 0,
                    max: 3,
                };
                this.vx = 0;
                this.vy = 0;
                this.dir = random() < 0.5 ? 1 : -1;
                this.gravity = 0.1;
                this.ymin = 400;
                this.angle = 0;
            };
            Player.prototype = {
                draw: function () {
                    switch (this.state) {
                        case 1: //hit lava state
                            fill(50);
                            break;
                        default:
                            fill(this.color);
                    }
                    pushStyle();
                    noStroke();
                    strokeWeight(1);
                    stroke(250, 200);
                    noStroke();
                    //tenticles
                    ellipse(
                        this.x + this.w * 0.25,
                        this.y + this.h * 0.9,
                        this.w * 0.25,
                        this.h * 0.5
                    );
                    ellipse(
                        this.x + this.w * 0.5,
                        this.y + this.h * 0.9,
                        this.w * 0.25,
                        this.h * 0.5
                    );
                    ellipse(
                        this.x + this.w * 0.75,
                        this.y + this.h * 0.9,
                        this.w * 0.25,
                        this.h * 0.5
                    );

                    //body
                    strokeWeight(1);
                    stroke(250, 200);
                    rect(this.x, this.y, this.w, this.h, 8, 8, 5, 5);

                    //eyes
                    switch (this.eyes.value) {
                        case 0:
                            noStroke();
                            fill(255);
                            ellipse(
                                this.x + this.w * 0.3,
                                this.y + this.h * 0.35,
                                this.w * 0.35,
                                this.w * 0.35
                            );
                            ellipse(
                                this.x + this.w * 0.7,
                                this.y + this.h * 0.35,
                                this.w * 0.35,
                                this.w * 0.35
                            );
                            fill(40);
                            ellipse(
                                this.x + this.w * 0.31,
                                this.y + this.h * 0.34,
                                this.w * 0.17,
                                this.w * 0.19
                            );
                            ellipse(
                                this.x + this.w * 0.69,
                                this.y + this.h * 0.34,
                                this.w * 0.17,
                                this.w * 0.19
                            );
                            break;
                        case 1:
                            noFill();
                            stroke(50, 200);
                            strokeWeight(3);
                            arc(
                                this.x + this.w * 0.3,
                                this.y + this.h * 0.41,
                                this.w * 0.25,
                                this.w * 0.3,
                                radians(180),
                                radians(360)
                            );
                            arc(
                                this.x + this.w * 0.7,
                                this.y + this.h * 0.41,
                                this.w * 0.25,
                                this.w * 0.3,
                                radians(180),
                                radians(360)
                            );
                            break;
                        case 2:
                            noFill();
                            stroke(50, 200);
                            strokeWeight(4);
                            line(
                                this.x + this.w * 0.33,
                                this.y + this.h * 0.25,
                                this.x + this.w * 0.33,
                                this.y + this.h * 0.45
                            );
                            line(
                                this.x + this.w * 0.67,
                                this.y + this.h * 0.25,
                                this.x + this.w * 0.67,
                                this.y + this.h * 0.45
                            );
                            break;
                        case 3:
                            //dead eyes
                            noFill();
                            stroke(50, 200);
                            strokeWeight(2);
                            line(
                                this.x + this.w * 0.3,
                                this.y + this.h * 0.27,
                                this.x + this.w * 0.4,
                                this.y + this.h * 0.43
                            );
                            line(
                                this.x + this.w * 0.4,
                                this.y + this.h * 0.27,
                                this.x + this.w * 0.3,
                                this.y + this.h * 0.43
                            );
                            line(
                                this.x + this.w * 0.57,
                                this.y + this.h * 0.27,
                                this.x + this.w * 0.67,
                                this.y + this.h * 0.43
                            );
                            line(
                                this.x + this.w * 0.67,
                                this.y + this.h * 0.27,
                                this.x + this.w * 0.57,
                                this.y + this.h * 0.43
                            );
                            break;
                    }

                    //mouth
                    switch (this.mouth.value) {
                        case 0:
                            strokeWeight(3);
                            stroke(50, 200);
                            line(
                                this.x + this.w * 0.35,
                                this.y + this.h * 0.75,
                                this.x + this.w * 0.65,
                                this.y + this.h * 0.75
                            );
                            break;
                        case 1:
                            noStroke();
                            fill(50, 200);
                            ellipse(
                                this.x + this.w / 2,
                                this.y + this.h * 0.75,
                                this.w * 0.2,
                                this.w * 0.2
                            );
                            break;
                        case 2:
                            noStroke();
                            fill(50, 200);
                            arc(
                                this.x + this.w / 2,
                                this.y + this.h * 0.7,
                                this.w * 0.3,
                                this.w * 0.25,
                                0,
                                radians(180)
                            );
                            break;
                    }
                    popStyle();
                },
                update: function () {
                    //not implemented within the player prototype
                },
                run: function () {
                    this.update();
                    this.draw();
                },
            };
            return Player;
        })();

        //Transition object
        var Transition = function () {
            this.h = 0;
            this.vy = 15;
            this.active = false;
            this.scene = "home";
            this.reset = function () {
                this.h = 0;
                this.vy = 15;
            };
            this.draw = function () {
                pushStyle();
                stroke(app.colors.stroke, 250);
                strokeWeight(30);
                fill(app.colors.blockColor[0]);

                rect(-20, -20, width + 40, this.h);
                rect(-20, height - this.h, width + 40, this.h + 20);
                strokeWeight(1);
                popStyle();
            };
            this.update = function () {
                this.h += this.vy;

                //if halfway down the screen then change the scene
                if (this.h >= height / 2) {
                    app.scene = this.scene;

                    if (this.scene === "play") {
                        app.reset();
                    }
                    this.vy *= -1;
                }
                //else if it's completely off the screen reset it and set to inactive
                else if (this.h < 0) {
                    this.reset();
                    this.active = false;
                }
            };
            this.run = function () {
                if (this.active) {
                    this.draw();
                    this.update();
                }
            };
        };

        //App object (runs the game)
        var App = (function () {
            var App = function () {
                this.scene = "load";
                this.start = false;
                this.player = new Player();
                this.transition = new Transition();

                this.theme = 0;
                this.themes = [
                    {
                        backColor: color(35, 205, 255),
                        blockColor: [color(40, 120, 130), color(30, 110, 120)],
                        stroke: color(20, 100, 110),
                        playerColor: color(230, 141, 240),
                        images: [],
                    },
                    {
                        backColor: color(235, 95, 125),
                        blockColor: [color(150, 50, 70), color(115, 50, 65)],
                        stroke: color(105, 40, 55),
                        playerColor: color(144, 222, 113),
                        images: [],
                    },
                    {
                        backColor: color(180, 210, 130),
                        blockColor: [color(70, 120, 75), color(60, 90, 60)],
                        stroke: color(50, 80, 50),
                        playerColor: color(235, 225, 80),
                        images: [],
                    },
                ];
                this.colors = this.themes[this.theme];
                this.images = undefined;
                this.imageIndex = 0;
                this.loaded = false;
                this.sound = false;
                this.sounds = {
                    lava: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/rpg/water-bubble.mp3"
                    ),
                    bird: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/rpg/giant-yah.mp3"
                    ),
                    spike: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/rpg/giant-hyah.mp3"
                    ),
                    wall: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/rpg/hit-thud.mp3"
                    ),
                    lazer: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/retro/laser2.mp3"
                    ),
                    star: this.addSound(
                        "https://www.kasandbox.org/programming-sounds/rpg/metal-chime.mp3"
                    ),
                    birdCollect: this.addSound(
                        "https://assets.codepen.io/5126815/sound-game-start.mp3"
                    ),
                };
                // this.sounds = {
                //     lava: getSound("rpg/water-bubble"),
                //     bird: getSound("rpg/giant-yah"),
                //     spike: getSound("rpg/giant-hyah"),
                //     wall: getSound("rpg/hit-thud"),
                //     lazer: getSound("retro/laser2"),
                //     star: getSound("rpg/metal-chime"),
                // };
                this.shake = 0;
                this.shakedown = 0.1;
                this.cam = {
                    x: 0,
                    y: 0,
                };
                this.inventory = {
                    stars: 0,
                };
                this.score = {
                    value: 0,
                    best: 0,
                };
                this.stats = {
                    games: 0,
                };
                this.fonts = {
                    title: createFont("Trebuchet MS Bold"),
                    content: createFont("Trebuchet MS"),
                };
                this.anim = {
                    over: {
                        value: -600,
                        base: -600,
                        angle: 0,
                    },
                };
                this.parallax = {
                    back: {
                        y1: 0,
                        y2: 899,
                        speed: 0.25,
                    },
                };
                this.lava = {
                    x1: -50,
                    y1: height - 40,
                    cx1: 200,
                    cy1: height - 40,
                    cx2: 400,
                    cy2: height - 40,
                    x2: width + 50,
                    y2: height - 40,
                    h: 200,
                    arr: [],
                };
                this.blocks = [];
                this.centerBlocks = [];
                this.spikes = [];
                this.lazers = [];
                this.enemies = [];
                this.deadEnemies = [];
                this.smokes = [];
                this.bubbles = [];
                this.fishes = [];
                this.particles = [];
                this.starImages = [];
                this.stars = [];
                this.assetImages = [];
                this.assets = [];
                this.dead = false;
                this.grid = {
                    y1: 0,
                    y2: -599,
                };
                this.scoreSaved = false; // Flag to ensure score is saved only once
                this.buttons = {
                    menu: {
                        play: new Button({
                            x: width / 2,
                            y: 300,
                            diameter: 150,
                            content: "play",
                            action: function () {
                                app.transition.scene = "play";
                                app.transition.active = true;
                            },
                        }),
                        sound: new Button({
                            x: width / 2 + 70,
                            y: 435,
                            content: "sound",
                            action: function () {
                                app.sound = !app.sound;
                            },
                        }),
                    },
                    over: {
                        home: new Button({
                            x: width / 2 - 60,
                            y: 460,
                            diameter: 100,
                            content: "home",
                            action: function () {
                                if (app.dead) {
                                    app.transition.scene = "home";
                                    app.transition.active = true;
                                }
                            },
                        }),
                        replay: new Button({
                            x: width / 2,
                            y: 320,
                            diameter: 130,
                            content: "replay",
                            action: function () {
                                if (app.dead) {
                                    app.transition.scene = "play";
                                    app.transition.active = true;
                                }
                            },
                        }),
                    },
                };
                this.init();
            };
            App.prototype = {
                addSound: function (src) {
                    var sound = document.createElement("audio");
                    sound.src = src;
                    sound.setAttribute("preload", "auto");
                    sound.setAttribute("controls", "none");
                    sound.style.display = "none";
                    document.body.appendChild(sound);
                    return sound;
                },
                setBlocks: function () {
                    //initializes the blocks at the start of each game
                    this.blocks.length = 0;
                    this.centerBlocks.length = 0;

                    var y = height + 300;

                    for (var i = 0; i < 8; i++) {
                        var h = random(100, 250);

                        var blockColor =
                            this.colors.blockColor[
                                random(this.colors.blockColor.length) | 0
                            ];

                        this.blocks.push({
                            x: -310,
                            y: y - h,
                            w: 300 + random(20, 250),
                            h: h,
                            color: blockColor,
                            image: this.colors.images[
                                random(this.colors.images.length) | 0
                            ],
                        });

                        var w = random(20, 250);

                        this.blocks.push({
                            x: width - w + 10,
                            y: y - h,
                            w: w + 300,
                            h: h,
                            color: blockColor,
                            image: this.colors.images[
                                random(this.colors.images.length) | 0
                            ],
                        });

                        //add random plants on the left
                        if (random() < 0.3) {
                            var b1 = this.blocks[this.blocks.length - 2];
                            var asset1 =
                                this.assetImages[
                                    random(this.assetImages.length) | 0
                                ];

                            this.assets.push({
                                x: b1.x + b1.w - asset1.width / 2,
                                y: random(
                                    b1.y + asset1.height,
                                    b1.y + b1.h - asset1.height
                                ),
                                image: asset1,
                            });
                        }
                        //add random plants on the right
                        if (random() < 0.3) {
                            var b2 = this.blocks[this.blocks.length - 1];
                            var asset2 =
                                this.assetImages[
                                    random(this.assetImages.length) | 0
                                ];

                            this.assets.push({
                                x: b2.x - asset2.width / 2,
                                y: random(
                                    b2.y + asset2.height,
                                    b2.y + b2.h - asset2.height
                                ),
                                image: asset2,
                            });
                        }

                        y -= h;
                    }
                },
                outlineText: function (args) {
                    //creates text with an outline color
                    textSize(args.textSize);
                    fill(args.stroke);
                    for (var i = 0; i < 360; i += 30) {
                        text(
                            args.text,
                            args.x + sin(radians(i)) * (args.strokeWeight || 2),
                            args.y + cos(radians(i)) * (args.strokeWeight || 2)
                        );
                    }
                    fill(args.fill);
                    text(args.text, args.x, args.y);
                },
                generateBlock: function (blockColor, strokeColor) {
                    //gets an image of the blocks used in the game
                    background(0, 0, 0, 0);

                    pushMatrix();
                    translate(25, 50);

                    pushStyle();
                    fill(blockColor);
                    stroke(strokeColor);
                    strokeWeight(3);

                    rect(0, 0, 550, 250, 10);

                    noStroke();
                    fill(0, 10);

                    for (var i = 0; i < 10; i++) {
                        var w = random(50, 300);
                        var h = random(50, 200);

                        rect(random(0, 550 - w), random(0, 250 - h), w, h, 10);
                    }
                    popStyle();
                    popMatrix();

                    return get(23, 48, 554, 254);
                },
                star: function (x, y, inner, outer, sides) {
                    //gets an image of the stars used in the game
                    var rot = 360 / sides;
                    pushMatrix();
                    translate(x, y);
                    rotate(radians(270));
                    beginShape();
                    for (var angle = 0; angle < 360; angle += rot / 2) {
                        vertex(
                            cos(radians(angle)) *
                                (angle % rot === 0 ? outer : inner),
                            sin(radians(angle)) *
                                (angle % rot === 0 ? outer : inner)
                        );
                    }
                    endShape(CLOSE);
                    popMatrix();
                },
                init: function () {
                    //add initial bubbles
                    for (var i = 0; i < 15; i++) {
                        this.bubbles.push({
                            x: random(width),
                            y: random(height),
                            vx: random(0.3, 1) * (random() < 0.5 ? 1 : -1),
                            vy: random(-0.7, -0.3),
                            diameter: random(10, 20),
                            opacity: random(50, 100),
                            dir: random() < 0.5 ? 1 : -1,
                            offset: random(360) | 0,
                        });
                    }

                    //add initial fishes
                    for (var i = 0; i < 10; i++) {
                        this.fishes.push({
                            x: random(width),
                            y: random(height - 50),
                            diameter: random(20, 30),
                            vx: random(0.5, 2),
                            vy: 0,
                            dir: random() < 0.5 ? 1 : -1,
                            speed: random(0.5, 2),
                        });
                    }

                    //generate block images
                    this.themes[0].images.push(
                        this.generateBlock(
                            this.themes[0].blockColor[0],
                            this.themes[0].stroke
                        )
                    );
                    this.themes[0].images.push(
                        this.generateBlock(
                            this.themes[0].blockColor[0],
                            this.themes[0].stroke
                        )
                    );
                    this.themes[0].images.push(
                        this.generateBlock(
                            this.themes[0].blockColor[1],
                            this.themes[0].stroke
                        )
                    );
                    this.themes[0].images.push(
                        this.generateBlock(
                            this.themes[0].blockColor[1],
                            this.themes[0].stroke
                        )
                    );

                    this.themes[1].images.push(
                        this.generateBlock(
                            this.themes[1].blockColor[0],
                            this.themes[1].stroke
                        )
                    );
                    this.themes[1].images.push(
                        this.generateBlock(
                            this.themes[1].blockColor[0],
                            this.themes[1].stroke
                        )
                    );
                    this.themes[1].images.push(
                        this.generateBlock(
                            this.themes[1].blockColor[1],
                            this.themes[1].stroke
                        )
                    );
                    this.themes[1].images.push(
                        this.generateBlock(
                            this.themes[1].blockColor[1],
                            this.themes[1].stroke
                        )
                    );

                    this.themes[2].images.push(
                        this.generateBlock(
                            this.themes[2].blockColor[0],
                            this.themes[2].stroke
                        )
                    );
                    this.themes[2].images.push(
                        this.generateBlock(
                            this.themes[2].blockColor[0],
                            this.themes[2].stroke
                        )
                    );
                    this.themes[2].images.push(
                        this.generateBlock(
                            this.themes[2].blockColor[1],
                            this.themes[2].stroke
                        )
                    );
                    this.themes[2].images.push(
                        this.generateBlock(
                            this.themes[2].blockColor[1],
                            this.themes[2].stroke
                        )
                    );

                    //add images
                    this.images = {
                        heading: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            textAlign(CENTER, CENTER);
                            textFont(app.fonts.title);

                            app.outlineText({
                                text: "GO GO",
                                x: width / 2,
                                y: 50,
                                textSize: 100,
                                fill: color(255, 240),
                                stroke: color(50, 100),
                                strokeWeight: 5,
                            });
                            popStyle();

                            return get(0, 0, width, 150);
                        },
                        store: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            textAlign(CENTER, CENTER);
                            textFont(app.fonts.title);

                            app.outlineText({
                                text: "Store",
                                x: width / 2,
                                y: 50,
                                textSize: 70,
                                fill: color(255, 240),
                                stroke: app.colors.stroke,
                                strokeWeight: 5,
                            });
                            popStyle();

                            return get(0, 0, width, 150);
                        },

                        spike: function () {
                            background(0, 0, 0, 0);

                            pushMatrix();
                            translate(300, 300);
                            pushStyle();
                            fill(50);
                            stroke(209, 209, 209);
                            strokeWeight(3);

                            beginShape();
                            for (var angle = 0; angle < 360; angle += 30) {
                                var dx = cos(radians(angle));
                                var dy = sin(radians(angle));

                                var dxOuter = cos(radians(angle + 15));
                                var dyOuter = sin(radians(angle + 15));

                                vertex(dx * 25, dy * 25);
                                vertex(dxOuter * 45, dyOuter * 45);
                            }
                            endShape(CLOSE);
                            popStyle();
                            popMatrix();

                            return get(250, 250, 100, 100);
                        },
                        back: function () {
                            var gx = createGraphics(600, 900, P2D);

                            gx.background(0, 0, 0, 0);

                            gx.pushStyle();
                            gx.noStroke();
                            gx.fill(0, 4);

                            for (var i = 0; i < 20; i++) {
                                var diameter = random(30, 300);

                                gx.ellipse(
                                    random(width),
                                    random(diameter / 2, 900 - diameter / 2),
                                    diameter,
                                    diameter
                                );
                            }
                            gx.popStyle();

                            return gx.get();
                        },
                        plant1: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            strokeWeight(8);
                            stroke(70, 180, 35);

                            pushMatrix();
                            translate(300, 300);

                            var diameter = 25;

                            for (var i = 0; i < 360; i += 30) {
                                rotate(radians(30));
                                line(0, 0, diameter, 0);
                            }
                            popMatrix();
                            popStyle();

                            return get(270, 270, 60, 60);
                        },
                        plant2: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            strokeWeight(8);
                            stroke(193, 133, 204);

                            pushMatrix();
                            translate(300, 300);

                            var diameter = 25;

                            for (var i = 0; i < 360; i += 30) {
                                rotate(radians(30));
                                line(0, 0, diameter, 0);
                            }
                            popMatrix();
                            popStyle();

                            return get(270, 270, 60, 60);
                        },
                        plant3: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            strokeWeight(8);
                            stroke(70, 180, 35);

                            pushMatrix();
                            translate(300, 300);

                            var diameter = 30;

                            for (var i = 0; i < 360; i += 180) {
                                rotate(radians(180));
                                line(0, 0, diameter, 0);
                                line(
                                    diameter * 0.3,
                                    -diameter * 0.4,
                                    diameter * 1.2,
                                    -diameter * 0.4
                                );
                                line(
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    diameter * 0.8,
                                    diameter * 0.4
                                );
                                line(
                                    diameter * 0.3,
                                    -diameter * 0.4,
                                    diameter * 0.3,
                                    0
                                );
                                line(
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    0
                                );
                            }
                            popMatrix();
                            popStyle();

                            return get(260, 280, 80, 40);
                        },
                        plant4: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            strokeWeight(8);
                            stroke(193, 133, 204);

                            pushMatrix();
                            translate(300, 300);

                            var diameter = 30;

                            for (var i = 0; i < 360; i += 180) {
                                rotate(radians(180));
                                line(0, 0, diameter, 0);
                                line(
                                    diameter * 0.3,
                                    -diameter * 0.4,
                                    diameter * 1.2,
                                    -diameter * 0.4
                                );
                                line(
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    diameter * 0.8,
                                    diameter * 0.4
                                );
                                line(
                                    diameter * 0.3,
                                    -diameter * 0.4,
                                    diameter * 0.3,
                                    0
                                );
                                line(
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    diameter * 0.4,
                                    0
                                );
                            }
                            popMatrix();
                            popStyle();

                            return get(260, 280, 80, 40);
                        },
                        star1: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            stroke(255, 200);
                            strokeWeight(6);
                            fill(237, 150, 107);

                            app.star(300, 300, 55, 100, 5);

                            strokeWeight(8);
                            stroke(50, 200);
                            line(280, 270, 280, 285);
                            line(320, 270, 320, 285);
                            popStyle();

                            return get(200, 190, 200, 200);
                        },
                        star2: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            stroke(255, 200);
                            strokeWeight(6);
                            fill(240, 115, 209);

                            app.star(300, 300, 55, 100, 5);

                            strokeWeight(8);
                            stroke(50, 200);
                            line(280, 270, 280, 285);
                            line(320, 270, 320, 285);
                            popStyle();

                            return get(200, 190, 200, 200);
                        },
                        star3: function () {
                            background(0, 0, 0, 0);

                            pushStyle();
                            stroke(255, 200);
                            strokeWeight(6);
                            fill(83, 189, 224);

                            app.star(300, 300, 55, 100, 5);

                            strokeWeight(8);
                            stroke(50, 200);
                            line(280, 270, 280, 285);
                            line(320, 270, 320, 285);
                            popStyle();

                            return get(200, 190, 200, 200);
                        },
                    };
                },
                load: function (s) {
                    //loads the images before the game starts
                    var obj = Object.keys(this.images);
                    this.images[obj[this.imageIndex]] =
                        this.images[obj[this.imageIndex]]();
                    this.imageIndex++;

                    background(this.colors.blockColor[1]);
                    pushStyle();
                    fill(250);
                    textAlign(CENTER, CENTER);
                    textSize(40);
                    text("LOADING", width / 2, height / 2);
                    noFill();
                    stroke(250);
                    strokeCap(SQUARE);
                    strokeWeight(15);
                    arc(
                        width / 2,
                        height / 2,
                        height / 2,
                        height / 2,
                        0,
                        map(this.imageIndex / obj.length, 0, 1, 0, radians(360))
                    );
                    strokeWeight(1);
                    popStyle();

                    if (this.imageIndex < obj.length) {
                        this.loaded = false;
                    } else {
                        //add plant images to plants array
                        this.assetImages.push(this.images.plant1);
                        this.assetImages.push(this.images.plant2);
                        this.assetImages.push(this.images.plant3);
                        this.assetImages.push(this.images.plant4);

                        //add star images
                        this.starImages.push(this.images.star1);
                        this.starImages.push(this.images.star2);
                        this.starImages.push(this.images.star3);

                        //set the initial blocks
                        this.setBlocks();

                        this.loaded = true;
                        this.scene = s;
                    }
                },
                resetBubbles: function () {
                    //resets the bubbles ready for a new game
                    for (var i = 0; i < this.bubbles.length; i++) {
                        this.bubbles[i].x = random(width);
                        this.bubbles[i].y = random(height);
                    }
                },
                reset: function () {
                    //resets all game parameters before each game
                    this.stars.length = 0;
                    this.spikes.length = 0;
                    this.lazers.length = 0;
                    this.enemies.length = 0;
                    this.deadEnemies.length = 0;
                    this.smokes.length = 0;
                    this.particles.length = 0;
                    this.assets.length = 0;
                    this.score.value = 0;
                    this.start = false;
                    this.player.x = 275;
                    this.player.y = 400;
                    this.player.vx = 0;
                    this.player.vy = 0;
                    this.player.ymin = 400;
                    this.player.state = 0;
                    this.player.eyes.value = 0;
                    this.player.mouth.value = 0;
                    this.anim.over.value = this.anim.over.base;
                    this.dead = false;
                    this.shake = 0;
                    this.theme = random(this.themes.length) | 0;
                    this.colors = this.themes[this.theme];
                    this.resetBubbles();
                    this.scoreSaved = false;
                    this.setBlocks();
                },
                rectCircleCollision: function (player, circle) {
                    //checks for rectangle to circle collision
                    var closestX = constrain(
                        circle.x,
                        player.x,
                        player.x + player.w
                    );
                    var closestY = constrain(
                        circle.y,
                        player.y,
                        player.y + player.h
                    );
                    return (
                        dist(circle.x, circle.y, closestX, closestY) <=
                        circle.diameter / 2
                    );
                },
                rectRectCollision: function (player, rectangle) {
                    //checks for rectangle to rectangle collision
                    return (
                        player.x < rectangle.x + rectangle.w &&
                        player.x + player.w > rectangle.x &&
                        player.y < rectangle.y + rectangle.h &&
                        player.y + player.h > rectangle.y
                    );
                },
                collisionBlocks: function (dir, blocks) {
                    //checks to see if the player collided with the blocks
                    for (var i = 0; i < blocks.length; i++) {
                        var block = blocks[i];

                        //if player collided with block
                        if (this.rectRectCollision(this.player, block)) {
                            //check horizontal collision
                            if (dir === "horizontal") {
                                if (this.player.vx > 0) {
                                    this.player.x = block.x - this.player.w;
                                } else {
                                    this.player.x = block.x + block.w;
                                }

                                this.player.dir *= -1;
                                this.player.vx = -this.player.vx;
                            }
                            //check vertical collision
                            else {
                                if (this.player.vy > 0) {
                                    this.player.y = block.y - this.player.h;
                                    this.player.vy = -2;
                                } else {
                                    this.player.y = block.y + block.h;
                                    this.player.vy = 0;
                                }
                            }

                            //shake the screen slightly if collide with a block
                            this.shake = 7;

                            //randomly update the eyes and mouth of the player
                            this.player.eyes.value =
                                random(this.player.eyes.max) | 0;
                            this.player.mouth.value =
                                random(this.player.mouth.max) | 0;

                            //play a sound if collide
                            if (this.sound) {
                                this.sounds.wall.pause();
                                this.sounds.wall.currentTime = 0;
                                this.sounds.wall.play();
                            }

                            break;
                        }
                    }
                },
                movePlayer: function () {
                    //if the mouse is pressed
                    if (pressed) {
                        //if not yet started and at the bottom of the screen just above the lava
                        if (!this.start && this.cam.y < 30) {
                            //start the game and increment number of games played
                            this.start = true;
                            this.stats.games++;
                        }

                        //move the player horizontally in the current direction
                        this.player.vx = constrain(
                            this.player.vx + 0.5 * this.player.dir,
                            -3,
                            3
                        );

                        //move the player vertically (upwards)
                        if (this.player.vy > 0) {
                            this.player.vy = 0;
                        }
                        this.player.vy = constrain(
                            this.player.vy - 3,
                            -8,
                            this.player.h * 0.25
                        );
                    }

                    //if the game started
                    if (this.start) {
                        //store the previous x and y coordinates
                        this.player.px = this.player.x;
                        this.player.py = this.player.y;

                        //move the player horizontally
                        this.player.x += this.player.vx;

                        //check for horizontal collisions with the blocks and center blocks
                        this.collisionBlocks("horizontal", this.blocks);
                        this.collisionBlocks("horizontal", this.centerBlocks);

                        //move the player vertically (up)
                        this.player.vy = constrain(
                            this.player.vy + this.player.gravity,
                            -8,
                            this.player.h * 0.25
                        );
                        this.player.y += this.player.vy;

                        //check for vertical collisions with the blocks and center blocks
                        this.collisionBlocks("vertical", this.blocks);
                        this.collisionBlocks("vertical", this.centerBlocks);

                        //update the current y position of the player for the camera movement
                        this.player.ymin = min(this.player.ymin, this.player.y);

                        //add a player particle every 5 frames
                        if (frameCount % 5 === 0) {
                            this.particles.push({
                                x: this.player.x + this.player.w / 2,
                                y: this.player.y + this.player.h / 2,
                                diameter: this.player.w * 0.4,
                                vx: random(-0.5, 0.5),
                                vy: random(-0.5, 0.5),
                                gravity: 0,
                                color: color(225),
                                opacity: random(200, 240),
                                angle: random(360) | 0,
                                rot: random(-2, 2),
                            });
                        }
                    }
                },
                updateBestScore: function () {
                    //update the best score using max of current and best scores
                    this.score.best = max(this.score.best, this.score.value);
                },
                addSmoke: function () {
                    //add smoke when hit the lava
                    for (var i = 0; i < 30; i++) {
                        this.smokes.push({
                            x: random(
                                this.player.x,
                                this.player.x + this.player.w
                            ),
                            y: random(
                                this.player.y,
                                this.player.y + this.player.h
                            ),
                            vx: random(-0.5, 0.5),
                            vy: random(-1, -0.5),
                            color: random(50, 80),
                            diameter: 15,
                            opacity: random(180, 230) | 0,
                        });
                    }
                },
                runSmoke: function () {
                    //display and move the smoke
                    noStroke();
                    for (var i = this.smokes.length - 1; i >= 0; i--) {
                        var smoke = this.smokes[i];

                        fill(smoke.color, smoke.opacity);
                        rect(
                            smoke.x,
                            smoke.y,
                            smoke.diameter,
                            smoke.diameter,
                            2
                        );

                        smoke.x += smoke.vx;
                        smoke.y += smoke.vy;
                        smoke.opacity = constrain(smoke.opacity - 2, 0, 255);

                        //if the opacity is zero then remove the smoke
                        if (smoke.opacity === 0) {
                            this.smokes.splice(i, 1);
                        }
                    }
                },
                addPlayerExplosion: function () {
                    //add 15 particles (player explosion)
                    for (var i = 0; i < 15; i++) {
                        this.particles.push({
                            x: this.player.x + this.player.w / 2,
                            y: this.player.y + this.player.h / 2,
                            diameter: this.player.w * 0.4,
                            vx: random(-2, 2),
                            vy: random(-8, -5),
                            gravity: 0.2,
                            color: color(84, 84, 84),
                            opacity: random(220, 250),
                            angle: random(360) | 0,
                            rot: random(-4, 4),
                        });
                    }
                },
                runBubbles: function () {
                    //display and move the bubbles
                    noStroke();

                    for (var i = this.bubbles.length - 1; i >= 0; i--) {
                        var bubble = this.bubbles[i];

                        fill(255, bubble.opacity);
                        ellipse(
                            bubble.x,
                            bubble.y,
                            bubble.diameter,
                            bubble.diameter
                        );

                        bubble.x +=
                            sin(radians(frameCount + bubble.offset)) *
                            bubble.vx;
                        bubble.y += bubble.vy;

                        //reuse the bubbles
                        if (bubble.dir === 1) {
                            bubble.opacity = constrain(
                                bubble.opacity - 0.5,
                                0,
                                150
                            );
                            if (bubble.opacity === 0) {
                                bubble.dir *= -1;
                            }
                        } else {
                            bubble.opacity = constrain(
                                bubble.opacity + 0.5,
                                0,
                                150
                            );
                            if (bubble.opacity === 150) {
                                bubble.dir *= -1;
                            }
                        }

                        if (
                            bubble.y - bubble.diameter >
                            this.player.ymin + 400
                        ) {
                            bubble.y -= 800;
                        } else if (
                            bubble.y + bubble.diameter <
                            this.player.ymin - 400
                        ) {
                            bubble.y += 800;
                        }
                    }
                },
                runFishes: function () {
                    //display and move the fishes
                    noStroke();
                    fill(50, 50);

                    for (var i = 0; i < this.fishes.length; i++) {
                        var fish = this.fishes[i];

                        pushMatrix();
                        translate(
                            fish.x,
                            fish.y + sin(radians(frameCount * fish.speed)) * 20
                        );
                        rotate(radians(fish.dir === 1 ? 0 : 180));
                        ellipse(0, 0, fish.diameter, fish.diameter * 0.7);
                        triangle(
                            -fish.diameter * 0.4,
                            0,
                            -fish.diameter * 0.7,
                            -fish.diameter * 0.3,
                            -fish.diameter * 0.7,
                            fish.diameter * 0.3
                        );
                        popMatrix();

                        fish.x += fish.vx * fish.dir;

                        //if fish go off the screen then reset them
                        if (
                            (fish.dir === 1 &&
                                fish.x - fish.diameter > width) ||
                            (fish.dir === -1 && fish.x + fish.diameter < 0)
                        ) {
                            var dir = random() < 0.5 ? 1 : -1;

                            if (dir === 1) {
                                fish.x = -fish.diameter;
                            } else {
                                fish.x = width + fish.diameter;
                            }
                            fish.y = random(height - 50) - this.player.ymin;
                        } else if (
                            fish.y - fish.diameter >
                            this.player.ymin + 400
                        ) {
                            fish.y -= 800;
                        } else if (
                            fish.y + fish.diameter <
                            this.player.ymin - 400
                        ) {
                            fish.y += 800;
                        }
                    }
                },
                checkCollisions: function () {
                    //check collisions with the stars
                    for (var i = this.stars.length - 1; i >= 0; i--) {
                        var star = this.stars[i];

                        if (this.rectCircleCollision(this.player, star)) {
                            this.inventory.stars++;
                            this.score.value += 5;
                            this.stars.splice(i, 1);

                            if (this.sound) {
                                this.sounds.star.pause();
                                this.sounds.star.currentTime = 0;
                                this.sounds.star.play();
                            }
                        }
                    }

                    var collided = false;

                    //check collision with spikes
                    for (var i = this.spikes.length - 1; i >= 0; i--) {
                        var spike = this.spikes[i];

                        if (this.rectCircleCollision(this.player, spike)) {
                            collided = true;
                            this.updateBestScore();
                            this.addPlayerExplosion();
                            this.player.vy = -10;
                            this.player.eyes.value = 3;
                            this.player.mouth.value = 0;
                            this.shake = 25;
                            this.scene = "gameover";

                            if (this.sound) {
                                this.sounds.spike.pause();
                                this.sounds.spike.currentTime = 0;
                                this.sounds.spike.play();
                            }

                            break;
                        }
                    }

                    //if not collided check collision with lazers
                    if (!collided) {
                        for (var i = this.lazers.length - 1; i >= 0; i--) {
                            var lazer = this.lazers[i];

                            if (
                                lazer.active &&
                                this.rectRectCollision(this.player, lazer)
                            ) {
                                collided = true;
                                this.updateBestScore();
                                this.addPlayerExplosion();
                                this.player.vy = -10;
                                this.player.eyes.value = 3;
                                this.player.mouth.value = 0;
                                this.shake = 25;
                                this.scene = "gameover";

                                if (this.sound) {
                                    this.sounds.lazer.pause();
                                    this.sounds.lazer.currentTime = 0;
                                    this.sounds.lazer.play();
                                }

                                break;
                            }
                        }
                    }

                    //if still not collided check collisions with enemies (birds)
                    if (!collided) {
                        for (var i = this.enemies.length - 1; i >= 0; i--) {
                            var enemy = this.enemies[i];

                            //check nose collision first
                            var circle = {
                                x: enemy.x + (enemy.dx * enemy.diameter) / 2,
                                y: enemy.y + (enemy.dy * enemy.diameter) / 2,
                                diameter: enemy.diameter * 0.5,
                            };
                            if (this.rectCircleCollision(this.player, circle)) {
                                collided = true;
                                this.updateBestScore();
                                this.addPlayerExplosion();
                                this.player.vy = -10;
                                this.player.eyes.value = 3;
                                this.player.mouth.value = 0;
                                this.shake = 25;
                                this.scene = "gameover";

                                if (this.sound) {
                                    this.sounds.bird.pause();
                                    this.sounds.bird.currentTime = 0;
                                    this.sounds.bird.play();
                                }

                                break;
                            }

                            //else check body collisions
                            if (this.rectCircleCollision(this.player, enemy)) {
                                this.score.value += 5;
                                enemy.vy = -10;
                                this.shake = 25;
                                this.deadEnemies.push(enemy);
                                this.enemies.splice(i, 1);

                                if (this.sound) {
                                    this.sounds.birdCollect.pause();
                                    this.sounds.birdCollect.currentTime = 0;
                                    this.sounds.birdCollect.play();
                                }
                            }
                        }
                    }

                    //if not collided then check if collision with lava at bottom of screen
                    if (
                        !collided &&
                        this.player.y + this.player.h + this.cam.y >
                            this.lava.y1
                    ) {
                        this.updateBestScore();
                        this.player.vy = -8;
                        this.player.eyes.value = 0;
                        this.player.mouth.value = 0;
                        this.player.state = 1;
                        this.addSmoke();
                        this.shake = 25;
                        this.scene = "gameover";

                        if (this.sound) {
                            this.sounds.lava.pause();
                            this.sounds.lava.currentTime = 0;
                            this.sounds.lava.play();
                        }
                    }
                },
                drawBlocks: function () {
                    //draw the current blocks and remove/add blocks
                    pushStyle();
                    stroke(this.colors.stroke);
                    strokeWeight(3);

                    for (var i = this.blocks.length - 1; i >= 0; i--) {
                        var block = this.blocks[i];

                        image(block.image, block.x, block.y, block.w, block.h);

                        //if block goes off the screen remove the left/right blocks and add two new ones
                        if (block.y > this.player.ymin + 400) {
                            var lastBlock = this.blocks[this.blocks.length - 1];

                            var h = random(100, 250);
                            var bh = random(h * 0.85, h * 1.2);

                            var blockColor =
                                this.colors.blockColor[
                                    random(this.colors.blockColor.length) | 0
                                ];

                            this.blocks.push({
                                x: -310,
                                y: lastBlock.y - h,
                                w: 300 + random(20, 270),
                                h: bh,
                                color: blockColor,
                                image: this.colors.images[
                                    random(this.colors.images.length) | 0
                                ],
                            });

                            var w = random(20, 270);

                            this.blocks.push({
                                x: width - w + 10,
                                y: lastBlock.y - h,
                                w: w + 300,
                                h: bh,
                                color: blockColor,
                                image: this.colors.images[
                                    random(this.colors.images.length) | 0
                                ],
                            });

                            //remove the blocks that went off the screen
                            this.blocks.splice(i - 1, 2);

                            //get the last blocks added
                            var b1 = this.blocks[this.blocks.length - 2];
                            var b2 = this.blocks[this.blocks.length - 1];

                            //if the distance between the new blocks is wide enough...
                            if (dist(b1.x + b1.w, b1.y, b2.x, b2.y) > 200) {
                                var selection = random();

                                var spikeSide =
                                    random() < 0.5 ? "left" : "right";

                                var lazerAdded = false;

                                if (selection < 0.15 && b1.h > 170) {
                                    //add center block
                                    this.centerBlocks.push({
                                        x:
                                            b1.x +
                                            b1.w +
                                            (b2.x - (b1.x + b1.w)) / 2 -
                                            10,
                                        y: b1.y + b1.h / 2 - b1.h * 0.2,
                                        w: 20,
                                        h: b1.h * 0.4,
                                        color: blockColor,
                                    });
                                } else if (selection < 0.1) {
                                    //don't add anything
                                } else if (selection < 0.5) {
                                    //spike
                                    spikeSide =
                                        random() < 0.5 ? "left" : "right";

                                    this.spikes.push({
                                        x:
                                            spikeSide === "left"
                                                ? b1.x + b1.w
                                                : b2.x,
                                        y: random(b1.y + 30, b1.y + b1.h - 30),
                                        diameter: 60,
                                        angle: 0,
                                        rot:
                                            random(1, 2) *
                                            (random() < 0.5 ? 1 : -1),
                                        color: color(247, 102, 104),
                                    });
                                } else if (selection < 0.85 && b1.h > 150) {
                                    //enemy
                                    var dir = random() < 0.5 ? 1 : -1;
                                    this.enemies.push({
                                        x:
                                            b1.x +
                                            b1.w +
                                            (b2.x - (b1.x + b1.w)) / 2,
                                        y: b1.y + b1.h / 2,
                                        diameter: 40,
                                        vx: dir,
                                        vy: 0,
                                        dx: 0,
                                        dy: 0,
                                        angle: {
                                            value: dir === 1 ? 0 : 180,
                                            dest: dir === 1 ? 0 : 180,
                                        },
                                        rot:
                                            random(1, 2) *
                                            (random() < 0.5 ? 1 : -1),
                                        gravity: 0.4,
                                        color: color(219, 118, 247),
                                    });
                                } else if (selection < 0.8) {
                                    //lazer
                                    lazerAdded = true;
                                    this.lazers.push({
                                        x: b1.x + b1.w - 10,
                                        y: b1.y + b1.h / 2 - 5,
                                        w: b2.x - (b1.x + b1.w) + 10,
                                        h: 10,
                                        diameter: 40,
                                        timer: 0,
                                        duration: {
                                            value: 120,
                                            on: 240,
                                            off: 120,
                                        },
                                        active: false,
                                    });
                                }

                                //add a random plant on the left
                                if (random() < 0.3) {
                                    var b1 =
                                        this.blocks[this.blocks.length - 2];

                                    var asset1 =
                                        this.assetImages[
                                            random(this.assetImages.length) | 0
                                        ];

                                    this.assets.push({
                                        x: b1.x + b1.w - asset1.width / 2,
                                        y: random(
                                            b1.y + asset1.height,
                                            b1.y + b1.h - asset1.height
                                        ),
                                        image: asset1,
                                    });
                                }
                                //add a random plant on the right
                                if (random() < 0.3) {
                                    var b2 =
                                        this.blocks[this.blocks.length - 1];

                                    var asset2 =
                                        this.assetImages[
                                            random(this.assetImages.length) | 0
                                        ];

                                    this.assets.push({
                                        x: b2.x - asset2.width / 2,
                                        y: random(
                                            b2.y + asset2.height,
                                            b2.y + b2.h - asset2.height
                                        ),
                                        image: asset2,
                                    });
                                }

                                //add some stars
                                if (!lazerAdded && random() < 0.75) {
                                    var numberOfStars = random(4) | 0;

                                    for (var j = 0; j < numberOfStars; j++) {
                                        this.stars.push({
                                            x:
                                                spikeSide === "right"
                                                    ? b1.x + b1.w + 18
                                                    : b2.x - 18,
                                            y:
                                                b1.y +
                                                b1.h / 2 -
                                                (numberOfStars - 1) * 20 +
                                                j * 40,
                                            diameter: 30,
                                            color: color(242, 215, 63),
                                            image: this.starImages[
                                                random(this.starImages.length) |
                                                    0
                                            ],
                                        });
                                    }
                                }
                            }
                        }
                    }

                    //display the center blocks
                    for (var i = this.centerBlocks.length - 1; i >= 0; i--) {
                        var block = this.centerBlocks[i];

                        fill(block.color);
                        rect(block.x, block.y, block.w, block.h, 5);

                        if (block.y > this.player.ymin + 400) {
                            this.centerBlocks.splice(i, 1);
                        }
                    }
                    popStyle();
                },
                drawSpikes: function () {
                    //draw the spikes
                    for (var i = this.spikes.length - 1; i >= 0; i--) {
                        var spike = this.spikes[i];

                        pushMatrix();
                        translate(spike.x, spike.y);
                        rotate(radians(spike.angle));
                        image(
                            this.images.spike,
                            -spike.diameter * 0.55,
                            -spike.diameter * 0.55,
                            spike.diameter * 1.1,
                            spike.diameter * 1.1
                        );
                        popMatrix();

                        spike.angle += spike.rot;

                        //remove the spike if it goes off the screen
                        if (spike.y - spike.diameter > this.player.ymin + 400) {
                            this.spikes.splice(i, 1);
                        }
                    }
                },
                drawLazers: function () {
                    //draw the lazers
                    pushStyle();
                    for (var i = this.lazers.length - 1; i >= 0; i--) {
                        var lazer = this.lazers[i];

                        if (lazer.timer++ === lazer.duration.value) {
                            if (lazer.active) {
                                lazer.duration.value = lazer.duration.off;
                            } else {
                                lazer.duration.value = lazer.duration.on;
                            }

                            lazer.timer = 0;
                            lazer.active = !lazer.active;
                        }

                        //lazer beam
                        if (lazer.active) {
                            if (random() < 0.8) {
                                stroke(235, 88, 47);
                                strokeWeight(3);
                                fill(242, 137, 84);
                                rect(lazer.x, lazer.y, lazer.w, lazer.h);
                                strokeWeight(3);
                                stroke(255, 150);
                                line(
                                    lazer.x,
                                    lazer.y + 5,
                                    lazer.x + lazer.w,
                                    lazer.y + 5
                                );
                            }
                        }

                        //ends of the lazer
                        noStroke();
                        fill(69, 68, 68);
                        ellipse(
                            lazer.x,
                            lazer.y + 5,
                            lazer.diameter,
                            lazer.diameter
                        );
                        ellipse(
                            lazer.x + lazer.w + 10,
                            lazer.y + 5,
                            lazer.diameter,
                            lazer.diameter
                        );

                        //remove the lazer if it goes off the screen
                        if (lazer.y - lazer.diameter > this.player.ymin + 400) {
                            this.lazers.splice(i, 1);
                        }
                    }
                    popStyle();
                },
                drawStars: function () {
                    //draw the stars
                    pushStyle();
                    imageMode(CENTER);

                    for (var i = this.stars.length - 1; i >= 0; i--) {
                        var star = this.stars[i];

                        pushMatrix();
                        translate(star.x, star.y);
                        rotate(radians(frameCount));

                        image(
                            star.image,
                            0,
                            0,
                            star.diameter * 1.5,
                            star.diameter * 1.5
                        );
                        popMatrix();

                        //remove the star if it goes off the screen
                        if (star.y - star.diameter > this.player.ymin + 400) {
                            this.stars.splice(i, 1);
                        }
                    }

                    imageMode(CORNER);
                    popStyle();
                },
                drawAssets: function () {
                    //draw the assets (plants)
                    for (var i = this.assets.length - 1; i >= 0; i--) {
                        var asset = this.assets[i];

                        image(asset.image, asset.x, asset.y);

                        if (asset.y > this.player.ymin + 400) {
                            this.assets.splice(i, 1);
                        }
                    }
                },
                moveEnemies: function () {
                    //move the enemies (birds)
                    for (var i = this.enemies.length - 1; i >= 0; i--) {
                        var enemy = this.enemies[i];

                        enemy.x += enemy.vx;
                        enemy.y += enemy.vy;

                        for (var j = 0; j < this.blocks.length; j++) {
                            var block = this.blocks[j];

                            //change direction if the bird hits a block
                            if (this.rectCircleCollision(block, enemy)) {
                                enemy.vx *= -1;
                                enemy.angle.dest += 180;
                                break;
                            }
                        }

                        //rotate the bird 180 degrees
                        enemy.angle.value = lerp(
                            enemy.angle.value,
                            enemy.angle.dest,
                            0.2
                        );

                        //update the unit vectors based on the new angle
                        enemy.dx = cos(radians(enemy.angle.value));
                        enemy.dy = sin(radians(enemy.angle.value));
                    }
                },
                drawEnemies: function () {
                    //draw the enemies (birds)
                    noStroke();
                    for (var i = this.enemies.length - 1; i >= 0; i--) {
                        var enemy = this.enemies[i];

                        pushMatrix();
                        translate(enemy.x, enemy.y);
                        rotate(
                            radians(
                                enemy.angle.value +
                                    sin(radians(frameCount * 10)) * 10
                            )
                        );

                        //beak
                        fill(247, 208, 67);
                        triangle(
                            enemy.diameter * 0.7,
                            0,
                            enemy.diameter * 0.4,
                            -enemy.diameter * 0.15,
                            enemy.diameter * 0.4,
                            enemy.diameter * 0.15
                        );
                        //body
                        fill(enemy.color);
                        ellipse(0, 0, enemy.diameter, enemy.diameter);
                        noStroke();
                        fill(79, 79, 79);
                        arc(
                            0,
                            0,
                            enemy.diameter,
                            enemy.diameter,
                            0,
                            radians(180)
                        );
                        noFill();
                        stroke(255, 200);
                        strokeWeight(1);
                        ellipse(0, 0, enemy.diameter, enemy.diameter);
                        //fin
                        fill(247, 54, 74);
                        triangle(
                            -enemy.diameter / 2,
                            0,
                            -enemy.diameter * 0.7,
                            -enemy.diameter * 0.2,
                            -enemy.diameter * 0.7,
                            enemy.diameter * 0.2
                        );
                        //eyes
                        fill(50, 150);
                        ellipse(
                            enemy.diameter * 0.3,
                            -enemy.diameter * 0.15,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15
                        );
                        fill(250, 100);
                        ellipse(
                            enemy.diameter * 0.3,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15
                        );
                        popMatrix();

                        //remove the enemy (bird) if it goes off the screen
                        if (enemy.y - enemy.diameter > this.player.ymin + 400) {
                            this.enemies.splice(i, 1);
                        }
                    }
                },
                drawDeadEnemies: function () {
                    //draw the enemies (birds) when you destroy them
                    for (var i = this.deadEnemies.length - 1; i >= 0; i--) {
                        var enemy = this.deadEnemies[i];

                        enemy.vy += enemy.gravity;
                        enemy.y += enemy.vy;

                        enemy.angle.value += 10;

                        pushMatrix();
                        translate(enemy.x, enemy.y);
                        rotate(
                            radians(
                                enemy.angle.value +
                                    sin(radians(frameCount * 10)) * 10
                            )
                        );

                        //beak
                        fill(247, 208, 67);
                        triangle(
                            enemy.diameter * 0.7,
                            0,
                            enemy.diameter * 0.4,
                            -enemy.diameter * 0.15,
                            enemy.diameter * 0.4,
                            enemy.diameter * 0.15
                        );
                        //body
                        fill(enemy.color);
                        ellipse(0, 0, enemy.diameter, enemy.diameter);
                        fill(79, 79, 79);
                        arc(
                            0,
                            0,
                            enemy.diameter,
                            enemy.diameter,
                            0,
                            radians(180)
                        );
                        //fin
                        fill(247, 54, 74);
                        triangle(
                            -enemy.diameter / 2,
                            0,
                            -enemy.diameter * 0.7,
                            -enemy.diameter * 0.2,
                            -enemy.diameter * 0.7,
                            enemy.diameter * 0.2
                        );
                        //eyes
                        fill(50, 150);
                        ellipse(
                            enemy.diameter * 0.3,
                            -enemy.diameter * 0.15,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15
                        );
                        fill(250, 100);
                        ellipse(
                            enemy.diameter * 0.3,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15,
                            enemy.diameter * 0.15
                        );
                        popMatrix();

                        //remove the enemy (bird) if it goes off the screen
                        if (enemy.y - enemy.diameter > this.player.ymin + 400) {
                            this.deadEnemies.splice(i, 1);
                        }
                    }
                },
                drawDeadPlayer: function () {
                    //draw the player when it hits the lava
                    this.player.vy += this.player.gravity * 3;
                    this.player.y += this.player.vy;

                    this.player.angle += 5;

                    pushMatrix();
                    translate(
                        this.player.x + this.player.w / 2,
                        this.player.y + this.player.h / 2
                    );
                    rotate(radians(this.player.angle));
                    translate(
                        -(this.player.x + this.player.w / 2),
                        -(this.player.y + this.player.h / 2)
                    );

                    this.player.draw();
                    popMatrix();

                    this.runSmoke();

                    //if the player goes off the screen then game over
                    if (this.player.y > this.player.ymin + 400) {
                        this.dead = true;

                        if (!this.scoreSaved) {
                            console.log("Saving score:", this.score.value);
                            saveScoreToLeaderboard(this.score.value);
                            this.scoreSaved = true;
                        }
                    }
                },
                drawLava: function () {
                    //draw the lava at bottom of the screen
                    pushStyle();
                    stroke(
                        lerpColor(
                            color(242, 145, 97),
                            color(232, 108, 46),
                            map(sin(radians(frameCount * 4)), -1, 1, 1, 0)
                        )
                    );
                    strokeWeight(15);
                    fill(242, 229, 111);
                    beginShape();
                    vertex(this.lava.x1, this.lava.y1);
                    bezierVertex(
                        this.lava.cx1 + cos(frameCount * 4) * 100,
                        this.lava.cy1 + sin(radians(frameCount * 4)) * 15,
                        this.lava.cx2 + sin(frameCount * 4) * 100,
                        this.lava.cy2 + cos(radians(frameCount * 4)) * 15,
                        this.lava.x2,
                        this.lava.y2
                    );
                    vertex(this.lava.x2, this.lava.y2 + this.lava.h);
                    vertex(this.lava.x1, this.lava.y1 + this.lava.h);
                    endShape(CLOSE);
                    strokeWeight(1);
                    popStyle();

                    //add particles coming out of the lava
                    if (frameCount % 2 === 0) {
                        this.lava.arr.push({
                            x: random(width),
                            y: height + 30,
                            vx: random(-1, 1),
                            vy: random(-1, -0.5),
                            diameter: random(10, 20),
                            opacity: random(200, 255) | 0,
                            color: color(237, 205, 87),
                            timer: 0,
                            duration: random(60, 120),
                        });
                    }

                    noStroke();
                    for (var i = this.lava.arr.length - 1; i >= 0; i--) {
                        var particle = this.lava.arr[i];

                        fill(particle.color, particle.opacity);
                        ellipse(
                            particle.x,
                            particle.y,
                            particle.diameter,
                            particle.diameter
                        );
                        particle.color = lerpColor(
                            color(237, 205, 87),
                            color(232, 108, 46),
                            map(particle.timer, 0, 120, 0, 1)
                        );
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        if (particle.timer++ >= particle.duration) {
                            particle.diameter -= 1;
                        }

                        if (particle.diameter <= 0) {
                            this.lava.arr.splice(i, 1);
                        }
                    }
                },
                drawParticles: function () {
                    //draw the particles
                    noStroke();

                    for (var i = this.particles.length - 1; i >= 0; i--) {
                        var particle = this.particles[i];

                        translate(
                            particle.x + particle.diameter / 2,
                            particle.y + particle.diameter / 2
                        );
                        rotate(radians(particle.angle));
                        fill(particle.color, particle.opacity);
                        rect(
                            -particle.diameter / 2,
                            -particle.diameter / 2,
                            particle.diameter,
                            particle.diameter
                        );
                        rotate(radians(-particle.angle));
                        translate(
                            -(particle.x + particle.diameter / 2),
                            -(particle.y + particle.diameter / 2)
                        );

                        particle.angle += particle.rot;
                        particle.x += particle.vx;
                        particle.vy += particle.gravity;
                        particle.y += particle.vy;
                        particle.opacity = constrain(
                            particle.opacity - 5,
                            0,
                            255
                        );

                        //remove the particle if the opacity is zero
                        if (particle.opacity === 0) {
                            this.particles.splice(i, 1);
                        }
                    }
                },
                drawScore: function () {
                    //display the current and best score
                    pushStyle();
                    fill(255, 150);
                    textAlign(CENTER, TOP);
                    textSize(22);
                    text("BEST: " + this.score.best, 300, 10);
                    textSize(60);
                    text(this.score.value, 300, 50);
                    popStyle();
                },
                updateParallax: function () {
                    //move the back shapes
                    this.parallax.back.y1 -=
                        this.player.vy * this.parallax.back.speed;
                    this.parallax.back.y2 -=
                        this.player.vy * this.parallax.back.speed;

                    if (
                        this.parallax.back.y1 + this.cam.y >=
                        this.images.back.height
                    ) {
                        this.parallax.back.y1 =
                            this.parallax.back.y2 - this.images.back.height;
                    }
                    if (
                        this.parallax.back.y2 + this.cam.y >=
                        this.images.back.height
                    ) {
                        this.parallax.back.y2 =
                            this.parallax.back.y1 - this.images.back.height;
                    }
                },
                home: function () {
                    background(this.colors.backColor);

                    pushMatrix();
                    translate(this.cam.x, this.cam.y);

                    //draw the parallax images
                    image(this.images.back, 0, this.parallax.back.y1);
                    image(this.images.back, 0, this.parallax.back.y2);

                    this.runFishes();
                    this.drawAssets();
                    this.drawBlocks();
                    popMatrix();

                    //game title
                    pushMatrix();
                    translate(width / 2, 180);
                    rotate(radians(sin(radians(frameCount * 1.5)) * 5));
                    image(this.images.heading, -width / 2, -90);
                    popMatrix();

                    this.runBubbles();
                    this.drawLava();

                    for (var k in this.buttons.menu) {
                        this.buttons.menu[k].draw();
                    }
                },
                gameover: function () {
                    background(this.colors.backColor);

                    this.cam.y = lerp(
                        this.cam.y,
                        height * 0.7 - this.player.ymin,
                        0.1
                    );

                    //shake the screen if active
                    if (this.shake > 0) {
                        this.shake = lerp(this.shake, 0, this.shakedown) | 0;
                        translate(
                            round(random(-this.shake, this.shake)),
                            round(random(-this.shake, this.shake))
                        );
                    }

                    pushMatrix();
                    translate(this.cam.x, this.cam.y);

                    //draw the parallax images
                    image(this.images.back, 0, this.parallax.back.y1);
                    image(this.images.back, 0, this.parallax.back.y2);

                    this.runFishes();
                    this.drawAssets();
                    this.drawSpikes();
                    this.drawLazers();
                    this.drawEnemies();
                    this.moveEnemies();
                    this.drawDeadEnemies();
                    this.drawBlocks();
                    this.drawStars();
                    this.drawParticles();
                    this.drawDeadPlayer();
                    this.runBubbles();
                    popMatrix();

                    this.drawLava();

                    if (this.dead) {
                        //slide down / rotate the game over panel
                        this.anim.over.value = lerp(
                            this.anim.over.value,
                            0,
                            0.1
                        );
                        this.anim.over.angle = map(
                            this.anim.over.value,
                            this.anim.over.base,
                            0,
                            0,
                            360
                        );

                        pushMatrix();
                        translate(0, this.anim.over.value);

                        translate(300, 420);
                        rotate(radians(this.anim.over.angle));
                        translate(-300, -420);

                        pushStyle();
                        strokeWeight(5);
                        stroke(this.colors.stroke);
                        fill(this.colors.blockColor[1], 200);
                        rect(100, 50, 400, 480, 10);

                        fill(250, 200);
                        textAlign(CENTER, TOP);
                        textSize(40);
                        text("GAME OVER", 300, 70);
                        textSize(23);
                        text(
                            "SCORE: " +
                                this.score.value +
                                "\nBEST: " +
                                this.score.best +
                                "\nGAMES PLAYED: " +
                                this.stats.games,
                            300,
                            135
                        );
                        popStyle();
                        for (var k in this.buttons.over) {
                            this.buttons.over[k].draw();
                        }
                        popMatrix();
                    } else {
                        this.drawScore();
                    }
                },
                play: function () {
                    background(this.colors.backColor);

                    this.cam.y = lerp(
                        this.cam.y,
                        height * 0.7 - this.player.ymin,
                        0.1
                    );

                    //shake the screen if active
                    if (this.shake > 0) {
                        this.shake = lerp(this.shake, 0, this.shakedown) | 0;
                        translate(
                            round(random(-this.shake, this.shake)),
                            round(random(-this.shake, this.shake))
                        );
                    }

                    pushMatrix();
                    translate(this.cam.x, this.cam.y);

                    //draw the parallax images
                    image(this.images.back, 0, this.parallax.back.y1);
                    image(this.images.back, 0, this.parallax.back.y2);

                    this.runFishes();
                    this.drawAssets();
                    this.drawSpikes();
                    this.drawLazers();
                    this.drawEnemies();
                    this.moveEnemies();
                    this.drawDeadEnemies();
                    this.drawBlocks();
                    this.drawStars();
                    this.drawParticles();
                    this.player.draw();
                    this.movePlayer();
                    this.runBubbles();
                    popMatrix();

                    //if game has started then check for collisions
                    if (this.start) {
                        this.checkCollisions();
                    }
                    this.drawLava();

                    this.drawScore();
                    this.updateParallax();
                },
                run: function () {
                    switch (this.scene) {
                        case "load":
                            this.load("home");
                            break;
                        case "home":
                            this.home();
                            break;
                        case "play":
                            this.play();
                            break;
                        case "dead":
                            this.dead();
                            break;
                        case "gameover":
                            this.gameover();
                            break;
                    }

                    this.transition.run();

                    cursor(hover ? "pointer" : "default");
                    pressed = clicked = hover = false;
                },
            };
            return App;
        })();

        //create a new app instance
        app = new App();

        draw = function () {
            //run the app
            app.run();
        };
    }
};

var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);
