// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;
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
            // this._welcomeLabel = new objects.Label(
            //     "SLOT MACHINE",
            //     "60px Consolas",
            //     "#000000",
            //     config.Screen.CENTER_X,
            //     config.Screen.CENTER_Y, true);
            // this.addChild(this._welcomeLabel);
                   
            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
           
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
           
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // Start playing Background Audio 
            var audioFile = document.createElement("audio");
            audioFile.src = "../../Assets/audio/jazz.mp3";
            audioFile.loop = true;
            audioFile.play();
            
            // Play CLICK sound
            var audioFile = document.createElement("audio");
            audioFile.src = "../../Assets/audio/click.mp3";
            audioFile.play();
            
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the SLOT MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }

    }
}