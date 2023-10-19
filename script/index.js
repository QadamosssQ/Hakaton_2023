import {Game}  from './Game.js';
import { Object } from './classes/object.js';
import * as MAZE from './classes/Maze.js'

const canvas = document.querySelector("canvas");
// canvas.style.width = window.innerWidth;
// canvas.style.height = window.innerHeight;
MAZE.generateMaze();
const ctx = canvas.getContext("2d");

const binds = document.querySelector(".inputs");



console.log(innerWidth)

const game = new Game();

function HandleKeyboard(e){
    if(game.currentScene == 0){
        binds.style.visibility = "visible";
        if(e.key == "ArrowRight"){
            game.slider.currentSlide++;
            if(game.slider.currentSlide > game.slider.slides.length-1){
                game.slider.currentSlide = 0;
            }
        }else if(e.key == "ArrowLeft"){
            game.slider.currentSlide--;
            if(game.slider.currentSlide < 0){
                game.slider.currentSlide = game.slider.slides.length-1;
            }
        }else if(e.key == "Enter"){
            game.currentScene = 1;
            binds.style.visibility = "hidden";
        }
    }else if(game.currentScene == 1){

    }
    
    console.log(game.slider.currentSlide);
}

document.addEventListener("keydown", HandleKeyboard);

function mouseHandle(e){
    if(game.currentScene == 1){
        game.currentScene = 2;
        if(game.slider.currentSlide ==0){
            document.querySelector(".lvl2").style.display="none";
            document.querySelector(".lvl1").style.display = "block";
            document.querySelector(".level").style.display = "block";
            document.querySelector(".lvl3").style.display="none";
            document.querySelector(".lvl4").style.display="none";
            document.querySelector(".level").style.left = innerWidth/2;
            document.querySelector(".level").style.top = 40;
        }
        else{
            document.querySelector(".lvl2").style.display="none";
            document.querySelector(".lvl1").style.display = "none";
            document.querySelector(".lvl3").style.display = "block";
            document.querySelector(".level").style.display = "block";
            document.querySelector(".lvl4").style.display="none";
            document.querySelector(".level").style.left = innerWidth/2;
            document.querySelector(".level").style.top = 40;
        }
        
    }
    else if(game.currentScene == 2){
        game.currentScene = 3;
        document.querySelector(".level").style.display = "none";

        game.objects = [];
        game.objects.push(new Object({x: 40, y: 60}, {x: 40, y: 40}, "./img/skrzydlo1.png"));
        game.objects.push(new Object({x: 100, y: 120}, {x: 40, y: 40}, "./img/skrzydlo1.png"));
        game.objects.push(new Object({x: 200, y: 0}, {x: 40, y: 40}, "./img/stelarz.png"));
        game.objects.push(new Object({x: 150, y: 50}, {x: 40, y: 40}, "./img/fundament.png"));

        if(game.slider.currentSlide != 0){
            console.log(game.slider.currentSlide);
            setTimeout(()=>{
                game.currentScene = 4;
                document.querySelector(".level").style.display = "block";
                document.querySelector(".lvl1").style.display = "none";
                document.querySelector(".lvl2").style.display = "none";
                document.querySelector(".lvl3").style.display="none";
                document.querySelector(".lvl4").style.display="block";
            }, 1000)
        }
    }
    else if(game.currentScene == 3){
        if(game.slider.currentSlide == 0){
            game.objects.forEach((obejct)=>{
                console.log(e.clientX, obejct.pos.x, obejct.pos.x + obejct.size.x,e.clientX*(ctx.canvas.width/1280), e.clientX / obejct.pos.x);
                if(obejct.pos.x <= e.clientX*(ctx.canvas.width/innerWidth) && obejct.pos.x + obejct.size.x >= e.clientX*(ctx.canvas.width/innerWidth) &&
                obejct.pos.y <= e.clientY*(ctx.canvas.height/innerHeight) && obejct.pos.y + obejct.size.y >= e.clientY*(ctx.canvas.height/innerHeight)){
                    game.objectivesDone++;
                    obejct.pos.x = 2000;
                    if(game.objectivesDone >= 4){
                        game.objectivesDone = 0;
                        game.currentScene = 4;
                        document.querySelector(".level").style.display = "block";
                        document.querySelector(".lvl1").style.display = "none";
                        document.querySelector(".lvl2").style.display = "block";
                        document.querySelector(".lvl3").style.display="none";
                        document.querySelector(".lvl4").style.display="none";
                    }
                }
            })
        }
        else{
            setTimeout(()=>{
                game.currentScene = 4;
            }, 1000)
        }    
    }
    else if(game.currentScene == 4){
        document.querySelector(".level").style.display = "none";
        document.querySelector(".lvl2").style.display = "none";
        game.currentScene = 0;
    }
}

document.addEventListener("click", mouseHandle);

function gameLoop() {
    game.clear();
    game.update();
    game.render();

    if (game.gameRunning) {
        setTimeout(gameLoop, 1/120);
    }
}
gameLoop();