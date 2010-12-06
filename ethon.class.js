/**
  Class Ethon
**/
var Ethon = (function(){
  function Singleton(canvas, args) {
    console.log('Initializing game...');
    var args = args || {};

    this.init = args.init;
    this.draw = args.draw;
    this.update = args.update;

    this.timer = new Timer();
    this.render_manager = new RenderManager(canvas);
    this.event_manager = new EventManager();
    
    //attributes
    this.debug = false;
    this.running = false;

    //methods
    this.start = function() {
      console.log('Game started!');
      this.init();
      this.game_loop_id = setInterval(this.loop, 1000/30);
      this.running = true; 
    };

    this.loop = function() {
      var ethon = Ethon.getInstance();
      var dt = ethon.timer.update();
      ethon.update(dt);
      ethon.draw();
    };
  }
   
  //this is our instance holder
  var instance;
 
  //this is an emulation of static variables and methods
  var _static = {
    name: 'Ethon',
    //This is a method for getting an instance
    //It returns a singleton instance of a singleton object
    getInstance: function (canvas, args){
      if (instance === undefined) {
        instance = new Singleton(canvas, args);
      }
      return instance;
    }
  };
  return _static;
})();
 
jQuery.fn.ethon = function(args) {
  return Ethon.getInstance(this, args);
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).click(onClick);

function onKeyDown(event) {
  Ethon.getInstance().event_manager.keyboard_input.onKeyDown(event);
}

function onKeyUp(event) {
  Ethon.getInstance().event_manager.keyboard_input.onKeyUp(event);
}

function onClick(event) {
  Ethon.getInstance().event_manager.mouse_input.onClick(event);
}
