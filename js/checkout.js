'use strict'

//BEGIN HELPER FUNCTIONS
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

//REGEX FUNCTIONS!!!
//checks letters only any length
function checkLetters(input) {
  let regex = /^[a-zA-Z]+$/i;
  return regex.test(input);
}

//checks address letters, numbers, and spaces
function checkAddress(input) {
  let regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  return regex.test(input);
}

//check for 5 digit number for zip code
function checkZipCode(input) {
  let regex = /^[0-9]{5}$/gm;
  return regex.test(input)
}

//check for 10 digit number for phone number
function checkPhone(input) {
  let regex = /^[0-9]{10}$/gm;
  return regex.test(input)
}

//check for 16 digit number for credit card
function checkCreditCard(input) {
  let regex = /^[0-9]{16}$/gm;
  return regex.test(input)
}

//check for 11/11 formate number for credit card exp date
function checkCreditCardDate(input) {
  let regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return regex.test(input)
}

//check for a 3 digit number for CC security code
function checkCode(input) {
  let regex = /^[0-9]{3}$/gm;
  return regex.test(input)
}

//function that checks the input fields in the form are entered correctly, if not a message in the DOM is displayed
function checkCorrectFormData(value, htmlContainer, messageArr, func) {
  if (value != '') {
    if (func(value)) {
      // console.log('you entered your name correctly')
    } else {
      // console.log('please reenter your name with only letters')
      addErrorMessage(htmlContainer, messageArr[0]);
    }
  } else {
    // console.log('Please enter your first name');
    addErrorMessage(htmlContainer, messageArr[1]);
  };
};

//function to add error message to DOM, takes in a HTML container to insert the text and a message
function addErrorMessage(htmlContainer, message) {
  let errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.className = 'error';
  htmlContainer.appendChild(errorMessage);
};

//END HELPER FUNCTIONS

//process form data and do checks
//DOM elements and global elements
const submitButton = document.querySelector('.submit');
const form = document.querySelector('#registerForm');

//event listeners
//submit button, get form data
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const allElements = document.querySelectorAll('.error');
  //remove error messages if there are any
  allElements.forEach(element => {
      element.remove();
    })
    //form data
  const formData = new FormData(form);
  const keyAndValues = [...formData.entries()];

  //loop through and test each form input with a switch statement
  keyAndValues.forEach(([key, value]) => {
    switch (key) {
      case 'firstName':
        let incorrectFormatFirstName = 'Please Only Use Letters For Your First Name';
        let missingFirstName = 'Please Enter Your First Name';
        let firstNameMessageArr = [incorrectFormatFirstName, missingFirstName];
        checkCorrectFormData(value, form, firstNameMessageArr, checkLetters);
        break;
      case 'lastName':
        let incorrectFormatLastName = 'Please Only Use Letters For Your Last Name';
        let missingLastName = 'Please Enter Your Last Name';
        let lastNameMessageArr = [incorrectFormatLastName, missingLastName];
        checkCorrectFormData(value, form, lastNameMessageArr, checkLetters);
        break;
      case 'address':
        let incorrectFormatAddress = 'Please Only Use Letters, Numbers and Spaces For Your Address';
        let missingAddress = 'Please Enter Your Address';
        let addressMessageArr = [incorrectFormatAddress, missingAddress];
        checkCorrectFormData(value, form, addressMessageArr, checkAddress);
        break;
      case 'state':
        let incorrectFormatState = 'Please Only Use Letters For Your State';
        let missingState = 'Please Enter Your State';
        let stateMessageArr = [incorrectFormatState, missingState];
        checkCorrectFormData(value, form, stateMessageArr, checkLetters);
        break;
      case 'city':
        let incorrectFormatCity = 'Please Only Use Letters For Your City';
        let missingCity = 'Please Enter Your City';
        let cityMessageArr = [incorrectFormatCity, missingCity];
        checkCorrectFormData(value, form, cityMessageArr, checkLetters);
        break;
      case 'zipCode':
        let incorrectFormatZipCode = 'Only a 5 Digit Number Is Allowed For Your Zip Code';
        let missingZipCode = 'Please Enter Your Zip Code';
        let zipCodeMessageArr = [incorrectFormatZipCode, missingZipCode];
        checkCorrectFormData(value, form, zipCodeMessageArr, checkZipCode);
        break;
      case 'phone':
        let incorrectFormatPhone = 'Only a 10 Digit Number Is Allowed For Your Phone Number, Please Include Area Code';
        let missingPhone = 'Please Enter Your Phone Number';
        let phoneMessageArr = [incorrectFormatPhone, missingPhone];
        checkCorrectFormData(value, form, phoneMessageArr, checkPhone);
        break;
      case 'creditCard':
        let incorrectFormatCreditCard = 'Only a 16 Digit Number Is Allowed For Your Credit Card.  No extra characters';
        let missingCreditCard = 'Please Enter Your Credit Card Number';
        let creditCardMessageArr = [incorrectFormatCreditCard, missingCreditCard];
        checkCorrectFormData(value, form, creditCardMessageArr, checkCreditCard);
        break;
      case 'cardExpire':
        let incorrectFormatCardExpire = 'Please enter XX/XX format.';
        let missingCardExpire = 'Please Enter Your Credit Card Expiration Date';
        let cardExpireMessageArr = [incorrectFormatCardExpire, missingCardExpire];
        checkCorrectFormData(value, form, cardExpireMessageArr, checkCreditCardDate);
        break;

      case 'cardSecurity':
        let incorrectFormatCode = 'Only a 3 Digit Number Is Allowed For Your Security Code';
        let missingCode = 'Please Enter Your Credit Card Security Code';
        let codeMessageArr = [incorrectFormatCode, missingCode];
        checkCorrectFormData(value, form, codeMessageArr, checkCode)
        break;
    };
  });
  //if there are no errors, go to the thank you page
  const allElementsAtEnd = document.querySelectorAll('.error');

  if (allElementsAtEnd.length === 0) {
    window.location.pathname = '/thanks.html'
  } else {
    console.log('there are still errors');
  }
});

//change colors according to user settings
//DOM elements to change background color
const formElement = document.querySelector('.regularBox');

//get user color settings from local storage
const loggedInUserInfo = JSON.parse(localStorage.getItem('user'));
const userBackgroundColor = loggedInUserInfo.settings.backgroundColor;
const userButtonColor = loggedInUserInfo.settings.buttonColor;

//change background colors
handleBackgroundColor(userBackgroundColor, formElement);
handleButtonColor(userButtonColor, submitButton);