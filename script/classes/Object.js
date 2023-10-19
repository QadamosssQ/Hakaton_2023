const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export class Object{
    constructor(pos, size, imagePath){
        this.pos = pos;
        this.size = size;
        this.img = new Image();
        this.img.src = imagePath;
    }

    render(){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}