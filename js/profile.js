function profile() {
  //checks to see if the user is logged in.  If they are not, the user is redirected to the login page  
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.pathname = '/login.html';
  }

  //get local storage information
  const loggedInUserInfo = JSON.parse(localStorage.getItem('user'));
  console.log(loggedInUserInfo);

  //global variables
  const formContainer = document.querySelector('#formBox');
  const button = document.querySelector('.submit');
  const welcomeMessageContainer = document.querySelector('.welcome-message');
  const screenName = loggedInUserInfo.screenName;
  const welcomeMessageText = `Welcome ${screenName}!`;

  //display welcome message with stored screen name
  displayWelcomeMessage(welcomeMessageContainer, welcomeMessageText);

  //check if logged in user has color preference, if so change colors if not leave at default
  if (loggedInUserInfo.settings) {
    const currentBackgroundColor = loggedInUserInfo.settings.backgroundColor;
    const currentButtonColor = loggedInUserInfo.settings.buttonColor;
    handleBackgroundColor(currentBackgroundColor, formContainer)
    handleButtonColor(currentButtonColor, button)
  }

  //event listeners
  button.addEventListener('click', (e) => {
    e.preventDefault();

    //get values from the form
    const newScreenName = document.querySelector('#screenName').value;
    const backgroundColor = document.querySelector('#backgroundColor').value;
    const buttonColor = document.querySelector('#buttonColors').value;

    //create color settings object with the values from the form
    const colorSettings = {
      backgroundColor: backgroundColor,
      buttonColor: buttonColor
    }

    //set color settings as a key/value in the user object
    loggedInUserInfo.settings = colorSettings;

    //sets new background color and button color
    let newBackgroundColor = colorSettings.backgroundColor;
    let newButtonColor = colorSettings.buttonColor;
    handleBackgroundColor(newBackgroundColor, formContainer)
    handleButtonColor(newButtonColor, button)

    //set new screen name if there is one
    if (newScreenName != '') {
      loggedInUserInfo.screenName = newScreenName;
      //display new message if screen name was changed
      const newWelcomeMessageText = `Welcome ${newScreenName}!`;
      displayWelcomeMessage(welcomeMessageContainer, newWelcomeMessageText);
    }
    //set user to local storage
    localStorage.setItem('user', JSON.stringify(loggedInUserInfo));

  });
};

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
  }
}

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
}

//function to display welcome message, takes in the DOM element the message will be displayed in and a message as a string
function displayWelcomeMessage(htmlContainer, message) {
  htmlContainer.textContent = message;
}

profile();