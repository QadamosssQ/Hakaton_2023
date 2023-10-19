const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const createImg = (src) => {
    const img = new Image();
    img.src = src;
    return img;
}

export class Slide{
    constructor(imagePath, width, text){
        this.width = width;
        this.image = createImg(imagePath);
        this.text = text;
    }
}

export class Slider{    
    constructor(slides){
        this.slides = slides;
        this.currentSlide = 0;
    }

    render(){
        ctx.drawImage(this.slides[this.currentSlide].image, (canvas.width - this.slides[this.currentSlide].width) / 2, canvas.height / 8, this.slides[this.currentSlide].width, canvas.height/4*3);
        
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.slides[this.currentSlide].text, 5, canvas.height - 5);    
    }

    update(){
        
    }
}

//c.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
//createImg(img)