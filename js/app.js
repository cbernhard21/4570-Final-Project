import { register } from "./register.js";
import { login } from "./login.js";
import { profile } from './profile.js'

// //get the path to determine which page the user is on 
const path = window.location.pathname;


// //decide what script to run based on the page the user is currently on
switch (path) {
  case '/register.html':
    register();
    break;
  case '/login.html':
    login();
    break;
  case '/profile.html':
    profile();
    break;
}