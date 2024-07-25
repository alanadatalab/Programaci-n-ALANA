// Declaración de variables globales
let song;
let amp;
let playing = false;
let playButton;
let fullscreenButton;
let hsbButton;
let pickerButton;
let currentVisualization = 1;
let hu = 0;
let useHSB = true;
let sizeSlider;
let strokeSlider;
let rotationSpeedSlider;
let colorPicker;
let backgroundColorPicker;
let isDragging = false;
let offsetX, offsetY;
let introVisible = true; // Variable para manejar la visibilidad de la imagen de introducción
 

//parte para cargar el mp3
function preload() {
  let songSelector = document.getElementById('song-selector');
  let songFile = songSelector.value;
  song = loadSound(songFile);
}
//cambia la canción que se está reproduciendo
function changeSong() {
  //busca un elemento con ese Id en específico. También permite el cambio de los mp3
  let songSelector = document.getElementById('song-selector');
  let songFile = songSelector.value;
  
  if (playing) {

    //si es PLAYING es TRUE: A) Permite detener el audio B) Se actualiza la variable a FALSE C) Actualiza el botón
    song.stop();
    playing = false;
    playButton.html('Play');
  }
  song = loadSound(songFile);
}





function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 255, 255);
  strokeJoin(ROUND);
  strokeWeight(10);
  noFill();

  amp = new p5.Amplitude();

  createButtons();
  createSliders();
  createPickers();
  setupToolbar();
  windowResized();
}

function createButtons() {
  const buttonContainer = select('#button-container');

  playButton = createButton('play');
  playButton.class('button');
  playButton.mousePressed(togglePlay);
  buttonContainer.child(playButton);

  fullscreenButton = createButton('fullscreen');
  fullscreenButton.class('button');
  fullscreenButton.mousePressed(toggleFullscreen);
  buttonContainer.child(fullscreenButton);

  hsbButton = createButton('arcoiris');
  hsbButton.class('button');
  hsbButton.mousePressed(enableHSB);
  buttonContainer.child(hsbButton);

  pickerButton = createButton('1 color');
  pickerButton.class('button');
  pickerButton.mousePressed(enablePicker);
  buttonContainer.child(pickerButton);
}

function createSliders() {
  const sliderContainer = select('#slider-container');

  sizeSlider = createSlider(5, 100, 100);
  sizeSlider.class('slider');
  createSliderElement(sliderContainer, 'size', sizeSlider);

  strokeSlider = createSlider(1, 20, 10);
  strokeSlider.class('slider');
  createSliderElement(sliderContainer, 'stroke', strokeSlider);

  rotationSpeedSlider = createSlider(0, 200, 0.01, 0.001);
  rotationSpeedSlider.class('slider');
  createSliderElement(sliderContainer, 'velocidad + rotación', rotationSpeedSlider);
}

function createPickers() {
  const pickerContainer = select('#picker-container');

  backgroundColorPicker = createColorPicker('#000000');
  backgroundColorPicker.class('picker');
  pickerContainer.child(createPickerElement('background color', backgroundColorPicker));

  colorPicker = createColorPicker('#ffae23');
  colorPicker.class('picker');
  pickerContainer.child(createPickerElement('color', colorPicker));
}

function createSliderElement(container, label, slider) {
  const div = createDiv();
  const span = createSpan(label);
  span.class('slider-label');
  div.child(span);
  div.child(slider);
  container.child(div);
}

function createPickerElement(label, picker) {
  const div = createDiv();
  const span = createSpan(label);
  span.class('slider-label');
  div.child(span);
  div.child(picker);
  return div;
}

function setupToolbar() {
  const toolbar = select('#toolbar');
  const closeBtn = select('#close-btn');
  const mainContainer = select('#main-container');

  closeBtn.mousePressed(() => {
    mainContainer.hide();
  });

  toolbar.mousePressed((event) => {
    isDragging = true;
    offsetX = event.clientX - mainContainer.position().x;
    offsetY = event.clientY - mainContainer.position().y;
  });

  toolbar.mouseReleased(() => {
    isDragging = false;
  });

  mainContainer.mouseMoved((event) => {
    if (isDragging) {
      mainContainer.position(event.clientX - offsetX, event.clientY - offsetY);
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (introVisible) {
    return; // No dibujar nada mientras la imagen de introducción está visible
  }

  background(backgroundColorPicker.color());
  let vol = amp.getLevel();

  //para cambiar las visuales
  // si currentVisualization es 1 se llama a la 1
  if (currentVisualization === 1) {
    visualization1(vol);
  } else if (currentVisualization === 2) {
    visualization2(vol);
  } else if (currentVisualization === 3) {
    visualization3(vol);
  } else if (currentVisualization === 4) {
    visualization4(vol);
  }
}

function togglePlay() {
  if (playing) {
    song.pause();
    playButton.html('Play');
  } else {
    song.play();
    playButton.html('Pause');
  }
  playing = !playing;
}

function toggleFullscreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function enableHSB() {
  useHSB = true;
}

function enablePicker() {
  useHSB = false;
}


function keyPressed() {
  if (introVisible && key === ' ') {
    introVisible = false; // Ocultar la imagen de introducción
    document.getElementById('intro').style.display = 'none';
    currentVisualization = 1; // Comenzar la visualización 1
    return;
  }

  if (key === '1' || key === '2' || key === '3' || key === '4') {
    let previousVisualization = currentVisualization;
    let newVisualization = int(key);

    if (newVisualization !== currentVisualization) {
      currentVisualization = newVisualization;
    } else {
      currentVisualization = previousVisualization;
    }
  }
}
