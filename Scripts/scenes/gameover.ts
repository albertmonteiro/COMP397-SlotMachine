// GAME_OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startOverButton:objects.Button;
        private _gameOverLabel:objects.Label;
        private _menuBackground: createjs.Bitmap;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
            
            // add background image to the scene
            this._menuBackground = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this.addChild(this._menuBackground);
            
            // add the WELCOME Label to the MENU scene
            // this._gameOverLabel = new objects.Label(
            //     "GRACIAS!", 
            //     "60px Consolas", 
            //     "#000000", 
            //     config.Screen.CENTER_X, 
            //     config.Screen.CENTER_Y, true);
            // this.addChild(this._gameOverLabel);      
                   
            // add the START OVER button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartOverButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);
            
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
           
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Play CLICK sound
            var audioFile = document.createElement("audio");
            audioFile.src = "../../Assets/audio/click.mp3";
            audioFile.play();
            
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}