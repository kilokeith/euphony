// Generated by CoffeeScript 1.3.1
(function() {
  var Euphony,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Euphony = (function() {

    Euphony.name = 'Euphony';

    function Euphony(container) {
      this.resume = __bind(this.resume, this);

      this.pause = __bind(this.pause, this);

      this.stop = __bind(this.stop, this);

      this.start = __bind(this.start, this);

      var _this = this;
      this.design = new PianoKeyboardDesign();
      this.keyboard = new PianoKeyboard(this.design);
      this.rain = new NoteRain(this.design);
      this.scene = new Scene(container);
      this.scene.add(this.keyboard.model);
      this.scene.add(this.rain.model);
      this.scene.animate(function() {
        return _this.keyboard.update();
      });
      this.player = MIDI.Player;
      this.player.addListener(function(data) {
        var NOTE_OFF, NOTE_ON, message, note;
        NOTE_OFF = 128;
        NOTE_ON = 144;
        note = data.note, message = data.message;
        if (message === NOTE_ON) {
          return _this.keyboard.press(note);
        } else if (message === NOTE_OFF) {
          return _this.keyboard.release(note);
        }
      });
      this.player.setAnimation({
        delay: 30,
        callback: function(data) {
          return _this.rain.update(data.now * 1000);
        }
      });
    }

    Euphony.prototype.init = function(callback) {
      return MIDI.loadPlugin(function() {
        loader.stop();
        if (callback) {
          return setTimeout(callback, 1000);
        }
      });
    };

    Euphony.prototype.setMidiFile = function(midiFile, callback) {
      var _this = this;
      return this.player.loadFile(midiFile, function() {
        _this.rain.setMidiData(_this.player.data);
        return typeof callback === "function" ? callback() : void 0;
      });
    };

    Euphony.prototype.start = function() {
      return this.player.start();
    };

    Euphony.prototype.stop = function() {
      return this.player.stop();
    };

    Euphony.prototype.pause = function() {
      return this.player.pause();
    };

    Euphony.prototype.resume = function() {
      return this.player.resume();
    };

    return Euphony;

  })();

  this.Euphony = Euphony;

}).call(this);
