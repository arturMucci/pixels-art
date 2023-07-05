const colorPalette = document.getElementsByClassName('color');
const buttonRandomColor = document.getElementById('button-random-color');
const buttonClear = document.getElementById('clear-board');
const buttonGenerateBoard = document.getElementById('generate-board');
let input;
let pixelBoardSize;
const pixelBoard = document.getElementById('pixel-board');
const pixel = document.getElementsByClassName('pixel');
const storagePalette = JSON.parse(localStorage.getItem('colorPalette'));
const storageDrawing = JSON.parse(localStorage.getItem('pixelBoard'));
const storageSize = JSON.parse(localStorage.getItem('boardSize'));
const color1 = document.getElementsByClassName('color')[0];
const color2 = document.getElementsByClassName('color')[1];
const color3 = document.getElementsByClassName('color')[2];
const color4 = document.getElementsByClassName('color')[3];
let actual = document.getElementsByClassName('selected')[0];

function retrieveColors() {
  if (storagePalette !== null) {
    colorPalette[0].style.backgroundColor = '#000000';
    const arrayPalette = storagePalette;
    for (let index = 1; index < colorPalette.length; index += 1) {
      colorPalette[index].style.backgroundColor = arrayPalette[index];
    }
  }
}

function newColor() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return color;
}

function saveColor() {
  const arrayColor = [];
  const a = document.getElementsByClassName('color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    arrayColor.push(a[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayColor));
}

function generateColors() {
  colorPalette[0].style.backgroundColor = 'rgb(0)';
  for (let index = 1; index < colorPalette.length; index += 1) {
    const color = `#${newColor()}`;
    colorPalette[index].style.backgroundColor = color;
  }
  saveColor();
}

function saveSize() {
  JSON.stringify(localStorage.setItem('boardSize', input));
}

function determineSize() {
  const size = input ** 2;
  if (size < 25 || !size) {
    input = 5;
    return 25;
  }
  if (size > 2500) {
    input = 50;
    return 2500;
  }
  saveSize();
  return size;
}

function genMatrix() {
  const size = determineSize();
  pixelBoardSize = input * 42;
  pixelBoard.style.width = `${pixelBoardSize}px`;
  pixelBoard.style.height = `${pixelBoardSize}px`;
  for (let index = 1; index <= size; index += 1) {
    const box = document.createElement('div');
    box.className = 'pixel';
    box.style.backgroundColor = 'rgb(255, 255, 255)';
    pixelBoard.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
    pixelBoard.style.gridTemplateRows = `repeat(${input}, 1fr)`;
    pixelBoard.appendChild(box);
  }
}

function clearMatrix() {
  for (let index = 0; index < 25; index += 1) {
    pixel[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function saveDrawing() {
  const drawing = [];
  for (let index = 0; index < 25; index += 1) {
    drawing[index] = pixel[index].style.backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(drawing));
  }
}

function retrieveDrawing() {
  if (storageDrawing !== null) {
    for (let index = 0; index < 25; index += 1) {
      pixel[index].style.backgroundColor = storageDrawing[index];
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

color1.onclick = function click() {
  actual.className = 'color';
  actual = color1;
  color1.className += ' selected';
};

color2.onclick = function click() {
  actual.className = 'color';
  actual = color2;
  color2.className += ' selected';
};

color3.onclick = function click() {
  actual.className = 'color';
  actual = color3;
  color3.className += ' selected';
};

color4.onclick = function click() {
  actual.className = 'color';
  actual = color4;
  color4.className += ' selected';
};

pixelBoard.onclick = function click(event) {
  const pixelColor = event.target;
  pixelColor.style.backgroundColor = actual.style.backgroundColor;
  saveDrawing();
};

buttonGenerateBoard.onclick = function clickGenerateBoard() {
  if (!(document.getElementById('board-size').value)) {
    alert('Board inválido!');
    return;
  }
  removeAllChildNodes(pixelBoard);
  input = document.getElementById('board-size').value;
  genMatrix();
  clearMatrix();
};

buttonRandomColor.onclick = function clickRandomColor() {
  generateColors();
};

buttonClear.onclick = function clickClearMatrixColor() {
  clearMatrix();
  saveDrawing();
};

window.onload = function load() {
  if (storagePalette === null) {
    color1.style.backgroundColor = 'rgb(0, 0, 0)';
    color2.style.backgroundColor = 'rgb(255, 0, 0)';
    color3.style.backgroundColor = 'rgb(0, 128, 0)';
    color4.style.backgroundColor = 'rgb(0, 0, 255)';
    saveColor();
  }
  if (storageSize !== null) {
    input = storageSize;
  }
  retrieveColors();
  genMatrix();
  retrieveDrawing();
};
