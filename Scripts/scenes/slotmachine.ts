// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _resetButton: objects.Button;
        private _powerButton: objects.Button;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _reels: createjs.Bitmap[];
        private _jackpotText: objects.Label;
        private _creditText: objects.Label;
        private _betText: objects.Label;
        private _resultText: objects.Label;
        private _playerMoney:number;
        private _winnings:number;
        private _jackpot:number;
        private _playerBet:number;

        private _apple = 0;
        private _banana = 0;
        private _bar = 0;
        private _blank = 0;
        private _cherry = 0;
        private _grape = 0;
        private _lemon = 0;
        private _melon = 0;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
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
            this._jackpotText = new objects.Label(
                this._jackpot.toString(),
                "14px Consolas",
                "#ff0000", 
                426, 100, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            console.log("Jackpot: "+this._jackpot);
            
            // Add Credit Text
            this._creditText = new objects.Label(
                this._playerMoney.toString(),
                "14px Consolas",
                "#ff0000", 
                255, 324, false);
            this._creditText.textAlign = "right";
            this.addChild(this._creditText);
            console.log("Credit: "+this._playerMoney);
            
            // Add Bet Text
            this._betText = new objects.Label(
                this._playerBet.toString(),
                "14px Consolas",
                "#ff0000", 
                371, 324, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            console.log("Bet: "+this._playerBet);
            
            // Add Result Text
            this._resultText = new objects.Label(
                this._winnings.toString(),
                "14px Consolas",
                "#ff0000", 
                487, 324, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            console.log("Result: "+this._winnings);
            
            // Initialize array of bitmaps
            this._initializeBitmapArray();
        
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
        
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        private _resetAll()
        {
            this._jackpot = 5000;
            this._playerMoney = 1000;
            this._playerBet = 0;
            this._winnings = 0;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _spinReels(): string[] {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "Blank";
                        this._blank++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Melon";
                        this._melon++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Lemon";
                        this._lemon++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Grape";
                        this._grape++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherry++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bar++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Banana";
                        this._banana++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Apple";
                        this._apple++;
                        break;
                }
            }
            console.log(betLine);
            return betLine;
        }
        
        /* This function calculates the player's winnings, if any */
        private _determineWinnings(): void {
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
                this._winnings = 0;
                console.log("Loss!");
            }

            this._resultText.text = this._winnings.toString();
            this._playerMoney += this._winnings;
            this._creditText.text = this._playerMoney.toString();
            this._resetFruitTally();
        }

        private _resetFruitTally(): void {
            this._apple = 0;
            this._banana = 0;
            this._bar = 0;
            this._blank = 0;
            this._cherry = 0;
            this._grape = 0;
            this._lemon = 0;
            this._melon = 0;
        }
        
        
        private _initializeBitmapArray():void
        {
            
            this._reels = new Array<createjs.Bitmap>();
            for (var reel:number = 0; reel < 3; reel++)
            {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 134 + (reel * 132);
                this._reels[reel].y = 130;
                this.addChild(this._reels[reel]);
                // console.log("reel"+reel+" " +this._reels);
            }
        }
        
        private _placeBet(playerBet:number)
        {
            if (playerBet <= this._playerMoney)
            {
                 this._playerBet += playerBet;
                 this._playerMoney -= playerBet;
                 this._creditText.text = this._playerMoney.toString();
                 this._betText.text = this._playerBet.toString();
                 console.log("Credit: " + this._playerMoney);
                 console.log("Bet: " + this._playerBet);
            }
        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
            this._placeBet(1);
        }

        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
            this._placeBet(10);
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            // checks if player has bet an amount
            if (this._playerBet > 0) 
            {
                var bitmap: string[] = this._spinReels();

                for (var reel: number = 0; reel < 3; reel++) 
                {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                
                this._determineWinnings();
                
                // Resets player bet to 0
                this._playerBet = 0;
                this._betText.text = this._playerBet.toString();
            }
          
        }
        
        // RESET Button click event handler
        private _resetButtonClick(event: createjs.MouseEvent) {
            console.log("Reset!");
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the SlotMachine Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }
        
        // POWER Button click event handler
        private _powerButtonClick(event: createjs.MouseEvent) {
            console.log("Goodbye!");
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the GameOver Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
        }
    }
}