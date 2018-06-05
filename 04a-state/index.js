const choo = require('choo');
const app = choo();

const modelYard = require('./models/yard');

const viewMain = require('./pages/home');

// global dependencies
require('./assets/styles/global');

// models
//app.model(…);

// routes
app.router((route) => [route('/', viewMain)]);

// run app
const tree = app.start();
document.body.appendChild(tree);

document.querySelector('.track_a').addEventListener("click", evt => {
  console.log("something was clicked")
  localStorage.setItem('name', "Daniela");
  let dani = localStorage.getItem('name')
  console.log(dani)
})


