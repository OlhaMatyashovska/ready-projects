window.addEventListener("load",function() {
  getJoke();
});

// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  prev = document.querySelector('.previous'),
  next = document.querySelector('.next'),
  joke = document.querySelector('.joke'),
  jokeBtn = document.querySelector('.joke-btn'),
  city = document.querySelector('.city'),
  error = document.querySelector('.error');


// Get Jokes 
async function getJoke() {
  const jokeData = await fetch('https://icanhazdadjoke.com/',{
    headers: {
      'Accept': 'application/json'
    }
  });
  const jokeObj = await jokeData.json();
  joke.innerText = jokeObj.joke;
}
  
// Checker && myNum
let myNum = 0,
    checker = 0;
// Increas MyNum
function increas() {
  myNum++;
  if (myNum > 5) {
    myNum = 0;
  }
  setBgGreet();
}

function decreas() {
  myNum--;
  if (myNum < 0) {
    myNum = 5;
  }
  setBgGreet();
}

// Show Time
function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    day = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (checker !== hour) {
      checker = hour;
      myNum += 1;
      if (myNum > 5) {
        myNum = 0;
      }
      setBgGreet();
    }
    
  // Set AM or PM
  // const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  // hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}:${addZero(min)}:${addZero( sec )} `;

  //Output Date 
  date.innerHTML = `${days[day]}<span>, </span>${today.getDate()}<span>th of </span>${months[month]}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    img = ['12.jpg', '03.jpg', '04.jpg', '05.jpg', '01.jpg', '07.jpg'];


  if (hour < 6 || hour === 24) {
    // Night
    document.body.style.backgroundImage = `url('assets/images/night/${img[myNum]}')`;
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = `url('assets/images/morning/${img[myNum]}')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = `url('assets/images/day/${img[myNum]}')`;
    
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24) {
    //Evening
    document.body.style.backgroundImage = `url('assets/images/evening/${img[myNum]}')`;
    
    greeting.textContent = 'Good Evening, ';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) { 
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
        if (localStorage.getItem('name') === '' || localStorage.getItem('name') === ' ' || localStorage.getItem('name') === null) {
          localStorage.setItem('name', prevName);
        }
        name.blur();
        getName();
      }
    } else {
        localStorage.setItem('name', e.target.innerText);
        if (localStorage.getItem('name') === '' || localStorage.getItem('name') === ' ' || localStorage.getItem('name') === null) {
          localStorage.setItem('name', prevName);
          getName();
        }   
    }
}

// Clear Name
let prevName = '';
function clearName() {
  prevName = name.innerText;
  localStorage.setItem('name', '');
  name.innerText = '';
  document.body.style.backgorundImage = "url('assets/images/evening/09.jpg')";
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      if (localStorage.getItem('focus') === '' || localStorage.getItem('focus') === ' ' || localStorage.getItem('focus') === null) {
          localStorage.setItem('focus', prevFocus);
      }
      focus.blur();
      getFocus();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText); 
    if (localStorage.getItem('focus') === '' || localStorage.getItem('focus') === ' ' || localStorage.getItem('focus') === null) {
        localStorage.setItem('focus', prevFocus);
        getFocus();
      }
  }
}



// Clear Focus
let prevFocus = '';
function clearFocus() {
  prevFocus = focus.innerText;
  localStorage.setItem('focus', '');
  focus.innerText = '';
}

// Clear City 
let prevCity = '';
function clearCity() {
  prevCity = city.innerText;
  localStorage.setItem('city', '');
  city.innerText = '';
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);

      if (localStorage.getItem('city') === '' || localStorage.getItem('city') === ' ' || localStorage.getItem('city') === null) {
          localStorage.setItem('city', prevCity);
      }
      city.blur();
      getCity();
      weatherBalloon(localStorage.getItem('city'));
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
    
    if (localStorage.getItem('city') === '' || localStorage.getItem('city') === ' ' || localStorage.getItem('city') === null) {
        localStorage.setItem('city', prevCity);
    }
      getCity();
      weatherBalloon(localStorage.getItem('city'));
  }
}


// Get Weather
function weatherBalloon( cityName ) {
  var key = 'a913b85241698a00b1014abe62a5ca0e';
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    if (data.cod === '404') {
      error.innerText = 'City not found';
      document.querySelector('.info').innerText = '';
      document.querySelector('.description').innerHTML = '';
      document.querySelector('.humidity').innerText = '';
      document.querySelector('.wind-speed').innerText = '';
      document.querySelector('.temp').innerHTML = '';
    } else {
      error.innerText = '';
      drawWeather(data);
    }
  })
  .catch(function() {
    // catch any errors
  });
}

function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
  console.log(d);
  console.log(d.cod);
  document.querySelector('.info').innerText = `The weather for ${d.name}:`;
  document.querySelector('.description').innerHTML = `${d.weather[0].description}<img class="icon" src="http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png" alt="">`;
  document.querySelector('.humidity').innerText ='Humidity: ' + d.main.humidity + '%';
  document.querySelector('.wind-speed').innerText = 'Wind speed: ' + d.wind.speed +'km/h';
  document.querySelector('.temp').innerHTML = celcius + '&deg;';
  
}

window.onload = function() {
  weatherBalloon(localStorage.getItem('city'));
}



name.addEventListener('click', clearName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', clearFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('click', clearCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
jokeBtn.addEventListener('click', getJoke);
prev.addEventListener('click', decreas);
next.addEventListener('click', increas);




// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();
