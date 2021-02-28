const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let threshold = 1;

let notes = [ { note: 'C0', freq: 16.35 }, { note: 'D0', freq: 17.32 }, { note: 'E0', freq: 20.6 }, { note: 'F0', freq: 21.83 }, { note: 'G0', freq: 24.50 }, { note: 'A0', freq: 27.50 }, { note: 'B0', freq: 30.87 }, 
  { note: 'C1', freq: 32.7 },{ note: 'D1', freq: 36.71 },{ note: 'E1', freq: 41.2},{ note: 'F1', freq: 43.65},{ note: 'G1', freq: 49.00 }, { note: 'A1', freq: 55 },{ note: 'B1', freq: 61.74 },
  { note: 'C2', freq: 65.41 },{ note: 'D2', freq:73.42 },{ note: 'E2', freq: 82.41},{ note: 'F2', freq: 87.31},{ note: 'G2', freq: 98 }, { note: 'A2', freq: 110 },{ note: 'B2', freq: 123.47},
  { note: 'C3', freq: 130.81 },{ note: 'D3', freq: 146.83 },{ note: 'E3', freq: 164.81},{ note: 'F3', freq: 174.61},{ note: 'G3', freq: 196 }, { note: 'A3', freq: 220 },{ note: 'B3', freq: 246.94 },
  { note: 'C4', freq: 261.63 },{ note: 'D4', freq: 293.66 },{ note: 'E4', freq: 329.63},{ note: 'F4', freq: 349.23},{ note: 'G4', freq: 392 }, { note: 'A4', freq: 440 },{ note: 'B4', freq: 493.88 },
  { note: 'C5', freq: 523.25 },{ note: 'D5', freq: 587.33 },{ note: 'E5', freq: 659.25},{ note: 'F5', freq: 698.46},{ note: 'G5', freq: 783.99 }, { note: 'A5', freq: 880 },{ note: 'B5', freq: 987.77 },
  { note: 'C6', freq: 1046.5 },{ note: 'D6', freq: 1174.66 },{ note: 'E6', freq: 1318.51},{ note: 'F6', freq: 1396.91},{ note: 'G6', freq: 1567.98 }, { note: 'A6', freq: 1760 },{ note: 'B6', freq: 1975.53 },
  { note: 'C7', freq: 2093 },{ note: 'D7', freq: 2349.32 },{ note: 'E7', freq: 2637.02},{ note: 'F7', freq: 2793.83},{ note: 'G7', freq: 3135.96 }, { note: 'A7', freq: 3520 },{ note: 'B7', freq: 3951.07 },
  { note: 'C8', freq: 4186.01 },{ note: 'D8', freq:4698.63},{ note: 'E8', freq: 5274.04},{ note: 'F8', freq: 5587.04},{ note: 'G8', freq: 6271.93 }, { note: 'A8', freq: 7040 },{ note: 'B8', freq: 7902.13 },
  
  { note: 'C#0/Db0', freq: 17.32 },{ note: 'D#0/Eb0', freq: 19.45 },{ note: 'F#0/Gb0', freq:23.12},{ note: 'G#0/Ab0', freq: 25.96 },{ note: 'A#0/Bb0', freq:29.14},
  { note: 'C#1/Db1', freq: 34.65},{ note: 'D#1/Eb1', freq: 38.89},{ note: 'F#1/Gb1', freq:46.25  }, { note: 'G#1/Ab1', freq:51.91 },{ note: 'A#1/Bb1', freq: 58.27 },
  { note: 'C#2/Db2', freq: 69.30 },{ note: 'D#2/Eb2', freq: 77.78 },{ note: 'F#2/Gb2', freq:92.5},{ note: 'G#2/Ab2', freq: 103.83 },{ note: 'A#2/Bb2', freq:116.54},
  { note: 'C#3/Db3', freq: 138.59 },{ note: 'D#3/Eb3', freq: 146.83 },{ note: 'F#3/Gb3', freq:185},{ note: 'G#3/Ab3', freq: 207.65 },{ note: 'A#3/Bb3', freq:233.08},
  { note: 'C#4/Db4', freq: 311.13 },{ note: 'D#4/Eb4', freq: 369.99 },{ note: 'F#4/Gb4', freq:415.30 },{ note: 'G#4/Ab4', freq: 466.16 },{ note: 'A#4/Bb4', freq:554.37},
  { note: 'C#5/Db5', freq: 554.37 },{ note: 'D#5/Eb5', freq: 622.25 },{ note: 'F#5/Gb5', freq:739.99},{ note: 'G#5/Ab5', freq: 830.61 },{ note: 'A#5/Bb5', freq:932.33},
  { note: 'C#6/Db6', freq: 1108.73 },{ note: 'D#6/Eb6', freq: 1244.51 },{ note: 'F#6/Gb6', freq:1479.98},{ note: 'G#6/Ab6', freq: 1661.22 },{ note: 'A#6/Bb6', freq:1864.66},
  { note: 'C#7/Db7', freq: 2217.46 },{ note: 'D#7/Eb7', freq: 2489.02 },{ note: 'F#7/Gb7', freq:2959.96},{ note: 'G#7/Ab7', freq: 3322.44 },{ note: 'A#7/Bb7', freq:3729.31},
  { note: 'C#8/Db8', freq: 4434.92 },{ note: 'D#8/Eb8', freq: 4978.03 },{ note: 'F#8/Gb8', freq:5919.91},{ note: 'G#8/Ab8', freq:6644.88 },{ note: 'A#8/Bb8', freq:7458.62}

];

function setup() {
  createCanvas(400, 400);
  audioContext = new getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
}

function listening() {
  audioContext.resume()
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded
  );
}

function draw() {
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(32);
    text(freq.toFixed(2), width / 2, height - 150);


    let closestNote = -1;
    let recordDiff = Infinity;
    for (let i = 0; i < notes.length; i++) {
      let diff = freq - notes[i].freq;
      if (abs(diff) < abs(recordDiff)) {
        closestNote = notes[i];
        recordDiff = diff;
      }
    }

    textSize(64);
    text(closestNote.note, width / 2, height - 50);


    let diff = recordDiff;

    let alpha = map(abs(diff), 0, 100, 255, 0);
    rectMode(CENTER);
    fill(255, alpha);
    stroke(255);
    strokeWeight(1);
    if (abs(diff) < threshold) {
      fill(0, 255, 0);
    }
    rect(200, 100, 200, 50);

    stroke(255);
    strokeWeight(4);
    line(200, 0, 200, 200);

    noStroke();
    fill(255, 0, 0);
    if (abs(diff) < threshold) {
      fill(0, 255, 0);
    }
    rect(200 + diff / 2, 100, 10, 75);
}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}
