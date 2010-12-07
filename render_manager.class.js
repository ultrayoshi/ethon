/**
  Class RenderManager
**/

var TRIANGLE_UP = 0;
var TRIANGLE_DOWN = 1;
var CIRCLE = 2;
var CIRCLE_EMPTY = 3;
var BOX = 4;
var BOX_FILLED = 5;

function RenderManager(canvas) {
  //attributes
  this.ctx = canvas[0].getContext("2d");
  this.canvas_width = canvas.width();
  this.canvas_height = canvas.height();

  //methods
  this.basicShape = function(shape, pos, w, h, scale, fillColor, strokeColor) {
    this.ctx.fillStyle = fillColor;

    if(strokeColor != null) {
      this.ctx.strokeStyle = strokeColor;
    }

    switch(shape) {
      case TRIANGLE_UP:
        this.ctx.beginPath();  
        this.ctx.moveTo(pos.x,pos.y-(scale/2));  
        this.ctx.lineTo(pos.x-(scale/2),pos.y+(scale/2));  
        this.ctx.lineTo(pos.x+(scale/2),pos.y+(scale/2));  
        this.ctx.fill();  
        break;
      case TRIANGLE_DOWN:
        this.ctx.beginPath();  
        this.ctx.moveTo(pos.x,pos.y+(scale/2));  
        this.ctx.lineTo(pos.x-(scale/2),pos.y-(scale/2));  
        this.ctx.lineTo(pos.x+(scale/2),pos.y-(scale/2));  
        this.ctx.fill();  
        break;
      case CIRCLE:
        this.ctx.beginPath();
        this.ctx.arc(pos.x,pos.y,scale,0,Math.PI*2,true);
        this.ctx.fill();  
        break;
      case CIRCLE_EMPTY:
        this.ctx.beginPath();
        this.ctx.arc(pos.x,pos.y,scale,0,Math.PI*2,true);
        this.ctx.stroke();  
        break;
      case BOX:
        this.ctx.strokeRect(pos.x,pos.y,w,h);
        break;
      case BOX_FILLED:
        this.ctx.fillRect(pos.x,pos.y,w,h);
        break;
      default:
        alert('Basic shape not supported.');
    }
  };

  this.renderImage = function(img, pos, crop, dimension) {
    if(crop == undefined) {
      this.ctx.drawImage(img,pos.x,pos.y);
    }
    else {
      this.ctx.drawImage(img, crop.x, crop.y, dimension.x, dimension.y, pos.x, pos.y, dimension.x, dimension.y);
    }

    // Get the pixels.
    var imgd = this.ctx.getImageData(pos.x, pos.y, dimension.x+10, dimension.y+10);
    var pix = imgd.data;
 
    // Loop over each pixel and invert the color.
    for (var i = 0, n = pix.length; i < n; i += 4) {
      if(pix[i ] == 0 && pix[i+1] == 64 && pix[i+2] == 128) {
        pix[i+3] = 0;
      }
    }
 
    // Draw the ImageData object.
    this.ctx.putImageData(imgd, pos.x, pos.y);
  };

  this.drawText = function(text, pos_x, pos_y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, pos_x, pos_y);
  };

  this.clear = function(color) {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
    if(color != null) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
    }
  };

  console.log('Render manager loaded succesfully');
};
