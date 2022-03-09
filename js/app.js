'use strict'

//check to see if the use is logged in
function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return isLoggedIn;
}

//if user is logged in, all nav options are revealed
if (checkLoggedIn()) {
  let li = document.querySelectorAll('li');
  li.forEach(item => {
    item.classList.contains('hidden');
    item.classList.remove('hidden');
  })
};

//log user out
if (checkLoggedIn()) {
  const logoutButton = document.querySelector('#logout')
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn')
    window.location.pathname = '/index.html';
  })
};