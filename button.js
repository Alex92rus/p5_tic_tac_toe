function Button(_centerX, _centerY, _text, _textSize, _color, _handler, hideOnClick) {
  var active = false;
  var hideOnClick = hideOnClick;

  textSize(_textSize);
  var startWidth = textWidth(_text);
  this.minX = _centerX - (startWidth / 2 + 5);
  this.minY = _centerY - _textSize;
  this.height = _textSize + 4;
  this.width = startWidth + 10;
  this.maxX = this.minX + this.width;
  this.maxY = this.minY + this.height;
  this.handler = _handler;
  this.text = _text;
  this.color = _color;
  this.centerX = _centerX;
  this.centerY = _centerY;



  this.detect = function(X, Y) {
    if (X >= this.minX && X <= this.maxX &&
        Y >= this.minY && Y <= this.maxY && active) {
      return true;
    } else {
      return false;
    }
  }

  this.isPressed = function(X, Y) {
     if (this.detect(X,Y)) {
       this.handler();
       if (hideOnClick === true) {
         this.setActive(false);
       }
       return true;
     }
     return false;
  }

  this.drawButton = function() {
    textSize(_textSize);
    textAlign(CENTER);
    placeRectangle(this.minX, this.minY, this.color, this.width, this.height);
    fill(0, 0, 0);
    text(this.text, this.centerX, this.centerY);
  }

  this.setActive = function(_active) {
    active = _active;
  }

  this.getActive = function() {
    return active;
  }
}