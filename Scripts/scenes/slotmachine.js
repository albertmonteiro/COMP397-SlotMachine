var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._apple = 0;
            this._banana = 0;
            this._bar = 0;
            this._blank = 0;
            this._cherry = 0;
            this._grape = 0;
            this._lemon = 0;
            this._melon = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset the Game to initial values
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add the RESET button to the MENU scene
            this._resetButton = new objects.Button("ResetButton", 68, 190, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add the START button to the MENU scene
            this._powerButton = new objects.Button("PowerButton", 510, 190, false);
            this.addChild(this._powerButton);
            this._powerButton.on("click", this._powerButtonClick, this);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 100, 365, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 200, 365, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 300, 365, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 450, 365, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // Add Jackpot Text
            this._jackpotText = new objects.Label(this._jackpot.toString(), "14px Consolas", "#ff0000", 426, 100, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            console.log("Jackpot: " + this._jackpot);
            // Add Credit Text
            this._creditText = new objects.Label(this._playerMoney.toString(), "14px Consolas", "#ff0000", 255, 324, false);
            this._creditText.textAlign = "right";
            this.addChild(this._creditText);
            console.log("Credit: " + this._playerMoney);
            // Add Bet Text
            this._betText = new objects.Label(this._playerBet.toString(), "14px Consolas", "#ff0000", 371, 324, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            console.log("Bet: " + this._playerBet);
            // Add Result Text
            this._resultText = new objects.Label(this._winnings.toString(), "14px Consolas", "#ff0000", 487, 324, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            console.log("Result: " + this._winnings);
            // Initialize array of bitmaps
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        SlotMachine.prototype._resetAll = function () {
            this._jackpot = 5000;
            this._playerMoney = 1000;
            this._playerBet = 0;
            this._winnings = 0;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blank++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Melon";
                        this._melon++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Lemon";
                        this._lemon++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Grape";
                        this._grape++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherry++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bar++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Banana";
                        this._banana++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Apple";
                        this._apple++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blank == 0) {
                if (this._melon == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._lemon == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._grape == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherry == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bar == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._banana == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._apple == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._melon == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._lemon == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._grape == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherry == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bar == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._banana == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._apple == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._apple == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                console.log("Win!");
            }
            else {
                console.log("Loss!");
            }
            this._resultText.text = this._winnings.toString();
            this._playerMoney += this._winnings;
            this._creditText.text = this._playerMoney.toString();
            this._resetFruitTally();
        };
        SlotMachine.prototype._resetFruitTally = function () {
            this._apple = 0;
            this._banana = 0;
            this._bar = 0;
            this._cherry = 0;
            this._cherry = 0;
            this._grape = 0;
            this._lemon = 0;
            this._melon = 0;
        };
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 134 + (reel * 132);
                this._reels[reel].y = 130;
                this.addChild(this._reels[reel]);
                console.log("reels" + reel + " " + this._reels);
            }
        };
        SlotMachine.prototype._placeBet = function (playerBet) {
            if (playerBet <= this._playerMoney) {
                this._playerBet += playerBet;
                this._playerMoney -= this._playerBet;
                this._creditText.text = this._playerMoney.toString();
                this._betText.text = this._playerBet.toString();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            this._placeBet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this._placeBet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            // checks if player has bet an amount
            if (this._playerBet > 0) {
                var bitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                this._determineWinnings();
                // Resets player bet to 0
                this._playerBet = 0;
                this._betText.text = this._playerBet.toString();
            }
        };
        // RESET Button click event handler
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset!");
            //FadeOut 
            this._fadeOut(500, function () {
                // Switch to the SlotMachine Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        };
        // POWER Button click event handler
        SlotMachine.prototype._powerButtonClick = function (event) {
            console.log("Goodbye!");
            //FadeOut 
            this._fadeOut(500, function () {
                // Switch to the GameOver Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
        };
        return SlotMachine;
    }(objects.Scene));
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
