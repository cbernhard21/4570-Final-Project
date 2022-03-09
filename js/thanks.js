'use strict'

//function to handle form background color, takes in a color string and the DOM element the color is applied to
//the color hex numbers are coded in the switch statement
function handleBackgroundColor(color, htmlElement) {
  switch (color) {
    case 'default':
      htmlElement.style.backgroundColor = '#557C3E';
      break;
    case 'green':
      htmlElement.style.backgroundColor = '#557C3E';
      break;
    case 'black':
      htmlElement.style.backgroundColor = '#333333';
      break;
    case 'blue':
      htmlElement.style.backgroundColor = '#0a013f';
      break;
    case 'brown':
      htmlElement.style.backgroundColor = '#3f3001';
      break;
  };
};

//function to handle button color change, takes in a color string and the DOM element the color is applied to
//the color hex numbers are coded in the switch statement
function handleButtonColor(color, htmlElement) {
  switch (color) {
    case 'default':
      htmlElement.style.backgroundColor = '#FAEBD7';
      break;
    case 'white':
      htmlElement.style.backgroundColor = '#FAEBD7';
      break;
    case 'grey':
      htmlElement.style.backgroundColor = '#dddddd';
      break;
    case 'babyBlue':
      htmlElement.style.backgroundColor = '#8ba8f8';
      break;
    case 'lightBrown':
      htmlElement.style.backgroundColor = '#a88d53';
      break;
  }
};

//change colors according to user settings
//DOM elements to change background color
const formElement = document.querySelector('#formBox');
const submitButton = document.querySelector('.submit')

//get user color settings from local storage
const loggedInUserInfo = JSON.parse(localStorage.getItem('user'));
const userBackgroundColor = loggedInUserInfo.settings.backgroundColor;
const userButtonColor = loggedInUserInfo.settings.buttonColor;

//change background colors
handleBackgroundColor(userBackgroundColor, formElement);
handleButtonColor(userButtonColor, submitButton);


//log out from button on thanks page
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('isLoggedIn');
  localStorage.removeItem('cart');
  window.location.pathname = '/index.html';
})