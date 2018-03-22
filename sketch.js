var song;
var fft;
var button;
var innerWidth;
var innerHeight;
var reverb;
var reverbTime = 3;
var reverbDecay = 2;
var osc;
var pulse;
var ws;



function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('song.mp3');
  innerHeight = window.innerHeight;
  innerWidth = window.innerWidth;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  reverb = new p5.Reverb();

  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.disconnect();
  reverb.process(song, reverbTime, reverbDecay);
  song.play();
  fft = new p5.FFT(0.9, 128);

  ws = new WebSocket("ws://localhost:40510");
  
  ws.onmessage = function (event) {
    
  }

}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  noStroke();
  translate(width / 2, height / 2);
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 70, 1000);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255);
    line(0, 0, x, y);

  }


}
