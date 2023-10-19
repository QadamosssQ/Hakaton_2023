// import {Square} from './classes/Square.js';
import * as SLIDER from './classes/Slider.js'
import * as MAZE from './classes/Maze.js'

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export class Game {
    constructor() {
        this.objectivesDone = 0;
        this.objects = [];
        this.gameRunning = true;
        this.objects = [];
        this.currentScene = 0;
        this.slider = new SLIDER.Slider([
            new SLIDER.Slide("./img/davinci.png", 150, "Leonardo da Vinci"),
            new SLIDER.Slide("./img/oppenheimer.png", 150, "Robert Oppenheimer"),
            new SLIDER.Slide("./img/dancingTriangle.png", 150, "Trójkąt ")
        ]);
    }

    clear() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        switch(this.currentScene){
            case 0:
                this.slider.update();
        }
    }

    render() {
        switch(this.currentScene){
            case 0:
                this.slider.render();
            break;

            case 1:
                const img1 = new Image();
                img1.src = "./img/koperta.png";
                ctx.drawImage(img1, (canvas.width - 200) / 2, -canvas.height / 8, 200, canvas.height/2*3);
            break;

            case 2:
                const img2 = new Image();
                img2.src = "./img/pergamin.png";
                ctx.drawImage(img2, (canvas.width - 200) / 2, -canvas.height / 4, 200, canvas.height/2*3);
            break;

            case 3:
                if(this.slider.currentSlide == 0){
                    const img3 = new Image();
                    img3.src = "./img/bg.png";
                    ctx.drawImage(img3, 0, 0, canvas.width, canvas.height);
                    this.objects.forEach((object)=>{
                        object.render();
                    })
                    ctx.fillStyle = "white";
                    ctx.font = "10px Arial";
                    ctx.fillText(`zebrane elementy: ${this.objectivesDone}`, 5, canvas.height - 5); 
                }
                else{
                    MAZE.drawMaze();
                }
            break;
            case 4:
                const img4 = new Image();
                img4.src = "./img/pergamin.png";
                ctx.drawImage(img4, (canvas.width - 200) / 2, -canvas.height / 4, 200, canvas.height/2*3);
            break;
        }
    }
}   