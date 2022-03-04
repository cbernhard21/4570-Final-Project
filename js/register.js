function register() {
    //global variables
    const formContainer = document.querySelector('#formBox');
    const submitButton = document.querySelector('.submit');
    const errorMessageText = 'Please Fill In All The Fields';

    //event listeners
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        //form values
        let screenName = document.querySelector('#screenName').value;
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        let errorHtml = document.querySelector('.error');

        //removes error message if it is there
        if (errorHtml) {
            errorHtml.remove();
        }

        //check if username and password are filled in
        try {
            if (screenName === '' || username === '' || password === '') {
                throw err
            } else {
                const user = {
                    screenName: screenName,
                    username: username,
                    password: password,
                    cart: []
                }
                localStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('isLoggedIn', true);
                window.location.pathname = '/profile.html';
            }
        } catch (err) {
            addErrorMessage(formContainer, errorMessageText);
        }
    });
}

//function to add error message to DOM, takes in a HTML container to insert the text and a message
const addErrorMessage = (htmlContainer, message) => {
    let errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.className = 'error';
    htmlContainer.appendChild(errorMessage);
}

register();