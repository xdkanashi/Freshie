console.clear();

// Функция для сохранения очков в таблицу лидеров (аналогично Go Go Game)
function saveScoreToLeaderboard(score) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/leaderboard", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Получаем CSRF-токен из мета-тега
        var csrfToken = null;
        var metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            csrfToken = metaTag.getAttribute("content");
            xhr.setRequestHeader("X-CSRF-TOKEN", csrfToken);
        } else {
            console.warn("CSRF-токен не найден в мета-теге!");
            app.messages.push({
                content:
                    "Warning: CSRF token not found. Score may not be saved.",
                x: 300,
                y: 500,
                opacity: 255,
            });
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Очки успешно сохранены:", xhr.responseText);
                    app.messages.push({
                        content: "Score saved successfully!",
                        x: 300,
                        y: 500,
                        opacity: 255,
                    });
                } else {
                    console.error(
                        "Не удалось сохранить очки:",
                        xhr.status,
                        xhr.responseText
                    );
                    app.messages.push({
                        content: "Failed to save score. Please try again.",
                        x: 300,
                        y: 500,
                        opacity: 255,
                    });
                }
            }
        };

        var data = JSON.stringify({ score: score });
        xhr.send(data);
    } catch (error) {
        console.error("Ошибка при сохранении очков в таблицу лидеров:", error);
        app.messages.push({
            content: "Error saving score. Please check your connection.",
            x: 300,
            y: 500,
            opacity: 255,
        });
    }
}

//put your save code here to start from where you last saved
var saveCode = "=-=-<";

const messageElement = document.getElementById("message");
const saveCodeElement = document.getElementById("saveCode");

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(600, 600);
        frameRate(60);

        smooth();

        textFont(createFont("Dosis"));
        angleMode = "degrees";

        var app;

        var clicked = false,
            hover = false,
            pressed = false;
        mouseClicked = function () {
            clicked = true;
        };
        mousePressed = function () {
            pressed = true;
        };
        mouseReleased = function () {
            pressed = false;
        };

        var Button = (function () {
            var Button = function (args) {
                this.x = args.x;
                this.y = args.y;
                this.diameter = args.diameter || 100;
                this.content = args.content;
                this.textSize = args.textSize || this.diameter * 0.25;
                this.enabled = true;
                this.hover = false;
                this.selected = args.selected || false;
                this.func = args.func;
                this.backColor = args.backColor || color(140, 222, 176);
                this.backColorHover =
                    args.backColorHover || color(235, 235, 179);
                this.textColor = args.textColor || color(25);
            };
            Button.prototype = {
                over: function () {
                    return (
                        dist(mouseX, mouseY, this.x, this.y) < this.diameter / 2
                    );
                },
                draw: function () {
                    noStroke();

                    this.hover = this.over();

                    if (this.enabled && this.hover) {
                        hover = true;
                    }

                    pushStyle();
                    stroke(60, 200);
                    strokeWeight(this.diameter * 0.1);
                    fill(
                        this.hover ? this.backColorHover : this.backColor,
                        this.selected
                            ? 100
                            : this.enabled && this.hover
                            ? 240
                            : 210
                    );
                    ellipse(this.x, this.y, this.diameter, this.diameter);

                    textAlign(CENTER, CENTER);
                    textSize(this.textSize);
                    fill(
                        this.enabled
                            ? this.textColor
                            : color(this.textColor, 100)
                    );
                    text(this.content, this.x, this.y);
                    popStyle();

                    if (this.enabled && clicked && this.hover) {
                        this.func();
                    }
                },
            };
            return Button;
        })();

        var App = (function () {
            App = function (args) {
                this.scene = "home";
                this.state = "play"; //"nextPortal", "nextLevel", "resetLevel", "resetPortal"
                this.start = false;
                this.fall = false;
                this.done = false;
                this.testing = false;
                this.distance = 0;
                this.messages = [];
                this.confetti = [];
                this.backColors = [
                    {
                        from: color(40, 150, 140),
                        to: color(90, 160, 140),
                    },
                    {
                        from: color(223, 126, 232),
                        to: color(215, 167, 219),
                    },
                    {
                        from: color(96, 182, 232),
                        to: color(100, 153, 184),
                    },
                    {
                        from: color(230, 97, 159),
                        to: color(181, 99, 136),
                    },
                    {
                        from: color(242, 124, 116),
                        to: color(230, 224, 106),
                    },
                    {
                        from: color(115, 114, 115),
                        to: color(212, 210, 212),
                    },
                    {
                        from: color(235, 200, 180),
                        to: color(80, 70, 69),
                    },
                ];
                this.backImages = [];
                this.delays = {
                    timer: 0,
                    portalReset: 150,
                    portalNext: 150,
                    levelReset: 150,
                    levelNext: 300,
                };
                this.canPress = false;
                this.lives = 0;
                this.score = {
                    total: 0,
                    level: 0,
                    portal: 0,
                    best: 0,
                    bonus: 0, //detemines if a bonus should be applied
                };
                this.level = 0;
                this.point = 0; //point (portal) in level
                this.progress = 0;
                this.cam = {
                    x: 0,
                    y: 0,
                };
                this.bendy = {
                    len: 40,
                    index: 0,
                    weight: 8,
                    bits: [],
                    dots: [],
                    end: {
                        x: 0,
                        y: 0,
                    },
                    color: color(210, 75, 20),
                };
                this.levels = [
                    //3 targets - distance of 300
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 546 },
                            { x: 115, y: 546 },
                            { x: 115, y: 514 },
                            { x: 255, y: 514 },
                            { x: 315, y: 514 },
                            { x: 315, y: 550 },
                            { x: 381, y: 550 },
                            { x: 381, y: 533 },
                            { x: 448, y: 497 },
                            { x: 502, y: 497 },
                            { x: 565, y: 497 },
                            { x: 565, y: 469 },
                            { x: 656, y: 439 },
                            { x: 709, y: 439 },
                            { x: 792, y: 439 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 502 },
                            { x: 122, y: 502 },
                            { x: 122, y: 465 },
                            { x: 203, y: 430 },
                            { x: 257, y: 430 },
                            { x: 319, y: 430 },
                            { x: 319, y: 467 },
                            { x: 385, y: 448 },
                            { x: 488, y: 448 },
                            { x: 541, y: 448 },
                            { x: 541, y: 476 },
                            { x: 632, y: 430 },
                            { x: 632, y: 476 },
                            { x: 703, y: 445 },
                            { x: 773, y: 445 },
                            { x: 835, y: 445 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 529 },
                            { x: 108, y: 529 },
                            { x: 248, y: 516 },
                            { x: 332, y: 516 },
                            { x: 415, y: 516 },
                            { x: 415, y: 531 },
                            { x: 465, y: 531 },
                            { x: 465, y: 495 },
                            { x: 530, y: 495 },
                            { x: 624, y: 495 },
                            { x: 624, y: 463 },
                            { x: 699, y: 463 },
                            { x: 786, y: 463 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 479 },
                            { x: 53, y: 479 },
                            { x: 53, y: 432 },
                            { x: 116, y: 430 },
                            { x: 232, y: 462 },
                            { x: 297, y: 462 },
                            { x: 374, y: 462 },
                            { x: 496, y: 451 },
                            { x: 581, y: 451 },
                            { x: 638, y: 451 },
                            { x: 638, y: 481 },
                            { x: 739, y: 481 },
                            { x: 805, y: 481 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 487 },
                            { x: 103, y: 487 },
                            { x: 103, y: 446 },
                            { x: 237, y: 464 },
                            { x: 334, y: 464 },
                            { x: 399, y: 464 },
                            { x: 399, y: 494 },
                            { x: 475, y: 494 },
                            { x: 475, y: 522 },
                            { x: 610, y: 522 },
                            { x: 695, y: 522 },
                            { x: 695, y: 507 },
                            { x: 772, y: 469 },
                            { x: 824, y: 469 },
                            { x: 891, y: 469 },
                        ],
                    },

                    //4 targets - distance of 300
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 510 },
                            { x: 141, y: 510 },
                            { x: 200, y: 483 },
                            { x: 273, y: 483 },
                            { x: 365, y: 483 },
                            { x: 365, y: 470 },
                            { x: 449, y: 451 },
                            { x: 537, y: 451 },
                            { x: 632, y: 451 },
                            { x: 632, y: 475 },
                            { x: 715, y: 431 },
                            { x: 779, y: 431 },
                            { x: 846, y: 431 },
                            { x: 846, y: 449 },
                            { x: 977, y: 485 },
                            { x: 1043, y: 485 },
                            { x: 1094, y: 485 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 547 },
                            { x: 60, y: 547 },
                            { x: 164, y: 519 },
                            { x: 240, y: 519 },
                            { x: 312, y: 519 },
                            { x: 312, y: 509 },
                            { x: 459, y: 496 },
                            { x: 513, y: 496 },
                            { x: 582, y: 496 },
                            { x: 644, y: 466 },
                            { x: 644, y: 487 },
                            { x: 722, y: 456 },
                            { x: 810, y: 456 },
                            { x: 888, y: 456 },
                            { x: 888, y: 430 },
                            { x: 1036, y: 430 },
                            { x: 1087, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 516 },
                            { x: 147, y: 516 },
                            { x: 227, y: 502 },
                            { x: 311, y: 502 },
                            { x: 375, y: 502 },
                            { x: 375, y: 466 },
                            { x: 440, y: 430 },
                            { x: 520, y: 430 },
                            { x: 591, y: 430 },
                            { x: 591, y: 471 },
                            { x: 691, y: 471 },
                            { x: 790, y: 471 },
                            { x: 790, y: 430 },
                            { x: 876, y: 430 },
                            { x: 936, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 505 },
                            { x: 62, y: 505 },
                            { x: 62, y: 521 },
                            { x: 210, y: 499 },
                            { x: 282, y: 499 },
                            { x: 340, y: 499 },
                            { x: 340, y: 542 },
                            { x: 451, y: 516 },
                            { x: 550, y: 516 },
                            { x: 632, y: 516 },
                            { x: 632, y: 494 },
                            { x: 721, y: 494 },
                            { x: 820, y: 494 },
                            { x: 820, y: 481 },
                            { x: 964, y: 457 },
                            { x: 1033, y: 457 },
                            { x: 1104, y: 457 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 543 },
                            { x: 129, y: 543 },
                            { x: 129, y: 526 },
                            { x: 204, y: 490 },
                            { x: 294, y: 490 },
                            { x: 348, y: 490 },
                            { x: 436, y: 472 },
                            { x: 436, y: 501 },
                            { x: 493, y: 456 },
                            { x: 547, y: 456 },
                            { x: 597, y: 456 },
                            { x: 597, y: 434 },
                            { x: 704, y: 434 },
                            { x: 765, y: 434 },
                            { x: 765, y: 479 },
                            { x: 907, y: 479 },
                            { x: 962, y: 479 },
                        ],
                    },

                    //4 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 469 },
                            { x: 128, y: 469 },
                            { x: 231, y: 458 },
                            { x: 284, y: 458 },
                            { x: 339, y: 458 },
                            { x: 339, y: 500 },
                            { x: 487, y: 461 },
                            { x: 561, y: 461 },
                            { x: 638, y: 461 },
                            { x: 638, y: 435 },
                            { x: 779, y: 435 },
                            { x: 875, y: 435 },
                            { x: 875, y: 460 },
                            { x: 949, y: 448 },
                            { x: 949, y: 495 },
                            { x: 1000, y: 458 },
                            { x: 1076, y: 458 },
                            { x: 1133, y: 458 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 434 },
                            { x: 56, y: 434 },
                            { x: 56, y: 458 },
                            { x: 172, y: 458 },
                            { x: 172, y: 505 },
                            { x: 285, y: 491 },
                            { x: 362, y: 491 },
                            { x: 447, y: 491 },
                            { x: 505, y: 463 },
                            { x: 505, y: 430 },
                            { x: 654, y: 455 },
                            { x: 742, y: 455 },
                            { x: 820, y: 455 },
                            { x: 820, y: 504 },
                            { x: 937, y: 484 },
                            { x: 937, y: 445 },
                            { x: 1017, y: 445 },
                            { x: 1097, y: 445 },
                            { x: 1217, y: 430 },
                            { x: 1360, y: 430 },
                            { x: 1439, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 460 },
                            { x: 115, y: 460 },
                            { x: 239, y: 430 },
                            { x: 292, y: 430 },
                            { x: 382, y: 430 },
                            { x: 382, y: 449 },
                            { x: 491, y: 449 },
                            { x: 491, y: 495 },
                            { x: 585, y: 495 },
                            { x: 647, y: 495 },
                            { x: 747, y: 474 },
                            { x: 747, y: 515 },
                            { x: 816, y: 484 },
                            { x: 910, y: 484 },
                            { x: 992, y: 484 },
                            { x: 992, y: 461 },
                            { x: 1081, y: 461 },
                            { x: 1201, y: 437 },
                            { x: 1256, y: 437 },
                            { x: 1352, y: 437 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 499 },
                            { x: 88, y: 499 },
                            { x: 233, y: 488 },
                            { x: 302, y: 488 },
                            { x: 365, y: 488 },
                            { x: 445, y: 462 },
                            { x: 445, y: 442 },
                            { x: 570, y: 442 },
                            { x: 644, y: 442 },
                            { x: 744, y: 430 },
                            { x: 744, y: 455 },
                            { x: 813, y: 455 },
                            { x: 910, y: 455 },
                            { x: 976, y: 430 },
                            { x: 1061, y: 444 },
                            { x: 1144, y: 444 },
                            { x: 1203, y: 444 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 460 },
                            { x: 55, y: 460 },
                            { x: 55, y: 470 },
                            { x: 175, y: 470 },
                            { x: 316, y: 430 },
                            { x: 384, y: 430 },
                            { x: 444, y: 430 },
                            { x: 444, y: 462 },
                            { x: 511, y: 452 },
                            { x: 596, y: 430 },
                            { x: 669, y: 430 },
                            { x: 731, y: 430 },
                            { x: 810, y: 474 },
                            { x: 810, y: 514 },
                            { x: 920, y: 486 },
                            { x: 990, y: 486 },
                            { x: 1042, y: 486 },
                            { x: 1042, y: 499 },
                            { x: 1154, y: 487 },
                            { x: 1154, y: 497 },
                            { x: 1277, y: 460 },
                            { x: 1345, y: 460 },
                            { x: 1420, y: 460 },
                        ],
                    },

                    //4 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 511 },
                            { x: 131, y: 511 },
                            { x: 131, y: 489 },
                            { x: 214, y: 489 },
                            { x: 265, y: 475 },
                            { x: 354, y: 475 },
                            { x: 418, y: 475 },
                            { x: 507, y: 453 },
                            { x: 507, y: 436 },
                            { x: 562, y: 430 },
                            { x: 562, y: 449 },
                            { x: 666, y: 449 },
                            { x: 746, y: 449 },
                            { x: 746, y: 482 },
                            { x: 802, y: 471 },
                            { x: 887, y: 471 },
                            { x: 979, y: 439 },
                            { x: 1073, y: 439 },
                            { x: 1129, y: 439 },
                            { x: 1129, y: 488 },
                            { x: 1227, y: 473 },
                            { x: 1227, y: 490 },
                            { x: 1313, y: 461 },
                            { x: 1439, y: 461 },
                            { x: 1505, y: 461 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 503 },
                            { x: 143, y: 503 },
                            { x: 143, y: 549 },
                            { x: 231, y: 549 },
                            { x: 231, y: 508 },
                            { x: 354, y: 495 },
                            { x: 417, y: 495 },
                            { x: 493, y: 495 },
                            { x: 571, y: 481 },
                            { x: 571, y: 508 },
                            { x: 624, y: 476 },
                            { x: 729, y: 476 },
                            { x: 782, y: 476 },
                            { x: 851, y: 462 },
                            { x: 948, y: 430 },
                            { x: 1078, y: 440 },
                            { x: 1170, y: 440 },
                            { x: 1242, y: 440 },
                            { x: 1242, y: 451 },
                            { x: 1348, y: 430 },
                            { x: 1348, y: 446 },
                            { x: 1443, y: 446 },
                            { x: 1495, y: 446 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 497 },
                            { x: 80, y: 497 },
                            { x: 80, y: 526 },
                            { x: 164, y: 526 },
                            { x: 311, y: 497 },
                            { x: 401, y: 497 },
                            { x: 469, y: 497 },
                            { x: 557, y: 466 },
                            { x: 557, y: 434 },
                            { x: 654, y: 434 },
                            { x: 717, y: 434 },
                            { x: 717, y: 456 },
                            { x: 792, y: 430 },
                            { x: 901, y: 479 },
                            { x: 901, y: 440 },
                            { x: 1003, y: 467 },
                            { x: 1078, y: 467 },
                            { x: 1155, y: 467 },
                            { x: 1246, y: 430 },
                            { x: 1382, y: 430 },
                            { x: 1434, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 430 },
                            { x: 74, y: 430 },
                            { x: 132, y: 468 },
                            { x: 216, y: 454 },
                            { x: 294, y: 454 },
                            { x: 391, y: 454 },
                            { x: 391, y: 436 },
                            { x: 457, y: 430 },
                            { x: 457, y: 430 },
                            { x: 606, y: 430 },
                            { x: 680, y: 430 },
                            { x: 680, y: 460 },
                            { x: 764, y: 460 },
                            { x: 764, y: 430 },
                            { x: 832, y: 463 },
                            { x: 832, y: 489 },
                            { x: 927, y: 489 },
                            { x: 1006, y: 489 },
                            { x: 1113, y: 476 },
                            { x: 1113, y: 438 },
                            { x: 1219, y: 430 },
                            { x: 1303, y: 430 },
                            { x: 1366, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 515 },
                            { x: 50, y: 515 },
                            { x: 50, y: 499 },
                            { x: 134, y: 499 },
                            { x: 213, y: 464 },
                            { x: 213, y: 439 },
                            { x: 326, y: 439 },
                            { x: 385, y: 439 },
                            { x: 385, y: 475 },
                            { x: 472, y: 475 },
                            { x: 472, y: 453 },
                            { x: 605, y: 430 },
                            { x: 691, y: 430 },
                            { x: 752, y: 430 },
                            { x: 752, y: 463 },
                            { x: 805, y: 448 },
                            { x: 805, y: 489 },
                            { x: 880, y: 477 },
                            { x: 880, y: 499 },
                            { x: 961, y: 499 },
                            { x: 1035, y: 499 },
                            { x: 1035, y: 534 },
                            { x: 1151, y: 524 },
                            { x: 1151, y: 542 },
                            { x: 1255, y: 506 },
                            { x: 1326, y: 506 },
                            { x: 1419, y: 506 },
                        ],
                    },

                    //5 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 499 },
                            { x: 93, y: 499 },
                            { x: 93, y: 542 },
                            { x: 236, y: 532 },
                            { x: 307, y: 532 },
                            { x: 386, y: 532 },
                            { x: 448, y: 512 },
                            { x: 448, y: 550 },
                            { x: 498, y: 526 },
                            { x: 498, y: 550 },
                            { x: 576, y: 550 },
                            { x: 636, y: 550 },
                            { x: 719, y: 511 },
                            { x: 719, y: 483 },
                            { x: 809, y: 483 },
                            { x: 875, y: 483 },
                            { x: 1009, y: 435 },
                            { x: 1139, y: 430 },
                            { x: 1226, y: 430 },
                            { x: 1312, y: 430 },
                            { x: 1312, y: 468 },
                            { x: 1429, y: 454 },
                            { x: 1503, y: 454 },
                            { x: 1576, y: 454 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 549 },
                            { x: 59, y: 549 },
                            { x: 200, y: 509 },
                            { x: 200, y: 550 },
                            { x: 267, y: 504 },
                            { x: 319, y: 504 },
                            { x: 397, y: 504 },
                            { x: 397, y: 480 },
                            { x: 485, y: 480 },
                            { x: 485, y: 493 },
                            { x: 557, y: 493 },
                            { x: 648, y: 493 },
                            { x: 648, y: 516 },
                            { x: 733, y: 479 },
                            { x: 849, y: 459 },
                            { x: 946, y: 459 },
                            { x: 1010, y: 459 },
                            { x: 1010, y: 438 },
                            { x: 1151, y: 438 },
                            { x: 1212, y: 438 },
                            { x: 1299, y: 430 },
                            { x: 1299, y: 478 },
                            { x: 1355, y: 478 },
                            { x: 1427, y: 478 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 439 },
                            { x: 81, y: 439 },
                            { x: 81, y: 483 },
                            { x: 215, y: 449 },
                            { x: 314, y: 449 },
                            { x: 394, y: 449 },
                            { x: 483, y: 478 },
                            { x: 483, y: 442 },
                            { x: 546, y: 442 },
                            { x: 603, y: 442 },
                            { x: 666, y: 477 },
                            { x: 666, y: 451 },
                            { x: 808, y: 451 },
                            { x: 903, y: 451 },
                            { x: 903, y: 461 },
                            { x: 953, y: 461 },
                            { x: 1052, y: 430 },
                            { x: 1116, y: 430 },
                            { x: 1197, y: 430 },
                            { x: 1197, y: 476 },
                            { x: 1286, y: 446 },
                            { x: 1286, y: 456 },
                            { x: 1391, y: 456 },
                            { x: 1458, y: 456 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 536 },
                            { x: 89, y: 536 },
                            { x: 89, y: 487 },
                            { x: 230, y: 439 },
                            { x: 289, y: 439 },
                            { x: 378, y: 439 },
                            { x: 378, y: 488 },
                            { x: 497, y: 440 },
                            { x: 560, y: 440 },
                            { x: 628, y: 440 },
                            { x: 628, y: 471 },
                            { x: 774, y: 471 },
                            { x: 871, y: 471 },
                            { x: 871, y: 453 },
                            { x: 979, y: 453 },
                            { x: 1053, y: 453 },
                            { x: 1169, y: 434 },
                            { x: 1169, y: 459 },
                            { x: 1239, y: 459 },
                            { x: 1315, y: 459 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 540 },
                            { x: 92, y: 540 },
                            { x: 228, y: 515 },
                            { x: 309, y: 515 },
                            { x: 401, y: 515 },
                            { x: 472, y: 481 },
                            { x: 472, y: 441 },
                            { x: 522, y: 430 },
                            { x: 595, y: 430 },
                            { x: 684, y: 430 },
                            { x: 684, y: 476 },
                            { x: 779, y: 459 },
                            { x: 779, y: 430 },
                            { x: 916, y: 430 },
                            { x: 981, y: 430 },
                            { x: 981, y: 446 },
                            { x: 1111, y: 446 },
                            { x: 1222, y: 430 },
                            { x: 1282, y: 430 },
                            { x: 1372, y: 430 },
                            { x: 1461, y: 430 },
                            { x: 1603, y: 464 },
                            { x: 1661, y: 464 },
                            { x: 1717, y: 464 },
                        ],
                    },

                    //5 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 498 },
                            { x: 108, y: 498 },
                            { x: 108, y: 465 },
                            { x: 209, y: 465 },
                            { x: 209, y: 430 },
                            { x: 321, y: 430 },
                            { x: 375, y: 430 },
                            { x: 511, y: 430 },
                            { x: 511, y: 444 },
                            { x: 596, y: 430 },
                            { x: 678, y: 430 },
                            { x: 765, y: 430 },
                            { x: 913, y: 449 },
                            { x: 1029, y: 449 },
                            { x: 1095, y: 449 },
                            { x: 1095, y: 475 },
                            { x: 1191, y: 475 },
                            { x: 1257, y: 465 },
                            { x: 1257, y: 430 },
                            { x: 1398, y: 430 },
                            { x: 1496, y: 430 },
                            { x: 1626, y: 430 },
                            { x: 1626, y: 441 },
                            { x: 1701, y: 441 },
                            { x: 1785, y: 441 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 527 },
                            { x: 78, y: 527 },
                            { x: 78, y: 550 },
                            { x: 154, y: 550 },
                            { x: 266, y: 517 },
                            { x: 324, y: 517 },
                            { x: 414, y: 517 },
                            { x: 414, y: 504 },
                            { x: 486, y: 504 },
                            { x: 553, y: 457 },
                            { x: 651, y: 437 },
                            { x: 739, y: 437 },
                            { x: 803, y: 437 },
                            { x: 803, y: 477 },
                            { x: 894, y: 456 },
                            { x: 1042, y: 430 },
                            { x: 1098, y: 430 },
                            { x: 1183, y: 430 },
                            { x: 1183, y: 471 },
                            { x: 1245, y: 430 },
                            { x: 1245, y: 465 },
                            { x: 1322, y: 430 },
                            { x: 1443, y: 430 },
                            { x: 1493, y: 430 },
                            { x: 1493, y: 447 },
                            { x: 1565, y: 447 },
                            { x: 1565, y: 493 },
                            { x: 1692, y: 466 },
                            { x: 1763, y: 430 },
                            { x: 1845, y: 430 },
                            { x: 1916, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 518 },
                            { x: 94, y: 518 },
                            { x: 94, y: 493 },
                            { x: 187, y: 460 },
                            { x: 187, y: 504 },
                            { x: 321, y: 504 },
                            { x: 376, y: 504 },
                            { x: 449, y: 481 },
                            { x: 449, y: 453 },
                            { x: 539, y: 430 },
                            { x: 539, y: 430 },
                            { x: 635, y: 454 },
                            { x: 718, y: 454 },
                            { x: 810, y: 454 },
                            { x: 810, y: 470 },
                            { x: 895, y: 431 },
                            { x: 895, y: 461 },
                            { x: 984, y: 430 },
                            { x: 1041, y: 430 },
                            { x: 1116, y: 430 },
                            { x: 1116, y: 466 },
                            { x: 1190, y: 450 },
                            { x: 1266, y: 450 },
                            { x: 1266, y: 480 },
                            { x: 1329, y: 459 },
                            { x: 1393, y: 459 },
                            { x: 1489, y: 459 },
                            { x: 1544, y: 430 },
                            { x: 1604, y: 464 },
                            { x: 1693, y: 464 },
                            { x: 1789, y: 464 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 534 },
                            { x: 119, y: 534 },
                            { x: 195, y: 512 },
                            { x: 195, y: 526 },
                            { x: 315, y: 526 },
                            { x: 404, y: 526 },
                            { x: 544, y: 491 },
                            { x: 544, y: 448 },
                            { x: 630, y: 470 },
                            { x: 725, y: 470 },
                            { x: 778, y: 470 },
                            { x: 778, y: 435 },
                            { x: 885, y: 430 },
                            { x: 885, y: 430 },
                            { x: 946, y: 430 },
                            { x: 1011, y: 430 },
                            { x: 1103, y: 430 },
                            { x: 1103, y: 449 },
                            { x: 1218, y: 436 },
                            { x: 1218, y: 436 },
                            { x: 1288, y: 430 },
                            { x: 1340, y: 430 },
                            { x: 1428, y: 430 },
                            { x: 1428, y: 443 },
                            { x: 1519, y: 443 },
                            { x: 1628, y: 471 },
                            { x: 1717, y: 471 },
                            { x: 1767, y: 471 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 521 },
                            { x: 116, y: 521 },
                            { x: 116, y: 506 },
                            { x: 172, y: 506 },
                            { x: 172, y: 474 },
                            { x: 222, y: 474 },
                            { x: 222, y: 458 },
                            { x: 299, y: 458 },
                            { x: 385, y: 458 },
                            { x: 476, y: 447 },
                            { x: 559, y: 447 },
                            { x: 634, y: 447 },
                            { x: 634, y: 489 },
                            { x: 722, y: 440 },
                            { x: 722, y: 473 },
                            { x: 804, y: 440 },
                            { x: 861, y: 440 },
                            { x: 913, y: 440 },
                            { x: 913, y: 486 },
                            { x: 1004, y: 472 },
                            { x: 1004, y: 482 },
                            { x: 1072, y: 482 },
                            { x: 1072, y: 496 },
                            { x: 1139, y: 450 },
                            { x: 1201, y: 450 },
                            { x: 1264, y: 450 },
                            { x: 1264, y: 462 },
                            { x: 1408, y: 450 },
                            { x: 1408, y: 450 },
                            { x: 1481, y: 468 },
                            { x: 1565, y: 468 },
                            { x: 1634, y: 468 },
                        ],
                    },

                    //6 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 447 },
                            { x: 134, y: 447 },
                            { x: 134, y: 470 },
                            { x: 195, y: 470 },
                            { x: 195, y: 430 },
                            { x: 328, y: 430 },
                            { x: 389, y: 430 },
                            { x: 499, y: 456 },
                            { x: 597, y: 430 },
                            { x: 684, y: 430 },
                            { x: 768, y: 430 },
                            { x: 851, y: 472 },
                            { x: 851, y: 509 },
                            { x: 946, y: 509 },
                            { x: 1021, y: 509 },
                            { x: 1148, y: 498 },
                            { x: 1203, y: 498 },
                            { x: 1283, y: 498 },
                            { x: 1283, y: 540 },
                            { x: 1402, y: 495 },
                            { x: 1402, y: 512 },
                            { x: 1489, y: 498 },
                            { x: 1548, y: 498 },
                            { x: 1611, y: 498 },
                            { x: 1756, y: 451 },
                            { x: 1835, y: 451 },
                            { x: 1921, y: 451 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 518 },
                            { x: 144, y: 518 },
                            { x: 229, y: 469 },
                            { x: 320, y: 469 },
                            { x: 394, y: 469 },
                            { x: 394, y: 499 },
                            { x: 460, y: 488 },
                            { x: 460, y: 503 },
                            { x: 565, y: 503 },
                            { x: 633, y: 503 },
                            { x: 633, y: 486 },
                            { x: 741, y: 456 },
                            { x: 741, y: 495 },
                            { x: 845, y: 495 },
                            { x: 913, y: 495 },
                            { x: 913, y: 537 },
                            { x: 974, y: 537 },
                            { x: 974, y: 502 },
                            { x: 1102, y: 488 },
                            { x: 1174, y: 488 },
                            { x: 1267, y: 488 },
                            { x: 1267, y: 537 },
                            { x: 1411, y: 498 },
                            { x: 1469, y: 498 },
                            { x: 1532, y: 498 },
                            { x: 1532, y: 458 },
                            { x: 1589, y: 447 },
                            { x: 1589, y: 489 },
                            { x: 1673, y: 456 },
                            { x: 1732, y: 456 },
                            { x: 1824, y: 456 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 486 },
                            { x: 116, y: 486 },
                            { x: 116, y: 502 },
                            { x: 180, y: 455 },
                            { x: 180, y: 499 },
                            { x: 308, y: 481 },
                            { x: 373, y: 481 },
                            { x: 444, y: 481 },
                            { x: 444, y: 458 },
                            { x: 522, y: 458 },
                            { x: 522, y: 446 },
                            { x: 596, y: 431 },
                            { x: 662, y: 431 },
                            { x: 728, y: 431 },
                            { x: 728, y: 459 },
                            { x: 864, y: 459 },
                            { x: 963, y: 459 },
                            { x: 1084, y: 432 },
                            { x: 1172, y: 432 },
                            { x: 1222, y: 432 },
                            { x: 1222, y: 463 },
                            { x: 1292, y: 430 },
                            { x: 1292, y: 430 },
                            { x: 1381, y: 430 },
                            { x: 1446, y: 430 },
                            { x: 1549, y: 430 },
                            { x: 1549, y: 430 },
                            { x: 1615, y: 430 },
                            { x: 1683, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 430 },
                            { x: 91, y: 430 },
                            { x: 175, y: 430 },
                            { x: 175, y: 454 },
                            { x: 310, y: 433 },
                            { x: 385, y: 433 },
                            { x: 465, y: 433 },
                            { x: 465, y: 449 },
                            { x: 607, y: 430 },
                            { x: 672, y: 430 },
                            { x: 745, y: 430 },
                            { x: 745, y: 461 },
                            { x: 806, y: 461 },
                            { x: 806, y: 432 },
                            { x: 883, y: 432 },
                            { x: 960, y: 432 },
                            { x: 960, y: 460 },
                            { x: 1037, y: 430 },
                            { x: 1167, y: 430 },
                            { x: 1266, y: 430 },
                            { x: 1405, y: 454 },
                            { x: 1489, y: 454 },
                            { x: 1584, y: 454 },
                            { x: 1657, y: 433 },
                            { x: 1657, y: 471 },
                            { x: 1794, y: 455 },
                            { x: 1849, y: 455 },
                            { x: 1938, y: 455 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 516 },
                            { x: 74, y: 516 },
                            { x: 202, y: 497 },
                            { x: 292, y: 497 },
                            { x: 342, y: 497 },
                            { x: 490, y: 473 },
                            { x: 490, y: 491 },
                            { x: 621, y: 471 },
                            { x: 711, y: 471 },
                            { x: 802, y: 471 },
                            { x: 802, y: 433 },
                            { x: 945, y: 430 },
                            { x: 1026, y: 430 },
                            { x: 1105, y: 430 },
                            { x: 1165, y: 430 },
                            { x: 1165, y: 465 },
                            { x: 1215, y: 444 },
                            { x: 1327, y: 430 },
                            { x: 1417, y: 430 },
                            { x: 1499, y: 430 },
                            { x: 1499, y: 464 },
                            { x: 1604, y: 438 },
                            { x: 1730, y: 430 },
                            { x: 1813, y: 430 },
                            { x: 1875, y: 430 },
                            { x: 1875, y: 443 },
                            { x: 1989, y: 443 },
                            { x: 2105, y: 430 },
                            { x: 2183, y: 430 },
                            { x: 2247, y: 430 },
                        ],
                    },

                    //6 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 464 },
                            { x: 60, y: 464 },
                            { x: 60, y: 439 },
                            { x: 207, y: 439 },
                            { x: 207, y: 488 },
                            { x: 279, y: 488 },
                            { x: 368, y: 488 },
                            { x: 368, y: 443 },
                            { x: 435, y: 443 },
                            { x: 542, y: 486 },
                            { x: 593, y: 486 },
                            { x: 674, y: 486 },
                            { x: 674, y: 532 },
                            { x: 785, y: 532 },
                            { x: 930, y: 497 },
                            { x: 1015, y: 497 },
                            { x: 1113, y: 497 },
                            { x: 1194, y: 454 },
                            { x: 1194, y: 430 },
                            { x: 1290, y: 430 },
                            { x: 1369, y: 430 },
                            { x: 1433, y: 430 },
                            { x: 1433, y: 471 },
                            { x: 1502, y: 471 },
                            { x: 1502, y: 448 },
                            { x: 1596, y: 430 },
                            { x: 1688, y: 430 },
                            { x: 1762, y: 430 },
                            { x: 1762, y: 440 },
                            { x: 1845, y: 440 },
                            { x: 1845, y: 455 },
                            { x: 1954, y: 455 },
                            { x: 2050, y: 455 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 485 },
                            { x: 101, y: 485 },
                            { x: 101, y: 465 },
                            { x: 161, y: 430 },
                            { x: 161, y: 464 },
                            { x: 285, y: 430 },
                            { x: 363, y: 430 },
                            { x: 420, y: 430 },
                            { x: 420, y: 473 },
                            { x: 483, y: 473 },
                            { x: 483, y: 508 },
                            { x: 597, y: 508 },
                            { x: 597, y: 526 },
                            { x: 669, y: 497 },
                            { x: 750, y: 497 },
                            { x: 822, y: 497 },
                            { x: 919, y: 479 },
                            { x: 919, y: 507 },
                            { x: 1059, y: 460 },
                            { x: 1115, y: 460 },
                            { x: 1201, y: 460 },
                            { x: 1201, y: 435 },
                            { x: 1295, y: 435 },
                            { x: 1379, y: 430 },
                            { x: 1453, y: 430 },
                            { x: 1532, y: 430 },
                            { x: 1662, y: 430 },
                            { x: 1756, y: 430 },
                            { x: 1849, y: 430 },
                            { x: 1849, y: 468 },
                            { x: 1967, y: 468 },
                            { x: 2034, y: 437 },
                            { x: 2114, y: 437 },
                            { x: 2182, y: 437 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 511 },
                            { x: 84, y: 511 },
                            { x: 219, y: 472 },
                            { x: 296, y: 459 },
                            { x: 353, y: 459 },
                            { x: 438, y: 459 },
                            { x: 438, y: 430 },
                            { x: 582, y: 447 },
                            { x: 582, y: 484 },
                            { x: 654, y: 453 },
                            { x: 722, y: 453 },
                            { x: 785, y: 453 },
                            { x: 785, y: 430 },
                            { x: 928, y: 430 },
                            { x: 928, y: 465 },
                            { x: 1049, y: 465 },
                            { x: 1144, y: 465 },
                            { x: 1249, y: 442 },
                            { x: 1340, y: 442 },
                            { x: 1437, y: 442 },
                            { x: 1500, y: 479 },
                            { x: 1500, y: 456 },
                            { x: 1644, y: 430 },
                            { x: 1725, y: 430 },
                            { x: 1788, y: 430 },
                            { x: 1788, y: 466 },
                            { x: 1905, y: 454 },
                            { x: 1905, y: 430 },
                            { x: 2034, y: 471 },
                            { x: 2105, y: 471 },
                            { x: 2191, y: 471 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 544 },
                            { x: 127, y: 544 },
                            { x: 127, y: 508 },
                            { x: 213, y: 508 },
                            { x: 213, y: 463 },
                            { x: 278, y: 463 },
                            { x: 358, y: 463 },
                            { x: 358, y: 505 },
                            { x: 449, y: 505 },
                            { x: 449, y: 463 },
                            { x: 582, y: 430 },
                            { x: 679, y: 430 },
                            { x: 755, y: 430 },
                            { x: 859, y: 463 },
                            { x: 996, y: 440 },
                            { x: 1060, y: 440 },
                            { x: 1157, y: 440 },
                            { x: 1223, y: 430 },
                            { x: 1223, y: 466 },
                            { x: 1367, y: 430 },
                            { x: 1432, y: 430 },
                            { x: 1486, y: 430 },
                            { x: 1486, y: 451 },
                            { x: 1589, y: 439 },
                            { x: 1722, y: 474 },
                            { x: 1810, y: 474 },
                            { x: 1884, y: 474 },
                            { x: 2031, y: 430 },
                            { x: 2031, y: 473 },
                            { x: 2175, y: 448 },
                            { x: 2255, y: 448 },
                            { x: 2317, y: 448 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 538 },
                            { x: 117, y: 538 },
                            { x: 117, y: 510 },
                            { x: 227, y: 510 },
                            { x: 347, y: 471 },
                            { x: 426, y: 471 },
                            { x: 492, y: 471 },
                            { x: 558, y: 461 },
                            { x: 558, y: 477 },
                            { x: 637, y: 460 },
                            { x: 637, y: 437 },
                            { x: 691, y: 437 },
                            { x: 746, y: 437 },
                            { x: 746, y: 462 },
                            { x: 849, y: 462 },
                            { x: 849, y: 430 },
                            { x: 902, y: 467 },
                            { x: 902, y: 495 },
                            { x: 1024, y: 461 },
                            { x: 1097, y: 461 },
                            { x: 1175, y: 461 },
                            { x: 1175, y: 430 },
                            { x: 1239, y: 430 },
                            { x: 1362, y: 430 },
                            { x: 1433, y: 430 },
                            { x: 1433, y: 461 },
                            { x: 1527, y: 461 },
                            { x: 1527, y: 496 },
                            { x: 1597, y: 496 },
                            { x: 1597, y: 541 },
                            { x: 1735, y: 541 },
                            { x: 1786, y: 541 },
                            { x: 1877, y: 502 },
                            { x: 1877, y: 529 },
                            { x: 1988, y: 508 },
                            { x: 2042, y: 508 },
                            { x: 2125, y: 508 },
                        ],
                    },

                    //7 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 535 },
                            { x: 116, y: 535 },
                            { x: 206, y: 525 },
                            { x: 263, y: 525 },
                            { x: 340, y: 525 },
                            { x: 340, y: 546 },
                            { x: 432, y: 514 },
                            { x: 432, y: 548 },
                            { x: 545, y: 520 },
                            { x: 602, y: 520 },
                            { x: 679, y: 520 },
                            { x: 679, y: 505 },
                            { x: 774, y: 474 },
                            { x: 886, y: 448 },
                            { x: 946, y: 448 },
                            { x: 1017, y: 448 },
                            { x: 1089, y: 484 },
                            { x: 1089, y: 441 },
                            { x: 1150, y: 430 },
                            { x: 1236, y: 430 },
                            { x: 1326, y: 430 },
                            { x: 1326, y: 479 },
                            { x: 1441, y: 479 },
                            { x: 1491, y: 479 },
                            { x: 1491, y: 432 },
                            { x: 1587, y: 432 },
                            { x: 1587, y: 466 },
                            { x: 1644, y: 430 },
                            { x: 1742, y: 430 },
                            { x: 1805, y: 430 },
                            { x: 1805, y: 476 },
                            { x: 1949, y: 447 },
                            { x: 2008, y: 447 },
                            { x: 2103, y: 447 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 490 },
                            { x: 81, y: 490 },
                            { x: 81, y: 520 },
                            { x: 208, y: 480 },
                            { x: 270, y: 480 },
                            { x: 339, y: 480 },
                            { x: 433, y: 441 },
                            { x: 433, y: 483 },
                            { x: 516, y: 483 },
                            { x: 586, y: 483 },
                            { x: 586, y: 503 },
                            { x: 652, y: 473 },
                            { x: 652, y: 486 },
                            { x: 740, y: 459 },
                            { x: 796, y: 459 },
                            { x: 860, y: 459 },
                            { x: 973, y: 437 },
                            { x: 1092, y: 430 },
                            { x: 1159, y: 430 },
                            { x: 1242, y: 430 },
                            { x: 1242, y: 475 },
                            { x: 1338, y: 475 },
                            { x: 1473, y: 440 },
                            { x: 1569, y: 440 },
                            { x: 1661, y: 440 },
                            { x: 1778, y: 430 },
                            { x: 1861, y: 430 },
                            { x: 1943, y: 430 },
                            { x: 2028, y: 430 },
                            { x: 2028, y: 454 },
                            { x: 2093, y: 454 },
                            { x: 2159, y: 454 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 511 },
                            { x: 56, y: 511 },
                            { x: 56, y: 492 },
                            { x: 123, y: 448 },
                            { x: 123, y: 483 },
                            { x: 208, y: 465 },
                            { x: 279, y: 465 },
                            { x: 374, y: 465 },
                            { x: 374, y: 446 },
                            { x: 471, y: 446 },
                            { x: 471, y: 495 },
                            { x: 592, y: 495 },
                            { x: 689, y: 495 },
                            { x: 781, y: 467 },
                            { x: 781, y: 485 },
                            { x: 858, y: 485 },
                            { x: 924, y: 485 },
                            { x: 924, y: 443 },
                            { x: 996, y: 443 },
                            { x: 996, y: 487 },
                            { x: 1116, y: 487 },
                            { x: 1207, y: 487 },
                            { x: 1207, y: 530 },
                            { x: 1280, y: 530 },
                            { x: 1280, y: 505 },
                            { x: 1404, y: 505 },
                            { x: 1472, y: 505 },
                            { x: 1523, y: 465 },
                            { x: 1523, y: 430 },
                            { x: 1633, y: 430 },
                            { x: 1688, y: 430 },
                            { x: 1688, y: 440 },
                            { x: 1775, y: 478 },
                            { x: 1843, y: 478 },
                            { x: 1925, y: 478 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 527 },
                            { x: 90, y: 527 },
                            { x: 174, y: 491 },
                            { x: 174, y: 463 },
                            { x: 301, y: 435 },
                            { x: 376, y: 435 },
                            { x: 438, y: 435 },
                            { x: 438, y: 461 },
                            { x: 509, y: 430 },
                            { x: 509, y: 452 },
                            { x: 583, y: 430 },
                            { x: 647, y: 430 },
                            { x: 732, y: 430 },
                            { x: 878, y: 430 },
                            { x: 939, y: 430 },
                            { x: 939, y: 461 },
                            { x: 1005, y: 461 },
                            { x: 1108, y: 430 },
                            { x: 1158, y: 430 },
                            { x: 1252, y: 430 },
                            { x: 1367, y: 430 },
                            { x: 1426, y: 430 },
                            { x: 1426, y: 450 },
                            { x: 1569, y: 450 },
                            { x: 1650, y: 450 },
                            { x: 1650, y: 472 },
                            { x: 1780, y: 472 },
                            { x: 1860, y: 472 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 539 },
                            { x: 109, y: 539 },
                            { x: 232, y: 526 },
                            { x: 301, y: 526 },
                            { x: 392, y: 526 },
                            { x: 392, y: 496 },
                            { x: 539, y: 496 },
                            { x: 593, y: 496 },
                            { x: 593, y: 545 },
                            { x: 692, y: 496 },
                            { x: 802, y: 496 },
                            { x: 868, y: 496 },
                            { x: 868, y: 450 },
                            { x: 1015, y: 450 },
                            { x: 1067, y: 450 },
                            { x: 1067, y: 479 },
                            { x: 1181, y: 479 },
                            { x: 1181, y: 489 },
                            { x: 1252, y: 489 },
                            { x: 1346, y: 489 },
                            { x: 1470, y: 460 },
                            { x: 1522, y: 460 },
                            { x: 1596, y: 460 },
                            { x: 1596, y: 505 },
                            { x: 1698, y: 465 },
                            { x: 1698, y: 489 },
                            { x: 1768, y: 489 },
                            { x: 1823, y: 489 },
                        ],
                    },

                    //7 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 520 },
                            { x: 82, y: 520 },
                            { x: 82, y: 543 },
                            { x: 203, y: 498 },
                            { x: 336, y: 498 },
                            { x: 392, y: 498 },
                            { x: 392, y: 484 },
                            { x: 529, y: 448 },
                            { x: 529, y: 470 },
                            { x: 608, y: 470 },
                            { x: 664, y: 470 },
                            { x: 664, y: 519 },
                            { x: 799, y: 519 },
                            { x: 799, y: 550 },
                            { x: 873, y: 525 },
                            { x: 934, y: 525 },
                            { x: 984, y: 525 },
                            { x: 1111, y: 486 },
                            { x: 1198, y: 486 },
                            { x: 1297, y: 486 },
                            { x: 1444, y: 470 },
                            { x: 1578, y: 470 },
                            { x: 1667, y: 470 },
                            { x: 1758, y: 430 },
                            { x: 1758, y: 430 },
                            { x: 1892, y: 430 },
                            { x: 1970, y: 430 },
                            { x: 1970, y: 445 },
                            { x: 2034, y: 430 },
                            { x: 2034, y: 430 },
                            { x: 2148, y: 430 },
                            { x: 2204, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 464 },
                            { x: 143, y: 464 },
                            { x: 143, y: 505 },
                            { x: 259, y: 472 },
                            { x: 332, y: 472 },
                            { x: 390, y: 472 },
                            { x: 522, y: 430 },
                            { x: 522, y: 430 },
                            { x: 655, y: 430 },
                            { x: 735, y: 430 },
                            { x: 735, y: 462 },
                            { x: 883, y: 430 },
                            { x: 883, y: 469 },
                            { x: 981, y: 450 },
                            { x: 1046, y: 450 },
                            { x: 1134, y: 450 },
                            { x: 1212, y: 466 },
                            { x: 1212, y: 499 },
                            { x: 1276, y: 468 },
                            { x: 1276, y: 497 },
                            { x: 1377, y: 497 },
                            { x: 1447, y: 497 },
                            { x: 1447, y: 481 },
                            { x: 1548, y: 481 },
                            { x: 1548, y: 442 },
                            { x: 1604, y: 442 },
                            { x: 1705, y: 430 },
                            { x: 1786, y: 430 },
                            { x: 1836, y: 430 },
                            { x: 1915, y: 430 },
                            { x: 1915, y: 470 },
                            { x: 1985, y: 470 },
                            { x: 2108, y: 455 },
                            { x: 2187, y: 455 },
                            { x: 2247, y: 455 },
                            { x: 2315, y: 430 },
                            { x: 2315, y: 430 },
                            { x: 2423, y: 430 },
                            { x: 2423, y: 442 },
                            { x: 2560, y: 487 },
                            { x: 2625, y: 487 },
                            { x: 2689, y: 487 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 486 },
                            { x: 85, y: 486 },
                            { x: 138, y: 466 },
                            { x: 138, y: 506 },
                            { x: 245, y: 477 },
                            { x: 245, y: 499 },
                            { x: 295, y: 466 },
                            { x: 359, y: 466 },
                            { x: 412, y: 466 },
                            { x: 412, y: 490 },
                            { x: 549, y: 490 },
                            { x: 549, y: 445 },
                            { x: 673, y: 445 },
                            { x: 766, y: 445 },
                            { x: 766, y: 491 },
                            { x: 839, y: 473 },
                            { x: 839, y: 443 },
                            { x: 984, y: 430 },
                            { x: 1072, y: 430 },
                            { x: 1144, y: 430 },
                            { x: 1277, y: 430 },
                            { x: 1330, y: 430 },
                            { x: 1420, y: 430 },
                            { x: 1420, y: 440 },
                            { x: 1555, y: 440 },
                            { x: 1642, y: 430 },
                            { x: 1695, y: 430 },
                            { x: 1776, y: 430 },
                            { x: 1776, y: 442 },
                            { x: 1844, y: 442 },
                            { x: 1844, y: 465 },
                            { x: 1947, y: 465 },
                            { x: 2017, y: 465 },
                            { x: 2017, y: 492 },
                            { x: 2162, y: 475 },
                            { x: 2162, y: 513 },
                            { x: 2227, y: 489 },
                            { x: 2284, y: 489 },
                            { x: 2361, y: 489 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 500 },
                            { x: 81, y: 500 },
                            { x: 81, y: 464 },
                            { x: 144, y: 430 },
                            { x: 263, y: 467 },
                            { x: 348, y: 467 },
                            { x: 429, y: 467 },
                            { x: 487, y: 430 },
                            { x: 487, y: 430 },
                            { x: 593, y: 454 },
                            { x: 674, y: 454 },
                            { x: 768, y: 454 },
                            { x: 768, y: 430 },
                            { x: 897, y: 430 },
                            { x: 897, y: 463 },
                            { x: 991, y: 463 },
                            { x: 1050, y: 463 },
                            { x: 1050, y: 484 },
                            { x: 1133, y: 452 },
                            { x: 1227, y: 435 },
                            { x: 1320, y: 435 },
                            { x: 1394, y: 435 },
                            { x: 1394, y: 458 },
                            { x: 1534, y: 458 },
                            { x: 1534, y: 430 },
                            { x: 1677, y: 430 },
                            { x: 1762, y: 430 },
                            { x: 1910, y: 430 },
                            { x: 2055, y: 430 },
                            { x: 2118, y: 430 },
                            { x: 2118, y: 442 },
                            { x: 2231, y: 430 },
                            { x: 2231, y: 430 },
                            { x: 2332, y: 430 },
                            { x: 2414, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 483 },
                            { x: 121, y: 483 },
                            { x: 121, y: 496 },
                            { x: 250, y: 463 },
                            { x: 372, y: 463 },
                            { x: 451, y: 463 },
                            { x: 451, y: 445 },
                            { x: 578, y: 445 },
                            { x: 718, y: 430 },
                            { x: 817, y: 430 },
                            { x: 877, y: 430 },
                            { x: 877, y: 478 },
                            { x: 932, y: 465 },
                            { x: 932, y: 502 },
                            { x: 1022, y: 502 },
                            { x: 1022, y: 532 },
                            { x: 1112, y: 532 },
                            { x: 1181, y: 532 },
                            { x: 1181, y: 499 },
                            { x: 1269, y: 485 },
                            { x: 1269, y: 455 },
                            { x: 1337, y: 455 },
                            { x: 1476, y: 430 },
                            { x: 1548, y: 430 },
                            { x: 1611, y: 430 },
                            { x: 1717, y: 430 },
                            { x: 1717, y: 447 },
                            { x: 1769, y: 430 },
                            { x: 1769, y: 470 },
                            { x: 1829, y: 470 },
                            { x: 1918, y: 470 },
                            { x: 2049, y: 436 },
                            { x: 2049, y: 464 },
                            { x: 2173, y: 464 },
                            { x: 2252, y: 464 },
                            { x: 2381, y: 430 },
                            { x: 2468, y: 448 },
                            { x: 2543, y: 448 },
                            { x: 2628, y: 448 },
                        ],
                    },

                    //8 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 534 },
                            { x: 147, y: 534 },
                            { x: 255, y: 507 },
                            { x: 345, y: 507 },
                            { x: 405, y: 507 },
                            { x: 405, y: 530 },
                            { x: 484, y: 509 },
                            { x: 484, y: 535 },
                            { x: 569, y: 535 },
                            { x: 652, y: 535 },
                            { x: 652, y: 515 },
                            { x: 717, y: 515 },
                            { x: 717, y: 550 },
                            { x: 799, y: 550 },
                            { x: 890, y: 550 },
                            { x: 890, y: 505 },
                            { x: 1034, y: 491 },
                            { x: 1105, y: 491 },
                            { x: 1180, y: 491 },
                            { x: 1262, y: 459 },
                            { x: 1394, y: 442 },
                            { x: 1448, y: 442 },
                            { x: 1524, y: 442 },
                            { x: 1649, y: 430 },
                            { x: 1742, y: 430 },
                            { x: 1821, y: 430 },
                            { x: 1821, y: 479 },
                            { x: 1933, y: 451 },
                            { x: 1933, y: 462 },
                            { x: 2000, y: 462 },
                            { x: 2061, y: 462 },
                            { x: 2202, y: 441 },
                            { x: 2284, y: 441 },
                            { x: 2359, y: 441 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 534 },
                            { x: 147, y: 534 },
                            { x: 255, y: 507 },
                            { x: 345, y: 507 },
                            { x: 405, y: 507 },
                            { x: 405, y: 530 },
                            { x: 484, y: 509 },
                            { x: 484, y: 535 },
                            { x: 569, y: 535 },
                            { x: 652, y: 535 },
                            { x: 652, y: 515 },
                            { x: 717, y: 515 },
                            { x: 717, y: 550 },
                            { x: 799, y: 550 },
                            { x: 890, y: 550 },
                            { x: 890, y: 505 },
                            { x: 1034, y: 491 },
                            { x: 1105, y: 491 },
                            { x: 1180, y: 491 },
                            { x: 1262, y: 459 },
                            { x: 1394, y: 442 },
                            { x: 1448, y: 442 },
                            { x: 1524, y: 442 },
                            { x: 1649, y: 430 },
                            { x: 1742, y: 430 },
                            { x: 1821, y: 430 },
                            { x: 1821, y: 479 },
                            { x: 1933, y: 451 },
                            { x: 1933, y: 462 },
                            { x: 2000, y: 462 },
                            { x: 2061, y: 462 },
                            { x: 2202, y: 441 },
                            { x: 2284, y: 441 },
                            { x: 2359, y: 441 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 539 },
                            { x: 142, y: 539 },
                            { x: 142, y: 515 },
                            { x: 266, y: 497 },
                            { x: 341, y: 497 },
                            { x: 423, y: 497 },
                            { x: 423, y: 543 },
                            { x: 572, y: 525 },
                            { x: 633, y: 525 },
                            { x: 702, y: 525 },
                            { x: 702, y: 550 },
                            { x: 752, y: 512 },
                            { x: 832, y: 487 },
                            { x: 832, y: 520 },
                            { x: 972, y: 493 },
                            { x: 1046, y: 493 },
                            { x: 1112, y: 493 },
                            { x: 1112, y: 511 },
                            { x: 1191, y: 511 },
                            { x: 1191, y: 464 },
                            { x: 1263, y: 431 },
                            { x: 1323, y: 431 },
                            { x: 1375, y: 431 },
                            { x: 1477, y: 430 },
                            { x: 1477, y: 476 },
                            { x: 1569, y: 476 },
                            { x: 1656, y: 476 },
                            { x: 1656, y: 493 },
                            { x: 1802, y: 493 },
                            { x: 1858, y: 493 },
                            { x: 1858, y: 507 },
                            { x: 1967, y: 469 },
                            { x: 2022, y: 430 },
                            { x: 2102, y: 430 },
                            { x: 2181, y: 430 },
                            { x: 2181, y: 448 },
                            { x: 2243, y: 430 },
                            { x: 2243, y: 460 },
                            { x: 2298, y: 460 },
                            { x: 2398, y: 430 },
                            { x: 2485, y: 430 },
                            { x: 2571, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 472 },
                            { x: 76, y: 472 },
                            { x: 76, y: 449 },
                            { x: 138, y: 430 },
                            { x: 202, y: 430 },
                            { x: 267, y: 430 },
                            { x: 330, y: 430 },
                            { x: 441, y: 467 },
                            { x: 540, y: 467 },
                            { x: 604, y: 467 },
                            { x: 604, y: 503 },
                            { x: 684, y: 459 },
                            { x: 684, y: 493 },
                            { x: 828, y: 462 },
                            { x: 879, y: 462 },
                            { x: 971, y: 462 },
                            { x: 971, y: 433 },
                            { x: 1048, y: 433 },
                            { x: 1048, y: 475 },
                            { x: 1104, y: 455 },
                            { x: 1161, y: 455 },
                            { x: 1244, y: 455 },
                            { x: 1244, y: 441 },
                            { x: 1350, y: 441 },
                            { x: 1350, y: 481 },
                            { x: 1432, y: 448 },
                            { x: 1486, y: 448 },
                            { x: 1564, y: 448 },
                            { x: 1564, y: 483 },
                            { x: 1698, y: 483 },
                            { x: 1761, y: 483 },
                            { x: 1761, y: 493 },
                            { x: 1882, y: 471 },
                            { x: 1976, y: 471 },
                            { x: 2063, y: 471 },
                            { x: 2153, y: 443 },
                            { x: 2221, y: 443 },
                            { x: 2311, y: 443 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 514 },
                            { x: 82, y: 514 },
                            { x: 184, y: 500 },
                            { x: 184, y: 456 },
                            { x: 273, y: 430 },
                            { x: 367, y: 430 },
                            { x: 427, y: 430 },
                            { x: 556, y: 430 },
                            { x: 556, y: 430 },
                            { x: 613, y: 430 },
                            { x: 670, y: 430 },
                            { x: 670, y: 479 },
                            { x: 772, y: 461 },
                            { x: 772, y: 430 },
                            { x: 880, y: 430 },
                            { x: 937, y: 430 },
                            { x: 937, y: 469 },
                            { x: 1000, y: 454 },
                            { x: 1000, y: 430 },
                            { x: 1063, y: 430 },
                            { x: 1063, y: 457 },
                            { x: 1124, y: 443 },
                            { x: 1206, y: 443 },
                            { x: 1266, y: 443 },
                            { x: 1383, y: 485 },
                            { x: 1459, y: 466 },
                            { x: 1528, y: 466 },
                            { x: 1600, y: 466 },
                            { x: 1600, y: 440 },
                            { x: 1737, y: 473 },
                            { x: 1804, y: 473 },
                            { x: 1898, y: 473 },
                            { x: 1898, y: 490 },
                            { x: 1962, y: 460 },
                            { x: 2042, y: 460 },
                            { x: 2133, y: 460 },
                            { x: 2133, y: 430 },
                            { x: 2268, y: 430 },
                            { x: 2321, y: 430 },
                        ],
                    },

                    //8 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 440 },
                            { x: 75, y: 440 },
                            { x: 75, y: 462 },
                            { x: 177, y: 440 },
                            { x: 177, y: 478 },
                            { x: 292, y: 459 },
                            { x: 360, y: 459 },
                            { x: 438, y: 459 },
                            { x: 438, y: 430 },
                            { x: 534, y: 430 },
                            { x: 534, y: 462 },
                            { x: 592, y: 462 },
                            { x: 698, y: 430 },
                            { x: 785, y: 430 },
                            { x: 869, y: 430 },
                            { x: 869, y: 465 },
                            { x: 988, y: 430 },
                            { x: 988, y: 430 },
                            { x: 1087, y: 430 },
                            { x: 1183, y: 430 },
                            { x: 1270, y: 430 },
                            { x: 1368, y: 430 },
                            { x: 1434, y: 430 },
                            { x: 1520, y: 430 },
                            { x: 1650, y: 430 },
                            { x: 1727, y: 430 },
                            { x: 1863, y: 430 },
                            { x: 1969, y: 449 },
                            { x: 2066, y: 449 },
                            { x: 2136, y: 449 },
                            { x: 2136, y: 478 },
                            { x: 2216, y: 447 },
                            { x: 2361, y: 434 },
                            { x: 2429, y: 434 },
                            { x: 2520, y: 434 },
                            { x: 2646, y: 478 },
                            { x: 2646, y: 505 },
                            { x: 2744, y: 475 },
                            { x: 2810, y: 475 },
                            { x: 2869, y: 475 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 471 },
                            { x: 74, y: 471 },
                            { x: 171, y: 430 },
                            { x: 276, y: 430 },
                            { x: 368, y: 430 },
                            { x: 368, y: 447 },
                            { x: 430, y: 447 },
                            { x: 430, y: 486 },
                            { x: 555, y: 476 },
                            { x: 653, y: 476 },
                            { x: 743, y: 476 },
                            { x: 816, y: 430 },
                            { x: 879, y: 430 },
                            { x: 879, y: 473 },
                            { x: 954, y: 473 },
                            { x: 1050, y: 473 },
                            { x: 1050, y: 493 },
                            { x: 1153, y: 460 },
                            { x: 1261, y: 430 },
                            { x: 1328, y: 430 },
                            { x: 1381, y: 430 },
                            { x: 1507, y: 445 },
                            { x: 1507, y: 479 },
                            { x: 1637, y: 453 },
                            { x: 1712, y: 453 },
                            { x: 1778, y: 453 },
                            { x: 1778, y: 430 },
                            { x: 1925, y: 430 },
                            { x: 1925, y: 453 },
                            { x: 2058, y: 440 },
                            { x: 2134, y: 440 },
                            { x: 2211, y: 440 },
                            { x: 2320, y: 486 },
                            { x: 2373, y: 441 },
                            { x: 2433, y: 430 },
                            { x: 2486, y: 430 },
                            { x: 2542, y: 430 },
                            { x: 2609, y: 430 },
                            { x: 2609, y: 430 },
                            { x: 2733, y: 430 },
                            { x: 2733, y: 430 },
                            { x: 2870, y: 430 },
                            { x: 2937, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 480 },
                            { x: 92, y: 480 },
                            { x: 168, y: 455 },
                            { x: 291, y: 430 },
                            { x: 351, y: 430 },
                            { x: 447, y: 430 },
                            { x: 447, y: 443 },
                            { x: 550, y: 430 },
                            { x: 550, y: 430 },
                            { x: 606, y: 430 },
                            { x: 697, y: 430 },
                            { x: 697, y: 453 },
                            { x: 754, y: 430 },
                            { x: 754, y: 456 },
                            { x: 890, y: 445 },
                            { x: 977, y: 445 },
                            { x: 1055, y: 445 },
                            { x: 1055, y: 483 },
                            { x: 1164, y: 483 },
                            { x: 1164, y: 439 },
                            { x: 1285, y: 430 },
                            { x: 1367, y: 430 },
                            { x: 1436, y: 430 },
                            { x: 1436, y: 456 },
                            { x: 1584, y: 430 },
                            { x: 1584, y: 430 },
                            { x: 1643, y: 473 },
                            { x: 1706, y: 473 },
                            { x: 1802, y: 473 },
                            { x: 1802, y: 513 },
                            { x: 1886, y: 468 },
                            { x: 1936, y: 451 },
                            { x: 1986, y: 430 },
                            { x: 2036, y: 430 },
                            { x: 2117, y: 430 },
                            { x: 2254, y: 430 },
                            { x: 2254, y: 473 },
                            { x: 2306, y: 430 },
                            { x: 2401, y: 430 },
                            { x: 2469, y: 430 },
                            { x: 2534, y: 430 },
                            { x: 2602, y: 430 },
                            { x: 2708, y: 430 },
                            { x: 2791, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 474 },
                            { x: 107, y: 474 },
                            { x: 167, y: 462 },
                            { x: 167, y: 440 },
                            { x: 261, y: 430 },
                            { x: 351, y: 430 },
                            { x: 420, y: 430 },
                            { x: 420, y: 441 },
                            { x: 491, y: 430 },
                            { x: 584, y: 461 },
                            { x: 718, y: 430 },
                            { x: 799, y: 430 },
                            { x: 883, y: 430 },
                            { x: 883, y: 461 },
                            { x: 962, y: 430 },
                            { x: 1098, y: 476 },
                            { x: 1188, y: 476 },
                            { x: 1275, y: 476 },
                            { x: 1275, y: 510 },
                            { x: 1414, y: 510 },
                            { x: 1475, y: 487 },
                            { x: 1564, y: 487 },
                            { x: 1633, y: 487 },
                            { x: 1633, y: 513 },
                            { x: 1740, y: 497 },
                            { x: 1827, y: 497 },
                            { x: 1911, y: 497 },
                            { x: 2001, y: 470 },
                            { x: 2001, y: 510 },
                            { x: 2139, y: 476 },
                            { x: 2199, y: 476 },
                            { x: 2283, y: 476 },
                            { x: 2355, y: 430 },
                            { x: 2355, y: 430 },
                            { x: 2448, y: 430 },
                            { x: 2514, y: 430 },
                            { x: 2575, y: 430 },
                            { x: 2575, y: 468 },
                            { x: 2673, y: 451 },
                            { x: 2673, y: 435 },
                            { x: 2804, y: 430 },
                            { x: 2870, y: 430 },
                            { x: 2946, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 532 },
                            { x: 81, y: 532 },
                            { x: 81, y: 518 },
                            { x: 201, y: 518 },
                            { x: 317, y: 503 },
                            { x: 382, y: 503 },
                            { x: 443, y: 503 },
                            { x: 443, y: 469 },
                            { x: 585, y: 430 },
                            { x: 585, y: 468 },
                            { x: 661, y: 468 },
                            { x: 717, y: 468 },
                            { x: 796, y: 444 },
                            { x: 925, y: 444 },
                            { x: 1024, y: 444 },
                            { x: 1024, y: 484 },
                            { x: 1119, y: 484 },
                            { x: 1187, y: 458 },
                            { x: 1279, y: 458 },
                            { x: 1337, y: 458 },
                            { x: 1393, y: 445 },
                            { x: 1469, y: 430 },
                            { x: 1540, y: 430 },
                            { x: 1629, y: 430 },
                            { x: 1766, y: 430 },
                            { x: 1882, y: 430 },
                            { x: 1959, y: 430 },
                            { x: 2068, y: 430 },
                            { x: 2068, y: 450 },
                            { x: 2118, y: 450 },
                            { x: 2118, y: 491 },
                            { x: 2243, y: 491 },
                            { x: 2324, y: 491 },
                            { x: 2324, y: 518 },
                            { x: 2375, y: 473 },
                            { x: 2522, y: 448 },
                            { x: 2587, y: 448 },
                            { x: 2663, y: 448 },
                        ],
                    },

                    //9 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 37,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 523 },
                            { x: 132, y: 523 },
                            { x: 132, y: 482 },
                            { x: 243, y: 482 },
                            { x: 336, y: 482 },
                            { x: 473, y: 455 },
                            { x: 551, y: 455 },
                            { x: 625, y: 455 },
                            { x: 625, y: 467 },
                            { x: 700, y: 455 },
                            { x: 800, y: 455 },
                            { x: 879, y: 455 },
                            { x: 968, y: 442 },
                            { x: 968, y: 488 },
                            { x: 1021, y: 488 },
                            { x: 1105, y: 488 },
                            { x: 1105, y: 465 },
                            { x: 1192, y: 465 },
                            { x: 1192, y: 504 },
                            { x: 1279, y: 504 },
                            { x: 1348, y: 504 },
                            { x: 1348, y: 523 },
                            { x: 1464, y: 478 },
                            { x: 1464, y: 509 },
                            { x: 1570, y: 509 },
                            { x: 1629, y: 509 },
                            { x: 1629, y: 536 },
                            { x: 1719, y: 536 },
                            { x: 1769, y: 504 },
                            { x: 1769, y: 517 },
                            { x: 1915, y: 480 },
                            { x: 2004, y: 480 },
                            { x: 2101, y: 480 },
                            { x: 2101, y: 443 },
                            { x: 2156, y: 430 },
                            { x: 2156, y: 477 },
                            { x: 2262, y: 451 },
                            { x: 2351, y: 451 },
                            { x: 2416, y: 451 },
                            { x: 2416, y: 464 },
                            { x: 2472, y: 453 },
                            { x: 2592, y: 453 },
                            { x: 2683, y: 453 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 484 },
                            { x: 108, y: 484 },
                            { x: 108, y: 520 },
                            { x: 214, y: 520 },
                            { x: 264, y: 520 },
                            { x: 358, y: 484 },
                            { x: 358, y: 509 },
                            { x: 470, y: 476 },
                            { x: 546, y: 476 },
                            { x: 601, y: 476 },
                            { x: 750, y: 465 },
                            { x: 808, y: 465 },
                            { x: 902, y: 465 },
                            { x: 902, y: 495 },
                            { x: 970, y: 459 },
                            { x: 1024, y: 459 },
                            { x: 1086, y: 459 },
                            { x: 1183, y: 430 },
                            { x: 1284, y: 430 },
                            { x: 1368, y: 430 },
                            { x: 1466, y: 430 },
                            { x: 1586, y: 430 },
                            { x: 1642, y: 430 },
                            { x: 1695, y: 430 },
                            { x: 1695, y: 430 },
                            { x: 1794, y: 430 },
                            { x: 1875, y: 430 },
                            { x: 1875, y: 450 },
                            { x: 2017, y: 450 },
                            { x: 2087, y: 450 },
                            { x: 2153, y: 494 },
                            { x: 2240, y: 458 },
                            { x: 2305, y: 458 },
                            { x: 2401, y: 458 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 499 },
                            { x: 134, y: 499 },
                            { x: 254, y: 453 },
                            { x: 344, y: 453 },
                            { x: 400, y: 453 },
                            { x: 400, y: 475 },
                            { x: 519, y: 475 },
                            { x: 519, y: 504 },
                            { x: 590, y: 504 },
                            { x: 663, y: 504 },
                            { x: 663, y: 527 },
                            { x: 751, y: 501 },
                            { x: 751, y: 549 },
                            { x: 887, y: 535 },
                            { x: 939, y: 535 },
                            { x: 1018, y: 535 },
                            { x: 1018, y: 495 },
                            { x: 1094, y: 467 },
                            { x: 1094, y: 440 },
                            { x: 1169, y: 430 },
                            { x: 1223, y: 430 },
                            { x: 1283, y: 430 },
                            { x: 1283, y: 473 },
                            { x: 1364, y: 462 },
                            { x: 1364, y: 486 },
                            { x: 1441, y: 473 },
                            { x: 1500, y: 473 },
                            { x: 1585, y: 473 },
                            { x: 1585, y: 495 },
                            { x: 1727, y: 495 },
                            { x: 1822, y: 495 },
                            { x: 1822, y: 519 },
                            { x: 1930, y: 494 },
                            { x: 2008, y: 494 },
                            { x: 2087, y: 494 },
                            { x: 2169, y: 465 },
                            { x: 2302, y: 465 },
                            { x: 2369, y: 465 },
                            { x: 2492, y: 447 },
                            { x: 2492, y: 469 },
                            { x: 2589, y: 469 },
                            { x: 2680, y: 469 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 510 },
                            { x: 64, y: 510 },
                            { x: 64, y: 543 },
                            { x: 155, y: 526 },
                            { x: 212, y: 514 },
                            { x: 274, y: 514 },
                            { x: 326, y: 514 },
                            { x: 442, y: 472 },
                            { x: 442, y: 502 },
                            { x: 495, y: 484 },
                            { x: 587, y: 484 },
                            { x: 672, y: 484 },
                            { x: 748, y: 442 },
                            { x: 802, y: 442 },
                            { x: 885, y: 442 },
                            { x: 885, y: 477 },
                            { x: 1011, y: 477 },
                            { x: 1071, y: 477 },
                            { x: 1071, y: 443 },
                            { x: 1219, y: 430 },
                            { x: 1270, y: 430 },
                            { x: 1322, y: 430 },
                            { x: 1322, y: 465 },
                            { x: 1460, y: 448 },
                            { x: 1460, y: 479 },
                            { x: 1538, y: 467 },
                            { x: 1621, y: 467 },
                            { x: 1675, y: 467 },
                            { x: 1675, y: 484 },
                            { x: 1776, y: 484 },
                            { x: 1776, y: 494 },
                            { x: 1857, y: 494 },
                            { x: 1956, y: 494 },
                            { x: 2101, y: 478 },
                            { x: 2193, y: 478 },
                            { x: 2279, y: 478 },
                            { x: 2279, y: 439 },
                            { x: 2369, y: 430 },
                            { x: 2369, y: 470 },
                            { x: 2467, y: 430 },
                            { x: 2543, y: 430 },
                            { x: 2613, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 43,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 477 },
                            { x: 118, y: 477 },
                            { x: 118, y: 432 },
                            { x: 190, y: 430 },
                            { x: 190, y: 443 },
                            { x: 320, y: 443 },
                            { x: 394, y: 443 },
                            { x: 394, y: 474 },
                            { x: 521, y: 458 },
                            { x: 571, y: 458 },
                            { x: 650, y: 458 },
                            { x: 650, y: 503 },
                            { x: 706, y: 483 },
                            { x: 706, y: 450 },
                            { x: 784, y: 450 },
                            { x: 845, y: 450 },
                            { x: 845, y: 495 },
                            { x: 961, y: 450 },
                            { x: 1090, y: 430 },
                            { x: 1187, y: 430 },
                            { x: 1268, y: 430 },
                            { x: 1268, y: 461 },
                            { x: 1410, y: 430 },
                            { x: 1478, y: 430 },
                            { x: 1539, y: 430 },
                            { x: 1539, y: 442 },
                            { x: 1674, y: 442 },
                            { x: 1674, y: 488 },
                            { x: 1752, y: 488 },
                            { x: 1813, y: 488 },
                            { x: 1813, y: 516 },
                            { x: 1871, y: 486 },
                            { x: 1871, y: 509 },
                            { x: 1945, y: 476 },
                            { x: 1945, y: 511 },
                            { x: 2034, y: 468 },
                            { x: 2102, y: 468 },
                            { x: 2156, y: 468 },
                            { x: 2156, y: 448 },
                            { x: 2224, y: 482 },
                            { x: 2224, y: 436 },
                            { x: 2295, y: 430 },
                            { x: 2295, y: 445 },
                            { x: 2408, y: 445 },
                            { x: 2506, y: 445 },
                            { x: 2506, y: 474 },
                            { x: 2612, y: 474 },
                            { x: 2663, y: 474 },
                        ],
                    },

                    //9 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 443 },
                            { x: 118, y: 443 },
                            { x: 118, y: 471 },
                            { x: 183, y: 431 },
                            { x: 183, y: 468 },
                            { x: 322, y: 468 },
                            { x: 404, y: 468 },
                            { x: 404, y: 505 },
                            { x: 476, y: 505 },
                            { x: 603, y: 472 },
                            { x: 689, y: 472 },
                            { x: 749, y: 472 },
                            { x: 841, y: 455 },
                            { x: 841, y: 475 },
                            { x: 908, y: 475 },
                            { x: 908, y: 445 },
                            { x: 978, y: 445 },
                            { x: 1055, y: 445 },
                            { x: 1055, y: 492 },
                            { x: 1194, y: 471 },
                            { x: 1290, y: 455 },
                            { x: 1378, y: 455 },
                            { x: 1438, y: 455 },
                            { x: 1515, y: 440 },
                            { x: 1515, y: 440 },
                            { x: 1590, y: 461 },
                            { x: 1590, y: 450 },
                            { x: 1735, y: 472 },
                            { x: 1834, y: 472 },
                            { x: 1928, y: 472 },
                            { x: 2025, y: 430 },
                            { x: 2088, y: 430 },
                            { x: 2186, y: 430 },
                            { x: 2276, y: 440 },
                            { x: 2276, y: 464 },
                            { x: 2393, y: 440 },
                            { x: 2478, y: 440 },
                            { x: 2573, y: 440 },
                            { x: 2573, y: 451 },
                            { x: 2668, y: 430 },
                            { x: 2814, y: 430 },
                            { x: 2896, y: 430 },
                            { x: 3027, y: 430 },
                            { x: 3027, y: 457 },
                            { x: 3123, y: 430 },
                            { x: 3203, y: 430 },
                            { x: 3272, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 42,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 47,
                                stop: 53,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 463 },
                            { x: 107, y: 463 },
                            { x: 107, y: 430 },
                            { x: 221, y: 430 },
                            { x: 221, y: 440 },
                            { x: 356, y: 430 },
                            { x: 434, y: 430 },
                            { x: 508, y: 430 },
                            { x: 508, y: 447 },
                            { x: 575, y: 492 },
                            { x: 575, y: 525 },
                            { x: 646, y: 525 },
                            { x: 646, y: 489 },
                            { x: 780, y: 446 },
                            { x: 835, y: 446 },
                            { x: 903, y: 446 },
                            { x: 903, y: 459 },
                            { x: 1045, y: 430 },
                            { x: 1045, y: 447 },
                            { x: 1185, y: 447 },
                            { x: 1247, y: 447 },
                            { x: 1325, y: 436 },
                            { x: 1434, y: 436 },
                            { x: 1434, y: 483 },
                            { x: 1517, y: 452 },
                            { x: 1614, y: 452 },
                            { x: 1691, y: 452 },
                            { x: 1691, y: 430 },
                            { x: 1816, y: 430 },
                            { x: 1816, y: 474 },
                            { x: 1898, y: 442 },
                            { x: 1960, y: 442 },
                            { x: 2052, y: 442 },
                            { x: 2121, y: 471 },
                            { x: 2121, y: 455 },
                            { x: 2215, y: 455 },
                            { x: 2275, y: 455 },
                            { x: 2275, y: 484 },
                            { x: 2386, y: 465 },
                            { x: 2453, y: 434 },
                            { x: 2453, y: 434 },
                            { x: 2508, y: 430 },
                            { x: 2593, y: 430 },
                            { x: 2679, y: 430 },
                            { x: 2679, y: 454 },
                            { x: 2738, y: 454 },
                            { x: 2846, y: 430 },
                            { x: 2918, y: 430 },
                            { x: 2980, y: 430 },
                            { x: 3064, y: 430 },
                            { x: 3166, y: 463 },
                            { x: 3166, y: 497 },
                            { x: 3277, y: 481 },
                            { x: 3344, y: 481 },
                            { x: 3406, y: 481 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 37,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 42,
                                stop: 48,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 510 },
                            { x: 62, y: 510 },
                            { x: 62, y: 465 },
                            { x: 190, y: 437 },
                            { x: 303, y: 437 },
                            { x: 366, y: 437 },
                            { x: 366, y: 476 },
                            { x: 424, y: 476 },
                            { x: 502, y: 437 },
                            { x: 502, y: 484 },
                            { x: 593, y: 439 },
                            { x: 661, y: 439 },
                            { x: 722, y: 439 },
                            { x: 722, y: 487 },
                            { x: 827, y: 487 },
                            { x: 926, y: 452 },
                            { x: 996, y: 452 },
                            { x: 1086, y: 452 },
                            { x: 1086, y: 430 },
                            { x: 1228, y: 430 },
                            { x: 1228, y: 469 },
                            { x: 1333, y: 430 },
                            { x: 1425, y: 430 },
                            { x: 1515, y: 430 },
                            { x: 1515, y: 444 },
                            { x: 1633, y: 430 },
                            { x: 1714, y: 430 },
                            { x: 1794, y: 430 },
                            { x: 1917, y: 448 },
                            { x: 1917, y: 487 },
                            { x: 2042, y: 454 },
                            { x: 2102, y: 454 },
                            { x: 2158, y: 454 },
                            { x: 2158, y: 497 },
                            { x: 2284, y: 470 },
                            { x: 2338, y: 430 },
                            { x: 2338, y: 477 },
                            { x: 2437, y: 477 },
                            { x: 2534, y: 477 },
                            { x: 2647, y: 463 },
                            { x: 2647, y: 507 },
                            { x: 2732, y: 476 },
                            { x: 2801, y: 476 },
                            { x: 2892, y: 476 },
                            { x: 2892, y: 488 },
                            { x: 3027, y: 471 },
                            { x: 3027, y: 448 },
                            { x: 3117, y: 430 },
                            { x: 3183, y: 430 },
                            { x: 3242, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 42,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 492 },
                            { x: 124, y: 492 },
                            { x: 124, y: 453 },
                            { x: 198, y: 437 },
                            { x: 198, y: 466 },
                            { x: 281, y: 438 },
                            { x: 338, y: 438 },
                            { x: 409, y: 438 },
                            { x: 409, y: 454 },
                            { x: 535, y: 430 },
                            { x: 654, y: 430 },
                            { x: 725, y: 430 },
                            { x: 725, y: 477 },
                            { x: 793, y: 464 },
                            { x: 793, y: 438 },
                            { x: 894, y: 455 },
                            { x: 966, y: 455 },
                            { x: 1025, y: 455 },
                            { x: 1025, y: 430 },
                            { x: 1105, y: 448 },
                            { x: 1171, y: 448 },
                            { x: 1171, y: 494 },
                            { x: 1272, y: 494 },
                            { x: 1359, y: 494 },
                            { x: 1359, y: 536 },
                            { x: 1450, y: 536 },
                            { x: 1595, y: 492 },
                            { x: 1653, y: 492 },
                            { x: 1734, y: 492 },
                            { x: 1734, y: 517 },
                            { x: 1830, y: 469 },
                            { x: 1830, y: 500 },
                            { x: 1920, y: 472 },
                            { x: 1971, y: 472 },
                            { x: 2035, y: 472 },
                            { x: 2035, y: 488 },
                            { x: 2113, y: 473 },
                            { x: 2113, y: 511 },
                            { x: 2222, y: 511 },
                            { x: 2307, y: 511 },
                            { x: 2450, y: 476 },
                            { x: 2450, y: 430 },
                            { x: 2552, y: 430 },
                            { x: 2636, y: 430 },
                            { x: 2778, y: 430 },
                            { x: 2778, y: 468 },
                            { x: 2890, y: 468 },
                            { x: 2989, y: 468 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 46,
                                stop: 54,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 449 },
                            { x: 91, y: 449 },
                            { x: 227, y: 430 },
                            { x: 372, y: 465 },
                            { x: 457, y: 465 },
                            { x: 542, y: 465 },
                            { x: 542, y: 430 },
                            { x: 648, y: 476 },
                            { x: 713, y: 435 },
                            { x: 779, y: 435 },
                            { x: 866, y: 435 },
                            { x: 948, y: 430 },
                            { x: 948, y: 474 },
                            { x: 999, y: 448 },
                            { x: 999, y: 474 },
                            { x: 1078, y: 458 },
                            { x: 1177, y: 458 },
                            { x: 1235, y: 458 },
                            { x: 1235, y: 430 },
                            { x: 1318, y: 430 },
                            { x: 1318, y: 478 },
                            { x: 1370, y: 444 },
                            { x: 1370, y: 444 },
                            { x: 1430, y: 430 },
                            { x: 1524, y: 430 },
                            { x: 1577, y: 430 },
                            { x: 1577, y: 440 },
                            { x: 1647, y: 430 },
                            { x: 1647, y: 468 },
                            { x: 1713, y: 430 },
                            { x: 1862, y: 430 },
                            { x: 1915, y: 430 },
                            { x: 1915, y: 476 },
                            { x: 1995, y: 476 },
                            { x: 1995, y: 441 },
                            { x: 2114, y: 441 },
                            { x: 2213, y: 441 },
                            { x: 2213, y: 470 },
                            { x: 2287, y: 470 },
                            { x: 2422, y: 441 },
                            { x: 2483, y: 441 },
                            { x: 2557, y: 441 },
                            { x: 2557, y: 482 },
                            { x: 2615, y: 482 },
                            { x: 2701, y: 451 },
                            { x: 2701, y: 492 },
                            { x: 2803, y: 492 },
                            { x: 2873, y: 492 },
                            { x: 2873, y: 506 },
                            { x: 2942, y: 506 },
                            { x: 2942, y: 471 },
                            { x: 3010, y: 471 },
                            { x: 3010, y: 519 },
                            { x: 3117, y: 504 },
                            { x: 3189, y: 504 },
                            { x: 3239, y: 504 },
                        ],
                    },

                    //10 targets - distance of 350
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 45,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 549 },
                            { x: 60, y: 549 },
                            { x: 60, y: 534 },
                            { x: 126, y: 518 },
                            { x: 126, y: 482 },
                            { x: 241, y: 454 },
                            { x: 318, y: 454 },
                            { x: 369, y: 454 },
                            { x: 369, y: 501 },
                            { x: 476, y: 501 },
                            { x: 476, y: 533 },
                            { x: 572, y: 533 },
                            { x: 636, y: 533 },
                            { x: 636, y: 501 },
                            { x: 697, y: 471 },
                            { x: 697, y: 500 },
                            { x: 769, y: 500 },
                            { x: 769, y: 477 },
                            { x: 832, y: 477 },
                            { x: 913, y: 477 },
                            { x: 1047, y: 465 },
                            { x: 1140, y: 465 },
                            { x: 1191, y: 465 },
                            { x: 1191, y: 476 },
                            { x: 1252, y: 440 },
                            { x: 1352, y: 440 },
                            { x: 1403, y: 440 },
                            { x: 1473, y: 485 },
                            { x: 1533, y: 459 },
                            { x: 1533, y: 435 },
                            { x: 1644, y: 430 },
                            { x: 1695, y: 430 },
                            { x: 1785, y: 430 },
                            { x: 1785, y: 442 },
                            { x: 1860, y: 442 },
                            { x: 1860, y: 474 },
                            { x: 1990, y: 474 },
                            { x: 2084, y: 474 },
                            { x: 2084, y: 437 },
                            { x: 2171, y: 430 },
                            { x: 2270, y: 430 },
                            { x: 2344, y: 430 },
                            { x: 2419, y: 430 },
                            { x: 2419, y: 476 },
                            { x: 2513, y: 430 },
                            { x: 2603, y: 430 },
                            { x: 2680, y: 430 },
                            { x: 2811, y: 430 },
                            { x: 2888, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 475 },
                            { x: 144, y: 475 },
                            { x: 238, y: 444 },
                            { x: 289, y: 444 },
                            { x: 356, y: 444 },
                            { x: 425, y: 430 },
                            { x: 425, y: 471 },
                            { x: 567, y: 460 },
                            { x: 625, y: 460 },
                            { x: 705, y: 460 },
                            { x: 705, y: 494 },
                            { x: 764, y: 494 },
                            { x: 764, y: 523 },
                            { x: 867, y: 523 },
                            { x: 926, y: 523 },
                            { x: 1064, y: 489 },
                            { x: 1064, y: 519 },
                            { x: 1194, y: 485 },
                            { x: 1290, y: 485 },
                            { x: 1376, y: 485 },
                            { x: 1494, y: 461 },
                            { x: 1577, y: 461 },
                            { x: 1666, y: 461 },
                            { x: 1666, y: 438 },
                            { x: 1722, y: 438 },
                            { x: 1722, y: 475 },
                            { x: 1834, y: 475 },
                            { x: 1886, y: 475 },
                            { x: 2012, y: 433 },
                            { x: 2012, y: 433 },
                            { x: 2113, y: 430 },
                            { x: 2205, y: 430 },
                            { x: 2292, y: 430 },
                            { x: 2367, y: 430 },
                            { x: 2367, y: 444 },
                            { x: 2493, y: 444 },
                            { x: 2583, y: 444 },
                            { x: 2583, y: 478 },
                            { x: 2642, y: 478 },
                            { x: 2747, y: 456 },
                            { x: 2800, y: 456 },
                            { x: 2884, y: 456 },
                            { x: 2884, y: 485 },
                            { x: 2938, y: 471 },
                            { x: 2938, y: 498 },
                            { x: 3060, y: 498 },
                            { x: 3155, y: 498 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 544 },
                            { x: 91, y: 544 },
                            { x: 217, y: 502 },
                            { x: 279, y: 502 },
                            { x: 362, y: 502 },
                            { x: 362, y: 542 },
                            { x: 493, y: 542 },
                            { x: 566, y: 542 },
                            { x: 688, y: 498 },
                            { x: 770, y: 498 },
                            { x: 836, y: 498 },
                            { x: 836, y: 468 },
                            { x: 971, y: 446 },
                            { x: 1035, y: 446 },
                            { x: 1123, y: 446 },
                            { x: 1188, y: 480 },
                            { x: 1330, y: 480 },
                            { x: 1388, y: 480 },
                            { x: 1463, y: 463 },
                            { x: 1463, y: 430 },
                            { x: 1551, y: 430 },
                            { x: 1631, y: 430 },
                            { x: 1631, y: 445 },
                            { x: 1773, y: 445 },
                            { x: 1838, y: 445 },
                            { x: 1954, y: 430 },
                            { x: 1954, y: 447 },
                            { x: 2032, y: 447 },
                            { x: 2090, y: 447 },
                            { x: 2090, y: 465 },
                            { x: 2153, y: 431 },
                            { x: 2153, y: 457 },
                            { x: 2299, y: 430 },
                            { x: 2392, y: 430 },
                            { x: 2478, y: 430 },
                            { x: 2544, y: 430 },
                            { x: 2668, y: 430 },
                            { x: 2765, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 37,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 42,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 478 },
                            { x: 112, y: 478 },
                            { x: 230, y: 441 },
                            { x: 300, y: 441 },
                            { x: 353, y: 441 },
                            { x: 353, y: 467 },
                            { x: 403, y: 443 },
                            { x: 403, y: 466 },
                            { x: 499, y: 466 },
                            { x: 613, y: 445 },
                            { x: 686, y: 445 },
                            { x: 741, y: 445 },
                            { x: 821, y: 465 },
                            { x: 952, y: 430 },
                            { x: 1037, y: 430 },
                            { x: 1127, y: 430 },
                            { x: 1127, y: 471 },
                            { x: 1243, y: 450 },
                            { x: 1326, y: 450 },
                            { x: 1381, y: 450 },
                            { x: 1381, y: 477 },
                            { x: 1515, y: 455 },
                            { x: 1515, y: 493 },
                            { x: 1583, y: 469 },
                            { x: 1646, y: 469 },
                            { x: 1736, y: 469 },
                            { x: 1736, y: 511 },
                            { x: 1884, y: 470 },
                            { x: 1983, y: 470 },
                            { x: 2038, y: 470 },
                            { x: 2038, y: 514 },
                            { x: 2129, y: 514 },
                            { x: 2266, y: 469 },
                            { x: 2331, y: 469 },
                            { x: 2382, y: 469 },
                            { x: 2479, y: 456 },
                            { x: 2545, y: 434 },
                            { x: 2597, y: 434 },
                            { x: 2683, y: 434 },
                            { x: 2683, y: 446 },
                            { x: 2781, y: 430 },
                            { x: 2781, y: 450 },
                            { x: 2882, y: 450 },
                            { x: 2950, y: 450 },
                            { x: 3079, y: 433 },
                            { x: 3079, y: 446 },
                            { x: 3160, y: 430 },
                            { x: 3255, y: 430 },
                            { x: 3312, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 46,
                                stop: 50,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 487 },
                            { x: 95, y: 487 },
                            { x: 95, y: 442 },
                            { x: 166, y: 442 },
                            { x: 166, y: 489 },
                            { x: 299, y: 446 },
                            { x: 362, y: 446 },
                            { x: 426, y: 446 },
                            { x: 571, y: 433 },
                            { x: 648, y: 433 },
                            { x: 702, y: 433 },
                            { x: 827, y: 451 },
                            { x: 958, y: 430 },
                            { x: 1025, y: 430 },
                            { x: 1077, y: 430 },
                            { x: 1077, y: 456 },
                            { x: 1159, y: 456 },
                            { x: 1219, y: 430 },
                            { x: 1219, y: 453 },
                            { x: 1335, y: 430 },
                            { x: 1430, y: 430 },
                            { x: 1505, y: 430 },
                            { x: 1505, y: 459 },
                            { x: 1635, y: 443 },
                            { x: 1718, y: 443 },
                            { x: 1792, y: 443 },
                            { x: 1792, y: 478 },
                            { x: 1876, y: 478 },
                            { x: 1876, y: 515 },
                            { x: 1989, y: 515 },
                            { x: 2045, y: 515 },
                            { x: 2045, y: 474 },
                            { x: 2108, y: 430 },
                            { x: 2108, y: 458 },
                            { x: 2164, y: 443 },
                            { x: 2164, y: 466 },
                            { x: 2229, y: 466 },
                            { x: 2298, y: 466 },
                            { x: 2298, y: 498 },
                            { x: 2442, y: 469 },
                            { x: 2515, y: 469 },
                            { x: 2568, y: 469 },
                            { x: 2568, y: 494 },
                            { x: 2703, y: 483 },
                            { x: 2703, y: 519 },
                            { x: 2809, y: 508 },
                            { x: 2890, y: 508 },
                            { x: 2963, y: 508 },
                            { x: 3064, y: 486 },
                            { x: 3064, y: 502 },
                            { x: 3181, y: 502 },
                            { x: 3238, y: 502 },
                        ],
                    },

                    //10 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 48,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 48,
                                stop: 51,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 547 },
                            { x: 80, y: 547 },
                            { x: 80, y: 532 },
                            { x: 156, y: 506 },
                            { x: 156, y: 531 },
                            { x: 298, y: 500 },
                            { x: 354, y: 500 },
                            { x: 428, y: 500 },
                            { x: 428, y: 487 },
                            { x: 532, y: 456 },
                            { x: 678, y: 434 },
                            { x: 732, y: 434 },
                            { x: 806, y: 434 },
                            { x: 806, y: 481 },
                            { x: 899, y: 453 },
                            { x: 899, y: 430 },
                            { x: 976, y: 430 },
                            { x: 976, y: 472 },
                            { x: 1046, y: 430 },
                            { x: 1132, y: 430 },
                            { x: 1225, y: 430 },
                            { x: 1225, y: 462 },
                            { x: 1366, y: 462 },
                            { x: 1366, y: 430 },
                            { x: 1477, y: 430 },
                            { x: 1531, y: 430 },
                            { x: 1531, y: 456 },
                            { x: 1633, y: 431 },
                            { x: 1716, y: 430 },
                            { x: 1716, y: 430 },
                            { x: 1806, y: 430 },
                            { x: 1895, y: 430 },
                            { x: 1895, y: 475 },
                            { x: 2010, y: 436 },
                            { x: 2010, y: 484 },
                            { x: 2099, y: 446 },
                            { x: 2185, y: 446 },
                            { x: 2277, y: 446 },
                            { x: 2277, y: 464 },
                            { x: 2345, y: 430 },
                            { x: 2483, y: 430 },
                            { x: 2553, y: 430 },
                            { x: 2553, y: 463 },
                            { x: 2631, y: 443 },
                            { x: 2747, y: 443 },
                            { x: 2835, y: 443 },
                            { x: 2964, y: 430 },
                            { x: 2964, y: 479 },
                            { x: 3048, y: 479 },
                            { x: 3100, y: 479 },
                            { x: 3247, y: 440 },
                            { x: 3365, y: 440 },
                            { x: 3418, y: 440 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 50,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 50,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 503 },
                            { x: 82, y: 503 },
                            { x: 82, y: 466 },
                            { x: 170, y: 430 },
                            { x: 170, y: 451 },
                            { x: 270, y: 430 },
                            { x: 357, y: 430 },
                            { x: 441, y: 430 },
                            { x: 441, y: 468 },
                            { x: 522, y: 430 },
                            { x: 626, y: 442 },
                            { x: 699, y: 442 },
                            { x: 772, y: 442 },
                            { x: 772, y: 470 },
                            { x: 828, y: 432 },
                            { x: 828, y: 481 },
                            { x: 923, y: 442 },
                            { x: 923, y: 491 },
                            { x: 986, y: 470 },
                            { x: 1054, y: 470 },
                            { x: 1117, y: 470 },
                            { x: 1183, y: 442 },
                            { x: 1183, y: 484 },
                            { x: 1276, y: 440 },
                            { x: 1276, y: 453 },
                            { x: 1364, y: 453 },
                            { x: 1416, y: 453 },
                            { x: 1496, y: 430 },
                            { x: 1496, y: 430 },
                            { x: 1642, y: 430 },
                            { x: 1717, y: 430 },
                            { x: 1717, y: 462 },
                            { x: 1861, y: 462 },
                            { x: 1861, y: 511 },
                            { x: 1972, y: 511 },
                            { x: 2057, y: 511 },
                            { x: 2122, y: 467 },
                            { x: 2221, y: 430 },
                            { x: 2221, y: 430 },
                            { x: 2290, y: 430 },
                            { x: 2353, y: 430 },
                            { x: 2427, y: 430 },
                            { x: 2427, y: 456 },
                            { x: 2553, y: 430 },
                            { x: 2639, y: 430 },
                            { x: 2703, y: 430 },
                            { x: 2787, y: 430 },
                            { x: 2787, y: 462 },
                            { x: 2868, y: 462 },
                            { x: 2868, y: 492 },
                            { x: 3003, y: 492 },
                            { x: 3064, y: 492 },
                            { x: 3131, y: 464 },
                            { x: 3131, y: 492 },
                            { x: 3241, y: 492 },
                            { x: 3241, y: 443 },
                            { x: 3329, y: 457 },
                            { x: 3401, y: 457 },
                            { x: 3499, y: 457 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 47,
                                stop: 50,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 50,
                                stop: 55,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 549 },
                            { x: 64, y: 549 },
                            { x: 64, y: 537 },
                            { x: 160, y: 496 },
                            { x: 265, y: 447 },
                            { x: 346, y: 447 },
                            { x: 401, y: 447 },
                            { x: 401, y: 479 },
                            { x: 541, y: 479 },
                            { x: 541, y: 434 },
                            { x: 630, y: 430 },
                            { x: 714, y: 430 },
                            { x: 775, y: 430 },
                            { x: 904, y: 470 },
                            { x: 904, y: 430 },
                            { x: 995, y: 430 },
                            { x: 1045, y: 430 },
                            { x: 1045, y: 455 },
                            { x: 1146, y: 430 },
                            { x: 1146, y: 477 },
                            { x: 1236, y: 477 },
                            { x: 1384, y: 455 },
                            { x: 1473, y: 455 },
                            { x: 1566, y: 455 },
                            { x: 1566, y: 430 },
                            { x: 1711, y: 430 },
                            { x: 1711, y: 474 },
                            { x: 1822, y: 463 },
                            { x: 1920, y: 463 },
                            { x: 1997, y: 463 },
                            { x: 1997, y: 489 },
                            { x: 2103, y: 454 },
                            { x: 2103, y: 475 },
                            { x: 2235, y: 457 },
                            { x: 2321, y: 457 },
                            { x: 2394, y: 457 },
                            { x: 2394, y: 493 },
                            { x: 2464, y: 473 },
                            { x: 2464, y: 446 },
                            { x: 2564, y: 487 },
                            { x: 2564, y: 521 },
                            { x: 2664, y: 521 },
                            { x: 2741, y: 521 },
                            { x: 2741, y: 472 },
                            { x: 2865, y: 472 },
                            { x: 2865, y: 448 },
                            { x: 2990, y: 430 },
                            { x: 3045, y: 430 },
                            { x: 3123, y: 430 },
                            { x: 3268, y: 430 },
                            { x: 3416, y: 430 },
                            { x: 3474, y: 430 },
                            { x: 3585, y: 470 },
                            { x: 3585, y: 484 },
                            { x: 3676, y: 437 },
                            { x: 3753, y: 437 },
                            { x: 3830, y: 437 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 47,
                                stop: 52,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 504 },
                            { x: 110, y: 504 },
                            { x: 110, y: 540 },
                            { x: 192, y: 515 },
                            { x: 274, y: 515 },
                            { x: 342, y: 515 },
                            { x: 342, y: 466 },
                            { x: 455, y: 466 },
                            { x: 455, y: 446 },
                            { x: 523, y: 446 },
                            { x: 583, y: 430 },
                            { x: 640, y: 430 },
                            { x: 701, y: 430 },
                            { x: 829, y: 430 },
                            { x: 829, y: 445 },
                            { x: 918, y: 445 },
                            { x: 1010, y: 445 },
                            { x: 1130, y: 481 },
                            { x: 1211, y: 456 },
                            { x: 1294, y: 456 },
                            { x: 1374, y: 456 },
                            { x: 1374, y: 492 },
                            { x: 1443, y: 463 },
                            { x: 1531, y: 444 },
                            { x: 1630, y: 473 },
                            { x: 1705, y: 473 },
                            { x: 1788, y: 473 },
                            { x: 1788, y: 506 },
                            { x: 1920, y: 457 },
                            { x: 2006, y: 434 },
                            { x: 2068, y: 434 },
                            { x: 2147, y: 434 },
                            { x: 2208, y: 430 },
                            { x: 2208, y: 450 },
                            { x: 2348, y: 430 },
                            { x: 2431, y: 430 },
                            { x: 2501, y: 430 },
                            { x: 2501, y: 469 },
                            { x: 2617, y: 469 },
                            { x: 2617, y: 430 },
                            { x: 2673, y: 430 },
                            { x: 2732, y: 430 },
                            { x: 2798, y: 430 },
                            { x: 2878, y: 430 },
                            { x: 2958, y: 430 },
                            { x: 2958, y: 469 },
                            { x: 3047, y: 440 },
                            { x: 3103, y: 440 },
                            { x: 3185, y: 440 },
                            { x: 3185, y: 456 },
                            { x: 3300, y: 437 },
                            { x: 3446, y: 430 },
                            { x: 3497, y: 430 },
                            { x: 3582, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 37,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 42,
                                stop: 47,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 47,
                                stop: 52,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 483 },
                            { x: 81, y: 483 },
                            { x: 81, y: 449 },
                            { x: 190, y: 467 },
                            { x: 190, y: 497 },
                            { x: 246, y: 497 },
                            { x: 246, y: 485 },
                            { x: 346, y: 464 },
                            { x: 402, y: 464 },
                            { x: 494, y: 464 },
                            { x: 494, y: 497 },
                            { x: 623, y: 497 },
                            { x: 623, y: 543 },
                            { x: 687, y: 543 },
                            { x: 761, y: 543 },
                            { x: 886, y: 497 },
                            { x: 886, y: 518 },
                            { x: 990, y: 469 },
                            { x: 1071, y: 469 },
                            { x: 1130, y: 469 },
                            { x: 1257, y: 455 },
                            { x: 1371, y: 430 },
                            { x: 1469, y: 430 },
                            { x: 1538, y: 430 },
                            { x: 1538, y: 473 },
                            { x: 1608, y: 473 },
                            { x: 1734, y: 446 },
                            { x: 1787, y: 446 },
                            { x: 1867, y: 446 },
                            { x: 1867, y: 477 },
                            { x: 1923, y: 477 },
                            { x: 1923, y: 496 },
                            { x: 2003, y: 456 },
                            { x: 2104, y: 456 },
                            { x: 2198, y: 456 },
                            { x: 2198, y: 473 },
                            { x: 2251, y: 432 },
                            { x: 2383, y: 432 },
                            { x: 2466, y: 432 },
                            { x: 2466, y: 442 },
                            { x: 2546, y: 442 },
                            { x: 2692, y: 430 },
                            { x: 2769, y: 430 },
                            { x: 2859, y: 430 },
                            { x: 2859, y: 463 },
                            { x: 3007, y: 437 },
                            { x: 3007, y: 455 },
                            { x: 3125, y: 455 },
                            { x: 3201, y: 455 },
                            { x: 3201, y: 434 },
                            { x: 3318, y: 430 },
                            { x: 3368, y: 430 },
                            { x: 3512, y: 430 },
                            { x: 3580, y: 430 },
                        ],
                    },

                    //11 targets - distance of 300
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 516 },
                            { x: 63, y: 516 },
                            { x: 63, y: 540 },
                            { x: 177, y: 519 },
                            { x: 262, y: 519 },
                            { x: 330, y: 519 },
                            { x: 330, y: 546 },
                            { x: 468, y: 530 },
                            { x: 547, y: 530 },
                            { x: 641, y: 530 },
                            { x: 641, y: 557 },
                            { x: 698, y: 557 },
                            { x: 775, y: 557 },
                            { x: 775, y: 508 },
                            { x: 924, y: 461 },
                            { x: 1004, y: 461 },
                            { x: 1077, y: 461 },
                            { x: 1201, y: 430 },
                            { x: 1278, y: 430 },
                            { x: 1347, y: 430 },
                            { x: 1347, y: 457 },
                            { x: 1458, y: 430 },
                            { x: 1540, y: 430 },
                            { x: 1591, y: 430 },
                            { x: 1591, y: 469 },
                            { x: 1679, y: 469 },
                            { x: 1764, y: 453 },
                            { x: 1819, y: 453 },
                            { x: 1887, y: 453 },
                            { x: 1887, y: 469 },
                            { x: 1980, y: 438 },
                            { x: 2044, y: 438 },
                            { x: 2141, y: 438 },
                            { x: 2141, y: 480 },
                            { x: 2225, y: 480 },
                            { x: 2288, y: 480 },
                            { x: 2288, y: 461 },
                            { x: 2407, y: 430 },
                            { x: 2503, y: 430 },
                            { x: 2554, y: 430 },
                            { x: 2622, y: 430 },
                            { x: 2740, y: 430 },
                            { x: 2800, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 523 },
                            { x: 98, y: 523 },
                            { x: 180, y: 474 },
                            { x: 278, y: 474 },
                            { x: 376, y: 474 },
                            { x: 376, y: 519 },
                            { x: 435, y: 486 },
                            { x: 490, y: 486 },
                            { x: 588, y: 486 },
                            { x: 681, y: 438 },
                            { x: 747, y: 438 },
                            { x: 804, y: 438 },
                            { x: 860, y: 430 },
                            { x: 860, y: 475 },
                            { x: 979, y: 451 },
                            { x: 1043, y: 451 },
                            { x: 1103, y: 451 },
                            { x: 1103, y: 486 },
                            { x: 1244, y: 486 },
                            { x: 1319, y: 486 },
                            { x: 1319, y: 437 },
                            { x: 1373, y: 437 },
                            { x: 1373, y: 448 },
                            { x: 1492, y: 448 },
                            { x: 1560, y: 448 },
                            { x: 1633, y: 430 },
                            { x: 1633, y: 457 },
                            { x: 1756, y: 430 },
                            { x: 1816, y: 430 },
                            { x: 1887, y: 430 },
                            { x: 1937, y: 476 },
                            { x: 2029, y: 476 },
                            { x: 2112, y: 476 },
                            { x: 2194, y: 459 },
                            { x: 2268, y: 459 },
                            { x: 2349, y: 459 },
                            { x: 2349, y: 439 },
                            { x: 2407, y: 430 },
                            { x: 2516, y: 430 },
                            { x: 2611, y: 430 },
                            { x: 2611, y: 467 },
                            { x: 2736, y: 439 },
                            { x: 2796, y: 439 },
                            { x: 2854, y: 439 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 42,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 440 },
                            { x: 51, y: 440 },
                            { x: 51, y: 486 },
                            { x: 105, y: 458 },
                            { x: 105, y: 497 },
                            { x: 249, y: 453 },
                            { x: 303, y: 453 },
                            { x: 391, y: 453 },
                            { x: 391, y: 437 },
                            { x: 483, y: 471 },
                            { x: 580, y: 471 },
                            { x: 651, y: 471 },
                            { x: 736, y: 457 },
                            { x: 832, y: 457 },
                            { x: 926, y: 457 },
                            { x: 1063, y: 432 },
                            { x: 1162, y: 432 },
                            { x: 1251, y: 432 },
                            { x: 1362, y: 430 },
                            { x: 1414, y: 430 },
                            { x: 1511, y: 430 },
                            { x: 1511, y: 453 },
                            { x: 1597, y: 441 },
                            { x: 1658, y: 441 },
                            { x: 1748, y: 441 },
                            { x: 1748, y: 452 },
                            { x: 1842, y: 452 },
                            { x: 1911, y: 452 },
                            { x: 1911, y: 432 },
                            { x: 1971, y: 473 },
                            { x: 1971, y: 439 },
                            { x: 2049, y: 439 },
                            { x: 2130, y: 439 },
                            { x: 2130, y: 460 },
                            { x: 2181, y: 460 },
                            { x: 2181, y: 447 },
                            { x: 2236, y: 447 },
                            { x: 2312, y: 447 },
                            { x: 2312, y: 457 },
                            { x: 2391, y: 457 },
                            { x: 2444, y: 457 },
                            { x: 2558, y: 444 },
                            { x: 2632, y: 444 },
                            { x: 2719, y: 444 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 32,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 527 },
                            { x: 97, y: 527 },
                            { x: 97, y: 492 },
                            { x: 159, y: 452 },
                            { x: 231, y: 452 },
                            { x: 286, y: 452 },
                            { x: 286, y: 488 },
                            { x: 425, y: 488 },
                            { x: 519, y: 488 },
                            { x: 519, y: 502 },
                            { x: 582, y: 502 },
                            { x: 641, y: 502 },
                            { x: 641, y: 488 },
                            { x: 724, y: 462 },
                            { x: 813, y: 447 },
                            { x: 894, y: 447 },
                            { x: 963, y: 447 },
                            { x: 1079, y: 430 },
                            { x: 1156, y: 430 },
                            { x: 1252, y: 430 },
                            { x: 1252, y: 463 },
                            { x: 1348, y: 449 },
                            { x: 1420, y: 449 },
                            { x: 1481, y: 449 },
                            { x: 1532, y: 491 },
                            { x: 1615, y: 491 },
                            { x: 1699, y: 491 },
                            { x: 1699, y: 508 },
                            { x: 1827, y: 482 },
                            { x: 1920, y: 482 },
                            { x: 1986, y: 482 },
                            { x: 1986, y: 442 },
                            { x: 2100, y: 442 },
                            { x: 2186, y: 442 },
                            { x: 2320, y: 430 },
                            { x: 2377, y: 430 },
                            { x: 2468, y: 430 },
                            { x: 2468, y: 477 },
                            { x: 2559, y: 477 },
                            { x: 2637, y: 477 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 18,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 18,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 32,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 564 },
                            { x: 145, y: 564 },
                            { x: 145, y: 518 },
                            { x: 286, y: 505 },
                            { x: 345, y: 505 },
                            { x: 437, y: 505 },
                            { x: 437, y: 542 },
                            { x: 502, y: 542 },
                            { x: 584, y: 542 },
                            { x: 584, y: 496 },
                            { x: 644, y: 455 },
                            { x: 719, y: 455 },
                            { x: 785, y: 455 },
                            { x: 785, y: 486 },
                            { x: 880, y: 440 },
                            { x: 964, y: 440 },
                            { x: 1033, y: 440 },
                            { x: 1166, y: 430 },
                            { x: 1257, y: 430 },
                            { x: 1323, y: 430 },
                            { x: 1323, y: 455 },
                            { x: 1424, y: 455 },
                            { x: 1479, y: 455 },
                            { x: 1479, y: 473 },
                            { x: 1590, y: 446 },
                            { x: 1643, y: 446 },
                            { x: 1738, y: 446 },
                            { x: 1738, y: 478 },
                            { x: 1868, y: 449 },
                            { x: 1931, y: 449 },
                            { x: 2016, y: 449 },
                            { x: 2091, y: 430 },
                            { x: 2154, y: 430 },
                            { x: 2217, y: 430 },
                            { x: 2284, y: 430 },
                            { x: 2349, y: 430 },
                            { x: 2412, y: 430 },
                            { x: 2412, y: 470 },
                            { x: 2545, y: 457 },
                            { x: 2625, y: 457 },
                            { x: 2724, y: 457 },
                        ],
                    },

                    //11 targets - distance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 32,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 43,
                                stop: 51,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 51,
                                stop: 55,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 55,
                                stop: 61,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 497 },
                            { x: 91, y: 497 },
                            { x: 91, y: 464 },
                            { x: 156, y: 464 },
                            { x: 236, y: 430 },
                            { x: 364, y: 430 },
                            { x: 415, y: 430 },
                            { x: 415, y: 453 },
                            { x: 470, y: 438 },
                            { x: 470, y: 485 },
                            { x: 554, y: 485 },
                            { x: 660, y: 450 },
                            { x: 722, y: 450 },
                            { x: 793, y: 450 },
                            { x: 793, y: 486 },
                            { x: 894, y: 439 },
                            { x: 993, y: 439 },
                            { x: 1073, y: 439 },
                            { x: 1073, y: 488 },
                            { x: 1171, y: 488 },
                            { x: 1171, y: 472 },
                            { x: 1279, y: 433 },
                            { x: 1338, y: 433 },
                            { x: 1419, y: 433 },
                            { x: 1419, y: 444 },
                            { x: 1555, y: 430 },
                            { x: 1651, y: 430 },
                            { x: 1725, y: 430 },
                            { x: 1794, y: 430 },
                            { x: 1794, y: 447 },
                            { x: 1873, y: 430 },
                            { x: 1873, y: 430 },
                            { x: 1968, y: 430 },
                            { x: 2051, y: 430 },
                            { x: 2051, y: 464 },
                            { x: 2200, y: 464 },
                            { x: 2200, y: 445 },
                            { x: 2281, y: 430 },
                            { x: 2358, y: 430 },
                            { x: 2410, y: 430 },
                            { x: 2410, y: 479 },
                            { x: 2537, y: 454 },
                            { x: 2623, y: 439 },
                            { x: 2685, y: 439 },
                            { x: 2742, y: 439 },
                            { x: 2742, y: 453 },
                            { x: 2834, y: 430 },
                            { x: 2834, y: 430 },
                            { x: 2902, y: 462 },
                            { x: 2902, y: 476 },
                            { x: 3036, y: 435 },
                            { x: 3122, y: 435 },
                            { x: 3205, y: 435 },
                            { x: 3205, y: 446 },
                            { x: 3337, y: 430 },
                            { x: 3462, y: 430 },
                            { x: 3519, y: 430 },
                            { x: 3620, y: 454 },
                            { x: 3620, y: 491 },
                            { x: 3688, y: 491 },
                            { x: 3688, y: 529 },
                            { x: 3822, y: 529 },
                            { x: 3892, y: 529 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 43,
                                stop: 48,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 48,
                                stop: 53,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 528 },
                            { x: 56, y: 528 },
                            { x: 56, y: 552 },
                            { x: 161, y: 527 },
                            { x: 161, y: 560 },
                            { x: 218, y: 541 },
                            { x: 312, y: 494 },
                            { x: 389, y: 494 },
                            { x: 451, y: 494 },
                            { x: 451, y: 522 },
                            { x: 581, y: 522 },
                            { x: 581, y: 535 },
                            { x: 643, y: 535 },
                            { x: 740, y: 535 },
                            { x: 794, y: 509 },
                            { x: 907, y: 509 },
                            { x: 999, y: 509 },
                            { x: 999, y: 463 },
                            { x: 1121, y: 430 },
                            { x: 1121, y: 465 },
                            { x: 1238, y: 465 },
                            { x: 1300, y: 465 },
                            { x: 1300, y: 430 },
                            { x: 1422, y: 430 },
                            { x: 1519, y: 430 },
                            { x: 1613, y: 430 },
                            { x: 1613, y: 463 },
                            { x: 1714, y: 463 },
                            { x: 1831, y: 438 },
                            { x: 1928, y: 438 },
                            { x: 2023, y: 438 },
                            { x: 2023, y: 477 },
                            { x: 2096, y: 477 },
                            { x: 2233, y: 434 },
                            { x: 2299, y: 434 },
                            { x: 2362, y: 434 },
                            { x: 2362, y: 448 },
                            { x: 2511, y: 430 },
                            { x: 2511, y: 430 },
                            { x: 2573, y: 430 },
                            { x: 2642, y: 430 },
                            { x: 2642, y: 446 },
                            { x: 2693, y: 430 },
                            { x: 2829, y: 430 },
                            { x: 2904, y: 430 },
                            { x: 2904, y: 448 },
                            { x: 3008, y: 448 },
                            { x: 3008, y: 473 },
                            { x: 3131, y: 473 },
                            { x: 3221, y: 473 },
                            { x: 3312, y: 450 },
                            { x: 3312, y: 471 },
                            { x: 3390, y: 430 },
                            { x: 3441, y: 430 },
                            { x: 3505, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 46,
                                stop: 53,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 53,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 57,
                                stop: 64,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 468 },
                            { x: 117, y: 468 },
                            { x: 117, y: 484 },
                            { x: 190, y: 484 },
                            { x: 190, y: 449 },
                            { x: 250, y: 476 },
                            { x: 250, y: 450 },
                            { x: 310, y: 434 },
                            { x: 397, y: 434 },
                            { x: 450, y: 434 },
                            { x: 502, y: 430 },
                            { x: 611, y: 430 },
                            { x: 611, y: 441 },
                            { x: 675, y: 468 },
                            { x: 750, y: 468 },
                            { x: 832, y: 468 },
                            { x: 832, y: 499 },
                            { x: 896, y: 499 },
                            { x: 896, y: 510 },
                            { x: 1028, y: 510 },
                            { x: 1103, y: 510 },
                            { x: 1103, y: 523 },
                            { x: 1212, y: 476 },
                            { x: 1335, y: 459 },
                            { x: 1400, y: 459 },
                            { x: 1487, y: 459 },
                            { x: 1487, y: 449 },
                            { x: 1618, y: 430 },
                            { x: 1618, y: 479 },
                            { x: 1720, y: 469 },
                            { x: 1818, y: 469 },
                            { x: 1894, y: 469 },
                            { x: 1894, y: 430 },
                            { x: 2025, y: 452 },
                            { x: 2025, y: 442 },
                            { x: 2101, y: 486 },
                            { x: 2191, y: 486 },
                            { x: 2266, y: 486 },
                            { x: 2266, y: 500 },
                            { x: 2400, y: 500 },
                            { x: 2508, y: 475 },
                            { x: 2607, y: 475 },
                            { x: 2697, y: 475 },
                            { x: 2799, y: 432 },
                            { x: 2799, y: 477 },
                            { x: 2922, y: 451 },
                            { x: 2984, y: 451 },
                            { x: 3044, y: 451 },
                            { x: 3044, y: 430 },
                            { x: 3111, y: 430 },
                            { x: 3172, y: 430 },
                            { x: 3172, y: 452 },
                            { x: 3261, y: 442 },
                            { x: 3331, y: 442 },
                            { x: 3405, y: 442 },
                            { x: 3480, y: 485 },
                            { x: 3480, y: 522 },
                            { x: 3594, y: 522 },
                            { x: 3667, y: 522 },
                            { x: 3741, y: 508 },
                            { x: 3741, y: 496 },
                            { x: 3808, y: 496 },
                            { x: 3808, y: 447 },
                            { x: 3885, y: 430 },
                            { x: 3979, y: 430 },
                            { x: 4055, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 32,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 50,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 50,
                                stop: 55,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 55,
                                stop: 61,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 61,
                                stop: 66,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 492 },
                            { x: 88, y: 492 },
                            { x: 88, y: 534 },
                            { x: 167, y: 509 },
                            { x: 167, y: 463 },
                            { x: 250, y: 432 },
                            { x: 312, y: 432 },
                            { x: 379, y: 432 },
                            { x: 379, y: 471 },
                            { x: 449, y: 471 },
                            { x: 449, y: 430 },
                            { x: 510, y: 430 },
                            { x: 510, y: 472 },
                            { x: 604, y: 442 },
                            { x: 685, y: 442 },
                            { x: 740, y: 442 },
                            { x: 740, y: 452 },
                            { x: 815, y: 430 },
                            { x: 815, y: 460 },
                            { x: 922, y: 430 },
                            { x: 922, y: 442 },
                            { x: 1061, y: 430 },
                            { x: 1111, y: 430 },
                            { x: 1201, y: 430 },
                            { x: 1255, y: 430 },
                            { x: 1255, y: 477 },
                            { x: 1333, y: 477 },
                            { x: 1333, y: 440 },
                            { x: 1469, y: 440 },
                            { x: 1534, y: 440 },
                            { x: 1603, y: 430 },
                            { x: 1705, y: 430 },
                            { x: 1804, y: 430 },
                            { x: 1873, y: 430 },
                            { x: 1873, y: 467 },
                            { x: 1983, y: 467 },
                            { x: 1983, y: 446 },
                            { x: 2069, y: 487 },
                            { x: 2131, y: 487 },
                            { x: 2193, y: 487 },
                            { x: 2193, y: 468 },
                            { x: 2273, y: 448 },
                            { x: 2273, y: 491 },
                            { x: 2380, y: 476 },
                            { x: 2434, y: 476 },
                            { x: 2527, y: 476 },
                            { x: 2527, y: 430 },
                            { x: 2609, y: 430 },
                            { x: 2609, y: 465 },
                            { x: 2695, y: 442 },
                            { x: 2749, y: 442 },
                            { x: 2810, y: 442 },
                            { x: 2810, y: 483 },
                            { x: 2884, y: 439 },
                            { x: 3029, y: 430 },
                            { x: 3083, y: 430 },
                            { x: 3136, y: 430 },
                            { x: 3136, y: 451 },
                            { x: 3190, y: 438 },
                            { x: 3190, y: 475 },
                            { x: 3290, y: 455 },
                            { x: 3418, y: 455 },
                            { x: 3504, y: 455 },
                            { x: 3609, y: 439 },
                            { x: 3609, y: 457 },
                            { x: 3710, y: 430 },
                            { x: 3794, y: 430 },
                            { x: 3888, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 12,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 12,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 48,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 48,
                                stop: 52,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 52,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 57,
                                stop: 62,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 471 },
                            { x: 100, y: 471 },
                            { x: 158, y: 432 },
                            { x: 223, y: 432 },
                            { x: 335, y: 430 },
                            { x: 386, y: 430 },
                            { x: 444, y: 430 },
                            { x: 444, y: 457 },
                            { x: 550, y: 430 },
                            { x: 550, y: 451 },
                            { x: 629, y: 451 },
                            { x: 629, y: 473 },
                            { x: 717, y: 473 },
                            { x: 769, y: 473 },
                            { x: 852, y: 450 },
                            { x: 852, y: 461 },
                            { x: 962, y: 430 },
                            { x: 1043, y: 430 },
                            { x: 1114, y: 430 },
                            { x: 1114, y: 472 },
                            { x: 1174, y: 448 },
                            { x: 1256, y: 448 },
                            { x: 1256, y: 461 },
                            { x: 1372, y: 461 },
                            { x: 1430, y: 461 },
                            { x: 1502, y: 447 },
                            { x: 1502, y: 481 },
                            { x: 1603, y: 438 },
                            { x: 1603, y: 460 },
                            { x: 1679, y: 446 },
                            { x: 1741, y: 446 },
                            { x: 1833, y: 446 },
                            { x: 1894, y: 432 },
                            { x: 1894, y: 457 },
                            { x: 1981, y: 457 },
                            { x: 2040, y: 432 },
                            { x: 2117, y: 432 },
                            { x: 2214, y: 432 },
                            { x: 2214, y: 445 },
                            { x: 2285, y: 445 },
                            { x: 2285, y: 473 },
                            { x: 2359, y: 473 },
                            { x: 2359, y: 460 },
                            { x: 2455, y: 430 },
                            { x: 2553, y: 430 },
                            { x: 2617, y: 430 },
                            { x: 2693, y: 430 },
                            { x: 2693, y: 463 },
                            { x: 2819, y: 463 },
                            { x: 2912, y: 463 },
                            { x: 3032, y: 438 },
                            { x: 3032, y: 466 },
                            { x: 3087, y: 466 },
                            { x: 3174, y: 466 },
                            { x: 3174, y: 441 },
                            { x: 3321, y: 441 },
                            { x: 3470, y: 483 },
                            { x: 3550, y: 483 },
                            { x: 3621, y: 483 },
                            { x: 3683, y: 470 },
                            { x: 3742, y: 470 },
                            { x: 3829, y: 460 },
                            { x: 3909, y: 460 },
                            { x: 4006, y: 460 },
                        ],
                    },

                    //12 targets - distance of 300
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 7,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 7,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 514 },
                            { x: 88, y: 514 },
                            { x: 236, y: 483 },
                            { x: 332, y: 483 },
                            { x: 407, y: 483 },
                            { x: 472, y: 466 },
                            { x: 593, y: 435 },
                            { x: 671, y: 435 },
                            { x: 744, y: 435 },
                            { x: 744, y: 484 },
                            { x: 818, y: 484 },
                            { x: 818, y: 445 },
                            { x: 923, y: 430 },
                            { x: 1014, y: 430 },
                            { x: 1082, y: 430 },
                            { x: 1166, y: 457 },
                            { x: 1226, y: 457 },
                            { x: 1289, y: 457 },
                            { x: 1387, y: 430 },
                            { x: 1455, y: 430 },
                            { x: 1506, y: 430 },
                            { x: 1621, y: 478 },
                            { x: 1712, y: 478 },
                            { x: 1795, y: 478 },
                            { x: 1795, y: 451 },
                            { x: 1854, y: 438 },
                            { x: 1854, y: 483 },
                            { x: 1932, y: 483 },
                            { x: 2025, y: 483 },
                            { x: 2025, y: 507 },
                            { x: 2092, y: 497 },
                            { x: 2160, y: 497 },
                            { x: 2235, y: 497 },
                            { x: 2235, y: 474 },
                            { x: 2379, y: 474 },
                            { x: 2439, y: 474 },
                            { x: 2439, y: 443 },
                            { x: 2508, y: 430 },
                            { x: 2618, y: 430 },
                            { x: 2714, y: 430 },
                            { x: 2789, y: 468 },
                            { x: 2846, y: 468 },
                            { x: 2937, y: 468 },
                            { x: 2937, y: 490 },
                            { x: 3009, y: 466 },
                            { x: 3106, y: 466 },
                            { x: 3156, y: 466 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 14,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 14,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 493 },
                            { x: 78, y: 493 },
                            { x: 78, y: 470 },
                            { x: 164, y: 456 },
                            { x: 225, y: 456 },
                            { x: 278, y: 456 },
                            { x: 278, y: 474 },
                            { x: 393, y: 446 },
                            { x: 450, y: 446 },
                            { x: 508, y: 446 },
                            { x: 508, y: 491 },
                            { x: 657, y: 491 },
                            { x: 717, y: 491 },
                            { x: 810, y: 460 },
                            { x: 871, y: 460 },
                            { x: 953, y: 460 },
                            { x: 1056, y: 430 },
                            { x: 1127, y: 430 },
                            { x: 1197, y: 430 },
                            { x: 1197, y: 440 },
                            { x: 1318, y: 474 },
                            { x: 1392, y: 474 },
                            { x: 1469, y: 474 },
                            { x: 1528, y: 433 },
                            { x: 1616, y: 433 },
                            { x: 1685, y: 433 },
                            { x: 1685, y: 456 },
                            { x: 1789, y: 456 },
                            { x: 1847, y: 456 },
                            { x: 1922, y: 437 },
                            { x: 2041, y: 430 },
                            { x: 2130, y: 430 },
                            { x: 2207, y: 430 },
                            { x: 2207, y: 473 },
                            { x: 2269, y: 445 },
                            { x: 2350, y: 463 },
                            { x: 2447, y: 463 },
                            { x: 2543, y: 463 },
                            { x: 2664, y: 450 },
                            { x: 2738, y: 450 },
                            { x: 2818, y: 450 },
                            { x: 2818, y: 467 },
                            { x: 2910, y: 430 },
                            { x: 2998, y: 430 },
                            { x: 3078, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 3,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 3,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 27,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 27,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 43,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 564 },
                            { x: 138, y: 564 },
                            { x: 201, y: 525 },
                            { x: 277, y: 525 },
                            { x: 364, y: 525 },
                            { x: 497, y: 497 },
                            { x: 587, y: 497 },
                            { x: 682, y: 497 },
                            { x: 742, y: 457 },
                            { x: 813, y: 457 },
                            { x: 866, y: 457 },
                            { x: 959, y: 430 },
                            { x: 1082, y: 459 },
                            { x: 1164, y: 459 },
                            { x: 1230, y: 459 },
                            { x: 1230, y: 491 },
                            { x: 1293, y: 491 },
                            { x: 1293, y: 458 },
                            { x: 1436, y: 442 },
                            { x: 1498, y: 442 },
                            { x: 1577, y: 442 },
                            { x: 1577, y: 463 },
                            { x: 1694, y: 430 },
                            { x: 1751, y: 430 },
                            { x: 1821, y: 430 },
                            { x: 1821, y: 453 },
                            { x: 1962, y: 430 },
                            { x: 2018, y: 430 },
                            { x: 2096, y: 430 },
                            { x: 2233, y: 458 },
                            { x: 2320, y: 458 },
                            { x: 2408, y: 458 },
                            { x: 2408, y: 472 },
                            { x: 2477, y: 447 },
                            { x: 2554, y: 447 },
                            { x: 2636, y: 447 },
                            { x: 2636, y: 481 },
                            { x: 2702, y: 481 },
                            { x: 2702, y: 451 },
                            { x: 2755, y: 430 },
                            { x: 2809, y: 430 },
                            { x: 2886, y: 430 },
                            { x: 2886, y: 444 },
                            { x: 2960, y: 444 },
                            { x: 3043, y: 444 },
                            { x: 3154, y: 434 },
                            { x: 3252, y: 434 },
                            { x: 3346, y: 434 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 9,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 9,
                                stop: 13,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 13,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 22,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 22,
                                stop: 24,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 24,
                                stop: 28,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 28,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 38,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 38,
                                stop: 43,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 43,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 465 },
                            { x: 69, y: 465 },
                            { x: 69, y: 441 },
                            { x: 140, y: 474 },
                            { x: 140, y: 505 },
                            { x: 278, y: 505 },
                            { x: 333, y: 505 },
                            { x: 333, y: 472 },
                            { x: 403, y: 430 },
                            { x: 467, y: 430 },
                            { x: 553, y: 430 },
                            { x: 553, y: 447 },
                            { x: 691, y: 430 },
                            { x: 763, y: 430 },
                            { x: 817, y: 430 },
                            { x: 817, y: 443 },
                            { x: 885, y: 443 },
                            { x: 885, y: 483 },
                            { x: 989, y: 461 },
                            { x: 1050, y: 461 },
                            { x: 1131, y: 461 },
                            { x: 1201, y: 430 },
                            { x: 1251, y: 430 },
                            { x: 1348, y: 430 },
                            { x: 1455, y: 430 },
                            { x: 1532, y: 430 },
                            { x: 1532, y: 473 },
                            { x: 1644, y: 450 },
                            { x: 1722, y: 450 },
                            { x: 1820, y: 450 },
                            { x: 1820, y: 470 },
                            { x: 1896, y: 470 },
                            { x: 1981, y: 470 },
                            { x: 1981, y: 452 },
                            { x: 2094, y: 433 },
                            { x: 2155, y: 433 },
                            { x: 2210, y: 433 },
                            { x: 2346, y: 430 },
                            { x: 2424, y: 430 },
                            { x: 2496, y: 430 },
                            { x: 2496, y: 444 },
                            { x: 2548, y: 444 },
                            { x: 2600, y: 430 },
                            { x: 2652, y: 430 },
                            { x: 2720, y: 430 },
                            { x: 2810, y: 430 },
                            { x: 2881, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 4,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 4,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 23,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 23,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 32,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 32,
                                stop: 37,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 37,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 483 },
                            { x: 53, y: 483 },
                            { x: 53, y: 441 },
                            { x: 143, y: 430 },
                            { x: 258, y: 430 },
                            { x: 332, y: 430 },
                            { x: 394, y: 430 },
                            { x: 394, y: 467 },
                            { x: 523, y: 467 },
                            { x: 608, y: 467 },
                            { x: 754, y: 456 },
                            { x: 809, y: 456 },
                            { x: 882, y: 456 },
                            { x: 949, y: 431 },
                            { x: 949, y: 458 },
                            { x: 1047, y: 458 },
                            { x: 1114, y: 458 },
                            { x: 1114, y: 430 },
                            { x: 1178, y: 430 },
                            { x: 1178, y: 473 },
                            { x: 1287, y: 473 },
                            { x: 1356, y: 473 },
                            { x: 1356, y: 430 },
                            { x: 1482, y: 430 },
                            { x: 1557, y: 430 },
                            { x: 1685, y: 460 },
                            { x: 1750, y: 460 },
                            { x: 1844, y: 460 },
                            { x: 1844, y: 435 },
                            { x: 1915, y: 435 },
                            { x: 1974, y: 435 },
                            { x: 2074, y: 430 },
                            { x: 2137, y: 430 },
                            { x: 2207, y: 430 },
                            { x: 2207, y: 441 },
                            { x: 2279, y: 441 },
                            { x: 2416, y: 430 },
                            { x: 2508, y: 430 },
                            { x: 2570, y: 430 },
                            { x: 2570, y: 477 },
                            { x: 2674, y: 435 },
                            { x: 2753, y: 435 },
                            { x: 2828, y: 435 },
                            { x: 2828, y: 449 },
                            { x: 2934, y: 449 },
                            { x: 2992, y: 449 },
                        ],
                    },

                    //12 targets - disance of 400
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 8,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 8,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 17,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 17,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 34,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 34,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 51,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 51,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 57,
                                stop: 61,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 493 },
                            { x: 77, y: 493 },
                            { x: 77, y: 542 },
                            { x: 141, y: 542 },
                            { x: 141, y: 497 },
                            { x: 233, y: 460 },
                            { x: 233, y: 440 },
                            { x: 308, y: 486 },
                            { x: 371, y: 486 },
                            { x: 448, y: 486 },
                            { x: 547, y: 441 },
                            { x: 663, y: 441 },
                            { x: 745, y: 441 },
                            { x: 745, y: 483 },
                            { x: 796, y: 483 },
                            { x: 848, y: 468 },
                            { x: 848, y: 441 },
                            { x: 929, y: 441 },
                            { x: 1011, y: 441 },
                            { x: 1156, y: 431 },
                            { x: 1156, y: 443 },
                            { x: 1284, y: 443 },
                            { x: 1370, y: 443 },
                            { x: 1370, y: 474 },
                            { x: 1444, y: 474 },
                            { x: 1591, y: 438 },
                            { x: 1648, y: 438 },
                            { x: 1732, y: 438 },
                            { x: 1732, y: 456 },
                            { x: 1863, y: 456 },
                            { x: 1863, y: 432 },
                            { x: 1990, y: 432 },
                            { x: 2050, y: 432 },
                            { x: 2171, y: 430 },
                            { x: 2298, y: 430 },
                            { x: 2378, y: 430 },
                            { x: 2449, y: 460 },
                            { x: 2536, y: 460 },
                            { x: 2683, y: 433 },
                            { x: 2777, y: 433 },
                            { x: 2843, y: 433 },
                            { x: 2843, y: 466 },
                            { x: 2912, y: 430 },
                            { x: 3051, y: 461 },
                            { x: 3113, y: 461 },
                            { x: 3179, y: 461 },
                            { x: 3179, y: 430 },
                            { x: 3232, y: 430 },
                            { x: 3232, y: 479 },
                            { x: 3343, y: 479 },
                            { x: 3343, y: 440 },
                            { x: 3446, y: 440 },
                            { x: 3514, y: 440 },
                            { x: 3514, y: 480 },
                            { x: 3635, y: 438 },
                            { x: 3635, y: 438 },
                            { x: 3755, y: 455 },
                            { x: 3814, y: 455 },
                            { x: 3872, y: 455 },
                            { x: 3998, y: 430 },
                            { x: 4062, y: 430 },
                            { x: 4164, y: 430 },
                            { x: 4262, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 15,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 15,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 31,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 31,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 49,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 49,
                                stop: 53,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 53,
                                stop: 58,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 477 },
                            { x: 101, y: 477 },
                            { x: 101, y: 460 },
                            { x: 217, y: 460 },
                            { x: 217, y: 503 },
                            { x: 307, y: 476 },
                            { x: 385, y: 476 },
                            { x: 449, y: 476 },
                            { x: 449, y: 445 },
                            { x: 525, y: 430 },
                            { x: 672, y: 430 },
                            { x: 761, y: 430 },
                            { x: 761, y: 469 },
                            { x: 855, y: 469 },
                            { x: 855, y: 457 },
                            { x: 999, y: 457 },
                            { x: 1055, y: 457 },
                            { x: 1137, y: 430 },
                            { x: 1137, y: 458 },
                            { x: 1207, y: 458 },
                            { x: 1317, y: 430 },
                            { x: 1368, y: 430 },
                            { x: 1458, y: 430 },
                            { x: 1529, y: 430 },
                            { x: 1529, y: 430 },
                            { x: 1587, y: 430 },
                            { x: 1718, y: 430 },
                            { x: 1789, y: 430 },
                            { x: 1789, y: 442 },
                            { x: 1880, y: 465 },
                            { x: 2023, y: 430 },
                            { x: 2087, y: 430 },
                            { x: 2157, y: 430 },
                            { x: 2305, y: 430 },
                            { x: 2305, y: 465 },
                            { x: 2356, y: 430 },
                            { x: 2445, y: 430 },
                            { x: 2520, y: 430 },
                            { x: 2624, y: 430 },
                            { x: 2624, y: 447 },
                            { x: 2727, y: 447 },
                            { x: 2796, y: 447 },
                            { x: 2908, y: 430 },
                            { x: 2985, y: 479 },
                            { x: 3048, y: 479 },
                            { x: 3106, y: 479 },
                            { x: 3106, y: 457 },
                            { x: 3238, y: 430 },
                            { x: 3238, y: 476 },
                            { x: 3326, y: 476 },
                            { x: 3386, y: 476 },
                            { x: 3386, y: 431 },
                            { x: 3524, y: 430 },
                            { x: 3593, y: 430 },
                            { x: 3655, y: 430 },
                            { x: 3747, y: 430 },
                            { x: 3747, y: 430 },
                            { x: 3893, y: 468 },
                            { x: 3944, y: 468 },
                            { x: 4029, y: 468 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 11,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 11,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 21,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 21,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 35,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 35,
                                stop: 40,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 40,
                                stop: 45,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 45,
                                stop: 51,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 51,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 57,
                                stop: 63,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 555 },
                            { x: 124, y: 555 },
                            { x: 124, y: 528 },
                            { x: 187, y: 482 },
                            { x: 187, y: 470 },
                            { x: 290, y: 470 },
                            { x: 349, y: 470 },
                            { x: 410, y: 459 },
                            { x: 481, y: 430 },
                            { x: 481, y: 454 },
                            { x: 626, y: 436 },
                            { x: 718, y: 436 },
                            { x: 793, y: 436 },
                            { x: 848, y: 430 },
                            { x: 913, y: 430 },
                            { x: 994, y: 462 },
                            { x: 1054, y: 462 },
                            { x: 1128, y: 462 },
                            { x: 1128, y: 473 },
                            { x: 1246, y: 435 },
                            { x: 1384, y: 430 },
                            { x: 1462, y: 430 },
                            { x: 1535, y: 430 },
                            { x: 1660, y: 430 },
                            { x: 1660, y: 463 },
                            { x: 1757, y: 430 },
                            { x: 1835, y: 430 },
                            { x: 1901, y: 430 },
                            { x: 1901, y: 453 },
                            { x: 1976, y: 430 },
                            { x: 2093, y: 430 },
                            { x: 2144, y: 430 },
                            { x: 2144, y: 462 },
                            { x: 2266, y: 462 },
                            { x: 2382, y: 433 },
                            { x: 2450, y: 433 },
                            { x: 2545, y: 433 },
                            { x: 2545, y: 482 },
                            { x: 2661, y: 482 },
                            { x: 2775, y: 454 },
                            { x: 2839, y: 454 },
                            { x: 2918, y: 454 },
                            { x: 2918, y: 442 },
                            { x: 3035, y: 470 },
                            { x: 3035, y: 458 },
                            { x: 3105, y: 458 },
                            { x: 3188, y: 458 },
                            { x: 3188, y: 430 },
                            { x: 3312, y: 430 },
                            { x: 3312, y: 430 },
                            { x: 3435, y: 446 },
                            { x: 3486, y: 446 },
                            { x: 3536, y: 446 },
                            { x: 3536, y: 485 },
                            { x: 3639, y: 485 },
                            { x: 3639, y: 468 },
                            { x: 3745, y: 449 },
                            { x: 3838, y: 449 },
                            { x: 3920, y: 449 },
                            { x: 3920, y: 468 },
                            { x: 3989, y: 468 },
                            { x: 4058, y: 451 },
                            { x: 4058, y: 430 },
                            { x: 4172, y: 430 },
                            { x: 4226, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 5,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 5,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 19,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 19,
                                stop: 25,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 25,
                                stop: 30,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 30,
                                stop: 36,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 36,
                                stop: 41,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 41,
                                stop: 46,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 46,
                                stop: 52,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 52,
                                stop: 57,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 57,
                                stop: 62,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 459 },
                            { x: 80, y: 459 },
                            { x: 131, y: 430 },
                            { x: 131, y: 478 },
                            { x: 278, y: 446 },
                            { x: 361, y: 446 },
                            { x: 432, y: 446 },
                            { x: 507, y: 430 },
                            { x: 507, y: 440 },
                            { x: 621, y: 430 },
                            { x: 687, y: 430 },
                            { x: 745, y: 430 },
                            { x: 745, y: 476 },
                            { x: 870, y: 443 },
                            { x: 870, y: 478 },
                            { x: 970, y: 436 },
                            { x: 1022, y: 436 },
                            { x: 1100, y: 436 },
                            { x: 1204, y: 478 },
                            { x: 1306, y: 478 },
                            { x: 1356, y: 478 },
                            { x: 1356, y: 430 },
                            { x: 1473, y: 430 },
                            { x: 1473, y: 430 },
                            { x: 1586, y: 447 },
                            { x: 1643, y: 447 },
                            { x: 1713, y: 447 },
                            { x: 1713, y: 486 },
                            { x: 1783, y: 486 },
                            { x: 1873, y: 451 },
                            { x: 2003, y: 451 },
                            { x: 2070, y: 451 },
                            { x: 2070, y: 430 },
                            { x: 2194, y: 430 },
                            { x: 2194, y: 476 },
                            { x: 2297, y: 433 },
                            { x: 2347, y: 433 },
                            { x: 2397, y: 433 },
                            { x: 2492, y: 430 },
                            { x: 2546, y: 430 },
                            { x: 2546, y: 448 },
                            { x: 2658, y: 448 },
                            { x: 2735, y: 448 },
                            { x: 2735, y: 471 },
                            { x: 2856, y: 461 },
                            { x: 2950, y: 444 },
                            { x: 3024, y: 444 },
                            { x: 3076, y: 444 },
                            { x: 3135, y: 430 },
                            { x: 3135, y: 450 },
                            { x: 3252, y: 470 },
                            { x: 3312, y: 453 },
                            { x: 3386, y: 453 },
                            { x: 3454, y: 453 },
                            { x: 3454, y: 430 },
                            { x: 3576, y: 430 },
                            { x: 3576, y: 443 },
                            { x: 3709, y: 443 },
                            { x: 3778, y: 443 },
                            { x: 3842, y: 430 },
                            { x: 3842, y: 465 },
                            { x: 3982, y: 430 },
                            { x: 4050, y: 430 },
                            { x: 4148, y: 430 },
                        ],
                    },
                    {
                        len: 0,
                        points: [
                            {
                                start: 0,
                                stop: 6,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 6,
                                stop: 10,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 10,
                                stop: 16,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 16,
                                stop: 20,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 20,
                                stop: 26,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 26,
                                stop: 29,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 29,
                                stop: 33,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 33,
                                stop: 39,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 39,
                                stop: 44,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 44,
                                stop: 51,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 51,
                                stop: 55,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                            {
                                start: 55,
                                stop: 61,
                                len: 0,
                                target: { x: 0, y: 0 },
                            },
                        ],
                        map: [
                            { x: 0, y: 432 },
                            { x: 89, y: 432 },
                            { x: 147, y: 430 },
                            { x: 198, y: 450 },
                            { x: 198, y: 489 },
                            { x: 325, y: 466 },
                            { x: 397, y: 466 },
                            { x: 489, y: 466 },
                            { x: 544, y: 445 },
                            { x: 544, y: 463 },
                            { x: 670, y: 463 },
                            { x: 767, y: 463 },
                            { x: 767, y: 508 },
                            { x: 908, y: 479 },
                            { x: 908, y: 434 },
                            { x: 1009, y: 430 },
                            { x: 1095, y: 430 },
                            { x: 1173, y: 430 },
                            { x: 1173, y: 463 },
                            { x: 1290, y: 430 },
                            { x: 1381, y: 430 },
                            { x: 1435, y: 430 },
                            { x: 1435, y: 462 },
                            { x: 1487, y: 462 },
                            { x: 1587, y: 431 },
                            { x: 1705, y: 474 },
                            { x: 1799, y: 474 },
                            { x: 1895, y: 474 },
                            { x: 2031, y: 430 },
                            { x: 2094, y: 430 },
                            { x: 2171, y: 430 },
                            { x: 2293, y: 430 },
                            { x: 2293, y: 445 },
                            { x: 2393, y: 445 },
                            { x: 2446, y: 445 },
                            { x: 2446, y: 481 },
                            { x: 2573, y: 481 },
                            { x: 2573, y: 528 },
                            { x: 2688, y: 503 },
                            { x: 2746, y: 503 },
                            { x: 2799, y: 503 },
                            { x: 2890, y: 463 },
                            { x: 2890, y: 448 },
                            { x: 3037, y: 478 },
                            { x: 3121, y: 478 },
                            { x: 3183, y: 478 },
                            { x: 3183, y: 521 },
                            { x: 3273, y: 500 },
                            { x: 3273, y: 545 },
                            { x: 3356, y: 545 },
                            { x: 3356, y: 570 },
                            { x: 3413, y: 570 },
                            { x: 3504, y: 570 },
                            { x: 3618, y: 542 },
                            { x: 3682, y: 519 },
                            { x: 3756, y: 519 },
                            { x: 3834, y: 519 },
                            { x: 3834, y: 495 },
                            { x: 3899, y: 495 },
                            { x: 3899, y: 507 },
                            { x: 4012, y: 467 },
                            { x: 4071, y: 467 },
                            { x: 4166, y: 467 },
                        ],
                    },
                ];
                this.scenery = {
                    arr: [],
                    type: 0,
                    types: ["hills", "slates", "trees", "quads", "mushrooms"],
                };
                this.targets = [
                    {
                        distance: 32,
                        color: color(215, 215, 215),
                        message: "Good!",
                        multiplier: 1,
                    },
                    {
                        distance: 20,
                        color: color(185, 185, 185),
                        message: "Great!",
                        multiplier: 2,
                    },
                    {
                        distance: 10,
                        color: color(255, 255, 255),
                        message: "Perfect!",
                        multiplier: 3,
                    },
                ];
                this.target = {
                    x: 0,
                    y: 0,
                };
                this.targetIndex = -1;
                this.cypher = {
                    value: "twRcfTA9l<rg>yM|/.5pjBo31I_C?DK)Y]b+:{QNZW,dS0Vn6}[82a=47(UGvLeOFPXHqxEuikzJhms=!}#?>$U@I&",
                };
                this.portal = {
                    particles: [],
                    orbs: [],
                };
                this.buttons = {
                    play: new Button({
                        x: 300,
                        y: 375,
                        content: "Play",
                        func: function () {
                            app.scene = "play";
                            app.resetGame();
                            app.setLevel();
                            messageElement.innerHTML = "";
                            saveCodeElement.innerHTML = "";
                        },
                    }),
                    home: new Button({
                        x: 300,
                        y: 400,
                        content: "Home",
                        func: function () {
                            app.scene = "home";
                            app.level = 0;
                            app.score.best = max(
                                app.score.total,
                                app.score.best
                            );
                            app.point = 0;
                            app.score.level = 0;
                            app.resetPointInLevel();
                            app.setLevel();
                            messageElement.innerHTML = "";
                            saveCodeElement.innerHTML = "";
                        },
                    }),
                    next: new Button({
                        x: 320,
                        y: 400,
                        content: "Next",
                        func: function () {
                            app.level++;
                            app.point = 0;
                            app.score.level = 0;
                            app.resetPointInLevel();
                            app.setLevel();
                            app.state = "play";
                            app.scene = "play";
                            messageElement.innerHTML = "";
                            saveCodeElement.innerHTML = "";
                        },
                    }),
                    save: new Button({
                        x: -100,
                        y: -100,
                        diameter: 0,
                        func: function () {
                            console.clear();
                            app.encode(app.score.total, app.level + 1);
                        },
                        className: "save-button",
                    }),
                };
                this.anim = {
                    yoff: 0,
                };
                this.backImage = this.getBackImage();
                this.titleImage = this.getTitleImage();
                this.portalImage = this.getPortalImage();
                this.generateBackImages();
                this.setLevels();
                this.setLevel();
            };
            App.prototype = {
                getTitleImage: function () {
                    var bz = {
                        x1: 80,
                        y1: 180,
                        cx1: 200,
                        cy1: 120,
                        cx2: 400,
                        cy2: 120,
                        x2: 520,
                        y2: 180,
                    };

                    background(0, 0);

                    strokeWeight(5);
                    stroke(this.bendy.color, 150);
                    noFill();
                    bezier(
                        bz.x1,
                        bz.y1,
                        bz.cx1,
                        bz.cy1,
                        bz.cx2,
                        bz.cy2,
                        bz.x2,
                        bz.y2
                    );

                    var title = "BENDY";

                    for (var i = 1; i < 6; i++) {
                        var px = bezierPoint(
                            bz.x1,
                            bz.cx1,
                            bz.cx2,
                            bz.x2,
                            i / 6
                        );
                        var py = bezierPoint(
                            bz.y1,
                            bz.cy1,
                            bz.cy2,
                            bz.y2,
                            i / 6
                        );
                        var tx = bezierTangent(
                            bz.x1,
                            bz.cx1,
                            bz.cx2,
                            bz.x2,
                            i / 6
                        );
                        var ty = bezierTangent(
                            bz.y1,
                            bz.cy1,
                            bz.cy2,
                            bz.y2,
                            i / 6
                        );
                        var angle = atan2(ty, tx) - 90;
                        var vx = cos(radians(angle));
                        var vy = sin(radians(angle));

                        stroke(200);
                        strokeWeight(1);
                        line(px, py, px + vx * 20, py + vy * 20);

                        noStroke();
                        fill(150);
                        ellipse(px, py, 7, 7);
                        pushMatrix();
                        translate(px, py);
                        rotate(radians(angle + 90));

                        pushStyle();
                        textAlign(CENTER, CENTER);
                        textSize(50);
                        fill(0);
                        text(title.substring(i - 1, i), 0, 0);
                        popStyle();
                        popMatrix();
                    }

                    return get();
                },
                getBackImage: function () {
                    background(0, 0);
                    noStroke();
                    for (var i = 0; i < height; i += 100) {
                        fill(
                            lerpColor(
                                color(40, 150, 140),
                                color(90, 160, 140),
                                map(i, 0, height, 0, 1)
                            )
                        );
                        rect(0, i, width, 100);
                    }
                    return get();
                },
                generateBackImages: function () {
                    for (var i = 0; i < this.backColors.length; i++) {
                        var backColor = this.backColors[i];

                        background(0, 0);
                        noStroke();
                        for (var j = 0; j < height; j += 100) {
                            fill(
                                lerpColor(
                                    backColor.from,
                                    backColor.to,
                                    map(j, 0, height, 0, 1)
                                )
                            );
                            rect(0, j, width, 100);
                        }
                        this.backImages.push(get());
                    }
                },
                getPortalImage: function () {
                    background(0, 0);
                    noStroke();

                    for (var i = 0; i < 50; i += 1) {
                        fill(255, map(i, 0, 100, 0, 80));
                        rect(
                            0,
                            50 + i,
                            this.targets[this.targets.length - 2].distance * 2,
                            1
                        );
                    }

                    for (var i = 0; i < 100; i += 1) {
                        fill(255, map(i, 0, 100, 0, 80));
                        rect(
                            this.targets[this.targets.length - 2].distance -
                                this.targets[this.targets.length - 1].distance,
                            i,
                            this.targets[this.targets.length - 1].distance * 2,
                            1
                        );
                    }
                    return get();
                },
                setLevels: function () {
                    for (var i = 0; i < this.levels.length; i++) {
                        var gameMap = this.levels[i].map;

                        for (var j = 0; j < gameMap.length - 1; j++) {
                            var segment = gameMap[j];

                            segment.len = dist(
                                gameMap[j + 1].x,
                                gameMap[j + 1].y,
                                segment.x,
                                segment.y
                            );
                            segment.angle =
                                (atan2(
                                    gameMap[j + 1].y - segment.y,
                                    gameMap[j + 1].x - segment.x
                                ) *
                                    180) /
                                Math.PI;
                        }

                        for (var j = 0; j < this.levels[i].points.length; j++) {
                            var start = this.levels[i].points[j].start;
                            var stop = this.levels[i].points[j].stop;

                            for (var k = start; k < stop; k++) {
                                var segment = gameMap[k];

                                this.levels[i].points[j].len += segment.len;
                            }
                        }

                        this.levels[i].len = gameMap[gameMap.length - 1].x;

                        this.levels[i].backImage =
                            this.backImages[random(this.backImages.length) | 0];

                        switch (this.levels[i].points.length) {
                            case 1:
                            case 2:
                                this.levels[i].lives = 0;
                                break;
                            case 3:
                            case 4:
                            case 5:
                                this.levels[i].lives = 1;
                                break;
                            case 6:
                            case 7:
                            case 8:
                                this.levels[i].lives = 2;
                                break;
                            case 9:
                            case 10:
                                this.levels[i].lives = 3;
                                break;
                            default:
                                this.levels[i].lives = 4;
                                break;
                        }
                    }
                },
                setLevel: function () {
                    var gameMap = this.levels[this.level].map;

                    for (
                        var i = 0;
                        i < this.levels[this.level].points.length;
                        i++
                    ) {
                        var p = this.levels[this.level].points[i];

                        p.target.x =
                            gameMap[p.stop - 1].x +
                            cos(radians(gameMap[p.stop - 1].angle)) *
                                gameMap[p.stop - 1].len;
                        p.target.y =
                            gameMap[p.stop - 1].y +
                            sin(radians(gameMap[p.stop - 1].angle)) *
                                gameMap[p.stop - 1].len;
                    }

                    this.lives = this.levels[this.level].lives;
                    this.progress = 0;
                    this.score.bonus = 0;
                    this.anim.yoff = -600;

                    this.canPress = true;
                    pressed = false;

                    //add background scenery properties
                    this.scenery.arr.length = 0;
                    for (
                        var x = random(-300, -200) | 0;
                        x < this.levels[this.level].len + 200;
                        x += random(200, 350) | 0
                    ) {
                        this.scenery.arr.push({
                            x: x,
                            w: random(100, 250) | 0,
                            h: random(250, 550) | 0,
                            before: {
                                x: random(-30, 50) | 0,
                                y: random(-30, 60) | 0,
                            },
                            after: {
                                x: random(-30, 50) | 0,
                                y: random(-30, 60) | 0,
                            },
                            left: random(5, 80) | 0,
                            right: random(5, 80) | 0,
                            opacity: random(20, 40) | 0,
                        });
                    }

                    this.scenery.type = random(this.scenery.types.length) | 0;
                },
                resetPointInLevel: function () {
                    this.bendy.len = 40;
                    this.bendy.index = 0;
                    this.bendy.bits.length = 0;
                    this.start = false;
                    this.fall = false;
                    this.done = false;
                    this.distance = 0;
                },
                resetGame: function () {
                    this.decode(this.score.total, this.level);

                    // if(!this.testing) {
                    //     this.level = 0;
                    // }

                    this.score.level = 0;
                    this.score.portal = 0;
                    this.bendy.len = 40;
                    this.bendy.index = 0;
                    this.bendy.bits.length = 0;
                    this.start = false;
                    this.fall = false;
                    this.done = false;
                    this.distance = 0;
                },
                encode: function () {
                    var args = Array.from(arguments);
                    var shift = random(12) | 0;
                    saveCode = "";
                    for (var i = 0; i < args.length; i++) {
                        var arg = args[i].toString();
                        for (var j = 0; j < arg.length; j++) {
                            var ch = arg[j];
                            saveCode +=
                                this.cypher.value[
                                    this.cypher.value.indexOf(ch) + shift + j
                                ];
                        }
                        saveCode += "-";
                    }
                    saveCode += this.cypher.value[shift];
                },
                decode: function () {
                    try {
                        var arr = saveCode.split("-");
                        var shift = this.cypher.value.indexOf(arr[2]);
                        this.score.total = this.level = 0;
                        for (var i = 0; i < arr[0].length; i++) {
                            var ch =
                                this.cypher.value[
                                    this.cypher.value.indexOf(arr[0][i]) -
                                        shift -
                                        i
                                ];
                            this.score.total =
                                (this.score.total.toString() + ch) | 0;
                        }
                        for (var i = 0; i < arr[1].length; i++) {
                            var ch =
                                this.cypher.value[
                                    this.cypher.value.indexOf(arr[1][i]) -
                                        shift -
                                        i
                                ];
                            this.level = (this.level.toString() + ch) | 0;
                        }
                        if (this.level >= this.levels.length) {
                            throw "";
                        }
                    } catch (e) {
                        println("You've entered an invalid save code!");
                        this.score.total = this.level = 0;
                    }
                },
                drawScenery: function () {
                    noStroke();

                    switch (this.scenery.type) {
                        case 0: //hills
                            for (var i = 0; i < this.scenery.arr.length; i++) {
                                var s = this.scenery.arr[i];
                                fill(255, s.opacity);
                                triangle(
                                    s.x,
                                    600 - s.h,
                                    s.x - s.w * 0.6,
                                    600,
                                    s.x + s.w * 0.6,
                                    600
                                );
                            }
                            break;
                        case 1: //slates
                            for (var i = 0; i < this.scenery.arr.length; i++) {
                                var s = this.scenery.arr[i];
                                fill(255, s.opacity);
                                rect(
                                    s.x,
                                    600 - s.h,
                                    s.w,
                                    s.h,
                                    s.left,
                                    s.right,
                                    0,
                                    0
                                );
                            }
                            break;
                        case 2: //trees
                            for (var i = 0; i < this.scenery.arr.length; i++) {
                                var s = this.scenery.arr[i];
                                fill(255, s.opacity);
                                triangle(
                                    s.x,
                                    600 - s.h,
                                    s.x - s.w * 0.5,
                                    600 - s.h * 0.4,
                                    s.x + s.w * 0.5,
                                    600 - s.h * 0.4
                                );
                                fill(100, s.opacity);
                                rect(
                                    s.x - s.w * 0.1,
                                    600 - s.h * 0.4,
                                    s.w * 0.2,
                                    s.h * 0.4
                                );
                            }
                            break;
                        case 3: //quads
                            for (var i = 0; i < this.scenery.arr.length; i++) {
                                var s = this.scenery.arr[i];
                                fill(255, s.opacity);
                                beginShape();
                                vertex(s.x - s.w * 0.5, 600);
                                vertex(
                                    s.x - s.w * 0.5 + s.before.x,
                                    600 - s.h * 0.9 + s.before.y
                                );
                                vertex(s.x, 600 - s.h * 0.9);
                                vertex(
                                    s.x + s.w * 0.5 + s.after.x,
                                    600 - s.h * 0.9 + s.after.y
                                );
                                vertex(s.x + s.w * 0.5, 600);
                                endShape();
                            }
                            break;
                        case 4: //mushrooms
                            for (var i = 0; i < this.scenery.arr.length; i++) {
                                var s = this.scenery.arr[i];
                                fill(255, s.opacity);
                                arc(
                                    s.x,
                                    600 - s.h * 0.6,
                                    s.w * 1,
                                    s.w * 1,
                                    radians(180),
                                    radians(360)
                                );
                                fill(80, s.opacity);
                                rect(
                                    s.x - s.w * 0.1,
                                    600 - s.h * 0.6,
                                    s.w * 0.2,
                                    s.h * 0.6
                                );
                            }
                            break;
                    }
                },
                drawLevel: function () {
                    var gameMap = this.levels[this.level].map;

                    //base ground
                    pushMatrix();
                    translate(0, this.bendy.weight / 2);

                    noStroke();
                    fill(50, 60, 65);
                    beginShape();
                    vertex(gameMap[0].x - 600, gameMap[0].y);
                    for (var i = 0; i < gameMap.length; i++) {
                        vertex(gameMap[i].x, gameMap[i].y);
                    }
                    vertex(
                        gameMap[gameMap.length - 1].x + 600,
                        gameMap[gameMap.length - 1].y
                    );
                    vertex(gameMap[gameMap.length - 1].x + 600, 1200);
                    vertex(gameMap[0].x - 600, 1200);
                    endShape(CLOSE);

                    noStroke();
                    for (var i = 0; i < this.targets.length; i++) {
                        var target = this.targets[i];

                        fill(target.color);
                        var t =
                            this.levels[this.level].points[this.point].target;
                        rect(
                            t.x - target.distance,
                            t.y,
                            target.distance * 2,
                            6
                        );
                    }
                    popMatrix();
                },
                runPortalProgression: function () {
                    if (this.delays.timer++ === this.delays.portalNext) {
                        this.delays.timer = 0;
                        this.canPress = true;
                        this.point++;
                        this.resetPointInLevel();
                        this.state = "play";
                    }
                },
                runLevelProgression: function () {
                    if (this.delays.timer++ === this.delays.levelNext) {
                        this.delays.timer = 0;
                        if (this.level === this.levels.length - 1) {
                            this.state = "play";
                            this.scene = "completed";
                            // Save the final score when game is completed
                            saveScoreToLeaderboard(this.score.total);
                        } else {
                            this.addConfetti(
                                this.buttons.next.x,
                                this.buttons.next.y,
                                70
                            );
                            this.scene = "next";
                            // Save the current total score after completing a level
                            saveScoreToLeaderboard(this.score.total);
                        }
                    }
                    if (
                        (this.delays.timer === this.delays.levelNext * 0.4) |
                        0
                    ) {
                        this.messages.push({
                            content:
                                "Level " + (this.level + 1) + " completed!",
                            x: 300,
                            y: 500,
                            opacity: 255,
                        });
                    }
                },
                runPortalReset: function () {
                    if (this.delays.timer++ === this.delays.portalReset) {
                        this.delays.timer = 0;
                        this.canPress = true;
                        this.lives--;
                        this.score.portal = 0;
                        this.resetPointInLevel();
                        this.state = "play";
                    }
                },
                runLevelReset: function () {
                    if (this.delays.timer++ === this.delays.levelReset) {
                        this.delays.timer = 0;
                        this.canPress = true;
                        this.point = 0;
                        this.score.portal = 0;
                        this.score.level = 0;
                        this.resetPointInLevel();
                        this.setLevel();
                        this.state = "play";
                    }
                },
                runBendy: function () {
                    var gameMap = this.levels[this.level].map;

                    var start =
                        this.levels[this.level].points[this.point].start;
                    var point_len =
                        this.levels[this.level].points[this.point].len;

                    //draw bendy
                    stroke(this.bendy.color);
                    strokeWeight(this.bendy.weight);

                    if (!this.fall) {
                        line(
                            gameMap[start].x,
                            gameMap[start].y,
                            gameMap[start].x,
                            gameMap[start].y - this.bendy.len
                        );
                    }

                    if (pressed && this.canPress) {
                        this.start = true;
                        this.bendy.len = constrain(
                            this.bendy.len + 2,
                            0,
                            point_len + 100
                        );
                    } else if (this.start) {
                        if (!this.fall) {
                            //setup array with each bendy segment
                            var len = this.bendy.len;
                            var totalLength = 0,
                                diff = 0;
                            for (var i = start; i < gameMap.length - 1; i++) {
                                if (len >= gameMap[i].len) {
                                    totalLength += gameMap[i].len;

                                    if (i === gameMap.length - 2) {
                                        diff = this.bendy.len - totalLength;
                                    }

                                    this.bendy.bits.push({
                                        x: gameMap[i].x,
                                        y: gameMap[i].y,
                                        len: gameMap[i].len + diff,
                                        totalLen: totalLength + diff,
                                        angle: 0,
                                        angleTarget: gameMap[i].angle + 90,
                                        rot: 4,
                                    });
                                    len -= gameMap[i].len;

                                    if (i === gameMap.length - 2) {
                                        break;
                                    }
                                } else {
                                    if (len > 0) {
                                        totalLength += len;
                                        this.bendy.bits.push({
                                            x: gameMap[i].x,
                                            y: gameMap[i].y,
                                            len: len,
                                            totalLen: totalLength,
                                            angle: 0,
                                            angleTarget: gameMap[i].angle + 90,
                                            rot: 4,
                                        });
                                        break;
                                    }
                                }
                            }

                            //start falling
                            this.fall = true;
                        } else {
                            this.canPress = false;

                            if (
                                this.bendy.bits[this.bendy.bits.length - 1]
                                    .angle !==
                                this.bendy.bits[this.bendy.bits.length - 1]
                                    .angleTarget
                            ) {
                                //display the segments as they fall
                                for (var i = 0; i <= this.bendy.index; i++) {
                                    var bit = this.bendy.bits[i];
                                    pushMatrix();
                                    translate(bit.x, bit.y);
                                    rotate(radians(bit.angle));
                                    line(0, 0, 0, -bit.len);
                                    popMatrix();

                                    if (i === this.bendy.index) {
                                        var x =
                                            bit.x +
                                            cos(radians(bit.angle - 90)) *
                                                bit.len;
                                        var y =
                                            bit.y +
                                            sin(radians(bit.angle - 90)) *
                                                bit.len;
                                        line(
                                            x,
                                            y,
                                            x,
                                            y - (this.bendy.len - bit.totalLen)
                                        );
                                    }
                                }
                            }

                            //rotate each segment increasing the index when in place
                            if (this.bendy.index < this.bendy.bits.length) {
                                var currentBit =
                                    this.bendy.bits[this.bendy.index];
                                currentBit.angle = constrain(
                                    currentBit.angle + currentBit.rot,
                                    0,
                                    currentBit.angleTarget
                                );

                                if (
                                    currentBit.angle === currentBit.angleTarget
                                ) {
                                    //if the last one falls get the point at the end of the line
                                    if (
                                        this.bendy.index ===
                                            this.bendy.bits.length - 1 &&
                                        !this.done
                                    ) {
                                        this.bendy.end.x =
                                            currentBit.x +
                                            cos(
                                                radians(currentBit.angle - 90)
                                            ) *
                                                currentBit.len;
                                        this.bendy.end.y =
                                            currentBit.y +
                                            sin(
                                                radians(currentBit.angle - 90)
                                            ) *
                                                currentBit.len;
                                        this.done = true;

                                        this.distance = dist(
                                            this.bendy.len +
                                                this.bendy.weight * 0.25,
                                            0,
                                            this.levels[this.level].points[
                                                this.point
                                            ].len,
                                            0
                                        );

                                        var hit = false;
                                        this.targetIndex = -1;
                                        for (
                                            var i = this.targets.length - 1;
                                            i >= 0;
                                            i--
                                        ) {
                                            var target = this.targets[i];

                                            if (
                                                this.distance < target.distance
                                            ) {
                                                this.targetIndex = i;
                                                hit = true;
                                                break;
                                            }
                                        }

                                        if (hit) {
                                            //build up score plus bonus (if any) for multiple perfects
                                            if (
                                                this.targetIndex ===
                                                this.targets.length - 1
                                            ) {
                                                //hit perfect
                                                this.score.bonus++;
                                            } else {
                                                this.score.bonus = 0;
                                            }

                                            this.score.portal =
                                                2 *
                                                (this.level + 1) *
                                                this.targets[this.targetIndex]
                                                    .multiplier;

                                            if (this.score.bonus > 1) {
                                                this.score.portal *=
                                                    this.score.bonus;
                                                this.messages.push({
                                                    content:
                                                        this.targets[
                                                            this.targetIndex
                                                        ].message +
                                                        "\nCOMBO\nx" +
                                                        this.score.bonus +
                                                        "\n+" +
                                                        this.score.portal,
                                                    x: 300,
                                                    y: 500,
                                                    opacity: 255,
                                                });
                                            } else {
                                                this.messages.push({
                                                    content:
                                                        this.targets[
                                                            this.targetIndex
                                                        ].message +
                                                        "\n+" +
                                                        this.score.portal,
                                                    x: 300,
                                                    y: 500,
                                                    opacity: 255,
                                                });
                                            }

                                            this.score.level +=
                                                this.score.portal;

                                            //hits a portal, but not the last one
                                            if (
                                                this.point <
                                                this.levels[this.level].points
                                                    .length -
                                                    1
                                            ) {
                                                this.state = "nextPortal";
                                                this.generateBendyDots(1);
                                                this.progress++;
                                            }
                                            //hits the last portal
                                            else {
                                                var target =
                                                    this.levels[this.level]
                                                        .points[this.point]
                                                        .target;
                                                this.addConfetti(
                                                    target.x,
                                                    target.y,
                                                    40
                                                );
                                                this.score.total +=
                                                    this.score.level;
                                                this.state = "nextLevel";
                                                this.generateBendyDots(1);
                                                this.progress++;
                                            }
                                        } else {
                                            //reset bonus if you don't hit the portal
                                            this.score.bonus = 0;

                                            if (this.lives > 0) {
                                                this.state = "resetPortal";
                                                this.generateBendyDots(-1);
                                            } else {
                                                this.state = "resetLevel";
                                                this.generateBendyDots(-1);
                                            }
                                        }
                                    }

                                    //increase the index to move to the next bit
                                    if (this.bendy.bits.length > 0) {
                                        this.bendy.index = constrain(
                                            this.bendy.index + 1,
                                            0,
                                            this.bendy.bits.length - 1
                                        );
                                    }
                                }
                            }
                        }
                    }
                },
                runBendyX: function () {
                    var gameMap = this.levels[this.level].map;

                    var start =
                        this.levels[this.level].points[this.point].start;
                    var point_len =
                        this.levels[this.level].points[this.point].len;

                    //draw bendy
                    stroke(this.bendy.color);
                    strokeWeight(this.bendy.weight);

                    if (!this.fall) {
                        line(
                            gameMap[start].x,
                            gameMap[start].y,
                            gameMap[start].x,
                            gameMap[start].y - this.bendy.len
                        );
                    }

                    if (pressed && this.canPress) {
                        this.start = true;
                        this.bendy.len = constrain(
                            this.bendy.len + 2,
                            0,
                            point_len + 100
                        );
                    } else if (this.start) {
                        if (!this.fall) {
                            //setup array with each bendy segment
                            var len = this.bendy.len;
                            var totalLength = 0,
                                diff = 0;
                            for (var i = start; i < gameMap.length - 1; i++) {
                                if (len >= gameMap[i].len) {
                                    totalLength += gameMap[i].len;

                                    if (i === gameMap.length - 2) {
                                        diff = this.bendy.len - totalLength;
                                    }

                                    this.bendy.bits.push({
                                        x: gameMap[i].x,
                                        y: gameMap[i].y,
                                        len: gameMap[i].len + diff,
                                        totalLen: totalLength + diff,
                                        angle: 0,
                                        angleTarget: gameMap[i].angle + 90,
                                        rot: 4,
                                    });

                                    len -= gameMap[i].len;

                                    if (i === gameMap.length - 2) {
                                        break;
                                    }
                                } else {
                                    if (len > 0) {
                                        totalLength += len;
                                        this.bendy.bits.push({
                                            x: gameMap[i].x,
                                            y: gameMap[i].y,
                                            len: len,
                                            totalLen: totalLength,
                                            angle: 0,
                                            angleTarget: gameMap[i].angle + 90,
                                            rot: 4,
                                        });
                                        break;
                                    }
                                }
                            }

                            //start falling
                            this.fall = true;
                        } else {
                            this.canPress = false;

                            if (
                                this.bendy.bits[this.bendy.bits.length - 1]
                                    .angle !==
                                this.bendy.bits[this.bendy.bits.length - 1]
                                    .angleTarget
                            ) {
                                //display the segments as they fall
                                for (var i = 0; i <= this.bendy.index; i++) {
                                    var bit = this.bendy.bits[i];
                                    pushMatrix();
                                    translate(bit.x, bit.y);
                                    rotate(bit.angle);
                                    line(0, 0, 0, -bit.len);
                                    popMatrix();

                                    if (i === this.bendy.index) {
                                        var x =
                                            bit.x +
                                            cos(bit.angle - 90) * bit.len;
                                        var y =
                                            bit.y +
                                            sin(bit.angle - 90) * bit.len;
                                        line(
                                            x,
                                            y,
                                            x,
                                            y - (this.bendy.len - bit.totalLen)
                                        );
                                    }
                                }
                            }

                            //rotate each segment increasing the index when in place
                            if (this.bendy.index < this.bendy.bits.length) {
                                var currentBit =
                                    this.bendy.bits[this.bendy.index];
                                currentBit.angle = constrain(
                                    currentBit.angle + currentBit.rot,
                                    0,
                                    currentBit.angleTarget
                                );

                                if (
                                    currentBit.angle === currentBit.angleTarget
                                ) {
                                    //if the last one falls get the point at the end of the line
                                    if (
                                        this.bendy.index ===
                                            this.bendy.bits.length - 1 &&
                                        !this.done
                                    ) {
                                        this.bendy.end.x =
                                            currentBit.x +
                                            cos(currentBit.angle - 90) *
                                                currentBit.len;
                                        this.bendy.end.y =
                                            currentBit.y +
                                            sin(currentBit.angle - 90) *
                                                currentBit.len;
                                        this.done = true;

                                        this.distance = dist(
                                            this.bendy.len +
                                                this.bendy.weight * 0.25,
                                            0,
                                            this.levels[this.level].points[
                                                this.point
                                            ].len,
                                            0
                                        );

                                        var hit = false;
                                        this.targetIndex = -1;
                                        for (
                                            var i = this.targets.length - 1;
                                            i >= 0;
                                            i--
                                        ) {
                                            var target = this.targets[i];

                                            if (
                                                this.distance < target.distance
                                            ) {
                                                this.targetIndex = i;
                                                hit = true;
                                                break;
                                            }
                                        }

                                        if (hit) {
                                            //build up score plus bonus (if any) for multiple perfects
                                            if (
                                                this.targetIndex ===
                                                this.targets.length - 1
                                            ) {
                                                //hit perfect
                                                this.score.bonus++;
                                            } else {
                                                this.score.bonus = 0;
                                            }

                                            this.score.portal =
                                                2 *
                                                (this.level + 1) *
                                                this.targets[this.targetIndex]
                                                    .multiplier;

                                            if (this.score.bonus > 1) {
                                                this.score.portal *=
                                                    this.score.bonus;
                                                this.messages.push({
                                                    content:
                                                        this.targets[
                                                            this.targetIndex
                                                        ].message +
                                                        "\nCOMBO\nx" +
                                                        this.score.bonus +
                                                        "\n+" +
                                                        this.score.portal,
                                                    x: 300,
                                                    y: 500,
                                                    opacity: 255,
                                                });
                                            } else {
                                                this.messages.push({
                                                    content:
                                                        this.targets[
                                                            this.targetIndex
                                                        ].message +
                                                        "\n+" +
                                                        this.score.portal,
                                                    x: 300,
                                                    y: 500,
                                                    opacity: 255,
                                                });
                                            }

                                            this.score.level +=
                                                this.score.portal;

                                            //hits a portal, but not the last one
                                            if (
                                                this.point <
                                                this.levels[this.level].points
                                                    .length -
                                                    1
                                            ) {
                                                this.state = "nextPortal";
                                                this.generateBendyDots(1);
                                                this.progress++;
                                            }
                                            //hits the last portal
                                            else {
                                                var target =
                                                    this.levels[this.level]
                                                        .points[this.point]
                                                        .target;
                                                this.addConfetti(
                                                    target.x,
                                                    target.y,
                                                    40
                                                );
                                                this.score.total +=
                                                    this.score.level;
                                                this.state = "nextLevel";
                                                this.generateBendyDots(1);
                                                this.progress++;
                                            }
                                        } else {
                                            //reset bonus if you don't hit the portal
                                            this.score.bonus = 0;

                                            if (this.lives > 0) {
                                                this.state = "resetPortal";
                                                this.generateBendyDots(-1);
                                            } else {
                                                this.state = "resetLevel";
                                                this.generateBendyDots(-1);
                                            }
                                        }
                                    }

                                    //increase the index to move to the next bit
                                    if (this.bendy.bits.length > 0) {
                                        this.bendy.index = constrain(
                                            this.bendy.index + 1,
                                            0,
                                            this.bendy.bits.length - 1
                                        );
                                    }
                                }
                            }
                        }
                    }
                },
                runPortal: function () {
                    var point_target =
                        this.levels[this.level].points[this.point].target;

                    if (frameCount % 30 === 0) {
                        var target = this.targets[this.targets.length - 1];

                        this.portal.particles.push({
                            x:
                                point_target.x +
                                random(
                                    -target.distance * 0.7,
                                    target.distance * 0.7
                                ),
                            y: point_target.y,
                            len: random(4, 10),
                            vy: random(0.4, 1.5),
                            opacity: random(240, 200) | 0,
                            color: random(220, 255),
                        });
                        this.portal.orbs.push({
                            x:
                                point_target.x +
                                random(
                                    -target.distance * 0.7,
                                    target.distance * 0.7
                                ),
                            y: point_target.y + 10,
                            diameter: random(2, 5),
                            vy: random(0.3, 0.8),
                            opacity: random(240, 200) | 0,
                            color: 255,
                            timer: random(360) | 0,
                            speed: random(1, 3),
                        });
                    }

                    noFill();
                    strokeWeight(1);
                    for (
                        var i = this.portal.particles.length - 1;
                        i >= 0;
                        i--
                    ) {
                        var p = this.portal.particles[i];

                        stroke(p.color, p.opacity);
                        line(p.x, p.y, p.x, p.y + p.len);

                        p.y -= p.vy;
                        p.opacity = constrain(p.opacity - 3, 0, 255);

                        if (p.opacity === 0) {
                            this.portal.particles.splice(i, 1);
                        }
                    }

                    noStroke();
                    for (var i = this.portal.orbs.length - 1; i >= 0; i--) {
                        var orb = this.portal.orbs[i];

                        fill(orb.color, orb.opacity);
                        ellipse(
                            orb.x +
                                sin(radians(orb.timer)) *
                                    this.targets[this.targets.length - 1]
                                        .distance *
                                    0.3,
                            orb.y,
                            orb.diameter,
                            orb.diameter
                        );

                        orb.timer += orb.speed;
                        orb.y -= orb.vy;
                        orb.opacity = constrain(orb.opacity - 1.5, 0, 255);

                        if (orb.opacity === 0) {
                            this.portal.orbs.splice(i, 1);
                        }
                    }

                    if (
                        this.point ===
                        this.levels[this.level].points.length - 1
                    ) {
                        noStroke();
                        fill(255, 200);
                        triangle(
                            point_target.x + 2,
                            point_target.y - 50,
                            point_target.x + 2,
                            point_target.y - 36,
                            point_target.x + 20,
                            point_target.y - 43
                        );
                        fill(40);
                        ellipse(point_target.x, point_target.y - 52, 4, 4);
                        stroke(40);
                        line(
                            point_target.x,
                            point_target.y + 5,
                            point_target.x,
                            point_target.y - 50
                        );
                    }

                    image(
                        this.portalImage,
                        point_target.x -
                            this.targets[this.targets.length - 2].distance,
                        point_target.y - 100 + this.bendy.weight / 2
                    );
                },
                addConfetti: function (x, y, amount) {
                    for (var i = 0; i < amount; i++) {
                        this.confetti.push({
                            x: x,
                            y: y,
                            w: random(5, 15),
                            h: random(5, 15),
                            vx: random(-2, 2),
                            vy: random(-8, -4),
                            gravity: 0.1,
                            sx: random(360) | 0,
                            sy: random(360) | 0,
                            angle: 0,
                            rot: random(-10, 10),
                            color: color(
                                random(100, 230),
                                random(100, 230),
                                random(100, 230)
                            ),
                        });
                    }
                },
                runConfetti: function () {
                    noStroke();

                    for (var i = this.confetti.length - 1; i >= 0; i--) {
                        //get the current confetti
                        var confetto = this.confetti[i];

                        var w = cos(radians(confetto.sx)) * confetto.w;
                        var h = sin(radians(confetto.sy)) * confetto.h;

                        //translate to the center of the confetti then rotate it
                        translate(
                            confetto.x + confetto.w / 2,
                            confetto.y + confetto.h / 2
                        );
                        rotate(radians(confetto.angle));

                        //draw the confetti
                        fill(confetto.color);
                        rect(-w / 2, -h / 2, w, h);

                        //reverse the rotation and translation ready for the next confetti
                        rotate(radians(-confetto.angle));
                        translate(
                            -confetto.x - confetto.w / 2,
                            -confetto.y - confetto.h / 2
                        );

                        //move/rotate the confetti
                        confetto.sx += 5;
                        confetto.sy += 5;
                        confetto.x += confetto.vx;
                        confetto.vy += confetto.gravity;
                        confetto.y += confetto.vy;
                        confetto.angle += confetto.rot;

                        //reset the confetti when it goes of the bottom of the canvas
                        if (confetto.y - confetto.h > height) {
                            this.confetti.splice(i, 1);
                        }
                    }
                },
                runBendyDots: function () {
                    pushMatrix();
                    translate(this.cam.x, this.cam.y);

                    noStroke();
                    for (var i = this.bendy.dots.length - 1; i >= 0; i--) {
                        var dot = this.bendy.dots[i];

                        if (dot.delay === 0) {
                            translate(
                                dot.x + dot.diameter / 2,
                                dot.y + dot.diameter / 2
                            );
                            rotate(radians(dot.angle));
                            fill(54, 54, 54, dot.opacity);
                            rect(
                                -dot.diameter / 2,
                                -dot.diameter / 2,
                                dot.diameter,
                                dot.diameter
                            );
                            rotate(radians(-dot.angle));
                            translate(
                                -(dot.x + dot.diameter / 2),
                                -(dot.y + dot.diameter / 2)
                            );

                            dot.x += dot.vx;
                            dot.y -= dot.vy;
                            dot.angle += dot.rot;
                            dot.diameter *= 0.99;
                            dot.opacity = constrain(dot.opacity - 2, 0, 255);

                            if (dot.opacity === 0) {
                                this.bendy.dots.splice(i, 1);
                            }
                        } else {
                            fill(this.bendy.color, dot.opacity);
                            ellipse(dot.x, dot.y, dot.diameter, dot.diameter);
                            dot.delay = constrain(dot.delay - 2, 0, Infinity);
                        }
                    }
                    popMatrix();
                },
                generateBendyDots: function (dir) {
                    var increment = 4;
                    var delay = 0;

                    this.bendy.dots.length = 0;

                    if (dir === 1) {
                        for (var i = 0; i < this.bendy.bits.length; i++) {
                            var bit = this.bendy.bits[i];

                            var vx = cos(radians(bit.angleTarget - 90));
                            var vy = sin(radians(bit.angleTarget - 90));

                            var n = (bit.len / increment) | 0;

                            for (var j = 0; j < n; j++) {
                                this.bendy.dots.push({
                                    x: bit.x + vx * (j * increment),
                                    y: bit.y + vy * (j * increment),
                                    vx: random(-1, 1),
                                    vy: random(0.5, 1),
                                    angle: random(360) | 0,
                                    rot: random(1, 3) * random() < 0.5 ? 1 : -1,
                                    diameter: this.bendy.weight,
                                    opacity: random(200, 255) | 0,
                                    delay: delay,
                                });
                                delay += 2;
                            }

                            this.bendy.dots.push({
                                x: bit.x + vx * bit.len,
                                y: bit.y + vy * bit.len,
                                vx: random(-1, 1),
                                vy: random(0.5, 1),
                                angle: random(360) | 0,
                                rot: random(1, 3) * random() < 0.5 ? 1 : -1,
                                diameter: this.bendy.weight,
                                opacity: random(200, 255) | 0,
                                delay: delay,
                            });
                        }
                    } else {
                        for (var i = this.bendy.bits.length - 1; i >= 0; i--) {
                            var bit = this.bendy.bits[i];

                            var vx = cos(radians(bit.angleTarget - 90));
                            var vy = sin(radians(bit.angleTarget - 90));

                            var n = (bit.len / increment) | 0;

                            for (var j = n - 1; j > 0; j--) {
                                this.bendy.dots.push({
                                    x: bit.x + vx * (j * increment),
                                    y: bit.y + vy * (j * increment),
                                    vx: random(-1, 1),
                                    vy: random(0.5, 1),
                                    angle: random(360) | 0,
                                    rot: random(1, 3) * random() < 0.5 ? 1 : -1,
                                    diameter: this.bendy.weight,
                                    opacity: random(200, 255) | 0,
                                    delay: delay,
                                });
                                delay += 2;
                            }

                            this.bendy.dots.push({
                                x: bit.x,
                                y: bit.y,
                                vx: random(-1, 1),
                                vy: random(0.5, 1),
                                angle: random(360) | 0,
                                rot: random(1, 3) * random() < 0.5 ? 1 : -1,
                                diameter: this.bendy.weight,
                                opacity: random(200, 255) | 0,
                                delay: delay,
                            });
                        }
                    }
                },
                displayLife: function () {
                    noStroke();
                    pushMatrix();
                    translate(30, 30);
                    scale(0.4);
                    rotate(radians(45));
                    pushStyle();
                    fill(140, 222, 176);
                    rectMode(CENTER);
                    rect(0, 0, 50, 50);
                    rotate(radians(-45));
                    ellipse(-13, -13, 50, 50);
                    ellipse(13, -13, 50, 50);
                    popStyle();
                    popMatrix();
                    pushStyle();
                    textAlign(LEFT, TOP);
                    textSize(30);
                    fill(255);
                    text(this.lives, 50, 12);
                    popStyle();
                },
                runMessages: function () {
                    pushStyle();
                    textAlign(CENTER, CENTER);
                    textSize(30);

                    for (var i = this.messages.length - 1; i >= 0; i--) {
                        var message = this.messages[i];

                        fill(255, message.opacity);
                        text(message.content, message.x, message.y);

                        message.opacity = constrain(
                            message.opacity - 2,
                            0,
                            255
                        );
                        message.y -= 2;

                        if (message.opacity === 0) {
                            this.messages.splice(i, 1);
                        }
                    }
                    popStyle();
                },
                runProgressBar: function () {
                    pushStyle();
                    noStroke();
                    fill(235, 235, 179);
                    ellipse(200, 50, 50, 50);
                    fill(140, 222, 176);
                    ellipse(400, 50, 50, 50);

                    var points = this.levels[this.level].points.length;
                    for (var i = 1; i <= this.progress; i++) {
                        var percent = i / points;
                        fill(
                            lerpColor(
                                color(235, 235, 179),
                                color(140, 222, 176),
                                percent
                            )
                        );
                        rect(
                            225 + ((i - 1) * 150) / points,
                            45,
                            150 / points,
                            10
                        );
                    }

                    noFill();
                    stroke(60);
                    strokeWeight(5);
                    strokeCap(SQUARE);
                    arc(200, 50, 50, 50, radians(15), radians(345));
                    arc(400, 50, 50, 50, radians(195), radians(525));
                    line(222, 45, 377, 45);
                    line(222, 55, 377, 55);

                    textAlign(CENTER, CENTER);
                    textSize(20);
                    fill(40);
                    text(this.level + 1, 200, 50);
                    text(this.level + 2, 400, 50);
                    popStyle();
                },
                updateCamera: function () {
                    var currentLevel = this.levels[this.level];
                    var currentPoint = currentLevel.points[this.point];
                    this.cam.x =
                        lerp(
                            this.cam.x,
                            width * 0.9 - currentPoint.target.x,
                            0.1
                        ) | 0;
                    this.cam.y =
                        lerp(
                            this.cam.y,
                            height * 0.85 -
                                max(
                                    currentPoint.target.y,
                                    currentLevel.map[currentPoint.start].y
                                ),
                            0.1
                        ) | 0;
                },
                completed: function () {
                    background(121, 189, 169);

                    image(this.backImages[0], 0, 0);

                    pushStyle();
                    textAlign(CENTER, TOP);
                    textSize(42);
                    fill(20);
                    text("GAME COMPLETED", 300, 150);

                    // Add message about score saving
                    textSize(20);
                    fill(255, 200);
                    text("Saving final score...", 300, 220);
                    popStyle();

                    this.buttons.home.draw();
                },
                next: function () {
                    background(121, 189, 169);
                    image(this.levels[this.level].backImage, 0, 0);

                    pushMatrix();
                    translate(this.cam.x, this.cam.y);
                    this.drawScenery();
                    this.runPortal();
                    this.drawLevel();
                    popMatrix();

                    this.runProgressBar();
                    this.runConfetti();

                    this.anim.yoff = lerp(this.anim.yoff, 0, 0.1);

                    pushMatrix();
                    translate(0, this.anim.yoff);

                    pushStyle();
                    textAlign(CENTER, TOP);
                    textSize(38);
                    fill(20);
                    fill(255, 200);
                    text("LEVEL " + (this.level + 1) + "\nCOMPLETE", 300, 140);
                    text("Total Score: " + this.score.total, 300, 255);
                    popStyle();

                    this.buttons.next.draw();
                    this.buttons.save.draw();
                    popMatrix();
                },
                play: function () {
                    background(121, 189, 169);
                    image(this.levels[this.level].backImage, 0, 0);

                    this.updateCamera();

                    this.displayLife();
                    this.runMessages();

                    switch (this.state) {
                        case "play":
                            break;
                        case "resetPortal":
                            this.runPortalReset();
                            this.runBendyDots();
                            break;
                        case "nextPortal":
                            this.runPortalProgression();
                            this.runBendyDots();
                            break;
                        case "resetLevel":
                            this.runLevelReset();
                            this.runBendyDots();
                            break;
                        case "nextLevel":
                            this.runLevelProgression();
                            this.runBendyDots();
                            break;
                    }

                    pushMatrix();
                    translate(this.cam.x, this.cam.y);
                    this.drawScenery();
                    this.runPortal();
                    this.runConfetti();
                    this.drawLevel();
                    this.runBendy();
                    popMatrix();

                    this.runProgressBar();

                    pushStyle();
                    textAlign(CENTER, TOP);
                    fill(255, 200);
                    textSize(60);
                    text(this.score.total + "\n" + this.score.level, 300, 100);

                    if (this.level === 0) {
                        textAlign(LEFT, TOP);
                        textSize(15);
                        text("< total game score", 350, 125);
                        text(
                            "< level score\nwill only be added to\nthe total score if you\ncomplete the level",
                            350,
                            196
                        );
                        if (this.point === 0) {
                            textAlign(RIGHT, TOP);
                            text(
                                "hold the mouse down to\ngrow bendy then release to\nfall onto the portal",
                                250,
                                460
                            );
                        }
                    }
                    popStyle();
                },
                home: function () {
                    background(121, 189, 169);
                    image(this.backImages[0], 0, 0);

                    image(this.titleImage, 0, -40);

                    noStroke();
                    fill(255, 255, 255, 40);
                    triangle(-150, 600, 100, 200, 350, 600);

                    fill(255, 255, 255, 20);
                    triangle(250, 600, 450, 300, 650, 600);

                    pushMatrix();
                    translate(170, -40);
                    this.runPortal();
                    this.drawLevel();
                    popMatrix();

                    pushStyle();
                    stroke(this.bendy.color);
                    strokeWeight(this.bendy.weight);
                    line(150, 510, 150, 440);
                    textAlign(CENTER, CENTER);
                    pushMatrix();
                    translate(300, 180);
                    rotate(radians(sin(radians(frameCount * 2)) * 10));
                    textSize(30);
                    fill(20);
                    text(this.levels.length + " levels!", 0, 0);
                    popMatrix();

                    fill(20);
                    textSize(16);
                    textAlign(CENTER, TOP);
                    text(
                        "Hold the mouse down until bendy is at the right height, then let him fall to reach the portal. Reach the last portal to progress to the next level.",
                        50,
                        235,
                        500,
                        600
                    );
                    text("bendy", 105, 460);
                    text("portal", 485, 425);
                    popStyle();

                    this.buttons.play.draw();
                },
                run: function () {
                    switch (this.scene) {
                        case "play":
                            this.play();
                            break;
                        case "home":
                            this.home();
                            break;
                        case "completed":
                            this.completed();
                            break;
                        case "next":
                            this.next();
                            break;
                    }

                    cursor(hover ? "pointer" : "default");
                    clicked = hover = false;
                },
            };
            return App;
        })();

        app = new App({});

        draw = function () {
            app.run();
        };
    }
};
