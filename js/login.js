function login() {
  //global variables
  const formContainer = document.querySelector('#formBox');
  const loginButton = document.querySelector('.submit');
  let errorMessageText = 'Incorrect username or password.  Please try again.'
  let loginAttempts = 0;

  if (sessionStorage.getItem('isLoggedIn')) {
    window.location.pathname = '/profile.html'
  }

  //event listeners
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    //after 3 attempts the error message will change
    loginAttempts++;
    if (loginAttempts >= 3) {
      errorMessageText = 'Please make sure you are registered'
    }

    //username and password values
    const enteredUsername = document.querySelector('#username').value;
    const enteredPassword = document.querySelector('#password').value;

    //error message container
    const errorHtml = document.querySelector('.error');

    //removes error message if it is there
    if (errorHtml) {
      errorHtml.remove();
    }

    //check if entered username and password exist in local storage
    let storedUserInfo = JSON.parse(localStorage.getItem('user'));

    try {
      if (!storedUserInfo) {
        throw error
      } else {
        const storedUsername = storedUserInfo.username;
        const storedPassword = storedUserInfo.password;
        try {
          if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            sessionStorage.setItem('isLoggedIn', true);
            window.location.pathname = '/profile.html';
          } else {
            throw err
          }
        } catch (err) {
          addErrorMessage(formContainer, errorMessageText);
        }
      }
    } catch (error) {
      addErrorMessage(formContainer, errorMessageText);
    }
  });

};

//function to add error message to DOM, takes in a HTML container to insert the text and a message
const addErrorMessage = (htmlContainer, message) => {
  let errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.className = 'error';
  htmlContainer.appendChild(errorMessage);
};

//call the login function
login();